# BATCHWISE: Technical Article Source Brief
**An Evidence-Backed Technical Reference on Experience-Driven Sourcing with Hindsight Persistent Memory**

> **Document Status:** Forensic Research & Extraction Brief  
> **Source Base:** BATCHWISE Repository (`batchwise-ai`)  
> **Scope:** Ground-truth architectural, data, algorithmic, and benchmark extraction for technical authoring.  
> **Constraint Checklist:** Strictly repo-backed; no invented metrics; no unverified claims of production deployment or universal superiority; exact preservation of recorded benchmark numbers and mode values.

---

## 1. Executive Summary & Core Procurement Problem

Small-batch manufacturing procurement operates in a regime where static capability listings fail to predict fulfillment outcomes. Machine shops and contract manufacturers typically advertise comprehensive capabilities—listing equipment (e.g., 5-axis CNC mills, wire EDM, sheet metal lasers), supported materials (e.g., 6061-T6 aluminum, 304 stainless, C360 brass), and generic minimum order quantities (MOQs). 

However, in low-volume runs (typically 10 to 100 units), actual operational success is tightly coupled to transient operational conditions:
- **Tooling Amortization (NRE):** Custom tooling setup charges that are negligible over 10,000 units destroy unit economics at 60–80 units.
- **Raw Material Provenance:** Standard off-the-shelf bar stock allows rapid turnaround; non-stock mill runs trigger weeks of lead-time drift.
- **Shop-Floor Queue Prioritization:** High-mix low-volume orders are routinely de-prioritized behind high-volume production runs during capacity crunches.

When sourcing agents or procurement engineers evaluate suppliers solely on static directory listings or superficial quote comparison, they repeatedly step into identical failure modes. 

