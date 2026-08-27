"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShieldCheck, 
  Clock, 
  MapPin, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Users, 
  Building2, 
  Download, 
  Search, 
  Radio, 
  Calendar,
  Lock,
  ArrowRight,
  PhoneCall,
  User,
  Mail,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface AttendanceRecord {
  id: string;
  postName: string;
  guardName: string;
  badgeId: string;
  shift: "Day Shift (06:00 - 18:00)" | "Night Shift (18:00 - 06:00)";
  checkInTime: string;
  verificationMethod: "Biometric Thumbprint + GPS Geofence" | "Face Recognition + NFC Token";
  status: "On Post (Verified)" | "Supervisor Relieved";
  location: string;
}

interface NightAuditRecord {
  id: string;
  timestamp: string;
  supervisorName: string;
  facility: string;
  observation: string;
  status: "Spotless • 100% Awake & Vigilant" | "Equipment Checklist Cleared";
  patrolVanId: string;
}

interface ComplianceDocument {
  id: string;
  month: string;
  docType: "EPF Monthly ECR Challan" | "ESIC Monthly Contribution Return" | "GSTIN Paid Return (GSTR-3B)" | "PSARA Police Verification Dossier";
  filingDate: string;
  verificationStatus: "Verified & Downloadable";
  fileSize: string;
}

const SAMPLE_ATTENDANCE: AttendanceRecord[] = [
  {
    id: "ATT-101",
    postName: "Main Entrance Vehicle Gate 1",
    guardName: "M. Senthilkumar",
    badgeId: "JSM-GRD-4892",
    shift: "Day Shift (06:00 - 18:00)",
    checkInTime: "05:52 AM",
    verificationMethod: "Biometric Thumbprint + GPS Geofence",
    status: "On Post (Verified)",
    location: "Sriperumbudur Industrial SEZ, Chennai",
  },
  {
    id: "ATT-102",
    postName: "Material Inward & Loading Bay 3",
    guardName: "K. Murugan",
    badgeId: "JSM-GRD-5120",
    shift: "Day Shift (06:00 - 18:00)",
    checkInTime: "05:48 AM",
    verificationMethod: "Biometric Thumbprint + GPS Geofence",
    status: "On Post (Verified)",
    location: "SIPCOT Phase II, Hosur",
  },
  {
    id: "ATT-103",
    postName: "Emergency ICU & Ambulance Corridor",
    guardName: "P. Vigneshwaran",
    badgeId: "JSM-GRD-3891",
    shift: "Day Shift (06:00 - 18:00)",
    checkInTime: "05:55 AM",
    verificationMethod: "Face Recognition + NFC Token",
    status: "On Post (Verified)",
    location: "Trichy Healthcare Campus",
  },
  {
    id: "ATT-104",
    postName: "Server Room & Executive Floor",
    guardName: "R. Dhanapal",
    badgeId: "JSM-GRD-6204",
    shift: "Day Shift (06:00 - 18:00)",
    checkInTime: "05:50 AM",
    verificationMethod: "Biometric Thumbprint + GPS Geofence",
    status: "On Post (Verified)",
    location: "ELCOT IT Park, Coimbatore",
  },
];

