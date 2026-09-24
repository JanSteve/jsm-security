"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Phone, ShieldCheck } from "lucide-react";
import { brandData } from "@/data/brand";

export function CTASection() {
  return (
    <section className="py-20 sm:py-24 bg-[#0B3D2E] text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-medium border border-white/15">
          <ShieldCheck size={14} />
          <span>Direct Executive Availability</span>
        </div>

        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white font-normal tracking-tight max-w-3xl mx-auto">
          Ready to deploy disciplined security or verified workforce?
        </h2>

        <p className="text-sm sm:text-base text-emerald-100 max-w-2xl mx-auto leading-relaxed">
          Receive a customized operational proposal and transparent statutory cost estimate for your facility within 24 hours.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href="/get-quote"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-white text-[#0B3D2E] text-sm font-semibold hover:bg-neutral-100 transition-colors shadow-sm press-scale"
          >
            <span>Request a Custom Quote</span>
            <ArrowRight size={15} />
          </Link>

          <a
            href={`tel:${brandData.contact.phone}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-white/10 hover:bg-white/15 text-white border border-white/20 text-sm font-semibold transition-colors tabular-nums press-scale"
          >
            <Phone size={15} className="text-emerald-300" />
            <span>Call Operations Desk</span>
          </a>
        </div>

        <div className="text-[11px] text-emerald-200/80 pt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <span>PSARA Act 2005 Compliant</span>
          <span>&bull;</span>
          <span>100% EPF &amp; ESIC Covered</span>
          <span>&bull;</span>
          <span>2-Hour Replacement SLA</span>
        </div>
      </div>
    </section>
  );
}
