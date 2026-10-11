"use client";

import React, { useState } from "react";
import { openInternshipRoles, internshipPerksOverview, internshipWorkflowSteps } from "@/data/careers";
import { brandData } from "@/data/brand";
import { 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Mail, 
  Check,
  Target,
  TrendingUp,
  Award,
  FileCheck,
  PhoneCall,
  Compass,
  Zap,
  Sparkles,
  Clock,
  Briefcase,
  HelpCircle,
  ExternalLink
} from "lucide-react";

export default function CareersPage() {
  const [selectedRole, setSelectedRole] = useState<string>("Inside Sales & Tele-Calling Intern (Remote)");
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    role: "Inside Sales & Tele-Calling Intern (Remote)",
    preferredLocation: "Remote (Chennai / Trichy)",
    duration: "3 Months",
    pitch: ""
  });

  const handleRoleSelect = (roleName: string) => {
    setSelectedRole(roleName);
    setFormData((prev) => ({ ...prev, role: roleName }));
    const formElement = document.getElementById("apply");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // Structured Schema for Google Jobs
  const jobPostingSchemas = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "JobPosting",
        "title": "Business Development Executive Intern (Inside Sales & Remote Outreach)",
        "description": "3 to 6 Month Unpaid BDE Internship with generous per-deal closing commissions, daily verified leads supplied by leadership, official LOR, and fast-track PPO. Call business owners across Chennai and Trichy to pitch JSM's integrated physical operations and smart automation tools.",
        "datePosted": "2026-10-11",
        "validThrough": "2026-12-31",
        "employmentType": "INTERN",
        "hiringOrganization": {
          "@type": "Organization",
          "name": brandData.name,
          "sameAs": brandData.domain,
          "logo": `${brandData.domain}/images/jsm_logo_transparent.png`
        },
        "jobLocationType": "TELECOMMUTE",
        "applicantLocationRequirements": {
          "@type": "Country",
          "name": "India"
        },
        "baseSalary": {
          "@type": "MonetaryAmount",
          "currency": "INR",
          "value": {
            "@type": "QuantitativeValue",
            "value": "Unpaid Baseline + Uncapped Deal Commissions (₹1,500 - ₹5,000 per closed deal)",
            "unitText": "MONTH"
          }
        }
      },
      {
        "@type": "JobPosting",
        "title": "Field Business Development Executive Intern (On-Ground Merchant Acquisition)",
        "description": "3 to 6 Month Unpaid Field BDE Internship with generous deal commissions, travel allowance, official LOR, and priority PPO. Visit retail businesses, clinics, salons, and cafes in Chennai or Trichy demonstrating live NFC standees and procuring deals.",
        "datePosted": "2026-10-11",
        "validThrough": "2026-12-31",
        "employmentType": "INTERN",
        "hiringOrganization": {
          "@type": "Organization",
          "name": brandData.name,
          "sameAs": brandData.domain,
          "logo": `${brandData.domain}/images/jsm_logo_transparent.png`
        },
        "jobLocation": {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Chennai & Tiruchirappalli",
            "addressRegion": "Tamil Nadu",
            "addressCountry": "IN"
          }
        },
        "baseSalary": {
          "@type": "MonetaryAmount",
          "currency": "INR",
          "value": {
            "@type": "QuantitativeValue",
            "value": "Unpaid Baseline + Travel Support + High Deal Commissions",
            "unitText": "MONTH"
          }
        }
      }
    ]
  };

  return (
    <main className="min-h-screen bg-[#FDFDFC] text-[#14181F] pt-28 pb-24">
      {/* Schema.org JobPosting JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchemas) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* ========================================================================= */}
        {/* HERO SECTION */}
        {/* ========================================================================= */}
        <section className="pt-6 sm:pt-12 pb-8 border-b border-[#E4E7EC]/80">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F2A47]/8 text-[#0F2A47] text-xs font-semibold tracking-wide border border-[#0F2A47]/15">
              <Sparkles size={14} className="text-[#0F2A47]" />
              <span>Commercial Growth Fellowship • 2 Internships Open</span>
            </div>
            
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#14181F] font-normal tracking-tight leading-[1.15]">
              Business Development Executive <span className="font-semibold text-[#0F2A47]">Internships</span>
            </h1>
            
            <p className="text-base sm:text-lg text-[#5A6578] leading-relaxed">
              We are scaling JSM Integrated Services across Tamil Nadu. We are hiring <strong className="text-[#14181F]">2 hungry, ambitious BDE Interns</strong>—one remote tele-caller and one on-ground field dealmaker—to pitch our physical operations and cutting-edge tech automation tools to local business owners in Chennai and Trichy.
            </p>

            {/* Quick Feature Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-lg bg-white border border-[#E4E7EC] shadow-2xs space-y-1">
                <span className="text-[11px] font-mono font-semibold text-[#5A6578] uppercase">Compensation</span>
                <p className="text-xs font-bold text-[#0F2A47]">Unpaid + High Commissions</p>
              </div>
              <div className="p-3 rounded-lg bg-white border border-[#E4E7EC] shadow-2xs space-y-1">
                <span className="text-[11px] font-mono font-semibold text-[#5A6578] uppercase">Duration</span>
                <p className="text-xs font-bold text-[#0F2A47]">3 to 6 Months</p>
              </div>
              <div className="p-3 rounded-lg bg-white border border-[#E4E7EC] shadow-2xs space-y-1">
                <span className="text-[11px] font-mono font-semibold text-[#5A6578] uppercase">Location</span>
                <p className="text-xs font-bold text-[#0F2A47]">Remote &amp; Chennai/Trichy</p>
              </div>
              <div className="p-3 rounded-lg bg-white border border-[#E4E7EC] shadow-2xs space-y-1">
                <span className="text-[11px] font-mono font-semibold text-[#5A6578] uppercase">Outcome</span>
                <p className="text-xs font-bold text-[#0F2A47]">Official LOR + PPO Offer</p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href="#roles"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#0F2A47] text-white text-xs sm:text-sm font-semibold hover:bg-[#0A1E33] transition-colors shadow-xs min-h-[44px]"
              >
                <span>View The 2 Open Roles</span>
                <ArrowRight size={14} />
              </a>
              <a
                href="#apply"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white border border-[#D0D5DD] text-[#14181F] text-xs sm:text-sm font-semibold hover:bg-[#F8F9FA] transition-colors min-h-[44px]"
              >
                <span>Jump to Application Form</span>
              </a>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* HOW THIS INTERNSHIP WORKS: LEADERSHIP MODEL */}
        {/* ========================================================================= */}
        <section className="space-y-8 border-b border-[#E4E7EC]/80 pb-16">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0F2A47] bg-[#0F2A47]/8 px-2.5 py-1 rounded">
              Operating Blueprint
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-[#14181F] font-normal tracking-tight">
              How You &amp; Leadership Work Together
            </h2>
            <p className="text-sm text-[#5A6578] leading-relaxed">
              You will not be left guessing. We supply the daily target leads and verified phone numbers. You pitch, qualify, and warm up the client; leadership steps in to finalize and execute the deal.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {internshipWorkflowSteps.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl border border-[#E4E7EC] bg-white shadow-2xs space-y-3 relative hover:border-[#0F2A47]/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-bold text-[#0F2A47]/30">
                    {item.step}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-[#0F2A47]" />
                </div>
                <h3 className="text-sm font-semibold text-[#14181F]">
                  {item.title}
                </h3>
                <p className="text-xs text-[#5A6578] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PERKS & INCENTIVES OVERVIEW */}
        {/* ========================================================================= */}
        <section className="space-y-8 border-b border-[#E4E7EC]/80 pb-16">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0F2A47] bg-[#0F2A47]/8 px-2.5 py-1 rounded">
              Candidate Rewards
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-[#14181F] font-normal tracking-tight">
              Why Intern at JSM Integrated Services?
            </h2>
            <p className="text-sm text-[#5A6578]">
              This is a rigorous, hands-on commercial experience designed to build high-earning sales leaders.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {internshipPerksOverview.map((perk, i) => (
              <div
                key={i}
                className="p-6 rounded-xl border border-[#E4E7EC] bg-[#F8F9FA]/70 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-[#0F2A47] text-white flex items-center justify-center shadow-xs">
                    {i === 0 && <Target size={18} />}
                    {i === 1 && <TrendingUp size={18} />}
                    {i === 2 && <Award size={18} />}
                    {i === 3 && <FileCheck size={18} />}
                  </div>
                  <h3 className="text-sm font-semibold text-[#14181F]">
                    {perk.title}
                  </h3>
                  <p className="text-xs text-[#5A6578] leading-relaxed">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* THE 2 OPEN BDE INTERNSHIP POSITIONS */}
        {/* ========================================================================= */}
        <section id="roles" className="space-y-10 border-b border-[#E4E7EC]/80 pb-20">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0F2A47] bg-[#0F2A47]/8 px-2.5 py-1 rounded">
              Active Openings
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-[#14181F] font-normal tracking-tight">
              The Two BDE Internship Roles
            </h2>
            <p className="text-sm text-[#5A6578] max-w-2xl">
              Choose the role that fits your personality: inside outbound calling from the comfort of home, or dynamic on-ground merchant visits across Chennai or Trichy.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {openInternshipRoles.map((role) => {
              const isRemote = role.id === "bde-intern-remote-calling";
              return (
                <div
                  key={role.id}
                  className={`rounded-2xl border p-7 sm:p-8 flex flex-col justify-between space-y-8 bg-white transition-all shadow-xs ${
                    isRemote 
                      ? "border-[#0F2A47]/40 ring-1 ring-[#0F2A47]/20" 
                      : "border-[#E4E7EC] hover:border-[#0F2A47]/40"
                  }`}
                >
                  <div className="space-y-6">
                    {/* Role Header */}
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded bg-[#0F2A47] text-white">
                          {role.badge}
                        </span>
                        <span className="text-xs font-mono font-semibold text-[#5A6578] flex items-center gap-1">
                          <Clock size={13} />
                          {role.duration}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-semibold text-[#14181F] tracking-tight">
                        {role.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-[#5A6578]">
                        <span className="inline-flex items-center gap-1.5 font-medium text-[#0F2A47]">
                          <MapPin size={13} />
                          {role.locations}
                        </span>
                        <span>&bull;</span>
                        <span className="inline-flex items-center gap-1.5 font-medium text-[#14181F]">
                          <Briefcase size={13} />
                          {role.stipendType}
                        </span>
                      </div>
                    </div>

                    {/* Summary */}
                    <p className="text-xs sm:text-sm text-[#4A5568] leading-relaxed bg-[#F8F9FA] p-4 rounded-xl border border-[#E4E7EC]">
                      {role.summary}
                    </p>

                    {/* Daily Schedule Workflow */}
                    <div className="space-y-2.5">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0F2A47] flex items-center gap-1.5">
                        <Clock size={13} />
                        <span>Daily Workflow Schedule</span>
                      </h4>
                      <ul className="space-y-2 text-xs text-[#4A5568]">
                        {role.dailyWorkflow.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0F2A47] shrink-0 mt-1.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* What You Will Pitch */}
                    <div className="space-y-2.5 pt-2 border-t border-[#E4E7EC]/60">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0F2A47] flex items-center gap-1.5">
                        <Zap size={13} />
                        <span>What You Will Pitch &amp; Demonstrate</span>
                      </h4>
                      <ul className="space-y-2 text-xs text-[#4A5568]">
                        {role.whatYouWillPitch.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check size={14} className="text-[#0F2A47] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Who We Are Looking For */}
                    <div className="space-y-2.5 pt-2 border-t border-[#E4E7EC]/60">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0F2A47] flex items-center gap-1.5">
                        <Target size={13} />
                        <span>Candidate Profile &amp; Mindset</span>
                      </h4>
                      <ul className="space-y-2 text-xs text-[#4A5568]">
                        {role.requirements.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check size={14} className="text-[#0F2A47] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Perks & Rewards */}
                    <div className="space-y-2.5 pt-2 border-t border-[#E4E7EC]/60">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0F2A47] flex items-center gap-1.5">
                        <Award size={13} />
                        <span>Perks, Commissions &amp; PPO</span>
                      </h4>
                      <ul className="space-y-2 text-xs text-[#4A5568]">
                        {role.perks.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 size={14} className="text-[#0F2A47] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Apply CTA Card Button */}
                  <div className="pt-6 border-t border-[#E4E7EC]">
                    <button
                      onClick={() => handleRoleSelect(role.title)}
                      className="w-full py-3.5 px-4 rounded-xl bg-[#0F2A47] hover:bg-[#0A1E33] text-white text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-xs min-h-[44px]"
                    >
                      <span>Apply For This Role</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PRODUCTS SUMMARY: WHAT YOU'LL BE SELLING */}
        {/* ========================================================================= */}
        <section className="space-y-8 border-b border-[#E4E7EC]/80 pb-16">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0F2A47] bg-[#0F2A47]/8 px-2.5 py-1 rounded">
              High-Conversion Catalog
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-[#14181F] font-normal tracking-tight">
              The Products You Will Pitch
            </h2>
            <p className="text-sm text-[#5A6578]">
              You will sell solutions business owners genuinely want. We eliminate customer loss, stop bad reviews, and secure their premises.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-[#E4E7EC] bg-white space-y-2.5">
              <span className="text-[10px] font-mono font-bold text-[#0F2A47] bg-[#0F2A47]/8 px-2 py-0.5 rounded">₹1,499 One-Time</span>
              <h3 className="text-sm font-semibold text-[#14181F]">Smart Review Filter NFC Standee</h3>
              <p className="text-xs text-[#5A6578] leading-relaxed">
                4-5 star taps redirect to Google Maps; 1-3 star taps route to the owner&apos;s WhatsApp. Protects ratings and doubles 5-star reviews.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[#E4E7EC] bg-white space-y-2.5">
              <span className="text-[10px] font-mono font-bold text-[#0F2A47] bg-[#0F2A47]/8 px-2 py-0.5 rounded">₹1,999 - ₹3,499 Setup</span>
              <h3 className="text-sm font-semibold text-[#14181F]">Missed-Call to WhatsApp Lead Saver</h3>
              <p className="text-xs text-[#5A6578] leading-relaxed">
                Triggers an instant branded WhatsApp reply within 5 seconds of any unanswered phone call. Recovers ₹25,000+ monthly in missed leads.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[#E4E7EC] bg-white space-y-2.5">
              <span className="text-[10px] font-mono font-bold text-[#0F2A47] bg-[#0F2A47]/8 px-2 py-0.5 rounded">Zero-Commission QR</span>
              <h3 className="text-sm font-semibold text-[#14181F]">WhatsApp Direct Table Ordering</h3>
              <p className="text-xs text-[#5A6578] leading-relaxed">
                Dine-in and takeaway customers scan QR, order on WhatsApp, and pay directly. Bypasses 30% Swiggy/Zomato commission.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[#E4E7EC] bg-white space-y-2.5">
              <span className="text-[10px] font-mono font-bold text-[#0F2A47] bg-[#0F2A47]/8 px-2 py-0.5 rounded">High-Volume Retainer</span>
              <h3 className="text-sm font-semibold text-[#14181F]">Live Clinic Waiting Token Tracker</h3>
              <p className="text-xs text-[#5A6578] leading-relaxed">
                Patients scan a token slip QR to see real-time queue status on mobile. Eliminates 80% of repetitive receptionist questions.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[#E4E7EC] bg-white space-y-2.5">
              <span className="text-[10px] font-mono font-bold text-[#0F2A47] bg-[#0F2A47]/8 px-2 py-0.5 rounded">₹15,000+ High-Ticket</span>
              <h3 className="text-sm font-semibold text-[#14181F]">Next.js High-Converting Websites</h3>
              <p className="text-xs text-[#5A6578] leading-relaxed">
                Ultra-fast, mobile-optimized business websites engineered to rank on Google and capture inbound leads automatically.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[#E4E7EC] bg-white space-y-2.5">
              <span className="text-[10px] font-mono font-bold text-[#0F2A47] bg-[#0F2A47]/8 px-2 py-0.5 rounded">Monthly Contracts</span>
              <h3 className="text-sm font-semibold text-[#14181F]">Physical Security &amp; Facility Staffing</h3>
              <p className="text-xs text-[#5A6578] leading-relaxed">
                Disciplined private security guards, facility supervisors, and mechanized housekeeping teams for offices, SEZs, and factories.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* DIRECT APPLICATION FORM */}
        {/* ========================================================================= */}
        <section id="apply" className="max-w-3xl mx-auto p-8 sm:p-12 rounded-2xl bg-white border border-[#E4E7EC] shadow-sm space-y-8">
          <div className="space-y-3 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F2A47]/8 text-[#0F2A47] text-xs font-semibold">
              <PhoneCall size={13} />
              <span>Apply in Under 2 Minutes</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl text-[#14181F] font-normal tracking-tight">
              Submit Your BDE Internship Application
            </h2>
            <p className="text-xs sm:text-sm text-[#5A6578] max-w-lg mx-auto">
              Our leadership team in Trichy &amp; Chennai will review your submission and connect on WhatsApp within 24 hours.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 sm:p-10 rounded-2xl bg-[#0F2A47]/5 border border-[#0F2A47]/20 text-center space-y-5">
              <div className="w-14 h-14 rounded-full bg-[#0F2A47] text-white flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 size={30} />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-semibold text-[#14181F]">Application Received!</h3>
                <p className="text-xs sm:text-sm text-[#5A6578] max-w-md mx-auto">
                  Thank you, <strong className="text-[#14181F]">{formData.fullName || "Candidate"}</strong>. Your application for <strong className="text-[#0F2A47]">{formData.role}</strong> has been logged directly with our leadership desk.
                </p>
              </div>

              {/* Direct Fast-Track WhatsApp Handoff */}
              <div className="pt-3 max-w-md mx-auto space-y-3">
                <a
                  href={`https://wa.me/919080863448?text=${encodeURIComponent(
                    `Hello JSM Leadership, I have submitted my application on the website for the Business Development Executive Internship (${formData.role}).\n\nName: ${formData.fullName}\nPhone: ${formData.phone}\nLocation: ${formData.preferredLocation}\nDuration: ${formData.duration}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs min-h-[44px]"
                >
                  <Phone size={16} />
                  <span>Send Fast-Track WhatsApp to Founder (+91 90808 63448)</span>
                </a>

                <p className="text-[11px] text-[#718096]">
                  Clicking the button opens WhatsApp with your pre-filled candidate details for an immediate response.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-semibold text-[#14181F]">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Karthik Raman"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E4E7EC] bg-white text-xs sm:text-sm text-[#14181F] focus:outline-none focus:ring-2 focus:ring-[#0F2A47] min-h-[44px]"
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-semibold text-[#14181F]">Phone Number (WhatsApp Active) *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E4E7EC] bg-white text-xs sm:text-sm text-[#14181F] focus:outline-none focus:ring-2 focus:ring-[#0F2A47] min-h-[44px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-semibold text-[#14181F]">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="karthik@example.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E4E7EC] bg-white text-xs sm:text-sm text-[#14181F] focus:outline-none focus:ring-2 focus:ring-[#0F2A47] min-h-[44px]"
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-semibold text-[#14181F]">Position Applying For *</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E4E7EC] bg-white text-xs sm:text-sm text-[#14181F] focus:outline-none focus:ring-2 focus:ring-[#0F2A47] min-h-[44px]"
                  >
                    <option value="Inside Sales & Tele-Calling Intern (Remote)">
                      Inside Sales &amp; Tele-Calling Intern (Remote)
                    </option>
                    <option value="Field Business Development Executive Intern (On-Ground)">
                      Field BDE &amp; Merchant Acquisition Intern (On-Ground Chennai or Trichy)
                    </option>
                    <option value="Open to Both Roles">
                      Open to Either Role (Best Fit)
                    </option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-semibold text-[#14181F]">Your Current City / Base *</label>
                  <select
                    value={formData.preferredLocation}
                    onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E4E7EC] bg-white text-xs sm:text-sm text-[#14181F] focus:outline-none focus:ring-2 focus:ring-[#0F2A47] min-h-[44px]"
                  >
                    <option value="Tiruchirappalli (Trichy)">Tiruchirappalli (Trichy)</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Coimbatore / Other Tamil Nadu (Remote Only)">Coimbatore / Other Tamil Nadu (Remote)</option>
                  </select>
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-semibold text-[#14181F]">Preferred Internship Tenure *</label>
                  <select
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E4E7EC] bg-white text-xs sm:text-sm text-[#14181F] focus:outline-none focus:ring-2 focus:ring-[#0F2A47] min-h-[44px]"
                  >
                    <option value="3 Months">3 Months</option>
                    <option value="6 Months">6 Months</option>
                    <option value="Flexible (Immediate Start)">Flexible (Immediate Start)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-semibold text-[#14181F]">
                  Brief Pitch: Why do you want this role &amp; why are you confident you can close deals? *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.pitch}
                  onChange={(e) => setFormData({ ...formData, pitch: e.target.value })}
                  placeholder="Tell us about your spoken communication skills, phone confidence, prior sales/event experience, or why you want to master B2B dealmaking..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#E4E7EC] bg-white text-xs sm:text-sm text-[#14181F] focus:outline-none focus:ring-2 focus:ring-[#0F2A47] min-h-[44px]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#0F2A47] hover:bg-[#0A1E33] text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs flex items-center justify-center gap-2 min-h-[44px]"
              >
                <span>Submit Candidate Application</span>
                <ArrowRight size={14} />
              </button>

              <div className="p-3.5 rounded-xl bg-[#F8F9FA] border border-[#E4E7EC] text-center">
                <p className="text-[11px] text-[#5A6578] leading-relaxed">
                  <strong>Compensation Notice:</strong> This is a 3–6 month unpaid professional development internship with uncapped per-deal cash commissions, performance bonuses, Letter of Recommendation (LOR), and direct pathway to full-time Pre-Placement Offers (PPO).
                </p>
              </div>
            </form>
          )}

          {/* Quick Contact Desk */}
          <div className="pt-4 border-t border-[#E4E7EC] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5A6578]">
            <div className="flex items-center gap-1.5">
              <Mail size={13} className="text-[#0F2A47]" />
              <span>Direct Recruitment:</span>
              <a href={`mailto:${brandData.contact.careersEmail}`} className="text-[#0F2A47] font-semibold hover:underline">
                {brandData.contact.careersEmail}
              </a>
            </div>

            <div className="flex items-center gap-1.5">
              <Phone size={13} className="text-[#0F2A47]" />
              <span>Leadership Desk:</span>
              <a
                href="https://wa.me/919080863448?text=Hello%20JSM%20Leadership,%20I%20am%20inquiring%20about%20the%20BDE%20Internship%20roles."
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0F2A47] font-semibold hover:underline"
              >
                +91 90808 63448
              </a>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
