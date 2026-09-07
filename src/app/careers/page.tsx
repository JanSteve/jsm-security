"use client";

import React, { useState } from "react";
import { openRoles, inductionPhilosophy, careerProgressionSteps } from "@/data/careers";
import { brandData } from "@/data/brand";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  CheckCircle2, 
  Award, 
  Users, 
  TrendingUp, 
  Briefcase, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle, 
  Sparkles, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Download, 
  FileText 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const defenseTracks = [
  {
    title: "Commissioned Officers Track",
    cadre: "Army, Navy & Air Force Officers",
    roles: "Chief Security Officer, Head of Operations, Regional Command Director",
    highlights: [
      "Strategic security architecture & enterprise risk assessment",
      "Command and control of multi-location industrial deployments",
      "Client liaison with corporate leadership and state authorities",
      "DGR empanelment and executive compensation structure"
    ],
    form: "Form-A-Officer-Recruitment.docx",
    formCode: "FORM-A (DOCX)",
    badge: "Executive Leadership"
  },
  {
    title: "JCO & OR / Soldier Track",
    cadre: "Subedar, Naib Subedar, Havildar, Naik, Jawan",
    roles: "Security Field Supervisor, Armed Marshal, Perimeter Commander",
    highlights: [
      "Rigid shift supervision, daily roll calls and night spot-audits",
      "Arms handling protocol & civil aviation access compliance",
      "Fast-track career progression with performance incentives",
      "Guaranteed on-time payroll with 100% EPF, ESIC and gratuity"
    ],
    form: "Form-B-JCO-Application.docx",
    formCode: "FORM-B (DOCX)",
    badge: "Field Operations"
  }
];

