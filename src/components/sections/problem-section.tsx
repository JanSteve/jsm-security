"use client";

import { Shield, Sparkles, Users, ArrowRight, XCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export function ProblemSection() {
  const ecosystemCards = [
    {
      number: "01",
      title: "Security Solutions",
      description: "Asset protection, gate access control, night perimeter patrols, and PSARA-compliant guarding built on disciplined protocols.",
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
      description: "Vetted, trained, and reliable contractual workforce deployed across industrial, warehouse, and administrative posts.",
      icon: Users,
      href: "/services/manpower"
    }
  ];

  return (
    <section className="bg-white px-4 sm:px-6 md:px-12 lg:px-20 py-20 md:py-28 border-y border-zinc-200/80">
      <div className="max-w-[1440px] mx-auto space-y-16">
        {/* Main Statement */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-start-2 md:col-span-10 lg:col-start-3 lg:col-span-8 text-center space-y-4">
            <span className="text-[11px] md:text-[12px] font-extrabold tracking-[0.15em] text-[#C5A880] uppercase">
              THE CONVERGED ADVANTAGE
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black tracking-tight leading-tight">
              Your operation shouldn't depend on five different vendors.
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-zinc-600 max-w-2xl mx-auto font-normal leading-relaxed">
              When security, housekeeping, and labor come from separate agencies, coordination breaks down. JSM brings your core facility operations under one accountable partner.
            </p>
          </div>
        </div>

        {/* 3 Core Capability Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {ecosystemCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.number}
                href={card.href}
                className="bg-[#fbf9f4] p-6 sm:p-8 md:p-10 border border-zinc-200/80 rounded-3xl hover:shadow-xl hover:border-black hover:bg-white transition-all duration-300 relative group overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="text-2xl font-black text-[#C5A880] mb-4 font-mono">
                    {card.number}
                  </div>
                  <h3 className="text-base sm:text-lg font-black tracking-tight text-black mb-3">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 font-medium leading-relaxed mb-6">
                    {card.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-zinc-200/60">
                  <span className="text-xs font-bold text-black group-hover:underline flex items-center gap-1">
                    Explore Details <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                  <Icon size={24} className="text-zinc-400 group-hover:text-black transition-colors" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Comparison Box: Fragmented Vendors vs. JSM Single Partner */}
        <div className="bg-[#0A1628] text-white rounded-3xl p-6 sm:p-10 md:p-12 border border-zinc-800 shadow-2xl">
          <div className="max-w-3xl mb-8 space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C5A880]">
              OPERATIONAL COMPARISON
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Why serious businesses switch to JSM.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* The Fragmented Model */}
            <div className="space-y-4 bg-white/5 p-6 rounded-2xl border border-white/10">
              <h4 className="text-sm font-bold text-red-400 uppercase tracking-wider flex items-center gap-2">
                <XCircle size={18} /> Managing 5 Disconnected Vendors
              </h4>
              <ul className="text-xs text-zinc-300 space-y-3 leading-relaxed">
                <li className="flex items-start gap-2">• Multiple contracts, endless follow-ups, and separate billing cycles.</li>
                <li className="flex items-start gap-2">• Guard agency blames cleaning crew for open doors; cleaners blame guards for delayed access.</li>
                <li className="flex items-start gap-2">• Inconsistent training standards, grooming lapses, and unverified relief guards.</li>
              </ul>
            </div>

            {/* The JSM Model */}
            <div className="space-y-4 bg-white/10 p-6 rounded-2xl border border-[#C5A880]/40">
              <h4 className="text-sm font-bold text-[#C5A880] uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 size={18} /> The JSM Integrated Solution
              </h4>
              <ul className="text-xs text-zinc-200 space-y-3 leading-relaxed font-medium">
                <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-[#C5A880] flex-shrink-0 mt-0.5" /> <strong>One Accountable Point of Contact</strong> managing your entire on-site workforce.</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-[#C5A880] flex-shrink-0 mt-0.5" /> <strong>Synchronized SOPs &amp; Checklists</strong> across security gates, lobby hygiene, and facility upkeep.</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={14} className="text-[#C5A880] flex-shrink-0 mt-0.5" /> <strong>Guaranteed 2-Hour Replacement SLA</strong> and transparent monthly digital audit reports.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
