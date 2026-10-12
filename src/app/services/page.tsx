import { servicesData, serviceCategories } from '@/data/services';
import { ServiceFilter } from '@/components/services/service-filter';
import { InteractiveShowcase } from '@/components/widgets/interactive-showcase';
import { brandData } from '@/data/brand';
import { breadcrumbSchema } from '@/lib/schema';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Integrated Services Directory | Security, Manpower & Digital Automation',
  description: 'Explore JSM Integrated Services complete capability matrix: 100% EPF & ESIC Compliant security guarding, industrial staffing, facility management, and enterprise digital & WhatsApp automation solutions across Tamil Nadu.',
  path: '/services',
  keywords: [
    'Integrated Services Directory',
    'Security Guarding Services Tamil Nadu',
    'Industrial Manpower Staffing',
    'Commercial Facility Management',
    'WhatsApp Business API Automation Trichy Chennai',
    'Smart NFC Review Filter Standees',
    'Website Design Development Tamil Nadu',
    'Missed Call Lead Recovery System'
  ]
});

export default function ServicesHubPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: brandData.domain },
    { name: "Services", url: `${brandData.domain}/services` },
  ]);

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Editorial Page Header */}
        <section className="py-8 sm:py-12 border-b border-white/10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white border border-white/20 text-xs font-semibold">
              <ShieldCheck size={14} />
              <span>Full Capability Matrix &bull; 21 Integrated Verticals</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-white font-normal tracking-tight">
              Integrated Services Directory
            </h1>
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
              Consolidated security guarding, industrial staffing, facility hygiene, and enterprise digital &amp; WhatsApp automation under one verified partner.
            </p>
          </div>
        </section>

        {/* Filterable Service Directory */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl text-white font-normal">
                Select Capability Tier
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400">
                Filter core physical security, industrial manpower, and digital automation tools.
              </p>
            </div>
          </div>
          <ServiceFilter categories={serviceCategories} services={servicesData} />
        </section>

        {/* Interactive Operations & Automation Suite */}
        <section className="pt-8 border-t border-white/10">
          <InteractiveShowcase />
        </section>

        {/* Bottom Assessment CTA */}
        <section className="py-12 sm:py-16 bg-[#080C14] border border-white/10 rounded-2xl p-8 sm:p-12 text-center text-white space-y-6">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white font-normal tracking-tight max-w-2xl mx-auto">
            Need a site-specific operational assessment?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto leading-relaxed">
            Our operations team conducts on-site vulnerability inspections and provides transparent statutory pricing breakdowns within 24 hours.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/get-quote"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-white text-black text-sm font-bold hover:bg-neutral-200 transition-colors shadow-xl press-scale min-h-[44px] w-full sm:w-auto"
            >
              <span>Request Site Assessment</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-white/10 hover:bg-white/15 text-white border border-white/20 text-sm font-semibold transition-colors min-h-[44px] w-full sm:w-auto"
            >
              <span>Contact Operations Desk</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
