'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export interface SpatialParticleFieldProps {
  particleCount?: number;
  className?: string;
}

export function SpatialParticleField({
  particleCount = 120,
  className = '',
}: SpatialParticleFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth || 800;
    let height = container.clientHeight || window.innerHeight || 600;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 25;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      container.appendChild(renderer.domElement);
    } catch (e) {
      console.warn('WebGL initialization failed in SpatialParticleField', e);
      return;
    }

    // 2. Particle Arrays & Hooke's Spring Restitution State
    const count = particleCount;
    const positions = new Float32Array(count * 3);
    const originalPositions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    // Gold (#D4AF37) and Deep Navy (#0F2A47)
    const goldColor = new THREE.Color('#D4AF37');
    const navyColor = new THREE.Color('#0F2A47');

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 36;
      const y = (Math.random() - 0.5) * 24;
      const z = (Math.random() - 0.5) * 16;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      velocities[i * 3] = 0;
      velocities[i * 3 + 1] = 0;
      velocities[i * 3 + 2] = 0;

      // 65% gold accent particles, 35% deep navy structure particles
      const chosenColor = Math.random() > 0.35 ? goldColor : navyColor;
      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.32,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.NormalBlending,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // Dynamic Proximity Constellation Lines
    const maxLineConnections = Math.min(count * 2, 240);
    const linePositions = new Float32Array(maxLineConnections * 6);
    const lineColors = new Float32Array(maxLineConnections * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
    });
    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineSegments);

    // 3. Mouse Tracking & Coordinate Mapping
    const mouse = { x: 0, y: 0, worldX: 0, worldY: 0, active: false };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        mouse.active = false;
        return;
      }
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      mouse.worldX = mouse.x * 18;
      mouse.worldY = mouse.y * 12;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    // 4. Spring Physics & Animation Loop
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      if (!renderer) return;

      const time = clock.getElapsedTime();
      const posAttr = particleGeometry.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      // Hooke's spring parameters
      const springConstant = 0.024; // k
      const dampingFactor = 0.92; // viscous drag

      for (let i = 0; i < count; i++) {
        const idx = i * 3;
        const curX = posArray[idx];
        const curY = posArray[idx + 1];
        const curZ = posArray[idx + 2];

        // Harmonically perturbed equilibrium anchor
        const origX = originalPositions[idx];
        const origY = originalPositions[idx + 1] + Math.sin(time * 0.9 + i * 0.5) * 0.38;
        const origZ = originalPositions[idx + 2] + Math.cos(time * 0.7 + i * 0.3) * 0.25;

        // Hooke's Restoring Force: F = -k * (x - x_anchor)
        velocities[idx] += (origX - curX) * springConstant;
        velocities[idx + 1] += (origY - curY) * springConstant;
        velocities[idx + 2] += (origZ - curZ) * springConstant;

        // Cursor Repulsion Force
        if (mouse.active) {
          const dx = curX - mouse.worldX;
          const dy = curY - mouse.worldY;
          const distSq = dx * dx + dy * dy;
          const maxDist = 4.8;
          if (distSq < maxDist * maxDist && distSq > 0.0001) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / maxDist) * 0.42;
            velocities[idx] += (dx / dist) * force;
            velocities[idx + 1] += (dy / dist) * force;
          }
        }

        // Apply Damping & Update Positions
        velocities[idx] *= dampingFactor;
        velocities[idx + 1] *= dampingFactor;
        velocities[idx + 2] *= dampingFactor;

        posArray[idx] += velocities[idx];
        posArray[idx + 1] += velocities[idx + 1];
        posArray[idx + 2] += velocities[idx + 2];
      }
      posAttr.needsUpdate = true;

      // Update Constellation Lines between neighboring particles
      let lineIndex = 0;
      const linePosAttr = lineGeometry.attributes.position as THREE.BufferAttribute;
      const linePosArr = linePosAttr.array as Float32Array;
      const lineColArr = lineGeometry.attributes.color.array as Float32Array;
      const connectionRadius = 4.2;

      for (let i = 0; i < count && lineIndex < maxLineConnections; i++) {
        const i3 = i * 3;
        for (let j = i + 1; j < count && lineIndex < maxLineConnections; j++) {
          const j3 = j * 3;
          const dx = posArray[i3] - posArray[j3];
          const dy = posArray[i3 + 1] - posArray[j3 + 1];
          const dz = posArray[i3 + 2] - posArray[j3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < connectionRadius) {
            const lineIdx = lineIndex * 6;
            linePosArr[lineIdx] = posArray[i3];
            linePosArr[lineIdx + 1] = posArray[i3 + 1];
            linePosArr[lineIdx + 2] = posArray[i3 + 2];

            linePosArr[lineIdx + 3] = posArray[j3];
            linePosArr[lineIdx + 4] = posArray[j3 + 1];
            linePosArr[lineIdx + 5] = posArray[j3 + 2];

            const alpha = 1 - dist / connectionRadius;
            // Warm military gold gradient along constellation line
            lineColArr[lineIdx] = 0.83 * alpha;
            lineColArr[lineIdx + 1] = 0.69 * alpha;
            lineColArr[lineIdx + 2] = 0.22 * alpha;
            lineColArr[lineIdx + 3] = 0.83 * alpha;
            lineColArr[lineIdx + 4] = 0.69 * alpha;
            lineColArr[lineIdx + 5] = 0.22 * alpha;

            lineIndex++;
          }
        }
      }

      lineGeometry.setDrawRange(0, lineIndex * 2);
      linePosAttr.needsUpdate = true;
      (lineGeometry.attributes.color as THREE.BufferAttribute).needsUpdate = true;

      // Gentle orbital breathing
      particleSystem.rotation.y = time * 0.03;
      particleSystem.rotation.x = Math.sin(time * 0.02) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Explicit WebGL context loss listener
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      cancelAnimationFrame(animationId);
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost, false);

    // Comprehensive Resource Cleanup on Unmount
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);

      if (renderer) {
        renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
        particleGeometry.dispose();
        particleMaterial.dispose();
        lineGeometry.dispose();
        lineMaterial.dispose();
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
    };
  }, [particleCount]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
}
