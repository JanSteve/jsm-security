"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { ArrowRight, Phone, MessageCircle, ShieldCheck, Sparkles, Users, CheckCircle2, Plane, Clock, Award } from "lucide-react";
import Link from "next/link";
import { brandData } from "@/data/brand";

export function HeroSection() {
  const cleanWA = brandData.contact.whatsapp.replace(/[^0-9]/g, '');

  return (
    <section className="relative min-h-[92vh] flex items-center px-4 sm:px-6 md:px-12 lg:px-20 pt-28 pb-16 md:py-32 max-w-[1440px] mx-auto overflow-x-hidden bg-[#fbf9f4]">
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="hidden lg:block absolute left-1/4 top-0 bottom-0 w-px bg-black/[0.03]" />
        <div className="hidden lg:block absolute left-3/4 top-0 bottom-0 w-px bg-black/[0.03]" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-black/[0.03]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 w-full z-10 relative items-center">
        {/* Left Column: Core Positioning & CTAs */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-6 text-left">
          {/* Subtle Label Caps Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-zinc-200/90 shadow-xs w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-extrabold tracking-[0.14em] text-zinc-700 uppercase font-mono">
              TAMIL NADU &amp; PAN-INDIA OPERATIONS
            </span>
          </div>

          {/* Master Headline Display */}
          <div className="space-y-1">
            <p className="text-xs sm:text-sm font-extrabold tracking-[0.22em] text-[#C5A880] uppercase font-mono">
              JSM INTEGRATED SERVICES
            </p>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-black tracking-[-0.03em] leading-[1.05] uppercase">
              ONE PARTNER.<br />
              <span className="text-zinc-900">EVERY SOLUTION.</span>
            </h1>
          </div>

          {/* Subtitle with calm confidence & clear business language */}
          <p className="text-sm sm:text-base text-zinc-600 max-w-lg font-normal leading-relaxed">
            Eliminate multi-vendor chaos. We coordinate disciplined <strong>Private Security</strong>, <strong>Commercial Housekeeping</strong>, and <strong>Contractual Manpower</strong> under one single accountable partner.
          </p>

          {/* CTA Button Group with clear visual priority */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-black hover:bg-zinc-800 text-white text-xs font-extrabold tracking-widest px-8 h-12 rounded-full border-b-2 border-[#C5A880] shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all uppercase group"
            >
              <span>REQUEST A QUOTE</span>
              <ArrowRight size={15} className="ml-2 group-hover:translate-x-1 transition-transform text-[#C5A880]" />
            </Link>

            <Link
              href="/services"
              className="inline-flex items-center justify-center bg-white hover:bg-zinc-100 text-black text-xs font-bold tracking-widest px-7 h-12 rounded-full border border-zinc-300 hover:border-black transition-all uppercase shadow-xs hover:-translate-y-0.5 active:scale-95"
            >
              EXPLORE SERVICES
            </Link>

            <a
              href={`https://wa.me/${cleanWA}?text=Hi%20JSM%20Integrated%20Services,%20I%20would%20like%20to%20discuss%20our%20facility%20requirements.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 h-12 rounded-full text-xs font-bold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/90 transition-all shadow-xs hover:-translate-y-0.5 active:scale-95 sm:w-auto"
              aria-label="Connect with JSM Desk on WhatsApp"
            >
              <MessageCircle size={16} className="text-emerald-600" />
              <span>WhatsApp Desk</span>
            </a>
          </div>

          {/* Trust Highlights Strip */}
          <div className="pt-4 border-t border-zinc-200/80 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs font-semibold text-zinc-600">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-[#C5A880] flex-shrink-0" />
              <span>PSARA Act Compliant</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-[#C5A880] flex-shrink-0" />
              <span>5-Day Induction Training</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-[#C5A880] flex-shrink-0" />
              <span>2-Hour Replacement SLA</span>
            </div>
          </div>
        </div>

        {/* Right Column: Stunning Photographic Visual Showcase Card */}
        <div className="lg:col-span-6 relative">
          <div className="relative w-full h-[380px] sm:h-[450px] md:h-[480px] rounded-3xl overflow-hidden shadow-2xl border border-zinc-300/80 group">
            {/* Real High-Resolution Hero Operations Image */}
            <Image
              src="/images/airport_operations.jpg"
              alt="JSM Operations - 2024 Trichy International Airport Landmark Assignment"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Luxury Glass Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

            {/* Top Floating Badge */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white text-[10px] font-mono font-bold uppercase shadow-lg">
                <Plane size={13} className="text-[#C5A880]" />
                <span>2024 Trichy Airport Contract</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/80 backdrop-blur-md border border-emerald-500/30 text-emerald-300 text-[10px] font-mono font-bold uppercase shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>24/7 Active Operations</span>
              </div>
            </div>

            {/* Bottom Floating Information Pill Card */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xl rounded-2xl p-4 sm:p-5 border border-white/40 shadow-xl space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-2.5">
                <div>
                  <span className="text-[9px] font-mono font-bold tracking-widest text-[#C5A880] uppercase">
                    INTEGRATED PLATFORM
                  </span>
                  <h4 className="text-sm font-black text-black">
                    Security • Housekeeping • Manpower
                  </h4>
                </div>
                <Link
                  href="/case-studies"
                  className="text-[11px] font-bold text-black hover:text-[#C5A880] flex items-center gap-1 group/link"
                >
                  <span>Track Record</span>
                  <ArrowRight size={12} className="group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              {/* 3 Quick Verified Pill Metrics */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-[#fbf9f4] p-2 rounded-xl border border-zinc-200/70">
                  <div className="text-xs font-black text-black font-mono">100%</div>
                  <div className="text-[9px] text-zinc-500 font-medium">PSARA Legal</div>
                </div>
                <div className="bg-[#fbf9f4] p-2 rounded-xl border border-zinc-200/70">
                  <div className="text-xs font-black text-black font-mono">2-Hour</div>
                  <div className="text-[9px] text-zinc-500 font-medium">Relief SLA</div>
                </div>
                <div className="bg-[#fbf9f4] p-2 rounded-xl border border-zinc-200/70">
                  <div className="text-xs font-black text-black font-mono">2:00 AM</div>
                  <div className="text-[9px] text-zinc-500 font-medium">Night Audits</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
