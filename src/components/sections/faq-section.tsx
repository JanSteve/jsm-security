"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, HelpCircle, ArrowRight, MessageCircle } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { brandData } from "@/data/brand";

const faqs = [
  {
    q: "What integrated security, staffing, and facility services does JSM provide?",
    a: "JSM delivers a disciplined Three-Tier service framework: (1) Tier 1: Security Supervisors & Marshals (Ex-Servicemen & Private) under PSARA 2005 licensing, (2) Tier 2: Corporate, IT & Multi-Skill Contractual Staffing mobilized in 48–72 hours, and (3) Tier 3: Integrated Facility Management & Commercial Housekeeping following closed-loop hygiene protocols."
  },
  {
    q: "How does JSM integrate Ex-Servicemen (ESM) and DGR operational standards?",
    a: "JSM maintains high operational discipline under the advisory of defense veterans, offering dedicated recruitment and deployment tracks for Commissioned Officers, JCOs, and OR/Jawans. We align with DGR (Directorate General Resettlement) wage standards and operational SOPs for high-security industrial and aviation infrastructure."
  },
  {
    q: "How do I determine the right security and staffing configuration for my facility?",
    a: "We conduct a complimentary, no-obligation On-Site Risk & Requirement Assessment. Our operations commanders analyze your perimeter gates, material movement points, shift rotations, and statutory compliance needs to deliver a customized operational matrix and transparent cost proposal."
  },
  {
    q: "Are your security guards and personnel licensed and police verified?",
    a: "Yes. JSM Integrated Services operates strictly under the Private Security Agencies Regulation Act (PSARA 2005) with valid licensing from the Home Department of Tamil Nadu. 100% of our guards and supervisors undergo thorough local police background verification and biometric Aadhaar authentication prior to post deployment."
  },
  {
    q: "What is JSM’s guaranteed 2-Hour Relief Replacement SLA?",
    a: "To ensure zero unmanned gate lapses, JSM maintains an active roving reserve of verified standby marshals. If a guard reports sick or experiences an emergency, a fully inducted relief marshal arrives at your facility within 120 minutes."
  },
  {
    q: "How does JSM ensure 100% statutory EPF, ESIC, and wage compliance?",
    a: "Every deployed employee is on our registered payroll with mandatory EPF, ESIC, and statutory insurance. Each monthly billing invoice is accompanied by genuine bank payment vouchers and government ECR challan receipts, providing absolute legal indemnity to our clients."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 md:py-28 bg-white border-t border-black/[0.08] text-[#1d1d1f] relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left Column: Heading & Contact Prompt */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f5f5f7] border border-black/[0.08] text-[#1d1d1f] text-xs font-semibold tracking-wide uppercase">
              <HelpCircle size={14} className="text-[#0071e3]" />
              <span>Common Questions</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1d1d1f] tracking-tight leading-[1.15] text-balance">
              Common questions &amp; expert guidance.
            </h2>

            <p className="text-sm sm:text-base text-[#86868b] font-normal leading-relaxed text-pretty">
              Still curious about how JSM can elevate your facility standards? Reach out directly to our operations leadership for tailored advisory.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 h-11 rounded-full bg-[#1d1d1f] text-white hover:bg-black text-xs font-semibold transition-all min-touch-target shadow-sm group"
              >
                <span>Contact us</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
              </Link>

              <a
                href={`https://wa.me/${brandData.contact.whatsapp}?text=Hello%20JSM,%20I%20have%20a%20question%20regarding%20your%20services.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 h-11 rounded-full bg-[#f5f5f7] hover:bg-black/[0.04] border border-black/[0.08] text-[#1d1d1f] text-xs font-semibold transition-all min-touch-target"
              >
                <MessageCircle size={14} className="text-emerald-600" />
                <span>Ask on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Accordion List */}
          <div className="lg:col-span-7 space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#f5f5f7] border border-black/[0.06] hover:border-black/[0.12] rounded-2xl overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none min-touch-target group"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-semibold text-[#1d1d1f] transition-colors leading-snug">
                      {faq.q}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-200 shadow-sm ${
                      isOpen ? "bg-[#1d1d1f] text-white border-[#1d1d1f] rotate-180" : "bg-white text-[#1d1d1f] border-black/[0.08]"
                    }`}>
                      <ChevronDown size={16} />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                      >
                        <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-[#515154] font-normal leading-relaxed border-t border-black/[0.06] pt-4 text-pretty">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
