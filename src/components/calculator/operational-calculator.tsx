"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Calculator, ShieldCheck, Sparkles, Users, ArrowRight, MessageCircle, Mail, CheckCircle2 } from "lucide-react";
import { brandData } from "@/data/brand";
import Link from "next/link";

export function OperationalCalculator() {
  const [serviceType, setServiceType] = useState<"security" | "housekeeping" | "manpower" | "integrated">("security");
  const [headcount, setHeadcount] = useState<number>(3);
  const [shiftDuration, setShiftDuration] = useState<"8hr" | "12hr" | "247">("12hr");

  // Approximate baseline operational rates in Tamil Nadu
  const calculateEstimate = () => {
    let ratePerHead = 18000;
    if (serviceType === "housekeeping") ratePerHead = 14500;
    if (serviceType === "manpower") ratePerHead = 15500;
    if (serviceType === "integrated") ratePerHead = 16500;

    if (shiftDuration === "8hr") ratePerHead *= 0.85;
    if (shiftDuration === "247") ratePerHead *= 2.1; // Multi-shift round-the-clock

    const monthlyTotal = Math.round(ratePerHead * headcount);
    return monthlyTotal;
  };

  const estimatedTotal = calculateEstimate();
  return (
    <section className="py-20 md:py-28 bg-[#0A1628] text-white overflow-hidden relative border-y border-zinc-800">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono font-bold text-[#C5A880]">
            <Calculator size={14} />
            <span>INTERACTIVE COMMERCIAL ESTIMATOR</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
            Estimate Your Monthly Operations.
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto font-normal">
            Select your facility requirement below for an instant transparent commercial preview based on Tamil Nadu statutory wage standards.
          </p>
        </div>

        {/* Interactive Calculator Container */}
        <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls (Left 7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Service Selector */}
            <div className="space-y-2">
              <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400">
                1. Select Operational Service
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: "security", label: "Security", icon: ShieldCheck },
                  { id: "housekeeping", label: "Housekeeping", icon: Sparkles },
                  { id: "manpower", label: "Manpower", icon: Users },
                  { id: "integrated", label: "Integrated", icon: Calculator },
                ].map((item) => {
                  const Icon = item.icon;
                  const active = serviceType === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setServiceType(item.id as any)}
                      className={`p-3 rounded-2xl text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                        active
                          ? "bg-[#C5A880] text-black shadow-md scale-[1.02]"
                          : "bg-white/10 text-zinc-300 hover:bg-white/15 border border-white/5"
                      }`}
                    >
                      <Icon size={16} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Headcount Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400">
                  2. Required Headcount (Personnel)
                </label>
                <span className="text-sm font-black font-mono text-[#C5A880]">
                  {headcount} {headcount === 1 ? "Staff" : "Staff"}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                step="1"
                value={headcount}
                onChange={(e) => setHeadcount(parseInt(e.target.value))}
                className="w-full accent-[#C5A880] cursor-pointer h-2 bg-zinc-700 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                <span>1 Guard/Staff</span>
                <span>10 Personnel</span>
                <span>25+ Enterprise</span>
              </div>
            </div>

            {/* 3. Shift Duration */}
            <div className="space-y-2">
              <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400">
                3. Shift Coverage Model
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "8hr", label: "8-Hour Single" },
                  { id: "12hr", label: "12-Hour Shift" },
                  { id: "247", label: "24/7 Non-Stop" },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setShiftDuration(s.id as any)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all text-center ${
                      shiftDuration === s.id
                        ? "bg-white text-black shadow-sm"
                        : "bg-white/10 text-zinc-300 hover:bg-white/15 border border-white/5"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Real-Time Commercial Output (Right 5 Cols) */}
          <div className="lg:col-span-5 bg-black/50 border border-white/10 rounded-2xl p-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#C5A880] uppercase">
                ESTIMATED MONTHLY BUDGET
              </span>
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight font-mono">
                ₹{estimatedTotal.toLocaleString("en-IN")}
                <span className="text-xs text-zinc-400 font-normal font-sans block mt-1">
                  / month + statutory GST
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-white/10 text-xs text-zinc-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={13} className="text-[#C5A880] flex-shrink-0" />
                <span>100% EPF, ESI &amp; Minimum Wages included</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={13} className="text-[#C5A880] flex-shrink-0" />
                <span>2:00 AM Night Supervisor Spot-Checks</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={13} className="text-[#C5A880] flex-shrink-0" />
                <span>Guaranteed 2-Hour Relief Replacement SLA</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href="mailto:jsmintegratedservices@outlook.com?subject=Custom%20Quote%20Request"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full text-xs font-bold text-black bg-[#C5A880] hover:bg-[#b59870] transition-colors shadow-md uppercase"
              >
                <Mail size={15} /> Request Official Quote via Email
              </a>

              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-1 py-2 text-xs font-bold text-zinc-400 hover:text-white transition-colors text-center"
              >
                Or submit site assessment form <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
