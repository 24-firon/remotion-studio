# 🎯 EXTRACTION REPORT: BADGE 7 – SYSTEM ARCHITECTURE & CLOUD

**Version:** V5 ULTIMATE (The Knowledge Archive)  
**Badge ID:** VIRON-2026-B7  
**Basis:** V1 Context + V2 Precision + V3 Structure + V4 Depth  
**Analyst:** Viron Systems Architect  
**Datum:** 2026-02-01  
**Status:** ✅ PRODUCTION READY – Replaces Original Files

---

## 📊 EXECUTIVE ARCHIVE SUMMARY

### Das Versprechen dieses Dokuments

> **Ein neuer Agent mit diesem Dokument + `remotion-core` Skill versteht das VIRON-BETRIEBSSYSTEM vollständig – ohne die Originalquellen lesen zu müssen.**

### Was ist Viron?

Viron ist kein Framework. Viron ist ein **Virtual Production Studio** – ein softwarebasiertes System, das deterministische Video-Produktion auf drei Säulen aufbaut:

1. **PHYSIK** – RAM/CPU-beschränktes Rendering (kein blindes Parallelisieren)
2. **GOVERNANCE** – Strikte Regeln für Code, Git und Skill-Merging (kein Chaos)
3. **ÖKONOMIE** – Definierte Cloud-Tiers mit Preis-Breakpoints (kein "teuer weil hochwertig")

### Warum dieses Dokument notwendig ist

Die Originalquellen (`pipeline.md`, `workflow.md`, Routing-Matrizen) sind für Menschen geschrieben, nicht für Agenten. Dieses Dokument extrahiert die **entscheidenden System-Entscheidungen**, die ein Agent braucht, um Viron-Code zu schreiben, zu debuggen und zu erweitern.

### Wie man dieses Dokument nutzt

| Wenn du... | Dann lies... |
|:-----------|:-------------|
| Einen Bug hast | Sektion 3 (Troubleshooting) |
| Code schreiben willst | Sektion 2 (Pipeline) + Sektion 4 (Governance) |
| Verstehen willst, wie Viron tickt | Sektion 1 (System Map) |
| Skalieren willst (Cloud) | Sektion 2.2 (Cloud Tiers) |
| Einen Skill mergen willst | Sektion 4.1 (Golden Core Rule) |

---

## 📈 STATISTIK & VOLLSTÄNDIGKEIT

| Metrik | Wert | Bedeutung |
|:-------|:-----|:----------|
| **Extrahierte System-Bausteine** | **12** | 100% der Pflicht-Extraktionen aus dem Briefing |
| **Viron-spezifisches IP** | **100%** | Kein Standard-Remotion, keine Boilerplate |
| **Mathematische Formeln** | **3** | Concurrency, Cost-Calc, Sync-Tolerance |
| **Grenzwerte (Thresholds)** | **7** | FPS < 55, RAM / 2, > 2 Frames, etc. |
| **Forensic Accuracy** | **High** | Alle Zeilennummern verifiziert |
| **Redundanz-Elimination** | **9 Items** | Standard-Remotion korrekt verworfen |

---

# 🗺️ THE SYSTEM MAP

## 1. THE 7 DEPARTMENTS – Virons Organisationsstruktur

**Quelle:** `22_SYSTEM_PLAN_Folder_Structure.md` (Zeilen 20-207)  
**Kontext:** Traditionelle Code-Organisation führt zu Chaos: Alles kann alles importieren, Kontext wird überfrachtet, Agenten wissen nicht, was relevant ist. Viron löst dies durch strikte Department-Grenzen.

### 1.1 Die Departments im Überblick

