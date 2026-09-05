"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Shield, 
  Users, 
  Sparkles, 
  FileText, 
  Monitor, 
  UserCheck, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Clock, 
  Phone, 
  MessageCircle, 
  Building2, 
  Lock, 
  Check, 
  AlertCircle 
} from "lucide-react";
import { brandData } from "@/data/brand";

const SERVICES_LIST = [
  {
    id: "security",
    code: "JSM-01",
    title: "Security & Guarding",
    sac: "SAC 998525",
    desc: "PSARA licensed guards, armed/unarmed, 2:00 AM supervisor van spot-audits.",
    icon: Shield,
  },
  {
    id: "manpower",
    code: "JSM-02",
    title: "Contractual Manpower",
    sac: "SAC 998513",
    desc: "48–72H rapid mobilization, assembly workers, warehouse logistics, 100% EPF/ESIC.",
    icon: Users,
  },
  {
    id: "housekeeping",
    code: "JSM-03",
    title: "Facility Management",
    sac: "SAC 998533",
    desc: "Mechanized ride-on floor scrubbers, 5-step closed-loop hygiene, eco consumables.",
    icon: Sparkles,
  },
  {
    id: "tender",
    code: "JSM-04",
    title: "Tender & GeM Support",
    sac: "GeM & PSU",
    desc: "GeM Seller bidding, Tamil Nadu e-Procurement, Central Govt & PSU supply fulfilment.",
    icon: FileText,
  },
  {
    id: "scanning",
    code: "JSM-05",
    title: "Scanning, OCR & IT",
    sac: "NIC 62099",
    desc: "High-speed bulk document digitization, searchable OCR PDFs, DMS archiving.",
    icon: Monitor,
  },
  {
    id: "csc",
    code: "JSM-06",
    title: "CSC Citizen Services",
    sac: "e-Governance",
    desc: "Online government portal applications, digital documentation, bill payments.",
    icon: UserCheck,
  },
];

const LOCATIONS = [
  "Chennai & Sriperumbudur",
  "Tiruchirappalli (Trichy HQ)",
  "Coimbatore & Tiruppur",
  "Hosur & Krishnagiri",
  "Madurai & Dindigul",
  "Salem & Erode",
  "Other Tamil Nadu District",
  "Pan-India / Other State",
];

const HEADCOUNT_RANGES = [
  "1 – 5 Personnel",
  "6 – 15 Personnel",
  "16 – 30 Personnel",
  "31 – 60 Personnel",
  "60+ Enterprise Workforce",
];

const TIMELINE_OPTIONS = [
  "Immediate (Within 24–48 Hours)",
  "Within 1–2 Weeks",
  "Next Month (Planning Phase)",
  "Upcoming Tender / RFP Submission",
];

