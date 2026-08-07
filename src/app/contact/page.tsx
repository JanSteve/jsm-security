import { ContactForm } from "@/components/contact/contact-form";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export const metadata = {
  title: "Contact Us | JSM Security & Integrated Services",
  description: "Get in touch for a premium, customized security or facilities management assessment. Our advisors are available 24/7.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#0A1128] pt-24 pb-20 px-4 md:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F8F9FA] mb-6 tracking-tight">
            Get in <span className="text-[#D4AF37]">Touch</span>
          </h1>
          <p className="text-lg md:text-xl text-[#94A3B8]">
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
            <div className="bg-[#121C3B]/30 border border-[#1A264D] rounded-3xl p-6 md:p-8 space-y-6">
              <h3 className="text-2xl font-bold text-[#F8F9FA]">Contact Details</h3>
              
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-[#1A264D] rounded-xl text-[#D4AF37]">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Call Us Directly</h4>
                    <p className="text-[#94A3B8] text-sm mt-1">24/7 Active Duty Dispatcher</p>
                    <a href="tel:+442071234567" className="text-lg font-bold text-[#D4AF37] hover:underline mt-1 block">
                      +44 (0) 20 7123 4567
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-[#1A264D] rounded-xl text-[#D4AF37]">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Email Communications</h4>
                    <p className="text-[#94A3B8] text-sm mt-1">General & Billing Inquiries</p>
                    <a href="mailto:info@jsmsecurity.com" className="text-lg font-bold text-[#D4AF37] hover:underline mt-1 block">
                      info@jsmsecurity.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-[#1A264D] rounded-xl text-[#D4AF37]">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Global Headquarters</h4>
                    <p className="text-[#94A3B8] text-sm mt-1">Canary Wharf Business District</p>
                    <p className="text-[#F8F9FA] font-medium mt-1">
                      123 Security House, Canary Wharf<br />
                      London, E14 5AB, United Kingdom
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-[#1A264D] rounded-xl text-[#D4AF37]">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Operating Hours</h4>
                    <p className="text-[#94A3B8] text-sm mt-1">Operational Support & Response</p>
                    <p className="text-[#D4AF37] font-semibold mt-1">24 Hours a Day / 365 Days a Year</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Static Map Placeholder */}
            <div className="h-64 rounded-3xl bg-[#121C3B]/50 border border-[#1A264D] overflow-hidden relative flex items-center justify-center">
              <div className="absolute inset-0 bg-[#0A1128]/80 mix-blend-color" />
              {/* Radial glow */}
              <div className="absolute w-40 h-40 rounded-full bg-[#D4AF37]/10 blur-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              <div className="relative text-center p-6 space-y-2">
                <MapPin size={36} className="text-[#D4AF37] mx-auto animate-bounce" />
                <h4 className="font-bold text-[#F8F9FA]">Interactive London Map</h4>
                <p className="text-xs text-[#94A3B8]">Canary Wharf Headquarters Location</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
