import React from 'react';
import ParticleDrift from './ParticleDrift';
import {
  Brain,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface LandingPageProps {
  onNavigateToRfq: () => void;
  onNavigateToSuppliers: () => void;
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
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans selection:bg-indigo-500 selection:text-white">
      {/* ==================================================
          SECTION 1 — HERO
      ================================================== */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden border-b border-slate-800/80">
        {/* ParticleDrift Background */}
        <ParticleDrift
          density={60}
          dotSize={1.8}
          speed={0.5}
          linkDistance={120}
          accentColor="rgba(99, 102, 241, 0.75)"
          baseColor="rgba(148, 163, 184, 0.35)"
        />

        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/70 to-slate-950 pointer-events-none z-10" />

        {/* Hero Content */}
        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-8">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-semibold tracking-wide uppercase shadow-sm">
            <Brain className="w-4 h-4 text-indigo-400" />
            <span>EXPERIENCE-DRIVEN SUPPLIER SOURCING</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.15] text-white">
            Don’t just compare suppliers.{' '}
            <span className="block mt-2 bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
              Remember what happened.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="max-w-3xl mx-auto text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed font-normal">
            BATCHWISE helps procurement teams make better-informed small-batch sourcing decisions by remembering what suppliers actually delivered — including the operational conditions behind every success and failure.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onNavigateToRfq}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-500 hover:to-sky-500 text-white font-bold text-base transition-all transform hover:-translate-y-0.5 shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-3 group"
            >
              <span>Analyze an RFQ</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => scrollToSection('how-it-works')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-semibold text-base transition-all flex items-center justify-center gap-2"
            >
              <span>See how it works</span>
              <span className="text-slate-400 text-sm">↓</span>
            </button>
          </div>

          {/* Technology Indicator */}
          <div className="pt-6 flex items-center justify-center gap-2 text-xs font-mono text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            <span>Powered by persistent AI memory with Hindsight</span>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 2 — THE PROBLEM
      ================================================== */}
      <section className="py-24 border-b border-slate-800/80 bg-slate-950/60 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Supplier profiles tell you what they claim.{' '}
              <span className="text-indigo-400">Experience tells you what actually happened.</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Static catalog data treats all supplier capabilities as uniform binaries. Real small-batch manufacturing outcomes depend entirely on specific operating conditions.
            </p>
          </div>

          {/* Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left: Static Profile */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-800 text-slate-400 text-xs font-mono">
                  STATIC SUPPLIER PROFILE
                </div>
                <h3 className="text-xl font-bold text-slate-200">Alpha Manufacturing</h3>
                <div className="space-y-3 pt-2 text-sm text-slate-300 font-mono">
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-500">MOQ</span>
                    <span>100 units</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-500">Process</span>
                    <span>CNC Machining</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-500">Material</span>
                    <span>6061 Aluminium</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-500">Lead Time</span>
                    <span>14 days</span>
                  </div>
                </div>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 text-xs text-slate-400">
                ⚠️ <strong className="text-slate-300">Baseline Assessment:</strong> FEASIBLE (Based on static capability claim alone).
              </div>
            </div>

            {/* Right: BATCHWISE Memory */}
            <div className="bg-indigo-950/20 border border-indigo-500/30 rounded-2xl p-8 space-y-6 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full filter blur-2xl pointer-events-none" />
              <div className="space-y-4 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-mono">
                  BATCHWISE PERSISTENT MEMORY
                </div>
                <h3 className="text-xl font-bold text-white">Alpha Manufacturing Experience</h3>
                
                <div className="space-y-3 pt-2">
                  {/* Experience 1 */}
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-emerald-500/30 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">60 units — SUCCESS</span>
                      <span className="text-[10px] text-slate-400 font-mono">exp_alpha_001</span>
                    </div>
                    <p className="text-xs text-slate-300">Operating Conditions: Stock material + Standard tooling</p>
                  </div>

                  {/* Experience 2 */}
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-red-500/30 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-red-400 uppercase tracking-wider">80 units — FAILURE</span>
                      <span className="text-[10px] text-slate-400 font-mono">exp_alpha_002</span>
                    </div>
                    <p className="text-xs text-slate-300">Failure Condition: Required custom tooling NRE surcharge</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30 text-xs text-amber-300 relative z-10">
                💡 <strong className="text-white">BATCHWISE Assessment:</strong> CONDITIONAL ("High risk of tooling fee / setup delay for small batches").
              </div>
            </div>
          </div>

          {/* Key Insight Callout */}
          <div className="text-center bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
            <p className="text-base sm:text-lg font-medium text-slate-200">
              “The difference is not the supplier profile.{' '}
              <span className="text-indigo-400 font-bold">The difference is the operating conditions.</span>”
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 3 — HOW BATCHWISE WORKS
      ================================================== */}
      <section id="how-it-works" className="py-24 border-b border-slate-800/80 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="text-xs font-mono text-indigo-400 uppercase tracking-widest">WORKFLOW PIPELINE</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">How BATCHWISE evaluates an RFQ</h2>
            <p className="text-slate-400 text-sm sm:text-base">
              From requirement intake to persistent memory retainment in five clean steps.
            </p>
          </div>

          {/* 5-Step Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              {
                step: '01',
                title: 'SUBMIT RFQ',
                desc: 'Describe sourcing requirements (quantity, material, process, lead time).',
                color: 'border-indigo-500/30 text-indigo-400'
              },
              {
                step: '02',
                title: 'RECALL EXPERIENCE',
                desc: 'Hindsight retrieves relevant historical supplier experiences.',
                color: 'border-sky-500/30 text-sky-400'
              },
              {
                step: '03',
                title: 'COMPARE CONDITIONS',
                desc: 'BATCHWISE compares historical conditions against current requirements.',
                color: 'border-amber-500/30 text-amber-400'
              },
              {
                step: '04',
                title: 'DECISION EVIDENCE',
                desc: 'Classifies feasibility (FEASIBLE, CONDITIONAL, INSUFFICIENT EVIDENCE).',
                color: 'border-emerald-500/30 text-emerald-400'
              },
              {
                step: '05',
                title: 'LEARN FROM OUTCOME',
                desc: 'Actual buyer order outcomes are retained into Hindsight memory bank.',
                color: 'border-purple-500/30 text-purple-400'
              }
            ].map((s, idx) => (
              <div
                key={idx}
                className={`bg-slate-900/60 border ${s.color.split(' ')[0]} rounded-2xl p-5 space-y-3 flex flex-col justify-between relative`}
              >
                <div>
                  <span className={`text-2xl font-black font-mono ${s.color.split(' ')[1]}`}>{s.step}</span>
                  <h3 className="text-sm font-bold text-slate-100 mt-2">{s.title}</h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">{s.desc}</p>
                </div>
                {idx < 4 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-600">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center font-mono text-xs text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 py-3 rounded-xl">
            Next RFQ → Smarter experience base (Closed-Loop Memory)
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 4 — THE MEMORY LOOP
      ================================================== */}
      <section className="py-24 border-b border-slate-800/80 bg-slate-950/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">The Persistent Memory Loop</h2>
            <p className="text-slate-400 text-sm sm:text-base">
              BATCHWISE does not treat memory as a simple chat log. It uses structured supplier experiences as decision evidence powered by official Hindsight primitives.
            </p>
          </div>

          {/* Hindsight Primitives Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/70 border border-indigo-500/30 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300 font-mono font-bold text-xs">
                RETAIN
              </div>
              <h3 className="text-base font-bold text-slate-100">Retain Primitive</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Stores completed order outcomes, process constraints, tooling NRE fees, and lead time performance into the dedicated BATCHWISE memory bank.
              </p>
            </div>

            <div className="bg-slate-900/70 border border-sky-500/30 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-300 font-mono font-bold text-xs">
                RECALL
              </div>
              <h3 className="text-base font-bold text-slate-100">Recall Primitive</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Queries Hindsight memories across multiple retrieval strategies to find relevant past experiences matching the new RFQ criteria.
              </p>
            </div>

            <div className="bg-slate-900/70 border border-emerald-500/30 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 font-mono font-bold text-xs">
                REFLECT
              </div>
              <h3 className="text-base font-bold text-slate-100">Reflect Primitive</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Synthesizes higher-level operational insights across multiple order histories to uncover recurring failure patterns and hidden capabilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 5 — DEMO STORY (ALPHA SCENARIO)
      ================================================== */}
      <section className="py-24 border-b border-slate-800/80 bg-slate-950/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">CLOSED-LOOP PROOF</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Watch a supplier experience become memory</h2>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8">
            {/* Timeline Steps */}
            <div className="space-y-6">
              {/* Step A */}
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center text-xs font-mono font-bold shrink-0">1</div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-200">Historical Seed Memories (Alpha Manufacturing)</h4>
                  <p className="text-xs text-slate-400">
                    60 units → SUCCESS (Standard tooling) | 80 units → FAILURE (Custom tooling NRE requirement)
                  </p>
                </div>
              </div>

              {/* Step B */}
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-mono font-bold shrink-0">2</div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-200">New RFQ Submission (75 units, 6061 Aluminium, CNC)</h4>
                  <p className="text-xs text-slate-400">
                    BATCHWISE recalls both past experiences and classifies Alpha as <strong className="text-amber-400">CONDITIONAL</strong> due to potential tooling setup delay.
                  </p>
                </div>
              </div>

              {/* Step C */}
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-mono font-bold shrink-0">3</div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-200">Buyer Records Real Outcome</h4>
                  <p className="text-xs text-slate-400">
                    75-unit order completed successfully in 12 days using stock material and standard tooling. Retained in Hindsight!
                  </p>
                </div>
              </div>

              {/* Step D */}
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-mono font-bold shrink-0">4</div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-200">Subsequent RFQ Sourcing Analysis</h4>
                  <p className="text-xs text-slate-400">
                    Newly retained experience is recalled automatically! Alpha feasibility updates to <strong className="text-emerald-400">FEASIBLE</strong> based on verified 75-unit performance.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-center">
              <button
                onClick={onNavigateToRfq}
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors inline-flex items-center gap-2"
              >
                <span>Try the Live Alpha Demo Sourcing Run</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 6 — WHAT MAKES IT DIFFERENT
      ================================================== */}
      <section className="py-24 border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">From static profiles to persistent experience</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-3">
              <div className="text-xs font-mono text-indigo-400">01</div>
              <h3 className="text-lg font-bold text-white">CONDITION-AWARE MEMORY</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Remembers not only whether an order succeeded or failed, but the exact batch size, material availability, and tooling conditions behind the result.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-3">
              <div className="text-xs font-mono text-sky-400">02</div>
              <h3 className="text-lg font-bold text-white">EVIDENCE-BACKED ANALYSIS</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every supplier feasibility score links directly to supporting historical experiences recalled from Hindsight memory.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-3">
              <div className="text-xs font-mono text-emerald-400">03</div>
              <h3 className="text-lg font-bold text-white">LEARNING FROM OUTCOMES</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Closed-loop retains actual buyer procurement outcomes so the entire system gets smarter with every single RFQ.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-3">
              <div className="text-xs font-mono text-amber-400">04</div>
              <h3 className="text-lg font-bold text-white">UNKNOWN MEANS UNKNOWN</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                When historical evidence does not exist for a material or process, BATCHWISE recommends verification instead of inventing capability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 7 — TECHNOLOGY & ARCHITECTURE
      ================================================== */}
      <section className="py-24 border-b border-slate-800/80 bg-slate-950/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Built around persistent supplier memory</h2>
            <p className="text-slate-400 text-sm">Empirically backed architecture built with modern AI engineering stack.</p>
          </div>

          {/* Tech Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 font-mono text-xs text-center">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1">
              <div className="font-bold text-indigo-400">HINDSIGHT</div>
              <div className="text-[10px] text-slate-500">Persistent Memory</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1">
              <div className="font-bold text-sky-400">FASTAPI</div>
              <div className="text-[10px] text-slate-500">Python Backend</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1">
              <div className="font-bold text-cyan-400">REACT + TS</div>
              <div className="text-[10px] text-slate-500">Frontend App</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1">
              <div className="font-bold text-emerald-400">TAILWIND CSS</div>
              <div className="text-[10px] text-slate-500">UI Design System</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1">
              <div className="font-bold text-amber-400">PYTEST</div>
              <div className="text-[10px] text-slate-500">Evaluation Suite</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1">
              <div className="font-bold text-purple-400">LLM REASONING</div>
              <div className="text-[10px] text-slate-500">Feasibility Layer</div>
            </div>
          </div>

          {/* Architecture Diagram */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 text-center space-y-4">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">SYSTEM ARCHITECTURE</span>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
              <span className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">BUYER</span>
              <span>→</span>
              <span className="px-3 py-1.5 rounded-lg bg-indigo-950/80 border border-indigo-500/30 text-indigo-300">BATCHWISE UI</span>
              <span>→</span>
              <span className="px-3 py-1.5 rounded-lg bg-sky-950/80 border border-sky-500/30 text-sky-300">FASTAPI</span>
              <span>→</span>
              <span className="px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-500/30 text-emerald-300">SUPPLIER MEMORY SERVICE</span>
              <span>→</span>
              <span className="px-3 py-1.5 rounded-lg bg-purple-950/80 border border-purple-500/30 text-purple-300">HINDSIGHT (RETAIN / RECALL / REFLECT)</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 9 — EVALUATION BENCHMARK
      ================================================== */}
      <section className="py-24 border-b border-slate-800/80 bg-slate-950/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider">PHASE 3 CONTROLLED BENCHMARK</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Empirical Evaluation Results</h2>
            <p className="text-slate-400 text-xs sm:text-sm font-mono">
              Synthetic benchmark — 25 unseen evaluation RFQs across 10 manufacturing scenario categories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Metric 1 */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 text-center space-y-2">
              <div className="text-xs text-slate-400 font-mono uppercase">CLASSIFICATION ACCURACY</div>
              <div className="text-4xl font-black text-emerald-400">88.0%</div>
              <div className="text-[11px] text-slate-400 font-mono">
                Memory-Aware (22/25) vs Baseline 48.0% (12/25)
              </div>
            </div>

            {/* Metric 2 */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 text-center space-y-2">
              <div className="text-xs text-slate-400 font-mono uppercase">CONDITIONAL RISK DETECTION</div>
              <div className="text-4xl font-black text-indigo-400">100.0%</div>
              <div className="text-[11px] text-slate-400 font-mono">
                Memory-Aware (13/13) vs Baseline 0.0% (0/13)
              </div>
            </div>

            {/* Metric 3 */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 text-center space-y-2">
              <div className="text-xs text-slate-400 font-mono uppercase">INSUFFICIENT EVIDENCE BEHAVIOR</div>
              <div className="text-4xl font-black text-sky-400">100.0%</div>
              <div className="text-[11px] text-slate-400 font-mono">
                Memory-Aware (5/5) vs Baseline 40.0% (2/5)
              </div>
            </div>
          </div>

          {/* Evaluation Disclaimer */}
          <div className="text-center text-xs text-slate-400 max-w-2xl mx-auto italic font-serif">
            “Results are from a controlled synthetic benchmark and are not a claim of real-world procurement performance.”
          </div>

          {onNavigateToEvaluation && (
            <div className="text-center">
              <button
                onClick={onNavigateToEvaluation}
                className="text-xs font-mono text-indigo-400 hover:text-indigo-300 underline"
              >
                View full evaluation suite details →
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ==================================================
          SECTION 10 — FINAL CTA
      ================================================== */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Give your sourcing decisions a memory.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto">
            Start with an RFQ. Let BATCHWISE bring relevant supplier experience into the decision.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onNavigateToRfq}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-500 hover:to-sky-500 text-white font-bold text-base shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-3 group"
            >
              <span>Analyze an RFQ</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onNavigateToSuppliers}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-semibold text-base transition-all"
            >
              Explore Supplier Intelligence
            </button>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 11 — FOOTER
      ================================================== */}
      <footer className="border-t border-slate-800/80 py-12 bg-slate-950 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Brain className="w-5 h-5 text-indigo-400" />
              <span className="text-sm font-bold text-white tracking-wider">BATCHWISE</span>
            </div>
            <p className="text-slate-400">Experience-driven supplier sourcing with Hindsight persistent memory.</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-slate-300">
            <button onClick={onNavigateToRfq} className="hover:text-white">New RFQ</button>
            <button onClick={onNavigateToSuppliers} className="hover:text-white">Supplier Intelligence</button>
            <button onClick={() => scrollToSection('how-it-works')} className="hover:text-white">How it works</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
