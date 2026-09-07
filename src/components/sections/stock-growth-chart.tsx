"use client";

import * as React from "react";
import { motion } from "motion/react";
import { TrendingUp, ShieldCheck, Activity, Users, Building2, CheckCircle2, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DataPoint {
  period: string;
  guards: number;
  sqft: number; // in thousands
  clients: number;
}

const GROWTH_DATA: DataPoint[] = [
  { period: "Q1 2024", guards: 65, sqft: 180, clients: 8 },
  { period: "Q2 2024", guards: 140, sqft: 450, clients: 19 },
  { period: "Q3 2024", guards: 260, sqft: 920, clients: 34 },
  { period: "Q4 2024", guards: 380, sqft: 1450, clients: 52 },
  { period: "Q1 2025", guards: 470, sqft: 2100, clients: 68 },
  { period: "Q2 2025", guards: 520, sqft: 2800, clients: 84 },
  { period: "LIVE 2026", guards: 580, sqft: 3400, clients: 96 },
];

export function StockGrowthChart() {
  const [activeMetric, setActiveMetric] = React.useState<"guards" | "sqft" | "clients">("guards");
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  const metricConfig = {
    guards: {
      label: "Active Security & Manpower Personnel",
      current: "580+",
      growth: "+48.6%",
      unit: "Trained Personnel",
      color: "#0071E3",
      accentBg: "bg-blue-500/10",
      accentBorder: "border-blue-500/30",
    },
    sqft: {
      label: "Industrial & Airport Area Maintained",
      current: "3.4M+",
      growth: "+62.4%",
      unit: "Square Feet",
      color: "#34C759",
      accentBg: "bg-emerald-500/10",
      accentBorder: "border-emerald-500/30",
    },
    clients: {
      label: "Enterprise & Critical Infrastructure Clients",
      current: "96+",
      growth: "+32.1%",
      unit: "Corporate Sites",
      color: "#AF52DE",
      accentBg: "bg-purple-500/10",
      accentBorder: "border-purple-500/30",
    },
  };

  const currentCfg = metricConfig[activeMetric];
  const maxVal = Math.max(...GROWTH_DATA.map((d) => d[activeMetric]));

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-black/[0.08] relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/[0.04] border border-black/[0.08] text-xs font-semibold text-[#1d1d1f] uppercase tracking-wider font-mono">
              <Activity size={13} className="text-[#0071e3]" />
              <span>Verifiable Deployment Velocity</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1d1d1f] tracking-tight">
              Sustained operational growth.
            </h2>
            <p className="text-sm sm:text-base text-[#86868b] leading-relaxed">
              Empirical deployment metrics across Tamil Nadu &amp; South India. Zero statutory compliance defaults.
            </p>
          </div>

          {/* Metric Selector Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 bg-[#f5f5f7] rounded-full border border-black/[0.08] self-start md:self-auto shrink-0">
            <button
              onClick={() => setActiveMetric("guards")}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer",
                activeMetric === "guards"
                  ? "bg-white text-[#1d1d1f] shadow-sm"
                  : "text-[#86868b] hover:text-[#1d1d1f]"
              )}
            >
              Personnel
            </button>
            <button
              onClick={() => setActiveMetric("sqft")}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer",
                activeMetric === "sqft"
                  ? "bg-white text-[#1d1d1f] shadow-sm"
                  : "text-[#86868b] hover:text-[#1d1d1f]"
              )}
            >
              Sq. Ft Area
            </button>
            <button
              onClick={() => setActiveMetric("clients")}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer",
                activeMetric === "clients"
                  ? "bg-white text-[#1d1d1f] shadow-sm"
                  : "text-[#86868b] hover:text-[#1d1d1f]"
              )}
            >
              Client Sites
            </button>
          </div>
        </div>

        {/* The Stock-Ticker Visual Terminal Card */}
        <div className="rounded-[32px] bg-[#1d1d1f] text-white p-6 sm:p-8 lg:p-10 border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Subtle grid background */}
          <div 
            className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "24px 24px"
            }}
          />

          {/* Top Ticker Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-white/10 relative z-10">
            <div className="space-y-1">
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                {currentCfg.label}
              </span>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-white tabular-nums">
                  {currentCfg.current}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                  <TrendingUp size={13} />
                  <span>{currentCfg.growth} YoY</span>
                </span>
              </div>
            </div>

            {/* Quick Badges */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <div className="px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-neutral-300 flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span>PSARA Verified</span>
              </div>
              <div className="px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-neutral-300 flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-blue-400" />
                <span>100% Statutory ESI/PF</span>
              </div>
              <div className="px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-neutral-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Live Audit Clean</span>
              </div>
            </div>
          </div>

          {/* Chart Canvas: Stock-Style Candlestick / Area Curve */}
          <div className="pt-10 pb-4 relative z-10">
            <div className="h-64 sm:h-72 w-full flex items-end justify-between gap-2 sm:gap-4 md:gap-8 pt-8 px-2">
              {GROWTH_DATA.map((item, idx) => {
                const val = item[activeMetric];
                const heightPercent = Math.max(18, Math.round((val / maxVal) * 100));
                const isHovered = hoveredIndex === idx;

                return (
                  <div
                    key={item.period}
                    className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {/* Tooltip on hover */}
                    {isHovered && (
                      <div className="absolute -top-12 z-20 px-3 py-1.5 rounded-xl bg-white text-[#1d1d1f] font-mono text-xs font-bold shadow-xl whitespace-nowrap animate-in fade-in zoom-in-95 duration-150">
                        {item.period}: {val.toLocaleString("en-IN")} {currentCfg.unit}
                      </div>
                    )}

                    {/* Stock Bar */}
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${heightPercent}%` }}
                      transition={{ duration: 0.6, delay: idx * 0.05 }}
                      className={cn(
                        "w-full max-w-[56px] rounded-t-xl transition-all duration-300 relative overflow-hidden",
                        isHovered 
                          ? "bg-white shadow-[0_0_24px_rgba(255,255,255,0.4)]" 
                          : "bg-gradient-to-t from-white/20 via-white/50 to-white/90 group-hover:from-white/40 group-hover:to-white"
                      )}
                    >
                      {/* Top line indicator */}
                      <div className="w-full h-1 bg-emerald-400 absolute top-0 inset-x-0" />
                    </motion.div>

                    {/* Period Label */}
                    <span className={cn(
                      "text-[10px] sm:text-xs font-mono mt-3 transition-colors",
                      isHovered ? "text-white font-bold" : "text-neutral-400"
                    )}>
                      {item.period}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Stock Metadata Footer */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-neutral-400 relative z-10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>MARKET DISPATCH STATUS: ACTIVE &bull; SLA RELIEF GUARANTEE: &lt; 2 HOURS</span>
            </div>
            <div>
              <span>SOURCE: JSM ENTERPRISE AUDIT &amp; PSARA COMPLIANCE REGISTRY (2024–2026)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
