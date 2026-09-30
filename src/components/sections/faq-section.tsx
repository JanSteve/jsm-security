"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { homeFAQs } from "@/data/faqs";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#E4E7EC]">
      <div className="max-w-[880px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-left">
        {/* Left-Aligned Header in Source Serif 4 */}
        <div className="space-y-2 text-left">
          <div className="text-xs font-semibold text-[#9C7A3C]">
            Frequently Answered Inquiries
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-[38px] leading-[1.18] text-[#14181F] font-semibold tracking-[-0.01em]">
            Direct answers on statutory compliance, SLAs and operations.
          </h2>
          <p className="text-sm sm:text-base text-[#4A5160] leading-relaxed line-measure">
            Concrete operational specifications for procurement officers, plant managers, and facility administrators.
          </p>
        </div>

        {/* Clean Accordion with Hairline Borders */}
        <div className="border-t border-[#E4E7EC] divide-y divide-[#E4E7EC]">
          {homeFAQs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="transition-colors">
                <button
                  onClick={() => toggle(idx)}
                  className="w-full py-4 sm:py-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#14181F] hover:text-[#0F2A47] transition-colors min-touch-target"
                  aria-expanded={isOpen}
                >
                  <span className="pr-2">{faq.question}</span>
                  <ChevronDown
                    size={17}
                    className={cn(
                      "text-[#4A5160] shrink-0 transition-transform duration-200 ease-out",
                      isOpen && "rotate-180 text-[#0F2A47]"
                    )}
                  />
                </button>

                <div
                  className={cn(
                    "grid transition-all duration-200 ease-out",
                    isOpen ? "grid-rows-[1fr] opacity-100 pb-5" : "grid-rows-[0fr] opacity-0 pb-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="text-xs sm:text-sm text-[#4A5160] leading-relaxed pr-6">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
