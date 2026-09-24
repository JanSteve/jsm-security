import { brandData } from "@/data/brand";
import { constructMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import Image from "next/image";
import Link from "next/link";
import { 
  Plane, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Users, 
  Award, 
  Building2, 
  ArrowLeft 
} from "lucide-react";

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
    <main className="min-h-screen bg-white text-[#14181F] pt-32 pb-24">
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
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#0B3D2E] hover:underline"
        >
          <ArrowLeft size={14} />
          <span>Back to Company Background</span>
        </Link>

        {/* Hero Header */}
        <header className="space-y-4 border-b border-[#E7E5E0] pb-8">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0B3D2E] bg-[#0B3D2E]/8 px-2.5 py-1 rounded">
              Aviation Operations • 2024
            </span>
            <span className="text-xs text-[#5A6578] flex items-center gap-1 font-medium">
              <Plane size={13} className="text-[#0B3D2E]" />
              <span>International Concourse Deployment</span>
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#14181F] font-bold tracking-tight leading-tight">
            Tiruchirappalli International Airport Concourse Operations
          </h1>

          <p className="text-base sm:text-lg text-[#5A6578] leading-relaxed">
            Platoon-strength terminal security, high-density passenger access control, and strict uniform turnout executed during the 2024 terminal expansion.
          </p>
        </header>

        {/* Metrics Bar */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-xl border border-[#E7E5E0] bg-[#F8F9FA]">
          <div className="space-y-1">
            <span className="text-[11px] font-medium text-[#5A6578]">Operational SLA</span>
            <div className="font-display text-2xl font-bold text-[#0B3D2E]">100%</div>
            <p className="text-[10px] text-[#5A6578]">Muster Adherence</p>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] font-medium text-[#5A6578]">Security Breaches</span>
            <div className="font-display text-2xl font-bold text-[#0B3D2E]">Zero</div>
            <p className="text-[10px] text-[#5A6578]">Incident-Free Record</p>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] font-medium text-[#5A6578]">Supervisory Unit</span>
            <div className="font-display text-2xl font-bold text-[#0B3D2E]">ESM Led</div>
            <p className="text-[10px] text-[#5A6578]">Military Veteran Officers</p>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] font-medium text-[#5A6578]">Shift Telemetry</span>
            <div className="font-display text-2xl font-bold text-[#0B3D2E]">24 / 7</div>
            <p className="text-[10px] text-[#5A6578]">Live Radio Network</p>
          </div>
        </section>

        {/* Hero Image */}
        <div className="rounded-xl overflow-hidden border border-[#E7E5E0] relative aspect-16/10 shadow-xs">
          <Image
            src="/images/real_jsm_airport_terminal_platoon.jpg"
            alt="JSM Security Platoon Deployed at Trichy International Airport"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Case Narrative */}
        <section className="space-y-8 text-sm sm:text-base text-[#14181F] leading-relaxed">
          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-[#14181F]">
              The Operational Challenge
            </h2>
            <p className="text-[#4B5259]">
              The operational commissioning of the international concourse at Tiruchirappalli International Airport required high-vigilance physical security, non-intrusive passenger movement facilitation, and strict adherence to Bureau of Civil Aviation Security (BCAS) and Airport Authority standard operating procedures.
            </p>
            <p className="text-[#4B5259]">
              With thousands of international and domestic passengers moving through terminal gates daily, the deployment called for zero-defect turnout, multilingual passenger courtesy, and instantaneous emergency response coordination.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-[#14181F]">
              The JSM Deployment Solution
            </h2>
            <p className="text-[#4B5259]">
              Directed by our Head of Operations, Major AR Devadoss (Army-Veteran), JSM deployed a specialized platoon of disciplined Ex-Servicemen supervisory marshals and rigorously trained security personnel.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-[#14181F] bg-[#F8F9FA] p-5 rounded-xl border border-[#E7E5E0]">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#0B3D2E] shrink-0 mt-0.5" />
                <span><strong>Pre-Shift Radio Muster:</strong> Daily formal inspections, communication checks, and duty post rotations.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#0B3D2E] shrink-0 mt-0.5" />
                <span><strong>Concourse Crowd Segregation:</strong> Structured access flow management preventing bottlenecking at departure and arrival gates.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-[#0B3D2E] shrink-0 mt-0.5" />
                <span><strong>2-Hour Standby Reserves:</strong> On-call relief personnel staged in Tiruchirappalli ensuring 100% post occupancy 24/7.</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-[#14181F]">
              Measurable Operational Outcomes
            </h2>
            <p className="text-[#4B5259]">
              Throughout the duration of the landmark assignment, JSM Integrated Services maintained a 100% incident-free operational record with zero security breaches, full statutory compliance for all deployed personnel, and commendations for impeccable discipline.
            </p>
          </div>
        </section>

        {/* Secondary Photo */}
        <div className="rounded-xl overflow-hidden border border-[#E7E5E0] relative aspect-16/10 shadow-xs">
          <Image
            src="/images/real_jsm_welcome_trichy_salute.jpg"
            alt="JSM Guard Unit Turnout Salute in Trichy"
            fill
            className="object-cover"
          />
        </div>

        {/* Bottom CTA */}
        <footer className="pt-8 border-t border-[#E7E5E0] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-bold text-sm text-[#14181F]">
              Need airport-standard security for your industrial or commercial facility?
            </h4>
            <p className="text-xs text-[#5A6578]">
              Contact our central operations command desk for a customized site risk evaluation.
            </p>
          </div>
          <Link
            href="/get-quote"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#0B3D2E] text-white text-xs font-semibold hover:bg-[#145C43] transition-colors shrink-0 shadow-xs"
          >
            <span>Request Site Proposal</span>
            <ArrowRight size={13} />
          </Link>
        </footer>
      </div>
    </main>
  );
}
