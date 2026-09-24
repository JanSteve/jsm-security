"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const homeFAQs = [
  {
    question: "What integrated facility and manpower services does JSM provide in India?",
    answer: "JSM Integrated Services delivers disciplined Private Security guarding, Commercial Housekeeping & Facility Management, and Contractual Industrial Manpower across Tamil Nadu. Operating under a single accountable partner model, our three-tier framework eliminates vendor fragmentation for corporate, healthcare, aviation, and manufacturing clients."
  },
  {
    question: "Is JSM Integrated Services compliant with PSARA and statutory labour laws?",
    answer: "Yes, JSM Integrated Services operates with 100% PSARA Act 2005 compliance under the Home Department of the Government of Tamil Nadu. Every deployed staff member is backed by full statutory EPF, ESIC, and Minimum Wages Act coverage with verified monthly ECR challans."
  },
  {
    question: "What is JSM's guaranteed replacement SLA for absent personnel?",
    answer: "JSM maintains a contractually binding 2-Hour Relief Replacement SLA guaranteeing absent personnel replacement within 120 minutes. We maintain dedicated reserve pools across district outposts in Trichy, Chennai, Coimbatore, Hosur, and Salem to ensure zero post downtime."
  },
  {
    question: "Which regions and cities are served by JSM Integrated Services?",
    answer: "JSM Integrated Services actively operates across Tamil Nadu, including Tiruchirappalli HQ, Chennai OMR Tech Corridor, Coimbatore, Hosur, Madurai, Salem, Erode, and Tirunelveli. We also manage cross-border industrial deployments in the Hosur-Bengaluru corridor and wider South India."
  },
  {
    question: "How are guards trained and verified before deployment?",
    answer: "All guards undergo mandatory Aadhaar authentication, local police background verification, and our structured 5-day pre-deployment syllabus. The training regimen covers access barrier control, visitor register logging, fire extinguisher operation, and emergency casualty response."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 sm:py-28 bg-white border-b border-[#E5E3DD]">
      <div className="max-w-[840px] mx-auto px-6 sm:px-8 space-y-12">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="eyebrow-label text-[#0B3D2E]">
            Frequently Asked Questions
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-[#14181A] font-normal tracking-tight">
            Direct answers on compliance, SLAs &amp; operations.
          </h2>
        </div>

        <div className="space-y-3">
          {homeFAQs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-[#E5E3DD] rounded-[8px] overflow-hidden bg-[#F7F6F2]/40 transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#14181A] hover:text-[#0B3D2E] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    size={18}
                    className={cn(
                      "text-[#4B5259] shrink-0 transition-transform duration-200 ease-out",
                      isOpen && "rotate-180 text-[#0B3D2E]"
                    )}
                  />
                </button>

                {/* CSS grid-template-rows transition (0fr -> 1fr) for 240ms smooth height */}
                <div
                  className={cn(
                    "grid transition-all duration-240 ease-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-5 text-xs sm:text-sm text-[#4B5259] leading-relaxed border-t border-[#E5E3DD]/60 pt-3">
                      {faq.answer}
                    </div>
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
