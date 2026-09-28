from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from app.services.supplier_memory_service import supplier_memory_service

router = APIRouter(prefix="/api/suppliers", tags=["Suppliers"])

@router.get("", response_model=List[Dict[str, Any]])
def list_suppliers():
    """
    Returns list of all suppliers with experience counts and historical capabilities.
    """
    return supplier_memory_service.get_all_suppliers()

@router.get("/{supplier_name}", response_model=Dict[str, Any])
def get_supplier_detail(supplier_name: str):
    """
    Returns detailed historical experience view, success/failure patterns, and learned conditions for a supplier.
    """
    return supplier_memory_service.get_supplier_detail(supplier_name)
