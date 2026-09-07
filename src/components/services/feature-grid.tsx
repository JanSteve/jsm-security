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
            className="flex gap-4 p-6 bg-[#f5f5f7] rounded-[24px] border border-black/[0.06] hover:border-black/[0.15] hover:shadow-sm transition-all duration-300 group"
          >
            <div className="p-3 bg-white border border-black/[0.06] rounded-2xl text-[#0071e3] group-hover:bg-[#1d1d1f] group-hover:text-white transition-colors duration-300 h-fit shadow-2xs">
              <IconComponent size={22} />
            </div>
            <div>
              <h4 className="text-base font-bold text-[#1d1d1f] mb-1.5 tracking-tight">{feature.title}</h4>
              <p className="text-[#515154] text-xs sm:text-sm leading-relaxed font-normal">{feature.description}</p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
