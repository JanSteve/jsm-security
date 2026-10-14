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
  animate?: boolean;
}

const metrics: Metric[] = [
  {
    icon: Clock,
    targetNum: 2,
    suffix: " Hours",
    label: "Relief Replacement SLA",
    description: "120-minute reserve deployment guarantee.",
    animate: false
  },
  {
    icon: ShieldCheck,
    targetNum: 100,
    suffix: "%",
    label: "Police & Aadhaar Verified",
    description: "100% background-checked before deployment.",
    animate: true
  },
  {
    icon: CheckCircle2,
    targetNum: 100,
    suffix: "%",
    label: "Statutory EPF & ESIC",
    description: "Zero client legal liability & monthly ECR proof.",
    animate: true
  },
  {
    icon: Eye,
    targetNum: 2,
    suffix: ":00 AM",
    label: "Night Supervisor Audits",
    description: "Unannounced mobile patrol van inspections.",
    animate: false
  },
  {
    icon: FileCheck,
    targetNum: 5,
    suffix: " Days",
    label: "Mandatory Induction",
    description: "Pre-deployment fire & gate protocol syllabus.",
    animate: false
  },
  {
    icon: MapPin,
    targetNum: 8,
    suffix: " Hubs",
    label: "District Outposts",
    description: "Trichy HQ, Chennai, Coimbatore & 5 districts.",
    animate: false
  }
];

function StatCard({ item }: { item: Metric }) {
  const [count, setCount] = useState(() => {
    if (!item.animate) return item.targetNum;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return item.targetNum;
    }
    return 0;
  });
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = item.icon;

  useEffect(() => {
    if (!item.animate) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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
  }, [item.targetNum, item.animate]);

  return (
    <div
      ref={cardRef}
      className="p-4 sm:p-5 tactical-glass-card rounded-xl space-y-2 text-left flex flex-col justify-between hover:border-cyan-400/40 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] transition-all text-white"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
        <span className="font-sans text-xl sm:text-3xl font-bold text-white tabular-nums inline-block min-w-[2.5ch]">
          {item.prefix || ""}{count}{item.suffix}
        </span>
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-300 shrink-0 self-start sm:self-auto">
          <Icon size={14} className="sm:w-[15px] sm:h-[15px]" />
        </div>
      </div>
      <div>
        <h3 className="text-[13px] sm:text-sm font-bold text-cyan-300 leading-tight">
          {item.label}
        </h3>
        <p className="text-[11px] sm:text-xs text-neutral-400 leading-relaxed pt-1">
          {item.description}
        </p>
      </div>
    </div>
  );
}

export function StatsSection() {
  return (
    <section className="py-12 sm:py-16 bg-[#030712] border-b border-cyan-500/20 text-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        <div className="max-w-3xl space-y-2 text-left">
          <div className="text-xs font-bold text-cyan-400 font-mono uppercase tracking-wider">
            Audited Operational Metrics
          </div>
          <h2 className="font-sans font-bold tracking-tight text-white text-2xl sm:text-3xl lg:text-[38px] leading-[1.18]">
            Accountability governed by SLA contracts, not estimates.
          </h2>
        </div>

        {/* Clean grid of real SLAs */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {metrics.map((item, idx) => (
            <StatCard key={idx} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
