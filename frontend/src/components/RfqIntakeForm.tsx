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
    <div className="space-y-6 font-mono text-xs">
      {/* Workstation Header & Preset Selectors */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="text-[10px] font-mono text-[#FDFF00] uppercase tracking-widest flex items-center gap-1.5 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FDFF00] animate-pulse" />
            // WORKSTATION_INPUT
          </div>
          <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2 font-mono">
            <Layers className="w-4 h-4 text-[#FDFF00]" /> Small-Batch RFQ Intake
          </h2>
        </div>

        {/* Demo Preset Buttons */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setRfq(DEMO_RFQ_ALPHA)}
            className="text-[10px] px-3 py-1.5 bg-[#030509] text-[#FDFF00] border border-[#FDFF00]/50 hover:bg-[#FDFF00] hover:text-[#030509] transition-colors flex items-center gap-1.5 font-bold uppercase tracking-wider"
          >
            <Sparkles className="w-3 h-3 text-[#FDFF00]" /> Alpha Demo (75 Units)
          </button>
          <button
            type="button"
            onClick={() => setRfq(DEMO_RFQ_UNKNOWN)}
            className="text-[10px] px-3 py-1.5 bg-[#030509] hover:bg-white/10 text-slate-300 border border-white/20 transition-colors font-medium uppercase tracking-wider"
          >
            Unknown RFQ
          </button>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-5 font-sans">
        {/* Row 1: Product & Quantity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-mono font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
              Product / Part Name
            </label>
            <input
              type="text"
              value={rfq.product}
              onChange={(e) => setRfq({ ...rfq, product: e.target.value })}
              className="w-full bg-[#030509] border-b border-white/20 focus:border-[#FDFF00] px-3 py-2 text-xs text-white font-mono placeholder-slate-500 focus:outline-none transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-[10px] font-mono font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
              Quantity (Units)
            </label>
            <input
              type="number"
              value={rfq.quantity}
              onChange={(e) => setRfq({ ...rfq, quantity: parseInt(e.target.value) || 0 })}
              className="w-full bg-[#030509] border-b border-white/20 focus:border-[#FDFF00] px-3 py-2 text-xs text-white font-mono placeholder-slate-500 focus:outline-none transition-colors"
              required
            />
          </div>
        </div>

        {/* Row 2: Material & Process */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-mono font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
              Material Spec
            </label>
            <input
              type="text"
              value={rfq.material}
              onChange={(e) => setRfq({ ...rfq, material: e.target.value })}
              className="w-full bg-[#030509] border-b border-white/20 focus:border-[#FDFF00] px-3 py-2 text-xs text-white font-mono placeholder-slate-500 focus:outline-none transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-[10px] font-mono font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
              Manufacturing Process
            </label>
            <input
              type="text"
              value={rfq.process}
              onChange={(e) => setRfq({ ...rfq, process: e.target.value })}
              className="w-full bg-[#030509] border-b border-white/20 focus:border-[#FDFF00] px-3 py-2 text-xs text-white font-mono placeholder-slate-500 focus:outline-none transition-colors"
              required
            />
          </div>
        </div>

        {/* Row 3: Finish, Deadline, Target Price */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-[9px] font-mono text-slate-400 mb-1 uppercase tracking-wider">
              Surface Finish
            </label>
            <input
              type="text"
              value={rfq.finish || ''}
              onChange={(e) => setRfq({ ...rfq, finish: e.target.value })}
              className="w-full bg-[#030509] border-b border-white/20 focus:border-[#FDFF00] px-2.5 py-1.5 text-xs text-white font-mono placeholder-slate-500 focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-[9px] font-mono text-slate-400 mb-1 uppercase tracking-wider">
              Required Lead (Days)
            </label>
            <input
              type="number"
              value={rfq.deadline_days || ''}
              onChange={(e) => setRfq({ ...rfq, deadline_days: parseInt(e.target.value) || undefined })}
              className="w-full bg-[#030509] border-b border-white/20 focus:border-[#FDFF00] px-2.5 py-1.5 text-xs text-white font-mono placeholder-slate-500 focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-[9px] font-mono text-slate-400 mb-1 uppercase tracking-wider">
              Target Price ($/unit)
            </label>
            <input
              type="number"
              value={rfq.budget_per_unit || ''}
              onChange={(e) => setRfq({ ...rfq, budget_per_unit: parseFloat(e.target.value) || undefined })}
              className="w-full bg-[#030509] border-b border-white/20 focus:border-[#FDFF00] px-2.5 py-1.5 text-xs text-white font-mono placeholder-slate-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Additional Specs */}
        <div>
          <label className="block text-[10px] font-mono font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
            Quality & Additional Requirements
          </label>
          <input
            type="text"
            value={rfq.quality_requirements || ''}
            onChange={(e) => setRfq({ ...rfq, quality_requirements: e.target.value })}
            placeholder="e.g. Production-ready parts, CMM inspection report required"
            className="w-full bg-[#030509] border-b border-white/20 focus:border-[#FDFF00] px-3 py-2 text-xs text-white font-mono placeholder-slate-500 focus:outline-none transition-colors"
          />
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#030509] border border-[#FDFF00] text-[#FDFF00] hover:bg-[#FDFF00] hover:text-[#030509] font-bold text-xs uppercase tracking-wider font-mono transition-colors disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <span>Recalling Hindsight Supplier Memories...</span>
            ) : (
              <>
                <Cpu className="w-4 h-4 text-[#FDFF00]" />
                <span>[ ANALYZE WITH BATCHWISE → ]</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
