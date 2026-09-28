import { RFQRequest, RFQAnalysisResponse, HealthCheckResponse } from '../types';

const API_BASE = '/api';

export async function checkHealth(): Promise<HealthCheckResponse> {
  const res = await fetch('/health');
  if (!res.ok) {
    throw new Error(`Health check failed with status ${res.status}`);
  }
  return res.json();
}

export async function analyzeRFQ(rfq: RFQRequest): Promise<RFQAnalysisResponse> {
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
