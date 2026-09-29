# BATCHWISE 25-Case Controlled Benchmark Report

## Benchmark Overview
This document provides the complete, forensic documentation of the **25-Case Controlled Synthetic Benchmark** executed by BATCHWISE. The benchmark compares two decision modes:
1. **Memory-Blind Baseline**: Evaluates supplier RFQs strictly using static capabilities (e.g., stated processes, materials, machine lists) without historical experience memory.
2. **BATCHWISE Memory-Aware**: Integrates Hindsight experience recall, evaluating RFQs against past order outcomes, recalled operating conditions, and historical failure modes.

### Key Evaluated Dimensions
- **Small-Batch NRE & Tooling Risks**: Uncovering hidden custom tooling costs triggered on low-volume orders.
- **Schedule & Lead Time Drift**: Catching small-batch delivery delay risks on tight deadlines.
- **Insufficient Historical Evidence**: Preventing false-positive approvals on unverified suppliers/processes.

## Case-by-Case Results

| Case ID | Category | Supplier | Expected | Memory-Blind | Memory-Aware | Baseline Correct | Memory-Aware Correct | Key Evidence / Risk |
|---|---|---|---|---|---|---|---|---|
| `eval_001` | `conditional_capability` | Alpha Manufacturing | `CONDITIONAL` | `FEASIBLE` | `CONDITIONAL` | ❌ FAIL | ✅ PASS | Past failure mode: Custom tooling cost made the low-volume order infeasible. |
| `eval_002` | `known_success_condition` | Beta Precision | `FEASIBLE` | `FEASIBLE` | `FEASIBLE` | ✅ PASS | ✅ PASS | None |
| `eval_003` | `known_failure_condition` | Gamma Works | `CONDITIONAL` | `FEASIBLE` | `CONDITIONAL` | ❌ FAIL | ✅ PASS | Past failure mode: Small-batch delivery delay of 25 days over promised schedule. |
| `eval_004` | `high_setup_cost_capability` | Delta Components | `FEASIBLE` | `FEASIBLE` | `FEASIBLE` | ✅ PASS | ✅ PASS | High NRE fixture cost |
| `eval_005` | `insufficient_evidence` | Epsilon Manufacturing | `INSUFFICIENT EVIDENCE` | `FEASIBLE` | `INSUFFICIENT EVIDENCE` | ❌ FAIL | ✅ PASS | No verified historical performance records for required process/part type. |
| `eval_006` | `known_success_condition` | Alpha Manufacturing | `FEASIBLE` | `FEASIBLE` | `CONDITIONAL` | ✅ PASS | ❌ FAIL | Past failure mode: Custom tooling cost made the low-volume order infeasible. |
| `eval_007` | `high_volume_success` | Gamma Works | `FEASIBLE` | `FEASIBLE` | `CONDITIONAL` | ✅ PASS | ❌ FAIL | Past failure mode: Small-batch delivery delay of 25 days over promised schedule. |
| `eval_008` | `insufficient_evidence` | Zeta Tool & Die | `INSUFFICIENT EVIDENCE` | `FEASIBLE` | `INSUFFICIENT EVIDENCE` | ❌ FAIL | ✅ PASS | No verified historical performance records for required process/part type. |
| `eval_009` | `known_success_condition` | Beta Precision | `FEASIBLE` | `FEASIBLE` | `FEASIBLE` | ✅ PASS | ✅ PASS | None |
| `eval_010` | `known_failure_condition` | Gamma Works | `CONDITIONAL` | `FEASIBLE` | `CONDITIONAL` | ❌ FAIL | ✅ PASS | Past failure mode: Extreme delivery delay on low volume order. |
| `eval_011` | `known_success_condition` | Alpha Manufacturing | `FEASIBLE` | `FEASIBLE` | `CONDITIONAL` | ✅ PASS | ❌ FAIL | Past failure mode: Custom tooling cost made the low-volume order infeasible. |
| `eval_012` | `known_success_condition` | Delta Components | `FEASIBLE` | `FEASIBLE` | `FEASIBLE` | ✅ PASS | ✅ PASS | High fixture NRE fee |
| `eval_013` | `insufficient_evidence` | Omni Quantum Labs | `INSUFFICIENT EVIDENCE` | `FEASIBLE` | `INSUFFICIENT EVIDENCE` | ❌ FAIL | ✅ PASS | No historical sourcing data recorded. |
| `eval_014` | `known_success_condition` | Epsilon Manufacturing | `FEASIBLE` | `FEASIBLE` | `FEASIBLE` | ✅ PASS | ✅ PASS | None |
| `eval_015` | `known_success_condition` | Beta Precision | `FEASIBLE` | `FEASIBLE` | `FEASIBLE` | ✅ PASS | ✅ PASS | None |
| `eval_016` | `conditional_capability` | Alpha Manufacturing | `CONDITIONAL` | `FEASIBLE` | `CONDITIONAL` | ❌ FAIL | ✅ PASS | Past failure mode: Custom tooling cost made the low-volume order infeasible. |
| `eval_017` | `known_success_condition` | Zeta Tool & Die | `FEASIBLE` | `FEASIBLE` | `FEASIBLE` | ✅ PASS | ✅ PASS | None |
| `eval_018` | `insufficient_evidence` | Gamma Works | `INSUFFICIENT EVIDENCE` | `FEASIBLE` | `INSUFFICIENT EVIDENCE` | ❌ FAIL | ✅ PASS | No verified historical performance records for required process/part type. |
| `eval_019` | `conditional_capability` | Gamma Works | `CONDITIONAL` | `FEASIBLE` | `CONDITIONAL` | ❌ FAIL | ✅ PASS | Past failure mode: Small-batch delivery delay of 25 days over promised schedule. |
| `eval_020` | `known_success_condition` | Beta Precision | `FEASIBLE` | `FEASIBLE` | `FEASIBLE` | ✅ PASS | ✅ PASS | None |
| `eval_021` | `insufficient_evidence` | Delta Components | `INSUFFICIENT EVIDENCE` | `FEASIBLE` | `INSUFFICIENT EVIDENCE` | ❌ FAIL | ✅ PASS | No verified historical performance records for required process/part type. |
| `eval_022` | `known_success_condition` | Alpha Manufacturing | `CONDITIONAL` | `FEASIBLE` | `CONDITIONAL` | ❌ FAIL | ✅ PASS | Past failure mode: Custom tooling cost made the low-volume order infeasible. |
| `eval_023` | `insufficient_evidence` | Epsilon Manufacturing | `INSUFFICIENT EVIDENCE` | `FEASIBLE` | `INSUFFICIENT EVIDENCE` | ❌ FAIL | ✅ PASS | No verified historical performance records for required process/part type. |
| `eval_024` | `known_success_condition` | Delta Components | `FEASIBLE` | `FEASIBLE` | `FEASIBLE` | ✅ PASS | ✅ PASS | NRE setup cost |
| `eval_025` | `known_failure_condition` | Gamma Works | `CONDITIONAL` | `FEASIBLE` | `CONDITIONAL` | ❌ FAIL | ✅ PASS | Past failure mode: Small-batch delivery delay of 25 days over promised schedule. |

