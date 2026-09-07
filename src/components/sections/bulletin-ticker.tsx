"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Bell, ChevronUp, ChevronDown, ExternalLink, ShieldAlert, FileText, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BulletinItem {
  id: string;
  category: "DGR Update" | "Government Scheme" | "Wage Advisory" | "Recruitment Alert" | "Operational Milestone";
  title: string;
  date: string;
  summary: string;
  link: string;
}

export const BULLETIN_FEED: BulletinItem[] = [
  {
    id: "b1",
    category: "DGR Update",
    title: "DGR Security Agency Empanelment Guidelines 2026 Issued",
    date: "Sep 2026",
    summary: "State-wise empanelment quotas and revised wage structure for Ex-Servicemen (ESM) security personnel updated per MoD advisories.",
    link: "/security-agencies",
  },
  {
    id: "b2",
    category: "Recruitment Alert",
    title: "Commissioned Officers & JCO Senior Supervisor Openings",
    date: "Immediate",
    summary: "Direct walk-in and WhatsApp registration open for Ex-Servicemen officers for industrial corridor postings across Tamil Nadu.",
    link: "/careers",
  },
  {
    id: "b3",
    category: "Operational Milestone",
    title: "Trichy International Airport Operations Achieves 24 Months Zero-Breach Milestone",
    date: "Aug 2026",
    summary: "Complete passenger flow facilitation, perimeter surveillance, and aviation baggage protection milestone certified.",
    link: "/about",
  },
  {
    id: "b4",
    category: "Wage Advisory",
    title: "Tamil Nadu Minimum Wages Gazette Revision Compliance Notification",
    date: "Aug 2026",
    summary: "100% adherence to revised variable dearness allowance (VDA) across Security, Housekeeping, and Skilled Manpower cadres.",
    link: "/security-agencies",
  },
  {
    id: "b5",
    category: "Government Scheme",
    title: "Directorate General Resettlement ESM Self-Employment Schemes",
    date: "Jul 2026",
    summary: "Subsidy and entrepreneurship guidelines available for retired military personnel entering industrial facilities management.",
    link: "/work-opportunities",
  },
];

export function BulletinTicker() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

  // Auto-advance upward every 4.5 seconds
  React.useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BULLETIN_FEED.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + BULLETIN_FEED.length) % BULLETIN_FEED.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % BULLETIN_FEED.length);
  };

  const current = BULLETIN_FEED[currentIndex];

  const getBadgeStyle = (cat: BulletinItem["category"]) => {
    switch (cat) {
      case "DGR Update":
        return "bg-emerald-500/15 text-emerald-700 border-emerald-500/30";
      case "Recruitment Alert":
        return "bg-blue-500/15 text-blue-700 border-blue-500/30";
      case "Wage Advisory":
        return "bg-purple-500/15 text-purple-700 border-purple-500/30";
      case "Government Scheme":
        return "bg-amber-500/15 text-amber-700 border-amber-500/30";
      default:
        return "bg-neutral-500/15 text-neutral-700 border-neutral-500/30";
    }
  };

  return (
    <div className="bg-[#f5f5f7] border-y border-black/[0.08] py-3.5">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
        <div 
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left Ticker Label */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center shadow-xs shrink-0">
              <Bell size={14} className="animate-wiggle" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-extrabold text-[#1d1d1f] tracking-tight uppercase font-mono flex items-center gap-1.5">
                <span>WHAT&apos;S NEW</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              </span>
              <span className="text-[10px] text-[#86868b] font-mono leading-none">Live Dispatch Bulletin</span>
            </div>
          </div>

          {/* Center Vertical Scrolling Item */}
          <div className="flex-1 overflow-hidden min-h-[44px] flex items-center sm:px-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 w-full"
              >
                <span className={cn("text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border shrink-0 uppercase", getBadgeStyle(current.category))}>
                  {current.category}
                </span>

                <Link
                  href={current.link}
                  className="text-xs sm:text-sm font-semibold text-[#1d1d1f] hover:text-[#0071e3] transition-colors truncate max-w-2xl flex items-center gap-1 group"
                >
                  <span className="truncate">{current.title}</span>
                  <ArrowRight size={13} className="shrink-0 text-neutral-400 group-hover:text-[#0071e3] group-hover:translate-x-0.5 transition-all" />
                </Link>

                <span className="text-[11px] text-[#86868b] font-mono hidden xl:inline shrink-0">
                  {current.date}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Navigation Controls */}
          <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
            <span className="text-[11px] font-mono text-[#86868b] mr-2">
              {currentIndex + 1} / {BULLETIN_FEED.length}
            </span>
            <button
              onClick={handlePrev}
              className="w-7 h-7 rounded-full bg-white hover:bg-neutral-200 border border-black/[0.08] flex items-center justify-center text-[#1d1d1f] transition-colors cursor-pointer shadow-xs"
              aria-label="Previous bulletin"
            >
              <ChevronUp size={14} />
            </button>
            <button
              onClick={handleNext}
              className="w-7 h-7 rounded-full bg-white hover:bg-neutral-200 border border-black/[0.08] flex items-center justify-center text-[#1d1d1f] transition-colors cursor-pointer shadow-xs"
              aria-label="Next bulletin"
            >
              <ChevronDown size={14} />
            </button>
            <Link
              href="/whats-new"
              className="text-xs font-semibold text-[#0071e3] hover:underline ml-2 hidden md:inline"
            >
              View Archive →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
