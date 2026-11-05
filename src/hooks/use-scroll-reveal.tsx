"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * useScrollReveal — Intersection Observer hook for scroll-triggered animations.
 * 
 * Per design brief Section 5:
 * - Scroll reveal: fade + rise 40px over 1s, staggered 100ms, once per element.
 * - Animate only transform and opacity.
 * - Under prefers-reduced-motion, disable all transforms.
 * 
 * Usage:
 *   const ref = useScrollReveal<HTMLDivElement>();
 *   <div ref={ref} data-reveal> ... </div>
 * 
 * Or for containers with staggered children:
 *   const ref = useScrollReveal<HTMLDivElement>({ stagger: true });
 *   <div ref={ref}>
 *     <div data-reveal> child 1 </div>
 *     <div data-reveal> child 2 </div>
 *   </div>
 */

interface ScrollRevealOptions {
  /** Stagger children with data-reveal attribute */
  stagger?: boolean;
  /** Threshold for intersection (0–1). Default 0.15 */
  threshold?: number;
  /** Root margin. Default "-40px" */
  rootMargin?: string;
}

export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const { stagger = false, threshold = 0.15, rootMargin = "-40px" } = options;
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      // Immediately show everything
      if (stagger) {
        el.querySelectorAll<HTMLElement>("[data-reveal]").forEach((child) => {
          child.style.opacity = "1";
          child.style.transform = "none";
        });
      } else if (el.hasAttribute("data-reveal")) {
        el.style.opacity = "1";
        el.style.transform = "none";
      }
      return;
    }

    // Set initial hidden state
    const targets: HTMLElement[] = [];
    if (stagger) {
      el.querySelectorAll<HTMLElement>("[data-reveal]").forEach((child) => {
        child.style.opacity = "0";
        child.style.transform = "translateY(40px)";
        child.style.transition = "none";
        targets.push(child);
      });
    } else if (el.hasAttribute("data-reveal")) {
      el.style.opacity = "0";
      el.style.transform = "translateY(40px)";
      el.style.transition = "none";
      targets.push(el);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          if (stagger) {
            targets.forEach((child, index) => {
              // Force reflow to ensure transition works
              void child.offsetHeight;
              child.style.transition = `opacity 1s cubic-bezier(0.16, 1, 0.3, 1) ${
                index * 100
              }ms, transform 1s cubic-bezier(0.16, 1, 0.3, 1) ${
                index * 100
              }ms`;
              child.style.opacity = "1";
              child.style.transform = "translateY(0)";
            });
          } else {
            const target = entry.target as HTMLElement;
            void target.offsetHeight;
            target.style.transition =
              "opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)";
            target.style.opacity = "1";
            target.style.transform = "translateY(0)";
          }

          // Once per element — unobserve after reveal
          observer.unobserve(entry.target);
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [stagger, threshold, rootMargin]);

  return ref;
}

/**
 * useCountUp — Animate a number from 0 to target when visible.
 * Runs once, 1.4s duration per brief Section 5.
 */
export function useCountUp(target: number, duration = 1400) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      el.textContent = target.toLocaleString("en-IN");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || hasAnimated.current) return;
          hasAnimated.current = true;

          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);
            el.textContent = current.toLocaleString("en-IN");
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return ref;
}
