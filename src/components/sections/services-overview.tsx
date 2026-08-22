"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Shield, Sparkles, Users, Banknote, Ticket, Building, Monitor, ArrowUpRight } from "lucide-react";

export function ServicesOverview() {
  const coreServices = [
    {
      slug: "private-security",
      title: "Private Security & Guarding",
      subtitle: "PSARA Act Compliant Protection",
      image: "/images/protective_guard.jpg",
      desc: "5-day trained guards, strict gate logging, and unannounced 2:00 AM supervisor spot-inspections.",
      icon: Shield,
      tag: "CORE OPERATIONS"
    },
    {
      slug: "housekeeping",
      title: "Commercial Housekeeping",
      subtitle: "5-Step Closed-Loop Hygiene",
      image: "/images/housekeeping_hygiene.jpg",
      desc: "Daily protocol: Clean → Inspect → Report → Correct → Verify for immaculate corporate spaces.",
      icon: Sparkles,
      tag: "FACILITY CARE"
    },
    {
      slug: "manpower",
      title: "Contractual Manpower",
      subtitle: "Vetted Industrial Staffing",
      image: "/images/industrial_workforce.jpg",
      desc: "Originating from JSMMANPOWER roots. Vetted workforce deployed for factories and logistics.",
      icon: Users,
      tag: "WORKFORCE"
    }
  ];

  const expansionServices = [
    { title: "Cash-in-Transit", href: "/services/cash-in-transit", icon: Banknote },
    { title: "Event Coordination", href: "/services/event-support", icon: Ticket },
    { title: "Real Estate Support", href: "/services/real-estate-support", icon: Building },
    { title: "Visitor Software", href: "/services/software-solutions", icon: Monitor },
  ];

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto bg-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-zinc-200/80">
        <div className="space-y-2">
          <span className="text-[11px] font-mono font-bold tracking-widest text-[#C5A880] uppercase">
            VISUAL SERVICE CATALOG
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-black tracking-tight uppercase">
            What We Do.
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-zinc-500 font-normal max-w-sm">
          Disciplined security, facility hygiene, and contractual workforce under one accountable partner.
        </p>
      </div>

      {/* 3 Visual Image-First Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {coreServices.map((srv) => {
          const Icon = srv.icon;
          return (
            <div
              key={srv.slug}
              className="bg-[#fbf9f4] border border-zinc-200/80 rounded-3xl overflow-hidden flex flex-col justify-between hover:border-black hover:shadow-xl transition-all duration-300 group"
            >
              {/* Responsive Visual Header */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-zinc-100">
                <Image
                  src={srv.image}
                  alt={srv.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="text-[9px] font-mono font-bold text-black bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full uppercase shadow-xs">
                    {srv.tag}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-[#C5A880] text-black">
                      <Icon size={14} />
                    </div>
                    <span className="text-xs font-bold text-white drop-shadow-sm">{srv.subtitle}</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-lg font-black text-black tracking-tight">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-zinc-600 font-normal leading-relaxed">
                    {srv.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-200/60 flex items-center justify-between">
                  <Link
                    href={`/services/${srv.slug}`}
                    className="text-xs font-bold text-black group-hover:text-[#C5A880] flex items-center gap-1 transition-colors"
                  >
                    <span>View Service SOP</span>
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/contact"
                    className="text-[11px] font-bold text-zinc-500 hover:text-black"
                  >
                    Get Quote →
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Integrated Expansion Strip */}
      <div className="bg-zinc-50 border border-zinc-200/80 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-0.5 text-center sm:text-left">
          <h4 className="text-xs font-bold text-black uppercase tracking-wider">
            Need Specialized Support?
          </h4>
          <p className="text-[11px] text-zinc-500">
            Cash escorts, event coordination, real estate support, and gate software.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {expansionServices.map((exp) => (
            <Link
              key={exp.title}
              href={exp.href}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-800 text-[11px] font-bold shadow-2xs hover:border-black transition-colors"
            >
              <span>{exp.title}</span>
              <ArrowUpRight size={11} className="text-[#C5A880]" />
            </Link>
          ))}
          <Link
            href="/services"
            className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-black text-white text-[11px] font-bold hover:bg-zinc-800 transition-colors"
          >
            All 8 Verticals →
          </Link>
        </div>
      </div>
    </section>
  );
}
