'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { getIcon } from './icon-map';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
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
    if (activeCategory.includes('IT & Digitization')) return s.slug === 'scanning-digitalization-it';
    if (activeCategory.includes('Citizen')) return s.category === 'csc';
    if (activeCategory.includes('Web & Software')) return s.category === 'software' || s.slug.includes('website') || s.slug.includes('custom-software');
    if (activeCategory.includes('WhatsApp')) return s.category === 'automation' || s.slug.includes('whatsapp') || s.slug.includes('missed-call') || s.slug.includes('clinic') || s.slug.includes('garage');
    if (activeCategory.includes('NFC') || activeCategory.includes('QR')) return s.slug.includes('nfc') || s.slug.includes('qr') || s.slug.includes('parking');
    if (activeCategory.includes('Marketing') || activeCategory.includes('Growth')) return s.category === 'marketing' || s.slug.includes('seo') || s.slug.includes('ads') || s.slug.includes('linkedin') || s.slug.includes('email') || s.slug.includes('video');
    if (activeCategory.includes('Digital') || activeCategory.includes('Automation')) return s.phase === 'Digital & Automation';
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
            className={`rounded-md transition-all px-5 min-h-[44px] text-xs font-semibold ${
              activeCategory === category 
                ? 'bg-[#0F2A47] text-white hover:bg-[#0A1E33] border-transparent shadow-xs' 
                : 'border-[#E4E7EC] text-[#4A5160] hover:text-[#14181F] hover:bg-[#E4E7EC]/40 bg-[#F6F7F9]'
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
                className="group relative flex flex-col bg-[#F6F7F9] rounded-xl p-7 border border-[#E4E7EC] hover:border-[#0F2A47]/30 transition-all duration-300 shadow-xs hover:shadow-sm"
              >
                <div className="mb-5 flex justify-between items-start">
                  <div className="p-3 bg-white border border-[#E4E7EC] rounded-lg text-[#0F2A47] group-hover:scale-105 transition-transform duration-300 shadow-2xs">
                    <IconComponent size={22} />
                  </div>
                  <span className={`text-[10px] font-semibold px-3 py-1 rounded-full uppercase ${
                    service.isCoreLaunch 
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                      : 'bg-[#0F2A47]/8 text-[#0F2A47] border border-[#0F2A47]/15'
                  }`}>
                    {service.phase}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-[#14181F] mb-1.5 leading-snug">
                  {service.title}
                </h3>
                <p className="text-xs font-semibold mb-3 text-[#9C7A3C]">
                  {service.valueProposition}
                </p>
                <p className="text-[#4A5160] text-xs leading-relaxed mb-6 flex-grow font-normal text-pretty">
                  {service.description}
                </p>

                {/* Who It Is For Sample */}
                <div className="space-y-1.5 mb-6 pt-4 border-t border-[#E4E7EC]">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#4A5160]">
                    Typical deployments:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {service.whoItIsFor.slice(0, 3).map((target, idx) => (
                      <span key={idx} className="text-[10px] bg-white border border-[#E4E7EC] px-2.5 py-1 rounded-md text-[#4A5160] font-medium">
                        {target}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 border-t border-[#E4E7EC] mt-auto flex items-center justify-between">
                  <Link 
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center text-xs font-semibold text-[#0F2A47] hover:text-[#9C7A3C] hover:underline gap-1.5 min-h-[44px]"
                  >
                    View scope &amp; checklists <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href="/contact"
                    className="text-[11px] font-medium text-[#4A5160] hover:text-[#14181F] min-h-[44px] inline-flex items-center"
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
