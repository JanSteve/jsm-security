'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { getIcon } from './icon-map';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Service } from '@/data/services';

interface ServiceFilterProps {
  categories: string[];
  services: Service[];
}

export function ServiceFilter({ categories, services }: ServiceFilterProps) {
  const [activeCategory, setActiveCategory] = useState('All Services');

  const filteredServices = services.filter((s) => {
    if (activeCategory === 'All Services') return true;
    if (activeCategory === 'Core Operations (Phase 1)') return s.isCoreLaunch;
    if (activeCategory === 'Integrated Business Solutions (Phase 2)') return !s.isCoreLaunch;
    if (activeCategory === 'Security & Guarding') return s.category === 'security';
    if (activeCategory === 'Facility & Housekeeping') return s.category === 'facilities';
    if (activeCategory === 'Manpower & Staffing') return s.category === 'manpower';
    return true;
  });

  return (
    <div className="space-y-12">
      {/* Category Pills */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-3">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? 'default' : 'outline'}
            onClick={() => setActiveCategory(category)}
            className={`rounded-full transition-all px-5 min-h-[44px] text-xs font-bold press-scale ${
              activeCategory === category 
                ? 'bg-white text-black hover:bg-zinc-200 border border-[#C5A880] shadow-sm' 
                : 'border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 bg-[#0B0F17]'
            }`}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Services Grid */}
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
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="group relative flex flex-col bg-[#0B0F17] rounded-3xl p-7 border border-zinc-800 hover:border-[#C5A880]/60 transition-all duration-300 shadow-xl"
              >
                <div className="mb-5 flex justify-between items-start">
                  <div className="p-3 bg-[#121824] border border-zinc-800 rounded-2xl text-[#C5A880] group-hover:border-[#C5A880] transition-colors duration-300 shadow-sm">
                    <IconComponent size={22} />
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase ${
                    service.isCoreLaunch 
                      ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60' 
                      : 'bg-blue-950/60 text-blue-400 border border-blue-800/60'
                  }`}>
                    {service.isCoreLaunch ? 'Core Phase 1' : 'Expansion Phase 2'}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 leading-snug">
                  {service.title}
                </h3>
                <p className="text-zinc-400 text-xs font-medium mb-4 text-[#C5A880]">
                  {service.valueProposition}
                </p>
                <p className="text-zinc-400 text-xs leading-relaxed mb-6 flex-grow font-normal text-pretty">
                  {service.description}
                </p>

                {/* Who It Is For Sample */}
                <div className="space-y-1.5 mb-6 pt-4 border-t border-zinc-800/60">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-mono">
                    Typical deployments:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {service.whoItIsFor.slice(0, 3).map((target, idx) => (
                      <span key={idx} className="text-[10px] bg-[#121824] border border-zinc-800 px-2.5 py-1 rounded-lg text-zinc-300 font-medium">
                        {target}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 border-t border-zinc-800/60 mt-auto flex items-center justify-between">
                  <Link 
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center text-xs font-bold text-[#C5A880] hover:text-white gap-1.5 min-h-[44px] press-scale"
                  >
                    View scope &amp; checklists <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-[#C5A880]" />
                  </Link>

                  <Link
                    href="/contact"
                    className="text-[11px] font-bold text-zinc-400 hover:text-white min-h-[44px] inline-flex items-center press-scale"
                  >
                    Request quote →
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
