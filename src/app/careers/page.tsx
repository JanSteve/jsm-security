"use client";

import React, { useState } from "react";
import { openRoles, inductionPhilosophy, careerProgressionSteps } from "@/data/careers";
import { brandData } from "@/data/brand";
import Link from "next/link";
import { 
  ArrowRight, 
  CheckCircle2, 
  Award, 
  Users, 
  Briefcase, 
  MapPin, 
  Clock, 
  Send, 
  ShieldCheck, 
  Download, 
  FileText,
  Phone,
  Mail,
  Check
} from "lucide-react";

const recruitmentTracks = [
  {
    title: "Commissioned Officers Track",
    cadre: "Army, Navy & Air Force Officers",
    roles: "Chief Security Officer, Head of Operations, Regional Command Director",
    highlights: [
      "Enterprise security architecture and risk assessment",
      "Direction of multi-location industrial deployments",
      "Executive compensation and direct client interface",
      "DGR empanelment alignment"
    ],
    form: "Form-A-Officer-Recruitment.docx",
    formCode: "FORM-A (.docx)",
    badge: "Executive Leadership"
  },
  {
    title: "JCO & Non-Commissioned Officers",
    cadre: "Subedar Major, Subedar, Naib Subedar, Havildar",
    roles: "Field Operations Supervisor, Mobile Van Patrol Lead",
    highlights: [
      "Shift muster supervision and daily guard roll calls",
      "2:00 AM mobile patrol van spot-inspections",
      "Guaranteed on-time salary with 100% EPF & ESIC",
      "Fast-track career progression to Operations Coordinator"
    ],
    form: "Form-B-JCO-Application.docx",
    formCode: "FORM-B (.docx)",
    badge: "Field Supervisory"
  },
  {
    title: "Ex-Servicemen & Private Guards",
    cadre: "Male & Female Security Marshals & Jawans",
    roles: "Gate Access Control, Visitor Logging, Asset Protection",
    highlights: [
      "Mandatory 5-day pre-deployment induction training",
      "Full company-provided uniform and safety equipment",
      "Strict shift punctuality and reliable attendance",
      "Guaranteed on-time monthly salary disbursement"
    ],
    form: "Form-ESM-1-Ex-Servicemen.docx",
    formCode: "FORM-ESM-1 (.docx)",
    badge: "Guard Platoon"
  },
  {
    title: "Corporate & Industrial Staffing",
    cadre: "Skilled Technical Trades, Housekeeping & Office Support",
    roles: "CNC Operators, Line Assemblers, Facility Marshals",
    highlights: [
      "Verified statutory wage sheets with monthly ECR proof",
      "Clean corporate and factory SEZ working environments",
      "Rapid batch mobilization (48 to 72 hours)",
      "Skills development and safe work conditions"
    ],
    form: "Form-SL-1-Skilled-Labor.docx",
    formCode: "FORM-SL-1 (.docx)",
    badge: "Workforce Staffing"
  }
];

