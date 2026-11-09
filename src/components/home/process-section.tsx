"use client";

import * as React from "react";
import Link from "next/link";
import { 
  Target, 
  UserCheck, 
  ShieldCheck, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  FileText, 
  Zap,
  Building2,
  Lock
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { MagneticWrapper } from "@/components/motion/magnetic-cursor";
import { DotPattern } from "@/components/ui/dot-pattern";
import { BorderBeam } from "@/components/ui/border-beam";

interface ProcessStage {
  id: string;
  stepNumber: string;
  timeframe: string;
  title: string;
  tagline: string;
  summary: string;
  deliverables: string[];
  turnaround: string;
  icon: React.ComponentType<{ className?: string }>;
  artifactTitle: string;
  artifactBadge: string;
  artifactMetrics: { label: string; value: string }[];
}

const HIRING_STAGES: ProcessStage[] = [
  {
    id: "stage-1",
    stepNumber: "01",
    timeframe: "Day 1",
    title: "15-Minute Mandate Calibration",
    tagline: "Precision Scoping without Lengthy JDs",
    summary:
      "A 15-minute briefing with our senior desk to calibrate role expectations, reporting lines, plant OEE targets, and compensation benchmarks [CONFIRM: role band].",
    deliverables: [
      "Exact role scope & operational turnaround targets",
      "Confidential compensation band mapping (₹12L to ₹1Cr)",
      "Zero upfront retainer invoice [CONFIRM: fee %]",
    ],
    turnaround: "Completed within 24 Hours",
    icon: Target,
    artifactTitle: "Calibrated Mandate Dossier",
    artifactBadge: "Calibration Active",
    artifactMetrics: [
      { label: "Briefing Time", value: "15 Mins" },
      { label: "Upfront Fee", value: "₹0" },
      { label: "Target Band", value: "₹12L–₹1Cr" },
    ],
  },
  {
    id: "stage-2",
    stepNumber: "02",
    timeframe: "Days 2–5",
    title: "Discrete Screening & Metric Audit",
    tagline: "Verifying Shop-Floor & Commercial Realities",
    summary:
      "We tap our proprietary passive leadership network across Tamil Nadu, Karnataka, and Maharashtra. Every leader is vetted for verified P&L and scrap-rate track records.",
    deliverables: [
      "Targeted reach across 40+ active industry leaders",
      "P&L scale, team size, and scrap-rate track record check",
      "100% blind confidentiality maintained",
    ],
    turnaround: "Continuous across Days 2–5",
    icon: UserCheck,
    artifactTitle: "Regional Talent Mapping Radar",
    artifactBadge: "Discreet Screening",
    artifactMetrics: [
      { label: "Talent Pool", value: "40+ Leaders" },
      { label: "Confidentiality", value: "100% Blind" },
      { label: "Focus States", value: "6 States" },
    ],
  },
  {
    id: "stage-3",
    stepNumber: "03",
    timeframe: "Day 7",
    title: "3 Blind Finalist Dossiers Delivered",
    tagline: "Interview Only Ready-to-Transition Executives",
    summary:
      "On Day 7, receive 3 pre-qualified candidate dossiers highlighting verified leadership achievements, notice periods, and CTC expectations directly on your desk.",
    deliverables: [
      "3 quantified blind candidate finalist briefs",
      "Verified current notice periods & transition window",
      "Direct MD/Promoter interview scheduling within 48h",
    ],
    turnaround: "Guaranteed by Day 7",
    icon: FileText,
    artifactTitle: "Finalist Dossier Package",
    artifactBadge: "Shortlist Ready",
    artifactMetrics: [
      { label: "Vetted Finalists", value: "3 Leaders" },
      { label: "Interview Window", value: "48 Hours" },
      { label: "Notice Period", value: "30–60 Days" },
    ],
  },
  {
    id: "stage-4",
    stepNumber: "04",
    timeframe: "Offer to Day 90",
    title: "Joining Settlement & 90-Day Shield",
    tagline: "100% Pure Contingency with Replacement Assurance",
    summary:
      "Zero upfront fees. Our 8.33% contingency fee is invoiced strictly 30 days post-joining, protected by our comprehensive 90-day free replacement policy [CONFIRM: fee %].",
    deliverables: [
      "Zero upfront fee throughout entire search process",
      "Success fee invoiced strictly 30 days post-joining",
      "90-day free replacement guarantee [CONFIRM: fee %]",
    ],
    turnaround: "Protected for 90 Days",
    icon: ShieldCheck,
    artifactTitle: "Commercial Placement Shield",
    artifactBadge: "Risk-Free Policy",
    artifactMetrics: [
      { label: "Advance Cost", value: "₹0" },
      { label: "Success Fee", value: "8.33%" },
      { label: "Replacement", value: "90 Days" },
    ],
  },
];

export function ProcessSection() {
  const headerRef = useScrollReveal<HTMLDivElement>();
  const [activeStageId, setActiveStageId] = React.useState<string>("stage-1");
  const [isPaused, setIsPaused] = React.useState<boolean>(false);
  const [progress, setProgress] = React.useState<number>(0);

  const activeStage = HIRING_STAGES.find((s) => s.id === activeStageId) || HIRING_STAGES[0];
  const activeIndex = HIRING_STAGES.findIndex((s) => s.id === activeStageId);

  // Auto-play stepper every 5.5 seconds unless user hovers
  React.useEffect(() => {
    if (isPaused) return;

    const interval = 50; // update every 50ms
    const totalDuration = 5500;
    const step = (interval / totalDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveStageId((curr) => {
            const currentIndex = HIRING_STAGES.findIndex((s) => s.id === curr);
            const nextIndex = (currentIndex + 1) % HIRING_STAGES.length;
            return HIRING_STAGES[nextIndex].id;
          });
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isPaused, activeStageId]);

  const handleSelectStage = (id: string) => {
    setActiveStageId(id);
    setProgress(0);
  };

  return (
    <section
      id="how-it-works"
      className="py-16 sm:py-24 bg-white border-b border-[#0E1116]/10 relative overflow-hidden"
      aria-labelledby="process-heading"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Dot Pattern */}
      <DotPattern
        width={24}
        height={24}
        cx={1.5}
        cy={1.5}
        cr={1}
        className="[mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_75%)] opacity-50"
      />

      <div className="max-w-[1180px] w-[92%] mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} data-reveal className="max-w-2xl mx-auto text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F6F3EE] border border-[#0E1116]/10 text-xs font-semibold uppercase tracking-wider text-[#C8553D] mb-4 shadow-2xs">
            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Interactive Hiring Journey</span>
          </div>

          <h2
            id="process-heading"
            className="font-heading font-medium text-[#0E1116] text-[clamp(1.75rem,3vw+0.75rem,2.75rem)] leading-[1.12] tracking-[-0.025em] mb-4 text-balance"
          >
            How your mandate moves from Day 1 to Day 90
          </h2>
          <p className="font-sans text-base text-[#525866] leading-relaxed max-w-xl mx-auto text-pretty">
            Click through each milestone below to see the exact deliverables, turnaround times, and risk-free safeguards.
          </p>
        </div>

        {/* 1. Interactive Milestone Scrubber Bar */}
        <div className="relative mb-10 sm:mb-12">
          {/* Connecting Progress Track */}
          <div className="hidden md:block absolute top-1/2 left-8 right-8 -translate-y-1/2 h-1 bg-[#F6F3EE] rounded-full z-0 overflow-hidden">
            <motion.div
              className="h-full bg-[#1F4E5F] transition-all duration-300"
              style={{ width: `${((activeIndex + 1) / HIRING_STAGES.length) * 100}%` }}
            />
          </div>

          {/* Stepper Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 relative z-10">
            {HIRING_STAGES.map((stage, idx) => {
              const isSelected = stage.id === activeStageId;
              const isPassed = idx < activeIndex;

              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => handleSelectStage(stage.id)}
                  className={`relative p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-300 min-h-[44px] ${
                    isSelected
                      ? "bg-white border-[#1F4E5F] shadow-md ring-1 ring-[#1F4E5F]/30"
                      : isPassed
                      ? "bg-white/80 border-[#1F4E5F]/30 hover:border-[#1F4E5F]"
                      : "bg-[#F6F3EE]/80 border-[#0E1116]/10 hover:border-[#0E1116]/20"
                  }`}
                  aria-pressed={isSelected}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                        isSelected
                          ? "bg-[#1F4E5F] text-white"
                          : "bg-white text-[#525866] border border-[#0E1116]/8"
                      }`}
                    >
                      {stage.stepNumber}
                    </span>
                    <span className="text-[11px] font-mono text-[#C8553D] font-semibold">
                      {stage.timeframe}
                    </span>
                  </div>

                  <h3 className="font-heading text-xs sm:text-sm font-medium text-[#0E1116] line-clamp-1">
                    {stage.title}
                  </h3>

                  {/* Progress Line on Active Milestone */}
                  {isSelected && (
                    <div className="mt-2.5 h-1 bg-[#C8553D]/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#C8553D] transition-all duration-75 ease-linear"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Interactive Stage Showcase Card */}
        <div className="relative rounded-3xl bg-[#F6F3EE] border border-[#0E1116]/12 p-6 sm:p-10 mb-12 shadow-sm overflow-hidden">
          <BorderBeam size={280} duration={14} colorFrom="#1F4E5F" colorTo="#C8553D" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10"
            >
              {/* Left Column: Stage Deep Dive */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white text-[#1F4E5F] flex items-center justify-center font-bold text-sm shadow-2xs shrink-0">
                    <activeStage.icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#C8553D] block">
                      {activeStage.timeframe} · {activeStage.tagline}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-heading font-medium text-[#0E1116]">
                      {activeStage.title}
                    </h3>
                  </div>
                </div>

                <p className="font-sans text-sm sm:text-base text-[#4A5568] leading-relaxed text-pretty">
                  {activeStage.summary}
                </p>

                <div className="space-y-2.5 pt-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0E1116] block">
                    Verified Stage Deliverables:
                  </span>
                  {activeStage.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#0E1116]">
                      <CheckCircle2 className="w-4 h-4 text-[#1F4E5F] shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex items-center gap-2 text-xs font-mono font-semibold text-[#1F4E5F]">
                  <Clock className="w-4 h-4 text-[#C8553D]" aria-hidden="true" />
                  <span>Turnaround Guarantee: {activeStage.turnaround}</span>
                </div>
              </div>

              {/* Right Column: Interactive Artifact Simulator Card */}
              <div className="lg:col-span-5">
                <div className="bg-white rounded-2xl border border-[#0E1116]/12 p-6 shadow-md relative overflow-hidden">
                  <div className="flex items-center justify-between pb-3 border-b border-[#0E1116]/8 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#1F4E5F]" />
                      <span className="text-xs font-heading font-medium text-[#0E1116]">
                        {activeStage.artifactTitle}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#1F4E5F]/10 text-[#1F4E5F]">
                      {activeStage.artifactBadge}
                    </span>
                  </div>

                  {/* 3 Live Metric Badges */}
                  <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#F6F3EE] mb-4 text-center">
                    {activeStage.artifactMetrics.map((m, idx) => (
                      <div key={idx}>
                        <span className="block text-sm sm:text-base font-heading font-bold text-[#0E1116]">
                          {m.value}
                        </span>
                        <span className="text-[10px] text-[#525866] font-medium block">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-[#525866] leading-relaxed mb-4">
                    All stages are conducted under strict non-disclosure. Promoters receive verified insights without preliminary upfront invoices.
                  </p>

                  <Link
                    href="#enquiry"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#0E1116] text-white text-xs font-semibold hover:bg-[#C8553D] transition-colors min-h-[44px]"
                  >
                    <span>Initiate Mandate for This Milestone</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 3. Bottom Fast Action Banner */}
        <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#1F4E5F] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
          <BorderBeam size={240} duration={16} colorFrom="#C8553D" colorTo="#F6F3EE" />
          <div className="relative z-10 text-center sm:text-left">
            <h4 className="text-lg sm:text-xl font-heading font-medium text-white mb-1">
              Have an active plant leadership mandate?
            </h4>
            <p className="text-xs sm:text-sm text-white/80">
              Brief our desk in 15 minutes today and review 3 pre-vetted dossiers within 7 business days.
            </p>
          </div>
          <MagneticWrapper strength={0.18} className="relative z-10">
            <Link
              href="#enquiry"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#0E1116] font-semibold text-xs sm:text-sm hover:bg-[#F6F3EE] hover:text-[#C8553D] transition-all min-h-[44px] shrink-0"
            >
              <span>Start Mandate Intake</span>
              <ArrowRight className="w-4 h-4 text-[#C8553D]" aria-hidden="true" />
            </Link>
          </MagneticWrapper>
        </div>
      </div>
    </section>
  );
}
