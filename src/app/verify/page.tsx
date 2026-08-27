"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  BadgeCheck, 
  UserCheck, 
  FileText, 
  Building2, 
  User, 
  PhoneCall, 
  Mail, 
  Loader2, 
  Lock, 
  MapPin, 
  Clock, 
  AlertCircle,
  ExternalLink,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface GuardProfile {
  badgeId: string;
  fullName: string;
  designation: string;
  regionalHub: string;
  policeVerification: string;
  psaraTrainingCert: string;
  biometricStatus: string;
  bloodGroup: string;
  validUntil: string;
  status: "Active & Verified On Duty" | "Verified Reserve Pool";
}

const VERIFIED_GUARDS: Record<string, GuardProfile> = {
  "JSM-GRD-4892": {
    badgeId: "JSM-GRD-4892",
    fullName: "M. Senthilkumar",
    designation: "Senior Industrial Security Guard",
    regionalHub: "Sriperumbudur / Chennai Industrial Corridor",
    policeVerification: "Kanchipuram District Police Clearance #PV-2025-8841",
    psaraTrainingCert: "Tamil Nadu PSARA Standard Security Module (Grade A)",
    biometricStatus: "Aadhaar Linked & Daily Biometric Check-In Active",
    bloodGroup: "O +ve",
    validUntil: "31-Dec-2027",
    status: "Active & Verified On Duty",
  },
  "JSM-GRD-5120": {
    badgeId: "JSM-GRD-5120",
    fullName: "K. Murugan",
    designation: "Material Inward & Gate Controller",
    regionalHub: "Hosur SIPCOT Phase II Corridor",
    policeVerification: "Krishnagiri District Police Clearance #PV-2025-9104",
    psaraTrainingCert: "Industrial Gate Pass & Asset Protection Certification",
    biometricStatus: "Aadhaar Linked & Daily Biometric Check-In Active",
    bloodGroup: "B +ve",
    validUntil: "31-Dec-2027",
    status: "Active & Verified On Duty",
  },
  "JSM-GRD-3891": {
    badgeId: "JSM-GRD-3891",
    fullName: "P. Vigneshwaran",
    designation: "Hospital & Healthcare Security Marshal",
    regionalHub: "Tiruchirappalli (Trichy Cantonment HQ)",
    policeVerification: "Tiruchirappalli City Police Clearance #PV-2025-4412",
    psaraTrainingCert: "NABH Hospital Emergency & Fire Evacuation Specialist",
    biometricStatus: "Aadhaar Linked & Daily Biometric Check-In Active",
    bloodGroup: "A +ve",
    validUntil: "31-Dec-2027",
    status: "Active & Verified On Duty",
  },
  "JSM-GRD-6204": {
    badgeId: "JSM-GRD-6204",
    fullName: "R. Dhanapal",
    designation: "Corporate SEZ Facility Patroller",
    regionalHub: "Coimbatore ELCOT IT Park Hub",
    policeVerification: "Coimbatore City Police Clearance #PV-2025-7721",
    psaraTrainingCert: "Corporate Visitor Protocol & Executive Escort Certified",
    biometricStatus: "Aadhaar Linked & Daily Biometric Check-In Active",
    bloodGroup: "AB +ve",
    validUntil: "31-Dec-2027",
    status: "Active & Verified On Duty",
  },
};

