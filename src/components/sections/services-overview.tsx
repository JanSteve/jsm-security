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
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-jakarta font-bold mb-4 text-foreground"
          >
            Our Integrated Solutions
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            From elite security to creative media. We provide a comprehensive suite of services tailored to your enterprise.
          </motion.p>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer(0.1)}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {displayServices.map((service) => {
            const Icon = iconMap[service.icon] || Shield;
            
            return (
              <motion.div key={service.slug} variants={fadeInUp}>
                <Link href={`/services/${service.slug}`} className="block h-full">
                  <div className="h-full rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/30 flex flex-col group">
                    <div className="w-12 h-12 rounded-lg bg-surface-2 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-jakarta font-semibold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">
                      {service.shortTitle}
                    </h3>
                    <p className="text-muted-foreground text-sm flex-grow mb-6">
                      {service.shortDescription}
                    </p>
                    <div className="flex items-center text-sm font-medium text-primary mt-auto">
                      Explore Service
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
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
