"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  MessageCircle, 
  Phone, 
  ShieldCheck, 
  Plane, 
  CheckCircle2, 
  Award,
  ChevronRight,
  Sparkles,
  QrCode,
  FileCheck
} from "lucide-react";
import { brandData } from "@/data/brand";
import { BorderBeam } from "@/components/ui/border-beam";
import { ShimmerButton } from "@/components/ui/shimmer-button";

const heroVisuals = [
  {
    id: "airport-platoon",
    title: "Trichy Airport Terminal Platoon",
    badge: "CIVIL AVIATION BENCHMARK",
    metric: "0 Lapses • 24/7 Gate Roster",
    caption: "Managing Director Sweety J seated with full uniformed security platoon at Trichy International Airport concourse.",
    image: "/images/real_jsm_airport_terminal_platoon.jpg",
    tags: ["Airport Terminal Flow", "Passenger Screening", "100% Turnout"],
    href: "/about"
  },
  {
    id: "chariot-platoon",
    title: "Heritage Landmark Honor Guard",
    badge: "PSARA 2005 COMPLIANT",
    metric: "100% Police & Aadhaar Verified",
    caption: "Ceremonial muster and guard bearing under the monumental temple chariot landmark with MD Sweety J.",
    image: "/images/real_jsm_chariot_platoon.jpg",
    tags: ["5-Day Induction", "2:00 AM Audits", "Ex-Servicemen & Pvt"],
    href: "/services/private-security"
  },
  {
    id: "printed-card",
    title: "Official Corporate Credentials",
    badge: "AUTHENTIC PHYSICAL PROOF",
    metric: "300 DPI Official Print",
    caption: "Official printed business card with metallic silver crest, Sweety J (Proprietor & MD), and Major AR Devadoss.",
    image: "/images/real_jsm_printed_card.jpg",
    tags: ["Kottapattu HQ", "State Licensed", "Full Contact Details"],
    href: "/about"
  },
  {
    id: "fabrication-manpower",
    title: "Fabrication Industry Workforce",
    badge: "ACTIVE INDUSTRIAL STAFFING",
    metric: "48-72h Rapid Deployment",
    caption: "Block & Pipe fabrication technicians deployed across manufacturing corridors with complete EPF/ESI indemnity.",
    image: "/images/real_jsm_fabrication_hiring.jpg",
    tags: ["Block Fabrication", "Pipe Fitting", "100% Statutory EPF/ESI"],
    href: "/careers"
  }
];

