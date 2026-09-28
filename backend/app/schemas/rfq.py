from typing import List, Optional
from pydantic import BaseModel, Field
from app.models.supplier_experience import SupplierExperience

class RFQRequest(BaseModel):
    """
    Schema for a incoming Request for Quote (RFQ).
    """
    product: str = Field(..., description="Product or part name")
    quantity: int = Field(..., description="Batch size / quantity requested")
    material: str = Field(..., description="Material specification (e.g. 6061 Aluminium)")
    process: str = Field(..., description="Manufacturing process required (e.g. CNC Machining)")
    finish: Optional[str] = Field(default=None, description="Required surface finish")
    deadline_days: Optional[int] = Field(default=None, description="Required lead time in days")
    budget_per_unit: Optional[float] = Field(default=None, description="Max budget per unit in USD")
    target_supplier: Optional[str] = Field(default=None, description="Optional target supplier to evaluate specifically")

class EvidenceItem(BaseModel):
    """
    Individual evidence snippet or recalled experience reference.
    """
    experience_id: Optional[str] = None
    supplier: str
    experience: str
    outcome: str
    conditions: List[str] = Field(default_factory=list)
    relevance_score: Optional[float] = None
    notes: Optional[str] = None

class RFQAnalysisResponse(BaseModel):
    """
    Condition-aware supplier evaluation response.
    Status can be 'feasible', 'conditional', or 'unknown'.
    """
    status: str = Field(..., description="Feasibility status: 'feasible', 'conditional', or 'unknown'")
    supplier: str = Field(..., description="Evaluated supplier name")
    summary: str = Field(..., description="Executive summary of historical experience and recommendation")
    evidence: List[EvidenceItem] = Field(default_factory=list, description="Recalled historical experience evidence")
    learned_conditions: List[str] = Field(default_factory=list, description="Key operating conditions associated with success")
    risks: List[str] = Field(default_factory=list, description="Identified risk factors based on past failures/delays")
    required_verification: List[str] = Field(default_factory=list, description="Actionable verification checks required prior to sourcing")

class RetainRequest(BaseModel):
    experience: SupplierExperience

class RecallRequest(BaseModel):
    query: str
    supplier_filter: Optional[str] = None
    max_results: int = 5

class ReflectRequest(BaseModel):
    query: str
    supplier_filter: Optional[str] = None