**Reference File:**
- [`README.md`](file:///C:/Users/rithv/.gemini/antigravity-ide/scratch/batchwise-ai/README.md#L9-L19)
- [`docs/architecture.md`](file:///C:/Users/rithv/.gemini/antigravity-ide/scratch/batchwise-ai/docs/architecture.md#L3-L5)

---

## 2. Why Static Supplier Profiles Are Insufficient

Static supplier profiles represent capabilities as binary boolean flags or unconditioned attribute sets (e.g., `has_5_axis_cnc: true`, `materials: ["Aluminium", "Brass"]`, `nominal_lead_time_days: 10`).

In small-batch manufacturing, this abstraction is fatally flawed for three structural reasons:
1. **Condition Blindness:** A supplier may be highly reliable for CNC machining of aluminum enclosures when using standard tooling and stock billets, yet consistently fail on the exact same part geometry if custom tooling or non-stock alloy grades are required.
2. **Batch-Size Non-Linearity:** Capability does not scale linearly downward. An enterprise machine shop configured for automotive runs of 5,000 parts possesses the physical machines to mill 25 brackets, but its operational overhead and queue policies lead to 200%+ lead-time drift on low-volume orders.
3. **Absence of Negative Memory:** Traditional supplier management systems (SRMs) record vendor approval status or static vendor ratings (e.g., 4.5/5.0 stars) without retaining the granular causal conditions that led to past part rejections or delivery delays.

**Reference File:**
- [`README.md`](file:///C:/Users/rithv/.gemini/antigravity-ide/scratch/batchwise-ai/README.md#L15-L25)
- [`backend/app/services/supplier_memory_service.py`](file:///C:/Users/rithv/.gemini/antigravity-ide/scratch/batchwise-ai/backend/app/services/supplier_memory_service.py#L291-L364)

---

## 3. The BATCHWISE Core Idea

BATCHWISE is an AI sourcing agent that replaces static capability filtering with **condition-aware persistent memory**. Instead of asking *"Does Supplier X list CNC machining of aluminum?"*, BATCHWISE asks:
> *"Under what specific operational conditions (batch size, tooling type, material availability, lead-time urgency) did Supplier X succeed or fail in past orders?"*

By integrating **Vectorize's Hindsight persistent memory engine**, BATCHWISE:
1. Persists structured post-order fulfillment experiences as natural-language causal narratives.
2. Retrieves relevant past experiences via multi-strategy recall when evaluating a new RFQ.
3. Contrasts successful versus failed operating envelopes to isolate the exact **decision-changing condition**.
4. Categorizes supplier feasibility into three explicit states: `FEASIBLE`, `CONDITIONAL`, or `INSUFFICIENT EVIDENCE`.

**Reference File:**
- [`README.md`](file:///C:/Users/rithv/.gemini/antigravity-ide/scratch/batchwise-ai/README.md#L12-L25)
- [`docs/architecture.md`](file:///C:/Users/rithv/.gemini/antigravity-ide/scratch/batchwise-ai/docs/architecture.md#L26-L41)

---

## 4. End-to-End Operational Lifecycle: RFQ → Retrieval → Reasoning → Decision → Outcome → Retention

The BATCHWISE operational lifecycle consists of a closed learning loop:

```
[Buyer RFQ Intake]
       │
       ▼
[Hindsight Memory RECALL] ──> (Semantic & Tag Search against Memory Bank)
       │
       ▼
[Condition-Aware REASONING] ──> (Compare RFQ parameters with Historical Experiences)
       │
       ▼
[DECISION Generation] ──> (FEASIBLE / CONDITIONAL / INSUFFICIENT EVIDENCE + Verification Checklist)
       │
       ▼
[Purchase Order Execution & Fulfillment]
       │
       ▼
[OUTCOME Recording] ──> (Actual Price, Actual Lead Time, Quality Result, Failure Reason)
       │
       ▼
[Hindsight Memory RETAIN] ──> (Structured Experience → Natural Language Prose → Memory Bank)
```

### Step 1: RFQ Intake
The buyer submits a structured RFQ containing:
- `product`: Part description (e.g., "Aluminium Enclosure", "Brass Bushing").
- `quantity`: Intended batch size (e.g., 60, 75, 500 units).
- `material`: Raw material specification (e.g., "6061 Aluminium", "304 Stainless Steel").
- `process`: Required manufacturing method (e.g., "CNC Machining", "Sheet Metal").
- `finish`: Surface treatment (e.g., "Black Anodized", "Nickel Plated").
- `deadline_days`: Target delivery timeline.
- `budget_per_unit`: Cost ceiling per part.
- `analysis_mode`: Execution mode (`memory_aware` or `baseline`).

**Reference File:**
- [`backend/app/schemas/rfq.py`](file:///C:/Users/rithv/.gemini/antigravity-ide/scratch/batchwise-ai/backend/app/schemas/rfq.py#L7-L18)

### Step 2: Evidence Retrieval (RECALL)
`SupplierMemoryService.analyze_rfq_multi_supplier` initiates a multi-strategy recall query through `HindsightService.recall_supplier_experiences()`. The query synthesizes product type, batch quantity, material, process, finish, and deadline to fetch relevant historical records from the `batchwise_supplier_memory` bank.

**Reference File:**
- [`backend/app/services/supplier_memory_service.py`](file:///C:/Users/rithv/.gemini/antigravity-ide/scratch/batchwise-ai/backend/app/services/supplier_memory_service.py#L436-L443)
- [`backend/app/services/hindsight_service.py`](file:///C:/Users/rithv/.gemini/antigravity-ide/scratch/batchwise-ai/backend/app/services/hindsight_service.py#L125-L168)

### Step 3: Condition-Aware Reasoning
For each evaluated supplier, `SupplierMemoryService.evaluate_single_supplier()` filters retrieved experiences by supplier identity and process type, and partitions past experiences into:
- `success_exps`: Orders marked `"successful"` and `"passed"` quality.
- `failed_exps`: Orders marked `"failed"` or `"rejected"`.

The engine inspects the operating conditions (e.g., `custom_tooling_required`, `non_stock_material`, `tight_deadline`, `small_batch_order`) of failed orders versus successful orders to detect whether the incoming RFQ matches the failure conditions.

**Reference File:**
- [`backend/app/services/supplier_memory_service.py`](file:///C:/Users/rithv/.gemini/antigravity-ide/scratch/batchwise-ai/backend/app/services/supplier_memory_service.py#L291-L364)

### Step 4: Decision Generation
A structured `SupplierEvaluation` object is produced:
- Status classification (`FEASIBLE`, `CONDITIONAL`, or `INSUFFICIENT EVIDENCE`).
- Extracted `learned_conditions` and operational `risks`.
- Concrete `required_verification` checklist items (e.g., *"Confirm whether Alpha Manufacturing can utilize standard tooling or requires custom tooling for this 75-unit batch"*).
- `ConditionComparison` mapping the contrasting historical operating parameters and the isolated `decision_changing_condition`.

**Reference File:**
- [`backend/app/schemas/rfq.py`](file:///C:/Users/rithv/.gemini/antigravity-ide/scratch/batchwise-ai/backend/app/schemas/rfq.py#L41-L54)
- [`backend/app/services/supplier_memory_service.py`](file:///C:/Users/rithv/.gemini/antigravity-ide/scratch/batchwise-ai/backend/app/services/supplier_memory_service.py#L412-L425)

### Step 5: Post-Order Outcome Recording
Following manufacturing fulfillment, the buyer inputs actual performance metrics via the `/api/memory/retain` route (`RecordOutcomeView` in the frontend):
- `actual_price` vs `quoted_price`
- `actual_lead_time_days` vs `promised_lead_time_days`
- `quality_result` ("passed" / "rejected")
- `outcome` ("successful" / "failed")
- `conditions` encountered (e.g., `["custom_tooling_required", "non_stock_material"]`)
- `failure_reason` and freeform `notes`.

**Reference File:**
- [`backend/app/schemas/rfq.py`](file:///C:/Users/rithv/.gemini/antigravity-ide/scratch/batchwise-ai/backend/app/schemas/rfq.py#L65-L81)
- [`frontend/src/components/RecordOutcomeView.tsx`](file:///C:/Users/rithv/.gemini/antigravity-ide/scratch/batchwise-ai/frontend/src/components/RecordOutcomeView.tsx)

### Step 6: Memory Retention (RETAIN)
The structured outcome is serialized into natural language via `SupplierExperience.to_natural_language()` and sent to Hindsight's `retain` primitive. This persists the new experience into the memory bank, immediately updating the supplier's historical profile for subsequent RFQs.

**Reference File:**
- [`backend/app/models/supplier_experience.py`](file:///C:/Users/rithv/.gemini/antigravity-ide/scratch/batchwise-ai/backend/app/models/supplier_experience.py#L29-L44)
- [`backend/app/services/hindsight_service.py`](file:///C:/Users/rithv/.gemini/antigravity-ide/scratch/batchwise-ai/backend/app/services/hindsight_service.py#L86-L123)

---

## 5. Hindsight Memory Representation and Usage

BATCHWISE integrates with the official **Hindsight Python Client** (`hindsight-client` version `0.10.1`).

### Memory Bank Namespace
- Dedicated memory bank: `batchwise_supplier_memory`
- Server endpoint: Configurable via `HINDSIGHT_API_URL` (default: `http://localhost:8888`).

### The Three Hindsight Primitives
1. **RETAIN (`retain_experience`):**
   - Transcribes structured domain fields into rich natural language prose preserving causality.
   - Attaches metadata tags: `supplier`, `process`, `material`, `outcome`.
   - Calls `client.banks.retain(bank_id=..., contents=[...])`.

2. **RECALL (`recall_supplier_experiences`):**
   - Dispatches semantic and keyword queries against the memory bank using `client.banks.recall(bank_id=..., query=..., top_k=5)`.
   - Maps returned memory facts back to structured `EvidenceItem` models.

3. **REFLECT (`reflect_on_supplier_experiences`):**
   - Executes higher-order synthesis over the bank using `client.banks.reflect(bank_id=..., prompt=...)`.
   - Discovers cross-order patterns (e.g., chronic lead-time drift during Q2, material-specific scrap rates).

### Graceful Fallback Architecture
If the external Hindsight Docker service or API endpoint is unreachable, BATCHWISE does not crash. `HindsightService` maintains an internal fallback memory bank loaded from `backend/data/seed_experiences.json` (14 seed experiences). 
- Health status flags `is_connected=False`.
- Evaluation mode is recorded as `"HINDSIGHT MEMORY UNAVAILABLE (FALLBACK)"`.
- Retrieval performs local semantic/attribute matching over seed records.

**Reference File:**
- [`backend/app/config.py`](file:///C:/Users/rithv/.gemini/antigravity-ide/scratch/batchwise-ai/backend/app/config.py#L8-L15)
- [`backend/app/services/hindsight_service.py`](file:///C:/Users/rithv/.gemini/antigravity-ide/scratch/batchwise-ai/backend/app/services/hindsight_service.py#L20-L84)
- [`backend/app/models/supplier_experience.py`](file:///C:/Users/rithv/.gemini/antigravity-ide/scratch/batchwise-ai/backend/app/models/supplier_experience.py#L29-L44)

---

## 6. System Architecture & Component Mapping

```
                                  ┌───────────────────────────┐
                                  │   React 18 / Vite / TS    │
                                  │   Frontend Application    │
                                  └─────────────┬─────────────┘
                                                │ REST API Calls
                                                ▼
                                  ┌───────────────────────────┐
                                  │   FastAPI Web Service     │
                                  │    (backend/app/main.py)  │
                                  └─────────────┬─────────────┘
                                                │
                         ┌──────────────────────┴──────────────────────┐
                         ▼                                             ▼
          ┌─────────────────────────────┐               ┌─────────────────────────────┐
          │    SupplierMemoryService    │               │      HindsightService       │
          │ (RFQ Evaluation & Reasoning)│               │  (Client v0.10.1 Interface) │
          └──────────────┬──────────────┘               └──────────────┬──────────────┘
                         │                                             │
                         │             ┌───────────────────────────────┘
                         ▼             ▼
          ┌───────────────────────────────────────────┐
          │  Persistent Memory Substrate              │
          │  - Primary: Hindsight Memory Server       │
          │    (bank: batchwise_supplier_memory)      │
          │  - Fallback: Local Seed Vector Store      │
          │    (backend/data/seed_experiences.json)   │
          └───────────────────────────────────────────┘
```

### Major Components
1. **REST Interface (`backend/app/main.py`):**
   - Routes: `GET /health`, `POST /api/rfq/analyze`, `POST /api/memory/retain`, `POST /api/memory/recall`, `POST /api/memory/reflect`.
   - Built-in CORS middleware enabling multi-port local development.

2. **Domain Evaluation Engine (`backend/app/services/supplier_memory_service.py`):**
   - Implements both `evaluate_single_supplier` and `analyze_rfq_multi_supplier`.
   - Encapsulates baseline vs memory-aware algorithmic branches.

3. **Memory Client Wrapper (`backend/app/services/hindsight_service.py`):**
   - Manages connection lifecycle, bank initialization, retry logic, and fallback switching.

4. **Benchmark & Evaluation Runner (`backend/scripts/run_evaluation.py`):**
   - Harness script executing the 25 controlled test cases, computing baseline vs memory metrics, and generating reports.

**Reference File:**
- [`backend/app/main.py`](file:///C:/Users/rithv/.gemini/antigravity-ide/scratch/batchwise-ai/backend/app/main.py#L22-L138)
- [`backend/app/services/supplier_memory_service.py`](file:///C:/Users/rithv/.gemini/antigravity-ide/scratch/batchwise-ai/backend/app/services/supplier_memory_service.py#L30-L485)
- [`backend/app/services/hindsight_service.py`](file:///C:/Users/rithv/.gemini/antigravity-ide/scratch/batchwise-ai/backend/app/services/hindsight_service.py#L20-L245)
- [`backend/scripts/run_evaluation.py`](file:///C:/Users/rithv/.gemini/antigravity-ide/scratch/batchwise-ai/backend/scripts/run_evaluation.py#L20-L215)

---

## 7. Concrete Technology Stack

### Backend
- **Language / Runtime:** Python 3.13 (`python --version` confirmed in project environment)
- **Web Framework:** FastAPI (v0.115+)
- **Data Validation & Schemas:** Pydantic v2
- **Server:** Uvicorn ASGI runner
- **Testing Framework:** Pytest (7 unit/integration test cases in `backend/tests/`)
- **Memory Client:** `hindsight-client` 0.10.1

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite 5
- **Language:** TypeScript
- **Styling:** Vanilla Tailwind CSS with custom dark slate / enterprise palette
- **Iconography:** Lucide React (`lucide-react`)
- **Routing:** React Router DOM v6 (`react-router-dom`)

### Data Persistence
- **Hindsight Memory Bank:** `batchwise_supplier_memory` (hosted via Hindsight Docker container on port 8888 or Cloud API).
- **Local Fallback Data:** JSON persistence via `backend/data/seed_experiences.json` and `backend/data/evaluation_cases.json`.
- **Relational Database Configuration:** `DATABASE_URL` exists in `.env.example` (`postgresql://...`) but relational ORM tables are optional/staged for future enterprise expansions.

**Reference File:**
- [`backend/requirements.txt`](file:///C:/Users/rithv/.gemini/antigravity-ide/scratch/batchwise-ai/backend/requirements.txt)
- [`frontend/package.json`](file:///C:/Users/rithv/.gemini/antigravity-ide/scratch/batchwise-ai/frontend/package.json)
- [`backend/app/config.py`](file:///C:/Users/rithv/.gemini/antigravity-ide/scratch/batchwise-ai/backend/app/config.py#L8-L15)

---

## 8. Supplier Experience Representation

In BATCHWISE, past fulfillment history is represented as a strongly typed domain entity: `SupplierExperience`.

### Schema Definition
```python
class SupplierExperience(BaseModel):
    id: str                                  # Unique identifier (e.g., "exp_alpha_001")
    supplier: str                            # Supplier company name
    product: str                             # Part name (e.g., "Aluminium Enclosure")
    quantity: int                            # Batch size (e.g., 60)
    material: str                            # Material alloy (e.g., "6061 Aluminium")
    process: str                             # Manufacturing method (e.g., "CNC Machining")
    finish: Optional[str]                    # Surface finish (e.g., "Black Anodized")
    quoted_price: float                      # Initial quote in USD ($1,420.00)
    actual_price: float                      # Final invoiced price in USD ($1,480.00)
    promised_lead_time_days: int             # Quoted turnaround (12 days)
    actual_lead_time_days: int               # Real delivery turnaround (15 days)
    conditions: List[str]                    # Operational parameters (e.g., ["stock_material_available"])
    quality_result: str                      # "passed" or "rejected"
    outcome: str                             # "successful" or "failed"
    failure_reason: Optional[str]            # Causal root cause if rejected/delayed
    notes: Optional[str]                     # Freeform engineering observations
    date: Optional[str]                      # ISO date string ("2026-02-15")
```

### Natural Language Serialization for Hindsight
The model features a dedicated serializer `to_natural_language()`:
```python
def to_natural_language(self) -> str:
    status_str = "succeeded" if self.outcome == "successful" else "FAILED"
    cond_str = ", ".join(self.conditions) if self.conditions else "standard parameters"
    fail_str = f" Reason: {self.failure_reason}." if self.failure_reason else ""
    return (
        f"Order {self.id}: {self.supplier} {status_str} on {self.quantity} units of {self.product} "
        f"({self.material}, {self.process}, finish: {self.finish or 'standard'}). "
        f"Promised {self.promised_lead_time_days} days for ${self.quoted_price:.2f}, "
        f"actual {self.actual_lead_time_days} days for ${self.actual_price:.2f}. "
        f"Operating conditions: {cond_str}. Quality: {self.quality_result}.{fail_str} Notes: {self.notes or 'None'}"
    )
```

**Reference File:**
- [`backend/app/models/supplier_experience.py`](file:///C:/Users/rithv/.gemini/antigravity-ide/scratch/batchwise-ai/backend/app/models/supplier_experience.py#L8-L44)

---

## 9. Evidence Retrieval Mechanism for New RFQs

When an RFQ is evaluated in `memory_aware` mode:
1. **Query Construction:** An natural language retrieval query is formulated incorporating the target part name, batch quantity, material, process, finish, and deadline.
   ```
   "Find historical supplier experiences relevant to: Aluminium Enclosure, 75 units, 6061 Aluminium, CNC Machining, finish: Black Anodized, deadline: 14 days."
   ```
2. **Bank Recall:** In live mode, `HindsightService.recall_supplier_experiences()` calls the vector/semantic search endpoint of Hindsight. In fallback mode, it executes keyword/substring and metadata filtering over the loaded `SupplierExperience` array.
3. **Filtering & Relevance Scoring:**
   - Candidate memories are filtered to match the target supplier name.
   - Relevant items must align on the manufacturing process (e.g., CNC Machining vs Sheet Metal vs 3D Printing).
   - Each retrieved experience is formatted into an `EvidenceItem` containing snippet text, relevance score (0.0 to 1.0), recorded outcome, and past failure reasons.
4. **Partitioning:** The retrieved experiences for each supplier are separated into successful completions (`success_exps`) and past failures (`failed_exps`).

**Reference File:**
- [`backend/app/services/hindsight_service.py`](file:///C:/Users/rithv/.gemini/antigravity-ide/scratch/batchwise-ai/backend/app/services/hindsight_service.py#L125-L168)
- [`backend/app/services/supplier_memory_service.py`](file:///C:/Users/rithv/.gemini/antigravity-ide/scratch/batchwise-ai/backend/app/services/supplier_memory_service.py#L295-L315)

---

## 10. Feasibility, Conditional, and Insufficient-Evidence Decision Logic

BATCHWISE uses an anti-hallucination decision engine designed to avoid unwarranted confidence.

```
                  ┌───────────────────────────────┐
                  │    Retrieved Experiences      │
                  └──────────────┬────────────────┘
                                 │
                 ┌───────────────┴───────────────┐
                 ▼                               ▼
       [Matching Process Exists]       [No Relevant Records]
                 │                               │
                 │                               ▼
                 │                   STATUS: INSUFFICIENT EVIDENCE
                 │                   (Refuses to guess confidence)
                 ▼
       ┌────────────────────────────────────────────────────────┐
       │   Analyze Successes & Failures Across Past Orders      │
       └────────────────────────┬───────────────────────────────┘
                                │
          ┌─────────────────────┼─────────────────────┐
          ▼                     ▼                     ▼
[Both Success & Failure] [Only Past Failures]   [Only Past Successes]
          │                     │                     │
          ▼                     ▼                     ▼
  STATUS: CONDITIONAL    STATUS: CONDITIONAL    STATUS: FEASIBLE
  (Decision-Changing    (Historical Risk SLA   (Validated Operating
   Condition Isolated)   Verification Required) Envelope)
```

### Mode 1: Memory-Blind Baseline Logic
In baseline mode (`rfq.analysis_mode == "baseline"`):
- The engine ignores historical outcomes.
- If the supplier lists the process, it returns `status="FEASIBLE"`.
- It performs zero condition checks and produces zero warnings about NRE tooling or lead-time risk.

### Mode 2: Memory-Aware Sourcing Logic

#### 1. `INSUFFICIENT EVIDENCE`
- **Condition:** No historical records exist for the supplier, or all recorded experiences involve completely different processes (e.g., evaluating Epsilon Manufacturing for CNC milling when historical records only cover DMLS metal 3D printing).
- **Output:** Status is strictly set to `INSUFFICIENT EVIDENCE`.
- **Reasoning:** Rather than hallucinating a probability score or assuming capability from a supplier's marketing brochure, BATCHWISE recommends an on-site audit or sample qualification run.

#### 2. `CONDITIONAL`
- **Condition A (Mixed Outcomes):** The supplier has both successful and failed orders on record.
  - The engine extracts the `successful_condition` (e.g., standard tooling, stock material) and the `failed_condition` (e.g., custom tooling NRE fee, non-stock alloy).
  - It synthesizes a `decision_changing_condition` (e.g., *"Tooling & Stock Material Requirement"* or *"Batch Size & Lead Time Sensitivity"*).
  - It generates a targeted pre-sourcing verification checklist (e.g., *"Confirm whether supplier requires custom tooling or can utilize standard tooling for this batch"*).
- **Condition B (Prior Failures Only):** The supplier has only failed orders for this process category. Sourcing is flagged as `CONDITIONAL` requiring delay penalty clauses or secondary sourcing redundancy.

#### 3. `FEASIBLE`
- **Condition:** Verified historical records exist under matching process parameters and all past small-batch orders succeeded within promised price and lead-time tolerances.
- **Output:** Status is set to `FEASIBLE`, citing validated historical batch sizes and standard operating parameters.

**Reference File:**
- [`backend/app/services/supplier_memory_service.py`](file:///C:/Users/rithv/.gemini/antigravity-ide/scratch/batchwise-ai/backend/app/services/supplier_memory_service.py#L291-L425)

---

## 11. The 25-Case Benchmark Methodology

To rigorously evaluate whether persistent memory prevents procurement errors, BATCHWISE implements a **25-case synthetic controlled benchmark**.

### Dataset Construction
- **Dataset File:** `backend/data/evaluation_cases.json`
- **Test Runner:** `backend/scripts/run_evaluation.py`
- **Dataset Size:** 25 unseen small-batch manufacturing RFQs across 6 candidate suppliers.
- **Nature of Cases:** Explicitly synthetic, controlled test vectors designed to probe edge cases in low-volume manufacturing fulfillment.
- **Controlled Scenarios (10 Categories):**
  1. `conditional_capability` (e.g., batch-size and tooling threshold sensitivity)
  2. `known_success_condition` (e.g., proven operating envelope)
  3. `known_failure_condition` (e.g., small-batch lead-time collapse)
  4. `insufficient_evidence` (untested suppliers or unverified processes)
  5. `high_setup_cost_capability` (orders that absorb high NRE tooling)
  6. `high_volume_success` (suppliers optimized exclusively for scale)

### Evaluation Protocol
Each RFQ case is executed through two parallel pipelines:
1. **Baseline Evaluation (`memory_blind`):** Assumes feasibility based on static capability matching.
2. **Memory-Aware Evaluation (`memory_aware`):** Recalls historical experiences from the seed memory bank (14 experiences in `seed_experiences.json`).
3. Decisions are scored against ground-truth `expected` labels (`FEASIBLE`, `CONDITIONAL`, or `INSUFFICIENT EVIDENCE`).

**Reference File:**
- [`backend/data/evaluation_cases.json`](file:///C:/Users/rithv/.gemini/antigravity-ide/scratch/batchwise-ai/backend/data/evaluation_cases.json)
- [`backend/scripts/run_evaluation.py`](file:///C:/Users/rithv/.gemini/antigravity-ide/scratch/batchwise-ai/backend/scripts/run_evaluation.py#L40-L160)
- [`BATCHWISE_25_CASE_BENCHMARK_REPORT.md`](file:///C:/Users/rithv/.gemini/antigravity-ide/scratch/batchwise-ai/BATCHWISE_25_CASE_BENCHMARK_REPORT.md#L3-L13)

---

## 12. Exact Benchmark Results

The following numbers represent the exact, unrounded recorded execution outputs from the benchmark run stored in `backend/evaluation/results/latest.json`:

### Recorded Run Metadata
- **Timestamp:** `2026-09-29T20:18:20.203387`
- **Benchmark Name:** `BATCHWISE Phase 3 Synthetic Benchmark`
- **Dataset Size:** `25`
- **Recorded `hindsight_mode`:** `"HINDSIGHT MEMORY UNAVAILABLE (FALLBACK)"`
- **Total Recalled Evidence Items:** `41`

### Performance Metrics Table

| Metric | Memory-Blind Baseline | BATCHWISE Memory-Aware | Delta / Impact |
|---|---|---|---|
| **Overall Classification Accuracy** | **48.0%** (12 / 25) | **88.0%** (22 / 25) | **+40.0%** percentage points |
| **Conditional Risk Detection Rate** | **0.0%** (0 / 7) | **100.0%** (7 / 7) | **+100.0%** (eliminated silent failures) |
| **Insufficient Evidence Detection** | **0.0%** (0 / 6) | **100.0%** (6 / 6) | **+100.0%** (eliminated false assumptions) |
| **Combined Risk Detection Rate** | **0.0%** (0 / 13) | **100.0%** (13 / 13) | Caught all 13 high-risk procurement cases |
| **False Positive Feasibility Approvals** | **13** (out of 13 risk cases) | **0** | Zero false positive `FEASIBLE` approvals |

**Reference File:**
- [`backend/evaluation/results/latest.json`](file:///C:/Users/rithv/.gemini/antigravity-ide/scratch/batchwise-ai/backend/evaluation/results/latest.json#L1-L16)
- [`backend/evaluation/results/latest.md`](file:///C:/Users/rithv/.gemini/antigravity-ide/scratch/batchwise-ai/backend/evaluation/results/latest.md#L7-L20)

---

## 13. Analysis of Memory-Aware Wins (13 Cases)

In 13 out of 25 cases, the Memory-Blind baseline failed by blindly marking an order as `FEASIBLE`, whereas Memory-Aware reasoning produced the correct operational decision.

### Group A: Uncovering Hidden NRE Tooling Traps (4 Cases)
- **`eval_001` (Alpha Mfg, 75 units):** Baseline marked `FEASIBLE`. Memory recalled `exp_alpha_002` where an 80-unit enclosure order failed due to a $600 custom tooling NRE fee destroying low-volume economics. Correctly flagged `CONDITIONAL`.
- **`eval_016` (Alpha Mfg, 85 units):** Baseline marked `FEASIBLE`. Memory-aware detected that 85 units exceeds standard tooling inventory capacity, flagging `CONDITIONAL` with mandatory tooling NRE verification.
- **`eval_022` (Alpha Mfg, 65 units):** Baseline marked `FEASIBLE`. Memory-aware recognized borderline batch volume and flagged `CONDITIONAL` to confirm standard tooling availability.
- **`eval_003` (Gamma Works, 50 units):** Baseline marked `FEASIBLE`. Memory recalled that Gamma Works' custom fixturing setup on low-volume runs leads to substantial schedule drift. Correctly classified as `CONDITIONAL`.

### Group B: Catching Small-Batch Delivery Collapse (3 Cases)
- **`eval_010` (Gamma Works, 40 units, copper heat sink):** Baseline marked `FEASIBLE`. Memory recalled `exp_gamma_001` where low-volume orders experienced extreme delivery delays (actual 35 days vs promised 10 days). Correctly flagged `CONDITIONAL`.
- **`eval_019` (Gamma Works, 60 units, aluminum housing):** Baseline marked `FEASIBLE`. Memory identified recurring low-volume prioritization bottlenecks. Correctly flagged `CONDITIONAL`.
- **`eval_025` (Gamma Works, 35 units, low volume):** Baseline marked `FEASIBLE`. Memory flagged chronic small-batch delay risks, setting status to `CONDITIONAL`.

### Group C: Preventing False Assumptions on Unverified Suppliers (6 Cases)
- **`eval_005` (Epsilon Mfg, 100-unit CNC Enclosure):** Baseline assumed feasibility because Epsilon is a registered parts supplier. Memory revealed Epsilon's only historical experience (`exp_epsilon_001`) was for DMLS metal 3D printing prototypes, with zero CNC machining history. Correctly classified as `INSUFFICIENT EVIDENCE`.
- **`eval_008` (Zeta Tool & Die, 60-unit CNC Enclosure):** Baseline assumed feasibility. Memory revealed Zeta specializes solely in hardened H13 injection mold tooling (`exp_zeta_001`). Correctly classified as `INSUFFICIENT EVIDENCE`.
- **`eval_013` (Omni Quantum Labs, 5-unit Cryogenic Substrate):** Baseline marked `FEASIBLE`. Memory detected that Omni Quantum has zero records in the memory bank. Correctly classified as `INSUFFICIENT EVIDENCE`.
- **`eval_018` (Gamma Works, 30-unit Titanium Bracket):** Baseline assumed feasibility. Memory identified Gamma has no historical titanium milling records. Correctly classified as `INSUFFICIENT EVIDENCE`.
- **`eval_021` (Delta Components, 200-unit Steel Drive Shaft):** Baseline assumed feasibility. Memory revealed Delta has only produced aluminum heat sinks. Correctly classified as `INSUFFICIENT EVIDENCE`.
- **`eval_023` (Epsilon Mfg, 50-unit Brass Bushing):** Baseline assumed feasibility. Memory flagged lack of turning experience. Correctly classified as `INSUFFICIENT EVIDENCE`.

**Reference File:**
- [`BATCHWISE_25_CASE_BENCHMARK_REPORT.md`](file:///C:/Users/rithv/.gemini/antigravity-ide/scratch/batchwise-ai/BATCHWISE_25_CASE_BENCHMARK_REPORT.md#L67-L147)
- [`backend/evaluation/results/latest.json`](file:///C:/Users/rithv/.gemini/antigravity-ide/scratch/batchwise-ai/backend/evaluation/results/latest.json#L17-L500)

---

## 14. The Three Memory-Aware Failure Cases (Forensic Root Cause Analysis)

In 3 out of 25 cases, Memory-Aware reasoning failed by predicting `CONDITIONAL` when the ground-truth expectation was `FEASIBLE`:
- **`eval_006`:** Alpha Manufacturing — 50-unit brass bushing turning order
- **`eval_007`:** Gamma Works — 500-unit aluminum housing order
- **`eval_011`:** Alpha Manufacturing — 100-unit laser-cut 304 stainless steel bracket

### Detailed Root Cause Breakdown
1. **Case `eval_006` (Alpha Mfg, 50-unit Brass Bushing):**
   - *Expected:* `FEASIBLE` (Alpha has a verified success on 50 brass bushings in `exp_alpha_003`).
   - *Memory-Aware Output:* `CONDITIONAL` (Incorrect).
   - *Mechanism:* The memory service queries Alpha's history. Because Alpha has a recorded past failure on custom tooling (`exp_alpha_002`), the evaluation logic detected the presence of a failed experience in the supplier's memory partition and over-cautiously flagged tooling and stock material condition risks, failing to scope the risk exclusively to custom CNC milling.

2. **Case `eval_007` (Gamma Works, 500-unit Housing):**
   - *Expected:* `FEASIBLE` (500 units is a production-scale order well above Gamma's small-batch bottleneck).
   - *Memory-Aware Output:* `CONDITIONAL` (Incorrect).
   - *Mechanism:* The memory service recalled Gamma's small-batch delay history (`exp_gamma_001`). Because the rule engine checked for the existence of delivery delay failures without evaluating whether the incoming batch size (500 units) bypassed low-volume queue penalties, it over-conservatively flagged the order as conditional.

3. **Case `eval_011` (Alpha Mfg, 100-unit Laser Bracket):**
   - *Expected:* `FEASIBLE` (Standard sheet metal laser cutting from stock 304 plate).
   - *Memory-Aware Output:* `CONDITIONAL` (Incorrect).
   - *Mechanism:* Same supplier-level negative memory leakage: the existence of `exp_alpha_002` (milling tooling failure) contaminated the evaluation of a standard sheet metal laser-cutting job.

### Engineering Takeaway
These 3 failures demonstrate an **over-conservatism bias**. The system favored false-positive risk warnings over false-positive approvals. In manufacturing procurement, flagging a feasible order as `CONDITIONAL` merely causes an engineer to send a confirmation email; in contrast, flagging an infeasible order as `FEASIBLE` (the baseline's error in 13 cases) results in broken budgets, scrapped tooling, and delayed product launches.

**Reference File:**
- [`BATCHWISE_25_CASE_BENCHMARK_REPORT.md`](file:///C:/Users/rithv/.gemini/antigravity-ide/scratch/batchwise-ai/BATCHWISE_25_CASE_BENCHMARK_REPORT.md#L148-L168)
- [`backend/evaluation/results/latest.json`](file:///C:/Users/rithv/.gemini/antigravity-ide/scratch/batchwise-ai/backend/evaluation/results/latest.json#L154-L214)

---

## 15. Limitations and Caveats

To maintain strict technical rigor, the following limitations must be stated in any technical publication:

1. **Synthetic Controlled Dataset:** The 25-case benchmark is an in-vitro synthetic test suite designed to model known manufacturing failure modes. It does not represent field telemetry from an active production ERP or multi-enterprise procurement deployment.
2. **Recorded Execution in Fallback Mode:** As documented in `backend/evaluation/results/latest.json`, the benchmark was recorded with `hindsight_mode: "HINDSIGHT MEMORY UNAVAILABLE (FALLBACK)"`, executing over the in-memory fallback store seeded from `seed_experiences.json`. Live cloud performance will depend on network latency and Hindsight vector cluster sizing.
3. **Coarse Negative Memory Scoping:** As revealed by the 3 failure cases, current supplier-level memory recall can cause negative failure modes from one process (e.g., custom 5-axis milling) to inappropriately bleed into unrelated processes (e.g., sheet metal laser cutting or turning).
4. **No Customer Validation / Universal Superiority Claims:** BATCHWISE is a prototype and proof-of-concept demonstrating condition-aware memory architectures. It has not been validated across production factory floors and makes no claims of universal superiority over seasoned human procurement specialists.

**Reference File:**
- [`backend/evaluation/results/latest.json`](file:///C:/Users/rithv/.gemini/antigravity-ide/scratch/batchwise-ai/backend/evaluation/results/latest.json#L5)
- [`BATCHWISE_25_CASE_BENCHMARK_REPORT.md`](file:///C:/Users/rithv/.gemini/antigravity-ide/scratch/batchwise-ai/BATCHWISE_25_CASE_BENCHMARK_REPORT.md#L169-L173)

---

## 16. Implemented vs. Conceptual / Future Roadmap

To ensure technical transparency, capabilities are categorized into what is actively implemented in code versus conceptual roadmap items:

### Currently Implemented in Codebase
- [x] Full REST API with FastAPI (`/health`, `/api/rfq/analyze`, `/api/memory/retain`, `/api/memory/recall`, `/api/memory/reflect`).
- [x] Official Hindsight SDK integration (`hindsight-client` 0.10.1) with dual-mode operational fallback.
- [x] Natural language experience serialization preserving operational conditions (`to_natural_language()`).
- [x] Condition-aware feasibility engine outputting `FEASIBLE`, `CONDITIONAL`, and `INSUFFICIENT EVIDENCE`.
- [x] Side-by-side condition comparison data structure (`ConditionComparison`).
- [x] Targeted pre-sourcing verification checklist generation.
- [x] 25-case synthetic benchmark harness and automated reporting scripts.
- [x] Complete interactive React frontend with Sidebar navigation, Sourcing Workspace, 25-Case Benchmark Dashboard, Outcome Recording form, and Memory Reflection view.

### Conceptual / Future Work (Not Implemented)
- [ ] Direct CAD model / STEP file ingestion for automatic geometry feature extraction.
- [ ] Production ERP / MRP webhook integrations (e.g., SAP, NetSuite, ProShop).
- [ ] Multi-tenant supplier authentication portals.
- [ ] Automatic vendor re-negotiation agent via outbound email/EDI.
- [ ] Statistical Bayesian confidence bounds over sparse historical experience counts.

**Reference File:**
- [`README.md`](file:///C:/Users/rithv/.gemini/antigravity-ide/scratch/batchwise-ai/README.md#L126-L129)
- [`docs/architecture.md`](file:///C:/Users/rithv/.gemini/antigravity-ide/scratch/batchwise-ai/docs/architecture.md#L42-L46)
- [`frontend/src/App.tsx`](file:///C:/Users/rithv/.gemini/antigravity-ide/scratch/batchwise-ai/frontend/src/App.tsx)
