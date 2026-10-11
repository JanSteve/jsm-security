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
    hidden: { opacity: 0, y: 16 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.35, ease: "easeOut" as const } 
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
            className="flex gap-4 p-6 bg-[#070B12] rounded-xl border border-white/10 hover:border-[#D4AF37]/40 hover:shadow-lg transition-all duration-300 group"
          >
            <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-colors duration-300 h-fit shadow-xs">
              <IconComponent size={22} />
            </div>
            <div>
              <h4 className="text-base font-bold text-white mb-1.5 tracking-tight">{feature.title}</h4>
              <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed font-normal">{feature.description}</p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
