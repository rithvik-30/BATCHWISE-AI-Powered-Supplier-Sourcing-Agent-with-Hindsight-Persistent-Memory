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
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Database className="w-6 h-6 text-indigo-400" /> Hindsight Memory Substrate
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Persistent experience memory bank supporting retain, recall, and reflect operations.
          </p>
        </div>
        <button
          onClick={fetchStatus}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs rounded-lg transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Refresh Status
        </button>
      </div>

      {/* Memory Engine Status Card */}
      {status && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                <Server className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <span className="text-xs text-slate-500 font-mono block uppercase">MEMORY BANK NAMESPACE</span>
                <span className="text-lg font-bold text-slate-100 font-mono">{status.bank_id}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                status.is_connected
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
              }`}>
                {status.mode}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-slate-500 font-semibold block uppercase text-[10px]">Operational Mode:</span>
              <p className="text-slate-300 font-medium">{status.message}</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-slate-500 font-semibold block uppercase text-[10px]">Hindsight SDK Client:</span>
              <p className="text-slate-300 font-mono">hindsight-client v0.10.1 (Official PyPI)</p>
            </div>
          </div>

          {/* Live Hindsight Diagnostic Button */}
          <div className="pt-2 border-t border-slate-800/80 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-200">Run Live Hindsight Primitives Test</h4>
                <p className="text-xs text-slate-400">Verifies live retain, recall, and reflect calls against Hindsight SDK.</p>
              </div>
              <button
                onClick={handleLiveTest}
                disabled={testing}
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-sky-500 hover:from-indigo-600 hover:to-sky-600 text-white font-semibold text-xs rounded-lg transition-all shadow-md shadow-indigo-500/20 disabled:opacity-50 flex items-center gap-2"
              >
                {testing ? <span>Executing Diagnostic...</span> : <><Cpu className="w-4 h-4" /> Run Hindsight Test</>}
              </button>
            </div>

            {testResult && (
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-3 font-mono text-xs">
                <span className="text-slate-400 font-semibold block">LIVE HINDSIGHT TEST REPORT:</span>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">RETAIN:</span>
                    <span className={`font-bold ${testResult.retain === 'PASS' ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {testResult.retain}
                    </span>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">RECALL:</span>
                    <span className={`font-bold ${testResult.recall === 'PASS' ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {testResult.recall}
                    </span>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">REFLECT:</span>
                    <span className={`font-bold ${testResult.reflect === 'PASS' ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {testResult.reflect}
                    </span>
                  </div>
                </div>
                {testResult.overall && (
                  <div className="text-xs text-slate-400 pt-1">
                    Overall Integration Status: <strong className="text-slate-200">{testResult.overall}</strong>
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
