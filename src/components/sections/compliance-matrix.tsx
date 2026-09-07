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
    <section className="py-16 md:py-20 bg-[#07090E] text-zinc-100 relative border-t border-white/10" id="statutory-compliance">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#C5A880] text-xs font-mono font-bold tracking-wider uppercase">
            <Lock size={14} className="text-[#C5A880]" />
            <span>[Statutory &amp; Legal Trust Matrix]</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white text-balance">
            100% zero-liability <span className="text-[#C5A880]">compliance</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed text-pretty">
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
                className="bg-[#0B0F17] border border-zinc-800 rounded-3xl p-6 sm:p-8 hover:border-[#C5A880]/50 shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-2xl bg-[#07090E] border border-zinc-800 text-[#C5A880] group-hover:bg-[#C5A880] group-hover:text-black transition-colors">
                        <Icon size={22} />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-white">{pillar.title}</h3>
                        <p className="text-xs text-zinc-400 font-medium">{pillar.subtitle}</p>
                      </div>
                    </div>

                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold whitespace-nowrap">
                      {pillar.status}
                    </span>
                  </div>

                  <ul className="space-y-2.5 my-6 text-xs sm:text-sm text-zinc-300">
                    {pillar.points.map((point, j) => (
                      <li key={j} className="flex items-start gap-2.5 leading-snug">
                        <CheckCircle2 size={16} className="text-[#C5A880] flex-shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-zinc-800/80 text-[11px] text-zinc-400 font-mono flex items-center justify-between">
                  <span>Audit frequency: every billing cycle</span>
                  <span className="font-bold text-[#C5A880]">Verified SLA</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout Banner */}
        <div className="bg-gradient-to-r from-[#0B0F17] to-[#121824] rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-[#C5A880]/30 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black text-white text-balance">
              Need a vendor compliance audit package for your board?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-xl text-pretty">
              We provide formal compliance dossier packets containing sample SLA agreements, EPF/ESIC clearance templates, and PSARA verification documentation for procurement committee review.
            </p>
          </div>

          <Link href="/contact" className="flex-shrink-0">
            <Button className="py-6 px-8 bg-[#C5A880] hover:bg-[#b09268] text-zinc-950 font-black text-xs tracking-wider rounded-xl cursor-pointer min-h-[44px] press-scale shadow-lg">
              <span>Request audit dossier</span>
              <ArrowRight size={14} className="ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
