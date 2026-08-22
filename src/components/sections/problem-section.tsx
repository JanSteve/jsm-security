"use client";

import { Shield, Sparkles, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

export function ProblemSection() {
  const ecosystemCards = [
    {
      number: "01",
      title: "Security Solutions",
      description: "Asset protection, gate access control, night perimeter patrols, and threat mitigation built on disciplined protocols.",
      icon: Shield,
      href: "/services/private-security"
    },
    {
      number: "02",
      title: "Facility Management",
      description: "Immaculate commercial environments maintained through rigorous 5-step housekeeping cycles and preventative care.",
      icon: Sparkles,
      href: "/services/housekeeping"
    },
    {
      number: "03",
      title: "Manpower Support",
      description: "Vetted, trained, and highly reliable contractual workforce deployed precisely where your operation needs them.",
      icon: Users,
      href: "/services/manpower"
    }
  ];

  return (
    <section className="bg-white px-5 md:px-20 py-24 md:py-32 border-y border-zinc-200/80">
      <div className="max-w-[1440px] mx-auto">
        {/* Main Statement */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20">
          <div className="md:col-start-3 md:col-span-8 text-center space-y-5">
            <span className="text-[11px] md:text-[12px] font-bold tracking-[0.1em] text-[#C5A880] uppercase">
              THE CONVERGED ADVANTAGE
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black tracking-tight leading-tight">
              Your operation shouldn't depend on five different vendors.
            </h2>
            <p className="text-base sm:text-lg text-zinc-600 max-w-3xl mx-auto font-normal leading-relaxed">
              We converge Security, Housekeeping, and Manpower into a single, cohesive operating system. JSM eliminates multi-vendor friction, ensuring absolute operational control.
            </p>
          </div>
        </div>

        {/* 3 Ecosystem Cards from Stitch */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {ecosystemCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.number}
                href={card.href}
                className="bg-white p-8 md:p-10 border border-zinc-200/80 rounded-2xl hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] hover:border-black transition-all duration-300 relative group overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="text-xl font-bold text-[#C5A880] mb-4 font-mono">
                    {card.number}
                  </div>
                  <h3 className="text-xs md:text-sm font-bold tracking-[0.1em] text-black mb-4 uppercase">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 font-normal leading-relaxed mb-8">
                    {card.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                  <span className="text-xs font-bold text-black group-hover:underline flex items-center gap-1">
                    Explore Details <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                  <Icon size={28} className="text-zinc-300 group-hover:text-black transition-colors" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
