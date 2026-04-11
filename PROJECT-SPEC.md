# RWBH Architects — Project Specification

## Overview
Premium portfolio website for **Rahel Wahnon Ben Haim Architects** — luxury residential architecture and interior design studio in Jerusalem.

**Live repo:** https://github.com/Shlomonhaon/rwbh-architects
**Stack:** Next.js 16 + TypeScript + Tailwind CSS v4 + shadcn/ui + Framer Motion + GSAP

## Design System (UI/UX Pro Max)

### Typography
- **Headings:** Cinzel (Google Fonts) — serif, luxury real estate feel
- **Body:** Josefin Sans (Google Fonts) — light, elegant sans-serif
- **CSS classes:** `.font-display` (Cinzel), `.label-micro` (11px, tracking 0.35em, uppercase)

### Color Palette
- **Background:** `#F5F0EB` (warm beige/cream)
- **Portfolio section:** `#EDE8E2` (slightly darker beige)
- **About section:** `#faf9f7` (off-white)
- **Text primary:** `#1a1a1a` (near-black)
- **Text secondary:** `#555`
- **Accent/Gold:** `#A16207` (WCAG compliant gold)
- **Gold light:** `#D4AF37` (for highlights)
- **Blueprint stroke:** `#8B7355` (bronze/dusty gold)
- **Footer:** `#EDE8E2` with `#1a1a1a/30` text
- **Vignette:** `radial-gradient(circle at center, transparent 40%, rgba(139,115,85,0.12) 100%)` on body

### Style
- **Exaggerated Minimalism** — oversized typography, massive whitespace, single accent color
- **Liquid Glass effects** on navigation (backdrop-blur)
- **Hand-drawn SVG filter** — `feTurbulence baseFrequency="0.002"` for pen-on-paper feel
- **No emojis** — SVG icons only (Lucide)

## Site Structure

### 1. Preloader (`preloader.tsx`)
- 800ms loading animation with gold progress bar
- "RWBH Architects" text
- Safety timeout at 2s
- Exit animation: slide up

### 2. Custom Cursor (`custom-cursor.tsx`)
- Gold dot (8px) follows mouse instantly
- Gold ring (40px) follows with 0.25 lerp
- Ring expands on hover over `a`, `button`, `[data-hover]`
- Event delegation — single listener on body (no memory leak)
- Hidden on touch devices and `prefers-reduced-motion`

### 3. Scroll Progress (`scroll-progress.tsx`)
- 2px gold gradient bar at top of page
- Tied to `scrollYProgress` via Framer Motion

### 4. Master Plan SVG Animation (`master-plan.tsx`)
**The signature feature** — architectural blueprint that draws as user scrolls.

- **SVG:** `viewBox="0 0 1920 4000"`, `preserveAspectRatio="xMinYMin meet"`, `height: 400vh`
- **Position:** `fixed`, `z-index: 1`, `pointer-events: none`
- **Engine:** GSAP ScrollTrigger with `scrub: 1`
- **Parallax:** `yPercent: -8` on entire SVG

**4 Sections with 22% overlap:**
| Section | Content | Scroll Range |
|---------|---------|-------------|
| 0 | Site Plan (buildings, pool, trees, parking, compass) | 0% - 34% |
| 1 | Floor Plan (rooms, furniture, kitchen, stairs) | 22% - 56% |
| 2 | Elevation (facade, windows, entrance, balcony) | 44% - 78% |
| 3 | Cross Section (roof→foundation, beams, stairs) | 66% - 100% |

**Hierarchical Stagger (per section):**
| Class | Element | Delay | strokeWidth | scrub |
|-------|---------|-------|-------------|-------|
| `.s-outer` | Outer walls | 0.00 | 2.0-2.5 | 1 |
| `.s-inner` | Inner walls | 0.04 | 1.5 | 1 |
| `.detail` | Furniture, fixtures | 0.08 | 0.8 | 1 |
| `.annotation` | Dimensions, grid | 0.12 | 0.4 (dashed) | 1 |

**Focus Point — Bell Curve:**
```js
const intensity = Math.sin(p * Math.PI); // 0 → 1 → 0
opacity: 0.06 + 0.44 * intensity    // 0.06 → 0.50 → 0.06
blur: (1 - intensity) * 2            // 2px → 0px → 2px
saturate: 0.3 + 0.7 * intensity      // 0.3 → 1.0 → 0.3
```

**Roughness Filter:**
```xml
<filter id="rough" x="-20%" y="-20%" width="140%" height="140%">
  <feTurbulence type="fractalNoise" baseFrequency="0.002" numOctaves="3" seed="5" />
  <feDisplacementMap scale="1.5" xChannelSelector="R" yChannelSelector="G" />
</filter>
```

