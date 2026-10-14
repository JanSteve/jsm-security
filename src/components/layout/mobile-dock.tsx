"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, MessageSquare, ArrowRight } from "lucide-react";
import { brandData } from "@/data/brand";

export function MobileDock() {
  const [desktopVisible, setDesktopVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setDesktopVisible(true);
      } else {
        setDesktopVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const whatsappUrl = `https://wa.me/${brandData.contact.whatsapp}?text=${encodeURIComponent(
    "Hello JSM Integrated Services, I would like to request an immediate operational deployment proposal."
  )}`;

  return (
    <>
      {/* 1. Pinned Mobile Conversion Dock (< 768px): Persistent, Tactical Obsidian Glass, iOS Safe Area Clearance */}
      <aside
        aria-label="Pinned Mobile Conversion Dock"
        className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-[#080C16]/95 backdrop-blur-2xl border-t border-cyan-500/30 px-3 pt-2 pb-[env(safe-area-inset-bottom,16px)] shadow-[0_-10px_35px_rgba(0,0,0,0.85)]"
      >
        {/* Live Command Radar Telemetry Mini-Strip */}
        <div className="flex items-center justify-between pb-1.5 px-1 max-w-md mx-auto">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_#10B981]" />
            </span>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white">
              24/7 Central Command &bull; Active Muster
            </span>
          </div>
          <span className="text-[9px] font-mono text-cyan-300 font-semibold uppercase tracking-wider">
            2-Hr Relief SLA
          </span>
        </div>

        {/* 3 High-Intent Action Vectors (Strict >= 48px Touch Targets) */}
        <div className="flex items-center gap-2 max-w-md mx-auto">
          {/* Action 1: Direct 1-Tap Phone Dialer Link */}
          <a
            href={`tel:${brandData.contact.phone}`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 h-[48px] min-h-[48px] rounded-lg border border-cyan-500/30 bg-[#030712] text-white text-xs font-semibold hover:border-cyan-400/60 hover:bg-cyan-950/30 active:scale-[0.98] transition-all duration-200 press-scale tabular-nums min-touch-target shadow-[0_0_15px_rgba(14,165,233,0.15)]"
            aria-label="Direct Call JSM Operations Desk"
          >
            <Phone size={14} className="text-cyan-400" />
            <span className="font-semibold tracking-tight">Direct Call</span>
          </a>

          {/* Action 2: WhatsApp Quick Deploy Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 h-[48px] min-h-[48px] rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 hover:text-emerald-200 text-xs font-bold active:scale-[0.98] transition-all duration-200 shadow-[0_0_20px_rgba(16,185,129,0.25)] press-scale min-touch-target"
            aria-label="WhatsApp JSM Operations Quick Deploy"
          >
            <MessageSquare size={14} className="text-emerald-400" />
            <span className="tracking-tight">WhatsApp</span>
          </a>

          {/* Action 3: Instant Commercial Proposal Generator CTA (Cyber Cyan Aura Glow / Border-Beam) */}
          <Link
            href="/get-quote"
            className="flex-1 inline-flex items-center justify-center gap-1.5 h-[48px] min-h-[48px] rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold active:scale-[0.98] transition-all duration-200 shadow-[0_0_25px_rgba(14,165,233,0.35)] hover:shadow-[0_0_35px_rgba(14,165,233,0.50)] press-scale min-touch-target"
            aria-label="Instant Commercial Proposal Generator"
          >
            <span className="tracking-tight">Get Quote</span>
            <ArrowRight size={13} className="text-black" />
          </Link>
        </div>
      </aside>

      {/* 2. Desktop Floating Action Pill (>= 768px): Tactical Obsidian Glass */}
      <aside
        aria-label="Desktop Quick Contact Dock"
        className={`fixed bottom-6 right-6 z-50 hidden md:flex items-center gap-2.5 p-1.5 pl-3.5 rounded-full bg-[#080C16]/95 backdrop-blur-2xl border border-cyan-500/30 shadow-[0_12px_40px_rgba(0,0,0,0.85)] transition-all duration-300 ease-out hover:border-cyan-400/50 ${
          desktopVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-2 pr-1">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_#10B981]" />
          </span>
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-white">
            24/7 COMMAND DESK
          </span>
        </div>

        <div className="h-4 w-px bg-cyan-500/30" />

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 hover:text-emerald-200 text-xs font-bold transition-all shadow-[0_0_12px_rgba(16,185,129,0.2)] active:scale-[0.98]"
          title="Direct WhatsApp Dispatch"
        >
          <MessageSquare size={13} className="text-emerald-400" />
          <span>WhatsApp</span>
        </a>

        <a
          href={`tel:${brandData.contact.phone}`}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#030712] hover:bg-cyan-950/30 border border-cyan-500/30 hover:border-cyan-400/60 text-white text-xs font-semibold transition-all shadow-[0_0_12px_rgba(14,165,233,0.15)] active:scale-[0.98]"
          title="Call Operations Desk"
        >
          <Phone size={12} className="text-cyan-400" />
          <span className="tabular-nums">+91 90808 63448</span>
        </a>

        <Link
          href="/get-quote"
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold transition-all shadow-[0_0_15px_rgba(14,165,233,0.35)] active:scale-[0.98]"
          title="2-Minute Proposal Generator"
        >
          <span>Quote</span>
          <ArrowRight size={12} />
        </Link>
      </aside>
    </>
  );
}
