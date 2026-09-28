import sys
import os
import json

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.schemas.rfq import RFQRequest, OutcomeRecordRequest
from app.services.supplier_memory_service import supplier_memory_service
from app.services.hindsight_service import hindsight_service

def test_evaluation_cases_dataset_loading():
    """Test 1: Synthetic evaluation benchmark dataset loads cleanly."""
    current_dir = os.path.dirname(os.path.abspath(__file__))
    data_path = os.path.join(current_dir, "..", "data", "evaluation_cases.json")
    assert os.path.exists(data_path)
    with open(data_path, "r", encoding="utf-8") as f:
        cases = json.load(f)
    assert len(cases) >= 20

def test_memory_blind_vs_memory_aware_analysis():
    """Test 2: Memory-Blind Baseline vs Memory-Aware mode behavior."""
    rfq_dict = {
        "product": "Aluminium Enclosure",
        "quantity": 75,
        "material": "6061 Aluminium",
        "process": "CNC Machining",
        "finish": "Black Anodized",
        "target_supplier": "Alpha Manufacturing"
    }

    # Baseline Mode (Memory-Blind)
    rfq_baseline = RFQRequest(**rfq_dict, analysis_mode="baseline")
    res_baseline = supplier_memory_service.evaluate_single_supplier("Alpha Manufacturing", rfq_baseline)
    assert res_baseline.evidence_count == 0
    assert len(res_baseline.learned_conditions) == 0

    # Memory-Aware Mode
    rfq_memory = RFQRequest(**rfq_dict, analysis_mode="memory_aware")
    res_memory = supplier_memory_service.evaluate_single_supplier("Alpha Manufacturing", rfq_memory)
    assert res_memory.evidence_count >= 2
    assert res_memory.status == "CONDITIONAL"
    assert len(res_memory.memory_value) > 0

def test_before_and_after_learning_experiment():
    """
    Test 3: Before / After Learning Proof.
    Verifies that logging a new post-order outcome for Alpha Manufacturing
    directly enriches subsequent RFQ evaluation with the newly retained experience.
    """
    rfq = RFQRequest(
        product="Aluminium Enclosure",
        quantity=75,
        material="6061 Aluminium",
        process="CNC Machining",
        finish="Black Anodized",
        target_supplier="Alpha Manufacturing",
        analysis_mode="memory_aware"
    )

    # BEFORE LEARNING
    before_eval = supplier_memory_service.evaluate_single_supplier("Alpha Manufacturing", rfq)
    before_evidence_count = before_eval.evidence_count

    # RECORD NEW OUTCOME
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
        buyer_notes="Phase 3 Proof Test: 75-unit order completed successfully."
    )
    outcome_res = supplier_memory_service.record_supplier_outcome(outcome_req)
    assert outcome_res.status == "success"

    # AFTER LEARNING
    after_eval = supplier_memory_service.evaluate_single_supplier("Alpha Manufacturing", rfq)
    assert after_eval.evidence_count > before_evidence_count
    
    # Newly retained experience recalled in evidence list
    recalled_75_unit = any("75-unit order" in e.experience for e in after_eval.evidence)
    assert recalled_75_unit is True

def test_insufficient_evidence_behavior():
    """Test 4: Correct insufficient evidence classification for unknown processes/suppliers."""
    rfq = RFQRequest(
        product="Quantum Cryo Substrate",
        quantity=5,
        material="Metamaterial B-4",
        process="Cryogenic Micro-Etching",
        target_supplier="Omni Quantum Labs",
        analysis_mode="memory_aware"
    )
    eval_res = supplier_memory_service.evaluate_single_supplier("Omni Quantum Labs", rfq)
    assert eval_res.status == "INSUFFICIENT EVIDENCE"
    assert eval_res.evidence_count == 0
    assert "Insufficient evidence" in eval_res.summary
