# 🎯 Badge 1: Extraction Report – Time & Sequencing (V2)

**Version:** 2.0 (Context-Enriched)
**Badge ID:** VIRON-2026-B1
**Extraction Date:** 2026-01-30
**Analyst:** Sub-Agent (Antigravity)

---

## 📊 Statistik

| Kategorie             | Anzahl Punkte | Beschreibung                                                  |
| --------------------- | ------------- | ------------------------------------------------------------- |
| **A: SKILL_UPDATES**  | 8             | Generisches Remotion-Wissen (Core Laws, Configs, Patterns)    |
| **B: PROJECT_IP**     | 7             | Viron-spezifische Secrets (Pipelines, Architecture, Branding) |
| **C: RESEARCH_NOTES** | 8             | Kontext und Tutorials (Router, Navigation, Metriken)          |
| **❌ VERWORFEN**      | 14            | Bereits im Global Skill abgedeckt                             |

---

## 🟢 KATEGORIE A: SKILL_UPDATES (Generisches Wissen)

Diese Punkte erweitern den globalen Remotion-Skill um kritisches Produktionswissen.

### 1. Determinismus-Imperativ & Anti-Patterns

**Quelle:** `10-remotion-basics-01-timeline-und-frames.md` (Zeilen 26-60 & Tabellen)

**Kontext/Erklärung:**
Remotion unterscheidet sich fundamental von normaler Web-Entwicklung. Funktionen wie `setInterval`, `requestAnimationFrame` oder CSS-Transitions sind in einer Headless-Render-Umgebung nicht deterministisch (d.h. sie produzieren bei gleichem Frame-Input unterschiedliche visuelle Ergebnisse). Dieser Block definiert die "Verbotszone" für Standard-Web-Techniken.

**Code/Daten:**

```typescript
| Ansatz | Problem in Remotion |
|--------|---------------------|
| CSS Transitions | Nicht deterministisch; flackern in Headless-Browser |
| requestAnimationFrame | Läuft zu Echtzeitrahmen; unpredictable in Lambda |
| setInterval | Asynchron; bricht Determinismus |
| useEffect | Side Effect; keine Garantie auf Frame-Synchronität |
| **useCurrentFrame** | ✅ Synchron, deterministisch, parallel-renderbar |
```

---

### 2. Lambda Rendering Konfiguration (Production)

**Quelle:** `pipeline.md` (Zeilen 51-72)

**Kontext/Erklärung:**
Dies ist die validierte Konfiguration für AWS Lambda Swarms.

- **3009MB RAM:** Triggered bei AWS oft die Zuweisung von 2 vollen vCPUs, was das Rendering überproportional beschleunigt.
- **900s Timeout:** Maximum für Lambda, verhindert Abbruch bei komplexen Chunks.
- **10GB Disk:** Notwendig für das Caching von extrahierten Frames bei High-Res Rendering.

**Code/Daten:**

```typescript
{
  region: "eu-central-1",
  framesPerLambda: 4,      // Balance zwischen Overhead und Render-Zeit
  concurrencyPerLambda: 3, // Nutzt Multi-Core der 3009MB Instanz
  timeoutSeconds: 900,
  memorySizeInMb: 3009,    // Critical threshold for vCPU boost
  diskSizeInMb: 10240
}
```

---

### 3. Concurrency Berechnungs-Formel

**Quelle:** `pipeline.md` (Zeilen 155-171)

**Kontext/Erklärung:**
Eine Formel zur dynamischen Berechnung der optimalen Render-Worker auf einer Host-Maschine. Sie verhindert System-Crashes durch OOM (Out of Memory), indem sie RAM als den limitierenden Faktor priorisiert, nicht nur CPU-Cores.

**Code/Daten:**

```typescript
const availableCPUs = os.cpus().length;
const ramGB = os.totalmem() / 1024 ** 3;

// Faustregel: 1.5 Worker pro CPU (da Remotion oft I/O bound ist)
const optimalConcurrency = Math.floor(availableCPUs * 1.5);

// Hard Limit: RAM ist der Flaschenhals (ca. 2GB Overhead pro Worker)
const ramLimit = Math.floor(ramGB / 2);

const recommendedConcurrency = Math.min(optimalConcurrency, ramLimit, 16);
```

