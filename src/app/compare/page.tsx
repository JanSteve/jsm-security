import React from "react";
import Link from "next/link";
import { CostComparisonSection } from "@/components/sections/cost-comparison-section";
import { SmartCostCalculator } from "@/components/calculator/smart-cost-calculator";
import { ShieldCheck, TrendingDown, Clock, FileCheck } from "lucide-react";
import { brandData } from "@/data/brand";

export const metadata = {
  title: "In-House vs. Outsourced Security & Facility Management | JSM Cost Comparison",
  description: "Detailed financial and statutory cost comparison between hiring direct in-house guards versus outsourcing to PSARA-licensed JSM Integrated Services in Tamil Nadu.",
};

export default function CompareHubPage() {
  return (
    <main className="min-h-screen bg-white text-[#1A1F2E] pt-24 pb-20">
      
      {/* Header */}
      <section className="border-b border-[#E5E7EB] pb-12">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F8F9FA] border border-[#E5E7EB] text-xs font-semibold text-[#1E5BA8]">
            <TrendingDown size={14} />
            <span>ROI &amp; Risk Mitigation Architecture</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0F1922] tracking-tight">
            In-House Hiring vs. Outsourced Partner Matrix
          </h1>
          <p className="text-sm sm:text-base text-[#4A5160] max-w-3xl leading-relaxed">
            Direct employment incurs hidden overheads: EPF/ESIC co-employer liabilities, paid absenteeism covers, uniform replenishment, and HR bandwidth. Discover how JSM eliminates non-core operational drag.
          </p>
        </div>
      </section>

      {/* Comparison Section */}
      <CostComparisonSection />

      {/* Interactive Calculator */}
      <SmartCostCalculator />
    </main>
  );
}
