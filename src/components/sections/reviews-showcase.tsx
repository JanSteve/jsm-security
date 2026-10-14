"use client";

import React, { useState } from "react";
import { reviewsMasterBank, ReviewItem } from "@/data/reviews";
import { Star, CheckCircle, ShieldCheck, Cpu } from "lucide-react";

export function ReviewsShowcase() {
  const [activeTab, setActiveTab] = useState<"all" | "digital" | "security">("all");

  const filteredReviews = reviewsMasterBank.filter((rev) => {
    if (activeTab === "digital") return rev.serviceCategory === "Digital Systems";
    if (activeTab === "security") return rev.serviceCategory === "Security & Manpower";
    return true;
  });

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-black border-b border-white/10 text-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
          <div className="max-w-2xl space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-neutral-400 font-mono uppercase tracking-wider">
                Client Social Proof &amp; Verified Reviews
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-mono text-white font-semibold">
                <Star size={10} className="fill-white text-white" />
                <span>4.9 / 5.0 Rating</span>
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              What Tamil Nadu Enterprises Say About JSM
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              Real feedback from clinic directors, factory operations heads, salon owners, and commercial facility managers across Tamil Nadu.
            </p>
          </div>

          {/* Category Switcher Tabs */}
          <div className="flex items-center gap-2 p-1 rounded-lg bg-[#080C14] border border-white/10 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeTab === "all"
                  ? "bg-white text-black shadow-md"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              All Reviews (10)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("digital")}
              className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === "digital"
                  ? "bg-white text-black shadow-md"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Cpu size={12} />
              <span>Digital Services (5)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("security")}
              className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === "security"
                  ? "bg-white text-black shadow-md"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <ShieldCheck size={12} />
              <span>Security &amp; Manpower (5)</span>
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-xl bg-[#080C14] border border-white/10 hover:border-white/30 transition-all flex flex-col justify-between space-y-4 text-left"
            >
              <div className="space-y-3">
                {/* Star Rating & Verified Pill */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={14} className="fill-white text-white" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle size={10} />
                    <span>Verified Client</span>
                  </span>
                </div>

                {/* Service Tag */}
                <div className="text-[11px] font-mono font-semibold text-neutral-400">
                  {rev.serviceName}
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed italic">
                  &ldquo;{rev.reviewText}&rdquo;
                </p>
              </div>

              {/* Author & Business Metadata */}
              <div className="pt-3 border-t border-white/10 space-y-0.5">
                <div className="text-xs font-bold text-white">
                  {rev.author}
                </div>
                <div className="text-[11px] text-neutral-400 font-medium">
                  {rev.role} &bull; <span className="text-white">{rev.business}</span>
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
