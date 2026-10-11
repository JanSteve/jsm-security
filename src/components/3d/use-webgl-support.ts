'use client';

import { useSyncExternalStore } from 'react';

export interface WebGLCapabilities {
  supported: boolean;
  isMobile: boolean;
  isLowPower: boolean;
  prefersReducedMotion: boolean;
  tier: 'desktop-high' | 'mobile-mid' | 'canvas-fallback' | 'static';
}

const SERVER_CAPS: WebGLCapabilities = {
  supported: false,
  isMobile: false,
  isLowPower: false,
  prefersReducedMotion: false,
  tier: 'canvas-fallback',
};

let cachedClientCaps: WebGLCapabilities | null = null;

function computeClientCapabilities(): WebGLCapabilities {
  if (typeof window === 'undefined') {
    return SERVER_CAPS;
  }

  const isMobile =
    window.innerWidth < 768 ||
    (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 1);
  const prefersReducedMotion =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isLowPower =
    typeof navigator !== 'undefined' && typeof navigator.hardwareConcurrency === 'number'
      ? navigator.hardwareConcurrency <= 4
      : false;

  let webglSupported = false;
  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl');
    webglSupported = !!gl;
  } catch {
    webglSupported = false;
  }

  let tier: WebGLCapabilities['tier'] = 'canvas-fallback';
  if (prefersReducedMotion) {
    tier = 'static';
  } else if (!webglSupported || (isMobile && isLowPower)) {
    tier = 'canvas-fallback';
  } else if (isMobile) {
    tier = 'mobile-mid';
  } else {
    tier = 'desktop-high';
  }

  return {
    supported: webglSupported,
    isMobile,
    isLowPower,
    prefersReducedMotion,
    tier,
  };
}

function getClientSnapshot(): WebGLCapabilities {
  if (cachedClientCaps === null) {
    cachedClientCaps = computeClientCapabilities();
  }
  return cachedClientCaps;
}

function getServerSnapshot(): WebGLCapabilities {
  return SERVER_CAPS;
}

function subscribe(callback: () => void): () => void {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const handleChange = () => {
    cachedClientCaps = computeClientCapabilities();
    callback();
  };

  window.addEventListener('resize', handleChange);

  let mediaQuery: MediaQueryList | null = null;
  if (typeof window.matchMedia === 'function') {
    mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener?.('change', handleChange);
  }

  return () => {
    window.removeEventListener('resize', handleChange);
    mediaQuery?.removeEventListener?.('change', handleChange);
  };
}

export function useWebGLSupport(): WebGLCapabilities {
  return useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
}
