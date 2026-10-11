'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export interface HologramShieldCanvasProps {
  className?: string;
}

export function HologramShieldCanvas({ className = '' }: HologramShieldCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth || 400;
    let height = mount.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 7.5;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      mount.appendChild(renderer.domElement);
    } catch (e) {
      console.warn('WebGL initialization failed in HologramShieldCanvas', e);
      return;
    }

    // Shield Anchor Group
    const shieldGroup = new THREE.Group();
    scene.add(shieldGroup);

    // 1. Faceted Wireframe Shield Geometry
    const shieldShape = new THREE.Shape();
    shieldShape.moveTo(0, 1.85);
    shieldShape.quadraticCurveTo(1.65, 1.65, 1.55, 0.4);
    shieldShape.quadraticCurveTo(1.4, -1.2, 0, -2.1);
    shieldShape.quadraticCurveTo(-1.4, -1.2, -1.55, 0.4);
    shieldShape.quadraticCurveTo(-1.65, 1.65, 0, 1.85);

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 0.28,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.08,
      bevelThickness: 0.08,
    };
    const shieldGeom = new THREE.ExtrudeGeometry(shieldShape, extrudeSettings);
    // Center geometry origin
    shieldGeom.center();

    // Outer Wireframe (Military Gold #D4AF37)
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      wireframe: true,
      transparent: true,
      opacity: 0.88,
    });
    const shieldWireMesh = new THREE.Mesh(shieldGeom, wireframeMat);
    shieldGroup.add(shieldWireMesh);

    // Inner Translucent Core (Navy #0F2A47 with gold specular reflections)
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x0f2a47,
      roughness: 0.15,
      metalness: 0.75,
      transmission: 0.55,
      transparent: true,
      opacity: 0.45,
    });
    const glassMesh = new THREE.Mesh(shieldGeom, glassMat);
    glassMesh.scale.set(0.96, 0.96, 0.96);
    shieldGroup.add(glassMesh);

    // 2. Concentric Gyroscope Hologram Rings
    const ring1Geom = new THREE.TorusGeometry(1.68, 0.02, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      transparent: true,
      opacity: 0.72,
    });
    const ring1 = new THREE.Mesh(ring1Geom, ring1Mat);
    shieldGroup.add(ring1);

    const ring2Geom = new THREE.TorusGeometry(2.0, 0.015, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x9c7a3c,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });
    const ring2 = new THREE.Mesh(ring2Geom, ring2Mat);
    shieldGroup.add(ring2);

    const ring3Geom = new THREE.TorusGeometry(2.3, 0.01, 16, 120);
    const ring3Mat = new THREE.MeshBasicMaterial({
      color: 0x0f2a47,
      transparent: true,
      opacity: 0.4,
    });
    const ring3 = new THREE.Mesh(ring3Geom, ring3Mat);
    shieldGroup.add(ring3);

    // 3. Central Glowing Radar Core (Icosahedron)
    const coreGeom = new THREE.IcosahedronGeometry(0.38, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      emissive: 0xd4af37,
      emissiveIntensity: 0.65,
      roughness: 0.25,
      wireframe: true,
    });
    const core = new THREE.Mesh(coreGeom, coreMat);
    shieldGroup.add(core);

    // 4. Biometric Laser Scanning Plane
    const scanGeom = new THREE.PlaneGeometry(3.0, 0.05);
    const scanMat = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide,
    });
    const scanMesh = new THREE.Mesh(scanGeom, scanMat);
    shieldGroup.add(scanMesh);

    // Lighting
    const pointLight = new THREE.PointLight(0xd4af37, 2.5, 12);
    pointLight.position.set(0, 0, 3.5);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    // 5. Cursor Tracking & Spring Inertia
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const onMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      mouse.targetX = (clientX / rect.width - 0.5) * 1.3;
      mouse.targetY = -(clientY / height - 0.5) * 1.1;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Scroll depth reactivity
    let scrollProgress = 0;
    const onScroll = () => {
      if (typeof window !== 'undefined') {
        scrollProgress = Math.min(window.scrollY / 700, 1);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // 6. Animation Loop
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      if (!renderer) return;

      const time = clock.getElapsedTime();

      // Smooth Lerp cursor tracking
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      // Group rotation reacting to mouse & scroll
      shieldGroup.rotation.y = mouse.x + Math.sin(time * 0.5) * 0.12;
      shieldGroup.rotation.x = mouse.y + Math.cos(time * 0.7) * 0.09 - scrollProgress * 0.35;
      shieldGroup.scale.setScalar(1.0 - scrollProgress * 0.18);

      // Concentric gyroscope rotations
      ring1.rotation.x += 0.014;
      ring1.rotation.y += 0.009;
      ring2.rotation.y -= 0.011;
      ring2.rotation.z += 0.007;
      ring3.rotation.x -= 0.006;
      ring3.rotation.z -= 0.008;

      // Radar core pulse & rotation
      core.rotation.y += 0.022;
      core.rotation.x += 0.015;
      const coreScale = 1.0 + Math.sin(time * 3.5) * 0.08;
      core.scale.set(coreScale, coreScale, coreScale);

      // Biometric scan oscillation
      scanMesh.position.y = Math.sin(time * 2.2) * 1.4;
      scanMesh.rotation.y = shieldGroup.rotation.y;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!mount || !renderer) return;
      width = mount.clientWidth || 400;
      height = mount.clientHeight || 400;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      cancelAnimationFrame(animationId);
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost, false);

    // Complete Resource Disposal
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', handleResize);

      if (renderer) {
        renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
        shieldGeom.dispose();
        wireframeMat.dispose();
        glassMat.dispose();
        ring1Geom.dispose();
        ring1Mat.dispose();
        ring2Geom.dispose();
        ring2Mat.dispose();
        ring3Geom.dispose();
        ring3Mat.dispose();
        coreGeom.dispose();
        coreMat.dispose();
        scanGeom.dispose();
        scanMat.dispose();
        renderer.dispose();
        if (mount.contains(renderer.domElement)) {
          mount.removeChild(renderer.domElement);
        }
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`w-full h-full min-h-[320px] flex items-center justify-center ${className}`}
      aria-label="Interactive 3D Security Shield Hologram"
    />
  );
}
