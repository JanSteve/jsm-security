"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { 
  Building2, 
  UserCheck, 
  Check, 
  X, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Award,
  Lock,
  ChevronRight,
  TrendingUp,
  FileCheck2,
  Users2
} from "lucide-react";
import { MagneticWrapper } from "@/components/motion/magnetic-cursor";
import { cn } from "@/lib/utils";

type AudienceType = "employers" | "candidates";

export function ClarityExplainerSection() {
  const [activeAudience, setActiveAudience] = React.useState<AudienceType>("employers");

  return (
    <section 
      id="clarity-blueprint"
      className="py-16 sm:py-24 bg-[#F6F3EE] border-b border-[#0E1116]/10 overflow-hidden w-full max-w-full"
      aria-labelledby="clarity-heading"
    >
      <div className="max-w-[1180px] w-[92%] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#0E1116]/10 text-xs font-semibold uppercase tracking-wider text-[#1F4E5F] mb-4 shadow-2xs">
            <Award className="w-3.5 h-3.5 text-[#C8553D]" aria-hidden="true" />
            <span>The Clarity Blueprint</span>
          </div>

          <h2
            id="clarity-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-heading font-medium tracking-tight text-[#0E1116] leading-[1.12] mb-4 text-balance"
          >
            Executive hiring, stripped of friction.
          </h2>

          <p className="text-base sm:text-lg font-sans text-[#4A5568] leading-relaxed max-w-2xl mx-auto text-pretty">
            Whether you are filling a critical plant leadership seat or exploring a confidential career move, here is exactly how our 100% contingency model operates.
          </p>

          {/* Interactive Audience Switcher Toggle (Closer.ai Style) */}
          <div className="inline-flex p-1.5 bg-white border border-[#0E1116]/12 rounded-full mt-6 shadow-xs max-w-full overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveAudience("employers")}
              className={cn(
                "relative flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 min-h-[44px]",
                activeAudience === "employers" ? "text-white" : "text-[#4A5568] hover:text-[#0E1116]"
              )}
              aria-pressed={activeAudience === "employers"}
            >
              {activeAudience === "employers" && (
                <motion.div
                  layoutId="activeAudienceTab"
                  className="absolute inset-0 bg-[#0E1116] rounded-full shadow-sm"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Building2 className="w-4 h-4 relative z-10 shrink-0" aria-hidden="true" />
              <span className="relative z-10 whitespace-nowrap">For Employers & Promoters</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveAudience("candidates")}
              className={cn(
                "relative flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 min-h-[44px]",
                activeAudience === "candidates" ? "text-white" : "text-[#4A5568] hover:text-[#0E1116]"
              )}
              aria-pressed={activeAudience === "candidates"}
            >
              {activeAudience === "candidates" && (
                <motion.div
                  layoutId="activeAudienceTab"
                  className="absolute inset-0 bg-[#1F4E5F] rounded-full shadow-sm"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <UserCheck className="w-4 h-4 relative z-10 shrink-0" aria-hidden="true" />
              <span className="relative z-10 whitespace-nowrap">For Senior Executives (₹12L–₹1Cr)</span>
            </button>
          </div>
        </div>

        {/* Dynamic Audience Viewport */}
        <AnimatePresence mode="wait">
          {activeAudience === "employers" ? (
            <motion.div
              key="employers-view"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="space-y-12"
            >
              {/* Comparison Matrix: Traditional vs JSM */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
                {/* Traditional Way (The Problem) */}
                <div className="bg-white/70 border border-[#0E1116]/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xs opacity-90">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#6B7280]">
                        The Status Quo
                      </span>
                      <span className="text-[11px] font-bold px-2.5 py-1 bg-red-100 text-red-700 rounded-full">
                        High Friction
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-heading font-medium text-[#0E1116] mb-3">
                      Traditional Retained Search Firms
                    </h3>
                    <p className="text-xs sm:text-sm font-sans text-[#525866] leading-relaxed mb-6">
                      Expensive advance fees, slow delivery, and junior recruiter overhead that slows your hiring down.
                    </p>

                    <ul className="space-y-3.5 text-xs sm:text-sm text-[#4A5568]">
                      <li className="flex items-start gap-3">
                        <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" aria-hidden="true" />
                        <span><strong>33% Upfront Retainer:</strong> Pay ₹3L–₹10L in advance before a single resume is qualified.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" aria-hidden="true" />
                        <span><strong>60–90 Days Wait:</strong> Bureaucratic candidate cycles and generic automated job-board dumps.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" aria-hidden="true" />
                        <span><strong>Junior Recruiter Screening:</strong> Resumes evaluated by keyword matchers with zero engineering insight.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" aria-hidden="true" />
                        <span><strong>Zero Financial Risk Sharing:</strong> If the candidate leaves in 90 days, your retainer is gone.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#0E1116]/8 text-xs text-[#6B7280]">
                    Result: Months of lost plant throughput and stalled factory expansion.
                  </div>
                </div>

                {/* The JSM Way (The Solution) */}
                <div className="bg-white border-2 border-[#1F4E5F] rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-md relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-[#1F4E5F] text-white text-[11px] font-bold px-4 py-1.5 rounded-bl-xl uppercase tracking-wider">
                    Recommended Model
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1F4E5F]">
                        JSM Mediation Framework
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-heading font-medium text-[#0E1116] mb-3">
                      100% Contingency Executive Search
                    </h3>
                    <p className="text-xs sm:text-sm font-sans text-[#525866] leading-relaxed mb-6">
                      Zero advance fees. Pre-screened senior finalists in 7 business days. Billed strictly upon joining.
                    </p>

                    <ul className="space-y-3.5 text-xs sm:text-sm text-[#0E1116]">
                      <li className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-[#1F4E5F] shrink-0 mt-0.5" aria-hidden="true" />
                        <span><strong>₹0 Upfront Retainer:</strong> We begin active talent mapping immediately with zero financial risk.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-[#1F4E5F] shrink-0 mt-0.5" aria-hidden="true" />
                        <span><strong>3 Pre-Vetted Finalists in 7 Days:</strong> Receive comprehensive blind dossiers with verified P&L and scrap-rate metrics.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-[#1F4E5F] shrink-0 mt-0.5" aria-hidden="true" />
                        <span><strong>Veteran & Partner Vetting:</strong> Led by military veterans and technical specialists who understand shop-floor realities.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-[#1F4E5F] shrink-0 mt-0.5" aria-hidden="true" />
                        <span><strong>90-Day Free Replacement Guarantee:</strong> If a candidate departs within 90 days, we replace them at zero extra cost.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#0E1116]/8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <span className="text-xs font-medium text-[#1F4E5F]">
                      Placement Fee: Standard 8.33% of Annual Fixed CTC
                    </span>
                    <MagneticWrapper strength={0.2}>
                      <Link
                        href="#enquiry"
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#1F4E5F] text-white font-semibold text-xs sm:text-sm hover:bg-[#163845] transition-all min-h-[44px]"
                      >
                        Initiate Mandate
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </Link>
                    </MagneticWrapper>
                  </div>
                </div>
              </div>

              {/* 3-Step Connected Visual Workflow (usecloser.ai style) */}
              <div className="bg-white border border-[#0E1116]/10 rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-xs">
                <div className="text-center max-w-xl mx-auto mb-8">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#C8553D] block mb-1">
                    Automated Workflow
                  </span>
                  <h4 className="text-xl sm:text-2xl font-heading font-medium text-[#0E1116]">
                    How Your Role Gets Filled in 3 Stages
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                  {/* Step 1 */}
                  <div className="relative p-6 bg-[#F6F3EE] rounded-2xl border border-[#0E1116]/8 flex flex-col justify-between">
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-white text-[#1F4E5F] flex items-center justify-center font-bold text-sm shadow-2xs mb-4">
                        01
                      </div>
                      <h5 className="font-heading font-medium text-lg text-[#0E1116] mb-2">
                        15-Minute Calibration
                      </h5>
                      <p className="text-xs sm:text-sm text-[#525866] leading-relaxed">
                        A focused consultation to define role scope, OEE targets, reporting lines, and target CTC band (₹12L–₹1Cr).
                      </p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-[#0E1116]/8 text-[11px] font-mono text-[#1F4E5F] font-semibold">
                      Turnaround: Same Day
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="relative p-6 bg-[#F6F3EE] rounded-2xl border border-[#0E1116]/8 flex flex-col justify-between">
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-white text-[#1F4E5F] flex items-center justify-center font-bold text-sm shadow-2xs mb-4">
                        02
                      </div>
                      <h5 className="font-heading font-medium text-lg text-[#0E1116] mb-2">
                        Confidential Blind Mapping
                      </h5>
                      <p className="text-xs sm:text-sm text-[#525866] leading-relaxed">
                        We screen 40+ active leaders across Tamil Nadu, Karnataka, and Maharashtra, delivering 3 pre-vetted blind dossiers.
                      </p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-[#0E1116]/8 text-[11px] font-mono text-[#1F4E5F] font-semibold">
                      Turnaround: 7 Business Days
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="relative p-6 bg-[#F6F3EE] rounded-2xl border border-[#0E1116]/8 flex flex-col justify-between">
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-white text-[#1F4E5F] flex items-center justify-center font-bold text-sm shadow-2xs mb-4">
                        03
                      </div>
                      <h5 className="font-heading font-medium text-lg text-[#0E1116] mb-2">
                        Onboarding & Day 90 Shield
                      </h5>
                      <p className="text-xs sm:text-sm text-[#525866] leading-relaxed">
                        You conduct final interviews, release the offer, and onboard. Our 8.33% fee is invoiced strictly 30 days post-joining.
                      </p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-[#0E1116]/8 text-[11px] font-mono text-[#1F4E5F] font-semibold">
                      Warranty: 90 Days Free Replacement
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="candidates-view"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="space-y-10"
            >
              {/* Candidate Value Proposition Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-[#0E1116]/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#1F4E5F]/10 text-[#1F4E5F] flex items-center justify-center mb-5">
                      <Lock className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-heading font-medium text-[#0E1116] mb-2">
                      100% Blind Discretion
                    </h3>
                    <p className="text-xs sm:text-sm text-[#525866] leading-relaxed">
                      Your identity and current employer are never revealed without prior explicit consent. We present your credentials blindly to protect your standing.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#0E1116]/8 text-xs font-semibold text-[#1F4E5F]">
                    Zero Career Exposure Risk
                  </div>
                </div>

                <div className="bg-white border border-[#0E1116]/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#C8553D]/10 text-[#C8553D] flex items-center justify-center mb-5">
                      <Award className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-heading font-medium text-[#0E1116] mb-2">
                      High-Ticket Mandates Only
                    </h3>
                    <p className="text-xs sm:text-sm text-[#525866] leading-relaxed">
                      We deal strictly with senior leadership roles ranging from ₹12 LPA to ₹1 Cr: Plant Heads, Operations GMs, Directors, and C-Suite officers.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#0E1116]/8 text-xs font-semibold text-[#C8553D]">
                    Direct MD / Promoter Access
                  </div>
                </div>

                <div className="bg-white border border-[#0E1116]/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-5">
                      <ShieldCheck className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-heading font-medium text-[#0E1116] mb-2">
                      Zero Cost to Candidates
                    </h3>
                    <p className="text-xs sm:text-sm text-[#525866] leading-relaxed">
                      Our mediation services are 100% free for executives. We assist with CTC structuring, notice period negotiation, and transition advisory.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#0E1116]/8 text-xs font-semibold text-emerald-700">
                    Candidate Protection Guaranteed
                  </div>
                </div>
              </div>

              {/* Direct Candidate Action Banner */}
              <div className="bg-[#1F4E5F] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="max-w-xl text-center md:text-left">
                  <h4 className="text-2xl sm:text-3xl font-heading font-medium text-white mb-2">
                    Ready to explore senior industrial openings?
                  </h4>
                  <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                    Submit your details through our confidential intake or email your resume directly to our executive recruitment desk.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
                  <MagneticWrapper strength={0.2}>
                    <Link
                      href="#enquiry"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#0E1116] font-semibold text-xs sm:text-sm hover:bg-[#F6F3EE] hover:text-[#C8553D] transition-all min-h-[44px]"
                    >
                      Register Profile Privately
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  </MagneticWrapper>
                  <a
                    href="mailto:careers@jsmintegratedservices.com?subject=Confidential%20Executive%20Registration%20(%E2%82%B912L%20-%20%E2%82%B91Cr)"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white font-medium text-xs sm:text-sm hover:bg-white/20 transition-all min-h-[44px]"
                  >
                    <span>Email CV Directly</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
