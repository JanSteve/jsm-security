import React from "react";
import Link from "next/link";
import { 
  Shield, 
  Users, 
  Sparkles, 
  Check, 
  FileText, 
  Scan, 
  Building,
  MessageSquare,
  Star,
  PhoneForwarded,
  Utensils,
  Globe,
  MapPin,
  ArrowRight,
  Cpu
} from "lucide-react";

const tierServices = [
  {
    tier: "Tier 1",
    code: "SAC 998525",
    title: "Security Supervisors & Guarding Forces",
    slug: "/services/private-security",
    badge: "Ex-Servicemen Led & DGR Aligned",
    icon: Shield,
    description: "Disciplined perimeter protection, visitor gate-pass registers, and access control led by Ex-Servicemen (ESM) and trained private security marshals.",
    deliverables: [
      "Ex-Servicemen & Private Marshals (Male & Female)",
      "Contractual 2-Hour Relief Replacement SLA",
      "2:00 AM Unannounced Mobile Patrol Van Audits",
      "Daily Digital Gate Registers & Incident Reports"
    ]
  },
  {
    tier: "Tier 2",
    code: "SAC 998513",
    title: "Contract Staffing & Industrial Manpower",
    slug: "/services/manpower",
    badge: "100% EPF & ESIC",
    icon: Users,
    description: "Multi-skilled industrial and corporate workforce with full statutory legal indemnity, monthly ECR challan verification, and rapid 48-hour mobilization.",
    deliverables: [
      "Factory Assembly, Line Workers & Machine Operators",
      "Corporate Office Administration & Data Staff",
      "100% Statutory EPF, ESIC & Minimum Wage Proof",
      "48 to 72 Hour Batch Deployment Mobilization"
    ]
  },
  {
    tier: "Tier 3",
    code: "SAC 998533",
    title: "Integrated Facility Management & Housekeeping",
    slug: "/services/housekeeping",
    badge: "Closed-Loop Hygiene",
    icon: Sparkles,
    description: "Commercial and industrial facility hygiene adhering to a 5-step closed-loop cleaning protocol with ride-on auto scrubbers and hospital-grade sanitization.",
    deliverables: [
      "Mechanized Ride-On Auto Scrubbing & Polishers",
      "5-Step Closed-Loop Hygiene: Clean to Verify",
      "Restroom Logbooks & Hourly Inspection Registers",
      "Corporate SEZ Campuses & Manufacturing Plants"
    ]
  }
];

const digitalServices = [
  {
    icon: MessageSquare,
    badge: "Official Meta API",
    title: "WhatsApp Business API & Automation",
    slug: "/services/whatsapp-automation-crm",
    description: "24/7 conversational chatbots, automated customer lead capture, and interactive catalog menus with official Meta Cloud API.",
  },
  {
    icon: Star,
    badge: "Reputation Guard",
    title: "Smart Review Filter NFC Standees",
    slug: "/services/nfc-review-standees",
    description: "Double 5-star Google reviews on Maps while routing 1–3 star private complaints directly to your WhatsApp desk.",
  },
  {
    icon: PhoneForwarded,
    badge: "Lead Recovery",
    title: "Missed-Call to WhatsApp Auto-Saver",
    slug: "/services/missed-call-lead-recovery",
    description: "Sub-5-second branded WhatsApp greeting and service menu sent automatically whenever a business phone call is missed.",
  },
  {
    icon: Utensils,
    badge: "Zero-Commission",
    title: "Direct Table Ordering QR Menus",
    slug: "/services/qr-table-ordering",
    description: "Bypass 30% aggregator commissions. Diners scan table QR codes to send formatted orders straight to kitchen WhatsApp.",
  },
  {
    icon: Globe,
    badge: "Core Web Vitals 95+",
    title: "High-Converting Websites & Portals",
    slug: "/services/website-design-development",
    description: "Custom-coded, lightning-fast Next.js business websites and lead portals with built-in WhatsApp conversion funnels.",
  },
  {
    icon: MapPin,
    badge: "Google Maps 3-Pack",
    title: "Local Maps & GBP 3-Pack SEO",
    slug: "/services/local-seo-gbp-ranking",
    description: "Dominate Google Maps local 3-pack rankings with geotagged citations, photo EXIF optimization, and review velocity systems.",
  }
];

const auxiliaryServices = [
  {
    icon: FileText,
    title: "GeM & e-Procurement Bidding",
    description: "Government e-Marketplace catalog management, technical bid documentation, and PO fulfillment for PSUs and state departments.",
  },
  {
    icon: Scan,
    title: "Document Scanning & OCR Digitization",
    description: "High-volume document scanning, OCR text conversion, and secure digital archiving under NIC 62099 IT service standards.",
  },
  {
    icon: Building,
    title: "CSC & Digital Citizen Facilitation",
    description: "Authorized citizen digital facilitation, government application assistance, and institutional documentation desk support.",
  }
];

