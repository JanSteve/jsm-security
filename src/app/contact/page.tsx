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
    <main className="min-h-screen bg-[#07090E] text-zinc-100 pt-28 pb-24 px-4 sm:px-6 md:px-12 lg:px-20 selection:bg-[#C5A880]/30 selection:text-white">
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B0F17] border border-[#C5A880]/30 text-[#C5A880] text-xs font-mono font-bold">
            <Sparkles size={13} className="text-[#C5A880]" />
            <span>24/7 operational dispatch</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight text-balance">
            Let’s discuss your requirement
          </h1>

          <p className="text-xs sm:text-sm text-zinc-400 font-normal text-pretty">
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
            <div className="bg-[#0B0F17] border border-zinc-800 rounded-3xl p-6 space-y-5 shadow-2xl">
              <h3 className="text-base font-black text-white tracking-tight border-b border-zinc-800 pb-3">
                Operations &amp; command desk
              </h3>
              
              <div className="space-y-4 text-xs font-medium">
                {/* Official Hotline */}
                <div className="flex gap-3 items-start p-3 rounded-2xl bg-[#07090E] border border-zinc-800">
                  <div className="p-2.5 bg-[#0B0F17] border border-zinc-800 rounded-xl text-[#C5A880] shadow-sm">
                    <Phone size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs">Official 24/7 operations line</h4>
                    <a href={`tel:${brandData.contact.phone}`} className="text-sm font-bold text-[#C5A880] hover:underline mt-0.5 block font-mono tabular-nums">
                      {brandData.contact.phoneDisplay}
                    </a>
                  </div>
                </div>

                {/* WhatsApp Direct */}
                <div className="flex gap-3 items-start p-3 rounded-2xl bg-[#07090E] border border-zinc-800">
                  <div className="p-2.5 bg-[#0B0F17] border border-zinc-800 rounded-xl text-emerald-400 shadow-sm">
                    <MessageCircle size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs">Instant WhatsApp desk</h4>
                    <a
                      href={`https://wa.me/${brandData.contact.whatsapp}?text=Hello%20JSM%20Integrated%20Services,%20I%20would%20like%20to%20inquire%20about%20your%20services.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-emerald-400 hover:underline mt-0.5 block tabular-nums"
                    >
                      Chat on WhatsApp (+91 90808 63448) →
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-3 items-start p-3 rounded-2xl bg-[#07090E] border border-zinc-800">
                  <div className="p-2.5 bg-[#0B0F17] border border-zinc-800 rounded-xl text-[#C5A880] shadow-sm">
                    <Mail size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs">Official Outlook inbox</h4>
                    <a href={`mailto:${brandData.contact.email}`} className="text-xs font-bold text-zinc-300 hover:text-white mt-0.5 block font-mono">
                      {brandData.contact.email}
                    </a>
                  </div>
                </div>

                {/* Google Maps / Local Hub */}
                <div className="flex gap-3 items-start p-3 rounded-2xl bg-[#07090E] border border-zinc-800">
                  <div className="p-2.5 bg-[#0B0F17] border border-zinc-800 rounded-xl text-[#C5A880] shadow-sm">
                    <MapPin size={16} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-white text-xs">Regional command centre</h4>
                    <p className="text-zinc-400 text-xs leading-snug">
                      Tiruchirappalli (Trichy), Tamil Nadu, India — PIN 620001
                    </p>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Tiruchirappalli+Tamil+Nadu+India"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C5A880] hover:underline pt-1"
                    >
                      <Navigation size={12} /> <span>Open in Google Maps</span> <ExternalLink size={11} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick SLA Assurance Badge */}
            <div className="p-4 rounded-2xl bg-[#0B0F17] border border-zinc-800 text-white flex items-center gap-3 shadow-xl">
              <ShieldCheck size={22} className="text-[#C5A880] flex-shrink-0" />
              <div className="text-xs">
                <span className="font-bold block text-white tabular-nums">2-hour response guarantee</span>
                <span className="text-[11px] text-zinc-400">All inquiries processed directly by operations officers.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