| Department | Pfad | Kern-Verantwortung | Access-Rule | Lazy-Load |
|:-----------|:-----|:-------------------|:------------|:----------|
| **DEPT_CORE_ENGINE** | `knowledge/engine/` | Look & Feel, Physics, Theme, 3D | Read-Only für andere | ❌ Nein |
| **DEPT_VIDEO** | `knowledge/video/` | Remotion Framework, Sequencing, Composition | Consumer | ❌ Nein |
| **DEPT_RENDER** | `knowledge/render/` | Encoding, Codecs, Lambda, Output | Kein Zugriff auf `video/` Source | ❌ Nein |
| **DEPT_AUDIO** | `knowledge/audio/` | FFT, Processing, Auphonic, Whisper | - | ❌ Nein |
| **DEPT_OPS** | `knowledge/ops/` | Workflow, Git, Recovery, Meta-Informationen | Full Access (Meta-Layer) | ❌ Nein |
| **DEPT_WEB** | `knowledge/web/` | Headless Chrome, Design-Token-Extraction | - | ❌ Nein |
| **DEPT_AUTOMATION** | `knowledge/automation/` | APIs, Supabase, MCP, externe Services | Nur bei explizitem Flag | ✅ **JA** |

### 1.2 Die Access-Control-Regeln

**Warum das wichtig ist:** Ohne diese Regeln lädt ein Agent "nur mal schnell" alles, was er findet. Bei 115+ Dateien ist der Kontext nach 3 Prompts voll.

| Regel | Erklärung | Konsequenz bei Verstoß |
|:------|:----------|:------------------------|
| **ENGINE → VIDEO** | ✅ Erlaubt. VIDEO braucht Theme/Tokens für konsistentes Design | - |
| **ENGINE → AUDIO** | ✅ Erlaubt. AUDIO braucht Physics/Timing für Sync | - |
| **WEB → ENGINE** | ⚠️ **NUR Token-Export**. Nicht die ganze Engine laden | Context-Bloat |
| **AUTOMATION → *** | ❌ **Nur bei Demand** (`--enable-firecrawl`) | 50%+ Context-Verlust |
| **AUDIO → VIDEO** | ✅ Erlaubt. Sync ist essentiell | - |
| **OPS → *** | ✅ Erlaubt. OPS ist Meta-Layer | - |

### 1.3 Canon Packs – Was immer geladen wird

Nicht alles ist optional. Diese Dateien sind **First-Class Citizens** und werden in jedem Use-Case geladen:

**CANON/ENTRY:**
- `VIRON_SYSTEM_ENTRY.md` – Immutable Physics, Tech-Stack, Einstieg

**CANON/DOCS:**
- `documentation_manifest.md` – 9-Module Übersicht

**CANON/WORKFLOWS:**
- `Remotion-Setup.md.txt` – Die zwei Haupt-Workflows (Video-Pipeline, Website-Pipeline)

**Wichtig:** Ein Agent, der diese nicht lädt, operiert ohne Kontext.

---

## 2. THE ROUTING BRAIN – Input-Output-Logik

**Quellen:**
- `23_ROUTING_MATRIX_Inputs.md` (Zeilen 24-227)
- `24_ROUTING_MATRIX_Outputs.md` (Zeilen 21-296)

**Kontext:** Ein User wirft einen Input in das System. Der Agent muss erkennen: Was ist das? Welche Departments laden? Welche Specs gelten?

### 2.1 Input Type Detection – Der Erkennungsalgorithmus

**Das Problem:** Ein `.json` kann alles sein – Design-Tokens, Transkript, Config. Dateiendungen lügen.

**Die Viron-Lösung:** Content-basierte Erkennung mit Fallback auf Extension.

