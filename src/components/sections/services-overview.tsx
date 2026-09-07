"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { 
  Shield, 
  Sparkles, 
  Users, 
  Lock, 
  Award, 
  FileCheck2, 
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const solutions = [
  {
    code: "JSM-01",
    title: "Private Security & Guarding",
    tagline: "PSARA 2005 LICENSED",
    desc: "Disciplined physical guarding for manufacturing plants, corporate hubs, and infrastructure with 24/7 supervisor monitoring.",
    features: [
      "2-Hour Standby Relief Replacement SLA",
      "100% Police & Aadhaar Verified Guards"
    ],
    icon: Shield,
    href: "/services/private-security"
  },
  {
    code: "JSM-02",
    title: "Facility Management & Housekeeping",
    tagline: "MECHANIZED HYGIENE",
    desc: "Industrial sanitation and facility upkeep using ride-on scrubbers and eco-certified chemicals with signed hourly audit logs.",
    features: [
      "5-Step Closed-Loop Hygiene Protocol",
      "NABH & Industrial Grade Standards"
    ],
    icon: Sparkles,
    href: "/services/housekeeping"
  },
  {
    code: "JSM-03",
    title: "Contractual Industrial Manpower",
    tagline: "RAPID DEPLOYMENT",
    desc: "Pre-vetted technical, fabrication, and assembly personnel mobilized with 100% EPF/ESIC statutory indemnity.",
    features: [
      "48–72 Hour Rapid Mobilization",
      "Zero Client Statutory Liability"
    ],
    icon: Users,
    href: "/services/manpower"
  },
  {
    code: "JSM-04",
    title: "Aviation & Critical Infrastructure",
    tagline: "HIGH-STAKES OPERATIONS",
    desc: "Access control, perimeter protection, and visitor management proven at Trichy International Airport.",
    features: [
      "Civil Aviation Benchmark Tested",
      "Biometric Turnstile & Gate Audits"
    ],
    icon: Lock,
    href: "/about"
  }
];

export function ServicesOverview() {
  return (
    <section className="py-16 md:py-24 bg-white border-t border-black/[0.08] text-[#1d1d1f] relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 relative z-10 space-y-12">
        
        {/* Section Header - Apple Style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-black/[0.08]">
          <div className="space-y-2">
            <span className="text-xs font-semibold tracking-wider text-[#86868b] uppercase block font-mono">
              Our Security Solutions
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1d1d1f] tracking-tight text-balance">
              Delivering professional &amp; reliable security services.
            </h2>
            <p className="text-xs sm:text-sm text-[#515154] max-w-2xl font-normal leading-relaxed text-pretty">
              Precision guarding, certified housekeeping, and contractual workforce deployed with zero vendor fragmentation and single-point executive accountability.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] border border-black/[0.06] text-[#1d1d1f] text-xs font-semibold transition-all press-scale min-touch-target group"
            >
              <span>View all services</span>
              <ArrowRight size={13} className="text-[#86868b] group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Apple 6-Card Responsive Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer(0.08)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {solutions.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.code}
                variants={fadeInUp}
                className="bg-[#f5f5f7] border border-black/[0.04] hover:border-black/[0.12] rounded-[28px] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-sm group relative overflow-hidden"
              >
                <div className="space-y-5">
                  {/* Top Row: Code Pill + Icon */}
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-white border border-black/[0.06] text-[10px] font-mono font-bold text-[#1d1d1f] uppercase tracking-wider shadow-2xs">
                      {item.code}
                    </span>
                    <div className="w-11 h-11 rounded-2xl bg-white border border-black/[0.06] text-[#1d1d1f] flex items-center justify-center group-hover:bg-[#1d1d1f] group-hover:text-white transition-colors shrink-0 shadow-2xs">
                      <Icon size={20} />
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono font-semibold text-[#86868b] uppercase tracking-wider block">
                      {item.tagline}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-[#1d1d1f] tracking-tight group-hover:text-[#0071e3] transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#515154] font-normal leading-relaxed text-pretty">
                    {item.desc}
                  </p>

                  {/* Features List */}
                  <div className="space-y-1.5 pt-1 border-t border-black/[0.04]">
                    {item.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-[11px] text-[#515154] font-medium">
                        <CheckCircle2 size={12} className="text-[#0071e3] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Link */}
                <div className="pt-6 mt-4 border-t border-black/[0.06] flex items-center justify-between">
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0071e3] hover:underline transition-colors press-scale"
                  >
                    <span>Explore now</span>
                    <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>

                  <span className="text-[10px] font-mono text-[#86868b] font-medium uppercase">
                    SLA Guaranteed
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
