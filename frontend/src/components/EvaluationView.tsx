import React from 'react';
import {
  Activity,
  ShieldCheck,
  TrendingUp,
  Database,
  Layers,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

export const EvaluationView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-10 animate-fadeIn font-sans">
      {/* 1. Page Header */}
      <div className="space-y-3 pb-6 border-b border-white/10">
        <div className="flex items-center gap-2.5 text-xs font-mono text-slate-400 tracking-wider">
          <Activity className="w-4 h-4 text-[#FDFF00]" />
          <span>// PERFORMANCE BENCHMARKING</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight font-sans">
          Memory Learning Benchmark & Evaluation Suite
        </h1>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 flex-wrap">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>PHASE 3 CONTROLLED BENCHMARK</span>
          <span className="text-slate-600">•</span>
          <span>25 UNSEEN SMALL-BATCH MANUFACTURING EVALUATION CASES</span>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed max-w-4xl font-sans pt-1">
          This evaluation harness compares BATCHWISE{' '}
          <strong className="text-[#FDFF00] font-mono font-semibold">Memory-Aware Sourcing Analysis</strong>{' '}
          against a <strong className="text-slate-400 font-mono font-semibold">Memory-Blind Baseline</strong>{' '}
          (using static supplier capability claims without Hindsight recall).
        </p>
      </div>

      {/* 2. Cohesive Performance Overview Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono">
          <div className="text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#FDFF00]" />
            <span>// PERFORMANCE OVERVIEW</span>
          </div>
          <span className="text-[11px] text-slate-500">CONTROLLED EVALUATION HARNESS</span>
        </div>

        {/* Single Cohesive Metric Panel */}
        <div className="bg-[#030509] border border-white/10 rounded-md p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
          {/* Subtle top accent gradient */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FDFF00]/80 via-emerald-400/80 to-sky-400/80" />

          {/* Metric Grid with subtle vertical dividers */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 divide-y md:divide-y-0 lg:divide-x divide-white/10">
            {/* Metric 1: Synthetic Dataset */}
            <div className="lg:pr-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                  SYNTHETIC DATASET
                </span>
                <Database className="w-4 h-4 text-slate-500" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-white font-sans tracking-tight">
                  25
                </span>
                <span className="text-lg font-bold text-slate-400 font-mono">RFQs</span>
              </div>
              <p className="text-xs text-slate-400 leading-snug">
                10 Scenarios (NRE, tight deadline, custom tooling, etc.)
              </p>
            </div>

            {/* Metric 2: Memory-Aware Accuracy */}
            <div className="pt-6 md:pt-0 lg:px-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  MEMORY-AWARE ACCURACY
                </span>
                <span className="text-xs font-mono px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xs font-bold">
                  22/25
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-emerald-400 font-sans tracking-tight">
                  88.0%
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400/90 font-medium">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+40.0% point improvement over baseline</span>
              </div>
            </div>

            {/* Metric 3: Baseline Accuracy */}
            <div className="pt-6 lg:pt-0 lg:px-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                  BASELINE ACCURACY
                </span>
                <span className="text-xs font-mono px-2 py-0.5 bg-white/5 border border-white/10 text-slate-400 rounded-xs font-medium">
                  12/25
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-slate-400 font-sans tracking-tight">
                  48.0%
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-snug">
                Fails to detect hidden tooling NRE & schedule delays
              </p>
            </div>

            {/* Metric 4: Conditional Risk Detection */}
            <div className="pt-6 lg:pt-0 lg:pl-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-[#FDFF00] uppercase tracking-wider">
                  CONDITIONAL RISK DETECTION
                </span>
                <span className="text-xs font-mono px-2 py-0.5 bg-[#FDFF00]/10 border border-[#FDFF00]/30 text-[#FDFF00] rounded-xs font-bold">
                  13/13
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-[#FDFF00] font-sans tracking-tight">
                  100.0%
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-snug">
                Baseline conditional detection: <span className="text-amber-400 font-mono">0.0%</span> (13 false positives)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Mode Comparison Analytical Panels */}
      <div className="space-y-4">
        <div className="text-xs font-mono text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#FDFF00]" />
          <span>// MODE COMPARISON: MEMORY-AWARE VS MEMORY-BLIND</span>
        </div>

        {/* Clean 2-Column Comparison Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mode A Panel */}
          <div className="bg-[#030509] border-l-2 border-slate-600 border-y border-r border-white/10 rounded-r-md p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="font-mono font-bold text-slate-300 text-xs tracking-wider uppercase flex items-center gap-2">
                <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-slate-400 text-[10px]">
                  MODE A
                </span>
                <span>MEMORY-BLIND BASELINE</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">STATIC PROFILES ONLY</span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Analyzes RFQ requirements strictly against static supplier profiles (e.g. process lists, stated MOQs). Does not query Hindsight experience memory bank.
            </p>

            <div className="pt-2 border-t border-white/5 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-mono text-red-400 font-bold uppercase tracking-wider">
                <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                <span>KEY FAILURE MODE:</span>
              </div>
              <p className="text-xs text-slate-300 font-sans leading-relaxed pl-5">
                Incorrectly marks suppliers FEASIBLE on low-volume orders requiring custom tooling because the static profile says "CNC Machining".
              </p>
            </div>
          </div>

          {/* Mode B Panel */}
          <div className="bg-[#030509] border-l-2 border-[#FDFF00] border-y border-r border-white/10 rounded-r-md p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="font-mono font-bold text-[#FDFF00] text-xs tracking-wider uppercase flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#FDFF00]/10 border border-[#FDFF00]/30 text-[#FDFF00] text-[10px]">
                  MODE B
                </span>
                <span>BATCHWISE MEMORY-AWARE</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400">HINDSIGHT ACTIVE</span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Combines static profiles with Hindsight multi-strategy recalled experiences. Compares past order conditions against current RFQ parameters.
            </p>

            <div className="pt-2 border-t border-white/5 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>KEY STRENGTH:</span>
              </div>
              <p className="text-xs text-slate-200 font-sans leading-relaxed pl-5">
                Flags CONDITIONAL feasibility when batch size triggers tooling NRE costs or schedule delays, citing exact supporting historical order IDs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluationView;
