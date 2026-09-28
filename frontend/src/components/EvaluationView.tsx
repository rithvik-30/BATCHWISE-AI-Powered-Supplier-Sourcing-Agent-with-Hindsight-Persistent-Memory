import React from 'react';
import { Activity, ShieldCheck } from 'lucide-react';

export const EvaluationView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/30 rounded-xl">
            <Activity className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Memory Learning Benchmark & Evaluation Suite</h2>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Phase 3 Controlled Benchmark • 25 Unseen Small-Batch Manufacturing Evaluation Cases
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">
          This evaluation harness compares BATCHWISE <strong className="text-indigo-400">Memory-Aware Sourcing Analysis</strong> against a <strong className="text-slate-400">Memory-Blind Baseline</strong> (using static supplier capability claims without Hindsight recall).
        </p>
      </div>

      {/* Top Benchmark Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
          <span className="text-[11px] font-mono text-slate-400 uppercase">SYNTHETIC DATASET</span>
          <div className="text-3xl font-black text-white">25 RFQs</div>
          <p className="text-[11px] text-slate-400">10 Scenarios (NRE, tight deadline, custom tooling, etc.)</p>
        </div>

        <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-5 space-y-2">
          <span className="text-[11px] font-mono text-emerald-400 uppercase">MEMORY-AWARE ACCURACY</span>
          <div className="text-3xl font-black text-emerald-400">88.0% <span className="text-sm text-slate-400 font-normal">(22/25)</span></div>
          <p className="text-[11px] text-slate-400">+40.0% point improvement over baseline</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
          <span className="text-[11px] font-mono text-slate-400 uppercase">BASELINE ACCURACY</span>
          <div className="text-3xl font-black text-slate-400">48.0% <span className="text-sm text-slate-500 font-normal">(12/25)</span></div>
          <p className="text-[11px] text-slate-400">Fails to detect hidden tooling NRE & schedule delays</p>
        </div>

        <div className="bg-slate-900 border border-indigo-500/30 rounded-2xl p-5 space-y-2">
          <span className="text-[11px] font-mono text-indigo-400 uppercase">CONDITIONAL RISK DETECTION</span>
          <div className="text-3xl font-black text-indigo-400">100.0% <span className="text-sm text-slate-400 font-normal">(13/13)</span></div>
          <p className="text-[11px] text-slate-400">Baseline conditional detection: 0.0% (13 false positives)</p>
        </div>
      </div>

      {/* Comparative Analysis Breakdown */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-indigo-400" /> Mode Comparison: Memory-Aware vs Memory-Blind
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
            <div className="font-bold text-slate-300 font-mono text-sm">MODE A: MEMORY-BLIND BASELINE</div>
            <p className="text-slate-400 leading-relaxed">
              Analyzes RFQ requirements strictly against static supplier profiles (e.g. process lists, stated MOQs). Does not query Hindsight experience memory bank.
            </p>
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-300 rounded-lg space-y-1">
              <span className="font-bold block">Key Failure Mode:</span>
              <p>Incorrectly marks suppliers FEASIBLE on low-volume orders requiring custom tooling because the static profile says "CNC Machining".</p>
            </div>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-indigo-500/30 space-y-3">
            <div className="font-bold text-indigo-300 font-mono text-sm">MODE B: BATCHWISE MEMORY-AWARE</div>
            <p className="text-slate-400 leading-relaxed">
              Combines static profiles with Hindsight multi-strategy recalled experiences. Compares past order conditions against current RFQ parameters.
            </p>
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 rounded-lg space-y-1">
              <span className="font-bold block">Key Strength:</span>
              <p>Flags CONDITIONAL feasibility when batch size triggers tooling NRE costs or schedule delays, citing exact supporting historical order IDs.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluationView;
