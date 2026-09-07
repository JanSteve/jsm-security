'use client';

import { motion } from 'motion/react';
import { Phone, ArrowRight, MessageCircle, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fadeInUp, staggerContainer } from '@/lib/motion';
import Link from 'next/link';
import { brandData } from '@/data/brand';

export function CTASection() {
  return (
    <section className="py-16 md:py-20 relative overflow-hidden bg-[#07090E] border-t border-white/10 text-white">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#C5A880]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer(0.12)}
          className="flex flex-col items-center space-y-6"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-bold text-[#C5A880] tracking-wider uppercase"
          >
            <span>[Direct Operational Partnership]</span>
          </motion.div>

          <motion.h2 
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08] text-balance"
          >
            Ready to experience unparalleled security solutions?
          </motion.h2>
          
          <motion.p 
            variants={fadeInUp}
            className="text-sm sm:text-base md:text-lg text-zinc-300 font-normal max-w-2xl leading-relaxed text-pretty"
          >
            JSM is here to ensure your peace of mind. Connect with us today and take the first step towards disciplined facility protection and zero statutory liability.
          </motion.p>
          
          <motion.div 
            variants={fadeInUp}
            className="flex flex-wrap items-center justify-center gap-3.5 pt-3 w-full"
          >
            <Button asChild size="lg" className="bg-[#C5A880] text-black hover:bg-[#b59870] font-black h-12 px-8 rounded-full shadow-xl tracking-wider transition-all min-h-[44px] press-scale">
              <Link href="/get-quote">
                <span>Request a quote</span> <ArrowRight size={15} className="ml-2 text-black" strokeWidth={2.5} />
              </Link>
            </Button>

            <a
              href={`tel:${brandData.contact.phone}`}
              className="inline-flex items-center justify-center gap-2 px-6 h-12 rounded-full text-xs font-bold text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-all min-h-[44px] press-scale font-mono tabular-nums shadow-sm"
            >
              <Phone size={14} className="text-[#C5A880]" />
              <span>Call: {brandData.contact.phoneDisplay}</span>
            </a>

            <a
              href={`https://wa.me/${brandData.contact.whatsapp}?text=Hello%20JSM%20Integrated%20Services,%20I%20would%20like%20to%20inquire%20about%20your%20services.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 h-12 rounded-full text-xs font-bold text-emerald-400 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/40 transition-all min-h-[44px] press-scale shadow-sm"
            >
              <MessageCircle size={15} />
              <span>WhatsApp</span>
            </a>
          </motion.div>
          
          <motion.div 
            variants={fadeInUp}
            className="text-xs text-zinc-400 font-normal pt-2 font-mono"
          >
            Operations desk:{" "}
            <a href={`mailto:${brandData.contact.email}`} className="font-semibold text-zinc-200 hover:text-[#C5A880] transition-colors">
              {brandData.contact.email}
            </a>
            {" "}• Trichy HQ, Tamil Nadu
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
