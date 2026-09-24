"use client";

import React from "react";
import { Clock, ShieldCheck, FileCheck, CheckCircle2, Eye, MapPin } from "lucide-react";

const metrics = [
  {
    icon: Clock,
    value: "2 Hours",
    label: "Relief Replacement SLA",
    description: "Guaranteed replacement of any absent guard within 120 minutes from regional reserve pools."
  },
  {
    icon: ShieldCheck,
    value: "100%",
    label: "Police & Aadhaar Verified",
    description: "Every security guard, supervisor, and facility staff member is authenticated before site entry."
  },
  {
    icon: FileCheck,
    value: "5 Days",
    label: "Induction Syllabus",
    description: "Structured pre-deployment training covering fire safety, visitor registers, and emergency protocols."
  },
  {
    icon: CheckCircle2,
    value: "100%",
    label: "Statutory EPF & ESIC",
    description: "Zero client legal liability with transparent monthly wage sheets and verified ECR challans."
  },
  {
    icon: Eye,
    value: "2:00 AM",
    label: "Night Supervisor Audits",
    description: "Unannounced mobile patrol van inspections ensuring alertness during peak vulnerability hours."
  },
  {
    icon: MapPin,
    value: "9 Hubs",
    label: "District Outposts",
    description: "Operational response units in Trichy HQ, Chennai OMR, Coimbatore, Hosur, Salem, Madurai."
  }
];

export function StatsSection() {
  return (
    <section className="py-20 sm:py-24 bg-white border-b border-[#E7E5E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#0B3D2E]">
            Verifiable Standards
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-[#14181F] font-normal tracking-tight">
            Accountability measured by SLA commitments, not vague claims.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {metrics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-xl border border-[#E7E5E0] bg-[#F8F9FA]/60 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-2xl sm:text-3xl font-semibold text-[#0B3D2E] tabular-nums">
                    {item.value}
                  </span>
                  <div className="w-9 h-9 rounded-lg bg-white border border-[#E7E5E0] flex items-center justify-center text-[#0B3D2E]">
                    <Icon size={16} />
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-[#14181F]">
                    {item.label}
                  </h3>
                  <p className="text-xs text-[#5A6578] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
