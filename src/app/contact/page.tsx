import { ContactForm } from "@/components/contact/contact-form";
import { Phone, Mail, MapPin, Clock, ShieldCheck, ArrowRight } from "lucide-react";
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
    <main className="min-h-screen bg-black text-white pt-32 pb-24">
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
        <section className="py-8 sm:py-12 border-b border-white/10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 text-xs font-semibold">
              <ShieldCheck size={14} />
              <span>Direct Operational Desk &bull; Tiruchirappalli Central Command</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-white font-normal tracking-tight">
              Contact &amp; Site Assessment
            </h1>
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
              Connect directly with our operations desk. Schedule an on-site vulnerability inspection or request a transparent pricing estimate within 2 hours.
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
            <div className="p-7 rounded-2xl bg-[#070B12] border border-white/10 shadow-xl space-y-6">
              <h2 className="font-display text-xl text-white font-normal border-b border-white/10 pb-3">
                Head Office &amp; Operations
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-neutral-300">
                {/* Physical Address */}
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Central Headquarters:</strong>
                    <span>{brandData.contact.address}</span>
                  </div>
                </div>

                {/* Direct Phone */}
                <div className="flex items-start gap-3">
                  <Phone size={18} className="text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Direct Consultation / Hotline:</strong>
                    <a href={`tel:${brandData.contact.phone}`} className="text-[#D4AF37] font-semibold hover:underline tabular-nums">
                      {brandData.contact.phoneDisplay}
                    </a>
                  </div>
                </div>

                {/* Primary Email */}
                <div className="flex items-start gap-3">
                  <Mail size={18} className="text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Official Executive Email:</strong>
                    <a href={`mailto:${brandData.contact.email}`} className="text-neutral-200 font-medium hover:text-[#D4AF37] block">
                      {brandData.contact.email}
                    </a>
                    <span className="text-[11px] text-neutral-400 block">Commercial Proposals: {brandData.contact.salesEmail}</span>
                  </div>
                </div>

                {/* Department Email Inboxes */}
                <div className="pt-3 border-t border-white/10 space-y-2">
                  <strong className="text-white block text-xs uppercase tracking-wider text-[#D4AF37]">
                    Department Inboxes:
                  </strong>
                  <div className="grid grid-cols-1 gap-1.5 text-xs">
                    <div className="flex items-center justify-between py-1 border-b border-white/5">
                      <span className="text-neutral-400">Sales &amp; Proposals:</span>
                      <a href={`mailto:${brandData.contact.salesEmail}`} className="text-neutral-200 hover:text-[#D4AF37] font-medium">
                        {brandData.contact.salesEmail}
                      </a>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-white/5">
                      <span className="text-neutral-400">Careers &amp; Intake:</span>
                      <a href={`mailto:${brandData.contact.careersEmail}`} className="text-neutral-200 hover:text-[#D4AF37] font-medium">
                        {brandData.contact.careersEmail}
                      </a>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-white/5">
                      <span className="text-neutral-400">24/7 Operations Desk:</span>
                      <a href={`mailto:${brandData.contact.helpEmail}`} className="text-neutral-200 hover:text-[#D4AF37] font-medium">
                        {brandData.contact.helpEmail}
                      </a>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span className="text-neutral-400">Statutory Compliance:</span>
                      <a href={`mailto:${brandData.contact.infoEmail}`} className="text-neutral-200 hover:text-[#D4AF37] font-medium">
                        {brandData.contact.infoEmail}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Response SLA */}
                <div className="flex items-start gap-3 pt-2">
                  <Clock size={18} className="text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Response Commitment:</strong>
                    <span className="text-neutral-400">Operational inquiries answered within 2 hours during active shifts.</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Action */}
              <div className="pt-2 border-t border-white/10">
                <a
                  href={`https://wa.me/${brandData.contact.whatsapp}?text=Hello%20JSM%20Integrated%20Services,%20I%20wish%20to%20inquire%20about%20your%20services.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-lg bg-[#D4AF37] hover:bg-[#E5C158] text-black text-xs sm:text-sm font-bold transition-colors min-h-[44px] shadow-lg"
                >
                  <span>Open WhatsApp Operations Chat</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>

            {/* Regional Outposts Notice */}
            <div className="p-6 rounded-2xl border border-white/10 bg-[#070B12] space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
                Regional Deployment Outposts
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Field supervisory units stationed in Chennai (OMR IT Corridor), Coimbatore (Sidco), Hosur (Sipcot), Salem, and Madurai.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
