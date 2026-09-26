import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Users, 
  CheckCircle2, 
  Clock, 
  FileCheck, 
  ShieldCheck, 
  Phone, 
  Building2, 
  Factory, 
  ArrowRight 
} from "lucide-react";
import { brandData } from "@/data/brand";
import { SmartCostCalculator } from "@/components/calculator/smart-cost-calculator";

export const metadata = {
  title: "Contract Staffing & Industrial Manpower Supply | JSM Integrated Services",
  description: "100% EPF/ESIC-compliant contract staffing and industrial workforce solutions across Tamil Nadu. Rapid 48-hour batch deployment and zero client co-employer liability.",
};

const staffingRoles = [
  { role: "Factory Line & Assembly Operators", rate: "₹18,000 – ₹22,000 / worker", speed: "48-Hour Batch", coverage: "Manufacturing, electronics, auto-components" },
  { role: "Warehouse Loaders & Material Handlers", rate: "₹17,500 – ₹21,000 / worker", speed: "24–48 Hours", coverage: "Logistics hubs, retail distribution, supply chain" },
  { role: "Corporate Office Clerical & Data Staff", rate: "₹22,000 – ₹32,000 / worker", speed: "72 Hours", coverage: "Reception, front desk, billing, OCR data entry" },
  { role: "Licensed Technicians (Electricians / HVAC)", rate: "₹20,000 – ₹30,000 / worker", speed: "48 Hours", coverage: "Commercial facilities, IT parks, hospital maintenance" },
];

export default function StaffingLandingPage() {
  return (
    <main className="min-h-screen bg-white text-[#1A1F2E] pt-24 pb-20">
      
      {/* Hero Section */}
      <section className="border-b border-[#E5E7EB] pb-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F8F9FA] border border-[#E5E7EB] text-xs font-semibold text-[#1E5BA8]">
                <Users size={14} />
                <span>Tier 2 Staffing &bull; SAC 998513 &bull; 100% EPF &amp; ESIC</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0F1922] leading-tight tracking-tight">
                Verified Industrial Workforce &amp; Contract Staffing.
              </h1>

              <p className="text-sm sm:text-base text-[#4A5160] leading-relaxed line-measure">
                Eliminate hiring overhead and statutory compliance risk. JSM deploys pre-vetted factory line operators, warehouse workforce, and corporate administrative staff across Tamil Nadu with full monthly ECR challan verification.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  href="/get-quote"
                  className="px-6 h-[48px] rounded-[4px] bg-[#0F1922] hover:bg-[#080D12] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors shadow-subtle min-touch-target"
                >
                  <span>Get Manpower Proposal</span>
                </Link>
                <Link
                  href="/book-assessment"
                  className="px-6 h-[48px] rounded-[4px] border border-[#0F1922] bg-white hover:bg-[#F8F9FA] text-[#0F1922] text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors min-touch-target"
                >
                  <span>Schedule Workforce Audit</span>
                </Link>
              </div>

              <div className="pt-4 border-t border-[#E5E7EB] flex flex-wrap gap-4 text-xs text-[#4A5160]">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-[#10A870]" />
                  <span>Zero Client Co-Employer Liability</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-[#10A870]" />
                  <span>48-Hour Rapid Mobilization</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FileCheck size={14} className="text-[#10A870]" />
                  <span>Monthly ECR Challan Receipts</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="border border-[#E5E7EB] bg-[#F8F9FA] relative aspect-[4/3] overflow-hidden shadow-subtle">
                <Image
                  src="/images/real_jsm_shift_muster_day.jpg"
                  alt="JSM Workforce Briefing & Shift Inspection"
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

      {/* Staffing Roles Table */}
      <section className="py-16 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
          <div className="max-w-2xl space-y-1">
            <span className="text-xs font-semibold text-[#1E5BA8] uppercase">Transparent Wage Structures</span>
            <h2 className="text-2xl font-serif font-semibold text-[#0F1922]">
              Standard Roles &amp; Monthly Rates
            </h2>
          </div>

          <div className="overflow-x-auto border border-[#E5E7EB]">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#F8F9FA] border-b border-[#E5E7EB] text-[#1A1F2E] font-semibold">
                <tr>
                  <th className="p-3.5">Workforce Category</th>
                  <th className="p-3.5">Estimated Cost Range</th>
                  <th className="p-3.5">Mobilization Speed</th>
                  <th className="p-3.5">Key Industry Deployment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {staffingRoles.map((r, idx) => (
                  <tr key={idx} className="hover:bg-[#F8F9FA]/60">
                    <td className="p-3.5 font-semibold text-[#0F1922]">{r.role}</td>
                    <td className="p-3.5 text-[#10A870] font-semibold tabular-nums font-mono">{r.rate}</td>
                    <td className="p-3.5 text-[#4A5160]">{r.speed}</td>
                    <td className="p-3.5 text-[#4A5160]">{r.coverage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Interactive Cost Calculator */}
      <SmartCostCalculator />

      {/* Closing CTA */}
      <section className="py-14 bg-[#0F1922] text-white">
        <div className="max-w-[1000px] mx-auto px-4 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-white">
            Need skilled contract manpower for your upcoming project?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-lg mx-auto">
            Discuss headcount, shift schedules, and statutory ECR compliance with our commercial desk.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/get-quote"
              className="px-6 h-[44px] rounded-[4px] bg-[#10A870] hover:bg-[#0D875A] text-white text-xs font-semibold flex items-center justify-center"
            >
              Request Manpower Proposal
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
