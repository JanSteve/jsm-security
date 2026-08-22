import { ContactForm } from "@/components/contact/contact-form";
import { Phone, Mail, MapPin, Clock, MessageCircle, Sparkles, ShieldCheck } from "lucide-react";
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
    <main className="min-h-screen bg-white text-zinc-800 pt-32 pb-24 px-4 md:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />

      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-100 border border-zinc-200/80 text-zinc-800 text-xs font-bold">
            <Sparkles size={13} className="text-[#C5A880]" />
            <span>OPERATIONAL LIAISON & PROPOSALS</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-black tracking-tight leading-tight">
            Let’s discuss your operational requirement.
          </h1>

          <p className="text-base md:text-lg text-zinc-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Schedule a comprehensive, no-obligation site risk & manpower assessment. Our field operations team responds within 2 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-5xl mx-auto">
          {/* Left Form (7 cols) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Right Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-zinc-50 border border-zinc-200/80 rounded-3xl p-7 space-y-6 shadow-sm">
              <h3 className="text-xl font-bold text-black tracking-tight border-b border-zinc-200/60 pb-3">
                Operations Desk
              </h3>
              
              <div className="space-y-4 text-xs font-medium">
                {/* Phone */}
                <div className="flex gap-3.5 items-start">
                  <div className="p-2.5 bg-white border border-zinc-200 rounded-2xl text-black shadow-xs">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-black text-xs">Direct Helpline</h4>
                    <p className="text-zinc-500 text-[11px]">24/7 Operations & Dispatch</p>
                    <a href={`tel:${cleanPhone}`} className="text-sm font-bold text-black hover:underline mt-0.5 block">
                      {brandData.contact.phoneDisplay}
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex gap-3.5 items-start">
                  <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-700 shadow-xs">
                    <MessageCircle size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-black text-xs">Instant WhatsApp Desk</h4>
                    <p className="text-zinc-500 text-[11px]">Fast-Track Quotation & Video Walkthroughs</p>
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
                <div className="flex gap-3.5 items-start">
                  <div className="p-2.5 bg-white border border-zinc-200 rounded-2xl text-black shadow-xs">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-black text-xs">Official Email</h4>
                    <p className="text-zinc-500 text-[11px]">Tenders, RFP Submissions & Billing</p>
                    <a href={`mailto:${brandData.contact.email}`} className="text-xs font-bold text-black hover:underline mt-0.5 block">
                      {brandData.contact.email}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex gap-3.5 items-start">
                  <div className="p-2.5 bg-white border border-zinc-200 rounded-2xl text-black shadow-xs">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-black text-xs">Regional Operating Centre</h4>
                    <p className="text-zinc-500 text-[11px]">Tamil Nadu Regional Hub</p>
                    <p className="text-zinc-700 text-xs font-semibold mt-0.5 leading-snug">
                      Tiruchirappalli (Trichy), Tamil Nadu, India<br />
                      <span className="text-zinc-500 font-normal">Active deployments across Chennai, Coimbatore, Madurai, Salem & Hosur.</span>
                    </p>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex gap-3.5 items-start">
                  <div className="p-2.5 bg-white border border-zinc-200 rounded-2xl text-black shadow-xs">
                    <Clock size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-black text-xs">Operational Availability</h4>
                    <p className="text-emerald-700 font-bold text-xs mt-0.5">24 Hours a Day • 365 Days a Year</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Assurance Card */}
            <div className="p-6 bg-zinc-900 text-white rounded-3xl space-y-2 border border-zinc-800 shadow-md">
              <div className="flex items-center gap-2 text-[#C5A880] text-xs font-bold uppercase tracking-wider">
                <ShieldCheck size={16} />
                <span>Zero-Obligation Guarantee</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-medium">
                Our site risk assessments are complimentary. We visit your property, audit vulnerabilities, and submit a transparent proposal with zero sales pressure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
