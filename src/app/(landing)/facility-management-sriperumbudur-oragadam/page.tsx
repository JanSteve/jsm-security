import { Metadata } from "next";
import { LeadCaptureForm } from "@/components/landing/lead-capture-form";
import { Shield, Sparkles, CheckCircle2, Phone, MessageCircle, Building2, Clock } from "lucide-react";
import { brandData } from "@/data/brand";

export const metadata: Metadata = {
  title: "Facility Management & Security in Sriperumbudur & Oragadam | JSM Integrated",
  description: "PSARA licensed security, mechanized factory housekeeping, industrial staffing, and 2-Hour Relief SLAs for Tier-1 automotive and electronics plants in Sriperumbudur & Oragadam SEZ.",
  keywords: [
    "facility management sriperumbudur",
    "factory housekeeping services oragadam",
    "automotive security contractors sriperumbudur",
    "psara security agency oragadam",
    "contract labour supplier sriperumbudur",
    "JSM Integrated Services Sriperumbudur"
  ],
  alternates: {
    canonical: `${brandData.domain}/facility-management-sriperumbudur-oragadam`,
  },
};

export default function FacilityManagementSriperumbudurPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Content */}
          <div>
            <div className="inline-flex items-center space-x-2 bg-[#C5A880]/10 text-[#C5A880] px-4 py-2 rounded-full mb-6 border border-[#C5A880]/20">
              <span className="w-2 h-2 rounded-full bg-[#C5A880] animate-pulse" />
              <span className="text-xs font-black tracking-wider uppercase font-mono">AUTOMOTIVE &amp; ELECTRONICS SEZ CORRIDOR</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0A1628] leading-[1.08] mb-6 uppercase tracking-tight">
              Facility Management in <span className="text-[#C5A880]">Sriperumbudur &amp; Oragadam</span>
            </h1>
            
            <p className="text-base sm:text-lg font-medium text-zinc-600 mb-8 leading-relaxed">
              Consolidate security guarding, mechanized ride-on floor hygiene, and technical staffing under one accountable partner with 100% statutory legal indemnity.
            </p>

            <div className="space-y-4 mb-10 text-sm">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-zinc-100 shadow-xs">
                <div className="w-10 h-10 bg-[#fbf9f4] rounded-xl flex items-center justify-center shrink-0 border border-zinc-200">
                  <Shield className="w-5 h-5 text-[#C5A880]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0A1628]">High-Volume Gate &amp; Shift Change Control</h3>
                  <p className="text-zinc-500 text-xs mt-0.5">Dual-barrier access control, under-vehicle mirror scans, and biometric attendance for 1,000+ worker shifts.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-zinc-100 shadow-xs">
                <div className="w-10 h-10 bg-[#fbf9f4] rounded-xl flex items-center justify-center shrink-0 border border-zinc-200">
                  <Sparkles className="w-5 h-5 text-[#C5A880]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0A1628]">Mechanized Auto-Scrubber Deep Hygiene</h3>
                  <p className="text-zinc-500 text-xs mt-0.5">Industrial ride-on floor scrubbers with eco-certified degreasers for oil-free, anti-slip production floors.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-zinc-100 shadow-xs">
                <div className="w-10 h-10 bg-[#fbf9f4] rounded-xl flex items-center justify-center shrink-0 border border-zinc-200">
                  <Clock className="w-5 h-5 text-[#C5A880]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0A1628]">2-Hour SLA &amp; 100% EPF/ESIC Indemnity</h3>
                  <p className="text-zinc-500 text-xs mt-0.5">Guaranteed relief personnel within 120 minutes backed by verified monthly ECR challans.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a 
                href={`tel:${brandData.contact.phone}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-black text-black bg-[#C5A880] hover:bg-[#b09570] rounded-full transition-all shadow-md font-mono uppercase"
              >
                <Phone size={15} /> Call: {brandData.contact.phoneDisplay}
              </a>
              <a 
                href={`https://wa.me/${brandData.contact.whatsapp}?text=Hello%20JSM,%20I%20would%20like%20to%20inquire%20about%20facility%20management%20in%20Sriperumbudur.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold text-emerald-950 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-full transition-colors"
              >
                <MessageCircle size={15} className="text-emerald-600" /> WhatsApp Desk
              </a>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#C5A880]/20 to-transparent blur-3xl -z-10 rounded-full" />
            <LeadCaptureForm 
              sourcePage="/facility-management-sriperumbudur-oragadam"
              service="Sriperumbudur Facility Management"
            />
          </div>

        </div>
      </div>
    </div>
  );
}
