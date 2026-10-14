import React from 'react';
import { cn } from '@/lib/utils';

export interface RadarTelemetryBadgeProps {
  label?: string;
  sublabel?: string;
  className?: string;
  pulseColor?: 'emerald' | 'cyan';
}

export function RadarTelemetryBadge({
  label = "24/7 CENTRAL COMMAND",
  sublabel = "ACTIVE MUSTER",
  className = "",
  pulseColor = 'emerald'
}: RadarTelemetryBadgeProps) {
  const isEmerald = pulseColor === 'emerald';

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full",
        "bg-[#030712]/90 border border-cyan-500/30 backdrop-blur-xl",
        "shadow-[0_0_20px_rgba(14,165,233,0.25)] select-none",
        className
      )}
    >
      {/* Concentric Dual-Pulse Radar Indicator */}
      <span className="relative flex h-2.5 w-2.5 shrink-0">
        {/* Outward expanding radar ping ring */}
        <span
          className={cn(
            "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
            isEmerald ? "bg-emerald-400" : "bg-cyan-400"
          )}
        />
        {/* Outer ambient pulse aura */}
        <span
          className={cn(
            "absolute -inset-1 rounded-full border animate-pulse",
            isEmerald ? "border-emerald-400/40" : "border-cyan-400/40"
          )}
        />
        {/* Solid glowing radar core */}
        <span
          className={cn(
            "relative inline-flex rounded-full h-2.5 w-2.5",
            isEmerald
              ? "bg-emerald-400 shadow-[0_0_8px_#10B981]"
              : "bg-cyan-400 shadow-[0_0_8px_#0EA5E9]"
          )}
        />
      </span>

      {/* High-Contrast Telemetry Copy */}
      <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold tracking-wider uppercase">
        <span className="text-white">{label}</span>
        <span className="text-cyan-400">&bull;</span>
        <span className="text-cyan-300 font-extrabold">{sublabel}</span>
      </div>
    </div>
  );
}
