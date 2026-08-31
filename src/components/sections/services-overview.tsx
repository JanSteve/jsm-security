"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Shield, Sparkles, Users, FileText, Monitor, UserCheck, CheckCircle2 } from "lucide-react";
import { TiltCard } from "@/components/3d/tilt-card";

export function ServicesOverview() {
  const sixCoreVerticals = [
    {
      code: "JSM-01",
      slug: "private-security",
      title: "Security & Protection Services",
      shortTitle: "Security & Protection",
      badge: "SAC 998525 • CORE",
      workforce: "Ex-Servicemen (ESM) & Pvt Supervisors & Guards (Male & Female)",
      image: "/images/protective_guard.jpg",
      highlight: "Security guarding, industrial security, access control, 2:00 AM supervisor van audits, and 2-Hr relief SLA.",
      icon: Shield,
    },
    {
      code: "JSM-02",
      slug: "manpower",
      title: "Manpower & Workforce Solutions",
      shortTitle: "Manpower & Staffing",
      badge: "SAC 998513 • CORE",
      workforce: "Ex-Servicemen (ESM) & Pvt Supervisors & Workforce (Male & Female)",
      image: "/images/industrial_workforce.jpg",
      highlight: "Contract staffing, factory line workforce, skilled technical trades, with 100% EPF/ESIC legal indemnity.",
      icon: Users,
    },
    {
      code: "JSM-03",
      slug: "housekeeping",
      title: "Facility Management & Housekeeping",
      shortTitle: "Facility Management",
      badge: "SAC 998533 • CORE",
      workforce: "Private (Pvt) Male & Female Facility Marshals",
      image: "/images/housekeeping_hygiene.jpg",
      highlight: "Mechanized ride-on auto scrubbers, 5-step closed-loop hygiene protocol, and deep corporate sanitization.",
      icon: Sparkles,
    },
    {
      code: "JSM-04",
      slug: "tender-procurement-supply",
      title: "Tender, Procurement & Business Support",
      shortTitle: "Tender & Procurement",
      badge: "GeM & PSU • CORE",
      workforce: "Tender Management & Commercial Contracts Team",
      image: "/images/hero_operations.jpg",
      highlight: "End-to-end tender lifecycle, GeM Seller bidding, Government & PSU supply, and procurement administration.",
      icon: FileText,
    },
    {
      code: "JSM-05",
      slug: "scanning-digitalization-it",
      title: "Scanning, Digitalization & IT Services",
      shortTitle: "Scanning & IT",
      badge: "NIC 62099 • CORE",
      workforce: "Digital Operations & Technical Specialists",
      image: "/images/portal_laptop.jpg",
      highlight: "Bulk document scanning (JSM-05.2), OCR indexing (JSM-05.3), digital archiving (JSM-05.6), and IT network support.",
      icon: Monitor,
    },
    {
      code: "JSM-06",
      slug: "csc-digital-citizen-services",
      title: "CSC & Digital Citizen Services",
      shortTitle: "CSC & Citizen Services",
      badge: "e-Governance • CORE",
      workforce: "Authorized CSC & Digital Facilitation Officers",
      image: "/images/facility_lobby.jpg",
      highlight: "Online government portal applications (JSM-06.1), digital form filling, certificate downloads, and citizen facilitation.",
      icon: UserCheck,
    }
  ];

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto bg-white border-t border-zinc-200/80">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-6 border-b border-zinc-200/80 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/20 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#C5A880] animate-pulse" />
            <span className="text-[10px] font-mono font-black tracking-widest text-[#C5A880] uppercase">
              MASTER BUSINESS ARCHITECTURE
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-black tracking-tight uppercase mt-1">
            Six Core Verticals.
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 font-medium mt-1">
            Structured under official Udyam MSME and GST SAC classifications for Tamil Nadu &amp; Pan-India operations.
          </p>
        </div>
        <Link
          href="/services"
          className="text-xs font-black text-black hover:text-[#C5A880] flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-zinc-300 hover:border-[#C5A880] hover:shadow-[0_0_25px_rgba(197,168,128,0.35)] bg-[#fbf9f4] transition-all duration-300 group shrink-0"
        >
          <span>Explore All 6 Master Verticals</span>
          <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform text-[#C5A880]" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {sixCoreVerticals.map((srv) => {
          const Icon = srv.icon;
          return (
            <TiltCard
              key={srv.code}
              maxTilt={6}
              className="bg-[#fbf9f4] border border-zinc-200/90 rounded-3xl overflow-hidden flex flex-col hover:border-[#C5A880] transition-all duration-300 group p-0 shadow-xs hover:shadow-xl"
            >
              <Link
                href={`/services/${srv.slug}`}
                className="flex flex-col h-full"
              >
                <div className="relative h-52 sm:h-56 w-full overflow-hidden">
                  <Image
                    src={srv.image}
                    alt={srv.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
                  
                  {/* Top Badge & Code */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                    <span className="text-[10px] font-mono font-black text-white bg-black/80 backdrop-blur-md px-3 py-1 rounded-full uppercase border border-white/20">
                      {srv.code}
                    </span>
                    <span className="text-[9px] font-mono font-black text-black bg-[#C5A880] px-2.5 py-0.5 rounded-full uppercase shadow-xs">
                      {srv.badge}
                    </span>
                  </div>

                  {/* Bottom Title on Image */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-[#C5A880] text-black shadow-xs shrink-0">
                        <Icon size={16} />
                      </div>
                      <h3 className="text-base sm:text-lg font-black text-white tracking-tight leading-snug">
                        {srv.title}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="p-2.5 rounded-xl bg-white border border-zinc-200/80">
                      <span className="text-[9px] font-mono font-bold text-[#C5A880] uppercase block">
                        Workforce Composition
                      </span>
                      <p className="text-[11px] font-extrabold text-zinc-900 leading-snug mt-0.5">
                        {srv.workforce}
                      </p>
                    </div>
                    <p className="text-xs text-zinc-600 font-medium leading-relaxed pt-1">
                      {srv.highlight}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-zinc-200/80 flex items-center justify-between text-xs font-black text-black group-hover:text-[#C5A880] transition-colors">
                    <span>View Full Vertical SOP</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-[#C5A880]" />
                  </div>
                </div>
              </Link>
            </TiltCard>
          );
        })}
      </div>
    </section>
  );
}
