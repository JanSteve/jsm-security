"use client";

import { motion } from "motion/react";
import { ArrowRight, Shield, Sparkles } from "lucide-react";
import Link from "next/link";
import { brandData } from "@/data/brand";

export function HeroSection() {
  const cleanWA = brandData.contact.whatsapp.replace(/[^0-9]/g, '');

  return (
    <section className="relative min-h-[85vh] md:min-h-[920px] flex items-center px-5 md:px-20 py-24 md:py-32 max-w-[1440px] mx-auto overflow-hidden bg-[#fbf9f4]">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 w-full z-10 relative items-center">
        <div className="md:col-span-8 flex flex-col justify-center space-y-6">
          {/* Label Caps */}
          <div className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C5A880] animate-pulse" />
            <span className="text-[11px] md:text-[12px] font-bold tracking-[0.1em] text-zinc-600 uppercase">
              JSM INTEGRATED SERVICES • TAMIL NADU & INDIA
            </span>
          </div>

          {/* Headline Display */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-black tracking-tight leading-[1.05] uppercase">
            ONE PARTNER.<br />
            EVERY SOLUTION.
          </h1>

          {/* Body Large */}
          <p className="text-base sm:text-lg md:text-xl text-zinc-600 max-w-2xl font-normal leading-relaxed">
            Professional security, facility management, manpower and operational support — brought together under one disciplined service partner.
          </p>

          {/* Action Buttons matching Stitch */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href="/services"
              className="inline-flex items-center justify-center bg-black text-white text-[12px] font-bold tracking-[0.1em] px-8 py-4 border-b-2 border-[#C5A880] hover:bg-zinc-800 transition-colors gap-2 uppercase rounded-sm shadow-md"
            >
              EXPLORE SOLUTIONS <ArrowRight size={16} />
            </Link>
            <Link
              href="/trust-center"
              className="inline-flex items-center justify-center bg-white text-black text-[12px] font-bold tracking-[0.1em] px-8 py-4 border border-zinc-300 hover:bg-zinc-100 transition-colors uppercase rounded-sm"
            >
              OUR BLUEPRINT
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-[#C5A880] text-black text-[12px] font-bold tracking-[0.1em] px-8 py-4 hover:bg-[#b59870] transition-colors uppercase rounded-sm shadow-sm"
            >
              REQUEST ASSESSMENT
            </Link>
          </div>
        </div>

        {/* JSM OS Abstract Visual from Stitch */}
        <div className="hidden md:block md:col-span-4 relative h-[460px]">
          <div className="w-full h-full bg-white rounded-2xl overflow-hidden border border-zinc-200/80 shadow-lg p-6 flex flex-col justify-between relative">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 via-white to-zinc-100 opacity-90 -z-0" />
            
            <div className="relative z-10 space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-200/70 pb-3">
                <span className="text-[10px] font-bold tracking-widest text-[#C5A880] uppercase">JSM OPERATING SYSTEM</span>
                <span className="text-[10px] font-mono text-zinc-500">v2.4 ACTIVE</span>
              </div>
              <p className="text-xl font-bold text-black tracking-tight leading-snug">
                Unified Governance across Security, Facilities & Staffing.
              </p>
            </div>

            <div className="relative z-10 space-y-2 text-xs font-semibold text-zinc-700">
              <div className="p-3 bg-white rounded-xl border border-zinc-200/80 flex items-center justify-between shadow-xs">
                <span>Airport & High-Risk Security</span>
                <span className="text-emerald-700 font-mono text-[11px]">VERIFIED</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-zinc-200/80 flex items-center justify-between shadow-xs">
                <span>5-Step Hygiene Framework</span>
                <span className="text-emerald-700 font-mono text-[11px]">SOP 100%</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-zinc-200/80 flex items-center justify-between shadow-xs">
                <span>48-Hour Manpower Surge</span>
                <span className="text-emerald-700 font-mono text-[11px]">READY</span>
              </div>
            </div>

            <div className="relative z-10 pt-3 border-t border-zinc-200/70 flex items-center justify-between text-[11px] text-zinc-500 font-medium">
              <span>Trichy • Chennai • Coimbatore</span>
              <span className="text-black font-bold">24/7 Monitored</span>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle architectural background lines from Stitch */}
      <div className="absolute top-0 right-0 w-1/3 h-full border-l border-zinc-200/60 z-0 hidden md:block" />
      <div className="absolute top-1/2 left-0 w-full h-px bg-zinc-200/60 z-0 hidden md:block" />
    </section>
  );
}
