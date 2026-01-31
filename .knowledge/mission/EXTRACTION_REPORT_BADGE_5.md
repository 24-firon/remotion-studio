# 🎯 Badge 5: Extraction Report – WEB & CLOUD

**Version:** 1.1 (Auditor Mode - Cleaned)
**Analyst:** Sub-Agent (Antigravity)
**Date:** 2026-01-31

## 📊 Statistik & Audit-Log

| Entscheidung         | Anzahl | Details                                      |
| :------------------- | :----- | :------------------------------------------- |
| ✅ MITNEHMEN         | 4      | Viron-spezifische Hybrid-Technologien        |
| ❌ NICHT DUPLIZIEREN | 12     | Skill-Redundanzen & Standard-Patterns        |
| 📝 PROJECT LEARNINGS | 2      | Gesichert in `.knowledge/project-learnings/` |

---

## ✅ MITNEHMEN (Viron-IP & Deltas)

### Scroll-Driven Focus Navigation (DoF)

**Quelle:** `50-web-patterns-01...md` (Zeilen 90-116, 126-187)
**Typ:** PROJECT_IP

**Skill-Check:**

- [x] Explizit im Skill dokumentiert: **NEIN** (Geprüft gegen `animations.md`)

**Kontext/Erklärung:**
Einzigartige Implementierung einer Scroll-gesteuerten Schärfentiefe für Web-Sections. Während `animations.md` CSS-Animationen für Video verbietet, nutzt Viron hier `IntersectionObserver` mit einem präzisen `FOCUS_THRESHOLD` (40% Viewport-Höhe), um Web-Content beim Scrollen dynamisch zu fokussieren/bluren.

**Code/Daten:**

```javascript
const FOCUS_THRESHOLD = window.innerHeight * 0.4;
const observerOptions = {
  threshold: [0, 0.25, 0.5, 0.75, 1],
  rootMargin: `-${FOCUS_THRESHOLD}px 0px -${FOCUS_THRESHOLD}px 0px`
};
// Variante 2: Radial-Gradient Blur-Mask für Kamera-Feel
mask-image: radial-gradient(circle at 50% 50%, transparent 20%, rgba(0,0,0,0.3) 50%, black 100%);
```

**Implikation:**
Ermöglicht "Kino-Feel" auf Landingpages, ohne die Performance von echtem WebGL-DoF zu benötigen.

---

### Hardware-Tier Detection (Adaptive Quality)

**Quelle:** `50-web-patterns-02...md` (Zeilen 27-74)
**Typ:** PROJECT_IP

**Skill-Check:**

- [x] Explizit im Skill dokumentiert: **NEIN** (Geprüft gegen `animations.md`)

**Kontext/Erklärung:**
Viron-spezifisches Framework zur automatischen Hardware-Erkennung (`cores`, `ram`, `gpu`), um Web-Experiences in vier Performance-Klassen (high, medium, low, minimal) zu unterteilen. Dies dient als Basis für das dynamische Laden von Video-Assets oder Post-Processing-Effekten.

**Code/Daten:**

```typescript
const detectDeviceProfile = (): DeviceProfile => {
  const cores = navigator.hardwareConcurrency || 4;
  const ram = (navigator.deviceMemory || 4) * 1024;
  const webgl2 = canvas.getContext("webgl2") !== null;
  // Tier Mapping: low if cores <= 4 or ram <= 4GB
};
```

**Implikation:**
Garantiert Crash-Freiheit auf Low-End Geräten (Säule 50) bei gleichzeitiger Nutzung von High-End Effekten (Säule 30) auf Workstations.

---

### Low-Pass Filter Scroll-Scrubbing

**Quelle:** `50-web-patterns-08...md` (Zeilen 141-201)
**Typ:** SKILL_UPDATE

**Skill-Check:**

- [ ] Explizit im Skill dokumentiert: **NEIN** (Geprüft gegen `animations.md`)

**Kontext/Erklärung:**
Lösung für das "Stutter-Problem" beim Video-Scrubbing auf Webseiten. Statt `video.currentTime` direkt auf den Scroll-Progress zu setzen (was zu Seek-Lags führt), wird eine sanfte Interpolation (85/15 Mix) via `requestAnimationFrame` verwendet.

