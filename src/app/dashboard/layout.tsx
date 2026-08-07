import Link from "next/link";
import { Shield, LayoutDashboard, FileText, Settings, ShieldAlert, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-zinc-50 border-r border-zinc-200 p-6 flex flex-col justify-between">
        <div className="space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Shield className="text-[#C5A880] h-6 w-6" />
            <span className="text-xl font-black text-black tracking-tight">
              JSM<span className="text-[#C5A880]">.</span> Portal
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white border border-zinc-200 text-[#C5A880] font-semibold transition-all text-sm shadow-sm"
            >
              <LayoutDashboard size={18} />
              Portal Overview
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-zinc-500 hover:text-black hover:bg-zinc-100 transition-all text-sm font-medium"
            >
              <FileText size={18} />
              Active Contracts
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-zinc-500 hover:text-black hover:bg-zinc-100 transition-all text-sm font-medium"
            >
              <ShieldAlert size={18} />
              Security Incidents
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-zinc-500 hover:text-black hover:bg-zinc-100 transition-all text-sm font-medium"
            >
              <Settings size={18} />
              Portal Settings
            </Link>
          </nav>
        </div>

        {/* Footer actions */}
        <div className="border-t border-zinc-200 pt-6 mt-6 md:mt-0">
          <Button asChild variant="outline" className="w-full border-red-200 hover:bg-red-50 text-red-600 rounded-full h-11 flex justify-center items-center gap-2 font-semibold">
            <Link href="/auth/signin">
              <LogOut size={16} /> Sign Out
            </Link>
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-6 md:p-10 bg-white">
        {children}
      </main>
    </div>
  );
}
