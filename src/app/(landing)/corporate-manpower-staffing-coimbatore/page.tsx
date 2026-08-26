import { Metadata } from "next";
import { LeadCaptureForm } from "@/components/landing/lead-capture-form";
import { Users, FileHeart, Timer, TrendingUp } from "lucide-react";
import { brandData } from "@/data/brand";

export const metadata: Metadata = {
  title: "Reliable Contractual Manpower & Staffing in Coimbatore",
  description: "48-72 Hour Deployment. 100% EPF/ESI Compliant. Zero Labour Liability. Temporary staffing and industrial helpers.",
  keywords: "manpower services coimbatore, staffing agency coimbatore, contract labour coimbatore",
};

export default function ManpowerCoimbatorePage() {
  const whatsappUrl = `https://wa.me/${brandData.contact.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Hi JSM, I found you on Google and need help with Manpower in Coimbatore.")}`;

  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <div>
            <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-800 px-4 py-2 rounded-full mb-6 border border-blue-200">
              <Users className="w-4 h-4" />
              <span className="text-sm font-bold tracking-wide uppercase">Industrial & Corporate Staffing</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0A1628] leading-[1.1] mb-6">
              Reliable Contractual <span className="text-[#C5A880]">Manpower & Staffing</span> in Coimbatore
            </h1>
            
            <p className="text-xl md:text-2xl font-bold text-zinc-600 mb-8 leading-tight">
              48-72 Hour Deployment. 100% EPF/ESI Compliant. Zero Labour Liability.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0 border border-zinc-100">
                  <Timer className="w-6 h-6 text-[#C5A880]" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#0A1628]">48-72hr Rapid Deployment</h3>
                  <p className="text-zinc-600 font-medium mt-1">Fast turnaround time for fulfilling industrial helpers, warehouse workers, and factory manpower needs.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0 border border-zinc-100">
                  <FileHeart className="w-6 h-6 text-[#C5A880]" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#0A1628]">Full Statutory Compliance</h3>
                  <p className="text-zinc-600 font-medium mt-1">100% EPF/ESI compliant. We take full responsibility for labor laws and statutory obligations.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0 border border-zinc-100">
                  <TrendingUp className="w-6 h-6 text-[#C5A880]" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#0A1628]">Attendance & Payroll Management</h3>
                  <p className="text-zinc-600 font-medium mt-1">Comprehensive tracking and payroll management, providing you with zero labor liability and complete peace of mind.</p>
                </div>
              </div>
            </div>

            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-black text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-xl transition-colors w-full sm:w-auto shadow-lg shadow-green-500/20"
            >
              Get a Custom Quote on WhatsApp
            </a>
          </div>

          <div className="relative">
            <LeadCaptureForm 
              sourcePage="/corporate-manpower-staffing-coimbatore"
              service="Manpower"
            />
          </div>

        </div>
      </div>
    </div>
  );
}
