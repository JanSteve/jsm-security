"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, 
  Copy, 
  Check, 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  Sparkles, 
  ShieldCheck, 
  Smartphone, 
  Monitor, 
  CheckCircle2 
} from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { brandData } from "@/data/brand";

interface SignatureProfile {
  id: string;
  name: string;
  title: string;
  department: string;
  phone: string;
  email: string;
}

const profiles: SignatureProfile[] = [
  {
    id: "sweety",
    name: "SWEETY J",
    title: "Proprietor & Managing Director",
    department: "Executive Directorate",
    phone: "+91 90808 63448",
    email: "contact@jsmintegratedservices.com"
  },
  {
    id: "devadoss",
    name: "MAJOR AR DEVADOSS (ARMY-VETERAN)",
    title: "Head of Operations",
    department: "Field Command & Tactical Operations",
    phone: "+91 90808 63448",
    email: "contact@jsmintegratedservices.com"
  },
  {
    id: "jan-steve",
    name: "R JAN STEVE DANIEL",
    title: "Chief Technical Officer & Audit",
    department: "Technology Systems & Compliance Audit",
    phone: "+91 90808 63448",
    email: "contact@jsmintegratedservices.com"
  },
  {
    id: "operations",
    name: "24/7 OPERATIONS DESK",
    title: "Central Command & Dispatch",
    department: "Integrated Security & Facility Operations",
    phone: "+91 90808 63448",
    email: "jsmintegratedservices@outlook.com"
  }
];

