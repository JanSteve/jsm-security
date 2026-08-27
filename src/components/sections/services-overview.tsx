"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Shield, Sparkles, Users } from "lucide-react";
import { TiltCard } from "@/components/3d/tilt-card";

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
    <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto bg-white border-t border-zinc-200/80">
      <div className="flex items-center justify-between mb-10 pb-4 border-b border-zinc-200/80">
        <div>
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#C5A880] uppercase block">
            CORE DISCIPLINES
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-black tracking-tight uppercase mt-0.5">
            What We Deliver.
          </h2>
        </div>
        <Link
          href="/services"
          className="text-xs font-bold text-black hover:text-[#C5A880] flex items-center gap-1.5 px-4 py-2 rounded-full border border-zinc-200/90 hover:border-[#C5A880] hover:shadow-[0_0_20px_rgba(197,168,128,0.3)] bg-[#fbf9f4] transition-all duration-300 group"
        >
          <span>All 8 Verticals</span>
          <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform text-[#C5A880]" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {coreServices.map((srv) => {
          const Icon = srv.icon;
          return (
            <TiltCard
              key={srv.slug}
              maxTilt={8}
              className="bg-[#fbf9f4] border border-zinc-200/90 rounded-3xl overflow-hidden flex flex-col hover:border-[#C5A880] transition-all duration-300 group p-0"
            >
              <Link
                href={`/services/${srv.slug}`}
                className="flex flex-col h-full"
              >
                <div className="relative h-60 sm:h-64 w-full overflow-hidden">
                  <Image
                    src={srv.image}
                    alt={srv.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="text-[9px] font-mono font-black text-black bg-white/95 px-3 py-1 rounded-full uppercase shadow-xs border border-zinc-100">
                      {srv.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-[#C5A880] text-black shadow-xs">
                        <Icon size={15} />
                      </div>
                      <h3 className="text-lg font-black text-white tracking-tight">{srv.title}</h3>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs sm:text-sm text-zinc-600 font-medium leading-relaxed">
                    {srv.highlight}
                  </p>
                  <div className="pt-3 border-t border-zinc-200/80 flex items-center justify-between text-xs font-bold text-black group-hover:text-[#C5A880] transition-colors">
                    <span>Explore Operational SOP</span>
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
