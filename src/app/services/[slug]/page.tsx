import { servicesData } from "@/data/services";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getIcon } from "@/components/services/icon-map";
import { FeatureGrid } from "@/components/services/feature-grid";
import { ProcessTimeline } from "@/components/services/process-timeline";
import { ServiceFAQ } from "@/components/services/service-faq";
import { serviceSchema, breadcrumbSchema, faqSchema, howToSchema } from "@/lib/schema";
import { brandData } from "@/data/brand";
import { ArrowRight, CheckCircle2, ShieldCheck, Phone, Check } from "lucide-react";

export function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: service.title,
    description: service.metaDescription,
    alternates: {
      canonical: `${brandData.domain}/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.title} | ${brandData.name}`,
      description: service.metaDescription,
      url: `${brandData.domain}/services/${service.slug}`,
    }
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);
  if (!service) notFound();

  const IconComponent = getIcon(service.icon);
  const relatedServices = servicesData.filter((s) => service.relatedSlugs?.includes(s.slug) || s.slug !== service.slug).slice(0, 3);

  const sSchema = serviceSchema({
    title: service.title,
    description: service.description,
    slug: service.slug,
  });

  const bSchema = breadcrumbSchema([
    { name: "Home", url: brandData.domain },
    { name: "Services", url: `${brandData.domain}/services` },
    { name: service.shortTitle, url: `${brandData.domain}/services/${service.slug}` },
  ]);

  const fSchema = faqSchema(service.faqs);
  const hSchema = howToSchema({ title: service.title });

  return (
    <main className="min-h-screen bg-white text-[#14181F] pt-32 pb-24">
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(fSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hSchema) }}
      />
      
      {/* Hero Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-[#E7E5E0] bg-[#F8F9FA]">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Category & Phase Pill */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-white border border-[#E7E5E0] text-[#14181F] text-xs font-semibold py-1 px-3.5 rounded-full">
              {service.categoryLabel}
            </span>
            <span className="text-xs font-semibold py-1 px-3.5 rounded-full bg-[#0B3D2E]/10 text-[#0B3D2E] border border-[#0B3D2E]/20">
              {service.phase} &bull; {service.gstSac}
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-[#14181F] leading-tight tracking-tight">
              {service.title}
            </h1>
            <p className="text-base sm:text-lg text-[#5A6578] font-normal leading-relaxed max-w-3xl">
              {service.description}
            </p>
            <p className="text-sm font-semibold text-[#0B3D2E]">
              {service.valueProposition}
            </p>
          </div>

          {/* Quick Action Strip */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/get-quote"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#0B3D2E] hover:bg-[#082C21] text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs"
            >
              <span>Request Custom Proposal</span>
              <ArrowRight size={14} />
            </Link>
            <a
              href={`tel:${brandData.contact.phone}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-white border border-[#E7E5E0] hover:bg-neutral-50 text-[#14181F] text-xs sm:text-sm font-semibold transition-colors tabular-nums"
            >
              <Phone size={14} className="text-[#0B3D2E]" />
              <span>{brandData.contact.phoneDisplay}</span>
            </a>
          </div>

          {/* Compliance Notice Banner */}
          {service.complianceNotice && (
            <div className="p-4 bg-white border border-[#E7E5E0] rounded-xl flex items-start gap-3 mt-4">
              <ShieldCheck size={18} className="text-[#0B3D2E] shrink-0 mt-0.5" />
              <p className="text-xs text-[#5A6578] leading-relaxed">
                <strong className="text-[#14181F]">Statutory Compliance Basis:</strong> {service.complianceNotice}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Deliverables Feature Grid */}
        <section className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0B3D2E]">
              Operational Scope
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-[#14181F] font-normal tracking-tight">
              Scope of Service &amp; Core Deliverables
            </h2>
          </div>
          <FeatureGrid features={service.features} />
        </section>

        {/* 4-Step Process Timeline */}
        <section className="space-y-6 pt-8 border-t border-[#E7E5E0]">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0B3D2E]">
              Engagement Methodology
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-[#14181F] font-normal tracking-tight">
              Four-Stage Deployment Lifecycle
            </h2>
          </div>
          <ProcessTimeline steps={service.process} />
        </section>

        {/* Who It Is For (Target Sectors) */}
        <section className="space-y-6 pt-8 border-t border-[#E7E5E0]">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0B3D2E]">
              Deployment Environments
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-[#14181F] font-normal tracking-tight">
              Primary Client Segments
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {service.whoItIsFor.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg bg-[#F8F9FA] border border-[#E7E5E0] flex items-start gap-2.5"
              >
                <Check size={16} className="text-[#0B3D2E] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-medium text-[#14181F]">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Service FAQs */}
        {service.faqs && service.faqs.length > 0 && (
          <section className="space-y-6 pt-8 border-t border-[#E7E5E0]">
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0B3D2E]">
                Clarifications
              </span>
              <h2 className="font-display text-2xl sm:text-3xl text-[#14181F] font-normal tracking-tight">
                Frequently Answered Questions
              </h2>
            </div>
            <ServiceFAQ faqs={service.faqs} />
          </section>
        )}

        {/* Related Services */}
        <section className="space-y-6 pt-8 border-t border-[#E7E5E0]">
          <h3 className="font-semibold text-base text-[#14181F]">
            Complementary Integrated Capabilities
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedServices.map((rel, idx) => (
              <Link
                key={idx}
                href={`/services/${rel.slug}`}
                className="p-4 rounded-lg bg-white border border-[#E7E5E0] hover:border-[#0B3D2E]/40 hover:shadow-xs transition-all space-y-1 block"
              >
                <span className="text-[10px] font-mono font-bold text-[#0B3D2E] uppercase">
                  {rel.phase}
                </span>
                <h4 className="text-xs sm:text-sm font-semibold text-[#14181F]">
                  {rel.shortTitle}
                </h4>
                <p className="text-[11px] text-[#5A6578] line-clamp-2">
                  {rel.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
