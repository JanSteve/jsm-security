# JSM Integrated Services — Design Engineering System (DESIGN.md)
*Standardized on UI-Skills Playbook & Design Engineering Specifications*

---

## 🏛️ 1. Architectural Philosophy & Brand Identity

JSM Integrated Services (`jsmintegratedservices.com`) embodies an **Executive Space Black & Titanium Platinum** aesthetic inspired by Apple Pro, Stripe, and modern enterprise UI benchmarks (**21st.dev**, **Magic UI**, **Aceternity UI**, **Origin UI**, and **Cult UI**).

### Core Tenants:
1. **Physical Reality & Authenticity First** (`image-to-code`, `brandkit`):
   - Strictly 100% authentic, uncompressed operational photography:
     - Trichy International Airport concourse security platoon with MD Sweety J (`/images/real_jsm_airport_terminal_platoon.jpg`).
     - Heritage chariot monument platoon muster (`/images/real_jsm_chariot_platoon.jpg`).
     - Official physical business card proof (`/images/real_jsm_printed_card.jpg`).
     - Industrial fabrication manpower hiring proof (`/images/real_jsm_fabrication_hiring.jpg`).
   - Strictly **zero synthetic AI-generated faces or generic stock photography**.

2. **Anti-Slop & Direct Executive Prose** (`anti-slop`, `deslop`, `humanize`):
   - Never use vague marketing buzzwords ("In today's fast-paced world", "Elevate your enterprise", "Seamlessly orchestrate").
   - Lead with hard, auditable operational facts:
     - *PSARA 2005 Licensed (Home Dept of Tamil Nadu)*.
     - *2:00 AM Unannounced Mobile Van Supervisor Spot-Audits*.
     - *2-Hour Relief Guard Replacement SLA*.
     - *100% EPF & ESIC Zero-Liability Monthly ECR Indemnity*.

3. **Performance & Core Web Vitals** (`core-web-vitals`, `performance`, `60fps-animation`):
   - Zero layout shifts: all image containers reserve explicit dimensions or aspect ratios (`aspect-ratio: 16/9`, `aspect-ratio: 4/3`).
   - 60fps animations: purely hardware-accelerated transforms (`transform: translateY()`, `transform: scale()`, `opacity`).
   - Zero render-blocking remote fonts: zero latency system font stacks with SF Pro / Inter fallbacks.

---

## 🎨 2. Color Palette & OKLCH Tokens (`better-colors`, `oklch-skill`)

| Token Name | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Space Black (Canvas)** | `#000000` / `#080C14` | Primary dark surface background and frosted titanium glass |
| **Card Surface (Deep)** | `#080C14` / `#0B0F17` | Level 1 elevated cards, frosted widgets, and terminals |
| **Card Surface (Hover)** | `#111723` / `rgba(255, 255, 255, 0.05)` | Level 2 interactive cards and nested pills |
| **Titanium Platinum (Brand Accent)** | `#E2E8F0` / `#FFFFFF` | Crest accents, active borders, tactile CTAs, key metrics |
| **Titanium Sheen & Glow** | `rgba(255, 255, 255, 0.15)` | Frosted glass borders, subtle specular highlights, active box-shadows |
| **Vigilance Emerald** | `#10B981` / `#34D399` | 24/7 active telemetry pings, verified checks |
| **Alert Amber** | `#F59E0B` | Critical audits, inspection flags |
| **Text Primary** | `#FFFFFF` | Primary headings, values, metrics |
| **Text Muted** | `#9CA3AF` / `#A1A1AA` | Subtitles, descriptions, captions |
| **Border Dark Subtle** | `rgba(255, 255, 255, 0.10)` | Container grid lines, titanium glass borders, subtle dividers |

---

## 📐 3. UI-Skills Master Playbook (16 Invariant Rules)

### Rule 1: Balance Heading & Body Text (`use-text-balance` & `text-pretty`)
- **Headings (`h1`–`h6`)**: Use `text-wrap: balance` (`text-balance`). Every headline must feel intentional.
- **Body Copy (`p`)**: Use `text-wrap: pretty` (`text-pretty`). Body copy must wrap cleanly without leaving a single word stranded on the last line.

### Rule 2: Align Numbers with Tabular Nums (`use-tabular-nums-for-data`)
- Enforce `.tabular-nums` (`font-variant-numeric: tabular-nums`) on all tables, stats, timers, percentages, and data-heavy UI.
- Prevents horizontal jitter when numbers increment or change.

### Rule 3: 44px Minimum Touch Targets (`use-large-touch-targets`)
- All buttons, switches, links, and form inputs must have a touch target of at least 44 by 44px (`min-h-[44px] min-w-[44px]`).
- All primary CTAs are set to `h-12` (48px) with accessible padding.

### Rule 4: Match Border Radius on Nested Elements (`use-concentric-border-radius`)
- The inner element's radius must equal the parent's radius minus its padding:
  $$R_{\text{inner}} = \max(0, R_{\text{outer}} - \text{padding})$$
- Example: Outer container `rounded-3xl` (24px) with `p-6` (24px) padding $\rightarrow$ Child element `rounded-xl` (12px).