export function HeroSection() {
  const [activeTab, setActiveTab] = useState(0);
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

  const current = heroVisuals[activeTab];

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center px-4 sm:px-6 md:px-12 lg:px-20 pt-28 pb-16 md:py-24 max-w-[1440px] mx-auto bg-[#07090E] text-white overflow-hidden selection:bg-[#C5A880] selection:text-black">
      
      {/* Aceternity Style Background Illumination & Micro-Grid */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Radial ambient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-b from-[#C5A880]/15 via-purple-500/5 to-transparent blur-[120px] rounded-full" />
        {/* Architectural subtle grid lines */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px] opacity-70" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-full z-10 relative items-center mb-8">
        
        {/* Left Column: Master Display Typography */}
        <div className="lg:col-span-6 space-y-6 text-left">
          
          {/* Live Command Telemetry Pill */}
          <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-[11px] font-mono font-bold">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 shadow-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white font-extrabold tracking-wide">24/7 COMMAND ACTIVE</span>
            </div>
            {liveTime && (
              <span className="px-2.5 py-1 rounded-full bg-white/5 text-zinc-400 border border-white/10 font-mono">
                {liveTime}
              </span>
            )}
            <span className="hidden sm:inline-block text-zinc-600">•</span>
            <span className="text-[#C5A880] font-bold uppercase tracking-wider">
              TAMIL NADU &amp; PAN-INDIA
            </span>
          </div>

          {/* Master Display Headline - Framer SecurityForce DNA */}
          <div className="space-y-2">
            <span className="text-xs sm:text-sm font-mono font-black tracking-[0.2em] text-[#C5A880] uppercase block">
              YOUR TRUSTED PARTNER IN INTEGRATED SECURITY
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-[-0.03em] leading-[1.08] text-balance">
              Disciplined security &amp; facility operations for modern enterprise.
            </h1>
          </div>

          {/* Ultra-Concise Executive Subheadline */}
          <p className="text-sm sm:text-base text-zinc-300 max-w-xl font-normal leading-relaxed text-pretty">
            At JSM Integrated Services, we deliver disciplined <strong>Private Guarding</strong>, <strong>Specialized Housekeeping</strong>, and <strong>Contractual Manpower</strong> across Tamil Nadu with guaranteed 2-hour relief SLAs and zero statutory liability.
          </p>

          {/* Conversion Action Strip */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link href="/get-quote" className="press-scale">
              <ShimmerButton className="h-12 px-7 bg-[#C5A880] text-black font-black hover:bg-[#b59870] transition-colors shadow-lg">
                <span>Request a quote</span>
                <ArrowRight size={14} className="ml-2 text-black" strokeWidth={2.5} />
              </ShimmerButton>
            </Link>

            <a
              href={`tel:${brandData.contact.phone}`}
              className="inline-flex items-center justify-center gap-2 px-5 h-12 rounded-full text-xs font-bold text-white bg-white/10 hover:bg-white/15 border border-white/15 transition-all shadow-sm active:scale-95 font-mono tabular-nums press-scale min-touch-target"
            >
              <Phone size={14} className="text-[#C5A880]" strokeWidth={2} />
              <span>Emergency: {brandData.contact.phoneDisplay}</span>
            </a>

            <a
              href={`https://wa.me/${brandData.contact.whatsapp}?text=Hello%20JSM%20Integrated%20Services,%20I%20would%20like%20to%20inquire%20about%20your%20services.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 h-12 rounded-full text-xs font-bold text-emerald-400 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/40 transition-all shadow-xs active:scale-95 press-scale min-touch-target"
            >
              <MessageCircle size={15} strokeWidth={2} />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Framer 4-Pillar SecurityForce Confidence Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 border-t border-white/10 text-xs">
            <div className="flex items-center gap-2 bg-white/5 p-2 rounded-xl border border-white/5">
              <ShieldCheck size={16} className="text-[#C5A880] shrink-0" />
              <span className="font-semibold text-zinc-300 text-[11px] leading-tight">Ensuring safety &amp; security</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 p-2 rounded-xl border border-white/5">
              <FileCheck size={16} className="text-blue-400 shrink-0" />
              <span className="font-semibold text-zinc-300 text-[11px] leading-tight">Statutory risk reduction</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 p-2 rounded-xl border border-white/5">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
              <span className="font-semibold text-zinc-300 text-[11px] leading-tight">Emergency 24/7 response</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 p-2 rounded-xl border border-white/5">
              <Award size={16} className="text-[#C5A880] shrink-0" />
              <span className="font-semibold text-zinc-300 text-[11px] leading-tight">Complete peace of mind</span>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Authentic Visual Stage with BorderBeam */}
        <div className="lg:col-span-6">
          <div className="relative w-full h-[400px] sm:h-[460px] md:h-[500px] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-zinc-800 group bg-zinc-950">
            <BorderBeam size={240} duration={12} colorFrom="#C5A880" colorTo="transparent" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="relative w-full h-full"
              >
                <Image
                  src={current.image}
                  alt={current.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                
                {/* Gradient Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/20" />

                {/* Top Floating Badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
                  <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[#C5A880] text-[10px] font-mono font-bold uppercase shadow-lg">
                    {current.badge}
                  </span>
                  <div className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white text-[10px] font-mono font-bold uppercase shadow-lg">
                    {current.metric}
                  </div>
                </div>

                {/* Bottom Information Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-zinc-900/90 backdrop-blur-xl rounded-2xl p-4 sm:p-5 border border-zinc-700/80 shadow-2xl space-y-2.5 z-10">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                    <div>
                      <span className="text-[9px] font-mono font-black text-[#C5A880] uppercase tracking-wider block">
                        AUTHENTIC FIELD ARCHIVE
                      </span>
                      <h3 className="text-sm sm:text-base font-black text-white tracking-tight">
                        {current.title}
                      </h3>
                    </div>
                    <Link
                      href={current.href}
                      className="px-3.5 py-1.5 rounded-full bg-white text-black text-[11px] font-extrabold uppercase hover:bg-[#C5A880] transition-colors flex items-center gap-1 shadow-md"
                    >
                      <span>Explore</span>
                      <ChevronRight size={12} />
                    </Link>
                  </div>

                  <p className="text-[11px] sm:text-xs text-zinc-300 font-normal line-clamp-2 leading-relaxed">
                    {current.caption}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {current.tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-md bg-zinc-800 border border-zinc-700 text-[10px] font-mono font-bold text-zinc-300">
                        ✓ {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Interactive Tabs Selector Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-4xl mx-auto w-full pt-3 z-10 relative">
        {heroVisuals.map((vis, idx) => {
          const active = activeTab === idx;
          return (
            <button
              key={vis.id}
              type="button"
              onClick={() => setActiveTab(idx)}
              className={`p-3 sm:p-3.5 rounded-2xl text-xs font-bold transition-all text-left flex items-center justify-between border cursor-pointer ${
                active
                  ? "bg-[#C5A880] text-black border-[#C5A880] shadow-[0_0_25px_rgba(197,168,128,0.4)] scale-[1.02]"
                  : "bg-zinc-900/80 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white hover:bg-zinc-800/80"
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className={`w-2 h-2 rounded-full shrink-0 transition-colors ${active ? "bg-black" : "bg-[#C5A880]"}`} />
                <span className="font-extrabold truncate">{vis.title.split(" ")[0]} {vis.title.split(" ")[1]}</span>
              </div>
              <ChevronRight size={13} className={active ? "text-black shrink-0" : "text-zinc-600 shrink-0"} />
            </button>
          );
        })}
      </div>
    </section>
  );
}
