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
            className="flex gap-4 p-6 bg-[#F6F7F9] rounded-xl border border-[#E4E7EC] hover:border-[#0F2A47]/30 hover:shadow-xs transition-all duration-300 group"
          >
            <div className="p-3 bg-white border border-[#E4E7EC] rounded-lg text-[#0F2A47] group-hover:bg-[#0F2A47] group-hover:text-white transition-colors duration-300 h-fit shadow-2xs">
              <IconComponent size={22} />
            </div>
            <div>
              <h4 className="text-base font-bold text-[#14181F] mb-1.5 tracking-tight">{feature.title}</h4>
              <p className="text-[#4A5160] text-xs sm:text-sm leading-relaxed font-normal">{feature.description}</p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
