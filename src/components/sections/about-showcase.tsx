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
    <section className="py-16 md:py-20 bg-[#07090E] border-t border-white/10 text-white relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#C5A880]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Authentic Photography Stage with Framer Glass Accents */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="lg:col-span-6 order-2 lg:order-1"
          >
            <div className="relative w-full h-[400px] sm:h-[480px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-950 group">
              <Image
                src="/images/real_jsm_welcome_trichy_salute.jpg"
                alt="JSM Security Personnel in ceremonial salute at Trichy Airport entrance"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />

              {/* Top Glass Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[#C5A880] text-[10px] font-mono font-bold uppercase">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  CIVIL AVIATION SALUTE PROTOCOL
                </span>
              </div>

              {/* Bottom Glass Caption */}
              <div className="absolute bottom-4 left-4 right-4 z-10 bg-black/75 backdrop-blur-xl p-4 sm:p-5 rounded-2xl border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#C5A880] uppercase tracking-wider">
                    OPERATIONAL BENCHMARK
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400 font-bold">
                    EST. 2011 • TAMIL NADU
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-black text-white">
                  Trichy International Airport Terminal Security
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Ceremonial and access gate personnel deployed under direct executive inspection of Managing Director Sweety J.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Framer Copy & 4 Key Highlights */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer(0.12)}
            className="lg:col-span-6 space-y-6 order-1 lg:order-2 text-left"
          >
            {/* Tag Badge */}
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#C5A880] text-xs font-mono font-bold tracking-wider uppercase">
                [Anytime, Anywhere]
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-[1.12] text-balance"
            >
              Dedicated to protecting what matters most.
            </motion.h2>

            {/* Subheadline Copy */}
            <motion.p 
              variants={fadeInUp}
              className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed text-pretty"
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
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#C5A880]/50 transition-all space-y-2 group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-black/60 border border-white/10 text-[#C5A880] group-hover:bg-[#C5A880] group-hover:text-black transition-colors shrink-0">
                        <Icon size={16} />
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight">
                        {pt.title}
                      </h4>
                    </div>
                    <p className="text-xs text-zinc-400 font-normal leading-relaxed text-pretty">
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
                className="inline-flex items-center gap-2 px-6 h-11 rounded-full bg-white text-black hover:bg-[#C5A880] text-xs font-black transition-all press-scale min-touch-target shadow-md group"
              >
                <span>About us</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
              </Link>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
