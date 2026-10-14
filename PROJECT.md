# Project: JSM Integrated Services (Phase 7 — Framer Defense & Security Tactical Redesign)

## Architecture
- **Framework**: Next.js 16.3 (App Router, React 19, TypeScript, Tailwind CSS v4, Motion/React)
- **Design Philosophy**: High-awarded Framer defense and security web applications (KLYRO Security, Securus, Verkada, Anduril).
- **Color Tokens**:
  - Primary Canvas: Tactical Midnight Obsidian `#030712` (deep base) and `#050811` (elevated hero/bands)
  - Translucent Surfaces: Tactical Obsidian Glass (`bg-[#080C16]/80`, `backdrop-blur-2xl`, `border-white/10`, hover: `border-cyan-400/40`, `shadow-[0_0_30px_rgba(14,165,233,0.15)]`)
  - Telemetry Accent: Electric Cyber Cyan (`#0EA5E9` / `#38BDF8`) for borders, radar rings, hover sheens, and key metric badges
  - Operational Readiness: Live Operational Emerald (`#10B981` / `#34D399`) for 24/7 Central Command radar pulses and statutory compliance checkmarks
  - Primary Typography: Pure White `#FFFFFF` with calibrated letter-spacing (`tracking-tight`) and slate subtext (`#94A3B8`, `#CBD5E1`) achieving strict WCAG AAA readability (18.9:1 ratio)
- **Motion & Micro-Interactions**:
  - Framer-grade border-beam glowing buttons (`.btn-border-beam`, `.btn-tactical-beam`) with animated conic perimeter beam, ambient cyan aura (`shadow-[0_0_25px_rgba(14,165,233,0.30)]`), and tactile click scaling (`active:scale-[0.98]`).
  - Live command radar telemetry badge (`"24/7 CENTRAL COMMAND • ACTIVE MUSTER"`) with concentric emerald/cyan pulse rings across Header, Hero, Mobile Dock, and Regional Hubs.
  - Hardware-accelerated hover cards (`PerspectiveTiltCard` with cyber cyan sheen `rgba(14, 165, 233, 0.18)`), pointer-tracking border reveals (`.card-framer-glow`), and magnetic icon pulls via `MagneticWrapper`.
  - 60 FPS layout integrity with composite-only GPU transitions (`transform`, `opacity`), zero layout shift (CLS < 0.02), and complete elimination of horizontal overflow (`overflow-x-hidden`).

