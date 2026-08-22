import { brandData } from "@/data/brand";
import { breadcrumbSchema } from "@/lib/schema";
import Link from "next/link";
import { 
  ShieldCheck, 
  FileCheck, 
  Users, 
  Clock, 
  Lock, 
  AlertCircle, 
  CheckCircle2, 
  Award, 
  PhoneCall, 
  Sparkles,
  ArrowRight,
  FileSpreadsheet
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Trust Center & Operational Compliance | JSM Integrated Services",
  description: "Explore JSM's transparent operating standards: 100% staff identity verification, 5-day induction training, documented SOPs, and 2-hour complaint escalation.",
};

export default function TrustCenterPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: brandData.domain },
    { name: "Trust Center", url: `${brandData.domain}/trust-center` },
  ]);

  const trustPillars = [
    {
      icon: Users,
      title: "1. Rigorous Staff Background Verification",
      description: "No personnel is deployed without comprehensive multi-stage identity verification.",
      points: [
        "Aadhaar biometric / direct identity card verification",
        "Permanent and local residential address physical validation",
        "Police verification support documentation",
        "Prior employment reference checks and character endorsements"
      ]
    },
    {
      icon: Award,
      title: "2. Structured 5-Day Induction Training",
      description: "We do not deploy untrained labor. Every guard and facility staff member completes mandatory syllabus training.",
      points: [
        "Day 1: Values, Grooming & Discipline",
        "Day 2: Post Duties, Gate Control & Visitor Logging",
        "Day 3: Fire Safety (PASS technique), First Aid & Emergency Response",
        "Day 4: Client-Specific SOPs & Hygiene Checklists",
        "Day 5: Supervised On-Site Field Shadowing"
      ]
    },
    {
      icon: FileSpreadsheet,
      title: "3. Documented SOP & Closed-Loop Operations",
      description: "Service is not a promise; it is a process. We operate on structured standing orders.",
      points: [
        "Site-specific post orders written after comprehensive physical risk audit",
        "5-step facility hygiene operating cycle: Clean → Inspect → Report → Correct → Verify",
        "Structured shift handover logbooks signed at every shift change",
        "Daily material inward/outward registers for industrial and construction sites"
      ]
    },
    {
      icon: Clock,
      title: "4. Dedicated Supervision & Surprise Night Audits",
      description: "Unbroken accountability round the clock.",
      points: [
        "Mobile field supervisory officers conduct unannounced visits between 11:00 PM and 04:00 AM",
        "Digital or register-based patrol checkpoint clocking",
        "Immediate replacement mobilization from active standby reserve pools within 2 hours",
        "Monthly executive review meetings directly with client management"
      ]
    },
    {
      icon: Lock,
      title: "5. Data Confidentiality & Client Privacy",
      description: "Strict protection of client premises information, visitor records, and business secrets.",
      points: [
        "Non-disclosure agreement (NDA) signed by all supervisory and administrative personnel",
        "Secure storage of visitor logs and gate-pass registers",
        "Zero photography/recording policies inside sensitive client operational zones",
        "Strict prohibition of sharing client security layouts with third parties"
      ]
    },
    {
      icon: AlertCircle,
      title: "6. Escalation Protocol & 2-Hour SLA",
      description: "Clear chain of command for incident resolution.",
      points: [
        "Level 1: On-Site Lead / Head Guard (Immediate on-post resolution)",
        "Level 2: Area Field Officer (On-site within 60 minutes for critical issues)",
        "Level 3: Operations Head / Managing Director (Direct executive escalation)",
        "Written incident report submitted within 24 hours of any logged deviation"
      ]
    }
  ];

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
            <ShieldCheck size={14} className="text-[#C5A880]" />
            <span>OPERATIONAL INTEGRITY & GOVERNANCE</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-black tracking-tight leading-tight">
            Trust is earned through transparency.
          </h1>

          <p className="text-base md:text-lg text-zinc-600 font-medium max-w-2xl mx-auto leading-relaxed">
            We believe that real operational confidence comes from verifiable processes, verified people, disciplined supervision, and open communication.
          </p>
        </div>

        {/* 6 Trust Framework Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {trustPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-zinc-50 border border-zinc-200/80 rounded-3xl p-8 space-y-4 shadow-sm hover:border-black hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center text-black shadow-sm">
                    <Icon size={22} className="text-black" />
                  </div>
                  <h3 className="text-lg font-bold text-black leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-zinc-500 font-medium leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-zinc-200/60">
                  {pillar.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2 text-xs text-zinc-700 font-medium">
                      <CheckCircle2 size={13} className="text-[#C5A880] flex-shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Compliance & Documentation Transparency Box */}
        <div className="max-w-4xl mx-auto bg-zinc-900 text-white rounded-3xl p-8 md:p-12 space-y-6 border border-zinc-800 shadow-2xl">
          <div className="space-y-2 border-b border-zinc-800 pb-6">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C5A880]">
              Anti-Hallucination & Truth in Advertising Commitment
            </span>
            <h2 className="text-2xl font-black text-white">
              Transparent Business Documentation Framework
            </h2>
            <p className="text-xs text-zinc-400 leading-relaxed font-medium">
              JSM operates with complete truthfulness. We do not publish unverified international certificates or fabricated statistics. All commercial proposals, client-specific SLA contracts, and statutory compliance files are made directly available during formal onboarding.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-zinc-300 font-medium">
            <div className="p-4 bg-zinc-800/80 rounded-2xl border border-zinc-700/60 space-y-1">
              <strong className="text-white block">Statutory Labor Norms</strong>
              <p className="text-zinc-400">Strict adherence to labor regulations, minimum wages, and structured employee welfare.</p>
            </div>
            <div className="p-4 bg-zinc-800/80 rounded-2xl border border-zinc-700/60 space-y-1">
              <strong className="text-white block">Prompt Wage Disbursement</strong>
              <p className="text-zinc-400">Guaranteed salary disbursement on the 1st of every month ensuring high staff morale and low churn.</p>
            </div>
            <div className="p-4 bg-zinc-800/80 rounded-2xl border border-zinc-700/60 space-y-1">
              <strong className="text-white block">Client-Specific SLAs</strong>
              <p className="text-zinc-400">Clear Service Level Agreements defining exact shifts, penalty clauses, and replacement timelines.</p>
            </div>
            <div className="p-4 bg-zinc-800/80 rounded-2xl border border-zinc-700/60 space-y-1">
              <strong className="text-white block">Executive Escalation</strong>
              <p className="text-zinc-400">Direct phone and WhatsApp escalation line to Managing Director Sweety R's office.</p>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-800">
            <span className="text-xs text-zinc-400">Official inquiries: {brandData.contact.email}</span>
            <Button asChild className="bg-[#C5A880] hover:bg-[#b59870] text-black font-bold rounded-full px-6 h-10 text-xs">
              <Link href="/contact">Request Verified Compliance Packet</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
