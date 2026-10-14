# Project: JSM Integrated Services (Phase 6 — Stripe / Sargam / Gemini Space Black Transformation)

## Architecture
- **Framework**: Next.js 16.3 (App Router, React 19, TypeScript, Tailwind CSS v4, Motion/React)
- **Design Philosophy**: Stripe, Sargam (sargam.co), Linear, and Apple Pro luxury Space Black aesthetic.
- **Color Tokens**:
  - Canvas: Pitch Black `#000000`
  - Surfaces: Frosted Titanium Glass (`bg-white/[0.03]`, `backdrop-blur-2xl`, `border-white/10`, `shadow-[0_8px_32px_rgba(0,0,0,0.6)]`)
  - Primary Typography: Pure White `#FFFFFF` with calibrated letter-spacing (`tracking-tight`)
  - Secondary Typography: Titanium Silver (`#94A3B8`, `#CBD5E1`)
  - Accents: Hairline Titanium borders (`border-white/10` to `border-white/20`), tactile white-on-black action triggers
  - Cleanliness: Absolute eradication of `#D4AF37`, brass, and un-harmonized `#0F2A47` legacy navy.
- **Motion & Micro-Interactions**:
  - GPU-accelerated continuous CSS marquee ticker (`translate3d(-50%, 0, 0)`), seamless wrapping, pause-on-hover.
  - Apple/Stripe 3.0s auto-crossfade operations showcase (`opacity: 0 -> 1`), 5 segmented progress pills with linear filling indicators, instant tap switching, zero draggable motion tracks.
  - Subtle magnetic button hover pulls on desktop via `MagneticWrapper`, graceful zero-overhead bypass on mobile via `useIsFinePointer()`.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Reskin Interactive Widgets to Space Black | Reskin `RoiCalculator`, `QueueSimulator`, and `ReviewFilterWidget` to eliminate 40 legacy `#0F2A47` and stark white boxes | M1 | Survey Tokens |
| 2 | Modern Neo-Grotesque Typography | Update headings from `Source_Serif_4` / `font-serif` to clean geometric sans with `tracking-tight` | M1 | Survey Tokens & Copy |
| 3 | Frosted Titanium Glass Elevations | Standardize card surfaces to `backdrop-blur-2xl`, `border-white/10`, and obsidian glass gradients | M1 | Survey Tokens |
| 4 | Magnetic Button Micro-Interactions | Wrap primary CTA buttons in `MagneticWrapper` with fine-pointer gating for desktop and tactile `press-scale` on mobile | M1 | Survey Tokens |
| 5 | Clean Legacy Colors & Star Remnants | Clean residual amber stars, "Brass Cup", and obsolete gold rules | M1 | Survey Tokens |
| 6 | Continuous Infinite Client Logo Marquee | Deploy dedicated horizontal marquee ticker with 12 institutional and corporate badges (AAI, MoCA, Indian Army, TN Police, PSARA, ISO 9001, GeM, clients) | M2 | Survey Showcase |
| 7 | GPU-Accelerated Marquee Mechanics | Pure CSS linear marquee with duplicated array infinite wrapping, pause-on-hover, bilateral feathering | M2 | Survey Showcase |
| 8 | Eliminate Clumsy Drag & Slider Artifacts | Remove Framer Motion `drag="x"` and 13-thumbnail track from `AirportOperationsSlideshow` to prevent mobile touch hijacking | M3 | Survey Showcase |
| 9 | 3.0s Auto-Crossfade Operations Showcase | Calibrate showcase to 3.0s interval cycling 5 curated operational pillars with Apple/Stripe smooth crossfade dissolve | M3 | Survey Showcase |
| 10 | Segmented Progress Pills Navigation | Deploy 5 interactive segmented progress pills with 3.0s linear filling indicators and instant tap switching | M3 | Survey Showcase |
| 11 | Ultra-Lean 1-Sentence Action Copy | Cut multi-sentence paragraphs across Hero, TrustBar, Services, and Locations by 60–75% into 1-sentence value propositions | M4 | Survey Copy |
| 12 | High-Contrast Metric Pills | Position high-contrast credential pills (`[ 2-HR RELIEF SLA ]`, `[ 100% EPF/ESIC ]`, `[ AAI BENCHMARK ]`) above fold | M4 | Survey Copy |
| 13 | 44px+ Above-the-Fold Conversion Triggers | Verify and enforce 44px+ tap targets for Phone `+91 90808 63448`, WhatsApp Quick Deploy, and Proposal Generator | M4 | Survey Copy |
| 14 | Production Build Verification | Compile `npm run build` with exit code 0, 0 TypeScript errors, 0 ESLint errors across all 50 static routes | M5 | Survey Perf |
| 15 | Performance & Empirical Zero-Shift Audit | Verify 60 FPS mobile scrolling, sub-second FCP (with video poster fallback), CLS < 0.02, and empirical token test suite | M5 | Survey Perf |
| 16 | Git Commit & Push to origin/main | Commit all modifications with structured messages and push directly to GitHub `origin/main` | M5 | Dispatch |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Space Black Design System & Micro-Interactions | Reskin widgets, switch headings to sans `tracking-tight`, frosted glass elevations, magnetic CTAs, purge `#0F2A47` | none | PLANNED |
| M2 | Infinite Smooth Logo & Credentials Marquee | Build `ClientLogoMarquee` with 12 badges, pure CSS linear animation, pause-on-hover, integrate in `src/app/page.tsx` | none | PLANNED |
| M3 | Apple/Stripe 3.0s Auto-Crossfade Operations Showcase | Refactor `airport-slideshow.tsx`: remove `drag="x"`, 5 pillars, 3.0s crossfade, 5 segmented progress pills | none | PLANNED |
| M4 | Ultra-Lean 1-Sentence Copy & Conversion Funnel | Streamline copy across Hero, TrustBar, Services, Locations; high-contrast metric pills; hero video poster | none | PLANNED |
| M5 | Build Verification, E2E Audit & GitHub Push | Run `npm run build`, run empirical challenger tests, verify CLS & 60 FPS, git commit & push to `origin/main` | M1, M2, M3, M4 | PLANNED |

