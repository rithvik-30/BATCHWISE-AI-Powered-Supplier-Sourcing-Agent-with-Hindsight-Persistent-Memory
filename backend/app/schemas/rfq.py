from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field
from app.models.supplier_experience import SupplierExperience

class RFQRequest(BaseModel):
    """
    Schema for an incoming Request for Quote (RFQ).
    """
    product: str = Field(..., description="Product or part name")
    quantity: int = Field(..., description="Batch size / quantity requested")
    material: str = Field(..., description="Material specification (e.g. 6061 Aluminium)")
    process: str = Field(..., description="Manufacturing process required (e.g. CNC Machining)")
    finish: Optional[str] = Field(default=None, description="Required surface finish")
    deadline_days: Optional[int] = Field(default=None, description="Required lead time in days")
    budget_per_unit: Optional[float] = Field(default=None, description="Max budget per unit in USD")
    target_supplier: Optional[str] = Field(default=None, description="Optional target supplier to evaluate specifically")
    quality_requirements: Optional[str] = Field(default=None, description="Quality or inspection requirements")
    additional_requirements: Optional[str] = Field(default=None, description="Additional tooling or packaging specs")
    analysis_mode: Optional[str] = Field(default="memory_aware", description="Analysis mode: 'memory_aware' or 'baseline' (memory-blind)")

class EvidenceItem(BaseModel):
    """
    Recalled historical experience snippet with context.
    """
    experience_id: Optional[str] = None
    supplier: str
    experience: str
    outcome: str
    conditions: List[str] = Field(default_factory=list)
    notes: Optional[str] = None
    date: Optional[str] = None
    relevance_reason: Optional[str] = None

class ConditionComparison(BaseModel):
    """
    Side-by-side comparison of current RFQ vs historical successful and failed experiences.
    Highlights the decision-changing condition.
    """
    current_rfq: Dict[str, Any]
    successful_experience: Optional[Dict[str, Any]] = None
    failed_experience: Optional[Dict[str, Any]] = None
    decision_changing_condition: str

class SupplierEvaluation(BaseModel):
    """
    Individual supplier feasibility assessment based on historical evidence.
    Feasibility state: 'FEASIBLE', 'CONDITIONAL', or 'INSUFFICIENT EVIDENCE'.
    """
    supplier: str
    status: str = Field(..., description="Feasibility state: 'FEASIBLE', 'CONDITIONAL', or 'INSUFFICIENT EVIDENCE'")
    summary: str
    evidence_count: int = 0
    evidence: List[EvidenceItem] = Field(default_factory=list)
    learned_conditions: List[str] = Field(default_factory=list)
    risks: List[str] = Field(default_factory=list)
    required_verification: List[str] = Field(default_factory=list)
    last_known_outcome: Optional[str] = None
    decision_changing_condition: Optional[str] = None
    comparison: Optional[ConditionComparison] = None
    memory_value: List[str] = Field(default_factory=list, description="Specific value contributions added by persistent memory over baseline")

class HindsightStatus(BaseModel):
    """
    Hindsight memory engine status information.
    """
    is_connected: bool
    bank_id: str
    mode: str = Field(..., description="'LIVE HINDSIGHT' or 'HINDSIGHT MEMORY UNAVAILABLE (FALLBACK)'")
    recalled_count: int = 0
    relevant_count: int = 0
    message: str

class MultiSupplierAnalysisResponse(BaseModel):
    """
    Response schema for multi-supplier RFQ sourcing analysis.
    """
    rfq: RFQRequest
    evaluations: List[SupplierEvaluation]
    hindsight_status: HindsightStatus

# Backward compatibility alias for Phase 1 schemas
RFQAnalysisResponse = SupplierEvaluation


class OutcomeRecordRequest(BaseModel):
    """
    Schema for buyer to record actual supplier order outcome post-fulfillment.
    """
    supplier: str = Field(..., description="Supplier name")
    product: str = Field(..., description="Product name")
    quantity: int = Field(..., description="Fulfilled quantity")
    material: str = Field(..., description="Material spec")
    process: str = Field(..., description="Manufacturing process")
    finish: Optional[str] = None
    quoted_price: Optional[float] = None
    actual_price: Optional[float] = None
    promised_lead_time_days: Optional[int] = None
    actual_lead_time_days: Optional[int] = None
    quality_result: str = Field(..., description="passed, failed, conditional")
    outcome: str = Field(..., description="successful, failed, partially_successful")
    failure_reason: Optional[str] = None
    conditions: List[str] = Field(default_factory=list)
    buyer_notes: Optional[str] = None

class OutcomeRecordResponse(BaseModel):
    """
    Response confirming outcome retention into Hindsight persistent memory.
    """
    status: str
    hindsight_retained: bool
    experience_id: str
    retained_content: str
    learning_confirmation: str

class RetainRequest(BaseModel):
    experience: SupplierExperience

class RecallRequest(BaseModel):
    query: str
    supplier_filter: Optional[str] = None
    max_results: int = 5

class ReflectRequest(BaseModel):
    query: str
    supplier_filter: Optional[str] = None
