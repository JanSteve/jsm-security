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
  const [activeCategory, setActiveCategory] = useState('All Capabilities');

  const filteredServices = services.filter((s) => {
    if (activeCategory === 'All Capabilities' || activeCategory === 'All Services') return true;
    if (activeCategory.includes('Tier 1')) return s.category === 'security';
    if (activeCategory.includes('Tier 2')) return s.category === 'manpower';
    if (activeCategory.includes('Tier 3')) return s.category === 'facilities';
    if (activeCategory.includes('GeM')) return s.category === 'tender';
    if (activeCategory.includes('IT')) return s.category === 'digital';
    if (activeCategory.includes('Citizen')) return s.category === 'csc';
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
            className={`rounded-full transition-all px-5 min-h-[44px] text-xs font-semibold ${
              activeCategory === category 
                ? 'bg-[#1d1d1f] text-white hover:bg-black border-transparent shadow-sm' 
                : 'border-black/[0.08] text-[#515154] hover:text-[#1d1d1f] hover:bg-black/[0.04] bg-[#f5f5f7]'
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
                className="group relative flex flex-col bg-[#f5f5f7] rounded-[28px] p-7 border border-black/[0.06] hover:border-black/[0.12] transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div className="mb-5 flex justify-between items-start">
                  <div className="p-3 bg-white border border-black/[0.08] rounded-2xl text-[#0071e3] group-hover:scale-105 transition-transform duration-300 shadow-sm">
                    <IconComponent size={22} />
                  </div>
                  <span className={`text-[10px] font-semibold px-3 py-1 rounded-full uppercase ${
                    service.isCoreLaunch 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}>
                    {service.phase}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-[#1d1d1f] mb-1.5 leading-snug">
                  {service.title}
                </h3>
                <p className="text-xs font-semibold mb-3 text-[#0071e3]">
                  {service.valueProposition}
                </p>
                <p className="text-[#515154] text-xs leading-relaxed mb-6 flex-grow font-normal text-pretty">
                  {service.description}
                </p>

                {/* Who It Is For Sample */}
                <div className="space-y-1.5 mb-6 pt-4 border-t border-black/[0.06]">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#86868b]">
                    Typical deployments:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {service.whoItIsFor.slice(0, 3).map((target, idx) => (
                      <span key={idx} className="text-[10px] bg-white border border-black/[0.06] px-2.5 py-1 rounded-full text-[#515154] font-medium">
                        {target}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 border-t border-black/[0.06] mt-auto flex items-center justify-between">
                  <Link 
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center text-xs font-semibold text-[#0071e3] hover:underline gap-1.5 min-h-[44px]"
                  >
                    View scope &amp; checklists <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href="/contact"
                    className="text-[11px] font-medium text-[#86868b] hover:text-[#1d1d1f] min-h-[44px] inline-flex items-center"
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
