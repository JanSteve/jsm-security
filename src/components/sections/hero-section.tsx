'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { staggerContainer, fadeInUp } from '@/lib/motion';
import { useRef } from 'react';
import Link from 'next/link';

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const yImage = useTransform(scrollYProgress, [0, 1], ['0%', '-5%']);

  return (
    <section 
      ref={ref}
      className="relative min-h-screen pt-32 pb-20 overflow-hidden flex flex-col items-center justify-center bg-white"
    >
      {/* Light soft gold/silver gradient backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(197,168,128,0.06)_0%,rgba(255,255,255,1)_60%)] z-0 pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <motion.div
          style={{ y: yText }}
          variants={staggerContainer(0.15, 0)}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center flex flex-col items-center mb-16"
        >
          {/* Badge */}
          <motion.div 
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200/80 bg-zinc-50/80 backdrop-blur-sm mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="text-xs font-semibold text-zinc-600 uppercase tracking-widest">24/7 Operations Command Active</span>
          </motion.div>

          {/* Headline (Apple Style) */}
          <motion.h1 
            variants={fadeInUp}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-black tracking-tight leading-[0.95] mb-6"
          >
            Secure. Integrated.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5A880] to-[#E5C49A]">Elevated.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p 
            variants={fadeInUp}
            className="text-lg md:text-2xl text-zinc-500 font-medium max-w-2xl leading-relaxed mb-8"
          >
            Premium corporate security, facilities coordination, and digital enterprise applications. Unified under JSM operational standards.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Button asChild size="lg" className="w-full sm:w-auto bg-black text-white hover:bg-zinc-800 font-semibold h-14 px-8 rounded-full shadow-lg">
              <Link href="/contact">Get Free Assessment</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto border-zinc-300 text-zinc-800 hover:bg-zinc-50 font-semibold h-14 px-8 rounded-full">
              <Link href="/services">Explore Services</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Hero Widescreen Showcase Image (Apple Product Style) */}
        <motion.div
          style={{ y: yImage }}
          initial={{ opacity: 0, y: 80, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 100, damping: 20 }}
          className="relative w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl border border-zinc-200/80 bg-zinc-100/50 p-2 md:p-3"
        >
          <div className="rounded-2xl overflow-hidden border border-zinc-200 shadow-inner">
            <img 
              src="/images/hero_operations.jpg" 
              alt="JSM Command Operations Center"
              className="w-full h-auto object-cover max-h-[500px]"
            />
          </div>

          {/* Floater Badge */}
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 bg-white/90 backdrop-blur-md border border-zinc-200 p-4 rounded-2xl flex items-center gap-3 shadow-lg">
            <div className="p-2 bg-amber-500/10 text-amber-600 rounded-xl">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-black leading-tight">Elite Guarding</h4>
              <p className="text-[10px] text-zinc-500">Securing Canary Wharf HQ</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