export default function CareersPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    track: "Security Guard / Supervisor",
    experience: "",
    location: "Trichy",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-white text-[#14181F] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Editorial Page Header */}
        <section className="py-8 sm:py-12 border-b border-[#E7E5E0]">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B3D2E]/8 text-[#0B3D2E] text-xs font-semibold">
              <Users size={14} />
              <span>Recruitment &amp; Human Capital</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#14181F] font-normal tracking-tight">
              Careers &amp; Workforce Induction
            </h1>
            <p className="text-base sm:text-lg text-[#5A6578] leading-relaxed">
              Join a disciplined, values-driven organization. We offer structured career progression, on-time salary guarantees, 100% EPF/ESIC coverage, and professional training.
            </p>
          </div>
        </section>

        {/* 4 Distinct Recruitment Tracks */}
        <section className="space-y-8 border-b border-[#E7E5E0] pb-16">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0B3D2E]">
              Dedicated Cadres
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-[#14181F] font-normal tracking-tight">
              Four Specialized Career Streams
            </h2>
            <p className="text-sm text-[#5A6578]">
              Select the appropriate track corresponding to your background and experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recruitmentTracks.map((trk, idx) => (
              <div
                key={idx}
                className="p-7 rounded-xl border border-[#E7E5E0] bg-[#F8F9FA]/60 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-[#0B3D2E] bg-[#0B3D2E]/8 px-2.5 py-1 rounded">
                      {trk.badge}
                    </span>
                    <span className="text-[11px] font-mono text-[#5A6578]">
                      {trk.cadre}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-[#14181F]">
                      {trk.title}
                    </h3>
                    <p className="text-xs font-medium text-[#0B3D2E]">
                      {trk.roles}
                    </p>
                  </div>

                  <ul className="space-y-2 text-xs text-[#4A5568] pt-2 border-t border-[#E7E5E0]/60">
                    {trk.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check size={14} className="text-[#0B3D2E] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#E7E5E0]">
                  <a
                    href={`/downloads/${trk.form}`}
                    download
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B3D2E] hover:underline"
                  >
                    <Download size={13} />
                    <span>Download Application Dossier: {trk.formCode}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5-Day Induction Philosophy */}
        <section className="space-y-8 border-b border-[#E7E5E0] pb-16">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0B3D2E]">
              Training Standard
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-[#14181F] font-normal tracking-tight">
              The 5-Day Pre-Deployment Syllabus
            </h2>
            <p className="text-sm text-[#5A6578]">
              Every recruit must successfully pass our structured training syllabus before entering client premises.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {inductionPhilosophy.map((day, idx) => (
              <div
                key={idx}
                className="p-5 rounded-lg border border-[#E7E5E0] bg-white space-y-3"
              >
                <span className="text-xs font-mono font-bold text-[#0B3D2E] bg-[#0B3D2E]/8 px-2 py-0.5 rounded block w-fit">
                  {day.day}
                </span>
                <h3 className="text-sm font-semibold text-[#14181F] leading-snug">
                  {day.title}
                </h3>
                <p className="text-[11px] text-[#5A6578] leading-relaxed">
                  {day.focus}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Live Vacancies List */}
        <section className="space-y-8 border-b border-[#E7E5E0] pb-16">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0B3D2E]">
              Active Openings
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-[#14181F] font-normal tracking-tight">
              Current Open Postings
            </h2>
          </div>

          <div className="space-y-4">
            {openRoles.map((role) => (
              <div
                key={role.id}
                className="p-6 rounded-xl border border-[#E7E5E0] bg-white hover:border-[#0B3D2E]/40 transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base font-semibold text-[#14181F]">
                      {role.title}
                    </h3>
                    <p className="text-xs text-[#0B3D2E] font-medium">
                      {role.department} &bull; {role.type}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[#5A6578] flex items-center gap-1">
                    <MapPin size={13} />
                    {role.location}
                  </span>
                </div>

                <p className="text-xs text-[#5A6578] leading-relaxed">
                  {role.description}
                </p>

                <div className="pt-2 flex items-center justify-between text-xs border-t border-[#E7E5E0]/60">
                  <span className="text-[#5A6578]">
                    <strong>Experience:</strong> {role.experience}
                  </span>
                  <a
                    href="#apply"
                    className="text-[#0B3D2E] font-semibold hover:underline inline-flex items-center gap-1"
                  >
                    <span>Apply for this role</span>
                    <ArrowRight size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Direct Application Form */}
        <section id="apply" className="max-w-3xl mx-auto p-8 sm:p-10 rounded-xl bg-[#F8F9FA] border border-[#E7E5E0] space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="font-display text-2xl sm:text-3xl text-[#14181F] font-normal">
              Submit Candidate Application
            </h2>
            <p className="text-xs sm:text-sm text-[#5A6578]">
              Our recruitment team in Trichy will review your profile and contact you within 48 hours.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 rounded-lg bg-[#0B3D2E]/10 border border-[#0B3D2E]/30 text-center space-y-2">
              <CheckCircle2 size={28} className="text-[#0B3D2E] mx-auto" />
              <h3 className="text-base font-semibold text-[#14181F]">Application Received</h3>
              <p className="text-xs text-[#5A6578]">
                Thank you for applying to JSM Integrated Services. Our HR desk will call you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1 text-left">
                  <label className="text-xs font-semibold text-[#14181F]">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Subedar R. Kumar"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E7E5E0] bg-white text-xs text-[#14181F] focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]"
                  />
                </div>

                <div className="space-y-1 text-left">
                  <label className="text-xs font-semibold text-[#14181F]">Phone Number (WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E7E5E0] bg-white text-xs text-[#14181F] focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1 text-left">
                  <label className="text-xs font-semibold text-[#14181F]">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="candidate@example.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E7E5E0] bg-white text-xs text-[#14181F] focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]"
                  />
                </div>

                <div className="space-y-1 text-left">
                  <label className="text-xs font-semibold text-[#14181F]">Track Applying For *</label>
                  <select
                    value={formData.track}
                    onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E7E5E0] bg-white text-xs text-[#14181F] focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]"
                  >
                    <option>Commissioned Officer Cadre</option>
                    <option>JCO / Supervisor Field Role</option>
                    <option>Ex-Servicemen Guard / Private Guard</option>
                    <option>Corporate Staffing / Industrial Labor</option>
                    <option>Housekeeping &amp; Facility Staff</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1 text-left">
                <label className="text-xs font-semibold text-[#14181F]">Brief Experience Summary</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Mention your military unit/years of service, previous security/facility experience, or technical trade..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#E7E5E0] bg-white text-xs text-[#14181F] focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-lg bg-[#0B3D2E] hover:bg-[#082C21] text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs"
              >
                Submit Application
              </button>
            </form>
          )}

          <div className="pt-2 text-center text-xs text-[#5A6578]">
            <span>Prefer WhatsApp? </span>
            <a
              href="https://wa.me/919080863448?text=Hello%20JSM%20Recruitment,%20I%20wish%20to%20apply%20for%20a%20position."
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0B3D2E] font-semibold hover:underline"
            >
              Message our HR desk directly (+91 90808 63448)
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
