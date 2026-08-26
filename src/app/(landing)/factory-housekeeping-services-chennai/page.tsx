import { Metadata } from "next";
import { LeadCaptureForm } from "@/components/landing/lead-capture-form";
import { ClipboardList, Leaf, CheckSquare, Sparkles } from "lucide-react";
import { brandData } from "@/data/brand";

export const metadata: Metadata = {
  title: "Professional Factory & Corporate Housekeeping in Chennai",
  description: "5-Step Closed-Loop Hygiene Protocol. Eco-Friendly. Audit-Ready. Premium industrial cleaning and facility maintenance in Chennai.",
  keywords: "housekeeping services chennai, factory cleaning chennai, corporate housekeeping tamil nadu",
};

export default function HousekeepingChennaiPage() {
  const whatsappUrl = `https://wa.me/${brandData.contact.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Hi JSM, I found you on Google and need help with Housekeeping in Chennai.")}`;

  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <div>
            <div className="inline-flex items-center space-x-2 bg-[#0A1628]/10 text-[#0A1628] px-4 py-2 rounded-full mb-6 border border-[#0A1628]/20">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-bold tracking-wide uppercase">Premium Facility Management</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0A1628] leading-[1.1] mb-6">
              Professional Factory & Corporate <span className="text-[#C5A880]">Housekeeping</span> in Chennai
            </h1>
            
            <p className="text-xl md:text-2xl font-bold text-zinc-600 mb-8 leading-tight">
              5-Step Closed-Loop Hygiene Protocol. <br className="hidden md:block"/>Eco-Friendly. Audit-Ready.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0 border border-zinc-100">
                  <ClipboardList className="w-6 h-6 text-[#C5A880]" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#0A1628]">5-Step SOP Protocol</h3>
                  <p className="text-zinc-600 font-medium mt-1">Rigorous cleaning standard operating procedures tailored for industrial and corporate spaces.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0 border border-zinc-100">
                  <Leaf className="w-6 h-6 text-[#C5A880]" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#0A1628]">Eco-Friendly Consumables</h3>
                  <p className="text-zinc-600 font-medium mt-1">Sustainable, high-grade cleaning chemicals and materials that are tough on dirt but safe for the environment.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0 border border-zinc-100">
                  <CheckSquare className="w-6 h-6 text-[#C5A880]" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#0A1628]">Daily Supervisor Inspections</h3>
                  <p className="text-zinc-600 font-medium mt-1">Dedicated on-site supervisors ensuring zero-defect compliance with daily checklists.</p>
                </div>
              </div>
            </div>

            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-black text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-xl transition-colors w-full sm:w-auto shadow-lg shadow-green-500/20"
            >
              Contact on WhatsApp
            </a>
          </div>

          <div className="relative">
            <LeadCaptureForm 
              sourcePage="/factory-housekeeping-services-chennai"
              service="Housekeeping"
            />
          </div>

        </div>
      </div>
    </div>
  );
}
