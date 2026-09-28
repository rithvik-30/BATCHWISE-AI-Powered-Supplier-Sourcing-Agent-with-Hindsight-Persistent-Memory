# BATCHWISE

**Experience-Driven Supplier Sourcing Agent with Hindsight Persistent Memory**

> *"Don't just compare suppliers. Remember what happened."*

---

## 🎯 Problem Statement
In small-batch manufacturing, supplier sourcing decisions are often made using static directory listings or superficial quote comparisons. However, suppliers perform radically differently under varying operational conditions — such as batch size, stock material availability, and standard versus custom tooling requirements. Without persistent memory of previous RFQ outcomes, procurement teams repeatedly fall into identical supplier failure modes.

## 💡 Solution
**BATCHWISE** is an AI sourcing agent that learns the actual operating conditions behind historical supplier RFQs, negotiations, lead-time drifts, and order completions. When a new RFQ arrives, BATCHWISE recalls relevant past experiences using **Hindsight persistent memory**, analyzes the underlying operational conditions, and produces evidence-backed feasibility recommendations (`FEASIBLE`, `CONDITIONAL`, or `UNKNOWN`).

## 🧠 Why Supplier Memory Matters
Generic LLM prompts and traditional vector stores treat past data as static chunks of text. Small-batch manufacturing requires **condition-aware reasoning**:
- *Why did Alpha Manufacturing succeed on a 60-unit enclosure order but fail on an 80-unit order?*
- *Because the 60-unit order used stock material and standard tooling, whereas the 80-unit order required custom tooling setup costs that destroyed small-batch economics.*

## 🔬 Why Hindsight?
BATCHWISE utilizes Vectorize's **Hindsight** memory engine to provide durable, condition-aware memory primitives:
- **`RETAIN`**: Converts complex order outcomes and operating conditions into structured long-term memory.
- **`RECALL`**: Performs parallel multi-strategy search over historical sourcing experiences.
- **`REFLECT`**: Synthesizes recurring supplier risk factors and operational capabilities over time.

---

## 🏗️ Architecture

```
React Frontend (Vite + Tailwind) 
       ↓ 
FastAPI REST API 
       ↓ 
SupplierMemoryService (RFQ Analysis & Condition Engine)
       ↓ 
HindsightService (Official hindsight-client 0.10.1)
       ↓
┌──────────────┬──────────────┬──────────────┐
│  RETAIN      │   RECALL     │   REFLECT    │
└──────────────┴──────────────┴──────────────┘
       ↓
BATCHWISE Persistent Memory Bank (`batchwise_supplier_memory`)
```

---

## 🚀 Quick Start Guide

### Prerequisites
- Python 3.10+
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
*Hindsight API will run on `http://localhost:8888` and Hindsight UI on `http://localhost:9999`.*
*(If Hindsight server is not running, BATCHWISE automatically operates in seamless local fallback mode).*

### 3. Start Backend API
```bash
cd backend
pip install -r requirements.txt
python app/main.py
```
*Backend API runs at `http://localhost:8000` (Docs: `http://localhost:8000/docs`).*

### 4. Start Frontend
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs at `http://localhost:3000`.*

---

## 🧪 Automated Testing
Run the backend test suite:
```bash
cd backend
pytest -v
```
**Test Results:**
- `test_health_endpoint`: Verified
- `test_supplier_experience_schema_validation`: Verified
- `test_synthetic_data_loaded`: Verified
- `test_hindsight_retain_integration`: Verified
- `test_hindsight_recall_alpha_experiences`: Verified
- `test_rfq_analysis_unknown_when_no_evidence`: Verified
- `test_alpha_demo_scenario_returns_both_experiences`: Verified

---

## ⚙️ Environment Variables (`.env.example`)

| Variable | Description | Default |
|---|---|---|
| `HINDSIGHT_API_URL` | Hindsight server endpoint | `http://localhost:8888` |
| `HINDSIGHT_API_KEY` | Hindsight Cloud API Key (optional for self-hosted) | `""` |
| `HINDSIGHT_BANK_ID` | Dedicated memory bank namespace | `batchwise_supplier_memory` |
| `LLM_API_KEY` | LLM API key for Hindsight or local analysis | `""` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://postgres:postgres@localhost:5432/batchwise` |

---

## 📡 API Endpoints

- `GET /health`: Health check and Hindsight integration status.
- `POST /api/memory/retain`: Retain a structured supplier experience.
- `POST /api/memory/recall`: Search and recall supplier experiences.
- `POST /api/memory/reflect`: Synthesize insights over stored memories.
- `POST /api/rfq/analyze`: Execute condition-aware RFQ feasibility analysis.

---

## 🗺️ Roadmap
- [x] **Phase 1**: Core Foundation, Hindsight `retain`/`recall`/`reflect` service, condition-aware RFQ analysis, automated test suite, and minimal testing UI.
- [ ] **Phase 2**: Full Sourcing Agent Dashboard, supplier comparative view, and post-order experience recording workflow.
