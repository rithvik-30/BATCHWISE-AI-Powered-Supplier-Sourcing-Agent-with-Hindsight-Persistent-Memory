import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HindsightStatus } from '../types';
import {
  Brain,
  PlusCircle,
  Building2,
  Database,
  BarChart3,
  ArrowRight,
  Menu,
  X,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  hindsightStatus: HindsightStatus | null;
}

export const Navbar: React.FC<NavbarProps> = ({ hindsightStatus }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    {
      label: 'NEW RFQ',
      path: '/workspace/newrfq',
      icon: PlusCircle,
      active: pathname === '/workspace/newrfq' || pathname === '/workspace'
    },
    {
      label: 'SUPPLIERS',
      path: '/workspace/suppliers',
      icon: Building2,
      active: pathname === '/workspace/suppliers'
    },
    {
      label: 'EXPERIENCE BANK',
      path: '/workspace/experience-bank',
      icon: Database,
      active: pathname === '/workspace/experience-bank'
    },
    {
      label: 'EVALUATION',
      path: '/workspace/evaluation',
      icon: BarChart3,
      active: pathname === '/workspace/evaluation'
    }
  ];

  const handleNav = (path: string) => {
    navigate(path);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-[#030509] border-b border-white/10 sticky top-0 z-50 font-mono text-xs">
        <div
          onClick={() => handleNav('/')}
          className="flex items-center gap-2.5 cursor-pointer"
        >
          <div className="p-1 bg-white/5 border border-white/10 rounded-sm text-[#FDFF00]">
            <Brain className="w-4 h-4" />
          </div>
          <span className="font-black text-sm tracking-wider text-white uppercase">
            BATCHWISE
          </span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-1.5 text-slate-300 hover:text-white border border-white/10 bg-white/5 rounded-sm"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Backdrop overlay for mobile drawer */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/70 z-40 md:hidden backdrop-blur-xs"
        />
      )}

      {/* Fixed Vertical Left Sidebar */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-[#030509] border-r border-white/10 flex flex-col justify-between font-mono text-xs transition-transform duration-200 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex flex-col flex-1 min-h-0">
          {/* Brand Header */}
          <div className="p-5 border-b border-white/10 flex flex-col gap-2">
            <div
              onClick={() => handleNav('/')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="p-2 bg-white/5 border border-white/10 rounded-sm text-[#FDFF00] group-hover:border-[#FDFF00]/50 transition-colors">
                <Brain className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-base tracking-wider text-white uppercase">
                  BATCHWISE
                </span>
                <span className="text-[9px] text-slate-400 tracking-wider">
                  PROCUREMENT INTELLIGENCE
                </span>
              </div>
            </div>

            <div className="mt-1 flex items-center justify-between text-[10px] bg-white/5 border border-white/10 px-2.5 py-1 text-slate-300 rounded-xs">
              <span className="text-slate-400">MEMORY ENGINE</span>
              <span className="text-[#FDFF00] font-bold">HINDSIGHT v2.4</span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="p-3 space-y-1.5 overflow-y-auto flex-1">
            <div className="px-2 py-1.5 text-[9px] font-bold text-slate-500 uppercase tracking-widest">
              // WORKSPACE MODULES
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNav(item.path)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-xs font-bold transition-all text-left ${
                    item.active
                      ? 'bg-white/10 text-[#FDFF00] border-l-2 border-[#FDFF00] pl-3 shadow-xs'
                      : 'text-slate-400 hover:text-white hover:bg-white/5 border-l-2 border-transparent'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      item.active ? 'text-[#FDFF00]' : 'text-slate-500 group-hover:text-slate-300'
                    }`}
                  />
                  <span className="tracking-wider uppercase">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Hindsight Status & Action Button */}
        <div className="p-4 border-t border-white/10 space-y-3 bg-[#030509]">
          {hindsightStatus && (
            <div className="flex items-center justify-between bg-white/5 border border-white/10 px-3 py-2 rounded-xs text-[10px]">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    hindsightStatus.is_connected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                  }`}
                />
                <span className="text-slate-400 font-bold uppercase">STATUS</span>
              </div>
              <span
                className={`font-bold ${
                  hindsightStatus.is_connected ? 'text-emerald-400' : 'text-amber-400'
                }`}
              >
                {hindsightStatus.mode}
              </span>
            </div>
          )}

          <button
            onClick={() => handleNav('/workspace/newrfq')}
            className="w-full py-2.5 px-3 bg-[#030509] border border-[#FDFF00] text-[#FDFF00] hover:bg-[#FDFF00] hover:text-[#030509] font-bold text-xs uppercase tracking-wider transition-colors rounded-sm flex items-center justify-center gap-2 group"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FDFF00] group-hover:text-[#030509] transition-colors" />
            <span>ANALYZE RFQ</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
