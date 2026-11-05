"use client";

import * as React from "react";
import Link from "next/link";
import { Target, UserCheck, ShieldCheck, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

interface ProcessStep {
  stepNumber: string;
  title: string;
  timeframe: string;
  summary: string;
  highlight: string;
  icon: React.ComponentType<{ className?: string }>;
}

const HIRING_STEPS: ProcessStep[] = [
  {
    stepNumber: "01",
    title: "Define the Mandate",
    timeframe: "Day 1",
    summary:
      "A 15-minute briefing to lock role expectations, reporting structure, and compensation benchmarks [CONFIRM: role band].",
    highlight: "Confidential talent mapping across 6 states.",
    icon: Target,
  },
  {
    stepNumber: "02",
    title: "Review 3 Vetted Finalists",
    timeframe: "Days 2–7",
    summary:
      "We tap passive industry leaders, conduct discrete technical screenings, and deliver pre-qualified candidate dossiers.",
    highlight: "Only interview leaders ready to transition.",
    icon: UserCheck,
  },
  {
    stepNumber: "03",
    title: "Hire on Pure Success",
    timeframe: "Offer to Day 90",
    summary:
      "Zero upfront retainer. Our fee is payable strictly upon candidate joining, backed by a 90-day replacement policy [CONFIRM: fee %].",
    highlight: "100% risk-free contingency model.",
    icon: ShieldCheck,
  },
];

export function ProcessSection() {
  const headerRef = useScrollReveal<HTMLDivElement>();
  const cardsRef = useScrollReveal<HTMLDivElement>({ stagger: true });
  const ctaRef = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="how-it-works"
      className="py-16 sm:py-24 bg-white border-b border-[#0E1116]/10"
      aria-labelledby="process-heading"
    >
      <div className="max-w-[1180px] w-[92%] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div ref={headerRef} data-reveal className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C8553D] block mb-2">
            How The Mediation Works
          </span>
          <h2
            id="process-heading"
            className="font-heading font-medium text-[#0E1116] text-[clamp(1.75rem,3vw+0.75rem,2.75rem)] leading-[1.12] tracking-[-0.025em] mb-4"
          >
            Three steps from mandate to executive onboarding
          </h2>
          <p className="font-sans text-base text-[#525866] leading-relaxed">
            A fast, confidential, zero-retainer process built for hiring managers who value time over endless resume piles.
          </p>
        </div>

        {/* 3 Process Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {HIRING_STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.stepNumber}
                data-reveal
                className="group relative p-6 sm:p-8 rounded-2xl bg-[#F6F3EE]/60 border border-[#0E1116]/8 hover:border-[#0E1116]/20 hover:-translate-y-1 hover:shadow-lg transition-all duration-400 ease-out hover:bg-[#F6F3EE] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-heading text-3xl font-bold text-[#0E1116]/20 group-hover:text-[#C8553D] transition-colors duration-400">
                      {step.stepNumber}
                    </span>
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border border-[#0E1116]/10 text-[#1F4E5F] shadow-2xs group-hover:shadow-md transition-shadow duration-400">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </span>
                  </div>

                  <span className="text-xs font-semibold text-[#1F4E5F] uppercase tracking-wider block mb-1">
                    {step.timeframe}
                  </span>
                  <h3 className="font-heading text-xl font-medium text-[#0E1116] mb-3">
                    {step.title}
                  </h3>
                  <p className="font-sans text-sm text-[#525866] leading-relaxed mb-4">
                    {step.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#0E1116]/8 text-xs font-medium text-[#0E1116] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8553D]" aria-hidden="true" />
                  {step.highlight}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Fast Action */}
        <div ref={ctaRef} data-reveal className="p-6 rounded-2xl bg-[#1F4E5F] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-base font-semibold">Have a critical role to fill?</div>
            <p className="text-xs text-white/80">Brief our desk today and receive candidate options within 7 days.</p>
          </div>
          <Link
            href="#enquiry"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-[#0E1116] font-medium text-sm hover:bg-[#F6F3EE] hover:-translate-y-0.5 transition-all duration-350 min-h-[44px] shrink-0"
          >
            Start Mandate Intake
            <ArrowRight className="w-4 h-4 text-[#C8553D]" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
