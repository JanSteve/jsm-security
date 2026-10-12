import { brandData } from "@/data/brand";
import { breadcrumbSchema } from "@/lib/schema";
import Link from "next/link";
import Image from "next/image";
import { 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  MapPin,
  Award
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
    <main className="min-h-screen bg-black text-white pt-28 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Editorial Page Header */}
        <section className="py-8 sm:py-10 border-b border-white/10">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold backdrop-blur-md">
              <ShieldCheck size={14} />
              <span>Company Background &amp; Leadership</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-bold tracking-tight">
              Executive Leadership &amp; Operational Governance
            </h1>
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
              JSM Integrated Services is an enterprise facilities, manpower, and security agency headquartered in Tiruchirappalli, Tamil Nadu. Built on strict military discipline and direct founder accountability.
            </p>
          </div>
        </section>

        {/* Company Genesis & History */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-white/10 pb-12">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Origins &amp; Evolution
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-white font-bold tracking-tight">
              From JSMMANPOWER to Integrated Enterprise Services
            </h2>
            <div className="space-y-2 text-sm text-neutral-300 leading-relaxed">
              <p>
                Originally established as <strong>JSMMANPOWER</strong>, our organization began with industrial staffing. Expanding to meet enterprise demands, we integrated full-spectrum Ex-Servicemen security guarding and mechanized commercial facility management.
              </p>
              <p>
                Today, rebranded as <strong>JSM Integrated Services</strong>, we deliver a cohesive three-tier model backed by Ex-Servicemen supervisory officers and 100% statutory EPF/ESIC compliance.
              </p>
            </div>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold text-white">
              <div className="p-3.5 rounded-lg bg-[#080C14] border border-white/10 flex items-center gap-2">
                <CheckCircle2 size={15} className="text-white" />
                <span>Proprietorship Legal Structure</span>
              </div>
              <div className="p-3.5 rounded-lg bg-[#080C14] border border-white/10 flex items-center gap-2">
                <CheckCircle2 size={15} className="text-white" />
                <span>GST Registered: Multi-Service SAC</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="rounded-xl overflow-hidden border border-white/15 bg-[#080C14] shadow-xl relative aspect-4/3">
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
          className="rounded-2xl border border-white/10 shadow-2xl my-8" 
        />

        {/* Landmark Milestone: Trichy International Airport */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-white/10 pb-12">
          <div className="lg:col-span-5 relative aspect-16/10 rounded-xl overflow-hidden border border-white/15">
            <Image
              src="/images/real_jsm_airport_terminal_platoon.jpg"
              alt="Trichy International Airport Operations Platoon"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />
          </div>
          <div className="lg:col-span-7 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Landmark Assignment
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-white font-bold tracking-tight">
              Tiruchirappalli International Airport Concourse Operations (2024)
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed">
              JSM Integrated Services executed round-the-clock concourse security and passenger access management for the international terminal expansion for Airports Authority of India (AAI) with zero security breaches and 100% muster compliance.
            </p>
            <div className="flex items-center gap-6 pt-1 text-xs text-white font-semibold">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 size={14} />
                Zero Security Incidents
              </span>
              <span className="flex items-center gap-1.5 text-neutral-200">
                <CheckCircle2 size={14} className="text-white" />
                100% Muster Adherence
              </span>
            </div>
          </div>
        </section>

        {/* Regional District Hubs Directory */}
        <section className="space-y-6 border-b border-white/10 pb-12">
          <div className="space-y-1 text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Regional Presence
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-white font-bold tracking-tight">
              District Operations Hubs in Tamil Nadu
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {districtHubs.map((hub, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-white/10 bg-[#080C14] space-y-1 text-left"
              >
                <div className="flex items-center gap-2">
                  <MapPin size={15} className="text-white shrink-0" />
                  <h3 className="text-sm font-bold text-white">
                    {hub.city}
                  </h3>
                </div>
                <p className="text-xs font-semibold text-neutral-300">
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
        <section className="py-10 bg-[#080C14] rounded-2xl border border-white/10 p-6 sm:p-10 text-center space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl text-white font-bold tracking-tight">
            Consult directly with our leadership team
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto">
            Discuss security deployments, workforce staffing, or facility operations with Managing Director Sweety J and Operations Head Major AR Devadoss.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white hover:bg-neutral-200 text-black text-xs sm:text-sm font-semibold transition-all shadow-2xl press-scale min-h-[44px] w-full sm:w-auto"
            >
              <span>Contact Operations Desk</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
