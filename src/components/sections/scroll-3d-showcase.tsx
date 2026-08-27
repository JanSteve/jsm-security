"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShieldCheck, 
  Sparkles, 
  Users, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Layers,
  ChevronRight,
  Plane,
  Award,
  BadgeCheck
} from "lucide-react";
import Link from "next/link";
import { FacilityHologram } from "@/components/3d/facility-hologram";
import { TiltCard } from "@/components/3d/tilt-card";

interface LayerData {
  id: string;
  name: string;
  badge: string;
  title: string;
  desc: string;
  icon: any;
  color: string;
  accentHex: string;
  slas: string[];
  metrics: { label: string; value: string }[];
  href: string;
}

const LAYERS: LayerData[] = [
  {
    id: "security",
    name: "Layer 01 • Perimeter Shield",
    badge: "PSARA 2005 LICENSED",
    title: "Manned Guarding & Night Audits",
    desc: "100% police background verified personnel, mandatory 5-day induction syllabus, and active 2:00 AM supervisor spot-inspections across gates, turnstiles, and perimeter posts.",
    icon: ShieldCheck,
    color: "from-amber-500/20 via-zinc-900/80 to-black",
    accentHex: "#C5A880",
    slas: ["2-Hour Relief Replacement SLA", "Aadhaar & Police Verification", "2:00 AM Active Supervisor Spot-Checks"],
    metrics: [
      { label: "Guarding Uptime", value: "99.98%" },
      { label: "SLA Relief Time", value: "< 120m" },
      { label: "Audit Frequency", value: "Daily 2AM" },
    ],
    href: "/services/private-security"
  },
  {
    id: "housekeeping",
    name: "Layer 02 • Facility Hygiene",
    badge: "5-STEP CLOSED-LOOP PROTOCOL",
    title: "Commercial Sanitization & Care",
    desc: "Daily protocol: Clean → Inspect → Report → Correct → Verify. Mechanized heavy scrubber driers, hospital-grade eco consumables, and hourly restroom sanitation logs.",
    icon: Sparkles,
    color: "from-blue-500/20 via-zinc-900/80 to-black",
    accentHex: "#38BDF8",
    slas: ["Hourly Restroom QR Logging", "Closed-Loop Supervisor Signoff", "Eco-Friendly Non-Toxic Consumables"],
    metrics: [
      { label: "Hygiene Compliance", value: "100%" },
      { label: "Audit Pass Rate", value: "99.4%" },
      { label: "Restroom Cycles", value: "Hourly" },
    ],
    href: "/services/housekeeping"
  },
  {
    id: "manpower",
    name: "Layer 03 • Industrial Workforce",
    badge: "ORIGINATING AS JSMMANPOWER",
    title: "Vetted Staffing & Surge Mobilization",
    desc: "High-volume factory line workers, warehouse handlers, machine operators, and skilled technical helpers. Rapid 48-72 hour deployment with 100% EPF & ESI statutory adherence.",
    icon: Users,
    color: "from-emerald-500/20 via-zinc-900/80 to-black",
    accentHex: "#10B981",
    slas: ["48-72 Hour Mobilization SLA", "100% EPF/ESI Legal Compliance", "Zero Client Labour Liability"],
    metrics: [
      { label: "Deployment Speed", value: "48-72h" },
      { label: "Legal Compliance", value: "100%" },
      { label: "Workforce Retention", value: "92%" },
    ],
    href: "/services/manpower"
  }
];