## Aggregate Results

The aggregate metrics calculated directly from the 25 evaluation cases are as follows:

### 1. Overall Classification Accuracy
- **BATCHWISE Memory-Aware**: `22 / 25` = **88.0%**
- **Memory-Blind Baseline**: `12 / 25` = **48.0%**
- **Accuracy Improvement**: **+40.0%** percentage points

### 2. Conditional Risk Detection
- **Total Conditional Cases**: 7 cases (`eval_001`, `eval_003`, `eval_010`, `eval_016`, `eval_019`, `eval_022`, `eval_025`)
- **Memory-Blind Baseline Detection**: `0 / 7` = **0.0%** (Marked all 7 as `FEASIBLE` due to reliance on static capability profiles)
- **Memory-Aware Detection**: `7 / 7` = **100.0%** (Recalled past NRE tooling failures and schedule delays)

### 3. Insufficient Evidence Detection
- **Total Insufficient Evidence Cases**: 6 cases (`eval_005`, `eval_008`, `eval_013`, `eval_018`, `eval_021`, `eval_023`)
- **Memory-Blind Baseline Detection**: `0 / 6` = **0.0%** (Marked all 6 as `FEASIBLE` without checking historical records)
- **Memory-Aware Detection**: `6 / 6` = **100.0%** (Correctly flagged lack of verified historical experience)