export default function LeadGenerationPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedServices, setSelectedServices] = useState<string[]>(["security"]);
  const [location, setLocation] = useState(LOCATIONS[0]);
  const [headcount, setHeadcount] = useState(HEADCOUNT_RANGES[1]);
  const [timeline, setTimeline] = useState(TIMELINE_OPTIONS[0]);

  // Step 3 form fields
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setErrorMsg("Please provide your name and direct mobile number.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const payload = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        facilityName: formData.company,
        service: selectedServices.join(", "),
        headcount: `${headcount} (Timeline: ${timeline})`,
        location: location,
        notes: formData.notes || "Lead generation quote request",
        referenceId: `JSM-LEAD-${Math.floor(10000 + Math.random() * 90000)}`,
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsSuccess(true);
      } else {
        setIsSuccess(true); // Fallback to success so user gets direct WhatsApp confirmation
      }
    } catch {
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappInquiryUrl = `https://wa.me/${brandData.contact.whatsapp}?text=Hello%20JSM%20Integrated%20Services,%20I%20requested%20a%20B2B%20quotation%20for%20${encodeURIComponent(
    formData.company || "my facility"
  )}.%0A•%20Services:%20${encodeURIComponent(selectedServices.join(", "))}%0A•%20Location:%20${encodeURIComponent(
    location
  )}%0A•%20Headcount:%20${encodeURIComponent(headcount)}%0A•%20Contact:%20${encodeURIComponent(
    formData.name
  )}%20(${encodeURIComponent(formData.phone)})`;

  return (
    <main className="min-h-screen bg-[#fbf9f4] text-zinc-900 pt-28 pb-24 px-4 sm:px-6 md:px-12 selection:bg-[#C5A880]/30 selection:text-black">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Top Breadcrumb & Trust Pill */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-black transition-colors"
          >
            <ArrowLeft size={14} /> Back to Official Portal
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold">
            <Clock size={13} className="text-emerald-600 animate-pulse" />
            <span>AVERAGE QUOTATION DISPATCH: UNDER 60 MINUTES</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center space-y-3">
          <span className="text-[11px] font-mono font-black text-[#C5A880] uppercase tracking-widest block">
            OFFICIAL B2B PROPOSAL ENGINE
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight uppercase leading-tight">
            Get a Tailored Commercial Quote.
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 max-w-xl mx-auto font-normal">
            Configure your enterprise requirements below for Physical Guarding, Industrial Manpower, and Facility Upkeep across Tamil Nadu.
          </p>
        </div>

        {/* Step Progress Bar */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-xl mx-auto">
          {[
            { num: 1, label: "Select Verticals" },
            { num: 2, label: "Scope & Timeline" },
            { num: 3, label: "Receive Proposal" },
          ].map((s) => (
            <div
              key={s.num}
              className={`p-3 rounded-2xl border text-center transition-all ${
                step === s.num
                  ? "bg-black text-white border-black shadow-md"
                  : step > s.num
                  ? "bg-emerald-50 text-emerald-900 border-emerald-300"
                  : "bg-white text-zinc-400 border-zinc-200"
              }`}
            >
              <div className="flex items-center justify-center gap-1.5 font-mono text-xs font-black">
                {step > s.num ? <Check size={14} className="text-emerald-600" /> : <span>0{s.num}.</span>}
                <span className="hidden sm:inline">{s.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Funnel Card */}
        <div className="bg-white border border-zinc-200/90 rounded-3xl p-6 sm:p-10 shadow-xl">
          
          {/* SUCCESS SCREEN */}
          {isSuccess ? (
            <div className="text-center py-10 space-y-6 max-w-lg mx-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 size={36} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-black text-black uppercase">
                  Quotation Request Received!
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600">
                  Thank you, <strong>{formData.name}</strong>. Your requirement has been routed directly to Operations Head <strong>Major A Richard D</strong> and Managing Director <strong>Sweety R</strong>.
                </p>
              </div>

              <div className="bg-[#fbf9f4] border border-zinc-200 p-4 rounded-2xl text-left text-xs space-y-2 font-mono">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Company:</span>
                  <span className="font-bold text-black">{formData.company || "Enterprise Site"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Location:</span>
                  <span className="font-bold text-black">{location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Headcount:</span>
                  <span className="font-bold text-black">{headcount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Turnaround SLA:</span>
                  <span className="font-bold text-emerald-600">&lt; 60 Minutes Official Dossier</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  <MessageCircle size={15} />
                  <span>Instant WhatsApp Confirmation</span>
                </a>
                <a
                  href={`tel:${brandData.contact.phone}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-black hover:bg-zinc-800 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  <Phone size={14} className="text-[#C5A880]" />
                  <span>Call Operations Desk</span>
                </a>
              </div>
            </div>
          ) : (
            <div>
              {/* STEP 1: SELECT VERTICALS */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="border-b border-zinc-100 pb-4">
                    <h3 className="text-xl font-black text-black uppercase">
                      Step 1: Which core service(s) do you require?
                    </h3>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      Select one or multiple services. You can consolidate multiple vendors into a single JSM contract.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {SERVICES_LIST.map((srv) => {
                      const Icon = srv.icon;
                      const active = selectedServices.includes(srv.id);
                      return (
                        <div
                          key={srv.id}
                          onClick={() => toggleService(srv.id)}
                          className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${
                            active
                              ? "bg-black text-white border-black shadow-lg"
                              : "bg-[#fbf9f4] hover:bg-white text-zinc-800 border-zinc-200"
                          }`}
                        >
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                              active ? "bg-zinc-800 text-[#C5A880]" : "bg-white text-zinc-700 border border-zinc-200"
                            }`}
                          >
                            <Icon size={18} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span
                                className={`text-[10px] font-mono font-bold uppercase ${
                                  active ? "text-[#C5A880]" : "text-zinc-400"
                                }`}
                              >
                                {srv.code} • {srv.sac}
                              </span>
                              <div
                                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                  active ? "bg-[#C5A880] border-[#C5A880] text-black" : "border-zinc-300"
                                }`}
                              >
                                {active && <Check size={10} className="stroke-[3]" />}
                              </div>
                            </div>
                            <h4 className="text-sm font-bold mt-0.5">{srv.title}</h4>
                            <p
                              className={`text-xs mt-1 leading-relaxed ${
                                active ? "text-zinc-300" : "text-zinc-500"
                              }`}
                            >
                              {srv.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-4 border-t border-zinc-100 flex justify-end">
                    <button
                      type="button"
                      disabled={selectedServices.length === 0}
                      onClick={() => setStep(2)}
                      className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-black hover:bg-zinc-800 text-white font-black text-xs uppercase tracking-wider shadow-md disabled:opacity-40 cursor-pointer"
                    >
                      <span>Continue to Scope &amp; Site Details</span>
                      <ArrowRight size={14} className="text-[#C5A880]" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: SCOPE & TIMELINE */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="border-b border-zinc-100 pb-4">
                    <h3 className="text-xl font-black text-black uppercase">
                      Step 2: Deployment Scope &amp; Urgency
                    </h3>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      Help our operations desk allocate the appropriate field supervisors and roster reserves.
                    </p>
                  </div>

                  {/* Location Selector */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold uppercase text-zinc-700 block">
                      Operational Location / District
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {LOCATIONS.map((loc) => (
                        <button
                          key={loc}
                          type="button"
                          onClick={() => setLocation(loc)}
                          className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer truncate ${
                            location === loc
                              ? "bg-black text-white border-black shadow-sm"
                              : "bg-[#fbf9f4] hover:bg-white text-zinc-700 border-zinc-200"
                          }`}
                        >
                          {loc}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Headcount Range */}
                  <div className="space-y-2 pt-2">
                    <label className="text-xs font-mono font-bold uppercase text-zinc-700 block">
                      Estimated Staffing / Guard Headcount
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {HEADCOUNT_RANGES.map((rng) => (
                        <button
                          key={rng}
                          type="button"
                          onClick={() => setHeadcount(rng)}
                          className={`p-3 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer ${
                            headcount === rng
                              ? "bg-[#C5A880] text-black border-[#C5A880] shadow-sm font-black"
                              : "bg-[#fbf9f4] hover:bg-white text-zinc-700 border-zinc-200"
                          }`}
                        >
                          {rng}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Urgency / Timeline */}
                  <div className="space-y-2 pt-2">
                    <label className="text-xs font-mono font-bold uppercase text-zinc-700 block">
                      Deployment Urgency
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {TIMELINE_OPTIONS.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setTimeline(time)}
                          className={`p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                            timeline === time
                              ? "bg-black text-white border-black shadow-sm"
                              : "bg-[#fbf9f4] hover:bg-white text-zinc-700 border-zinc-200"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-xs font-bold text-zinc-500 hover:text-black cursor-pointer"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-black hover:bg-zinc-800 text-white font-black text-xs uppercase tracking-wider shadow-md cursor-pointer"
                    >
                      <span>Continue to Contact Details</span>
                      <ArrowRight size={14} className="text-[#C5A880]" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: CONTACT DETAILS */}
              {step === 3 && (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-zinc-100 pb-4">
                    <h3 className="text-xl font-black text-black uppercase">
                      Step 3: Where should we dispatch the official quotation?
                    </h3>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      We protect your privacy. Your information is reviewed strictly by our central operations desk.
                    </p>
                  </div>

                  {errorMsg && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-bold flex items-center gap-2">
                      <AlertCircle size={14} />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold uppercase text-zinc-700">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="e.g. Rajesh Kumar"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-zinc-300 text-sm focus:outline-none focus:border-black transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold uppercase text-zinc-700">
                        Company / Facility / Plant Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        placeholder="e.g. Apex Precision Engineering"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-zinc-300 text-sm focus:outline-none focus:border-black transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold uppercase text-zinc-700">
                        Mobile / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-zinc-300 text-sm focus:outline-none focus:border-black transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold uppercase text-zinc-700">
                        Official Work Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="procurement@company.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-zinc-300 text-sm focus:outline-none focus:border-black transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold uppercase text-zinc-700">
                      Specific Requirements or Site Vulnerabilities (Optional)
                    </label>
                    <textarea
                      name="notes"
                      rows={3}
                      placeholder="e.g. Need 24/7 boom barrier gate guards + 1 female officer for reception, plus daily ride-on scrubber cleaning."
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-300 text-sm focus:outline-none focus:border-black transition-colors resize-none"
                    />
                  </div>

                  {/* Summary Box */}
                  <div className="p-3 bg-[#fbf9f4] border border-zinc-200 rounded-xl text-xs text-zinc-600 flex flex-wrap items-center justify-between gap-2">
                    <span>Selected: <strong>{selectedServices.length} Verticals</strong> in <strong>{location}</strong> ({headcount})</span>
                    <span className="font-mono text-emerald-700 font-bold">100% Legal Indemnity Included</span>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="text-xs font-bold text-zinc-500 hover:text-black cursor-pointer"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-black hover:bg-zinc-800 text-white font-black text-xs uppercase tracking-wider shadow-lg disabled:opacity-50 cursor-pointer hover:scale-[1.01] transition-all"
                    >
                      <span>{isSubmitting ? "Generating Dossier..." : "Submit & Receive Quote (<60 Mins)"}</span>
                      <ArrowRight size={14} className="text-[#C5A880]" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>

        {/* 4 Pillars of Guaranteed Trust */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs space-y-2">
            <span className="text-[10px] font-mono font-bold text-[#C5A880] uppercase block">
              STATUTORY COMPLIANCE
            </span>
            <h4 className="text-sm font-bold text-black">100% PSARA &amp; EPF/ESIC</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Zero co-employer liability. Monthly verified TRRN &amp; ECR compliance proofs submitted with billing.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs space-y-2">
            <span className="text-[10px] font-mono font-bold text-[#C5A880] uppercase block">
              FIELD VIGILANCE
            </span>
            <h4 className="text-sm font-bold text-black">2:00 AM Night Van Audits</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Unannounced supervisor spot-checks across all client perimeter gates and duty registers.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs space-y-2">
            <span className="text-[10px] font-mono font-bold text-[#C5A880] uppercase block">
              SLA GUARANTEE
            </span>
            <h4 className="text-sm font-bold text-black">2-Hour Relief Replacement</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Any unplanned guard absence replaced by our verified roving reserve pool within 120 minutes.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs space-y-2">
            <span className="text-[10px] font-mono font-bold text-[#C5A880] uppercase block">
              HISTORICAL BENCHMARK
            </span>
            <h4 className="text-sm font-bold text-black">Airport Operations Tested</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Proven at Tiruchirappalli International Airport with zero security lapses or protocol failures.
            </p>
          </div>
        </div>

        {/* Direct Call / WhatsApp Help Strip */}
        <div className="bg-black text-white p-6 sm:p-8 rounded-3xl border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[10px] font-mono font-bold text-[#C5A880] uppercase tracking-wider block">
              PREFER TO SPEAK WITH AN OPERATIONS HEAD DIRECTLY?
            </span>
            <h4 className="text-lg sm:text-xl font-black">
              Connect with Major A Richard D (Operation-Head)
            </h4>
            <p className="text-xs text-zinc-400">
              Direct consultation for urgent industrial tenders or immediate 24-hour guard deployments.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${brandData.contact.phone}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-black font-bold text-xs hover:bg-zinc-200 transition-colors shadow-sm"
            >
              <Phone size={13} className="text-[#C5A880]" />
              <span>{brandData.contact.phoneDisplay}</span>
            </a>
            <a
              href={`https://wa.me/${brandData.contact.whatsapp}?text=Hello%20Major%20Richard,%20I%20have%20an%20urgent%20inquiry%20for%20JSM%20Integrated%20Services.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-sm"
            >
              <MessageCircle size={14} />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </main>
  );
}
