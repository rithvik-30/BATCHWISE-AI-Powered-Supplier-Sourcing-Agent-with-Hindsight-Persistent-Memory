import React, { useEffect, useState } from 'react';
import { HindsightStatus } from '../types';
import { getMemoryStatus, runLiveTest } from '../services/api';
import { Database, RefreshCw, Cpu, Server } from 'lucide-react';

export const MemoryBankView: React.FC = () => {
  const [status, setStatus] = useState<HindsightStatus | null>(null);
  const [testResult, setTestResult] = useState<any | null>(null);
  const [testing, setTesting] = useState<boolean>(false);

  const fetchStatus = () => {
    getMemoryStatus()
      .then(setStatus)
      .catch(console.error);
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleLiveTest = async () => {
    setTesting(true);
    try {
      const res = await runLiveTest();
      setTestResult(res);
    } catch (err: any) {
      setTestResult({ error: err.message });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-6 font-mono">
        <div>
          <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Database className="w-5 h-5 text-[#FDFF00]" /> Hindsight Memory Substrate
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-sans">
            Persistent experience memory bank supporting retain, recall, and reflect operations.
          </p>
        </div>
        <button
          onClick={fetchStatus}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#030509] border border-white/15 hover:bg-white/10 text-slate-200 text-xs rounded-sm transition-colors uppercase font-mono tracking-wider"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Refresh Status
        </button>
      </div>

      {/* Memory Engine Status Card */}
      {status && (
        <div className="bg-[#030509]/80 border border-white/15 rounded-sm p-6 space-y-6 shadow-xl backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4 font-mono">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/5 rounded-sm border border-white/10">
                <Server className="w-5 h-5 text-[#FDFF00]" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-mono block uppercase">MEMORY BANK NAMESPACE</span>
                <span className="text-base font-bold text-white font-mono">{status.bank_id}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className={`px-3 py-1.5 rounded-sm text-xs font-bold uppercase ${
                status.is_connected
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
              }`}>
                {status.mode}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="bg-[#030509] p-4 rounded-sm border border-white/10 space-y-1.5">
              <span className="text-slate-400 font-semibold block uppercase text-[10px]">Operational Mode:</span>
              <p className="text-slate-200 font-medium font-sans text-xs">{status.message}</p>
            </div>
            <div className="bg-[#030509] p-4 rounded-sm border border-white/10 space-y-1.5">
              <span className="text-slate-400 font-semibold block uppercase text-[10px]">Hindsight SDK Client:</span>
              <p className="text-slate-300 font-mono">hindsight-client v0.10.1 (Official PyPI)</p>
            </div>
          </div>

          {/* Live Hindsight Diagnostic Button */}
          <div className="pt-2 border-t border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">Run Live Hindsight Primitives Test</h4>
                <p className="text-xs text-slate-400 font-sans mt-0.5">Verifies live retain, recall, and reflect calls against Hindsight SDK.</p>
              </div>
              <button
                onClick={handleLiveTest}
                disabled={testing}
                className="px-4 py-2 bg-[#030509] border border-[#FDFF00] text-[#FDFF00] hover:bg-[#FDFF00] hover:text-[#030509] font-bold text-xs uppercase tracking-wider rounded-sm transition-all shadow-sm disabled:opacity-50 flex items-center gap-2 font-mono"
              >
                {testing ? <span>Executing Diagnostic...</span> : <><Cpu className="w-4 h-4 text-[#FDFF00]" /> Run Hindsight Test</>}
              </button>
            </div>

            {testResult && (
              <div className="bg-[#030509] border border-white/15 p-4 rounded-sm space-y-3 font-mono text-xs">
                <span className="text-slate-400 font-semibold block uppercase text-[10px]">LIVE HINDSIGHT TEST REPORT:</span>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-[#030509] p-2.5 rounded-sm border border-white/10">
                    <span className="text-[10px] text-slate-400 block">RETAIN:</span>
                    <span className={`font-bold ${testResult.retain === 'PASS' ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {testResult.retain}
                    </span>
                  </div>
                  <div className="bg-[#030509] p-2.5 rounded-sm border border-white/10">
                    <span className="text-[10px] text-slate-400 block">RECALL:</span>
                    <span className={`font-bold ${testResult.recall === 'PASS' ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {testResult.recall}
                    </span>
                  </div>
                  <div className="bg-[#030509] p-2.5 rounded-sm border border-white/10">
                    <span className="text-[10px] text-slate-400 block">REFLECT:</span>
                    <span className={`font-bold ${testResult.reflect === 'PASS' ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {testResult.reflect}
                    </span>
                  </div>
                </div>
                {testResult.overall && (
                  <div className="text-xs text-slate-400 pt-1 font-mono">
                    Overall Integration Status: <strong className="text-white">{testResult.overall}</strong>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
