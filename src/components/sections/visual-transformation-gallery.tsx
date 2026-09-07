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
    id: "airport-platoon",
    category: "PUBLIC INFRASTRUCTURE",
    title: "Trichy International Airport Terminal Concourse Platoon",
    metricBadge: "Zero Lapses • MD Sweety J",
    location: "Trichy International Airport Concourse",
    image: "/images/real_jsm_airport_terminal_platoon.jpg",
    highlightText: "Managing Director Sweety J seated with the full uniformed JSM security guard platoon at the airport terminal entrance.",
  },
  {
    id: "chariot-platoon",
    category: "PHYSICAL SECURITY",
    title: "Heritage Landmark Platoon Honor Guard & Muster",
    metricBadge: "100% Turnout • PSARA",
    location: "Trichy Heritage Landmark Sector",
    image: "/images/real_jsm_chariot_platoon.jpg",
    highlightText: "Uniformed security platoon in ceremonial muster with MD Sweety J under the iconic landmark chariot mural.",
  },
  {
    id: "printed-card-proof",
    category: "OPERATIONS & COMPLIANCE",
    title: "Official Corporate Credentials & Printed Proof",
    metricBadge: "Verified Registration",
    location: "JSM Registered HQ, Kottapattu, Trichy",
    image: "/images/real_jsm_printed_card.jpg",
    highlightText: "Official printed business card of JSM Integrated Services with metallic emblem, Sweety J (Proprietor & MD), and Major AR Devadoss.",
  },
  {
    id: "fabrication-staffing",
    category: "MANPOWER SOLUTIONS",
    title: "Industrial Fabrication & Contractual Workforce",
    metricBadge: "Active Hiring • 100% PF/ESI",
    location: "Tamil Nadu Manufacturing Corridors",
    image: "/images/real_jsm_fabrication_hiring.jpg",
    highlightText: "Active recruitment and deployment of Block & Pipe fabrication specialists with statutory indemnity.",
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
    highlightText: "Passenger screening coordination, ticket verification, and terminal access control standing orders.",
  },
];

export function VisualTransformationGallery() {
  const [activeFilter, setActiveFilter] = useState("ALL");

  const filteredCards = activeFilter === "ALL" 
    ? VISUAL_CARDS 
    : VISUAL_CARDS.filter(c => c.category.includes(activeFilter));

  return (
    <section className="py-16 md:py-20 bg-[#07090E] text-white relative overflow-hidden border-t border-white/10" id="visual-showcase">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Sleek Minimal Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-6">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold tracking-wider text-[#C5A880] uppercase block">
              [Visual Operations Showcase]
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white text-balance">
              Proven ground <span className="text-[#C5A880]">capabilities</span>
            </h2>
          </div>

          {/* Quick Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "ALL", label: "All" },
              { id: "SECURITY", label: "Security" },
              { id: "FACILITY", label: "Facility" },
              { id: "TECH", label: "IT & Tech" },
              { id: "MANPOWER", label: "Manpower" },
            ].map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all cursor-pointer min-h-[38px] press-scale ${
                  activeFilter === filter.id
                    ? "bg-[#C5A880] text-zinc-950 shadow-md"
                    : "bg-[#0B0F17] text-zinc-400 border border-zinc-800 hover:text-white hover:bg-zinc-800"
                }`}
              >
                {filter.label}
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
                className="group relative h-[390px] rounded-3xl overflow-hidden border border-zinc-800 bg-[#0B0F17] shadow-2xl flex flex-col justify-between p-6 transition-all duration-300 hover:border-[#C5A880]/80 hover:shadow-[#C5A880]/10"
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#07090E] via-[#07090E]/60 to-black/25 group-hover:via-[#07090E]/50 transition-colors" />

                {/* Top Floating Badge */}
                <div className="relative z-10 flex justify-between items-start gap-2">
                  <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#C5A880]/40 text-[#C5A880] text-[10px] font-mono font-bold">
                    {card.category}
                  </span>

                  <span className="px-3 py-1 rounded-full bg-emerald-500/90 backdrop-blur-md text-zinc-950 text-[10px] font-mono font-bold shadow-sm">
                    {card.metricBadge}
                  </span>
                </div>

                {/* Bottom Information Container */}
                <div className="relative z-10 space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] text-zinc-300 font-mono">
                    <MapPin size={12} className="text-[#C5A880]" />
                    <span>{card.location}</span>
                  </div>

                  <h3 className="text-xl font-black text-white leading-tight drop-shadow-md text-balance">
                    {card.title}
                  </h3>

                  <p className="text-xs text-zinc-300 font-normal line-clamp-2 leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity text-pretty">
                    {card.highlightText}
                  </p>

                  <div className="pt-2">
                    <Link 
                      href="/get-quote"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C5A880] group-hover:text-white font-mono tracking-wider min-h-[44px] press-scale"
                    >
                      <span>Deploy at your site</span>
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
