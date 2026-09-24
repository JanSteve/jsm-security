import { servicesData, serviceCategories } from '@/data/services';
import { ServiceFilter } from '@/components/services/service-filter';
import { InteractiveCostSimulator } from '@/components/calculator/interactive-cost-simulator';
import { brandData } from '@/data/brand';
import { breadcrumbSchema } from '@/lib/schema';
import { ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Integrated Capabilities & Service Directory | JSM Integrated Services',
  description: 'Explore JSM Integrated Services three-tier operations model: PSARA security guarding, 100% compliant contract staffing, and commercial facility management across Tamil Nadu.',
};

export default function ServicesHubPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: brandData.domain },
    { name: "Services", url: `${brandData.domain}/services` },
  ]);

  return (
    <main className="min-h-screen bg-white text-[#14181F] pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Editorial Page Header */}
        <section className="py-8 sm:py-12 border-b border-[#E7E5E0]">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B3D2E]/8 text-[#0B3D2E] text-xs font-semibold">
              <ShieldCheck size={14} />
              <span>Full Capability Matrix</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#14181F] font-normal tracking-tight">
              Integrated Services Directory
            </h1>
            <p className="text-base sm:text-lg text-[#5A6578] leading-relaxed">
              Structured operational security, compliant industrial staffing, and commercial facility management. Built to eliminate vendor fragmentation under a single accountable contract.
            </p>
          </div>
        </section>

        {/* Filterable Service Directory */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl text-[#14181F] font-normal">
                Select Capability Tier
              </h2>
              <p className="text-xs sm:text-sm text-[#5A6578]">
                Browse core operational tiers and auxiliary government contracting verticals.
              </p>
            </div>
          </div>
          <ServiceFilter categories={serviceCategories} services={servicesData} />
        </section>

        {/* Interactive Cost Simulator Section */}
        <section className="rounded-xl overflow-hidden border border-[#E7E5E0] bg-[#F8F9FA] p-6 sm:p-10">
          <InteractiveCostSimulator />
        </section>

        {/* Bottom Assessment CTA */}
        <section className="py-12 sm:py-16 bg-[#0B3D2E] rounded-xl p-8 sm:p-12 text-center text-white space-y-6">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white font-normal tracking-tight max-w-2xl mx-auto">
            Need a site-specific operational assessment?
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl mx-auto leading-relaxed">
            Our operations team conducts on-site vulnerability inspections and provides transparent statutory pricing breakdowns within 24 hours.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/get-quote"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-white text-[#0B3D2E] text-sm font-semibold hover:bg-neutral-100 transition-colors shadow-xs"
            >
              <span>Request Site Assessment</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-white/10 hover:bg-white/15 text-white border border-white/20 text-sm font-semibold transition-colors"
            >
              <span>Contact Operations Desk</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
