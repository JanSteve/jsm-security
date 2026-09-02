"use client";

import { brandData } from "@/data/brand";
import { breadcrumbSchema } from "@/lib/schema";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Plane, 
  Building2, 
  Sparkles, 
  MapPin, 
  Calendar, 
  Clock, 
  TrendingDown, 
  TrendingUp, 
  Users, 
  Award,
  Factory,
  Cpu
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CASE_STUDIES = [
  {
    id: "airport",
    tag: "Landmark Launch Contract • 2024",
    title: "Trichy International Airport Operations",
    location: "Tiruchirappalli, Tamil Nadu",
    sector: "Civil Aviation & Public Infrastructure",
    image: "/images/airport_operations.jpg",
    icon: Plane,
    stats: [
      { label: "Security Breaches", val: "0 Incidents", highlight: true },
      { label: "SLA Adherence", val: "100%", highlight: false },
      { label: "Peak Shift Handover", val: "< 15 Mins", highlight: false },
    ],
    challenge: "Strict adherence to Bureau of Civil Aviation Security (BCAS) standards, zero tolerance for personnel absenteeism during high-density international flight departures.",
    solution: "Site-specific SOPs, 5-day induction on passenger etiquette and gate discipline, with continuous 24/7 supervisor rounds across terminal entry points.",
    impact: "Flawless operational execution with positive feedback from airport authorities, establishing JSM's benchmark in high-stakes public infrastructure.",
  },
  {
    id: "automotive",
    tag: "Industrial Manufacturing Corridor",
    title: "Sriperumbudur Automotive Tier-1 Ancillary Plant",
    location: "Sriperumbudur / Oragadam SIPCOT, Chennai",
    sector: "Automotive Precision Manufacturing",
    image: "/images/industrial_workforce.jpg",
    icon: Factory,
    stats: [
      { label: "Annual Cost Savings", val: "22.4%", highlight: true },
      { label: "Relief SLA Response", val: "45 Mins", highlight: false },
      { label: "Shift Gate Handover", val: "100% On-Time", highlight: false },
    ],
    challenge: "Heavy 3-shift employee turnover (1,200+ plant workers per shift change), frequent contractor labour disputes, and raw material gate reconciliation delays.",
    solution: "Deployed 18 PSARA-certified guards with barcode material scanning, dual-barrier vehicle inspections, and automated 2-Hour Relief reserves.",
    impact: "Eliminated co-employer statutory labour liability through monthly ECR challan verification, reducing client security overhead by 22.4% annually.",
  },
  {
    id: "it-park",
    tag: "IT SEZ Facility Management",
    title: "Coimbatore ELCOT IT Tech Park Campus",
    location: "Peelamedu, Coimbatore, Tamil Nadu",
    sector: "Information Technology & Commercial SEZ",
    image: "/images/facility_lobby.jpg",
    icon: Cpu,
    stats: [
      { label: "Vendor Consolidation", val: "2 to 1 Single SLA", highlight: true },
      { label: "Hygiene Compliance", val: "99.8%", highlight: false },
      { label: "Visitor Throughput", val: "4x Faster", highlight: false },
    ],
    challenge: "Fragmented multi-vendor management: separate security and housekeeping vendors causing communication gaps, dirty high-traffic lobbies, and uncoordinated badge audits.",
    solution: "Single-point JSM Integrated contract deploying 12 physical guards, mechanized ride-on floor scrubbers, and technical facility technicians under unified management.",
    impact: "Unified digital dashboard tracking guard attendance and sanitization checklists, cutting administrative vendor management hours by 60%.",
  },
  {
    id: "heavy-eng",
    tag: "Rapid 48-Hour Workforce Scaling",
    title: "Hosur Heavy Industrial Fabrication Complex",
    location: "SIPCOT Phase II, Hosur, Tamil Nadu",
    sector: "Heavy Engineering & Logistics",
    image: "/images/protective_guard.jpg",
    icon: Building2,
    stats: [
      { label: "Surge Deployment Speed", val: "< 48 Hours", highlight: true },
      { label: "Guards Mobilized", val: "24 Personnel", highlight: false },
      { label: "Police Verification", val: "100% Cleared", highlight: false },
    ],
    challenge: "Sudden vendor contract termination during festive quarter production spike, risking unattended warehouse bays and unauthorized scrap removal.",
    solution: "Mobilized 24 fully vetted PSARA guards from JSM reserve pool in under 48 hours with dedicated supervisor patrol vans.",
    impact: "Zero theft or scrap leakage during peak production run, with client permanently converting the emergency deployment into an annual multi-year contract.",
  },
];

