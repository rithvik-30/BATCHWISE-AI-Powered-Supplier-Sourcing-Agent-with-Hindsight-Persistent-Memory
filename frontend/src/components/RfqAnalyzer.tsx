import React, { useState, useEffect } from 'react';
import { RFQRequest, RFQAnalysisResponse, HealthCheckResponse } from '../types';
import { analyzeRFQ, checkHealth } from '../services/api';
import { Brain, ShieldAlert, CheckCircle2, AlertTriangle, HelpCircle, Layers, Cpu, CheckSquare } from 'lucide-react';

const DEMO_RFQ_ALPHA: RFQRequest = {
  product: 'Aluminium Enclosure',
  quantity: 75,
  material: '6061 Aluminium',
  process: 'CNC Machining',
  finish: 'Black Anodized',
  deadline_days: 14,
  budget_per_unit: 1500,
  target_supplier: 'Alpha Manufacturing'
};

const DEMO_RFQ_UNKNOWN: RFQRequest = {
  product: 'Quantum Cryo Substrate',
  quantity: 5,
  material: 'Metamaterial B-4',
  process: 'Cryogenic Micro-Etching',
  finish: 'Polished',
  deadline_days: 7,
  budget_per_unit: 5000,
  target_supplier: 'Omni Quantum Labs'
};

