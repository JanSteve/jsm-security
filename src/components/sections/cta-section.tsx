import React from "react";
import Link from "next/link";
import { Phone, ShieldCheck, MessageSquare } from "lucide-react";
import { brandData } from "@/data/brand";

export function CTASection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#070A0F] border-t border-white/10 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-white font-mono uppercase tracking-wider">
          <ShieldCheck size={14} />
          <span>Statutory Compliance Guaranteed &bull; 100% EPF/ESIC</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-bold tracking-tight max-w-2xl mx-auto">
          Ready to deploy disciplined security or verified workforce?
        </h2>

        <p className="text-sm sm:text-base text-neutral-300 max-w-xl mx-auto leading-relaxed">
          Get an audited site deployment proposal and transparent statutory cost estimate within 2 hours.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          {/* Primary CTA: Tactile Pure White Button */}
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 h-[50px] rounded-[6px] bg-white hover:bg-neutral-200 text-black text-sm font-bold transition-all shadow-xl press-scale min-touch-target"
          >
            <span>Request Immediate Quote</span>
          </Link>

          {/* WhatsApp Direct Trigger */}
          <a
            href={`https://wa.me/${brandData.contact.whatsapp}?text=${encodeURIComponent("Hello JSM Integrated Services, I need an audited deployment proposal and statutory cost estimate within 2 hours.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 h-[50px] rounded-[6px] bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/40 text-[#25D366] text-sm font-bold transition-all press-scale min-touch-target"
          >
            <MessageSquare size={16} />
            <span>WhatsApp Quick Deploy</span>
          </a>

          {/* Secondary CTA: Clean Outline Button */}
          <a
            href={`tel:${brandData.contact.phone}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 h-[50px] rounded-[6px] border border-white/25 hover:border-white text-white text-sm font-semibold transition-all tabular-nums press-scale min-touch-target"
          >
            <Phone size={14} className="text-white" />
            <span>Call Desk: {brandData.contact.phoneDisplay}</span>
          </a>
        </div>

        <div className="text-xs text-neutral-400 pt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5">
          <span>Airports Authority of India Benchmark</span>
          <span>&bull;</span>
          <span>100% EPF &amp; ESIC Covered</span>
          <span>&bull;</span>
          <span>2-Hour Replacement SLA</span>
        </div>
      </div>
    </section>
  );
}
