"use client";

import { XCircle, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export function ProblemSection() {
  return (
    <section className="bg-white px-4 sm:px-6 md:px-12 lg:px-20 py-16 md:py-24 border-y border-black/[0.08]">
      <div className="max-w-[1440px] mx-auto space-y-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#0071e3]">
            OPERATIONAL RESILIENCE &bull; UNIFIED COMMAND
          </span>
          <h2 className="text-2xl sm:text-4xl font-semibold text-[#1d1d1f] tracking-tight">
            Stop Managing 5 Separate Vendors.
          </h2>
          <p className="text-xs sm:text-sm text-[#86868b] font-normal">
            Eliminate vendor fragmentation, communication gaps, and administrative chaos.
          </p>
        </div>

        {/* High-Contrast Apple Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Fragmented Model */}
          <div className="bg-[#f5f5f7] border border-black/[0.06] rounded-[28px] p-6 sm:p-8 space-y-5 shadow-sm">
            <div className="flex items-center gap-2 text-rose-600">
              <XCircle size={20} />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#1d1d1f]">
                The 5-Vendor Trap
              </h3>
            </div>

            <ul className="space-y-3 text-xs text-[#515154] font-normal">
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold">✕</span>
                <span>Separate contracts, multiple invoices &amp; endless vendor calls.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold">✕</span>
                <span>Security blames cleaners for unlocked gates; no real accountability.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold">✕</span>
                <span>Unverified relief staff and sudden absenteeism on night shifts.</span>
              </li>
            </ul>
          </div>

          {/* JSM Unified Model */}
          <div className="bg-white text-[#1d1d1f] border border-[#0071e3]/30 rounded-[28px] p-6 sm:p-8 space-y-5 shadow-[0_8px_30px_rgba(0,113,227,0.06)] relative overflow-hidden ring-1 ring-[#0071e3]/20">
            <div className="flex items-center gap-2 text-[#0071e3]">
              <CheckCircle2 size={20} />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#1d1d1f]">
                The JSM Integrated Solution
              </h3>
            </div>

            <ul className="space-y-3 text-xs text-[#1d1d1f] font-medium">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={15} className="text-[#0071e3] flex-shrink-0 mt-0.5" />
                <span><strong className="text-black font-semibold">1 Accountable Manager</strong> &amp; 1 consolidated monthly invoice.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={15} className="text-[#0071e3] flex-shrink-0 mt-0.5" />
                <span><strong className="text-black font-semibold">Synchronized SOPs</strong> across entry gates, lobby &amp; work floors.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={15} className="text-[#0071e3] flex-shrink-0 mt-0.5" />
                <span><strong className="text-black font-semibold">Guaranteed 2-Hour SLA</strong> with verified reserve staff.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
