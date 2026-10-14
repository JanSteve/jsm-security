import { servicesData } from "@/data/services";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FeatureGrid } from "@/components/services/feature-grid";
import { ProcessTimeline } from "@/components/services/process-timeline";
import { ServiceFAQ } from "@/components/services/service-faq";
import { RoiCalculator, QueueSimulator, ReviewFilterWidget } from "@/components/widgets";
import { serviceSchema, breadcrumbSchema, faqSchema, howToSchema } from "@/lib/schema";
import { brandData } from "@/data/brand";
import { ArrowRight, ShieldCheck, Phone, Check } from "lucide-react";

import { constructMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);
  if (!service) return { title: "Service Not Found" };
  return constructMetadata({
    title: service.title,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
    image: service.heroImage || '/images/jsm_logo_black.png',
  });
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);
  if (!service) notFound();

  const isReputationService = ['nfc-review-standees', 'local-seo-gbp-ranking', 'social-media-meta-ads', 'google-meta-ads-management'].includes(service.slug);
  const isQueueService = ['clinic-token-tracker', 'qr-table-ordering', 'whatsapp-automation-crm', 'missed-call-lead-recovery', 'garage-service-tracker', 'garage-service-booking-system'].includes(service.slug);

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
    <main className="min-h-screen bg-[#030712] text-white pt-32 pb-24">
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
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-cyan-500/20 bg-[#080C16]/80 backdrop-blur-2xl">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Category & Phase Pill */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 font-mono text-xs font-semibold py-1 px-3.5 rounded-full">
              {service.categoryLabel}
            </span>
            <span className="text-xs font-semibold py-1 px-3.5 rounded-full bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 font-mono">
              {service.phase} &bull; {service.gstSac}
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
              {service.title}
            </h1>
            <p className="text-base sm:text-lg text-neutral-300 font-normal leading-relaxed max-w-3xl">
              {service.description}
            </p>
            <p className="text-sm font-semibold text-cyan-300">
              {service.valueProposition}
            </p>
          </div>

          {/* Quick Action Strip */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/get-quote"
              className="btn-border-beam min-touch-target min-h-[44px] w-full sm:w-auto"
            >
              <span className="btn-border-beam-inner h-full">
                <span>Request Custom Proposal</span>
                <ArrowRight size={14} className="text-cyan-300" />
              </span>
            </Link>
            <a
              href={`tel:${brandData.contact.phone}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-white/5 border border-white/15 hover:border-cyan-400/50 hover:bg-cyan-950/30 text-white text-xs sm:text-sm font-semibold transition-all tabular-nums min-h-[44px] w-full sm:w-auto"
            >
              <Phone size={14} className="text-cyan-400" />
              <span>{brandData.contact.phoneDisplay}</span>
            </a>
          </div>

          {/* Compliance Notice Banner */}
          {service.complianceNotice && (
            <div className="p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-xl flex items-start gap-3 mt-4">
              <ShieldCheck size={18} className="text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-xs text-neutral-300 leading-relaxed">
                <strong className="text-white">Statutory Compliance Basis:</strong> {service.complianceNotice}
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
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono">
              Operational Scope
            </span>
            <h2 className="font-sans text-2xl sm:text-3xl text-white font-bold tracking-tight">
              Scope of Service &amp; Core Deliverables
            </h2>
          </div>
          <FeatureGrid features={service.features} />
        </section>

        {/* Interactive Capability Simulator */}
        <section className="space-y-6 pt-8 border-t border-cyan-500/20">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono">
              Interactive Live Demonstration
            </span>
            <h2 className="font-sans text-2xl sm:text-3xl text-white font-bold tracking-tight">
              {isReputationService
                ? "Simulate Dual-Routing Smart Review Filtration"
                : isQueueService
                ? "Simulate Real-Time Queue & Order Dispatch"
                : "Simulate Statutory Cost Savings & ROI"}
            </h2>
          </div>
          {isReputationService ? (
            <ReviewFilterWidget />
          ) : isQueueService ? (
            <QueueSimulator />
          ) : (
            <RoiCalculator />
          )}
        </section>

        {/* 4-Step Process Timeline */}
        <section className="space-y-6 pt-8 border-t border-cyan-500/20">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono">
              Engagement Methodology
            </span>
            <h2 className="font-sans text-2xl sm:text-3xl text-white font-bold tracking-tight">
              Four-Stage Deployment Lifecycle
            </h2>
          </div>
          <ProcessTimeline steps={service.process} />
        </section>

        {/* Who It Is For (Target Sectors) */}
        <section className="space-y-6 pt-8 border-t border-cyan-500/20">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono">
              Deployment Environments
            </span>
            <h2 className="font-sans text-2xl sm:text-3xl text-white font-bold tracking-tight">
              Primary Client Segments
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {service.whoItIsFor.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl tactical-glass-card border border-white/10 hover:border-cyan-400/30 flex items-start gap-2.5 transition-colors"
              >
                <Check size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-medium text-white">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Service FAQs */}
        {service.faqs && service.faqs.length > 0 && (
          <section className="space-y-6 pt-8 border-t border-cyan-500/20">
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono">
                Clarifications
              </span>
              <h2 className="font-sans text-2xl sm:text-3xl text-white font-bold tracking-tight">
                Frequently Answered Questions
              </h2>
            </div>
            <ServiceFAQ faqs={service.faqs} />
          </section>
        )}

        {/* Related Services */}
        <section className="space-y-6 pt-8 border-t border-cyan-500/20">
          <h3 className="font-bold text-base text-white tracking-tight">
            Complementary Integrated Capabilities
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedServices.map((rel, idx) => (
              <Link
                key={idx}
                href={`/services/${rel.slug}`}
                className="p-4 rounded-xl tactical-glass-card border border-white/10 hover:border-cyan-400/40 hover:shadow-[0_0_25px_rgba(14,165,233,0.15)] transition-all space-y-1 block min-h-[44px]"
              >
                <span className="text-[10px] font-mono font-bold text-cyan-300 uppercase">
                  {rel.phase}
                </span>
                <h4 className="text-xs sm:text-sm font-semibold text-white">
                  {rel.shortTitle}
                </h4>
                <p className="text-[11px] text-neutral-400 line-clamp-2">
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
