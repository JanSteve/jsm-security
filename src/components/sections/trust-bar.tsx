"use client";

import React from "react";
import { 
  ShieldCheck, 
  Plane, 
  BadgeCheck, 
  Users, 
  Clock, 
  Award,
  CheckCircle2,
  Building2,
  FileCheck,
  Zap
} from "lucide-react";
import { Marquee } from "@/components/ui/marquee";

const trustItems = [
  {
    tag: "CIVIL AVIATION",
    label: "Trichy International Airport Operations",
    icon: Plane,
    color: "text-amber-600 bg-amber-50"
  },
  {
    tag: "STATUTORY GOVERNANCE",
    label: "PSARA Act (2005) Compliant • TN Home Dept",
    icon: BadgeCheck,
    color: "text-blue-600 bg-blue-50"
  },
  {
    tag: "ACTIVE SUPERVISION",
    label: "2:00 AM Night Supervisor Van Spot-Audits",
    icon: Clock,
    color: "text-purple-600 bg-purple-50"
  },
  {
    tag: "GUARANTEED SLA",
    label: "2-Hour Relief Replacement Guarantee",
    icon: Award,
    color: "text-emerald-600 bg-emerald-50"
  },
  {
    tag: "ZERO CLIENT LIABILITY",
    label: "100% EPF & ESIC Statutory Adherence",
    icon: ShieldCheck,
    color: "text-teal-600 bg-teal-50"
  },
  {
    tag: "VERIFIED MARSHALS",
    label: "5-Day Pre-Deployment Security Induction",
    icon: Users,
    color: "text-indigo-600 bg-indigo-50"
  },
  {
    tag: "GST SAC 998525",
    label: "Licensed Private Guarding & Access Control",
    icon: FileCheck,
    color: "text-amber-600 bg-amber-50"
  },
  {
    tag: "GST SAC 998513",
    label: "Contractual Industrial Staffing Solutions",
    icon: Building2,
    color: "text-rose-600 bg-rose-50"
  },
  {
    tag: "GST SAC 998533",
    label: "5-Step Closed-Loop Facility Sanitization",
    icon: Zap,
    color: "text-emerald-600 bg-emerald-50"
  }
];

export function TrustBar() {
  return (
    <section className="relative border-y border-zinc-200/80 bg-[#fbf9f4] py-4 overflow-hidden">
      {/* Left/Right Gradient Fades */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#fbf9f4] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#fbf9f4] to-transparent z-10" />

      <Marquee pauseOnHover duration={45} gap={16}>
        {trustItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="inline-flex items-center gap-3 px-4 py-2.5 bg-white rounded-2xl border border-zinc-200 shadow-2xs hover:border-[#C5A880] transition-colors"
            >
              <div className={`p-1.5 rounded-xl ${item.color} shrink-0`}>
                <Icon size={15} />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] font-mono font-black text-[#C5A880] uppercase tracking-wider block leading-none">
                  {item.tag}
                </span>
                <span className="text-xs font-bold text-zinc-900 leading-tight block whitespace-nowrap mt-0.5">
                  {item.label}
                </span>
              </div>
            </div>
          );
        })}
      </Marquee>
    </section>
  );
}
