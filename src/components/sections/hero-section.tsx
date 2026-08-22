"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Shield, Sparkles, Users, ArrowRight, MessageCircle, CheckCircle2, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { brandData } from "@/data/brand";

export function HeroSection() {
  const cleanWA = brandData.contact.whatsapp.replace(/[^0-9]/g, '');

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-white">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-zinc-100/80 to-transparent rounded-full blur-3xl -z-10" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Tag Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-100 border border-zinc-200/80 text-zinc-800 text-xs font-bold"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>JSM INTEGRATED SERVICES • TAMIL NADU & INDIA</span>
          </motion.div>

          {/* Main Hero Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-black leading-[1.08]"
          >
            One Partner.<br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 bg-clip-text text-transparent">
              Every Solution.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-zinc-600 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            You shouldn’t need five vendors to keep one property running. We coordinate disciplined <strong>Private Security</strong>, <strong>Housekeeping & Facilities</strong>, <strong>Contractual Manpower</strong>, and <strong>Business Operations</strong> under one accountable partner.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2"
          >
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-black hover:bg-zinc-800 text-white rounded-full h-12 px-7 text-sm font-bold shadow-lg flex items-center justify-center gap-2 group"
            >
              <Link href="/contact">
                Request a Site Assessment
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <a
              href={`https://wa.me/${cleanWA}?text=Hi%20JSM%20Integrated%20Services,%20I%20would%20like%20to%20discuss%20our%20facility%20requirements.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 h-12 rounded-full text-sm font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors shadow-sm"
            >
              <MessageCircle size={17} className="text-emerald-600" />
              WhatsApp JSM Desk
            </a>

            <Button
              asChild
              variant="ghost"
              size="lg"
              className="w-full sm:w-auto text-zinc-700 hover:text-black hover:bg-zinc-100 rounded-full h-12 px-6 text-sm font-bold"
            >
              <Link href="/services">
                Explore Services
              </Link>
            </Button>
          </motion.div>

          {/* Quick Truthful Proof Points */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-6 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs font-semibold text-zinc-500"
          >
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-[#C5A880]" />
              Founder-Led by Sweety R (MD)
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-[#C5A880]" />
              Proven 2024 Trichy Airport Contract
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-[#C5A880]" />
              5-Day Structured Staff Induction
            </span>
          </motion.div>
        </div>

        {/* Visual Hero Showcase Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-14 max-w-5xl mx-auto rounded-3xl overflow-hidden border border-zinc-200/80 shadow-2xl bg-zinc-900 relative"
        >
          <div className="relative h-[260px] sm:h-[380px] md:h-[460px] w-full">
            <Image
              src="/images/hero_operations.jpg"
              alt="JSM Integrated Services Professional Operations"
              fill
              priority
              className="object-cover object-center opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
            
            {/* Overlay Info Card */}
            <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 flex flex-col md:flex-row md:items-end justify-between gap-4 text-white">
              <div className="space-y-1">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#C5A880]">
                  Integrated Service Operations
                </span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight leading-tight">
                  Discipline is not an accident.<br className="hidden sm:inline" /> It is a system.
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/about"
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 rounded-full text-xs font-bold text-white transition-colors flex items-center gap-1.5"
                >
                  Our Operating Story <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