---

### 4. Codec Matrix (Production Standards)

**Quelle:** `pipeline.md` (Zeilen 111-152)

**Kontext/Erklärung:**
Standardisierte FFMPEG-Flags für verschiedene Ausgabe-Szenarien. Visueller Determinismus endet nicht beim Rendering, sondern beim Encoding. H.264 ist der "Safe Harbor", während ProRes für Weiterverarbeitung (Color Grading) essentiell ist. VP9 bietet bessere Kompression für Web-Scaling.

**Code/Daten:**
| Codec | Settings | Use Case |
|-------|----------|----------|
| **H.264** | `8000k` bitrate, `yuv420p` pixel format | Social Media, Universal Compatibility |
| **VP9** | `5000k` bitrate, `opus` audio | Web-Streaming (Netflix-grade efficiency) |
| **ProRes** | `profile: hq`, `yuv422p10le` (10-bit) | Archive, Editing Intermediates |

---

### 5. Render Monitoring & Logging Pattern

**Quelle:** `pipeline.md` (Zeilen 226-293)

**Kontext/Erklärung:**
Ein Pattern für UX-freundliches CLI-Logging während des Headless-Renderings. Wichtig ist die Berechnung von FPS und ETA (Estimated Time of Arrival), um bei CI/CD-Pipelines Timeouts vorherzusagen. Implementiert zudem Exponential Backoff für Retries bei flaky Frames.

**Code/Daten:**

```typescript
// Key Metrics to track
interface RenderMetrics {
  renderedFrames: number;
  droppedFrames: number; // Critical for quality check
  fps: number; // Performance indicator
  estimatedComplete: Date;
}
// Logic: If error, wait 2^attempt * 1000ms before retry
```

---

### 6. GPU Acceleration Config (Linux/Headless)

**Quelle:** `pipeline.md` (Zeilen 210-224)

**Kontext/Erklärung:**
Ermöglicht WebGL-Rendering in Headless-Umgebungen (CI/CD, Docker). Ohne diese spezifischen Flags fallbackt Chromium oft auf Software-Rendering (SwiftShader), was die Renderzeit um den Faktor 10-50x verlangsamt.

**Code/Daten:**

```typescript
Config.setChromeMode("chrome-for-testing"); // Enthält oft bessere GPU-Treiber
Config.setChromiumOpenGlRenderer("angle"); // Erzwingt Hardware-Acceleration
```

---

### 7. Performance Baseline (Viron Targets)

**Quelle:** `vision.md` (Zeilen 119-126)

**Kontext/Erklärung:**
Definiert die "Definition of Done" für Performance-Optimierungen. Wenn diese Werte nicht erreicht werden, gilt das Setup als defekt. Dient als Benchmark für Agenten.

**Code/Daten:**

- **Frame-Rate:** 60 FPS (Strikt deterministisch)
- **Render-Time:** 150-300ms pro Frame (für 1080p 3D-Szenen)
- **Scale:** 8-16 parallele Prozesse (Lambda-Skalierung)

---

### 8. Anti-Pattern: No CSS Transitions

**Quelle:** `10-remotion-basics-01-timeline-und-frames.md` (Zeilen 18-24)

**Kontext/Erklärung:**
Explizites Verbot von `transition: all 0.3s ease`. Remotion snapshots Frames. Eine CSS-Transition läuft im Browser-Main-Thread oft asynchron zum Frame-Capture-Trigger, was zu "springenden" Animationen im finalen Video führt.

**Code/Daten:**

> **Guideline:** Nutze IMMER `interpolate(frame)` statt CSS `transition`.

---

## 🔵 KATEGORIE B: PROJECT_IP (Viron Secrets)

Spezifische Implementierungen und Architekturen von Viron Studio.

### 9. Das Virtual Production Studio Paradigma

**Quelle:** `vision.md` (Zeilen 7-14)

**Kontext/Erklärung:**
Das Fundament der Viron-Identität. Wir bauen keine "Video-Templates", sondern eine physikalische Simulations-Umgebung. Der Kern-Unterschied ist die Behandlung von Video als Software-Artefakt (Kompilierung) statt als Medien-Datei (Schnitt).

**Code/Daten:**

