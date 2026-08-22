import { servicesData, serviceCategories } from '@/data/services';
import { ServiceFilter } from '@/components/services/service-filter';
import { brandData } from '@/data/brand';
import { breadcrumbSchema } from '@/lib/schema';
import { Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Integrated Services Ecosystem | Security, Housekeeping & Manpower',
  description: 'Explore JSM Integrated Services complete operational catalog: Private Security, Facility Housekeeping, Contractual Manpower, and Integrated Business Solutions across Tamil Nadu.',
};

export default function ServicesHubPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: brandData.domain },
    { name: "Services", url: `${brandData.domain}/services` },
  ]);

  return (
    <main className="min-h-screen bg-white text-zinc-800 pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-100 border border-zinc-200/80 text-zinc-800 text-xs font-bold">
            <Sparkles size={13} className="text-[#C5A880]" />
            <span>OPERATIONAL CAPABILITIES</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-black tracking-tight leading-tight">
            One Partner.<br />
            <span className="text-zinc-600">Every Operational Solution.</span>
          </h1>

          <p className="text-base md:text-lg text-zinc-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Eliminate multi-vendor friction. We deploy vetted security guards, hygiene facility teams, and contractual manpower under unified SOP standards across Tamil Nadu.
          </p>
        </div>

        <ServiceFilter categories={serviceCategories} services={servicesData} />

        {/* Bottom Fast Quote Strip */}
        <div className="mt-20 p-8 md:p-12 bg-zinc-900 text-white rounded-3xl max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 border border-zinc-800 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-2xl font-black text-white tracking-tight">Need a customized multi-service proposal?</h3>
            <p className="text-xs text-zinc-400">We bundle security, housekeeping, and staffing into a single consolidated monthly contract.</p>
          </div>

          <div className="flex items-center gap-3">
            <Button asChild size="lg" className="bg-[#C5A880] hover:bg-[#b59870] text-black font-bold rounded-full text-xs h-11 px-6 shadow-md">
              <Link href="/contact">
                Request Custom Proposal <ArrowRight size={14} className="ml-1.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
