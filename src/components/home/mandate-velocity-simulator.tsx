"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { 
  Timer, 
  TrendingDown, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  AlertCircle,
  Zap,
  Gauge
} from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";
import { DotPattern } from "@/components/ui/dot-pattern";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { cn } from "@/lib/utils";

export function MandateVelocitySimulator() {
  const [ctcLakhs, setCtcLakhs] = React.useState<number>(45);
  const [openDays, setOpenDays] = React.useState<number>(45);

  // Senior leadership throughput factor: Senior leaders typically oversee 3x to 5x operational capacity
  // Daily operational opportunity cost = (Annual CTC * 2.5) / 365
  const dailyBurn = Math.round((ctcLakhs * 100000 * 2.4) / 365);
  const totalInactionCost = dailyBurn * openDays;

  // Traditional 33% search retainer that would be locked upfront
  const traditionalRetainerRisk = Math.round((ctcLakhs * 100000) * 0.33);

  // Format currency in Indian Lakhs / Crores
  const formatINR = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(val / 100000).toFixed(2)} Lakhs`;
  };

  return (
    <section 
      id="velocity-simulator"
      className="py-16 sm:py-24 bg-[#F6F3EE] border-b border-[#0E1116]/10 relative overflow-hidden w-full max-w-full"
      aria-labelledby="velocity-heading"
    >
      <DotPattern
        width={24}
        height={24}
        cx={1.5}
        cy={1.5}
        cr={1}
        className="[mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_75%)] opacity-50"
      />

      <div className="max-w-[1180px] w-[92%] mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#0E1116]/10 text-xs font-semibold uppercase tracking-wider text-[#1F4E5F] mb-4 shadow-2xs">
            <Gauge className="w-3.5 h-3.5 text-[#C8553D]" aria-hidden="true" />
            <span>Operational Velocity Simulator</span>
          </div>

          <h2
            id="velocity-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-heading font-medium tracking-tight text-[#0E1116] leading-[1.12] mb-4 text-balance"
          >
            Calculate the hidden cost of an open executive seat.
          </h2>

          <p className="text-base sm:text-lg font-sans text-[#4A5568] leading-relaxed max-w-2xl text-pretty">
            When critical plant leadership or engineering director roles sit vacant, the true cost is operational drag. Contrast the cost of delay against our 7-day contingency sprint.
          </p>
        </div>

        {/* Interactive Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Controls (6 cols): Sliders & Presets */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl md:rounded-3xl border border-[#0E1116]/10 shadow-sm flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              {/* Slider 1: Role Annual CTC */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="ctc-slider" className="text-xs sm:text-sm font-mono font-semibold uppercase tracking-wider text-[#0E1116]">
                    1. Vacant Leadership CTC
                  </label>
                  <span className="text-lg sm:text-xl font-heading font-medium text-[#1F4E5F] tabular-nums">
                    ₹{ctcLakhs} Lakhs <span className="text-xs text-[#525866]">[CONFIRM: role band]</span>
                  </span>
                </div>
                <input
                  id="ctc-slider"
                  type="range"
                  min={12}
                  max={100}
                  step={1}
                  value={ctcLakhs}
                  onChange={(e) => setCtcLakhs(Number(e.target.value))}
                  className="w-full h-2 bg-[#F6F3EE] rounded-lg appearance-none cursor-pointer accent-[#1F4E5F]"
                />
                <div className="flex justify-between text-[11px] font-mono text-[#525866] mt-1.5">
                  <span>₹12L (Senior Manager)</span>
                  <span>₹50L (Director)</span>
                  <span>₹1 Cr (CXO / MD)</span>
                </div>
              </div>

              {/* Slider 2: Vacancy Days */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="days-slider" className="text-xs sm:text-sm font-mono font-semibold uppercase tracking-wider text-[#0E1116]">
                    2. Days Vacant / Open In-Market
                  </label>
                  <span className="text-lg sm:text-xl font-heading font-medium text-[#C8553D] tabular-nums">
                    {openDays} Calendar Days
                  </span>
                </div>
                <input
                  id="days-slider"
                  type="range"
                  min={7}
                  max={120}
                  step={1}
                  value={openDays}
                  onChange={(e) => setOpenDays(Number(e.target.value))}
                  className="w-full h-2 bg-[#F6F3EE] rounded-lg appearance-none cursor-pointer accent-[#C8553D]"
                />
                <div className="flex justify-between text-[11px] font-mono text-[#525866] mt-1.5">
                  <span>7 Days (JSM Sourcing Sprint)</span>
                  <span>60 Days (Market Average)</span>
                  <span>120 Days (Stalled)</span>
                </div>
              </div>
            </div>

            {/* Quick Role Band Preset Buttons */}
            <div className="pt-4 border-t border-[#0E1116]/8">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#525866] block mb-2.5">
                Quick Role Calibration Presets:
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => { setCtcLakhs(25); setOpenDays(30); }}
                  className={cn(
                    "px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-center min-h-[44px]",
                    ctcLakhs === 25 ? "bg-[#0E1116] text-white border-[#0E1116]" : "bg-[#F6F3EE] text-[#4A5568] border-[#0E1116]/10 hover:border-[#0E1116]/30"
                  )}
                >
                  ₹25L Plant Lead
                </button>
                <button
                  type="button"
                  onClick={() => { setCtcLakhs(50); setOpenDays(60); }}
                  className={cn(
                    "px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-center min-h-[44px]",
                    ctcLakhs === 50 ? "bg-[#0E1116] text-white border-[#0E1116]" : "bg-[#F6F3EE] text-[#4A5568] border-[#0E1116]/10 hover:border-[#0E1116]/30"
                  )}
                >
                  ₹50L Operations VP
                </button>
                <button
                  type="button"
                  onClick={() => { setCtcLakhs(85); setOpenDays(90); }}
                  className={cn(
                    "px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-center min-h-[44px]",
                    ctcLakhs === 85 ? "bg-[#0E1116] text-white border-[#0E1116]" : "bg-[#F6F3EE] text-[#4A5568] border-[#0E1116]/10 hover:border-[#0E1116]/30"
                  )}
                >
                  ₹85L C-Suite / MD
                </button>
              </div>
            </div>
          </div>

          {/* Right Calculations Card (6 cols): High-Impact Contrast */}
          <div className="lg:col-span-6 bg-[#0E1116] text-white p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl relative overflow-hidden shadow-md flex flex-col justify-between">
            <BorderBeam size={350} duration={14} delay={2} colorFrom="#C8553D" colorTo="#1F4E5F" />

            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#C8553D] block">
                    Financial Impact Diagnosis
                  </span>
                  <h3 className="text-xl sm:text-2xl font-heading font-medium text-white">
                    Estimated Inaction Cost
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-[#A0AEC0] block">Daily Drag:</span>
                  <span className="font-mono text-xs sm:text-sm font-bold text-amber-300">
                    ~₹{dailyBurn.toLocaleString("en-IN")}/day
                  </span>
                </div>
              </div>

              {/* Big Red Impact Number */}
              <div className="bg-white/5 p-4 sm:p-5 rounded-2xl border border-white/10">
                <span className="text-xs text-[#A0AEC0] block mb-1">
                  Cumulative Operational Throughput At Risk ({openDays} Days):
                </span>
                <div className="text-3xl sm:text-4xl md:text-5xl font-heading font-medium text-[#C8553D] tabular-nums">
                  {formatINR(totalInactionCost)}
                </div>
                <p className="text-xs text-[#A0AEC0] mt-1.5 leading-relaxed">
                  Based on conservative 2.4x executive operational throughput across manufacturing output, team velocity, and delayed capital deployment.
                </p>
              </div>

              {/* Contrast Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                  <span className="text-[#A0AEC0] block mb-0.5">Sunk Retainer Risk Saved</span>
                  <strong className="text-emerald-400 text-sm font-mono block">
                    {formatINR(traditionalRetainerRisk)}
                  </strong>
                  <span className="text-[10px] text-[#A0AEC0]">vs 33% retained headhunters</span>
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                  <span className="text-[#A0AEC0] block mb-0.5">JSM Upfront Retainer</span>
                  <strong className="text-white text-sm font-mono block">₹0 Nil</strong>
                  <span className="text-[10px] text-[#A0AEC0]">100% contingent on joining</span>
                </div>
              </div>

              {/* JSM Acceleration Solution */}
              <div className="pt-2 text-xs text-[#A0AEC0] space-y-2">
                <div className="flex items-center gap-2 text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>7 Business Days:</strong> Receive 3 pre-vetted blind dossiers</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>90-Day Placement Shield:</strong> Backed by formal replacement policy [CONFIRM: fee %]</span>
                </div>
              </div>
            </div>

            {/* Action CTA with Shimmer Button */}
            <div className="pt-6 relative z-10 border-t border-white/10 mt-6">
              <Link href="#enquiry" className="block w-full">
                <ShimmerButton className="w-full text-sm sm:text-base font-semibold">
                  <span>Initiate 7-Day Sprint for This Role</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </ShimmerButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