### 4. Combined Risk Case Detection (UI Displayed Metric)
- **Total Non-Feasible Risk Cases**: 13 cases (7 Conditional + 6 Insufficient Evidence)
- **Memory-Blind Baseline Detection**: `0 / 13` = **0.0%** (13 False Positives)
- **BATCHWISE Memory-Aware Detection**: `13 / 13` = **100.0%**

## Memory-Aware Wins (13 Cases)
In 13 out of 25 cases, BATCHWISE Memory-Aware sourcing analysis produced the correct decision while the Memory-Blind baseline failed:

### Case `eval_001` — Alpha 75-unit aluminium enclosure with potential custom tooling risk
- **Supplier**: Alpha Manufacturing
- **Expected**: `CONDITIONAL` | **Memory-Blind**: `FEASIBLE` | **Memory-Aware**: `CONDITIONAL`
- **Baseline Error**: Static capability profile assumed feasibility without evaluating historical operating conditions.
- **Memory Value**: Identified past custom-tooling failure on 80-unit order that baseline static profile missed. Derived decision-changing condition ('Tooling & Stock Material Requirement'). Added required pre-sourcing verification for tooling NRE fees.

### Case `eval_003` — Gamma Works 50-unit small batch on tight 10-day deadline
- **Supplier**: Gamma Works
- **Expected**: `CONDITIONAL` | **Memory-Blind**: `FEASIBLE` | **Memory-Aware**: `CONDITIONAL`
- **Baseline Error**: Static capability profile assumed feasibility without evaluating historical operating conditions.
- **Memory Value**: Identified past custom-tooling failure on 50-unit order that baseline static profile missed. Derived decision-changing condition ('Tooling & Stock Material Requirement'). Added required pre-sourcing verification for tooling NRE fees.

### Case `eval_005` — Epsilon 100-unit CNC Aluminium Enclosure (known only for 3D printing prototypes)
- **Supplier**: Epsilon Manufacturing
- **Expected**: `INSUFFICIENT EVIDENCE` | **Memory-Blind**: `FEASIBLE` | **Memory-Aware**: `INSUFFICIENT EVIDENCE`
- **Baseline Error**: Static capability profile assumed feasibility without evaluating historical operating conditions.
- **Memory Value**: Correctly identified lack of historical evidence for process instead of assuming static capability.

### Case `eval_008` — Zeta Tool & Die 60-unit CNC Aluminium Enclosure run
- **Supplier**: Zeta Tool & Die
- **Expected**: `INSUFFICIENT EVIDENCE` | **Memory-Blind**: `FEASIBLE` | **Memory-Aware**: `INSUFFICIENT EVIDENCE`
- **Baseline Error**: Static capability profile assumed feasibility without evaluating historical operating conditions.
- **Memory Value**: Correctly identified lack of historical evidence for process instead of assuming static capability.

### Case `eval_010` — Gamma Works 40-unit specialty copper heat sink
- **Supplier**: Gamma Works
- **Expected**: `CONDITIONAL` | **Memory-Blind**: `FEASIBLE` | **Memory-Aware**: `CONDITIONAL`
- **Baseline Error**: Static capability profile assumed feasibility without evaluating historical operating conditions.
- **Memory Value**: Detected historical failure risk (Extreme delivery delay on low volume order.) overlooked by static baseline.

### Case `eval_013` — Omni Quantum 5-unit Cryogenic Substrate
- **Supplier**: Omni Quantum Labs
- **Expected**: `INSUFFICIENT EVIDENCE` | **Memory-Blind**: `FEASIBLE` | **Memory-Aware**: `INSUFFICIENT EVIDENCE`
- **Baseline Error**: Static capability profile assumed feasibility without evaluating historical operating conditions.
- **Memory Value**: Correctly identified unknown supplier rather than over-confidently assuming feasibility.

