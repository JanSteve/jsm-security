"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Shield, Users, Sparkles, X } from "lucide-react";

export function QuickQualifierModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    // Check if dismissed within last 7 days
    const dismissedUntil = localStorage.getItem("jsm_qualifier_dismissed_until");
    if (dismissedUntil && Date.now() < Number(dismissedUntil)) {
      return;
    }

    // Trigger after 3.5s or on initial scroll
    let triggered = false;
    const triggerModal = () => {
      if (!triggered) {
        triggered = true;
        setIsOpen(true);
      }
    };

    const timer = setTimeout(triggerModal, 3500);

    const handleScroll = () => {
      if (window.scrollY > 400) {
        triggerModal();
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClose = () => {
    if (dontShowAgain) {
      // 7 days in milliseconds
      const sevenDays = Date.now() + 7 * 24 * 60 * 60 * 1000;
      localStorage.setItem("jsm_qualifier_dismissed_until", String(sevenDays));
    }
    setIsOpen(false);
  };

  const handleSelect = () => {
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border border-[#E5E7EB] rounded-[4px] p-6 sm:p-8 max-w-md w-full shadow-2xl relative text-left">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-[#4A5160] hover:text-[#1A1F2E] p-1.5 min-touch-target flex items-center justify-center cursor-pointer"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="space-y-1.5 pr-6">
          <span className="text-[11px] font-mono text-[#1E5BA8] uppercase tracking-wider font-semibold">
            Instant Facility Routing
          </span>
          <h3 className="text-xl font-semibold text-[#1A1F2E]">
            What do you need?
          </h3>
          <p className="text-xs sm:text-sm text-[#4A5160] leading-relaxed">
            We deliver integrated security guarding, industrial workforce, and facility maintenance. Where should we start?
          </p>
        </div>

        {/* 3 Qualification Pathways */}
        <div className="space-y-2.5 pt-5 pb-4">
          <Link
            href="/security"
            onClick={handleSelect}
            className="flex items-center gap-3.5 p-3.5 rounded-[4px] border border-[#E5E7EB] hover:border-[#0F1922] bg-white hover:bg-[#F8F9FA] transition-colors group press-scale min-touch-target"
          >
            <div className="w-9 h-9 rounded-[4px] bg-[#EFF4F9] text-[#1E5BA8] flex items-center justify-center shrink-0 group-hover:bg-[#0F1922] group-hover:text-white transition-colors">
              <Shield size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-semibold text-[#1A1F2E]">
                Secure My Facility
              </span>
              <span className="text-[11px] text-[#4A5160]">
                PSARA-licensed guards, ESM supervisors, 2-hr relief SLA
              </span>
            </div>
          </Link>

          <Link
            href="/staffing"
            onClick={handleSelect}
            className="flex items-center gap-3.5 p-3.5 rounded-[4px] border border-[#E5E7EB] hover:border-[#0F1922] bg-white hover:bg-[#F8F9FA] transition-colors group press-scale min-touch-target"
          >
            <div className="w-9 h-9 rounded-[4px] bg-[#EFF4F9] text-[#1E5BA8] flex items-center justify-center shrink-0 group-hover:bg-[#0F1922] group-hover:text-white transition-colors">
              <Users size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-semibold text-[#1A1F2E]">
                Hire Contract Workforce
              </span>
              <span className="text-[11px] text-[#4A5160]">
                100% EPF/ESIC compliant plant, assembly &amp; admin staffing
              </span>
            </div>
          </Link>

          <Link
            href="/housekeeping"
            onClick={handleSelect}
            className="flex items-center gap-3.5 p-3.5 rounded-[4px] border border-[#E5E7EB] hover:border-[#0F1922] bg-white hover:bg-[#F8F9FA] transition-colors group press-scale min-touch-target"
          >
            <div className="w-9 h-9 rounded-[4px] bg-[#EFF4F9] text-[#1E5BA8] flex items-center justify-center shrink-0 group-hover:bg-[#0F1922] group-hover:text-white transition-colors">
              <Sparkles size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-semibold text-[#1A1F2E]">
                Facility Maintenance &amp; Hygiene
              </span>
              <span className="text-[11px] text-[#4A5160]">
                5-step closed-loop cleaning, mechanized auto scrubbers
              </span>
            </div>
          </Link>
        </div>

        {/* 7-Day Dismissal Checkbox */}
        <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between text-xs text-[#4A5160]">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="accent-[#0F1922] rounded-[2px]"
            />
            <span className="text-[11px]">Don&apos;t show this again for 7 days</span>
          </label>
          <button
            type="button"
            onClick={handleClose}
            className="text-[11px] font-semibold text-[#1A1F2E] hover:underline"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}
