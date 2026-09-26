"use client";

import React from "react";
import { ShieldCheck, Award, FileCheck, CheckCircle2, Plane } from "lucide-react";

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
    icon: Plane,
    title: "Aviation Benchmark",
    subtitle: "Trichy Airport Operations Contract",
  },
];

export function TrustBar() {
  return (
    <section className="bg-[#F6F7F9] border-b border-[#E4E7EC] py-5 sm:py-6">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 items-center">
          {credentials.map((cred, idx) => {
            const Icon = cred.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3 p-2 bg-white border border-[#E4E7EC] text-left"
              >
                <div className="w-8 h-8 rounded-[4px] bg-[#F6F7F9] border border-[#E4E7EC] flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-[#0F2A47]" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-semibold text-[#14181F] leading-tight truncate">
                    {cred.title}
                  </span>
                  <span className="text-[11px] text-[#4A5160] leading-tight truncate">
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
