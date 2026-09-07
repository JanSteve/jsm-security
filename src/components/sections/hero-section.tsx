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

  const current = heroVisuals[activeTab];

  return (
    <section className="relative min-h-[88vh] flex flex-col justify-center px-4 sm:px-6 md:px-12 lg:px-20 pt-28 pb-16 md:py-24 max-w-[1440px] mx-auto bg-white text-[#1d1d1f] overflow-hidden selection:bg-[#0071e3]/15 selection:text-black">
      
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
              TAMIL NADU &amp; PAN-INDIA
            </span>
          </div>

          {/* Master Display Headline - Apple Style */}
          <div className="space-y-2">
            <span className="text-xs font-semibold tracking-wider text-[#86868b] uppercase block font-mono">
              INTEGRATED SECURITY &amp; WORKFORCE GOVERNANCE
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-[#1d1d1f] tracking-[-0.03em] leading-[1.08] text-balance">
              Disciplined security &amp; facility operations for modern enterprise.
            </h1>
          </div>

          {/* Executive Subheadline */}
          <p className="text-sm sm:text-base text-[#515154] max-w-xl font-normal leading-relaxed text-pretty">
            At JSM Integrated Services, we deliver disciplined <strong>Private Guarding</strong>, <strong>Specialized Housekeeping</strong>, and <strong>Contractual Manpower</strong> across Tamil Nadu with guaranteed 2-hour relief SLAs and zero statutory liability.
          </p>

          {/* Conversion Action Strip */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/get-quote"
              className="inline-flex items-center justify-center h-12 px-7 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-xs shadow-xs press-scale transition-all group min-touch-target"
            >
              <span>Request a quote</span>
              <ArrowRight size={14} className="ml-2 text-white group-hover:translate-x-0.5 transition-transform" strokeWidth={2.5} />
            </Link>

            <a
              href={`tel:${brandData.contact.phone}`}
              className="inline-flex items-center justify-center gap-2 px-5 h-12 rounded-full text-xs font-medium text-[#1d1d1f] bg-[#f5f5f7] hover:bg-[#e8e8ed] border border-black/[0.06] transition-all font-mono tabular-nums press-scale min-touch-target"
            >
              <Phone size={14} className="text-[#86868b]" strokeWidth={2} />
              <span>Emergency: {brandData.contact.phoneDisplay}</span>
            </a>

            <a
              href={`https://wa.me/${brandData.contact.whatsapp}?text=Hello%20JSM%20Integrated%20Services,%20I%20would%20like%20to%20inquire%20about%20your%20services.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 h-12 rounded-full text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/60 transition-all press-scale min-touch-target"
            >
              <MessageCircle size={15} strokeWidth={2} />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Executive Trust Badges - Short, Sweet & Simple */}
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

        {/* Right Column: Dynamic Authentic Visual Stage */}
        <div className="lg:col-span-6">
          <div 
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="relative w-full h-[400px] sm:h-[460px] md:h-[500px] rounded-3xl overflow-hidden shadow-xl border border-black/[0.08] bg-[#f5f5f7] group"
          >
            
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 1.02 }}
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
                
                {/* Clean Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                {/* Top Floating Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-black/[0.08] text-[#1d1d1f] text-[10px] font-mono font-bold uppercase shadow-xs">
                    {current.badge}
                  </span>
                  <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-mono font-semibold uppercase shadow-xs">
                    {current.metric}
                  </div>
                </div>

                {/* Bottom Information Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xl rounded-2xl p-4 sm:p-5 border border-black/[0.08] shadow-lg space-y-2 z-10">
                  <div className="flex items-center justify-between border-b border-black/[0.06] pb-2">
                    <div>
                      <span className="text-[9px] font-mono font-bold text-[#86868b] uppercase tracking-wider block">
                        AUTHENTIC FIELD ARCHIVE
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-[#1d1d1f] tracking-tight">
                        {current.title}
                      </h3>
                    </div>
                    <Link
                      href={current.href}
                      className="px-3.5 py-1.5 rounded-full bg-[#1d1d1f] text-white text-[11px] font-semibold hover:bg-black transition-colors flex items-center gap-1 shadow-xs"
                    >
                      <span>Explore</span>
                      <ChevronRight size={12} />
                    </Link>
                  </div>

                  <p className="text-[11px] sm:text-xs text-[#515154] font-normal line-clamp-2 leading-relaxed">
                    {current.caption}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {current.tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-md bg-[#f5f5f7] border border-black/[0.06] text-[10px] font-mono font-medium text-[#1d1d1f]">
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
              className={`p-3 sm:p-3.5 rounded-2xl text-xs font-semibold transition-all text-left flex items-center justify-between border cursor-pointer ${
                active
                  ? "bg-[#1d1d1f] text-white border-[#1d1d1f] shadow-xs"
                  : "bg-[#f5f5f7] text-[#515154] border-black/[0.04] hover:bg-[#e8e8ed] hover:text-[#1d1d1f]"
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className={`w-2 h-2 rounded-full shrink-0 transition-colors ${active ? "bg-emerald-400" : "bg-[#86868b]"}`} />
                <span className="truncate">{vis.title.split(" ")[0]} {vis.title.split(" ")[1]}</span>
              </div>
              <ChevronRight size={13} className={active ? "text-white shrink-0" : "text-[#86868b] shrink-0"} />
            </button>
          );
        })}
      </div>
    </section>
  );
}
