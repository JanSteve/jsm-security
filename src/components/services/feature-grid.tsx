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
            className="flex gap-4 p-6 bg-zinc-50 rounded-3xl border border-zinc-200/60 hover:border-[#C5A880]/30 hover:shadow-md transition-all duration-300 group shadow-sm"
          >
            <div className="p-3 bg-white border border-zinc-200 rounded-2xl text-[#C5A880] group-hover:bg-[#C5A880] group-hover:text-white transition-colors duration-300 h-fit shadow-sm">
              <IconComponent size={24} />
            </div>
            <div>
              <h4 className="text-lg font-bold text-black mb-2">{feature.title}</h4>
              <p className="text-zinc-500 text-sm leading-relaxed font-medium">{feature.description}</p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
