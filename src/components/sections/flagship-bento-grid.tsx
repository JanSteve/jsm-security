"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShieldCheck, 
  Plane, 
  Award, 
  Clock, 
  Users, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  FileCheck,
  Building2
} from "lucide-react";
import { brandData } from "@/data/brand";

const operationalSlides = [
  {
    id: "airport-terminal",
    tag: "CIVIL AVIATION BENCHMARK (2024)",
    title: "Managing Director Sweety J & Trichy Airport Platoon",
    badge: "Landmark Aviation Contract",
    desc: "MD Sweety J seated with the full disciplined security squad at the international concourse entrance of Trichy International Airport. Proven 24/7 terminal vigilance, passenger assistance, and access control.",
    metric: "Zero Security Incidents • 24/7 Gate Command",
    image: "/images/real_jsm_airport_terminal_platoon.jpg",
    tabLabel: "Airport Concourse Platoon",
    href: "/about"
  },
  {
    id: "chariot-platoon",
    tag: "PSARA 2005 COMPLIANT MUSTER",
    title: "Monument Landmark Ceremonial Honor Guard",
    badge: "100% Police Verified",
    desc: "Uniformed security detachment in full ceremonial turnout and bearing under the monumental chariot mural with MD Sweety J. Demonstrating five-day induction discipline, posture, and turn-out readiness.",
    metric: "Aadhaar & Police Verified • 2:00 AM Spot-Audited",
    image: "/images/real_jsm_chariot_platoon.jpg",
    tabLabel: "Heritage Honor Guard",
    href: "/services/private-security"
  },
  {
    id: "printed-card",
    tag: "AUTHENTIC CORPORATE CREDENTIALS",
    title: "Official State PSARA Licensing & Registered Office",
    badge: "300 DPI Physical Proof",
    desc: "Official printed business card with metallic silver crest verifying Sweety J (Proprietor & MD), Operations Head Major AR Devadoss (Army-Veteran), and registered headquarters in Kottapattu, Trichy.",
    metric: "Home Department Licensed • Statutory Adherence",
    image: "/images/real_jsm_printed_card.jpg",
    tabLabel: "Corporate Credentials",
    href: "/about"
  },
  {
    id: "fabrication-manpower",
    tag: "ACTIVE INDUSTRIAL STAFFING",
    title: "Manufacturing & Heavy Fabrication Workforce",
    badge: "Rapid 48–72h Mobilization",
    desc: "Active industrial staffing for Block & Pipe fabrication technicians deployed across Tamil Nadu's industrial manufacturing corridors with complete EPF and ESIC statutory legal indemnity.",
    metric: "100% EPF/ESIC Adherence • Zero Client Liability",
    image: "/images/real_jsm_fabrication_hiring.jpg",
    tabLabel: "Industrial Workforce",
    href: "/careers"
  },
  {
    id: "shift-muster",
    tag: "DAILY FIELD DISCIPLINE",
    title: "Shift Muster Briefing & Radio Telemetry Check",
    badge: "2-Hour Relief SLA",
    desc: "Daily pre-shift muster, radio communication protocol verification, and post allocation. Any guard absence triggers our roving supervisor van with a verified substitute within 120 minutes.",
    metric: "Guaranteed 2-Hour Relief Replacement SLA",
    image: "/images/real_jsm_shift_muster_day.jpg",
    tabLabel: "Daily Shift Muster",
    href: "/services/private-security"
  }
];

