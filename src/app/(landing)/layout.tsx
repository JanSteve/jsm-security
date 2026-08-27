import Link from "next/link";
import { brandData } from "@/data/brand";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#fbf9f4] flex flex-col font-sans">
      {/* Minimal Header */}
      <header className="bg-white/95 backdrop-blur-xl border-b border-zinc-200/90 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#0A1628] rounded-lg flex items-center justify-center">
              <span className="text-[#C5A880] font-black text-xl">J</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-[#0A1628] uppercase leading-none">
                JSM Integrated
              </span>
              <span className="text-[10px] font-bold text-[#C5A880] uppercase tracking-wider">
                Services
              </span>
            </div>
          </div>
          
          <div className="hidden sm:block text-right">
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-wide">Email Us Now</p>
            <a href={`mailto:${brandData.contact.email}`} className="text-sm font-black text-[#0A1628]">
              {brandData.contact.email}
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Minimal Footer */}
      <footer className="bg-[#0A1628] py-8 text-center border-t-4 border-[#C5A880]">
        <div className="container mx-auto px-4">
          <p className="text-white/60 text-sm font-medium">
            © {new Date().getFullYear()} {brandData.name}. All rights reserved.
          </p>
          <p className="text-white/40 text-xs mt-2">
            {brandData.contact.primaryCity} | {brandData.contact.email}
          </p>
        </div>
      </footer>
    </div>
  );
}
