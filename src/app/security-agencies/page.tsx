import React from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  FileText, 
  Download, 
  CheckCircle2, 
  Building, 
  MapPin, 
  FileSpreadsheet, 
  PhoneCall, 
  MessageCircle,
  ExternalLink,
  Award,
  Users,
  Briefcase
} from "lucide-react";
import { brandData } from "@/data/brand";

export const metadata = {
  title: "Security Agencies & DGR Alignment | JSM Integrated Services",
  description: "DGR-aligned security agency schemes, PSARA 2005 statutory compliance, state-wise status in Tamil Nadu & South India, empanelment criteria, and official downloadable forms.",
};

const stateStatus = [
  {
    state: "Tamil Nadu",
    districts: "Trichy, Chennai (OMR), Coimbatore, Hosur, Madurai, Salem, Erode, Tirunelveli",
    psaraStatus: "Active & Fully Compliant",
    commandCenter: "Trichy HQ & Chennai Regional Hub",
    deployedStrength: "450+ Marshals & Supervisors",
    dgrAlignment: "Level 1 Operational Ready"
  },
  {
    state: "Karnataka",
    districts: "Bengaluru, Electronic City, Whitefield, Mysuru",
    psaraStatus: "Interstate Transit Operational",
    commandCenter: "Hosur-Bengaluru Corridor Outpost",
    deployedStrength: "120+ Technical & Guarding Assets",
    dgrAlignment: "Level 2 Operational Ready"
  },
  {
    state: "Kerala & Andhra Pradesh",
    districts: "Kochi, Thiruvananthapuram, Visakhapatnam, Vijayawada",
    psaraStatus: "Regional Alliance Partner Network",
    commandCenter: "South Command Roving Cell",
    deployedStrength: "On-demand Mobilization (72h SLA)",
    dgrAlignment: "Empanelment Registered"
  }
];

const downloadableForms = [
  {
    title: "Form-A: Officer Recruitment Form",
    code: "JSM-DGR-FORM-A",
    desc: "Application dossier for retired Commissioned Officers (Army, Navy, Air Force) applying for Senior Security Director & Facility Head appointments.",
    filename: "Form-A-Officer-Recruitment.docx",
    size: "10 KB",
    type: "DOCX Form"
  },
  {
    title: "Form-B: JCO Application Dossier",
    code: "JSM-DGR-FORM-B",
    desc: "Enrolment documentation for Junior Commissioned Officers (Subedar Major, Subedar, Naib Subedar) seeking Field Supervisor postings.",
    filename: "Form-B-JCO-Application.docx",
    size: "9.8 KB",
    type: "DOCX Form"
  },
  {
    title: "Form-ESM-1: Ex-Servicemen Verification",
    code: "JSM-ESM-VERIF-01",
    desc: "Discharge book verification, biometric validation, and weapons certification dossier for Ex-Servicemen security marshals.",
    filename: "Form-ESM-1-Ex-Servicemen.docx",
    size: "9.7 KB",
    type: "DOCX Form"
  },
  {
    title: "Form-ESM-2: Jawan Induction & Bio-Data",
    code: "JSM-ESM-BIO-02",
    desc: "Service record registration, bank details for direct benefit transfer, EPF/ESIC declaration, and police clearance certificate.",
    filename: "Form-ESM-2-Jawan.docx",
    size: "9.6 KB",
    type: "DOCX Form"
  },
  {
    title: "Statutory Compliance Checklist",
    code: "JSM-AUDIT-CHK-01",
    desc: "PSARA 2005 inspection checklist, Minimum Wages Act schedule, EPF/ESIC monthly ECR challan verification protocol.",
    filename: "JSM-Compliance-Checklist.docx",
    size: "9.8 KB",
    type: "DOCX Checklist"
  }
];