**Code/Daten:**

```tsx
const alpha = 0.15; // Glättungsfaktor
currentTimeRef.current =
  currentTimeRef.current * (1 - alpha) + targetTimeRef.current * alpha;
if (Math.abs(videoRef.current.currentTime - currentTimeRef.current) > 0.05) {
  videoRef.current.currentTime = currentTimeRef.current;
}
```

**Implikation:**
Drastische Verbesserung der "Perceived Performance" (UX) bei interaktiven Video-Heros.

---

### Lambda Distributed Parallel Rendering

**Quelle:** `60-cloud-rendering...md` (Zeilen 114-168)
**Typ:** SKILL_UPDATE

**Skill-Check:**

- [x] Explizit im Skill dokumentiert: **NEIN** (Geprüft gegen `compositions.md`)

**Kontext/Erklärung:**
Logik zur massiven Skalierung von Rendervorgängen. Ein Video wird in Chunks (z.B. 16 Frames pro Worker) unterteilt und parallel auf AWS Lambda Instanzen (3GB Memory) gerendert.

**Code/Daten:**

```typescript
const chunks = splitIntoChunks(totalFrames, workersCount);
const promises = chunks.map((chunk) =>
  invokeRemotionLambda({ frameStart, frameEnd }),
);
const results = await Promise.all(promises);
```

**Implikation:**
Reduziert Renderzeiten von Stunden auf Sekunden (85% Zeitersparnis laut Benchmark).

---

## 📝 PROJECT LEARNINGS (Abgekoppelt)

Die Research-Notes (Kategorie C) zu LCP-Optimierung und AI-Streaming wurden in eine separate Datei ausgelagert:

> [DETAILS: LEARNING_BADGE_5_WEB_CLOUD.md](file:///C:/Workspace/Repos/remotion-studio/.knowledge/project-learnings/LEARNING_BADGE_5_WEB_CLOUD.md)

---

## 🗑️ Verworfen (Skill-Redundanzen)

| Fund                         | Original-Quelle    | Steht bereits in Skill (Datei) | Entscheidung |
| :--------------------------- | :----------------- | :----------------------------- | :----------- |
| **CSS forbidden for video**  | 50-web-patterns-03 | `animations.md`                | ❌ DROP      |
| **interpolate() / spring()** | 50-web-patterns-03 | `timing.md`                    | ❌ DROP      |
| **ThreeCanvas Setup**        | 50-web-patterns-01 | `3d.md`                        | ❌ DROP      |
| **Typewriter Logic**         | Typewriter.md      | `text-animations.md`           | ❌ DROP      |
| **Word Highlight Logic**     | WordHighlight.md   | `display-captions.md`          | ❌ DROP      |
| **Asset staticFile()**       | 60-cloud-rendering | `assets.md`                    | ❌ DROP      |
| **Micro-Interactions**       | 50-web-patterns-03 | Standard Web Knowledge         | ❌ DROP      |
| **will-change optimization** | 50-web-patterns-01 | `animations.md` (Principle)    | ❌ DROP      |
| **Google Fonts Loading**     | 50-web-patterns-08 | `fonts.md`                     | ❌ DROP      |
| **Video Component Specs**    | 50-web-patterns-08 | `videos.md`                    | ❌ DROP      |
| **Next.js dynamic imports**  | 50-web-patterns-08 | Standard React Knowledge       | ❌ DROP      |
| **AWS Lambda Basics**        | 60-cloud-rendering | `remotion-core/SKILL.md`       | ❌ DROP      |

---

## 📋 Empfehlungen

| Priorität  | Aktion                           | Begründung                                                         |
| :--------- | :------------------------------- | :----------------------------------------------------------------- |
| 🔴 HOCH    | Integration "Start Frame First"  | Essentiell für LCP Performance in allen Kundenprojekten.           |
| 🟡 MITTEL  | Hardware-Tier Hook globalisieren | Erleichtert das adaptive Design systemweit (`usePerformanceTier`). |
| 🔵 NIEDRIG | AI Streaming beobachten          | Aktuell zu hohe Latenz (>30s) für echten Real-Time Use.            |
