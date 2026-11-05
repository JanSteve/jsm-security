"use client";

import React from "react";
import Link from "next/link";
import { 
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { FeeCalculator } from "./fee-calculator";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

interface FeePillar {
  title: string;
  badge: string;
  summary: string;
  confirmTag?: string;
  highlight: string;
}

const feePillars: FeePillar[] = [
  {
    title: "Zero Upfront Retainer",
    badge: "100% Risk Free",
    summary: "Search, confidential market mapping, and candidate screening proceed with zero advance payments.",
    highlight: "Zero financial exposure to begin.",
  },
  {
    title: "Success Placement Fee",
    badge: "Pay on Joining",
    confirmTag: "[CONFIRM: fee %]",
    summary: "Standard contingency fee invoiced strictly on Day 1 after your selected leader reports to work.",
    highlight: "Pay strictly for successful outcomes.",
  },
  {
    title: "90-Day Replacement Guarantee",
    badge: "Client Protection",
    confirmTag: "[CONFIRM: fee %]",
    summary: "If a candidate exits within 90 days, we execute an immediate replacement search at zero extra fee.",
    highlight: "Full 3-month placement assurance.",
  },
];

export function FeeSection() {
  const headerRef = useScrollReveal<HTMLDivElement>();
  const pillarsRef = useScrollReveal<HTMLDivElement>({ stagger: true });
  const calculatorHeadingRef = useScrollReveal<HTMLDivElement>();
  const summaryBoxRef = useScrollReveal<HTMLDivElement>();

  return (
    <section 
      id="fee-model" 
      className="py-16 sm:py-24 bg-[#F6F3EE] text-[#0E1116] border-t border-[#0E1116]/10"
      aria-labelledby="fee-model-heading"
    >
      <div className="max-w-[1180px] w-[92%] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div ref={headerRef} data-reveal className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C8553D] block mb-2">
            Commercial Model
          </span>
          <h2 
            id="fee-model-heading"
            className="font-heading font-medium text-[clamp(1.75rem,3vw+0.75rem,2.75rem)] leading-[1.12] tracking-[-0.025em] mb-3 text-balance"
          >
            Zero upfront retainer. Pure contingency fee.
          </h2>
          <p className="font-sans text-base text-[#525866] leading-relaxed">
            Our mediator terms align 100% with your hiring success. If you don't hire, you don't pay.
          </p>
        </div>

        {/* 3 Pillars */}
        <div ref={pillarsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {feePillars.map((pillar, index) => (
            <div 
              key={pillar.title}
              data-reveal
              className="bg-white border border-[#0E1116]/10 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-400 ease-out"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono font-medium text-[#1F4E5F] uppercase">
                    0{index + 1}
                  </span>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#F6F3EE] text-[#0E1116] border border-[#0E1116]/8">
                    {pillar.badge}
                  </span>
                </div>

                <h3 className="font-heading font-medium text-xl text-[#0E1116] mb-2">
                  {pillar.title}
                </h3>

                {pillar.confirmTag && (
                  <span className="inline-block text-[11px] font-mono text-[#9B331F] bg-[#9B331F]/10 px-2 py-0.5 rounded mb-2">
                    {pillar.confirmTag}
                  </span>
                )}

                <p className="font-sans text-xs sm:text-sm text-[#525866] leading-relaxed mb-4">
                  {pillar.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-[#0E1116]/8 flex items-center gap-2 text-xs font-semibold text-[#1F4E5F]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C8553D] shrink-0" aria-hidden="true" />
                <span>{pillar.highlight}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Fee Calculator Container */}
        <div className="mb-14">
          <div ref={calculatorHeadingRef} data-reveal className="text-center mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1F4E5F] block mb-1">
              Interactive Fee Simulator
            </span>
            <h3 className="font-heading font-medium text-2xl sm:text-3xl text-[#0E1116]">
              Simulate your placement fee based on annual CTC
            </h3>
          </div>

          <FeeCalculator />
        </div>

        {/* Contractual Summary Box */}
        <div ref={summaryBoxRef} data-reveal className="p-6 rounded-2xl bg-white border border-[#0E1116]/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="max-w-xl text-xs text-[#525866] leading-relaxed">
            <span className="font-bold text-[#0E1116] block mb-0.5">Commercial Assurance</span>
            Executed under standard corporate contingency agreement. Invoiced on Day 1 of candidate onboarding with 15 days settlement credit <span className="font-mono text-[#9B331F]">[CONFIRM: fee %]</span>. 90-day replacement policy included <span className="font-mono text-[#9B331F]">[CONFIRM: fee %]</span>.
          </div>

          <Link
            href="#enquiry"
            className="min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#0E1116] text-white text-xs font-semibold hover:bg-[#C8553D] hover:-translate-y-0.5 transition-all duration-350 shrink-0"
          >
            <span>Request Corporate Terms</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