const SAMPLE_NIGHT_AUDITS: NightAuditRecord[] = [
  {
    id: "AUD-8921",
    timestamp: "02:15 AM (Today)",
    supervisorName: "Field Officer T. Natarajan",
    facility: "Hyundai Vendor Tier-1 Plant (Sriperumbudur)",
    observation: "Unannounced 2:00 AM perimeter inspection. Both gate and warehouse patrollers alert in full uniform with LED night torches. Visitor registers up to date.",
    status: "Spotless • 100% Awake & Vigilant",
    patrolVanId: "TN-45-JSM-01",
  },
  {
    id: "AUD-8922",
    timestamp: "02:40 AM (Today)",
    supervisorName: "Field Officer S. Mariappan",
    facility: "Multi-Specialty Hospital (Tiruchirappalli)",
    observation: "Emergency ramp access checked. Sanitization log verified. Night relief guard present on post.",
    status: "Spotless • 100% Awake & Vigilant",
    patrolVanId: "TN-45-JSM-04",
  },
  {
    id: "AUD-8923",
    timestamp: "03:10 AM (Today)",
    supervisorName: "Field Officer V. Karthikeyan",
    facility: "TVS Ancillary Heavy Engineering (Hosur)",
    observation: "CCTV perimeter fencing audit. Gate passes cross-checked with shift supervisor. Zero deviations noted.",
    status: "Equipment Checklist Cleared",
    patrolVanId: "TN-70-JSM-02",
  },
];

const SAMPLE_COMPLIANCE_DOCS: ComplianceDocument[] = [
  {
    id: "DOC-2026-07-EPF",
    month: "July 2026",
    docType: "EPF Monthly ECR Challan",
    filingDate: "12-08-2026",
    verificationStatus: "Verified & Downloadable",
    fileSize: "245 KB (PDF)",
  },
  {
    id: "DOC-2026-07-ESIC",
    month: "July 2026",
    docType: "ESIC Monthly Contribution Return",
    filingDate: "14-08-2026",
    verificationStatus: "Verified & Downloadable",
    fileSize: "188 KB (PDF)",
  },
  {
    id: "DOC-2026-07-GST",
    month: "July 2026",
    docType: "GSTIN Paid Return (GSTR-3B)",
    filingDate: "18-08-2026",
    verificationStatus: "Verified & Downloadable",
    fileSize: "112 KB (PDF)",
  },
  {
    id: "DOC-2026-PSARA",
    month: "Annual Audit 2026",
    docType: "PSARA Police Verification Dossier",
    filingDate: "01-01-2026",
    verificationStatus: "Verified & Downloadable",
    fileSize: "1.4 MB (PDF)",
  },
];

