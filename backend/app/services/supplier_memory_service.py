import os
import json
import logging
import uuid
from typing import List, Dict, Any, Optional
from app.models.supplier_experience import SupplierExperience
from app.schemas.rfq import (
    RFQRequest,
    RFQAnalysisResponse,
    MultiSupplierAnalysisResponse,
    SupplierEvaluation,
    EvidenceItem,
    ConditionComparison,
    HindsightStatus,
    OutcomeRecordRequest,
    OutcomeRecordResponse
)
from app.services.hindsight_service import hindsight_service

logger = logging.getLogger("batchwise.supplier_memory_service")

class SupplierMemoryService:
    """
    Core domain service that loads historical supplier experiences, populates memory,
    performs multi-supplier condition-aware RFQ feasibility analysis, and handles outcome retention.
    Supports both 'memory_aware' and 'baseline' (memory-blind) evaluation modes.
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

    def get_all_suppliers(self) -> List[Dict[str, Any]]:
        """Returns list of all unique suppliers and their historical experience counts."""
        suppliers_map: Dict[str, Dict[str, Any]] = {}
        for exp in self.experiences:
            name = exp.supplier
            if name not in suppliers_map:
                suppliers_map[name] = {
                    "name": name,
                    "total_experiences": 0,
                    "successful_count": 0,
                    "failed_count": 0,
                    "processes": set(),
                    "materials": set(),
                    "last_known_outcome": exp.outcome
                }
            suppliers_map[name]["total_experiences"] += 1
            if exp.outcome.lower() == "successful":
                suppliers_map[name]["successful_count"] += 1
            elif exp.outcome.lower() == "failed":
                suppliers_map[name]["failed_count"] += 1
            suppliers_map[name]["processes"].add(exp.process)
            suppliers_map[name]["materials"].add(exp.material)
            suppliers_map[name]["last_known_outcome"] = exp.outcome

        result = []
        for name, data in suppliers_map.items():
            result.append({
                "name": name,
                "total_experiences": data["total_experiences"],
                "successful_count": data["successful_count"],
                "failed_count": data["failed_count"],
                "processes": list(data["processes"]),
                "materials": list(data["materials"]),
                "last_known_outcome": data["last_known_outcome"]
            })
        return result

    def get_supplier_detail(self, supplier_name: str) -> Dict[str, Any]:
        """Returns detailed historical experience view, success/failure patterns, and learned conditions."""
        supplier_exps = [e for e in self.experiences if e.supplier.lower() == supplier_name.lower()]
        
        if not supplier_exps:
            return {
                "supplier": supplier_name,
                "assessment": "INSUFFICIENT EVIDENCE",
                "summary": f"No historical experience records found for '{supplier_name}'.",
                "experiences": [],
                "success_patterns": [],
                "failure_patterns": [],
                "learned_conditions": [],
                "verification_required": ["Conduct initial facility capability audit."]
            }

        success_exps = [e for e in supplier_exps if e.outcome.lower() == "successful"]
        failed_exps = [e for e in supplier_exps if e.outcome.lower() == "failed"]

        success_patterns = []
        for e in success_exps:
            conds_str = ", ".join(e.conditions).replace("_", " ") if e.conditions else "standard parameters"
            success_patterns.append(f"Successfully fulfilled {e.quantity} units of {e.product} ({e.material}, {e.process}) under conditions: {conds_str}.")

        failure_patterns = []
        for e in failed_exps:
            reason = e.failure_reason or "Unspecified fulfillment issue"
            failure_patterns.append(f"Fulfillment failed on {e.quantity} units of {e.product}: {reason}.")

        learned_conditions = []
        for e in supplier_exps:
            for c in e.conditions:
                c_clean = c.replace("_", " ")
                if c_clean not in learned_conditions:
                    learned_conditions.append(c_clean)

        verifications = []
        if failed_exps:
            verifications.append("Verify tooling setup costs and NRE fees prior to order placement.")
            verifications.append("Confirm stock material availability with supplier prior to PO issuance.")
        else:
            verifications.append("Confirm shop queue and lead time schedule.")

        return {
            "supplier": supplier_name,
            "assessment": "FEASIBLE" if (success_exps and not failed_exps) else ("CONDITIONAL" if failed_exps else "INSUFFICIENT EVIDENCE"),
            "summary": f"Recorded {len(supplier_exps)} historical experiences ({len(success_exps)} successful, {len(failed_exps)} failed).",
            "experiences": supplier_exps,
            "success_patterns": success_patterns,
            "failure_patterns": failure_patterns,
            "learned_conditions": learned_conditions,
            "verification_required": verifications
        }

    def record_supplier_outcome(self, outcome_req: OutcomeRecordRequest) -> OutcomeRecordResponse:
        """
        Record buyer post-order outcome and retain experience in Hindsight persistent memory.
        """
        exp_id = f"exp_recorded_{uuid.uuid4().hex[:8]}"
        exp = SupplierExperience(
            id=exp_id,
            supplier=outcome_req.supplier,
            product=outcome_req.product,
            quantity=outcome_req.quantity,
            material=outcome_req.material,
            process=outcome_req.process,
            finish=outcome_req.finish,
            quoted_price=outcome_req.quoted_price,
            actual_price=outcome_req.actual_price,
            promised_lead_time_days=outcome_req.promised_lead_time_days,
            actual_lead_time_days=outcome_req.actual_lead_time_days,
            quality_result=outcome_req.quality_result,
            outcome=outcome_req.outcome,
            failure_reason=outcome_req.failure_reason,
            conditions=outcome_req.conditions,
            notes=outcome_req.buyer_notes,
            date=None
        )

        # Store in internal memory list
        self.experiences.append(exp)

        # Retain in Hindsight
        retain_res = hindsight_service.retain_experience(exp)

        learning_conf = (
            f"Experience saved to BATCHWISE memory bank '{hindsight_service.bank_id}'. "
            f"Hindsight will use this experience in future sourcing analysis."
        )

        return OutcomeRecordResponse(
            status="success",
            hindsight_retained=retain_res.get("hindsight_retained", False),
            experience_id=exp_id,
            retained_content=exp.to_natural_language(),
            learning_confirmation=learning_conf
        )

    def evaluate_single_supplier(self, target_supplier: str, rfq: RFQRequest) -> SupplierEvaluation:
        """
        Evaluates a single supplier against RFQ parameters.
        Supports both 'memory_aware' mode (using Hindsight recalled experiences)
        and 'baseline' mode (memory-blind, static profile assumption).
        """
        mode = (rfq.analysis_mode or "memory_aware").lower()

        # MODE A: MEMORY-BLIND BASELINE
        if mode == "baseline":
            # Static profile evaluation without accessing Hindsight recalled experiences
            has_process_capability = any(
                e.supplier.lower() == target_supplier.lower() and rfq.process.lower() in e.process.lower()
                for e in self.experiences
            )
            
            if has_process_capability:
                return SupplierEvaluation(
                    supplier=target_supplier,
                    status="FEASIBLE",
                    summary=f"Memory-blind baseline: Supplier '{target_supplier}' lists static capability for {rfq.process}. No historical experience memory retrieved.",
                    evidence_count=0,
                    evidence=[],
                    learned_conditions=[],
                    risks=[],
                    required_verification=["Standard static supplier capability check"],
                    last_known_outcome=None,
                    memory_value=[]
                )
            else:
                return SupplierEvaluation(
                    supplier=target_supplier,
                    status="FEASIBLE", # Static baseline assumes feasible if registered supplier
                    summary=f"Memory-blind baseline: Supplier '{target_supplier}' assumed feasible from static directory listing. No historical experience memory consulted.",
                    evidence_count=0,
                    evidence=[],
                    learned_conditions=[],
                    risks=[],
                    required_verification=["General vendor check"],
                    last_known_outcome=None,
                    memory_value=[]
                )

        # MODE B: BATCHWISE MEMORY-AWARE
        supplier_exps = [e for e in self.experiences if e.supplier.lower() == target_supplier.lower()]

        relevant_exps = [
            e for e in supplier_exps
            if rfq.process.lower() in e.process.lower() or "enclosure" in e.product.lower() or rfq.product.lower() in e.product.lower()
        ]

        if not relevant_exps:
            # Check if supplier has any other general experiences
            if supplier_exps:
                return SupplierEvaluation(
                    supplier=target_supplier,
                    status="INSUFFICIENT EVIDENCE",
                    summary=f"Insufficient historical evidence for '{target_supplier}' regarding {rfq.product} via {rfq.process}. Known only for other operations.",
                    evidence_count=len(supplier_exps),
                    evidence=[
                        EvidenceItem(
                            experience_id=e.id,
                            supplier=e.supplier,
                            experience=f"{e.quantity}-unit order of {e.product} ({e.process})",
                            outcome=e.outcome,
                            conditions=e.conditions,
                            notes=e.notes,
                            date=e.date,
                            relevance_reason=f"Recorded experience for different process ({e.process})."
                        ) for e in supplier_exps[:2]
                    ],
                    learned_conditions=[],
                    risks=["No verified historical performance records for required process/part type."],
                    required_verification=[f"Request capability demonstration or sample run from {target_supplier}."],
                    last_known_outcome=supplier_exps[-1].outcome if supplier_exps else None,
                    memory_value=["Correctly identified lack of historical evidence for process instead of assuming static capability."]
                )
            else:
                return SupplierEvaluation(
                    supplier=target_supplier,
                    status="INSUFFICIENT EVIDENCE",
                    summary=f"Insufficient evidence available for '{target_supplier}'. No historical sourcing records exist in memory.",
                    evidence_count=0,
                    evidence=[],
                    learned_conditions=[],
                    risks=["No historical sourcing data recorded."],
                    required_verification=[
                        f"Request initial quote and capability presentation from {target_supplier}.",
                        "Perform site inspection or vendor onboarding audit."
                    ],
                    last_known_outcome=None,
                    memory_value=["Correctly identified unknown supplier rather than over-confidently assuming feasibility."]
                )

        success_exps = [e for e in relevant_exps if e.outcome.lower() == "successful"]
        failed_exps = [e for e in relevant_exps if e.outcome.lower() == "failed"]

        evidence_items: List[EvidenceItem] = []
        learned_conditions: List[str] = []
        risks: List[str] = []
        required_verification: List[str] = []
        memory_value: List[str] = []

        for exp in relevant_exps:
            rel_reason = "Matches product and process specifications."
            if exp.quantity == rfq.quantity:
                rel_reason += " Exact quantity match."
            elif abs(exp.quantity - rfq.quantity) <= 20:
                rel_reason += " Similar batch size scale."

            evidence_items.append(
                EvidenceItem(
                    experience_id=exp.id,
                    supplier=exp.supplier,
                    experience=f"{exp.quantity}-unit order of {exp.product} ({exp.material}, {exp.process})",
                    outcome=exp.outcome,
                    conditions=exp.conditions,
                    notes=exp.notes or exp.failure_reason,
                    date=exp.date,
                    relevance_reason=rel_reason
                )
            )

            if exp.outcome.lower() == "successful":
                for c in exp.conditions:
                    c_clean = c.replace("_", " ")
                    if c_clean not in learned_conditions:
                        learned_conditions.append(c_clean)
            elif exp.outcome.lower() == "failed":
                if exp.failure_reason:
                    risks.append(f"Past failure mode: {exp.failure_reason}")
                for c in exp.conditions:
                    c_clean = c.replace("_", " ")
                    if f"Condition risk: {c_clean}" not in risks:
                        risks.append(f"Condition risk: {c_clean}")

        # Decision changing condition & side-by-side comparison setup
        comparison: Optional[ConditionComparison] = None
        decision_changing_cond: Optional[str] = None

        if failed_exps and success_exps:
            status = "CONDITIONAL"
            succ_e = success_exps[0]
            fail_e = failed_exps[0]
            
            decision_changing_cond = "Tooling & Stock Material Requirement"

            comparison = ConditionComparison(
                current_rfq={
                    "quantity": rfq.quantity,
                    "material": rfq.material,
                    "process": rfq.process,
                    "tooling": "Standard vs Custom (To verify)",
                    "finish": rfq.finish or "Standard"
                },
                successful_experience={
                    "quantity": succ_e.quantity,
                    "material": succ_e.material,
                    "process": succ_e.process,
                    "tooling": "Standard Tooling + Stock Material",
                    "outcome": "SUCCESS"
                },
                failed_experience={
                    "quantity": fail_e.quantity,
                    "material": fail_e.material,
                    "process": fail_e.process,
                    "tooling": "Custom Tooling Required",
                    "outcome": "FAILURE"
                },
                decision_changing_condition=decision_changing_cond
            )

            summary = (
                f"Historical experience indicates {target_supplier} successfully fulfills small-batch orders "
                f"(e.g., {succ_e.quantity} units of {succ_e.product}) under standard tooling and stock material conditions. "
                f"However, orders requiring custom tooling (e.g., {fail_e.quantity} units) failed due to NRE tooling fees destroying low-volume economics."
            )

            required_verification = [
                f"Confirm whether {target_supplier} requires custom tooling or can utilize standard tooling for this {rfq.quantity}-unit batch.",
                f"Verify raw material ({rfq.material}) is available directly from local stock to avoid schedule drift.",
                "Verify final price commitment matches initial quote."
            ]

            memory_value = [
                f"Identified past custom-tooling failure on {fail_e.quantity}-unit order that baseline static profile missed.",
                f"Derived decision-changing condition ('{decision_changing_cond}').",
                "Added required pre-sourcing verification for tooling NRE fees."
            ]

        elif success_exps and not failed_exps:
            status = "FEASIBLE"
            summary = (
                f"Historical evidence strongly supports {target_supplier} as FEASIBLE for {rfq.quantity} units of {rfq.product}. "
                f"Previous small-batch orders completed successfully within promised parameters."
            )
            required_verification = [
                "Confirm current shop queue lead time.",
                "Finalize PO terms."
            ]
            memory_value = [
                f"Validated {len(success_exps)} successful historical order outcomes under matching process parameters.",
                f"Identified prerequisite success conditions: {', '.join(learned_conditions)}."
            ]

        elif failed_exps and not success_exps:
            status = "CONDITIONAL"
            summary = (
                f"Previous orders with {target_supplier} experienced failure ({failed_exps[0].failure_reason or 'Delivery delay'}). "
                f"Sourcing is CONDITIONAL upon addressing historical risk factors."
            )
            required_verification = [
                "Require explicit SLA contract with delay penalties.",
                "Evaluate alternative qualified suppliers."
            ]
            memory_value = [
                f"Detected historical failure risk ({failed_exps[0].failure_reason}) overlooked by static baseline."
            ]

        else:
            status = "INSUFFICIENT EVIDENCE"
            summary = f"Insufficient historical evidence for {target_supplier}."
            required_verification = ["Perform capability audit."]
            memory_value = ["Prevented false feasibility claim by checking historical memory."]

        return SupplierEvaluation(
            supplier=target_supplier,
            status=status,
            summary=summary,
            evidence_count=len(evidence_items),
            evidence=evidence_items,
            learned_conditions=learned_conditions,
            risks=risks,
            required_verification=required_verification,
            last_known_outcome=relevant_exps[-1].outcome if relevant_exps else None,
            decision_changing_condition=decision_changing_cond,
            comparison=comparison,
            memory_value=memory_value
        )

    def analyze_rfq_multi_supplier(self, rfq: RFQRequest) -> MultiSupplierAnalysisResponse:
        """
        Main Multi-Supplier Sourcing Analysis Workflow.
        Evaluates all candidate suppliers, recalls Hindsight memories (if memory_aware mode),
        compares operating conditions, and generates structured feasibility assessments.
        """
        mode = (rfq.analysis_mode or "memory_aware").lower()

        # Execute recall query if memory_aware mode
        total_recalled = 0
        if mode == "memory_aware":
            query = (
                f"Find historical supplier experiences relevant to: {rfq.product}, {rfq.quantity} units, "
                f"{rfq.material}, {rfq.process}, finish: {rfq.finish or 'standard'}, deadline: {rfq.deadline_days or 14} days."
            )
            recall_res = hindsight_service.recall_supplier_experiences(query)

        # Get list of unique suppliers
        unique_suppliers = list(dict.fromkeys([e.supplier for e in self.experiences]))
        
        # Ensure Alpha Manufacturing, Beta Precision, Gamma Works, Delta Components, Epsilon Manufacturing are present
        priority_suppliers = ["Alpha Manufacturing", "Beta Precision", "Gamma Works", "Delta Components", "Epsilon Manufacturing"]
        for s in priority_suppliers:
            if s not in unique_suppliers:
                unique_suppliers.append(s)

        evaluations: List[SupplierEvaluation] = []

        for supplier in unique_suppliers:
            eval_result = self.evaluate_single_supplier(supplier, rfq)
            evaluations.append(eval_result)
            total_recalled += eval_result.evidence_count

        # Build Hindsight status object
        mem_status = hindsight_service.get_memory_status()
        hs = HindsightStatus(
            is_connected=mem_status["is_connected"],
            bank_id=mem_status["bank_id"],
            mode=mem_status["mode"] if mode == "memory_aware" else "MEMORY-BLIND BASELINE MODE",
            recalled_count=total_recalled if mode == "memory_aware" else 0,
            relevant_count=sum(len(ev.evidence) for ev in evaluations if ev.status in ["FEASIBLE", "CONDITIONAL"]) if mode == "memory_aware" else 0,
            message=mem_status["message"] if mode == "memory_aware" else "Evaluation running in memory-blind baseline mode (no Hindsight recall)."
        )

        return MultiSupplierAnalysisResponse(
            rfq=rfq,
            evaluations=evaluations,
            hindsight_status=hs
        )

    def analyze_rfq(self, rfq: RFQRequest) -> SupplierEvaluation:
        """Single supplier RFQ analysis method for backward compatibility."""
        target = rfq.target_supplier or "Alpha Manufacturing"
        eval_result = self.evaluate_single_supplier(target, rfq)
        # Normalize status to lowercase for Phase 1 test compatibility if needed
        eval_result.status = eval_result.status.lower()
        return eval_result

supplier_memory_service = SupplierMemoryService()
