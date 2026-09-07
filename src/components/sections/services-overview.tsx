"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { 
  Shield, 
  Sparkles, 
  Users, 
  Lock, 
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  LayoutGrid
} from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const solutions = [
  {
    code: "JSM-01",
    title: "Private Security & Guarding",
    tagline: "PSARA 2005 LICENSED",
    desc: "Disciplined physical guarding for manufacturing plants, corporate hubs, and infrastructure with 24/7 supervisor monitoring.",
    features: [
      "2-Hour Standby Relief Replacement SLA",
      "100% Police & Aadhaar Verified Guards",
      "2:00 AM Supervisor Patrol Spot-Audits"
    ],
    highlight: "Civil Aviation & Industrial Grade",
    icon: Shield,
    href: "/services/private-security"
  },
  {
    code: "JSM-02",
    title: "Facility Management & Housekeeping",
    tagline: "MECHANIZED HYGIENE",
    desc: "Industrial sanitation and facility upkeep using ride-on scrubbers and eco-certified chemicals with signed hourly audit logs.",
    features: [
      "5-Step Closed-Loop Hygiene Protocol",
      "NABH & Industrial Plant Upkeep Standards",
      "Cross-Contamination Color Coding"
    ],
    highlight: "Hospital & Corporate Certified",
    icon: Sparkles,
    href: "/services/housekeeping"
  },
  {
    code: "JSM-03",
    title: "Contractual Industrial Manpower",
    tagline: "RAPID DEPLOYMENT",
    desc: "Pre-vetted technical, fabrication, and assembly personnel mobilized with 100% EPF/ESIC statutory indemnity.",
    features: [
      "48–72 Hour Rapid Mobilization Guarantee",
      "Zero Client Statutory Legal Liability",
      "Monthly ECR Compliance Documentation"
    ],
    highlight: "Heavy Fabrication & Assembly",
    icon: Users,
    href: "/services/manpower"
  },
  {
    code: "JSM-04",
    title: "Aviation & Critical Infrastructure",
    tagline: "HIGH-STAKES OPERATIONS",
    desc: "Access control, perimeter protection, and visitor management proven at Trichy International Airport.",
    features: [
      "Civil Aviation Benchmark Tested",
      "Biometric Turnstile & Gate Audits",
      "Dignitary & VIP Escort Readiness"
    ],
    highlight: "Landmark Airport Assignment",
    icon: Lock,
    href: "/about"
  }
];

export function ServicesOverview() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % solutions.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? solutions.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % solutions.length);
  };

  const current = solutions[activeSlide];
  const CurrentIcon = current.icon;

  return (
    <section className="py-16 md:py-24 bg-white border-t border-black/[0.08] text-[#1d1d1f] relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-black/[0.08]">
          <div className="space-y-2">
            <span className="text-xs font-semibold tracking-wider text-[#0071e3] uppercase block font-mono">
              Interactive Solutions Slideshow
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1d1d1f] tracking-tight text-balance">
              Engineered security &amp; facility solutions.
            </h2>
            <p className="text-xs sm:text-sm text-[#515154] max-w-2xl font-normal leading-relaxed text-pretty">
              Precision guarding, certified housekeeping, and contractual workforce deployed with zero vendor fragmentation and single-point executive accountability.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] border border-black/[0.06] text-[#1d1d1f] text-xs font-semibold transition-all press-scale min-touch-target group"
            >
              <span>View all services</span>
              <ArrowRight size={13} className="text-[#86868b] group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Interactive Slideshow Tabs & Progress */}
        <div 
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="space-y-6"
        >
          {/* Top Tab Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {solutions.map((item, idx) => (
              <button
                key={item.code}
                onClick={() => setActiveSlide(idx)}
                className={`px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 press-scale flex items-center gap-2 ${
                  activeSlide === idx
                    ? "bg-[#1d1d1f] text-white shadow-sm"
                    : "bg-[#f5f5f7] text-[#515154] hover:bg-black/[0.06] hover:text-[#1d1d1f]"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${activeSlide === idx ? "bg-[#0071e3]" : "bg-neutral-400"}`} />
                <span>{item.title}</span>
              </button>
            ))}
          </div>

          {/* Featured Hero Slideshow Card */}
          <div className="relative bg-[#f5f5f7] border border-black/[0.08] rounded-[32px] p-8 sm:p-10 md:p-12 shadow-sm overflow-hidden">
            {/* Top Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-black/[0.06] overflow-hidden">
              <motion.div 
                key={activeSlide}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: isPaused ? 0 : 5.5, ease: "linear" }}
                className="h-full bg-[#0071e3]"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Solution Detail */}
              <div className="lg:col-span-8 space-y-6">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-3 py-1 rounded-full bg-white border border-black/[0.08] text-[11px] font-mono font-bold text-[#1d1d1f] uppercase tracking-wider shadow-2xs">
                    {current.code}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#0071e3]/10 text-[#0071e3] text-[11px] font-semibold tracking-wide">
                    {current.tagline}
                  </span>
                  <span className="text-xs font-mono text-[#86868b] hidden sm:inline-block">
                    • {current.highlight}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1d1d1f] tracking-tight">
                    {current.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#515154] max-w-2xl font-normal leading-relaxed text-pretty">
                    {current.desc}
                  </p>
                </div>

                {/* Features Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  {current.features.map((feat, fIdx) => (
                    <div key={fIdx} className="p-3.5 bg-white rounded-2xl border border-black/[0.06] shadow-2xs space-y-1">
                      <CheckCircle2 size={16} className="text-[#0071e3]" />
                      <span className="text-xs font-semibold text-[#1d1d1f] block leading-tight">{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Actions Strip */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href={current.href}
                    className="inline-flex items-center gap-2 px-6 h-11 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold shadow-xs press-scale transition-all"
                  >
                    <span>Explore service specs</span>
                    <ArrowRight size={13} />
                  </Link>

                  <Link
                    href="/get-quote"
                    className="inline-flex items-center gap-2 px-6 h-11 rounded-full bg-white hover:bg-neutral-100 border border-black/[0.08] text-[#1d1d1f] text-xs font-semibold shadow-xs press-scale transition-all"
                  >
                    <span>Request proposal</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Dynamic Stage Emblem & Controls */}
              <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-white rounded-3xl border border-black/[0.06] shadow-sm space-y-6 text-center">
                <div className="w-20 h-20 rounded-3xl bg-[#f5f5f7] border border-black/[0.08] text-[#1d1d1f] flex items-center justify-center shadow-xs">
                  <CurrentIcon size={36} className="text-[#0071e3]" />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-[#86868b] uppercase tracking-wider">
                    SLA GUARANTEED
                  </span>
                  <p className="text-xs font-semibold text-[#1d1d1f]">
                    2-Hour Relief Standby • 100% EPF/ESI
                  </p>
                </div>

                {/* Slideshow Arrow Navigation */}
                <div className="flex items-center justify-center gap-3 pt-2 border-t border-black/[0.06] w-full">
                  <button
                    onClick={prevSlide}
                    className="w-10 h-10 rounded-full border border-black/[0.08] bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] flex items-center justify-center transition-all press-scale"
                    aria-label="Previous service"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <span className="text-xs font-mono text-[#86868b] tabular-nums">
                    0{activeSlide + 1} / 0{solutions.length}
                  </span>

                  <button
                    onClick={nextSlide}
                    className="w-10 h-10 rounded-full border border-black/[0.08] bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] flex items-center justify-center transition-all press-scale"
                    aria-label="Next service"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