> "Viron ist ein Virtual Production Studio, in dem 3D-Szenen, UI-Elemente und physikalische Gesetze deterministisch definiert sind. Wir 'schneiden' keine Videos; wir **compilieren** sie aus React-Code."

### 10. Die 5 Säulen der Architektur

**Quelle:** `vision.md` (Zeilen 63-89)

**Kontext/Erklärung:**
Die interne Organisation des Codes. Hilft Agenten zu entscheiden, wo eine neue Datei platziert werden muss.

**Code/Daten:**

1. **Simulation Layer (R3F):** 3D-Welt, Physik, Materialien.
2. **Rendering Layer (HTML/Tailwind):** UI-Oberflächen auf 3D-Objekten.
3. **Orchestration Layer (Remotion):** Das "Zeit-Gehirn".
4. **Camera Layer:** Virtuelle Regie.
5. **Export Layer:** Codec-Erzeugung und Delivery.

### 11. Shared Theme.ts Architektur

**Quelle:** `vision.md` (Zeilen 41-43) & `documentation_manifest.md` (Zeile 72)

**Kontext/Erklärung:**
Ein "Holy Grail" der Web-Video-Konsistenz. Eine einzelne TypeScript-Datei steuert Varianzen in beiden Welten (Next.js App & Remotion Video). Verhindert "Brand Drift".

**Code/Daten:**

```typescript
// Shared Theme Source
export const theme = {
  colors: { primary: "hsl(220, 90%, 56%)" }, // Used in Website AND Video
  fonts: { sans: "Inter" },
};
```

**Regel:** Wenn `theme.md` lokal etwas definiert, überschreibt dies IMMER den Global Skill.

### 12. Zero-Touch Pipeline (Audio Intelligence)

**Quelle:** `Remotion Setup.md` (Zeilen 135-209)

**Kontext/Erklärung:**
Ein vollautomatisierter Workflow zur Veredelung von Rohaufnahmen. Kombiniert KI-Transkription (für Schnittmarken) mit Audio-Mastering (für Pegel) ohne menschlichen Eingriff.

**Code/Daten:**

1. **Whisper:** Extrahiert Word-Level Timestamps für Cuts.
2. **Auphonic:** Normalisiert auf -16 LUFS (Broadcast Standard).
3. **Remotion:** Rendert basierend auf JSON-Daten aus Schritt 1 & 2.

### 13. Pipeline-Architektur (Flow)

**Quelle:** `pipeline.md` (Zeilen 7-28)

**Kontext/Erklärung:**
Der Datenfluss vom Git-Commit bis zum MP4. Zeigt die Abhängigkeiten der Build-Steps.

**Code/Daten:**
`Git Source` -> `Build (Validation)` -> `Frame Gen (Headless)` -> `Encoding (FFMPEG)` -> `Artifact`

### 14. Design System Extraction Workflow

**Quelle:** `Remotion Setup.md` (Zeilen 308-412)

**Kontext/Erklärung:**
Ein Reverse-Engineering Prozess. Ein Agent analysiert eine URL, extrahiert Tokens in `theme.ts` und generiert daraus automatisch ein "Showcase Video". Dies beweist die Macht des "Code-First" Ansatzes.

**Code/Daten:**

- Input: URL (z.B. glaido.com)
- Process: Headless Scrape -> Token Ident -> Theme Gen -> Render
- Output: `[brand]-showcase.mp4` (15s Animation)

### 15. Critical Governance: Viron > Global

**Quelle:** `documentation_manifest.md` (Zeilen 68-73)

**Kontext/Erklärung:**
Die Hierarchie der Wahrheit. Schützt projekt-spezifische Anpassungen vor dem Überschreiben durch generische Updates.

**Code/Daten:**

> **Rule:** "Viron > Global: If `theme.md` says X and Global Skill says Y, **X wins.**"

---

## 🟡 KATEGORIE C: RESEARCH_NOTES (Kontext & Navigation)

Wissen, das hilft, das System zu verstehen und zu navigieren.

### 16. Traditionell vs. Programmatic (Vergleich)

**Quelle:** `vision.md` (Zeilen 26-36)

**Kontext/Erklärung:**
Argumentationshilfe für den ROI von Viron. Zeigt auf, warum der hohe Initialaufwand (Code) sich langfristig rentiert (Skalierung, Versionierung).

