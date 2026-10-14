import { brandData } from "@/data/brand";
import { constructMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import Image from "next/image";
import Link from "next/link";
import { 
  Plane, 
  ArrowRight, 
  CheckCircle2, 
  ArrowLeft 
} from "lucide-react";
import { AirportOperationsSlideshow } from "@/components/widgets/airport-slideshow";

export const metadata = constructMetadata({
  title: "Case Study: Trichy International Airport Concourse Operations (2024)",
  description: "How JSM Integrated Services executed platoon-strength passenger concourse security and crowd management for Tiruchirappalli International Airport.",
  path: "/case-studies/trichy-international-airport",
  image: "/images/real_jsm_airport_terminal_platoon.jpg",
  keywords: [
    "Trichy Airport Security Case Study",
    "Aviation Security Guarding Tamil Nadu",
    "JSM Integrated Services Airport Operations",
    "Ex-Servicemen Crowd Management Case Study"
  ]
});

export default function AirportCaseStudyPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: brandData.domain },
    { name: "Case Studies", url: `${brandData.domain}/case-studies/trichy-international-airport` },
    { name: "Trichy Airport Operations", url: `${brandData.domain}/case-studies/trichy-international-airport` },
  ]);

  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Case Study: Tiruchirappalli International Airport Concourse Operations (2024)",
    "description": "How JSM Integrated Services executed platoon-strength passenger concourse security and crowd management for Tiruchirappalli International Airport.",
    "datePublished": "2024-06-01",
    "dateModified": "2026-03-24",
    "author": {
      "@type": "Person",
      "name": "Major AR Devadoss (Army-Veteran)",
      "jobTitle": "Head of Operations & Audit"
    },
    "publisher": {
      "@type": "Organization",
      "name": brandData.name,
      "url": brandData.domain
    },
    "image": `${brandData.domain}/images/real_jsm_airport_terminal_platoon.jpg`
  };

  return (
    <main className="min-h-screen bg-[#030712] text-white pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Navigation back */}
        <Link
          href="/about"
          className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 hover:underline min-h-[44px] py-2"
        >
          <ArrowLeft size={14} className="text-cyan-400" />
          <span>Back to Company &amp; Leadership</span>
        </Link>

        {/* Hero Header */}
        <header className="space-y-4 border-b border-cyan-500/20 pb-8">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-300 bg-cyan-500/10 border border-cyan-400/30 px-3 py-1 rounded-full">
              Aviation Operations &bull; 2024
            </span>
            <span className="text-xs text-neutral-300 flex items-center gap-1.5 font-medium">
              <Plane size={14} className="text-cyan-400" />
              <span>International Concourse Deployment</span>
            </span>
          </div>

          <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl text-white font-bold tracking-tight leading-tight">
            Tiruchirappalli International Airport Concourse Operations
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
            Platoon-strength terminal security, passenger access control, and strict uniform turnout during the 2024 terminal expansion.
          </p>
        </header>

        {/* Happy Client Endorsement Box — Airports Authority of India (AAI) */}
        <section className="p-6 sm:p-7 rounded-2xl tactical-glass-card border border-cyan-500/30 shadow-[0_0_40px_rgba(14,165,233,0.15)] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            <div className="relative w-20 h-14 rounded-xl bg-white/10 border border-cyan-400/30 backdrop-blur-md p-1.5 flex items-center justify-center shrink-0 shadow-sm">
              <Image
                src="/images/clients/aai_logo.svg"
                alt="Airports Authority of India (AAI) Logo"
                fill
                className="object-contain p-1 filter brightness-110"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase font-bold text-cyan-400">
                Official Institutional Client
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Airports Authority of India (AAI)
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300">
                Ministry of Civil Aviation, Government of India &bull; Tiruchirappalli International Airport Concourse Operations (2024)
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-xs font-semibold shrink-0 shadow-sm">
            <CheckCircle2 size={14} className="text-emerald-400" />
            <span>Verified Happy Client</span>
          </span>
        </section>

        {/* Metrics Bar */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-xl border border-cyan-500/20 tactical-glass-card shadow-lg">
          <div className="space-y-1">
            <span className="text-[11px] font-medium text-neutral-400">Operational SLA</span>
            <div className="font-display text-2xl font-bold text-cyan-300">100%</div>
            <p className="text-[10px] text-neutral-400">Muster Adherence</p>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] font-medium text-neutral-400">Security Breaches</span>
            <div className="font-display text-2xl font-bold text-emerald-400">Zero</div>
            <p className="text-[10px] text-neutral-400">Incident-Free Record</p>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] font-medium text-neutral-400">Supervisory Unit</span>
            <div className="font-display text-2xl font-bold text-cyan-300">ESM Led</div>
            <p className="text-[10px] text-neutral-400">Military Veteran Officers</p>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] font-medium text-neutral-400">Shift Telemetry</span>
            <div className="font-display text-2xl font-bold text-cyan-300">24 / 7</div>
            <p className="text-[10px] text-neutral-400">Live Radio Network</p>
          </div>
        </section>

        {/* Hero Image */}
        <div className="rounded-xl overflow-hidden border border-cyan-500/30 relative aspect-16/10 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
          <Image
            src="/images/real_jsm_airport_terminal_platoon.jpg"
            alt="JSM Security Platoon Deployed at Trichy International Airport"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Case Narrative */}
        <section className="space-y-8 text-sm sm:text-base text-neutral-200 leading-relaxed">
          <div className="space-y-3">
            <h2 className="font-sans text-xl sm:text-2xl font-bold text-white tracking-tight">
              The Operational Challenge
            </h2>
            <p className="text-neutral-300">
              The commissioning of the new international concourse at Tiruchirappalli International Airport required high-vigilance physical security, smooth passenger movement facilitation, and strict adherence to Bureau of Civil Aviation Security (BCAS) standards.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-sans text-xl sm:text-2xl font-bold text-white tracking-tight">
              The JSM Deployment Solution
            </h2>
            <p className="text-neutral-300">
              Directed by Head of Operations Major AR Devadoss (Army-Veteran), JSM deployed a specialized platoon of disciplined Ex-Servicemen supervisory marshals and trained security guards.
            </p>
            <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-200 bg-[#080C16] p-5 rounded-xl border border-cyan-500/20 tactical-glass-card">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Pre-Shift Radio Muster:</strong> Daily formal inspections, communication checks, and duty post rotations.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Concourse Crowd Segregation:</strong> Structured access flow management preventing bottlenecking at departure and arrival gates.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">2-Hour Standby Reserves:</strong> On-call relief personnel staged in Tiruchirappalli ensuring 100% post occupancy 24/7.</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="font-sans text-xl sm:text-2xl font-bold text-white tracking-tight">
              Measurable Operational Outcomes
            </h2>
            <p className="text-neutral-300">
              Throughout the assignment, JSM Integrated Services maintained a 100% incident-free record with zero security breaches, full statutory compliance for all personnel, and commendations for military discipline.
            </p>
          </div>
        </section>

        {/* Curated Operations Photographic Slideshow */}
        <AirportOperationsSlideshow className="py-8" />

        {/* Bottom CTA */}
        <footer className="pt-8 border-t border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-bold text-sm text-white">
              Need airport-standard security for your industrial or commercial facility?
            </h4>
            <p className="text-xs text-neutral-400">
              Contact our central operations command desk for a customized site risk evaluation.
            </p>
          </div>
          <Link
            href="/get-quote"
            className="btn-border-beam min-touch-target min-h-[44px] w-full sm:w-auto shrink-0"
          >
            <span className="btn-border-beam-inner h-full flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold">
              <span>Request Site Proposal</span>
              <ArrowRight size={13} />
            </span>
          </Link>
        </footer>
      </div>
    </main>
  );
}
