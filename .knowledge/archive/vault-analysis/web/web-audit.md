# Audit Report: Web Integration & Accessibility

**Category:** Web / System
**Source Files:**

- `50-web-patterns-03-css-animationen-vs-remotion.md`
- `70-web-accessibility-wcag-2026.md`

**Core Comparison:** `remotion-best-practices` (Global)

---

## 1. CSS vs. Remotion Decision Matrix (`50-03`)

**Type:** [STRATEGY] / [GUIDELINE]
**Content:** A strict flowchart for deciding when to use CSS (UI/Hover) vs Remotion (Video/Deterministic).
**Value:** High strategic value for preventing "Wrong Tool" errors (e.g., trying to export CSS animations).
**Redundancy:** 0%. Core assumes Remotion use, but doesn't explain _when not to usage it_.
**Verdict:** ✅ **ACCEPT as GUIDELINE**
**Placement:** `docs/decision-matrices/css-vs-remotion.md`

## 2. WCAG 2026 Compliance (`70-00`)

**Type:** [CODE] / [IMPLEMENTATION]
**Content:**

- `useReducedMotion()` React Hook.
- `AccessibleCanvas` component (Shadow DOM pattern).
- Semantic HTML rules.
  **Value:** Critical for production quality. Missing entirely in Core.
  **Redundancy:** 0%.
  **Verdict:** ✅ **ACCEPT as MODULE**
  **Placement:** `extensions/accessibility/wcag-core.md`

---

## Delta Analysis

- **Strategic Gap:** The decision matrix fills a "Why/When" gap in the documentation.
- **Technical Gap:** The Accessibility code fills a "How" gap for legal compliance.
- **Recommendation:** Do not merge these into one file. Keep Strategy separate from Implementation.
