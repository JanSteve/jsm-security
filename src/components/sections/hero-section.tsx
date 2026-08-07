'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { staggerContainer, fadeInUp } from '@/lib/motion';
import { useRef } from 'react';

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <section 
      ref={ref}
      className="relative min-h-screen overflow-hidden flex items-center justify-center bg-background"
    >
      {/* Background with gradient and parallax */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(10,17,40,0)_0%,rgba(10,17,40,1)_100%)]"
      />
      
      {/* Gold radial glow circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-primary/20 blur-[120px] pointer-events-none z-0" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer(0.2, 0)}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center flex flex-col items-center"
        >
          {/* Badge */}
          <motion.div 
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-surface-1/50 backdrop-blur-sm mb-8"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-muted-foreground">24/7 Monitoring Active</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            variants={fadeInUp}
            className="font-jakarta font-bold text-foreground leading-tight mb-6"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            Secure. Integrated. <span className="text-gradient">Elevated.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p 
            variants={fadeInUp}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl"
          >
            Premium corporate security, facility management, and digital solutions designed to protect and elevate your enterprise in an unpredictable world.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 mb-16 w-full sm:w-auto"
          >
            <Button size="lg" className="w-full sm:w-auto text-primary-foreground font-semibold h-12 px-8">
              Request Assessment
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8">
              Explore Services
            </Button>
          </motion.div>

          {/* Stats Row */}
          <motion.div 
            variants={staggerContainer(0.1, 0.8)}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full border-t border-border pt-8"
          >
            {[
              { label: 'Elite Operatives', value: '500+' },
              { label: 'Client Retention', value: '99%' },
              { label: 'Global Reach', value: '24/7' },
              { label: 'Vetted Experts', value: '100%' },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeInUp} className="flex flex-col items-center">
                <span className="text-2xl font-bold text-primary mb-1">{stat.value}</span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
