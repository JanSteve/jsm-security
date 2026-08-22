"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { ArrowRight, MessageCircle, Plane, CheckCircle2, Shield, Sparkles, Users } from "lucide-react";
import Link from "next/link";
import { brandData } from "@/data/brand";

export function HeroSection() {
  const cleanWA = brandData.contact.whatsapp.replace(/[^0-9]/g, '');

  return (
    <section className="relative min-h-[88vh] flex items-center px-4 sm:px-6 md:px-12 lg:px-20 pt-28 pb-12 md:py-24 max-w-[1440px] mx-auto bg-[#fbf9f4]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-full items-center">
        {/* Left: Punchy Display Headline & Action Buttons */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-zinc-200 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-extrabold tracking-widest text-zinc-800 uppercase font-mono">
              TAMIL NADU &amp; PAN-INDIA
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-black tracking-[-0.04em] leading-[1.02] uppercase">
            ONE PARTNER.<br />
            <span className="text-[#C5A880]">EVERY SOLUTION.</span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-600 max-w-md font-normal leading-relaxed">
            Disciplined <strong>Private Security</strong>, <strong>Commercial Housekeeping</strong>, and <strong>Contractual Manpower</strong> under one single accountable leader.
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-black hover:bg-zinc-800 text-white text-xs font-black tracking-widest px-8 h-12 rounded-full border-b-2 border-[#C5A880] shadow-lg active:scale-95 transition-all uppercase group"
            >
              <span>REQUEST QUOTE</span>
              <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform text-[#C5A880]" />
            </Link>

            <a
              href={`https://wa.me/${cleanWA}?text=Hi%20JSM%20Integrated%20Services,%20I%20would%20like%20to%20discuss%20our%20facility%20requirements.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 h-12 rounded-full text-xs font-bold text-emerald-950 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition-all shadow-xs active:scale-95"
            >
              <MessageCircle size={15} className="text-emerald-600" />
              <span>WhatsApp Desk</span>
            </a>
          </div>

          <div className="flex items-center gap-6 pt-2 text-xs font-bold text-zinc-700">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-[#C5A880]" /> PSARA Legal
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-[#C5A880]" /> 2-Hour SLA
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-[#C5A880]" /> 100% EPF/ESI
            </span>
          </div>
        </div>

        {/* Right: Full-Bleed Luxury Visual Showcase */}
        <div className="lg:col-span-6">
          <div className="relative w-full h-[360px] sm:h-[440px] md:h-[460px] rounded-3xl overflow-hidden shadow-2xl border border-zinc-300/80 group">
            <Image
              src="/images/airport_operations.jpg"
              alt="JSM Operations Landmark Assignment"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white text-[10px] font-mono font-bold uppercase">
                <Plane size={12} className="text-[#C5A880]" />
                2024 Trichy Airport
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 backdrop-blur-md border border-emerald-500/30 text-emerald-300 text-[10px] font-mono font-bold uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                24/7 Operations
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xl rounded-2xl p-4 border border-white/40 shadow-xl flex items-center justify-between">
              <div>
                <span className="text-[9px] font-mono font-bold tracking-widest text-[#C5A880] uppercase">
                  VERIFIED DEPLOYMENT
                </span>
                <h4 className="text-xs sm:text-sm font-black text-black">
                  Security • Housekeeping • Manpower
                </h4>
              </div>
              <Link
                href="/contact"
                className="px-4 py-2 rounded-full bg-black text-white text-xs font-black uppercase hover:bg-zinc-800 transition-colors"
              >
                Hire Us →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
