import React from "react";
import Link from "next/link";
import { Phone, ShieldCheck, MessageSquare } from "lucide-react";
import { brandData } from "@/data/brand";

export function CTASection() {
  return (
    <section className="relative py-12 sm:py-16 bg-[#030712] border-t border-cyan-500/20 text-white overflow-hidden bg-security-grid">
      {/* Ambient Cyber Cyan Radial Spotlight */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-tr from-cyan-500/10 via-neutral-900/20 to-transparent blur-[100px] pointer-events-none rounded-full" 
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#080C16] border border-emerald-500/30 text-emerald-300 text-xs font-bold font-mono uppercase tracking-wider shadow-[0_0_12px_rgba(16,185,129,0.15)]">
          <ShieldCheck size={14} className="text-emerald-400" />
          <span>Statutory Compliance Guaranteed &bull; 100% EPF/ESIC</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white font-bold tracking-tight max-w-2xl mx-auto">
          Ready to deploy disciplined security or verified workforce?
        </h2>

        <p className="text-sm sm:text-base text-neutral-300 max-w-xl mx-auto leading-relaxed">
          Audited site deployment proposals and transparent statutory wage breakdowns delivered within 2 hours.
        </p>

        {/* High-Contrast Metric Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#080C16] border border-cyan-500/30 text-cyan-300 font-mono text-[11px] sm:text-xs font-bold tracking-wide shadow-[0_0_10px_rgba(14,165,233,0.15)]">
            2-HOUR TURNAROUND
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#080C16] border border-emerald-500/30 text-emerald-300 font-mono text-[11px] sm:text-xs font-bold tracking-wide shadow-[0_0_10px_rgba(16,185,129,0.15)]">
            ZERO CLIENT LIABILITY
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#080C16] border border-cyan-500/30 text-cyan-300 font-mono text-[11px] sm:text-xs font-bold tracking-wide shadow-[0_0_10px_rgba(14,165,233,0.15)]">
            TRANSPARENT ECR PROOF
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          {/* Primary CTA: Framer Border-Beam Button */}
          <Link
            href="/contact"
            className="w-full sm:w-auto btn-border-beam min-touch-target"
          >
            <span className="btn-border-beam-inner h-[50px] px-8">
              <span>Request Immediate Quote</span>
            </span>
          </Link>

          {/* WhatsApp Direct Trigger */}
          <a
            href={`https://wa.me/${brandData.contact.whatsapp}?text=${encodeURIComponent("Hello JSM Integrated Services, I need an audited deployment proposal and statutory cost estimate within 2 hours.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 h-[50px] rounded-[7px] bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 hover:border-emerald-400 text-emerald-300 hover:text-emerald-200 text-sm font-bold shadow-[0_0_20px_rgba(16,185,129,0.25)] transition-all duration-200 active:scale-[0.98] min-touch-target"
          >
            <MessageSquare size={16} className="text-emerald-400" />
            <span>WhatsApp Quick Deploy</span>
          </a>

          {/* Secondary CTA: Tactical Obsidian Hotline Button */}
          <a
            href={`tel:${brandData.contact.phone}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 h-[50px] rounded-[7px] bg-[#030712] hover:bg-cyan-950/30 border border-cyan-500/30 hover:border-cyan-400/60 text-white hover:text-cyan-200 text-sm font-semibold shadow-[0_0_20px_rgba(14,165,233,0.20)] transition-all duration-200 tabular-nums active:scale-[0.98] min-touch-target"
          >
            <Phone size={14} className="text-cyan-400" />
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