export function ServicesOverview() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#E4E7EC]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header — Left-Aligned, No All-Caps Eyebrow */}
        <div className="max-w-3xl space-y-2 text-left">
          <div className="text-xs font-semibold text-[#9C7A3C]">
            Three-Tier Operations Model
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-[38px] leading-[1.18] text-[#14181F] font-semibold tracking-[-0.01em]">
            Consolidated physical security, staffing and facility hygiene.
          </h2>
          <p className="text-sm sm:text-base text-[#4A5160] leading-relaxed line-measure">
            Eliminate vendor fragmentation. Manage premises security, industrial contract staffing, and facility management under one contract and one accountable executive desk.
          </p>
        </div>

        {/* Divided List: Hairline dividers between items */}
        <div className="border-t border-[#E4E7EC] divide-y divide-[#E4E7EC]">
          {tierServices.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={i}
                className="py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start hover:bg-[#F6F7F9]/50 transition-colors"
              >
                {/* Left Column: Identifier & Service Title (5 cols) */}
                <div className="lg:col-span-5 space-y-2 text-left">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-mono font-semibold text-[#9C7A3C]">
                      {service.tier} &bull; {service.code}
                    </span>
                    <span className="text-[#4A5160]">&bull;</span>
                    <span className="text-[#4A5160] font-medium">{service.badge}</span>
                  </div>

                  <div className="flex items-start gap-3 pt-1">
                    <div className="w-8 h-8 rounded-[4px] bg-[#F6F7F9] border border-[#E4E7EC] flex items-center justify-center text-[#0F2A47] shrink-0 mt-0.5">
                      <Icon size={16} />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-[#14181F] tracking-normal">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#4A5160] leading-relaxed pt-1.5">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Center Column: Deliverables Checklist (5 cols) */}
                <div className="lg:col-span-5 text-left">
                  <div className="text-xs font-semibold text-[#14181F] mb-2.5">
                    Core Operational Deliverables
                  </div>
                  <ul className="space-y-2 text-sm sm:text-xs text-[#4A5160]">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check size={14} className="text-[#9C7A3C] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right Column: Direct Specification Link (2 cols) */}
                <div className="lg:col-span-2 flex lg:justify-end items-center pt-2 lg:pt-4">
                  <Link
                    href={service.slug}
                    className="w-full lg:w-auto inline-flex items-center justify-center px-4 py-2 rounded-[4px] border border-[#0F2A47] text-[#0F2A47] hover:bg-[#0F2A47] hover:text-white text-xs font-semibold transition-colors min-touch-target"
                  >
                    <span>View Specifications</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Digital & Automation Solutions — Division Led by CTO R Jan Steve Daniel */}
        <div className="pt-10 border-t border-[#E4E7EC] space-y-6 text-left">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#0F2A47]/10 text-[#0F2A47]">
                  <Cpu size={12} />
                  Technology Division
                </span>
                <span className="text-xs text-[#9C7A3C] font-medium">Led by CTO R Jan Steve Daniel</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-semibold text-[#14181F] pt-1">
                Digital Engineering, WhatsApp Automation &amp; Smart Systems
              </h3>
              <p className="text-xs sm:text-sm text-[#4A5160] max-w-2xl leading-relaxed pt-1">
                Modern software, official Meta WhatsApp Business API bots, smart NFC review filtering standees, and high-conversion web platforms built to accelerate retail and corporate growth.
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#0F2A47] hover:text-[#9C7A3C] transition-colors shrink-0"
            >
              <span>Explore All 15 Digital Services</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {digitalServices.map((digital, idx) => {
              const DigitalIcon = digital.icon;
              return (
                <Link
                  key={idx}
                  href={digital.slug}
                  className="p-5 bg-white border border-[#E4E7EC] rounded-lg hover:border-[#0F2A47] hover:shadow-xs transition-all space-y-2.5 text-left group block"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-[4px] bg-[#0F2A47]/8 flex items-center justify-center text-[#0F2A47] group-hover:bg-[#0F2A47] group-hover:text-white transition-colors">
                      <DigitalIcon size={16} />
                    </div>
                    <span className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-[#F6F7F9] text-[#4A5160] border border-[#E4E7EC]">
                      {digital.badge}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#14181F] group-hover:text-[#0F2A47] transition-colors">
                      {digital.title}
                    </h4>
                    <p className="text-xs text-[#4A5160] leading-relaxed pt-1 line-clamp-2">
                      {digital.description}
                    </p>
                  </div>
                  <div className="pt-1 flex items-center gap-1 text-[11px] font-semibold text-[#0F2A47] group-hover:text-[#9C7A3C] transition-colors">
                    <span>View Specifications &amp; Pricing</span>
                    <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Auxiliary Verticals — Divided Clean Strip */}
        <div className="pt-8 border-t border-[#E4E7EC] space-y-6 text-left">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <span className="text-xs font-semibold text-[#4A5160]">
                Auxiliary Enterprise Capabilities
              </span>
              <h4 className="text-base sm:text-lg font-semibold text-[#14181F]">
                Tender Bidding, Document Digitization &amp; Citizen Services
              </h4>
            </div>
            <Link
              href="/services"
              className="text-xs font-semibold text-[#0F2A47] hover:underline shrink-0"
            >
              All Capabilities Overview
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            {auxiliaryServices.map((aux, idx) => {
              const AuxIcon = aux.icon;
              return (
                <div
                  key={idx}
                  className="p-4 bg-[#F6F7F9] border border-[#E4E7EC] space-y-1.5 text-left"
                >
                  <div className="flex items-center gap-2">
                    <AuxIcon size={15} className="text-[#0F2A47]" />
                    <h5 className="text-xs sm:text-sm font-semibold text-[#14181F]">
                      {aux.title}
                    </h5>
                  </div>
                  <p className="text-xs text-[#4A5160] leading-relaxed">
                    {aux.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
