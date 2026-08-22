"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Shield, Sparkles, Users } from "lucide-react";

export function ServicesOverview() {
  const coreServices = [
    {
      slug: "private-security",
      title: "Private Security",
      badge: "PSARA 2005",
      image: "/images/protective_guard.jpg",
      highlight: "5-day trained guards, 2:00 AM night spot-inspections, 2-hr replacement SLA.",
      icon: Shield,
    },
    {
      slug: "housekeeping",
      title: "Commercial Housekeeping",
      badge: "5-STEP PROTOCOL",
      image: "/images/housekeeping_hygiene.jpg",
      highlight: "Clean → Inspect → Report → Correct → Verify for pristine corporate facilities.",
      icon: Sparkles,
    },
    {
      slug: "manpower",
      title: "Contractual Manpower",
      badge: "JSMMANPOWER",
      image: "/images/industrial_workforce.jpg",
      highlight: "Vetted skilled and industrial workforce deployed for factories and logistics.",
      icon: Users,
    }
  ];

  return (
    <section className="py-14 md:py-20 px-4 sm:px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto bg-white border-t border-zinc-200/80">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-200/80">
        <div>
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#C5A880] uppercase block">
            CORE DISCIPLINES
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-black tracking-tight uppercase">
            What We Deliver.
          </h2>
        </div>
        <Link
          href="/services"
          className="text-xs font-bold text-black hover:text-[#C5A880] flex items-center gap-1 transition-colors"
        >
          <span>All 8 Verticals</span>
          <ArrowRight size={13} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {coreServices.map((srv) => {
          const Icon = srv.icon;
          return (
            <Link
              key={srv.slug}
              href={`/services/${srv.slug}`}
              className="bg-[#fbf9f4] border border-zinc-200/80 rounded-3xl overflow-hidden flex flex-col hover:border-black hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="relative h-56 sm:h-64 w-full overflow-hidden">
                <Image
                  src={srv.image}
                  alt={srv.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="text-[9px] font-mono font-black text-black bg-white/95 px-2.5 py-1 rounded-full uppercase shadow-xs">
                    {srv.badge}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-[#C5A880] text-black">
                      <Icon size={14} />
                    </div>
                    <h3 className="text-base font-black text-white">{srv.title}</h3>
                  </div>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <p className="text-xs text-zinc-600 font-medium leading-relaxed">
                  {srv.highlight}
                </p>
                <div className="pt-2 border-t border-zinc-200/60 flex items-center justify-between text-xs font-bold text-black group-hover:text-[#C5A880]">
                  <span>Explore SOP</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
