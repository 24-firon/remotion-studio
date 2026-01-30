# Individual Audit: 50-web-patterns-01-scroll-basierte-dof-navigation.md

### 1. Inhalt & Zusammenfassung

Diese Datei beschreibt Techniken zur Implementierung von **Scroll-gesteuerter Schärfentiefe (Depth-of-Field)** auf Webseiten. Sie bietet drei Varianten:

- **Variante 1:** Simples CSS `blur()` via `IntersectionObserver`.
- **Variante 2:** Hybrides CSS mit `mask-image` für radiale Schärfepunkte (progressiver Blur).
- **Variante 3:** Echtes 3D-DoF mittels React-Three-Fiber und Post-Processing.
  Zusätzlich werden Performance-Checks (Battery Saver) und Accessibility (Reduced Motion) behandelt.

### 2. Spezifischer Wert für Viron

Viron setzt auf "Cinematic Web Experiences". Dieses Pattern ist der **Kern für Scrollytelling**. Es erlaubt, den Blick des Nutzers durch Unschärfe auf relevante Informationen zu lenken, während er scrollt. Besonders wertvoll ist die Hybrid-Strategie, die High-End WebGL-DoF auf Desktop nutzt, aber auf Mobile zu einfachem CSS-Blur downgradet.

### 3. Kontext im Repo

Es korreliert mit den **Scroll-basierten Shadern** (Batch 2) und der **Adaptive Quality Switching** Logik (`50-02`). Es dient als Brücke zwischen "einfachem Web-Layout" und "3D-Szene".

### 4. Integrations-Strategie

- **Ziel:** `extensions/web/scrollytelling-dof.md`
- **Aktion:** Übernahme der Hybrid-Logic.
- **Empfehlung:** Referenzierung in den allgemeinen Design-Regeln für Landingpages.

---

_Status: Audit abgeschlossen für File 1/13._
