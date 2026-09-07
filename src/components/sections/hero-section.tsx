"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { 
  ArrowRight, 
  MessageCircle, 
  Phone, 
  ShieldCheck, 
  Plane, 
  CheckCircle2, 
  ChevronRight,
  ChevronLeft,
  FileCheck,
  Building,
  Award
} from "lucide-react";
import { brandData } from "@/data/brand";

const heroVisuals = [
  {
    id: "airport-platoon",
    title: "Trichy International Airport Operations",
    badge: "CIVIL AVIATION BENCHMARK",
    metric: "0 Incidents • 24/7 Gate Integrity",
    caption: "Proprietor and MD Sweety J with full uniformed security platoon at Tiruchirappalli International Airport commercial concourse.",
    image: "/images/real_jsm_airport_terminal_platoon.jpg",
    tags: ["Airport Passenger Flow", "Access Gate Control", "100% Turnout"],
    href: "/about"
  },
  {
    id: "chariot-platoon",
    title: "Ex-Servicemen & Honor Guard Platoon",
    badge: "DGR-ALIGNED & PSARA LICENSED",
    metric: "100% Police & Aadhaar Verified",
    caption: "Ceremonial muster and guard bearing under monumental landmark with Proprietor and MD Sweety J.",
    image: "/images/real_jsm_chariot_platoon.jpg",
    tags: ["5-Day Induction", "2:00 AM Audits", "Ex-Servicemen & Pvt"],
    href: "/services/private-security"
  },
  {
    id: "printed-card",
    title: "Official Statutory Credentials & PSARA",
    badge: "AUTHENTIC PHYSICAL PROOF",
    metric: "PSARA & ISO 9001:2015",
    caption: "Official corporate credentials with metallic silver crest, Sweety J (Proprietor and MD), and Major AR Devadoss (Army-Veteran).",
    image: "/images/real_jsm_printed_card.jpg",
    tags: ["Trichy Command HQ", "State Licensed", "Full Contact Details"],
    href: "/about"
  },
  {
    id: "fabrication-manpower",
    title: "Industrial Fabrication & Technical Staffing",
    badge: "ACTIVE FACTORY DEPLOYMENTS",
    metric: "48-72h Rapid Mobilization",
    caption: "Technical workforce and assembly specialists deployed across manufacturing corridors with complete EPF/ESI legal indemnity.",
    image: "/images/real_jsm_fabrication_hiring.jpg",
    tags: ["Block Fabrication", "Pipe Fitting", "100% Statutory EPF/ESI"],
    href: "/careers"
  }
];