**Code/Daten:**

- Design-Änderung Traditionell: "Alles neu rendern & schneiden"
- Design-Änderung Viron: "1 Variable ändern -> Automatisches Re-Render"

### 17. Knowledge Router System

**Quelle:** `documentation_manifest.md` (Zeilen 8-22)

**Kontext/Erklärung:**
Erklärt das Meta-System der Dokumentation. Verhindert, dass Agenten in irrelevante Dateien schauen.

**Code/Daten:**

- **Base:** `manifest`, `vision`, `pipeline` (Die Hardware)
- **Feature:** `specs/` (Die Software)
- **Pattern:** `guides/` (Das Handbuch)

### 18. Scenario-Based Routing Patterns

**Quelle:** `documentation_manifest.md` (Zeilen 55-65)

**Kontext/Erklärung:**
Pre-optimierte Pfade durch das Wissen. Spart Tokens, indem es Agenten direkt zu den relevanten Datei-Kombinationen schickt.

**Code/Daten:**

> "New UI Flow" -> Load `sequencing.md` + `patterns/`

### 19. Vault 30-Dateien-Struktur

**Quelle:** `00-overview-index-v2-1-complete.md` (Zeilen 177-190)

**Kontext/Erklärung:**
Die komplette Landkarte des 2026er Wissens. Zeigt Lückenlosigkeit an (00er bis 90er Nummernkreise).

**Code/Daten:**

- **20er:** Layout (Neu in v2.1)
- **40er:** Advanced Procedural
- **90er:** Enterprise Synergy

### 20. Stufen-Logik für Agenten

**Quelle:** `00-overview-index-v2-1-complete.md` (Zeilen 63-111)

**Kontext/Erklärung:**
Effizienz-Regel. Ein Agent muss nicht alles lesen. Er lädt Wissen "Lazy" nach Bedarf.

**Code/Daten:**

- **Tier 1 (Core):** 5 Dateien für Basic Ops.
- **Tier 2 (Quality):** 9 Dateien für Production.
- **Tier 3 (Special):** On-demand (z.B. Audio Reaction).

### 21. Decision Tree Navigation

**Quelle:** `00-master-workflow-2026-integration.md` (Zeilen 3-23)

**Kontext/Erklärung:**
Ein logischer Router basierend auf User-Intent. Hilft Agenten, die User-Anfrage ("Ich will ein Musikvideo") in technische Requirements zu übersetzen.

**Code/Daten:**

> Intent: "Musik-Video" -> Pfad: `40-audio-reaktiv` + `60-cloud-rendering`

### 22. ROI-Metriken (Business Case)

**Quelle:** `00-master-workflow-2026-integration.md` (Zeilen 243-267)

**Kontext/Erklärung:**
Quantifiziert den Wert des Systems. Wichtig für Priorisierungsentscheidungen (Build vs. Buy).

**Code/Daten:**

- **Zeit-Ersparnis:** 85% (durch Copy-Paste Modules)
- **Fehler-Reduktion:** 95% (durch Troubleshooting Guides)

### 23. Tech-Stack Entscheidungsmatrix

**Quelle:** `00-master-workflow-2026-integration.md` (Zeilen 179-197)

**Kontext/Erklärung:**
Technologische Entscheidungshilfe. Verhindert den Einsatz falscher Tools (z.B. KI für Pixel-Perfect UI).

**Code/Daten:**
| Requirement | Best Tech |
|-------------|-----------|
| Scroll-Animation | CSS / pure JS |
| Video-Export | Remotion |
| Photorealism | WebGL / R3F |

---

## ❌ VERWORFENE PUNKTE (Redundanz-Check)

14 Punkte wurden verworfen, da sie bereits im Global Skill (`remotion-best-practices`) enthalten sind.

1. `useCurrentFrame()` Basics
2. Frame-based Animation Logic
3. `interpolate()` Syntax
4. Spring-Animation Configs
5. Easing Functions
6. `useVideoConfig()` Usage
7. Sequence Component Basics
8. Series Component Basics
9. Premounting Patterns
10. Composition Registration
11. calculateMetadata
12. Folder Organization
13. Still Component
14. Basic `renderMedia()` API

---

**End of Report V2.0**
