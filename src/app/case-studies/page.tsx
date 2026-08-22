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
    <main className="min-h-screen bg-white text-zinc-800 pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-100 border border-zinc-200/80 text-zinc-800 text-xs font-bold">
            <Sparkles size={13} className="text-[#C5A880]" />
            <span>VERIFIED OPERATIONS HISTORY</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-black tracking-tight leading-tight">
            Case Studies & Track Record
          </h1>

          <p className="text-base md:text-lg text-zinc-600 font-medium max-w-2xl mx-auto leading-relaxed">
            We believe in complete truthfulness. We do not invent fictional case studies. Here is the verified operational story of our landmark launch assignment.
          </p>
        </div>

        {/* Landmark Case Study: Trichy Airport */}
        <div className="max-w-5xl mx-auto bg-zinc-900 text-white rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl mb-16">
          <div className="p-8 md:p-12 space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-6">
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C5A880] flex items-center gap-1.5">
                  <Plane size={14} /> Landmark Inaugural Project • 2024
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                  Trichy International Airport Operations Contract
                </h2>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold bg-zinc-800 px-3 py-1.5 rounded-full text-zinc-300">
                <MapPin size={13} className="text-[#C5A880]" />
                Tiruchirappalli, Tamil Nadu
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Challenge */}
              <div className="space-y-3 bg-zinc-800/60 p-6 rounded-2xl border border-zinc-700/60">
                <span className="text-xs font-black uppercase tracking-wider text-amber-400">01. The Challenge</span>
                <h3 className="text-lg font-bold text-white">High-Stakes Civil Aviation</h3>
                <p className="text-xs text-zinc-300 leading-relaxed font-medium">
                  Operating in an international aviation transit hub required uncompromised adherence to security screening protocols, zero tolerance for absenteeism, and smooth crowd management under heavy passenger traffic.
                </p>
              </div>

              {/* Approach */}
              <div className="space-y-3 bg-zinc-800/60 p-6 rounded-2xl border border-zinc-700/60">
                <span className="text-xs font-black uppercase tracking-wider text-[#C5A880]">02. The Approach</span>
                <h3 className="text-lg font-bold text-white">Structured SOP Deployment</h3>
                <p className="text-xs text-zinc-300 leading-relaxed font-medium">
                  We designed a site-specific operational SOP, conducted specialized 5-day induction briefings on passenger etiquette and gate discipline, and maintained supervisory rounds throughout all shift rotations.
                </p>
              </div>

              {/* Outcome */}
              <div className="space-y-3 bg-zinc-800/60 p-6 rounded-2xl border border-zinc-700/60">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-400">03. The Outcome</span>
                <h3 className="text-lg font-bold text-white">Flawless Operational Execution</h3>
                <p className="text-xs text-zinc-300 leading-relaxed font-medium">
                  Successfully completed the operations contract with uncompromised alertness, positive stakeholder feedback, and zero security lapses, establishing JSM's operational benchmark.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
              <span className="font-medium">
                Contract Scope: Passenger security screening assistance, terminal crowd management, and facility coordination.
              </span>
              <Button asChild size="sm" className="bg-white hover:bg-zinc-100 text-black font-bold rounded-full px-5 text-xs">
                <Link href="/contact">Schedule Assessment for Your Facility</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Building Our Track Record Framework */}
        <div className="max-w-4xl mx-auto bg-zinc-50 border border-zinc-200/80 rounded-3xl p-8 md:p-12 text-center space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center mx-auto font-black text-base">
            JSM
          </div>
          <div className="space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#C5A880]">
              Operational Transparency
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
              Building Our Track Record
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 max-w-xl mx-auto leading-relaxed font-medium">
              As we expand across commercial complexes, residential societies, hospitals, and industrial factories throughout Tamil Nadu, new verified case studies are documented shift by shift.
            </p>
          </div>

          <div className="pt-2">
            <Button asChild className="bg-black hover:bg-zinc-800 text-white rounded-full px-6 h-11 text-xs font-bold">
              <Link href="/contact">Partner with JSM for Your Facility</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
