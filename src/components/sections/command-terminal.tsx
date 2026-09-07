"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Terminal, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  Activity, 
  Cpu, 
  Radio, 
  ShieldCheck, 
  Users, 
  ArrowRight,
  Sparkles,
  RefreshCw
} from "lucide-react";
import Link from "next/link";
import { brandData } from "@/data/brand";

interface LogEntry {
  time: string;
  subsystem: string;
  status: "OK" | "ACTIVE" | "VERIFIED" | "DISPATCHED";
  message: string;
  badgeColor: string;
}

const LIVE_LOGS: LogEntry[] = [
  {
    time: "02:14:22 IST",
    subsystem: "NIGHT_MOBILE_VAN",
    status: "OK",
    message: "Van-04 unannounced audit at Airport Concourse & Logistics Sector. Guards alert, gate registers signed.",
    badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30"
  },
  {
    time: "04:30:10 IST",
    subsystem: "PERIMETER_PATROL",
    status: "VERIFIED",
    message: "Heavy industrial yard muster verification complete. 0 breaches, CCTV cameras 100% online.",
    badgeColor: "text-blue-400 bg-blue-500/10 border-blue-500/30"
  },
  {
    time: "06:00:00 IST",
    subsystem: "SHIFT_MUSTER",
    status: "VERIFIED",
    message: "Day Shift roll call completed across Trichy, Chennai, Coimbatore & Hosur facilities. 100% turnout.",
    badgeColor: "text-blue-400 bg-blue-500/10 border-blue-500/30"
  },
  {
    time: "08:15:45 IST",
    subsystem: "RELIEF_SLA",
    status: "DISPATCHED",
    message: "Standby relief officer deployed to IT Park East Gate in 38 mins (Guaranteed SLA < 120 mins).",
    badgeColor: "text-purple-400 bg-purple-500/10 border-purple-500/30"
  },
  {
    time: "11:20:00 IST",
    subsystem: "FACILITY_HYGIENE",
    status: "OK",
    message: "5-step closed-loop auto-scrubber cycle completed in corporate concourse. Washroom log signed.",
    badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30"
  },
  {
    time: "14:45:12 IST",
    subsystem: "STATUTORY_AUDIT",
    status: "VERIFIED",
    message: "EPF/ESIC monthly ECR receipts generated for client compliance audit. Zero legal liabilities.",
    badgeColor: "text-amber-400 bg-amber-500/10 border-amber-500/30"
  },
  {
    time: "18:30:00 IST",
    subsystem: "EVENING_MUSTER",
    status: "ACTIVE",
    message: "Night shift handover commenced. Guard perimeter torch inspection & armed gate protocol armed.",
    badgeColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30"
  },
  {
    time: "22:00:15 IST",
    subsystem: "COMMAND_HQ",
    status: "OK",
    message: "Kottapattu HQ Central Control active. 24/7 emergency dispatch hotline: 0431-2991054 / 94437 20601.",
    badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30"
  }
];

