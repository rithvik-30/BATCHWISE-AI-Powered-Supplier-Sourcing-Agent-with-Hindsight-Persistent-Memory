export interface RFQRequest {
  product: string;
  quantity: number;
  material: string;
  process: string;
  finish?: string;
  deadline_days?: number;
  budget_per_unit?: number;
  target_supplier?: string;
}

export interface EvidenceItem {
  experience_id?: string;
  supplier: string;
  experience: string;
  outcome: string;
  conditions: string[];
  relevance_score?: number;
  notes?: string;
}

export interface RFQAnalysisResponse {
  status: 'feasible' | 'conditional' | 'unknown' | string;
  supplier: string;
  summary: string;
  evidence: EvidenceItem[];
  learned_conditions: string[];
  risks: string[];
  required_verification: string[];
}

export interface HealthCheckResponse {
  status: string;
  service: string;
  version: string;
  hindsight_connected: boolean;
  hindsight_bank_id: string;
  hindsight_url: string;
}