```typescript
const detectInputType = (input: string | File): InputType => {
  // STRING-INPUTS (URLs, Connection Strings)
  if (typeof input === 'string') {
    if (input.startsWith('http://') || input.startsWith('https://')) {
      return 'WEBSITE_URL';
    }
    if (input.includes('@') && input.includes('://')) {
      return 'DATABASE_CONNECTION'; // Supabase, PostgreSQL
    }
  }
  
  // FILE-INPUTS (Extension + Content-Check)
  if (isFile(input)) {
    const ext = getExtension(input).toLowerCase();
    
    switch (ext) {
      case '.mp4':
      case '.mov':
      case '.avi':
      case '.webm':
        return 'VIDEO_FILE';
        
      case '.wav':
      case '.mp3':
      case '.aac':
      case '.flac':
        return 'AUDIO_FILE';
        
      case '.json':
        // CONTENT-ANALYSE: Ist es Transkript oder Tokens?
        const content = parseJSON(input);
        if (content.segments && Array.isArray(content.segments)) {
          return 'TRANSCRIPT_JSON'; // Whisper-Output
        }
        if (content.colors || content.typography) {
          return 'DESIGN_TOKENS_JSON';
        }
        return 'UNKNOWN_JSON';
        
      case '.glb':
      case '.gltf':
      case '.fbx':
      case '.obj':
        return '3D_MODEL_ASSET';
    }
  }
  
  return 'UNKNOWN';
};
```

### 2.2 Input-Type → Department Mapping

| Input-Type | Lädt Departments | Zusätzliche Flags |
|:-----------|:-----------------|:------------------|
| **VIDEO_FILE** | VIDEO → RENDER → OPS | `--enable-autoedit` → AUDIO<br>`--add-captions` → VIDEO/Captions<br>`--broadcast-audio` → AUDIO |
| **AUDIO_FILE** | AUDIO → VIDEO → RENDER | `--reactive` → AUDIO/Reactive<br>`--normalize` → AUDIO/Processing |
| **TRANSCRIPT_JSON** | VIDEO → ENGINE (Theme) → RENDER | Meist mit VIDEO kombiniert |
| **WEBSITE_URL** | WEB → ENGINE → VIDEO → RENDER | `--use-firecrawl` → AUTOMATION |
| **DESIGN_TOKENS_JSON** | ENGINE → VIDEO → RENDER | - |
| **DATABASE_CONNECTION** | AUTOMATION → VIDEO → RENDER → OPS | Lazy-Load AUTOMATION |
| **3D_MODEL_ASSET** | ENGINE → VIDEO → RENDER | `--vfx-extreme` → High-End VFX |

### 2.3 Output Specs Matrix – Was wird gerendert?

**Das Problem:** Gleicher Input, verschiedene Outputs brauchen verschiedene Specs.

**Die Viron-Lösung:** Vordefinierte Output-Typen mit festen Specs.

| Output-Type | Resolution | Codec | Bitrate | FPS | Audio LUFS | Context Budget |
|:------------|:-----------|:------|:--------|:----|:-----------|:---------------|
| **SHORT** | 1080×1920 (9:16) | h264 | 3-5 Mbps | 30 | -16 | 40% |
| **SHOWCASE** | 1920×1080 (16:9) | h264 / ProRes | 8-15 Mbps | 30/60 | -14 | 50% |
| **EXPLAINER** | 1920×1080 (16:9) | h264 | 5-8 Mbps | 30 | -16 | 65% |
| **DATA_DASHBOARD** | 1920×1080 | h264 | 4-6 Mbps | 30 | -16 / Stille | 50% |
| **PRODUCTION_RENDER** | 3840×2160 (4K) | ProRes422HQ / H.265 | 50-100 Mbps | 24/30 | -14 / -18 | 50% |
| **AD_COMMERCIAL** | 1080×1920 | h264 | 5-8 Mbps | 30 | -14 (punchy) | 60% |

**Context Budget Erklärung:** Wieviel % des verfügbaren Agent-Kontexts darf dieser Job laden?
- SHORT: 40% (fokussiert, schnell)
- EXPLAINER: 65% (lang, komplex, mehr Code)
- PRODUCTION: 50% (qualitäts-fokussiert, kein Bloat)

### 2.4 Context Budget Rules – Die Grenzen

**Die drei Gebote:**

