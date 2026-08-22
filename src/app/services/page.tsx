import { servicesData, serviceCategories } from '@/data/services';
import { ServiceFilter } from '@/components/services/service-filter';
import { brandData } from '@/data/brand';
import { breadcrumbSchema } from '@/lib/schema';
import { ArrowRight, Shield, Sparkles, Users, Banknote } from 'lucide-react';
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
    <main className="min-h-screen bg-[#fbf9f4] text-zinc-900 pt-28 pb-24 selection:bg-[#ffdea5] selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <div className="max-w-[1440px] mx-auto px-5 md:px-20">
        {/* Hero Section from Stitch */}
        <section className="py-16 md:py-24 border-b border-zinc-200/80 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-12 pb-6 border-b border-zinc-200/60">
              <span className="text-[11px] md:text-[12px] font-bold tracking-[0.1em] text-[#C5A880] uppercase block mb-3">
                SERVICE DIRECTORY
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-black tracking-tight leading-tight uppercase">
                INTEGRATED<br />CAPABILITIES.
              </h1>
            </div>
            <div className="md:col-span-8 md:col-start-3 pt-4">
              <p className="text-base sm:text-lg md:text-xl text-zinc-600 font-normal leading-relaxed">
                A synthesized approach to operational security, facility management, and strategic resourcing. We deliver Trust Architecture across multiple vectors, ensuring precision and control in high-stakes environments.
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Ecosystem Section from Stitch */}
        <section className="mb-20 bg-white border border-zinc-200/80 rounded-3xl p-8 md:p-12 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4 space-y-4">
              <span className="text-[10px] font-bold tracking-widest text-[#C5A880] uppercase">
                SYSTEMIC COHESION
              </span>
              <h2 className="text-3xl font-black text-black tracking-tight">
                The JSM Ecosystem
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                Our service vectors are not isolated. They operate as a cohesive operational system, providing comprehensive coverage from physical guarding to facility hygiene and tech automation.
              </p>
            </div>

            {/* Orbit Node Visual Diagram */}
            <div className="md:col-span-8 relative min-h-[340px] flex items-center justify-center bg-[#fbf9f4] border border-zinc-200/80 rounded-2xl overflow-hidden p-6">
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" preserveAspectRatio="xMidYMid slice" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="35" fill="none" stroke="#000" strokeDasharray="2 4" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="20" fill="none" stroke="#000" strokeDasharray="2 4" strokeWidth="0.5" />
              </svg>

              <div className="relative z-20 w-28 h-28 md:w-32 md:h-32 rounded-full bg-black text-white flex flex-col items-center justify-center font-bold text-xs border-4 border-[#C5A880] shadow-xl text-center p-2">
                <span className="text-[10px] text-[#C5A880] tracking-widest uppercase">CORE</span>
                <span className="text-sm font-black">JSM</span>
                <span className="text-[9px] text-zinc-400 font-normal">OPERATIONS</span>
              </div>

              <Link href="/services/private-security" className="absolute top-[12%] left-[12%] z-20 group text-center">
                <div className="w-12 h-12 rounded-full bg-white border border-zinc-200 flex items-center justify-center group-hover:bg-[#C5A880] transition-colors shadow-sm mx-auto">
                  <Shield size={18} className="text-black" />
                </div>
                <span className="text-[10px] font-bold text-zinc-700 group-hover:text-black tracking-wider uppercase mt-1 block">SECURITY</span>
              </Link>

              <Link href="/services/housekeeping" className="absolute top-[12%] right-[12%] z-20 group text-center">
                <div className="w-12 h-12 rounded-full bg-white border border-zinc-200 flex items-center justify-center group-hover:bg-[#C5A880] transition-colors shadow-sm mx-auto">
                  <Sparkles size={18} className="text-black" />
                </div>
                <span className="text-[10px] font-bold text-zinc-700 group-hover:text-black tracking-wider uppercase mt-1 block">FACILITY MGMT</span>
              </Link>

              <Link href="/services/manpower" className="absolute bottom-[12%] left-[12%] z-20 group text-center">
                <div className="w-12 h-12 rounded-full bg-white border border-zinc-200 flex items-center justify-center group-hover:bg-[#C5A880] transition-colors shadow-sm mx-auto">
                  <Users size={18} className="text-black" />
                </div>
                <span className="text-[10px] font-bold text-zinc-700 group-hover:text-black tracking-wider uppercase mt-1 block">MANPOWER</span>
              </Link>

              <Link href="/services/cash-in-transit" className="absolute bottom-[12%] right-[12%] z-20 group text-center">
                <div className="w-12 h-12 rounded-full bg-white border border-zinc-200 flex items-center justify-center group-hover:bg-[#C5A880] transition-colors shadow-sm mx-auto">
                  <Banknote size={18} className="text-black" />
                </div>
                <span className="text-[10px] font-bold text-zinc-700 group-hover:text-black tracking-wider uppercase mt-1 block">CASH LOGISTICS</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Filterable Service Directory */}
        <section className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A880]">
              Operational Filter
            </span>
            <h2 className="text-3xl font-black text-black tracking-tight">
              Select Your Capability
            </h2>
          </div>
          <ServiceFilter categories={serviceCategories} services={servicesData} />
        </section>

        {/* Bottom Assessment CTA from Stitch */}
        <section className="py-16 bg-white border border-zinc-200/80 rounded-3xl p-8 md:p-16 text-center space-y-6 shadow-sm">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black tracking-tight">
            Initiate an Assessment
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 max-w-xl mx-auto font-normal">
            Engage our consultants to evaluate your current operational vulnerabilities and design a bespoke service architecture.
          </p>
          <div className="pt-2">
            <Button asChild size="lg" className="bg-black hover:bg-zinc-800 text-white font-bold text-xs px-8 h-12 rounded-sm border-b-2 border-[#C5A880] shadow-md">
              <Link href="/contact">
                REQUEST A SITE ASSESSMENT <ArrowRight size={14} className="ml-1.5" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
