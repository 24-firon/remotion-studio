# 🎯 Badge 5: Extraction Report – WEB & CLOUD

**Version:** 2.1 (Forensic Audit & Consistency Sync)
**Analyst:** Sub-Agent (Antigravity)
**Date:** 2026-01-31

## 📊 Statistik & Audit-Log

| Entscheidung         | Anzahl | Details                               |
| :------------------- | :----- | :------------------------------------ |
| ✅ MITNEHMEN         | 8      | Forensic Viron-IP & Logic-Gaps        |
| ❌ NICHT DUPLIZIEREN | 14     | Skill-Redundanzen & Standard-Patterns |
| 📝 PROJECT LEARNINGS | 3      | Deep Architectural Insights           |

---

## ✅ MITNEHMEN (Viron Forensic IP)

### 1. Kinetic-Layout-Precision (Geometry-Pre-Calculation)

**Quelle:** `50-09-kinetic-typography...md` / `measuring-text.md`
**Typ:** PROJECT_IP

**Forensic Insight:**
Viron verhindert Layout-Thrashing (flickering) bei Buchstaben-Morphing (stagger: 80ms) durch das **Geometry-Pre-Calculation** Pattern. Dabei werden alle Text-Metriken (`measureText`) unmittelbar nach `waitUntilDone()` (deterministisches Font-Loading) berechnet und in einer Map fixiert, bevor die Animation startet.

**Code-Detail:**

```tsx
// Vor der Animation: Metriken fixieren
await waitUntilDone();
const metrics = text
  .split("")
  .map((char) => measureText({ text: char, ...fontStyle }));
// Animation nutzt fixe Offsets statt Live-Messung
```

---

### 2. Scroll-Driven Focus Proxy (IntersectionObserver Logic)

**Quelle:** `50-01-scroll-basierte-dof-navigation.md`
**Typ:** PROJECT_IP

**Forensic Insight:**
Viron nutzt `IntersectionObserver` mit `rootMargin: "-40% 0px -40% 0px"` statt eines Scroll-Listeners.  
**RATIONALE:** Ein Scroll-Listener blockiert den Main-Thread (schlechter INP). Der IO arbeitet asynchron und definiert eine exakte "Focus-Zone" in der Mitte des Viewports, die als Proxy für den Shader-Parameter `focusDistance` dient. Reduziert TBT (Total Blocking Time) bei 3D-Szenen um bis zu 40%.

---

### 3. EMA-Scrubbing (Exponential Moving Average Filter)

**Quelle:** `50-08-performance-web-vitals...md`
**Typ:** PROJECT_IP

**Forensic Insight:**
Die mathematische Strategie hinter `alpha = 0.15` ist ein Low-Pass Filter (EMA). Da `video.currentTime` Seeks im Chrome Headless einen Overhead haben, glättet dieser Filter die Zielzeit:  
`newTime = oldTime * 0.85 + targetTime * 0.15`.  
Ein Threshold von `0.05s` verhindert unnötige Seeks bei minimalem Scroll, was die CPU-Last auf AWS Lambda massiv senkt.

---

### 4. Semantic Shadow Proxy (Accessibility)

**Quelle:** `70-00-web-accessibility...md`
**Typ:** PROJECT_IP

**Forensic Insight:**
Viron implementiert für WebGL-Szenen eine parallele **Shadow-DOM-Proxy** Struktur. Visuell "stumme" 3D-Objekte werden auf `sr-only` HTML-Elemente gemappt, die den ARIA-Fokus synchron zur 3D-Kamera-Position mitführen.

**Implementierung:**

```tsx
<div style={srOnlyStyles} aria-live="polite">
  {/* Animierter Proxy für Screen-Reader */}
  Current View: {current3DObjectLabel}
</div>
```

---

### 5. Adaptive Quality (Hardware-Tier Detection)

**Quelle:** `50-02-adaptive-quality-switching.md`
**Typ:** PROJECT_IP

**Forensic Insight:**
Hierarchisches Tiering basierend auf Geräteleistung.

