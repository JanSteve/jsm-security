'use client';

import { motion } from 'motion/react';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fadeInUp, staggerContainer } from '@/lib/motion';

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden bg-background">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[60%] bg-primary/20 blur-[100px] rounded-full pointer-events-none z-0" />
      
      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer(0.2)}
          className="flex flex-col items-center"
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-jakarta font-bold mb-6 text-foreground"
          >
            Ready to Secure Your Future?
          </motion.h2>
          
          <motion.p 
            variants={fadeInUp}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl"
          >
            Partner with JSM Security for elite protection, integrated facility management, and bespoke digital solutions. Get your free comprehensive assessment today.
          </motion.p>
          
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 mb-8 w-full sm:w-auto"
          >
            <Button size="lg" className="w-full sm:w-auto text-primary-foreground font-semibold h-14 px-8 text-base">
              Request Free Assessment
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-base border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Phone className="w-5 h-5 mr-2" />
              Call Us Now
            </Button>
          </motion.div>
          
          <motion.div 
            variants={fadeInUp}
            className="text-sm text-muted-foreground"
          >
            Available 24/7 at <a href="tel:+448001234567" className="font-bold text-foreground hover:text-primary transition-colors">+44 800 123 4567</a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