export function Scroll3DShowcase() {
  const [selectedLayer, setSelectedLayer] = useState(0);
  const current = LAYERS[selectedLayer];
  const Icon = current.icon;

  return (
    <section className="py-24 sm:py-32 bg-[#0A1628] text-white relative overflow-hidden border-y border-zinc-800">
      {/* 3D Background Lighting Grid */}
      <div className="absolute inset-0 bg-radial-grid-dark opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 -left-40 w-[600px] h-[600px] bg-[#C5A880]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -right-40 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 relative z-10 space-y-16">
        
        {/* Section Display Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono font-bold text-[#C5A880]">
              <Layers size={14} />
              <span>3-TIER OPERATIONAL DEFENSE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-[1.05]">
              The 3D Integrated <br />
              <span className="bg-gradient-to-r from-white via-[#C5A880] to-zinc-300 bg-clip-text text-transparent">
                Facility Ecosystem.
              </span>
            </h2>
          </div>
          
          <p className="text-sm sm:text-base text-zinc-400 max-w-md font-normal leading-relaxed">
            Experience how JSM unifies perimeter security, facility hygiene, and factory manpower into one synchronized command structure.
          </p>
        </div>

        {/* 3D Interactive Stage: 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: 3D Hologram Radar */}
          <div className="lg:col-span-6 space-y-4">
            <FacilityHologram />
            
            {/* Airport Benchmark Badge */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#C5A880]/20 text-[#C5A880]">
                  <Plane size={18} />
                </div>
                <div>
                  <h5 className="text-xs font-black uppercase text-white">Proven Aviation Benchmark</h5>
                  <p className="text-[11px] text-zinc-400">Inaugural 2024 Trichy International Airport Operations</p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-400/30">
                ZERO LAPSES
              </span>
            </div>
          </div>

          {/* Right Column: 3D Layer Inspector */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Layer Selection Strip */}
            <div className="flex flex-col sm:flex-row gap-2">
              {LAYERS.map((layer, idx) => {
                const active = selectedLayer === idx;
                const LIcon = layer.icon;
                return (
                  <button
                    key={layer.id}
                    onClick={() => setSelectedLayer(idx)}
                    className={`flex-1 p-3.5 rounded-2xl text-left transition-all border flex items-center justify-between gap-2 ${
                      active
                        ? "bg-[#C5A880] text-black border-[#C5A880] shadow-[0_0_25px_rgba(197,168,128,0.4)] scale-[1.02]"
                        : "bg-white/5 text-zinc-300 border-white/10 hover:bg-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <LIcon size={16} className={active ? "text-black" : "text-[#C5A880]"} />
                      <span className="text-xs font-extrabold truncate">{layer.title.split("&")[0]}</span>
                    </div>
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${active ? "bg-black text-white" : "bg-white/10 text-zinc-400"}`}>
                      0{idx + 1}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* 3D Tilt Card Display of Active Layer */}
            <TiltCard maxTilt={8} className="bg-white/10 backdrop-blur-2xl border border-white/20 p-6 sm:p-8 space-y-6">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C5A880]">
                    {current.name}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    {current.title}
                  </h3>
                </div>
                <div className="p-3 rounded-2xl bg-[#C5A880] text-black shadow-lg">
                  <Icon size={22} />
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                {current.desc}
              </p>

              {/* Live Metric Pills */}
              <div className="grid grid-cols-3 gap-2.5 pt-2">
                {current.metrics.map((m) => (
                  <div key={m.label} className="p-3 rounded-xl bg-black/40 border border-white/10 text-center space-y-0.5">
                    <div className="text-sm sm:text-base font-black font-mono text-[#C5A880]">{m.value}</div>
                    <div className="text-[9px] font-mono text-zinc-400 uppercase truncate">{m.label}</div>
                  </div>
                ))}
              </div>

              {/* SLA Checkmarks */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                {current.slas.map((sla) => (
                  <div key={sla} className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                    <CheckCircle2 size={14} className="text-[#C5A880] flex-shrink-0" />
                    <span>{sla}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/get-quote"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#C5A880] hover:bg-[#b09570] text-black text-xs font-black uppercase tracking-wider h-11 px-5 rounded-full shadow-lg transition-all active:scale-95"
                >
                  <span>Get Instant Proposal</span>
                  <ArrowRight size={14} />
                </Link>

                <Link
                  href={current.href}
                  className="inline-flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/15 text-white text-xs font-bold h-11 px-5 rounded-full border border-white/15 transition-all"
                >
                  <span>Explore SOP</span>
                  <ChevronRight size={14} className="text-[#C5A880]" />
                </Link>
              </div>
            </TiltCard>

          </div>

        </div>

      </div>
    </section>
  );
}
