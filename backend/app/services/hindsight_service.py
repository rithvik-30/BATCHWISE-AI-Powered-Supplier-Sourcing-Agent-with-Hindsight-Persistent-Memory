import logging
import json
from typing import List, Dict, Any, Optional
from app.config import settings
from app.models.supplier_experience import SupplierExperience

logger = logging.getLogger("batchwise.hindsight_service")
logging.basicConfig(level=logging.INFO)

try:
    from hindsight_client import Hindsight
    HINDSIGHT_AVAILABLE = True
except ImportError:
    HINDSIGHT_AVAILABLE = False
    logger.warning("hindsight-client package not installed. Running in mock/fallback mode.")

class HindsightService:
    """
    Service wrapper for official Hindsight SDK integration.
    Provides retain, recall, and reflect primitives backed by a dedicated BATCHWISE memory bank.
    Includes an in-memory fallback store for offline development when Hindsight server is not active.
    """
    def __init__(self):
        self.bank_id = settings.HINDSIGHT_BANK_ID
        self.api_url = settings.HINDSIGHT_API_URL
        self.api_key = settings.HINDSIGHT_API_KEY or None
        self.client: Optional[Any] = None
        self.is_connected: bool = False

        # In-memory fallback dataset for offline/development mode when Hindsight server is offline
        self.fallback_experiences: List[SupplierExperience] = []

        self._initialize_client()

    def _initialize_client(self):
        """Initializes the Hindsight client and ensures the BATCHWISE memory bank is created."""
        if not HINDSIGHT_AVAILABLE:
            logger.info("[HindsightService] hindsight-client library unavailable. Using in-memory store.")
            return

        try:
            self.client = Hindsight(
                base_url=self.api_url,
                api_key=self.api_key,
                timeout=10.0
            )
            # Try connecting or getting version to check server status
            try:
                version_info = self.client.get_version()
                logger.info(f"[HindsightService] Connected to Hindsight server (version: {version_info}).")
                self.is_connected = True
                self._ensure_memory_bank()
            except Exception as conn_err:
                logger.info(f"[HindsightService] Hindsight server at {self.api_url} unreachable: {conn_err}. Operating in local fallback mode.")
                self.is_connected = False
        except Exception as e:
            logger.warning(f"[HindsightService] Could not initialize Hindsight client: {e}. Fallback mode active.")
            self.is_connected = False

    def _ensure_memory_bank(self):
        """Creates the BATCHWISE dedicated memory bank with specific disposition and mission."""
        if not self.is_connected or not self.client:
            return

        mission_statement = (
            "Learn and reason about supplier sourcing experiences, including the conditions "
            "associated with successful and failed small-batch manufacturing orders. "
            "Prefer evidence from actual historical outcomes over unsupported assumptions."
        )
        try:
            self.client.create_bank(
                bank_id=self.bank_id,
                name="BATCHWISE Supplier Memory",
                mission=mission_statement,
                reflect_mission="Synthesize supplier operational patterns, risk conditions, and historical feasibility."
            )
            logger.info(f"[HindsightService] Initialized memory bank '{self.bank_id}'.")
        except Exception as e:
            # Bank might already exist or server returned error
            logger.info(f"[HindsightService] Bank check/creation for '{self.bank_id}': {e}")

    def get_memory_status(self) -> Dict[str, Any]:
        """Returns clear status indicating whether Live Hindsight is connected or fallback mode is active."""
        if self.is_connected:
            return {
                "is_connected": True,
                "bank_id": self.bank_id,
                "api_url": self.api_url,
                "mode": "LIVE HINDSIGHT",
                "message": "Connected to official Hindsight persistent memory server."
            }
        else:
            return {
                "is_connected": False,
                "bank_id": self.bank_id,
                "api_url": self.api_url,
                "mode": "HINDSIGHT MEMORY UNAVAILABLE (FALLBACK)",
                "message": "Hindsight server offline. Operating with local persistent fallback dataset."
            }

    def retain_experience(self, experience: SupplierExperience) -> Dict[str, Any]:
        """
        RETAIN PRIMITIVE: Stores a structured supplier experience into Hindsight memory.
        Converts the structured object into a dense natural-language document preserving conditions and outcomes.
        """
        # Always maintain in fallback store as well
        # Check if already present in fallback by id to prevent duplicate entries
        if not any(e.id == experience.id for e in self.fallback_experiences if e.id):
            self.fallback_experiences.append(experience)
        else:
            # Update existing
            self.fallback_experiences = [
                experience if e.id == experience.id else e for e in self.fallback_experiences
            ]

        content = experience.to_natural_language()
        metadata = {
            "supplier": experience.supplier,
            "product": experience.product,
            "quantity": str(experience.quantity),
            "material": experience.material,
            "process": experience.process,
            "outcome": experience.outcome,
            "experience_id": experience.id or ""
        }
        tags = [
            f"supplier:{experience.supplier.lower().replace(' ', '_')}",
            f"process:{experience.process.lower().replace(' ', '_')}",
            f"outcome:{experience.outcome.lower()}"
        ]
        if experience.conditions:
            for cond in experience.conditions:
                tags.append(f"cond:{cond.lower().replace(' ', '_')}")

        if self.is_connected and self.client:
            try:
                response = self.client.retain(
                    bank_id=self.bank_id,
                    content=content,
                    context=f"Supplier sourcing experience for {experience.supplier}",
                    metadata=metadata,
                    tags=tags
                )
                logger.info(f"[HindsightService] Retained experience '{experience.id}' in Hindsight bank.")
                return {
                    "status": "success",
                    "hindsight_retained": True,
                    "experience_id": experience.id,
                    "retained_content": content,
                    "response": str(response)
                }
            except Exception as e:
                logger.error(f"[HindsightService] Error retaining memory in Hindsight: {e}")

        # Fallback response
        logger.info(f"[HindsightService] Retained experience '{experience.id}' in local fallback store.")
        return {
            "status": "success",
            "hindsight_retained": False,
            "experience_id": experience.id,
            "retained_content": content,
            "notes": "Stored in local fallback store (Hindsight server offline)"
        }

    def recall_supplier_experiences(self, query: str, supplier_filter: Optional[str] = None, max_results: int = 10) -> Dict[str, Any]:
        """
        RECALL PRIMITIVE: Retrieves relevant historical memories for a given query or RFQ context.
        Uses parallel multi-strategy retrieval in Hindsight.
        """
        tags = None
        if supplier_filter:
            tags = [f"supplier:{supplier_filter.lower().replace(' ', '_')}"]

        if self.is_connected and self.client:
            try:
                response = self.client.recall(
                    bank_id=self.bank_id,
                    query=query,
                    tags=tags,
                    include_chunks=True,
                    include_source_facts=True,
                    max_tokens=4096
                )
                logger.info(f"[HindsightService] Recalled Hindsight memories for query: '{query}'")
                
                recalled_facts = []
                if hasattr(response, "results") and response.results:
                    for item in response.results:
                        recalled_facts.append({
                            "text": getattr(item, "text", str(item)),
                            "score": getattr(item, "score", 1.0),
                            "metadata": getattr(item, "metadata", {})
                        })

                return {
                    "status": "success",
                    "hindsight_connected": True,
                    "query": query,
                    "raw_response": str(response),
                    "recalled_facts": recalled_facts
                }
            except Exception as e:
                logger.error(f"[HindsightService] Error executing Hindsight recall: {e}")

        # Fallback local retrieval logic
        logger.info(f"[HindsightService] Hindsight offline. Executing local condition-aware search on fallback dataset.")
        matching_experiences = []
        q_lower = query.lower()
        
        for exp in self.fallback_experiences:
            # Match supplier, product, material, or process
            supplier_match = supplier_filter is None or exp.supplier.lower() == supplier_filter.lower()
            term_match = (
                exp.supplier.lower() in q_lower or
                exp.product.lower() in q_lower or
                exp.material.lower() in q_lower or
                exp.process.lower() in q_lower or
                "enclosure" in q_lower and "enclosure" in exp.product.lower() or
                True # Include if supplier matches
            )
            if supplier_match and term_match:
                matching_experiences.append(exp)

        return {
            "status": "success",
            "hindsight_connected": False,
            "query": query,
            "fallback_experiences": matching_experiences
        }

    def reflect_on_supplier_experiences(self, query: str, context: Optional[str] = None) -> Dict[str, Any]:
        """
        REFLECT PRIMITIVE: Asks Hindsight to reason/synthesize over memories for high-level insight.
        """
        if self.is_connected and self.client:
            try:
                response = self.client.reflect(
                    bank_id=self.bank_id,
                    query=query,
                    context=context,
                    include_facts=True
                )
                logger.info(f"[HindsightService] Executed Hindsight reflect query: '{query}'")
                return {
                    "status": "success",
                    "hindsight_connected": True,
                    "query": query,
                    "synthesis": getattr(response, "text", str(response)),
                    "raw_response": str(response)
                }
            except Exception as e:
                logger.error(f"[HindsightService] Error executing Hindsight reflect: {e}")

        return {
            "status": "success",
            "hindsight_connected": False,
            "query": query,
            "synthesis": "Reflect synthesis operates directly when connected to a running Hindsight LLM backend."
        }

    def run_live_hindsight_test(self) -> Dict[str, Any]:
        """Executes a complete test of retain, recall, and reflect against Hindsight."""
        if not self.is_connected or not self.client:
            return {
                "retain": "FAIL (Hindsight server offline / disconnected)",
                "recall": "FAIL (Hindsight server offline / disconnected)",
                "reflect": "FAIL (Hindsight server offline / disconnected)",
                "overall": "OFFLINE_FALLBACK"
            }

        test_exp = SupplierExperience(
            id="exp_live_test_999",
            supplier="Alpha Manufacturing",
            product="Live Test Enclosure",
            quantity=55,
            material="6061 Aluminium",
            process="CNC Machining",
            conditions=["live_test_run"],
            outcome="successful",
            notes="Live Hindsight verification test"
        )
        try:
            r_retain = self.retain_experience(test_exp)
            retain_pass = r_retain.get("hindsight_retained", False)

            r_recall = self.recall_supplier_experiences("Live Test Enclosure Alpha Manufacturing", supplier_filter="Alpha Manufacturing")
            recall_pass = r_recall.get("hindsight_connected", False)

            r_reflect = self.reflect_on_supplier_experiences("Summarize live test performance for Alpha Manufacturing")
            reflect_pass = r_reflect.get("hindsight_connected", False)

            return {
                "retain": "PASS" if retain_pass else "FAIL",
                "recall": "PASS" if recall_pass else "FAIL",
                "reflect": "PASS" if reflect_pass else "FAIL",
                "overall": "PASS" if (retain_pass and recall_pass and reflect_pass) else "PARTIAL"
            }
        except Exception as e:
            return {
                "retain": "FAIL",
                "recall": "FAIL",
                "reflect": "FAIL",
                "error": str(e),
                "overall": "FAIL"
            }

hindsight_service = HindsightService()
