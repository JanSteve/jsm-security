'use client';

import React, { useState } from 'react';
import { Calculator, QrCode, Star, PlayCircle, ShieldCheck } from 'lucide-react';
import { RoiCalculator } from './roi-calculator';
import { QueueSimulator } from './queue-simulator';
import { ReviewFilterWidget } from './review-filter-widget';
import { DigitalVideoPlayer } from './digital-video-player';

export interface InteractiveShowcaseProps {
  className?: string;
  initialTab?: 'video' | 'roi' | 'review' | 'queue';
}

export function InteractiveShowcase({
  className = '',
  initialTab = 'video',
}: InteractiveShowcaseProps) {
  const [activeTab, setActiveTab] = useState<'video' | 'roi' | 'review' | 'queue'>(initialTab);

  const tabs = [
    {
      id: 'video' as const,
      label: '2x Video Explainer',
      subtitle: 'Digital Services & WhatsApp',
      icon: PlayCircle,
      badge: 'Reel First on Mobile',
    },
    {
      id: 'roi' as const,
      label: 'Cost & Savings Calculator',
      subtitle: 'In-House vs JSM Staffing',
      icon: Calculator,
      badge: 'Procurement Tool',
    },
    {
      id: 'review' as const,
      label: 'Smart NFC Review Filter',
      subtitle: 'Dual-Routing Rating Demo',
      icon: Star,
      badge: 'Reputation Shield',
    },
    {
      id: 'queue' as const,
      label: 'WhatsApp Queue & Table QR',
      subtitle: 'Clinic Pass & Restaurant QR',
      icon: QrCode,
      badge: 'Direct Dispatch',
    },
  ];

  return (
    <section className={`space-y-6 text-left ${className}`}>
      {/* Section Header */}
      <div className="max-w-2xl space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold font-mono">
          <ShieldCheck size={14} />
          <span>Interactive Operations &amp; Digital Suite</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white font-bold tracking-tight">
          Test Our Operational Calculators &amp; Digital Tools
        </h2>
        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
          Simulate verified manpower cost savings, test live Google review filtering, and experience automated WhatsApp table orders in real time.
        </p>
      </div>

      {/* Segmented Tab Navigation: Sleek Obsidian Pills */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 p-1.5 bg-[#070A0F] border border-white/10 rounded-xl">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`p-3 rounded-lg text-left transition-all flex flex-col justify-between min-h-[52px] border cursor-pointer ${
                isActive
                  ? 'bg-black border-white/40 shadow-md text-white'
                  : 'bg-transparent border-transparent hover:bg-white/5 text-neutral-400 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${
                      isActive
                        ? 'bg-white text-black font-bold'
                        : 'bg-white/5 border border-white/10 text-neutral-400'
                    }`}
                  >
                    <Icon size={13} />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold truncate text-white">{tab.label}</span>
                </div>
              </div>
              <div className="flex items-center justify-between pl-8">
                <p className="text-[10px] text-neutral-400 truncate hidden sm:block">
                  {tab.subtitle}
                </p>
                <span
                  className={`text-[8px] font-mono font-semibold px-1.5 py-0.5 rounded-full uppercase shrink-0 ${
                    isActive
                      ? 'bg-white/20 text-white border border-white/30'
                      : 'bg-white/5 text-neutral-400'
                  }`}
                >
                  {tab.badge}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Widget Viewport */}
      <div className="pt-2">
        {activeTab === 'video' && <DigitalVideoPlayer />}
        {activeTab === 'roi' && <RoiCalculator />}
        {activeTab === 'review' && <ReviewFilterWidget />}
        {activeTab === 'queue' && <QueueSimulator />}
      </div>
    </section>
  );
}
