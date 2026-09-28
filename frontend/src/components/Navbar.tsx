import React from 'react';
import { HindsightStatus } from '../types';
import { Brain, Layers, Database, Cpu, Activity, ArrowRight } from 'lucide-react';

interface NavbarProps {
  activeTab: 'landing' | 'rfq' | 'suppliers' | 'memory' | 'evaluation';
  setActiveTab: (tab: 'landing' | 'rfq' | 'suppliers' | 'memory' | 'evaluation') => void;
  hindsightStatus: HindsightStatus | null;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, hindsightStatus }) => {
  return (
    <header className="bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Name */}
          <div
            onClick={() => setActiveTab('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="p-2 bg-gradient-to-br from-indigo-500/20 to-sky-500/20 rounded-xl border border-indigo-500/30 group-hover:border-indigo-500/60 transition-colors">
              <Brain className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-wider bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
                  BATCHWISE
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  HINDSIGHT MEMORY
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('landing')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'landing'
                  ? 'bg-slate-800 text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('rfq')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'rfq'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" /> New RFQ
            </button>
            <button
              onClick={() => setActiveTab('suppliers')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'suppliers'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" /> Suppliers
            </button>
            <button
              onClick={() => setActiveTab('memory')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'memory'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Database className="w-3.5 h-3.5" /> Experience Bank
            </button>
            <button
              onClick={() => setActiveTab('evaluation')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'evaluation'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Activity className="w-3.5 h-3.5" /> Evaluation
            </button>
          </nav>

          {/* Right Action: Hindsight Status & Quick CTA */}
          <div className="flex items-center gap-3">
            {hindsightStatus && (
              <div className="hidden lg:flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-[11px]">
                <span className="relative flex h-2 w-2">
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                      hindsightStatus.is_connected ? 'bg-emerald-400' : 'bg-amber-400'
                    } opacity-75`}
                  />
                  <span
                    className={`relative inline-flex rounded-full h-2 w-2 ${
                      hindsightStatus.is_connected ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                  />
                </span>
                <span
                  className={`font-semibold ${
                    hindsightStatus.is_connected ? 'text-emerald-400' : 'text-amber-400'
                  }`}
                >
                  {hindsightStatus.mode}
                </span>
              </div>
            )}

            <button
              onClick={() => setActiveTab('rfq')}
              className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span>Analyze RFQ</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
