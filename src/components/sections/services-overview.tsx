"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  ArrowLeft, 
  Shield, 
  Sparkles, 
  Users, 
  FileText, 
  Monitor, 
  UserCheck, 
  ChevronRight, 
  ChevronLeft,
  Pause,
  Play,
  CheckCircle2,
  Phone,
  MessageCircle
} from "lucide-react";
import { brandData } from "@/data/brand";

const sixCoreVerticals = [
  {
    code: "JSM-01",
    slug: "private-security",
    title: "Security & Protection Services",
    shortTitle: "Security & Guarding",
    tagline: "PSARA 2005 COMPLIANT • 2:00 AM SUPERVISOR AUDITS",
    badge: "SAC 998525 • CORE",
    workforce: "Ex-Servicemen (ESM) & Pvt Supervisors & Guards (Male & Female)",
    image: "/images/real_jsm_welcome_trichy_salute.jpg",
    highlight: "Zero-compromise physical guarding, strict gate access registers, 2:00 AM unannounced supervisor van spot-audits, and 2-Hour Relief SLA.",
    features: [
      "100% Police Verified & PSARA Licensed",
      "Ex-Servicemen & Private Marshals (M/F)",
      "2:00 AM Night Van Checkpoints",
      "Guaranteed 2-Hour Replacement SLA"
    ],
    icon: Shield,
    ctaText: "Explore Security SOP",
    href: "/services/private-security"
  },
  {
    code: "JSM-02",
    slug: "manpower",
    title: "Manpower & Workforce Solutions",
    shortTitle: "Manpower & Staffing",
    tagline: "48–72H RAPID DEPLOYMENT • 100% EPF/ESIC INDEMNITY",
    badge: "SAC 998513 • CORE",
    workforce: "Ex-Servicemen (ESM) & Pvt Supervisors & Workforce (Male & Female)",
    image: "/images/real_jsm_shift_muster_day.jpg",
    highlight: "Pre-trained industrial assembly operators, warehouse logistics staffing, and skilled trade workforce with complete statutory legal indemnity.",
    features: [
      "Rapid 48–72 Hour Mobilization",
      "100% EPF/ESIC Monthly ECR Proofs",
      "Sriperumbudur & Hosur Corridor Ready",
      "Biometric Attendance App Integration"
    ],
    icon: Users,
    ctaText: "Explore Manpower Solutions",
    href: "/services/manpower"
  },
  {
    code: "JSM-03",
    slug: "housekeeping",
    title: "Facility Management & Housekeeping",
    shortTitle: "Facility Management",
    tagline: "5-STEP CLOSED-LOOP HYGIENE • RIDE-ON AUTO SCRUBBERS",
    badge: "SAC 998533 • CORE",
    workforce: "Private (Pvt) Male & Female Facility Marshals",
    image: "/images/real_jsm_terminal_entry_salute.jpg",
    highlight: "Industrial facility upkeep, 5-step closed-loop sanitization (Clean → Inspect → Report → Correct → Verify), and eco consumables.",
    features: [
      "Hourly Signed Washroom Logs",
      "Hospital-Grade Eco Consumables",
      "Cross-Contamination Color Coding",
      "Terminal Access & Hygiene Standards"
    ],
    icon: Sparkles,
    ctaText: "Explore Facility Standards",
    href: "/services/housekeeping"
  },
  {
    code: "JSM-04",
    slug: "tender-procurement-supply",
    title: "Tender, Procurement, Seller & Business Support",
    shortTitle: "Tender & GeM Support",
    tagline: "GeM SELLER BIDDING • TAMIL NADU E-PROCUREMENT & PSU SUPPLY",
    badge: "GeM & PSU • CORE",
    workforce: "Tender Management & Commercial Contracts Team",
    image: "/images/real_jsm_airport_drill.jpg",
    highlight: "Turnkey government & corporate tender bidding, GeM Seller catalogue management, PSU supply delivery, and vendor administration.",
    features: [
      "GeM Seller Listing & Bidding (JSM-04.5)",
      "Govt & PSU Supply Fulfilment (JSM-04.6)",
      "Technical Bid & EMD Dossier Prep",
      "Tamil Nadu e-Procurement Portal"
    ],
    icon: FileText,
    ctaText: "Explore Tender Services",
    href: "/services/tender-procurement-supply"
  },
  {
    code: "JSM-05",
    slug: "scanning-digitalization-it",
    title: "Scanning, Digitalization & IT Services",
    shortTitle: "Scanning, OCR & IT",
    tagline: "UDYAM NIC 62099 • BULK DIGITIZATION & OCR CONVERSION",
    badge: "NIC 62099 • CORE",
    workforce: "Digital Operations & Technical Specialists",
    image: "/images/real_jsm_guard_squad_night.jpg",
    highlight: "High-speed document scanning, optical character recognition (OCR), metadata indexing, electronic archiving, and enterprise IT network support.",
    features: [
      "Bulk Document Digitization (JSM-05.2)",
      "Searchable PDF & OCR Indexing (JSM-05.3)",
      "Secure Digital Archiving (JSM-05.6)",
      "On-Site IT & Network Support (JSM-05.12)"
    ],
    icon: Monitor,
    ctaText: "Explore Digitization SOP",
    href: "/services/scanning-digitalization-it"
  },
  {
    code: "JSM-06",
    slug: "csc-digital-citizen-services",
    title: "CSC & Digital Citizen Services",
    shortTitle: "CSC Citizen Services",
    tagline: "E-GOVERNANCE FACILITATION • ONLINE APPLICATIONS & PORTALS",
    badge: "e-Governance • CORE",
    workforce: "Authorized CSC & Digital Facilitation Officers",
    image: "/images/real_jsm_welcome_trichy_salute.jpg",
    highlight: "Assisting citizens and businesses with online government portal applications, digital form filling, document scanning, printing, and bill payments.",
    features: [
      "Online Govt Application Assistance (JSM-06.1)",
      "Digital Form Filling & Status Tracking",
      "Document Scanning & Photo Upload",
      "High-Speed Printing & Bill Payments"
    ],
    icon: UserCheck,
    ctaText: "Explore Citizen Services",
    href: "/services/csc-digital-citizen-services"
  }
];

