import { ContactForm } from "@/components/contact/contact-form";
import { Phone, Mail, MapPin, Clock, MessageCircle, Sparkles, ShieldCheck, ExternalLink, Navigation } from "lucide-react";
import { brandData } from "@/data/brand";
import { breadcrumbSchema, localBusinessSchema } from "@/lib/schema";

export const metadata = {
  title: "Contact Us & Request Site Assessment | JSM Integrated Services",
  description: "Schedule a free on-site security, housekeeping, or staffing assessment with JSM Integrated Services. Operations desks in Trichy, Chennai, Coimbatore, and across Tamil Nadu.",
};

export default function ContactPage() {

  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: brandData.domain },
    { name: "Contact Us", url: `${brandData.domain}/contact` },
  ]);

  const localBusiness = localBusinessSchema();

  return (
    <main className="min-h-screen bg-white text-[#1d1d1f] pt-52 sm:pt-60 md:pt-64 lg:pt-72 pb-24 px-4 sm:px-6 md:px-12 lg:px-20 selection:bg-[#0071e3]/15 selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />

      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f5f5f7] border border-black/[0.08] text-[#1d1d1f] text-xs font-semibold shadow-sm">
            <Sparkles size={13} className="text-[#0071e3]" />
            <span>24/7 operational dispatch</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-semibold text-[#1d1d1f] tracking-tight text-balance">
            Let’s discuss your requirement.
          </h1>

          <p className="text-xs sm:text-sm text-[#86868b] font-normal text-pretty">
            Request an on-site physical security or facility assessment. We respond within 2 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          {/* Left Form (7 cols) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Right Contact Details & Google Maps Local Hub (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-[#f5f5f7] border border-black/[0.08] rounded-[28px] p-6 space-y-5 shadow-sm">
              <h3 className="text-base font-semibold text-[#1d1d1f] tracking-tight border-b border-black/[0.08] pb-3">
                Operations &amp; command desk
              </h3>
              
              <div className="space-y-3.5 text-xs font-medium">
                {/* Official Hotline */}
                <div className="flex gap-3 items-start p-3.5 rounded-2xl bg-white border border-black/[0.06] shadow-sm">
                  <div className="p-2.5 bg-[#f5f5f7] border border-black/[0.06] rounded-xl text-[#0071e3]">
                    <Phone size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1d1d1f] text-xs">Official 24/7 operations line</h4>
                    <a href={`tel:${brandData.contact.phone}`} className="text-sm font-semibold text-[#0071e3] hover:underline mt-0.5 block tabular-nums">
                      {brandData.contact.phoneDisplay}
                    </a>
                  </div>
                </div>

                {/* WhatsApp Direct */}
                <div className="flex gap-3 items-start p-3.5 rounded-2xl bg-white border border-black/[0.06] shadow-sm">
                  <div className="p-2.5 bg-[#f5f5f7] border border-black/[0.06] rounded-xl text-emerald-600">
                    <MessageCircle size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1d1d1f] text-xs">Instant WhatsApp desk</h4>
                    <a
                      href={`https://wa.me/${brandData.contact.whatsapp}?text=Hello%20JSM%20Integrated%20Services,%20I%20would%20like%20to%20inquire%20about%20your%20services.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-emerald-600 hover:underline mt-0.5 block tabular-nums"
                    >
                      Chat on WhatsApp (+91 90808 63448) →
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-3 items-start p-3.5 rounded-2xl bg-white border border-black/[0.06] shadow-sm">
                  <div className="p-2.5 bg-[#f5f5f7] border border-black/[0.06] rounded-xl text-[#0071e3]">
                    <Mail size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1d1d1f] text-xs">Official corporate inbox</h4>
                    <a href={`mailto:${brandData.contact.email}`} className="text-xs font-semibold text-[#515154] hover:text-[#1d1d1f] mt-0.5 block">
                      {brandData.contact.email}
                    </a>
                  </div>
                </div>

                {/* Google Maps / Local Hub */}
                <div className="flex gap-3 items-start p-3.5 rounded-2xl bg-white border border-black/[0.06] shadow-sm">
                  <div className="p-2.5 bg-[#f5f5f7] border border-black/[0.06] rounded-xl text-[#0071e3]">
                    <MapPin size={16} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold text-[#1d1d1f] text-xs">Regional command centre</h4>
                    <p className="text-[#86868b] text-xs leading-snug">
                      Tiruchirappalli (Trichy), Tamil Nadu, India — PIN 620001
                    </p>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Tiruchirappalli+Tamil+Nadu+India"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0071e3] hover:underline pt-1"
                    >
                      <Navigation size={12} /> <span>Open in Google Maps</span> <ExternalLink size={11} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick SLA Assurance Badge */}
            <div className="p-4 rounded-2xl bg-[#f5f5f7] border border-black/[0.08] text-[#1d1d1f] flex items-center gap-3 shadow-sm">
              <ShieldCheck size={22} className="text-[#0071e3] flex-shrink-0" />
              <div className="text-xs">
                <span className="font-semibold block text-[#1d1d1f] tabular-nums">2-hour response guarantee</span>
                <span className="text-[11px] text-[#86868b]">All inquiries processed directly by operations officers.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
