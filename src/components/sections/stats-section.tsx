"use client";

import React, { useState, useEffect, useRef } from "react";
import { Clock, ShieldCheck, CheckCircle2, Eye, FileCheck, MapPin } from "lucide-react";

interface Metric {
  icon: typeof Clock;
  targetNum: number;
  prefix?: string;
  suffix: string;
  label: string;
  description: string;
}

const metrics: Metric[] = [
  {
    icon: Clock,
    targetNum: 2,
    suffix: " Hours",
    label: "Relief Replacement SLA",
    description: "Contractually binding replacement of any absent guard within 120 minutes from regional reserve pools."
  },
  {
    icon: ShieldCheck,
    targetNum: 100,
    suffix: "%",
    label: "Police & Aadhaar Verified",
    description: "Every security guard, supervisor, and facility staff member is verified before site deployment."
  },
  {
    icon: CheckCircle2,
    targetNum: 100,
    suffix: "%",
    label: "Statutory EPF & ESIC",
    description: "Zero client legal liability with transparent monthly wage sheets and verified ECR challans."
  },
  {
    icon: Eye,
    targetNum: 2,
    suffix: ":00 AM",
    label: "Night Supervisor Audits",
    description: "Unannounced mobile patrol van inspections ensuring alertness during peak vulnerability hours."
  },
  {
    icon: FileCheck,
    targetNum: 5,
    suffix: " Days",
    label: "Mandatory Induction",
    description: "Structured pre-deployment syllabus covering fire response, gate registers, and emergency protocols."
  },
  {
    icon: MapPin,
    targetNum: 8,
    suffix: " Hubs",
    label: "District Outposts",
    description: "Operational response units in Trichy HQ, Chennai, Coimbatore, Hosur, Salem, Madurai, Tirunelveli, Erode."
  }
];

function StatCard({ item }: { item: Metric }) {
  const [count, setCount] = useState(item.targetNum);
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = item.icon;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setCount(item.targetNum);
      return;
    }

    let animated = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          const duration = 900;
          const startTime = performance.now();

          const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOut * item.targetNum));

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(item.targetNum);
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.25 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [item.targetNum]);

  return (
    <div
      ref={cardRef}
      className="p-5 bg-white border border-[#E4E7EC] space-y-2 text-left"
    >
      <div className="flex items-center justify-between">
        <span className="font-sans text-2xl sm:text-3xl font-semibold text-[#0F2A47] tabular-nums">
          {item.prefix || ""}{count}{item.suffix}
        </span>
        <div className="w-8 h-8 rounded-[4px] bg-[#F6F7F9] border border-[#E4E7EC] flex items-center justify-center text-[#9C7A3C]">
          <Icon size={15} />
        </div>
      </div>
      <div>
        <h3 className="text-xs sm:text-sm font-semibold text-[#14181F]">
          {item.label}
        </h3>
        <p className="text-xs text-[#4A5160] leading-relaxed pt-0.5">
          {item.description}
        </p>
      </div>
    </div>
  );
}

export function StatsSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#E4E7EC]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl space-y-2 text-left">
          <div className="text-xs font-semibold text-[#9C7A3C]">
            Audited Operational Metrics
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-[38px] leading-[1.18] text-[#14181F] font-semibold tracking-[-0.01em]">
            Accountability governed by SLA contracts, not estimates.
          </h2>
        </div>

        {/* Clean grid of real SLAs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {metrics.map((item, idx) => (
            <StatCard key={idx} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
