"use client";

import React, { useState } from "react";
import { reviewsMasterBank } from "@/data/reviews";
import { Star, CheckCircle, ShieldCheck, Cpu } from "lucide-react";

export function ReviewsShowcase() {
  const [activeTab, setActiveTab] = useState<"all" | "digital" | "security">("all");

  const filteredReviews = reviewsMasterBank.filter((rev) => {
    if (activeTab === "digital") return rev.serviceCategory === "Digital Systems";
    if (activeTab === "security") return rev.serviceCategory === "Security & Manpower";
    return true;
  });

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#030712] border-b border-cyan-500/20 text-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
          <div className="max-w-2xl space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-[11px] font-semibold tracking-wide font-mono uppercase">
                Client Social Proof &bull; Verified Reviews
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[10px] font-mono text-cyan-200 font-semibold">
                <Star size={10} className="fill-cyan-400 text-cyan-400" />
                <span>4.9 / 5.0 Rating</span>
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-bold text-white tracking-tight">
              What Tamil Nadu Enterprises Say About JSM
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              Real feedback from clinic directors, factory operations heads, salon owners, and commercial facility managers across Tamil Nadu.
            </p>
          </div>

          {/* Category Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-[#080C16] border border-cyan-500/20 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={`min-h-[44px] px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "all"
                  ? "bg-cyan-500 text-black font-bold shadow-[0_0_15px_rgba(14,165,233,0.35)]"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              All Reviews (10)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("digital")}
              className={`min-h-[44px] px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === "digital"
                  ? "bg-cyan-500 text-black font-bold shadow-[0_0_15px_rgba(14,165,233,0.35)]"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Cpu size={14} />
              <span>Digital Services (5)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("security")}
              className={`min-h-[44px] px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === "security"
                  ? "bg-cyan-500 text-black font-bold shadow-[0_0_15px_rgba(14,165,233,0.35)]"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <ShieldCheck size={14} />
              <span>Security &amp; Manpower (5)</span>
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-xl tactical-glass-card hover:border-cyan-400/40 hover:shadow-[0_0_20px_rgba(14,165,233,0.12)] transition-all flex flex-col justify-between space-y-4 text-left"
            >
              <div className="space-y-3">
                {/* Star Rating & Verified Pill */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={14} className="fill-cyan-400 text-cyan-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle size={10} className="text-emerald-400" />
                    <span>Verified Client</span>
                  </span>
                </div>

                {/* Service Tag */}
                <div className="text-[11px] font-mono font-semibold text-cyan-400">
                  {rev.serviceName}
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed italic">
                  &ldquo;{rev.reviewText}&rdquo;
                </p>
              </div>

              {/* Author & Business Metadata */}
              <div className="pt-3 border-t border-cyan-500/20 space-y-0.5">
                <div className="text-xs font-bold text-white">
                  {rev.author}
                </div>
                <div className="text-[11px] text-neutral-300 font-medium">
                  {rev.role} &bull; <span className="text-white font-semibold">{rev.business}</span>
                </div>
                <div className="text-[10px] text-neutral-400 font-mono">
                  {rev.city} &bull; {rev.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
