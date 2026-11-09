"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Calculator, Activity, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { MagneticWrapper } from "@/components/motion/magnetic-cursor";
import { DotPattern } from "@/components/ui/dot-pattern";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { ExecutiveDossierCard } from "./executive-dossier-card";

const FOCUS_STATES = [
  "Tamil Nadu",
  "Karnataka",
  "Maharashtra",
  "Delhi",
  "Madhya Pradesh",
  "Gujarat",
] as const;

const ROTATING_ROLES = [
  "Plant Heads & Operations VPs",
  "Manufacturing Directors",
  "Technical Architects & CTOs",
  "General Managers & C-Suite",
] as const;

const LIVE_TELEMETRY = [
  { location: "Chennai", mandate: "Automotive Plant Head", status: "3 Blind Dossiers Delivered", time: "2h ago" },
  { location: "Bengaluru", mandate: "VP Engineering (SaaS)", status: "MD Interview Scheduled", time: "45m ago" },
  { location: "Pune", mandate: "Precision Operations GM", status: "Candidate Offer Released", time: "1d ago" },
  { location: "Trichy", mandate: "Heavy Engineering Director", status: "Shortlist Calibrated", time: "3h ago" },
  { location: "Ahmedabad", mandate: "Industrial Manufacturing VP", status: "Joined & Day 90 Shield Active", time: "2d ago" },
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

  const [roleIndex, setRoleIndex] = React.useState(0);
  const [telemetryIndex, setTelemetryIndex] = React.useState(0);

  // Auto-rotate headline role badge every 2.8s
  React.useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROTATING_ROLES.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  // Auto-rotate live telemetry ticker every 4s
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTelemetryIndex((prev) => (prev + 1) % LIVE_TELEMETRY.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const activeTelemetry = LIVE_TELEMETRY[telemetryIndex];

  return (
    <section
      className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20 bg-[#F6F3EE] overflow-x-hidden w-full max-w-full border-b border-[#0E1116]/10"
      aria-label="Executive Talent Acquisition Overview"
    >
      {/* Background Dot Matrix with Soft Radial Mask */}
      <DotPattern
        width={24}
        height={24}
        cx={1.5}
        cy={1.5}
        cr={1}
        className="[mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_75%)] opacity-70"
      />

      <div className="max-w-[1180px] w-[92%] mx-auto text-center px-4 sm:px-6 relative z-10">
        {/* 1. Live Mandate Telemetry Ticker */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-[#0E1116]/12 text-xs font-mono text-[#0E1116] shadow-2xs mb-5 max-w-full overflow-hidden">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]" />
          </span>
          <span className="font-semibold uppercase tracking-wider text-[#1F4E5F] shrink-0 text-[11px]">
            Live Activity:
          </span>
          <div className="overflow-hidden h-4 text-left">
            <AnimatePresence mode="wait">
              <motion.span
                key={telemetryIndex}
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -14, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="inline-block truncate text-xs text-[#525866]"
              >
                <strong className="text-[#0E1116]">{activeTelemetry.location}</strong> · {activeTelemetry.mandate} —{" "}
                <span className="text-[#1F4E5F] font-medium">{activeTelemetry.status}</span> ({activeTelemetry.time})
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* 2. 6-State Coverage Badges */}
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

        {/* 3. Headline with Kinetic Role Badge */}
        <div ref={headlineRef} data-reveal>
          <h1 className="font-heading font-medium text-[#0E1116] text-[clamp(2.15rem,4.2vw+0.75rem,3.85rem)] leading-[1.1] tracking-[-0.035em] max-w-4xl mx-auto text-balance mb-6">
            The Executive Talent Mediator for{" "}
            <span className="inline-block relative overflow-hidden align-baseline px-2.5 py-0.5 rounded-xl bg-white border border-[#1F4E5F]/20 text-[#1F4E5F] shadow-2xs mx-1">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ y: 22, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -22, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  className="inline-block whitespace-nowrap"
                >
                  {ROTATING_ROLES[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </span>{" "}
            in ₹12 LPA to ₹1 Cr Leadership Roles
          </h1>
          <p className="font-sans text-base sm:text-lg text-[#525866] max-w-2xl mx-auto text-pretty leading-relaxed mb-8">
            We act as the confidential bridge between top enterprises and proven leadership talent across South and West India. Zero upfront retainers—contingency fee payable strictly upon placement [CONFIRM: fee %].
          </p>
        </div>

        {/* 4. Dual CTAs */}
        <div ref={ctaRef} data-reveal className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-14">
          <MagneticWrapper strength={0.2} className="w-full sm:w-auto">
            <Link href="#enquiry" className="w-full sm:w-auto block">
              <ShimmerButton className="w-full sm:w-auto gap-2 px-7 py-3.5 text-sm sm:text-base font-medium shadow-sm">
                <span>Hire Senior Talent</span>
                <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
              </ShimmerButton>
            </Link>
          </MagneticWrapper>
          <MagneticWrapper strength={0.16} className="w-full sm:w-auto">
            <Link
              href="#fee-calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-[#0E1116] border border-[#0E1116]/20 font-medium text-sm sm:text-base hover:bg-[#F6F3EE] hover:border-[#0E1116]/40 hover:-translate-y-0.5 transition-all duration-350 min-h-[44px]"
            >
              <Calculator className="w-4 h-4 text-[#C8553D]" aria-hidden="true" />
              <span>Calculate Fee</span>
            </Link>
          </MagneticWrapper>
          <Link
            href="#enquiry"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-transparent text-[#1F4E5F] font-semibold text-sm sm:text-base hover:text-[#0E1116] transition-all min-h-[44px] underline underline-offset-4 decoration-[#1F4E5F]/30 hover:decoration-[#0E1116]"
          >
            <span>Submit Candidate Profile</span>
          </Link>
        </div>

        {/* 5. Interactive Confidential Dossier Centerpiece */}
        <ExecutiveDossierCard />

        {/* 6. 3 Value Pillars */}
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

        {/* 7. Sector Ticker */}
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
