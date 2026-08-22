import { brandData } from "@/data/brand";
import { breadcrumbSchema } from "@/lib/schema";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Plane, Building2, Sparkles, MapPin, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Case Studies & Operational Track Record | JSM Integrated Services",
  description: "Explore JSM's verified operational case studies, featuring our landmark inaugural 2024 contract at Trichy International Airport.",
};

export default function CaseStudiesPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: brandData.domain },
    { name: "Case Studies", url: `${brandData.domain}/case-studies` },
  ]);

  return (
    <main className="min-h-screen bg-white text-zinc-800 pt-28 pb-24 px-4 sm:px-6 md:px-12 lg:px-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-100 border border-zinc-200/80 text-zinc-800 text-xs font-mono font-bold">
            <Sparkles size={13} className="text-[#C5A880]" />
            <span>VERIFIED OPERATIONS HISTORY</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-black tracking-tight uppercase">
            Case Studies &amp; Track Record
          </h1>

          <p className="text-xs sm:text-sm text-zinc-600 font-normal max-w-xl mx-auto leading-relaxed">
            We believe in complete truthfulness. We do not invent fictional statistics. Here is the verified operational story of our landmark launch assignment.
          </p>
        </div>

        {/* Landmark Case Study: Trichy Airport with Real Visual Banner */}
        <div className="max-w-5xl mx-auto bg-[#0A1628] text-white rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl mb-16">
          {/* Visual Header Image */}
          <div className="relative h-64 sm:h-80 md:h-96 w-full">
            <Image
              src="/images/airport_operations.jpg"
              alt="2024 Trichy International Airport Operations Support"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-[#C5A880] flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full w-fit">
                  <Plane size={13} /> Landmark Launch Contract • 2024
                </span>
                <h2 className="text-xl sm:text-3xl md:text-4xl font-black text-white tracking-tight drop-shadow-md">
                  Trichy International Airport Operations
                </h2>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-full text-white border border-white/20">
                <MapPin size={13} className="text-[#C5A880]" />
                Tiruchirappalli, Tamil Nadu
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Challenge */}
              <div className="space-y-2.5 bg-white/5 p-6 rounded-2xl border border-white/10">
                <span className="text-[10px] font-mono font-black uppercase tracking-wider text-amber-400">01. The Challenge</span>
                <h3 className="text-base font-bold text-white">High-Stakes Civil Aviation</h3>
                <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                  Strict adherence to aviation screening protocols, zero tolerance for absenteeism, and smooth passenger flow under peak flight schedules.
                </p>
              </div>

              {/* Approach */}
              <div className="space-y-2.5 bg-white/5 p-6 rounded-2xl border border-white/10">
                <span className="text-[10px] font-mono font-black uppercase tracking-wider text-[#C5A880]">02. The Approach</span>
                <h3 className="text-base font-bold text-white">Structured SOP Deployment</h3>
                <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                  Site-specific SOPs, 5-day induction on passenger etiquette and gate discipline, with 24/7 supervisor rounds across all shifts.
                </p>
              </div>

              {/* Outcome */}
              <div className="space-y-2.5 bg-white/5 p-6 rounded-2xl border border-white/10">
                <span className="text-[10px] font-mono font-black uppercase tracking-wider text-emerald-400">03. The Outcome</span>
                <h3 className="text-base font-bold text-white">Zero Security Lapses</h3>
                <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                  Flawless contract execution with continuous alertness, positive stakeholder feedback, establishing JSM's operational benchmark.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
              <span className="font-medium">
                Scope: Passenger screening assistance, terminal crowd management, and facility coordination.
              </span>
              <Button asChild size="sm" className="bg-[#C5A880] hover:bg-[#b59870] text-black font-bold rounded-full px-5 text-xs shadow-md">
                <Link href="/contact">Schedule Assessment for Your Site</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
