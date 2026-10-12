# Project: JSM Integrated Services Space Black Streamline

## Architecture
- **Framework**: Next.js App Router (TypeScript, React 19, Tailwind CSS v4, Motion/React)
- **Design System**: Apple Pro Space Black (`#000000`), Obsidian card elevations (`#080C14`, `#0C101A`), Hairline Titanium borders (`border-white/10`, `border-white/15`), Pure White typography (`#FFFFFF`). Zero gold/brass remnants.
- **Data Flow & Components**:
  - `src/app/layout.tsx`: Root HTML shell, unified global Schema.org Knowledge Graph (`@graph`), root metadata, geo-coordinates (`10.7905, 78.7047`), and OpenGraph fallback.
  - `src/components/layout/header.tsx` & `mobile-dock.tsx`: Navigation, direct call trigger, direct link to 2-Minute Proposal generator (`/get-quote`).
  - `src/components/sections/hero-section.tsx`: High-intent above-the-fold 3-tier action cluster: (1) 2-Min Proposal Generator (`/get-quote`), (2) WhatsApp Quick Deploy (`https://wa.me/919080863448`), (3) Direct Call (`tel:+919080863448`), plus sole lightweight mobile-first action video reel.
  - `src/components/widgets/airport-slideshow.tsx`: Compact single-row auto-scrolling concourse slideshow cycling 13 authentic Trichy International Airport operations photos advancing every 0.8–1.0s with zero layout shift (zero CLS).
  - `src/lib/schema.ts`: Authoritative unified Schema.org Knowledge Graph linking `Organization`, `LocalBusiness`, and `WebSite` with explicit entity differentiation for "JSM", `alternateName: ["JSM", "JSM Security", "JSM Manpower", "JSMMANPOWER", ...]`, verified credentials, and speakable schema.
  - `src/lib/seo.ts`: Standardized metadata constructor with canonical URLs, OpenGraph, Twitter Cards, and W3C/ICBM geo-coordinates.
  - `src/app/robots.ts` & `public/llms.txt` / `public/llms-full.txt`: AI search bot directives and LLM knowledge graphs with AEO citation answer blocks.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Retire Cursor Tracking Orbs | Completely remove `AmbientMagneticCursor` and window mousemove listeners while preserving `useIsFinePointer` | M1 | Survey UI |
| 2 | Above-the-Fold Conversion Cluster | Embed Direct Call (`+91 90808 63448`), WhatsApp Quick Deploy, and 2-Minute Proposal generator (`/get-quote`) above the fold in Hero and Header | M1 | Survey UI & Copy |
| 3 | Single-Row Concourse Slideshow | Deploy compact 0.8–1.0s auto-advancing slideshow cycling 13 authentic Trichy airport photos with zero CLS | M2 | Survey UI |
| 4 | Consolidate Video & Gallery Footprint | Retire expansive `AirportGallery`, redundant `SecurityVideoShowcase`, `DigitalVideoPlayer`, and `SoundWaveVisualizer`; keep only hero reel | M2 | Survey UI & Copy |
| 5 | Aggressive 50–70% Copy Reduction | Cut multi-paragraph descriptive copy across Home, Services, Trust, About, Case Studies, and FAQs | M3 | Survey Copy |
| 6 | Commanding 1-Sentence Value Propositions | Replace passive copy with crisp 1-sentence value propositions highlighting verified credentials (AAI, ESM, 100% EPF/ESIC, 2-hr SLA) | M3 | Survey Copy |
| 7 | Space Black & Obsidian Monochrome Harmonization | Eliminate legacy `#0F2A47` navy tints to pure `#000000` / `#080C14` / hairline titanium borders | M3 | Survey UI |
| 8 | Entity Disambiguation for "JSM" | Schema.org structured data (`Organization`, `LocalBusiness`, `WebSite`) with explicit `alternateName` and `disambiguatingDescription` | M4 | Survey SEO |
| 9 | GEO/LLM Citations & `llms.txt` Enrichment | Enrich `public/llms.txt` and `public/llms-full.txt` with verified citations and AEO direct Q&A fact matrix | M4 | Survey SEO |
| 10 | Complete Metadata, Geo-Coordinates & Speakable Schema | Hardcode OpenGraph, Twitter Cards, W3C geo tags (`10.7905, 78.7047`), and speakable schema | M4 | Survey SEO |
| 11 | Production Build & Zero Lint/TS Errors | Compile `npm run build` with exit code 0, zero lint errors, and zero TypeScript errors | M5 | Dispatch |
| 12 | Git Commit & Push to origin/main | Commit all modifications with clean commit messages and push to GitHub `origin/main` | M5 | Dispatch |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Conversion Architecture & Cursor Retirement | Hero CTA cluster (Direct Call, WhatsApp, 2-Min Proposal), Header link to `/get-quote`, remove trailing cursor orb | none | PLANNED |
| M2 | Concourse Slideshow & Media Consolidation | Deploy compact 0.8–1.0s slideshow with zero CLS, retire redundant video players & expansive gallery | M1 | PLANNED |
| M3 | Copy Streamlining & Space Black Harmonization | 50–70% copy cuts, 1-sentence value propositions, unify 2-hour SLA, harmonize legacy navy to Space Black/obsidian | M2 | PLANNED |
| M4 | Search Engine & AI Knowledge Authority | Schema.org unified graph, "JSM" entity disambiguation, `llms.txt` & `llms-full.txt` AEO Q&A, geo-coordinates | M3 | PLANNED |
| M5 | Build Verification, E2E Gate & Git Delivery | `npm run build` compilation, test verification, git commit & push to `origin/main` | M4 | PLANNED |

