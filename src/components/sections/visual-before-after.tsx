"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  ShieldAlert, 
  ShieldCheck, 
  ArrowLeftRight, 
  CheckCircle2, 
  XCircle,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface TransformationScenario {
  id: string;
  title: string;
  category: string;
  beforeImg: string;
  afterImg: string;
  beforeLabel: string;
  afterLabel: string;
  beforePoints: string[];
  afterPoints: string[];
}

const SCENARIOS: TransformationScenario[] = [
  {
    id: "gate-control",
    title: "Perimeter & Vehicle Gate Access",
    category: "PHYSICAL SECURITY",
    beforeImg: "/images/hero_operations.jpg",
    afterImg: "/images/protective_guard.jpg",
    beforeLabel: "Standard Untrained Contractor",
    afterLabel: "JSM PSARA Verified Guarding",
    beforePoints: [
      "Manual paper registers with frequent missing entries",
      "No under-vehicle search mirrors or trunk checks",
      "Delayed 4 to 6 hour replacement when guard is absent",
    ],
    afterPoints: [
      "100% PSARA police-verified guards with digital photo badging",
      "Dual-barrier vehicle checkpoints & barcode material logging",
      "Guaranteed 2-Hour Relief Replacement SLA",
    ],
  },
  {
    id: "floor-hygiene",
    title: "Industrial & Warehouse Floor Hygiene",
    category: "FACILITY MANAGEMENT",
    beforeImg: "/images/industrial_workforce.jpg",
    afterImg: "/images/ride_on_scrubber.jpg",
    beforeLabel: "Basic Manual Mopping",
    afterLabel: "JSM Mechanized Ride-On Scrubbing",
    beforePoints: [
      "Manual mops leaving greasy residue on shop floors",
      "Unregulated local chemicals without safety data sheets",
      "High slip-and-fall hazard risks in production corridors",
    ],
    afterPoints: [
      "Heavy-duty ride-on auto scrubbers leaving mirror-clean dry floors",
      "Medical-grade eco-certified degreasers & disinfectants",
      "99.8% Hygiene Audit Compliance with signed zone checklists",
    ],
  },
  {
    id: "night-oversight",
    title: "Surveillance & 2:00 AM Night Vigilance",
    category: "TECH & OVERSIGHT",
    beforeImg: "/images/facility_lobby.jpg",
    afterImg: "/images/cctv_command_center.jpg",
    beforeLabel: "Unmonitored Night Static Post",
    afterLabel: "24/7 Central Command & Mobile Van Audits",
    beforePoints: [
      "Zero active night-time supervisor spot inspections",
      "High vulnerability to sleeping-on-duty between 01:00 AM - 04:00 AM",
      "Untracked perimeter patrols with blind spots",
    ],
    afterPoints: [
      "Unannounced 2:00 AM mobile supervisor patrol van surprise checks",
      "Electronic wand checkpoint tags ensuring 100% boundary sweeps",
      "Live GPS & biometric sync with Central Command Hub",
    ],
  },
];

export function VisualBeforeAfter() {
  const [activeScenario, setActiveScenario] = useState<TransformationScenario>(SCENARIOS[0]);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 - 100)

  return (
    <section className="py-24 bg-zinc-950 text-white relative overflow-hidden" id="transformation-slider">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 text-[#C5A880] text-xs font-mono font-bold">
            <ArrowLeftRight size={14} />
            <span>OPERATIONAL TRANSFORMATION COMPARATOR</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
            The JSM <span className="text-[#C5A880]">Impact Difference</span>
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm">
            Drag the slider to compare standard vendor vulnerabilities against JSM&apos;s disciplined, zero-liability operations.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {SCENARIOS.map((sc) => {
            const isActive = activeScenario.id === sc.id;
            return (
              <button
                key={sc.id}
                type="button"
                onClick={() => {
                  setActiveScenario(sc);
                  setSliderPosition(50);
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-bold font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#C5A880] text-zinc-950 shadow-lg shadow-[#C5A880]/20 scale-105"
                    : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white hover:bg-zinc-800"
                }`}
              >
                {sc.title}
              </button>
            );
          })}
        </div>

        {/* Interactive Visual Split Screen */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 space-y-8">
          
          {/* Visual Before/After Canvas Container */}
          <div className="relative h-[360px] sm:h-[480px] w-full rounded-2xl overflow-hidden select-none border border-zinc-800">
            
            {/* After Image (Right/Full Background) */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={activeScenario.afterImg}
                alt={activeScenario.afterLabel}
                fill
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
              <div className="absolute top-4 right-4 z-10 px-3.5 py-1.5 rounded-full bg-emerald-500/90 text-zinc-950 text-[10px] sm:text-xs font-mono font-black uppercase shadow-lg">
                ✓ {activeScenario.afterLabel}
              </div>
            </div>

            {/* Before Image (Left Layer with Clip-Path) */}
            <div 
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
            >
              <Image
                src={activeScenario.beforeImg}
                alt={activeScenario.beforeLabel}
                fill
                className="object-cover filter grayscale contrast-125"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-red-600/90 text-white text-[10px] sm:text-xs font-mono font-black uppercase shadow-lg">
                ✕ {activeScenario.beforeLabel}
              </div>
            </div>

            {/* Vertical Divider Line */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] z-20 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white text-zinc-950 shadow-2xl flex items-center justify-center border-2 border-[#C5A880]">
                <ArrowLeftRight size={14} className="text-zinc-950 font-bold" />
              </div>
            </div>

            {/* Native Touch/Mouse Range Input Overlaid */}
            <input
              type="range"
              min="5"
              max="95"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
              aria-label="Drag to compare before and after"
            />
          </div>

          {/* Granular Points Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            
            {/* Before Points */}
            <div className="bg-red-500/5 border border-red-500/20 p-5 rounded-2xl space-y-3">
              <span className="text-[11px] font-mono font-bold text-red-400 uppercase flex items-center gap-1.5">
                <XCircle size={14} /> Traditional Vulnerabilities
              </span>
              <ul className="space-y-2 text-zinc-300">
                {activeScenario.beforePoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-red-400 font-bold">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* After Points */}
            <div className="bg-emerald-500/5 border border-emerald-500/20 p-5 rounded-2xl space-y-3">
              <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase flex items-center gap-1.5">
                <CheckCircle2 size={14} /> JSM Enterprise Standard
              </span>
              <ul className="space-y-2 text-zinc-200">
                {activeScenario.afterPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-[#C5A880] flex-shrink-0 mt-0.5" />
                    <span className="font-medium">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Action Row */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-800">
            <span className="text-xs text-zinc-400 font-mono">
              Ready to eliminate security lapses &amp; hygiene deficits at your site?
            </span>
            <Link href="/get-quote">
              <Button className="bg-[#C5A880] hover:bg-[#b09268] text-zinc-950 font-black text-xs uppercase tracking-wider rounded-xl cursor-pointer px-6">
                <span>Request Upgrade Proposal</span>
                <ArrowRight size={14} className="ml-1.5" />
              </Button>
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
