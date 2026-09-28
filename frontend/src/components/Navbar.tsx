import React from 'react';
import { HindsightStatus } from '../types';
import { Brain, Layers, Database, Cpu } from 'lucide-react';

interface NavbarProps {
  activeTab: 'rfq' | 'suppliers' | 'memory';
  setActiveTab: (tab: 'rfq' | 'suppliers' | 'memory') => void;
  hindsightStatus: HindsightStatus | null;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, hindsightStatus }) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-indigo-500/20 to-sky-500/20 rounded-xl border border-indigo-500/30">
              <Brain className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-wider bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
                  BATCHWISE
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  v2.0 HINDSIGHT MEMORY
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Supplier Memory for Small-Batch Sourcing • <span className="italic font-serif text-slate-300">"Don't just compare suppliers. Remember what happened."</span>
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex space-x-1 sm:space-x-2">
            <button
              onClick={() => setActiveTab('rfq')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                activeTab === 'rfq'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Cpu className="w-4 h-4" /> New RFQ Analysis
            </button>
            <button
              onClick={() => setActiveTab('suppliers')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                activeTab === 'suppliers'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Layers className="w-4 h-4" /> Supplier Intelligence
            </button>
            <button
              onClick={() => setActiveTab('memory')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                activeTab === 'memory'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Database className="w-4 h-4" /> Experience Bank
            </button>
          </nav>

          {/* Hindsight Status Badge */}
          {hindsightStatus && (
            <div className="hidden lg:flex items-center gap-3 bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-1.5 text-xs">
              <div className="flex items-center gap-1.5">
                {hindsightStatus.is_connected ? (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                ) : (
                  <span className="h-2 w-2 rounded-full bg-amber-400"></span>
                )}
                <span className={`font-semibold ${hindsightStatus.is_connected ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {hindsightStatus.mode}
                </span>
              </div>
              <div className="h-3 w-px bg-slate-800"></div>
              <span className="font-mono text-slate-400 text-[11px] truncate max-w-[120px]">
                {hindsightStatus.bank_id}
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