## Interface Contracts
### `src/components/motion/magnetic-cursor.tsx`
- Must export `useIsFinePointer(): boolean` (required by `PerspectiveTiltCard`).
- Must NOT render fixed cursor DOM nodes or attach global `mousemove` listeners.

### `src/components/sections/hero-section.tsx`
- Above-the-fold CTA cluster must contain:
  1. `Link href="/get-quote"`: "2-Min Proposal Generator"
  2. `a href="https://wa.me/919080863448?text=..."`: "WhatsApp Quick Deploy"
  3. `a href="tel:+919080863448"`: "Call Desk: +91 90808 63448"
- Retains single lightweight mobile-first action video reel (`/videos/jsm-higgsfield-youtube-storyboard-preview.mp4`).

### `src/components/widgets/airport-slideshow.tsx`
- Compact container (`h-[220px] sm:h-[260px] md:h-[300px]`), cycling 13 authentic Trichy airport concourse photos.
- Auto-advances every 0.8–1.0s with pause-on-hover and linear progress ticker.
- Zero Cumulative Layout Shift (CLS = 0.000).

### `src/lib/schema.ts` ↔ `src/app/layout.tsx`
- Exports `getUnifiedKnowledgeGraph()` returning `@graph` containing `Organization`, `LocalBusiness`, and `WebSite`.
- Declares `alternateName: ["JSM", "JSM Security", "JSM Manpower", "JSMMANPOWER", "JSM Integrated Services Tamil Nadu", "JSM Security Trichy", "JSM Facility Services"]`.
- Declares `disambiguatingDescription` distinguishing JSM Integrated Services from hospitality, HR software, or accounting entities.
- Declares verified geo-coordinates: Latitude `10.7905`, Longitude `78.7047`.
- Declares AAI civil aviation security concourse contract, Ex-Servicemen leadership, and 100% EPF/ESIC compliance.

## Code Layout
- `src/app/layout.tsx` — Root shell, global metadata, OpenGraph fallback, unified Knowledge Graph script.
- `src/app/page.tsx` — Homepage composing Hero, compact Airport Operations Slideshow, Streamlined Services, Proof, Leadership, FAQs, CTAs.
- `src/components/layout/header.tsx` — Desktop/mobile header navigation.
- `src/components/sections/hero-section.tsx` — Above-the-fold CTA cluster and mobile-first hero action demonstration.
- `src/components/sections/trust-bar.tsx` — Crisp AAI contract verification & statutory credentials.
- `src/components/sections/services-overview.tsx` — Streamlined 3-tier services and digital automation cards.
- `src/components/widgets/airport-slideshow.tsx` — High-velocity 0.8–1.0s concourse operations slideshow.
- `src/data/faqs.ts` — Crisp 1-to-2 sentence direct answers.
- `src/lib/schema.ts` — Unified Schema.org knowledge graph and speakable schema.
- `src/lib/seo.ts` — Standardized Next.js metadata generator with geo tags and Twitter handles.
- `src/app/robots.ts` — Crawler directives including OAI-SearchBot and generative crawlers.
- `public/llms.txt` & `public/llms-full.txt` — Authoritative LLM knowledge bases with AEO citation Q&A matrix.