1. **Minimum:** Canon + 1-2 Departments (nie "alles laden")
2. **Maximum:** 50% des Kontext-Budgets (Headroom für unerwartete Probleme)
3. **Lazy-Load:** AUTOMATION nur bei expliziten Flags (`--enable-firecrawl`)

**Verstoß-Konsequenz:** Kontext-Überlastung → Agent "vergisst" wichtige Regeln → Fehler.

---

# ⚙️ THE CLOUD PIPELINE

## 3. CONCURRENCY FORMULA – Anti-OOM-Protection

**Quelle:** `viron-core/pipeline.md` (Zeilen 157-171)  
**Kontext (V1):** Die Intuition "Mehr CPUs = Schnelleres Rendering" ist bei 4K-Video falsch. Ohne RAM-Begrenzung kommt es zu Out-of-Memory-Kills.

### 3.1 Das Problem

Ein typischer Entwickler-Workflow:
```typescript
// ❌ FALSCH: Nutzt alle CPUs, ignoriert RAM
const concurrency = os.cpus().length; // 16 CPUs
// 16 Prozesse × 500MB = 8GB RAM
// Bei 4K-Rendering: OOM-Kill nach 30 Sekunden
```

### 3.2 Die Viron-Lösung

Dreifache Begrenzung: CPU × 1.5, RAM / 2, Hard Cap 16.

```typescript
import os from "os";

const availableCPUs = os.cpus().length;
const ramGB = os.totalmem() / 1024 ** 3;

// Faktor 1: CPU mit Hyperthreading-Optimierung
const optimalConcurrency = Math.floor(availableCPUs * 1.5);

// Faktor 2: RAM-Limit (pro Prozess ~500MB)
const ramLimit = Math.floor(ramGB / 2); // 🔑 NUR 50% RAM!

// Faktor 3: Hard Cap (Lambda-Limit, Stabilität)
const recommendedConcurrency = Math.min(optimalConcurrency, ramLimit, 16);

console.log(`Recommended: ${recommendedConcurrency} processes`);
```

### 3.3 Die Schlüsselzahlen

| Faktor | Wert | Warum? |
|:-------|:-----|:-------|
| **CPU-Multiplikator** | 1.5× | Hyperthreading: 1 Kern = 1.5 Prozesse effizient |
| **RAM-Teiler** | 2 | 50% RAM für Rendering, 50% für OS/Overhead |
| **Hard Cap** | 16 | AWS Lambda Maximum + Stabilitätsschwelle |

### 3.4 Beispiel-Berechnung

**Szenario:** 8-Core MacBook Pro mit 16GB RAM

```
CPUs: 8 × 1.5 = 12
RAM: 16GB / 2 = 8
Hard Cap: 16

Ergebnis: min(12, 8, 16) = 8 Prozesse
```

**Szenario:** 32-Core Render-Farm mit 128GB RAM

```
CPUs: 32 × 1.5 = 48
RAM: 128GB / 2 = 64
Hard Cap: 16

Ergebnis: min(48, 64, 16) = 16 Prozesse
```

**Warum der Hard Cap wichtig ist:** Selbst bei unbegrenztem RAM würden >16 Prozesse zu Kontext-Switching-Overhead führen. Die Render-Zeit steigt wieder.

---

## 4. CLOUD RENDERING TIERS – Die Ökonomie

**Quelle:** `60-cloud-rendering-00-aws-lambda-renderfarming.md` (Zeilen 172-216)

### 4.1 Die Cost-Optimization-Strategie

Nicht jedes Video braucht Ultra-Qualität. Viron definiert 4 Tiers mit definierten Breakpoints.

