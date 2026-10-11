'use client';

import React, { useState } from 'react';
import { Calculator, QrCode, Star, Sparkles, PlayCircle, Box } from 'lucide-react';
import { RoiCalculator } from './roi-calculator';
import { QueueSimulator } from './queue-simulator';
import { ReviewFilterWidget } from './review-filter-widget';
import { DigitalVideoPlayer } from './digital-video-player';
import { NfcStandee3D } from './nfc-standee-3d';
import { WhatsappPhone3D } from './whatsapp-phone-3d';

export interface InteractiveShowcaseProps {
  className?: string;
  initialTab?: 'video' | 'roi' | 'queue' | 'review' | '3d-artifacts';
}

export function InteractiveShowcase({
  className = '',
  initialTab = 'video',
}: InteractiveShowcaseProps) {
  const [activeTab, setActiveTab] = useState<'video' | 'roi' | 'queue' | 'review' | '3d-artifacts'>(initialTab);

  const tabs = [
    {
      id: 'video' as const,
      label: '2x Video Explainer',
      subtitle: 'Smart Automations & NFC Standee',
      icon: PlayCircle,
      badge: 'Fast Walkthrough',
    },
    {
      id: 'roi' as const,
      label: 'Pricing & ROI Calculator',
      subtitle: 'In-House vs JSM Managed Savings',
      icon: Calculator,
      badge: 'B2B Procurement',
    },
    {
      id: 'queue' as const,
      label: 'Clinic Queue & Table QR',
      subtitle: '3D Floating Phone & Live Sim',
      icon: QrCode,
      badge: '3D Phone Mockup',
    },
    {
      id: 'review' as const,
      label: 'Smart NFC Review Standee',
      subtitle: '3D Acrylic Physics & Shield',
      icon: Star,
      badge: '3D Standee Physics',
    },
    {
      id: '3d-artifacts' as const,
      label: '3D Physical Lab',
      subtitle: 'NFC Standee & Glass Phone',
      icon: Box,
      badge: 'Interactive 3D Suite',
    },
  ];

  return (
    <section className={`space-y-8 ${className}`}>
      {/* Section Header */}
      <div className="max-w-3xl space-y-3 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F2A47]/8 text-[#0F2A47] text-xs font-semibold">
          <Sparkles size={14} className="text-[#9C7A3C]" />
          <span>Interactive 3D Physical Artifacts &amp; Generative UI Suite</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#14181F] font-semibold tracking-tight">
          Test Our Operational Engines &amp; 3D Digital Automations
        </h2>
        <p className="text-sm sm:text-base text-[#4A5160] leading-relaxed">
          Interact with our hardware-accelerated 3D acrylic NFC counter standee with drag physics, test live WhatsApp table ordering on a floating 3D glass smartphone mockup, and audit enterprise manpower budgets right in your browser.
        </p>
      </div>

      {/* Segmented Tab Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 p-1.5 bg-[#F6F7F9] border border-[#E4E7EC] rounded-xl">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`p-3 rounded-lg text-left transition-all flex flex-col justify-between min-h-[56px] border cursor-pointer ${
                isActive
                  ? 'bg-white border-[#0F2A47]/20 shadow-xs text-[#14181F]'
                  : 'bg-transparent border-transparent hover:bg-white/60 text-[#4A5160] hover:text-[#14181F]'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 ${
                      isActive
                        ? 'bg-[#0F2A47] text-white'
                        : 'bg-white border border-[#E4E7EC] text-[#4A5160]'
                    }`}
                  >
                    <Icon size={14} />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold truncate">{tab.label}</span>
                </div>
              </div>
              <div className="flex items-center justify-between pl-9 mt-0.5">
                <p className="text-[10px] text-[#4A5160] truncate hidden sm:block">
                  {tab.subtitle}
                </p>
                <span
                  className={`text-[8px] font-mono font-semibold px-1.5 py-0.5 rounded-full uppercase shrink-0 ${
                    isActive
                      ? 'bg-[#0F2A47]/10 text-[#0F2A47]'
                      : 'bg-white border border-[#E4E7EC] text-[#4A5160]'
                  }`}
                >
                  {tab.badge}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Render Active Widget */}
      <div className="pt-2">
        {activeTab === 'video' && <DigitalVideoPlayer />}
        {activeTab === 'roi' && <RoiCalculator />}
        {activeTab === 'queue' && <QueueSimulator />}
        {activeTab === 'review' && <ReviewFilterWidget />}
        {activeTab === '3d-artifacts' && (
          <div className="bg-white border border-[#E4E7EC] rounded-xl shadow-xs overflow-hidden p-6 sm:p-8 space-y-8">
            <div className="max-w-2xl space-y-1.5 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F2A47]/10 text-[#0F2A47] text-xs font-semibold">
                <Box size={14} className="text-[#9C7A3C]" />
                <span>3D Physical Artifacts Sandbox</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#14181F]">
                Hardware-Accelerated 3D Products in Motion
              </h3>
              <p className="text-xs sm:text-sm text-[#4A5160]">
                Rotate, drag, and test our flagship physical products in full 3D coordinate space with real-time Euler physics, synthesized audio chimes, and live WhatsApp cloud dispatch.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Product 1: 3D Acrylic NFC Standee */}
              <div className="p-5 rounded-2xl bg-[#F6F7F9] border border-[#E4E7EC] flex flex-col items-center">
                <div className="w-full flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#14181F]">Product #1: Smart NFC Counter Standee</span>
                  <span className="text-[10px] font-mono bg-[#9C7A3C]/10 text-[#9C7A3C] px-2 py-0.5 rounded-full font-bold">
                    Pure CSS 3D Prism
                  </span>
                </div>
                <NfcStandee3D />
              </div>

              {/* Product 2: 3D Floating Glass WhatsApp Smartphone */}
              <div className="p-5 rounded-2xl bg-[#F6F7F9] border border-[#E4E7EC] flex flex-col items-center">
                <div className="w-full flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#14181F]">Product #2: WhatsApp Glass Smartphone Mockup</span>
                  <span className="text-[10px] font-mono bg-[#0F2A47]/10 text-[#0F2A47] px-2 py-0.5 rounded-full font-bold">
                    Motion Levitation
                  </span>
                </div>
                <WhatsappPhone3D initialMode="table-order" />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
