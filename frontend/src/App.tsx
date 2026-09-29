import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import {
  RFQRequest,
  MultiSupplierAnalysisResponse,
  SupplierEvaluation,
  HindsightStatus
} from './types';
import { analyzeRFQMulti, getMemoryStatus } from './services/api';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { RfqIntakeForm, DEMO_RFQ_ALPHA } from './components/RfqIntakeForm';
import { SupplierCard } from './components/SupplierCard';
import { ConditionComparisonModal } from './components/ConditionComparisonModal';
import { EvidenceDrawer } from './components/EvidenceDrawer';
import { OutcomeRecordModal } from './components/OutcomeRecordModal';
import { SupplierDetailModal } from './components/SupplierDetailModal';
import { SupplierCatalogView } from './components/SupplierCatalogView';
import { MemoryBankView } from './components/MemoryBankView';
import { EvaluationView } from './components/EvaluationView';
import { Brain, Cpu, Sparkles, RefreshCw } from 'lucide-react';

export const AppContent: React.FC = () => {
  // RFQ State
  const [rfq, setRfq] = useState<RFQRequest>(DEMO_RFQ_ALPHA);
  const [loading, setLoading] = useState<boolean>(false);
  const [analysis, setAnalysis] = useState<MultiSupplierAnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hindsightStatus, setHindsightStatus] = useState<HindsightStatus | null>(null);
  const [learningNotification, setLearningNotification] = useState<string | null>(null);

  // Modals & Drawers State
  const [selectedEvidenceEval, setSelectedEvidenceEval] = useState<SupplierEvaluation | null>(null);
  const [selectedComparisonEval, setSelectedComparisonEval] = useState<SupplierEvaluation | null>(null);
  const [recordingSupplier, setRecordingSupplier] = useState<string | null>(null);
  const [deepDiveSupplier, setDeepDiveSupplier] = useState<string | null>(null);

  // Initial Memory Status Check
  useEffect(() => {
    getMemoryStatus()
      .then(setHindsightStatus)
      .catch((err) => console.warn('Memory status check:', err));
  }, []);

  // Main RFQ Analysis Execution
  const handleAnalyzeRFQ = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);
    setLearningNotification(null);
    try {
      const res = await analyzeRFQMulti(rfq);
      setAnalysis(res);
      setHindsightStatus(res.hindsight_status);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during RFQ sourcing analysis.');
    } finally {
      setLoading(false);
    }
  };

  // Callback when buyer records an outcome
  const handleOutcomeRecordedSuccess = () => {
    setLearningNotification(
      'New outcome saved to BATCHWISE memory! Re-executing Hindsight recall to demonstrate closed-loop learning...'
    );
    setTimeout(() => {
      handleAnalyzeRFQ();
    }, 1200);
  };

  // Shared Workspace Layout (AppShell) — renders Left Sidebar ONLY on /workspace/* routes
  const WorkspaceLayout: React.FC = () => {
    return (
      <div className="min-h-screen bg-[#030509] text-slate-100 flex flex-col font-sans selection:bg-[#FDFF00] selection:text-[#030509]">
        <Navbar hindsightStatus={hindsightStatus} />
        <main className="flex-1 md:pl-64 min-w-0 transition-all duration-200">
          <Outlet />
        </main>

        {/* Workspace Modals & Drawers */}
        <ConditionComparisonModal
          evaluation={selectedComparisonEval}
          onClose={() => setSelectedComparisonEval(null)}
        />
        <EvidenceDrawer
          evaluation={selectedEvidenceEval}
          onClose={() => setSelectedEvidenceEval(null)}
        />
        {recordingSupplier && (
          <OutcomeRecordModal
            rfq={rfq}
            supplierName={recordingSupplier}
            onClose={() => setRecordingSupplier(null)}
            onSuccess={handleOutcomeRecordedSuccess}
          />
        )}
        <SupplierDetailModal
          supplierName={deepDiveSupplier}
          onClose={() => setDeepDiveSupplier(null)}
        />
      </div>
    );
  };

  // New RFQ Sourcing Workstation Route Component
  const NewRfqView: React.FC = () => (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 pb-16 font-mono text-xs">
      {/* Learning Confirmation Notification */}
      {learningNotification && (
        <div className="bg-emerald-500/10 border-b border-emerald-500/40 text-emerald-400 p-3.5 flex items-center justify-between font-mono text-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>{learningNotification}</span>
          </div>
          <RefreshCw className="w-4 h-4 animate-spin" />
        </div>
      )}

      {/* Top Header Line */}
      <div className="border-b border-white/10 pb-3 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-white uppercase tracking-wider font-mono">
            NEW RFQ // SOURCING WORKSTATION
          </h1>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Evaluate small-batch RFQs against persistent supplier operating condition memory.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-400 font-mono">
          <span className="w-2 h-2 rounded-full bg-[#FDFF00] animate-pulse" />
          <span>HINDSIGHT_MEMORY: ACTIVE</span>
        </div>
      </div>

      {/* Top Grid: RFQ Intake Form & Workflow Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Form */}
        <div className="lg:col-span-6">
          <RfqIntakeForm
            rfq={rfq}
            setRfq={setRfq}
            onSubmit={handleAnalyzeRFQ}
            loading={loading}
          />
        </div>

        {/* Right Column: Open Visual Workflow & Context */}
        <div className="lg:col-span-6 space-y-8">
          {/* Workflow Section - Visual Process Timeline */}
          <div className="space-y-4">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Brain className="w-3.5 h-3.5 text-[#FDFF00]" />
              <span>// CONDITION-AWARE PIPELINE</span>
            </div>

            {/* Visual Step Process Line */}
            <div className="grid grid-cols-5 gap-1 text-center font-mono text-[10px] relative py-2">
              <div className="space-y-1">
                <div className="text-[#FDFF00] font-bold">01</div>
                <div className="text-white font-bold tracking-tight text-[9px]">INTAKE</div>
                <div className="w-full h-0.5 bg-[#FDFF00] mt-1" />
              </div>

              <div className="space-y-1">
                <div className="text-slate-400 font-bold">02</div>
                <div className="text-slate-300 font-medium tracking-tight text-[9px]">RECALL</div>
                <div className="w-full h-0.5 bg-white/20 mt-1" />
              </div>

              <div className="space-y-1">
                <div className="text-slate-400 font-bold">03</div>
                <div className="text-slate-300 font-medium tracking-tight text-[9px]">MEMORIES</div>
                <div className="w-full h-0.5 bg-white/20 mt-1" />
              </div>

              <div className="space-y-1">
                <div className="text-slate-400 font-bold">04</div>
                <div className="text-slate-300 font-medium tracking-tight text-[9px]">CONDITIONS</div>
                <div className="w-full h-0.5 bg-white/20 mt-1" />
              </div>

              <div className="space-y-1">
                <div className="text-slate-400 font-bold">05</div>
                <div className="text-slate-300 font-medium tracking-tight text-[9px]">DECISION</div>
                <div className="w-full h-0.5 bg-white/20 mt-1" />
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-sans border-l-2 border-[#FDFF00]/60 pl-3 py-1">
              Evaluates supplier feasibility with formula: <strong className="text-white font-mono">Supplier × Requirement × Operating Conditions → Outcome</strong>.
            </p>
          </div>

          {/* Open Empty Analysis State (NO giant dashed box card!) */}
          {!analysis && !loading && !error && (
            <div className="pt-6 border-t border-white/10 space-y-4 text-left font-mono">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full border border-[#FDFF00] flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-[#FDFF00]" />
                </div>
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  READY FOR SOURCING ANALYSIS
                </span>
              </div>

              <p className="text-xs text-slate-400 font-sans max-w-md leading-relaxed">
                Click <strong className="text-[#FDFF00] font-mono">[ ANALYZE WITH BATCHWISE → ]</strong> to compare your order parameters against historical supplier outcomes and recalled operating conditions.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => handleAnalyzeRFQ()}
                  className="px-5 py-2.5 bg-[#030509] border border-[#FDFF00] text-[#FDFF00] hover:bg-[#FDFF00] hover:text-[#030509] font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  [ RUN ANALYSIS NOW → ]
                </button>
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="p-4 border-l-2 border-red-500 bg-red-500/10 text-red-300 space-y-1 font-mono text-xs">
              <span className="font-bold block uppercase">// ANALYSIS_ERROR</span>
              <p className="font-sans text-xs">{error}</p>
            </div>
          )}
        </div>
      </div>

      {/* Sourcing Analysis Results Section */}
      {analysis && (
        <div className="space-y-6 pt-4 border-t border-white/10 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono">
            <div>
              <h3 className="text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Cpu className="w-5 h-5 text-[#FDFF00]" /> Supplier Feasibility Assessments ({analysis.evaluations.length})
              </h3>
              <p className="text-xs text-slate-400 mt-0.5 font-sans">
                Evaluated for {analysis.rfq.quantity} units of {analysis.rfq.product} ({analysis.rfq.material}, {analysis.rfq.process}).
              </p>
            </div>

            {/* Recalled Memories Summary Count */}
            <div className="flex items-center gap-2 text-xs bg-[#030509] border border-white/15 px-3 py-1.5 rounded-sm text-slate-200">
              <Brain className="w-4 h-4 text-[#FDFF00]" />
              <span>Hindsight Recalled: <strong className="text-[#FDFF00] font-mono">{analysis.hindsight_status.recalled_count} Memories</strong></span>
            </div>
          </div>

          {/* Supplier Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {analysis.evaluations.map((evalItem, idx) => (
              <SupplierCard
                key={idx}
                evaluation={evalItem}
                onViewEvidence={(e) => setSelectedEvidenceEval(e)}
                onViewComparison={(e) => setSelectedComparisonEval(e)}
                onRecordOutcome={(sName) => setRecordingSupplier(sName)}
                onViewDetail={(sName) => setDeepDiveSupplier(sName)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/workspace" element={<WorkspaceLayout />}>
        <Route index element={<Navigate to="/workspace/newrfq" replace />} />
        <Route path="newrfq" element={<NewRfqView />} />
        <Route path="suppliers" element={<SupplierCatalogView />} />
        <Route path="experience-bank" element={<MemoryBankView />} />
        <Route path="evaluation" element={<EvaluationView />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