export const RfqAnalyzer: React.FC = () => {
  const [rfq, setRfq] = useState<RFQRequest>(DEMO_RFQ_ALPHA);
  const [loading, setLoading] = useState<boolean>(false);
  const [analysis, setAnalysis] = useState<RFQAnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [health, setHealth] = useState<HealthCheckResponse | null>(null);

  useEffect(() => {
    checkHealth()
      .then(setHealth)
      .catch((err) => console.warn('Health check warning:', err));
  }, []);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeRFQ(rfq);
      setAnalysis(result);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during RFQ analysis.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'feasible':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-4 h-4" /> FEASIBLE
          </span>
        );
      case 'conditional':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <AlertTriangle className="w-4 h-4" /> CONDITIONAL
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-500/10 text-slate-400 border border-slate-500/20">
            <HelpCircle className="w-4 h-4" /> UNKNOWN EVIDENCE
          </span>
        );
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header Banner */}
      <header className="border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-indigo-400" />
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
              BATCHWISE
            </h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Supplier Memory for Small-Batch Sourcing • <span className="italic">"Don't just compare suppliers. Remember what happened."</span>
          </p>
        </div>

        {health && (
          <div className="text-xs bg-slate-900 border border-slate-800 rounded-lg p-3 space-y-1">
            <div className="flex items-center justify-between gap-4 text-slate-400">
              <span>Hindsight Server:</span>
              <span className={health.hindsight_connected ? "text-emerald-400 font-semibold" : "text-amber-400 font-semibold"}>
                {health.hindsight_connected ? "Connected (Live)" : "Fallback Store"}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 text-slate-400">
              <span>Memory Bank:</span>
              <span className="text-slate-300 font-mono">{health.hindsight_bank_id}</span>
            </div>
          </div>
        )}
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form Column */}
        <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-400" /> Test RFQ Specification
            </h2>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setRfq(DEMO_RFQ_ALPHA)}
                className="text-xs px-2.5 py-1 rounded bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 transition-colors"
              >
                Alpha Demo RFQ
              </button>
              <button
                type="button"
                onClick={() => setRfq(DEMO_RFQ_UNKNOWN)}
                className="text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
              >
                Unknown RFQ
              </button>
            </div>
          </div>

          <form onSubmit={handleAnalyze} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Target Supplier</label>
              <input
                type="text"
                value={rfq.target_supplier || ''}
                onChange={(e) => setRfq({ ...rfq, target_supplier: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                placeholder="e.g. Alpha Manufacturing"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Product / Part</label>
                <input
                  type="text"
                  value={rfq.product}
                  onChange={(e) => setRfq({ ...rfq, product: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Quantity (Units)</label>
                <input
                  type="number"
                  value={rfq.quantity}
                  onChange={(e) => setRfq({ ...rfq, quantity: parseInt(e.target.value) || 0 })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Material Spec</label>
                <input
                  type="text"
                  value={rfq.material}
                  onChange={(e) => setRfq({ ...rfq, material: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Manufacturing Process</label>
                <input
                  type="text"
                  value={rfq.process}
                  onChange={(e) => setRfq({ ...rfq, process: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Finish</label>
                <input
                  type="text"
                  value={rfq.finish || ''}
                  onChange={(e) => setRfq({ ...rfq, finish: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Deadline (Days)</label>
                <input
                  type="number"
                  value={rfq.deadline_days || ''}
                  onChange={(e) => setRfq({ ...rfq, deadline_days: parseInt(e.target.value) || undefined })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Max Budget ($/unit)</label>
                <input
                  type="number"
                  value={rfq.budget_per_unit || ''}
                  onChange={(e) => setRfq({ ...rfq, budget_per_unit: parseFloat(e.target.value) || undefined })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-500 to-sky-500 hover:from-indigo-600 hover:to-sky-600 text-white font-semibold py-2.5 rounded-lg transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Recalling Hindsight Memories...</span>
              ) : (
                <>
                  <Cpu className="w-4 h-4" /> Analyze RFQ with Memory
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Results Column */}
        <div className="lg:col-span-7 space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm">
              {error}
            </div>
          )}

          {!analysis && !error && !loading && (
            <div className="bg-slate-900/40 border border-slate-800 border-dashed rounded-xl p-12 text-center text-slate-500 space-y-3">
              <Brain className="w-12 h-12 mx-auto text-slate-700" />
              <p className="text-base font-medium text-slate-400">No RFQ Analysis Generated Yet</p>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Click "Analyze RFQ with Memory" to recall past supplier sourcing experiences and perform condition-aware evaluation.
              </p>
            </div>
          )}

          {analysis && (
            <div className="space-y-6">
              {/* Feasibility Header */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-100">{analysis.supplier}</h3>
                  {getStatusBadge(analysis.status)}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/60 border border-slate-800/80 rounded-lg p-4">
                  {analysis.summary}
                </p>
              </div>

              {/* Recalled Evidence */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4">
                <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Brain className="w-4 h-4 text-indigo-400" /> Recalled Historical Evidence ({analysis.evidence.length})
                </h4>
                <div className="space-y-3">
                  {analysis.evidence.map((item, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-lg border text-sm space-y-2 ${
                        item.outcome.toLowerCase() === 'successful'
                          ? 'bg-emerald-500/5 border-emerald-500/20'
                          : 'bg-red-500/5 border-red-500/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-200">{item.experience}</span>
                        <span
                          className={`text-xs font-bold uppercase px-2 py-0.5 rounded ${
                            item.outcome.toLowerCase() === 'successful'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-red-500/20 text-red-400'
                          }`}
                        >
                          {item.outcome}
                        </span>
                      </div>
                      {item.conditions.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {item.conditions.map((c, ci) => (
                            <span key={ci} className="text-xs bg-slate-950 border border-slate-800 text-slate-400 px-2 py-0.5 rounded">
                              {c.replace(/_/g, ' ')}
                            </span>
                          ))}
                        </div>
                      )}
                      {item.notes && <p className="text-xs text-slate-400 italic pt-1">{item.notes}</p>}
                    </div>
                  ))}
                  {analysis.evidence.length === 0 && (
                    <p className="text-xs text-slate-500">No matching historical experiences retained for this supplier.</p>
                  )}
                </div>
              </div>

              {/* Conditions & Risks Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Learned Conditions */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
                  <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Learned Success Conditions
                  </h4>
                  <ul className="space-y-2">
                    {analysis.learned_conditions.map((lc, i) => (
                      <li key={i} className="text-xs text-slate-300 bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> {lc}
                      </li>
                    ))}
                    {analysis.learned_conditions.length === 0 && (
                      <li className="text-xs text-slate-500">No prerequisite success conditions recorded.</li>
                    )}
                  </ul>
                </div>

                {/* Identified Risks */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
                  <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4" /> Historical Risk Factors
                  </h4>
                  <ul className="space-y-2">
                    {analysis.risks.map((risk, i) => (
                      <li key={i} className="text-xs text-slate-300 bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1 shrink-0"></span> {risk}
                      </li>
                    ))}
                    {analysis.risks.length === 0 && <li className="text-xs text-slate-500">No historical risk factors logged.</li>}
                  </ul>
                </div>
              </div>

              {/* Required Verification Actions */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-3">
                <h4 className="text-xs font-semibold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckSquare className="w-4 h-4" /> Required Pre-Sourcing Verification
                </h4>
                <div className="space-y-2">
                  {analysis.required_verification.map((v, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-slate-950 border border-slate-800 p-3 rounded-lg text-xs text-slate-300">
                      <span className="font-mono text-sky-400 font-bold">{idx + 1}.</span>
                      <span>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
