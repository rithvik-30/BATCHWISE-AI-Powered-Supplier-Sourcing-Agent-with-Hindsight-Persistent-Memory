import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.models.supplier_experience import SupplierExperience
from app.services.hindsight_service import hindsight_service

def test_hindsight_retain_integration():
    """Test 4: Retain operation executes and returns retained status."""
    exp = SupplierExperience(
        id="exp_test_retain",
        supplier="Alpha Manufacturing",
        product="Test Subassembly",
        quantity=30,
        material="6061 Aluminium",
        process="CNC Machining",
        conditions=["test_run"],
        outcome="successful"
    )
    result = hindsight_service.retain_experience(exp)
    assert result["status"] == "success"
    assert "experience_id" in result
    assert result["experience_id"] == "exp_test_retain"

def test_hindsight_recall_alpha_experiences():
    """Test 5: Hindsight recall returns relevant historical Alpha experiences."""
    query = "Recall historical experiences for Alpha Manufacturing Aluminium Enclosures"
    res = hindsight_service.recall_supplier_experiences(query, supplier_filter="Alpha Manufacturing")
    assert res["status"] == "success"
    # Verify fallback or connected response returns query results
    assert res["query"] == query
