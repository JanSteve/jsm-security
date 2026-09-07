"use client";

import { motion } from "motion/react";
import { sopPipelineSteps } from "@/data/sop-steps";
import { CheckCircle2, ArrowRight, ShieldCheck, Sparkles, FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SOPSection() {
  const hygieneCycle = [
    { step: "01", title: "Clean", desc: "Systematic floor dusting, sanitization, and trash clearance." },
    { step: "02", title: "Inspect", desc: "Shift supervisor audits task completion against physical checklist." },
    { step: "03", title: "Report", desc: "Hourly sign-off logged on washroom doors and digital logbook." },
    { step: "04", title: "Correct", desc: "Any identified deviation is remedied immediately on the spot." },
    { step: "05", title: "Verify", desc: "Facility executive signs off the daily service log." }
  ];

  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden border-t border-black/[0.08]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#f5f5f7] border border-black/[0.08] rounded-full text-xs font-semibold text-[#1d1d1f]">
            <Sparkles size={13} className="text-[#0071e3]" />
            <span>OPERATIONAL SOP FRAMEWORK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1d1d1f] tracking-tight leading-tight">
            Service is not a promise. It is a process.
          </h2>
          <p className="text-[#86868b] text-base md:text-lg font-normal leading-relaxed">
            Unorganized agencies rely on good intentions. JSM operates through documented standard operating procedures (SOPs), clear shift handovers, and supervisory accountability.
          </p>
        </div>

        {/* 10-Step Interactive Pipeline Carousel Grid */}
        <div className="bg-[#f5f5f7] border border-black/[0.08] rounded-[28px] p-6 md:p-10 mb-16 shadow-sm">
          <div className="flex items-center justify-between mb-8 border-b border-black/[0.06] pb-4">
            <div>
              <h3 className="text-xl font-semibold text-[#1d1d1f]">The JSM 10-Stage Deployment Journey</h3>
              <p className="text-xs text-[#86868b] font-normal">From initial inquiry to continuous shift refinement</p>
            </div>
            <Link
              href="/about"
              className="text-xs font-semibold text-[#0071e3] hover:underline hidden sm:inline-flex items-center gap-1"
            >
              Explore JSM Standards <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {sopPipelineSteps.map((step, idx) => (
              <motion.div
                key={step.stage}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.04 }}
                className="bg-white border border-black/[0.06] rounded-2xl p-4 space-y-2 shadow-xs hover:border-black/[0.12] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#0071e3]">
                    {step.stage}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                </div>
                <h4 className="text-xs font-semibold text-[#1d1d1f] leading-snug">
                  {step.title}
                </h4>
                <p className="text-[11px] text-[#515154] leading-relaxed font-normal">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Facility Operating System Visual */}
        <div className="bg-[#f5f5f7] text-[#1d1d1f] rounded-[28px] p-8 md:p-12 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-center shadow-sm border border-black/[0.08]">
          <div className="space-y-3">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#0071e3]">
              Facility Operating System
            </span>
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#1d1d1f] leading-tight">
              The 5-Step Hygiene Operating Cycle
            </h3>
            <p className="text-xs text-[#86868b] leading-relaxed font-normal">
              Every restroom, lobby, and workstation maintained by JSM follows an unbreakable closed-loop cycle.
            </p>
          </div>

          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {hygieneCycle.map((h, i) => (
              <div key={h.step} className="bg-white border border-black/[0.06] rounded-2xl p-4 space-y-1.5 text-center sm:text-left shadow-xs">
                <span className="text-xl font-semibold text-[#0071e3] tabular-nums">{h.step}</span>
                <h4 className="text-xs font-semibold text-[#1d1d1f]">{h.title}</h4>
                <p className="text-[10px] text-[#86868b] leading-snug font-normal">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
