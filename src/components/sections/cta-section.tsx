'use client';

import { motion } from 'motion/react';
import { Phone, ArrowRight, MessageCircle, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fadeInUp, staggerContainer } from '@/lib/motion';
import Link from 'next/link';
import { brandData } from '@/data/brand';

export function CTASection() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-[#f5f5f7] border-t border-black/[0.08] text-[#1d1d1f]">
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
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-black/[0.08] text-xs font-semibold text-[#1d1d1f] tracking-wide uppercase shadow-sm"
          >
            <span>Direct Operational Partnership</span>
          </motion.div>

          <motion.h2 
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-[#1d1d1f] tracking-tight leading-[1.08] text-balance"
          >
            Ready to experience disciplined security solutions?
          </motion.h2>
          
          <motion.p 
            variants={fadeInUp}
            className="text-sm sm:text-base md:text-lg text-[#86868b] font-normal max-w-2xl leading-relaxed text-pretty"
          >
            JSM is here to ensure your peace of mind. Connect with us today and take the first step towards disciplined facility protection and zero statutory liability.
          </motion.p>
          
          <motion.div 
            variants={fadeInUp}
            className="flex flex-wrap items-center justify-center gap-3.5 pt-3 w-full"
          >
            <Button asChild size="lg" className="bg-[#0071e3] text-white hover:bg-[#0077ed] font-semibold h-12 px-8 rounded-full shadow-sm tracking-wide transition-all min-h-[44px]">
              <Link href="/get-quote">
                <span>Request a quote</span> <ArrowRight size={15} className="ml-2 text-white" strokeWidth={2.5} />
              </Link>
            </Button>

            <a
              href={`tel:${brandData.contact.phone}`}
              className="inline-flex items-center justify-center gap-2 px-6 h-12 rounded-full text-xs font-semibold text-[#1d1d1f] bg-white hover:bg-black/[0.04] border border-black/[0.1] transition-all min-h-[44px] tabular-nums shadow-sm"
            >
              <Phone size={14} className="text-[#0071e3]" />
              <span>Call: {brandData.contact.phoneDisplay}</span>
            </a>

            <a
              href={`https://wa.me/${brandData.contact.whatsapp}?text=Hello%20JSM%20Integrated%20Services,%20I%20would%20like%20to%20inquire%20about%20your%20services.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 h-12 rounded-full text-xs font-semibold text-[#1d1d1f] bg-white hover:bg-black/[0.04] border border-black/[0.1] transition-all min-h-[44px] shadow-sm"
            >
              <MessageCircle size={15} className="text-emerald-600" />
              <span>WhatsApp</span>
            </a>
          </motion.div>
          
          <motion.div 
            variants={fadeInUp}
            className="text-xs text-[#86868b] font-normal pt-2"
          >
            Operations desk:{" "}
            <a href={`mailto:${brandData.contact.email}`} className="font-semibold text-[#0071e3] hover:underline transition-colors">
              {brandData.contact.email}
            </a>
            {" "}• Trichy HQ, Tamil Nadu
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
