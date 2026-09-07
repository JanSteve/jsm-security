"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
}

export const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = "#0071e3",
      shimmerSize = "0.1em",
      shimmerDuration = "2.5s",
      borderRadius = "9999px",
      background = "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(29, 29, 31, 1), rgba(0, 0, 0, 1))",
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        style={
          {
            "--spread": "90deg",
            "--shimmer-color": shimmerColor,
            "--radius": borderRadius,
            "--speed": shimmerDuration,
            "--cut": shimmerSize,
            "--bg": background,
          } as React.CSSProperties
        }
        className={cn(
          "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap px-6 py-3 text-white [background:var(--bg)] [border-radius:var(--radius)]",
          "transform-gpu transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]",
          "border border-zinc-700/60 shadow-[0_0_20px_rgba(0,113,227,0.2)] hover:shadow-[0_0_30px_rgba(0,113,227,0.45)]",
          className
        )}
        ref={ref}
        {...props}
      >
        {/* Spark container */}
        <div
          className={cn(
            "-z-30 blur-[2px]",
            "absolute inset-0 overflow-visible [container-type:size]"
          )}
        >
          {/* Spark */}
          <div className="absolute inset-0 h-[100cqh] animate-[spin_var(--speed)_linear_infinite] [aspect-ratio:1]">
            <div
              className="absolute inset-[-100%] [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))]"
            />
          </div>
        </div>

        {/* Backing layer */}
        <div className="absolute [inset:var(--cut)] -z-20 [border-radius:var(--radius)] [background:var(--bg)]" />

        {/* Content */}
        <span className="relative z-10 flex items-center justify-center gap-2 text-xs font-black uppercase tracking-wider">
          {children}
        </span>
      </button>
    );
  }
);

ShimmerButton.displayName = "ShimmerButton";
