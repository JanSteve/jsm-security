import { brandData } from "@/data/brand";
import { breadcrumbSchema } from "@/lib/schema";
import Link from "next/link";
import Image from "next/image";
import { 
  ShieldCheck, 
  Award, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  FileCheck, 
  MapPin 
} from "lucide-react";

export const metadata = {
  title: "About Leadership & Governance | JSM Integrated Services",
  description: "Learn about JSM Integrated Services leadership: Managing Director Sweety J, Head of Operations Major AR Devadoss (Army-Veteran), and CTO R Jan Steve Daniel.",
};

const districtHubs = [
  { city: "Tiruchirappalli (Trichy)", role: "Headquarters & Central Command", address: "RVS Nagar, Kottapattu Post, Pin 620021" },
  { city: "Chennai", role: "OMR IT Corridor & Commercial Division", address: "Sholinganallur & Guindy Hub" },
  { city: "Coimbatore", role: "Industrial & Manufacturing Outpost", address: "Peelamedu & Sidco Industrial Estate" },
  { city: "Hosur", role: "Automotive & Electronics SEZ Division", address: "Sipcot Industrial Complex" },
  { city: "Salem & Erode", role: "Fabrication & Textile Workforce Hub", address: "Steel Plant Road & Perundurai SEZ" },
  { city: "Madurai", role: "Southern Regional Operations Division", address: "K.K. Nagar & Mattuthavani Sector" },
  { city: "Tirunelveli", role: "Renewable Energy & Infrastructure Unit", address: "Gangaikondan IT Park" }
];

