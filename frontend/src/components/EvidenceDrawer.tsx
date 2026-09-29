import React from 'react';
import { SupplierEvaluation } from '../types';
import { X, Brain, CheckCircle2, XCircle, Clock, Tag } from 'lucide-react';

interface EvidenceDrawerProps {
  evaluation: SupplierEvaluation | null;
  onClose: () => void;
}

export const EvidenceDrawer: React.FC<EvidenceDrawerProps> = ({ evaluation, onClose }) => {
  if (!evaluation) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#030509] border-l border-white/15 shadow-2xl p-6 flex flex-col space-y-6 overflow-y-auto animate-slideLeft font-sans">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono">
        <div>
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-[#FDFF00]" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Recalled Evidence</h3>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5 font-sans">
            Recalled from supplier memory: <span className="font-mono text-[#FDFF00]">batchwise_supplier_memory</span>
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1.5 rounded-sm hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Supplier Banner */}
      <div className="bg-[#030509] border border-white/12 rounded-sm p-4 flex items-center justify-between font-mono">
        <div>
          <span className="text-[10px] text-slate-400 block">SUPPLIER</span>
          <span className="text-sm font-bold text-white uppercase">{evaluation.supplier}</span>
        </div>
        <span className="text-[10px] font-semibold px-2.5 py-1 rounded-sm bg-white/5 text-[#FDFF00] border border-white/15">
          {evaluation.evidence.length} Memories Recalled
        </span>
      </div>

      {/* Evidence Items List */}
      <div className="space-y-4 flex-1 font-mono">
        {evaluation.evidence.map((item, idx) => {
          const isSuccess = item.outcome.toLowerCase() === 'successful';
          return (
            <div
              key={idx}
              className={`p-4 rounded-sm border text-xs space-y-3 ${
                isSuccess
                  ? 'bg-emerald-500/5 border-emerald-500/20'
                  : 'bg-red-500/5 border-red-500/20'
              }`}
            >
              {/* Item Top Bar */}
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-xs flex items-center gap-1.5 font-sans">
                  {isSuccess ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                  )}
                  {item.experience}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-sm font-bold text-[10px] uppercase ${
                    isSuccess
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}
                >
                  {item.outcome}
                </span>
              </div>

              {/* Relevance Reason */}
              {item.relevance_reason && (
                <div className="bg-[#030509] rounded-sm px-2.5 py-1.5 text-slate-300 text-[11px] flex items-center gap-1.5 border border-white/10 font-sans">
                  <Brain className="w-3.5 h-3.5 text-[#FDFF00] shrink-0" />
                  <span>{item.relevance_reason}</span>
                </div>
              )}

              {/* Operating Conditions Tags */}
              {item.conditions && item.conditions.length > 0 && (
                <div className="space-y-1">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase flex items-center gap-1">
                    <Tag className="w-3 h-3 text-slate-400" /> Recorded Operating Conditions:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {item.conditions.map((cond, ci) => (
                      <span
                        key={ci}
                        className="bg-[#030509] border border-white/10 text-slate-300 px-2 py-0.5 rounded-sm text-[10px]"
                      >
                        {cond.replace(/_/g, ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes / Failure Reason */}
              {item.notes && (
                <div className="text-slate-400 italic bg-[#030509] rounded-sm p-2 border border-white/10 text-[11px] font-sans">
                  "{item.notes}"
                </div>
              )}

              {/* Date */}
              {item.date && (
                <div className="flex items-center gap-1 text-[10px] text-slate-500">
                  <Clock className="w-3 h-3" /> Date: {item.date}
                </div>
              )}
            </div>
          );
        })}

        {evaluation.evidence.length === 0 && (
          <div className="text-center py-12 text-slate-500 space-y-2 font-mono">
            <Brain className="w-8 h-8 mx-auto text-slate-700" />
            <p className="text-sm font-medium text-slate-400">No Historical Evidence Found</p>
            <p className="text-xs text-slate-500 max-w-xs mx-auto font-sans">
              No historical sourcing experiences recorded for {evaluation.supplier} under matching parameters.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-white/10 font-mono">
        <button
          onClick={onClose}
          className="w-full py-2 bg-[#030509] hover:bg-white/10 text-slate-200 text-xs font-semibold rounded-sm border border-white/20 transition-colors uppercase tracking-wider"
        >
          Close Evidence Drawer
        </button>
      </div>
    </div>
  );
};