export default function EmailSignaturePage() {
  const [selectedProfile, setSelectedProfile] = useState<SignatureProfile>(profiles[0]);
  const [copied, setCopied] = useState(false);
  const [activeClientTab, setActiveClientTab] = useState<"web" | "mobile" | "desktop">("web");
  const signatureRef = useRef<HTMLDivElement>(null);

  const copyToClipboard = async () => {
    if (!signatureRef.current) return;
    try {
      const htmlContent = signatureRef.current.innerHTML;
      const textContent = signatureRef.current.innerText;

      const blobHtml = new Blob([htmlContent], { type: "text/html" });
      const blobText = new Blob([textContent], { type: "text/plain" });

      const data = [
        new ClipboardItem({
          "text/html": blobHtml,
          "text/plain": blobText,
        }),
      ];

      await navigator.clipboard.write(data);
      setCopied(true);
      setTimeout(() => setCopied(false), 3500);
    } catch (err) {
      console.error("Clipboard copy failed, falling back to execCommand:", err);
      // Fallback
      const range = document.createRange();
      range.selectNode(signatureRef.current);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
      document.execCommand("copy");
      selection?.removeAllRanges();
      setCopied(true);
      setTimeout(() => setCopied(false), 3500);
    }
  };

  return (
    <main className="min-h-screen bg-[#07090E] text-white pt-28 pb-24 px-4 sm:px-6 md:px-12 selection:bg-[#C5A880] selection:text-black">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} /> Back to Official Portal
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 text-[#C5A880] text-xs font-mono font-bold">
            <Sparkles size={13} />
            <span>OUTLOOK &amp; ENTERPRISE EMAIL SIGNATURE ENGINE</span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
            Corporate Email <span className="text-[#C5A880]">Signature Generator</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Generate and copy permanent corporate email signatures modeled directly after elite enterprise security standards (Checkmate &amp; SIS benchmark). Auto-attaches to every email without manual typing.
          </p>
        </div>

        {/* Profile Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {profiles.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setSelectedProfile(p)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                selectedProfile.id === p.id
                  ? "bg-[#C5A880] text-black border-[#C5A880] shadow-md scale-105"
                  : "bg-zinc-900/90 text-zinc-300 border-zinc-800 hover:border-zinc-700 hover:text-white"
              }`}
            >
              {p.name.split(" ")[0]} ({p.title.split("&")[0].trim()})
            </button>
          ))}
        </div>

        {/* Signature Live Preview Box */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              LIVE EMAIL SIGNATURE PREVIEW (HTML RICH TEXT)
            </span>

            <button
              type="button"
              onClick={copyToClipboard}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                copied
                  ? "bg-emerald-500 text-black shadow-lg"
                  : "bg-[#C5A880] hover:bg-[#b59870] text-black shadow-md active:scale-95"
              }`}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              <span>{copied ? "Copied! Ready to Paste in Outlook" : "Copy Signature to Clipboard"}</span>
            </button>
          </div>

          {/* Rendered Container */}
          <div className="p-6 sm:p-8 rounded-3xl bg-black border-2 border-zinc-800 shadow-2xl overflow-x-auto">
            <div ref={signatureRef} className="text-zinc-200">
              {/* Actual HTML Email Signature Table that pastes cleanly into Outlook */}
              <div style={{ fontFamily: "Arial, Helvetica, sans-serif", fontSize: "13px", lineHeight: "1.4", color: "#e4e4e7" }}>
                <p style={{ margin: "0 0 16px 0", color: "#a1a1aa", fontSize: "13px" }}>
                  Thanks &amp; Regards,
                </p>

                <table cellPadding="0" cellSpacing="0" style={{ borderCollapse: "collapse", border: "1px solid #27272a", backgroundColor: "#09090b", maxWidth: "620px", width: "100%" }}>
                  <tbody>
                    <tr>
                      {/* Left Column: Dual Logos */}
                      <td style={{ verticalAlign: "top", padding: "16px 14px", width: "120px", borderRight: "1px solid #27272a", textAlign: "center" }}>
                        {/* Master Logo */}
                        <div style={{ marginBottom: "12px" }}>
                          <img
                            src="https://www.jsmintegratedservices.com/images/jsm_logo_transparent.png"
                            alt="JSM Integrated Services"
                            width="85"
                            height="85"
                            style={{ display: "block", margin: "0 auto", borderRadius: "50%", border: "1px solid #3f3f46" }}
                          />
                        </div>
                        {/* PSARA / ISO Trust Badge */}
                        <div style={{ backgroundColor: "#18181b", border: "1px solid #3f3f46", borderRadius: "4px", padding: "4px 2px", textAlign: "center" }}>
                          <span style={{ fontSize: "8px", fontWeight: "bold", color: "#C5A880", display: "block", letterSpacing: "0.5px" }}>
                            PSARA 2005
                          </span>
                          <span style={{ fontSize: "7px", color: "#a1a1aa", display: "block", textTransform: "uppercase" }}>
                            Govt Licensed
                          </span>
                        </div>
                      </td>

                      {/* Right Column: Contact Details */}
                      <td style={{ verticalAlign: "top", padding: "16px 18px" }}>
                        {/* Name & Title */}
                        <div style={{ marginBottom: "6px" }}>
                          <span style={{ fontSize: "14px", fontWeight: "bold", color: "#60a5fa", letterSpacing: "0.5px" }}>
                            {selectedProfile.name}
                          </span>
                          <span style={{ fontSize: "13px", color: "#e4e4e7", fontWeight: "normal" }}>
                            {" "}| {selectedProfile.title}
                          </span>
                        </div>

                        {/* Company Name */}
                        <div style={{ fontSize: "13px", fontWeight: "bold", color: "#ffffff", marginBottom: "8px" }}>
                          JSM Integrated Services
                        </div>

                        {/* Registered Address */}
                        <div style={{ fontSize: "11px", color: "#d4d4d8", lineHeight: "1.4", marginBottom: "10px" }}>
                          Plot No: 112, SF No: 122, RVS Nagar, Kottapattu Post, | Tiruchirappalli - 620 021. | Tamil Nadu, India.
                        </div>

                        {/* Contact Meta */}
                        <table cellPadding="0" cellSpacing="0" style={{ fontSize: "11px", color: "#d4d4d8", lineHeight: "1.5", marginBottom: "12px" }}>
                          <tbody>
                            <tr>
                              <td style={{ fontWeight: "bold", color: "#a1a1aa", paddingRight: "8px" }}>Call</td>
                              <td>: <a href="tel:+919080863448" style={{ color: "#60a5fa", textDecoration: "none", fontWeight: "bold" }}>+91 90808 63448</a></td>
                            </tr>
                            <tr>
                              <td style={{ fontWeight: "bold", color: "#a1a1aa", paddingRight: "8px" }}>Email</td>
                              <td>: <a href={`mailto:${selectedProfile.email}`} style={{ color: "#c084fc", textDecoration: "none" }}>{selectedProfile.email}</a></td>
                            </tr>
                            <tr>
                              <td style={{ fontWeight: "bold", color: "#a1a1aa", paddingRight: "8px" }}>Web</td>
                              <td>: <a href="https://www.jsmintegratedservices.com" target="_blank" rel="noopener noreferrer" style={{ color: "#c084fc", textDecoration: "none" }}>www.jsmintegratedservices.com</a></td>
                            </tr>
                          </tbody>
                        </table>

                        {/* Bottom Services Line */}
                        <div style={{ borderTop: "1px solid #27272a", paddingTop: "8px", fontSize: "10px", color: "#a1a1aa", lineHeight: "1.4" }}>
                          Security &amp; Guarding (SAC 998525) | Contract Manpower (SAC 998513) | Facility Management (SAC 998533) | GeM &amp; Tender Support | OCR Scanning &amp; IT | CSC Citizen Services
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Step-by-Step Outlook Setup Guide */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-10 space-y-6 shadow-xl">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold text-[#C5A880] uppercase tracking-wider block">
              PERMANENT ONE-TIME CONFIGURATION
            </span>
            <h3 className="text-2xl font-black text-white uppercase tracking-tight">
              How to Save Once in Outlook (Never Type Again)
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400">
              Choose your device below for exact step-by-step instructions:
            </p>
          </div>

          {/* Client Tabs */}
          <div className="flex gap-2 border-b border-zinc-800 pb-3">
            <button
              type="button"
              onClick={() => setActiveClientTab("web")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeClientTab === "web"
                  ? "bg-[#C5A880] text-black"
                  : "bg-zinc-800 text-zinc-400 hover:text-white"
              }`}
            >
              <Globe size={13} /> Outlook Web (Browser)
            </button>
            <button
              type="button"
              onClick={() => setActiveClientTab("mobile")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeClientTab === "mobile"
                  ? "bg-[#C5A880] text-black"
                  : "bg-zinc-800 text-zinc-400 hover:text-white"
              }`}
            >
              <Smartphone size={13} /> iPhone / Android Outlook App
            </button>
            <button
              type="button"
              onClick={() => setActiveClientTab("desktop")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeClientTab === "desktop"
                  ? "bg-[#C5A880] text-black"
                  : "bg-zinc-800 text-zinc-400 hover:text-white"
              }`}
            >
              <Monitor size={13} /> Outlook Desktop (Mac / Windows)
            </button>
          </div>

          {/* Tab 1: Web Instructions */}
          {activeClientTab === "web" && (
            <div className="space-y-3 text-xs text-zinc-300">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-950 border border-zinc-800/80">
                <span className="w-5 h-5 rounded-full bg-[#C5A880] text-black font-bold flex items-center justify-center shrink-0 text-[10px]">1</span>
                <div>
                  <strong>Click the button above:</strong> Click <em>"Copy Signature to Clipboard"</em>.
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-950 border border-zinc-800/80">
                <span className="w-5 h-5 rounded-full bg-[#C5A880] text-black font-bold flex items-center justify-center shrink-0 text-[10px]">2</span>
                <div>
                  <strong>Open Outlook Web:</strong> Go to <a href="https://outlook.live.com" target="_blank" rel="noopener noreferrer" className="text-[#C5A880] underline font-mono">outlook.live.com</a> or <a href="https://outlook.office.com" target="_blank" rel="noopener noreferrer" className="text-[#C5A880] underline font-mono">outlook.office.com</a> and sign in.
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-950 border border-zinc-800/80">
                <span className="w-5 h-5 rounded-full bg-[#C5A880] text-black font-bold flex items-center justify-center shrink-0 text-[10px]">3</span>
                <div>
                  <strong>Open Settings:</strong> Click the gear icon ⚙️ in the top-right corner &gt; <em>Mail</em> &gt; <em>Compose and reply</em>.
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-950 border border-zinc-800/80">
                <span className="w-5 h-5 rounded-full bg-[#C5A880] text-black font-bold flex items-center justify-center shrink-0 text-[10px]">4</span>
                <div>
                  <strong>Paste &amp; Save:</strong> Click <em>"+ New signature"</em>, name it "JSM Official", click inside the text box and press <strong>Ctrl+V</strong> (or <strong>Cmd+V</strong> on Mac).
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-950 border border-zinc-800/80">
                <span className="w-5 h-5 rounded-full bg-[#C5A880] text-black font-bold flex items-center justify-center shrink-0 text-[10px]">5</span>
                <div>
                  <strong>Set as Default:</strong> Under <em>"Select default signatures"</em>, set <strong>For new messages:</strong> JSM Official, and <strong>For replies/forwards:</strong> JSM Official. Click <strong>Save</strong>!
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Mobile Instructions */}
          {activeClientTab === "mobile" && (
            <div className="space-y-3 text-xs text-zinc-300">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-950 border border-zinc-800/80">
                <span className="w-5 h-5 rounded-full bg-[#C5A880] text-black font-bold flex items-center justify-center shrink-0 text-[10px]">1</span>
                <div>
                  <strong>Copy Signature:</strong> Click the gold <em>"Copy Signature to Clipboard"</em> button above on your phone browser.
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-950 border border-zinc-800/80">
                <span className="w-5 h-5 rounded-full bg-[#C5A880] text-black font-bold flex items-center justify-center shrink-0 text-[10px]">2</span>
                <div>
                  <strong>Open Outlook App:</strong> Open the Outlook app on your iPhone or Android phone.
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-950 border border-zinc-800/80">
                <span className="w-5 h-5 rounded-full bg-[#C5A880] text-black font-bold flex items-center justify-center shrink-0 text-[10px]">3</span>
                <div>
                  <strong>Go to Settings:</strong> Tap your profile circle in the top-left, then tap the gear icon ⚙️ at the bottom-left.
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-950 border border-zinc-800/80">
                <span className="w-5 h-5 rounded-full bg-[#C5A880] text-black font-bold flex items-center justify-center shrink-0 text-[10px]">4</span>
                <div>
                  <strong>Paste Signature:</strong> Tap <em>Signature</em>, erase "Get Outlook for iOS / Android", hold down and tap <strong>Paste</strong>, then tap the checkmark ✓ to save!
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Desktop Instructions */}
          {activeClientTab === "desktop" && (
            <div className="space-y-3 text-xs text-zinc-300">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-950 border border-zinc-800/80">
                <span className="w-5 h-5 rounded-full bg-[#C5A880] text-black font-bold flex items-center justify-center shrink-0 text-[10px]">1</span>
                <div>
                  <strong>Open Outlook App:</strong> Open Microsoft Outlook on your Windows PC or Mac.
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-950 border border-zinc-800/80">
                <span className="w-5 h-5 rounded-full bg-[#C5A880] text-black font-bold flex items-center justify-center shrink-0 text-[10px]">2</span>
                <div>
                  <strong>Open Signatures:</strong> Go to <em>File</em> &gt; <em>Options</em> &gt; <em>Mail</em> &gt; <em>Signatures</em> (or <em>Outlook</em> &gt; <em>Settings</em> &gt; <em>Signatures</em> on Mac).
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-950 border border-zinc-800/80">
                <span className="w-5 h-5 rounded-full bg-[#C5A880] text-black font-bold flex items-center justify-center shrink-0 text-[10px]">3</span>
                <div>
                  <strong>Create &amp; Paste:</strong> Click <em>New</em>, label it "JSM Corporate", paste into the edit window (Ctrl+V / Cmd+V), and set as default for New Messages and Replies.
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