### Rule 5: Tactile Scale Feedback on Press (`add-scale-on-press`)
- Add subtle press feedback with `:active` and a scale near 0.96:
  `transition: transform 0.15s cubic-bezier(0.16, 1, 0.3, 1); active:scale-[0.96];`

### Rule 6: Animate Popovers from Their Trigger
- Popovers, tooltips, and dropdowns animate with `transform-origin` set to the initiating control, expanding outward from the trigger.

### Rule 7: Group Content with Spacing, Not Dividers
- Use generous, structured spacing (`space-y-6`, `gap-6`) to create clean chapters and visual grouping before resorting to divider lines.

### Rule 8: Preview the Next Item in Scroll Lists
- In horizontal lists, carousels, and mobile rails, show 16 to 32px of the next item to make horizontal scroll affordance immediately obvious.

### Rule 9: Neutral Borders Around Images
- Use a thin neutral outline (`border border-white/10` or `border-zinc-800`) instead of saturated or tinted rings around cards and photos.

### Rule 10: Truncate Long Titles in Tight Spaces
- Use `truncate` or `line-clamp-1` / `line-clamp-2` when space is constrained to preserve layout geometry.

### Rule 11: Improve Contrast for Muted Text
- Muted secondary text must maintain at least 4.5:1 contrast against dark backgrounds (`text-zinc-400` / `text-zinc-300`, never faint gray).

### Rule 12: Avoid Scale-Zero Entrance Animations
- Start entrance animations near 95%–98% size (`initial={{ opacity: 0, scale: 0.96 }}`) instead of scaling up from zero (`scale: 0`).

### Rule 13: Match Loading Skeletons to Real Content
- Skeletons must mirror the exact dimensions, line counts, and border radii of the content they replace. Skip generic spinners.

### Rule 14: Limit Each View to One Accent Color
- Exactly one primary accent color per view: Titanium Platinum (`#FFFFFF` / `#E2E8F0`). Keep all secondary, tertiary, and supportive actions neutral dark slate or space black.

### Rule 15: Keep Body Text Lines Between 60 and 75 Characters
- Constrain text lines with `.line-measure` (`max-width: 68ch`) or `max-w-xl` / `max-w-2xl` for optimal reading cadence.

### Rule 17: Visible Keyboard Focus Rings (`:focus-visible`)
- Enforce `:focus-visible` with `outline: 2px solid #FFFFFF; outline-offset: 2px;`. Never show outlines on mouse clicks, but always provide high-contrast titanium platinum focus rings for keyboard tab navigation.

### Rule 18: Form Validation Errors Directly Below Fields
- Place validation error messages immediately beneath the affected field in red/amber with an icon, not at the top or in disconnected alerts.

### Rule 19: Visible Labels on Every Form Field
- Every input must have a persistent visible label above it. Placeholder text is never used as the sole label.

### Rule 20: Single Primary Action for Empty States
- Empty states must present exactly one clear primary action button to resolve the state, never just explanatory dead-end text.

### Rule 21: Sentence Case for UI Labels
- Write interface labels, buttons, and badges in sentence case ("Get instant quote", "Operations briefing"), avoiding aggressive ALL CAPS for body UI.

### Rule 22: Never Rely on Color Alone for Status
- Every status indicator must combine color with text or an icon (e.g., green dot paired with "Active" or checkmark), ensuring accessibility for colorblind users.

### Rule 23: Ease-Out for Entrance Animations
- Use ease-out curves (`cubic-bezier(0.16, 1, 0.3, 1)`) for entrances. Ease-in feels sluggish and delayed to users.

### Rule 24: Optical Balance for Icon Alignment
- Nudge icons 1px optically when mathematical/geometric centering looks lopsided beside uppercase or tall lowercase glyphs.

### Rule 25: Match Icon Stroke Weight to Text Weight
- Use `strokeWidth={2}` beside semibold/bold text, and `strokeWidth={1.5}` beside regular weight body text.

### Rule 26: Outline Icons for Default, Fill for Active
- Interactive icon toggles and navigation items use outline stroke by default, switching to solid fill upon activation.

### Rule 27: Avoid Artificial Glows on Primary Buttons
- Avoid muddy neon outer glow effects on primary CTAs. Achieve authority through sharp contrast (`bg-white text-black font-extrabold hover:bg-neutral-200`) and generous spatial margins with tactile press feedback (`active:scale-[0.98]`).

### Rule 28: Smooth Icon State Cross-Fades
- Cross-fade changing icons (such as play/pause or copy/check) with subtle scale and opacity transitions, rather than abrupt snaps.

### Rule 29: 12px Spacing Between Nearby Bordered Controls
- Maintain at least 12px of breathing space between adjacent bordered inputs or button groups to avoid visual crowding.

### Rule 30: Keep Full-Width Buttons Inside Page Margins
- Full-width action buttons must remain strictly inside container page margins, never bleeding edge-to-edge on mobile screens.

### Rule 31: Tighter Line Height for Headings (~1.1)
- Display headings and hero titles use `leading-[1.08]` to `leading-[1.12]` for maximum visual punch and cohesion.

