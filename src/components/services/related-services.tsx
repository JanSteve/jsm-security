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
            className="group block p-6 bg-zinc-50 rounded-3xl border border-zinc-200/60 hover:border-[#C5A880]/30 hover:shadow-md transition-all duration-300"
          >
            <IconComponent className="text-[#C5A880] mb-4" size={32} />
            <h4 className="text-xl font-bold text-black mb-2 group-hover:text-[#C5A880] transition-colors">{service.title}</h4>
            <p className="text-sm text-zinc-500 mb-4 line-clamp-2 leading-relaxed">{service.description}</p>
            <Link href={`/services/${service.slug}`} className="inline-flex items-center text-sm font-semibold text-[#3B82F6] hover:text-[#C5A880] group-hover:gap-2 gap-1 transition-all duration-300">
              Learn More <ArrowRight size={16} />
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
