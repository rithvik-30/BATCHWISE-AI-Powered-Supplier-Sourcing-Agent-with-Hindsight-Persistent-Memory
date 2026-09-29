# BATCHWISE

**Experience-Driven Supplier Sourcing Agent with Hindsight Persistent Memory**

> *"Don't just compare suppliers. Remember what happened."*

---

## 🎥 Demo

**Technical Demo:**
https://youtu.be/KTRsfn3L6ys

The final demo is also included in the repository as:

`BATCHWISE_-_Remember_What_Happened.mp4`

---

## 📖 Technical Article

[Read the BATCHWISE Technical Article](./BATCHWISE_TECHNICAL_ARTICLE.md)

The technical article provides a deep dive into the system architecture, Hindsight memory workflow, evaluation methodology, recorded results, failure case analysis, limitations, and future work.

For granular repository evidence, source file citations, and detailed benchmark cases, refer to the [Source Brief](./BATCHWISE_TECHNICAL_ARTICLE_SOURCE_BRIEF.md).

---

## 🎯 Problem Statement
In small-batch manufacturing (typically 10 to 100 units), supplier sourcing decisions are frequently made using static directory listings or superficial quote comparisons. However, machine shops and contract manufacturers perform radically differently under varying operational conditions:
- **Tooling Amortization:** Custom tooling (NRE) setup fees that are negligible on large production volumes destroy small-batch unit economics.
- **Stock Availability:** Standard bar stock alloys can be turned around in days, whereas non-stock plate tempers trigger weeks of mill delays.
- **Queue Prioritization:** High-mix shops routinely de-prioritize small prototype runs during capacity crunches.

Static supplier profiles only indicate what a supplier claims they can make. Without persistent memory of past order outcomes and the conditions under which they occurred, procurement teams repeatedly walk into identical failure modes.

---

## 💡 Solution
**BATCHWISE** is an AI-powered, memory-aware supplier sourcing agent for small-batch manufacturing. Instead of treating supplier capability as a static binary flag (*"Can this supplier make this part?"*), BATCHWISE evaluates incoming RFQs against historical order outcomes and the specific operational conditions under which they succeeded or failed.

### The Closed-Loop Workflow

```
RFQ
 ↓
RECALL relevant historical experiences
 ↓
CONDITION-AWARE REASONING
 ↓
DECISION (Feasible / Conditional / Insufficient Evidence)
 ↓
OUTCOME RECORDING
 ↓
RETAIN useful experience
 ↓
FUTURE RFQ
```

Historical supplier experiences are considered together with their operating conditions, enabling condition-aware reasoning over tooling, lead-time drift, and material constraints.

---

## ⚖️ Decision States

When an RFQ is analyzed, BATCHWISE classifies supplier feasibility into three explicit decision states:

- **`FEASIBLE`**: Historical evidence supports successful fulfillment under sufficiently matching conditions.
- **`CONDITIONAL`**: Historical evidence identifies risks, mixed outcomes, or operational conditions (e.g., custom tooling requirements, non-stock materials, or tight delivery windows) that require verification before proceeding.
- **`INSUFFICIENT EVIDENCE`**: Relevant historical evidence is insufficient to confidently establish feasibility. Rather than hallucinating a confidence score, the system explicitly alerts the buyer to qualify the supplier or conduct a capability audit.

*Note: The system provides evidence-backed decision support and does not claim to guarantee fulfillment correctness.*

---

## 🧠 Current Implementation

The implemented system includes:

- **RFQ Intake & Analysis:** Structured multi-parameter intake (part geometry, batch quantity, material, process, finish, deadline, budget).
- **Supplier Catalog & Comparison:** Multi-supplier comparative sourcing view evaluating candidate shops side by side.
- **Supplier Experience Bank:** Structured database of historical fulfillment records (`SupplierExperience`) capturing realized pricing, actual lead times, operational condition tags, quality results, and root-cause failure notes.
- **Hindsight Memory Integration:** Direct integration with the official Hindsight SDK (`hindsight-client` 0.10.1) using the `batchwise_supplier_memory` namespace across `retain`, `recall`, and `reflect` primitives.
- **Local Fallback Memory Store:** Automatic in-memory fallback store loaded with 14 seed experiences (`seed_experiences.json`), ensuring resilient local operation when an external Hindsight server is offline.
- **Evidence Retrieval:** Multi-strategy recall matching RFQ requirements to historical experience facts.
- **Condition-Aware Reasoning:** Heuristic and memory-backed reasoning engine that isolates the decision-changing condition between past successes and past failures.
- **Three-State Feasibility Engine:** Generates `FEASIBLE`, `CONDITIONAL`, or `INSUFFICIENT EVIDENCE` decisions with actionable pre-sourcing verification checklists.
- **Post-Order Outcome Recording:** Dedicated workflow and UI for recording real-world order performance metrics.
- **Memory Retention:** Automatic serialization of structured outcomes into natural language narratives committed back to the persistent memory bank.
- **Evaluation Dashboard:** Interactive frontend interface displaying mode comparisons, aggregate KPI metrics, case-by-case inspection cards, and failure case analysis.
- **Automated Backend Tests:** Comprehensive Pytest test suite covering endpoints, schemas, Hindsight integration, multi-supplier analysis, and evaluation logic.