export function FlagshipBentoGrid() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % operationalSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? operationalSlides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % operationalSlides.length);
  };

  const current = operationalSlides[activeSlide];

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-16 max-w-[1720px] mx-auto bg-white border-t border-black/[0.08] text-[#1d1d1f]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-black/[0.08] gap-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f5f5f7] border border-black/[0.06] text-[#86868b] text-xs font-mono font-medium tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Interactive Operational Proof Slideshow</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-[#1d1d1f] tracking-tight text-balance">
            Real proof. Real people. <br />
            <span className="text-[#86868b]">Zero hallucination.</span>
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#515154] max-w-md font-normal leading-relaxed text-pretty">
          Every photograph below represents genuine operational deployments, uniformed personnel platoons, and executive credentials verified in the field across Tamil Nadu.
        </p>
      </div>

      {/* Interactive Slideshow Player */}
      <div 
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="space-y-6"
      >
        {/* Apple Tab Filter Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {operationalSlides.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setActiveSlide(idx)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 press-scale flex items-center gap-2 ${
                activeSlide === idx
                  ? "bg-[#1d1d1f] text-white shadow-sm"
                  : "bg-[#f5f5f7] text-[#515154] hover:bg-black/[0.06] hover:text-[#1d1d1f]"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${activeSlide === idx ? "bg-[#0071e3]" : "bg-neutral-400"}`} />
              <span>{slide.tabLabel}</span>
            </button>
          ))}
        </div>

        {/* Cinematic Main Stage Viewport - Screen Filling */}
        <div className="relative w-full min-h-[560px] sm:min-h-[660px] md:min-h-[760px] rounded-[36px] overflow-hidden border border-black/[0.08] shadow-2xl bg-[#1d1d1f] group">
          {/* Top Progress Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 z-20 overflow-hidden">
            <motion.div 
              key={activeSlide}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: isPaused ? 0 : 6, ease: "linear" }}
              className="h-full bg-[#0071e3]"
            />
          </div>

          {/* Background Slide Image with Crossfade */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0 z-0"
            >
              <Image
                src={current.image}
                alt={current.title}
                fill
                className="object-cover"
                sizes="(max-width: 1440px) 100vw, 1440px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />
            </motion.div>
          </AnimatePresence>

          {/* Top Slide Header Overlay */}
          <div className="absolute top-6 inset-x-6 z-10 flex items-center justify-between pointer-events-none">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{current.tag}</span>
            </span>

            <span className="hidden sm:inline-flex px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#1d1d1f] text-xs font-semibold shadow-xs">
              {current.badge}
            </span>
          </div>

          {/* Navigation Arrow Controls */}
          <div className="absolute inset-y-0 inset-x-4 z-20 flex items-center justify-between pointer-events-none">
            <button
              onClick={prevSlide}
              className="pointer-events-auto w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white border border-white/20 flex items-center justify-center transition-all press-scale shadow-lg group-hover:opacity-100 opacity-90"
              aria-label="Previous operational slide"
            >
              <ChevronLeft size={22} strokeWidth={2.5} />
            </button>

            <button
              onClick={nextSlide}
              className="pointer-events-auto w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white border border-white/20 flex items-center justify-center transition-all press-scale shadow-lg group-hover:opacity-100 opacity-90"
              aria-label="Next operational slide"
            >
              <ChevronRight size={22} strokeWidth={2.5} />
            </button>
          </div>

          {/* Bottom High-Contrast Content Card */}
          <div className="absolute bottom-6 inset-x-4 sm:inset-x-6 z-10 pointer-events-none">
            <div className="pointer-events-auto max-w-3xl bg-white/95 backdrop-blur-2xl p-6 sm:p-7 rounded-2xl sm:rounded-[24px] border border-black/[0.08] shadow-2xl space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h3 className="text-lg sm:text-2xl font-bold text-[#1d1d1f] tracking-tight">
                  {current.title}
                </h3>
                <span className="text-xs font-mono font-semibold text-[#0071e3] whitespace-nowrap">
                  {current.metric}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#515154] font-normal leading-relaxed text-pretty">
                {current.desc}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-black/[0.06]">
                <Link
                  href={current.href}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0071e3] hover:underline transition-colors press-scale"
                >
                  <span>Learn more about this deployment</span>
                  <ArrowRight size={13} />
                </Link>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-[#86868b] tabular-nums">
                    0{activeSlide + 1} / 0{operationalSlides.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail Dots Bar */}
        <div className="flex items-center justify-center gap-2 pt-1">
          {operationalSlides.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setActiveSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeSlide === idx 
                  ? "w-8 bg-[#0071e3]" 
                  : "w-2 bg-black/15 hover:bg-black/30"
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
