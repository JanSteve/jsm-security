# Project: JSM Integrated Services 3D WebGL & Luxury Spatial Transformation

## Architecture
JSM Integrated Services (`jsm-security`) is a Next.js 16 (App Router) + React 19 + Tailwind CSS v4 web platform.
This project transforms the digital presence into an award-winning $1,000,000-tier enterprise experience by integrating:
1. **3D WebGL & Spatial Particle Engine**: Vanilla Three.js (`three` + `@types/three`) architecture decoupled from React reconciler overhead, providing an interactive wireframe security shield, concentric gyroscope rings, rotating radar core, ambient gold/navy spring particle mesh, and a 4-tier graceful degradation matrix with pure 2D Canvas fallback.
2. **Kinetic Motion & Parallax Storytelling**: `motion/react` v13 pinned sticky scroll storytelling sequences, 3D perspective tilt cards (`rotateX`, `rotateY`, `scale(1.02)`, spotlight sheen), and mathematical zero-CLS kinetic typography reveals.
3. **Interactive 3D Product Physics**: Pure CSS 3D acrylic counter standee with drag/rotation physics, concentric NFC pulse waves, Web Audio API synthesized tap chime, and an interactive 3D floating glass WhatsApp phone mockup with live Restaurant Table QR ordering and Clinic Token Tracker simulations.
4. **Luxury Enterprise Design Tokens**: Obsidian mesh gradients (`#05070B` to `#0B0F17`), military gold hairline borders (`#9C7A3C`/`#D4AF37`), frosted glassmorphic backdrops (`backdrop-blur-xl`), audio wave spectrum visualizers, tactile micro-interactions, and strict statutory brand integrity.
5. **Zero-Lag Production Verification**: Clean Next.js production compilation across all 78 routes, zero hydration mismatches, zero layout shifts (CLS < 0.05), and 60 FPS mobile responsiveness.

---

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| F1 | Dependencies Installation | Install vanilla `three` and `@types/three` | M1 | survey |
| F2 | WebGL Hardware Profiling Hook | `use-webgl-support.ts` for capability, GPU, mobile, reduced-motion profiling | M1 | survey |
| F3 | Spatial Particle Mesh | `spatial-particle-field.tsx` gold & navy particles with spring restitution | M1 | survey |
| F4 | Interactive 3D Command Hologram Shield | `hologram-shield-canvas.tsx` wireframe shield, gyroscopes, cursor & scroll reactivity | M1 | survey |
| F5 | Mobile 2D Canvas Fallback | `canvas2d-fallback.tsx` zero-overhead 60 FPS canvas fallback for low-power devices | M1 | survey |
| F6 | Hero 3D Scene Integration | `hero-3d-scene.tsx` coordinator mounted in `hero-section.tsx` with zero CLS | M1 | survey |
| F7 | Sticky Scroll Storytelling Sequence | `sticky-scroll-sequence.tsx` layered depth parallax for Operations & Case Study | M2 | survey |
| F8 | 3D Perspective Hover Cards | `perspective-tilt-card.tsx` with spring physics & gold spotlight sheen across 21 services | M2 | survey |
| F9 | Zero-CLS Kinetic Typography | `kinetic-typography.tsx` inline masking stagger for luxury headline reveals | M2 | survey |
| F10 | Ambient Magnetic Cursor | `magnetic-cursor.tsx` with gold tracking orb & magnetic attraction on CTAs | M2 | survey |
| F11 | 3D Tiltable NFC Counter Standee | `nfc-standee-3d.tsx` acrylic prism, pointer drag/rotation, pulse waves, Web Audio chime | M3 | survey |
| F12 | Interactive 3D WhatsApp Phone Mockup | `whatsapp-phone-3d.tsx` floating titanium/glass phone with live Table & Clinic sims | M3 | survey |
| F13 | Interactive Showcase Integration | Update showcase tabs to feature 3D Standee & 3D Phone Mockup | M3 | survey |
| F14 | Luxury Enterprise Design Tokens | Obsidian mesh gradients, military gold hairline borders, frosted glassmorphism | M4 | survey |
| F15 | Sound Wave Audio Visualizer | `sound-wave-visualizer.tsx` real/procedural spectrum analyzer for video showcases | M4 | survey |
| F16 | Statutory Brand & Content Integrity | Verified phone `+91 90808 63448`, leadership, PSARA/ISO credentials, TN coverage | M4 | survey |
| F17 | Production Build & Route Integrity | Clean Next.js build compilation with exit code 0 across all 78 routes | M5 | survey |
| F18 | Challenger & Forensic Audit Verification | Adversarial stress testing & forensic audit against cheating/hardcoding | M5 | survey |
| F19 | Executive Delivery Report | Comprehensive delivery documentation of all 3D features and deployment status | M5 | survey |

---

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Interactive 3D WebGL Canvas & Spatial Particle Fields | F1, F2, F3, F4, F5, F6 | none | DONE |
| M2 | Scroll-Stopping Kinetic Motion & Parallax Storytelling | F7, F8, F9, F10 | none | DONE |
| M3 | Interactive 3D Product Physics (NFC Standee & Phone Mockup) | F11, F12, F13 | M1 | DONE |
| M4 | Luxury Enterprise Design Tokens & Visual Hierarchy | F14, F15, F16 | M2 | DONE |
| M5 | Full-Stack Production Verification, Audit & Executive Report | F17, F18, F19 | M1, M2, M3, M4 | DONE |