### Rule 32: Negative Letter Spacing for Large Text
- Large display typography applies tighter tracking (`tracking-[-0.03em]` to `tracking-[-0.04em]`) to preserve typographical density.

### Rule 33: Confirm Irreversible Destructive Actions
- Always require explicit confirmation modal or two-step verification before deleting data or terminating active operations.

### Rule 34: Masked Fades on Scrollable Rails
- Horizontal overflow lists apply `.scroll-fade-x` (`mask-image`) to show users where content continues past the viewport edge.

### Rule 35: 100ms Staggered Entrances on First Load
- Hero elements stagger their entrance by ~100ms on first load, while subsequent in-page interactions and tab switches remain instant.

### Rule 36: Short, Subtle Exit Animations
- Exits remain short (< 200ms) with subtle translateY (-4px to 0) movements, never long or lingering.

### Rule 37: Accelerated Tooltip Discovery
- Once a user triggers the first tooltip, subsequent nearby tooltips open with 0ms delay for seamless inspection.

### Rule 38: Interruptible CSS Transitions
- State changes use interruptible CSS transitions (`transition: transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)`) so gestures never lock or stutter.

### Rule 39: Zero Repeated Animations on Routine UI
- Tab switches and recurring routine actions switch instantly without replaying entrance choreographies.

### Rule 40: Ease-Out Instead of Springs for Micro-Feedback
- Toggles, switches, and toasts use smooth ease-out curves instead of high-frequency bouncy springs that cause perceptual wobble.

### Rule 41: Fade Menus Out Without Distant Off-Screen Motion
- Dropdowns and menus close with a quick fade-out in place, without sweeping across the screen.

### Rule 42: Reserve Brand Accent for Actions & Highlights
- Headings stay neutral obsidian or pure white. Titanium Platinum (`#FFFFFF` / `#E2E8F0`) is reserved strictly for actionable triggers, active borders, and primary status markers.

### Rule 43: Solid Modal Backdrops Over Full-Screen Blurs
- Modal backdrops use `.modal-solid-backdrop` (`rgba(7, 9, 14, 0.88)`), eliminating expensive full-screen GPU blur rendering bottlenecks.

### Rule 44: Soft Fades for Overflowing Text
- Constrained labels apply `.text-fade-overflow` rather than abrupt ellipsis cuts.

### Rule 45: Symmetric Enter and Exit Choreography
- Components share matching symmetric enter/exit physics so surfaces feel anchored to reality.

### Rule 46: Soft Blurs on Dynamic Label Changes
- Dynamic numerical or label updates apply a momentary micro-blur to eliminate distracting visual flashes.

### Rule 47: Aspect Ratio Preservation Against Layout Shifts
- All media and card containers enforce explicit aspect ratios (`aspect-video`, `aspect-[4/3]`) to prevent Core Web Vitals CLS.

---

## ⚡ 4. Component Standards

### 1. Hero Section 2.0 (`src/components/sections/hero-section.tsx`)
- **Aesthetic**: Aceternity dark obsidian with live 24/7 command pill.
- **Spotlight**: Magic UI `BorderBeam` outlining MD Sweety J with the security platoon at Trichy International Airport.
- **Action**: High-converting `ShimmerButton` linking to `/lead-generation`.

### 2. Command Telemetry Terminal (`src/components/sections/command-terminal.tsx`)
- **Shell**: macOS dark window with red/yellow/green indicators.
- **Telemetry**: Real-time simulated operational logs for mobile night van patrols, day shift musters, and 2-Hour SLA dispatches.
- **Tabs**: Live Stream, SLA Guarantees, Command Hierarchy.

### 3. Six Core Verticals (`src/components/sections/services-overview.tsx`)
- **Structure**: Origin UI 1-click segmented switcher for JSM-01 to JSM-06.
- **Direct Dispatch**: 1-click WhatsApp and Phone buttons with pre-filled inquiries.

### 4. Executive Leadership Dossiers (`src/components/sections/leadership-section.tsx`)
- **Tier 1**: **Sweety J** — Proprietor & Managing Director
- **Tier 2**: **Major AR Devadoss (Army-Veteran)** — Head of Operations
- **Tier 3**: **R Jan Steve Daniel** — Chief Technical Officer & Audit

---

## 🔍 5. Search & Machine Engine Optimization Standards

1. **SEO**:
   - Dynamic `/sitemap.xml` indexing all 76+ pages with daily/weekly change frequency and priority weighting.
   - Dynamic `/robots.txt` granting full crawl permissions to Google, Bing, and AI agents.
2. **GEO (Generative Engine Optimization)**:
   - Root `/llms.txt` exposing comprehensive markdown structured for Perplexity, ChatGPT Search, Claude, and Gemini.
3. **LEO (LLM Engine Optimization)**:
   - Complete Schema.org JSON-LD definitions (`Organization`, `LocalBusiness`, `SecurityService`, `EmploymentAgency`, `Service`, `BlogPosting`).
4. **MEO (Map Engine Optimization)**:
   - GPS anchor at Kottapattu HQ (`10.7850° N, 78.6940° E`).
   - Strict NAP (Name, Address, Phone) consistency across all citations.
