import { brandData } from "@/data/brand";
import { breadcrumbSchema } from "@/lib/schema";
import Link from "next/link";
import { ArrowRight, ShieldCheck, CheckCircle2, FileText, BadgeCheck, Clock, UserCheck, ShieldAlert, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Trust Center & Compliance | Architecture of Accountability",
  description: "Explore JSM's uncompromising verification standards, 5-day induction training curriculum, and 24/7 surprise night audits.",
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

      <div className="max-w-[1440px] mx-auto px-5 md:px-20">
        {/* Hero Section matching Stitch */}
        <section className="py-16 md:py-24 border-b border-zinc-200/80 relative">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-8 relative z-10 space-y-6">
              <span className="text-[11px] md:text-[12px] font-bold tracking-[0.1em] text-[#C5A880] uppercase block">
                GOVERNANCE &amp; ACCOUNTABILITY
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-black tracking-tight leading-tight uppercase">
                Architecture of<br />Accountability.
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-zinc-600 max-w-2xl font-normal leading-relaxed">
                Absolute control and transparency. Our Trust Center details the uncompromising verification, rigorous training, and continuous auditing protocols that define the JSM standard.
              </p>
            </div>
          </div>
        </section>

        {/* Section 01: Multi-Stage Staff Verification matching Stitch */}
        <section className="py-20 md:py-28 border-b border-zinc-200/80">
          <div className="flex items-center gap-4 mb-16">
            <span className="text-xl font-bold text-black bg-[#e9c176] w-12 h-12 flex items-center justify-center rounded-full font-mono">
              01
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-black tracking-tight">
              Multi-Stage Staff Verification
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            {/* Stage 1 */}
            <div className="md:col-span-4 bg-white p-8 md:p-10 border border-zinc-200/80 rounded-2xl hover:shadow-lg transition-all space-y-4">
              <span className="text-[10px] font-bold tracking-widest text-[#C5A880] uppercase">STAGE ONE</span>
              <h3 className="text-xl font-black text-black">Identity &amp; Background Check</h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                100% Aadhaar verification, national database screening, permanent address cross-verification, and local police verification before induction.
              </p>
            </div>

            {/* Stage 2 */}
            <div className="md:col-span-8 bg-black text-white p-8 md:p-10 rounded-2xl border-b-4 border-[#C5A880] space-y-4 shadow-lg">
              <span className="text-[10px] font-bold tracking-widest text-[#C5A880] uppercase">STAGE TWO</span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">Psychometric &amp; Situational Profiling</h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal max-w-2xl">
                Proprietary behavioral assessments measuring situational judgment, de-escalation composure, and integrity under simulated operational stress.
              </p>
            </div>

            {/* Stage 3 */}
            <div className="md:col-span-6 bg-white p-8 md:p-10 border border-zinc-200/80 rounded-2xl hover:shadow-lg transition-all space-y-4">
              <span className="text-[10px] font-bold tracking-widest text-[#C5A880] uppercase">STAGE THREE</span>
              <h3 className="text-xl font-black text-black">5-Day Mandatory Induction</h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                Rigorous training covering gate-pass vigilance, visitor management, fire safety drills, crowd protocols, and emergency escalation hierarchy.
              </p>
            </div>

            {/* Stage 4 */}
            <div className="md:col-span-6 bg-white p-8 md:p-10 border border-zinc-200/80 rounded-2xl hover:shadow-lg transition-all space-y-4">
              <span className="text-[10px] font-bold tracking-widest text-[#C5A880] uppercase">STAGE FOUR</span>
              <h3 className="text-xl font-black text-black">Continuous Surprise Audits</h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                Unannounced 2:00 AM supervisor spot-inspections, digital biometric logs, and monthly client satisfaction SLA reviews.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: Operational SLA Matrix */}
        <section className="py-20 md:py-28 border-b border-zinc-200/80">
          <div className="flex items-center gap-4 mb-16">
            <span className="text-xl font-bold text-black bg-[#e9c176] w-12 h-12 flex items-center justify-center rounded-full font-mono">
              02
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-black tracking-tight">
              Operational SLA Commitments
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="p-8 bg-white border border-zinc-200/80 rounded-2xl shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <Clock className="text-[#C5A880]" size={24} />
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">GUARANTEED</span>
              </div>
              <h4 className="text-lg font-black text-black">2-Hour Personnel Replacement</h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                If any deployed personnel is absent or unfit, our roving reserve operations team replaces the post within 120 minutes guaranteed.
              </p>
            </div>

            <div className="p-8 bg-white border border-zinc-200/80 rounded-2xl shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <ShieldCheck className="text-[#C5A880]" size={24} />
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">100% STATUTORY</span>
              </div>
              <h4 className="text-lg font-black text-black">Zero Compliance Liability</h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Full PF, ESI, minimum wages, and insurance compliance managed transparently with monthly challans provided to client leadership.
              </p>
            </div>

            <div className="p-8 bg-white border border-zinc-200/80 rounded-2xl shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <Award className="text-[#C5A880]" size={24} />
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">MONTHLY</span>
              </div>
              <h4 className="text-lg font-black text-black">Transparent Digital Reporting</h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Monthly incident logs, post duty registers, and executive risk summaries delivered straight to your portal and inbox.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 text-center space-y-6">
          <h3 className="text-3xl font-black text-black tracking-tight">Need a Governance Audit for Your Facility?</h3>
          <p className="text-xs sm:text-sm text-zinc-600 max-w-xl mx-auto font-normal">
            Request an on-site physical security and hygiene compliance audit by our operations team.
          </p>
          <div className="pt-2">
            <Button asChild size="lg" className="bg-black hover:bg-zinc-800 text-white font-bold text-xs px-8 h-12 rounded-sm border-b-2 border-[#C5A880] shadow-md">
              <Link href="/contact">
                REQUEST A COMPLIANCE AUDIT <ArrowRight size={14} className="ml-1.5" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
