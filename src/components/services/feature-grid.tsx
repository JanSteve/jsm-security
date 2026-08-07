'use client';

import { motion } from 'motion/react';
import { getIcon } from './icon-map';

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface FeatureGridProps {
  features: Feature[];
}

export function FeatureGrid({ features }: FeatureGridProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring' as const, stiffness: 300, damping: 24 } 
    }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {features.map((feature, i) => {
        const IconComponent = getIcon(feature.icon);
        return (
          <motion.div 
            key={i} 
            variants={item}
            className="flex gap-4 p-6 bg-[#121C3B]/50 rounded-2xl border border-[#1A264D] hover:border-[#D4AF37]/30 transition-colors duration-300 group"
          >
            <div className="p-3 bg-[#1A264D] rounded-xl text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#0A1128] transition-colors duration-300 h-fit">
              <IconComponent size={24} />
            </div>
            <div>
              <h4 className="text-lg font-bold text-[#F8F9FA] mb-2">{feature.title}</h4>
              <p className="text-[#94A3B8] text-sm leading-relaxed">{feature.description}</p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
