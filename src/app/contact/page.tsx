import { ContactForm } from "@/components/contact/contact-form";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export const metadata = {
  title: "Contact Us | JSM Security & Integrated Services",
  description: "Get in touch for a premium, customized security or facilities management assessment. Our advisors are available 24/7.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-800 pt-32 pb-20 px-4 md:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl font-black text-black mb-6 tracking-tight leading-[1.05]">
            Get in <span className="text-[#C5A880]">Touch</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-500 font-medium leading-relaxed">
            Partner with JSM for elite security and integrated operations. Request a comprehensive operational risk assessment today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side: Multi-step Form */}
          <div>
            <ContactForm />
          </div>

          {/* Right Side: Contact Information */}
          <div className="space-y-8 lg:pl-6">
            <div className="bg-zinc-50 border border-zinc-200/60 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
              <h3 className="text-2xl font-bold text-black tracking-tight">Contact Details</h3>
              
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-white border border-zinc-200 rounded-xl text-[#C5A880]">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-black">Call Us Directly</h4>
                    <p className="text-zinc-500 text-xs mt-1">24/7 Active Duty Dispatcher</p>
                    <a href="tel:+442071234567" className="text-lg font-bold text-[#C5A880] hover:underline mt-1 block">
                      +44 (0) 20 7123 4567
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-white border border-zinc-200 rounded-xl text-[#C5A880]">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-black">Email Communications</h4>
                    <p className="text-zinc-500 text-xs mt-1">General & Billing Inquiries</p>
                    <a href="mailto:info@jsmsecurity.com" className="text-lg font-bold text-[#C5A880] hover:underline mt-1 block">
                      info@jsmsecurity.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-white border border-zinc-200 rounded-xl text-[#C5A880]">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-black">Global Headquarters</h4>
                    <p className="text-zinc-500 text-xs mt-1">Canary Wharf Business District</p>
                    <p className="text-zinc-700 text-sm font-semibold mt-1">
                      123 Security House, Canary Wharf<br />
                      London, E14 5AB, United Kingdom
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-white border border-zinc-200 rounded-xl text-[#C5A880]">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-black">Operating Hours</h4>
                    <p className="text-zinc-500 text-xs mt-1">Operational Support & Response</p>
                    <p className="text-[#C5A880] font-bold mt-1">24 Hours a Day / 365 Days a Year</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Static Map Placeholder (Apple Style) */}
            <div className="h-64 rounded-3xl bg-zinc-50 border border-zinc-200/60 overflow-hidden relative flex items-center justify-center shadow-sm">
              <div className="absolute inset-0 bg-white/20" />
              {/* Radial glow */}
              <div className="absolute w-40 h-40 rounded-full bg-[#C5A880]/5 blur-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              <div className="relative text-center p-6 space-y-2">
                <MapPin size={36} className="text-[#C5A880] mx-auto animate-bounce" />
                <h4 className="font-bold text-black">Interactive London Map</h4>
                <p className="text-xs text-zinc-500 font-medium">Canary Wharf Headquarters Location</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
