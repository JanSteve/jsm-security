'use client';

import { motion } from 'motion/react';
import { services } from '@/data/services';
import { fadeInUp, staggerContainer } from '@/lib/motion';
import { ArrowRight, Shield, Sparkles, Users, Banknote, Video, Ticket, Radar, Code2, Palette, Heart, Calendar, Building2, Gavel } from 'lucide-react';
import Link from 'next/link';

const iconMap: Record<string, React.ElementType> = {
  Shield, Sparkles, Users, Banknote, Video, Ticket, Radar, Code2, Palette, Heart, Calendar, Building2, Gavel
};

export function ServicesOverview() {
  const displayServices = services.slice(0, 8);

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-20">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-black text-black tracking-tighter mb-4"
          >
            Our Integrated Solutions
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto font-medium"
          >
            From elite security to creative media. We provide a comprehensive suite of services tailored to your enterprise.
          </motion.p>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer(0.08)}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {displayServices.map((service) => {
            const Icon = iconMap[service.icon] || Shield;
            
            return (
              <motion.div key={service.slug} variants={fadeInUp}>
                <Link href={`/services/${service.slug}`} className="block h-full">
                  <div className="h-full rounded-3xl border border-zinc-200/60 bg-zinc-50 p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md hover:border-[#C5A880]/30 flex flex-col group shadow-sm">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center mb-6 text-[#C5A880] group-hover:scale-105 transition-transform duration-300 shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-black group-hover:text-[#C5A880] transition-colors duration-300">
                      {service.shortTitle}
                    </h3>
                    <p className="text-zinc-500 text-sm flex-grow mb-6 leading-relaxed font-medium">
                      {service.shortDescription}
                    </p>
                    <div className="flex items-center text-sm font-semibold text-[#3B82F6] mt-auto group-hover:gap-1 transition-all duration-300">
                      Explore Service
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
