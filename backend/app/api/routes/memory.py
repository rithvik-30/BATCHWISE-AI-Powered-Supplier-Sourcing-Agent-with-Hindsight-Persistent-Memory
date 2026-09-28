from fastapi import APIRouter, HTTPException
from app.schemas.rfq import (
    RetainRequest,
    RecallRequest,
    ReflectRequest,
    OutcomeRecordRequest,
    OutcomeRecordResponse
)
from app.services.hindsight_service import hindsight_service
from app.services.supplier_memory_service import supplier_memory_service

router = APIRouter(prefix="/api/memory", tags=["Memory"])

@router.get("/status")
def get_memory_status():
    """
    Returns Hindsight memory engine connection status, mode, and bank info.
    """
    return hindsight_service.get_memory_status()

@router.post("/test-live")
def run_live_test():
    """
    Executes an actual live Hindsight integration test (retain, recall, reflect) and reports PASS/FAIL.
    """
    return hindsight_service.run_live_hindsight_test()

@router.post("/retain")
def retain_experience(req: RetainRequest):
    """
    Retains a new supplier experience in memory.
    """
    try:
        res = supplier_memory_service.retain_new_experience(req.experience)
        return res
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/outcome", response_model=OutcomeRecordResponse)
def record_outcome(req: OutcomeRecordRequest):
    """
    Records a buyer post-order outcome and retains the experience into Hindsight persistent memory.
    """
    try:
        res = supplier_memory_service.record_supplier_outcome(req)
        return res
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/recall")
def recall_memory(req: RecallRequest):
    """
    Recalls historical supplier experiences relevant to a query string.
    """
    try:
        res = hindsight_service.recall_supplier_experiences(
            query=req.query,
            supplier_filter=req.supplier_filter,
            max_results=req.max_results
        )
        return res
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/reflect")
def reflect_memory(req: ReflectRequest):
    """
    Synthesizes insights over stored supplier memories using Hindsight reflect.
    """
    try:
        res = hindsight_service.reflect_on_supplier_experiences(
            query=req.query,
            context=req.supplier_filter
        )
        return res
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