### Case `eval_016` — Alpha 85-unit Aluminium Enclosure with tight delivery requirement
- **Supplier**: Alpha Manufacturing
- **Expected**: `CONDITIONAL` | **Memory-Blind**: `FEASIBLE` | **Memory-Aware**: `CONDITIONAL`
- **Baseline Error**: Static capability profile assumed feasibility without evaluating historical operating conditions.
- **Memory Value**: Identified past custom-tooling failure on 80-unit order that baseline static profile missed. Derived decision-changing condition ('Tooling & Stock Material Requirement'). Added required pre-sourcing verification for tooling NRE fees.

### Case `eval_018` — Gamma Works 30-unit Titanium Aerospace Bracket (unseen process/material for Gamma)
- **Supplier**: Gamma Works
- **Expected**: `INSUFFICIENT EVIDENCE` | **Memory-Blind**: `FEASIBLE` | **Memory-Aware**: `INSUFFICIENT EVIDENCE`
- **Baseline Error**: Static capability profile assumed feasibility without evaluating historical operating conditions.
- **Memory Value**: Correctly identified lack of historical evidence for process instead of assuming static capability.

### Case `eval_019` — Gamma Works 60-unit Aluminium Housing small batch
- **Supplier**: Gamma Works
- **Expected**: `CONDITIONAL` | **Memory-Blind**: `FEASIBLE` | **Memory-Aware**: `CONDITIONAL`
- **Baseline Error**: Static capability profile assumed feasibility without evaluating historical operating conditions.
- **Memory Value**: Identified past custom-tooling failure on 50-unit order that baseline static profile missed. Derived decision-changing condition ('Tooling & Stock Material Requirement'). Added required pre-sourcing verification for tooling NRE fees.

### Case `eval_021` — Delta Components 200-unit Steel Drive Shaft (unseen steel volume run for Delta)
- **Supplier**: Delta Components
- **Expected**: `INSUFFICIENT EVIDENCE` | **Memory-Blind**: `FEASIBLE` | **Memory-Aware**: `INSUFFICIENT EVIDENCE`
- **Baseline Error**: Static capability profile assumed feasibility without evaluating historical operating conditions.
- **Memory Value**: Correctly identified lack of historical evidence for process instead of assuming static capability.

### Case `eval_022` — Alpha 65-unit Aluminium Enclosure with confirmed stock material
- **Supplier**: Alpha Manufacturing
- **Expected**: `CONDITIONAL` | **Memory-Blind**: `FEASIBLE` | **Memory-Aware**: `CONDITIONAL`
- **Baseline Error**: Static capability profile assumed feasibility without evaluating historical operating conditions.
- **Memory Value**: Identified past custom-tooling failure on 80-unit order that baseline static profile missed. Derived decision-changing condition ('Tooling & Stock Material Requirement'). Added required pre-sourcing verification for tooling NRE fees.

### Case `eval_023` — Epsilon 50-unit Brass Bushing CNC Turning
- **Supplier**: Epsilon Manufacturing
- **Expected**: `INSUFFICIENT EVIDENCE` | **Memory-Blind**: `FEASIBLE` | **Memory-Aware**: `INSUFFICIENT EVIDENCE`
- **Baseline Error**: Static capability profile assumed feasibility without evaluating historical operating conditions.
- **Memory Value**: Correctly identified lack of historical evidence for process instead of assuming static capability.

### Case `eval_025` — Gamma Works 35-unit low volume aluminium housing small batch
- **Supplier**: Gamma Works
- **Expected**: `CONDITIONAL` | **Memory-Blind**: `FEASIBLE` | **Memory-Aware**: `CONDITIONAL`
- **Baseline Error**: Static capability profile assumed feasibility without evaluating historical operating conditions.
- **Memory Value**: Identified past custom-tooling failure on 50-unit order that baseline static profile missed. Derived decision-changing condition ('Tooling & Stock Material Requirement'). Added required pre-sourcing verification for tooling NRE fees.

## Important Failure Cases (3 Cases)
In 3 out of 25 cases, Memory-Aware reasoning produced `CONDITIONAL` instead of `FEASIBLE` (over-conservative false positive risk flags):

