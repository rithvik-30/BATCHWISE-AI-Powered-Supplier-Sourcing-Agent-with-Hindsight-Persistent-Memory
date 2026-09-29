import React from 'react';
import { SupplierEvaluation } from '../types';
import { X, AlertTriangle, CheckCircle2, XCircle, ArrowRightLeft } from 'lucide-react';

interface ConditionComparisonModalProps {
  evaluation: SupplierEvaluation | null;
  onClose: () => void;
}

export const ConditionComparisonModal: React.FC<ConditionComparisonModalProps> = ({ evaluation, onClose }) => {
  if (!evaluation || !evaluation.comparison) return null;

  const comp = evaluation.comparison;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030509]/80 backdrop-blur-md animate-fadeIn font-sans">
      <div className="bg-[#030509] border border-white/20 rounded-sm max-w-3xl w-full p-6 space-y-6 shadow-2xl relative font-mono text-xs">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-sm hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ArrowRightLeft className="w-4 h-4 text-[#FDFF00]" />
            <h3 className="text-base font-bold text-white uppercase tracking-wider">
              Operating Condition Comparison — {evaluation.supplier}
            </h3>
          </div>
          <p className="text-xs text-slate-400 font-sans">
            Comparing current RFQ parameters against remembered historical order outcomes to identify decision-changing conditions.
          </p>
        </div>

        {/* Decision Changing Condition Callout */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-sm p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="font-sans">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block font-mono">
              Decision-Changing Condition Identified
            </span>
            <p className="text-xs font-semibold text-slate-200 mt-0.5 font-mono">
              {comp.decision_changing_condition}
            </p>
            <p className="text-xs text-slate-300 mt-1">
              Historical memory reveals that supplier feasibility flips from <strong className="text-emerald-400">SUCCESSFUL</strong> under standard tooling & stock material to <strong className="text-red-400">FAILURE</strong> when custom tooling setup fees are required on low-volume batches.
            </p>
          </div>
        </div>

        {/* Side-by-Side Comparison Table */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
          {/* Column 1: Current RFQ */}
          <div className="bg-[#030509] border border-[#FDFF00]/40 rounded-sm p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="font-bold text-[#FDFF00] uppercase tracking-wider text-[11px]">Current RFQ</span>
              <span className="px-2 py-0.5 rounded-sm bg-white/5 text-[#FDFF00] font-semibold text-[10px] border border-[#FDFF00]/30">EVALUATING</span>
            </div>
            <div className="space-y-2 text-slate-300">
              <div>
                <span className="text-slate-400 block text-[10px]">Quantity:</span>
                <span className="font-bold text-white">{comp.current_rfq.quantity} units</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Material:</span>
                <span>{comp.current_rfq.material}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Process:</span>
                <span>{comp.current_rfq.process}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Tooling Requirement:</span>
                <span className="text-amber-300 font-semibold">{comp.current_rfq.tooling}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Finish:</span>
                <span>{comp.current_rfq.finish}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Historical Experience A (Success) */}
          {comp.successful_experience && (
            <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-sm p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
                <span className="font-bold text-emerald-300 uppercase tracking-wider text-[11px] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Past Success
                </span>
                <span className="px-2 py-0.5 rounded-sm bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">SUCCESS</span>
              </div>
              <div className="space-y-2 text-slate-300">
                <div>
                  <span className="text-slate-400 block text-[10px]">Batch Quantity:</span>
                  <span className="font-bold text-emerald-300">{comp.successful_experience.quantity} units</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Material:</span>
                  <span>{comp.successful_experience.material}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Process:</span>
                  <span>{comp.successful_experience.process}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Tooling Condition:</span>
                  <span className="text-emerald-400 font-medium">{comp.successful_experience.tooling}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Outcome Rationale:</span>
                  <span className="text-slate-400 italic font-sans text-[11px]">Fulfilled without NRE setup penalties.</span>
                </div>
              </div>
            </div>
          )}

          {/* Column 3: Historical Experience B (Failure) */}
          {comp.failed_experience && (
            <div className="bg-red-950/20 border border-red-500/30 rounded-sm p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-red-500/20 pb-2">
                <span className="font-bold text-red-300 uppercase tracking-wider text-[11px] flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5 text-red-400" /> Past Failure
                </span>
                <span className="px-2 py-0.5 rounded-sm bg-red-500/20 text-red-400 font-bold text-[10px]">FAILED</span>
              </div>
              <div className="space-y-2 text-slate-300">
                <div>
                  <span className="text-slate-400 block text-[10px]">Batch Quantity:</span>
                  <span className="font-bold text-red-300">{comp.failed_experience.quantity} units</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Material:</span>
                  <span>{comp.failed_experience.material}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Process:</span>
                  <span>{comp.failed_experience.process}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Tooling Condition:</span>
                  <span className="text-red-400 font-medium">{comp.failed_experience.tooling}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Outcome Rationale:</span>
                  <span className="text-slate-400 italic font-sans text-[11px]">Custom tooling fee destroyed small-batch economics.</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Footer */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-sm bg-[#030509] hover:bg-white/10 border border-white/20 text-slate-200 text-xs font-mono uppercase tracking-wider transition-colors"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