| Tier | CRF | Workers | Lambdas | Cost/Min | Render-Zeit* | Use Case |
|:-----|:----|:--------|:--------|:---------|:-------------|:---------|
| **Draft** | 28 | 4 | 1 | **$0.10** | ~30s | Interne Previews, Tests |
| **Standard** | 20 | 8 | 4 | **$0.50** | ~15s | Social Media, schneller Turnaround |
| **High** | 16 | 16 | 8 | **$1.20** | ~8s | Client-Präsentationen |
| **Ultra** | 10 | 32 | 16 | **$2.80** | ~4s | Broadcast, Archival, Master |

\* Bei 1 Minute Video @ 30fps

### 4.2 CRF-Werte erklärt

CRF = Constant Rate Factor. Niedriger = Bessere Qualität, höhere Dateigröße.

- **CRF 28:** Web-optimiert, sichtbare Kompression
- **CRF 20:** Ausgewogen, Standard für Social
- **CRF 16:** Hochwertig, kaum Kompression sichtbar
- **CRF 10:** Visuell verlustfrei, Broadcast-Standard

### 4.3 Die Cost-Calculator-Formel

```typescript
interface RenderTier {
  crf: number;
  workers: number;
  lambdas: number;
  costPerMinute: number;
}

const getRenderConfig = (
  quality: 'draft' | 'standard' | 'high' | 'ultra'
): RenderTier => {
  const tiers = {
    draft:    { crf: 28, workers: 4,  lambdas: 1,  costPerMinute: 0.10 },
    standard: { crf: 20, workers: 8,  lambdas: 4,  costPerMinute: 0.50 },
    high:     { crf: 16, workers: 16, lambdas: 8,  costPerMinute: 1.20 },
    ultra:    { crf: 10, workers: 32, lambdas: 16, costPerMinute: 2.80 }
  };
  return tiers[quality];
};
```

---

## 5. HYBRID RENDER MODE SELECTOR

**Quelle:** `60-cloud-rendering-00-aws-lambda-renderfarming.md` (Zeilen 345-391)

### 5.1 Die Routing-Entscheidung

Wo rendern? Nicht alles gehört in die Cloud.

```typescript
enum RenderMode {
  LOCAL = 'local',           // Entwicklermaschine
  LAMBDA = 'lambda',         // AWS Serverless
  RENDER_FARM = 'render-farm' // Dedizierte GPU-Farm
}

const selectRenderMode = async (
  durationSeconds: number,
  quality: string,
  estimatedLambdaCost: number
): Promise<RenderMode> => {
  
  // BREAKPOINT 1: Kurze Drafts = Lokal (schneller als Cloud-Setup)
  if (durationSeconds < 30 && quality === 'draft') {
    return RenderMode.LOCAL;
  }
  
  // BREAKPOINT 2: Mittlere Jobs = Lambda (kosteneffizient)
  if (durationSeconds < 600 && quality !== 'ultra') {
    // 600s = 10 Minuten
    // $5 = Schmerzgrenze für Lambda
    if (estimatedLambdaCost < 5) {
      return RenderMode.LAMBDA;
    }
  }
  
  // ALLES ANDERE: Render Farm (skalierbar, unbegrenzte Parallelität)
  return RenderMode.RENDER_FARM;
};
```

### 5.2 Die Breakpoints erklärt

| Breakpoint | Wert | Logik |
|:-----------|:-----|:------|
| **Lokal vs Cloud** | 30 Sekunden | Cloud-Setup (S3, Lambda-Spinup) dauert ~20s. Lokal schneller. |
| **Lambda vs Farm** | 10 Minuten | Lambda-Timeout-Grenze bei 900s (15min). Safety-Margin. |
| **Cost-Cap** | $5 | Ab hier wird Farm günstiger (Spot-Instances, Bulk-Discount). |

---

# 🛡️ THE GOVERNANCE SYSTEM

## 6. THE GOLDEN CORE RULE

**Quelle:** `.knowledge/archive/vault-analysis/core/integration-protocol.md` (Zeilen 9-17)

### 6.1 Die Unverletzliche Regel

> **Der Global Skill `remotion-best-practices` ist UNTOUCHABLE.**

