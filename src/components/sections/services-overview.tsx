"use client";

import Link from "next/link";
import { ArrowRight, Shield, Sparkles, Users, Banknote, Ticket, Building, Monitor, ArrowUpRight } from "lucide-react";

export function ServicesOverview() {
  const coreServices = [
    {
      slug: "private-security",
      title: "Private Security & Guarding",
      subtitle: "PSARA Compliant On-Site Protection",
      desc: "Uniformed, verified security personnel deployed with strict post orders, gate management, and unannounced 2:00 AM supervisor spot-inspections.",
      bestFor: "IT Parks, Factories, Residential RWAs, Warehouses",
      icon: Shield,
      tag: "CORE OPERATIONS"
    },
    {
      slug: "housekeeping",
      title: "Commercial Housekeeping & Hygiene",
      subtitle: "5-Step Closed-Loop Facility Care",
      desc: "Structured daily hygiene protocol: Clean → Inspect → Report → Correct → Verify. Restrooms, work floors, and public lobbies kept immaculate.",
      bestFor: "Corporate Offices, Hospitals, Educational Campuses",
      icon: Sparkles,
      tag: "FACILITY UPKEEP"
    },
    {
      slug: "manpower",
      title: "Contractual Manpower & Staffing",
      subtitle: "Vetted Workforce On Demand",
      desc: "Originating from our JSMMANPOWER roots. We supply compliant, background-verified industrial workers, loaders, and administrative support.",
      bestFor: "Manufacturing Plants, Logistics Hubs, Retail",
      icon: Users,
      tag: "WORKFORCE"
    }
  ];

  const expansionServices = [
    { title: "Cash-in-Transit Logistics", href: "/services/cash-in-transit", icon: Banknote },
    { title: "Event & Wedding Coordination", href: "/services/event-support", icon: Ticket },
    { title: "Real Estate & Auction Support", href: "/services/real-estate-support", icon: Building },
    { title: "Visitor Software Solutions", href: "/services/software-solutions", icon: Monitor },
  ];

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto bg-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 pb-6 border-b border-zinc-200/80">
        <div className="space-y-3">
          <span className="text-[11px] md:text-[12px] font-extrabold uppercase tracking-[0.15em] text-[#C5A880]">
            SERVICE ARCHITECTURE
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black tracking-tight leading-tight uppercase">
            What We Do.
          </h2>
        </div>
        <p className="text-sm sm:text-base text-zinc-600 font-normal max-w-md">
          Three core operational disciplines coordinated under one single point of accountability.
        </p>
      </div>

      {/* 3 Core Services Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10">
        {coreServices.map((srv) => {
          const Icon = srv.icon;
          return (
            <div
              key={srv.slug}
              className="bg-[#fbf9f4] border border-zinc-200/80 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-black hover:shadow-xl hover:bg-white transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center text-black group-hover:bg-[#C5A880] transition-colors shadow-xs">
                    <Icon size={22} />
                  </div>
                  <span className="text-[9px] font-mono font-bold text-zinc-500 bg-zinc-100 px-2.5 py-1 rounded-md uppercase">
                    {srv.tag}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-black text-black tracking-tight">
                    {srv.title}
                  </h3>
                  <p className="text-xs font-bold text-[#C5A880]">
                    {srv.subtitle}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-zinc-600 font-normal leading-relaxed">
                  {srv.desc}
                </p>

                <div className="pt-2">
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-400">
                    Ideal For:
                  </p>
                  <p className="text-xs font-semibold text-zinc-700 mt-0.5">
                    {srv.bestFor}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-zinc-200/70 mt-6 flex items-center justify-between">
                <Link
                  href={`/services/${srv.slug}`}
                  className="text-xs font-bold text-black group-hover:text-[#C5A880] flex items-center gap-1 transition-colors"
                >
                  <span>Explore Service SOP</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="text-[11px] font-bold text-zinc-500 hover:text-black"
                >
                  Get Quote →
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Integrated Expansion Strip */}
      <div className="bg-zinc-50 border border-zinc-200/80 rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center lg:text-left">
          <h4 className="text-sm font-black text-black uppercase tracking-wider">
            Need Specialized Support?
          </h4>
          <p className="text-xs text-zinc-500 font-medium">
            We also handle cash escort logistics, high-profile event coordination, auction site security, and custom visitor gate software.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {expansionServices.map((exp) => (
            <Link
              key={exp.title}
              href={exp.href}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white hover:bg-zinc-100 border border-zinc-200/80 text-zinc-800 text-xs font-bold shadow-2xs hover:border-black transition-colors"
            >
              <span>{exp.title}</span>
              <ArrowUpRight size={12} className="text-[#C5A880]" />
            </Link>
          ))}
          <Link
            href="/services"
            className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-black text-white text-xs font-bold hover:bg-zinc-800 transition-colors"
          >
            All 8 Verticals →
          </Link>
        </div>
      </div>
    </section>
  );
}