- **Minimal Tier:** `hardwareConcurrency <= 2` oder `deviceMemory <= 2 (GB)` -> Fallback auf statische Poster.
- **High Tier:** WebGL2 Support + `deviceMemory > 8GB`.
  Dies erlaubt es, High-End Post-Processing (`Bloom`, `DoF`) selektiv nur auf Workstations zu aktivieren.

---

### 6. Cloud Rendering Orchestration (Lambda Parallelism)

**Quelle:** `60-00-cloud-rendering...md`
**Typ:** SKILL_UPDATE

**Forensic Insight:**
Extremer Speed-up (85%) durch Chunk-basiertes Rendering. Ein Job wird in Einheiten von ca. 16 Frames zerlegt.  
**Lambda-Trigger:** Greift automatisch, wenn `durationSeconds > 30` oder `quality === 'high'`.
Die Orchestrierung nutzt S3 als Transfer-Layer für die gerenderten Frame-Pakete, bevor der finale Merge erfolgt.

---

### 7. Start Frame First (LCP Optimization)

**Quelle:** `50-08-performance-web-vitals...md`
**Typ:** RESEARCH_NOTE

**Forensic Insight:**
Kritisch für Lighthouse 100er Scores. Das Video wird nicht direkt als `<video>` oder `<canvas>` geladen. Stattdessen wird das erste Frame als hochkomprimiertes `.avif` mit dem Next.js `priority` Attribut geladen. Das eigentliche Video/Canvas hydriert erst asynchron (`next/dynamic`), sobald der LCP-Measure abgeschlossen ist.

---

### 8. Real-Time AI Streaming Architektur

**Quelle:** `50-10-real-time-ai-video-streaming.md`
**Typ:** RESEARCH_NOTE

**Forensic Insight:**
Experimenteller Workflow zur Umgehung von Render-Wartezeiten. Nutzt `FAL.ai` oder `Replicate` mit einer Streaming-Response. Jedes generierte Frame wird über einen WebSocket-Buffer direkt in einen Canvas gezeichnet, statt auf das fertige MP4 zu warten. Grundlage für interaktive Produkt-Demos (2027 Roadbox).

---

## 📝 PROJECT LEARNINGS (Forensic)

| Learning               | Kontext | Implikation                                                                                |
| :--------------------- | :------ | :----------------------------------------------------------------------------------------- |
| **Deterministic Seek** | `50-08` | Chrome Seek ist nicht instant. EMA-Filter ist Pflicht für stabiles Scrubbing.              |
| **Resource Shifting**  | `50-02` | Mobile-UX wird durch Asset-Tiering (AVIF vs. WebM) gerettet, nicht durch Code-Optimierung. |
| **A11y-Proxy**         | `70-00` | WebGL ist nur zugänglich, wenn die UI redundant im DOM gespiegelt wird.                    |

---

## 🗑️ Verworfen (Standard-Redundanzen)

| Fund                         | Original-Quelle    | Steht bereits in Skill (Datei) | Entscheidung |
| :--------------------------- | :----------------- | :----------------------------- | :----------- |
| **CSS forbidden for video**  | 50-web-patterns-03 | `animations.md`                | ❌ DROP      |
| **interpolate() / spring()** | 50-web-patterns-03 | `timing.md`                    | ❌ DROP      |
| **ThreeCanvas Setup**        | 50-web-patterns-01 | `3d.md`                        | ❌ DROP      |
| **Typewriter Logic**         | Typewriter.md      | `text-animations.md`           | ❌ DROP      |
| **Word Highlight Logic**     | WordHighlight.md   | `display-captions.md`          | ❌ DROP      |
| **Asset staticFile()**       | 60-cloud-rendering | `assets.md`                    | ❌ DROP      |

---

## 📋 Empfehlungen (V2.1)

| Priorität   | Aktion                        | Begründung                                                              |
| :---------- | :---------------------------- | :---------------------------------------------------------------------- |
| 🔴 KRITISCH | **EMA-Filter Integration**    | Muss in den Global-Skill für alle Scrubbing-Projekte übernommen werden. |
| 🟡 HOCH     | **Shadow-DOM Proxy Template** | Standard-Wrapper für alle zukünftigen Three.js Szenen.                  |
| 🔵 MITTEL   | **Start Frame First Hook**    | Globaler React-Hook zur Automatisierung der LCP-Optimierung.            |
