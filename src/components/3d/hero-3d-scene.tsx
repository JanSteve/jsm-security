'use client';

import React, { useSyncExternalStore } from 'react';
import { useWebGLSupport } from './use-webgl-support';
import { SpatialParticleField } from './spatial-particle-field';
import { HologramShieldCanvas } from './hologram-shield-canvas';
import { Canvas2DFallback } from './canvas2d-fallback';

export interface Hero3DSceneProps {
  className?: string;
  showShield?: boolean;
}

const emptySubscribe = () => () => {};

export function Hero3DScene({ className = '', showShield = true }: Hero3DSceneProps) {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const caps = useWebGLSupport();

  // Zero Layout Shift Skeleton while client hydrates
  if (!isMounted) {
    return (
      <div
        className={`absolute inset-0 bg-gradient-to-b from-[#0F2A47]/[0.03] to-transparent pointer-events-none ${className}`}
        aria-hidden="true"
      />
    );
  }

  // Accessibility: Respects prefers-reduced-motion
  if (caps.tier === 'static') {
    return (
      <div
        className={`absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#D4AF37]/5 via-transparent to-transparent pointer-events-none ${className}`}
        aria-hidden="true"
      />
    );
  }

  // Graceful degradation for low-power mobile or WebGL-unsupported environments
  if (caps.tier === 'canvas-fallback') {
    return (
      <div
        className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
        aria-hidden="true"
      >
        <Canvas2DFallback />
      </div>
    );
  }

  const particleCount = caps.tier === 'desktop-high' ? 140 : 45;

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden z-0 ${className}`}
      aria-hidden="true"
    >
      {/* Ambient Spatial Particle Mesh */}
      <SpatialParticleField particleCount={particleCount} />

      {/* Floating 3D Central Command Hologram Shield */}
      {showShield && (
        <div className="absolute right-0 sm:right-4 lg:right-12 top-1/2 -translate-y-1/2 w-[340px] sm:w-[420px] lg:w-[480px] h-[340px] sm:h-[420px] lg:h-[480px] pointer-events-auto flex items-center justify-center opacity-40 lg:opacity-75 hover:opacity-100 transition-opacity duration-500">
          <HologramShieldCanvas />
        </div>
      )}
    </div>
  );
}
