"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, X, TrendingDown, ArrowRight, ShieldCheck } from "lucide-react";

export function CostComparisonSection() {
  const [activeMode, setActiveMode] = useState<"both" | "in-house" | "outsourced">("both");

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#E5E7EB]" id="cost-comparison">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-2 text-left">
          <div className="text-xs font-semibold text-[#1E5BA8] uppercase tracking-wider">
            Financial &amp; Statutory Comparison
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-[38px] leading-[1.18] text-[#1A1F2E] font-semibold tracking-[-0.01em]">
            Why outsource? The numbers speak for themselves.
          </h2>
          <p className="text-sm sm:text-base text-[#4A5160] leading-relaxed line-measure">
            Direct hiring exposes companies to absenteeism, HR overhead, and severe co-employer labour penalties. Compare the transparent economics below.
          </p>
        </div>

        {/* Comparison Toggle for Mobile / Self-Segmentation */}
        <div className="flex sm:hidden p-1 bg-[#F8F9FA] border border-[#E5E7EB] rounded-[4px]">
          <button
            type="button"
            onClick={() => setActiveMode("both")}
            className={`flex-1 py-2 text-xs font-semibold rounded-[2px] transition-colors ${
              activeMode === "both" ? "bg-[#0F1922] text-white" : "text-[#4A5160]"
            }`}
          >
            Side-by-Side
          </button>
          <button
            type="button"
            onClick={() => setActiveMode("in-house")}
            className={`flex-1 py-2 text-xs font-semibold rounded-[2px] transition-colors ${
              activeMode === "in-house" ? "bg-[#0F1922] text-white" : "text-[#4A5160]"
            }`}
          >
            In-House
          </button>
          <button
            type="button"
            onClick={() => setActiveMode("outsourced")}
            className={`flex-1 py-2 text-xs font-semibold rounded-[2px] transition-colors ${
              activeMode === "outsourced" ? "bg-[#0F1922] text-white" : "text-[#4A5160]"
            }`}
          >
            JSM Managed
          </button>
        </div>

        {/* Side by Side Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          
          {/* Card 1: Direct In-House Hiring */}
          {(activeMode === "both" || activeMode === "in-house") && (
            <div className="p-6 sm:p-8 bg-[#F8F9FA] border border-[#E5E7EB] flex flex-col justify-between space-y-6 text-left">
              <div className="space-y-4">
                <div className="border-b border-[#E5E7EB] pb-3 flex justify-between items-baseline">
                  <div>
                    <h3 className="text-lg font-semibold text-[#1A1F2E]">
                      Direct In-House Hiring
                    </h3>
                    <p className="text-xs text-[#4A5160]">Typical 50-person commercial facility</p>
                  </div>
                  <span className="text-xs font-mono font-semibold text-[#D97757] bg-[#FDF4F0] px-2 py-0.5 border border-[#D97757]/20">
                    High Risk &amp; Overhead
                  </span>
                </div>

                {/* Line Items */}
                <div className="space-y-2 text-xs text-[#4A5160]">
                  <div className="flex justify-between">
                    <span>Monthly Salary (2 guards + staff):</span>
                    <span className="font-semibold text-[#1A1F2E] tabular-nums">₹56,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Statutory EPF, ESIC, Medical &amp; Bonus:</span>
                    <span className="font-semibold text-[#1A1F2E] tabular-nums">₹10,400</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Uniforms, Torches &amp; Training Equipment:</span>
                    <span className="font-semibold text-[#1A1F2E] tabular-nums">₹8,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Absenteeism Relief &amp; Overtime Cover:</span>
                    <span className="font-semibold text-[#1A1F2E] tabular-nums">₹5,000</span>
                  </div>
                  <div className="pt-2 border-t border-[#E5E7EB] flex justify-between font-bold text-sm text-[#1A1F2E]">
                    <span>Total In-House Monthly:</span>
                    <span className="tabular-nums">₹79,400</span>
                  </div>
                </div>

                {/* Hidden Costs */}
                <div className="pt-3 border-t border-[#E5E7EB] space-y-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#D97757]">
                    Hidden Costs &amp; Liabilities:
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#4A5160]">
                    <li className="flex items-start gap-2">
                      <X size={14} className="text-[#D97757] shrink-0 mt-0.5" />
                      <span>Internal HR &amp; payroll administrative bandwidth</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <X size={14} className="text-[#D97757] shrink-0 mt-0.5" />
                      <span>Repeated recruitment overhead when staff abruptly quits</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <X size={14} className="text-[#D97757] shrink-0 mt-0.5" />
                      <span>Statutory labour audit exposure &amp; co-employer penalties</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <X size={14} className="text-[#D97757] shrink-0 mt-0.5" />
                      <span>Company bears full liability for on-duty workplace mishaps</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-3 bg-white border border-[#E5E7EB] text-[11px] text-[#4A5160]">
                Requires ongoing executive supervision with zero SLA fallback.
              </div>
            </div>
          )}

          {/* Card 2: Outsourced via JSM */}
          {(activeMode === "both" || activeMode === "outsourced") && (
            <div className="p-6 sm:p-8 bg-white border-2 border-[#10A870] flex flex-col justify-between space-y-6 text-left shadow-subtle relative">
              <div className="space-y-4">
                <div className="border-b border-[#E5E7EB] pb-3 flex justify-between items-baseline">
                  <div>
                    <h3 className="text-lg font-semibold text-[#1A1F2E]">
                      Outsourced via JSM Integrated Services
                    </h3>
                    <p className="text-xs text-[#4A5160]">All-inclusive single accountable contract</p>
                  </div>
                  <span className="text-xs font-mono font-semibold text-[#10A870] bg-[#E8F8F2] px-2 py-0.5 border border-[#10A870]/30">
                    SLA Guaranteed
                  </span>
                </div>

                {/* Line Items */}
                <div className="space-y-2 text-xs text-[#4A5160]">
                  <div className="flex justify-between">
                    <span>Guarding (2 PSARA Licensed Guards):</span>
                    <span className="font-semibold text-[#1A1F2E] tabular-nums">₹32,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mechanized Housekeeping (3x/week):</span>
                    <span className="font-semibold text-[#1A1F2E] tabular-nums">₹6,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Flexible Contract Workforce / Support:</span>
                    <span className="font-semibold text-[#1A1F2E] tabular-nums">₹24,000</span>
                  </div>
                  <div className="flex justify-between text-[#10A870] font-medium">
                    <span>Includes 2-Hour Relief SLA &amp; Audit Logs:</span>
                    <span className="tabular-nums">Included</span>
                  </div>
                  <div className="pt-2 border-t border-[#E5E7EB] flex justify-between font-bold text-sm text-[#0F1922]">
                    <span>Total JSM Monthly:</span>
                    <span className="tabular-nums text-[#10A870]">₹62,000</span>
                  </div>
                </div>

                {/* Included Benefits */}
                <div className="pt-3 border-t border-[#E5E7EB] space-y-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#10A870]">
                    What&apos;s Included In Every JSM Contract:
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#1A1F2E]">
                    <li className="flex items-start gap-2">
                      <Check size={14} className="text-[#10A870] shrink-0 mt-0.5" />
                      <span><strong>2-Hour Relief SLA</strong> (Guaranteed replacement from reserve pool)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={14} className="text-[#10A870] shrink-0 mt-0.5" />
                      <span><strong>Monthly Founder Audits</strong> &amp; 2:00 AM patrol van inspections</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={14} className="text-[#10A870] shrink-0 mt-0.5" />
                      <span><strong>100% EPF/ESIC Legal Indemnity</strong> (Verified monthly ECR challans)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={14} className="text-[#10A870] shrink-0 mt-0.5" />
                      <span><strong>Zero Hiring Overhead</strong> with 24-hour on-call replacements</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Savings Box */}
              <div className="p-4 bg-[#E8F8F2] border border-[#10A870]/30 rounded-[4px] space-y-1 text-left">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#10A870]">
                  <TrendingDown size={16} />
                  <span>Direct Annual Savings vs. In-House:</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-[#0F1922] tabular-nums">
                  Save ₹17,400 / month (₹2,08,800 / year)
                </div>
                <div className="text-[11px] text-[#4A5160]">
                  Plus elimination of legal compliance risks, HR overhead, and recruitment delays.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Direct CTA */}
        <div className="p-6 bg-[#0F1922] text-white flex flex-col sm:flex-row items-center justify-between gap-4 rounded-[4px] text-left">
          <div>
            <h4 className="text-base font-semibold text-white">
              Ready to eliminate internal hiring overhead for your facility?
            </h4>
            <p className="text-xs text-neutral-300">
              Get an official line-item cost proposal tailored to your headcount and shift requirements.
            </p>
          </div>
          <Link
            href="/get-quote"
            className="px-6 h-[44px] rounded-[4px] bg-[#10A870] hover:bg-[#0D875A] text-white text-xs font-semibold flex items-center gap-2 transition-colors shrink-0 shadow-subtle press-scale min-touch-target"
          >
            <span>Get Custom Cost Comparison</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