### 5. Navigation (`navigation.tsx`)
- Fixed top, transparent → `bg-[#F5F0EB]/95 backdrop-blur-2xl` on scroll
- Links: Portfolio, About, Contact, Instagram (SVG icon)
- **Magnetic buttons** — spring physics, follow cursor
- Mobile: circle clip-path animation menu
- Initial animation: slide down from -100 with 1s delay

### 6. Hero (`hero.tsx`)
- **Split layout:** Text left (48%) | Image right (52%)
- Mobile: Image on top, text below
- **Text:** "Rahel / Wahnon / Ben Haim" — each line slides up separately
- "Ben Haim" in gold `#A16207`
- **Image slideshow:** 5 images from projects, crossfade every 4 seconds
- Progress dots at bottom (gold active, white/30 inactive)
- CTA: "View Portfolio" (underlined) + "Get in Touch"

### 7. Portfolio (`portfolio.tsx`)
- **Auto-scroll gallery** — ping-pong (forward then reverse), pauses on hover
- Card size: `clamp(240px, 28vw, 360px)`, aspect `4/5`
- **Hover effect:** Image swaps to different project photo + gold gradient overlay + "Open" label
- **Drag to scroll** — mousedown/move/up with 5px threshold
- Click opens Lightbox
- Category label in gold, title in dark, "View Project →"

### 8. Lightbox (`lightbox.tsx`)
- **Light theme** — `bg-[#F5F0EB]`, image area `bg-[#EDE8E2]`
- Slide animation between images (AnimatePresence)
- Touch swipe support on mobile
- Nav arrows: round buttons with `bg-white/60`, hidden on mobile
- Thumbnails: `h-16 w-24` (desktop), `h-12 w-16` (mobile), gold ring on active
- Keyboard: ESC close, Left/Right arrows
- Counter: "1/15" in gold

### 9. About (`about.tsx`)
- Two columns: Photo left (parallax) | Text right
- Gold corner accents on photo (animated scale in)
- Photo credit: "Michal Chelbin"
- Blockquote with gold left border
- Gold radial gradient glow in background

### 10. Contact (`contact.tsx`)
- Two columns: Heading + CTA left | Details right
- Heading: "Contact Us" with "Us" in gold
- CTA button: black → gold on hover, "Send a Message ↗"
- Vertical gold divider (animated scaleY)
- Details: Studio address, Phone, Email, Instagram
- Each detail has gold label + font-display text

### 11. Footer (`footer.tsx`)
- `bg-[#EDE8E2]`, border-top
- "RWBH" | "© 2026 Rahel Wahnon Ben Haim Architects" | "Site by Shlomo Nahon"

## Data

### Projects (`src/lib/projects.ts`)
| # | Key | Title | Category | Images |
|---|-----|-------|----------|--------|
| 1 | 12-stones | 12 Stones | Residential Community | 7 |
| 2 | schneller-estate | Schneller Estate | Heritage Estate | 15 |
| 3 | haturim-01 | Haturim #01 | Vacation Apartment | 17 |
| 4 | bayit-vegan | Bayit Vegan | Interior Design | 20 |
| 5 | haturim-02 | Haturim #02 | Vacation Apartment | 22 |

### Contact Info
- **Studio:** 62 Harav Shim'on Agasi St, Jerusalem, Israel
- **Phone:** (+972) 02-579-3975
- **Email:** office@rwbh.co.il
- **Instagram:** @rwbh_arch

## Images
- All images in `public/images/projects/[project-key]/`
- Optimized: 47MB → 7.8MB (mozjpeg, quality 60, max 1200px width)
- About photo: `public/images/about/B0020226.jpg`
- Favicon/icon: `src/app/icon.png` + `src/app/apple-icon.png` (green RWBH logo)

## Security
- **Headers:** X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy, XSS-Protection, Permissions-Policy (in `next.config.ts`)
- **No secrets/credentials** in code
- **GSAP installed via npm** (not CDN)
- **rel="noopener noreferrer"** on all external links
- **prefers-reduced-motion** disables all animations

## Accessibility
- Skip link to #portfolio
- Focus-visible rings: `2px solid #D4AF37`
- aria-labels on icon-only buttons
- Keyboard nav in lightbox (ESC, arrows)
- Heading hierarchy: h1 (hero) → h2 (sections) → h3 (cards)
- Touch targets ≥ 44px
- Custom cursor hidden on touch devices

## Dependencies
```json
"next": "16.2.3",
"react": "19.2.4",
"framer-motion": "^12.38.0",
"gsap": "^3.14.2",
"lucide-react": "^1.8.0",
"tailwind-merge": ...,
"clsx": ...,
"tw-animate-css": ...
```

## Build & Deploy
```bash
npm run dev      # Development
npm run build    # Production build
npm start        # Production server
```
Deploy: Vercel (connect GitHub repo Shlomonhaon/rwbh-architects)
