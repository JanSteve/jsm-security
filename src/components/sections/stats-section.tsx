"use client";

import React, { useState, useEffect, useRef } from "react";
import { Clock, ShieldCheck, FileCheck, CheckCircle2, Eye, MapPin } from "lucide-react";

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
    description: "Guaranteed replacement of any absent guard within 120 minutes from regional reserve pools."
  },
  {
    icon: ShieldCheck,
    targetNum: 100,
    suffix: "%",
    label: "Police & Aadhaar Verified",
    description: "Every security guard, supervisor, and facility staff member is authenticated before site entry."
  },
  {
    icon: FileCheck,
    targetNum: 5,
    suffix: " Days",
    label: "Induction Syllabus",
    description: "Structured pre-deployment training covering fire safety, visitor registers, and emergency protocols."
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
    prefix: "",
    suffix: ":00 AM",
    label: "Night Supervisor Audits",
    description: "Unannounced mobile patrol van inspections ensuring alertness during peak vulnerability hours."
  },
  {
    icon: MapPin,
    targetNum: 9,
    suffix: " Hubs",
    label: "District Outposts",
    description: "Operational response units in Trichy HQ, Chennai OMR, Coimbatore, Hosur, Salem, Madurai."
  }
];

function CounterCard({ item }: { item: Metric }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = item.icon;

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setCount(item.targetNum);
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 1100; // 1.1s
          const startTime = performance.now();

          const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out curve
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.floor(easeOut * item.targetNum);
            setCount(currentVal);

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(item.targetNum);
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [item.targetNum, hasAnimated]);

  return (
    <div
      ref={cardRef}
      className="p-6 rounded-[12px] border border-[#E5E3DD] bg-[#F7F6F2]/60 shadow-[0_1px_2px_rgba(20,24,26,0.04),0_4px_12px_rgba(20,24,26,0.06)] hover:shadow-[0_2px_4px_rgba(20,24,26,0.06),0_8px_24px_rgba(20,24,26,0.10)] transition-all duration-200 space-y-3"
    >
      <div className="flex items-center justify-between">
        <span className="font-display text-2xl sm:text-3xl font-semibold text-[#0B3D2E] tabular-nums">
          {item.prefix || ""}{count}{item.suffix}
        </span>
        <div className="w-9 h-9 rounded-[8px] bg-white border border-[#E5E3DD] flex items-center justify-center text-[#1E7A58] shadow-2xs">
          <Icon size={16} />
        </div>
      </div>
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-[#14181A]">
          {item.label}
        </h3>
        <p className="text-xs text-[#4B5259] leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  );
}

export function StatsSection() {
  return (
    <section className="py-20 sm:py-24 bg-white border-b border-[#E5E3DD]">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 space-y-12">
        <div className="max-w-3xl space-y-2">
          <div className="eyebrow-label text-[#0B3D2E]">
            Verifiable Standards
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-[#14181A] font-normal tracking-tight">
            Accountability measured by SLA commitments, not vague claims.
          </h2>
        </div>

        {/* 3-up on desktop (2 rows of 3), 2-up on tablet, 1-up on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((item, idx) => (
            <CounterCard key={idx} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
