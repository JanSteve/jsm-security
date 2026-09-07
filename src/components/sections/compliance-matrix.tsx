"use client";

import { 
  ShieldCheck, 
  FileText, 
  Scale, 
  CheckCircle2, 
  Award, 
  Lock, 
  Building2, 
  FileCheck2, 
  ArrowRight 
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const COMPLIANCE_PILLARS = [
  {
    icon: ShieldCheck,
    title: "PSARA Act 2005 verified",
    subtitle: "Private Security Agencies (Regulation) Act",
    points: [
      "100% police verification and biometric character checks completed before post deployment",
      "Rigorous physical training in emergency evacuation, gate control, and fire response",
      "Valid state-level statutory licensing across Tamil Nadu operations",
    ],
    status: "100% certified",
  },
  {
    icon: Scale,
    title: "100% client legal indemnity",
    subtitle: "Zero co-employer or labour liability",
    points: [
      "JSM absorbs all principal employer statutory liabilities and labour audit mandates",
      "Full indemnity clauses included in every standard service level agreement",
      "Dedicated legal and compliance desk managing all regulatory documentation",
    ],
    status: "Guaranteed indemnity",
  },
  {
    icon: FileCheck2,
    title: "Monthly EPF & ESIC proofs",
    subtitle: "Transparent statutory returns",
    points: [
      "Original monthly Electronic Challan cum Return (ECR) receipts attached to every invoice",
      "Zero delayed remittances ensuring uncompromised medical and pension security for personnel",
      "Direct employee wage transfers to individual nationalised bank accounts",
    ],
    status: "Monthly ECR verification",
  },
  {
    icon: Award,
    title: "2-hour replacement SLA",
    subtitle: "Zero unattended post guarantee",
    points: [
      "Immediate replacement deployment within 120 minutes during unforeseen guard absenteeism",
      "Active reserve buffers maintained at Trichy, Chennai, Coimbatore, and Hosur hubs",
      "Financial penalty rebate credit applied automatically if SLA is breached",
    ],
    status: "Contractually backed",
  },
];

export function ComplianceMatrix() {
  return (
    <section className="py-20 md:py-28 bg-white text-[#1d1d1f] relative border-t border-black/[0.08]" id="statutory-compliance">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f5f5f7] border border-black/[0.08] text-[#1d1d1f] text-xs font-semibold tracking-wide uppercase">
            <Lock size={14} className="text-[#0071e3]" />
            <span>Statutory &amp; Legal Trust Matrix</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#1d1d1f] text-balance">
            100% zero-liability compliance.
          </h2>
          <p className="text-[#86868b] text-sm sm:text-base leading-relaxed text-pretty">
            Enterprise procurement teams choose JSM for total legal safety. We eliminate labour disputes, statutory audit liabilities, and operational lapses through complete transparency.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {COMPLIANCE_PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="bg-[#f5f5f7] border border-black/[0.06] rounded-[28px] p-6 sm:p-8 hover:border-black/[0.12] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-2xl bg-white border border-black/[0.08] text-[#1d1d1f] group-hover:scale-105 transition-transform shadow-sm">
                        <Icon size={22} className="text-[#0071e3]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-[#1d1d1f]">{pillar.title}</h3>
                        <p className="text-xs text-[#86868b] font-medium">{pillar.subtitle}</p>
                      </div>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-medium whitespace-nowrap">
                      {pillar.status}
                    </span>
                  </div>

                  <ul className="space-y-2.5 my-6 text-xs sm:text-sm text-[#1d1d1f]">
                    {pillar.points.map((point, j) => (
                      <li key={j} className="flex items-start gap-2.5 leading-snug">
                        <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-black/[0.06] text-[11px] text-[#86868b] flex items-center justify-between">
                  <span>Audit frequency: every billing cycle</span>
                  <span className="font-semibold text-[#0071e3]">Verified SLA</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout Banner */}
        <div className="bg-[#f5f5f7] rounded-[28px] p-8 sm:p-10 text-[#1d1d1f] flex flex-col md:flex-row items-center justify-between gap-6 border border-black/[0.08] shadow-sm">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-semibold text-[#1d1d1f] text-balance">
              Need a vendor compliance audit package for your board?
            </h3>
            <p className="text-xs sm:text-sm text-[#86868b] max-w-xl text-pretty">
              We provide formal compliance dossier packets containing sample SLA agreements, EPF/ESIC clearance templates, and PSARA verification documentation for procurement committee review.
            </p>
          </div>

          <Link href="/contact" className="flex-shrink-0">
            <Button className="py-3.5 px-7 bg-[#1d1d1f] hover:bg-black text-white font-semibold text-xs tracking-wide rounded-full cursor-pointer min-h-[44px] shadow-sm">
              <span>Request audit dossier</span>
              <ArrowRight size={14} className="ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
