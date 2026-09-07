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
    title: "On-Site Guard Services",
    tagline: "ROUND-THE-CLOCK PROTECTION",
    desc: "Uniformed security guards providing disciplined physical security for corporate offices, industrial plants, warehouses, and gated facilities with strict visitor logging.",
    features: [
      "PSARA 2005 Licensed & Police Verified",
      "2:00 AM Supervisor Van Spot-Audits",
      "2-Hour Standby Relief Replacement SLA"
    ],
    icon: Shield,
    href: "/services/private-security"
  },
  {
    code: "JSM-03",
    title: "Facility Management & Housekeeping",
    tagline: "5-STEP CLOSED-LOOP HYGIENE",
    desc: "Industrial sanitation following our 5-step closed-loop hygiene protocol (Clean → Inspect → Report → Correct → Verify) with ride-on auto scrubbers and eco chemicals.",
    features: [
      "Hourly Signed Washroom Logs",
      "Cross-Contamination Color Coding",
      "NABH & Industrial Plant Grade Upkeep"
    ],
    icon: Sparkles,
    href: "/services/housekeeping"
  },
  {
    code: "JSM-02",
    title: "Contractual Industrial Manpower",
    tagline: "RAPID 48–72H MOBILIZATION",
    desc: "Pre-vetted technical, fabrication, assembly, and warehouse staffing mobilized with complete EPF and ESIC statutory legal indemnity for client peace of mind.",
    features: [
      "48–72 Hour Mobilization Guarantee",
      "100% EPF/ESIC Monthly ECR Proofs",
      "Zero Client Statutory Legal Liability"
    ],
    icon: Users,
    href: "/services/manpower"
  },
  {
    code: "JSM-01.4",
    title: "Access Control & Gatehouse Logistics",
    tagline: "PERIMETER & VEHICLE INSPECTION",
    desc: "Disciplined visitor verification, material inward/outward gate pass accounting, vehicle inspection, and electronic turnstile management.",
    features: [
      "Visitor Photo & ID Verification",
      "Material Gate Pass Reconciliation",
      "Perimeter Access Log Auditing"
    ],
    icon: Lock,
    href: "/services/private-security"
  },
  {
    code: "JSM-01.5",
    title: "Executive Protection & VIP Escort",
    tagline: "DISCREET DIGNITARY SECURITY",
    desc: "Discreet, high-level transit and personal protection for corporate executives, VIP dignitaries, and high-value logistics convoys across South India.",
    features: [
      "Ex-Servicemen Close Protection Officers",
      "Route Advance & Threat Reconnaissance",
      "Discreet Protocol & Bearing Standards"
    ],
    icon: Award,
    href: "/services/private-security"
  },
  {
    code: "JSM-01.6",
    title: "Consultancy & Statutory Audit",
    tagline: "100% COMPLIANCE ASSURANCE",
    desc: "Comprehensive physical vulnerability assessments, PSARA compliance reviews, fire safety emergency drills, and statutory labour health audits.",
    features: [
      "Home Dept PSARA Compliance Verification",
      "Monthly ECR Wage & EPF/ESI Audit",
      "Emergency Evacuation & Fire Safety Drills"
    ],
    icon: FileCheck2,
    href: "/about"
  }
];

export function ServicesOverview() {
  return (
    <section className="py-16 md:py-20 bg-[#07090E] border-t border-white/10 text-white relative overflow-hidden">
      {/* Background illumination */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[350px] bg-[#C5A880]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 relative z-10 space-y-12">
        
        {/* Section Header - Framer SecurityForce Style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold tracking-wider text-[#C5A880] uppercase block">
              [Our Security Solutions]
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight text-balance">
              Delivering professional &amp; reliable security services.
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl font-normal leading-relaxed text-pretty">
              Precision guarding, certified housekeeping, and contractual workforce deployed with zero vendor fragmentation and single-point executive accountability.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white text-xs font-mono font-bold transition-all press-scale min-touch-target group"
            >
              <span>View all services</span>
              <ArrowRight size={13} className="text-[#C5A880] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Framer 6-Card Responsive Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer(0.08)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {solutions.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.code}
                variants={fadeInUp}
                className="bg-white/5 border border-white/10 hover:border-[#C5A880]/60 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_30px_rgba(197,168,128,0.12)] hover:-translate-y-1 group relative overflow-hidden"
              >
                <div className="space-y-5">
                  {/* Top Row: Code Pill + Icon */}
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-black/60 border border-white/10 text-[10px] font-mono font-black text-[#C5A880] uppercase tracking-wider">
                      {item.code}
                    </span>
                    <div className="w-11 h-11 rounded-2xl bg-black/70 border border-white/10 text-[#C5A880] flex items-center justify-center group-hover:bg-[#C5A880] group-hover:text-black transition-colors shrink-0">
                      <Icon size={20} />
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-wider block">
                      {item.tagline}
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-white tracking-tight group-hover:text-[#C5A880] transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-zinc-300 font-normal leading-relaxed text-pretty">
                    {item.desc}
                  </p>

                  {/* Features List */}
                  <div className="space-y-1.5 pt-1 border-t border-white/5">
                    {item.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-[11px] text-zinc-300 font-medium">
                        <CheckCircle2 size={12} className="text-[#C5A880] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Link */}
                <div className="pt-6 mt-4 border-t border-white/10 flex items-center justify-between">
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-white group-hover:text-[#C5A880] transition-colors press-scale"
                  >
                    <span>Explore now</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase">
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
