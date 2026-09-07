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
  Sparkles,
  FileCheck
} from "lucide-react";
import { brandData } from "@/data/brand";

const heroVisuals = [
  {
    id: "airport-platoon",
    title: "Trichy Airport Terminal Platoon",
    badge: "CIVIL AVIATION BENCHMARK",
    metric: "0 Lapses • 24/7 Gate Roster",
    caption: "Proprietor and MD Sweety J with full uniformed security platoon at Tiruchirappalli International Airport concourse.",
    image: "/images/real_jsm_airport_terminal_platoon.jpg",
    tags: ["Airport Terminal Flow", "Passenger Screening", "100% Turnout"],
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
    title: "Official Statutory Credentials",
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
    <section className="relative min-h-[85vh] flex flex-col justify-center px-4 sm:px-6 md:px-12 lg:px-16 pt-32 pb-16 md:py-24 max-w-[1560px] mx-auto bg-white text-[#1d1d1f] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-full z-10 relative items-center mb-8">
        
        {/* Left Column: Master Display Typography */}
        <div className="lg:col-span-6 space-y-6 text-left">
          
          {/* Live Command Telemetry Pill */}
          <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-[11px] font-mono font-medium">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f5f5f7] border border-black/[0.06] text-[#1d1d1f] shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[#1d1d1f] font-bold tracking-wide">24/7 COMMAND ACTIVE</span>
            </div>
            {liveTime && (
              <span className="px-2.5 py-1 rounded-full bg-[#f5f5f7] text-[#86868b] border border-black/[0.06] font-mono">
                {liveTime}
              </span>
            )}
            <span className="hidden sm:inline-block text-zinc-300">•</span>
            <span className="text-[#86868b] font-semibold uppercase tracking-wider">
              DGR-ALIGNED • TAMIL NADU &amp; PAN-INDIA
            </span>
          </div>

          {/* Master Display Headline - Action-Oriented & Crisp */}
          <div className="space-y-3">
            <span className="text-xs font-bold tracking-wider text-[#0071e3] uppercase block font-mono">
              EX-SERVICEMEN (ESM) FORCE • CERTIFIED MANPOWER • FACILITY EXCELLENCE
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#1d1d1f] tracking-[-0.03em] leading-[1.08] text-balance">
              Deploy Security. Staff Excellence. Manage Assets. In Hours, Not Weeks.
            </h1>
          </div>

          {/* Executive Subheadline */}
          <p className="text-sm sm:text-base text-[#515154] max-w-xl font-normal leading-relaxed text-pretty">
            Unified Ex-Servicemen (ESM) security supervisor platoons, corporate &amp; industrial workforce staffing, and mechanized hospital-grade housekeeping across Tamil Nadu with guaranteed 2-hour relief SLAs and 100% statutory legal indemnity.
          </p>

          {/* Conversion Action Strip */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/get-quote"
              className="inline-flex items-center justify-center h-12 px-7 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-xs sm:text-sm shadow-md press-scale transition-all group min-touch-target"
            >
              <span>Request Quote</span>
              <ArrowRight size={14} className="ml-2 text-white group-hover:translate-x-0.5 transition-transform" strokeWidth={2.5} />
            </Link>

            {/* Direct WhatsApp Action */}
            <a
              href="https://wa.me/919080863448?text=Hello%20JSM%20Integrated%20Services,%20I%20would%20like%20to%20inquire%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 h-12 rounded-full text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md transition-all press-scale min-touch-target"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.97.529 1.831.815 2.796.815 3.182 0 5.768-2.586 5.768-5.768 0-3.18-2.586-5.768-5.768-5.768zm3.385 8.169c-.144.405-.837.774-1.17.824-.312.045-.634.072-1.802-.411-.926-.383-1.636-1.026-2.072-1.606-.437-.58-.456-.788-.456-1.049 0-.262.138-.499.278-.638.14-.14.306-.175.408-.175.102 0 .205.002.295.006.095.005.222-.036.347.265.127.306.435 1.06.474 1.139.039.078.065.17.013.272-.051.102-.077.166-.153.255-.077.089-.161.198-.231.266-.078.077-.16.16-.068.318.092.158.409.675.877 1.092.602.536 1.109.702 1.267.78.158.078.251.066.344-.041.093-.107.4-.466.507-.626.107-.159.214-.133.359-.08.145.053.921.434 1.079.513.158.079.263.118.302.185.039.066.039.382-.105.787z" />
              </svg>
              <span>WhatsApp Us</span>
            </a>

            <a
              href="tel:+919080863448"
              className="inline-flex items-center justify-center gap-2 px-5 h-12 rounded-full text-xs font-semibold text-[#1d1d1f] bg-[#f5f5f7] hover:bg-[#e8e8ed] border border-black/[0.06] transition-all font-mono tabular-nums press-scale min-touch-target"
            >
              <Phone size={14} className="text-[#86868b]" strokeWidth={2} />
              <span>Call: +91 90808 63448</span>
            </a>
          </div>

          {/* Executive Trust Badges */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-5 pt-3 border-t border-black/[0.06] text-xs text-[#515154]">
            <div className="flex items-center gap-1.5 font-medium">
              <ShieldCheck size={15} className="text-[#0071e3]" />
              <span>PSARA 2005 Licensed</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 size={15} className="text-emerald-600" />
              <span>Guaranteed 2-Hour Relief SLA</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <FileCheck size={15} className="text-[#1d1d1f]" />
              <span>100% Statutory EPF / ESIC</span>
            </div>
          </div>
        </div>

        {/* Right Column: Full-Bleed Rectangular Visual Slideshow Stage */}
        <div className="lg:col-span-6">
          <div 
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="relative w-full aspect-[16/10] sm:aspect-[16/10] rounded-[32px] overflow-hidden shadow-2xl border border-black/[0.08] bg-black group"
          >
            {/* Top Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 z-30 overflow-hidden">
              <motion.div 
                key={activeTab}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: isPaused ? 0 : 6, ease: "linear" }}
                className="h-full bg-[#0071e3]"
              />
            </div>

            {/* Slideshow Arrow Controls */}
            <div className="absolute inset-y-0 inset-x-3 z-30 flex items-center justify-between pointer-events-none">
              <button
                onClick={prevSlide}
                className="pointer-events-auto w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md text-white border border-white/20 flex items-center justify-center transition-all press-scale shadow-lg opacity-80 hover:opacity-100"
                aria-label="Previous slide"
              >
                <ChevronLeft size={18} strokeWidth={2.5} />
              </button>
              <button
                onClick={nextSlide}
                className="pointer-events-auto w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md text-white border border-white/20 flex items-center justify-center transition-all press-scale shadow-lg opacity-80 hover:opacity-100"
                aria-label="Next slide"
              >
                <ChevronRight size={18} strokeWidth={2.5} />
              </button>
            </div>

            {/* Visual Slides with Fade Transition */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={current.image}
                  alt={current.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Floating Badges on Top */}
            <div className="absolute top-5 left-5 z-20 flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#0071e3]/90 text-white text-[11px] font-mono font-bold tracking-wider uppercase border border-blue-400/30 backdrop-blur-md">
                {current.badge}
              </span>
              <span className="px-3 py-1 rounded-full bg-black/60 text-emerald-400 text-[11px] font-mono font-bold border border-white/10 backdrop-blur-md">
                {current.metric}
              </span>
            </div>

            {/* Bottom Caption & Tags */}
            <div className="absolute bottom-5 left-5 right-5 z-20 text-white space-y-2">
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                {current.title}
              </h3>
              <p className="text-xs text-white/80 line-clamp-2 max-w-xl">
                {current.caption}
              </p>
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {current.tags.map((t) => (
                  <span key={t} className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/15 text-white/90 border border-white/10">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
