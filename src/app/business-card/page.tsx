"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Download, ArrowLeft, QrCode, Sparkles, CheckCircle2 } from "lucide-react";

export default function BusinessCardPage() {
  const [activeSide, setActiveSide] = useState<"front" | "back">("front");

  return (
    <main className="min-h-screen bg-[#07090E] text-white pt-28 pb-20 px-4 sm:px-6 md:px-12 selection:bg-[#C5A880] selection:text-black">
      <div className="max-w-5xl mx-auto space-y-12">
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
            <span>EXECUTIVE B2B PRINT-READY ASSETS (300 DPI)</span>
          </div>
        </div>

        {/* Title Section */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
            Official Executive <span className="text-[#C5A880]">Business Card</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto">
            Standard 3.5&quot; × 2.0&quot; dual-sided executive cards engineered for Proprietor Sweety R and Operations Head Major A Richard D.
          </p>
        </div>

        {/* Toggle Switcher */}
        <div className="flex justify-center">
          <div className="bg-zinc-900 p-1.5 rounded-2xl border border-zinc-800 flex items-center gap-2 shadow-lg">
            <button
              type="button"
              onClick={() => setActiveSide("front")}
              className={`px-6 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeSide === "front"
                  ? "bg-[#C5A880] text-black shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Card Front (Executive Crest)
            </button>
            <button
              type="button"
              onClick={() => setActiveSide("back")}
              className={`px-6 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeSide === "back"
                  ? "bg-[#C5A880] text-black shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Card Back (QR Code &amp; 6 Verticals)
            </button>
          </div>
        </div>

        {/* Card Stage Preview */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-[680px] aspect-[1050/600] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] border-2 border-zinc-700/60 transition-all">
            {activeSide === "front" ? (
              <Image
                src="/images/jsm_business_card_front.png"
                alt="JSM Business Card Front View"
                fill
                className="object-cover"
                priority
              />
            ) : (
              <Image
                src="/images/jsm_business_card_back.png"
                alt="JSM Business Card Back View"
                fill
                className="object-cover"
                priority
              />
            )}
          </div>
        </div>

        {/* Download Buttons Bar */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <a
            href="/images/jsm_business_card_front.png"
            download="JSM_Business_Card_Front_300DPI.png"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-black font-bold text-xs hover:bg-zinc-200 transition-all shadow-md cursor-pointer"
          >
            <Download size={14} />
            <span>Download Front Card (300 DPI)</span>
          </a>

          <a
            href="/images/jsm_business_card_back.png"
            download="JSM_Business_Card_Back_300DPI.png"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#C5A880] text-black font-bold text-xs hover:bg-[#b59870] transition-all shadow-md cursor-pointer"
          >
            <Download size={14} />
            <span>Download Back Card (With QR Code)</span>
          </a>

          <a
            href="/images/jsm_website_qr_code.png"
            download="JSM_Website_QR_Code_HD.png"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-800 text-zinc-200 border border-zinc-700 font-bold text-xs hover:bg-zinc-700 transition-all shadow-md cursor-pointer"
          >
            <QrCode size={14} className="text-[#C5A880]" />
            <span>Download Standalone QR Code</span>
          </a>
        </div>

        {/* QR Code Deep-Dive Box */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-4 flex justify-center">
            <div className="p-3 bg-white rounded-2xl shadow-xl border border-[#C5A880]/30 w-48 h-48 relative">
              <Image
                src="/images/jsm_website_qr_code.png"
                alt="JSM Website QR Code Scanner"
                fill
                className="object-contain p-2"
              />
            </div>
          </div>
          <div className="md:col-span-8 space-y-3">
            <span className="text-[10px] font-mono font-bold text-[#C5A880] uppercase tracking-wider block">
              INSTANT MOBILE ACCESS ENGINE
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase">
              High-Density Laser Scannable Barcode / QR Code
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Equipped with Error Correction Level H (30% redundancy) and the central metallic silver JSM crest. Compatible with all iOS Camera, Google Lens, and Android scanner apps to launch <strong>https://www.jsmintegratedservices.com</strong> instantly.
            </p>
            <div className="flex flex-wrap gap-4 pt-2 text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-emerald-500" /> 100% Smartphone Compatible</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-emerald-500" /> Vector Crisp at 300 DPI</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-emerald-500" /> Zero Distortion</span>
            </div>
          </div>
        </div>

        {/* Business Card Text Verification Specs */}
        <div className="bg-zinc-950 border border-zinc-800/80 rounded-2xl p-6 text-xs text-zinc-400 space-y-3">
          <h4 className="font-mono text-[11px] font-bold text-white uppercase tracking-wider">
            Print Production Specifications for Local Press / VistaPrint:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-[11px]">
            <div><span className="text-zinc-500 block">Dimensions:</span> 3.5&quot; × 2.0&quot; (1050 × 600 px)</div>
            <div><span className="text-zinc-500 block">Resolution:</span> 300 DPI Print Master</div>
            <div><span className="text-zinc-500 block">Paper Recommendation:</span> 400 GSM Matte Velvet with Spot UV</div>
            <div><span className="text-zinc-500 block">Coating:</span> Soft-Touch Anti-Scratch Lamination</div>
          </div>
        </div>
      </div>
    </main>
  );
}