### 6.2 Das Warum

Viron baut auf Remotion auf. Wenn Viron-Code Standard-Remotion überschreibt, entsteht Fragmentation. Ein neuer Agent weiß nicht mehr, was gilt.

### 6.3 Die Decision Matrix

| Vergleich | Aktion | Beispiel |
|:----------|:-------|:---------|
| Eingehend = Core Skill | **REJECT** | `durationInFrames` Erklärung |
| Eingehend < Core Skill | **REJECT** | Falsche/unvollständige Info |
| Eingehend > Core Skill | **FLAG** für Human Review | Neue Edge Case Lösung |
| Automatisches Überschreiben | **NEVER** | Immer Review-Pflicht |

### 6.4 Snippet Extraction Rule

**Das Problem:** "Ich habe eine 50KB Markdown-Datei mit 2 nützlichen Zeilen."

**Die Lösung:**

```
Do not import giant files. Extract only the unique value.

1. Scan for Code Blocks
2. Compare block against Core
3. If new: Extract to micro-file (e.g., chromatic-aberration.md)
4. Discard boilerplate text
```

**Wichtig:** Ein Agent sollte nicht "pauschal" eine ganze Datei importieren. Er sollte chirurgisch nur das extrahieren, was neu ist.

---

## 7. GIT-FLOW & BRANCHING STRATEGY

**Quelle:** `viron-core/workflow.md` (Zeilen 85-98)

### 7.1 Die Branch-Hierarchie

```
main (Production - immer deploybar)
  ↑
  ├─ release/v1.0.0 (Release Candidate - getestet, stabil)
  │
develop (Integration - Features kommen hier zusammen)
  ↑
  ├─ feature/video-glints (Neue Features)
  ├─ feature/audio-sync
  ├─ bugfix/rendering-crash (Bugfixes)
  └─ chore/dependencies (Maintenance, Updates)
```

### 7.2 Die 4 Branch-Typen

| Typ | Pattern | Beispiel | Wann nutzen? |
|:----|:--------|:---------|:-------------|
| **Release** | `release/v{major}.{minor}.{patch}` | `release/v1.0.0` | Produktions-Release, Version-Tag |
| **Feature** | `feature/{kebab-case-beschreibung}` | `feature/video-glints` | Neue Funktionalität |
| **Bugfix** | `bugfix/{beschreibung}` | `bugfix/rendering-crash` | Fehlerbehebung |
| **Chore** | `chore/{beschreibung}` | `chore/dependencies` | Maintenance, keine Feature-Änderung |

### 7.3 Warum kein `hotfix/`?

Traditioneller Git-Flow nutzt `hotfix/` für Produktions-Notfälle. Viron nicht.

**Grund:** Alles geht durch `release/`. Notfälle werden schnell in `release/v1.0.1` gefixt, nicht durch einen separaten Pfad. Weniger Komplexität, weniger Fehler.

---

## 8. COMMIT MESSAGE KONVENTION

**Quelle:** `viron-core/workflow.md` (Zeilen 100-123)

### 8.1 Das Format

```
Typ: Titel (Imperativ, max 50 Zeichen)

Detaillierte Beschreibung (optional, wenn nötig)
- Punkt 1
- Punkt 2

Closes #123
Related to #456
```

### 8.2 Die 8 Commit-Typen

| Typ | Wann nutzen? | Beispiel |
|:----|:-------------|:---------|
| `feat` | Neue Funktion | `feat: add bass-reactive glint animation` |
| `fix` | Bugfix | `fix: prevent memory leak in audio analyzer` |
| `docs` | Dokumentation | `docs: update API reference for v2.0` |
| `style` | Formatierung | `style: fix indentation in theme.ts` |
| `refactor` | Umstrukturierung | `refactor: extract common render logic` |
| `perf` | Performance | `perf: optimize FFT calculation by 40%` |
| `test` | Tests | `test: add unit tests for sync validator` |
| `chore` | Maintenance | `chore: bump dependencies to latest` |

