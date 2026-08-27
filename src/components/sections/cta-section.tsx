'use client';

import { motion } from 'motion/react';
import { Phone, ArrowRight, MessageCircle, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fadeInUp, staggerContainer } from '@/lib/motion';
import Link from 'next/link';
import { brandData } from '@/data/brand';

export function CTASection() {

  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-white border-t border-zinc-200/80">
      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer(0.15)}
          className="flex flex-col items-center space-y-6"
        >
          <motion.span
            variants={fadeInUp}
            className="text-xs font-extrabold uppercase tracking-widest text-[#C5A880]"
          >
            Direct Operational Partnership
          </motion.span>

          <motion.h2 
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-6xl font-black text-black tracking-tight leading-tight"
          >
            Let’s make your operation easier to manage.
          </motion.h2>
          
          <motion.p 
            variants={fadeInUp}
            className="text-base sm:text-lg md:text-xl text-zinc-600 font-medium max-w-2xl leading-relaxed"
          >
            Consolidate your security, housekeeping, and staffing under one disciplined partner. Request a free on-site risk and manpower assessment today.
          </motion.p>
          
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-3 pt-2 w-full sm:w-auto"
          >
            <Button asChild size="lg" className="w-full sm:w-auto bg-black text-white hover:bg-zinc-800 font-black h-12 px-8 rounded-full shadow-xl border-b-2 border-[#C5A880] uppercase tracking-wider hover:scale-105 active:scale-95 transition-all">
              <Link href="/get-quote">
                GET INSTANT QUOTE <ArrowRight size={16} className="ml-2 text-[#C5A880]" />
              </Link>
            </Button>

            <a
              href="mailto:jsmintegratedservices@outlook.com?subject=Operations%20Assessment%20Inquiry"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 h-12 rounded-full text-xs font-bold text-blue-950 bg-blue-50 hover:bg-blue-100/90 border border-blue-300 hover:border-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.25)] transition-all shadow-xs active:scale-95"
            >
              <Mail size={16} className="text-blue-600" />
              Email Operations Desk
            </a>
          </motion.div>
          
          <motion.div 
            variants={fadeInUp}
            className="text-xs text-zinc-500 font-medium pt-2"
          >
            Official Operations Contact:{" "}
            <span className="font-bold text-black">{brandData.contact.email}</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
