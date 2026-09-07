"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  anchor?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

export function BorderBeam({
  className,
  size = 150,
  duration = 10,
  borderWidth = 1.5,
  colorFrom = "#0071e3",
  colorTo = "transparent",
  delay = 0,
}: BorderBeamProps) {
  return (
    <div
      style={
        {
          "--size": `${size}px`,
          "--duration": `${duration}s`,
          "--border-width": `${borderWidth}px`,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--delay": `-${delay}s`,
        } as React.CSSProperties
      }
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden p-[var(--border-width)]",
        className
      )}
    >
      <div
        className="absolute inset-0 rounded-[inherit]"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, var(--color-from) 60deg, var(--color-to) 120deg, transparent 180deg)`,
          animation: `spin var(--duration) linear infinite`,
          animationDelay: "var(--delay)",
        }}
      />
      <div className="absolute inset-[var(--border-width)] rounded-[inherit] bg-inherit" />
    </div>
  );
}
