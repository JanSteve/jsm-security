import { industriesData } from "@/data/industries";
import { brandData } from "@/data/brand";
import { breadcrumbSchema } from "@/lib/schema";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Building2, Home, Factory, Warehouse, ShoppingBag, Hospital, GraduationCap, Landmark, PartyPopper, HardHat, Gavel, Briefcase, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, React.ElementType> = {
  Home,
  Building2,
  Factory,
  Warehouse,
  ShoppingBag,
  Hospital,
  GraduationCap,
  Landmark,
  PartyPopper,
  HardHat,
  Gavel,
  Briefcase
};

export const metadata = {
  title: "Industries We Serve | Tailored Security, Housekeeping & Staffing",
  description: "Specialized integrated operations for 12 key sectors: Residential Societies, Corporate Offices, Factories, Warehouses, Hospitals, Schools, and Real Estate in Tamil Nadu.",
};

export default function IndustriesHubPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: brandData.domain },
    { name: "Industries", url: `${brandData.domain}/industries` },
  ]);

  return (
    <main className="min-h-screen bg-white text-zinc-800 pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-100 border border-zinc-200/80 text-zinc-800 text-xs font-bold">
            <Sparkles size={13} className="text-[#C5A880]" />
            <span>SECTOR EXPERTISE</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-black tracking-tight leading-tight">
            Tailored Operations for Every Industry.
          </h1>

          <p className="text-base md:text-lg text-zinc-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Every environment carries unique vulnerabilities and operational workflows. Explore our tailored blueprints across 12 commercial and institutional sectors.
          </p>
        </div>

        {/* 12-Industry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {industriesData.map((ind) => {
            const Icon = iconMap[ind.icon] || Building2;
            return (
              <div
                key={ind.slug}
                className="bg-zinc-50 border border-zinc-200/80 rounded-3xl p-8 flex flex-col justify-between hover:border-black hover:bg-white hover:shadow-xl transition-all duration-300 group shadow-sm"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center text-black group-hover:bg-[#C5A880] group-hover:text-black transition-colors shadow-sm">
                    <Icon size={22} />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-black group-hover:text-black leading-snug">
                      {ind.title}
                    </h2>
                    <p className="text-xs font-semibold text-[#C5A880] mt-1">
                      {ind.tagline}
                    </p>
                  </div>

                  <p className="text-xs text-zinc-600 leading-relaxed font-medium">
                    {ind.summary}
                  </p>

                  <div className="space-y-2 pt-3 border-t border-zinc-200/60">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                      Key Capabilities:
                    </p>
                    {ind.keyBenefits.map((ben, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-1.5 text-xs text-zinc-700 font-medium">
                        <CheckCircle2 size={13} className="text-[#C5A880] flex-shrink-0 mt-0.5" />
                        <span>{ben}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-zinc-200/60 flex items-center justify-between">
                  <Link
                    href={`/industries/${ind.slug}`}
                    className="text-xs font-bold text-black hover:underline flex items-center gap-1"
                  >
                    View Industry Blueprint <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href="/contact"
                    className="text-[11px] font-bold text-zinc-500 hover:text-black"
                  >
                    Get Assessment →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
