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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full p-6 space-y-6 shadow-2xl relative">
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
            <ArrowRightLeft className="w-5 h-5 text-indigo-400" />
            <h3 className="text-xl font-bold text-slate-100">
              Operating Condition Comparison — {evaluation.supplier}
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            Comparing current RFQ parameters against remembered historical order outcomes to identify decision-changing conditions.
          </p>
        </div>

        {/* Decision Changing Condition Callout */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
              Decision-Changing Condition Identified
            </span>
            <p className="text-sm font-semibold text-slate-200 mt-0.5">
              {comp.decision_changing_condition}
            </p>
            <p className="text-xs text-slate-300 mt-1">
              Historical memory reveals that supplier feasibility flips from <strong className="text-emerald-400">SUCCESSFUL</strong> under standard tooling & stock material to <strong className="text-red-400">FAILURE</strong> when custom tooling setup fees are required on low-volume batches.
            </p>
          </div>
        </div>

        {/* Side-by-Side Comparison Table */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Column 1: Current RFQ */}
          <div className="bg-slate-950 border border-indigo-500/30 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-bold text-indigo-300 uppercase tracking-wider">Current RFQ</span>
              <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400 font-semibold text-[10px]">EVALUATING</span>
            </div>
            <div className="space-y-2 text-slate-300">
              <div>
                <span className="text-slate-500 block text-[10px]">Quantity:</span>
                <span className="font-semibold text-slate-100">{comp.current_rfq.quantity} units</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Material:</span>
                <span>{comp.current_rfq.material}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Process:</span>
                <span>{comp.current_rfq.process}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Tooling Requirement:</span>
                <span className="text-amber-300 font-semibold">{comp.current_rfq.tooling}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Finish:</span>
                <span>{comp.current_rfq.finish}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Historical Experience A (Success) */}
          {comp.successful_experience && (
            <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
                <span className="font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Past Success
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">SUCCESS</span>
              </div>
              <div className="space-y-2 text-slate-300">
                <div>
                  <span className="text-slate-500 block text-[10px]">Batch Quantity:</span>
                  <span className="font-semibold text-emerald-300">{comp.successful_experience.quantity} units</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Material:</span>
                  <span>{comp.successful_experience.material}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Process:</span>
                  <span>{comp.successful_experience.process}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Tooling Condition:</span>
                  <span className="text-emerald-400 font-medium">{comp.successful_experience.tooling}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Outcome Rationale:</span>
                  <span className="text-slate-400 italic">Fulfilled without NRE setup penalties.</span>
                </div>
              </div>
            </div>
          )}

          {/* Column 3: Historical Experience B (Failure) */}
          {comp.failed_experience && (
            <div className="bg-red-950/20 border border-red-500/30 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-red-500/20 pb-2">
                <span className="font-bold text-red-300 uppercase tracking-wider flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5 text-red-400" /> Past Failure
                </span>
                <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 font-bold text-[10px]">FAILED</span>
              </div>
              <div className="space-y-2 text-slate-300">
                <div>
                  <span className="text-slate-500 block text-[10px]">Batch Quantity:</span>
                  <span className="font-semibold text-red-300">{comp.failed_experience.quantity} units</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Material:</span>
                  <span>{comp.failed_experience.material}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Process:</span>
                  <span>{comp.failed_experience.process}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Tooling Condition:</span>
                  <span className="text-red-400 font-medium">{comp.failed_experience.tooling}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Outcome Rationale:</span>
                  <span className="text-slate-400 italic">Custom tooling fee destroyed small-batch economics.</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Footer */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
