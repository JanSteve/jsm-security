import { ContactForm } from "@/components/contact/contact-form";
import { Phone, Mail, MapPin, Clock, ShieldCheck, ArrowRight, Briefcase, Building2, Users, LifeBuoy, FileCheck, CheckCircle2 } from "lucide-react";
import { brandData } from "@/data/brand";
import { breadcrumbSchema, localBusinessSchema } from "@/lib/schema";

import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Contact & Site Assessment",
  description: "Contact JSM Integrated Services operations desk in Tiruchirappalli, Tamil Nadu. Reach our dedicated departmental inboxes for Sales, Careers, Helpdesk, Compliance, and Executive Office.",
  path: "/contact",
});

export default function ContactPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: brandData.domain },
    { name: "Contact Us", url: `${brandData.domain}/contact` },
  ]);

  const localBusiness = localBusinessSchema();

  return (
    <main className="min-h-screen bg-white text-[#14181F] pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Editorial Page Header */}
        <section className="py-8 sm:py-12 border-b border-[#E7E5E0]">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B3D2E]/8 text-[#0B3D2E] text-xs font-semibold">
              <ShieldCheck size={14} />
              <span>Direct Operational Desk &amp; Departmental Inboxes</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#14181F] font-normal tracking-tight">
              Contact &amp; Site Assessment
            </h1>
            <p className="text-base sm:text-lg text-[#5A6578] leading-relaxed">
              Connect directly with our operations team in Tiruchirappalli. Use our departmental channels below for dedicated support across Sales, Careers, Helpdesk, Compliance, and Executive Management.
            </p>
          </div>
        </section>

        {/* Main Form & HQ Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Right: Contact Information & Headquarters Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-7 rounded-xl bg-[#F8F9FA] border border-[#E7E5E0] space-y-6">
              <h2 className="font-display text-xl text-[#14181F] font-normal border-b border-[#E7E5E0] pb-3">
                Head Office &amp; Operations
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-[#5A6578]">
                {/* Physical Address */}
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#0B3D2E] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#14181F] block">Central Headquarters:</strong>
                    <span>Plot No: 112, SF No 122, RVS Nagar, Kottapattu Post, Tiruchirappalli Distt, Tamil Nadu State, Pin: 620 021</span>
                  </div>
                </div>

                {/* Direct Phone */}
                <div className="flex items-start gap-3">
                  <Phone size={18} className="text-[#0B3D2E] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#14181F] block">Direct Consultation / Hotline:</strong>
                    <a href={`tel:${brandData.contact.phone}`} className="text-[#0B3D2E] font-semibold hover:underline tabular-nums">
                      {brandData.contact.phoneDisplay}
                    </a>
                  </div>
                </div>

                {/* Primary Email */}
                <div className="flex items-start gap-3">
                  <Mail size={18} className="text-[#0B3D2E] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#14181F] block">Official Executive Email:</strong>
                    <a href={`mailto:${brandData.contact.email}`} className="text-[#0B3D2E] font-medium hover:underline block">
                      {brandData.contact.email}
                    </a>
                    <span className="text-[11px] text-[#5A6578] block">Commercial Proposals: {brandData.contact.salesEmail}</span>
                  </div>
                </div>

                {/* Response SLA */}
                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-[#0B3D2E] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#14181F] block">Response Commitment:</strong>
                    <span>Operational inquiries answered within 2 hours during active business shifts.</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Action */}
              <div className="pt-2 border-t border-[#E7E5E0]">
                <a
                  href={`https://wa.me/${brandData.contact.whatsapp}?text=Hello%20JSM%20Integrated%20Services,%20I%20wish%20to%20inquire%20about%20your%20services.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg bg-[#0B3D2E] hover:bg-[#082C21] text-white text-xs sm:text-sm font-semibold transition-colors"
                >
                  <span>Open WhatsApp Operations Chat</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>

            {/* Regional Outposts Notice */}
            <div className="p-6 rounded-xl border border-[#E7E5E0] bg-white space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#14181F]">
                Regional Deployment Outposts
              </h3>
              <p className="text-xs text-[#5A6578] leading-relaxed">
                Field supervisory units actively stationed in Chennai (OMR IT Corridor), Coimbatore (Sidco), Hosur (Sipcot), Salem, and Madurai.
              </p>
            </div>
          </div>
        </div>

        {/* Dedicated Departmental Directory Grid */}
        <section className="space-y-8 pt-8 border-t border-[#E7E5E0]">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0B3D2E]">
              Dedicated Role Inboxes
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-[#14181F] font-normal tracking-tight">
              Departmental Directory &amp; Response SLAs
            </h2>
            <p className="text-xs sm:text-sm text-[#5A6578]">
              Send your requirement directly to the specialized desk for the fastest resolution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. Sales & Proposals */}
            <div className="p-6 rounded-xl border border-[#E7E5E0] bg-[#F8F9FA] flex flex-col justify-between space-y-4 hover:border-[#0B3D2E]/40 transition-colors">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-lg bg-[#0B3D2E]/10 flex items-center justify-center text-[#0B3D2E]">
                    <Briefcase size={18} />
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-[#0B3D2E]/8 text-[#0B3D2E] px-2 py-0.5 rounded">
                    &lt; 2h SLA
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#14181F]">Sales &amp; Commercial Proposals</h3>
                  <p className="text-xs text-[#5A6578] mt-1 leading-relaxed">
                    Custom site quotes, rate cards, RFP tenders, and integrated facility staffing proposals.
                  </p>
                </div>
              </div>
              <div className="pt-3 border-t border-[#E7E5E0]">
                <a
                  href={`mailto:${brandData.contact.salesEmail}?subject=Commercial%20Proposal%20Inquiry`}
                  className="text-xs font-semibold text-[#0B3D2E] hover:underline flex items-center gap-1.5 break-all"
                >
                  <Mail size={13} className="shrink-0" />
                  <span>{brandData.contact.salesEmail}</span>
                </a>
              </div>
            </div>

            {/* 2. Executive & General */}
            <div className="p-6 rounded-xl border border-[#E7E5E0] bg-[#F8F9FA] flex flex-col justify-between space-y-4 hover:border-[#0B3D2E]/40 transition-colors">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-lg bg-[#0B3D2E]/10 flex items-center justify-center text-[#0B3D2E]">
                    <Building2 size={18} />
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-[#0B3D2E]/8 text-[#0B3D2E] px-2 py-0.5 rounded">
                    Executive Desk
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#14181F]">Executive Office &amp; Management</h3>
                  <p className="text-xs text-[#5A6578] mt-1 leading-relaxed">
                    Appointments with MD Sweety J, institutional contracts, and corporate governance matters.
                  </p>
                </div>
              </div>
              <div className="pt-3 border-t border-[#E7E5E0]">
                <a
                  href={`mailto:${brandData.contact.email}?subject=Executive%20Office%20Inquiry`}
                  className="text-xs font-semibold text-[#0B3D2E] hover:underline flex items-center gap-1.5 break-all"
                >
                  <Mail size={13} className="shrink-0" />
                  <span>{brandData.contact.email}</span>
                </a>
              </div>
            </div>

            {/* 3. Careers & Recruitment */}
            <div className="p-6 rounded-xl border border-[#E7E5E0] bg-[#F8F9FA] flex flex-col justify-between space-y-4 hover:border-[#0B3D2E]/40 transition-colors">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-lg bg-[#0B3D2E]/10 flex items-center justify-center text-[#0B3D2E]">
                    <Users size={18} />
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-[#0B3D2E]/8 text-[#0B3D2E] px-2 py-0.5 rounded">
                    Recruitment
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#14181F]">Careers &amp; Guard Recruitment</h3>
                  <p className="text-xs text-[#5A6578] mt-1 leading-relaxed">
                    Ex-Servicemen applications, guard induction resumes, supervisor intake, and employment verification.
                  </p>
                </div>
              </div>
              <div className="pt-3 border-t border-[#E7E5E0]">
                <a
                  href={`mailto:${brandData.contact.careersEmail}?subject=Job%20Application%20/%20Candidate%20Dossier`}
                  className="text-xs font-semibold text-[#0B3D2E] hover:underline flex items-center gap-1.5 break-all"
                >
                  <Mail size={13} className="shrink-0" />
                  <span>{brandData.contact.careersEmail}</span>
                </a>
              </div>
            </div>

            {/* 4. 24/7 Operations Helpdesk */}
            <div className="p-6 rounded-xl border border-[#E7E5E0] bg-[#F8F9FA] flex flex-col justify-between space-y-4 hover:border-[#0B3D2E]/40 transition-colors">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-lg bg-[#0B3D2E]/10 flex items-center justify-center text-[#0B3D2E]">
                    <LifeBuoy size={18} />
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-[#0B3D2E]/8 text-[#0B3D2E] px-2 py-0.5 rounded">
                    24/7 Live
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#14181F]">24/7 Operations &amp; Relief Helpdesk</h3>
                  <p className="text-xs text-[#5A6578] mt-1 leading-relaxed">
                    2-Hour guard replacement escalation, night supervisor audits, and active client site emergencies.
                  </p>
                </div>
              </div>
              <div className="pt-3 border-t border-[#E7E5E0]">
                <a
                  href={`mailto:${brandData.contact.helpEmail}?subject=Operations%20Support%20Request`}
                  className="text-xs font-semibold text-[#0B3D2E] hover:underline flex items-center gap-1.5 break-all"
                >
                  <Mail size={13} className="shrink-0" />
                  <span>{brandData.contact.helpEmail}</span>
                </a>
              </div>
            </div>

            {/* 5. Statutory Compliance & Info */}
            <div className="p-6 rounded-xl border border-[#E7E5E0] bg-[#F8F9FA] flex flex-col justify-between space-y-4 hover:border-[#0B3D2E]/40 transition-colors">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-lg bg-[#0B3D2E]/10 flex items-center justify-center text-[#0B3D2E]">
                    <FileCheck size={18} />
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-[#0B3D2E]/8 text-[#0B3D2E] px-2 py-0.5 rounded">
                    Governance
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#14181F]">Statutory Compliance &amp; Info</h3>
                  <p className="text-xs text-[#5A6578] mt-1 leading-relaxed">
                    PSARA license verification, EPF &amp; ESIC monthly challan proof, GST documentation, and vendor audits.
                  </p>
                </div>
              </div>
              <div className="pt-3 border-t border-[#E7E5E0]">
                <a
                  href={`mailto:${brandData.contact.infoEmail}?subject=Statutory%20Compliance%20Inquiry`}
                  className="text-xs font-semibold text-[#0B3D2E] hover:underline flex items-center gap-1.5 break-all"
                >
                  <Mail size={13} className="shrink-0" />
                  <span>{brandData.contact.infoEmail}</span>
                </a>
              </div>
            </div>

            {/* 6. Emergency Phone Hotline */}
            <div className="p-6 rounded-xl border border-[#0B3D2E]/20 bg-[#0B3D2E]/5 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-lg bg-[#0B3D2E] flex items-center justify-center text-white">
                    <Phone size={18} />
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-[#0B3D2E] text-white px-2 py-0.5 rounded">
                    Central Hotline
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#14181F]">Central Command Telephone</h3>
                  <p className="text-xs text-[#5A6578] mt-1 leading-relaxed">
                    Immediate voice and WhatsApp line connected directly to our Trichy Central Command Desk.
                  </p>
                </div>
              </div>
              <div className="pt-3 border-t border-[#0B3D2E]/20">
                <a
                  href={`tel:${brandData.contact.phone}`}
                  className="text-xs font-bold text-[#0B3D2E] hover:underline flex items-center gap-1.5 tabular-nums"
                >
                  <Phone size={13} className="shrink-0" />
                  <span>{brandData.contact.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