---

## Interface Contracts

### 3D Module ↔ Page / Layout
- `Hero3DScene`: React Client Component (`"use client"`), self-contained, mounts inside `HeroSection` container. Props: none (derives dimensions from parent relative container).
- `SpatialParticleField`: Props `{ particleCount?: number; className?: string }`. Disposes geometries, materials, and renderer on unmount.
- `HologramShieldCanvas`: Props `{ className?: string }`. Reacts to `window.mousemove` and `window.scroll`. Disposes resources on unmount.
- `Canvas2DFallback`: Props `{ className?: string }`. Pure 2D canvas context, guaranteed 60 FPS on low-power devices.

### Motion Module ↔ Page / Sections
- `StickyScrollSequence`: Props `{ steps: StickyStepItem[]; headline?: string; eyebrow?: string; className?: string }`. Uses `useScroll` with `scrollYProgress` and spring damping. Unlocks to horizontal snap-deck on mobile viewports.
- `PerspectiveTiltCard`: Props `{ children: React.ReactNode; maxTilt?: number; spotlightColor?: string; enableTilt?: boolean; className?: string }`. Applies `perspective: 1000px`, `rotateX`, `rotateY`, `scale(1.02)`.
- `KineticTypography`: Props `{ text: string; as?: string; mode?: 'word' | 'letter'; staggerDelay?: number; className?: string }`. Renders inline-block overflow-hidden masking. Guaranteed CLS < 0.001.
- `MagneticWrapper`: Props `{ children: React.ReactNode; strength?: number; className?: string }`. Magnetic CTA attraction.

### Product Physics Module ↔ Showcase Widgets
- `NfcStandee3D`: Props `{ initialRating?: number; onRatingSelect?: (rating: number) => void }`. Multi-layer CSS 3D prism with pointer drag, spring damping, concentric gold pulse waves, Web Audio synthesizer chime.
- `WhatsappPhone3D`: Props `{ initialMode?: 'table-order' | 'clinic-token' }`. Floating perspective chassis with ambient levitation, live message bubbles, blue delivery ticks, and instant order dispatch simulation.
- `SoundWaveVisualizer`: Props `{ isPlaying: boolean; isMuted?: boolean; className?: string }`. 24-band frequency spectrum visualizer with Web Audio API and procedural trigonometric harmonic fallback.

---

## Code Layout
```
src/
├── app/
│   ├── globals.css                       # Luxury enterprise tokens, obsidian mesh, hairline borders
│   ├── page.tsx                          # Homepage embedding Hero3DScene, StickyScroll, TiltCards
│   └── services/page.tsx                 # Services hub with PerspectiveTiltCard directory
├── components/
│   ├── 3d/                               # Milestone M1 (3D WebGL & Particle Field)
│   │   ├── index.ts                      # Barrel export
│   │   ├── use-webgl-support.ts          # Hardware capability & degradation profiling
│   │   ├── spatial-particle-field.tsx    # Three.js ambient gold & navy particle mesh
│   │   ├── hologram-shield-canvas.tsx    # Interactive 3D wireframe shield & hologram gyroscopes
│   │   ├── canvas2d-fallback.tsx         # Pure Canvas 2D mobile fallback (60 FPS)
│   │   └── hero-3d-scene.tsx             # Dynamic SSR-safe coordinator
│   ├── motion/                           # Milestone M2 (Kinetic Motion & Parallax)
│   │   ├── index.ts                      # Barrel export
│   │   ├── sticky-scroll-sequence.tsx    # Pinned viewport scrollytelling deck
│   │   ├── perspective-tilt-card.tsx     # 3D perspective hover cards with gold spotlight sheen
│   │   ├── kinetic-typography.tsx        # Zero-CLS letter & headline reveals
│   │   └── magnetic-cursor.tsx           # Ambient gold cursor orb & magnetic CTA wrappers
│   ├── widgets/                          # Milestone M3 & M4 (Product Physics & Visualizers)
│   │   ├── nfc-standee-3d.tsx            # 3D tiltable NFC counter standee with pulse waves & chime
│   │   ├── whatsapp-phone-3d.tsx         # Interactive 3D WhatsApp glass smartphone mockup
│   │   ├── sound-wave-visualizer.tsx     # 24-band audio spectrum analyzer for video showcases
│   │   ├── interactive-showcase.tsx      # Integrated showcase embedding 3D Standee & 3D Phone
│   │   ├── review-filter-widget.tsx      # 3D review filter integration
│   │   └── queue-simulator.tsx           # 3D queue simulator integration
│   └── sections/
│       ├── hero-section.tsx              # Integrated with Hero3DScene & KineticTypography
│       ├── services-overview.tsx         # Integrated with StickyScrollSequence & PerspectiveTiltCard
│       └── proof-section.tsx             # Integrated with StickyScrollSequence (Airport Case Study)
```
