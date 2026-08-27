import { brandData } from "@/data/brand";
import { breadcrumbSchema } from "@/lib/schema";
import { ComplianceMatrix } from "@/components/sections/compliance-matrix";
import Link from "next/link";
import { ArrowRight, ShieldCheck, CheckCircle2, FileText, BadgeCheck, Clock, UserCheck, Award, Plane, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Trust Center & Compliance | Architecture of Accountability",
  description: "Explore JSM's uncompromising verification standards, PSARA Act compliance, 5-day induction training, and 24/7 surprise night audits.",
};

export default function TrustCenterPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: brandData.domain },
    { name: "Trust Center", url: `${brandData.domain}/trust-center` },
  ]);

  return (
    <main className="bg-[#fbf9f4] text-zinc-900 min-h-screen pt-28 pb-24 selection:bg-[#ffdea5] selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
        {/* Hero Section */}
        <section className="py-14 sm:py-20 md:py-24 border-b border-zinc-200/80 relative">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-9 relative z-10 space-y-5">
              <span className="text-[11px] md:text-[12px] font-extrabold tracking-[0.16em] text-[#C5A880] uppercase block font-mono">
                GOVERNANCE &amp; ACCOUNTABILITY
              </span>
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-black tracking-[-0.03em] leading-[1.05] uppercase">
                Architecture of<br />
                <span className="text-zinc-900">Accountability.</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-zinc-600 max-w-2xl font-normal leading-relaxed">
                Absolute control and transparency. Our Trust Center details the uncompromising verification, PSARA licensing, rigorous training, and continuous auditing protocols that define the JSM standard.
              </p>
            </div>
          </div>
        </section>

        {/* Section 01: Multi-Stage Staff Verification */}
        <section className="py-16 md:py-24 border-b border-zinc-200/80">
          <div className="flex items-center gap-4 mb-12">
            <span className="text-base font-black text-black bg-[#C5A880] w-10 h-10 flex items-center justify-center rounded-full font-mono">
              01
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-black tracking-tight">
              Multi-Stage Staff Verification
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Stage 1 */}
            <div className="md:col-span-4 bg-white/95 backdrop-blur-md p-6 sm:p-8 border border-zinc-200/80 rounded-3xl hover:border-[#C5A880]/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-4">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#C5A880] uppercase">STAGE ONE</span>
              <h3 className="text-lg sm:text-xl font-black text-black">Identity &amp; Background Check</h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                100% Aadhaar verification, national database screening, permanent address cross-verification, and local police verification before induction.
              </p>
            </div>

            {/* Stage 2 */}
            <div className="md:col-span-8 bg-[#0A1628] text-white p-6 sm:p-8 rounded-3xl border-b-4 border-[#C5A880] space-y-4 shadow-xl hover:-translate-y-1 transition-all duration-300">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#C5A880] uppercase">STAGE TWO</span>
              <h3 className="text-xl sm:text-2xl font-black text-white">Psychometric &amp; Situational Profiling</h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal max-w-2xl">
                Proprietary behavioral assessments measuring situational judgment, de-escalation composure, and integrity under simulated operational stress.
              </p>
            </div>

            {/* Stage 3 */}
            <div className="md:col-span-6 bg-white/95 backdrop-blur-md p-6 sm:p-8 border border-zinc-200/80 rounded-3xl hover:border-[#C5A880]/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-4">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#C5A880] uppercase">STAGE THREE</span>
              <h3 className="text-lg sm:text-xl font-black text-black">5-Day Mandatory Induction</h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                Rigorous training covering gate-pass vigilance, visitor management, fire safety drills, crowd protocols, and emergency escalation hierarchy.
              </p>
            </div>

            {/* Stage 4 */}
            <div className="md:col-span-6 bg-white/95 backdrop-blur-md p-6 sm:p-8 border border-zinc-200/80 rounded-3xl hover:border-[#C5A880]/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-4">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#C5A880] uppercase">STAGE FOUR</span>
              <h3 className="text-lg sm:text-xl font-black text-black">Continuous Surprise Audits</h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                Unannounced 2:00 AM supervisor spot-inspections, digital biometric logs, and monthly client satisfaction SLA reviews.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: Operational SLA & Benchmark Matrix */}
        <section className="py-16 md:py-24 border-b border-zinc-200/80">
          <div className="flex items-center gap-4 mb-12">
            <span className="text-base font-black text-black bg-[#C5A880] w-10 h-10 flex items-center justify-center rounded-full font-mono">
              02
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-black tracking-tight">
              Operational SLA Commitments
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 sm:p-8 bg-white/95 backdrop-blur-md border border-zinc-200/80 rounded-3xl hover:border-[#C5A880]/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <Clock className="text-[#C5A880]" size={24} />
                <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-full uppercase">GUARANTEED</span>
              </div>
              <h4 className="text-lg font-black text-black">2-Hour Personnel Replacement</h4>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                If any deployed personnel is absent or unfit, our roving reserve operations team replaces the post within 120 minutes guaranteed.
              </p>
            </div>

            <div className="p-6 sm:p-8 bg-white/95 backdrop-blur-md border border-zinc-200/80 rounded-3xl hover:border-[#C5A880]/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <Plane className="text-[#C5A880]" size={24} />
                <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-full uppercase">PROVEN TRACK RECORD</span>
              </div>
              <h4 className="text-lg font-black text-black">2024 Trichy Airport Benchmark</h4>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                Inaugural operational contract executed at Trichy International Airport. Zero security breaches, establishing our operating benchmark.
              </p>
            </div>

            <div className="p-6 sm:p-8 bg-white/95 backdrop-blur-md border border-zinc-200/80 rounded-3xl hover:border-[#C5A880]/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <Award className="text-[#C5A880]" size={24} />
                <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-full uppercase">MONTHLY REPORT</span>
              </div>
              <h4 className="text-lg font-black text-black">Transparent Digital Reporting</h4>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                Monthly incident logs, post duty registers, and executive risk summaries delivered straight to your portal and inbox.
              </p>
            </div>
          </div>
        </section>

        {/* Section 03: Interactive Compliance Matrix */}
        <div className="rounded-3xl overflow-hidden my-12">
          <ComplianceMatrix />
        </div>

        {/* CTA Section */}
        <section className="py-16 text-center space-y-5">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-black tracking-tight">Need a Governance Audit for Your Facility?</h3>
          <p className="text-xs sm:text-sm text-zinc-600 max-w-xl mx-auto font-normal">
            Request an on-site physical security and hygiene compliance audit by our operations team.
          </p>
          <div className="pt-2">
            <Button asChild size="lg" className="bg-black hover:bg-zinc-800 text-white font-bold text-xs px-8 h-12 rounded-full border-b-2 border-[#C5A880] shadow-md hover:-translate-y-0.5 transition-all uppercase cursor-pointer">
              <Link href="/contact">
                REQUEST A COMPLIANCE AUDIT <ArrowRight size={14} className="ml-1.5 text-[#C5A880]" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