export function HeroSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [liveTime, setLiveTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLiveTime(
        now.toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true
        }) + " IST"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % heroVisuals.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const prevSlide = () => {
    setActiveTab((prev) => (prev === 0 ? heroVisuals.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveTab((prev) => (prev + 1) % heroVisuals.length);
  };

  const current = heroVisuals[activeTab];

  return (
    <section 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full min-h-[92vh] flex flex-col justify-between overflow-hidden bg-black text-white pt-52 sm:pt-60 md:pt-64 lg:pt-72 pb-10"
    >
      {/* FULL-SCREEN SLIDESHOW CANVAS (FILLS ENTIRE SCREEN) */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.image}
              alt={current.title}
              className="w-full h-full object-cover object-center"
            />
            {/* Multi-Layered Cinema Gradient Overlays for Maximum Text Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/85" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-black/40" />
          </motion.div>
        </AnimatePresence>

        {/* Top Timer Progress Bar running full screen width */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-white/20 z-30">
          <motion.div
            key={activeTab}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: isPaused ? 0 : 6, ease: "linear" }}
            className="h-full bg-[#0071e3]"
          />
        </div>
      </div>

      {/* Screen-Filling Foreground Content Stage */}
      <div className="relative z-20 max-w-[1720px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 w-full my-auto space-y-8">
        
        {/* Telemetry Strip */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm font-mono font-bold">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/70 border border-white/20 text-white backdrop-blur-md shadow-xl">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>24/7 COMMAND DESK ACTIVE</span>
          </div>

          {liveTime && (
            <span className="px-3.5 py-1.5 rounded-full bg-white/10 text-white border border-white/15 backdrop-blur-md">
              {liveTime}
            </span>
          )}

          <span className="px-3.5 py-1.5 rounded-full bg-[#0071e3]/90 text-white uppercase tracking-wider border border-blue-400/40 backdrop-blur-md">
            {current.badge}
          </span>

          <span className="hidden md:inline-flex px-3.5 py-1.5 rounded-full bg-black/60 text-emerald-400 border border-white/15 backdrop-blur-md">
            {current.metric}
          </span>
        </div>

        {/* Giant Sovereign Headline */}
        <div className="space-y-4 max-w-5xl">
          <span className="text-xs sm:text-sm md:text-base font-mono font-bold uppercase tracking-widest text-emerald-400 block">
            EX-SERVICEMEN (ESM) FORCE &bull; CERTIFIED MANPOWER &bull; INTEGRATED FACILITIES
          </span>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white tracking-[-0.03em] leading-[1.05] text-balance drop-shadow-2xl">
            Deploy Security. Staff Excellence. Manage Assets. In Hours, Not Weeks.
          </h1>
        </div>

        {/* Subtitle / Value Proposition */}
        <p className="text-sm sm:text-lg md:text-xl text-neutral-200 max-w-3xl leading-relaxed drop-shadow-md">
          Unified Ex-Servicemen (ESM) security supervisor platoons, corporate &amp; industrial workforce staffing, and mechanized hospital-grade housekeeping across Tamil Nadu with guaranteed 2-hour relief SLAs and 100% statutory legal indemnity.
        </p>

        {/* Giant Conversion Action Strip */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          {/* Request Quote Button */}
          <Link
            href="/get-quote"
            className="inline-flex items-center justify-center gap-2 h-14 sm:h-16 px-8 sm:px-10 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-black text-sm sm:text-base shadow-2xl press-scale transition-all group"
          >
            <span>Request Proposal</span>
            <ArrowRight size={18} className="text-white group-hover:translate-x-1 transition-transform" strokeWidth={3} />
          </Link>

          {/* Giant Direct WhatsApp Button */}
          <a
            href="https://wa.me/919080863448?text=Hello%20JSM%20Integrated%20Services,%20I%20would%20like%20to%20deploy%20security%20or%20facility%20teams."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 h-14 sm:h-16 px-8 sm:px-10 rounded-full text-sm sm:text-base font-black text-white bg-emerald-600 hover:bg-emerald-500 shadow-2xl transition-all press-scale"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.97.529 1.831.815 2.796.815 3.182 0 5.768-2.586 5.768-5.768 0-3.18-2.586-5.768-5.768-5.768zm3.385 8.169c-.144.405-.837.774-1.17.824-.312.045-.634.072-1.802-.411-.926-.383-1.636-1.026-2.072-1.606-.437-.58-.456-.788-.456-1.049 0-.262.138-.499.278-.638.14-.14.306-.175.408-.175.102 0 .205.002.295.006.095.005.222-.036.347.265.127.306.435 1.06.474 1.139.039.078.065.17.013.272-.051.102-.077.166-.153.255-.077.089-.161.198-.231.266-.078.077-.16.16-.068.318.092.158.409.675.877 1.092.602.536 1.109.702 1.267.78.158.078.251.066.344-.041.093-.107.4-.466.507-.626.107-.159.214-.133.359-.08.145.053.921.434 1.079.513.158.079.263.118.302.185.039.066.039.382-.105.787z" />
            </svg>
            <span>WhatsApp Us</span>
          </a>

          {/* Direct Phone Call Button */}
          <a
            href="tel:+919080863448"
            className="inline-flex items-center justify-center gap-2 h-14 sm:h-16 px-7 rounded-full text-sm sm:text-base font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all font-mono tabular-nums press-scale"
          >
            <Phone size={18} className="text-neutral-300" strokeWidth={2.5} />
            <span>Call: +91 90808 63448</span>
          </a>
        </div>

        {/* Trust Credentials Bar */}
        <div className="flex flex-wrap items-center gap-y-2 gap-x-6 pt-4 border-t border-white/20 text-xs sm:text-sm text-neutral-300">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-emerald-400 shrink-0" />
            <span className="font-bold text-white">PSARA 2005 Licensed</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
            <span className="font-bold text-white">Guaranteed 2-Hour Relief SLA</span>
          </div>
          <div className="flex items-center gap-2">
            <Award size={18} className="text-emerald-400 shrink-0" />
            <span className="font-bold text-white">Trichy Airport Aviation Operations Proven</span>
          </div>
          <div className="flex items-center gap-2">
            <FileCheck size={18} className="text-emerald-400 shrink-0" />
            <span className="font-bold text-white">100% EPF / ESIC Statutory Indemnity</span>
          </div>
        </div>

      </div>

      {/* BOTTOM SLIDESHOW STAGE SELECTOR (Full Width Across Bottom) */}
      <div className="relative z-20 max-w-[1720px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 w-full pt-8">
        <div className="bg-black/70 backdrop-blur-xl border border-white/20 rounded-3xl p-4 sm:p-5 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left: Slide Information */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-2xl bg-white/10 text-white font-mono font-black text-lg border border-white/15">
              0{activeTab + 1}
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white leading-tight">
                {current.title}
              </h3>
              <p className="text-xs text-neutral-300 line-clamp-1 max-w-xl mt-0.5">
                {current.caption}
              </p>
            </div>
          </div>

          {/* Center: Slide Selector Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {heroVisuals.map((visual, idx) => (
              <button
                key={visual.id}
                onClick={() => setActiveTab(idx)}
                className={`px-4 py-2 rounded-full text-xs font-bold font-mono transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === idx 
                    ? "bg-white text-black shadow-lg scale-105" 
                    : "bg-white/10 text-neutral-300 hover:bg-white/20 border border-white/10"
                }`}
              >
                0{idx + 1}. {visual.title.split(" ")[0]}
              </button>
            ))}
          </div>

          {/* Right: Previous / Next Chevron Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 flex items-center justify-center transition-all press-scale cursor-pointer"
              aria-label="Previous Slide"
            >
              <ChevronLeft size={18} strokeWidth={2.5} />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 flex items-center justify-center transition-all press-scale cursor-pointer"
              aria-label="Next Slide"
            >
              <ChevronRight size={18} strokeWidth={2.5} />
            </button>
          </div>

        </div>
      </div>

    </section>
  );
}
