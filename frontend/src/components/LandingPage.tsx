import React from 'react';
import ParticleDrift from './ParticleDrift';

interface LandingPageProps {
  onNavigateToRfq: () => void;
  onNavigateToSuppliers?: () => void;
  onNavigateToEvaluation?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigateToRfq,
  onNavigateToSuppliers,
  onNavigateToEvaluation
}) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans selection:bg-indigo-500 selection:text-white border-t border-slate-800">
      {/* ==================================================
          SECTION 1 — ASYMMETRIC TECHNICAL HERO
      ================================================== */}
      <section className="relative min-h-[88vh] flex items-center border-b border-slate-800 overflow-hidden">
        {/* Background ParticleDrift Knowledge Network */}
        <div className="absolute inset-0 z-0">
          <ParticleDrift
            density={50}
            dotSize={1.6}
            speed={0.45}
            linkDistance={115}
            accentColor="rgba(99, 102, 241, 0.65)"
            baseColor="rgba(148, 163, 184, 0.25)"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent pointer-events-none" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Asymmetric Typography & Technical CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Monospaced Technical Eyebrow */}
            <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-indigo-400 uppercase bg-slate-900/90 border border-slate-800 px-3 py-1 rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
              BATCHWISE // EXPERIENCE-DRIVEN SUPPLIER SOURCING
            </div>

            {/* Crisp Asymmetric Heading (No Rainbow Gradients) */}
            <h1 className="text-4xl sm:text-6xl lg:text-6xl font-black tracking-tight text-white leading-[1.08] uppercase">
              DON’T JUST COMPARE SUPPLIERS.
              <span className="block text-slate-400 font-extrabold mt-1">
                REMEMBER WHAT HAPPENED.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed font-normal">
              BATCHWISE helps procurement teams evaluate small-batch manufacturing RFQs by recalling previous order outcomes, tooling fees, and operating conditions from persistent memory.
            </p>

            {/* Sharp Technical CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2 font-mono text-xs">
              <button
                onClick={onNavigateToRfq}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 border border-indigo-400 text-white font-bold tracking-wider uppercase transition-colors flex items-center gap-2 shadow-sm rounded-sm"
              >
                <span>[ ANALYZE RFQ → ]</span>
              </button>

              <button
                onClick={() => scrollToSection('how-it-works')}
                className="px-6 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-medium tracking-wider uppercase transition-colors rounded-sm"
              >
                <span>[ VIEW WORKFLOW ]</span>
              </button>
            </div>

            {/* System Status Tag */}
            <div className="pt-2 font-mono text-[11px] text-slate-500 flex items-center gap-2">
              <span className="text-indigo-400">SYS_MEM:</span>
              <span>Hindsight persistent memory bank active</span>
            </div>
          </div>

          {/* Right Column: Supplier Experience Network Visual Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/90 border border-slate-800 rounded-sm p-6 space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-slate-400">
                <span className="font-bold text-white">MEMORY_GRAPH // SUPPLIER_INDEX</span>
                <span className="text-indigo-400 text-[10px]">HINDSIGHT_BANK_01</span>
              </div>

              {/* Data Rows representing Connected Experience Nodes */}
              <div className="space-y-2.5 text-[11px]">
                <div className="p-2.5 bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-slate-400 block text-[10px]">HISTORICAL_ORDER</span>
                    <span className="font-bold text-white">Alpha Mfg • 60 units CNC</span>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold">
                    SUCCESS
                  </span>
                </div>

                <div className="p-2.5 bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-slate-400 block text-[10px]">HISTORICAL_ORDER</span>
                    <span className="font-bold text-white">Alpha Mfg • 80 units CNC</span>
                  </div>
                  <span className="px-2 py-0.5 bg-red-500/10 border border-red-500/30 text-red-400 font-bold">
                    FAILURE (TOOLING NRE)
                  </span>
                </div>

                <div className="p-2.5 bg-indigo-950/40 border border-indigo-500/30 flex items-center justify-between">
                  <div>
                    <span className="text-indigo-400 block text-[10px]">RECALLED_CONDITION</span>
                    <span className="font-bold text-slate-200">Batch Threshold [60..80 units]</span>
                  </div>
                  <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold">
                    CONDITIONAL
                  </span>
                </div>
              </div>

              <div className="pt-2 text-[10px] text-slate-500 border-t border-slate-800 text-right">
                Connected supplier experiences → Decision evidence
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 2 — THE PROBLEM (STATIC VS EXPERIENCE)
      ================================================== */}
      <section className="py-20 border-b border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="space-y-2">
            <div className="font-mono text-xs text-indigo-400 uppercase tracking-widest">// COMPARATIVE FEASIBILITY</div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
              Supplier profiles tell you what they claim.{' '}
              <span className="text-slate-400 font-semibold block">Experience tells you what actually happened.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Box: Static Supplier Profile */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-sm p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-mono text-xs">
                <span className="text-slate-400">MODE_01</span>
                <span className="font-bold text-slate-300 uppercase">STATIC SUPPLIER PROFILE</span>
              </div>

              <div className="space-y-2 font-mono text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-800/60 text-slate-300">
                  <span className="text-slate-500">SUPPLIER</span>
                  <span>Alpha Manufacturing</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/60 text-slate-300">
                  <span className="text-slate-500">STATED MOQ</span>
                  <span>100 units</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/60 text-slate-300">
                  <span className="text-slate-500">PROCESS</span>
                  <span>CNC Machining</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/60 text-slate-300">
                  <span className="text-slate-500">MATERIAL</span>
                  <span>6061 Aluminium</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/60 text-slate-300">
                  <span className="text-slate-500">LEAD TIME</span>
                  <span>14 days</span>
                </div>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 font-mono text-xs text-slate-400">
                <span className="text-slate-200 font-bold block mb-1">BASELINE ASSESSMENT: FEASIBLE</span>
                Assumes process capability claim is globally true for all order sizes.
              </div>
            </div>

            {/* Right Box: BATCHWISE Persistent Memory */}
            <div className="bg-slate-900/90 border border-indigo-500/30 rounded-sm p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-mono text-xs">
                <span className="text-indigo-400 font-bold">MODE_02</span>
                <span className="font-bold text-white uppercase">BATCHWISE PERSISTENT MEMORY</span>
              </div>

              <div className="space-y-2.5 font-mono text-xs">
                {/* Exp 1 */}
                <div className="p-3 bg-slate-950 border border-emerald-500/30 space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-emerald-400 font-bold">60 UNITS → SUCCESS</span>
                    <span className="text-slate-500">exp_alpha_001</span>
                  </div>
                  <div className="text-slate-300 text-[11px]">Conditions: Stock material + Standard tooling</div>
                </div>

                {/* Exp 2 */}
                <div className="p-3 bg-slate-950 border border-red-500/30 space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-red-400 font-bold">80 UNITS → FAILURE</span>
                    <span className="text-slate-500">exp_alpha_002</span>
                  </div>
                  <div className="text-slate-300 text-[11px]">Conditions: Custom tooling setup delay & NRE cost</div>
                </div>
              </div>

              <div className="p-3 bg-slate-950 border border-amber-500/30 font-mono text-xs text-amber-300">
                <span className="text-white font-bold block mb-1">BATCHWISE ASSESSMENT: CONDITIONAL</span>
                Recalls hidden tooling threshold risk between 60 and 80 units.
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-900/40 border border-slate-800 font-mono text-xs text-center text-slate-300">
            Formula: <span className="text-indigo-400 font-bold">Supplier × Requirement × Operating Conditions → Outcome</span>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 3 — HOW IT WORKS PIPELINE
      ================================================== */}
      <section id="how-it-works" className="py-20 border-b border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="space-y-2">
            <div className="font-mono text-xs text-indigo-400 uppercase tracking-widest">// WORKFLOW PIPELINE</div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">How BATCHWISE evaluates an RFQ</h2>
          </div>

          {/* Structured Horizontal Pipeline */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 font-mono text-xs">
            {[
              { num: '01', title: 'SUBMIT RFQ', desc: 'Input requirement parameters (quantity, material, process, deadline).' },
              { num: '02', title: 'RECALL EXPERIENCE', desc: 'Hindsight retrieves relevant historical supplier experiences.' },
              { num: '03', title: 'COMPARE CONDITIONS', desc: 'Compare historical order conditions against current RFQ.' },
              { num: '04', title: 'DECIDE WITH EVIDENCE', desc: 'Classify feasibility: FEASIBLE, CONDITIONAL, INSUFFICIENT EVIDENCE.' },
              { num: '05', title: 'RETAIN OUTCOME', desc: 'Record real buyer outcome to update persistent memory bank.' }
            ].map((step, idx) => (
              <div key={idx} className="bg-slate-900/60 border border-slate-800 p-4 rounded-sm space-y-2 relative">
                <div className="text-indigo-400 font-bold text-base">{step.num}</div>
                <div className="font-bold text-white uppercase">{step.title}</div>
                <div className="text-slate-400 text-[11px] leading-relaxed font-sans">{step.desc}</div>
                {idx < 4 && (
                  <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 text-slate-700 font-mono">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 4 — MEMORY LOOP & HINDSIGHT PRIMITIVES
      ================================================== */}
      <section className="py-20 border-b border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="space-y-2">
            <div className="font-mono text-xs text-indigo-400 uppercase tracking-widest">// SYSTEM PRIMITIVES</div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">The Hindsight Memory Loop</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            <div className="bg-slate-900/60 border border-indigo-500/30 p-6 rounded-sm space-y-3">
              <div className="text-indigo-400 font-bold text-sm">01 // RETAIN PRIMITIVE</div>
              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                Stores completed order outcomes, process constraints, tooling NRE fees, and lead time performance into the dedicated BATCHWISE memory bank.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-sky-500/30 p-6 rounded-sm space-y-3">
              <div className="text-sky-400 font-bold text-sm">02 // RECALL PRIMITIVE</div>
              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                Queries Hindsight memories across parallel retrieval strategies to retrieve historical experiences matching current RFQ parameters.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-emerald-500/30 p-6 rounded-sm space-y-3">
              <div className="text-emerald-400 font-bold text-sm">03 // REFLECT PRIMITIVE</div>
              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                Synthesizes higher-level operational insights across multiple order histories to uncover recurring failure patterns and hidden supplier capabilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 5 — DEMO STORY (ALPHA SCENARIO EVIDENCE)
      ================================================== */}
      <section className="py-20 border-b border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 font-mono text-xs">
          <div className="space-y-2">
            <div className="text-emerald-400 uppercase tracking-widest">// DEMONSTRATION WORKFLOW</div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-white font-sans tracking-tight">
              Alpha Manufacturing Memory Scenario
            </h2>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-sm space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-slate-800 pb-6">
              {/* Box 1 */}
              <div className="bg-slate-950 p-4 border border-slate-800 space-y-2">
                <div className="text-slate-400 font-bold">HISTORICAL EXPERIENCE 001</div>
                <div className="text-emerald-400 font-bold">60 UNITS → SUCCESS</div>
                <div className="text-slate-300 text-[11px] font-sans">Condition: Stock material + Standard tooling</div>
              </div>

              {/* Box 2 */}
              <div className="bg-slate-950 p-4 border border-slate-800 space-y-2">
                <div className="text-slate-400 font-bold">HISTORICAL EXPERIENCE 002</div>
                <div className="text-red-400 font-bold">80 UNITS → FAILURE</div>
                <div className="text-slate-300 text-[11px] font-sans">Condition: Custom tooling NRE required</div>
              </div>

              {/* Box 3 */}
              <div className="bg-slate-950 p-4 border border-indigo-500/30 space-y-2">
                <div className="text-indigo-400 font-bold">CURRENT RFQ</div>
                <div className="text-white font-bold">75 UNITS • 6061 ALUMINIUM</div>
                <div className="text-amber-400 font-bold">ASSESSMENT: CONDITIONAL</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="text-slate-400 text-[11px] font-sans">
                Buyer records outcome (75 units → SUCCESS in 12 days) → Retained to Hindsight → Recalled on subsequent RFQ analysis.
              </div>
              <button
                onClick={onNavigateToRfq}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold tracking-wider uppercase transition-colors shrink-0"
              >
                [ RUN DEMO RFQ → ]
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 6 — EVALUATION BENCHMARK
      ================================================== */}
      <section className="py-20 border-b border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 font-mono text-xs">
          <div className="space-y-2">
            <div className="text-indigo-400 uppercase tracking-widest">// EMPIRICAL BENCHMARK</div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-white font-sans tracking-tight">
              Phase 3 Evaluation Results
            </h2>
            <div className="text-slate-400 text-xs font-sans">
              Controlled Synthetic Benchmark — 25 Unseen Small-Batch Manufacturing RFQs
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-sm space-y-1">
              <div className="text-slate-400 text-[11px]">CLASSIFICATION ACCURACY</div>
              <div className="text-3xl font-black text-emerald-400 font-sans">88.0%</div>
              <div className="text-slate-400 text-[10px]">Memory-Aware (22/25) vs Baseline 48.0% (12/25)</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-sm space-y-1">
              <div className="text-slate-400 text-[11px]">CONDITIONAL RISK DETECTION</div>
              <div className="text-3xl font-black text-indigo-400 font-sans">100.0%</div>
              <div className="text-slate-400 text-[10px]">Memory-Aware (13/13) vs Baseline 0.0% (0/13)</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-sm space-y-1">
              <div className="text-slate-400 text-[11px]">INSUFFICIENT EVIDENCE BEHAVIOR</div>
              <div className="text-3xl font-black text-sky-400 font-sans">100.0%</div>
              <div className="text-slate-400 text-[10px]">Memory-Aware (5/5) vs Baseline 40.0% (2/5)</div>
            </div>
          </div>

          <div className="text-slate-500 text-[11px] font-sans italic">
            Disclaimer: Results are from a controlled synthetic benchmark and do not represent a claim of general production performance.
          </div>

          {onNavigateToEvaluation && (
            <div>
              <button
                onClick={onNavigateToEvaluation}
                className="text-indigo-400 hover:underline text-xs font-mono"
              >
                [ VIEW FULL BENCHMARK METRICS → ]
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ==================================================
          SECTION 7 — WORKBENCH CTA
      ================================================== */}
      <section className="py-16 bg-slate-950 font-mono text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black uppercase text-white font-sans tracking-tight">
            Give your sourcing decisions a persistent memory.
          </h2>
          <div className="flex justify-center gap-4">
            <button
              onClick={onNavigateToRfq}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold tracking-wider uppercase transition-colors"
            >
              [ OPEN RFQ WORKSPACE → ]
            </button>

            {onNavigateToSuppliers && (
              <button
                onClick={onNavigateToSuppliers}
                className="px-6 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold tracking-wider uppercase transition-colors"
              >
                [ VIEW SUPPLIER INDEX ]
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 bg-slate-950 text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>BATCHWISE // EXPERIENCE-DRIVEN SUPPLIER SOURCING</div>
          <div>POWERED BY HINDSIGHT PERSISTENT MEMORY</div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