## Feature Inventory
| # | Feature | Description | Milestone | Source | Status |
|---|---------|-------------|-----------|--------|--------|
| 1 | Tactical Midnight Obsidian Token System | Declare `--bg: #030712`, `--bg-tint: #050811`, `--cyan-primary: #0EA5E9`, `--emerald-primary: #10B981`, and glass surfaces in `globals.css` | M1 | Survey Tokens | DONE |
| 2 | Geometric Security Grid & Spotlight Utilities | Implement `.bg-security-grid`, `.bg-radial-cyan-spotlight`, `.card-framer-glow`, and `.tactical-glass-card` in `globals.css` | M1 | Survey Tokens | DONE |
| 3 | Root Shell & Theme Harmonization | Set `body` to `bg-[#030712]`, `overflow-x-hidden`, selection cyan, and enforce `forcedTheme="dark"` in `providers.tsx` | M1 | Survey Tokens & Perf | DONE |
| 4 | Layout Header & Footer Tactical Upgrade | Reskin Header and Footer with `#030712`/`#050811`, cyber cyan telemetry borders, active cyan underlines, and emerald pulse dot | M1 | Survey Tokens | DONE |
| 5 | Clean Residual Light Themes & Serif Elements | Reskin `cookie-banner.tsx` and `not-found.tsx` to tactical obsidian glass; purge 5 residual `font-serif` occurrences | M1 | Survey Tokens & Perf | DONE |
| 6 | Framer Border-Beam Button Component & Variant | Implement animated perimeter border-beam (`@keyframes border-beam-spin`), cyan aura glow, and tactile click scale in `button.tsx` and CSS | M2 | Survey Motion | DONE |
| 7 | Live Command Radar Telemetry Pulse Badge | Build `RadarTelemetryBadge` (`"24/7 CENTRAL COMMAND • ACTIVE MUSTER"`) with concentric emerald/cyan pulse rings for Header & Hero | M2 | Survey Motion | DONE |
| 8 | Hardware-Accelerated Cyber Sheen & Magnetic Pulls | Upgrade `PerspectiveTiltCard` to cyber cyan spotlight sheen (`rgba(14,165,233,0.18)`) and wire `MagneticWrapper` to interactive icons | M2 | Survey Motion | DONE |
| 9 | Telemetry Audio Visualizer Upgrade | Transition `sound-wave-visualizer.tsx` to cyber cyan audio spectrum (`#0EA5E9` to `#38BDF8`) | M2 | Survey Tokens & Motion | DONE |
| 10 | Primary CTA Button Call Site Upgrades | Transform Hero Proposal, Header Quote, Mobile Dock Quote, and CTA Section buttons to Framer border-beam CTAs | M2 | Survey Motion | DONE |
| 11 | Reskin 21 Service Detail Routes | Deploy tactical obsidian cards, emerald compliance checkmarks, and cyber cyan badges across all 21 `/services/[slug]` routes | M3 | Survey Perf & Tokens | DONE |
| 12 | Reskin 8 Regional Industrial Corridors | Reskin `/locations` and all 8 `/locations/[slug]` routes with tactical glass battlecards, radar telemetry pills, and cyan SLA tags | M3 | Survey Perf & Tokens | DONE |
| 13 | Interactive ROI Calculator Tactical Reskin | Upgrade `roi-calculator.tsx` to midnight obsidian canvas, cyber cyan active buttons, slider glow, and turnkey card highlights | M3 | Survey Motion & Tokens | DONE |
| 14 | Interactive Queue Simulator Tactical Reskin | Upgrade `queue-simulator.tsx` to midnight obsidian, cyber cyan mode tabs, terminal consultation display, and device highlights | M3 | Survey Motion & Tokens | DONE |
| 15 | Smart NFC Review Standee Widget Reskin | Upgrade `review-filter-widget.tsx` with 3D tiltable acrylic standee, concentric NFC pulse waves, and cyber cyan/emerald routing | M3 | Survey Motion & Tokens | DONE |
| 16 | Reskin Homepage Core Modules & Case Studies | Upgrade TrustBar, Client Logo Marquee, Airport Slideshow, Services Overview, Leadership, Stats, Reviews, and Trichy Case Study | M3 | Survey Tokens & Motion | DONE |
| 17 | Mobile Viewport Ergonomics & Overflow-X Zero Bounce | Enforce `overflow-x-hidden` on `src/app/layout.tsx` and verify 375px–768px viewports have zero horizontal overflow | M4 | Survey Perf | DONE |
| 18 | Secondary Touch Target Hardening (>= 44px) | Upgrade 5 sub-44px targets (review stars, slideshow chevrons, hero media toggles, digital tools links, drawer close) | M4 | Survey Perf | DONE |
| 19 | Pinned Mobile Conversion Dock Hardening | Harden `mobile-dock.tsx` with Framer border beam, direct call `+91 90808 63448`, WhatsApp deploy, proposal CTA, and iOS safe area clearance | M4 | Survey Perf | DONE |
| 20 | 60 FPS Mobile Hardware Acceleration | Validate composite-only transforms across marquee, slideshow, and cards to guarantee 60 FPS scrolling and CLS < 0.02 | M4 | Survey Motion & Perf | DONE |
| 21 | Next.js Production Build Verification | Verify `npm run build` compiles cleanly with exit code 0 across all 50 static routes | M5 | Survey Perf | PLANNED |
| 22 | Full Empirical & Adversarial Test Suite | Execute 401+ test assertions across routing, schema JSON-LD, math invariants, and backend APIs | M5 | Survey Perf | PLANNED |
| 23 | Reviewer, Challenger & Forensic Integrity Audit | Complete multi-agent review and forensic audit (CLEAN verdict) with zero tolerance for hardcoded cheats | M5 | Dispatch | PLANNED |
| 24 | Git Commit & Push to origin/main | Commit all verified changes with structured release notes and push directly to GitHub `origin/main` | M5 | Dispatch | PLANNED |

