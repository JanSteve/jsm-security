import { brandData } from "@/data/brand";
import { constructMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import Link from "next/link";
import { 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Scale, 
  AlertTriangle, 
  Calculator, 
  Clock 
} from "lucide-react";
import { InteractiveCostSimulator } from "@/components/calculator/interactive-cost-simulator";

export const metadata = constructMetadata({
  title: "In-House vs Outsourced Security Guards: Cost & Liability Comparison",
  description: "Comprehensive financial and legal comparison: In-House Security Guards vs PSARA-Licensed Security Agency. Compare wages, EPF/ESIC liabilities, and relief SLAs.",
  path: "/compare/in-house-vs-outsourced-security",
  keywords: [
    "In house vs outsourced security guards",
    "Security guard cost comparison India",
    "PSARA agency vs direct hiring",
    "Security vendor cost breakdown Tamil Nadu"
  ]
});

const comparisonRows = [
  {
    parameter: "Direct Monthly Salary & Minimum Wages",
    inHouse: "Direct payroll liability with statutory minimum wage annual revisions.",
    outsourced: "Single all-inclusive fixed monthly rate per guard post.",
    winner: "outsourced",
    benefit: "Predictable monthly cash flow without payroll administrative burden."
  },
  {
    parameter: "EPF, ESIC, Bonus & Gratuity Accruals",
    inHouse: "Direct balance sheet liability. Complex monthly filings and audit risks.",
    outsourced: "100% managed by agency. Certified monthly ECR challans provided with invoice.",
    winner: "outsourced",
    benefit: "Zero client statutory liability; agency absorbs all compliance audits."
  },
  {
    parameter: "Absenteeism & Reliever Coverage",
    inHouse: "Requires hiring 1.25x guards per post to cover leaves, or paying costly overtime.",
    outsourced: "Contractually guaranteed 2-Hour Relief SLA with standby marshals at no extra cost.",
    winner: "outsourced",
    benefit: "Guaranteed 100% post muster without paying double shifts."
  },
  {
    parameter: "Police Verification & Background Checks",
    inHouse: "Company HR must coordinate with police stations across districts.",
    outsourced: "Mandatory Aadhaar & Police antecedents verified under PSARA Act norms.",
    winner: "outsourced",
    benefit: "Comprehensive pre-deployment vetting completed before deployment."
  },
  {
    parameter: "Uniforms, Gear & Torch/Radio Equipment",
    inHouse: "Direct procurement, inventory storage, and replacement expenses.",
    outsourced: "Full kit, lanyards, batons, whistles, and searchlights supplied and maintained by agency.",
    winner: "outsourced",
    benefit: "Zero capital expenditure on tactical security gear."
  },
  {
    parameter: "Labor Union & Termination Risks",
    inHouse: "High legal exposure under Industrial Disputes Act for direct employees.",
    outsourced: "Contractual vendor engagement. Poor performers replaced within 24 hours.",
    winner: "outsourced",
    benefit: "Zero termination disputes or permanent establishment risks."
  },
  {
    parameter: "Night Supervisory Audits",
    inHouse: "Company management must conduct midnight audits or accept blind trust.",
    outsourced: "Dedicated 2:00 AM mobile supervisor van inspections with electronic checkpoint logs.",
    winner: "outsourced",
    benefit: "Active third-party supervision ensuring guards stay alert 24/7."
  }
];

const compareFaqs = [
  {
    question: "Is outsourcing security guards cheaper than hiring in-house in Tamil Nadu?",
    answer: "Yes. When accounting for the 1.25x reliever multiplier, EPF/ESIC employer contributions, uniform allowances, bonus, gratuity, and HR overhead, outsourcing through a PSARA-licensed agency typically delivers 18% to 28% net financial savings."
  },
  {
    question: "How does outsourcing protect the Principal Employer from labour liability?",
    answer: "A PSARA-licensed contractor provides monthly ECR challans, ESIC contribution proofs, and wage registers. This insulates the client from joint liability under Contract Labour Act Section 12."
  }
];

export default function InHouseVsOutsourcedPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: brandData.domain },
    { name: "Compare", url: `${brandData.domain}/compare/in-house-vs-outsourced-security` },
    { name: "In-House vs Outsourced", url: `${brandData.domain}/compare/in-house-vs-outsourced-security` },
  ]);

  const fSchema = faqSchema(compareFaqs);

  return (
    <main className="min-h-screen bg-white text-[#14181F] pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(fSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Editorial Header */}
        <section className="py-8 sm:py-12 border-b border-[#E7E5E0]">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B3D2E]/8 text-[#0B3D2E] text-xs font-semibold">
              <Scale size={14} />
              <span>Decision Matrix & Financial Analysis</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#14181F] font-bold tracking-tight">
              In-House vs. Outsourced PSARA Security Guards
            </h1>
            <p className="text-base sm:text-lg text-[#5A6578] leading-relaxed">
              A comprehensive operational, statutory, and cost-benefit breakdown for Managing Directors, Facility Heads, and HR Directors evaluating physical security models in India.
            </p>
          </div>
        </section>

        {/* Executive Summary Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-xl border border-red-200 bg-red-50/40 p-7 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-red-700 font-bold text-sm">
              <XCircle size={18} />
              <span>In-House Guard Model: Hidden Costs & Risks</span>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-800">
              <li className="flex items-start gap-2">
                <span className="font-bold text-red-600 shrink-0">•</span>
                <span><strong>Reliever Multiplier:</strong> You must maintain 5 guards on payroll for every 4 active posts to cover mandatory weekly offs.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-red-600 shrink-0">•</span>
                <span><strong>Administrative Drag:</strong> Monthly PF/ESI filings, gratuity provisioning, and attendance reconciliation burden your HR team.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-red-600 shrink-0">•</span>
                <span><strong>Zero Night Supervision:</strong> Facility managers must conduct midnight inspections themselves or suffer night vigilance collapse.</span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-[#0B3D2E]/30 bg-[#0B3D2E]/5 p-7 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-[#0B3D2E] font-bold text-sm">
              <CheckCircle2 size={18} />
              <span>Outsourced PSARA Agency Model: Strategic Advantages</span>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-800">
              <li className="flex items-start gap-2">
                <span className="font-bold text-[#0B3D2E] shrink-0">•</span>
                <span><strong>Guaranteed 2-Hour Relief SLA:</strong> Absent guards are replaced immediately from our dedicated district standby reserve squads.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-[#0B3D2E] shrink-0">•</span>
                <span><strong>100% Statutory Indemnity:</strong> Transparent monthly ECR challans eliminate client PF/ESIC liabilities completely.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-[#0B3D2E] shrink-0">•</span>
                <span><strong>Unannounced 2:00 AM Van Audits:</strong> Decorated military veterans inspect guard alertness and perimeter lighting throughout the night.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B3D2E]">
              Direct Comparison Table
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-[#14181F] font-bold">
              Parameter-by-Parameter Breakdown
            </h2>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#E7E5E0]">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-[#F8F9FA] border-b border-[#E7E5E0] text-[#14181F]">
                  <th className="p-4 font-bold w-1/4">Operational Parameter</th>
                  <th className="p-4 font-bold w-1/3">In-House Direct Hiring</th>
                  <th className="p-4 font-bold w-1/3 text-[#0B3D2E] bg-[#0B3D2E]/5">JSM PSARA Outsourcing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7E5E0]">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#F8F9FA]/60 transition-colors">
                    <td className="p-4 font-semibold text-[#14181F] align-top">
                      {row.parameter}
                    </td>
                    <td className="p-4 text-[#5A6578] align-top leading-relaxed">
                      {row.inHouse}
                    </td>
                    <td className="p-4 text-[#14181F] bg-[#0B3D2E]/5 font-medium align-top leading-relaxed">
                      {row.outsourced}
                      <span className="block mt-1 text-[11px] font-semibold text-[#0B3D2E]">
                        ✓ Advantage: {row.benefit}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Embedded Interactive Cost Simulator */}
        <section className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B3D2E]">
              Live Financial Simulator
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-[#14181F] font-bold">
              Simulate Your Net Monthly & Annual Savings
            </h2>
            <p className="text-xs sm:text-sm text-[#5A6578]">
              Adjust guard posts, housekeeping team sizes, and technical staff to calculate real-time savings versus direct in-house employment.
            </p>
          </div>

          <div className="rounded-xl border border-[#E7E5E0] bg-[#F8F9FA] p-6 sm:p-10">
            <InteractiveCostSimulator />
          </div>
        </section>

        {/* FAQs */}
        <section className="space-y-6 pt-8 border-t border-[#E7E5E0]">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B3D2E]">
              Frequently Asked Questions
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-[#14181F] font-bold">
              Executive Decision FAQs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {compareFaqs.map((faq, idx) => (
              <div key={idx} className="p-5 rounded-lg border border-[#E7E5E0] bg-[#F8F9FA]/60 space-y-2">
                <h3 className="text-sm font-semibold text-[#14181F]">
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-[#5A6578] leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Assessment CTA */}
        <section className="py-12 bg-[#0B3D2E] rounded-xl p-8 sm:p-12 text-center text-white space-y-6">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white font-bold tracking-tight max-w-2xl mx-auto">
            Ready to transition from fragmented hiring to an accountable partner?
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl mx-auto leading-relaxed">
            Our operations team conducts confidential on-site staffing audits and prepares transparent cost comparisons within 24 hours.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/get-quote"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-white text-[#0B3D2E] text-sm font-semibold hover:bg-neutral-100 transition-colors shadow-xs"
            >
              <span>Request Transition Proposal</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-white/10 hover:bg-white/15 text-white border border-white/20 text-sm font-semibold transition-colors"
            >
              <span>Speak with Operations Desk</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
