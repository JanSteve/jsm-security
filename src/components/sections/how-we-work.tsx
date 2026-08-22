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
    <section className="py-20 md:py-28 bg-[#fbf9f4] border-y border-zinc-200/80">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 space-y-14">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[11px] md:text-[12px] font-extrabold uppercase tracking-[0.15em] text-[#C5A880]">
            OPERATIONAL METHODOLOGY
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black tracking-tight leading-tight uppercase">
            Service is not a promise.<br />
            <span className="text-[#C5A880]">It is a process.</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 font-normal leading-relaxed">
            Every deployment follows six clear stages from site assessment to continuous supervisor inspection.
          </p>
        </div>

        {/* The Continuous Gold Path Visual Process Pipeline */}
        <div className="relative">
          {/* Subtle connecting golden line across desktop */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-0.5 bg-[#C5A880]/30 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 relative z-10">
            {steps.map((step, idx) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white border border-zinc-200/80 rounded-3xl p-5 flex flex-col justify-between hover:border-black hover:shadow-lg transition-all duration-200 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-full bg-black text-[#C5A880] font-black text-xs flex items-center justify-center font-mono group-hover:bg-[#C5A880] group-hover:text-black transition-colors">
                      {step.num}
                    </span>
                    <span className="text-[9px] font-extrabold tracking-widest uppercase text-zinc-400">
                      {step.name}
                    </span>
                  </div>

                  <h3 className="text-xs font-black text-black leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-[11px] text-zinc-500 font-normal leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-100 mt-3 flex items-center gap-1 text-[10px] font-bold text-emerald-700">
                  <CheckCircle2 size={12} className="flex-shrink-0" />
                  <span>Documented SOP</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Action */}
        <div className="text-center pt-2">
          <Button asChild size="lg" className="bg-black hover:bg-zinc-800 text-white rounded-full px-8 h-12 text-xs font-bold shadow-md border-b-2 border-[#C5A880]">
            <Link href="/contact">
              BEGIN STEP 01: REQUEST SITE ASSESSMENT <ArrowRight size={14} className="ml-1.5 text-[#C5A880]" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
