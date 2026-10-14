'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { getIcon } from './icon-map';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Service } from '@/data/services';
import { PerspectiveTiltCard } from '@/components/motion/perspective-tilt-card';

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
    <div className="space-y-10 text-left">
      {/* Category Pills */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-3">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? 'default' : 'outline'}
            onClick={() => setActiveCategory(category)}
            className={`rounded-lg transition-all px-4 min-h-[44px] text-xs font-bold cursor-pointer ${
              activeCategory === category 
                ? 'bg-cyan-500 text-black font-bold border-cyan-300 shadow-[0_0_18px_rgba(14,165,233,0.35)] hover:bg-cyan-400' 
                : 'border-white/15 text-neutral-300 hover:text-white hover:bg-cyan-500/10 hover:border-cyan-400/30 bg-[#080C16]'
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
                className="h-full"
              >
                <PerspectiveTiltCard maxTilt={6} className="h-full">
                  <div className="group relative flex flex-col h-full tactical-glass-card rounded-xl p-7 border border-white/10 hover:border-cyan-400/40 transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(14,165,233,0.15)] text-white">
                    <div className="mb-5 flex justify-between items-start">
                      <div className="p-3 bg-cyan-500/10 border border-cyan-400/20 rounded-lg text-cyan-300 group-hover:scale-105 group-hover:bg-cyan-500/20 group-hover:border-cyan-400/50 transition-all duration-300">
                        <IconComponent size={22} />
                      </div>
                      <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase ${
                        service.isCoreLaunch 
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40' 
                          : 'bg-cyan-500/10 text-cyan-300 border border-cyan-400/30 font-mono'
                      }`}>
                        {service.phase}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-1.5 leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-xs font-bold mb-3 text-cyan-300">
                      {service.valueProposition}
                    </p>
                    <p className="text-neutral-300 text-xs leading-relaxed mb-6 flex-grow font-normal text-pretty">
                      {service.description}
                    </p>

                    {/* Typical Deployments */}
                    <div className="space-y-1.5 mb-6 pt-4 border-t border-cyan-500/20">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 font-mono">
                        Typical deployments:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {service.whoItIsFor.slice(0, 3).map((target, idx) => (
                          <span key={idx} className="text-[10px] bg-white/5 border border-cyan-500/20 px-2.5 py-1 rounded-md text-neutral-300 font-medium">
                            {target}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-cyan-500/20 mt-auto flex items-center justify-between">
                      <Link 
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center text-xs font-bold text-cyan-400 hover:text-cyan-300 gap-1.5 min-h-[44px] underline underline-offset-4"
                      >
                        View scope &amp; SLAs <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </Link>

                      <Link
                        href="/contact"
                        className="text-[11px] font-semibold text-neutral-400 hover:text-cyan-300 min-h-[44px] inline-flex items-center"
                      >
                        Request quote →
                      </Link>
                    </div>
                  </div>
                </PerspectiveTiltCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
