import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.schemas.rfq import RFQRequest, OutcomeRecordRequest
from app.services.supplier_memory_service import supplier_memory_service
from app.services.hindsight_service import hindsight_service

def test_multi_supplier_analysis():
    """Test multi-supplier analysis across synthetic supplier catalog."""
    rfq = RFQRequest(
        product="Aluminium Enclosure",
        quantity=75,
        material="6061 Aluminium",
        process="CNC Machining",
        finish="Black Anodized",
        deadline_days=14,
        budget_per_unit=1500
    )
    res = supplier_memory_service.analyze_rfq_multi_supplier(rfq)
    assert len(res.evaluations) >= 5
    
    # Check Alpha Manufacturing status
    alpha_eval = next((e for e in res.evaluations if e.supplier == "Alpha Manufacturing"), None)
    assert alpha_eval is not None
    assert alpha_eval.status == "CONDITIONAL"
    assert alpha_eval.comparison is not None
    assert alpha_eval.comparison.decision_changing_condition != ""

    # Check Epsilon Manufacturing status (Insufficient evidence)
    epsilon_eval = next((e for e in res.evaluations if e.supplier == "Epsilon Manufacturing"), None)
    assert epsilon_eval is not None
    assert epsilon_eval.status == "INSUFFICIENT EVIDENCE"

def test_outcome_recording_and_closed_loop_learning():
    """
    Test Closed-Loop Learning Workflow:
    1. Submit RFQ #1 (75 units for Alpha Manufacturing).
    2. Record actual SUCCESSFUL outcome (75 units delivered successfully under standard tooling).
    3. Retain experience in Hindsight memory.
    4. Re-run RFQ #2 analysis.
    5. Verify newly retained experience is incorporated into supplier evaluation!
    """
    # 1. Record outcome for 75-unit order
    outcome_req = OutcomeRecordRequest(
        supplier="Alpha Manufacturing",
        product="Aluminium Enclosure",
        quantity=75,
        material="6061 Aluminium",
        process="CNC Machining",
        finish="Black Anodized",
        quoted_price=1500.0,
        actual_price=1500.0,
        promised_lead_time_days=14,
        actual_lead_time_days=12,
        quality_result="passed",
        outcome="successful",
        conditions=["stock_material_available", "standard_tooling"],
        buyer_notes="75 units delivered cleanly using standard tooling setup."
    )
    record_res = supplier_memory_service.record_supplier_outcome(outcome_req)
    assert record_res.status == "success"
    assert "Experience saved to BATCHWISE memory" in record_res.learning_confirmation

    # 2. Re-evaluate RFQ for Alpha Manufacturing
    rfq2 = RFQRequest(
        product="Aluminium Enclosure",
        quantity=75,
        material="6061 Aluminium",
        process="CNC Machining",
        finish="Black Anodized",
        deadline_days=14
    )
    analysis2 = supplier_memory_service.analyze_rfq_multi_supplier(rfq2)
    alpha_eval2 = next((e for e in analysis2.evaluations if e.supplier == "Alpha Manufacturing"), None)
    assert alpha_eval2 is not None
    # Newly retained 75-unit experience should now be present in evidence list!
    exp_75_found = any(e.experience and "75-unit order" in e.experience and e.outcome == "successful" for e in alpha_eval2.evidence)
    assert exp_75_found is True

def test_supplier_detail_view():
    """Test retrieving deep dive supplier detail."""
    detail = supplier_memory_service.get_supplier_detail("Beta Precision")
    assert detail["supplier"] == "Beta Precision"
    assert len(detail["experiences"]) >= 2
    assert len(detail["success_patterns"]) > 0

def test_memory_status():
    """Test memory status reporting."""
    status = hindsight_service.get_memory_status()
    assert "is_connected" in status
    assert "bank_id" in status
    assert "mode" in status
