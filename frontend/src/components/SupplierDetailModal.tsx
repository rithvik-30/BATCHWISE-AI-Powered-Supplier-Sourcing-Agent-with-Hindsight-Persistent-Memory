import React, { useEffect, useState } from 'react';
import { SupplierDetail } from '../types';
import { getSupplierDetail } from '../services/api';
import { X, CheckCircle2, ShieldAlert, CheckSquare, Clock } from 'lucide-react';

interface SupplierDetailModalProps {
  supplierName: string | null;
  onClose: () => void;
}

export const SupplierDetailModal: React.FC<SupplierDetailModalProps> = ({ supplierName, onClose }) => {
  const [detail, setDetail] = useState<SupplierDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (supplierName) {
      setLoading(true);
      getSupplierDetail(supplierName)
        .then(setDetail)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [supplierName]);

  if (!supplierName) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030509]/80 backdrop-blur-md animate-fadeIn font-sans">
      <div className="bg-[#030509] border border-white/20 rounded-sm max-w-3xl w-full p-6 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto font-mono text-xs">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-sm hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {loading && (
          <div className="py-12 text-center text-slate-400 font-mono text-xs">
            Loading supplier intelligence profile...
          </div>
        )}

        {detail && !loading && (
          <div className="space-y-6 font-mono">
            {/* Header */}
            <div className="border-b border-white/10 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white uppercase tracking-wider">{detail.supplier}</h3>
                  <p className="text-xs text-slate-400 mt-1 font-sans">{detail.summary}</p>
                </div>
                <span className="px-3 py-1 rounded-sm text-xs font-bold bg-white/5 text-[#FDFF00] border border-white/15 uppercase">
                  {detail.assessment}
                </span>
              </div>
            </div>

            {/* Success & Failure Patterns Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Success Patterns */}
              <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-sm p-4 space-y-3">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 font-mono">
                  <CheckCircle2 className="w-4 h-4" /> Learned Success Patterns
                </h4>
                <div className="space-y-2 font-sans">
                  {detail.success_patterns.map((sp, i) => (
                    <div key={i} className="text-xs text-slate-300 bg-[#030509] p-2.5 rounded-sm border border-emerald-500/20">
                      {sp}
                    </div>
                  ))}
                  {detail.success_patterns.length === 0 && (
                    <p className="text-xs text-slate-500 italic">No recorded success patterns.</p>
                  )}
                </div>
              </div>

              {/* Failure Patterns */}
              <div className="bg-red-500/5 border border-red-500/20 rounded-sm p-4 space-y-3">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5 font-mono">
                  <ShieldAlert className="w-4 h-4" /> Learned Failure Patterns
                </h4>
                <div className="space-y-2 font-sans">
                  {detail.failure_patterns.map((fp, i) => (
                    <div key={i} className="text-xs text-slate-300 bg-[#030509] p-2.5 rounded-sm border border-red-500/20">
                      {fp}
                    </div>
                  ))}
                  {detail.failure_patterns.length === 0 && (
                    <p className="text-xs text-slate-500 italic">No recorded failure patterns.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Learned Conditions & Required Verifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono">
              <div className="bg-[#030509] border border-white/12 rounded-sm p-4 space-y-2">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Prerequisite Operating Conditions</h4>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {detail.learned_conditions.map((lc, i) => (
                    <span key={i} className="text-[11px] bg-[#030509] border border-white/15 text-slate-300 px-2.5 py-1 rounded-sm">
                      {lc}
                    </span>
                  ))}
                  {detail.learned_conditions.length === 0 && (
                    <span className="text-xs text-slate-500 italic font-sans">None recorded.</span>
                  )}
                </div>
              </div>

              <div className="bg-[#030509] border border-white/12 rounded-sm p-4 space-y-2">
                <h4 className="text-[10px] font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1">
                  <CheckSquare className="w-3.5 h-3.5" /> Required Verification
                </h4>
                <ul className="space-y-1 text-xs text-slate-300 font-sans">
                  {detail.verification_required.map((v, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-sky-400 font-bold font-mono">•</span> {v}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Full Historical Experience Timeline */}
            <div className="space-y-3 font-mono">
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#FDFF00]" /> Historical Order Timeline ({detail.experiences.length})
              </h4>
              <div className="space-y-2">
                {detail.experiences.map((exp: any, i: number) => {
                  const isSucc = exp.outcome?.toLowerCase() === 'successful';
                  return (
                    <div key={i} className="bg-[#030509] border border-white/10 p-3 rounded-sm flex items-center justify-between text-xs font-mono">
                      <div>
                        <span className="font-bold text-white">{exp.quantity} units of {exp.product}</span>
                        <div className="text-slate-400 text-[11px] mt-0.5 font-sans">
                          {exp.material} • {exp.process} • {exp.finish || 'Standard finish'}
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 rounded-sm font-bold uppercase text-[10px] ${
                        isSucc ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {exp.outcome}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-white/10">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-[#030509] hover:bg-white/10 text-slate-200 text-xs font-mono font-semibold rounded-sm border border-white/20 uppercase tracking-wider transition-colors"
              >
                Close Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
