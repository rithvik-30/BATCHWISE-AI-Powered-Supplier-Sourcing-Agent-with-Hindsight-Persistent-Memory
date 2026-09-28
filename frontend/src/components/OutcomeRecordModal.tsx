import React, { useState } from 'react';
import { RFQRequest, OutcomeRecordRequest, OutcomeRecordResponse } from '../types';
import { recordOutcome } from '../services/api';
import { X, Save, Brain, CheckCircle2, AlertCircle } from 'lucide-react';

interface OutcomeRecordModalProps {
  rfq: RFQRequest;
  supplierName: string;
  onClose: () => void;
  onSuccess: () => void;
}

export const OutcomeRecordModal: React.FC<OutcomeRecordModalProps> = ({
  rfq,
  supplierName,
  onClose,
  onSuccess
}) => {
  const [outcome, setOutcome] = useState<'successful' | 'partially_successful' | 'failed'>('successful');
  const [actualQuantity, setActualQuantity] = useState<number>(rfq.quantity);
  const [actualLeadTime, setActualLeadTime] = useState<number>(rfq.deadline_days || 14);
  const [actualPrice, setActualPrice] = useState<number>(rfq.budget_per_unit || 1500);
  const [qualityResult, setQualityResult] = useState<string>('passed');
  const [failureReason, setFailureReason] = useState<string>('');
  const [conditionsText, setConditionsText] = useState<string>('stock_material_available, standard_tooling');
  const [buyerNotes, setBuyerNotes] = useState<string>('');

  const [saving, setSaving] = useState<boolean>(false);
  const [result, setResult] = useState<OutcomeRecordResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const conditionsList = conditionsText
      .split(',')
      .map((c) => c.trim().toLowerCase().replace(/\s+/g, '_'))
      .filter(Boolean);

    const req: OutcomeRecordRequest = {
      supplier: supplierName,
      product: rfq.product,
      quantity: actualQuantity,
      material: rfq.material,
      process: rfq.process,
      finish: rfq.finish,
      quoted_price: rfq.budget_per_unit,
      actual_price: actualPrice,
      promised_lead_time_days: rfq.deadline_days,
      actual_lead_time_days: actualLeadTime,
      quality_result: qualityResult,
      outcome: outcome,
      failure_reason: outcome === 'failed' ? failureReason : undefined,
      conditions: conditionsList,
      buyer_notes: buyerNotes || undefined
    };

    try {
      const res = await recordOutcome(req);
      setResult(res);
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Failed to record outcome.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-indigo-400" />
            <h3 className="text-xl font-bold text-slate-100">Record Supplier Outcome</h3>
          </div>
          <p className="text-xs text-slate-400">
            Log actual post-order fulfillment results with <strong className="text-slate-200">{supplierName}</strong> to train BATCHWISE Hindsight memory.
          </p>
        </div>

        {/* Success Banner */}
        {result ? (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
              <CheckCircle2 className="w-5 h-5" /> Experience Retained in Hindsight Memory
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-mono bg-slate-950/80 p-3 rounded border border-slate-800">
              {result.learning_confirmation}
            </p>
            <div className="text-[11px] text-slate-400">
              Retained Content: <span className="italic">"{result.retained_content}"</span>
            </div>
            <button
              onClick={onClose}
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg text-xs transition-colors mt-2"
            >
              Done & Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" /> {error}
              </div>
            )}

            {/* Outcome Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Order Outcome</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setOutcome('successful')}
                  className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-all ${
                    outcome === 'successful'
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  SUCCESSFUL
                </button>
                <button
                  type="button"
                  onClick={() => setOutcome('partially_successful')}
                  className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-all ${
                    outcome === 'partially_successful'
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  PARTIAL
                </button>
                <button
                  type="button"
                  onClick={() => setOutcome('failed')}
                  className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-all ${
                    outcome === 'failed'
                      ? 'bg-red-500/20 border-red-500 text-red-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  FAILED
                </button>
              </div>
            </div>

            {/* Quantitative Details */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Actual Quantity</label>
                <input
                  type="number"
                  value={actualQuantity}
                  onChange={(e) => setActualQuantity(parseInt(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Actual Lead Time (Days)</label>
                <input
                  type="number"
                  value={actualLeadTime}
                  onChange={(e) => setActualLeadTime(parseInt(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Final Price ($/unit)</label>
                <input
                  type="number"
                  value={actualPrice}
                  onChange={(e) => setActualPrice(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            {/* Quality Result */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Quality Inspection Outcome</label>
              <select
                value={qualityResult}
                onChange={(e) => setQualityResult(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="passed">Passed CMM / Visual Inspection</option>
                <option value="conditional">Passed with Deviations</option>
                <option value="failed">Rejected (Quality Failure)</option>
              </select>
            </div>

            {/* Failure Reason if Failed */}
            {outcome === 'failed' && (
              <div>
                <label className="block text-xs font-semibold text-red-400 mb-1">Failure Reason</label>
                <input
                  type="text"
                  value={failureReason}
                  onChange={(e) => setFailureReason(e.target.value)}
                  placeholder="e.g. Custom tooling fee ruined small-batch economics."
                  className="w-full bg-slate-950 border border-red-500/40 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-red-500"
                  required
                />
              </div>
            )}

            {/* Operating Conditions */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Operating Conditions (comma separated)
              </label>
              <input
                type="text"
                value={conditionsText}
                onChange={(e) => setConditionsText(e.target.value)}
                placeholder="e.g. stock_material_available, standard_tooling"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Buyer Notes */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Buyer Notes & Observations</label>
              <textarea
                value={buyerNotes}
                onChange={(e) => setBuyerNotes(e.target.value)}
                rows={2}
                placeholder="e.g. Standard tooling setup was sufficient for 75 units. Supplier delivered 2 days early."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Save Button */}
            <button
              type="submit"
              disabled={saving}
              className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-sky-500 hover:from-indigo-600 hover:to-sky-600 text-white font-semibold rounded-lg text-xs shadow-lg shadow-indigo-500/20 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {saving ? (
                <span>Retaining in Hindsight Memory...</span>
              ) : (
                <>
                  <Save className="w-4 h-4" /> Save Experience to Memory
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
