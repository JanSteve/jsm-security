"use client";

import * as React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { MagneticWrapper } from "@/components/motion/magnetic-cursor";

export function ContactBand() {
  const leftColRef = useScrollReveal<HTMLDivElement>();
  const rightColRef = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="contact-band"
      className="py-14 sm:py-20 bg-[#1F4E5F] text-white overflow-hidden w-full max-w-full"
      aria-labelledby="contact-band-heading"
    >
      <div className="max-w-[1180px] w-[92%] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column (7 cols): Direct Action */}
          <div ref={leftColRef} data-reveal className="lg:col-span-7 space-y-4">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-white/80 bg-white/10 px-3 py-1 rounded-full">
              Direct Executive Desk
            </span>
            <h2
              id="contact-band-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-heading font-medium tracking-tight text-white leading-tight"
            >
              Ready to hire or explore confidential senior roles?
            </h2>
            <p className="text-sm sm:text-base font-sans text-white/85 max-w-xl leading-relaxed">
              We connect hiring leaders and executive candidates with discretion across Tamil Nadu, Karnataka, Maharashtra, Delhi, Madhya Pradesh, and Gujarat.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <MagneticWrapper strength={0.2}>
                <Link
                  href="#enquiry"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#0E1116] font-semibold text-sm hover:bg-[#F6F3EE] hover:text-[#C8553D] hover:-translate-y-0.5 transition-all duration-350 min-h-[44px]"
                >
                  Submit Hiring Brief
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </MagneticWrapper>
              <Link
                href="#enquiry"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white font-medium text-sm hover:bg-white/20 hover:-translate-y-0.5 transition-all duration-350 min-h-[44px]"
              >
                <span>Candidate CV Intake</span>
              </Link>
              <a
                href="tel:+919080863448"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white font-medium text-sm hover:bg-white/20 hover:-translate-y-0.5 transition-all duration-350 min-h-[44px]"
              >
                <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                <span>+91 90808 63448</span>
              </a>
            </div>
          </div>

          {/* Right Column (5 cols): Verified Contact Details */}
          <div ref={rightColRef} data-reveal className="lg:col-span-5 bg-white/10 border border-white/20 rounded-2xl p-6 backdrop-blur-xs space-y-4 text-xs sm:text-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-white/80">
              Verified Corporate Details
            </div>
            
            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-[#C8553D] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <span className="text-white/70 block text-[11px]">Direct Phone</span>
                <a href="tel:+919080863448" className="font-semibold text-white hover:underline">
                  +91 90808 63448
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-[#C8553D] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <span className="text-white/70 block text-[11px]">Enquiry Email</span>
                <a href="mailto:contact@jsmintegratedservices.com" className="font-semibold text-white hover:underline">
                  contact@jsmintegratedservices.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-[#C8553D] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <span className="text-white/70 block text-[11px]">Executive Candidate CVs</span>
                <a href="mailto:careers@jsmintegratedservices.com" className="font-semibold text-white hover:underline">
                  careers@jsmintegratedservices.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#C8553D] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <span className="text-white/70 block text-[11px]">Registered Office</span>
                <span className="text-white/90">
                  Door No.: 87, Plot No: 112, Gandhi Nagar, Kottapattu, Tiruchirappalli - 620021, Tamil Nadu
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
