import { Metadata } from "next";
import { LeadCaptureForm } from "@/components/landing/lead-capture-form";
import { Shield, Clock, FileCheck, CheckCircle2 } from "lucide-react";
import { brandData } from "@/data/brand";

export const metadata: Metadata = {
  title: "Hire Verified Security Guards in Trichy | JSM Security",
  description: "PSARA Licensed. Police Verified. 2-Hour Replacement SLA. Hire professional security guards, gate access control, and night patrolling in Tiruchirappalli.",
  keywords: "security guards trichy, hire security guards tiruchirappalli, PSARA security agency trichy",
};

export default function SecurityGuardsTrichyPage() {

  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Content */}
          <div>
            <div className="inline-flex items-center space-x-2 bg-[#C5A880]/10 text-[#C5A880] px-4 py-2 rounded-full mb-6 border border-[#C5A880]/20">
              <span className="w-2 h-2 rounded-full bg-[#C5A880] animate-pulse"></span>
              <span className="text-sm font-bold tracking-wide uppercase">Top Rated in Tiruchirappalli</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0A1628] leading-[1.1] mb-6">
              Hire Verified <span className="text-[#C5A880]">Security Guards</span> in Trichy
            </h1>
            
            <p className="text-xl md:text-2xl font-bold text-zinc-600 mb-8 leading-tight">
              PSARA Licensed. Police Verified. <br className="hidden md:block"/>2-Hour Replacement SLA.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0 border border-zinc-100">
                  <Shield className="w-6 h-6 text-[#C5A880]" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#0A1628]">PSARA 2005 Compliant</h3>
                  <p className="text-zinc-600 font-medium mt-1">Government licensed private security agency operating strictly under PSARA guidelines.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0 border border-zinc-100">
                  <CheckCircle2 className="w-6 h-6 text-[#C5A880]" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#0A1628]">100% Police Verified</h3>
                  <p className="text-zinc-600 font-medium mt-1">Rigorous background checks and strict vetting process for every deployed guard.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0 border border-zinc-100">
                  <Clock className="w-6 h-6 text-[#C5A880]" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#0A1628]">2-Hour SLA</h3>
                  <p className="text-zinc-600 font-medium mt-1">Guaranteed replacement or emergency deployment within 2 hours in Trichy.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0 border border-zinc-100">
                  <FileCheck className="w-6 h-6 text-[#C5A880]" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#0A1628]">Airport Experience</h3>
                  <p className="text-zinc-600 font-medium mt-1">Trusted partners for high-security zones including Trichy Airport contracts.</p>
                </div>
              </div>
            </div>

            <a 
              href="mailto:jsmintegratedservices@outlook.com?subject=Security%20Guards%20in%20Trichy"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-black text-[#0A1628] bg-[#C5A880] hover:bg-[#b0936b] rounded-xl transition-colors w-full sm:w-auto"
            >
              Contact via Email
            </a>
          </div>

          {/* Right Column: Form */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#C5A880]/20 to-transparent blur-3xl -z-10 rounded-full"></div>
            <LeadCaptureForm 
              sourcePage="/hire-security-guards-trichy"
              service="Security Guards"
            />
          </div>

        </div>
      </div>
    </div>
  );
}
