import React from 'react';
import { HindsightStatus } from '../types';
import { Brain } from 'lucide-react';

interface NavbarProps {
  activeTab: 'landing' | 'rfq' | 'suppliers' | 'memory' | 'evaluation';
  setActiveTab: (tab: 'landing' | 'rfq' | 'suppliers' | 'memory' | 'evaluation') => void;
  hindsightStatus: HindsightStatus | null;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, hindsightStatus }) => {
  return (
    <header className="bg-slate-950 border-b border-slate-800 sticky top-0 z-40 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Brand Logo & Name */}
          <div
            onClick={() => setActiveTab('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="p-1.5 bg-slate-900 border border-slate-800 rounded-sm text-indigo-400">
              <Brain className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-black text-sm tracking-wider text-white uppercase">
                BATCHWISE
              </span>
              <span className="text-[10px] px-1.5 py-0.5 bg-slate-900 border border-slate-800 text-slate-400">
                HINDSIGHT MEMORY
              </span>
            </div>
          </div>

          {/* Center Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('landing')}
              className={`px-3 py-1.5 rounded-sm transition-colors ${
                activeTab === 'landing'
                  ? 'bg-slate-900 text-white font-bold border border-slate-800'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              OVERVIEW
            </button>
            <button
              onClick={() => setActiveTab('rfq')}
              className={`px-3 py-1.5 rounded-sm transition-colors ${
                activeTab === 'rfq'
                  ? 'bg-slate-900 text-indigo-300 font-bold border border-slate-800'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              NEW RFQ
            </button>
            <button
              onClick={() => setActiveTab('suppliers')}
              className={`px-3 py-1.5 rounded-sm transition-colors ${
                activeTab === 'suppliers'
                  ? 'bg-slate-900 text-indigo-300 font-bold border border-slate-800'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              SUPPLIERS
            </button>
            <button
              onClick={() => setActiveTab('memory')}
              className={`px-3 py-1.5 rounded-sm transition-colors ${
                activeTab === 'memory'
                  ? 'bg-slate-900 text-indigo-300 font-bold border border-slate-800'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              EXPERIENCE BANK
            </button>
            <button
              onClick={() => setActiveTab('evaluation')}
              className={`px-3 py-1.5 rounded-sm transition-colors ${
                activeTab === 'evaluation'
                  ? 'bg-slate-900 text-indigo-300 font-bold border border-slate-800'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              EVALUATION
            </button>
          </nav>

          {/* Right Status & Primary CTA */}
          <div className="flex items-center gap-3">
            {hindsightStatus && (
              <div className="hidden lg:flex items-center gap-2 bg-slate-900 border border-slate-800 px-2.5 py-1 text-[10px]">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    hindsightStatus.is_connected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                  }`}
                />
                <span className={hindsightStatus.is_connected ? 'text-emerald-400' : 'text-amber-400'}>
                  {hindsightStatus.mode}
                </span>
              </div>
            )}

            <button
              onClick={() => setActiveTab('rfq')}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider transition-colors rounded-sm shadow-sm"
            >
              [ ANALYZE RFQ → ]
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
