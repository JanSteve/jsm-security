'use client';

import { motion } from 'motion/react';
import { ClipboardCheck, Cog, Eye, Shield, Lightbulb, Award, Clock } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/motion';

export function WhyJSM() {
  const processSteps = [
    { icon: ClipboardCheck, title: 'Assess', description: 'Comprehensive audit of vulnerabilities and requirements.' },
    { icon: Cog, title: 'Implement', description: 'Deploying tailored solutions and vetted personnel.' },
    { icon: Eye, title: 'Monitor', description: '24/7 oversight, rapid response, and continuous refinement.' }
  ];

  const values = [
    { icon: Shield, title: 'Trust', description: 'Unwavering commitment to confidentiality and integrity.' },
    { icon: Lightbulb, title: 'Innovation', description: 'Leveraging cutting-edge tech and AI to stay ahead.' },
    { icon: Award, title: 'Excellence', description: 'Premium service delivery without compromise.' },
    { icon: Clock, title: 'Reliability', description: 'Always on, always ready. 24/7/365 coverage.' }
  ];

  return (
    <section className="py-24 bg-surface-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-jakarta font-bold mb-4 text-foreground"
          >
            Why Choose JSM
          </motion.h2>
        </div>

        {/* Process Steps */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer(0.2)}
          className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-12 md:gap-4 mb-24"
        >
          {/* Horizontal Line for Desktop */}
          <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-[2px] bg-border -translate-y-1/2 z-0" />
          
          {processSteps.map((step, idx) => (
            <motion.div 
              key={idx} 
              variants={fadeInUp}
              className="relative z-10 flex flex-col items-center text-center max-w-xs mx-auto"
            >
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground mb-6 shadow-[0_0_20px_rgba(212,175,55,0.4)] relative">
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center text-xs font-bold text-foreground">
                  {idx + 1}
                </span>
                <step.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold font-jakarta mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Values Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer(0.1)}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {values.map((val, idx) => (
            <motion.div 
              key={idx}
              variants={fadeInUp}
              className="p-6 rounded-xl bg-card border border-border flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-full bg-surface-2 flex items-center justify-center text-primary mb-4">
                <val.icon className="w-6 h-6" />
              </div>
              <h4 className="font-bold font-jakarta mb-2">{val.title}</h4>
              <p className="text-sm text-muted-foreground">{val.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
