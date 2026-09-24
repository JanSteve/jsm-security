import React from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  FileText, 
  Download, 
  CheckCircle2, 
  Award, 
  Users, 
  Briefcase, 
  ArrowRight,
  Phone,
  Building2,
  FileCheck
} from "lucide-react";
import { brandData } from "@/data/brand";
import { breadcrumbSchema } from "@/lib/schema";

import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Compliance, PSARA 2005 & DGR Framework",
  description: "Official compliance authority page for JSM Integrated Services. Review PSARA Act 2005 standards, DGR alignment, EPF/ESIC legal compliance, and download official application forms.",
  path: "/security-agencies",
  keywords: [
    "PSARA 2005 Tamil Nadu",
    "DGR Ex-Servicemen Security",
    "Statutory EPF ESIC Compliance",
    "Security Agency License Verification"
  ]
});

const stateStatus = [
  {
    state: "Tamil Nadu",
    districts: "Trichy, Chennai (OMR), Coimbatore, Hosur, Madurai, Salem, Erode, Tirunelveli",
    psaraStatus: "Active & Fully Compliant (Home Dept TN)",
    commandCenter: "Trichy HQ & Chennai Regional Hub",
    deployedStrength: "450+ Marshals & Supervisors",
    dgrAlignment: "Level 1 Operational Ready"
  },
  {
    state: "Karnataka & Border SEZs",
    districts: "Hosur-Bengaluru Corridor, Electronic City, Whitefield, Mysuru",
    psaraStatus: "Cross-Border Industrial Deployment",
    commandCenter: "Hosur Industrial Outpost",
    deployedStrength: "120+ Technical & Guarding Assets",
    dgrAlignment: "Level 2 Operational Ready"
  },
  {
    state: "Kerala & Andhra Pradesh Corridors",
    districts: "Coimbatore-Palakkad, Madurai-Trivandrum, Chennai-Tirupati",
    psaraStatus: "Interstate Alliance Protocol",
    commandCenter: "Regional Roving Audit Cell",
    deployedStrength: "On-demand Mobilization (72h SLA)",
    dgrAlignment: "Empanelment Registered"
  }
];

const downloadableForms = [
  {
    title: "Form-A: Commissioned Officer Intake",
    code: "JSM-DGR-FORM-A",
    desc: "Application dossier for retired Commissioned Officers (Army, Navy, Air Force) applying for Security Director & Regional Operations Head roles.",
    filename: "Form-A-Officer-Recruitment.docx",
    size: "10 KB",
  },
  {
    title: "Form-B: JCO & NCO Application Dossier",
    code: "JSM-DGR-FORM-B",
    desc: "Intake form for Junior Commissioned Officers (Subedar Major, Subedar, Naib Subedar) and Havildars applying for Field Supervisor postings.",
    filename: "Form-B-JCO-Application.docx",
    size: "10 KB",
  },
  {
    title: "Form-ESM-1: Ex-Servicemen Guard Enrollment",
    code: "JSM-ESM-01",
    desc: "Enrollment document for Indian Armed Forces veterans entering industrial guarding, armed escort, and civil aviation security platoons.",
    filename: "Form-ESM-1-Ex-Servicemen.docx",
    size: "10 KB",
  },
  {
    title: "Form-ESM-2: Jawan Induction Record",
    code: "JSM-ESM-02",
    desc: "Standard military record verification, discharge book photocopy endorsement, and character assessment form for soldier induction.",
    filename: "Form-ESM-2-Jawan.docx",
    size: "10 KB",
  },
  {
    title: "Form-SL-1: Skilled Technical Labor Application",
    code: "JSM-SL-01",
    desc: "Registration form for CNC operators, electricians, pipe fitters, and industrial line technicians seeking factory placements.",
    filename: "Form-SL-1-Skilled-Labor.docx",
    size: "10 KB",
  },
  {
    title: "PSARA Statutory Compliance Audit Checklist",
    code: "JSM-COMP-AUDIT",
    desc: "Complete 15-point statutory checklist verifying EPF/ESIC deposits, minimum wages, uniform allowance, and supervisor registers.",
    filename: "JSM-Compliance-Checklist.docx",
    size: "12 KB",
  }
];

