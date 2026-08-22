"use client";

import { XCircle, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export function ProblemSection() {
  return (
    <section className="bg-white px-4 sm:px-6 md:px-12 lg:px-20 py-16 md:py-24 border-y border-zinc-200/80">
      <div className="max-w-[1440px] mx-auto space-y-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-mono font-bold tracking-widest text-[#C5A880] uppercase">
            WHY ONE PARTNER MATTERS
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-black tracking-tight uppercase">
            Stop Managing 5 Separate Vendors.
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 font-normal">
            Eliminate vendor fragmentation, communication gaps, and administrative chaos.
          </p>
        </div>

        {/* High-Contrast Minimalist Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Fragmented Model */}
          <div className="bg-[#fbf9f4] border border-zinc-200/90 rounded-3xl p-6 sm:p-8 space-y-5">
            <div className="flex items-center gap-2 text-rose-600">
              <XCircle size={20} />
              <h3 className="text-sm font-black uppercase tracking-wider text-black">
                The 5-Vendor Trap
              </h3>
            </div>

            <ul className="space-y-3 text-xs text-zinc-600 font-medium">
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-black">✕</span>
                <span>Separate contracts, multiple invoices &amp; endless vendor calls.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-black">✕</span>
                <span>Security blames cleaners for unlocked gates; no real accountability.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-black">✕</span>
                <span>Unverified relief staff and sudden absenteeism on night shifts.</span>
              </li>
            </ul>
          </div>

          {/* JSM Unified Model */}
          <div className="bg-[#0A1628] text-white border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#C5A880]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center gap-2 text-[#C5A880]">
              <CheckCircle2 size={20} />
              <h3 className="text-sm font-black uppercase tracking-wider text-white">
                The JSM Integrated Solution
              </h3>
            </div>

            <ul className="space-y-3 text-xs text-zinc-200 font-medium">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={14} className="text-[#C5A880] flex-shrink-0 mt-0.5" />
                <span><strong>1 Accountable Manager</strong> &amp; 1 consolidated monthly invoice.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={14} className="text-[#C5A880] flex-shrink-0 mt-0.5" />
                <span><strong>Synchronized SOPs</strong> across entry gates, lobby &amp; work floors.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={14} className="text-[#C5A880] flex-shrink-0 mt-0.5" />
                <span><strong>Guaranteed 2-Hour SLA</strong> with verified reserve staff.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
