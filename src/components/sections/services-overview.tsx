'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { servicesData } from '@/data/services';
import { fadeInUp, staggerContainer } from '@/lib/motion';
import { ArrowRight, Shield, Sparkles, Users, Banknote, Ticket, Building, Monitor, Palette } from 'lucide-react';
import Link from 'next/link';

const iconMap: Record<string, React.ElementType> = {
  Shield,
  Sparkles,
  Users,
  Banknote,
  Ticket,
  Building,
  Monitor,
  Palette
};

export function ServicesOverview() {
  const [activeTab, setActiveTab] = useState<'all' | 'phase1' | 'phase2'>('all');

  const filteredServices = servicesData.filter(s => {
    if (activeTab === 'phase1') return s.isCoreLaunch;
    if (activeTab === 'phase2') return !s.isCoreLaunch;
    return true;
  });

  return (
    <section className="py-24 md:py-32 bg-zinc-50/50 border-t border-zinc-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#C5A880]">
            Integrated Service Ecosystem
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black tracking-tight leading-tight">
            Complete operational capabilities under one roof.
          </h2>
          <p className="text-zinc-600 text-base md:text-lg font-medium leading-relaxed">
            From disciplined physical guarding and commercial housekeeping to contractual manpower and digital solutions.
          </p>

          {/* Filter Pills */}
          <div className="inline-flex p-1.5 bg-white border border-zinc-200 rounded-full shadow-sm">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === 'all' ? 'bg-black text-white shadow-sm' : 'text-zinc-600 hover:text-black'
              }`}
            >
              All Services (8)
            </button>
            <button
              onClick={() => setActiveTab('phase1')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === 'phase1' ? 'bg-black text-white shadow-sm' : 'text-zinc-600 hover:text-black'
              }`}
            >
              Core Operations (Phase 1)
            </button>
            <button
              onClick={() => setActiveTab('phase2')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === 'phase2' ? 'bg-black text-white shadow-sm' : 'text-zinc-600 hover:text-black'
              }`}
            >
              Integrated Support (Phase 2)
            </button>
          </div>
        </div>

        <motion.div 
          layout
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer(0.06)}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filteredServices.map((service) => {
            const Icon = iconMap[service.icon] || Shield;
            
            return (
              <motion.div key={service.slug} variants={fadeInUp} layout>
                <Link href={`/services/${service.slug}`} className="block h-full group">
                  <div className="h-full rounded-3xl border border-zinc-200/80 bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-black flex flex-col justify-between shadow-sm relative overflow-hidden">
                    {/* Top Phase Tag */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-11 h-11 rounded-2xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-black group-hover:bg-[#C5A880] group-hover:text-black transition-colors duration-300 shadow-sm">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        service.isCoreLaunch 
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                          : 'bg-blue-50 text-blue-800 border border-blue-200'
                      }`}>
                        {service.isCoreLaunch ? 'Core Operational' : 'Value-Add Vertical'}
                      </span>
                    </div>

                    <div className="space-y-2 mb-6">
                      <h3 className="font-bold text-lg text-black group-hover:text-black transition-colors duration-300 leading-snug">
                        {service.shortTitle}
                      </h3>
                      <p className="text-zinc-500 text-xs leading-relaxed font-medium line-clamp-3">
                        {service.valueProposition}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-bold text-black mt-auto">
                      <span>Explore Scope</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Hub Link */}
        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-bold text-black hover:underline"
          >
            View Full Service Specifications & Checklists <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
