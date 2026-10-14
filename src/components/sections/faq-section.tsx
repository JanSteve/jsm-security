"use client";

import React, { useState } from "react";
import { ChevronDown, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { homeFAQs } from "@/data/faqs";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [showAll, setShowAll] = useState(false);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const displayedFAQs = showAll ? homeFAQs : homeFAQs.slice(0, 4);

  return (
    <section className="py-12 sm:py-16 bg-[#030712] border-b border-cyan-500/20 text-white">
      <div className="max-w-[880px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
        {/* Left-Aligned Header */}
        <div className="space-y-1.5 text-left">
          <div className="text-[11px] font-bold text-cyan-400 font-mono uppercase tracking-wider">
            Operational FAQs
          </div>
          <h2 className="font-sans font-bold tracking-tight text-white text-2xl sm:text-3xl">
            Frequently Answered Inquiries
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300">
            Direct operational specifications for procurement officers, plant managers, and business administrators.
          </p>
        </div>

        {/* Clean Accordion with Hairline Cyan Borders */}
        <div className="border-t border-cyan-500/20 divide-y divide-cyan-500/20">
          {displayedFAQs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="transition-colors">
                <button
                  onClick={() => toggle(idx)}
                  className="w-full min-h-[44px] py-3.5 sm:py-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-white hover:text-cyan-300 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="pr-2">{faq.question}</span>
                  <ChevronDown
                    size={16}
                    className={cn(
                      "text-neutral-400 shrink-0 transition-transform duration-200 ease-out",
                      isOpen && "rotate-180 text-cyan-400"
                    )}
                  />
                </button>

                <div
                  className={cn(
                    "grid transition-all duration-200 ease-out",
                    isOpen ? "grid-rows-[1fr] opacity-100 pb-4" : "grid-rows-[0fr] opacity-0 pb-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="text-xs text-neutral-300 leading-relaxed pr-6">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Show More / Show Less Toggle Button */}
        {homeFAQs.length > 4 && (
          <div className="text-center pt-1">
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="min-h-[44px] inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 transition-colors"
            >
              {showAll ? (
                <>
                  <Minus size={14} className="text-cyan-400" />
                  <span>Show Fewer Questions</span>
                </>
              ) : (
                <>
                  <Plus size={14} className="text-cyan-400" />
                  <span>Show All {homeFAQs.length} Questions</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