### 8.3 Warum das wichtig ist

1. **Automatische Changelogs:** Tools können `feat:` vs `fix:` unterscheiden
2. **SemVer-Bumping:** `feat` → Minor, `fix` → Patch, Breaking Change → Major
3. **Code Review:** Reviewer sieht sofort die Absicht

---

# 🔧 THE TROUBLESHOOTING SYSTEM

## 9. AUDIO-VIDEO SYNC VALIDATOR

**Quelle:** `viron-core/troubleshooting.md` (Zeilen 169-188)

### 9.1 Das Problem

Nach langen Render-Jobs laufen Audio und Video auseinander. Der Fehler fällt erst beim End-Export auf.

### 9.2 Die Viron-Lösung

Validierung **vor** dem Final-Render mit harter Toleranz.

```typescript
// src/audio/syncValidator.ts

export const validateAudioVideoSync = (
  audioFrames: AudioFrame[],
  videoFrameRate: number,
  audioDurationMs: number,
): boolean => {
  // Erwartete Frames basierend auf Audio-Dauer
  const expectedFrames = Math.ceil((audioDurationMs / 1000) * videoFrameRate);
  const actualFrames = audioFrames.length;

  // 🔑 VIRON SYNC TOLERANCE: Maximal 2 Frames Abweichung
  if (Math.abs(expectedFrames - actualFrames) > 2) {
    console.error(`
      ✗ SYNC ERROR:
      Expected frames: ${expectedFrames}
      Actual frames:   ${actualFrames}
      Difference:      ${Math.abs(expectedFrames - actualFrames)}
      
      Action: Rendering aborted. Check audio resampling.
    `);
    return false;
  }

  return true;
};
```

### 9.3 Die Zahl: > 2 Frames

**Warum 2?** Bei 60 FPS sind 2 Frames = 33ms. Das ist unterhalb der menschlichen Wahrnehmungsschwelle für Lip-Sync. Alles darüber ist sichtbar.

**Konsequenz:** Bei Verstoß → HARD FAIL. Kein "könnte passen", kein Warning.

---

## 10. PERFORMANCE MONITOR (FPS GUARD)

**Quelle:** `viron-core/workflow.md` (Zeilen 183-212)

### 10.1 Das Problem

Während des Renderings sinkt die Performance (RAM-Fragmentierung, Leaks). Der Agent merkt es nicht, bis es zu spät ist.

### 10.2 Die Viron-Lösung

Kontinuierliches Monitoring mit hartem Threshold.

```typescript
// src/utils/performanceMonitor.ts

export const setupPerformanceMonitor = (
  logInterval: number = 10 // Sekunden
) => {
  let frameCount = 0;
  let lastLogTime = Date.now();

  return {
    logFrameMetrics: (frame: number) => {
      frameCount++;
      const now = Date.now();
      const elapsed = now - lastLogTime;

      if (elapsed >= logInterval * 1000) {
        const fps = frameCount / (elapsed / 1000);
        
        console.log(`FPS: ${fps.toFixed(2)}`);

        // 🔑 VIRON FPS THRESHOLD: Unter 55 FPS = Warnung
        if (fps < 55) {
          console.warn("⚠ Performance degradation detected (FPS < 55)");
          // Optional: Auto-throttle Concurrency
        }

        frameCount = 0;
        lastLogTime = now;
      }
    },
  };
};
```

### 10.3 Die Zahl: < 55 FPS

**Warum 55?** Ziel ist 60 FPS. 55 ist die "Yellow Zone" - noch akzeptabel, aber Trend zur Gefahr. Bei < 50 wäre es bereits kritisch.

---

# 🗑️ THE REDUNDANCY GRAVEYARD

## Verworfene Items (Nicht in Skill übernehmen)

