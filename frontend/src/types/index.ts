export interface RFQRequest {
  product: string;
  quantity: number;
  material: string;
  process: string;
  finish?: string;
  deadline_days?: number;
  budget_per_unit?: number;
  target_supplier?: string;
  quality_requirements?: string;
  additional_requirements?: string;
}

export interface EvidenceItem {
  experience_id?: string;
  supplier: string;
  experience: string;
  outcome: string;
  conditions: string[];
  notes?: string;
  date?: string;
  relevance_reason?: string;
}

export interface ConditionComparison {
  current_rfq: Record<string, any>;
  successful_experience?: Record<string, any>;
  failed_experience?: Record<string, any>;
  decision_changing_condition: string;
}

export interface SupplierEvaluation {
  supplier: string;
  status: 'FEASIBLE' | 'CONDITIONAL' | 'INSUFFICIENT EVIDENCE' | string;
  summary: string;
  evidence_count: number;
  evidence: EvidenceItem[];
  learned_conditions: string[];
  risks: string[];
  required_verification: string[];
  last_known_outcome?: string;
  decision_changing_condition?: string;
  comparison?: ConditionComparison;
}

// Backward compatibility alias for Phase 1
export type RFQAnalysisResponse = SupplierEvaluation;

export interface HindsightStatus {
  is_connected: boolean;
  bank_id: string;
  mode: string;
  recalled_count: number;
  relevant_count: number;
  message: string;
}

export type HealthCheckResponse = HindsightStatus;

export interface MultiSupplierAnalysisResponse {
  rfq: RFQRequest;
  evaluations: SupplierEvaluation[];
  hindsight_status: HindsightStatus;
}

export interface OutcomeRecordRequest {
  supplier: string;
  product: string;
  quantity: number;
  material: string;
  process: string;
  finish?: string;
  quoted_price?: number;
  actual_price?: number;
  promised_lead_time_days?: number;
  actual_lead_time_days?: number;
  quality_result: string;
  outcome: string;
  failure_reason?: string;
  conditions: string[];
  buyer_notes?: string;
}

export interface OutcomeRecordResponse {
  status: string;
  hindsight_retained: boolean;
  experience_id: string;
  retained_content: string;
  learning_confirmation: string;
}

export interface SupplierSummary {
  name: string;
  total_experiences: number;
  successful_count: number;
  failed_count: number;
  processes: string[];
  materials: string[];
  last_known_outcome: string;
}

export interface SupplierDetail {
  supplier: string;
  assessment: string;
  summary: string;
  experiences: any[];
  success_patterns: string[];
  failure_patterns: string[];
  learned_conditions: string[];
  verification_required: string[];
}
