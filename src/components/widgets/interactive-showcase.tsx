'use client';

import React, { useState } from 'react';
import { Calculator, QrCode, Star, Sparkles, PlayCircle } from 'lucide-react';
import { RoiCalculator } from './roi-calculator';
import { QueueSimulator } from './queue-simulator';
import { ReviewFilterWidget } from './review-filter-widget';
import { DigitalVideoPlayer } from './digital-video-player';

interface InteractiveShowcaseProps {
  className?: string;
  initialTab?: 'video' | 'roi' | 'queue' | 'review';
}

export function InteractiveShowcase({
  className = '',
  initialTab = 'video',
}: InteractiveShowcaseProps) {
  const [activeTab, setActiveTab] = useState<'video' | 'roi' | 'queue' | 'review'>(initialTab);

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
      subtitle: 'Live Token & Order Simulator',
      icon: QrCode,
      badge: 'Digital Operations',
    },
    {
      id: 'review' as const,
      label: 'Smart NFC Review Standee',
      subtitle: 'Dual-Routing Reputation Shield',
      icon: Star,
      badge: 'Local 3-Pack Growth',
    },
  ];

  return (
    <section className={`space-y-8 ${className}`}>
      {/* Section Header */}
      <div className="max-w-3xl space-y-3 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F2A47]/8 text-[#0F2A47] text-xs font-semibold">
          <Sparkles size={14} className="text-[#9C7A3C]" />
          <span>Interactive Generative UI Suite &bull; Test Before Deploying</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#14181F] font-semibold tracking-tight">
          Test Our Operational Engines &amp; Digital Automations
        </h2>
        <p className="text-sm sm:text-base text-[#4A5160] leading-relaxed">
          Watch our fast-track 2x video walkthrough, simulate real manpower budgets, test clinic token tracking, and experience Google review acceleration live in your browser.
        </p>
      </div>

      {/* Segmented Tab Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-1.5 bg-[#F6F7F9] border border-[#E4E7EC] rounded-xl">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`p-3.5 sm:p-4 rounded-lg text-left transition-all flex flex-col justify-between min-h-[56px] border ${
                isActive
                  ? 'bg-white border-[#0F2A47]/20 shadow-xs text-[#14181F]'
                  : 'bg-transparent border-transparent hover:bg-white/60 text-[#4A5160] hover:text-[#14181F]'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-md flex items-center justify-center ${
                      isActive
                        ? 'bg-[#0F2A47] text-white'
                        : 'bg-white border border-[#E4E7EC] text-[#4A5160]'
                    }`}
                  >
                    <Icon size={14} />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold">{tab.label}</span>
                </div>
                <span
                  className={`text-[9px] font-mono font-semibold px-2 py-0.5 rounded-full uppercase ${
                    isActive
                      ? 'bg-[#0F2A47]/10 text-[#0F2A47]'
                      : 'bg-white border border-[#E4E7EC] text-[#4A5160]'
                  }`}
                >
                  {tab.badge}
                </span>
              </div>
              <p className="text-[11px] text-[#4A5160] pl-9 hidden sm:block">
                {tab.subtitle}
              </p>
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
      </div>
    </section>
  );
}
