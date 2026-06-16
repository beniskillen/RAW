# THE RAW — Website (React + Vite + TypeScript)

A Rock-Hall-inspired, motion-rich marketing site for **THE RAW — Global Culture**.
Converted from the static prototype into a component-based React app so it can be
opened and finished in **Lovable**.

## Stack
- **React 18 + TypeScript**
- **Vite** (dev server + build)
- **GSAP + ScrollTrigger** (reveals, hero intro, parallax, counters, scroll-spin)
- **Lenis** (smooth scrolling synced to the GSAP ticker)
- Plain CSS design tokens in `src/styles.css` (no UI framework, easy to restyle)

## Run locally
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build to /dist
npm run preview  # preview the build
```

## Open in Lovable
1. Push this folder to a GitHub repo.
2. In Lovable, create a project from that repo (or use “Import from GitHub”).
3. Lovable will detect the Vite + React setup and let you edit components live.

## Project structure
```
index.html                 Vite entry (loads Google Fonts: Anton, Archivo, Inter)
src/
  main.tsx                 React root (StrictMode off so tickers init once)
  App.tsx                  All page sections as JSX
  styles.css               Design tokens + every component style
  useRawAnimations.ts      The full animation stack as one React effect
  components/
    OrbitCursor.tsx         Spinning RAW badge that becomes the cursor
    Toggles.tsx             Black & White + Reduce Motion toggles
public/
  rmark.svg, lockup.svg     Brand marks
  hero-emblem.webp          Faint hero emblem
  m_*.webp                  Index-list gallery photos
```

## Rock-Hall-style features included
- Smooth (Lenis) scrolling + scroll-triggered reveals and line-mask headlines
- Hero intro timeline + muted autoplay YouTube background video
- Scroll-velocity marquees (talent + tagline)
- Animated stat counters
- Hover-follow image index list (the “inductee” scroll module)
- Magnetic buttons
- Spinning RAW orbit badge that replaces the mouse cursor
- Black & White mode + Reduce Motion mode (both respected globally)

## Notes
- The hero video is a YouTube embed; autoplay only works muted and over http(s)
  (not from a `file://` path). Swap to a self-hosted MP4 for the most reliable
  playback.
- All copy, talent names, stats and contact details are pulled from the brand brief.