export default function CaseStudiesPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: brandData.domain },
    { name: "Case Studies", url: `${brandData.domain}/case-studies` },
  ]);

  return (
    <main className="min-h-screen bg-zinc-950 text-white pt-28 pb-24 px-4 sm:px-6 md:px-12 lg:px-20 selection:bg-[#C5A880] selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 text-[#C5A880] text-xs font-mono font-bold">
            <Sparkles size={13} />
            <span>VERIFIED OPERATIONAL TRACK RECORD</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase">
            Operational <span className="text-[#C5A880]">Case Studies</span>
          </h1>

          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Real deployments. Measured performance benchmarks. From high-stakes international airport operations to high-density automotive manufacturing corridors.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="space-y-12 max-w-5xl mx-auto">
          {CASE_STUDIES.map((study, idx) => {
            const Icon = study.icon;
            return (
              <div
                key={study.id}
                className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl transition-all hover:border-[#C5A880]/60"
              >
                {/* Header Banner */}
                <div className="relative h-60 sm:h-72 w-full">
                  <Image
                    src={study.image}
                    alt={study.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 1024px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-3">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-[#C5A880] flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full w-fit">
                        <Icon size={12} /> {study.tag}
                      </span>
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight drop-shadow-md">
                        {study.title}
                      </h2>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-bold bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-zinc-300 border border-zinc-700">
                      <MapPin size={12} className="text-[#C5A880]" />
                      {study.location}
                    </div>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 sm:p-8 space-y-6">
                  
                  {/* Key Operational Stats */}
                  <div className="grid grid-cols-3 gap-3">
                    {study.stats.map((stat, sIdx) => (
                      <div key={sIdx} className="bg-zinc-800/60 p-3.5 rounded-2xl border border-zinc-700/60 text-center">
                        <span className="text-[10px] text-zinc-400 font-mono block uppercase">{stat.label}</span>
                        <span className={`text-base sm:text-lg font-black ${stat.highlight ? 'text-[#C5A880]' : 'text-white'}`}>
                          {stat.val}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Narrative Columns */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div className="bg-zinc-800/30 p-4 rounded-xl border border-zinc-800 space-y-1">
                      <span className="font-mono text-[10px] font-bold text-amber-400 uppercase">The Challenge</span>
                      <p className="text-zinc-300 leading-relaxed">{study.challenge}</p>
                    </div>
                    <div className="bg-zinc-800/30 p-4 rounded-xl border border-zinc-800 space-y-1">
                      <span className="font-mono text-[10px] font-bold text-[#C5A880] uppercase">JSM Solution</span>
                      <p className="text-zinc-300 leading-relaxed">{study.solution}</p>
                    </div>
                    <div className="bg-zinc-800/30 p-4 rounded-xl border border-zinc-800 space-y-1">
                      <span className="font-mono text-[10px] font-bold text-emerald-400 uppercase">Operational Impact</span>
                      <p className="text-zinc-300 leading-relaxed">{study.impact}</p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
                    <span className="font-medium">
                      Sector: {study.sector}
                    </span>
                    <Link href="/contact">
                      <Button size="sm" className="bg-[#C5A880] hover:bg-[#b59870] text-zinc-950 font-bold rounded-xl px-5 text-xs shadow-md cursor-pointer">
                        <span>Schedule Assessment for Your Site</span>
                        <ArrowRight size={13} className="ml-1.5" />
                      </Button>
                    </Link>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Authentic Ground Operations Archive (2024 Landmark Trichy Airport Deployment) */}
        <div className="mt-20 max-w-5xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-800 pb-6 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold mb-2">
                <CheckCircle2 size={13} />
                <span>UNRETOUCHED ON-SITE PHOTOGRAPHIC ARCHIVE</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
                Authentic Ground Operations
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 font-medium mt-1">
                Real on-site field deployments executed by JSM personnel at Tiruchirappalli International Airport.
              </p>
            </div>
            <span className="text-xs font-mono text-[#C5A880] font-bold">
              EST. 2024 • TRICHY AIRPORT CONTRACT
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Photo 1: Drill Inspection */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden group hover:border-[#C5A880] transition-all">
              <div className="relative h-56 w-full">
                <Image
                  src="/images/real_jsm_airport_drill.jpg"
                  alt="JSM Guard Night Drill Inspection Trichy Airport"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-mono font-bold text-[#C5A880] border border-white/20">
                  NIGHT DRILL INSPECTION
                </span>
              </div>
              <div className="p-4 space-y-1">
                <h4 className="text-sm font-bold text-white">Airport Night Platoon Parade</h4>
                <p className="text-xs text-zinc-400">Supervisor turn-out inspection and shift roll call at the airport perimeter.</p>
              </div>
            </div>

            {/* Photo 2: Welcome to Tiruchirappalli Arch Salute */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden group hover:border-[#C5A880] transition-all">
              <div className="relative h-56 w-full">
                <Image
                  src="/images/real_jsm_welcome_trichy_salute.jpg"
                  alt="JSM Security Guard Salute Welcome to Tiruchirappalli"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-mono font-bold text-[#C5A880] border border-white/20">
                  REGIONAL GATEWAY
                </span>
              </div>
              <div className="p-4 space-y-1">
                <h4 className="text-sm font-bold text-white">Tiruchirappalli City Arch Salute</h4>
                <p className="text-xs text-zinc-400">Disciplined standing orders and vigilance under the iconic city gateway arch.</p>
              </div>
            </div>

            {/* Photo 3: Daytime Shift Muster */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden group hover:border-[#C5A880] transition-all">
              <div className="relative h-56 w-full">
                <Image
                  src="/images/real_jsm_shift_muster_day.jpg"
                  alt="Daytime Shift Muster and Operational Briefing"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-mono font-bold text-[#C5A880] border border-white/20">
                  SHIFT MUSTER ROLL
                </span>
              </div>
              <div className="p-4 space-y-1">
                <h4 className="text-sm font-bold text-white">Daytime Operational Briefing</h4>
                <p className="text-xs text-zinc-400">Post allocation and duty briefing at the airport security checkpoint.</p>
              </div>
            </div>

            {/* Photo 4: Terminal Entry Gate D6 */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden group hover:border-[#C5A880] transition-all">
              <div className="relative h-56 w-full">
                <Image
                  src="/images/real_jsm_terminal_entry_salute.jpg"
                  alt="JSM Guard Terminal Entry Gate D6 Salute"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-mono font-bold text-[#C5A880] border border-white/20">
                  TERMINAL GATE D6
                </span>
              </div>
              <div className="p-4 space-y-1">
                <h4 className="text-sm font-bold text-white">Passenger Terminal Entry</h4>
                <p className="text-xs text-zinc-400">Gate security, ticket verification, and passenger crowd facilitation.</p>
              </div>
            </div>

            {/* Photo 5: Night Guard Squad */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden group hover:border-[#C5A880] transition-all lg:col-span-2">
              <div className="relative h-56 w-full">
                <Image
                  src="/images/real_jsm_guard_squad_night.jpg"
                  alt="JSM Uniformed Night Squad Platoon"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-mono font-bold text-[#C5A880] border border-white/20">
                  UNIFORMED NIGHT SQUAD
                </span>
              </div>
              <div className="p-4 space-y-1">
                <h4 className="text-sm font-bold text-white">Night Security Platoon Lineup</h4>
                <p className="text-xs text-zinc-400">Complete night shift roster deployed with verified uniform turnout and supervisor spot-checks.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom RFP Callout */}
        <div className="mt-16 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 border-2 border-[#C5A880]/40 rounded-3xl p-8 sm:p-12 text-center max-w-5xl mx-auto space-y-5 shadow-2xl">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight uppercase">
            Have a Facility RFP or Tender in Tamil Nadu?
          </h3>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-xl mx-auto">
            Use our interactive RFP Bid Builder to configure your manpower, hygiene, and security requirements and receive a standardized commercial proposal within 2 hours.
          </p>
          <div className="pt-2">
            <Link href="/rfp-generator">
              <Button size="lg" className="bg-[#C5A880] hover:bg-[#b09268] text-zinc-950 font-black text-xs px-8 h-12 rounded-xl uppercase tracking-wider cursor-pointer shadow-lg">
                <span>Launch Enterprise RFP Builder</span>
                <ArrowRight size={14} className="ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
