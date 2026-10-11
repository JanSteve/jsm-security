"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, MessageSquare } from "lucide-react";
import { brandData } from "@/data/brand";

export function MobileDock() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <aside
      aria-label="Mobile Quick Conversion Bar"
      className={`fixed bottom-0 inset-x-0 z-40 md:hidden bg-black/90 backdrop-blur-xl border-t border-white/10 px-4 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-[0_-4px_30px_rgba(0,0,0,0.8)] transition-transform duration-300 ease-in-out ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center gap-2.5 max-w-md mx-auto">
        {/* Button 1: Call Operations Desk */}
        <a
          href={`tel:${brandData.contact.phone}`}
          className="flex-1 inline-flex items-center justify-center gap-2 h-[48px] rounded-[6px] border border-white/20 bg-black/80 text-white text-xs font-semibold hover:bg-white/10 active:bg-white/15 transition-colors press-scale tabular-nums min-touch-target"
          aria-label="Call JSM Operations"
        >
          <Phone size={14} className="text-[#D4AF37]" />
          <span>Call Desk</span>
        </a>

        {/* Button 2: Request Quote / WhatsApp */}
        <Link
          href="/contact"
          className="flex-1 inline-flex items-center justify-center gap-2 h-[48px] rounded-[6px] bg-[#D4AF37] hover:bg-[#E5C158] text-black text-xs font-bold transition-colors shadow-lg press-scale min-touch-target"
          aria-label="Request an Operational Proposal"
        >
          <MessageSquare size={14} />
          <span>Get Quote</span>
        </Link>
      </div>
    </aside>
  );
}
