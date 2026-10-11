import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Download } from "lucide-react";
import { brandData } from "@/data/brand";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#030508] text-white border-t border-white/10">
      {/* Upper Direct Contact & Inquiry Strip */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 border-b border-white/10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="text-sm font-medium text-white">
            <span className="text-[#D4AF37] font-semibold">JSM Central Operations:</span> Ex-Servicemen Led &bull; Airports Authority of India Client &bull; 100% EPF/ESIC Compliant
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-xs font-semibold">
            <a href={`tel:${brandData.contact.phone}`} className="flex items-center gap-2 text-white hover:text-[#D4AF37] transition-colors tabular-nums">
              <Phone size={14} className="text-[#D4AF37]" />
              <span>{brandData.contact.phoneDisplay}</span>
            </a>
            <Link href="/contact" className="text-[#D4AF37] hover:text-white transition-colors">
              Request Quote &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Main 4-Column Navigation Grid */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 text-sm">
          {/* Col 1: Services */}
          <div className="space-y-3">
            <h4 className="text-[13px] font-bold text-white tracking-normal uppercase text-xs text-[#D4AF37]">
              Core Operations
            </h4>
            <ul className="space-y-2 text-xs text-neutral-300">
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Tier 1: Security Guards &amp; ESM Supervisors
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Tier 2: Contract Staffing &amp; Industrial Workforce
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Tier 3: Facility Management &amp; Hygiene
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Digital: WhatsApp Business API &amp; CRM
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Digital: Smart NFC Review Filter Standees
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors font-semibold text-[#D4AF37]">
                  View Full Services Matrix &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Governance & Case Studies */}
          <div className="space-y-3">
            <h4 className="text-[13px] font-bold text-white tracking-normal uppercase text-xs text-[#D4AF37]">
              Credentials &amp; Proof
            </h4>
            <ul className="space-y-2 text-xs text-neutral-300">
              <li>
                <Link href="/case-studies/trichy-international-airport" className="hover:text-white transition-colors font-medium text-white">
                  ✈️ Trichy International Airport Contract
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Leadership (Major AR Devadoss &bull; Sweety J &bull; R Jan Steve Daniel)
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  100% EPF &amp; ESIC Statutory Compliance
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  24/7 Operations Desk &amp; Quick Dispatch
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: District Coverage */}
          <div className="space-y-3">
            <h4 className="text-[13px] font-bold text-white tracking-normal uppercase text-xs text-[#D4AF37]">
              Tamil Nadu Coverage
            </h4>
            <ul className="space-y-1.5 text-xs text-neutral-300">
              <li><span className="font-semibold text-white">Trichy:</span> Central Operations Command</li>
              <li><span className="font-semibold text-white">Chennai:</span> OMR &amp; Commercial Corridor</li>
              <li><span className="font-semibold text-white">Coimbatore:</span> Industrial &amp; Manufacturing</li>
              <li><span className="font-semibold text-white">Hosur:</span> Automotive &amp; Electronics SEZ</li>
              <li><span className="font-semibold text-white">Salem:</span> Heavy Engineering &amp; Metals</li>
              <li><span className="font-semibold text-white">Madurai:</span> Southern Commercial Hub</li>
            </ul>
          </div>

          {/* Col 4: Contact & Verification */}
          <div className="space-y-3">
            <h4 className="text-[13px] font-bold text-white tracking-normal uppercase text-xs text-[#D4AF37]">
              Headquarters Command
            </h4>
            <div className="space-y-2 text-xs text-neutral-300">
              <div className="flex items-start gap-2">
                <MapPin size={13} className="shrink-0 mt-0.5 text-[#D4AF37]" />
                <span>{brandData.contact.address}</span>
              </div>
              <div className="pt-2 space-y-1.5 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-[#D4AF37] w-14 shrink-0">Desk:</span>
                  <a href={`tel:${brandData.contact.phone}`} className="hover:text-white transition-colors">
                    {brandData.contact.phoneDisplay}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-[#D4AF37] w-14 shrink-0">Email:</span>
                  <a href={`mailto:${brandData.contact.email}`} className="hover:text-white transition-colors">
                    {brandData.contact.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-[#D4AF37] w-14 shrink-0">WhatsApp:</span>
                  <a href={`https://wa.me/${brandData.contact.whatsapp}`} className="hover:text-white transition-colors">
                    +91 {brandData.contact.whatsapp}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Statutory Bar */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-5 border-t border-white/10 text-xs text-neutral-400 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          &copy; {currentYear} JSM Integrated Services. All Rights Reserved &bull; Managing Director Sweety J &bull; Indian Army Veteran Major AR Devadoss &bull; CTO R Jan Steve Daniel
        </div>
        <div className="flex items-center gap-4">
          <Link href="/legal/privacy" className="hover:text-white transition-colors">Privacy</Link>
          <Link href="/legal/terms" className="hover:text-white transition-colors">Terms</Link>
          <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
