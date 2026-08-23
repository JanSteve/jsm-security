import { ContactForm } from "@/components/contact/contact-form";
import { Phone, Mail, MapPin, Clock, MessageCircle, Sparkles, ShieldCheck, ExternalLink, Navigation } from "lucide-react";
import { brandData } from "@/data/brand";
import { breadcrumbSchema, localBusinessSchema } from "@/lib/schema";

export const metadata = {
  title: "Contact Us & Request Site Assessment | JSM Integrated Services",
  description: "Schedule a free on-site security, housekeeping, or staffing assessment with JSM Integrated Services. Operations desks in Trichy, Chennai, Coimbatore, and across Tamil Nadu.",
};

export default function ContactPage() {
  const cleanPhone = brandData.contact.phone.replace(/[^0-9+]/g, '');
  const cleanWA = brandData.contact.whatsapp.replace(/[^0-9]/g, '');

  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: brandData.domain },
    { name: "Contact Us", url: `${brandData.domain}/contact` },
  ]);

  const localBusiness = localBusinessSchema();

  return (
    <main className="min-h-screen bg-white text-zinc-800 pt-28 pb-24 px-4 sm:px-6 md:px-12 lg:px-20">
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
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200/80 text-zinc-800 text-[11px] font-mono font-bold">
            <Sparkles size={12} className="text-[#C5A880]" />
            <span>24/7 OPERATIONAL DISPATCH</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight uppercase">
            Let’s discuss your requirement.
          </h1>

          <p className="text-xs sm:text-sm text-zinc-600 font-normal">
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
            <div className="bg-[#fbf9f4] border border-zinc-200/80 rounded-3xl p-6 space-y-5 shadow-xs">
              <h3 className="text-base font-black text-black tracking-tight border-b border-zinc-200/60 pb-3">
                Operations &amp; Command Desk
              </h3>
              
              <div className="space-y-4 text-xs font-medium">
                {/* Phone */}
                <div className="flex gap-3 items-start">
                  <div className="p-2 bg-white border border-zinc-200 rounded-xl text-black shadow-xs">
                    <Phone size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-black text-xs">Direct Helpline</h4>
                    <a href={`tel:${cleanPhone}`} className="text-xs font-bold text-black hover:underline mt-0.5 block font-mono">
                      {brandData.contact.phoneDisplay}
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex gap-3 items-start">
                  <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 shadow-xs">
                    <MessageCircle size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-black text-xs">Instant WhatsApp Desk</h4>
                    <a
                      href={`https://wa.me/${cleanWA}?text=Hi%20JSM%20Integrated%20Services,%20I%20would%20like%20to%20request%20a%20site%20assessment.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-emerald-700 hover:underline mt-0.5 block"
                    >
                      Chat on WhatsApp (+91 94431 52000) →
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-3 items-start">
                  <div className="p-2 bg-white border border-zinc-200 rounded-xl text-black shadow-xs">
                    <Mail size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-black text-xs">Official Outlook Inbox</h4>
                    <a href={`mailto:${brandData.contact.email}`} className="text-xs font-bold text-black hover:underline mt-0.5 block font-mono">
                      {brandData.contact.email}
                    </a>
                  </div>
                </div>

                {/* Google Maps / Local Hub */}
                <div className="flex gap-3 items-start pt-2 border-t border-zinc-200/60">
                  <div className="p-2 bg-white border border-zinc-200 rounded-xl text-[#C5A880] shadow-xs">
                    <MapPin size={16} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-black text-xs">Regional Command Centre</h4>
                    <p className="text-zinc-600 text-xs leading-snug">
                      Tiruchirappalli (Trichy), Tamil Nadu, India — PIN 620001
                    </p>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Tiruchirappalli+Tamil+Nadu+India"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#C5A880] hover:underline"
                    >
                      <Navigation size={11} /> Open in Google Maps <ExternalLink size={10} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick SLA Assurance Badge */}
            <div className="p-4 rounded-2xl bg-[#0A1628] text-white flex items-center gap-3">
              <ShieldCheck size={22} className="text-[#C5A880] flex-shrink-0" />
              <div className="text-xs">
                <span className="font-bold block text-white">2-Hour Response Guarantee</span>
                <span className="text-[11px] text-zinc-400">All inquiries processed directly by operations officers.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
