import React from 'react';
import { SupplierEvaluation } from '../types';
import { CheckCircle2, AlertTriangle, HelpCircle, Brain, ArrowRightLeft, PlusCircle, ExternalLink, ShieldAlert, CheckSquare } from 'lucide-react';

interface SupplierCardProps {
  evaluation: SupplierEvaluation;
  onViewEvidence: (evaluation: SupplierEvaluation) => void;
  onViewComparison: (evaluation: SupplierEvaluation) => void;
  onRecordOutcome: (supplierName: string) => void;
  onViewDetail: (supplierName: string) => void;
}

export const SupplierCard: React.FC<SupplierCardProps> = ({
  evaluation,
  onViewEvidence,
  onViewComparison,
  onRecordOutcome,
  onViewDetail
}) => {
  const getStatusBadge = (status: string) => {
    switch (status.toUpperCase()) {
      case 'FEASIBLE':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-4 h-4" /> FEASIBLE
          </span>
        );
      case 'CONDITIONAL':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <AlertTriangle className="w-4 h-4" /> CONDITIONAL
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-500/10 text-slate-400 border border-slate-500/30">
            <HelpCircle className="w-4 h-4" /> INSUFFICIENT EVIDENCE
          </span>
        );
    }
  };

  return (
    <div className="bg-[#030509]/80 border border-white/15 hover:border-white/30 rounded-sm p-6 space-y-5 transition-all shadow-lg flex flex-col justify-between backdrop-blur-sm">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-white uppercase tracking-tight flex items-center gap-2">
              {evaluation.supplier}
            </h3>
            {evaluation.last_known_outcome && (
              <span className="text-[10px] text-slate-400 font-mono">
                Last Known Outcome: <strong className="text-slate-200 uppercase font-mono">{evaluation.last_known_outcome}</strong>
              </span>
            )}
          </div>
          {getStatusBadge(evaluation.status)}
        </div>

        {/* Executive Summary */}
        <p className="text-xs text-slate-300 leading-relaxed bg-[#030509] border border-white/10 rounded-sm p-3.5 font-sans">
          {evaluation.summary}
        </p>

        {/* Decision-Changing Condition Callout */}
        {evaluation.decision_changing_condition && evaluation.status.toUpperCase() === 'CONDITIONAL' && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-sm p-3 space-y-1 font-mono">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
              Decision-Changing Condition
            </span>
            <p className="text-xs font-semibold text-slate-200 font-sans">
              {evaluation.decision_changing_condition}
            </p>
          </div>
        )}

        {/* Learned Conditions & Risks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {/* Learned Success Conditions */}
          <div className="bg-[#030509] p-3 rounded-sm border border-white/10 space-y-2 font-mono">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Learned Success Conditions
            </span>
            <ul className="space-y-1 text-[11px] text-slate-300 font-sans">
              {evaluation.learned_conditions.map((lc, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span> {lc}
                </li>
              ))}
              {evaluation.learned_conditions.length === 0 && (
                <li className="text-slate-500 italic">No specific prerequisite conditions logged.</li>
              )}
            </ul>
          </div>

          {/* Risk Factors */}
          <div className="bg-[#030509] p-3 rounded-sm border border-white/10 space-y-2 font-mono">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" /> Historical Risk Factors
            </span>
            <ul className="space-y-1 text-[11px] text-slate-300 font-sans">
              {evaluation.risks.map((risk, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1"></span> {risk}
                </li>
              ))}
              {evaluation.risks.length === 0 && (
                <li className="text-slate-500 italic">No historical risk factors logged.</li>
              )}
            </ul>
          </div>
        </div>

        {/* Required Verification Actions */}
        <div className="bg-[#030509] p-3 rounded-sm border border-white/10 space-y-2 text-xs font-mono">
          <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1">
            <CheckSquare className="w-3.5 h-3.5" /> Required Pre-Sourcing Verification
          </span>
          <div className="space-y-1">
            {evaluation.required_verification.map((v, i) => (
              <div key={i} className="text-[11px] text-slate-300 flex items-start gap-2 font-sans">
                <span className="font-mono text-sky-400 font-bold">{i + 1}.</span>
                <span>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Footer Buttons */}
      <div className="pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono">
        <button
          onClick={() => onViewEvidence(evaluation)}
          className="py-2 px-3 bg-[#030509] hover:bg-white/10 text-[#FDFF00] border border-white/15 rounded-sm text-[11px] font-semibold transition-colors flex items-center justify-center gap-1.5"
        >
          <Brain className="w-3.5 h-3.5 text-[#FDFF00]" />
          <span>Evidence ({evaluation.evidence_count})</span>
        </button>

        {evaluation.comparison && (
          <button
            onClick={() => onViewComparison(evaluation)}
            className="py-2 px-3 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-sm text-[11px] font-semibold transition-colors flex items-center justify-center gap-1.5"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>Comparison</span>
          </button>
        )}

        <button
          onClick={() => onRecordOutcome(evaluation.supplier)}
          className="py-2 px-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-sm text-[11px] font-semibold transition-colors flex items-center justify-center gap-1.5"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Outcome</span>
        </button>

        <button
          onClick={() => onViewDetail(evaluation.supplier)}
          className="py-2 px-3 bg-[#030509] hover:bg-white/10 text-slate-300 border border-white/20 rounded-sm text-[11px] font-semibold transition-colors flex items-center justify-center gap-1.5"
        >
          <span>Deep Dive</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