## Milestones
| # | Name | Scope | Dependencies | Status | Output |
|---|------|-------|-------------|--------|--------|
| M1 | Tactical Midnight Obsidian & Cyber Cyan Design System | Tokens in `globals.css`, layout shell (`layout.tsx`, `providers.tsx`, `header.tsx`, `footer.tsx`, `mobile-menu.tsx`), reskin `cookie-banner.tsx` and `not-found.tsx`, purge residual `font-serif` headings | none | **DONE** | `globals.css`, `layout.tsx`, `providers.tsx`, `header.tsx`, `footer.tsx`, `cookie-banner.tsx`, `not-found.tsx` |
| M2 | Framer Border-Beam Buttons & Telemetry Micro-Interactions | `RadarTelemetryBadge`, button border-beam variant (`button.tsx`, `globals.css`), primary CTA call sites, `PerspectiveTiltCard` cyber cyan sheen, `MagneticWrapper` activation, `sound-wave-visualizer.tsx` | M1 | **DONE** | `button.tsx`, `radar-telemetry-badge.tsx`, `hero-section.tsx`, `cta-section.tsx`, `perspective-tilt-card.tsx`, `sound-wave-visualizer.tsx` |
| M3 | Full-Site Deployment (Services, Locations, Interactive Widgets) | All 21 service pages, all 8 regional corridors, `roi-calculator.tsx`, `queue-simulator.tsx`, `review-filter-widget.tsx`, Homepage sections, and Case Studies | M1, M2 | **DONE** | `services/[slug]/page.tsx`, `locations/[slug]/page.tsx`, `roi-calculator.tsx`, `queue-simulator.tsx`, `review-filter-widget.tsx`, `page.tsx` |
| M4 | Mobile 60 FPS Ergonomics & Pinned Conversion Dock | Enforce `overflow-x-hidden`, harden 5 sub-44px targets, harden `mobile-dock.tsx`, ensure 60 FPS GPU acceleration and CLS < 0.02 | M1, M2, M3 | **DONE** | `layout.tsx`, `mobile-dock.tsx`, `review-filter-widget.tsx`, `airport-slideshow.tsx` |
| M5 | Build Verification, Multi-Agent Audit & GitHub Deployment | Run `npm run build`, execute full test suite (401+ assertions), Reviewer + Challenger gate, Forensic Auditor (CLEAN verdict), git commit & push to `origin/main` | M1, M2, M3, M4 | **PLANNED** | Commit pushed to `origin/main` |

## Interface Contracts
### Button Component ↔ Page Triggers
- Variant `"border-beam"`: `relative overflow-hidden border border-cyan-400/30 bg-[#030712] text-white shadow-[0_0_25px_rgba(14,165,233,0.30)] hover:shadow-[0_0_35px_rgba(14,165,233,0.50)] active:scale-[0.98]`
- CSS Utility `.btn-border-beam`: Two-layer button (`.btn-border-beam` with conic rotating highlight + `.btn-border-beam-inner` obsidian body with min-h 44px)
- Telemetry Badge `<RadarTelemetryBadge label="..." sublabel="..." />`: Dual-pulse concentric emerald/cyan indicator with monospace command text

## Code Layout
- `src/app/globals.css`: Root design tokens, CSS variables, utility classes, keyframes
- `src/components/ui/button.tsx`: Reusable Base UI / CVA button with tactical variants
- `src/components/ui/radar-telemetry-badge.tsx`: Standalone radar telemetry badge
- `src/components/layout/`: Global shell (header, footer, mobile dock, mobile menu)
- `src/components/sections/`: Homepage modular showcase sections
- `src/components/widgets/`: Interactive simulators (ROI calculator, queue simulator, review filter, slideshow, audio visualizer)
- `src/app/services/`: Service catalog and dynamic `[slug]` pages
- `src/app/locations/`: Regional industrial corridors catalog and dynamic `[slug]` pages
