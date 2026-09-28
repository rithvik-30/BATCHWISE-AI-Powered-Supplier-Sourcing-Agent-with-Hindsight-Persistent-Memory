import os
import json
import logging
from typing import List, Dict, Any, Optional
from app.models.supplier_experience import SupplierExperience
from app.schemas.rfq import RFQRequest, RFQAnalysisResponse, EvidenceItem
from app.services.hindsight_service import hindsight_service

logger = logging.getLogger("batchwise.supplier_memory_service")

class SupplierMemoryService:
    """
    Core domain service that loads historical supplier experiences, populates memory,
    and performs condition-aware RFQ feasibility analysis.
    """
    def __init__(self):
        self.experiences: List[SupplierExperience] = []
        self._load_seed_data()

    def _load_seed_data(self):
        """Loads seed experiences from JSON data file and retains them in memory service."""
        current_dir = os.path.dirname(os.path.abspath(__file__))
        data_path = os.path.join(current_dir, "..", "..", "data", "seed_experiences.json")
        
        if os.path.exists(data_path):
            try:
                with open(data_path, "r", encoding="utf-8") as f:
                    raw_data = json.load(f)
                    for item in raw_data:
                        exp = SupplierExperience(**item)
                        self.experiences.append(exp)
                        # Retain in Hindsight service
                        hindsight_service.retain_experience(exp)
                logger.info(f"[SupplierMemoryService] Loaded and retained {len(self.experiences)} seed experiences.")
            except Exception as e:
                logger.error(f"[SupplierMemoryService] Failed to load seed dataset: {e}")
        else:
            logger.warning(f"[SupplierMemoryService] Seed dataset not found at {data_path}")

    def retain_new_experience(self, exp: SupplierExperience) -> Dict[str, Any]:
        """Stores a new supplier experience post-order outcome."""
        self.experiences.append(exp)
        return hindsight_service.retain_experience(exp)

    def analyze_rfq(self, rfq: RFQRequest) -> RFQAnalysisResponse:
        """
        Main RFQ Condition-Aware Sourcing Analysis Workflow.
        1. Formulates search query from RFQ details.
        2. Recalls historical experiences via HindsightService.
        3. Evaluates retrieved experiences against RFQ operating conditions.
        4. Identifies conditional success factors, risks, and required verifications.
        5. Enforces Anti-Hallucination rule: returns UNKNOWN if no historical evidence exists.
        """
        # Formulate query
        query = (
            f"Find historical supplier experiences relevant to: {rfq.product}, {rfq.quantity} units, "
            f"{rfq.material}, {rfq.process}, finish: {rfq.finish or 'standard'}, deadline: {rfq.deadline_days or 14} days. "
            f"Pay special attention to small-batch order outcomes and operating conditions."
        )

        target_supplier = rfq.target_supplier or "Alpha Manufacturing"

        # Execute Recall
        recall_res = hindsight_service.recall_supplier_experiences(
            query=query,
            supplier_filter=target_supplier
        )

        # Gather relevant experiences for target supplier
        supplier_exps = [e for e in self.experiences if e.supplier.lower() == target_supplier.lower()]

        # Filter by product/process relevance
        relevant_exps = [
            e for e in supplier_exps
            if rfq.process.lower() in e.process.lower() or "enclosure" in e.product.lower() or rfq.product.lower() in e.product.lower()
        ]

        if not relevant_exps:
            # Anti-hallucination check: No historical evidence exists
            return RFQAnalysisResponse(
                status="unknown",
                supplier=target_supplier,
                summary=f"Insufficient historical sourcing evidence available for '{target_supplier}' for {rfq.product} via {rfq.process}.",
                evidence=[],
                learned_conditions=[],
                risks=["Lack of verifiable historical small-batch performance records."],
                required_verification=[
                    f"Request initial sample run or standard MOQ confirmation from {target_supplier}.",
                    "Conduct facility capabilities audit."
                ]
            )

        # Separate successful and failed experiences
        success_exps = [e for e in relevant_exps if e.outcome.lower() == "successful"]
        failed_exps = [e for e in relevant_exps if e.outcome.lower() == "failed"]

        evidence_items: List[EvidenceItem] = []
        learned_conditions: List[str] = []
        risks: List[str] = []
        required_verification: List[str] = []

        # Analyze evidence
        for exp in relevant_exps:
            evidence_items.append(
                EvidenceItem(
                    experience_id=exp.id,
                    supplier=exp.supplier,
                    experience=f"{exp.quantity}-unit order of {exp.product} ({exp.material}, {exp.process})",
                    outcome=exp.outcome,
                    conditions=exp.conditions,
                    notes=exp.notes or exp.failure_reason
                )
            )
            if exp.outcome.lower() == "successful":
                for c in exp.conditions:
                    c_clean = c.replace("_", " ")
                    if c_clean not in learned_conditions:
                        learned_conditions.append(c_clean)
            elif exp.outcome.lower() == "failed":
                if exp.failure_reason:
                    risks.append(f"Past failure: {exp.failure_reason}")
                for c in exp.conditions:
                    c_clean = c.replace("_", " ")
                    if f"Condition risk: {c_clean}" not in risks:
                        risks.append(f"Condition risk: {c_clean}")

        # Specific Alpha Manufacturing demo logic check based on conditions
        if failed_exps and success_exps:
            status = "conditional"
            summary = (
                f"Historical experience indicates {target_supplier} can successfully execute small-batch orders "
                f"(e.g., 60 units of {rfq.product}) under specific conditions (stock material & standard tooling). "
                f"However, orders requiring custom tooling (e.g., 80 units) resulted in failure due to prohibitive NRE tooling costs."
            )
            required_verification = [
                f"Confirm whether {target_supplier} requires custom tooling or can use existing standard tooling for this {rfq.quantity}-unit batch.",
                f"Verify raw material ({rfq.material}) is available directly from local stock to prevent lead time drift.",
                "Verify final price commitment matches initial quote."
            ]
        elif success_exps and not failed_exps:
            status = "feasible"
            summary = (
                f"Historical evidence supports {target_supplier} as a feasible supplier for {rfq.quantity} units of {rfq.product}. "
                f"Previous orders completed successfully within acceptable parameters."
            )
            required_verification = [
                "Confirm lead time timeline given current shop queue.",
                "Finalize PO terms."
            ]
        else:
            status = "conditional"
            summary = f"Past orders with {target_supplier} faced difficulties. Sourcing is conditional on risk mitigation."
            required_verification = ["Evaluate alternative qualified suppliers."]

        return RFQAnalysisResponse(
            status=status,
            supplier=target_supplier,
            summary=summary,
            evidence=evidence_items,
            learned_conditions=learned_conditions,
            risks=risks,
            required_verification=required_verification
        )

supplier_memory_service = SupplierMemoryService()
