"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { 
  Clock, 
  Award, 
  ShieldCheck, 
  Radio, 
  ArrowRight, 
  CheckCircle2 
} from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const keyPoints = [
  {
    icon: Clock,
    title: "24/7 Availability",
    desc: "Round-the-clock operations control room with immediate supervisor dispatch and emergency response.",
  },
  {
    icon: Award,
    title: "14+ Years of Experience",
    desc: "Proven field track record originating from JSMMANPOWER and verified at Trichy International Airport.",
  },
  {
    icon: ShieldCheck,
    title: "Trained Professionals",
    desc: "100% police-verified, Aadhaar-authenticated personnel with rigorous 5-day pre-deployment drill induction.",
  },
  {
    icon: Radio,
    title: "Advanced Field Telemetry",
    desc: "Real-time biometric GPS shift logging, 2:00 AM supervisor spot-audits, and 2-Hour Relief SLA.",
  },
];

export function AboutShowcase() {
  return (
    <section className="py-16 md:py-24 bg-[#f5f5f7] border-t border-black/[0.08] text-[#1d1d1f] relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Authentic Photography Stage */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="lg:col-span-6 order-2 lg:order-1"
          >
            <div className="relative w-full h-[400px] sm:h-[480px] rounded-3xl overflow-hidden border border-black/[0.08] shadow-xl bg-white group">
              <Image
                src="/images/real_jsm_welcome_trichy_salute.jpg"
                alt="JSM Security Personnel in ceremonial salute at Trichy Airport entrance"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Top Glass Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-black/[0.08] text-[#1d1d1f] text-[10px] font-mono font-bold uppercase shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  CIVIL AVIATION SALUTE PROTOCOL
                </span>
              </div>

              {/* Bottom Glass Caption */}
              <div className="absolute bottom-4 left-4 right-4 z-10 bg-white/95 backdrop-blur-xl p-4 sm:p-5 rounded-2xl border border-black/[0.08] space-y-1.5 shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#86868b] uppercase tracking-wider">
                    OPERATIONAL BENCHMARK
                  </span>
                  <span className="text-[10px] font-mono text-[#86868b] font-medium">
                    EST. 2011 • TAMIL NADU
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-[#1d1d1f]">
                  Trichy International Airport Terminal Security
                </h3>
                <p className="text-xs text-[#515154] leading-relaxed">
                  Ceremonial and access gate personnel deployed under direct executive inspection of Managing Director Sweety J.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Copy & 4 Key Highlights */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer(0.12)}
            className="lg:col-span-6 space-y-6 order-1 lg:order-2 text-left"
          >
            {/* Tag Badge */}
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-black/[0.06] text-[#86868b] text-xs font-mono font-medium tracking-wider uppercase shadow-2xs">
                Anytime, Anywhere
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1d1d1f] leading-[1.12] text-balance"
            >
              Dedicated to protecting what matters most.
            </motion.h2>

            {/* Subheadline Copy */}
            <motion.p 
              variants={fadeInUp}
              className="text-sm sm:text-base text-[#515154] font-normal leading-relaxed text-pretty"
            >
              JSM Integrated Services has been a leading benchmark in the integrated facility and security industry across South India. Originating as <strong>JSMMANPOWER</strong> and solidified by our landmark 2024 operations at <strong>Trichy International Airport</strong>, we provide disciplined protection solutions for manufacturing corridors, institutions, IT campuses, and commercial enterprises.
            </motion.p>

            {/* 4 Key Feature Points */}
            <motion.div 
              variants={staggerContainer(0.08)}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2"
            >
              {keyPoints.map((pt, idx) => {
                const Icon = pt.icon;
                return (
                  <motion.div 
                    key={idx}
                    variants={fadeInUp}
                    className="p-4 rounded-2xl bg-white border border-black/[0.06] hover:border-black/[0.15] transition-all space-y-2 shadow-2xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-[#f5f5f7] text-[#1d1d1f] shrink-0">
                        <Icon size={16} />
                      </div>
                      <h4 className="text-xs sm:text-sm font-semibold text-[#1d1d1f] tracking-tight">
                        {pt.title}
                      </h4>
                    </div>
                    <p className="text-xs text-[#86868b] font-normal leading-relaxed text-pretty">
                      {pt.desc}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Action Button */}
            <motion.div variants={fadeInUp} className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 h-11 rounded-full bg-[#1d1d1f] text-white hover:bg-black text-xs font-semibold transition-all press-scale min-touch-target shadow-xs group"
              >
                <span>About us</span>
                <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" strokeWidth={2.5} />
              </Link>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
