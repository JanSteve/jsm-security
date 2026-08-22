"use client";

import React, { useState } from "react";
import { openRoles, inductionPhilosophy, careerProgressionSteps, CareerRole } from "@/data/careers";
import { brandData } from "@/data/brand";
import { breadcrumbSchema } from "@/lib/schema";
import { ArrowRight, CheckCircle2, Award, Users, TrendingUp, Briefcase, MapPin, Clock, Send, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function CareersPage() {
  const [selectedRole, setSelectedRole] = useState<string>("sec-guard-trichy");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    position: "Security Guard / Gate Officer",
    experience: "Fresher",
    notes: "",
    consent: true
  });

  const cleanWA = brandData.contact.whatsapp.replace(/[^0-9]/g, '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) return;
    setFormSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-white text-zinc-800 pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-100 border border-zinc-200/80 text-zinc-800 text-xs font-bold">
            <Sparkles size={13} className="text-[#C5A880]" />
            <span>JOIN OUR DISCIPLINED TEAM</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-black tracking-tight leading-tight">
            Build a career with discipline.<br />
            <span className="text-zinc-600">Grow with JSM.</span>
          </h1>

          <p className="text-base md:text-lg text-zinc-600 font-medium max-w-2xl mx-auto leading-relaxed">
            "Our people are our product. Your first uniform should not be your final destination." We offer structured training, guaranteed on-time salaries, and clear promotion pathways.
          </p>
        </div>

        {/* 5-Day Induction Section */}
        <section className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#C5A880]">
              Training Foundation
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
              Our 5-Day Induction Curriculum
            </h2>
            <p className="text-xs text-zinc-500 font-medium">Every recruit undergoes thorough classroom and on-field training before deployment.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {inductionPhilosophy.map((day, idx) => (
              <div
                key={day.day}
                className="bg-zinc-50 border border-zinc-200/80 rounded-3xl p-5 space-y-3 flex flex-col justify-between shadow-xs"
              >
                <div className="space-y-2">
                  <span className="text-xs font-black text-[#C5A880] tracking-wider uppercase">
                    {day.day}
                  </span>
                  <h3 className="text-sm font-bold text-black leading-snug">
                    {day.title}
                  </h3>
                  <p className="text-[11px] text-zinc-500 font-medium leading-relaxed">
                    {day.focus}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-200/60 space-y-1.5">
                  {day.details.map((det, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-[10px] text-zinc-700 font-medium">
                      <CheckCircle2 size={11} className="text-[#C5A880] flex-shrink-0 mt-0.5" />
                      <span>{det}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Career Progression Ladder */}
        <section className="mb-20 bg-zinc-900 text-white rounded-3xl p-8 md:p-12 max-w-5xl mx-auto border border-zinc-800 shadow-xl">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C5A880]">
              Growth Blueprint
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Your Career Progression at JSM
            </h2>
            <p className="text-xs text-zinc-400 font-medium">Promotions are based on punctuality, alertness, and client service merit.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {careerProgressionSteps.map((step, idx) => (
              <div key={idx} className="bg-zinc-800/80 border border-zinc-700/60 rounded-2xl p-4 space-y-2">
                <span className="text-xs font-black text-[#C5A880]">{step.rank}</span>
                <h4 className="text-xs font-bold text-white">{step.title}</h4>
                <span className="text-[10px] bg-zinc-700/80 px-2 py-0.5 rounded text-zinc-300 inline-block font-mono">
                  {step.timeline}
                </span>
                <p className="text-[11px] text-zinc-400 leading-snug">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Open Job Roles */}
        <section className="mb-20 max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#C5A880]">
              Current Openings
            </span>
            <h2 className="text-3xl font-black text-black tracking-tight">
              Open Positions Across Tamil Nadu
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {openRoles.map((role) => (
              <div
                key={role.id}
                className="bg-zinc-50 border border-zinc-200/80 rounded-3xl p-7 flex flex-col justify-between hover:border-black hover:bg-white hover:shadow-xl transition-all duration-300 shadow-sm"
              >
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200/60 pb-3">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-zinc-200 text-zinc-800">
                      {role.department}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      {role.type}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-black">{role.title}</h3>
                    <div className="flex items-center gap-4 text-xs text-zinc-500 font-medium mt-1">
                      <span className="flex items-center gap-1"><MapPin size={13} /> {role.location}</span>
                      <span className="flex items-center gap-1"><Briefcase size={13} /> {role.experience}</span>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-600 leading-relaxed font-medium">
                    {role.description}
                  </p>

                  <div className="space-y-1.5 pt-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                      Key Offerings:
                    </p>
                    {role.whatWeOffer.slice(0, 2).map((offer, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-zinc-700 font-medium">
                        <CheckCircle2 size={13} className="text-[#C5A880] flex-shrink-0" />
                        <span>{offer}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-zinc-200/60 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setFormData({ ...formData, position: role.title });
                      setSelectedRole(role.id);
                      document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-xs font-bold text-black hover:underline flex items-center gap-1"
                  >
                    Apply for this Role <ArrowRight size={13} />
                  </button>

                  <a
                    href={`https://wa.me/${cleanWA}?text=Hi%20JSM%20HR,%20I%20am%20interested%20in%20the%20${encodeURIComponent(role.title)}%20role.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-bold text-emerald-700 hover:underline flex items-center gap-1"
                  >
                    <MessageCircle size={13} /> Ask on WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Application Form Section */}
        <section id="apply-form" className="max-w-3xl mx-auto bg-zinc-50 border border-zinc-200/80 rounded-3xl p-8 md:p-12 shadow-md">
          <div className="space-y-2 mb-8 text-center">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#C5A880]">
              Direct Application
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
              Submit Your Job Application
            </h2>
            <p className="text-xs text-zinc-500 font-medium">Our HR recruitment desk in Trichy will call qualified applicants within 24 hours.</p>
          </div>

          {formSubmitted ? (
            <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="text-xl font-bold text-emerald-900">Application Successfully Received!</h3>
              <p className="text-xs text-emerald-700 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.fullName}</strong>. Your candidate file has been created. Our recruitment officer will call your phone number (<strong>{formData.phone}</strong>) for document scheduling.
              </p>
              <div className="pt-2">
                <Button
                  onClick={() => setFormSubmitted(false)}
                  variant="outline"
                  className="rounded-full text-xs font-semibold"
                >
                  Submit Another Application
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-xs font-semibold text-zinc-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label>Full Name *</label>
                  <Input
                    required
                    placeholder="Enter your name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="h-11 rounded-2xl bg-white border-zinc-200 text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label>Phone / WhatsApp Number *</label>
                  <Input
                    required
                    type="tel"
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="h-11 rounded-2xl bg-white border-zinc-200 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label>Email Address</label>
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-11 rounded-2xl bg-white border-zinc-200 text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label>Current City / District in Tamil Nadu *</label>
                  <Input
                    required
                    placeholder="e.g. Trichy, Chennai, Coimbatore"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="h-11 rounded-2xl bg-white border-zinc-200 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label>Position Desired</label>
                  <Input
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="h-11 rounded-2xl bg-white border-zinc-200 text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label>Years of Prior Experience</label>
                  <Input
                    placeholder="e.g. Fresher / 1 Year / 3 Years"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="h-11 rounded-2xl bg-white border-zinc-200 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label>Short Introduction / Prior Roles (Optional)</label>
                <Textarea
                  rows={3}
                  placeholder="Mention previous security or facility work, language skills, or available shift timings..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="rounded-2xl bg-white border-zinc-200 text-xs leading-relaxed"
                />
              </div>

              <div className="flex items-center gap-2 pt-1 text-[11px] text-zinc-500 font-normal">
                <input
                  type="checkbox"
                  required
                  id="consent"
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  className="rounded border-zinc-300"
                />
                <label htmlFor="consent">
                  I consent to JSM recruitment officers contacting me for identity verification and document review.
                </label>
              </div>

              <Button
                type="submit"
                className="w-full h-11 rounded-full bg-black hover:bg-zinc-800 text-white font-bold text-xs shadow-md"
              >
                <Send size={14} className="mr-1.5" /> Submit Application
              </Button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}
