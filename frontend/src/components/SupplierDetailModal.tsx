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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full p-6 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {loading && (
          <div className="py-12 text-center text-slate-400 text-sm">
            Loading supplier intelligence profile...
          </div>
        )}

        {detail && !loading && (
          <div className="space-y-6">
            {/* Header */}
            <div className="border-b border-slate-800 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-slate-100">{detail.supplier}</h3>
                  <p className="text-xs text-slate-400 mt-1">{detail.summary}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {detail.assessment}
                </span>
              </div>
            </div>

            {/* Success & Failure Patterns Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Success Patterns */}
              <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Learned Success Patterns
                </h4>
                <div className="space-y-2">
                  {detail.success_patterns.map((sp, i) => (
                    <div key={i} className="text-xs text-slate-300 bg-slate-950/80 p-2.5 rounded border border-emerald-500/10">
                      {sp}
                    </div>
                  ))}
                  {detail.success_patterns.length === 0 && (
                    <p className="text-xs text-slate-500">No recorded success patterns.</p>
                  )}
                </div>
              </div>

              {/* Failure Patterns */}
              <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4" /> Learned Failure Patterns
                </h4>
                <div className="space-y-2">
                  {detail.failure_patterns.map((fp, i) => (
                    <div key={i} className="text-xs text-slate-300 bg-slate-950/80 p-2.5 rounded border border-red-500/10">
                      {fp}
                    </div>
                  ))}
                  {detail.failure_patterns.length === 0 && (
                    <p className="text-xs text-slate-500">No recorded failure patterns.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Learned Conditions & Required Verifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Prerequisite Operating Conditions</h4>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {detail.learned_conditions.map((lc, i) => (
                    <span key={i} className="text-xs bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-1 rounded">
                      {lc}
                    </span>
                  ))}
                  {detail.learned_conditions.length === 0 && (
                    <span className="text-xs text-slate-500">None recorded.</span>
                  )}
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1">
                  <CheckSquare className="w-3.5 h-3.5" /> Required Verification
                </h4>
                <ul className="space-y-1 text-xs text-slate-300">
                  {detail.verification_required.map((v, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-sky-400 font-bold">•</span> {v}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Full Historical Experience Timeline */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-indigo-400" /> Historical Order Timeline ({detail.experiences.length})
              </h4>
              <div className="space-y-2">
                {detail.experiences.map((exp: any, i: number) => {
                  const isSucc = exp.outcome?.toLowerCase() === 'successful';
                  return (
                    <div key={i} className="bg-slate-950 border border-slate-800 p-3 rounded-xl flex items-center justify-between text-xs">
                      <div>
                        <span className="font-semibold text-slate-200">{exp.quantity} units of {exp.product}</span>
                        <div className="text-slate-400 text-[11px] mt-0.5">
                          {exp.material} • {exp.process} • {exp.finish || 'Standard finish'}
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${
                        isSucc ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {exp.outcome}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-800">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors"
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
