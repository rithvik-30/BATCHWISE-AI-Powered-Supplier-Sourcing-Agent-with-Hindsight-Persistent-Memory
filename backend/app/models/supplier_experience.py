from typing import List, Optional
from pydantic import BaseModel, Field

class SupplierExperience(BaseModel):
    """
    Central domain model representing a single historical sourcing experience with a supplier.
    Captures operational conditions, prices, lead times, outcomes, and failure reasons.
    """
    id: Optional[str] = Field(default=None, description="Unique identifier for the experience record")
    supplier: str = Field(..., description="Name of the supplier (e.g. Alpha Manufacturing)")
    product: str = Field(..., description="Name or description of the product/part ordered")
    quantity: int = Field(..., description="Order quantity / batch size")
    material: str = Field(..., description="Material spec (e.g. 6061 Aluminium)")
    process: str = Field(..., description="Manufacturing process (e.g. CNC Machining)")
    finish: Optional[str] = Field(default=None, description="Surface finish required or applied")
    quoted_price: Optional[float] = Field(default=None, description="Initial quoted price in USD")
    actual_price: Optional[float] = Field(default=None, description="Final actual price charged in USD")
    promised_lead_time_days: Optional[int] = Field(default=None, description="Promised lead time in calendar days")
    actual_lead_time_days: Optional[int] = Field(default=None, description="Actual lead time taken in calendar days")
    conditions: List[str] = Field(default_factory=list, description="List of operating conditions present during order")
    quality_result: Optional[str] = Field(default=None, description="Quality outcome (e.g. passed, rejected)")
    outcome: str = Field(..., description="Overall order outcome: successful, failed, partially_successful")
    failure_reason: Optional[str] = Field(default=None, description="Explicit failure reason if outcome was failed")
    notes: Optional[str] = Field(default=None, description="Qualitative observations or notes")
    date: Optional[str] = Field(default=None, description="ISO date string of order completion or attempt")

    def to_natural_language(self) -> str:
        """
        Converts structured experience into dense, condition-aware natural language for Hindsight retention.
        Preserves supplier name, product, quantity, conditions, expected vs actual metrics, and outcome rationale.
        """
        finish_str = f" with {self.finish} finish" if self.finish else ""
        price_str = f" Quoted ${self.quoted_price:.2f}, actual ${self.actual_price:.2f}." if self.quoted_price and self.actual_price else ""
        lead_str = f" Promised lead time: {self.promised_lead_time_days} days, actual: {self.actual_lead_time_days} days." if self.promised_lead_time_days and self.actual_lead_time_days else ""
        conditions_str = f" Operating conditions: {', '.join(self.conditions)}." if self.conditions else ""
        outcome_str = f" Outcome: {self.outcome.upper()}."
        failure_str = f" Failure reason: {self.failure_reason}." if self.failure_reason else ""
        notes_str = f" Notes: {self.notes}" if self.notes else ""

        return (
            f"Supplier '{self.supplier}' fulfilled/attempted an order of {self.quantity} units of '{self.product}' "
            f"made of {self.material} via {self.process}{finish_str}.{price_str}{lead_str}"
            f"{conditions_str}{outcome_str}{failure_str}{notes_str}"
        )
