'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { getIcon } from './icon-map';
import { ArrowRight } from 'lucide-react';

export function RelatedServices({ services }: { services: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {services.map((service, i) => {
        const IconComponent = getIcon(service.icon);
        return (
          <motion.div
            key={service.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group block p-6 bg-[#f5f5f7] rounded-[24px] border border-black/[0.06] hover:border-black/[0.15] hover:shadow-sm transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-2xl bg-white border border-black/[0.06] flex items-center justify-center text-[#0071e3] mb-4 shadow-2xs group-hover:bg-[#1d1d1f] group-hover:text-white transition-colors">
              <IconComponent size={24} />
            </div>
            <h4 className="text-lg font-bold text-[#1d1d1f] mb-2 group-hover:text-[#0071e3] transition-colors tracking-tight">{service.title}</h4>
            <p className="text-xs sm:text-sm text-[#515154] mb-4 line-clamp-2 leading-relaxed">{service.description}</p>
            <Link href={`/services/${service.slug}`} className="inline-flex items-center text-xs font-semibold text-[#0071e3] hover:underline group-hover:gap-2 gap-1.5 transition-all">
              <span>Learn More</span>
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
