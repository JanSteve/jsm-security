import { servicesData } from "@/data/services";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getIcon } from "@/components/services/icon-map";
import { FeatureGrid } from "@/components/services/feature-grid";
import { ProcessTimeline } from "@/components/services/process-timeline";
import { ServiceFAQ } from "@/components/services/service-faq";
import { serviceSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { brandData } from "@/data/brand";
import { ArrowRight, CheckCircle2, MessageCircle, AlertTriangle, ShieldCheck, Phone, Mail } from "lucide-react";

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
    title: service.metaTitle,
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

  return (
    <main className="min-h-screen bg-white text-[#1d1d1f] pt-28 pb-24 selection:bg-[#0071e3]/15 selection:text-black">
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
      
      {/* Hero Section */}
      <section className="pt-8 pb-16 px-4 md:px-8 border-b border-black/[0.08] bg-[#f5f5f7]">
        <div className="container mx-auto max-w-5xl">
          {/* Category & Phase Pill */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="bg-white border border-black/[0.08] text-[#1d1d1f] text-xs font-semibold py-1 px-3.5 rounded-full">
              {service.categoryLabel}
            </span>
            <span className={`text-xs font-semibold py-1 px-3.5 rounded-full ${
              service.isCoreLaunch ? 'bg-[#0071e3]/10 text-[#0071e3]' : 'bg-[#f5f5f7] text-[#86868b] border border-black/[0.08]'
            }`}>
              {service.phase}
            </span>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
            <div className="flex-1 space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1d1d1f] leading-tight tracking-tight">
                {service.title}
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-[#86868b] font-normal leading-relaxed">
                {service.description}
              </p>
              <p className="text-xs sm:text-sm font-semibold text-[#0071e3]">
                {service.valueProposition}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button asChild size="lg" className="bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-full h-11 px-7 text-xs font-semibold shadow-sm min-h-[44px]">
                  <Link href="/contact">
                    Request Scope Assessment <ArrowRight size={14} className="ml-1.5" />
                  </Link>
                </Button>
                <a
                  href="mailto:jsmintegratedservices@outlook.com?subject=Service%20Inquiry"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-white hover:bg-[#e8e8ed] text-[#1d1d1f] border border-black/[0.08] text-xs font-semibold rounded-full transition-all shadow-sm min-h-[44px]"
                >
                  <Mail size={15} />
                  Discuss via Email
                </a>
              </div>
            </div>

            <div className="p-6 bg-white rounded-[28px] border border-black/[0.08] shadow-sm flex-shrink-0 flex items-center justify-center">
              <IconComponent className="text-[#0071e3] w-14 h-14" strokeWidth={1.5} />
            </div>
          </div>

          {/* Compliance Notice Banner if applicable */}
          {service.complianceNotice && (
            <div className="mt-8 p-4 bg-white border border-black/[0.08] rounded-2xl flex items-start gap-3 text-xs text-[#1d1d1f] font-normal leading-relaxed shadow-sm">
              <ShieldCheck size={18} className="text-[#0071e3] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#1d1d1f] font-semibold block mb-0.5">Regulatory & Compliance Standard:</strong>
                {service.complianceNotice}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Who It Is For Section */}
      <section className="py-14 px-4 md:px-8 bg-white border-b border-black/[0.08]">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#0071e3] mb-3">
            Target Deployments & Sectors
          </h2>
          <h3 className="text-2xl font-semibold text-[#1d1d1f] tracking-tight mb-6">
            Who this service is engineered for:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {service.whoItIsFor.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2.5 p-3.5 bg-[#f5f5f7] border border-black/[0.06] rounded-2xl text-xs font-semibold text-[#1d1d1f]">
                <CheckCircle2 size={16} className="text-[#0071e3] flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="py-20 px-4 md:px-8 bg-[#f5f5f7] border-b border-black/[0.08]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0071e3]">
              Operational Capabilities
            </span>
            <h2 className="text-3xl font-semibold text-[#1d1d1f] tracking-tight">
              Standard Deliverables & Protocols
            </h2>
          </div>
          <FeatureGrid features={service.features} />
        </div>
      </section>

      {/* 4-Step Process Timeline */}
      <section className="py-20 px-4 md:px-8 bg-white border-b border-black/[0.08]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0071e3]">
              Implementation Process
            </span>
            <h2 className="text-3xl font-semibold text-[#1d1d1f] tracking-tight">
              How We Deploy This Service
            </h2>
            <p className="text-sm text-[#86868b] font-normal">From site survey to continuous shift supervision.</p>
          </div>
          <ProcessTimeline steps={service.process} />
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 px-4 md:px-8 bg-[#f5f5f7] border-b border-black/[0.08]">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0071e3]">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl font-semibold text-[#1d1d1f] tracking-tight">
              Operational Inquiries & Answers
            </h2>
          </div>
          <ServiceFAQ faqs={service.faqs} />
        </div>
      </section>

      {/* Related Services */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="container mx-auto max-w-5xl space-y-8">
          <div className="flex items-center justify-between border-b border-black/[0.08] pb-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0071e3]">
                Integrated Ecosystem
              </span>
              <h3 className="text-xl font-semibold text-[#1d1d1f]">Related Integrated Services</h3>
            </div>
            <Link href="/services" className="text-xs font-semibold text-[#0071e3] hover:underline flex items-center gap-1">
              View All Services <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedServices.map((rel) => {
              const RelIcon = getIcon(rel.icon);
              return (
                <Link
                  key={rel.slug}
                  href={`/services/${rel.slug}`}
                  className="p-6 bg-[#f5f5f7] border border-black/[0.08] rounded-[28px] hover:border-black/[0.2] hover:bg-white hover:shadow-md transition-all block space-y-3 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-2xl bg-white border border-black/[0.08] flex items-center justify-center text-[#1d1d1f]">
                    <RelIcon size={18} />
                  </div>
                  <h4 className="text-base font-semibold text-[#1d1d1f]">{rel.title}</h4>
                  <p className="text-xs text-[#86868b] line-clamp-2">{rel.valueProposition}</p>
                  <span className="text-xs font-semibold text-[#0071e3] inline-flex items-center gap-1">
                    Explore Scope <ArrowRight size={12} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
