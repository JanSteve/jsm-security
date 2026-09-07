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
    <section className="py-16 md:py-20 bg-white text-[#1d1d1f] relative overflow-hidden border-t border-black/[0.08]" id="visual-showcase">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Sleek Minimal Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-black/[0.08] pb-6">
          <div className="space-y-2">
            <span className="text-xs font-semibold tracking-wider text-[#0071e3] uppercase block">
              Visual Operations Showcase
            </span>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#1d1d1f] text-balance">
              Proven ground <span className="text-[#0071e3]">capabilities</span>
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
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer min-h-[38px] press-scale ${
                  activeFilter === filter.id
                    ? "bg-[#0071e3] text-white shadow-sm"
                    : "bg-[#f5f5f7] text-[#1d1d1f] border border-black/[0.08] hover:bg-[#e8e8ed]"
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
                className="group relative h-[390px] rounded-[28px] overflow-hidden border border-black/[0.08] bg-[#f5f5f7] shadow-sm flex flex-col justify-between p-6 transition-all duration-300 hover:border-black/[0.2] hover:shadow-xl"
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/15 group-hover:via-black/30 transition-colors" />

                {/* Top Floating Badge */}
                <div className="relative z-10 flex justify-between items-start gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-black/[0.08] text-[#1d1d1f] text-[10px] font-semibold uppercase tracking-wider">
                    {card.category}
                  </span>

                  <span className="px-3 py-1 rounded-full bg-emerald-500/90 backdrop-blur-md text-white text-[10px] font-semibold shadow-xs">
                    {card.metricBadge}
                  </span>
                </div>

                {/* Bottom Information Container */}
                <div className="relative z-10 space-y-2 text-white">
                  <div className="flex items-center gap-1.5 text-[11px] text-white/80">
                    <MapPin size={12} className="text-[#0071e3]" />
                    <span>{card.location}</span>
                  </div>

                  <h3 className="text-lg font-semibold text-white leading-tight drop-shadow-sm text-balance">
                    {card.title}
                  </h3>

                  <p className="text-xs text-white/80 font-normal line-clamp-2 leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity text-pretty">
                    {card.highlightText}
                  </p>

                  <div className="pt-2">
                    <Link 
                      href="/get-quote"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-white/90 underline underline-offset-4 min-h-[44px] press-scale"
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
