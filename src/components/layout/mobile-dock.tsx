"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, MessageSquare, ArrowRight } from "lucide-react";
import { brandData } from "@/data/brand";

export function MobileDock() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setVisible(true);
      } else {
        setVisible(false);
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
      {/* 1. Mobile Quick Conversion Bar (< 768px) */}
      <aside
        aria-label="Mobile Quick Conversion Bar"
        className={`fixed bottom-0 inset-x-0 z-40 md:hidden bg-black/95 backdrop-blur-xl border-t border-white/15 px-3 pt-2 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-[0_-4px_30px_rgba(0,0,0,0.9)] transition-transform duration-300 ease-in-out ${
          visible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center gap-2 max-w-md mx-auto">
          {/* Button 1: Call Operations Desk */}
          <a
            href={`tel:${brandData.contact.phone}`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 h-[44px] rounded-lg border border-white/20 bg-white/5 text-white text-xs font-semibold hover:bg-white/10 active:bg-white/15 transition-colors press-scale tabular-nums min-touch-target"
            aria-label="Call JSM Operations"
          >
            <Phone size={13} className="text-white" />
            <span>Call</span>
          </a>

          {/* Button 2: WhatsApp Quick Deploy */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 h-[44px] rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-400 text-xs font-bold transition-colors shadow-lg press-scale min-touch-target"
            aria-label="WhatsApp JSM Operations"
          >
            <MessageSquare size={13} className="text-emerald-400" />
            <span>WhatsApp</span>
          </a>

          {/* Button 3: 2-Min Proposal Generator */}
          <Link
            href="/get-quote"
            className="flex-1 inline-flex items-center justify-center gap-1.5 h-[44px] rounded-lg bg-white hover:bg-neutral-200 text-black text-xs font-bold transition-colors shadow-xl press-scale min-touch-target"
            aria-label="2-Minute Proposal Generator"
          >
            <span>Quote</span>
            <ArrowRight size={12} />
          </Link>
        </div>
      </aside>

      {/* 2. Desktop Floating Action Pill (>= 768px) */}
      <aside
        aria-label="Desktop Quick Contact Dock"
        className={`fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2.5 p-1.5 pl-3.5 rounded-full bg-black/90 backdrop-blur-2xl border border-white/20 shadow-[0_12px_40px_rgba(0,0,0,0.8)] transition-all duration-300 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-2 pr-1">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-white">
            Command Desk
          </span>
        </div>

        <div className="h-4 w-px bg-white/15" />

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 hover:text-emerald-300 text-xs font-bold transition-colors shadow-sm"
          title="Direct WhatsApp Dispatch"
        >
          <MessageSquare size={13} />
          <span>WhatsApp</span>
        </a>

        <a
          href={`tel:${brandData.contact.phone}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold transition-colors"
          title="Call Operations Desk"
        >
          <Phone size={12} />
          <span>+91 90808 63448</span>
        </a>
      </aside>
    </>
  );
}
