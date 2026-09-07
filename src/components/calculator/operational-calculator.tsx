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
    <section className="py-20 md:py-28 bg-white text-[#1d1d1f] overflow-hidden relative border-y border-black/[0.08]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f5f5f7] border border-black/[0.08] text-xs font-mono font-bold text-[#1d1d1f]">
            <Calculator size={14} className="text-[#0071e3]" />
            <span>INTERACTIVE COMMERCIAL ESTIMATOR</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1d1d1f] tracking-tight">
            Estimate Your Monthly Operations.
          </h2>
          <p className="text-xs sm:text-sm text-[#515154] max-w-xl mx-auto font-normal">
            Select your facility requirement below for an instant transparent commercial preview based on Tamil Nadu statutory wage standards.
          </p>
        </div>

        {/* Interactive Calculator Container */}
        <div className="max-w-4xl mx-auto bg-[#f5f5f7] border border-black/[0.08] rounded-[28px] p-6 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls (Left 7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Service Selector */}
            <div className="space-y-2">
              <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#86868b]">
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
                      className={`p-3 rounded-2xl text-xs font-semibold flex flex-col items-center gap-1.5 transition-all press-scale cursor-pointer ${
                        active
                          ? "bg-[#1d1d1f] text-white shadow-xs"
                          : "bg-white text-[#515154] hover:bg-[#e8e8ed] border border-black/[0.06]"
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
                <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#86868b]">
                  2. Required Headcount (Personnel)
                </label>
                <span className="text-sm font-bold font-mono text-[#1d1d1f]">
                  {headcount} Staff
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                step="1"
                value={headcount}
                onChange={(e) => setHeadcount(parseInt(e.target.value))}
                className="w-full accent-[#0071e3] cursor-pointer h-2 bg-black/[0.08] rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-[#86868b] font-mono">
                <span>1 Guard/Staff</span>
                <span>10 Personnel</span>
                <span>25+ Enterprise</span>
              </div>
            </div>

            {/* 3. Shift Duration */}
            <div className="space-y-2">
              <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#86868b]">
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
                    className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all text-center press-scale cursor-pointer ${
                      shiftDuration === s.id
                        ? "bg-[#1d1d1f] text-white shadow-xs"
                        : "bg-white text-[#515154] hover:bg-[#e8e8ed] border border-black/[0.06]"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Real-Time Commercial Output (Right 5 Cols) */}
          <div className="lg:col-span-5 bg-white border border-black/[0.08] rounded-2xl p-6 space-y-6 flex flex-col justify-between shadow-2xs">
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#0071e3] uppercase">
                ESTIMATED MONTHLY BUDGET
              </span>
              <div className="text-3xl sm:text-4xl font-bold text-[#1d1d1f] tracking-tight font-mono">
                ₹{estimatedTotal.toLocaleString("en-IN")}
                <span className="text-xs text-[#86868b] font-normal font-sans block mt-1">
                  / month + statutory GST
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-black/[0.06] text-xs text-[#515154]">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={13} className="text-emerald-600 flex-shrink-0" />
                <span>100% EPF, ESI &amp; Minimum Wages included</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={13} className="text-emerald-600 flex-shrink-0" />
                <span>2:00 AM Night Supervisor Spot-Checks</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={13} className="text-emerald-600 flex-shrink-0" />
                <span>Guaranteed 2-Hour Relief Replacement SLA</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href="mailto:contact@jsmintegratedservices.com?subject=Custom%20Quote%20Request"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full text-xs font-semibold text-white bg-[#0071e3] hover:bg-[#0077ed] transition-colors shadow-xs press-scale"
              >
                <Mail size={15} /> Request Official Quote via Email
              </a>

              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-1 py-2 text-xs font-semibold text-[#86868b] hover:text-[#1d1d1f] transition-colors text-center"
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
