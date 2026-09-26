import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ShieldCheck, 
  Clock, 
  Award, 
  Eye, 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  FileCheck,
  Building2,
  Factory,
  Hospital,
  Laptop
} from "lucide-react";
import { brandData } from "@/data/brand";
import { SmartCostCalculator } from "@/components/calculator/smart-cost-calculator";

export const metadata = {
  title: "Private Security Guarding & ESM Supervisors | JSM Integrated Services",
  description: "PSARA-licensed Ex-Servicemen & Private Security Guards across Tamil Nadu. Contractual 2-Hour Relief SLA and unannounced 2:00 AM mobile van audits.",
};

const pricingTiers = [
  { guards: "1–2 Guards", baseCost: "₹12,000", withSla: "₹14,400", reliefTime: "2 Hours", idealFor: "Small offices, retail stores, branch banks" },
  { guards: "3–5 Guards", baseCost: "₹18,000", withSla: "₹20,400", reliefTime: "2 Hours", idealFor: "Medium corporate offices, clinics, schools" },
  { guards: "6–10 Guards", baseCost: "₹24,000", withSla: "₹26,400", reliefTime: "2 Hours", idealFor: "Factories, warehouses, IT SEZ gates" },
  { guards: "11+ Guards", baseCost: "Custom Rate", withSla: "Custom Rate", reliefTime: "2 Hours", idealFor: "Aviation terminals, heavy manufacturing plants" },
];

export default function SecurityLandingPage() {
  return (
    <main className="min-h-screen bg-white text-[#1A1F2E] pt-24 pb-20">
      
      {/* Hero Section */}
      <section className="border-b border-[#E5E7EB] pb-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F8F9FA] border border-[#E5E7EB] text-xs font-semibold text-[#1E5BA8]">
                <ShieldCheck size={14} />
                <span>Tier 1 Security &bull; PSARA Licensed &bull; DGR Aligned</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0F1922] leading-tight tracking-tight">
                Enterprise-Grade Security. Founder-Led Accountability.
              </h1>

              <p className="text-sm sm:text-base text-[#4A5160] leading-relaxed line-measure">
                DGR-empanelled, PSARA-licensed guarding forces under direction of Army-Veterans. Backed by an enforceable 2-hour relief replacement guarantee and unannounced 2:00 AM mobile van audits across Tamil Nadu.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  href="/get-quote"
                  className="px-6 h-[48px] rounded-[4px] bg-[#0F1922] hover:bg-[#080D12] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors shadow-subtle min-touch-target"
                >
                  <span>Get Custom Security Quote</span>
                </Link>
                <Link
                  href="/book-assessment"
                  className="px-6 h-[48px] rounded-[4px] border border-[#0F1922] bg-white hover:bg-[#F8F9FA] text-[#0F1922] text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors min-touch-target"
                >
                  <span>Schedule Site Assessment</span>
                </Link>
              </div>

              <div className="pt-4 border-t border-[#E5E7EB] flex flex-wrap gap-4 text-xs text-[#4A5160]">
                <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-[#10A870]" />
                  <span>2-Hour Replacement SLA</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Eye size={14} className="text-[#10A870]" />
                  <span>2:00 AM Night Van Audits</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FileCheck size={14} className="text-[#10A870]" />
                  <span>100% Police Verified</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="border border-[#E5E7EB] bg-[#F8F9FA] relative aspect-[4/3] overflow-hidden shadow-subtle">
                <Image
                  src="/images/real_jsm_airport_terminal_platoon.jpg"
                  alt="JSM Uniformed Security Guard Squad on Site"
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

      {/* Qualifier Grid */}
      <section className="py-14 bg-[#F8F9FA] border-b border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
          <div className="max-w-2xl space-y-1">
            <span className="text-xs font-semibold text-[#1E5BA8] uppercase">Facility Scope</span>
            <h2 className="text-2xl font-serif font-semibold text-[#0F1922]">
              Security Guarding Tailored for Your Environment
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Building2, title: "Corporate Offices", desc: "Bilingual visitor management, badge access & executive escort." },
              { icon: Factory, title: "Factories & Plants", desc: "Dual inward/outward gate passes, baggage checks & shrinkage control." },
              { icon: Hospital, title: "Healthcare Facilities", desc: "Emergency casualty triage crowd regulation & ICU perimeter control." },
              { icon: Laptop, title: "IT Parks & Data Centers", desc: "24/7 continuous shift rotation & sensitive server room access." },
            ].map((sec, idx) => {
              const Icon = sec.icon;
              return (
                <div key={idx} className="p-5 bg-white border border-[#E5E7EB] space-y-2 text-left">
                  <Icon size={20} className="text-[#0F1922]" />
                  <h3 className="text-sm font-semibold text-[#1A1F2E]">{sec.title}</h3>
                  <p className="text-xs text-[#4A5160] leading-relaxed">{sec.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Transparent Pricing Table */}
      <section className="py-16 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
          <div className="max-w-2xl space-y-1">
            <span className="text-xs font-semibold text-[#1E5BA8] uppercase">Transparent Rates</span>
            <h2 className="text-2xl font-serif font-semibold text-[#0F1922]">
              Security Guarding Base &amp; SLA Packages
            </h2>
          </div>

          <div className="overflow-x-auto border border-[#E5E7EB]">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#F8F9FA] border-b border-[#E5E7EB] text-[#1A1F2E] font-semibold">
                <tr>
                  <th className="p-3.5">Guard Force</th>
                  <th className="p-3.5">Base Package</th>
                  <th className="p-3.5">With 2-Hr Relief SLA</th>
                  <th className="p-3.5">Relief Guarantee</th>
                  <th className="p-3.5">Ideal Deployment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {pricingTiers.map((t, idx) => (
                  <tr key={idx} className="hover:bg-[#F8F9FA]/60">
                    <td className="p-3.5 font-semibold text-[#0F1922]">{t.guards}</td>
                    <td className="p-3.5 text-[#4A5160] tabular-nums font-mono">{t.baseCost}/mo</td>
                    <td className="p-3.5 font-semibold text-[#10A870] tabular-nums font-mono">{t.withSla}/mo</td>
                    <td className="p-3.5 text-[#4A5160]">{t.reliefTime}</td>
                    <td className="p-3.5 text-[#4A5160]">{t.idealFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Interactive Calculator */}
      <SmartCostCalculator />

      {/* Direct Closing CTA */}
      <section className="py-14 bg-[#0F1922] text-white">
        <div className="max-w-[1000px] mx-auto px-4 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-white">
            Need immediate security guards deployed to your facility?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-lg mx-auto">
            Our 24/7 operations desk responds within 2 hours. Speak directly with our operations team.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/get-quote"
              className="px-6 h-[44px] rounded-[4px] bg-[#10A870] hover:bg-[#0D875A] text-white text-xs font-semibold flex items-center justify-center"
            >
              Request Fast Deployment Quote
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