export default function CareersPage() {
  const [selectedRole, setSelectedRole] = useState<string>("sec-guard-trichy");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    position: "Security Guard / Gate Officer",
    experience: "Fresher",
    notes: "",
    consent: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName) return;
    setFormSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-white text-[#1d1d1f] pt-52 sm:pt-60 md:pt-64 lg:pt-72 pb-24 selection:bg-[#0071e3]/15 selection:text-black">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f5f5f7] border border-black/[0.08] text-[#1d1d1f] text-xs font-semibold">
            <Sparkles size={13} className="text-[#0071e3]" />
            <span>DISCIPLINED CAREERS &bull; TAMIL NADU</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#1d1d1f] tracking-tight leading-tight">
            Build a Career with Discipline.<br />
            <span className="text-[#86868b]">Grow with JSM.</span>
          </h1>

          <p className="text-base md:text-lg text-[#86868b] font-normal max-w-2xl mx-auto leading-relaxed">
            &quot;Our people are our strength. Your first uniform should not be your final destination.&quot; Structured training, guaranteed on-time payroll, and clear promotion pathways for Ex-Servicemen and civilian professionals.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={`https://wa.me/${brandData.contact.whatsapp}?text=Hello%20JSM,%20I%20wish%20to%20apply%20for%20a%20career%20opportunity.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <MessageCircle size={14} />
              <span>Direct Apply on WhatsApp (+91 90808 63448)</span>
            </a>
            <Link
              href="/work-opportunities"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] border border-black/10 text-xs font-semibold transition-colors"
            >
              <Briefcase size={14} />
              <span>Browse All Open Roles</span>
            </Link>
          </div>
        </div>

        {/* Defense & Ex-Servicemen Dual Track (Officers vs JCO/OR) */}
        <section className="mb-20 max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
              <ShieldCheck size={14} />
              <span>DGR &amp; Armed Forces Dedicated Tracks</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1f]">
              Specialized Enrolment for Indian Armed Forces Veterans
            </h2>
            <p className="text-xs sm:text-sm text-[#6e6e73] max-w-2xl mx-auto">
              We provide honorable resettlement pathways tailored specifically to the operational rank and leadership experience of retired defense personnel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {defenseTracks.map((track, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-[#f5f5f7] border border-black/[0.08] hover:border-black/[0.18] transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-white border border-black/10 text-xs font-bold text-[#1d1d1f]">
                      {track.badge}
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-700">{track.formCode}</span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[#1d1d1f]">{track.title}</h3>
                    <p className="text-xs font-medium text-[#0071e3] mt-0.5">{track.cadre}</p>
                    <p className="text-xs text-[#86868b] mt-1 font-mono">{track.roles}</p>
                  </div>

                  <ul className="space-y-2 pt-2 border-t border-black/[0.06]">
                    {track.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-[#515154]">
                        <CheckCircle2 size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-black/[0.06] flex flex-col sm:flex-row gap-3">
                  <a
                    href={`/downloads/${track.form}`}
                    download
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white hover:bg-black text-[#1d1d1f] hover:text-white border border-black/10 text-xs font-semibold transition-all shadow-xs"
                  >
                    <Download size={14} />
                    <span>Download Application Dossier</span>
                  </a>
                  <a
                    href={`https://wa.me/${brandData.contact.whatsapp}?text=Hello%20JSM,%20I%20am%20an%20Ex-Serviceman%20applying%20for%20the%20${encodeURIComponent(track.title)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors"
                  >
                    <MessageCircle size={14} />
                    <span>WhatsApp Apply</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5-Day Induction Section */}
        <section className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0071e3]">
              Training Foundation
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#1d1d1f] tracking-tight">
              Our 5-Day Induction Curriculum
            </h2>
            <p className="text-sm text-[#86868b] font-normal">Every recruit undergoes thorough classroom and on-field training before deployment.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {inductionPhilosophy.map((day) => (
              <div
                key={day.day}
                className="bg-[#f5f5f7] border border-black/[0.06] rounded-[24px] p-5 space-y-3 flex flex-col justify-between shadow-xs"
              >
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-[#0071e3] tracking-wider uppercase">
                    {day.day}
                  </span>
                  <h3 className="text-sm font-semibold text-[#1d1d1f] leading-snug">
                    {day.title}
                  </h3>
                  <p className="text-[11px] text-[#86868b] font-normal leading-relaxed">
                    {day.focus}
                  </p>
                </div>

                <div className="pt-3 border-t border-black/[0.06] space-y-1.5">
                  {day.details.map((det, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-[10px] text-[#1d1d1f] font-normal">
                      <CheckCircle2 size={11} className="text-[#0071e3] flex-shrink-0 mt-0.5" />
                      <span>{det}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Career Progression Ladder */}
        <section className="mb-20 bg-[#f5f5f7] text-[#1d1d1f] rounded-[28px] p-8 md:p-12 max-w-5xl mx-auto border border-black/[0.08] shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-[12px] font-semibold uppercase tracking-wider text-[#0071e3]">
              Growth Blueprint
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#1d1d1f] tracking-tight">
              Your Career Progression at JSM
            </h2>
            <p className="text-sm text-[#86868b] font-normal">Promotions are based on punctuality, alertness, and client service merit.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {careerProgressionSteps.map((step, idx) => (
              <div key={idx} className="bg-white border border-black/[0.06] rounded-2xl p-5 space-y-2 shadow-sm">
                <span className="text-xs font-semibold text-[#0071e3]">{step.rank}</span>
                <h4 className="text-xs font-semibold text-[#1d1d1f]">{step.title}</h4>
                <span className="text-[11px] bg-[#f5f5f7] px-2.5 py-0.5 rounded-full text-[#86868b] inline-block font-sans">
                  {step.timeline}
                </span>
                <p className="text-[11px] text-[#86868b] leading-relaxed font-normal">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Industrial Staffing Section */}
        <section className="mb-20 max-w-5xl mx-auto bg-[#f5f5f7] text-[#1d1d1f] rounded-[28px] p-6 sm:p-10 border border-black/[0.08] shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5 flex justify-center">
              <div className="relative aspect-[3/4] w-full max-w-[300px] rounded-2xl overflow-hidden border border-black/[0.08] shadow-md group">
                <Image
                  src="/images/real_jsm_fabrication_hiring.jpg"
                  alt="JSM Integrated Services Technical Fabrication Hiring"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            <div className="md:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/[0.08] text-[#0071e3] text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#0071e3] animate-pulse" />
                <span>ACTIVE INDUSTRIAL RECRUITMENT &bull; TAMIL NADU</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-semibold text-[#1d1d1f] tracking-tight">
                Fabrication Industry Hiring: Block &amp; Pipe Fabrication
              </h2>

              <p className="text-xs sm:text-sm text-[#86868b] leading-relaxed font-normal">
                JSM Integrated Services is actively recruiting skilled technical manpower for heavy engineering, manufacturing, and fabrication industries across Tamil Nadu and South India.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                <div className="p-4 rounded-2xl bg-white border border-black/[0.06] shadow-sm">
                  <span className="text-[#1d1d1f] font-semibold block">1. Block Fabrication</span>
                  <span className="text-[#86868b] text-[11px]">Industrial assembly &amp; structural fitting</span>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-black/[0.06] shadow-sm">
                  <span className="text-[#1d1d1f] font-semibold block">2. Pipe Fabrication</span>
                  <span className="text-[#86868b] text-[11px]">Heavy line pipeline fitting &amp; cutting</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-black/[0.06]">
                <a
                  href={`https://wa.me/${brandData.contact.whatsapp}?text=Hello%20JSM,%20I%20am%20applying%20for%20the%20Fabrication%20Industry%20job.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm transition-all"
                >
                  <MessageCircle size={14} /> WhatsApp: +91 90808 63448
                </a>
                <a
                  href="mailto:jsmintegratedservices@outlook.com?subject=Fabrication%20Industry%20Application"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white hover:bg-[#e8e8ed] text-[#1d1d1f] border border-black/[0.08] font-semibold text-xs shadow-sm transition-all"
                >
                  <Mail size={14} /> Apply via Email
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Application Form Section */}
        <section id="apply-form" className="max-w-3xl mx-auto bg-[#f5f5f7] border border-black/[0.08] rounded-[28px] p-8 md:p-12 shadow-sm">
          <div className="space-y-2 mb-8 text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0071e3]">
              Direct Application
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#1d1d1f] tracking-tight">
              Submit Your Job Application
            </h2>
            <p className="text-sm text-[#86868b] font-normal">Our HR recruitment desk in Trichy will call qualified applicants within 24 hours.</p>
          </div>

          {formSubmitted ? (
            <div className="p-8 bg-white border border-black/[0.08] rounded-2xl text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#0071e3]/10 text-[#0071e3] flex items-center justify-center mx-auto">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="text-xl font-semibold text-[#1d1d1f]">Application Successfully Received!</h3>
              <p className="text-xs text-[#86868b] max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.fullName}</strong>. Your candidate file has been created. Our recruitment officer will contact you for document scheduling.
              </p>
              <div className="pt-2">
                <Button
                  onClick={() => setFormSubmitted(false)}
                  variant="outline"
                  className="rounded-full text-xs font-semibold bg-white border-black/[0.08]"
                >
                  Submit Another Application
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-xs font-semibold text-[#1d1d1f]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[#1d1d1f]">Full Name *</label>
                  <Input
                    required
                    placeholder="Enter your name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="h-11 rounded-2xl bg-white border-black/[0.08] text-xs focus:border-[#0071e3]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[#1d1d1f]">Contact Number / WhatsApp *</label>
                  <Input
                    required
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="h-11 rounded-2xl bg-white border-black/[0.08] text-xs focus:border-[#0071e3]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[#1d1d1f]">Email Address</label>
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-11 rounded-2xl bg-white border-black/[0.08] text-xs focus:border-[#0071e3]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[#1d1d1f]">Current City / District in Tamil Nadu *</label>
                  <Input
                    required
                    placeholder="e.g. Trichy, Chennai, Coimbatore"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="h-11 rounded-2xl bg-white border-black/[0.08] text-xs focus:border-[#0071e3]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[#1d1d1f]">Position Desired</label>
                  <Input
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="h-11 rounded-2xl bg-white border-black/[0.08] text-xs focus:border-[#0071e3]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[#1d1d1f]">Years of Prior Experience / ESM Rank</label>
                  <Input
                    placeholder="e.g. Ex-Jawan / Fresher / 3 Years"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="h-11 rounded-2xl bg-white border-black/[0.08] text-xs focus:border-[#0071e3]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[#1d1d1f]">Short Introduction / Service Record (Optional)</label>
                <Textarea
                  rows={3}
                  placeholder="Mention previous defense regiment, security or facility experience, language proficiencies..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="rounded-2xl bg-white border-black/[0.08] text-xs leading-relaxed focus:border-[#0071e3]"
                />
              </div>

              <div className="flex items-center gap-2 pt-1 text-[11px] text-[#86868b] font-normal">
                <input
                  type="checkbox"
                  required
                  id="consent"
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  className="rounded border-black/[0.2] accent-[#0071e3]"
                />
                <label htmlFor="consent">
                  I consent to JSM recruitment officers contacting me for identity verification and document review.
                </label>
              </div>

              <Button
                type="submit"
                className="w-full h-12 rounded-full bg-[#1d1d1f] hover:bg-black text-white font-semibold text-xs shadow-sm min-h-[44px]"
              >
                <Send size={14} className="mr-1.5" /> Submit Application to JSM Desk
              </Button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}
