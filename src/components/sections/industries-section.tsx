"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { industriesData } from "@/data/industries";
import { ArrowRight, CheckCircle2, Home, Building2, Factory, Warehouse, ShoppingBag, Hospital, GraduationCap, Landmark, PartyPopper, HardHat, Gavel, Briefcase } from "lucide-react";
import Link from "next/link";

const iconMap: Record<string, React.ElementType> = {
  Home,
  Building2,
  Factory,
  Warehouse,
  ShoppingBag,
  Hospital,
  GraduationCap,
  Landmark,
  PartyPopper,
  HardHat,
  Gavel,
  Briefcase
};

export function IndustriesSection() {
  const [selectedIndustry, setSelectedIndustry] = useState(industriesData[0]);

  return (
    <section className="py-24 md:py-32 bg-[#f5f5f7] border-t border-black/[0.08]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#0071e3]">
            Target Industry Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1d1d1f] tracking-tight leading-tight">
            Tailored operational support for every sector.
          </h2>
          <p className="text-[#86868b] text-base md:text-lg font-normal leading-relaxed">
            Different environments face different risks. We design specialized post orders for residential, corporate, industrial, and institutional premises.
          </p>
        </div>

        {/* Desktop Interactive Layout: Left Tabs, Right Solution Card */}
        <div className="hidden lg:grid grid-cols-12 gap-8 max-w-6xl mx-auto items-start">
          {/* Left Column: Industry List */}
          <div className="col-span-5 space-y-2 bg-white border border-black/[0.08] rounded-[28px] p-4 shadow-sm max-h-[580px] overflow-y-auto">
            {industriesData.map((ind) => {
              const Icon = iconMap[ind.icon] || Building2;
              const isSelected = selectedIndustry.slug === ind.slug;

              return (
                <button
                  key={ind.slug}
                  onClick={() => setSelectedIndustry(ind)}
                  className={`w-full text-left p-3 rounded-2xl flex items-center justify-between transition-all duration-200 ${
                    isSelected
                      ? "bg-[#0071e3] text-white shadow-sm"
                      : "text-[#1d1d1f] hover:bg-black/[0.04]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${isSelected ? "bg-white text-[#0071e3]" : "bg-[#f5f5f7] text-[#1d1d1f]"}`}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold">{ind.title}</h4>
                    </div>
                  </div>
                  <ArrowRight size={14} className={isSelected ? "text-white" : "text-zinc-400"} />
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Solution Card */}
          <div className="col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedIndustry.slug}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-black/[0.08] rounded-[28px] p-8 space-y-6 shadow-sm"
              >
                <div className="space-y-2 border-b border-black/[0.06] pb-5">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#0071e3]">
                    Operational Blueprint
                  </span>
                  <h3 className="text-2xl font-semibold text-[#1d1d1f] tracking-tight">
                    {selectedIndustry.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#86868b]">
                    {selectedIndustry.tagline}
                  </p>
                </div>

                <p className="text-xs text-[#515154] leading-relaxed font-normal">
                  {selectedIndustry.summary}
                </p>

                <div className="space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1d1d1f]">
                    Primary Operational Challenges Handled:
                  </h4>
                  <ul className="space-y-2 text-xs text-[#515154] font-normal">
                    {selectedIndustry.operationalChallenges.map((ch, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-rose-500 font-bold">•</span>
                        <span>{ch}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-[#f5f5f7] border border-black/[0.06] rounded-2xl space-y-2">
                  <h4 className="text-xs font-semibold text-[#1d1d1f] flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-[#0071e3]" />
                    The JSM Integrated Solution:
                  </h4>
                  <p className="text-xs text-[#515154] leading-relaxed font-normal">
                    {selectedIndustry.jsmSolution}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <Link
                    href={`/industries/${selectedIndustry.slug}`}
                    className="text-xs font-semibold text-[#0071e3] hover:underline flex items-center gap-1"
                  >
                    View Detailed Industry Case & FAQs <ArrowRight size={13} />
                  </Link>

                  <Link
                    href="/contact"
                    className="px-5 py-2.5 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-full text-xs font-semibold shadow-sm transition-all"
                  >
                    Request Industry Assessment
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile & Tablet Grid */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
          {industriesData.slice(0, 6).map((ind) => {
            const Icon = iconMap[ind.icon] || Building2;
            return (
              <Link
                key={ind.slug}
                href={`/industries/${ind.slug}`}
                className="bg-white border border-zinc-200/80 rounded-3xl p-6 space-y-3 shadow-sm hover:border-black transition-colors block"
              >
                <div className="w-10 h-10 rounded-2xl bg-zinc-100 text-black flex items-center justify-center">
                  <Icon size={18} />
                </div>
                <h3 className="text-base font-bold text-black">{ind.title}</h3>
                <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">{ind.tagline}</p>
                <div className="text-xs font-bold text-black flex items-center gap-1 pt-2">
                  <span>Explore Blueprint</span>
                  <ArrowRight size={13} />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/industries"
            className="inline-flex items-center gap-2 text-sm font-bold text-black hover:underline"
          >
            Explore All 12 Industry Operational Blueprints <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
