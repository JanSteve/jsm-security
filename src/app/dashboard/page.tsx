"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { 
  ShieldCheck, 
  Clock, 
  FileText, 
  HelpCircle, 
  Plus, 
  ExternalLink,
  ChevronRight
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const stats = [
    { label: "Active Services", value: "3", sub: "2 Security, 1 Facility", icon: ShieldCheck, color: "text-[#C5A880]" },
    { label: "Pending Requests", value: "2", sub: "1 Quote, 1 Incident", icon: Clock, color: "text-[#3B82F6]" },
    { label: "Documents", value: "12", sub: "SLA, Invoices, Audits", icon: FileText, color: "text-emerald-600" },
    { label: "Support Tickets", value: "0", sub: "No active tickets", icon: HelpCircle, color: "text-zinc-400" },
  ];

  const activities = [
    { type: "Contract Update", title: "Canary Wharf Security SLA signed", time: "2 hours ago", status: "Completed" },
    { type: "Maintenance", title: "CCTV Firmware Upgrade - Zone B", time: "1 day ago", status: "Completed" },
    { type: "Incident Request", title: "Keyholding patrol inspection request", time: "3 days ago", status: "In Progress" },
  ];

  return (
    <div className="space-y-10 bg-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-black tracking-tight">Welcome back, Enterprise Administrator</h1>
          <p className="text-sm text-zinc-500 font-medium mt-1">JSM Enterprise Portal • Canary Wharf Account</p>
        </div>
        <Button asChild className="bg-black text-white hover:bg-zinc-800 rounded-full h-11 px-6 font-semibold flex items-center gap-2 shadow-md">
          <Link href="/contact">
            <Plus size={18} /> New Request
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-zinc-50 border border-zinc-200/60 rounded-3xl p-6 flex flex-col justify-between shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">{stat.label}</p>
                  <h3 className="text-3xl font-black text-black mt-2">{stat.value}</h3>
                </div>
                <div className={`p-2.5 bg-white border border-zinc-200 rounded-2xl ${stat.color} shadow-sm`}>
                  <Icon size={20} />
                </div>
              </div>
              <p className="text-xs text-zinc-500 font-semibold mt-4 border-t border-zinc-200/60 pt-4">{stat.sub}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Recent Activity */}
        <div className="lg:col-span-2 bg-zinc-50 border border-zinc-200/60 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
          <div className="flex justify-between items-center pb-4 border-b border-zinc-200/60">
            <h3 className="text-xl font-bold text-black tracking-tight">Recent Portal Activity</h3>
            <Button variant="link" className="text-[#3B82F6] hover:text-[#C5A880] text-sm p-0 h-auto font-semibold">
              View All Activity
            </Button>
          </div>

          <div className="space-y-6">
            {activities.map((act, i) => (
              <div key={i} className="flex justify-between items-start gap-4 text-sm group">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-[#C5A880] uppercase tracking-widest">{act.type}</span>
                  <h4 className="font-bold text-black leading-tight group-hover:text-[#C5A880] transition-colors duration-200">
                    {act.title}
                  </h4>
                  <p className="text-xs text-zinc-400 font-medium">{act.time}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  act.status === "Completed" ? "bg-emerald-500/10 text-emerald-600" : "bg-[#3B82F6]/10 text-[#3B82F6]"
                }`}>
                  {act.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Quick Resources */}
        <div className="bg-zinc-50 border border-zinc-200/60 rounded-3xl p-6 md:p-8 space-y-6 flex flex-col justify-between shadow-sm">
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-black pb-4 border-b border-zinc-200/60 tracking-tight">Quick Documents</h3>
            
            <div className="space-y-4">
              <a href="#" className="flex justify-between items-center p-3.5 bg-white border border-zinc-200 rounded-2xl text-sm text-zinc-700 hover:text-black hover:border-[#C5A880]/30 transition-all duration-200 group shadow-sm">
                <span className="flex items-center gap-3">
                  <FileText size={18} className="text-[#C5A880]" />
                  Executive Security SLA.pdf
                </span>
                <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>

              <a href="#" className="flex justify-between items-center p-3.5 bg-white border border-zinc-200 rounded-2xl text-sm text-zinc-700 hover:text-black hover:border-[#C5A880]/30 transition-all duration-200 group shadow-sm">
                <span className="flex items-center gap-3">
                  <FileText size={18} className="text-[#C5A880]" />
                  Zone B Risk Assessment.pdf
                </span>
                <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>

              <a href="#" className="flex justify-between items-center p-3.5 bg-white border border-zinc-200 rounded-2xl text-sm text-zinc-700 hover:text-black hover:border-[#C5A880]/30 transition-all duration-200 group shadow-sm">
                <span className="flex items-center gap-3">
                  <FileText size={18} className="text-[#C5A880]" />
                  Q3 Facility Audit Report.pdf
                </span>
                <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>

          <div className="border-t border-zinc-200/60 pt-6 mt-6">
            <Button asChild variant="outline" className="w-full border-zinc-200 text-zinc-700 hover:bg-zinc-100 rounded-full h-11 flex justify-center items-center gap-2 font-semibold">
              <Link href="/contact">
                Contact Account Manager <ChevronRight size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
