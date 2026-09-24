"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const homeFAQs = [
  {
    question: "What integrated facility and manpower services does JSM provide in India?",
    answer: "JSM Integrated Services delivers disciplined Private Security guarding (PSARA compliant), Commercial Housekeeping & Facility Management, and Contractual Industrial Manpower under a single accountable partner across Tamil Nadu."
  },
  {
    question: "Is JSM Integrated Services compliant with PSARA and statutory labour laws?",
    answer: "Yes. JSM operates strictly within the Private Security Agencies Regulation Act (PSARA 2005) under the Home Department of Tamil Nadu with 100% EPF, ESIC, and minimum wage compliance."
  },
  {
    question: "What is JSM's guaranteed replacement SLA for absent personnel?",
    answer: "JSM maintains a contractually binding 2-Hour Relief Replacement SLA where any absent personnel is replaced by a verified roving reserve staff member within 120 minutes."
  },
  {
    question: "Which regions and cities are served by JSM Integrated Services?",
    answer: "JSM operates across Tamil Nadu (Tiruchirappalli HQ, Chennai OMR Tech Corridor, Coimbatore, Hosur, Madurai, Salem, Erode, Tirunelveli) and provides scalable integrated facility operations throughout South India."
  },
  {
    question: "How are guards trained and verified before deployment?",
    answer: "Every guard undergoes mandatory Aadhaar verification, police background authentication, and our structured 5-day pre-deployment syllabus covering fire safety, visitor documentation, and emergency escalation protocols."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 sm:py-28 bg-white border-b border-[#E7E5E0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#0B3D2E]">
            Frequently Asked Questions
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-[#14181F] font-normal tracking-tight">
            Direct answers on compliance, SLAs &amp; operations.
          </h2>
        </div>

        <div className="space-y-3">
          {homeFAQs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-[#E7E5E0] rounded-lg overflow-hidden bg-[#F8F9FA]/40 transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#14181F] hover:text-[#0B3D2E] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    size={18}
                    className={cn(
                      "text-[#5A6578] shrink-0 transition-transform duration-200",
                      isOpen && "rotate-180 text-[#0B3D2E]"
                    )}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-[#4A5568] leading-relaxed border-t border-[#E7E5E0]/60 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
