import React from 'react';
import { RFQRequest } from '../types';
import { Cpu, Layers, Sparkles } from 'lucide-react';

interface RfqIntakeFormProps {
  rfq: RFQRequest;
  setRfq: (rfq: RFQRequest) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

export const DEMO_RFQ_ALPHA: RFQRequest = {
  product: 'Aluminium Enclosure',
  quantity: 75,
  material: '6061 Aluminium',
  process: 'CNC Machining',
  finish: 'Black Anodized',
  deadline_days: 14,
  budget_per_unit: 1500,
  quality_requirements: 'Production-ready parts, tight tolerances',
  additional_requirements: 'Standard tooling preferred'
};

export const DEMO_RFQ_UNKNOWN: RFQRequest = {
  product: 'Quantum Cryo Substrate',
  quantity: 5,
  material: 'Metamaterial B-4',
  process: 'Cryogenic Micro-Etching',
  finish: 'Polished',
  deadline_days: 7,
  budget_per_unit: 5000,
  target_supplier: 'Omni Quantum Labs'
};

export const RfqIntakeForm: React.FC<RfqIntakeFormProps> = ({ rfq, setRfq, onSubmit, loading }) => {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" /> Small-Batch RFQ Intake
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Enter order parameters to compare historical supplier operating conditions.
          </p>
        </div>

        {/* Demo Preset Buttons */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setRfq(DEMO_RFQ_ALPHA)}
            className="text-xs px-2.5 py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 transition-colors flex items-center gap-1 font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5" /> Alpha Demo (75 Units)
          </button>
          <button
            type="button"
            onClick={() => setRfq(DEMO_RFQ_UNKNOWN)}
            className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors font-medium"
          >
            Unknown RFQ
          </button>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        {/* Row 1: Product & Quantity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Product / Part Name</label>
            <input
              type="text"
              value={rfq.product}
              onChange={(e) => setRfq({ ...rfq, product: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Quantity (Units)</label>
            <input
              type="number"
              value={rfq.quantity}
              onChange={(e) => setRfq({ ...rfq, quantity: parseInt(e.target.value) || 0 })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
        </div>

        {/* Row 2: Material & Process */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Material Spec</label>
            <input
              type="text"
              value={rfq.material}
              onChange={(e) => setRfq({ ...rfq, material: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Manufacturing Process</label>
            <input
              type="text"
              value={rfq.process}
              onChange={(e) => setRfq({ ...rfq, process: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
        </div>

        {/* Row 3: Finish, Deadline, Target Price */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Surface Finish</label>
            <input
              type="text"
              value={rfq.finish || ''}
              onChange={(e) => setRfq({ ...rfq, finish: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Required Lead (Days)</label>
            <input
              type="number"
              value={rfq.deadline_days || ''}
              onChange={(e) => setRfq({ ...rfq, deadline_days: parseInt(e.target.value) || undefined })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Target Price ($/unit)</label>
            <input
              type="number"
              value={rfq.budget_per_unit || ''}
              onChange={(e) => setRfq({ ...rfq, budget_per_unit: parseFloat(e.target.value) || undefined })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Additional Specs */}
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Quality & Additional Requirements</label>
          <input
            type="text"
            value={rfq.quality_requirements || ''}
            onChange={(e) => setRfq({ ...rfq, quality_requirements: e.target.value })}
            placeholder="e.g. Production-ready parts, CMM inspection report required"
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Action Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 hover:from-indigo-600 hover:to-emerald-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-500/25 disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          {loading ? (
            <span>Recalling Hindsight Supplier Memories...</span>
          ) : (
            <>
              <Cpu className="w-5 h-5" /> Analyze with BATCHWISE
            </>
          )}
        </button>
      </form>
    </div>
  );
};
