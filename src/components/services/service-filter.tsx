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
            className={`rounded-full transition-all px-6 h-10 ${
              activeCategory === category 
                ? 'bg-black text-white hover:bg-zinc-800' 
                : 'border-zinc-200 text-zinc-600 hover:text-black hover:border-black'
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
                className="group relative flex flex-col bg-zinc-50 rounded-3xl p-6 border border-zinc-200/60 hover:border-[#C5A880]/30 hover:shadow-md transition-all duration-300"
              >
                <div className="mb-6 flex justify-between items-start">
                  <div className="p-3 bg-white border border-zinc-200 rounded-xl text-[#C5A880] group-hover:bg-[#C5A880] group-hover:text-white transition-colors duration-300">
                    <IconComponent size={24} />
                  </div>
                  <Badge className="bg-white border border-zinc-200 text-zinc-600 rounded-lg px-2.5 py-0.5">
                    {service.category}
                  </Badge>
                </div>
                
                <h3 className="text-xl font-bold text-black mb-3 group-hover:text-[#C5A880] transition-colors">{service.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed mb-6 flex-grow">{service.description}</p>
                
                <div className="pt-4 border-t border-zinc-200/40 mt-auto">
                  <Link 
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center text-sm font-semibold text-[#3B82F6] hover:text-[#C5A880] transition-colors group-hover:gap-2 gap-1 duration-300"
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
