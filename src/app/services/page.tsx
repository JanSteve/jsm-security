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
    <main className="min-h-screen bg-[#030712] text-white pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Editorial Page Header */}
        <section className="py-8 sm:py-12 border-b border-cyan-500/20">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-400/30 text-xs font-semibold shadow-[0_0_12px_rgba(14,165,233,0.15)]">
              <ShieldCheck size={14} className="text-cyan-400" />
              <span>Full Capability Matrix &bull; 21 Integrated Verticals</span>
            </div>
            <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl text-white font-bold tracking-tight">
              Integrated Services Directory
            </h1>
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
              Consolidated security guarding, industrial staffing, and mechanized facility management backed by Ex-Servicemen leadership and 100% EPF/ESIC compliance.
            </p>
          </div>
        </section>

        {/* Filterable Service Directory */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-sans text-2xl sm:text-3xl text-white font-bold tracking-tight">
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
        <section className="pt-8 border-t border-cyan-500/20">
          <InteractiveShowcase />
        </section>

        {/* Bottom Assessment CTA */}
        <section className="py-12 sm:py-16 tactical-glass-card border-cyan-500/30 rounded-2xl p-8 sm:p-12 text-center text-white space-y-6 shadow-[0_0_50px_rgba(0,0,0,0.85)]">
          <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl text-white font-bold tracking-tight max-w-2xl mx-auto">
            Need a site-specific operational assessment?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto leading-relaxed">
            Our operations team conducts on-site vulnerability inspections and provides transparent statutory pricing breakdowns within 2 hours.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/get-quote"
              className="btn-border-beam min-touch-target min-h-[44px] w-full sm:w-auto"
            >
              <span className="btn-border-beam-inner h-full">
                <span>Request Site Assessment</span>
                <ArrowRight size={14} className="text-cyan-300" />
              </span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-white/5 hover:bg-cyan-950/20 text-neutral-300 hover:text-white border border-white/10 hover:border-cyan-400/40 text-sm font-semibold transition-all min-h-[44px] w-full sm:w-auto"
            >
              <span>Contact Operations Desk</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
