import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  FileCheck, 
  ShieldCheck, 
  Phone, 
  Building2, 
  Hospital, 
  Factory, 
  ArrowRight 
} from "lucide-react";
import { brandData } from "@/data/brand";
import { SmartCostCalculator } from "@/components/calculator/smart-cost-calculator";

export const metadata = {
  title: "Commercial Housekeeping & Facility Management | JSM Integrated Services",
  description: "Mechanized commercial housekeeping, hospital-grade sanitation, and integrated facility management across Tamil Nadu under a 5-step closed-loop hygiene protocol.",
};

export default function HousekeepingLandingPage() {
  return (
    <main className="min-h-screen bg-white text-[#1A1F2E] pt-24 pb-20">
      
      {/* Hero Section */}
      <section className="border-b border-[#E5E7EB] pb-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F8F9FA] border border-[#E5E7EB] text-xs font-semibold text-[#1E5BA8]">
                <Sparkles size={14} />
                <span>Tier 3 Facility Management &bull; SAC 998533 &bull; Closed-Loop Hygiene</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0F1922] leading-tight tracking-tight">
                Integrated Facility Management &amp; Mechanized Hygiene.
              </h1>

              <p className="text-sm sm:text-base text-[#4A5160] leading-relaxed line-measure">
                Commercial and industrial facility hygiene adhering to a rigorous 5-step closed-loop cleaning protocol (Clean &rarr; Inspect &rarr; Report &rarr; Correct &rarr; Verify) with ride-on auto scrubbers and hospital-grade sanitization chemicals.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  href="/get-quote"
                  className="px-6 h-[48px] rounded-[4px] bg-[#0F1922] hover:bg-[#080D12] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors shadow-subtle min-touch-target"
                >
                  <span>Get Facility Quote</span>
                </Link>
                <Link
                  href="/book-assessment"
                  className="px-6 h-[48px] rounded-[4px] border border-[#0F1922] bg-white hover:bg-[#F8F9FA] text-[#0F1922] text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors min-touch-target"
                >
                  <span>Schedule Site Audit</span>
                </Link>
              </div>

              <div className="pt-4 border-t border-[#E5E7EB] flex flex-wrap gap-4 text-xs text-[#4A5160]">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-[#10A870]" />
                  <span>Hospital-Grade Chemicals</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-[#10A870]" />
                  <span>Hourly Restroom Inspection Logs</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FileCheck size={14} className="text-[#10A870]" />
                  <span>Color-Coded Microfiber System</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="border border-[#E5E7EB] bg-[#F8F9FA] relative aspect-[4/3] overflow-hidden shadow-subtle">
                <Image
                  src="/images/real_jsm_welcome_trichy_salute.jpg"
                  alt="JSM Facility Operations Team"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Step Hygiene Protocol */}
      <section className="py-14 bg-[#F8F9FA] border-b border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
          <div className="max-w-2xl space-y-1">
            <span className="text-xs font-semibold text-[#1E5BA8] uppercase">Standard Operating Procedure</span>
            <h2 className="text-2xl font-serif font-semibold text-[#0F1922]">
              The 5-Step Closed-Loop Hygiene Standard
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {[
              { step: "Step 1", title: "Clean", desc: "Mechanized auto-scrubbing with neutral floor disinfectants." },
              { step: "Step 2", title: "Inspect", desc: "Supervisor audit against hourly digital hygiene checklist." },
              { step: "Step 3", title: "Report", desc: "Real-time anomaly & consumable replenishment logging." },
              { step: "Step 4", title: "Correct", desc: "Immediate rectification of any non-conforming surface." },
              { step: "Step 5", title: "Verify", desc: "Facility administrator sign-off on daily shift register." },
            ].map((s, idx) => (
              <div key={idx} className="p-4 bg-white border border-[#E5E7EB] space-y-1.5 text-left">
                <span className="text-[10px] font-mono font-bold text-[#1E5BA8]">{s.step}</span>
                <h3 className="text-xs sm:text-sm font-semibold text-[#1A1F2E]">{s.title}</h3>
                <p className="text-[11px] text-[#4A5160] leading-normal">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Calculator */}
      <SmartCostCalculator />

      {/* Closing CTA */}
      <section className="py-14 bg-[#0F1922] text-white">
        <div className="max-w-[1000px] mx-auto px-4 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-white">
            Upgrade your facility hygiene standard today.
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-lg mx-auto">
            Get an instant commercial estimate based on your square footage and shift frequency.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/get-quote"
              className="px-6 h-[44px] rounded-[4px] bg-[#10A870] hover:bg-[#0D875A] text-white text-xs font-semibold flex items-center justify-center"
            >
              Request Commercial Cleaning Quote
            </Link>
            <a
              href={`tel:${brandData.contact.phone}`}
              className="px-6 h-[44px] rounded-[4px] border border-white/30 text-white text-xs font-semibold flex items-center justify-center gap-2"
            >
              <Phone size={14} />
              <span>Call Operations Desk</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