export function CommandTerminalSection() {
  const [activeTab, setActiveTab] = useState<"logs" | "sla" | "command">("logs");
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleCount((prev) => (prev >= LIVE_LOGS.length ? 4 : prev + 1));
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 md:py-20 bg-[#f5f5f7] text-[#1d1d1f] border-t border-black/[0.08] relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-black/[0.08]">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-semibold tracking-wider uppercase">
                24/7 LIVE COMMAND TELEMETRY
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#1d1d1f]">
              Field Operations Terminal.
            </h2>
            <p className="text-xs sm:text-sm text-[#86868b] max-w-2xl font-normal leading-relaxed">
              Every post, every shift, every relief guard is accounted for. Real-time simulated telemetry from our Kottapattu Central Command Desk, roving supervisor night vans, and verified client deployments.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-white border border-black/[0.08] rounded-2xl p-3 px-4 text-center shadow-xs">
              <span className="text-[10px] font-semibold text-[#86868b] block uppercase">Guard Uptime</span>
              <span className="text-lg font-semibold text-[#1d1d1f] tabular-nums">99.98%</span>
            </div>
            <div className="bg-white border border-black/[0.08] rounded-2xl p-3 px-4 text-center shadow-xs">
              <span className="text-[10px] font-semibold text-[#86868b] block uppercase">Relief SLA</span>
              <span className="text-lg font-semibold text-[#0071e3] tabular-nums">&lt; 120m</span>
            </div>
            <div className="bg-white border border-black/[0.08] rounded-2xl p-3 px-4 text-center shadow-xs">
              <span className="text-[10px] font-semibold text-[#86868b] block uppercase">Night Audits</span>
              <span className="text-lg font-semibold text-emerald-600 tabular-nums">2:00 AM</span>
            </div>
          </div>
        </div>

        {/* The 21st.dev Inspired Terminal Shell */}
        <div className="bg-[#1d1d1f] text-white border border-black/[0.1] rounded-[28px] overflow-hidden shadow-2xl">
          {/* macOS-style Top Bar */}
          <div className="bg-[#161618] px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
              <span className="ml-3 font-mono text-xs text-zinc-400 flex items-center gap-2">
                <Terminal size={14} className="text-[#0071e3]" />
                jsm-command-node@kottapattu-hq:~ (telemetry-daemon v4.8)
              </span>
            </div>

            {/* Terminal View Switcher Tabs */}
            <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10 text-xs font-mono">
              <button
                type="button"
                onClick={() => setActiveTab("logs")}
                className={`px-3 py-1 rounded-lg transition-all ${
                  activeTab === "logs"
                    ? "bg-[#0071e3] text-white font-semibold shadow"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Live Stream
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("sla")}
                className={`px-3 py-1 rounded-lg transition-all ${
                  activeTab === "sla"
                    ? "bg-[#0071e3] text-white font-semibold shadow"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                SLA Guarantee
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("command")}
                className={`px-3 py-1 rounded-lg transition-all ${
                  activeTab === "command"
                    ? "bg-[#0071e3] text-white font-semibold shadow"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                HQ Hierarchy
              </button>
            </div>
          </div>

          {/* Terminal Body Content */}
          <div className="p-6 md:p-8 font-mono text-xs space-y-4 min-h-[380px]">
            {activeTab === "logs" && (
              <div className="space-y-3">
                <div className="text-zinc-400 pb-2 border-b border-zinc-800/80 flex items-center justify-between">
                  <span>STREAMING ACTIVE DEPLOYMENT TELEMETRY • KOTTAPATTU DISPATCH NODE</span>
                  <span className="flex items-center gap-1.5 text-emerald-400 text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    SYNCED
                  </span>
                </div>

                <div className="space-y-2">
                  {LIVE_LOGS.slice(0, visibleCount).map((log, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 rounded-xl bg-black/40 border border-zinc-800/60 hover:border-zinc-700 transition-colors"
                    >
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-zinc-400 text-[11px] tabular-nums">{log.time}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${log.badgeColor}`}>
                          {log.subsystem}
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[10px] font-extrabold">
                          {log.status}
                        </span>
                      </div>
                      <p className="text-zinc-300 text-xs flex-1 text-pretty">
                        {log.message}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-3 text-zinc-400 flex items-center gap-2">
                  <span className="text-emerald-400">$</span>
                  <span className="animate-pulse">listening for incoming roving supervisor checkpoints...</span>
                </div>
              </div>
            )}

            {activeTab === "sla" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-black/50 border border-zinc-800 space-y-3">
                  <div className="flex items-center gap-2 text-[#0071e3]">
                    <Clock size={16} />
                    <h4 className="font-bold uppercase tracking-wider text-white">2-Hour Relief SLA</h4>
                  </div>
                  <p className="text-zinc-400 leading-relaxed text-xs">
                    Contractual guarantee: If any deployed guard or facility marshal is absent, JSM guarantees a qualified replacement on-post within 120 minutes from our mobile standby reserve pool.
                  </p>
                  <div className="pt-2 border-t border-zinc-800/80 text-[11px] text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 size={13} />
                    <span>Contractually backed with penalty rebate clause.</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-black/50 border border-zinc-800 space-y-3">
                  <div className="flex items-center gap-2 text-[#0071e3]">
                    <ShieldAlert size={16} />
                    <h4 className="font-bold uppercase tracking-wider text-white">2:00 AM Mobile Van Audits</h4>
                  </div>
                  <p className="text-zinc-400 leading-relaxed text-xs">
                    Unannounced night inspection vans operated by Ex-Servicemen (ESM) Field Officers patrol all operational client premises between 01:00 AM and 04:00 AM to ensure 100% vigilance.
                  </p>
                  <div className="pt-2 border-t border-zinc-800/80 text-[11px] text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 size={13} />
                    <span>Digital biometric attendance & physical register audit.</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-black/50 border border-zinc-800 space-y-3">
                  <div className="flex items-center gap-2 text-[#0071e3]">
                    <ShieldCheck size={16} />
                    <h4 className="font-bold uppercase tracking-wider text-white">100% Statutory Indemnity</h4>
                  </div>
                  <p className="text-zinc-400 leading-relaxed text-xs">
                    Every deployed personnel has active EPF and ESIC registrations. JSM furnishes monthly Electronic Challan Returns (ECR) with client billing to indemnify clients from all labor liabilities.
                  </p>
                  <div className="pt-2 border-t border-zinc-800/80 text-[11px] text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 size={13} />
                    <span>Fully PSARA 2005 licensed by Home Dept of Tamil Nadu.</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-black/50 border border-zinc-800 space-y-3">
                  <div className="flex items-center gap-2 text-[#0071e3]">
                    <Sparkles size={16} />
                    <h4 className="font-bold uppercase tracking-wider text-white">5-Step Closed-Loop Hygiene</h4>
                  </div>
                  <p className="text-zinc-400 leading-relaxed text-xs">
                    Clean → Inspect → Report → Correct → Verify. Mechanized heavy-duty auto scrubber-driers and hospital-grade non-hazardous eco consumables for airport concourses and corporate campuses.
                  </p>
                  <div className="pt-2 border-t border-zinc-800/80 text-[11px] text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 size={13} />
                    <span>Hourly signed supervisor sanitization logs.</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "command" && (
              <div className="space-y-4">
                <div className="text-zinc-400 pb-2 border-b border-zinc-800 flex items-center justify-between">
                  <span>CENTRAL COMMAND LEADERSHIP &amp; ESCALATION MATRIX</span>
                  <span className="text-[#0071e3] text-xs">KOTTAPATTU HQ</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-black/60 border border-zinc-800 space-y-2">
                    <span className="text-[10px] font-mono text-[#0071e3] uppercase tracking-wider block">TIER 1 • MANAGING DIRECTOR</span>
                    <h4 className="text-sm font-bold text-white">Sweety J</h4>
                    <p className="text-[11px] text-zinc-300 font-medium">Proprietor &amp; Managing Director</p>
                    <p className="text-[11px] text-zinc-400 text-pretty">Master executive policy, statutory compliances, PSARA governance, and institutional vendor integrity.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-black/60 border border-zinc-800 space-y-2">
                    <span className="text-[10px] font-mono text-[#0071e3] uppercase tracking-wider block">TIER 2 • HEAD OF OPERATIONS</span>
                    <h4 className="text-sm font-bold text-white">Major AR Devadoss (Army-Veteran)</h4>
                    <p className="text-[11px] text-zinc-300 font-medium">Head of Operations</p>
                    <p className="text-[11px] text-zinc-400 text-pretty">Ex-Armed Forces veteran commanding field deployment, guard drills, 2:00 AM mobile patrols, and operational SOPs.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-black/60 border border-zinc-800 space-y-2">
                    <span className="text-[10px] font-mono text-[#0071e3] uppercase tracking-wider block">TIER 3 • CTO &amp; AUDIT</span>
                    <h4 className="text-sm font-bold text-white">R Jan Steve Daniel</h4>
                    <p className="text-[11px] text-zinc-300 font-medium">Chief Technical Officer &amp; Audit</p>
                    <p className="text-[11px] text-zinc-400 text-pretty">Oversees digital biometrics, document scanning/OCR operations, IT infrastructure, and statutory compliance audits.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Bar with Direct Action */}
          <div className="bg-[#161618] px-6 py-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Direct Dispatch Hotline: <strong className="text-white font-bold">{brandData.contact.phoneDisplay}</strong></span>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/get-quote"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-xs transition-all shadow-sm"
              >
                <span>Request Deployment SLA</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
