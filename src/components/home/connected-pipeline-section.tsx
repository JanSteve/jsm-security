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

export function ConnectedPipelineSection() {
  return (
    <section 
      id="pipeline"
      className="py-16 sm:py-24 bg-white border-b border-[#0E1116]/10 overflow-hidden w-full max-w-full"
      aria-labelledby="pipeline-heading"
    >
      <div className="max-w-[1180px] w-[92%] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
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
            Traditional headhunting is an opaque black box. JSM’s discrete pipeline synchronizes active promoter mandates with pre-vetted industrial leaders across South and West India.
          </p>
        </div>

        {/* 3-Column Connected Pipeline Grid (Closer.ai Integration Flow Style) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center mb-14">
          
          {/* Column 1 (4 cols): Intake & Sourcing Channels */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#6B7280] block mb-2">
              01 · Discrete Inputs
            </span>

            {/* Node 1 */}
            <div className="p-4 sm:p-5 bg-[#F6F3EE] border border-[#0E1116]/10 rounded-2xl hover:border-[#1F4E5F]/40 transition-colors shadow-2xs">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-white text-[#1F4E5F] flex items-center justify-center font-bold text-xs shadow-2xs shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <h3 className="font-heading font-medium text-sm sm:text-base text-[#0E1116]">
                  Enterprise Mandate Intake
                </h3>
              </div>
              <p className="text-xs text-[#525866] leading-relaxed">
                Role scope, compensation band (₹12L–₹1Cr), and production OEE targets calibrated in 15 minutes.
              </p>
            </div>

            {/* Node 2 */}
            <div className="p-4 sm:p-5 bg-[#F6F3EE] border border-[#0E1116]/10 rounded-2xl hover:border-[#1F4E5F]/40 transition-colors shadow-2xs">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-white text-[#1F4E5F] flex items-center justify-center font-bold text-xs shadow-2xs shrink-0">
                  <Users2 className="w-4 h-4" />
                </div>
                <h3 className="font-heading font-medium text-sm sm:text-base text-[#0E1116]">
                  Passive Executive Network
                </h3>
              </div>
              <p className="text-xs text-[#525866] leading-relaxed">
                Proprietary talent pool spanning Tier-1 Auto, EV, Precision Engineering, EMS, and Logistics.
              </p>
            </div>

            {/* Node 3 */}
            <div className="p-4 sm:p-5 bg-[#F6F3EE] border border-[#0E1116]/10 rounded-2xl hover:border-[#1F4E5F]/40 transition-colors shadow-2xs">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-white text-[#1F4E5F] flex items-center justify-center font-bold text-xs shadow-2xs shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="font-heading font-medium text-sm sm:text-base text-[#0E1116]">
                  Confidential CV Registry
                </h3>
              </div>
              <p className="text-xs text-[#525866] leading-relaxed">
                Senior leaders seeking discreet career advancement without alerting current employers.
              </p>
            </div>
          </div>

          {/* Column 2 (4 cols): The JSM Mediation Hub (Centerpiece) */}
          <div className="lg:col-span-4 p-6 sm:p-8 bg-[#1F4E5F] text-white rounded-3xl border border-[#1F4E5F] shadow-xl text-center relative overflow-hidden my-2 lg:my-0">
            {/* Subtle glow circle */}
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#C8553D]/25 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-xs">
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
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                  <span>P&L & Plant Turnover Verification</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                  <span>Scrap-Rate & OEE Track Record</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                  <span>100% Blind Anonymization</span>
                </div>
                <div className="flex items-center gap-2">
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
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#6B7280] block mb-2">
              03 · Verified Outcomes
            </span>

            {/* Deliverable 1 */}
            <div className="p-4 sm:p-5 bg-[#F6F3EE] border border-[#0E1116]/10 rounded-2xl hover:border-[#C8553D]/40 transition-colors shadow-2xs">
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
            </div>

            {/* Deliverable 2 */}
            <div className="p-4 sm:p-5 bg-[#F6F3EE] border border-[#0E1116]/10 rounded-2xl hover:border-[#C8553D]/40 transition-colors shadow-2xs">
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
            </div>

            {/* Deliverable 3 */}
            <div className="p-4 sm:p-5 bg-[#F6F3EE] border border-[#0E1116]/10 rounded-2xl hover:border-[#C8553D]/40 transition-colors shadow-2xs">
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
            </div>
          </div>
        </div>

        {/* 4 Metric Callout Pills (Closer.ai Style Trust Numbers) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 sm:p-6 bg-[#F6F3EE] border border-[#0E1116]/10 rounded-2xl mb-10 text-center">
          <div>
            <span className="block text-2xl sm:text-3xl font-heading font-bold text-[#0E1116]">
              ₹0
            </span>
            <span className="text-xs text-[#525866] font-medium">
              Advance Retainer
            </span>
          </div>

          <div>
            <span className="block text-2xl sm:text-3xl font-heading font-bold text-[#0E1116]">
              7 Days
            </span>
            <span className="text-xs text-[#525866] font-medium">
              Finalist Turnaround
            </span>
          </div>

          <div>
            <span className="block text-2xl sm:text-3xl font-heading font-bold text-[#0E1116]">
              8.33%
            </span>
            <span className="text-xs text-[#525866] font-medium">
              Contingency Fee
            </span>
          </div>

          <div>
            <span className="block text-2xl sm:text-3xl font-heading font-bold text-[#0E1116]">
              90 Days
            </span>
            <span className="text-xs text-[#525866] font-medium">
              Replacement Warranty
            </span>
          </div>
        </div>

        {/* Action Trigger Banner */}
        <div className="text-center">
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