export default function SecurityAgenciesPage() {
  return (
    <div className="bg-white text-[#1d1d1f] min-h-screen">
      {/* Header Banner */}
      <section className="relative pt-32 pb-20 md:pt-36 md:pb-24 bg-[#0a0a0c] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.15),rgba(255,255,255,0))]" />
        
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <ShieldCheck size={14} />
            <span>DGR &amp; PSARA Statutory Framework</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white max-w-4xl leading-[1.1]">
            Security Agencies Scheme &amp; Ex-Servicemen Resettlement
          </h1>
          <p className="mt-6 text-base sm:text-lg text-white/70 max-w-3xl leading-relaxed">
            Inspired by the Directorate General Resettlement (DGR, Ministry of Defence) guidelines and operating strictly under the Private Security Agencies Regulation Act (PSARA 2005). We bridge disciplined defense veterans with sovereign civil and industrial protection.
          </p>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-white/10">
            <div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400">100%</div>
              <div className="text-xs text-white/60 uppercase tracking-wide mt-1">PSARA TN Compliant</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-white">450+</div>
              <div className="text-xs text-white/60 uppercase tracking-wide mt-1">Trained ESM &amp; Marshals</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-white">2-Hour</div>
              <div className="text-xs text-white/60 uppercase tracking-wide mt-1">Relief Replacement SLA</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400">0%</div>
              <div className="text-xs text-white/60 uppercase tracking-wide mt-1">Client Statutory Liability</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-16 md:py-24 space-y-20">
        
        {/* Section 1: Overview & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold text-[#0071e3] uppercase tracking-wider">Operational Directive</span>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1d1d1f]">
              Upholding Military-Grade Discipline in Enterprise Guarding
            </h2>
            <p className="text-sm sm:text-base text-[#6e6e73] leading-relaxed">
              The Directorate General Resettlement (DGR) provides institutional resettlement opportunities for Ex-Servicemen (ESM) of the Indian Armed Forces. JSM Integrated Services integrates ESM veterans across supervisory, armed protection, and command roles to maintain unyielding perimeter integrity for IT corridors, civil aviation zones, manufacturing hubs, and public sector undertakings.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-[#1d1d1f] font-medium">
                  <strong>Officer Leadership:</strong> Ex-Army leadership auditing security protocols, SOP rehearsals, and night patrol rounds.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-[#1d1d1f] font-medium">
                  <strong>Direct Benefit Compliance:</strong> 100% EPF, ESIC, Bonus, and transparent bank transfers without intermediary leakages.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-[#1d1d1f] font-medium">
                  <strong>Civil Aviation Grade:</strong> Operational expertise demonstrated at Trichy International Airport commercial areas.
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-[#f5f5f7] border border-black/[0.08] rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-black/[0.06]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#86868b]">Regulatory Matrix</span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">PSARA Valid</span>
            </div>
            
            <div className="space-y-4 text-xs sm:text-sm text-[#1d1d1f]">
              <div className="flex justify-between py-2 border-b border-black/[0.04]">
                <span className="text-[#6e6e73]">Governing Act</span>
                <span className="font-semibold text-right">Private Security Agencies (Regulation) Act 2005</span>
              </div>
              <div className="flex justify-between py-2 border-b border-black/[0.04]">
                <span className="text-[#6e6e73]">Controlling Authority</span>
                <span className="font-semibold text-right">Home Department, Government of Tamil Nadu</span>
              </div>
              <div className="flex justify-between py-2 border-b border-black/[0.04]">
                <span className="text-[#6e6e73]">ESM Training Alignment</span>
                <span className="font-semibold text-right">DGR Guidelines &amp; Armed Forces Resettlement</span>
              </div>
              <div className="flex justify-between py-2 border-b border-black/[0.04]">
                <span className="text-[#6e6e73]">Statutory Audit Delivery</span>
                <span className="font-semibold text-right">Monthly ECR Challans &amp; Wage Sheets Attached</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-[#6e6e73]">Operations Hotline</span>
                <span className="font-mono font-bold text-emerald-700">+91 90808 63448</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/${brandData.contact.whatsapp}?text=Hello%20JSM,%20we%20require%20DGR%20aligned%20security%20deployment%20details.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors shadow-sm"
              >
                <MessageCircle size={15} />
                <span>Discuss DGR Empanelment on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Section 2: State-Wise Deployment Status */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#0071e3] uppercase tracking-wider">Regional Footprint</span>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1d1d1f] mt-1">
                State-Wise Security Agency Operation Status
              </h2>
            </div>
            <div className="text-xs text-[#86868b]">
              Updated for Q3/Q4 Financial Year 2025–2026
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-black/[0.08] shadow-xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#f5f5f7] border-b border-black/[0.08] text-[#1d1d1f] font-semibold">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">State / Region</th>
                  <th className="py-3.5 px-4 sm:px-6">District Hubs Covered</th>
                  <th className="py-3.5 px-4 sm:px-6">PSARA Status</th>
                  <th className="py-3.5 px-4 sm:px-6">Command Cell</th>
                  <th className="py-3.5 px-4 sm:px-6">Strength</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.06] bg-white">
                {stateStatus.map((row, idx) => (
                  <tr key={idx} className="hover:bg-black/[0.01] transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-semibold text-[#1d1d1f] whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-[#0071e3]" />
                        <span>{row.state}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-[#515154] max-w-xs">{row.districts}</td>
                    <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {row.psaraStatus}
                      </span>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-[#515154]">{row.commandCenter}</td>
                    <td className="py-4 px-4 sm:px-6 font-mono font-medium text-[#1d1d1f]">{row.deployedStrength}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Official Downloadable Documents */}
        <div className="space-y-6 pt-6">
          <div>
            <span className="text-xs font-bold text-[#0071e3] uppercase tracking-wider">Official Forms</span>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1d1d1f] mt-1">
              Download Official Enrolment &amp; Compliance Forms
            </h2>
            <p className="text-xs sm:text-sm text-[#6e6e73] mt-2 max-w-2xl">
              Fill and submit official `.docx` Word documents directly to our operations secretariat or upload via the career application portal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {downloadableForms.map((form, idx) => (
              <div 
                key={idx}
                className="flex flex-col justify-between p-6 rounded-2xl bg-[#f5f5f7] border border-black/[0.08] hover:border-black/[0.16] hover:shadow-md transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-md bg-white border border-black/[0.08] text-[10px] font-mono font-bold text-[#0071e3]">
                      {form.code}
                    </span>
                    <span className="text-[11px] font-medium text-[#86868b]">{form.size}</span>
                  </div>

                  <h3 className="text-base font-semibold text-[#1d1d1f] leading-snug group-hover:text-[#0071e3] transition-colors">
                    {form.title}
                  </h3>

                  <p className="mt-2 text-xs text-[#6e6e73] leading-relaxed">
                    {form.desc}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-black/[0.06]">
                  <a
                    href={`/downloads/${form.filename}`}
                    download
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-white hover:bg-[#1d1d1f] text-[#1d1d1f] hover:text-white border border-black/[0.12] text-xs font-semibold transition-all shadow-xs"
                  >
                    <Download size={14} />
                    <span>Download Word Document (.docx)</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Operational Advisory Notice */}
        <div className="bg-[#1d1d1f] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="text-xs font-bold font-mono tracking-widest text-emerald-400 uppercase">
              Notice to Corporate Procurement &amp; Facility Directors
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Require an Official DGR Rate Schedule &amp; PSARA Audit Dossier?
            </h3>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Our statutory compliance department provides full-spectrum wage calculation matrices, EPF/ESIC proof of deposit, and PSARA license copies for vendor onboarding and corporate governance committees.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/contact"
                className="px-6 py-3 rounded-full bg-white text-[#1d1d1f] hover:bg-[#f5f5f7] text-xs font-semibold transition-all shadow-sm"
              >
                Request Procurement Dossier
              </Link>
              <a
                href={`https://wa.me/${brandData.contact.whatsapp}?text=Hello%20JSM,%20we%20need%20the%20PSARA%20compliance%20dossier%20for%20vendor%20onboarding.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors"
              >
                <MessageCircle size={15} />
                <span>Chat with Operations Head</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
