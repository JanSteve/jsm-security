"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronDown, 
  HelpCircle, 
  CheckCircle2, 
  Phone, 
  Mail, 
  Building2, 
  UserCheck, 
  DollarSign, 
  ArrowRight,
  ShieldCheck 
} from "lucide-react";
import { DotPattern } from "@/components/ui/dot-pattern";
import { BorderBeam } from "@/components/ui/border-beam";
import { cn } from "@/lib/utils";

type FAQCategory = "all" | "promoters" | "fees" | "candidates";

interface ExecutiveFAQItem {
  id: string;
  category: "promoters" | "fees" | "candidates";
  question: string;
  answer: string;
  tag: string;
}

const FAQS: ExecutiveFAQItem[] = [
  {
    id: "faq-1",
    category: "fees",
    tag: "Fee Terms",
    question: "What is JSM's contingency recruitment fee structure, and when is invoice settlement triggered?",
    answer: "Our standard contingency placement fee is 8.33% of the candidate's first-year annual fixed Cost-to-Company (CTC) [CONFIRM: fee %]. Crucially, we charge zero upfront retainers and zero commencement fees. The recruitment fee becomes payable strictly after the selected candidate has formally reported to duty and onboarded at your organization.",
  },
  {
    id: "faq-2",
    category: "fees",
    tag: "Guarantee",
    question: "How does the contractually binding 90-day replacement assurance operate?",
    answer: "Every executive placement between ₹12 LPA and ₹1 Cr is safeguarded by our formal 90-day replacement guarantee [CONFIRM: fee %]. If a placed executive departs or fails to complete 90 calendar days due to voluntary resignation or performance mismatch, our senior search desk initiates an immediate, prioritized replacement sprint at zero additional recruitment fee.",
  },
  {
    id: "faq-3",
    category: "promoters",
    tag: "Mandate Scope",
    question: "Why does JSM specifically concentrate on the ₹12 LPA to ₹1 Cr leadership compensation band?",
    answer: "Mid-to-senior leadership roles (Senior Managers, Functional Heads, Operations Directors, and C-Suite) carry the highest operational impact and organizational risk. Traditional job boards deliver unmanageable resume volume with low verification, while retained global search houses demand prohibitive advance retainers. Our focused band enables rigorous 4-stage technical and reference vetting while maintaining speed and capital efficiency.",
  },
  {
    id: "faq-4",
    category: "promoters",
    tag: "Turnaround",
    question: "What is the typical timeline from mandate kickoff to the delivery of calibrated candidate dossiers?",
    answer: "Following our initial 60-minute mandate calibration session, our search desk completes targeted direct sourcing and confidential screening to deliver 3 pre-vetted blind dossiers within 7 business days. On average, the end-to-end interview, offer calibration, and joining notice period spans 30 to 60 days depending on candidate seniority.",
  },
  {
    id: "faq-5",
    category: "promoters",
    tag: "Geography",
    question: "Which industrial manufacturing clusters and corporate hubs are covered by your practice?",
    answer: "We maintain active sourcing networks and candidate talent pools across 6 primary states: Tamil Nadu (Chennai, Trichy, Coimbatore, Hosur), Karnataka (Bengaluru, Mysuru, Hubballi), Maharashtra (Pune, Chakan, Mumbai, Nashik), Delhi NCR (Gurugram, Noida, Faridabad), Gujarat (Sanand, Ahmedabad, Vadodara), and Madhya Pradesh (Pithampur, Indore, Bhopal).",
  },
  {
    id: "faq-6",
    category: "candidates",
    tag: "Confidentiality",
    question: "How does JSM protect candidate discretion and prevent current employer exposure?",
    answer: "Candidate confidentiality is paramount. During the preliminary evaluation and presentation stages, candidate profiles are shared strictly as Anonymized Blind Dossiers. Personal identification details, current employer name, and contact information are disclosed to the hiring client only after the candidate has reviewed the opportunity brief and granted explicit consent to proceed.",
  },
  {
    id: "faq-7",
    category: "promoters",
    tag: "Co-existence",
    question: "Can an enterprise engage JSM Integrated Services alongside an internal talent acquisition team?",
    answer: "Yes. Many enterprise clients and industrial promoters partner with JSM specifically for highly confidential leadership replacements, newly created specialized technical positions, or geographic expansion mandates where internal corporate recruiting teams lack local industry networks or cannot broadcast public advertisements.",
  },
  {
    id: "faq-8",
    category: "candidates",
    tag: "Executive Career",
    question: "Are senior executives charged any fees when registering their credentials or being placed?",
    answer: "No. JSM never charges candidates any fee, commission, or registration cost. Our services to prospective leaders are 100% complimentary, completely confidential, and focused on identifying career-defining executive moves aligned with your leadership trajectory and compensation objectives.",
  },
];

