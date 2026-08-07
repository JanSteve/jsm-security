'use client';

import { motion } from 'motion/react';
import { ClipboardCheck, Cog, Eye, Shield, Lightbulb, Award, Clock } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/motion';

export function WhyJSM() {
  const processSteps = [
    { 
      icon: ClipboardCheck, 
      title: '1. Strategic Audit & Assessment', 
      description: 'We perform a comprehensive evaluation of building structures, VIP itineraries, and digital vectors to identify vulnerability profiles.' 
    },
    { 
      icon: Cog, 
      title: '2. Professional Tactical Deployment', 
      description: 'Assigning SIA-vetted protective details, installing smart IoT cameras, and setting up workspace coordinators under standard SLAs.' 
    },
    { 
      icon: Eye, 
      title: '3. 24/7 Command Center Monitoring', 
      description: 'Continuous oversight from our remote command center. Proactive threat mitigation and real-time portal reporting.' 
    }
  ];

  const values = [
    { icon: Shield, title: 'Absolute Discretion', description: 'Upholding strict confidentiality and NDA-compliant guard operations.' },
    { icon: Lightbulb, title: 'Smart Technology', description: 'Unified data sensors, biometric logs, and real-time client portal reporting.' },
    { icon: Award, title: 'ISO Gold Certifications', description: 'Certified security guarding and facility operations matching NSI standards.' },
    { icon: Clock, title: '24/7 Availability', description: 'Active duty dispatch and operational managers ready to deploy instantly.' }
  ];

  return (
    <section className="py-32 bg-white border-b border-zinc-200/80 relative z-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Header */}
        <div className="text-center mb-24">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-black text-black tracking-tighter mb-4"
          >
            Sovereign Standard of Operations
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto font-medium"
          >
            We combine military-grade discipline, smart facilities software, and premium hospitality coordination.
          </motion.p>
        </div>

        {/* Split Layout: Process vs Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-32">
          
          {/* Left Side: Process Steps */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer(0.12)}
            className="lg:col-span-7 space-y-6"
          >
            {processSteps.map((step, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeInUp}
                className="flex gap-5 p-6 bg-zinc-50 rounded-3xl border border-zinc-200/60 hover:border-[#C5A880]/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white border border-zinc-200 text-[#C5A880] flex items-center justify-center flex-shrink-0 group-hover:bg-[#C5A880] group-hover:text-white transition-colors duration-300 shadow-sm">
                  <step.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-black mb-1.5">{step.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Side: Elite Agent Image (Apple-Style Framing) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="lg:col-span-5 relative rounded-3xl overflow-hidden shadow-xl border border-zinc-200/80 bg-zinc-50 p-2 md:p-3"
          >
            <div className="rounded-2xl overflow-hidden border border-zinc-200">
              <img 
                src="/images/protective_guard.jpg" 
                alt="Elite JSM Close Protection Officer"
                className="w-full h-auto object-cover min-h-[400px]"
              />
            </div>
            <div className="absolute top-6 left-6 md:top-8 md:left-8 bg-black/85 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10">
              Elite Close Protection Detail
            </div>
          </motion.div>
        </div>

        {/* Values Grid */}
        <div className="border-t border-zinc-200/60 pt-24">
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest text-center mb-12">Our Operational Values</h3>
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
                className="p-8 rounded-3xl bg-zinc-50 border border-zinc-200/60 flex flex-col items-center text-center hover:shadow-md transition-shadow duration-300 shadow-sm"
              >
                <div className="w-12 h-12 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center text-[#C5A880] mb-5 shadow-sm">
                  <val.icon className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-black mb-2">{val.title}</h4>
                <p className="text-xs text-zinc-500 leading-relaxed font-medium">{val.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
