import React from "react";
import Link from "next/link";
import { Phone, ShieldCheck } from "lucide-react";
import { brandData } from "@/data/brand";

export function CTASection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#0F2A47] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 text-xs font-medium text-[#9C7A3C]">
          <ShieldCheck size={14} />
          <span>Statutory Compliance Guaranteed &bull; Statutory Labour Law Compliant</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-normal tracking-tight max-w-2xl mx-auto">
          Ready to deploy disciplined security or verified workforce?
        </h2>

        <p className="text-sm sm:text-base text-neutral-300 max-w-xl mx-auto leading-relaxed">
          Receive a customized operational proposal and transparent statutory cost estimate for your facility within 24 hours.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          {/* Primary CTA: Solid Brass Accent Button */}
          <Link
            href="/get-quote"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 h-[48px] rounded-[4px] bg-[#9C7A3C] hover:bg-[#866730] text-white text-sm font-semibold transition-colors shadow-subtle press-scale min-touch-target"
          >
            <span>Request a Custom Quote</span>
          </Link>

          {/* Secondary CTA: Clean Outline Button */}
          <a
            href={`tel:${brandData.contact.phone}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 h-[48px] rounded-[4px] border border-white/30 hover:border-white text-white text-sm font-semibold transition-colors tabular-nums press-scale min-touch-target"
          >
            <Phone size={14} className="text-[#9C7A3C]" />
            <span>Call Operations Desk</span>
          </a>
        </div>

        <div className="text-xs text-neutral-400 pt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5">
          <span>100% EPF & ESIC Compliant Act 2005 Compliant</span>
          <span>&bull;</span>
          <span>100% EPF &amp; ESIC Covered</span>
          <span>&bull;</span>
          <span>Contractual 2-Hour SLA</span>
        </div>
      </div>
    </section>
  );
}
