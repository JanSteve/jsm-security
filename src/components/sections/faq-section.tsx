"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, HelpCircle, ArrowRight, MessageCircle } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { brandData } from "@/data/brand";

const faqs = [
  {
    q: "What types of security and facility services does JSM offer?",
    a: "JSM provides comprehensive integrated operations across three core verticals: (1) Disciplined Private Security Guarding under PSARA 2005 licensing with armed/unarmed guards, (2) Specialized Commercial Housekeeping & Facility Management following our 5-step closed-loop hygiene protocol, and (3) Contractual Industrial Manpower mobilized within 48–72 hours."
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
    <section className="py-16 md:py-20 bg-[#07090E] border-t border-white/10 text-white relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left Column: Heading & Contact Prompt */}
          <div className="lg:col-span-5 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#C5A880] text-xs font-mono font-bold tracking-wider uppercase">
              <HelpCircle size={14} />
              <span>[Common Questions]</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.12] text-balance">
              Common questions &amp; expert guidance.
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed text-pretty">
              Still curious about how JSM can elevate your facility standards? Reach out directly to our operations leadership for tailored advisory.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 h-11 rounded-full bg-white text-black hover:bg-[#C5A880] text-xs font-black transition-all press-scale min-touch-target shadow-md group"
              >
                <span>Contact us</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
              </Link>

              <a
                href={`https://wa.me/${brandData.contact.whatsapp}?text=Hello%20JSM,%20I%20have%20a%20question%20regarding%20your%20services.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 h-11 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-emerald-400 text-xs font-bold transition-all press-scale min-touch-target"
              >
                <MessageCircle size={14} />
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
                  className="bg-white/5 border border-white/10 hover:border-white/20 rounded-2xl overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none min-touch-target group"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-bold text-white group-hover:text-[#C5A880] transition-colors leading-snug">
                      {faq.q}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-200 ${
                      isOpen ? "bg-[#C5A880] text-black border-[#C5A880] rotate-180" : "bg-black/50 text-zinc-400 border-white/10 group-hover:text-white"
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
                        <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed border-t border-white/5 pt-4 text-pretty">
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
