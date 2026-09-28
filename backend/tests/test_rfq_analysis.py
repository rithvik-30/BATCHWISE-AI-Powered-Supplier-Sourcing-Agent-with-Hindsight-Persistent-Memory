import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.schemas.rfq import RFQRequest
from app.services.supplier_memory_service import supplier_memory_service

def test_rfq_analysis_unknown_when_no_evidence():
    """Test 6: RFQ analysis does not claim confidence when there is no evidence."""
    rfq = RFQRequest(
        product="Quantum Superconducting Substrate",
        quantity=5,
        material="Exotic Metamaterial",
        process="Cryogenic Micro-Etching",
        target_supplier="Unknown Quantum Fab Inc"
    )
    res = supplier_memory_service.analyze_rfq(rfq)
    assert res.status == "unknown"
    assert res.supplier == "Unknown Quantum Fab Inc"
    assert len(res.evidence) == 0
    assert "Insufficient" in res.summary

def test_alpha_demo_scenario_returns_both_experiences():
    """
    Test 7: Critical Demo Scenario evaluation.
    RFQ: 75 Aluminium Enclosures, 6061 Aluminium, CNC Machining, Black Anodized.
    Must recall:
    1. Successful 60-unit experience (stock material, standard tooling)
    2. Failed 80-unit experience (custom tooling required)
    Must evaluate status as CONDITIONAL based on tooling/material conditions.
    """
    rfq = RFQRequest(
        product="Aluminium Enclosure",
        quantity=75,
        material="6061 Aluminium",
        process="CNC Machining",
        finish="Black Anodized",
        deadline_days=14,
        budget_per_unit=1500,
        target_supplier="Alpha Manufacturing"
    )
    res = supplier_memory_service.analyze_rfq(rfq)
    
    assert res.status == "conditional"
    assert res.supplier == "Alpha Manufacturing"
    assert len(res.evidence) >= 2

    outcomes = [e.outcome for e in res.evidence]
    assert "successful" in outcomes
    assert "failed" in outcomes

    # Verify learned conditions and risks
    assert any("tooling" in cond for cond in res.learned_conditions) or len(res.learned_conditions) > 0
    assert any("tooling" in r.lower() or "custom" in r.lower() for r in res.risks) or len(res.risks) > 0

    # Verify required verification actions
    assert len(res.required_verification) > 0
    assert any("tooling" in v.lower() for v in res.required_verification)
