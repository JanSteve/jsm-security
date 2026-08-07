'use client';

import { motion } from 'motion/react';
import { Phone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fadeInUp, staggerContainer } from '@/lib/motion';
import Link from 'next/link';

export function CTASection() {
  return (
    <section className="py-32 relative overflow-hidden bg-white border-t border-zinc-200/80">
      {/* Light soft gold/silver gradient backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,168,128,0.04)_0%,rgba(255,255,255,1)_70%)] z-0 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer(0.15)}
          className="flex flex-col items-center"
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-black text-black tracking-tight mb-6"
          >
            Ready to Secure Your Future?
          </motion.h2>
          
          <motion.p 
            variants={fadeInUp}
            className="text-lg md:text-xl text-zinc-500 font-medium mb-10 max-w-2xl leading-relaxed"
          >
            Partner with JSM for elite close protection, smart facilities systems, and bespoke digital media solutions. Request a customized assessment today.
          </motion.p>
          
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 mb-8 w-full sm:w-auto"
          >
            <Button asChild size="lg" className="w-full sm:w-auto bg-black text-white hover:bg-zinc-800 font-semibold h-14 px-8 rounded-full shadow-lg">
              <Link href="/contact">Request Free Assessment</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto border-zinc-300 text-zinc-800 hover:bg-zinc-50 font-semibold h-14 px-8 rounded-full">
              <a href="tel:+442071234567">
                <Phone className="w-5 h-5 mr-2" />
                Call Us Now
              </a>
            </Button>
          </motion.div>
          
          <motion.div 
            variants={fadeInUp}
            className="text-sm text-zinc-400 font-medium"
          >
            Advisor dispatcher line active 24/7 at{" "}
            <a href="tel:+442071234567" className="font-bold text-black hover:text-[#C5A880] transition-colors">
              +44 (0) 20 7123 4567
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
