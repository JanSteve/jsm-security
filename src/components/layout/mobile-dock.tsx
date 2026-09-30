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
      className={`fixed bottom-0 inset-x-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-[#E4E7EC] px-4 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-in-out ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center gap-2.5 max-w-md mx-auto">
        {/* Button 1: Call Operations Desk */}
        <a
          href={`tel:${brandData.contact.phone}`}
          className="flex-1 inline-flex items-center justify-center gap-2 h-[48px] rounded-[4px] border border-[#0F2A47] bg-white text-[#0F2A47] text-xs font-semibold hover:bg-neutral-50 active:bg-neutral-100 transition-colors press-scale tabular-nums min-touch-target"
          aria-label="Call JSM Operations"
        >
          <Phone size={14} className="text-[#0F2A47]" />
          <span>Call Desk</span>
        </a>

        {/* Button 2: Request Quote / WhatsApp */}
        <Link
          href="/get-quote"
          className="flex-1 inline-flex items-center justify-center gap-2 h-[48px] rounded-[4px] bg-[#0F2A47] text-white text-xs font-semibold hover:bg-[#0A1E33] active:bg-[#081726] transition-colors shadow-subtle press-scale min-touch-target"
          aria-label="Request an Operational Proposal"
        >
          <MessageSquare size={14} />
          <span>Get a Quote</span>
        </Link>
      </div>
    </aside>
  );
}
