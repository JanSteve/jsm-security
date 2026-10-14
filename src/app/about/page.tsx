import { brandData } from "@/data/brand";
import { breadcrumbSchema } from "@/lib/schema";
import Link from "next/link";
import Image from "next/image";
import { 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  MapPin
} from "lucide-react";

import { constructMetadata } from "@/lib/seo";
import { ExecutiveLeadershipSection } from "@/components/sections";

export const metadata = constructMetadata({
  title: "About Leadership & Governance",
  description: "Learn about JSM Integrated Services leadership: Managing Director Sweety J, Head of Operations Major AR Devadoss (Army-Veteran), and CTO R Jan Steve Daniel.",
  path: "/about",
  image: "/images/real_jsm_printed_card.jpg",
});

const districtHubs = [
  { city: "Tiruchirappalli (Trichy)", role: "Headquarters & Central Command", address: "D.No. 87, Plot No. 112, Gandhi Nagar, Kottapattu Block - R.V.S. Nagar 2nd Cross Road, Pin 620021" },
  { city: "Chennai", role: "OMR IT Corridor & Commercial Division", address: "Sholinganallur & Guindy Hub" },
  { city: "Coimbatore", role: "Industrial & Manufacturing Outpost", address: "Peelamedu & Sidco Industrial Estate" },
  { city: "Hosur", role: "Automotive & Electronics SEZ Division", address: "Sipcot Industrial Complex" },
  { city: "Salem & Erode", role: "Fabrication & Workforce Hub", address: "Steel Plant Road & Perundurai SEZ" },
  { city: "Madurai", role: "Southern Regional Operations Division", address: "K.K. Nagar & Mattuthavani Sector" }
];

export default function AboutPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: brandData.domain },
    { name: "About Us", url: `${brandData.domain}/about` },
  ]);

  return (
    <main className="min-h-screen bg-[#030712] text-white pt-28 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Editorial Page Header */}
        <section className="py-8 sm:py-10 border-b border-cyan-500/20">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold font-mono backdrop-blur-md">
              <ShieldCheck size={14} className="text-cyan-400" />
              <span>Company Background &amp; Leadership</span>
            </div>
            <h1 className="font-sans font-bold tracking-tight text-white text-3xl sm:text-4xl md:text-5xl">
              Executive Leadership &amp; Operational Governance
            </h1>
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
              Headquartered in Tiruchirappalli, JSM Integrated Services delivers Ex-Servicemen security forces, industrial staffing, and mechanized facility management with direct founder accountability.
            </p>
          </div>
        </section>

        {/* Company Genesis & History */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-cyan-500/20 pb-12">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
              Origins &amp; Evolution
            </span>
            <h2 className="font-sans font-bold tracking-tight text-white text-2xl sm:text-3xl">
              From JSMMANPOWER to Integrated Enterprise Services
            </h2>
            <div className="text-sm text-neutral-300 leading-relaxed">
              <p>
                Established as <strong>JSMMANPOWER</strong> and rebranded as <strong>JSM Integrated Services</strong>, we consolidate Ex-Servicemen security guarding, industrial staffing, and mechanized facility hygiene under 100% EPF/ESIC statutory compliance.
              </p>
            </div>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold text-white">
              <div className="p-3.5 rounded-lg tactical-glass-card border border-cyan-500/20 flex items-center gap-2.5">
                <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                <span>Proprietorship Legal Structure</span>
              </div>
              <div className="p-3.5 rounded-lg tactical-glass-card border border-cyan-500/20 flex items-center gap-2.5">
                <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                <span>GST Registered: Multi-Service SAC</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="rounded-xl overflow-hidden border border-cyan-500/30 bg-[#080C14] shadow-xl relative aspect-4/3">
              <Image
                src="/images/real_jsm_printed_card.jpg"
                alt="JSM Integrated Services Physical Corporate Credentials"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
            </div>
            <p className="text-[11px] text-neutral-400 mt-2 text-center">
              Official physical credentials carrying 100% EPF/ESIC and professional statutory governance seals.
            </p>
          </div>
        </section>

        {/* Named Leadership Bios (Major AR Devadoss, Sweety J, R Jan Steve Daniel) */}
        <ExecutiveLeadershipSection 
          showTitle={true} 
          darkTheme={true} 
          className="rounded-2xl border border-cyan-500/20 shadow-2xl my-8" 
        />

        {/* Landmark Milestone: Trichy International Airport */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-cyan-500/20 pb-12">
          <div className="lg:col-span-5 relative aspect-16/10 rounded-xl overflow-hidden border border-cyan-500/30">
            <Image
              src="/images/real_jsm_airport_terminal_platoon.jpg"
              alt="Trichy International Airport Operations Platoon"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />
          </div>
          <div className="lg:col-span-7 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
              Landmark Assignment
            </span>
            <h2 className="font-sans font-bold tracking-tight text-white text-2xl sm:text-3xl">
              Tiruchirappalli International Airport Concourse Operations (2024)
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Executed 24/7 concourse security for Airports Authority of India (AAI) at Tiruchirappalli International Airport with zero security breaches and 100% muster compliance.
            </p>
            <div className="flex flex-wrap items-center gap-6 pt-1 text-xs text-white font-semibold">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 size={14} className="text-emerald-400" />
                Zero Security Incidents
              </span>
              <span className="flex items-center gap-1.5 text-neutral-200">
                <CheckCircle2 size={14} className="text-emerald-400" />
                100% Muster Adherence
              </span>
            </div>
          </div>
        </section>

        {/* Regional District Hubs Directory */}
        <section className="space-y-6 border-b border-cyan-500/20 pb-12">
          <div className="space-y-1 text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
              Regional Presence
            </span>
            <h2 className="font-sans font-bold tracking-tight text-white text-2xl sm:text-3xl">
              District Operations Hubs in Tamil Nadu
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {districtHubs.map((hub, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-cyan-500/20 tactical-glass-card hover:border-cyan-400/40 hover:shadow-[0_0_20px_rgba(14,165,233,0.12)] transition-all space-y-1 text-left"
              >
                <div className="flex items-center gap-2">
                  <MapPin size={15} className="text-cyan-400 shrink-0" />
                  <h3 className="text-sm font-bold text-white">
                    {hub.city}
                  </h3>
                </div>
                <p className="text-xs font-semibold text-cyan-200">
                  {hub.role}
                </p>
                <p className="text-[11px] text-neutral-400">
                  {hub.address}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Closing Contact CTA */}
        <section className="py-10 tactical-glass-card rounded-2xl border border-cyan-500/30 p-6 sm:p-10 text-center space-y-4 shadow-[0_0_40px_rgba(14,165,233,0.12)]">
          <h2 className="font-sans font-bold tracking-tight text-white text-2xl sm:text-3xl">
            Consult directly with our leadership team
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto">
            Direct consultation with Managing Director Sweety J and Operations Head Major AR Devadoss—response guaranteed within 2 hours.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/contact"
              className="btn-border-beam min-touch-target min-h-[44px] w-full sm:w-auto"
            >
              <span className="btn-border-beam-inner h-full flex items-center justify-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold">
                <span>Contact Operations Desk</span>
                <ArrowRight size={14} />
              </span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
