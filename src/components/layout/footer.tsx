import React from "react";
import Link from "next/link";
import { Phone, MapPin, Plane } from "lucide-react";
import { brandData } from "@/data/brand";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#03050C] text-white border-t border-cyan-500/20">
      {/* Upper Direct Contact & Inquiry Strip */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 border-b border-cyan-500/20">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="text-sm font-medium text-white">
            <span className="text-cyan-300 font-semibold font-mono">JSM Central Operations:</span> Ex-Servicemen Led &bull; Airports Authority of India Client &bull; 100% EPF/ESIC Compliant
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-xs font-semibold">
            <a href={`tel:${brandData.contact.phone}`} className="flex items-center gap-2 text-white hover:text-cyan-300 transition-colors tabular-nums">
              <Phone size={14} className="text-cyan-400" />
              <span>{brandData.contact.phoneDisplay}</span>
            </a>
            <Link href="/contact" className="text-cyan-400 hover:text-cyan-300 transition-colors underline underline-offset-4 font-mono">
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
            <h4 className="text-cyan-400/90 font-mono text-[11px] font-bold tracking-wider uppercase">
              Core Operations
            </h4>
            <ul className="space-y-2 text-xs text-neutral-300">
              <li>
                <Link href="/services/private-security" className="hover:text-cyan-300 transition-colors">
                  Tier 1: Security Guards &amp; ESM Supervisors
                </Link>
              </li>
              <li>
                <Link href="/services/manpower" className="hover:text-cyan-300 transition-colors">
                  Tier 2: Contract Staffing &amp; Industrial Workforce
                </Link>
              </li>
              <li>
                <Link href="/services/housekeeping" className="hover:text-cyan-300 transition-colors">
                  Tier 3: Facility Management &amp; Hygiene
                </Link>
              </li>
              <li>
                <Link href="/services/whatsapp-automation-crm" className="hover:text-cyan-300 transition-colors">
                  Digital: WhatsApp Business API &amp; CRM
                </Link>
              </li>
              <li>
                <Link href="/services/nfc-review-standees" className="hover:text-cyan-300 transition-colors">
                  Digital: Smart NFC Review Filter Standees
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-cyan-300 transition-colors font-semibold text-white underline underline-offset-4">
                  View Full Services Matrix &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Governance & Case Studies */}
          <div className="space-y-3">
            <h4 className="text-cyan-400/90 font-mono text-[11px] font-bold tracking-wider uppercase">
              Credentials &amp; Proof
            </h4>
            <ul className="space-y-2 text-xs text-neutral-300">
              <li>
                <Link href="/case-studies/trichy-international-airport" className="hover:text-cyan-300 transition-colors font-medium text-white flex items-center gap-1.5">
                  <Plane size={13} className="text-cyan-400 shrink-0" />
                  <span>Trichy International Airport Contract</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-cyan-300 transition-colors">
                  Leadership (Major AR Devadoss &bull; Sweety J &bull; R Jan Steve Daniel)
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-cyan-300 transition-colors">
                  100% EPF &amp; ESIC Statutory Compliance
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cyan-300 transition-colors">
                  24/7 Operations Desk &amp; Quick Dispatch
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: District Coverage */}
          <div className="space-y-3">
            <h4 className="text-cyan-400/90 font-mono text-[11px] font-bold tracking-wider uppercase">
              Tamil Nadu Coverage
            </h4>
            <ul className="space-y-1.5 text-xs text-neutral-300">
              <li>
                <Link href="/locations/trichy" className="hover:text-cyan-300 transition-colors">
                  <span className="font-semibold text-white">Trichy:</span> Central Command HQ
                </Link>
              </li>
              <li>
                <Link href="/locations/chennai" className="hover:text-cyan-300 transition-colors">
                  <span className="font-semibold text-white">Chennai:</span> OMR &amp; Commercial Corridor
                </Link>
              </li>
              <li>
                <Link href="/locations/coimbatore" className="hover:text-cyan-300 transition-colors">
                  <span className="font-semibold text-white">Coimbatore:</span> Industrial &amp; Manufacturing
                </Link>
              </li>
              <li>
                <Link href="/locations/hosur" className="hover:text-cyan-300 transition-colors">
                  <span className="font-semibold text-white">Hosur:</span> Automotive &amp; Electronics SEZ
                </Link>
              </li>
              <li>
                <Link href="/locations/salem" className="hover:text-cyan-300 transition-colors">
                  <span className="font-semibold text-white">Salem:</span> Heavy Engineering &amp; Metals
                </Link>
              </li>
              <li>
                <Link href="/locations/madurai" className="hover:text-cyan-300 transition-colors">
                  <span className="font-semibold text-white">Madurai:</span> Southern Commercial Hub
                </Link>
              </li>
              <li>
                <Link href="/locations/erode" className="hover:text-cyan-300 transition-colors">
                  <span className="font-semibold text-white">Erode:</span> Textile &amp; Processing SEZ
                </Link>
              </li>
              <li className="pt-1">
                <Link href="/locations" className="hover:text-cyan-300 transition-colors font-semibold text-white underline underline-offset-4">
                  All 8 Industrial Corridors &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Verification */}
          <div className="space-y-3">
            <h4 className="text-cyan-400/90 font-mono text-[11px] font-bold tracking-wider uppercase">
              Headquarters Command
            </h4>
            <div className="space-y-2 text-xs text-neutral-300">
              <div className="flex items-start gap-2">
                <MapPin size={13} className="shrink-0 mt-0.5 text-cyan-400" />
                <span>{brandData.contact.address}</span>
              </div>
              <div className="pt-2 space-y-1.5 border-t border-cyan-500/20">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-neutral-400 w-14 shrink-0 font-mono">Desk:</span>
                  <a href={`tel:${brandData.contact.phone}`} className="hover:text-cyan-300 transition-colors">
                    {brandData.contact.phoneDisplay}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-neutral-400 w-14 shrink-0 font-mono">Email:</span>
                  <a href={`mailto:${brandData.contact.email}`} className="hover:text-cyan-300 transition-colors">
                    {brandData.contact.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-neutral-400 w-14 shrink-0 font-mono">WhatsApp:</span>
                  <a href={`https://wa.me/${brandData.contact.whatsapp}`} className="hover:text-cyan-300 transition-colors">
                    +91 {brandData.contact.whatsapp}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Statutory Bar */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-5 border-t border-cyan-500/20 text-xs text-neutral-400 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          &copy; {currentYear} JSM Integrated Services. All Rights Reserved &bull; Managing Director Sweety J &bull; Indian Army Veteran Major AR Devadoss &bull; CTO R Jan Steve Daniel
        </div>
        <div className="flex items-center gap-4">
          <Link href="/legal/privacy" className="hover:text-cyan-300 transition-colors">Privacy</Link>
          <Link href="/legal/terms" className="hover:text-cyan-300 transition-colors">Terms</Link>
          <Link href="/contact" className="hover:text-cyan-300 transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
