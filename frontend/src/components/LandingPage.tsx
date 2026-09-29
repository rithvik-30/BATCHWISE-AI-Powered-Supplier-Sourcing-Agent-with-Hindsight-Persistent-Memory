import React from 'react';
import { useNavigate } from 'react-router-dom';
import ParticleDrift from './ParticleDrift';
import {
  Brain,
  Sparkles,
  Activity,
  ShieldAlert,
  Database,
  RefreshCw,
  Layers,
  Cpu
} from 'lucide-react';

interface LandingPageProps {
  onNavigateToRfq?: () => void;
  onNavigateToSuppliers?: () => void;
  onNavigateToEvaluation?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigateToRfq,
  onNavigateToSuppliers,
  onNavigateToEvaluation
}) => {
  const navigate = useNavigate();

  const handleRfqClick = () => {
    if (onNavigateToRfq) onNavigateToRfq();
    navigate('/workspace/newrfq');
  };

  const handleSuppliersClick = () => {
    if (onNavigateToSuppliers) onNavigateToSuppliers();
    navigate('/workspace/suppliers');
  };

  const handleEvaluationClick = () => {
    if (onNavigateToEvaluation) onNavigateToEvaluation();
    navigate('/workspace/evaluation');
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#030509] text-slate-100 font-sans selection:bg-[#FDFF00] selection:text-[#030509] overflow-x-hidden">
      {/* ==================================================
          BACKGROUND 1: PARTICLE DRIFT CANVAS BACKDROP
      ================================================== */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <ParticleDrift
          density={400}
          dotSize={6}
          speed={50}
          direction={0}
          hover={200}
          linkDistance={230}
          linkThickness={1}
          background="#030509"
          baseColor="#FFFFFF"
          accentColor="#FDFF00"
        />
      </div>

      {/* ==================================================
          BACKGROUND 2: TECHNICAL GRID & AMBIENT RADIAL GLOW
      ================================================== */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#FDFF00]/5 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* ==================================================
          SECTION 1 — HERO SECTION (TYPOGRAPHY NARRATIVE ONLY)
      ================================================== */}
      <section className="relative z-10 min-h-[85vh] flex items-center border-b border-white/10 pointer-events-none pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Asymmetric Typography Narrative directly on page background (NO CONTAINER BOX) */}
          <div className="max-w-3xl space-y-8 text-left relative z-10">
            
            {/* System Status Eyebrow */}
            <div className="inline-flex items-center gap-2.5 font-mono text-xs tracking-widest text-[#FDFF00] uppercase bg-[#030509] border border-[#FDFF00]/40 px-3.5 py-1.5 rounded-xs pointer-events-auto shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#FDFF00] animate-pulse" />
              <span>BATCHWISE // PERSISTENT MEMORY ENGINE v2.4</span>
            </div>

            {/* Dominant High-Contrast Headline */}
            <div className="space-y-3 pointer-events-auto">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.05] uppercase">
                DON’T JUST COMPARE
                <span className="block text-white drop-shadow-md">
                  SUPPLIER CLAIMS.
                </span>
              </h1>
              <div className="text-xl sm:text-2xl font-mono text-[#FDFF00] tracking-wider uppercase pt-2 font-bold flex items-center gap-3">
                <span className="w-8 h-0.5 bg-[#FDFF00]" />
                <span>REMEMBER WHAT HAPPENED.</span>
              </div>
            </div>

            {/* High-Contrast Subtext */}
            <p className="text-slate-200 text-base sm:text-lg max-w-2xl leading-relaxed font-normal pointer-events-auto">
              Static supplier profiles tell you what suppliers <em className="italic text-white font-semibold">claim</em> they can do.
              BATCHWISE recalls past order outcomes, tooling NRE fees, and historical operating conditions from persistent memory.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2 font-mono text-xs pointer-events-auto">
              <button
                onClick={handleRfqClick}
                className="px-8 py-4 bg-[#030509] border border-[#FDFF00] text-[#FDFF00] hover:bg-[#FDFF00] hover:text-[#030509] font-bold tracking-widest uppercase transition-all flex items-center gap-3 rounded-xs shadow-lg shadow-[#FDFF00]/10 group"
              >
                <Sparkles className="w-4 h-4 text-[#FDFF00] group-hover:text-[#030509] transition-colors" />
                <span>[ OPEN RFQ WORKSPACE → ]</span>
              </button>

              <button
                onClick={() => scrollToSection('how-it-works')}
                className="px-6 py-4 bg-[#030509] hover:bg-white/10 border border-white/25 text-slate-100 font-medium tracking-wider uppercase transition-colors rounded-xs"
              >
                <span>[ EXPLORE PIPELINE ]</span>
              </button>
            </div>

            {/* Technical Sub-line */}
            <div className="pt-2 font-mono text-[11px] text-slate-300 flex items-center gap-3 pointer-events-auto flex-wrap">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <Brain className="w-3.5 h-3.5" />
                <span>HINDSIGHT RECALL: ACTIVE</span>
              </div>
              <span className="text-slate-500">•</span>
              <span className="text-slate-200 font-medium">14 Seeded Experiences</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-200 font-medium">25 Evaluation Cases</span>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 2 — THE CORE DIFFERENTIATOR (SPLIT TYPOGRAPHY)
      ================================================== */}
      <section className="relative z-10 py-24 border-b border-white/10 pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Section Header */}
          <div className="space-y-3 pointer-events-auto bg-[#030509]/80 backdrop-blur-md p-6 rounded-sm border border-white/10">
            <div className="font-mono text-xs text-[#FDFF00] uppercase tracking-widest flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#FDFF00]" />
              <span>// THE PARADIGM SHIFT</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight leading-tight">
              SUPPLIER PROFILES TELL YOU WHAT THEY CLAIM.{' '}
              <span className="text-slate-300 block font-bold">EXPERIENCE MEMORY TELLS YOU WHAT ACTUALLY HAPPENED.</span>
            </h2>
          </div>

          {/* Typography-Driven Split Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-11 gap-8 items-stretch pointer-events-auto font-mono text-xs">
            
            {/* Left Side: Static Supplier Profile */}
            <div className="lg:col-span-5 space-y-6 p-6 bg-[#030509]/85 backdrop-blur-md rounded-sm border border-white/15">
              <div className="flex items-center justify-between border-b border-white/20 pb-4">
                <span className="text-slate-400 font-bold">MODE 01</span>
                <span className="text-white font-bold tracking-wider uppercase text-sm">
                  STATIC SUPPLIER PROFILE
                </span>
              </div>

              <p className="text-slate-200 font-sans text-sm leading-relaxed">
                Evaluates RFQ requirements strictly against declared capabilities (process lists, stated MOQs, material sheets).
              </p>

              <div className="space-y-3 text-slate-200 border-l-2 border-slate-600 pl-4 py-1">
                <div className="flex justify-between py-1.5 border-b border-white/10">
                  <span className="text-slate-300 font-bold">SUPPLIER</span>
                  <span className="font-bold text-white">Alpha Manufacturing</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/10">
                  <span className="text-slate-300 font-bold">STATED MOQ</span>
                  <span className="text-slate-100 font-medium">100 units</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/10">
                  <span className="text-slate-300 font-bold">LISTED PROCESS</span>
                  <span className="text-slate-100 font-medium">CNC Machining (Aluminium)</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/10">
                  <span className="text-slate-300 font-bold">STATED LEAD TIME</span>
                  <span className="text-slate-100 font-medium">14 days</span>
                </div>
              </div>

              <div className="p-4 bg-white/5 border-l-2 border-red-500 text-red-300 space-y-1">
                <span className="font-bold uppercase text-[11px] block">BASELINE DECISION: FEASIBLE</span>
                <p className="font-sans text-xs text-slate-200">
                  Overconfidently marks order feasible because static capability says "CNC Machining". Misses hidden tooling NRE costs on small batches.
                </p>
              </div>
            </div>

            {/* Center Split Divider */}
            <div className="hidden lg:flex lg:col-span-1 items-center justify-center">
              <div className="w-px h-full bg-gradient-to-b from-white/0 via-[#FDFF00]/40 to-white/0 relative flex items-center justify-center">
                <span className="px-2 py-1 bg-[#030509] border border-[#FDFF00]/50 text-[#FDFF00] text-[10px] font-bold rounded-xs">
                  VS
                </span>
              </div>
            </div>

            {/* Right Side: BATCHWISE Persistent Memory */}
            <div className="lg:col-span-5 space-y-6 py-4">
              <div className="flex items-center justify-between border-b border-[#FDFF00]/40 pb-4">
                <span className="text-[#FDFF00] font-bold">MODE 02</span>
                <span className="text-white font-bold tracking-wider uppercase text-sm flex items-center gap-2">
                  <Brain className="w-4 h-4 text-[#FDFF00]" />
                  BATCHWISE PERSISTENT MEMORY
                </span>
              </div>

              <p className="text-slate-300 font-sans text-sm leading-relaxed">
                Queries Hindsight multi-strategy recalled experiences to evaluate real historical order performance under matching operating conditions.
              </p>

              <div className="space-y-3 border-l-2 border-[#FDFF00] pl-4 py-1">
                <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex justify-between items-center text-[11px]">
                  <span>exp_alpha_001 • 60 UNITS</span>
                  <span className="font-bold">FEASIBLE (Standard Tooling)</span>
                </div>

                <div className="p-2.5 bg-red-500/10 border border-red-500/30 text-red-300 flex justify-between items-center text-[11px]">
                  <span>exp_alpha_002 • 80 UNITS</span>
                  <span className="font-bold">FAILED (Custom Tooling NRE)</span>
                </div>

                <div className="p-2.5 bg-white/5 border border-white/10 text-slate-300 flex justify-between items-center text-[11px]">
                  <span>RECALLED CONDITION</span>
                  <span className="font-bold text-[#FDFF00]">Batch Threshold [60..80 units]</span>
                </div>
              </div>

              <div className="p-4 bg-amber-500/10 border-l-2 border-amber-400 text-amber-300 space-y-1">
                <span className="font-bold uppercase text-[11px] block text-white">BATCHWISE DECISION: CONDITIONAL</span>
                <p className="font-sans text-xs text-slate-200">
                  Flags conditional feasibility for 75-unit order: requires pre-sourcing verification of custom tooling NRE fees prior to PO placement.
                </p>
              </div>
            </div>

          </div>

          {/* Mathematical Formula Banner */}
          <div className="py-4 border-y border-white/10 text-center font-mono text-xs text-slate-300 pointer-events-auto">
            SOURCING FORMULA: <strong className="text-white">Supplier</strong> × <strong className="text-white">Requirement</strong> × <strong className="text-[#FDFF00]">Operating Conditions</strong> → <strong className="text-emerald-400">Validated Decision</strong>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 3 — WORKFLOW PIPELINE (FULL-WIDTH TIMELINE)
      ================================================== */}
      <section id="how-it-works" className="relative z-10 py-24 border-b border-white/10 pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="space-y-3 pointer-events-auto">
            <div className="font-mono text-xs text-[#FDFF00] uppercase tracking-widest flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#FDFF00]" />
              <span>// PIPELINE ARCHITECTURE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
              HOW BATCHWISE EVALUATES AN RFQ
            </h2>
          </div>

          {/* Full-Width Horizontal Process Flow (NO CARD BOXES!) */}
          <div className="relative pointer-events-auto font-mono text-xs">
            
            {/* Connecting Timeline Line */}
            <div className="hidden md:block absolute top-6 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FDFF00] via-sky-400 to-emerald-400 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
              {[
                { step: '01', label: 'INTAKE', title: 'Submit RFQ Parameters', desc: 'Input quantity, material, process, and deadline requirements.' },
                { step: '02', label: 'RECALL', title: 'Query Hindsight Memory', desc: 'Retrieve matching historical order outcomes across parallel strategies.' },
                { step: '03', label: 'REASON', title: 'Compare Conditions', desc: 'Analyze past order operating conditions against current RFQ parameters.' },
                { step: '04', label: 'DECIDE', title: 'Evidence-Based Decision', desc: 'Classify FEASIBLE, CONDITIONAL, or INSUFFICIENT EVIDENCE.' },
                { step: '05', label: 'RETAIN', title: 'Closed-Loop Learning', desc: 'Record buyer outcomes into memory bank to refine future evaluations.' }
              ].map((item, idx) => (
                <div key={idx} className="space-y-4 text-left group">
                  <div className="w-12 h-12 rounded-xs bg-[#030509] border-2 border-white/20 group-hover:border-[#FDFF00] flex items-center justify-center font-bold text-sm text-[#FDFF00] transition-colors shadow-md">
                    {item.step}
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-[#FDFF00] font-bold tracking-widest uppercase block">// {item.label}</span>
                    <h3 className="font-bold text-white uppercase text-sm tracking-wide">{item.title}</h3>
                    <p className="text-slate-400 font-sans text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ==================================================
          SECTION 4 — HINDSIGHT MEMORY LOOP & SYSTEM PRIMITIVES
      ================================================== */}
      <section className="relative z-10 py-24 border-b border-white/10 pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="space-y-3 pointer-events-auto">
            <div className="font-mono text-xs text-[#FDFF00] uppercase tracking-widest flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#FDFF00]" />
              <span>// HINDSIGHT MEMORY PRIMITIVES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
              THE CLOSED-LOOP EXPERIENCE ENGINE
            </h2>
          </div>

          {/* Primitives Layout with subtle side borders */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pointer-events-auto font-mono text-xs">
            
            <div className="border-l-2 border-[#FDFF00] pl-6 space-y-3">
              <div className="text-[#FDFF00] font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                <Database className="w-4 h-4" />
                <span>01 // RETAIN PRIMITIVE</span>
              </div>
              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                Persists completed order outcomes, supplier process constraints, tooling NRE fees, and delivery performance into dedicated supplier experience banks.
              </p>
            </div>

            <div className="border-l-2 border-sky-400 pl-6 space-y-3">
              <div className="text-sky-400 font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                <span>02 // RECALL PRIMITIVE</span>
              </div>
              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                Executes multi-strategy queries (semantic + keyword + structural) to pull relevant past order records that match active RFQ parameters.
              </p>
            </div>

            <div className="border-l-2 border-emerald-400 pl-6 space-y-3">
              <div className="text-emerald-400 font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>03 // REFLECT PRIMITIVE</span>
              </div>
              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                Synthesizes higher-level operational conditions across order histories to discover hidden supplier failure thresholds and batch capacity limits.
              </p>
            </div>

          </div>

          {/* Visual Loop Banner */}
          <div className="p-6 bg-white/5 border border-white/10 rounded-xs flex flex-col md:flex-row items-center justify-between gap-6 pointer-events-auto font-mono text-xs">
            <div className="flex items-center gap-4">
              <RefreshCw className="w-6 h-6 text-[#FDFF00] animate-spin" />
              <div>
                <span className="font-bold text-white uppercase text-sm block">PERSISTENT EXPERIENCE ACCUMULATION</span>
                <span className="text-slate-400 font-sans text-xs">Every recorded order outcome permanently increases evaluation accuracy for future RFQs.</span>
              </div>
            </div>
            <button
              onClick={handleRfqClick}
              className="px-5 py-2.5 bg-[#030509] border border-[#FDFF00] text-[#FDFF00] hover:bg-[#FDFF00] hover:text-[#030509] font-bold text-xs uppercase tracking-wider transition-colors shrink-0"
            >
              [ TEST CLOSED-LOOP LEARNING → ]
            </button>
          </div>

        </div>
      </section>

      {/* ==================================================
          SECTION 5 — EMPIRICAL BENCHMARK (LARGE TYPOGRAPHY)
      ================================================== */}
      <section className="relative z-10 py-24 border-b border-white/10 pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="space-y-3 pointer-events-auto">
            <div className="font-mono text-xs text-[#FDFF00] uppercase tracking-widest flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#FDFF00]" />
              <span>// EMPIRICAL CONTROLLED BENCHMARK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
              25-CASE CONTROLLED EVALUATION BENCHMARK
            </h2>
            <p className="text-slate-400 font-sans text-xs">
              Phase 3 Controlled Benchmark • 25 Unseen Small-Batch Manufacturing Evaluation Cases
            </p>
          </div>

          {/* Large Typographic Benchmark Display (NO CARDS!) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pointer-events-auto font-mono">
            
            {/* Left Main Accuracy Comparison */}
            <div className="lg:col-span-7 space-y-6">
              <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                CLASSIFICATION ACCURACY COMPARISON
              </div>

              <div className="flex items-baseline gap-6 flex-wrap">
                <div>
                  <span className="text-xs text-slate-500 uppercase block font-mono">MEMORY-BLIND BASELINE</span>
                  <span className="text-4xl sm:text-5xl font-black text-slate-500 font-sans">48.0%</span>
                  <span className="text-xs text-slate-500 font-mono block">(12/25 cases)</span>
                </div>

                <div className="text-2xl text-[#FDFF00] font-bold">→</div>

                <div>
                  <span className="text-xs text-[#FDFF00] uppercase block font-mono font-bold">// BATCHWISE MEMORY-AWARE</span>
                  <span className="text-6xl sm:text-7xl font-black text-[#FDFF00] font-sans tracking-tight">88.0%</span>
                  <span className="text-xs text-emerald-400 font-mono block font-bold">(22/25 cases • +40.0% improvement)</span>
                </div>
              </div>

              {/* Technical Comparison Bar */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-xs font-mono text-slate-400">
                  <span>BASELINE: 48.0%</span>
                  <span className="text-[#FDFF00] font-bold">BATCHWISE: 88.0%</span>
                </div>
                <div className="w-full h-3 bg-white/10 rounded-xs overflow-hidden flex">
                  <div className="h-full bg-slate-600" style={{ width: '48%' }} />
                  <div className="h-full bg-[#FDFF00]" style={{ width: '40%' }} />
                </div>
              </div>
            </div>

            {/* Right Detailed Risk Metrics */}
            <div className="lg:col-span-5 space-y-6 border-l border-white/10 lg:pl-10">
              
              <div className="space-y-1">
                <div className="text-xs text-[#FDFF00] uppercase font-bold">CONDITIONAL RISK DETECTION</div>
                <div className="text-4xl font-black text-[#FDFF00] font-sans">100.0%</div>
                <p className="text-xs text-slate-400 font-sans">
                  Memory-Aware: <strong className="text-white">13/13 risk cases detected</strong> vs Baseline: <strong className="text-amber-400 font-mono">0.0% (13 false positives)</strong>.
                </p>
              </div>

              <div className="space-y-1 pt-4 border-t border-white/10">
                <div className="text-xs text-sky-400 uppercase font-bold">INSUFFICIENT EVIDENCE DETECTION</div>
                <div className="text-4xl font-black text-sky-400 font-sans">100.0%</div>
                <p className="text-xs text-slate-400 font-sans">
                  Memory-Aware: <strong className="text-white">6/6 unverified cases flagged</strong> vs Baseline: <strong className="text-slate-500 font-mono">0.0%</strong>.
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleEvaluationClick}
                  className="text-[#FDFF00] hover:underline text-xs font-mono font-bold flex items-center gap-2"
                >
                  <span>[ VIEW FULL BENCHMARK SUITE → ]</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==================================================
          SECTION 6 — WORKBENCH CTA & FOOTER
      ================================================== */}
      <section className="relative z-10 py-24 font-mono text-xs pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-3 pointer-events-auto max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-white font-sans tracking-tight">
              GIVE YOUR SOURCING DECISIONS A PERSISTENT MEMORY.
            </h2>
            <p className="text-slate-300 font-sans text-sm leading-relaxed">
              Start evaluating small-batch RFQs against historical supplier operating conditions and recalled order outcomes.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 pointer-events-auto">
            <button
              onClick={handleRfqClick}
              className="px-8 py-4 bg-[#030509] border border-[#FDFF00] text-[#FDFF00] hover:bg-[#FDFF00] hover:text-[#030509] font-bold tracking-widest uppercase transition-all rounded-xs shadow-lg shadow-[#FDFF00]/10 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>[ OPEN RFQ WORKSPACE → ]</span>
            </button>

            <button
              onClick={handleSuppliersClick}
              className="px-8 py-4 bg-[#030509]/90 hover:bg-white/10 border border-white/20 text-slate-200 font-bold tracking-wider uppercase transition-colors rounded-xs"
            >
              <span>[ VIEW SUPPLIER INDEX ]</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-8 bg-[#030509]/90 text-xs font-mono text-slate-400 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>BATCHWISE // EXPERIENCE-DRIVEN SUPPLIER SOURCING</div>
          <div>POWERED BY HINDSIGHT PERSISTENT MEMORY</div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
