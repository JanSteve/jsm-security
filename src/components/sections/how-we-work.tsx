"use client";

import { motion } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const steps = [
  {
    num: "01",
    name: "UNDERSTAND",
    title: "Initial Requirements Discovery",
    desc: "We review your facility layout, risk profile, shift hours, and headcount expectations."
  },
  {
    num: "02",
    name: "ASSESS",
    title: "Physical Site Assessment",
    desc: "Our field officers inspect entry gates, blind spots, washroom load, and key vulnerable zones."
  },
  {
    num: "03",
    name: "PLAN",
    title: "Custom SOP & Post Orders",
    desc: "We write site-specific instructions detailing guard rosters, visitor logging, and hygiene cycles."
  },
  {
    num: "04",
    name: "DEPLOY",
    title: "5-Day Trained Induction",
    desc: "Uniformed, police-verified personnel are briefed on-site with emergency contact cards."
  },
  {
    num: "05",
    name: "MONITOR",
    title: "2:00 AM Night Spot-Checks",
    desc: "Field supervisors conduct surprise unannounced audits to ensure 100% alertness."
  },
  {
    num: "06",
    name: "IMPROVE",
    title: "Monthly Audit & SLA Review",
    desc: "Executive reporting with attendance proofs, incident logs, and SLA scorecards."
  }
];

export function HowWeWork() {
  return (
    <section className="py-20 md:py-28 bg-white border-y border-black/[0.08]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 space-y-14">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#0071e3]">
            OPERATIONAL METHODOLOGY
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1d1d1f] tracking-tight leading-tight">
            Service is not a promise.<br />
            <span className="text-[#0071e3]">It is a process.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#86868b] font-normal leading-relaxed">
            Every deployment follows six clear stages from site assessment to continuous supervisor inspection.
          </p>
        </div>

        {/* The Continuous Path Visual Process Pipeline */}
        <div className="relative">
          {/* Subtle connecting blue line across desktop */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-0.5 bg-[#0071e3]/20 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 relative z-10">
            {steps.map((step, idx) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-[#f5f5f7] border border-black/[0.06] rounded-[24px] p-5 flex flex-col justify-between hover:border-black/[0.12] hover:shadow-md transition-all duration-200 group shadow-xs"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-full bg-white text-[#1d1d1f] font-semibold text-xs flex items-center justify-center border border-black/[0.08] shadow-xs group-hover:bg-[#0071e3] group-hover:text-white transition-colors tabular-nums">
                      {step.num}
                    </span>
                    <span className="text-[9px] font-semibold tracking-wider uppercase text-[#86868b]">
                      {step.name}
                    </span>
                  </div>

                  <h3 className="text-xs font-semibold text-[#1d1d1f] leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-[11px] text-[#515154] font-normal leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-black/[0.06] mt-3 flex items-center gap-1 text-[10px] font-semibold text-emerald-700">
                  <CheckCircle2 size={12} className="flex-shrink-0" />
                  <span>Documented SOP</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Action */}
        <div className="text-center pt-2">
          <Button asChild size="lg" className="bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-full px-8 h-12 text-xs font-semibold shadow-sm min-h-[44px]">
            <Link href="/contact">
              BEGIN STEP 01: REQUEST SITE ASSESSMENT <ArrowRight size={14} className="ml-1.5 text-white" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
