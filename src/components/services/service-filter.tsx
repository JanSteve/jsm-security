'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { getIcon } from './icon-map';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface ServiceFilterProps {
  categories: string[];
  services: any[];
}

export function ServiceFilter({ categories, services }: ServiceFilterProps) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredServices = activeCategory === 'All' 
    ? services 
    : services.filter(s => s.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="space-y-12">
      <div className="flex flex-wrap justify-center gap-2 md:gap-4">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? 'default' : 'outline'}
            onClick={() => setActiveCategory(category)}
            className={`rounded-full transition-all ${
              activeCategory === category 
                ? 'bg-[#D4AF37] text-[#0A1128] hover:bg-[#C9A227]' 
                : 'border-[#1A264D] text-[#94A3B8] hover:text-[#F8F9FA] hover:border-[#D4AF37]'
            }`}
          >
            {category}
          </Button>
        ))}
      </div>

      <motion.div 
        layout 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredServices.map((service) => {
            const IconComponent = getIcon(service.icon);
            return (
              <motion.div
                key={service.slug}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="group relative flex flex-col bg-[#121C3B] rounded-2xl p-6 border border-[#1A264D] hover:border-[#D4AF37]/50 transition-colors duration-300"
              >
                <div className="mb-6 flex justify-between items-start">
                  <div className="p-3 bg-[#1A264D] rounded-lg text-[#D4AF37]">
                    <IconComponent size={28} />
                  </div>
                  <Badge variant="secondary" className="bg-[#0A1128] text-[#94A3B8] border-none">
                    {service.category}
                  </Badge>
                </div>
                
                <h3 className="text-xl font-bold text-[#F8F9FA] mb-3">{service.title}</h3>
                <p className="text-[#94A3B8] mb-6 flex-grow">{service.description}</p>
                
                <div className="pt-4 border-t border-[#1A264D] mt-auto">
                  <Link 
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center text-sm font-semibold text-[#3B82F6] hover:text-[#D4AF37] transition-colors group-hover:gap-2 gap-1 duration-300"
                  >
                    Explore Service <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
