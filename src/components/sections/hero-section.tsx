"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { 
  ArrowRight, 
  MessageCircle, 
  ShieldCheck, 
  Sparkles, 
  Users, 
  Plane, 
  CheckCircle2, 
  Clock, 
  Award,
  ChevronRight,
  Building2,
  ShieldAlert
} from "lucide-react";
import Link from "next/link";
import { brandData } from "@/data/brand";

const showcaseServices = [
  {
    id: "security",
    name: "Private Security",
    badge: "PSARA 2005 COMPLIANT",
    headline: "Zero-Compromise Guarding & Access Control",
    stat: "100%",
    statLabel: "Police Verified & Badged",
    desc: "5-day trained security guards, strict gate registers, and 2:00 AM unannounced supervisor night audits.",
    image: "/images/protective_guard.jpg",
    tags: ["Aadhaar Verified", "2:00 AM Audits", "2-Hr Relief SLA"],
    color: "from-amber-500/20 via-transparent to-black/80",
    href: "/services/private-security"
  },
  {
    id: "housekeeping",
    name: "Commercial Housekeeping",
    badge: "5-STEP HYGIENE PROTOCOL",
    headline: "Immaculate Corporate & Facility Upkeep",
    stat: "5-Step",
    statLabel: "Closed-Loop Sanitization",
    desc: "Daily protocol: Clean → Inspect → Report → Correct → Verify for luxury corporate lobbies and workspaces.",
    image: "/images/housekeeping_hygiene.jpg",
    tags: ["Eco Consumables", "Restroom Hourly Cycles", "Deep Scrubbing"],
    color: "from-blue-500/20 via-transparent to-black/80",
    href: "/services/housekeeping"
  },
  {
    id: "manpower",
    name: "Contractual Manpower",
    badge: "ORIGINATING AS JSMMANPOWER",
    headline: "Vetted Skilled & Industrial Workforce",
    stat: "48-72h",
    statLabel: "Rapid Deployment Window",
    desc: "Reliable helper, logistics, machine assistant, and warehouse workforce deployed across factories and hubs.",
    image: "/images/industrial_workforce.jpg",
    tags: ["100% EPF/ESI", "Minimum Wages", "Attendance App"],
    color: "from-emerald-500/20 via-transparent to-black/80",
    href: "/services/manpower"
  },
  {
    id: "airport",
    name: "Airport Operations",
    badge: "LANDMARK INAUGURAL 2024",
    headline: "Civil Aviation Terminal Support",
    stat: "0",
    statLabel: "Breaches / Lapses",
    desc: "Executed passenger screening coordination, crowd management, and terminal flow at Trichy International Airport.",
    image: "/images/airport_operations.jpg",
    tags: ["Aviation Crowd Control", "High-Stakes Security", "Stakeholder Commended"],
    color: "from-purple-500/20 via-transparent to-black/80",
    href: "/case-studies"
  }
];

