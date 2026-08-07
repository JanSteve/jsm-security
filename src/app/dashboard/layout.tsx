import Link from "next/link";
import { Shield, LayoutDashboard, FileText, Settings, ShieldAlert, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0A1128] flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#121C3B]/50 border-r border-[#1A264D] p-6 flex flex-col justify-between">
        <div className="space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Shield className="text-[#D4AF37] h-6 w-6" />
            <span className="text-xl font-bold text-white tracking-tighter">
              JSM<span className="text-[#D4AF37]">.</span> Portal
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#1A264D]/50 text-[#D4AF37] font-semibold transition-all text-sm"
            >
              <LayoutDashboard size={18} />
              Portal Overview
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#94A3B8] hover:text-[#F8F9FA] hover:bg-[#1A264D]/25 transition-all text-sm"
            >
              <FileText size={18} />
              Active Contracts
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#94A3B8] hover:text-[#F8F9FA] hover:bg-[#1A264D]/25 transition-all text-sm"
            >
              <ShieldAlert size={18} />
              Security Incidents
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#94A3B8] hover:text-[#F8F9FA] hover:bg-[#1A264D]/25 transition-all text-sm"
            >
              <Settings size={18} />
              Portal Settings
            </Link>
          </nav>
        </div>

        {/* Footer actions */}
        <div className="border-t border-[#1A264D] pt-6 mt-6 md:mt-0">
          <Button asChild variant="outline" className="w-full border-red-500/20 hover:bg-red-500/10 text-red-400 rounded-xl h-11 flex justify-center items-center gap-2">
            <Link href="/auth/signin">
              <LogOut size={16} /> Sign Out
            </Link>
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-6 md:p-10 xl:p-16 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
