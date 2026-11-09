"use client";

import * as React from "react";
import Link from "next/link";
import { 
  Building2, 
  Users2, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Cpu, 
  FileText, 
  Sparkles,
  Zap
} from "lucide-react";
import { MagneticWrapper } from "@/components/motion/magnetic-cursor";
import { DotPattern } from "@/components/ui/dot-pattern";
import { BorderBeam } from "@/components/ui/border-beam";
import { NumberTicker } from "@/components/ui/number-ticker";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { AnimatedBeam } from "@/components/ui/animated-beam";

export function ConnectedPipelineSection() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const input1Ref = React.useRef<HTMLDivElement>(null);
  const input2Ref = React.useRef<HTMLDivElement>(null);
  const input3Ref = React.useRef<HTMLDivElement>(null);
  const centerRef = React.useRef<HTMLDivElement>(null);
  const output1Ref = React.useRef<HTMLDivElement>(null);
  const output2Ref = React.useRef<HTMLDivElement>(null);
  const output3Ref = React.useRef<HTMLDivElement>(null);

  const [activeChannel, setActiveChannel] = React.useState<number>(1);
  const [isPaused, setIsPaused] = React.useState<boolean>(false);

  // Auto-cycle through the 3 input channels every 4.2 seconds
  React.useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveChannel((prev) => (prev % 3) + 1);
    }, 4200);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section 
      id="pipeline"
      className="py-16 sm:py-24 bg-white border-b border-[#0E1116]/10 overflow-hidden w-full max-w-full relative"
      aria-labelledby="pipeline-heading"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Dot Matrix (Aceternity / MagicUI Aesthetic) */}
      <DotPattern 
        width={24}
        height={24}
        cx={1.5}
        cy={1.5}
        cr={1}
        className="[mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_75%)] opacity-70"
      />

      <div className="max-w-[1180px] w-[92%] mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F6F3EE] border border-[#0E1116]/10 text-xs font-semibold uppercase tracking-wider text-[#1F4E5F] mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C8553D]" aria-hidden="true" />
            <span>The Mediation Engine</span>
          </div>

          <h2
            id="pipeline-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-heading font-medium tracking-tight text-[#0E1116] leading-[1.12] mb-4 text-balance"
          >
            How your leadership vacancy closes in 7 days.
          </h2>

          <p className="text-base sm:text-lg font-sans text-[#4A5568] leading-relaxed max-w-2xl mx-auto text-pretty">
            Traditional headhunting is an opaque black box. Click or hover any channel below to trace how discrete mandates flow through our verification hub into guaranteed outcomes.
          </p>

          {/* Quick Flow Selector Pills */}
          <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
            <button
              type="button"
              onClick={() => setActiveChannel(1)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all min-h-[38px] ${
                activeChannel === 1
                  ? "bg-[#0E1116] text-white shadow-xs"
                  : "bg-[#F6F3EE] text-[#525866] hover:text-[#0E1116]"
              }`}
            >
              1. Enterprise Mandate Flow
            </button>
            <button
              type="button"
              onClick={() => setActiveChannel(2)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all min-h-[38px] ${
                activeChannel === 2
                  ? "bg-[#1F4E5F] text-white shadow-xs"
                  : "bg-[#F6F3EE] text-[#525866] hover:text-[#0E1116]"
              }`}
            >
              2. Passive Network Flow
            </button>
            <button
              type="button"
              onClick={() => setActiveChannel(3)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all min-h-[38px] ${
                activeChannel === 3
                  ? "bg-[#C8553D] text-white shadow-xs"
                  : "bg-[#F6F3EE] text-[#525866] hover:text-[#0E1116]"
              }`}
            >
              3. Confidential Candidate Flow
            </button>
          </div>
        </div>

        {/* 3-Column Connected Pipeline Grid (Closer.ai Connected Nodes Style) */}
        <div 
          ref={containerRef}
          className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center mb-14"
        >
          {/* Animated Connecting Beams (MagicUI Engine - Desktop LG+) */}
          <div className="hidden lg:block">
            {/* Inputs to Center Engine */}
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={input1Ref}
              toRef={centerRef}
              curvature={-25}
              duration={activeChannel === 1 ? 2.5 : 4.5}
              pathOpacity={activeChannel === 1 ? 0.9 : 0.3}
              pathWidth={activeChannel === 1 ? 3 : 2}
              gradientStartColor="#C8553D"
              gradientStopColor="#1F4E5F"
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={input2Ref}
              toRef={centerRef}
              curvature={0}
              duration={activeChannel === 2 ? 2.2 : 4.2}
              pathOpacity={activeChannel === 2 ? 0.9 : 0.3}
              pathWidth={activeChannel === 2 ? 3 : 2}
              delay={0.4}
              gradientStartColor="#C8553D"
              gradientStopColor="#1F4E5F"
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={input3Ref}
              toRef={centerRef}
              curvature={25}
              duration={activeChannel === 3 ? 2.4 : 4.6}
              pathOpacity={activeChannel === 3 ? 0.9 : 0.3}
              pathWidth={activeChannel === 3 ? 3 : 2}
              delay={0.8}
              gradientStartColor="#C8553D"
              gradientStopColor="#1F4E5F"
            />

            {/* Center Engine to Deliverable Outputs */}
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={centerRef}
              toRef={output1Ref}
              curvature={-25}
              duration={activeChannel === 1 ? 2.5 : 4.5}
              pathOpacity={activeChannel === 1 ? 0.9 : 0.3}
              pathWidth={activeChannel === 1 ? 3 : 2}
              delay={0.2}
              gradientStartColor="#1F4E5F"
              gradientStopColor="#C8553D"
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={centerRef}
              toRef={output2Ref}
              curvature={0}
              duration={activeChannel === 2 ? 2.2 : 4.2}
              pathOpacity={activeChannel === 2 ? 0.9 : 0.3}
              pathWidth={activeChannel === 2 ? 3 : 2}
              delay={0.6}
              gradientStartColor="#1F4E5F"
              gradientStopColor="#C8553D"
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={centerRef}
              toRef={output3Ref}
              curvature={25}
              duration={activeChannel === 3 ? 2.4 : 4.6}
              pathOpacity={activeChannel === 3 ? 0.9 : 0.3}
              pathWidth={activeChannel === 3 ? 3 : 2}
              delay={1.0}
              gradientStartColor="#1F4E5F"
              gradientStopColor="#C8553D"
            />
          </div>
          
          {/* Column 1 (4 cols): Intake & Sourcing Channels */}
          <div className="lg:col-span-4 space-y-4 relative z-10">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#6B7280] block mb-2">
              01 · Discrete Inputs
            </span>

            {/* Node 1 */}
            <div 
              ref={input1Ref}
              onMouseEnter={() => setActiveChannel(1)}
              onClick={() => setActiveChannel(1)}
              className="cursor-pointer"
            >
              <CardSpotlight 
                radius={220}
                color="rgba(31, 78, 95, 0.12)"
                className={`p-4 sm:p-5 transition-all duration-300 shadow-2xs ${
                  activeChannel === 1
                    ? "bg-white border-[#C8553D] ring-2 ring-[#C8553D]/30 shadow-md -translate-y-0.5"
                    : "bg-[#F6F3EE] border-[#0E1116]/10 opacity-80 hover:opacity-100"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shadow-2xs shrink-0 transition-colors ${
                      activeChannel === 1 ? "bg-[#C8553D] text-white" : "bg-white text-[#1F4E5F]"
                    }`}>
                      <Building2 className="w-4 h-4" />
                    </div>
                    <h3 className="font-heading font-medium text-sm sm:text-base text-[#0E1116]">
                      Enterprise Mandate Intake
                    </h3>
                  </div>
                  {activeChannel === 1 && (
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-[#C8553D]/10 text-[#C8553D] rounded-full">
                      Active Flow
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#525866] leading-relaxed">
                  Role scope, compensation band (₹12L–₹1Cr), and production OEE targets calibrated in 15 minutes.
                </p>
              </CardSpotlight>
            </div>

            {/* Node 2 */}
            <div 
              ref={input2Ref}
              onMouseEnter={() => setActiveChannel(2)}
              onClick={() => setActiveChannel(2)}
              className="cursor-pointer"
            >
              <CardSpotlight 
                radius={220}
                color="rgba(31, 78, 95, 0.12)"
                className={`p-4 sm:p-5 transition-all duration-300 shadow-2xs ${
                  activeChannel === 2
                    ? "bg-white border-[#1F4E5F] ring-2 ring-[#1F4E5F]/30 shadow-md -translate-y-0.5"
                    : "bg-[#F6F3EE] border-[#0E1116]/10 opacity-80 hover:opacity-100"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shadow-2xs shrink-0 transition-colors ${
                      activeChannel === 2 ? "bg-[#1F4E5F] text-white" : "bg-white text-[#1F4E5F]"
                    }`}>
                      <Users2 className="w-4 h-4" />
                    </div>
                    <h3 className="font-heading font-medium text-sm sm:text-base text-[#0E1116]">
                      Passive Executive Network
                    </h3>
                  </div>
                  {activeChannel === 2 && (
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-[#1F4E5F]/10 text-[#1F4E5F] rounded-full">
                      Active Flow
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#525866] leading-relaxed">
                  Proprietary talent pool spanning Tier-1 Auto, EV, Precision Engineering, EMS, and Logistics.
                </p>
              </CardSpotlight>
            </div>

            {/* Node 3 */}
            <div 
              ref={input3Ref}
              onMouseEnter={() => setActiveChannel(3)}
              onClick={() => setActiveChannel(3)}
              className="cursor-pointer"
            >
              <CardSpotlight 
                radius={220}
                color="rgba(31, 78, 95, 0.12)"
                className={`p-4 sm:p-5 transition-all duration-300 shadow-2xs ${
                  activeChannel === 3
                    ? "bg-white border-[#C8553D] ring-2 ring-[#C8553D]/30 shadow-md -translate-y-0.5"
                    : "bg-[#F6F3EE] border-[#0E1116]/10 opacity-80 hover:opacity-100"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shadow-2xs shrink-0 transition-colors ${
                      activeChannel === 3 ? "bg-[#C8553D] text-white" : "bg-white text-[#1F4E5F]"
                    }`}>
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <h3 className="font-heading font-medium text-sm sm:text-base text-[#0E1116]">
                      Confidential CV Registry
                    </h3>
                  </div>
                  {activeChannel === 3 && (
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-[#C8553D]/10 text-[#C8553D] rounded-full">
                      Active Flow
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#525866] leading-relaxed">
                  Senior leaders seeking discreet career advancement without alerting current employers.
                </p>
              </CardSpotlight>
            </div>
          </div>

          {/* Column 2 (4 cols): The JSM Mediation Hub (Centerpiece with BorderBeam) */}
          <div 
            ref={centerRef}
            className="lg:col-span-4 p-6 sm:p-8 bg-[#1F4E5F] text-white rounded-3xl border border-[#1F4E5F] shadow-xl text-center relative overflow-hidden my-2 lg:my-0 z-10"
          >
            {/* MagicUI Border Beam orbiting the core engine */}
            <BorderBeam 
              size={240} 
              duration={14} 
              colorFrom="#C8553D" 
              colorTo="#F6F3EE" 
            />

            {/* Subtle radial warmth */}
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#C8553D]/25 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-xs shadow-inner">
                <Cpu className="w-7 h-7 text-white" />
              </div>

              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-white/70 block mb-1">
                  02 · JSM Engine
                </span>
                <h3 className="text-xl sm:text-2xl font-heading font-medium text-white">
                  Discrete Screening Hub
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                Every candidate is audited by senior leadership specialists for verifiable metrics:
              </p>

              <div className="space-y-2 text-left bg-white/10 p-4 rounded-xl border border-white/15 text-xs text-white/90">
                <div className={`flex items-center gap-2 p-1.5 rounded transition-colors ${
                  activeChannel === 1 ? "bg-white/20 font-semibold" : ""
                }`}>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                  <span>P&amp;L &amp; Plant Turnover Verification</span>
                </div>
                <div className={`flex items-center gap-2 p-1.5 rounded transition-colors ${
                  activeChannel === 2 ? "bg-white/20 font-semibold" : ""
                }`}>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                  <span>Scrap-Rate &amp; OEE Track Record</span>
                </div>
                <div className={`flex items-center gap-2 p-1.5 rounded transition-colors ${
                  activeChannel === 3 ? "bg-white/20 font-semibold" : ""
                }`}>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                  <span>100% Blind Anonymization</span>
                </div>
                <div className="flex items-center gap-2 p-1.5 rounded">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                  <span>Zero-Advance Mandate Protection</span>
                </div>
              </div>

              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 rounded-full text-[11px] font-mono font-medium text-white/90">
                  <Zap className="w-3.5 h-3.5 text-amber-300" aria-hidden="true" />
                  <span>100% Contingency Guarantee</span>
                </span>
              </div>
            </div>
          </div>

          {/* Column 3 (4 cols): Deliverables & Outcomes */}
          <div className="lg:col-span-4 space-y-4 relative z-10">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#6B7280] block mb-2">
              03 · Verified Outcomes
            </span>

            {/* Deliverable 1 */}
            <div ref={output1Ref}>
              <CardSpotlight 
                radius={220}
                color="rgba(200, 85, 61, 0.12)"
                className={`p-4 sm:p-5 transition-all duration-300 shadow-2xs ${
                  activeChannel === 1
                    ? "bg-white border-[#C8553D] ring-2 ring-[#C8553D]/30 shadow-md -translate-y-0.5"
                    : "bg-[#F6F3EE] border-[#0E1116]/10 opacity-80 hover:opacity-100"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white text-[#C8553D] flex items-center justify-center font-bold text-xs shadow-2xs shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <h3 className="font-heading font-medium text-sm sm:text-base text-[#0E1116]">
                      3 Blind Finalist Dossiers
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-white text-[#C8553D] rounded border border-[#0E1116]/10">
                    Day 7
                  </span>
                </div>
                <p className="text-xs text-[#525866] leading-relaxed">
                  Quantified candidate briefs highlighting leadership achievements, notice periods, and CTC expectations.
                </p>
              </CardSpotlight>
            </div>

            {/* Deliverable 2 */}
            <div ref={output2Ref}>
              <CardSpotlight 
                radius={220}
                color="rgba(200, 85, 61, 0.12)"
                className={`p-4 sm:p-5 transition-all duration-300 shadow-2xs ${
                  activeChannel === 2
                    ? "bg-white border-[#1F4E5F] ring-2 ring-[#1F4E5F]/30 shadow-md -translate-y-0.5"
                    : "bg-[#F6F3EE] border-[#0E1116]/10 opacity-80 hover:opacity-100"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white text-[#C8553D] flex items-center justify-center font-bold text-xs shadow-2xs shrink-0">
                      <Zap className="w-4 h-4" />
                    </div>
                    <h3 className="font-heading font-medium text-sm sm:text-base text-[#0E1116]">
                      48-Hr Interview Scheduling
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-white text-[#C8553D] rounded border border-[#0E1116]/10">
                    Fast-Track
                  </span>
                </div>
                <p className="text-xs text-[#525866] leading-relaxed">
                  Direct calendar alignment between the company promoter/MD and pre-aligned executive candidates.
                </p>
              </CardSpotlight>
            </div>

            {/* Deliverable 3 */}
            <div ref={output3Ref}>
              <CardSpotlight 
                radius={220}
                color="rgba(200, 85, 61, 0.12)"
                className={`p-4 sm:p-5 transition-all duration-300 shadow-2xs ${
                  activeChannel === 3
                    ? "bg-white border-emerald-600 ring-2 ring-emerald-600/30 shadow-md -translate-y-0.5"
                    : "bg-[#F6F3EE] border-[#0E1116]/10 opacity-80 hover:opacity-100"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white text-[#C8553D] flex items-center justify-center font-bold text-xs shadow-2xs shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <h3 className="font-heading font-medium text-sm sm:text-base text-[#0E1116]">
                      Onboard &amp; 90-Day Warranty
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-white text-emerald-700 rounded border border-[#0E1116]/10">
                    Protected
                  </span>
                </div>
                <p className="text-xs text-[#525866] leading-relaxed">
                  Placement fee (8.33%) settled only 30 days post-joining, protected by a 90-day free replacement warranty.
                </p>
              </CardSpotlight>
            </div>
          </div>
        </div>

        {/* 4 Metric Callout Pills with MagicUI NumberTicker */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 sm:p-6 bg-[#F6F3EE] border border-[#0E1116]/10 rounded-2xl mb-10 text-center relative z-10">
          <div>
            <span className="block text-2xl sm:text-3xl font-heading font-bold text-[#0E1116]">
              <NumberTicker value={0} prefix="₹" />
            </span>
            <span className="text-xs text-[#525866] font-medium">
              Advance Retainer
            </span>
          </div>

          <div>
            <span className="block text-2xl sm:text-3xl font-heading font-bold text-[#0E1116]">
              <NumberTicker value={7} suffix=" Days" delay={0.2} />
            </span>
            <span className="text-xs text-[#525866] font-medium">
              Finalist Turnaround
            </span>
          </div>

          <div>
            <span className="block text-2xl sm:text-3xl font-heading font-bold text-[#0E1116]">
              <NumberTicker value={8.33} decimalPlaces={2} suffix="%" delay={0.4} />
            </span>
            <span className="text-xs text-[#525866] font-medium">
              Contingency Fee
            </span>
          </div>

          <div>
            <span className="block text-2xl sm:text-3xl font-heading font-bold text-[#0E1116]">
              <NumberTicker value={90} suffix=" Days" delay={0.6} />
            </span>
            <span className="text-xs text-[#525866] font-medium">
              Replacement Warranty
            </span>
          </div>
        </div>

        {/* Action Trigger Banner */}
        <div className="text-center relative z-10">
          <MagneticWrapper strength={0.2} className="inline-block">
            <Link
              href="#enquiry"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#0E1116] text-white font-semibold text-sm hover:bg-[#C8553D] hover:-translate-y-0.5 transition-all shadow-sm min-h-[44px]"
            >
              <span>Connect with Executive Desk</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </MagneticWrapper>
        </div>
      </div>
    </section>
  );
}