export function HeroSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [liveTime, setLiveTime] = useState<string>("");
  const cleanWA = brandData.contact.whatsapp.replace(/[^0-9]/g, '');

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

  const current = showcaseServices[activeTab];

  return (
    <section className="relative min-h-[94vh] flex flex-col justify-center px-4 sm:px-6 md:px-12 lg:px-20 pt-28 pb-16 md:py-28 max-w-[1440px] mx-auto bg-[#fbf9f4] overflow-hidden">
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="hidden lg:block absolute left-1/3 top-0 bottom-0 w-px bg-black/[0.03]" />
        <div className="hidden lg:block absolute left-2/3 top-0 bottom-0 w-px bg-black/[0.03]" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-black/[0.03]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-full z-10 relative items-center mb-8">
        {/* Left Column: Master Display Typography */}
        <div className="lg:col-span-6 space-y-6 text-left">
          {/* Live Operational Status Bar */}
          <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-[11px] font-mono font-bold text-zinc-700">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-zinc-200 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-zinc-900 font-extrabold">24/7 COMMAND DESK</span>
            </div>
            {liveTime && (
              <span className="px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-600 border border-zinc-200/60">
                {liveTime}
              </span>
            )}
            <span className="hidden sm:inline-block text-zinc-400">•</span>
            <span className="text-[#C5A880] font-black uppercase tracking-wider">
              TAMIL NADU &amp; PAN-INDIA
            </span>
          </div>

          {/* Master Headline */}
          <div className="space-y-1">
            <p className="text-xs sm:text-sm font-extrabold tracking-[0.22em] text-[#C5A880] uppercase font-mono">
              JSM INTEGRATED SERVICES
            </p>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-black tracking-[-0.04em] leading-[1.02] uppercase">
              ONE PARTNER.<br />
              <span className="bg-gradient-to-r from-zinc-900 via-[#C5A880] to-zinc-900 bg-clip-text text-transparent">
                EVERY SOLUTION.
              </span>
            </h1>
          </div>

          {/* High-Impact 1-Sentence Subtext */}
          <p className="text-sm sm:text-base text-zinc-600 max-w-lg font-normal leading-relaxed">
            Eliminate multi-vendor confusion. We unify disciplined <strong>Private Security</strong>, <strong>Commercial Housekeeping</strong>, and <strong>Contractual Manpower</strong> under one single accountable executive.
          </p>

          {/* Conversion Button Group */}
          <div className="flex flex-wrap gap-3 pt-1">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-black hover:bg-zinc-800 text-white text-xs font-black tracking-widest px-8 h-12 rounded-full border-b-2 border-[#C5A880] shadow-xl hover:shadow-2xl active:scale-95 transition-all uppercase group"
            >
              <span>REQUEST A QUOTE</span>
              <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform text-[#C5A880]" />
            </Link>

            <a
              href={`https://wa.me/${cleanWA}?text=Hi%20JSM%20Integrated%20Services,%20I%20would%20like%20to%20discuss%20our%20facility%20requirements.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 h-12 rounded-full text-xs font-bold text-emerald-950 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition-all shadow-xs active:scale-95"
            >
              <MessageCircle size={15} className="text-emerald-600" />
              <span>WhatsApp Direct</span>
            </a>
          </div>

          {/* Key SLA Indicators */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 pt-2 text-xs font-bold text-zinc-700">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-[#C5A880]" /> PSARA Compliant
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-[#C5A880]" /> 2-Hour Replacement SLA
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-[#C5A880]" /> 100% EPF / ESI Legal
            </span>
          </div>
        </div>

        {/* Right Column: Dynamic Interactive Service Stage */}
        <div className="lg:col-span-6">
          <div className="relative w-full h-[400px] sm:h-[460px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-zinc-300/80 group bg-black">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="relative w-full h-full"
              >
                <Image
                  src={current.image}
                  alt={current.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[#C5A880] text-[10px] font-mono font-bold uppercase shadow-lg">
                    {current.badge}
                  </span>
                  <div className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-[10px] font-mono font-bold uppercase shadow-lg">
                    {current.stat}: {current.statLabel}
                  </div>
                </div>

                {/* Bottom Floating Interactive Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xl rounded-2xl p-4 sm:p-5 border border-white/40 shadow-2xl space-y-3">
                  <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
                    <div>
                      <span className="text-[9px] font-mono font-black text-[#C5A880] uppercase tracking-wider">
                        {current.name}
                      </span>
                      <h3 className="text-sm sm:text-base font-black text-black tracking-tight">
                        {current.headline}
                      </h3>
                    </div>
                    <Link
                      href={current.href}
                      className="px-3.5 py-1.5 rounded-full bg-black text-white text-[11px] font-extrabold uppercase hover:bg-zinc-800 transition-colors flex items-center gap-1 shadow-xs"
                    >
                      <span>Explore</span>
                      <ChevronRight size={12} className="text-[#C5A880]" />
                    </Link>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {current.tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-md bg-[#fbf9f4] border border-zinc-200 text-[10px] font-bold text-zinc-700">
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
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-4xl mx-auto w-full pt-2">
        {showcaseServices.map((srv, idx) => {
          const active = activeTab === idx;
          return (
            <button
              key={srv.id}
              type="button"
              onClick={() => setActiveTab(idx)}
              className={`p-3 rounded-2xl text-xs font-bold transition-all text-left flex items-center justify-between border ${
                active
                  ? "bg-black text-white border-black shadow-lg scale-[1.02]"
                  : "bg-white/80 text-zinc-700 border-zinc-200 hover:border-zinc-400 hover:bg-white"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${active ? "bg-[#C5A880]" : "bg-zinc-300"}`} />
                <span className="font-extrabold truncate">{srv.name}</span>
              </div>
              <ChevronRight size={13} className={active ? "text-[#C5A880]" : "text-zinc-400"} />
            </button>
          );
        })}
      </div>
    </section>
  );
}
