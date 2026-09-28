import {
  RFQRequest,
  MultiSupplierAnalysisResponse,
  OutcomeRecordRequest,
  OutcomeRecordResponse,
  HindsightStatus,
  SupplierSummary,
  SupplierDetail
} from '../types';

const API_BASE = '/api';

export async function checkHealth(): Promise<any> {
  const res = await fetch('/health');
  if (!res.ok) {
    throw new Error(`Health check failed with status ${res.status}`);
  }
  return res.json();
}

export async function getMemoryStatus(): Promise<HindsightStatus> {
  const res = await fetch(`${API_BASE}/memory/status`);
  if (!res.ok) {
    throw new Error(`Failed to fetch memory status: ${res.status}`);
  }
  return res.json();
}

export async function runLiveTest(): Promise<any> {
  const res = await fetch(`${API_BASE}/memory/test-live`, { method: 'POST' });
  if (!res.ok) {
    throw new Error(`Live test failed with status ${res.status}`);
  }
  return res.json();
}

export async function analyzeRFQMulti(rfq: RFQRequest): Promise<MultiSupplierAnalysisResponse> {
  const res = await fetch(`${API_BASE}/rfq/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(rfq),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`RFQ analysis failed: ${errText}`);
  }

  return res.json();
}

export async function recordOutcome(req: OutcomeRecordRequest): Promise<OutcomeRecordResponse> {
  const res = await fetch(`${API_BASE}/memory/outcome`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Outcome recording failed: ${errText}`);
  }

  return res.json();
}

export async function getSuppliers(): Promise<SupplierSummary[]> {
  const res = await fetch(`${API_BASE}/suppliers`);
  if (!res.ok) {
    throw new Error(`Failed to fetch suppliers: ${res.status}`);
  }
  return res.json();
}

export async function getSupplierDetail(name: string): Promise<SupplierDetail> {
  const res = await fetch(`${API_BASE}/suppliers/${encodeURIComponent(name)}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch supplier detail: ${res.status}`);
  }
  return res.json();
}
