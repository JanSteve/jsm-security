"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { 
  ShieldCheck, 
  Clock, 
  FileText, 
  UserCheck, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink,
  ChevronRight,
  Sparkles
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const stats = [
    { label: "Active Guard Posts", value: "18 / 18", sub: "100% Shift Attendance", icon: ShieldCheck, color: "text-black" },
    { label: "Housekeeping SLA", value: "99.4%", sub: "5-Step Hygiene Compliant", icon: Sparkles, color: "text-[#e9c176]" },
    { label: "Surprise Night Audits", value: "4 Done", sub: "Last audit at 02:14 AM IST", icon: Clock, color: "text-emerald-700" },
    { label: "Statutory Compliance", value: "100%", sub: "PF / ESI Challans Verified", icon: FileText, color: "text-zinc-700" },
  ];

  const livePosts = [
    { post: "Main Gate Alpha", personnel: "M. Murugan (Security Supervisor)", shift: "06:00 - 18:00", status: "On-Duty", verified: "Biometric 05:54 AM" },
    { post: "Perimeter Sector North", personnel: "K. Rajendran (Security Guard)", shift: "06:00 - 18:00", status: "On-Duty", verified: "Biometric 05:58 AM" },
    { post: "Corporate Lobby & Visitor Desk", personnel: "S. Priya (Front-Desk Security)", shift: "08:00 - 20:00", status: "On-Duty", verified: "Biometric 07:50 AM" },
    { post: "Facility Block B Hygiene", personnel: "A. Lakshmi (Senior Housekeeper)", shift: "07:00 - 15:00", status: "Completed Step 3", verified: "Checklist Verified" },
  ];

  const recentIncidents = [
    { id: "INC-8921", title: "Unscheduled vendor delivery pass verified & logged", time: "Today 11:20 AM", status: "RESOLVED", sev: "Low" },
    { id: "INC-8919", title: "Quarterly fire extinguisher pressure inspection completed", time: "Yesterday 16:45 PM", status: "LOGGED", sev: "Routine" },
    { id: "INC-8914", title: "Night patrol gate lock audit completed (Sector C)", time: "21 Aug, 02:14 AM", status: "VERIFIED", sev: "Routine" },
  ];

  return (
    <main className="min-h-screen bg-[#fbf9f4] text-zinc-900 pt-28 pb-24 px-4 md:px-12 selection:bg-[#ffdea5] selection:text-black">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header matching Stitch */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-zinc-200/80">
          <div>
            <div className="inline-flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A880]">
                LIVE OPERATIONS MONITORING
              </span>
            </div>
            <h1 className="text-3xl font-black text-black tracking-tight">
              Enterprise Client Operations Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 font-medium mt-0.5">
              JSM Integrated Services • Live Deployment Feeds for Tamil Nadu Facilities
            </p>
          </div>

          <div className="flex gap-2.5">
            <Button
              asChild
              variant="outline"
              className="bg-white border border-zinc-300 text-xs font-bold text-black hover:bg-zinc-100 rounded-sm h-10 px-4"
            >
              <Link href="/contact">
                Schedule Extra Manpower
              </Link>
            </Button>
            <Button
              asChild
              className="bg-black text-white hover:bg-zinc-800 text-xs font-bold uppercase tracking-wider rounded-sm h-10 px-5 border-b-2 border-[#e9c176] shadow-sm"
            >
              <Link href="/contact">
                Log Operational Ticket
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Grid matching Stitch */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white border border-zinc-200/80 rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:border-black transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest">{stat.label}</p>
                    <h3 className="text-3xl font-black text-black mt-2 font-mono">{stat.value}</h3>
                  </div>
                  <div className="p-2.5 bg-zinc-50 border border-zinc-200 rounded-xl shadow-xs">
                    <Icon size={18} className={stat.color} />
                  </div>
                </div>
                <p className="text-xs text-zinc-500 font-medium mt-4 border-t border-zinc-100 pt-3 flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-600 flex-shrink-0" />
                  <span>{stat.sub}</span>
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Live Post Duty Roster Table */}
        <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-4 border-b border-zinc-100">
            <div>
              <h3 className="text-xl font-bold text-black tracking-tight">Active Post Duty Roster</h3>
              <p className="text-xs text-zinc-500">Live deployment verification and biometric timestamp sync</p>
            </div>
            <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-full">
              SLA STATUS: OPTIMAL (100%)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-200 text-[10px] font-extrabold uppercase tracking-widest text-zinc-400">
                  <th className="pb-3">Operational Post</th>
                  <th className="pb-3">Assigned Personnel</th>
                  <th className="pb-3">Shift Hours</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 font-medium">
                {livePosts.map((post, idx) => (
                  <tr key={idx} className="hover:bg-zinc-50/60 transition-colors">
                    <td className="py-3.5 font-bold text-black">{post.post}</td>
                    <td className="py-3.5 text-zinc-700">{post.personnel}</td>
                    <td className="py-3.5 font-mono text-zinc-500">{post.shift}</td>
                    <td className="py-3.5">
                      <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-bold text-[10px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {post.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right font-mono text-zinc-500">{post.verified}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Incidents and Compliance Download */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Incident Log */}
          <div className="lg:col-span-2 bg-white border border-zinc-200/80 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
            <div className="flex justify-between items-center pb-4 border-b border-zinc-100">
              <div>
                <h3 className="text-xl font-bold text-black tracking-tight">Recent Daily Incident Register</h3>
                <p className="text-xs text-zinc-500">Transparent shift logs and supervisor inspection notes</p>
              </div>
            </div>

            <div className="space-y-4">
              {recentIncidents.map((inc) => (
                <div key={inc.id} className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200/60 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-[#C5A880]">{inc.id}</span>
                      <span className="text-[10px] font-semibold text-zinc-400">• {inc.time}</span>
                    </div>
                    <p className="text-xs font-bold text-black">{inc.title}</p>
                  </div>
                  <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full w-fit">
                    {inc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Statutory Compliance Box */}
          <div className="bg-black text-white rounded-3xl p-6 md:p-8 space-y-6 shadow-lg flex flex-col justify-between border border-zinc-800">
            <div className="space-y-4">
              <span className="text-[10px] font-bold tracking-widest text-[#C5A880] uppercase block">
                COMPLIANCE VAULT
              </span>
              <h3 className="text-xl font-black text-white">Statutory Records &amp; Challans</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Download monthly audited challans for Provident Fund (PF), Employee State Insurance (ESI), and GST filings for full client peace of mind.
              </p>
            </div>

            <div className="space-y-2.5 pt-4">
              <Button
                asChild
                className="w-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-bold text-white rounded-sm h-10 flex items-center justify-between px-4"
              >
                <a href="mailto:jsmintegratedservices@outlook.com?subject=Request%20Monthly%20Compliance%20Challans">
                  <span>August 2026 PF/ESI Challan</span>
                  <Download size={15} className="text-[#C5A880]" />
                </a>
              </Button>
              <Button
                asChild
                className="w-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-bold text-white rounded-sm h-10 flex items-center justify-between px-4"
              >
                <a href="mailto:jsmintegratedservices@outlook.com?subject=Request%20Supervisor%20Audit%20Report">
                  <span>Night Audit Inspection Log</span>
                  <Download size={15} className="text-[#C5A880]" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
