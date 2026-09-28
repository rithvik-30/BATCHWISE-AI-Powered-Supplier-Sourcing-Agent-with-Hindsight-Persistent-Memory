import React, { useState, useEffect } from 'react';
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

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'landing' | 'rfq' | 'suppliers' | 'memory' | 'evaluation'>('landing');

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
    // Automatically re-run RFQ analysis to show newly learned memory!
    setTimeout(() => {
      handleAnalyzeRFQ();
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        hindsightStatus={hindsightStatus}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Tab 1: Product Landing Page */}
        {activeTab === 'landing' && (
          <LandingPage
            onNavigateToRfq={() => setActiveTab('rfq')}
            onNavigateToSuppliers={() => setActiveTab('suppliers')}
            onNavigateToEvaluation={() => setActiveTab('evaluation')}
          />
        )}

        {/* Tab 2: New RFQ Sourcing Analysis Workspace */}
        {activeTab === 'rfq' && (
          <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 pb-16">
            {/* Learning Confirmation Notification */}
            {learningNotification && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-2xl flex items-center justify-between text-xs font-semibold animate-pulse shadow-sm">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-400" />
                  <span>{learningNotification}</span>
                </div>
                <RefreshCw className="w-4 h-4 animate-spin" />
              </div>
            )}

            {/* Top Grid: RFQ Intake Form */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5">
                <RfqIntakeForm
                  rfq={rfq}
                  setRfq={setRfq}
                  onSubmit={handleAnalyzeRFQ}
                  loading={loading}
                />
              </div>

              {/* Pipeline Workflow Banner & Context */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 space-y-4">
                  <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                    <Brain className="w-4 h-4 text-indigo-400" /> BATCHWISE Condition-Aware Workflow
                  </h3>

                  {/* Workflow Pipeline */}
                  <div className="grid grid-cols-5 gap-2 text-center text-[10px] font-semibold">
                    <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-indigo-300">
                      1. RFQ Intake
                    </div>
                    <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-sky-300">
                      2. Hindsight Recall
                    </div>
                    <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-emerald-300">
                      3. Past Memories
                    </div>
                    <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-amber-300">
                      4. Conditions
                    </div>
                    <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-purple-300">
                      5. Feasibility
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    Supplier capability is defined by <strong className="text-slate-200">Supplier × Requirement × Operating Conditions → Outcome</strong>. BATCHWISE recalls previous RFQs, tooling fees, and stock material availability to determine whether a supplier is <strong className="text-emerald-400">FEASIBLE</strong>, <strong className="text-amber-400">CONDITIONAL</strong>, or has <strong className="text-slate-400">INSUFFICIENT EVIDENCE</strong>.
                  </p>
                </div>

                {/* Initial Empty State */}
                {!analysis && !loading && !error && (
                  <div className="bg-slate-900/30 border border-slate-800 border-dashed rounded-2xl p-12 text-center text-slate-500 space-y-3">
                    <Brain className="w-12 h-12 mx-auto text-slate-700" />
                    <p className="text-base font-medium text-slate-300">Ready for Sourcing Analysis</p>
                    <p className="text-xs text-slate-500 max-w-md mx-auto">
                      Click <strong className="text-indigo-400">"Analyze with BATCHWISE"</strong> to evaluate all suppliers against remembered historical order conditions.
                    </p>
                  </div>
                )}

                {/* Error Banner */}
                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-2xl text-xs space-y-1">
                    <span className="font-bold block text-sm">Analysis Error</span>
                    <p>{error}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Sourcing Analysis Results Section */}
            {analysis && (
              <div className="space-y-6 pt-4 border-t border-slate-800 animate-fadeIn">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                      <Cpu className="w-5 h-5 text-indigo-400" /> Supplier Feasibility Assessments ({analysis.evaluations.length})
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Evaluated for {analysis.rfq.quantity} units of {analysis.rfq.product} ({analysis.rfq.material}, {analysis.rfq.process}).
                    </p>
                  </div>

                  {/* Recalled Memories Summary Count */}
                  <div className="flex items-center gap-2 text-xs bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-slate-300">
                    <Brain className="w-4 h-4 text-indigo-400" />
                    <span>Hindsight Recalled: <strong className="text-indigo-300 font-mono">{analysis.hindsight_status.recalled_count} Memories</strong></span>
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
        )}

        {/* Tab 3: Supplier Catalog View */}
        {activeTab === 'suppliers' && (
          <div className="pb-16">
            <SupplierCatalogView />
          </div>
        )}

        {/* Tab 4: Experience Memory Bank View */}
        {activeTab === 'memory' && (
          <div className="pb-16">
            <MemoryBankView />
          </div>
        )}

        {/* Tab 5: Benchmark Evaluation View */}
        {activeTab === 'evaluation' && (
          <div className="pb-16">
            <EvaluationView />
          </div>
        )}
      </main>

      {/* Modals & Expandable Drawers */}
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

export default App;