export default function AboutPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: brandData.domain },
    { name: "About Us", url: `${brandData.domain}/about` },
  ]);

  return (
    <main className="min-h-screen bg-white text-[#14181F] pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Editorial Page Header */}
        <section className="py-8 sm:py-12 border-b border-[#E7E5E0]">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B3D2E]/8 text-[#0B3D2E] text-xs font-semibold">
              <ShieldCheck size={14} />
              <span>Company Background &amp; Leadership</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#14181F] font-normal tracking-tight">
              Executive Leadership &amp; Operational Governance
            </h1>
            <p className="text-base sm:text-lg text-[#5A6578] leading-relaxed">
              JSM Integrated Services is an enterprise facilities, manpower, and security agency headquartered in Tiruchirappalli, Tamil Nadu. Built on strict military discipline and direct founder accountability.
            </p>
          </div>
        </section>

        {/* Company Genesis & History (JSMMANPOWER Origin) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-b border-[#E7E5E0] pb-16">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0B3D2E]">
              Origins &amp; Evolution
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-[#14181F] font-normal tracking-tight">
              From JSMMANPOWER to Integrated Enterprise Services
            </h2>
            <div className="space-y-3 text-sm text-[#5A6578] leading-relaxed">
              <p>
                Originally established as <strong>JSMMANPOWER</strong>, our organization began with a core focus on contract industrial labor and specialized factory workforce supply. As clients sought to reduce vendor fragmentation, we expanded into full-spectrum security guarding under the Private Security Agencies Regulation Act (PSARA 2005) and mechanized commercial facility management.
              </p>
              <p>
                Today, rebranded as <strong>JSM Integrated Services</strong>, we deliver an integrated three-tier operational model backed by Ex-Servicemen supervisory officers and 100% statutory EPF/ESIC compliance.
              </p>
            </div>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#14181F] font-medium">
              <div className="p-3.5 rounded-lg bg-[#F8F9FA] border border-[#E7E5E0] flex items-center gap-2">
                <CheckCircle2 size={15} className="text-[#0B3D2E]" />
                <span>Proprietorship Legal Structure</span>
              </div>
              <div className="p-3.5 rounded-lg bg-[#F8F9FA] border border-[#E7E5E0] flex items-center gap-2">
                <CheckCircle2 size={15} className="text-[#0B3D2E]" />
                <span>GST Registered: Multi-Service SAC</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="rounded-xl overflow-hidden border border-[#E7E5E0] bg-[#F8F9FA] shadow-xs relative aspect-4/3">
              <Image
                src="/images/real_jsm_printed_card.jpg"
                alt="JSM Integrated Services Physical Corporate Credentials"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
            </div>
            <p className="text-[11px] text-[#5A6578] mt-2 text-center">
              Official physical credentials carrying PSARA &amp; ISO 9001:2015 governance seals.
            </p>
          </div>
        </section>

        {/* Named Leadership Bios (Sweety J, Major AR Devadoss, R Jan Steve Daniel) */}
        <section className="space-y-10 border-b border-[#E7E5E0] pb-16">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0B3D2E]">
              Executive Board
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-[#14181F] font-normal tracking-tight">
              Named Operational Officers
            </h2>
            <p className="text-sm text-[#5A6578]">
              Direct leadership accessibility. Our senior leadership team actively oversees field deployments and monthly audits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {brandData.leadership.map((officer, idx) => (
              <div
                key={idx}
                className="p-7 rounded-xl border border-[#E7E5E0] bg-[#F8F9FA]/60 space-y-4"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-[#0B3D2E] uppercase bg-[#0B3D2E]/8 px-2 py-0.5 rounded">
                    {officer.role}
                  </span>
                  <h3 className="text-lg font-semibold text-[#14181F]">
                    {officer.name}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#5A6578] leading-relaxed">
                  {officer.bio}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Landmark Milestone: Trichy International Airport */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-[#E7E5E0] pb-16">
          <div className="lg:col-span-5 relative aspect-16/10 rounded-xl overflow-hidden border border-[#E7E5E0]">
            <Image
              src="/images/real_jsm_airport_terminal_platoon.jpg"
              alt="Trichy International Airport Operations Platoon"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />
          </div>
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#B8925A]">
              Landmark Assignment
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-[#14181F] font-normal tracking-tight">
              Tiruchirappalli International Airport Concourse Operations (2024)
            </h2>
            <p className="text-sm text-[#5A6578] leading-relaxed">
              JSM Integrated Services executed commercial terminal security and passenger access management for the international terminal in 2024. This landmark contract established our high-density crowd management and uncompromised turnout standards.
            </p>
            <div className="flex items-center gap-6 pt-2 text-xs text-[#14181F] font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-[#0B3D2E]" />
                Zero Security Incidents
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-[#0B3D2E]" />
                100% Muster Adherence
              </span>
            </div>
          </div>
        </section>

        {/* Consolidated District Hubs Directory */}
        <section className="space-y-8 border-b border-[#E7E5E0] pb-16">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0B3D2E]">
              Regional Presence
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-[#14181F] font-normal tracking-tight">
              District Operations Hubs in Tamil Nadu
            </h2>
            <p className="text-sm text-[#5A6578]">
              Decentralized supervisory outposts ensuring adherence to our 2-hour relief replacement SLA across all districts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {districtHubs.map((hub, idx) => (
              <div
                key={idx}
                className="p-5 rounded-lg border border-[#E7E5E0] bg-white space-y-1.5"
              >
                <div className="flex items-center gap-2">
                  <MapPin size={15} className="text-[#0B3D2E] shrink-0" />
                  <h3 className="text-sm font-semibold text-[#14181F]">
                    {hub.city}
                  </h3>
                </div>
                <p className="text-xs font-medium text-[#0B3D2E]">
                  {hub.role}
                </p>
                <p className="text-[11px] text-[#5A6578]">
                  {hub.address}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Closing Contact CTA */}
        <section className="py-12 bg-[#F8F9FA] rounded-xl border border-[#E7E5E0] p-8 sm:p-12 text-center space-y-5">
          <h2 className="font-display text-2xl sm:text-3xl text-[#14181F] font-normal tracking-tight">
            Consult directly with our leadership team
          </h2>
          <p className="text-xs sm:text-sm text-[#5A6578] max-w-xl mx-auto">
            Discuss premises security audits, contractual staffing requirements, or multi-site facility management with Managing Director Sweety J.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#0B3D2E] hover:bg-[#082C21] text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs"
            >
              <span>Contact Operations Desk</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/get-quote"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white border border-[#E7E5E0] hover:bg-neutral-50 text-[#14181F] text-xs sm:text-sm font-semibold transition-colors"
            >
              <span>Request Quote</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
