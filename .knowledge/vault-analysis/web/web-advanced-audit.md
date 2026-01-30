# Consolidated Report: Web Patterns & Integration (Badge 1)

This report synthesizes knowledge from the **New Vault** (50-series, 70-series) and the **Legacy Repository** (patterns/, guides/, specs/). It establishes the "Viron Standard" for web-to-video synergy.

---

## 1. Core Architecture: Next.js + Remotion

**Source:** `50-03`, `50-08`, `specs/website`

- **Pattern:** Use "Client Component Wrappers" for the Remotion Player to isolate browser-only APIs.
- **Rule:** Use "Start Frame First" (Poster Images) to maintain LCP < 2.5s.
- **Integration:** Websites can be rendered into textures using the "Chrome Headless Pipeline" for 3D mockup scenes.

## 2. Visual Animation Patterns

**Source:** `50-01`, `50-09`, `patterns/WordHighlight`, `patterns/Typewriter`

- **Focus:** **Kinetic Typography** is the primary driver.
  - _Local Assets:_ Use `WordHighlight` for marketing, `Typewriter` for terminal UIs.
  - _Strategy:_ Use GSAP for complex timelines, Remotion for deterministic exports.
- **Interaction:** **Scroll-based DoF** creates depth by blurring out-of-focus sections using `IntersectionObserver` or `backdrop-filter`.

## 3. Performance & Adaptive Quality

**Source:** `50-02`, `50-08`

- **Mechanism:** Detect device capabilities (CPU, RAM, GPU) and assign a **Performance Tier** (High, Medium, Low, Minimal).
- **Fallback:**
  - High: Full R3F Effects (Post-processing active).
  - Low: Pre-rendered MP4 video.
  - Minimal: Static AVIF Image.
- **Smooth Scrubbing:** Implement a low-pass filter (0.15 alpha) for scroll-driven video seeking to prevent Frame Jitter.

## 4. Accessibility (WCAG 2026)

**Source:** `70-web-a11y`

- **Constraint:** Always support `prefers-reduced-motion`. In "Reduced" mode, kill blurs and massive parallax.
- **WebGL A11y:** Use "AccessibleCanvasScene" (Shadow DOM implementation) to provide text descriptions for screen readers and keyboard controls for 3D elements.

## 5. Metadata & Composition Logic

**Source:** `guides/compositions`, `guides/sequencing`

- **Rule:** Mandatory premounting of sequences to avoid flickering.
- **Convention:** Standardized Folder/Metadata calculation for all Viron projects.

## 6. Accepted Assets for Core Skill

The following local files are promoted to "Core Status":

- ✅ `patterns/WordHighlight.md`
- ✅ `patterns/Typewriter.md`
- ✅ `patterns/BarChart.md` (Design/Web hybrid)
- ✅ `guides/viron-button-guide.md` (The "Eye Candy" baseline)

---

## 7. Experimental Frontier

- **AI Streaming:** Real-Time video generation using `LTX-2` (via Replicate/FAL.ai) is accepted as an experimental pipeline for 2026 content creation.

---

_Date: 2026-01-30 | Status: BATCH COMPLETE_