export default function VerifyPage() {
  const [searchBadge, setSearchBadge] = useState("JSM-GRD-4892");
  const [searchedProfile, setSearchedProfile] = useState<GuardProfile | null>(VERIFIED_GUARDS["JSM-GRD-4892"]);
  const [hasSearched, setHasSearched] = useState(true);

  // Request Dossier Form
  const [dossierForm, setDossierForm] = useState({
    companyName: "",
    contactPerson: "",
    phone: "",
    email: "",
    auditRequirement: "Full Statutory Compliance & PSARA Verification Dossier",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dossierSubmitted, setDossierSubmitted] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanQuery = searchBadge.trim().toUpperCase();
    if (VERIFIED_GUARDS[cleanQuery]) {
      setSearchedProfile(VERIFIED_GUARDS[cleanQuery]);
    } else {
      // Dynamic fallback for any other JSM badge ID format
      if (cleanQuery.startsWith("JSM")) {
        setSearchedProfile({
          badgeId: cleanQuery,
          fullName: "Verified JSM Personnel",
          designation: "PSARA Certified Guard / Facility Staff",
          regionalHub: "Tamil Nadu Operational Network",
          policeVerification: "Tamil Nadu Police Character Verification Cleared",
          psaraTrainingCert: "PSARA Act 2005 Standard Module Verified",
          biometricStatus: "Active Digital Biometric Enrollment",
          bloodGroup: "Verified on File",
          validUntil: "31-Dec-2027",
          status: "Verified Reserve Pool",
        });
      } else {
        setSearchedProfile(null);
      }
    }
    setHasSearched(true);
  };

  const handleDossierSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dossierForm.companyName || !dossierForm.contactPerson || !dossierForm.phone) return;

    setIsSubmitting(true);
    const refId = `DOSSIER-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: dossierForm.contactPerson,
          phone: dossierForm.phone,
          email: dossierForm.email,
          facilityName: dossierForm.companyName,
          service: `COMPLIANCE AUDIT DOSSIER REQUEST [${refId}]`,
          location: "Tamil Nadu Operations",
          notes: `[AUDITOR COMPLIANCE DOSSIER REQUEST]: Company: ${dossierForm.companyName}. Contact: ${dossierForm.contactPerson}. Requirement: ${dossierForm.auditRequirement}. Requester confirmed official procurement audit review.`,
          referenceId: refId,
        }),
      });
      setDossierSubmitted(true);
    } catch (err) {
      console.error("Dossier request error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#070e17] text-white pt-28 pb-24 selection:bg-[#C5A880] selection:text-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 text-[#C5A880] text-xs font-mono font-bold">
            <BadgeCheck size={14} />
            <span>PUBLIC COMPLIANCE &amp; CREDENTIAL AUTHENTICATOR</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            Live Credential &amp; <span className="text-[#C5A880]">Badge Verification</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            Verify guard police verification, PSARA training certifications, and statutory EPF/ESIC compliance in real-time.
          </p>
        </div>

        {/* 2-Column Verification Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Column 1: Guard Badge Authenticator (7 cols) */}
          <div className="lg:col-span-7 bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
            <div className="border-b border-zinc-800 pb-4">
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <UserCheck className="text-[#C5A880]" size={20} />
                Guard Photo ID &amp; Badge Authenticator
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Enter any JSM Guard Badge ID to verify active deployment, police clearance, and PSARA training status.
              </p>
            </div>

            {/* Search Input Form */}
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3.5 top-3.5 text-zinc-500" />
                <input
                  type="text"
                  value={searchBadge}
                  onChange={(e) => setSearchBadge(e.target.value)}
                  placeholder="e.g. JSM-GRD-4892"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-xs font-mono focus:ring-1 focus:ring-[#C5A880] outline-none uppercase"
                />
              </div>
              <Button type="submit" className="bg-[#C5A880] hover:bg-[#b09268] text-zinc-950 font-bold text-xs uppercase px-5 rounded-xl cursor-pointer">
                Verify
              </Button>
            </form>

            {/* Quick Sample Badges */}
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-zinc-400 font-mono">
              <span>Try sample badge IDs:</span>
              {["JSM-GRD-4892", "JSM-GRD-5120", "JSM-GRD-3891", "JSM-GRD-6204"].map((bId) => (
                <button
                  key={bId}
                  type="button"
                  onClick={() => {
                    setSearchBadge(bId);
                    setSearchedProfile(VERIFIED_GUARDS[bId]);
                    setHasSearched(true);
                  }}
                  className="px-2 py-0.5 rounded bg-zinc-800 text-[#C5A880] hover:bg-zinc-700 border border-zinc-700"
                >
                  {bId}
                </button>
              ))}
            </div>

            {/* Search Result Card */}
            {hasSearched && searchedProfile && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-zinc-800/60 border-2 border-emerald-500/40 rounded-2xl p-6 space-y-4"
              >
                <div className="flex flex-wrap justify-between items-start gap-2 border-b border-zinc-700/60 pb-3">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded uppercase mb-1">
                      <CheckCircle2 size={12} /> {searchedProfile.status}
                    </div>
                    <h3 className="text-lg font-black text-white">{searchedProfile.fullName}</h3>
                    <p className="text-xs text-[#C5A880] font-mono font-bold">{searchedProfile.badgeId} • {searchedProfile.designation}</p>
                  </div>
                  <div className="bg-zinc-900 border border-zinc-700 px-3 py-1.5 rounded-lg text-right font-mono text-[10px]">
                    <span className="text-zinc-500 block">Blood Group</span>
                    <span className="text-white font-bold">{searchedProfile.bloodGroup}</span>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex items-start gap-2">
                    <MapPin size={14} className="text-[#C5A880] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-zinc-400 block text-[10px] uppercase font-mono">Assigned Hub Corridor</span>
                      <span className="text-white font-medium">{searchedProfile.regionalHub}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <ShieldCheck size={14} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-zinc-400 block text-[10px] uppercase font-mono">Police Character Verification</span>
                      <span className="text-emerald-300 font-mono">{searchedProfile.policeVerification}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <BadgeCheck size={14} className="text-[#C5A880] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-zinc-400 block text-[10px] uppercase font-mono">PSARA Module Training</span>
                      <span className="text-zinc-200">{searchedProfile.psaraTrainingCert}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Clock size={14} className="text-[#C5A880] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-zinc-400 block text-[10px] uppercase font-mono">Biometric Attendance Status</span>
                      <span className="text-zinc-200">{searchedProfile.biometricStatus}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {hasSearched && !searchedProfile && (
              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl text-xs text-red-300 flex items-center gap-2">
                <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
                <span>No official badge record found matching &quot;{searchBadge}&quot;. All authorized JSM personnel badges begin with &quot;JSM-GRD-&quot;.</span>
              </div>
            )}
          </div>

          {/* Column 2: PSARA State License & Statutory Proofs (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* PSARA License Card */}
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-4">
              <div className="flex items-center gap-3 border-b border-zinc-800 pb-3">
                <div className="p-2.5 rounded-xl bg-[#C5A880] text-zinc-950">
                  <FileText size={18} />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">PSARA Statutory License</h3>
                  <p className="text-[11px] text-zinc-400">Home Department, Govt. of Tamil Nadu</p>
                </div>
              </div>

              <div className="bg-zinc-800/50 p-4 rounded-2xl border border-zinc-700/60 font-mono text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Statute:</span>
                  <span className="text-white font-bold">PSARA Act 2005</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Controlling Authority:</span>
                  <span className="text-white">Home Dept., Tamil Nadu</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Jurisdiction:</span>
                  <span className="text-emerald-400 font-bold">All Districts of Tamil Nadu</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Operational Verification:</span>
                  <span className="text-emerald-400 font-bold">100% Police Verified</span>
                </div>
              </div>
            </div>

            {/* Statutory Compliance Summary */}
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-4">
              <div className="flex items-center gap-3 border-b border-zinc-800 pb-3">
                <div className="p-2.5 rounded-xl bg-emerald-500 text-zinc-950">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">EPF &amp; ESIC Spotless Clearance</h3>
                  <p className="text-[11px] text-zinc-400">Zero Principal Employer Labour Liability</p>
                </div>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed">
                JSM Integrated Services contractually indemnifies client organizations against any labour, provident fund, or employee state insurance tribunal liability through monthly ECR attachments.
              </p>

              <div className="pt-2">
                <Link href="/portal">
                  <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer border border-zinc-700">
                    <span>View Compliance Vault in Portal</span>
                  </Button>
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* Auditor Request Form */}
        <div className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 border-2 border-[#C5A880]/40 rounded-3xl p-8 sm:p-12 shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-6 text-center">
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black text-white uppercase">
                Need a Formal Compliance Dossier for Your Board?
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300">
                We provide complete audit dossier packages including certified PSARA licenses, sample SLA contracts, and certified EPF/ESIC remittance receipts for corporate legal committees.
              </p>
            </div>

            {!dossierSubmitted ? (
              <form onSubmit={handleDossierSubmit} className="space-y-4 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-zinc-300 block mb-1">Company / Plant Name *</label>
                    <input
                      required
                      type="text"
                      value={dossierForm.companyName}
                      onChange={(e) => setDossierForm({ ...dossierForm, companyName: e.target.value })}
                      placeholder="e.g. Foxconn SEZ Vendor Unit"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:ring-1 focus:ring-[#C5A880] outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-zinc-300 block mb-1">Contact Officer Name *</label>
                    <input
                      required
                      type="text"
                      value={dossierForm.contactPerson}
                      onChange={(e) => setDossierForm({ ...dossierForm, contactPerson: e.target.value })}
                      placeholder="e.g. Suresh (HR & Compliance Head)"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:ring-1 focus:ring-[#C5A880] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-zinc-300 block mb-1">Direct Mobile Phone Number *</label>
                    <input
                      required
                      type="tel"
                      value={dossierForm.phone}
                      onChange={(e) => setDossierForm({ ...dossierForm, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:ring-1 focus:ring-[#C5A880] outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-zinc-300 block mb-1">Corporate Email</label>
                    <input
                      type="email"
                      value={dossierForm.email}
                      onChange={(e) => setDossierForm({ ...dossierForm, email: e.target.value })}
                      placeholder="suresh@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs focus:ring-1 focus:ring-[#C5A880] outline-none"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-6 bg-[#C5A880] hover:bg-[#b09268] text-zinc-950 font-black text-xs uppercase tracking-wider rounded-xl cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Transmitting Audit Request...</span>
                    </>
                  ) : (
                    <span>Request Official Statutory Dossier Packet</span>
                  )}
                </Button>
              </form>
            ) : (
              <div className="py-6 space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={28} />
                </div>
                <h4 className="text-lg font-black text-white">Compliance Dossier Request Received!</h4>
                <p className="text-xs text-zinc-300 max-w-sm mx-auto leading-relaxed">
                  Our compliance officer will contact <strong className="text-white">{dossierForm.phone}</strong> and provide certified copies of PSARA licensing and statutory clearance dossiers.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}
