"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShieldCheck, 
  Sparkles, 
  Users, 
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FileCheck2,
  Briefcase,
  Layers,
  Phone
} from "lucide-react";
import { cn } from "@/lib/utils";

const THREE_TIER_SERVICES = [
  {
    tier: "TIER 01",
    title: "Security Supervisors (ESM & Private)",
    tagline: "MALE & FEMALE SUPERVISORS • PSARA LICENSED • DGR-ALIGNED",
    desc: "Elite Ex-Servicemen (ESM) military veterans and rigorously certified private security supervisors directing static guarding, armed escorts, night patrols, and high-stakes perimeter watch.",
    features: [
      "Ex-Servicemen (ESM) Officers & JCOs with armed forces discipline",
      "Dedicated male and female supervisory units for corporate & retail hubs",
      "Strict PSARA Act (2005) compliance & 100% police verification",
      "Guaranteed 2-Hour Relief Replacement SLA with 2:00 AM van spot-audits"
    ],
    highlight: "Civil Aviation & Heavy Industrial Grade",
    icon: ShieldCheck,
    href: "/services/private-security"
  },
  {
    tier: "TIER 02",
    title: "Corporate & Multi-Skill Staffing",
    tagline: "HOSPITALITY • TECHNICAL & NON-TECHNICAL • SKILLED & UNSKILLED",
    desc: "End-to-end workforce outsourcing covering corporate office staff, hospitality personnel, factory assembly workers, warehouse packing teams, CNC operators, and general labor.",
    features: [
      "Hospitality & front-desk corporate customer experience professionals",
      "Certified technical crew: electricians, plumbers, HVAC & maintenance",
      "Factory & warehouse assembly workforce mobilized within 48–72 hours",
      "100% statutory ESI/EPF compliance with client legal indemnity"
    ],
    highlight: "Zero Statutory Legal Liability",
    icon: Users,
    href: "/services/manpower"
  },
  {
    tier: "TIER 03",
    title: "Integrated Facility & Housekeeping",
    tagline: "MECHANIZED SANITATION • NABH STANDARDS • ASSET MAINTENANCE",
    desc: "Industrial mechanized housekeeping, diamond floor scrubbing, hospital-grade environmental sanitization, and green waste management with verifiable supervisor audit logs.",
    features: [
      "Industrial ride-on sweepers & single-disc high-speed rotary scrubbers",
      "NABH & multi-specialty healthcare pathogen control protocols",
      "Color-coded microfiber cross-contamination prevention systems",
      "Daily digital audit checklists with live photographic compliance logs"
    ],
    highlight: "Hospital & Clean-Room Certified",
    icon: Sparkles,
    href: "/services/housekeeping"
  }
];

