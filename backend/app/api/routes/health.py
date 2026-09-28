from fastapi import APIRouter
from app.services.hindsight_service import hindsight_service

router = APIRouter()

@router.get("/health")
def health_check():
    """
    Service health check endpoint.
    Reports API operational status and Hindsight integration connection status.
    """
    return {
        "status": "ok",
        "service": "BATCHWISE API",
        "version": "1.0.0",
        "hindsight_connected": hindsight_service.is_connected,
        "hindsight_bank_id": hindsight_service.bank_id,
        "hindsight_url": hindsight_service.api_url
    }