const CATEGORIES: { id: FAQCategory; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "all", label: "All Inquiries", icon: HelpCircle },
  { id: "promoters", label: "For Promoters & HRDs", icon: Building2 },
  { id: "fees", label: "Contingency & Fees", icon: DollarSign },
  { id: "candidates", label: "For Senior Candidates", icon: UserCheck },
];

export function ExecutiveFAQSection() {
  const [activeCategory, setActiveCategory] = React.useState<FAQCategory>("all");
  const [openIds, setOpenIds] = React.useState<string[]>(["faq-1", "faq-2"]);

  const toggleItem = (id: string) => {
    setOpenIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = React.useMemo(() => {
    if (activeCategory === "all") return FAQS;
    return FAQS.filter((f) => f.category === activeCategory);
  }, [activeCategory]);

  return (
    <section 
      id="executive-faq"
      className="py-16 sm:py-24 bg-white border-b border-[#0E1116]/10 relative overflow-hidden w-full max-w-full"
      aria-labelledby="faq-section-heading"
    >
      <DotPattern
        width={24}
        height={24}
        cx={1.5}
        cy={1.5}
        cr={1}
        className="[mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_75%)] opacity-40"
      />

      <div className="max-w-[1040px] w-[92%] mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F6F3EE] border border-[#0E1116]/10 text-xs font-semibold uppercase tracking-wider text-[#1F4E5F] mb-4 shadow-2xs">
            <HelpCircle className="w-3.5 h-3.5 text-[#C8553D]" aria-hidden="true" />
            <span>Operational Questions Answered</span>
          </div>

          <h2
            id="faq-section-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-heading font-medium tracking-tight text-[#0E1116] leading-[1.12] mb-4 text-balance"
          >
            Clear terms, verified answers.
          </h2>

          <p className="text-base sm:text-lg font-sans text-[#4A5568] leading-relaxed max-w-2xl text-pretty">
            Everything business promoters, HR directors, and confidential candidates need to know about our recruitment terms, timelines, and 90-day assurance.
          </p>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-6">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 border min-h-[44px]",
                    isSelected
                      ? "bg-[#0E1116] text-white border-[#0E1116] shadow-xs"
                      : "bg-[#F6F3EE] text-[#4A5568] border-[#0E1116]/10 hover:border-[#1F4E5F]/30 hover:text-[#0E1116]"
                  )}
                  aria-pressed={isSelected}
                >
                  <Icon className={cn("w-3.5 h-3.5", isSelected ? "text-[#C8553D]" : "text-[#1F4E5F]")} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Accordion List with Layout Motion */}
        <div className="space-y-3.5">
          {filteredFaqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <motion.div
                key={faq.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "rounded-2xl border transition-colors overflow-hidden",
                  isOpen 
                    ? "bg-[#F6F3EE]/80 border-[#1F4E5F]/30 shadow-2xs" 
                    : "bg-white border-[#0E1116]/10 hover:border-[#0E1116]/20"
                )}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(faq.id)}
                  className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 min-h-[56px]"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <div className="space-y-1 pr-2">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider bg-white border border-[#0E1116]/8 text-[#1F4E5F] mb-1">
                      {faq.tag}
                    </span>
                    <h3 className="font-heading font-medium text-base sm:text-lg text-[#0E1116] leading-snug">
                      {faq.question}
                    </h3>
                  </div>

                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-200 mt-1",
                    isOpen 
                      ? "bg-[#1F4E5F] text-white border-[#1F4E5F] rotate-180" 
                      : "bg-[#F6F3EE] text-[#525866] border-[#0E1116]/10"
                  )}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${faq.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.24, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1 text-xs sm:text-sm text-[#4A5568] leading-relaxed border-t border-[#0E1116]/6">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Direct Contact Assistance Strip */}
        <div className="mt-10 sm:mt-14 p-6 sm:p-8 rounded-2xl md:rounded-3xl bg-[#F6F3EE] border border-[#0E1116]/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-heading font-medium text-lg sm:text-xl text-[#0E1116]">
              Have a specialized mandate or confidential query?
            </h4>
            <p className="text-xs sm:text-sm text-[#525866]">
              Speak directly with an executive search consultant. Confidentiality strictly observed.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto shrink-0">
            <a
              href="tel:+919080863448"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white text-[#0E1116] border border-[#0E1116]/15 text-xs sm:text-sm font-semibold hover:border-[#1F4E5F] hover:text-[#1F4E5F] transition-all min-h-[44px] shadow-2xs"
            >
              <Phone className="w-4 h-4 text-[#1F4E5F]" />
              <span>+91 90808 63448</span>
            </a>
            <a
              href="mailto:contact@jsmintegratedservices.com"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#0E1116] text-[#F6F3EE] text-xs sm:text-sm font-semibold hover:bg-[#C8553D] transition-all min-h-[44px] shadow-xs"
            >
              <Mail className="w-4 h-4" />
              <span>Email Executive Desk</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