export default function SecurityAgenciesPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: brandData.domain },
    { name: "Compliance & DGR", url: `${brandData.domain}/security-agencies` },
  ]);

  return (
    <main className="min-h-screen bg-white text-[#14181F] pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Editorial Header */}
        <section className="py-8 sm:py-12 border-b border-[#E7E5E0]">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B3D2E]/8 text-[#0B3D2E] text-xs font-semibold">
              <ShieldCheck size={14} />
              <span>Statutory Compliance &amp; DGR Architecture</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#14181F] font-normal tracking-tight">
              PSARA Framework &amp; Directorate General Resettlement (DGR) Alignment
            </h1>
            <p className="text-base sm:text-lg text-[#5A6578] leading-relaxed">
              JSM Integrated Services operates strictly under the Private Security Agencies Regulation Act (PSARA 2005) and aligns with the Ministry of Defence DGR guidelines for Ex-Servicemen employment.
            </p>

            {/* AEO/GEO Attributed Authority Box */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-[#5A6578] border-t border-[#E7E5E0]/70">
              <span><strong>Last Regulatory Review:</strong> March 2026</span>
              <span>&bull;</span>
              <span><strong>Reviewed by:</strong> Major AR Devadoss (Army-Veteran), Head of Operations &amp; Audit</span>
            </div>
          </div>
        </section>

        {/* Regulatory Pillars (PSARA & DGR) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-[#E7E5E0] pb-16">
          <div className="p-8 rounded-xl bg-[#F8F9FA] border border-[#E7E5E0] space-y-4">
            <div className="flex items-center gap-2.5 text-[#0B3D2E]">
              <ShieldCheck size={20} />
              <h2 className="font-display text-xl font-semibold text-[#14181F]">
                PSARA Act 2005 Statutory Framework
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#5A6578] leading-relaxed">
              Governed by the Home Department, Government of Tamil Nadu. Deployed security guards and supervisors are 100% Aadhaar-verified and authenticated through police verification registers.
            </p>
            <ul className="space-y-2 text-xs text-[#4A5568] pt-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-[#0B3D2E] shrink-0 mt-0.5" />
                <span>Mandatory 5-Day Pre-Deployment Training Syllabus</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-[#0B3D2E] shrink-0 mt-0.5" />
                <span>Standardized Uniform, Crest &amp; Turnout Regulations</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-[#0B3D2E] shrink-0 mt-0.5" />
                <span>Unannounced Supervisor Van Audits &amp; Logbook Checks</span>
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-xl bg-[#F8F9FA] border border-[#E7E5E0] space-y-4">
            <div className="flex items-center gap-2.5 text-[#B8925A]">
              <Award size={20} />
              <h2 className="font-display text-xl font-semibold text-[#14181F]">
                DGR Ex-Servicemen (ESM) Resettlement
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#5A6578] leading-relaxed">
              Structured resettlement pathways for retired Indian Armed Forces officers, JCOs, and jawans into high-responsibility corporate and industrial security leadership roles.
            </p>
            <ul className="space-y-2 text-xs text-[#4A5568] pt-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-[#0B3D2E] shrink-0 mt-0.5" />
                <span>Commissioned Officers as Chief Security Officers</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-[#0B3D2E] shrink-0 mt-0.5" />
                <span>JCOs as Multi-Site Field Operations Coordinators</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-[#0B3D2E] shrink-0 mt-0.5" />
                <span>Veterans as Gate Access &amp; Asset Protection Marshals</span>
              </li>
            </ul>
          </div>
        </section>

        {/* State-Wise Operational Deployment Matrix */}
        <section className="space-y-6 border-b border-[#E7E5E0] pb-16">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0B3D2E]">
              Regional Jurisdiction
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-[#14181F] font-normal tracking-tight">
              State-Wise Deployment &amp; Licensing Status
            </h2>
            <p className="text-sm text-[#5A6578]">
              Operational readiness across industrial corridors in South India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stateStatus.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl border border-[#E7E5E0] bg-white space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-base text-[#14181F]">
                    {item.state}
                  </h3>
                  <span className="text-[10px] font-mono font-bold text-[#0B3D2E] bg-[#0B3D2E]/8 px-2 py-0.5 rounded">
                    {item.dgrAlignment}
                  </span>
                </div>
                <div className="text-xs space-y-1.5 text-[#5A6578]">
                  <p><strong className="text-[#14181F]">Districts:</strong> {item.districts}</p>
                  <p><strong className="text-[#14181F]">PSARA Status:</strong> {item.psaraStatus}</p>
                  <p><strong className="text-[#14181F]">Command Hub:</strong> {item.commandCenter}</p>
                  <p><strong className="text-[#14181F]">Deployed Assets:</strong> {item.deployedStrength}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Downloadable Compliance Forms Library (.docx) */}
        <section className="space-y-6 border-b border-[#E7E5E0] pb-16">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0B3D2E]">
              Official Documentation
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-[#14181F] font-normal tracking-tight">
              Download Official Compliance Dossiers &amp; Forms (.docx)
            </h2>
            <p className="text-sm text-[#5A6578]">
              Standard recruitment dossiers, officer intake forms, and statutory audit checklists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {downloadableForms.map((doc, idx) => (
              <div
                key={idx}
                className="p-5 rounded-lg border border-[#E7E5E0] bg-[#F8F9FA] flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-[#0B3D2E] font-bold text-[11px]">
                      {doc.code}
                    </span>
                    <span className="text-neutral-400 font-mono text-[10px]">
                      {doc.size}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-[#14181F] leading-snug">
                    {doc.title}
                  </h3>
                  <p className="text-xs text-[#5A6578] leading-relaxed">
                    {doc.desc}
                  </p>
                </div>

                <a
                  href={`/downloads/${doc.filename}`}
                  download
                  className="inline-flex items-center justify-center gap-2 py-2 px-3.5 rounded-md bg-white border border-[#E7E5E0] hover:border-[#0B3D2E] text-xs font-semibold text-[#0B3D2E] transition-colors shadow-2xs"
                >
                  <Download size={13} />
                  <span>Download Document (.docx)</span>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Verification Strip */}
        <section className="p-8 rounded-xl bg-[#0B3D2E] text-white text-center space-y-4">
          <h3 className="font-display text-2xl sm:text-3xl text-white font-normal">
            Require formal statutory audit records for your enterprise?
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl mx-auto leading-relaxed">
            Contact our compliance desk for verified copies of our PSARA license, ISO 9001:2015 certification, and monthly ECR challan records.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white text-[#0B3D2E] text-xs sm:text-sm font-semibold hover:bg-neutral-100 transition-colors"
            >
              <span>Contact Compliance Officer</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