export default function ClientPortalDemoPage() {
  const [activeTab, setActiveTab] = useState<"attendance" | "nightAudits" | "compliance" | "slaTracker">("attendance");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const update = () => setCurrentTime(new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-[#070e17] text-white pt-28 pb-24 selection:bg-[#C5A880] selection:text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Portal Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-zinc-800 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 text-[#C5A880] text-xs font-mono font-bold mb-3">
              <Radio size={14} className="animate-pulse text-emerald-400" />
              <span>LIVE CLIENT COMMAND PORTAL (DEMO PREVIEW)</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
              Client Operations <span className="text-[#C5A880]">Command Hub</span>
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Real-time attendance feeds, 2:00 AM supervisor inspection registers, and downloadable statutory EPF/ESIC compliance files.
            </p>
          </div>

          {/* Live Status Box */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 flex items-center gap-6 font-mono text-xs shadow-xl">
            <div>
              <span className="text-zinc-500 block text-[10px] uppercase">Live IST Time</span>
              <span className="text-sm font-bold text-white">{currentTime || "Loading..."}</span>
            </div>
            <div className="h-8 w-px bg-zinc-800" />
            <div>
              <span className="text-zinc-500 block text-[10px] uppercase">Active Deployment</span>
              <span className="text-sm font-bold text-emerald-400">520 Guards • 52 Sites</span>
            </div>
            <div className="h-8 w-px bg-zinc-800" />
            <div>
              <span className="text-zinc-500 block text-[10px] uppercase">Relief SLA</span>
              <span className="text-sm font-bold text-[#C5A880]">99.6% Fulfilled</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto gap-2 p-1.5 bg-zinc-900/80 border border-zinc-800 rounded-2xl mb-8">
          {[
            { id: "attendance", label: "Live Biometric Attendance", icon: Users },
            { id: "nightAudits", label: "2:00 AM Supervisor Night Audits", icon: Clock },
            { id: "compliance", label: "Statutory Compliance Vault (EPF/ESIC)", icon: FileText },
            { id: "slaTracker", label: "2-Hour SLA Relief Monitor", icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-3 px-5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-[#C5A880] text-zinc-950 shadow-md"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Live Biometric Attendance */}
        {activeTab === "attendance" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl"
          >
            <div className="flex flex-wrap justify-between items-center gap-4 pb-4 border-b border-zinc-800">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Users className="text-[#C5A880]" size={20} />
                  Live Guard Attendance &amp; Geo-Fenced Check-In Feed
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  All posts are verified through fingerprint biometric scanners and GPS coordinates within 15 meters of facility perimeter gates.
                </p>
              </div>
              <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold rounded-full flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                100% Shift Strength Present
              </span>
            </div>

            {/* Attendance Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-400 text-[11px] uppercase">
                    <th className="pb-3 font-semibold">Post / Sector</th>
                    <th className="pb-3 font-semibold">Guard Name &amp; ID</th>
                    <th className="pb-3 font-semibold">Shift Timing</th>
                    <th className="pb-3 font-semibold">Check-In</th>
                    <th className="pb-3 font-semibold">Verification Method</th>
                    <th className="pb-3 font-semibold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {SAMPLE_ATTENDANCE.map((row) => (
                    <tr key={row.id} className="hover:bg-zinc-800/30 transition-colors">
                      <td className="py-4 font-sans font-bold text-white">
                        {row.postName}
                        <span className="block text-[11px] font-mono text-zinc-500 font-normal">{row.location}</span>
                      </td>
                      <td className="py-4">
                        <span className="font-bold text-zinc-200">{row.guardName}</span>
                        <span className="block text-[10px] text-[#C5A880]">{row.badgeId}</span>
                      </td>
                      <td className="py-4 text-zinc-300">{row.shift}</td>
                      <td className="py-4 font-bold text-emerald-400">{row.checkInTime}</td>
                      <td className="py-4 text-zinc-400 font-sans text-xs">{row.verificationMethod}</td>
                      <td className="py-4 text-right">
                        <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 rounded-md font-bold text-[10px]">
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Tab 2: 2:00 AM Night Supervisor Audits */}
        {activeTab === "nightAudits" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl"
          >
            <div className="flex flex-wrap justify-between items-center gap-4 pb-4 border-b border-zinc-800">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Clock className="text-[#C5A880]" size={20} />
                  2:00 AM Unannounced Supervisor Night Audits
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Roving patrol vans conduct randomized 2:00 AM surprise spot-checks to verify guard alertness, gate log accuracy, and torchlight readiness.
                </p>
              </div>
              <span className="px-3 py-1 bg-[#C5A880]/10 border border-[#C5A880]/30 text-[#C5A880] text-xs font-mono font-bold rounded-full">
                Zero Deviations Reported
              </span>
            </div>

            <div className="space-y-4">
              {SAMPLE_NIGHT_AUDITS.map((audit) => (
                <div key={audit.id} className="bg-zinc-800/50 border border-zinc-700/60 rounded-2xl p-5 space-y-3">
                  <div className="flex flex-wrap justify-between items-start gap-2">
                    <div>
                      <span className="text-xs font-bold font-mono text-[#C5A880]">{audit.timestamp} • Patrol Unit: {audit.patrolVanId}</span>
                      <h4 className="text-base font-bold text-white mt-0.5">{audit.facility}</h4>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 rounded-md font-mono text-xs font-bold">
                      {audit.status}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                    {audit.observation}
                  </p>
                  <div className="text-[11px] font-mono text-zinc-500 pt-2 border-t border-zinc-700/40">
                    Inspecting Officer: <span className="text-zinc-300 font-bold">{audit.supervisorName}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tab 3: Statutory Compliance Vault */}
        {activeTab === "compliance" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl"
          >
            <div className="flex flex-wrap justify-between items-center gap-4 pb-4 border-b border-zinc-800">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <FileText className="text-[#C5A880]" size={20} />
                  Statutory Compliance Vault &amp; ECR Challan Repository
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  100% transparent statutory filings. Download official government challans verifying that all deployed personnel have timely EPF, ESIC, and GST remittances.
                </p>
              </div>
              <span className="px-3 py-1 bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono font-bold rounded-full">
                Zero Labour Liability
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SAMPLE_COMPLIANCE_DOCS.map((doc) => (
                <div key={doc.id} className="bg-zinc-800/50 border border-zinc-700/60 rounded-2xl p-5 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-[#C5A880] uppercase block">{doc.month}</span>
                    <h4 className="text-sm font-bold text-white">{doc.docType}</h4>
                    <span className="text-xs text-zinc-400 block font-mono">Filed on: {doc.filingDate} • {doc.fileSize}</span>
                  </div>

                  <button
                    onClick={() => alert(`In live client portal, this downloads the official verified government ECR challan for ${doc.month}.`)}
                    className="p-3 bg-zinc-700 hover:bg-[#C5A880] hover:text-zinc-950 text-white rounded-xl transition-all cursor-pointer flex-shrink-0"
                    title="Download Official Return"
                  >
                    <Download size={16} />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tab 4: 2-Hour SLA Relief Monitor */}
        {activeTab === "slaTracker" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl"
          >
            <div className="flex flex-wrap justify-between items-center gap-4 pb-4 border-b border-zinc-800">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="text-[#C5A880]" size={20} />
                  2-Hour Relief Replacement SLA Protocol
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  How JSM guarantees zero unattended guard posts across Tamil Nadu through dedicated roving reserve units.
                </p>
              </div>
              <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold rounded-full">
                Contractual Guarantee
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              <div className="p-5 rounded-2xl bg-zinc-800/40 border border-zinc-700/50 space-y-2">
                <span className="font-mono text-[10px] text-[#C5A880] uppercase font-bold">Step 1: Automated Alert</span>
                <h4 className="text-sm font-bold text-white">Biometric Absence Trigger</h4>
                <p className="text-zinc-400 leading-relaxed">
                  If a guard does not biometric-verify 15 minutes before shift start, regional dispatch automatically alerts the nearest roving supervisor.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-800/40 border border-zinc-700/50 space-y-2">
                <span className="font-mono text-[10px] text-[#C5A880] uppercase font-bold">Step 2: Reserve Mobilization</span>
                <h4 className="text-sm font-bold text-white">Roving Guard Dispatch</h4>
                <p className="text-zinc-400 leading-relaxed">
                  A trained reserve guard in full PSARA uniform is dispatched via local patrol van, arriving on-site in under 45–75 minutes.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-800/40 border border-zinc-700/50 space-y-2">
                <span className="font-mono text-[10px] text-[#C5A880] uppercase font-bold">Step 3: Client Notification</span>
                <h4 className="text-sm font-bold text-white">Digital Handover Log</h4>
                <p className="text-zinc-400 leading-relaxed">
                  The facility head receives an instant SMS/email confirmation of the relief replacement with guard verification ID badge.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Onboarding Callout */}
        <div className="mt-12 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 border-2 border-[#C5A880]/40 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-black text-white">
              Want This Live Command Visibility for Your Facility?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-xl">
              Switch your factory, hospital, or commercial complex to JSM Integrated Services and receive dedicated portal credentials on day one.
            </p>
          </div>

          <Link href="/get-quote">
            <Button className="py-6 px-8 bg-[#C5A880] hover:bg-[#b09268] text-zinc-950 font-black text-xs uppercase tracking-wider rounded-xl cursor-pointer">
              <span>Request Onboarding Quote</span>
              <ArrowRight size={14} className="ml-1.5" />
            </Button>
          </Link>
        </div>

      </div>
    </main>
  );
}
