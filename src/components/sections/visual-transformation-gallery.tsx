"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShieldCheck, 
  Sparkles, 
  Plane, 
  Factory, 
  Cpu, 
  Radio, 
  ArrowRight,
  CheckCircle2,
  MapPin
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface VisualCard {
  id: string;
  category: string;
  title: string;
  metricBadge: string;
  location: string;
  image: string;
  highlightText: string;
}

const VISUAL_CARDS: VisualCard[] = [
  {
    id: "airport-drill",
    category: "PUBLIC INFRASTRUCTURE",
    title: "Trichy International Airport Roll Call & Drill",
    metricBadge: "0 Lapses • BCAS Compliant",
    location: "Trichy International Airport",
    image: "/images/real_jsm_airport_drill.jpg",
    highlightText: "Official night shift inspection, drill parade, and supervisor roll call at Trichy Airport.",
  },
  {
    id: "guarding",
    category: "PHYSICAL SECURITY",
    title: "Regional Operations & Guarding Standby",
    metricBadge: "100% Police Verified",
    location: "Tiruchirappalli City Gateway",
    image: "/images/real_jsm_welcome_trichy_salute.jpg",
    highlightText: "Disciplined uniform turnout and 24/7 vigilant standing orders under city command.",
  },
  {
    id: "shift-muster",
    category: "MANPOWER SOLUTIONS",
    title: "Daytime Shift Briefing & Muster Roll",
    metricBadge: "100% On-Time Deployment",
    location: "Trichy Airport Security Control",
    image: "/images/real_jsm_shift_muster_day.jpg",
    highlightText: "Daily pre-shift operational briefing, duty post allocation, and radio communication protocol check.",
  },
  {
    id: "terminal-entry",
    category: "PHYSICAL SECURITY",
    title: "Airport Terminal Access & Gate Vigilance",
    metricBadge: "High-Density Gate Control",
    location: "Trichy Airport Terminal Entry D6",
    image: "/images/real_jsm_terminal_entry_salute.jpg",
    highlightText: "Passenger screening coordination, ticket verification, and terminal access control.",
  },
  {
    id: "night-squad",
    category: "SECURITY & MANPOWER",
    title: "Night Vigilance Squad & Supervisor Audits",
    metricBadge: "2:00 AM Active Roster",
    location: "Trichy Regional Operational Sector",
    image: "/images/real_jsm_guard_squad_night.jpg",
    highlightText: "Night shift security platoon with roving supervisor inspections and perimeter vigilance.",
  },
  {
    id: "mechanized-hk",
    category: "FACILITY MANAGEMENT",
    title: "Mechanized Ride-On Auto Scrubbers",
    metricBadge: "99.8% Hygiene Index",
    location: "Automotive & Corporate Campuses",
    image: "/images/ride_on_scrubber.jpg",
    highlightText: "Heavy-duty ride-on scrubbing with hospital-grade eco disinfectants.",
  },
];

export function VisualTransformationGallery() {
  const [activeFilter, setActiveFilter] = useState("ALL");

  const filteredCards = activeFilter === "ALL" 
    ? VISUAL_CARDS 
    : VISUAL_CARDS.filter(c => c.category.includes(activeFilter));

  return (
    <section className="py-20 bg-zinc-950 text-white relative overflow-hidden" id="visual-showcase">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Sleek Minimal Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-zinc-800 pb-8">
          <div className="space-y-2">
            <span className="text-[11px] font-mono font-bold tracking-widest text-[#C5A880] uppercase block">
              VISUAL OPERATIONS SHOWCASE
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
              Proven Ground <span className="text-[#C5A880]">Capabilities</span>
            </h2>
          </div>

          {/* Quick Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {["ALL", "SECURITY", "FACILITY", "TECH", "MANPOWER"].map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeFilter === filter
                    ? "bg-[#C5A880] text-zinc-950"
                    : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white hover:bg-zinc-800"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* High-Impact Visual Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredCards.map((card) => (
              <motion.div
                key={card.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="group relative h-[380px] rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl flex flex-col justify-between p-6 transition-all duration-300 hover:border-[#C5A880]/80 hover:shadow-[#C5A880]/10"
              >
                {/* Background Image with Zoom on Hover */}
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20 group-hover:via-black/30 transition-colors" />

                {/* Top Floating Badge */}
                <div className="relative z-10 flex justify-between items-start">
                  <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[#C5A880] text-[10px] font-mono font-black uppercase">
                    {card.category}
                  </span>

                  <span className="px-3 py-1 rounded-full bg-emerald-500/80 backdrop-blur-md text-zinc-950 text-[10px] font-mono font-black uppercase shadow-sm">
                    {card.metricBadge}
                  </span>
                </div>

                {/* Bottom Information Container */}
                <div className="relative z-10 space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] text-zinc-300 font-mono">
                    <MapPin size={12} className="text-[#C5A880]" />
                    <span>{card.location}</span>
                  </div>

                  <h3 className="text-xl font-black text-white leading-tight drop-shadow-md">
                    {card.title}
                  </h3>

                  <p className="text-xs text-zinc-300 font-normal line-clamp-2 leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity">
                    {card.highlightText}
                  </p>

                  <div className="pt-2">
                    <Link 
                      href="/get-quote"
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#C5A880] group-hover:text-white font-mono uppercase tracking-wider"
                    >
                      <span>Deploy at Your Site</span>
                      <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
