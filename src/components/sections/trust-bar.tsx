"use client";

import React from "react";
import { ShieldCheck, Award, FileCheck, CheckCircle2, Building2 } from "lucide-react";

const credentials = [
  {
    icon: ShieldCheck,
    title: "PSARA 2005 Licensed",
    subtitle: "Home Dept, Govt of Tamil Nadu",
  },
  {
    icon: Award,
    title: "ISO 9001:2015 Certified",
    subtitle: "Audited Quality Management",
  },
  {
    icon: FileCheck,
    title: "DGR / MoD Aligned",
    subtitle: "Ex-Servicemen Welfare Resettlement",
  },
  {
    icon: CheckCircle2,
    title: "100% EPF & ESIC Compliant",
    subtitle: "Zero Statutory Client Liability",
  },
  {
    icon: Building2,
    title: "Aviation Benchmark",
    subtitle: "Trichy Airport Operations Contract",
  },
];

export function TrustBar() {
  return (
    <section className="bg-[#F8F9FA] border-b border-[#E7E5E0] py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 items-center">
          {credentials.map((cred, idx) => {
            const Icon = cred.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3.5 p-2 rounded-lg"
              >
                <div className="w-10 h-10 rounded-lg bg-white border border-[#E7E5E0] flex items-center justify-center shrink-0 shadow-2xs">
                  <Icon size={18} className="text-[#0B3D2E]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-semibold text-[#14181F] leading-tight">
                    {cred.title}
                  </span>
                  <span className="text-[11px] text-[#5A6578] leading-tight">
                    {cred.subtitle}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
