'use client';

import { motion } from 'motion/react';
import { Phone, ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fadeInUp, staggerContainer } from '@/lib/motion';
import Link from 'next/link';
import { brandData } from '@/data/brand';

export function CTASection() {
  const cleanPhone = brandData.contact.phone.replace(/[^0-9+]/g, '');
  const cleanWA = brandData.contact.whatsapp.replace(/[^0-9]/g, '');

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
            <Button asChild size="lg" className="w-full sm:w-auto bg-black text-white hover:bg-zinc-800 font-bold h-12 px-8 rounded-full shadow-lg">
              <Link href="/contact">
                Request a Site Assessment <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>

            <a
              href={`https://wa.me/${cleanWA}?text=Hi%20JSM%20Integrated%20Services,%20I%20would%20like%20to%20discuss%20an%20operational%20requirement.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 h-12 rounded-full text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors shadow-sm"
            >
              <MessageCircle size={16} className="text-emerald-600" />
              WhatsApp Operations Desk
            </a>
          </motion.div>
          
          <motion.div 
            variants={fadeInUp}
            className="text-xs text-zinc-500 font-medium pt-2"
          >
            Direct Executive Helpline:{" "}
            <a href={`tel:${cleanPhone}`} className="font-bold text-black hover:text-[#C5A880] transition-colors">
              {brandData.contact.phoneDisplay}
            </a>
            {" • "}
            <span>{brandData.contact.email}</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