---

## 🔬 Why Hindsight?

BATCHWISE utilizes Vectorize's **Hindsight** persistent memory engine to provide durable, condition-aware memory primitives:
- **`RETAIN`**: Converts complex order outcomes and operating conditions into structured long-term memory facts.
- **`RECALL`**: Performs parallel multi-strategy search over historical sourcing experiences.
- **`REFLECT`**: Synthesizes recurring supplier risk factors, chronic lead-time drift, and operational capabilities over time.

---

## 🏗️ Architecture

```
React Frontend (Vite + TypeScript + Tailwind CSS)
       ↓ 
FastAPI REST API (Uvicorn / Pydantic v2)
       ↓ 
SupplierMemoryService (Condition-Aware Feasibility Engine)
       ↓ 
HindsightService (hindsight-client 0.10.1 / Local Fallback)
       ↓
┌──────────────┬──────────────┬──────────────┐
│   RETAIN     │    RECALL    │   REFLECT    │
└──────────────┴──────────────┴──────────────┘
       ↓
BATCHWISE Memory Bank (`batchwise_supplier_memory`)
```

---

## 🧪 Evaluation

BATCHWISE was evaluated on **25 synthetic controlled procurement cases**, comparing memory-blind baseline reasoning against BATCHWISE memory-aware reasoning.

### Exact Recorded Benchmark Results

| Metric | Memory-Blind | Memory-Aware |
|---|---:|---:|
| Overall accuracy | 12/25 (48%) | 22/25 (88%) |
| Conditional-risk detection | 0/7 (0%) | 7/7 (100%) |
| Insufficient-evidence detection | 0/6 (0%) | 6/6 (100%) |
| Combined risk cases | 0/13 (0%) | 13/13 (100%) |

**Total recalled evidence items: 41**

*Note: The benchmark consists of 25 synthetic controlled test cases designed to probe small-batch manufacturing edge cases. It is not a production or customer validation study.*

### Important Hindsight Caveat

> The recorded benchmark result reports `hindsight_mode: "HINDSIGHT MEMORY UNAVAILABLE (FALLBACK)"`. The evaluated run therefore used the project's local fallback experience store rather than a live distributed Hindsight deployment. The Hindsight integration remains part of the implemented system.

The evaluation does not represent live enterprise deployment, customer validation, or proof of universal superiority.

---

## 🚀 Quick Start Guide

### Prerequisites
- Python 3.10+ (tested on Python 3.13)
- Node.js v18+ & npm
- Docker (optional, for running local Hindsight server)

### 1. Clone & Setup Environment
```bash
git clone https://github.com/rithvik-30/BATCHWISE-AI-Powered-Supplier-Sourcing-Agent-with-Hindsight-Persistent-Memory.git
cd batchwise-ai
cp .env.example .env
```

### 2. Start Hindsight Local Server (Optional)
```bash
docker-compose up -d hindsight
```
*Hindsight API runs on `http://localhost:8888` and Hindsight UI on `http://localhost:9999`.*
*(If the Hindsight server is not running, BATCHWISE automatically operates in seamless local fallback mode).*

### 3. Start Backend API
```bash
cd backend
pip install -r requirements.txt
python app/main.py
```
*Backend API runs at `http://localhost:8000` (Swagger Docs: `http://localhost:8000/docs`).*

### 4. Start Frontend
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs at `http://localhost:3000`.*

---

## 🧪 Automated Testing

The backend test suite was verified with:

**15 passed, 0 failed**

Run the backend test suite:
```bash
cd backend
pytest -v
```

---

## ⚙️ Environment Variables (`.env.example`)

| Variable | Description | Default |
|---|---|---|
| `HINDSIGHT_API_URL` | Hindsight server endpoint | `http://localhost:8888` |
| `HINDSIGHT_API_KEY` | Hindsight Cloud API Key (optional for self-hosted) | `""` |
| `HINDSIGHT_BANK_ID` | Dedicated memory bank namespace | `batchwise_supplier_memory` |
| `LLM_API_KEY` | LLM API key for Hindsight or local analysis | `""` |
| `DATABASE_URL` | PostgreSQL connection string (staged for relational persistence) | `postgresql://postgres:postgres@localhost:5432/batchwise` |

---

## 📡 API Endpoints

- `GET /health`: Health check and Hindsight integration status.
- `POST /api/rfq/analyze`: Execute condition-aware multi-supplier RFQ feasibility analysis.
- `POST /api/memory/retain`: Retain a structured supplier fulfillment experience.
- `POST /api/memory/recall`: Search and recall supplier experiences.
- `POST /api/memory/reflect`: Synthesize cross-order insights over stored memories.