export function ServicesOverview() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const SLIDE_DURATION = 6500; // 6.5s per slide

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % sixCoreVerticals.length);
    setProgress(0);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + sixCoreVerticals.length) % sixCoreVerticals.length);
    setProgress(0);
  };

  const selectSlide = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  // Autoplay loop with smooth progress increment
  useEffect(() => {
    if (!isPlaying) return;

    const intervalTime = 50; // update progress every 50ms
    const step = (intervalTime / SLIDE_DURATION) * 100;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isPlaying, currentIndex]);

  const current = sixCoreVerticals[currentIndex];
  const Icon = current.icon;

  return (
    <section 
      className="py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto bg-white border-t border-zinc-200/80"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Header with Navigation Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-zinc-200/80 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/20 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#C5A880] animate-pulse" />
            <span className="text-[10px] font-mono font-black tracking-widest text-[#C5A880] uppercase">
              MASTER BUSINESS ARCHITECTURE
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-black tracking-tight uppercase mt-1">
            Six Core Master Verticals.
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 font-medium mt-1">
            Explore our integrated corporate services, verified workforce models, and statutory compliance standards.
          </p>
        </div>

        {/* Slideshow Controls (Slide counter, play/pause, prev/next arrows) */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 border border-zinc-200 font-mono text-xs font-bold text-zinc-800">
            <span className="text-black font-black">0{currentIndex + 1}</span>
            <span className="text-zinc-400">/</span>
            <span className="text-zinc-500">0{sixCoreVerticals.length}</span>
          </div>

          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? "Pause Slideshow" : "Play Slideshow"}
            className="w-10 h-10 rounded-full bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 flex items-center justify-center text-zinc-700 transition-colors"
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
          </button>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous Vertical"
              className="w-10 h-10 rounded-full bg-black hover:bg-zinc-800 text-white flex items-center justify-center transition-all shadow-sm hover:scale-105 active:scale-95"
            >
              <ChevronLeft size={18} className="text-[#C5A880]" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next Vertical"
              className="w-10 h-10 rounded-full bg-black hover:bg-zinc-800 text-white flex items-center justify-center transition-all shadow-sm hover:scale-105 active:scale-95"
            >
              <ChevronRight size={18} className="text-[#C5A880]" />
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-zinc-100 h-1 rounded-full overflow-hidden mb-8">
        <div 
          className="bg-gradient-to-r from-black via-[#C5A880] to-black h-full transition-all duration-75 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Main Slideshow Showcase Stage */}
      <div className="relative bg-[#fbf9f4] border border-zinc-200/90 rounded-3xl overflow-hidden shadow-xl mb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.code}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="grid grid-cols-1 lg:grid-cols-12 items-stretch"
          >
            {/* Left Column: Visual Photography Stage (5 cols) */}
            <div className="lg:col-span-6 relative min-h-[380px] sm:min-h-[440px] lg:min-h-[540px] overflow-hidden">
              <Image
                src={current.image}
                alt={current.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Floating Top Badges */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <span className="px-3.5 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-white/20 text-[#C5A880] font-mono font-black text-xs uppercase shadow-lg">
                  {current.code}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#C5A880] text-black font-mono font-black text-[10px] uppercase shadow-lg">
                  {current.badge}
                </span>
              </div>

              {/* Bottom Image Overlay Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-white/40 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-black text-[#C5A880] flex items-center justify-center shrink-0">
                    <Icon size={18} />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono font-bold text-[#C5A880] uppercase tracking-wider block">
                      VERIFIED DEPLOYMENT
                    </span>
                    <h4 className="text-sm font-black text-black leading-tight">
                      {current.shortTitle}
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Detailed Capability Dossier (6 cols) */}
            <div className="lg:col-span-6 p-6 sm:p-8 lg:p-12 flex flex-col justify-between space-y-6 bg-[#fbf9f4]">
              <div className="space-y-4">
                {/* Tagline */}
                <span className="text-[10px] font-mono font-extrabold tracking-wider text-[#C5A880] uppercase block">
                  {current.tagline}
                </span>

                {/* Vertical Title */}
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-black tracking-tight uppercase leading-tight">
                  {current.title}
                </h3>

                {/* Workforce Composition Pill */}
                <div className="p-3.5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs">
                  <span className="text-[9px] font-mono font-black text-[#C5A880] uppercase tracking-wider block">
                    WORKFORCE MODEL &amp; CLASSIFICATION
                  </span>
                  <p className="text-xs sm:text-sm font-extrabold text-zinc-900 mt-0.5">
                    {current.workforce}
                  </p>
                </div>

                {/* Summary Highlight */}
                <p className="text-xs sm:text-sm text-zinc-600 font-medium leading-relaxed">
                  {current.highlight}
                </p>

                {/* Key Capability Checkmarks */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {current.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2 p-2 rounded-xl bg-white/70 border border-zinc-200 text-xs font-bold text-zinc-800">
                      <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-zinc-200 flex flex-wrap items-center gap-3">
                <Link
                  href={current.href}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-black hover:bg-zinc-800 text-white text-xs font-black uppercase tracking-wider shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all group cursor-pointer"
                >
                  <span>{current.ctaText}</span>
                  <ArrowRight size={14} className="text-[#C5A880] group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href={`tel:${brandData.contact.phone}`}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-full bg-white hover:bg-zinc-100 border border-zinc-300 text-black text-xs font-bold font-mono transition-colors"
                >
                  <Phone size={13} className="text-[#C5A880]" />
                  <span>Call: {brandData.contact.phoneDisplay}</span>
                </a>

                <a
                  href={`https://wa.me/${brandData.contact.whatsapp}?text=Hello%20JSM,%20I%20would%20like%20to%20inquire%20about%20${encodeURIComponent(current.title)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold transition-colors"
                >
                  <MessageCircle size={13} className="text-emerald-600" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 6 Quick Jump Tabs Strip (1-Click Selector for all 6 Verticals) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {sixCoreVerticals.map((srv, idx) => {
          const active = currentIndex === idx;
          return (
            <button
              key={srv.code}
              type="button"
              onClick={() => selectSlide(idx)}
              className={`p-3 sm:p-3.5 rounded-2xl text-left transition-all duration-300 border flex flex-col justify-between ${
                active
                  ? "bg-black text-white border-[#C5A880] shadow-[0_0_20px_rgba(197,168,128,0.35)] scale-[1.02]"
                  : "bg-[#fbf9f4] hover:bg-white text-zinc-700 border-zinc-200 hover:border-zinc-300 hover:scale-[1.01]"
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className={`text-[10px] font-mono font-black ${active ? "text-[#C5A880]" : "text-zinc-400"}`}>
                  {srv.code}
                </span>
                <span className={`w-1.5 h-1.5 rounded-full ${active ? "bg-[#C5A880] animate-pulse" : "bg-zinc-300"}`} />
              </div>
              <span className="text-xs font-black truncate block">{srv.shortTitle}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
