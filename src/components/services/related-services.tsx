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
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group block p-6 bg-[#121C3B] rounded-xl border border-[#1A264D] hover:border-[#3B82F6] transition-all"
          >
            <IconComponent className="text-[#3B82F6] mb-4" size={32} />
            <h4 className="text-xl font-bold text-[#F8F9FA] mb-2 group-hover:text-[#3B82F6] transition-colors">{service.title}</h4>
            <p className="text-sm text-[#94A3B8] mb-4 line-clamp-2">{service.description}</p>
            <Link href={`/services/${service.slug}`} className="inline-flex items-center text-sm font-semibold text-[#D4AF37] group-hover:gap-2 gap-1 transition-all">
              Learn More <ArrowRight size={16} />
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
