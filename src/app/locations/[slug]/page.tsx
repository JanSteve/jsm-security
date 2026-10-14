import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { locationsData, LocationData } from "@/data/locations";
import { constructMetadata } from "@/lib/seo";
import { brandData } from "@/data/brand";
import { locationLocalBusinessSchema } from "@/lib/schema";
import { RoiCalculator } from "@/components/widgets";
import {
  Phone,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Clock,
  CheckCircle2,
  Building2,
  Factory,
  ChevronRight,
  HelpCircle
} from "lucide-react";

export function generateStaticParams() {
  return locationsData.map((loc) => ({
    slug: loc.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const location = locationsData.find((l) => l.slug === slug);
  if (!location) return { title: "Location Not Found" };

  return constructMetadata({
    title: location.metaTitle,
    description: location.metaDescription,
    path: `/locations/${location.slug}`,
    keywords: location.highIntentKeywords,
    geo: {
      city: location.city,
      latitude: location.latitude,
      longitude: location.longitude,
      postalCode: location.postalCode,
    },
  });
}

export default async function LocationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const location = locationsData.find((l) => l.slug === slug);
  if (!location) notFound();

  const schemaJson = locationLocalBusinessSchema(location);
  const otherLocations = locationsData.filter((l) => l.slug !== location.slug).slice(0, 3);
  const whatsappUrl = `https://wa.me/${brandData.contact.whatsapp}?text=${encodeURIComponent(
    `Hello JSM Integrated Services, I would like to request an operational deployment proposal for our site in ${location.city}.`
  )}`;

  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-24">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />

      {/* Breadcrumb Navigation */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs text-neutral-400 flex items-center gap-2">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight size={12} className="text-neutral-600" />
        <Link href="/locations" className="hover:text-white transition-colors">Regional Hubs</Link>
        <ChevronRight size={12} className="text-neutral-600" />
        <span className="text-white font-medium">{location.city}</span>
      </div>

      {/* Hero Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10 bg-[#080C14]">
        <div className="max-w-[1280px] mx-auto space-y-6">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-white flex items-center gap-1.5">
              <MapPin size={12} className="text-white" />
              <span>{location.regionType}</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
              <Clock size={12} />
              <span>{location.responseSla}</span>
            </span>
          </div>

          {/* Titles */}
          <div className="space-y-4 max-w-4xl">
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              {location.heroHeadline}
            </h1>
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
              {location.heroSubheadline}
            </p>
          </div>

          {/* Direct Hotline & Action Bar */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href={`tel:${brandData.contact.phone}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white hover:bg-neutral-200 text-black text-sm font-bold transition-colors shadow-2xl press-scale min-h-[44px] w-full sm:w-auto"
            >
              <Phone size={15} />
              <span>Direct Hotline: {brandData.contact.phoneDisplay}</span>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-400 text-sm font-bold transition-colors min-h-[44px] w-full sm:w-auto"
            >
              <MessageSquare size={15} />
              <span>WhatsApp Operations Desk</span>
            </a>
            <Link
              href="/get-quote"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-white/5 border border-white/20 hover:bg-white/10 text-white text-sm font-semibold transition-colors min-h-[44px] w-full sm:w-auto"
            >
              <span>Instant Proposal</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Operational Address Card */}
          <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-start gap-3 mt-4 text-xs text-neutral-300">
            <MapPin size={16} className="text-white shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Division Outpost:</strong> {location.address} &bull; 
              <span className="text-neutral-400 ml-1">Dispatch Phone: {location.phone}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Authority Stats Bar */}
      <section className="border-b border-white/10 bg-[#04060A] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-[#080C14] border border-white/10 space-y-1">
            <div className="text-xs font-mono text-neutral-400 uppercase">Emergency Standby</div>
            <div className="text-lg sm:text-xl font-bold text-white">2-Hour SLA</div>
            <div className="text-[11px] text-neutral-400">Guaranteed Relief Muster</div>
          </div>
          <div className="p-4 rounded-lg bg-[#080C14] border border-white/10 space-y-1">
            <div className="text-xs font-mono text-neutral-400 uppercase">Statutory Guarantee</div>
            <div className="text-lg sm:text-xl font-bold text-white">100% EPF / ESIC</div>
            <div className="text-[11px] text-neutral-400">Monthly ECR Challans Provided</div>
          </div>
          <div className="p-4 rounded-lg bg-[#080C14] border border-white/10 space-y-1">
            <div className="text-xs font-mono text-neutral-400 uppercase">Field Supervision</div>
            <div className="text-lg sm:text-xl font-bold text-white">2:00 AM Audits</div>
            <div className="text-[11px] text-neutral-400">Ex-Servicemen Patrol Vans</div>
          </div>
          <div className="p-4 rounded-lg bg-[#080C14] border border-white/10 space-y-1">
            <div className="text-xs font-mono text-neutral-400 uppercase">Civil Aviation Proof</div>
            <div className="text-lg sm:text-xl font-bold text-white">AAI Credential</div>
            <div className="text-[11px] text-neutral-400">Airport Concourse Operations</div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Operational Overview & Key Industrial Zones */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-6 text-left">
            <div className="space-y-1">
              <span className="text-xs font-bold text-neutral-400 font-mono uppercase tracking-wider">
                Regional Deployment Scope
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Operational Presence in {location.city}
              </h2>
            </div>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              {location.operationalOverview}
            </p>

            {/* Compliance Checklist */}
            <div className="p-6 rounded-xl bg-[#080C14] border border-white/10 space-y-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Statutory Governance &amp; Security Standards:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
                {location.complianceHighlights.map((hl, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-white shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Key Industrial Zones Card */}
          <div className="p-6 rounded-xl bg-[#080C14] border border-white/15 space-y-4">
            <div className="flex items-center gap-2">
              <Factory size={18} className="text-white" />
              <h3 className="text-base font-bold text-white">
                Active Industrial Zones
              </h3>
            </div>
            <p className="text-xs text-neutral-300">
              Immediate guard forces and contract workforce deployment active across these corridors:
            </p>
            <ul className="space-y-2 text-xs">
              {location.keyIndustrialZones.map((zone, zIdx) => (
                <li
                  key={zIdx}
                  className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-white font-medium flex items-center justify-between"
                >
                  <span>{zone}</span>
                  <span className="text-[10px] text-emerald-400 font-mono">ACTIVE</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Sector Battlecards */}
        {location.sectorBattlecards && location.sectorBattlecards.length > 0 && (
          <section className="space-y-6 pt-10 border-t border-white/10 text-left">
            <div className="space-y-1">
              <span className="text-xs font-bold text-neutral-400 font-mono uppercase tracking-wider">
                Vertical Solutions
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Sector-Specific Deployment Battlecards for {location.city}
              </h2>
              <p className="text-sm text-neutral-300 max-w-2xl">
                Addressing high-consequence operational vulnerabilities with verified standard operating procedures.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {location.sectorBattlecards.map((card, cIdx) => (
                <div
                  key={cIdx}
                  className="p-6 rounded-xl bg-[#080C14] border border-white/10 hover:border-white/30 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-neutral-400 uppercase">
                      <Building2 size={14} className="text-white" />
                      <span>{card.sector}</span>
                    </div>

                    <div className="space-y-1">
                      <div className="text-[11px] font-semibold text-rose-400 uppercase tracking-wider">
                        Common Vulnerability:
                      </div>
                      <p className="text-xs text-neutral-300">
                        {card.painPoint}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <div className="text-[11px] font-semibold text-white uppercase tracking-wider">
                        JSM Tactical Protocol:
                      </div>
                      <p className="text-xs text-neutral-300 leading-relaxed">
                        {card.jsmSolution}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 text-xs font-semibold text-emerald-400 font-mono">
                    SLA: {card.sla}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Interactive Cost & ROI Simulator */}
        <section className="space-y-6 pt-10 border-t border-white/10 text-left">
          <div className="space-y-1">
            <span className="text-xs font-bold text-neutral-400 font-mono uppercase tracking-wider">
              Commercial Estimator
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Simulate Manpower &amp; Statutory Cost Savings in {location.city}
            </h2>
            <p className="text-sm text-neutral-300 max-w-2xl">
              Calculate projected monthly savings, statutory EPF/ESIC compliance costs, and relief coverage for your commercial premises.
            </p>
          </div>
          <RoiCalculator />
        </section>

        {/* Localized FAQs */}
        {location.localFaqs && location.localFaqs.length > 0 && (
          <section className="space-y-6 pt-10 border-t border-white/10 text-left">
            <div className="space-y-1">
              <span className="text-xs font-bold text-neutral-400 font-mono uppercase tracking-wider">
                Clarifications
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Frequently Answered Questions — {location.city}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 max-w-4xl">
              {location.localFaqs.map((faq, fIdx) => (
                <div
                  key={fIdx}
                  className="p-5 rounded-xl bg-[#080C14] border border-white/10 space-y-2"
                >
                  <div className="flex items-start gap-2.5">
                    <HelpCircle size={16} className="text-white shrink-0 mt-0.5" />
                    <h3 className="text-sm sm:text-base font-bold text-white">
                      {faq.question}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-300 pl-6 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Nearby Corridors */}
        <section className="space-y-6 pt-10 border-t border-white/10 text-left">
          <h3 className="text-base font-bold text-white">
            Other Regional Industrial Corridors in Tamil Nadu
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {otherLocations.map((other) => (
              <Link
                key={other.slug}
                href={`/locations/${other.slug}`}
                className="p-4 rounded-xl bg-[#080C14] border border-white/10 hover:border-white/30 transition-all space-y-1 block min-h-[44px]"
              >
                <div className="text-[10px] font-mono text-neutral-400 uppercase">
                  {other.regionType}
                </div>
                <h4 className="text-sm font-bold text-white flex items-center justify-between">
                  <span>{other.city}</span>
                  <ArrowRight size={14} className="text-neutral-400" />
                </h4>
                <p className="text-xs text-neutral-400 line-clamp-2">
                  {other.metaDescription}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Bottom Sticky Action Banner */}
        <section className="p-8 rounded-2xl bg-gradient-to-r from-[#0C121E] to-[#080C14] border border-white/20 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Ready to deploy verified security or manpower in {location.city}?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-xl">
              Connect directly with our 24/7 Central Operations Command. We mobilize trained muster teams with site-specific SOPs within 48 to 72 hours.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={`tel:${brandData.contact.phone}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white hover:bg-neutral-200 text-black text-sm font-bold transition-colors shadow-2xl press-scale min-h-[44px]"
            >
              <Phone size={15} />
              <span>Call Operations</span>
            </a>
            <Link
              href="/get-quote"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 text-white text-sm font-semibold transition-colors min-h-[44px]"
            >
              <span>Get Proposal</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
