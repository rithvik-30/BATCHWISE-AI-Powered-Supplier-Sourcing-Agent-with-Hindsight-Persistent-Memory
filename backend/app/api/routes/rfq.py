from fastapi import APIRouter, HTTPException
from app.schemas.rfq import RFQRequest, MultiSupplierAnalysisResponse
from app.services.supplier_memory_service import supplier_memory_service

router = APIRouter(prefix="/api/rfq", tags=["RFQ Analysis"])

@router.post("/analyze", response_model=MultiSupplierAnalysisResponse)
def analyze_rfq(rfq: RFQRequest):
    """
    Performs multi-supplier condition-aware experience recall and feasibility analysis for an incoming RFQ.
    """
    try:
        analysis = supplier_memory_service.analyze_rfq_multi_supplier(rfq)
        return analysis
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
