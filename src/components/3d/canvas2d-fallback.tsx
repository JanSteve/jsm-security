'use client';

import React, { useRef, useEffect } from 'react';

export interface Canvas2DFallbackProps {
  className?: string;
}

export function Canvas2DFallback({ className = '' }: Canvas2DFallbackProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth || 400);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight || 400);

    const particles = Array.from({ length: 28 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.55,
      vy: (Math.random() - 0.5) * 0.55,
      size: Math.random() * 2.2 + 1.2,
      color: Math.random() > 0.4 ? '#D4AF37' : '#0F2A47',
    }));

    let animId: number;
    let angle = 0;

    const render = () => {
      animId = requestAnimationFrame(render);
      ctx.clearRect(0, 0, width, height);
      angle += 0.012;

      // 1. Draw Floating Particles & Proximity Web
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off canvas boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 85) {
            ctx.strokeStyle = `rgba(212, 175, 55, ${(1 - dist / 85) * 0.4})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // 2. Draw 2.5D Projected Wireframe Shield in Center
      ctx.save();
      ctx.translate(width / 2, height / 2);

      // Subtle trigonometric oscillating tilt
      const tilt = Math.sin(angle) * 0.18;
      ctx.scale(1 + tilt * 0.08, 1);

      // Outer Shield Path
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(0, -95);
      ctx.lineTo(75, -75);
      ctx.lineTo(70, 20);
      ctx.lineTo(0, 95);
      ctx.lineTo(-70, 20);
      ctx.lineTo(-75, -75);
      ctx.closePath();
      ctx.stroke();

      // Inner Concentric Shield Rim
      ctx.strokeStyle = 'rgba(156, 122, 60, 0.45)';
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      ctx.moveTo(0, -80);
      ctx.lineTo(60, -64);
      ctx.lineTo(56, 16);
      ctx.lineTo(0, 80);
      ctx.lineTo(-56, 16);
      ctx.lineTo(-60, -64);
      ctx.closePath();
      ctx.stroke();

      // Rotating Concentric Radar Gyroscope
      ctx.strokeStyle = 'rgba(15, 42, 71, 0.5)';
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      ctx.ellipse(0, 0, 52, 52 * Math.cos(angle * 0.8), angle, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(212, 175, 55, 0.6)';
      ctx.beginPath();
      ctx.ellipse(0, 0, 36, 36 * Math.sin(angle * 0.6), -angle, 0, Math.PI * 2);
      ctx.stroke();

      // Glowing Center Core
      ctx.fillStyle = '#D4AF37';
      ctx.beginPath();
      ctx.arc(0, 0, 4 + Math.sin(angle * 2) * 1.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    render();

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth || 400;
      height = canvas.height = canvas.parentElement.clientHeight || 400;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      aria-label="2D Canvas High-Performance Fallback"
    />
  );
}