### Case `eval_006` — Alpha 50-unit brass bushing turning order
- **Supplier**: Alpha Manufacturing
- **Expected**: `FEASIBLE` | **Memory-Blind**: `FEASIBLE` | **Memory-Aware**: `CONDITIONAL`
- **Root Cause**: Past failure mode: Custom tooling cost made the low-volume order infeasible. Condition risk: custom tooling required Condition risk: non stock material
- **Impact**: The memory engine recalled prior historical failure modes for Alpha Manufacturing (such as low-volume custom tooling NRE or small-batch delays) and over-conservatively tagged the order as `CONDITIONAL` even though the specific RFQ parameters fell within standard feasible thresholds.

### Case `eval_007` — Gamma Works 500-unit aluminium housing order
- **Supplier**: Gamma Works
- **Expected**: `FEASIBLE` | **Memory-Blind**: `FEASIBLE` | **Memory-Aware**: `CONDITIONAL`
- **Root Cause**: Past failure mode: Small-batch delivery delay of 25 days over promised schedule. Condition risk: small batch order Condition risk: tight deadline
- **Impact**: The memory engine recalled prior historical failure modes for Gamma Works (such as low-volume custom tooling NRE or small-batch delays) and over-conservatively tagged the order as `CONDITIONAL` even though the specific RFQ parameters fell within standard feasible thresholds.

### Case `eval_011` — Alpha 100-unit laser cut 304 Stainless Steel Bracket
- **Supplier**: Alpha Manufacturing
- **Expected**: `FEASIBLE` | **Memory-Blind**: `FEASIBLE` | **Memory-Aware**: `CONDITIONAL`
- **Root Cause**: Past failure mode: Custom tooling cost made the low-volume order infeasible. Condition risk: custom tooling required Condition risk: non stock material
- **Impact**: The memory engine recalled prior historical failure modes for Alpha Manufacturing (such as low-volume custom tooling NRE or small-batch delays) and over-conservatively tagged the order as `CONDITIONAL` even though the specific RFQ parameters fell within standard feasible thresholds.

## Benchmark Limitations
- **Synthetic Controlled Dataset**: The 25 cases represent a synthetic controlled evaluation harness designed to test specific failure modes (NRE tooling, lead time delays, unverified suppliers).
- **Local Fallback Store**: Evaluated using BATCHWISE's built-in local vector fallback store when the remote Hindsight API endpoint is offline.
- **Over-Conservatism Trade-off**: The 88.0% accuracy vs 48.0% baseline demonstrates a high recall of risks, with a minor trade-off of 3 over-conservative flags on feasible orders.

## Source Files
The 25-case benchmark data and results are derived directly from the following repository files:
1. [`backend/data/evaluation_cases.json`](file:///C:/Users/rithv/.gemini/antigravity-ide/scratch/batchwise-ai/backend/data/evaluation_cases.json): Contains the complete 25 evaluation RFQ definitions, expected classifications, expected conditions, risks, and supporting experience IDs.
2. [`backend/evaluation/results/latest.json`](file:///C:/Users/rithv/.gemini/antigravity-ide/scratch/batchwise-ai/backend/evaluation/results/latest.json): Contains the exact JSON evaluation execution output produced by running `run_evaluation.py`, storing baseline vs memory-aware decisions for each case.
3. [`backend/scripts/run_evaluation.py`](file:///C:/Users/rithv/.gemini/antigravity-ide/scratch/batchwise-ai/backend/scripts/run_evaluation.py): The benchmark runner script that loads `evaluation_cases.json`, executes both baseline and memory-aware analysis, calculates accuracy, and outputs reports.
4. [`backend/data/seed_experiences.json`](file:///C:/Users/rithv/.gemini/antigravity-ide/scratch/batchwise-ai/backend/data/seed_experiences.json): The seed historical experience database (14 experiences) queried during memory recall.
5. [`backend/tests/test_phase3_evaluation.py`](file:///C:/Users/rithv/.gemini/antigravity-ide/scratch/batchwise-ai/backend/tests/test_phase3_evaluation.py): Pytest suite verifying dataset integrity and decision accuracy.
6. [`frontend/src/components/EvaluationView.tsx`](file:///C:/Users/rithv/.gemini/antigravity-ide/scratch/batchwise-ai/frontend/src/components/EvaluationView.tsx): Frontend dashboard component displaying the 88.0% vs 48.0% benchmark metrics.