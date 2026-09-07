import { servicesData, serviceCategories } from '@/data/services';
import { ServiceFilter } from '@/components/services/service-filter';
import { InteractiveCostSimulator } from '@/components/calculator/interactive-cost-simulator';
import { brandData } from '@/data/brand';
import { breadcrumbSchema } from '@/lib/schema';
import { ArrowRight, Shield, Sparkles, Users, FileCheck } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Integrated Capabilities | JSM Integrated Services',
  description: 'A synthesized approach to operational security, facility management, and strategic resourcing across Tamil Nadu and India.',
};

export default function ServicesHubPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: brandData.domain },
    { name: "Services", url: `${brandData.domain}/services` },
  ]);

  return (
    <main className="min-h-screen bg-white text-[#1d1d1f] pt-28 pb-24 selection:bg-[#0071e3]/15 selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <div className="max-w-[1440px] mx-auto px-5 md:px-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24 border-b border-black/[0.08] mb-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-12 pb-6 border-b border-black/[0.08]">
              <span className="text-xs font-semibold tracking-wider text-[#0071e3] uppercase block mb-3">
                Service directory
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold text-[#1d1d1f] tracking-tight leading-tight text-balance">
                Integrated<br />capabilities.
              </h1>
            </div>
            <div className="md:col-span-8 md:col-start-3 pt-4">
              <p className="text-base sm:text-lg md:text-xl text-[#86868b] font-normal leading-relaxed text-pretty">
                A synthesized approach to operational security, facility management, and strategic resourcing. We deliver Trust Architecture across multiple vectors, ensuring precision and control in high-stakes environments.
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Ecosystem Section */}
        <section className="mb-20 bg-[#f5f5f7] border border-black/[0.08] rounded-[28px] p-8 md:p-12 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4 space-y-3">
              <span className="text-xs font-semibold tracking-wider text-[#0071e3] uppercase">
                Systemic cohesion
              </span>
              <h2 className="text-3xl font-semibold text-[#1d1d1f] tracking-tight text-balance">
                The JSM ecosystem
              </h2>
              <p className="text-xs sm:text-sm text-[#515154] leading-relaxed font-normal text-pretty">
                Our service vectors are not isolated. They operate as a cohesive operational system, providing comprehensive coverage from physical guarding to facility hygiene and tech automation.
              </p>
            </div>

            {/* Orbit Node Visual Diagram */}
            <div className="md:col-span-8 relative min-h-[340px] flex items-center justify-center bg-white border border-black/[0.08] rounded-2xl overflow-hidden p-6 shadow-sm">
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" preserveAspectRatio="xMidYMid slice" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="35" fill="none" stroke="#1d1d1f" strokeDasharray="2 4" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="20" fill="none" stroke="#1d1d1f" strokeDasharray="2 4" strokeWidth="0.5" />
              </svg>

              <div className="relative z-20 w-28 h-28 md:w-32 md:h-32 rounded-full bg-[#1d1d1f] text-white flex flex-col items-center justify-center font-semibold text-xs shadow-md text-center p-2">
                <span className="text-[10px] text-[#0071e3] tracking-wider uppercase font-semibold">Core</span>
                <span className="text-sm font-semibold">JSM</span>
                <span className="text-[10px] text-white/70 font-normal">Operations</span>
              </div>

              <Link href="/services/private-security" className="absolute top-[12%] left-[12%] z-20 group text-center min-h-[44px]">
                <div className="w-12 h-12 rounded-full bg-[#f5f5f7] border border-black/[0.08] flex items-center justify-center group-hover:border-[#0071e3] group-hover:bg-[#0071e3]/10 transition-colors shadow-sm mx-auto">
                  <Shield size={18} className="text-[#0071e3]" />
                </div>
                <span className="text-[11px] font-semibold text-[#1d1d1f] tracking-normal mt-1 block">Security</span>
              </Link>

              <Link href="/services/housekeeping" className="absolute top-[12%] right-[12%] z-20 group text-center min-h-[44px]">
                <div className="w-12 h-12 rounded-full bg-[#f5f5f7] border border-black/[0.08] flex items-center justify-center group-hover:border-[#0071e3] group-hover:bg-[#0071e3]/10 transition-colors shadow-sm mx-auto">
                  <Sparkles size={18} className="text-[#0071e3]" />
                </div>
                <span className="text-[11px] font-semibold text-[#1d1d1f] tracking-normal mt-1 block">Facility mgmt</span>
              </Link>

              <Link href="/services/manpower" className="absolute bottom-[12%] left-[12%] z-20 group text-center min-h-[44px]">
                <div className="w-12 h-12 rounded-full bg-[#f5f5f7] border border-black/[0.08] flex items-center justify-center group-hover:border-[#0071e3] group-hover:bg-[#0071e3]/10 transition-colors shadow-sm mx-auto">
                  <Users size={18} className="text-[#0071e3]" />
                </div>
                <span className="text-[11px] font-semibold text-[#1d1d1f] tracking-normal mt-1 block">Manpower</span>
              </Link>

              <Link href="/services/tender-procurement-supply" className="absolute bottom-[12%] right-[12%] z-20 group text-center min-h-[44px]">
                <div className="w-12 h-12 rounded-full bg-[#f5f5f7] border border-black/[0.08] flex items-center justify-center group-hover:border-[#0071e3] group-hover:bg-[#0071e3]/10 transition-colors shadow-sm mx-auto">
                  <FileCheck size={18} className="text-[#0071e3]" />
                </div>
                <span className="text-[11px] font-semibold text-[#1d1d1f] tracking-normal mt-1 block">Tender &amp; GeM</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Filterable Service Directory */}
        <section className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0071e3]">
              Operational filter
            </span>
            <h2 className="text-3xl font-semibold text-[#1d1d1f] tracking-tight text-balance">
              Select your capability
            </h2>
          </div>
          <ServiceFilter categories={serviceCategories} services={servicesData} />
        </section>

        {/* Interactive Cost Simulator Section */}
        <div className="rounded-[28px] overflow-hidden mb-20">
          <InteractiveCostSimulator />
        </div>

        {/* Bottom Assessment CTA */}
        <section className="py-16 bg-[#f5f5f7] border border-black/[0.08] rounded-[28px] p-8 md:p-14 text-center space-y-5 shadow-sm">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1d1d1f] tracking-tight text-balance">
            Initiate an assessment
          </h2>
          <p className="text-xs sm:text-sm text-[#86868b] max-w-xl mx-auto font-normal text-pretty">
            Engage our consultants to evaluate your current operational vulnerabilities and design a bespoke service architecture.
          </p>
          <div className="pt-2">
            <Button asChild size="lg" className="bg-[#1d1d1f] hover:bg-black text-white font-semibold text-xs px-8 h-12 rounded-full shadow-sm min-h-[44px]">
              <Link href="/contact">
                Request a site assessment <ArrowRight size={14} className="ml-1.5 text-white" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
