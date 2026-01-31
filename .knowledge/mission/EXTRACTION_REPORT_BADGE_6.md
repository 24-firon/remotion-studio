# 🎯 EXTRACTION REPORT: BADGE 6 (MEDIA, AUDIO & PERFORMANCE)

**Version:** 1.0
**Status:** FORENSIC AUDIT COMPLETE
**Erstellt:** 2026-01-31
**Analyst:** Antigravity Sub-Agent

---

## 📋 Executive Summary

| Kategorie                       | Anzahl    | Status               |
| ------------------------------- | --------- | -------------------- |
| **MITNEHMEN (Viron-IP)**        | 9         | ✅ Extrahiert        |
| **VERWORFEN (Skill-Redundanz)** | 7         | ❌ Nicht duplizieren |
| **Quellen geprüft**             | 8 Dateien | ✅ Vollständig       |

---

## ✅ MITNEHMEN (Viron-Spezifisches IP)

---

### 1. Deterministisches AudioFrame Interface

**Quelle:** [specs/audio.md](file:///C:/Workspace/Repos/remotion-studio/specs/audio.md) (Zeilen 17-26)
**Typ:** PROJECT_IP

**Skill-Check:**

- [x] Explizit im Skill dokumentiert: **NEIN** (Geprüft gegen `audio.md`, `get-audio-duration.md`)

**Kontext:**
Viron verwendet ein **pre-analysiertes JSON-Format** für Audio-Daten, um Frame-Determinismus zu garantieren. Dies unterscheidet sich fundamental von der Remotion-Standard-API `useAudioData()`, die zur Laufzeit analysiert. Das Viron-Interface ermöglicht:

1. Reproduzierbare Renders (kein Browser-FFT-Jitter)
2. Offline-Analyse in Node.js (vor Rendering)
3. Direkte Frame-Index-Abfrage ohne Laufzeit-Berechnung

**Code/Daten:**

```typescript
interface AudioFrame {
  frame: number;
  timestamp: number;
  bass: number; // 20-250 Hz
  mid: number; // 250-2000 Hz
  treble: number; // 2000-20000 Hz
  energy: number; // Gesamt-Energie
  amplitude: number; // Peak-Amplitude
}
```

---

### 2. FFT-zu-Remotion Pre-Calc Pipeline

**Quelle:** [specs/audio.md](file:///C:/Workspace/Repos/remotion-studio/specs/audio.md) (Zeilen 29-41)
**Typ:** PROJECT_IP

**Skill-Check:**

- [x] Explizit im Skill dokumentiert: **NEIN** (Geprüft gegen `audio.md`)

**Kontext:**
Der Global Skill dokumentiert nur die Laufzeit-API (`useAudioData()`). Viron's Pipeline führt die FFT-Analyse **vor dem Rendering** durch und exportiert zu JSON. Dies ist ein architekturelles Delta.

**Code/Daten:**

```
Audio-Datei (.wav)
    ↓
FFT Analysis (Node.js, vor Rendering)
    ↓
JSON Export (audio-frames.json)
    ↓
Remotion Component (liest JSON per Frame)
    ↓
Reaktive Animation (Bass → Scale, Treble → Glow)
```

**Implikation:** Viron trennt Analyse-Phase (deterministic, offline) von Render-Phase (fast, no-compute).

---

### 3. Exakte Frequenz-Band-Abgrenzung

**Quelle:** [specs/audio.md](file:///C:/Workspace/Repos/remotion-studio/specs/audio.md) (Zeilen 43-49)
**Typ:** PROJECT_IP

**Skill-Check:**

- [x] Explizit im Skill dokumentiert: **NEIN** (Geprüft gegen `audio.md`)

**Kontext:**
Der Global Skill erwähnt keine spezifischen Frequenz-Bänder. Viron definiert exakte Hz-Grenzen für reaktive Animationen.

**Code/Daten:**

| Band       | Frequenz    | Typische Reaktion    |
| ---------- | ----------- | -------------------- |
| **Bass**   | 20-250 Hz   | Scale, Shake, Punch  |
| **Mid**    | 250-2000 Hz | Rotation, Morph      |
| **Treble** | 2000+ Hz    | Sparkle, Glint, Glow |

**Implikation:** Diese Werte sind Viron's "Tuning" für industrielle Ästhetik (schwere Bass-Reaktionen).

---

### 4. EMA-Scrubbing Mathematik (Low-Pass Filter)

**Quelle:** [50-web-patterns-08-performance-web-vitals-mastery.md](file:///C:/Viron/90_VAULT/NEW%20SUFF/Remotion/50-web-patterns-08-performance-web-vitals-mastery.md) (Zeilen 163-177)
**Typ:** PROJECT_IP

**Skill-Check:**

- [x] Explizit im Skill dokumentiert: **NEIN** (Geprüft gegen alle Global Skills)

**Kontext:**
Video-Scrubbing via Scroll ist eine Keyframe-Jam-Falle. Viron's Lösung:

- **EMA (Exponential Moving Average)** mit `alpha = 0.15`
- **Threshold-Guard** von `0.05s` verhindert Micro-Seeks

**Code/Daten:**

```typescript
// Sanfte Interpolation (Low-Pass Filter)
const smoothUpdate = () => {
  if (!videoRef.current) return;

  // "Glätte" die Bewegung: 85% alten Wert + 15% neuer Wert
  const alpha = 0.15; // Kleiner = glatter (aber träger)
  currentTimeRef.current =
    currentTimeRef.current * (1 - alpha) + targetTimeRef.current * alpha;

  // Nur setzen, wenn Unterschied > Threshold (0.05 sec)
  if (Math.abs(videoRef.current.currentTime - currentTimeRef.current) > 0.05) {
    videoRef.current.currentTime = currentTimeRef.current;
  }

  rafRef.current = requestAnimationFrame(smoothUpdate);
};
```

**Implikation:**

- `alpha = 0.15` → 85% Smoothing (industrial-smooth feel)
- `0.05s` Threshold → verhindert Decoder-Overload bei schnellem Scroll

---

### 5. LCP-Hijacking Pattern ("Start Frame First")

**Quelle:** [50-web-patterns-08-performance-web-vitals-mastery.md](file:///C:/Viron/90_VAULT/NEW%20SUFF/Remotion/50-web-patterns-08-performance-web-vitals-mastery.md) (Zeilen 39-69)
**Typ:** PROJECT_IP

**Skill-Check:**

- [x] Explizit im Skill dokumentiert: **NEIN** (Geprüft gegen alle Global Skills)

**Kontext:**
Browser-LCP misst das größte sichtbare Element. Canvas/WebGL = schwarzer Screen = schlechter LCP. Viron's Lösung: **Poster-First** mit Next.js `priority` + AVIF.

**Code/Daten:**

```tsx
import Image from "next/image";
import dynamic from "next/dynamic";

// Heavy Component wird NICHT Pre-Rendered
const HeavyCanvasScene = dynamic(() => import("./HeavyCanvasScene"), {
  ssr: false,
  loading: () => <div className="placeholder">Loading 3D scene...</div>,
});

export const HeroSection = () => {
  return (
    <>
      {/* Das ist das "Poster" – wird SOFORT geladen (LCP < 1.5s möglich) */}
      <Image
        src="/hero-first-frame.avif"
        alt="Hero keyframe - metallic button detail"
        width={1600}
        height={900}
        priority // Kritisch: "priority" sagt Next.js, das sofort zu laden
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,..."
      />

      {/* Das ist die "Heavy" Version – lädt im Hintergrund nach */}
      <HeavyCanvasScene />
    </>
  );
};
```

**Implikation:**

- Bildformat: **AVIF** (modernster Codec)
- Next.js Attribute: `priority`, `placeholder="blur"`, `blurDataURL`
- Performance: LCP von 4s → **1.5s** (40-60% Improvement)

---

### 6. H.264 Codec-Profil (Viron Standard)

**Quelle:** [pipeline.md](file:///C:/Workspace/Repos/remotion-studio/viron-core/pipeline.md) (Zeilen 115-122)
**Typ:** PROJECT_IP

**Skill-Check:**

- [x] Explizit im Skill dokumentiert: **NEIN** (Global Skills dokumentieren keine Bitrate-Vorgaben)

**Kontext:**
Viron definiert exakte Bitrate-Vorgaben für Web-Delivery.

**Code/Daten:**

```typescript
{
  codec: 'h264',
  videoBitrate: '8000k',    // 8Mbps für 1920x1080@60fps
  audioCodec: 'aac',
  audioBitrate: '192k',
  pixelFormat: 'yuv420p',   // Colorspace für Compatibility
}
```

**Implikation:** 8Mbps ist Viron's Balance zwischen Qualität und Dateigröße für industrielle Ästhetik.

---

### 7. VP9 Codec-Profil (Viron Modern Streaming)

**Quelle:** [pipeline.md](file:///C:/Workspace/Repos/remotion-studio/viron-core/pipeline.md) (Zeilen 129-135)
**Typ:** PROJECT_IP

**Skill-Check:**

- [x] Explizit im Skill dokumentiert: **NEIN**

**Code/Daten:**

```typescript
{
  codec: 'vp9',
  videoBitrate: '5000k',    // Bessere Kompression
  audioCodec: 'opus',       // Moderner Audio-Codec
  pixelFormat: 'yuv420p',
}
```

---

### 8. ProRes Codec-Profil (Viron Professional)

**Quelle:** [pipeline.md](file:///C:/Workspace/Repos/remotion-studio/viron-core/pipeline.md) (Zeilen 143-148)
**Typ:** PROJECT_IP

**Skill-Check:**

- [x] Explizit im Skill dokumentiert: **NEIN**

**Code/Daten:**

```typescript
{
  codec: 'prores',
  proresProfile: 'hq',      // HQ = Higher Quality
  audioCodec: 'pcm',        // Unkomprimiertes Audio
  pixelFormat: 'yuv422p10le', // 10-bit für Color Grading
}
```

---

### 9. Render-Concurrency-Formel

**Quelle:** [pipeline.md](file:///C:/Workspace/Repos/remotion-studio/viron-core/pipeline.md) (Zeilen 155-170)
**Typ:** PROJECT_IP

**Skill-Check:**

- [x] Explizit im Skill dokumentiert: **NEIN** (Global Skills dokumentieren keine Concurrency-Logik)

**Kontext:**
Viron berechnet die optimale Render-Parallelität basierend auf System-Ressourcen.

**Code/Daten:**

```typescript
import os from "os";

const availableCPUs = os.cpus().length;
const ramGB = os.totalmem() / 1024 ** 3;

// Faustregel: 1-2 Prozesse pro CPU
const optimalConcurrency = Math.floor(availableCPUs * 1.5);

// Aber limitiert durch RAM (pro Prozess ~500MB)
const ramLimit = Math.floor(ramGB / 2); // Halbes RAM für Rendering

const recommendedConcurrency = Math.min(optimalConcurrency, ramLimit, 16);
```

**Formel:** `recommendedConcurrency = min(floor(CPUs × 1.5), floor(RAM_GB / 2), 16)`

**Implikation:**

- Pro Render-Prozess: ~500MB RAM
- Hard-Cap: 16 Prozesse (auch auf Monster-Maschinen)

---

## 🗑️ VERWORFEN (Skill-Redundanzen)

| Fund                                                              | Quelle                      | Steht bereits in Skill                    | Entscheidung |
| :---------------------------------------------------------------- | :-------------------------- | :---------------------------------------- | :----------- |
| Basic `<Audio>` Import & Props                                    | 40-audio-reaktiv Z.113      | `audio.md` Z.24-33                        | ❌ DROP      |
| `useAudioData()` + `visualizeAudio()` Pattern                     | 40-audio-reaktiv Z.116-133  | `audio.md` (implizit Standard-API)        | ❌ DROP      |
| Web Audio API FFT Setup (AnalyserNode, fftSize)                   | 40-audio-reaktiv Z.22-63    | Generisches Browser-Wissen, kein Viron-IP | ❌ DROP      |
| Mediabunny `computeDuration()`                                    | (nicht explizit in Quellen) | `get-audio-duration.md` Z.14-27           | ❌ DROP      |
| `createTikTokStyleCaptions()` Pattern                             | (nicht explizit in Quellen) | `display-captions.md` Z.26-43             | ❌ DROP      |
| Word-Highlighting via `token.fromMs/toMs`                         | (nicht explizit in Quellen) | `display-captions.md` Z.88-126            | ❌ DROP      |
| Core Web Vitals Definitionen (LCP < 2.5s, INP < 200ms, CLS < 0.1) | 50-web-08 Z.6-18            | Generisches Web-Wissen (Google-Standard)  | ❌ DROP      |

---

## 📊 Statistiken

| Metrik                    | Wert                                                               |
| ------------------------- | ------------------------------------------------------------------ |
| **Quellen gesamt**        | 8 Dateien                                                          |
| **Skill-Dateien geprüft** | 4 (audio.md, get-audio-duration.md, display-captions.md, SKILL.md) |
| **MITNEHMEN Punkte**      | 9                                                                  |
| **VERWORFEN Punkte**      | 7                                                                  |
| **Redundanz-Quote**       | 43.75% (7/16 Funde waren Duplikate)                                |
| **Viron-IP-Quote**        | 56.25% (9/16 Funde sind echtes Delta)                              |

---

## 💡 Empfehlungen

### 1. Fehlende Dokumentation

- Die `specs/audio.md` referenziert eine `audio-frames.json` Datei, aber es existiert kein Schema oder Beispiel-JSON im Repo.
- **Empfehlung:** Erstelle `specs/audio-frames.schema.json` mit JSON-Schema-Validierung.

### 2. Inkonsistenz in Frequenz-Bändern

- `specs/audio.md` definiert 3 Bänder (Bass/Mid/Treble)
- `40-audio-reaktiv` definiert 5 Bänder (Bass/LowMid/Mid/HighMid/Treble)
- **Empfehlung:** Entscheide dich für eines oder dokumentiere beide als "Simple" vs "Advanced" Mode.

### 3. AI Streaming (Experimental)

- `50-web-patterns-10` dokumentiert Real-Time AI Video Streaming (Replicate, FAL.ai, Self-Hosted)
- **Status:** Experimental (v0.9), nicht produktionsreif
- **Empfehlung:** Nicht in Core-IP aufnehmen, bis Viron dies tatsächlich implementiert.

---

## ✅ Audit-Bestätigung

Ich bestätige, dass dieser Report:

1. Alle 8 Briefing-Quellen vollständig gelesen hat
2. Jeden Fund gegen die 4 Global Skill-Dateien geprüft hat
3. Keine generischen Remotion-Patterns als Viron-IP ausgibt
4. Exakte Zeilennummern und Code-Beweise enthält

**AUDIT COMPLETE.**

---

_Extraction Report Badge 6 v1.0 | 2026-01-31 | Antigravity Sub-Agent_
