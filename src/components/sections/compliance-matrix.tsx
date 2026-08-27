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
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const COMPLIANCE_PILLARS = [
  {
    icon: ShieldCheck,
    title: "PSARA Act 2005 Verified",
    subtitle: "Private Security Agencies (Regulation) Act",
    points: [
      "100% police verification and biometric character checks completed before post deployment",
      "Rigorous physical training in emergency evacuation, gate control, and fire response",
      "Valid state-level statutory licensing across Tamil Nadu operations",
    ],
    status: "100% Certified",
  },
  {
    icon: Scale,
    title: "100% Client Legal Indemnity",
    subtitle: "Zero Co-Employer or Labour Liability",
    points: [
      "JSM absorbs all principal employer statutory liabilities and labour audit mandates",
      "Full indemnity clauses included in every standard service level agreement",
      "Dedicated legal and compliance desk managing all regulatory documentation",
    ],
    status: "Guaranteed Indemnity",
  },
  {
    icon: FileCheck2,
    title: "Monthly EPF & ESIC Proofs",
    subtitle: "Transparent Statutory Returns",
    points: [
      "Original monthly Electronic Challan cum Return (ECR) receipts attached to every invoice",
      "Zero delayed remittances ensuring uncompromised medical and pension security for personnel",
      "Direct employee wage transfers to individual nationalised bank accounts",
    ],
    status: "Monthly ECR Verification",
  },
  {
    icon: Award,
    title: "2-Hour Replacement SLA",
    subtitle: "Zero Unattended Post Guarantee",
    points: [
      "Immediate replacement deployment within 120 minutes during unforeseen guard absenteeism",
      "Active reserve buffers maintained at Trichy, Chennai, Coimbatore, and Hosur hubs",
      "Financial penalty rebate credit applied automatically if SLA is breached",
    ],
    status: "Contractually Backed",
  },
];

export function ComplianceMatrix() {
  return (
    <section className="py-24 bg-white text-zinc-900 relative" id="statutory-compliance">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-800 text-xs font-mono font-bold">
            <Lock size={14} className="text-[#C5A880]" />
            <span>STATUTORY &amp; LEGAL TRUST MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-black uppercase">
            100% Zero-Liability <span className="text-[#C5A880]">Compliance</span>
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
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
                className="bg-zinc-50 border border-zinc-200/90 rounded-3xl p-6 sm:p-8 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-2xl bg-[#0A1628] text-[#C5A880]">
                        <Icon size={22} />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-black">{pillar.title}</h3>
                        <p className="text-xs text-zinc-500 font-medium">{pillar.subtitle}</p>
                      </div>
                    </div>

                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-[10px] font-mono font-bold whitespace-nowrap">
                      {pillar.status}
                    </span>
                  </div>

                  <ul className="space-y-2.5 my-6 text-xs sm:text-sm text-zinc-700">
                    {pillar.points.map((point, j) => (
                      <li key={j} className="flex items-start gap-2.5 leading-snug">
                        <CheckCircle2 size={16} className="text-[#C5A880] flex-shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-zinc-200/80 text-[11px] text-zinc-500 font-mono flex items-center justify-between">
                  <span>Audit Frequency: Every Billing Cycle</span>
                  <span className="font-bold text-zinc-800">Verified SLA</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout Banner */}
        <div className="bg-[#0A1628] rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-[#C5A880]/30 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Need a Vendor Compliance Audit Package for Your Board?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-xl">
              We provide formal compliance dossier packets containing sample SLA agreements, EPF/ESIC clearance templates, and PSARA verification documentation for procurement committee review.
            </p>
          </div>

          <Link href="/contact" className="flex-shrink-0">
            <Button className="py-6 px-8 bg-[#C5A880] hover:bg-[#b09268] text-zinc-950 font-black text-xs uppercase tracking-wider rounded-xl cursor-pointer">
              <span>Request Audit Dossier</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
