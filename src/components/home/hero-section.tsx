"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Calculator, ShieldCheck } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { MagneticWrapper } from "@/components/motion/magnetic-cursor";
import { ExecutiveDossierCard } from "./executive-dossier-card";

const FOCUS_STATES = [
  "Tamil Nadu",
  "Karnataka",
  "Maharashtra",
  "Delhi",
  "Madhya Pradesh",
  "Gujarat",
] as const;

const TICKER_SECTORS = [
  "Manufacturing & Heavy Engineering",
  "BFSI & FinTech",
  "Enterprise SaaS & IT",
  "Automobile & Auto-Components",
  "Healthcare & MedTech",
  "Logistics & Supply Chain",
] as const;

export function HeroSection() {
  const badgesRef = useScrollReveal<HTMLDivElement>({ stagger: true });
  const headlineRef = useScrollReveal<HTMLDivElement>();
  const ctaRef = useScrollReveal<HTMLDivElement>();
  const pillarsRef = useScrollReveal<HTMLDivElement>({ stagger: true });

  return (
    <section
      className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20 bg-[#F6F3EE] overflow-x-hidden w-full max-w-full border-b border-[#0E1116]/10"
      aria-label="Executive Talent Acquisition Overview"
    >
      <div className="max-w-[1180px] w-[92%] mx-auto text-center px-4 sm:px-6">
        {/* 1. 6-State Coverage Badges */}
        <div
          ref={badgesRef}
          className="flex flex-wrap items-center justify-center gap-2 mb-6"
          aria-label="Active practice coverage across 6 focus states"
        >
          <span data-reveal className="text-xs font-semibold uppercase tracking-wider text-[#1F4E5F] mr-1">
            Active Footprint:
          </span>
          {FOCUS_STATES.map((state) => (
            <span
              key={state}
              data-reveal
              className="group inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#0E1116]/10 text-xs font-medium text-[#0E1116] shadow-2xs hover:border-[#1F4E5F]/30 hover:shadow-xs hover:-translate-y-0.5 transition-all duration-300 ease-out"
            >
              <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C8553D] opacity-60" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#C8553D]" />
              </span>
              {state}
            </span>
          ))}
        </div>

        {/* 2. Headline */}
        <div ref={headlineRef} data-reveal>
          <h1 className="font-heading font-medium text-[#0E1116] text-[clamp(2.25rem,4.5vw+0.75rem,4rem)] leading-[1.08] tracking-[-0.035em] max-w-4xl mx-auto text-balance mb-6">
            The Executive Talent Mediator for ₹12 LPA to ₹1 Cr Leadership Roles
          </h1>
          <p className="font-sans text-base sm:text-lg text-[#525866] max-w-2xl mx-auto text-pretty leading-relaxed mb-8">
            We act as the confidential bridge between top enterprises and proven leadership talent across South and West India. Zero upfront retainers—contingency fee payable strictly upon placement [CONFIRM: fee %].
          </p>
        </div>

        {/* 3. Dual CTAs */}
        <div ref={ctaRef} data-reveal className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-14">
          <MagneticWrapper strength={0.2} className="w-full sm:w-auto">
            <Link
              href="#enquiry"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#0E1116] text-[#F6F3EE] font-medium text-sm sm:text-base hover:bg-[#C8553D] hover:-translate-y-0.5 transition-all duration-350 min-h-[44px] shadow-sm active:translate-y-0"
            >
              Hire Senior Talent
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </MagneticWrapper>
          <MagneticWrapper strength={0.16} className="w-full sm:w-auto">
            <Link
              href="#fee-calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-[#0E1116] border border-[#0E1116]/20 font-medium text-sm sm:text-base hover:bg-[#F6F3EE] hover:border-[#0E1116]/40 hover:-translate-y-0.5 transition-all duration-350 min-h-[44px]"
            >
              <Calculator className="w-4 h-4 text-[#C8553D]" aria-hidden="true" />
              Calculate Fee
            </Link>
          </MagneticWrapper>
          <Link
            href="#enquiry"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-transparent text-[#1F4E5F] font-semibold text-sm sm:text-base hover:text-[#0E1116] transition-all min-h-[44px] underline underline-offset-4 decoration-[#1F4E5F]/30 hover:decoration-[#0E1116]"
          >
            Submit Candidate Profile
          </Link>
        </div>

        {/* 4. Interactive Confidential Dossier Centerpiece */}
        <ExecutiveDossierCard />

        {/* 5. 3 Value Pillars */}
        <div ref={pillarsRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto text-left mb-12">
          <div data-reveal className="bg-white/80 p-4 rounded-xl border border-[#0E1116]/8 shadow-2xs hover:-translate-y-1 hover:border-[#1F4E5F]/30 hover:shadow-md transition-all duration-400 ease-out">
            <div className="text-xs font-bold text-[#1F4E5F] uppercase tracking-wider mb-1">
              For Employers
            </div>
            <div className="text-sm font-semibold text-[#0E1116]">
              Vetted Finalists in 7 Days
            </div>
            <p className="text-xs text-[#525866] mt-0.5">
              Only interview pre-qualified leaders ready to transition.
            </p>
          </div>
          <div data-reveal className="bg-white/80 p-4 rounded-xl border border-[#0E1116]/8 shadow-2xs hover:-translate-y-1 hover:border-[#C8553D]/30 hover:shadow-md transition-all duration-400 ease-out">
            <div className="text-xs font-bold text-[#C8553D] uppercase tracking-wider mb-1">
              Pure Contingency
            </div>
            <div className="text-sm font-semibold text-[#0E1116]">
              Zero Upfront Cost
            </div>
            <p className="text-xs text-[#525866] mt-0.5">
              Pay 100% on successful joining, backed by a 90-day guarantee [CONFIRM: fee %].
            </p>
          </div>
          <div data-reveal className="bg-white/80 p-4 rounded-xl border border-[#0E1116]/8 shadow-2xs hover:-translate-y-1 hover:border-[#1F4E5F]/30 hover:shadow-md transition-all duration-400 ease-out">
            <div className="text-xs font-bold text-[#1F4E5F] uppercase tracking-wider mb-1">
              For Candidates
            </div>
            <div className="text-sm font-semibold text-[#0E1116]">
              Discreet Career Placements
            </div>
            <p className="text-xs text-[#525866] mt-0.5">
              Direct access to unadvertised leadership roles in target states.
            </p>
          </div>
        </div>

        {/* 5. Sector Ticker */}
        <div
          className="relative max-w-4xl mx-auto overflow-hidden py-3 border-y border-[#0E1116]/10"
          data-ticker="true"
          aria-label="Active Industry Practice Areas"
        >
          <div className="flex items-center gap-8 w-max animate-ticker hover:[animation-play-state:paused] motion-reduce:animate-none">
            {TICKER_SECTORS.concat(TICKER_SECTORS).map((sector, index) => (
              <span
                key={`${sector}-${index}`}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#0E1116]/70 whitespace-nowrap"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#1F4E5F]"
                  aria-hidden="true"
                />
                {sector}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
