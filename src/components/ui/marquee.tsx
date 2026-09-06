"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children: React.ReactNode;
  duration?: number;
  gap?: number;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = true,
  children,
  duration = 35,
  gap = 16,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn("group flex overflow-hidden select-none", className)}
    >
      <motion.div
        className="flex shrink-0 items-center"
        style={{ gap: `${gap}px` }}
        animate={{
          x: reverse ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          duration,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        <div className="flex shrink-0 items-center" style={{ gap: `${gap}px` }}>
          {children}
        </div>
        <div className="flex shrink-0 items-center" style={{ gap: `${gap}px` }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
