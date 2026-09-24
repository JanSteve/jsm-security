import { ContactForm } from "@/components/contact/contact-form";
import { Phone, Mail, MapPin, Clock, ShieldCheck, ArrowRight } from "lucide-react";
import { brandData } from "@/data/brand";
import { breadcrumbSchema, localBusinessSchema } from "@/lib/schema";

export const metadata = {
  title: "Contact & Site Assessment | JSM Integrated Services",
  description: "Contact JSM Integrated Services operations desk in Tiruchirappalli, Tamil Nadu. Request an on-site physical security or facility assessment with direct founder accountability.",
};

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
              <span>Direct Operational Desk</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#14181F] font-normal tracking-tight">
              Contact &amp; Site Assessment
            </h1>
            <p className="text-base sm:text-lg text-[#5A6578] leading-relaxed">
              Speak directly with our operations team in Tiruchirappalli. We schedule on-site threat assessments, discuss staffing rosters, and deliver transparent proposals.
            </p>
          </div>
        </section>

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

                {/* Email Contacts */}
                <div className="flex items-start gap-3">
                  <Mail size={18} className="text-[#0B3D2E] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#14181F] block">Official Email:</strong>
                    <a href={`mailto:${brandData.contact.email}`} className="text-[#0B3D2E] hover:underline block">
                      {brandData.contact.email}
                    </a>
                    <span className="text-[11px] text-[#5A6578] block">Alternate: {brandData.contact.backupEmail}</span>
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
      </div>
    </main>
  );
}
