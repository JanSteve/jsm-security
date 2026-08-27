"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface HubPoint {
  name: string;
  region: string;
  status: string;
  lat: number; // For spherical coords
  lon: number;
}

const HUBS: HubPoint[] = [
  { name: "Trichy Airport HQ", region: "Central Dispatch", status: "Active 24/7", lat: 10.79, lon: 78.70 },
  { name: "Chennai Metro Hub", region: "IT SEZ & Plants", status: "98 Posts Guarded", lat: 13.08, lon: 80.27 },
  { name: "Coimbatore Hub", region: "Engineering & Mills", status: "74 Posts Guarded", lat: 11.01, lon: 76.95 },
  { name: "Hosur Corridor", region: "Automotive Zone", status: "62 Posts Deployed", lat: 12.74, lon: 77.82 },
  { name: "Madurai South", region: "Healthcare & Retail", status: "48 Posts Active", lat: 9.92, lon: 78.11 },
];

export function FacilityHologram() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeHub, setActiveHub] = useState<HubPoint>(HUBS[0]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for whole rotating hologram
    const hologramGroup = new THREE.Group();
    scene.add(hologramGroup);

    // 1. Inner Core Wireframe Sphere
    const innerGeo = new THREE.IcosahedronGeometry(1.4, 2);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xC5A880,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    hologramGroup.add(innerMesh);

    // 2. Point Cloud Sphere
    const particleCount = 450;
    const posArray = new Float32Array(particleCount * 3);
    const radius = 1.45;

    for (let i = 0; i < particleCount * 3; i += 3) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = radius + (Math.random() - 0.5) * 0.08;

      posArray[i] = r * Math.sin(phi) * Math.cos(theta);
      posArray[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      posArray[i + 2] = r * Math.cos(phi);
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    const particlesMat = new THREE.PointsMaterial({
      size: 0.032,
      color: 0xE8D7B8,
      transparent: true,
      opacity: 0.85,
    });
    const particleSystem = new THREE.Points(particlesGeo, particlesMat);
    hologramGroup.add(particleSystem);

    // 3. Orbital Golden Rings
    const createRing = (radiusVal: number, rotX: number, rotY: number, colorHex: number, opacityVal: number) => {
      const curve = new THREE.EllipseCurve(0, 0, radiusVal, radiusVal, 0, 2 * Math.PI, false, 0);
      const points = curve.getPoints(90);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: colorHex,
        transparent: true,
        opacity: opacityVal,
      });
      const ring = new THREE.Line(geometry, material);
      ring.rotation.x = rotX;
      ring.rotation.y = rotY;
      return ring;
    };

    const ring1 = createRing(1.85, Math.PI / 3, Math.PI / 6, 0xC5A880, 0.45);
    const ring2 = createRing(1.95, -Math.PI / 4, Math.PI / 3, 0x38BDF8, 0.3);
    const ring3 = createRing(2.1, Math.PI / 2.2, 0, 0xC5A880, 0.25);
    hologramGroup.add(ring1);
    hologramGroup.add(ring2);
    hologramGroup.add(ring3);

    // 4. Glowing Hub Beacons
    const hubNodes: THREE.Mesh[] = [];
    HUBS.forEach((hub, idx) => {
      // Map lat/lon to spherical coords on globe
      const phi = (90 - hub.lat * 4) * (Math.PI / 180);
      const theta = (hub.lon * 3 + 180) * (Math.PI / 180);

      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const z = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi);

      const nodeGeo = new THREE.SphereGeometry(0.065, 16, 16);
      const nodeMat = new THREE.MeshBasicMaterial({
        color: idx === 0 ? 0x10B981 : 0xC5A880,
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.set(x, y, z);
      hologramGroup.add(nodeMesh);
      hubNodes.push(nodeMesh);
    });

    setIsLoaded(true);

    // Mouse Tracking / Gyro
    let targetRotationX = 0;
    let targetRotationY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotationY = mouseX * 0.8;
      targetRotationX = -mouseY * 0.5;
    };

    window.addEventListener("pointermove", handlePointerMove);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth auto-rotation + mouse drift
      hologramGroup.rotation.y += 0.004;
      hologramGroup.rotation.x += (targetRotationX - hologramGroup.rotation.x) * 0.05;
      hologramGroup.rotation.z = Math.sin(elapsedTime * 0.5) * 0.05;

      ring1.rotation.z += 0.006;
      ring2.rotation.z -= 0.008;
      ring3.rotation.z += 0.003;

      // Pulse beacon sizes
      hubNodes.forEach((node, i) => {
        const scale = 1 + Math.sin(elapsedTime * 3 + i) * 0.25;
        node.scale.set(scale, scale, scale);
      });

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener("resize", handleResize);

    // Hub auto-cycler for telemetry display
    const hubInterval = setInterval(() => {
      setActiveHub((prev) => {
        const nextIdx = (HUBS.findIndex((h) => h.name === prev.name) + 1) % HUBS.length;
        return HUBS[nextIdx];
      });
    }, 3200);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      clearInterval(hubInterval);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[380px] sm:h-[440px] md:h-[480px] flex items-center justify-center select-none overflow-hidden rounded-3xl bg-gradient-to-b from-[#0A1628]/95 via-[#0A1628] to-[#040810] border border-[#C5A880]/25 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
      {/* 3D WebGL Canvas Mount */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top HUD Telemetry */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-zinc-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-emerald-400 font-bold">LIVE TELEMETRY</span>
          <span className="text-zinc-600">|</span>
          <span>TAMIL NADU 3D RADAR</span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#C5A880]/15 backdrop-blur-md border border-[#C5A880]/30 text-[10px] font-mono text-[#C5A880] font-bold">
          <span>60 FPS WEBGL 3D</span>
        </div>
      </div>

      {/* Floating Active Node HUD Card */}
      <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-none">
        <div className="bg-black/80 backdrop-blur-xl border border-white/15 rounded-2xl p-3.5 sm:p-4 text-white shadow-2xl flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
              <span className="text-[10px] font-mono font-bold text-[#C5A880] uppercase tracking-wider">
                {activeHub.region}
              </span>
            </div>
            <h4 className="text-sm sm:text-base font-black tracking-tight text-white">
              {activeHub.name}
            </h4>
          </div>

          <div className="text-right">
            <span className="inline-block px-2.5 py-1 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono font-bold">
              ● {activeHub.status}
            </span>
          </div>
        </div>
      </div>

      {/* Ambient background glow ring */}
      <div className="absolute inset-0 bg-radial from-[#C5A880]/10 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
