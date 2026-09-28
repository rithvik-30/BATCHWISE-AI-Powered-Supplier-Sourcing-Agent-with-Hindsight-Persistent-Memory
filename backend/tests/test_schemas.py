import sys
import os
import pytest

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.models.supplier_experience import SupplierExperience
from app.services.supplier_memory_service import supplier_memory_service

def test_supplier_experience_schema_validation():
    """Test 2: Supplier experience schema validates."""
    exp_data = {
        "id": "test_exp_01",
        "supplier": "Alpha Manufacturing",
        "product": "Aluminium Enclosure",
        "quantity": 60,
        "material": "6061 Aluminium",
        "process": "CNC Machining",
        "finish": "Black Anodized",
        "quoted_price": 1420.0,
        "actual_price": 1480.0,
        "promised_lead_time_days": 12,
        "actual_lead_time_days": 15,
        "conditions": ["stock_material_available", "standard_tooling"],
        "quality_result": "passed",
        "outcome": "successful",
        "notes": "Test experience"
    }
    exp = SupplierExperience(**exp_data)
    assert exp.supplier == "Alpha Manufacturing"
    assert exp.quantity == 60
    assert "stock_material_available" in exp.conditions
    
    nl_text = exp.to_natural_language()
    assert "Alpha Manufacturing" in nl_text
    assert "6061 Aluminium" in nl_text
    assert "SUCCESSFUL" in nl_text

def test_synthetic_data_loaded():
    """Test 3: Synthetic experience data loads."""
    assert len(supplier_memory_service.experiences) >= 10
    alpha_exps = [e for e in supplier_memory_service.experiences if e.supplier == "Alpha Manufacturing"]
    assert len(alpha_exps) >= 3