export function ServicesOverview() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % THREE_TIER_SERVICES.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? THREE_TIER_SERVICES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % THREE_TIER_SERVICES.length);
  };

  const current = THREE_TIER_SERVICES[activeSlide];
  const CurrentIcon = current.icon;

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-black/[0.08] relative overflow-hidden">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/[0.04] border border-black/[0.08] text-xs font-semibold text-[#1d1d1f] uppercase tracking-wider font-mono">
              <Layers size={13} className="text-[#0071e3]" />
              <span>Three-Tier Unified Operating Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1d1d1f] tracking-tight">
              Specialized services. Absolute discipline.
            </h2>
            <p className="text-sm sm:text-base text-[#86868b] leading-relaxed">
              Replacing fragmented multiple vendors with three specialized, audit-ready operational pillars across Tamil Nadu and South India.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0071e3] hover:underline self-start md:self-auto shrink-0 group"
          >
            <span>View Full Services &amp; GeM Matrix</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Quick Select Tab Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
          {THREE_TIER_SERVICES.map((s, idx) => (
            <button
              key={s.tier}
              onClick={() => setActiveSlide(idx)}
              className={cn(
                "px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 press-scale",
                activeSlide === idx
                  ? "bg-[#1d1d1f] text-white shadow-md"
                  : "bg-[#f5f5f7] text-[#515154] hover:text-[#1d1d1f] hover:bg-neutral-200"
              )}
            >
              <span className="font-mono text-[11px] font-bold text-emerald-400">{s.tier}</span>
              <span>{s.title}</span>
            </button>
          ))}
        </div>

        {/* The Apple-Grade Interactive Showcase Container */}
        <div 
          className="bg-[#f5f5f7] border border-black/[0.08] rounded-[36px] overflow-hidden shadow-lg"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Running Progress Bar */}
          <div className="h-1 bg-black/[0.06] w-full">
            <motion.div
              key={activeSlide}
              initial={{ width: "0%" }}
              animate={{ width: isPaused ? "100%" : "100%" }}
              transition={{ duration: isPaused ? 0 : 5.5, ease: "linear" }}
              className="h-full bg-[#0071e3]"
            />
          </div>

          <div className="p-6 sm:p-10 lg:p-14">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
              >
                {/* Left Pane: Detailed Specifications */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="px-3.5 py-1 rounded-full bg-black text-white font-mono text-xs font-bold tracking-wider">
                      {current.tier}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 text-xs font-semibold">
                      {current.highlight}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1d1d1f] tracking-tight">
                    {current.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-mono font-bold text-[#0071e3] tracking-wide uppercase">
                    {current.tagline}
                  </p>

                  <p className="text-sm sm:text-base text-[#515154] leading-relaxed text-pretty">
                    {current.desc}
                  </p>

                  {/* Bulleted Specifications */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {current.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2.5 bg-white p-3.5 rounded-2xl border border-black/[0.06] shadow-xs">
                        <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-xs font-medium text-[#1d1d1f] leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Bar */}
                  <div className="pt-4 flex flex-wrap items-center gap-3">
                    <Link
                      href={current.href}
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs sm:text-sm font-semibold shadow-md press-scale transition-all"
                    >
                      <span>Explore {current.title}</span>
                      <ArrowRight size={14} />
                    </Link>
                    <a
                      href="https://wa.me/919080863448?text=Hello%20JSM%20Integrated%20Services,%20I%20am%20interested%20in%20your%20services"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white hover:bg-neutral-100 text-[#1d1d1f] border border-black/[0.08] text-xs sm:text-sm font-semibold shadow-xs transition-all"
                    >
                      <span>WhatsApp Direct</span>
                    </a>
                  </div>
                </div>

                {/* Right Pane: Visual Dossier Badge */}
                <div className="lg:col-span-5">
                  <div className="rounded-[28px] bg-white border border-black/[0.08] p-8 shadow-md relative overflow-hidden flex flex-col justify-between min-h-[360px]">
                    <div className="w-16 h-16 rounded-2xl bg-black text-white flex items-center justify-center shadow-lg mb-6">
                      <CurrentIcon size={32} />
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-1">
                        <span className="text-[11px] font-mono text-[#86868b] uppercase tracking-wider block">
                          Verified Operational Standard
                        </span>
                        <h4 className="text-xl font-bold text-[#1d1d1f] tracking-tight">
                          DGR &amp; PSARA Certified
                        </h4>
                      </div>

                      <p className="text-xs text-[#86868b] leading-relaxed">
                        Every supervisor and staff cadre passes comprehensive background verification, Aadhaar/ESIC onboarding, and site-specific standard operating procedure induction.
                      </p>

                      <div className="pt-2 border-t border-black/[0.08] flex items-center justify-between text-xs font-mono text-[#515154]">
                        <span>ZERO CLIENT LEGAL LIABILITY</span>
                        <span className="text-emerald-600 font-bold">100% EPF/ESIC</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom Slideshow Navigation Footer */}
            <div className="mt-10 pt-6 border-t border-black/[0.08] flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-xs text-[#86868b]">
                <span className="text-black font-bold">0{activeSlide + 1}</span>
                <span>/</span>
                <span>0{THREE_TIER_SERVICES.length}</span>
                <span className="ml-2 hidden sm:inline text-neutral-400">
                  {isPaused ? "(Paused on Hover)" : "(Auto-Advancing 5.5s)"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full bg-white hover:bg-neutral-100 border border-black/[0.08] flex items-center justify-center text-[#1d1d1f] transition-all cursor-pointer shadow-xs"
                  aria-label="Previous service"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full bg-white hover:bg-neutral-100 border border-black/[0.08] flex items-center justify-center text-[#1d1d1f] transition-all cursor-pointer shadow-xs"
                  aria-label="Next service"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Clean Secondary Enterprise Matrix: GeM, Document Scanning, CSC */}
        <div className="mt-14 pt-12 border-t border-black/[0.08]">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-[#1d1d1f] tracking-tight">
              Complementary Enterprise &amp; Government Solutions
            </h3>
            <p className="text-xs sm:text-sm text-[#86868b]">
              Specialized procurement and citizen digitization services delivered with institutional precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#f5f5f7] p-6 rounded-2xl border border-black/[0.06] space-y-2">
              <div className="flex items-center gap-2">
                <Briefcase size={16} className="text-[#0071e3]" />
                <h4 className="text-sm font-bold text-[#1d1d1f]">Government Tender &amp; GeM Procurement</h4>
              </div>
              <p className="text-xs text-[#515154] leading-relaxed">
                Empanelled bidding, institutional supplies, and compliance fulfillment across Tamil Nadu public sector undertakings.
              </p>
              <Link href="/services" className="text-xs font-semibold text-[#0071e3] hover:underline inline-block pt-1">
                Learn more →
              </Link>
            </div>

            <div className="bg-[#f5f5f7] p-6 rounded-2xl border border-black/[0.06] space-y-2">
              <div className="flex items-center gap-2">
                <FileCheck2 size={16} className="text-[#0071e3]" />
                <h4 className="text-sm font-bold text-[#1d1d1f]">Scanning, OCR &amp; IT Digitization</h4>
              </div>
              <p className="text-xs text-[#515154] leading-relaxed">
                Large-format physical document scanning, institutional record archiving, and digital data migration for enterprises.
              </p>
              <Link href="/services" className="text-xs font-semibold text-[#0071e3] hover:underline inline-block pt-1">
                Learn more →
              </Link>
            </div>

            <div className="bg-[#f5f5f7] p-6 rounded-2xl border border-black/[0.06] space-y-2">
              <div className="flex items-center gap-2">
                <Layers size={16} className="text-[#0071e3]" />
                <h4 className="text-sm font-bold text-[#1d1d1f]">CSC &amp; Citizen Services</h4>
              </div>
              <p className="text-xs text-[#515154] leading-relaxed">
                Authorized Common Services Center operations delivering government schemes, citizen certificates, and pan-India registrations.
              </p>
              <Link href="/services" className="text-xs font-semibold text-[#0071e3] hover:underline inline-block pt-1">
                Learn more →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
