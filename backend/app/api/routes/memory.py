from fastapi import APIRouter, HTTPException
from app.schemas.rfq import RetainRequest, RecallRequest, ReflectRequest
from app.services.hindsight_service import hindsight_service
from app.services.supplier_memory_service import supplier_memory_service

router = APIRouter(prefix="/api/memory", tags=["Memory"])

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