## Code Layout & Write Boundaries
- **Milestone M1 (Design System & Widgets)**:
  - `src/app/globals.css`
  - `src/app/layout.tsx`
  - `src/components/widgets/roi-calculator.tsx`
  - `src/components/widgets/queue-simulator.tsx`
  - `src/components/widgets/review-filter-widget.tsx`
  - `src/components/ui/button.tsx`
  - `src/app/api/quote-pdf/route.ts` & `src/app/api/landing-lead/route.ts` (harmonize legacy color tokens)
- **Milestone M2 (Logo Marquee Ticker)**:
  - `src/components/sections/client-logo-marquee.tsx` (new component)
  - `src/components/sections/trust-bar.tsx`
  - `src/app/page.tsx` (embed marquee)
- **Milestone M3 (Auto-Crossfade Operations Showcase)**:
  - `src/components/widgets/airport-slideshow.tsx`
  - `src/app/case-studies/trichy-international-airport/page.tsx`
- **Milestone M4 (Ultra-Lean Copy & Funnel)**:
  - `src/components/sections/hero-section.tsx`
  - `src/components/sections/services-overview.tsx`
  - `src/components/sections/cta-section.tsx`
  - `src/app/locations/page.tsx`
  - `src/data/locations.ts`
- **Milestone M5 (Verification & Release)**:
  - `tests/`
  - Git repository state

## Interface Contracts
### `src/components/sections/client-logo-marquee.tsx`
- Exports `ClientLogoMarquee()` as a React component.
- Renders continuous horizontal marquee ticker of 12 institutional and client badges:
  1. Airports Authority of India (AAI)
  2. Ministry of Civil Aviation (MoCA)
  3. Indian Army ESM Command / DGR
  4. Tamil Nadu Police Verification
  5. PSARA 2005 Compliance
  6. ISO 9001:2015 Certification
  7. 100% EPF & ESIC Statutory Compliance
  8. Precision Automotive Components (Hosur)
  9. Ascent Global Tech Park (Chennai OMR)
  10. Kongu Engineering & Foundry Cluster (Coimbatore)
  11. Salem Specialty Healthcare Hospital
  12. Government e-Marketplace (GeM)
- Seamless infinite loop using GPU-accelerated CSS marquee (`@keyframes marquee`).
- Bilateral gradient masks (`from-black via-black/80 to-transparent`).
- Pause on hover without freezing UI thread.

### `src/components/widgets/airport-slideshow.tsx`
- Exports `AirportOperationsSlideshow()` as a React component.
- Eliminates `drag="x"`, `dragConstraints`, and drag listeners completely.
- Displays 5 curated operational pillars:
  1. `01 MUSTER`: Morning Platoon Shift Muster (`trichy_airport_platoon_salute_day.jpg`)
  2. `02 CONCOURSE`: International Concourse Security & Access Sentry (`trichy_airport_concourse_commander_salute.jpg`)
  3. `03 MECHANIZED`: Mechanized Granite Auto-Scrubber (`trichy_airport_concourse_autoscrubber_cleaning.jpg`)
  4. `04 NIGHT PATROL`: 02:00 AM Night Perimeter Sentry (`trichy_airport_night_security_post.jpg`)
  5. `05 AAI GATEWAY`: Official AAI Gateway Portal Drill (`trichy_airport_platoon_national_flag.jpg`)
- Auto-crossfade transition: 3000ms (`3.0s`) duration with `opacity: 0 -> 1` and gentle `scale: 1.02 -> 1.0` ease.
- Navigation: 5 segmented progress pills (`grid grid-cols-5 gap-2`) with linear 3.0s fill animation on active pill and instant tap switching.
- Mobile touch ergonomics: `min-h-[44px]` tap targets, zero vertical scroll interference.

### `src/components/sections/hero-section.tsx`
- 1-Sentence subheadline: "AAI concourse contractor deploying Ex-Servicemen command, 100% EPF/ESIC statutory compliance, and guaranteed 2-hour relief replacement across Tamil Nadu."
- High-contrast metric pills: `[ 2-HOUR RELIEF SLA ]`, `[ 100% EPF & ESIC COMPLIANT ]`, `[ AAI BENCHMARK • 02:00 AM AUDITS ]`.
- 44px+ tap targets for Proposal Generator, WhatsApp Quick Deploy, and Call Desk.
- Video element includes `poster="/images/trichy-airport/trichy_airport_platoon_salute_day.jpg"` for sub-second FCP.