| Fund | Quelle | Steht bereits in Skill | Grund für Verwerfung |
|:-----|:-------|:-----------------------|:---------------------|
| `durationInFrames` Erklärung | `pipeline.md` | `rules/trimming.md` | Standard-Remotion |
| `getInputProps()` Pattern | `pipeline.md` | `rules/parameters.md` | Standard-Remotion |
| Lambda `renderMedia` API | `pipeline.md` | `remotion-core` | Basis-API |
| ESLint Config | `workflow.md` | Standard Next.js | Boilerplate |
| Prettier Config | `workflow.md` | Standard Config | Boilerplate |
| VS Code Settings | `workflow.md` | IDE-Standard | Nicht Viron-spezifisch |
| `useVideoConfig()` Nutzung | `FEHLERLOSUNG` | `remotion-core` | Standard-Hook |
| `Sequence` Timing Erklärung | `FEHLERLOSUNG` | `rules/sequencing.md` | Standard-Remotion |
| `<Sequence>` Trimming | Global Skill | `rules/trimming.md` | Verifiziert: Standard |

**Wichtig:** Diese Items sind nicht "falsch" - sie sind nur nicht Viron-spezifisch. Sie gehören in den `remotion-core` Skill, nicht in die Viron-Erweiterung.

---

# ✅ FORENSIC VERIFICATION LOG

## Antworten auf die Audit-Fragen (A-D)

| Frage | Antwort | Quelle |
|:------|:--------|:-------|
| **A. Concurrency Formel** | `min(CPUs×1.5, RAM÷2, 16)` | `pipeline.md:157-171` |
| **A. RAM-Teiler** | **2** (50% RAM) | `pipeline.md:167` |
| **B. 4 Branch-Typen** | `release/`, `feature/`, `bugfix/`, `chore/` | `workflow.md:85-98` |
| **B. Release Schema** | `release/v{major}.{minor}.{patch}` | `workflow.md:90` |
| **C. Sync Toleranz** | `> 2 Frames` = ERROR | `troubleshooting.md:177` |
| **C. IF-Condition** | `Math.abs(expected - actual) > 2` | `troubleshooting.md:177` |
| **D. Golden Core** | Identisch → **REJECT** | `integration-protocol.md:15` |
| **D. Besser als Core** | **FLAG** for Review | `integration-protocol.md:16` |
| **D. Nie automatisch** | **NEVER** overwrite | `integration-protocol.md:17` |

---

# 🏁 ARCHIVE COMPLETENESS STATUS

## Was dieser Report abdeckt

✅ **System-Architektur** – Die 7 Departments, Access-Control, Canon Packs  
✅ **Routing-Logik** – Input Detection, Output Specs, Context Budgets  
✅ **Cloud-Pipeline** – Concurrency, Tiers, Hybrid-Selector  
✅ **Governance** – Golden Core Rule, Git-Flow, Commits  
✅ **Troubleshooting** – Sync Validator, FPS Guard  
✅ **Redundanz-Check** – 9 Items korrekt verworfen  

## Was der Agent jetzt kann

Ein neuer Agent mit diesem Dokument + `remotion-core` Skill kann:
1. Viron-Code schreiben, der den Concurrency-Regeln folgt
2. Den richtigen Render-Modus (Local/Lambda/Farm) wählen
3. Git-Branches nach Viron-Standard benennen
4. Redundanzen erkennen und verwerfen
5. Sync-Fehler vor dem Final-Render abfangen
6. Den Kontext-Budget nicht überschreiten

## Was nicht in diesem Report steht (und nicht muss)

- Standard-Remotion-Syntax (`<Sequence>`, `useCurrentFrame`) → `remotion-core` Skill
- CSS/Tailwind-Grundlagen → Standard-Dokumentation
- TypeScript-Basics → Voraussetzung

---

**END OF ARCHIVE**

*Dieses Dokument ersetzt die Originalquellen für Agenten-Operationen. Stand: 2026-02-01*
