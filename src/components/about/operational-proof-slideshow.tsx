"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, ShieldCheck, Award } from "lucide-react";

const proofSlides = [
  {
    id: "airport-platoon",
    title: "Trichy International Airport Terminal Platoon",
    category: "CIVIL AVIATION BENCHMARK (2024)",
    badge: "Landmark Operations Contract",
    description: "Managing Director Sweety J seated with the full disciplined security guard platoon at the international concourse entrance of Trichy Airport.",
    image: "/images/real_jsm_airport_terminal_platoon.jpg",
    metric: "0 Lapses • 24/7 Terminal Concourse Command"
  },
  {
    id: "chariot-platoon",
    title: "Monument Landmark Ceremonial Honor Guard",
    category: "PSARA 2005 COMPLIANT MUSTER",
    badge: "100% Police Verified",
    description: "Uniformed security detachment in full ceremonial turnout and bearing under the monumental chariot landmark with MD Sweety J.",
    image: "/images/real_jsm_chariot_platoon.jpg",
    metric: "5-Day Induction Protocol • 2:00 AM Spot-Audited"
  },
  {
    id: "fabrication-hiring",
    title: "Industrial Manufacturing & Fabrication Workforce",
    category: "ACTIVE INDUSTRIAL RECRUITMENT",
    badge: "Rapid 48–72h Mobilization",
    description: "Block & Pipe fabrication technicians deployed across manufacturing corridors with complete EPF and ESIC statutory legal indemnity.",
    image: "/images/real_jsm_fabrication_hiring.jpg",
    metric: "100% Statutory Adherence • Zero Client Liability"
  },
  {
    id: "shift-muster",
    title: "Daily Pre-Shift Muster & Radio Check",
    category: "FIELD DISCIPLINE & RELIEF SLA",
    badge: "2-Hour Relief Guarantee",
    description: "Roll call inspection, communications checks, and 2-Hour Relief reserve squad staging before each shift deployment.",
    image: "/images/real_jsm_shift_muster_day.jpg",
    metric: "Guaranteed 2-Hour Standby Relief Replacement"
  },
  {
    id: "printed-card",
    title: "Official Corporate Credentials & Licensing",
    category: "AUTHENTIC CORPORATE CREDENTIALS",
    badge: "300 DPI Official Print",
    description: "Official printed business credentials verifying Sweety J (Proprietor & MD), Operations Head Major AR Devadoss (Army-Veteran), and Kottapattu HQ.",
    image: "/images/real_jsm_printed_card.jpg",
    metric: "Home Department Licensed • Physical Verification"
  }
];

export function OperationalProofSlideshow() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % proofSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? proofSlides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % proofSlides.length);
  };

  const current = proofSlides[activeSlide];

  return (
    <div 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="space-y-6"
    >
      {/* Slideshow Category Navigation Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {proofSlides.map((slide, idx) => (
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
            <span>{slide.title.split(" ").slice(0, 3).join(" ")}</span>
          </button>
        ))}
      </div>

      {/* Main Photographic Slideshow Stage */}
      <div className="relative w-full h-[460px] sm:h-[520px] md:h-[580px] rounded-[32px] overflow-hidden border border-black/[0.08] shadow-xl bg-[#1d1d1f] group">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 z-20 overflow-hidden">
          <motion.div 
            key={activeSlide}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: isPaused ? 0 : 5.5, ease: "linear" }}
            className="h-full bg-[#0071e3]"
          />
        </div>

        {/* Slide Image with Smooth Crossfade */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="absolute inset-0 z-0"
          >
            <Image
              src={current.image}
              alt={current.title}
              fill
              className="object-cover"
              sizes="(max-width: 1440px) 100vw, 1200px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />
          </motion.div>
        </AnimatePresence>

        {/* Top Header Tags */}
        <div className="absolute top-6 inset-x-6 z-10 flex items-center justify-between pointer-events-none">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono font-semibold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{current.category}</span>
          </span>

          <span className="hidden sm:inline-flex px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#1d1d1f] text-xs font-semibold shadow-xs">
            {current.badge}
          </span>
        </div>

        {/* Arrow Navigation Controls */}
        <div className="absolute inset-y-0 inset-x-4 z-20 flex items-center justify-between pointer-events-none">
          <button
            onClick={prevSlide}
            className="pointer-events-auto w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white border border-white/20 flex items-center justify-center transition-all press-scale shadow-lg"
            aria-label="Previous image"
          >
            <ChevronLeft size={22} strokeWidth={2.5} />
          </button>

          <button
            onClick={nextSlide}
            className="pointer-events-auto w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white border border-white/20 flex items-center justify-center transition-all press-scale shadow-lg"
            aria-label="Next image"
          >
            <ChevronRight size={22} strokeWidth={2.5} />
          </button>
        </div>

        {/* Bottom Information Overlay Card */}
        <div className="absolute bottom-6 inset-x-4 sm:inset-x-6 z-10 pointer-events-none">
          <div className="pointer-events-auto max-w-2xl bg-white/95 backdrop-blur-2xl p-6 sm:p-7 rounded-2xl sm:rounded-[24px] border border-black/[0.08] shadow-2xl space-y-2.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <h3 className="text-base sm:text-xl font-bold text-[#1d1d1f] tracking-tight">
                {current.title}
              </h3>
              <span className="text-xs font-mono font-semibold text-[#0071e3] whitespace-nowrap">
                {current.metric}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#515154] font-normal leading-relaxed text-pretty">
              {current.description}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-black/[0.06] text-xs">
              <span className="text-[11px] font-mono text-[#86868b] tabular-nums">
                Photo 0{activeSlide + 1} of 0{proofSlides.length} • Authentic Archive
              </span>
              <span className="text-[11px] font-semibold text-[#0071e3]">
                100% Genuine Field Photography
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex items-center justify-center gap-2 pt-1">
        {proofSlides.map((slide, idx) => (
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
  );
}
