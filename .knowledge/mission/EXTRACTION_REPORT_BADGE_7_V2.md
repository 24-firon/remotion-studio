# 📊 EXTRACTION REPORT: BADGE 7 (SYSTEM ARCHITECTURE & CLOUD)

**Status:** ✅ FINAL V2 | **Auditor:** Viron Systems Architect | **Datum:** 2026-02-01

---

## 🏆 MITNEHMEN (Viron-Spezifisches IP)

### 1. Viron Concurrency Calculation Formula

**Quelle:** [`viron-core/pipeline.md`](viron-core/pipeline.md:157-171)
**Typ:** SYSTEM_CONFIG
**Skill-Check:** [x] NEIN (Nicht in `remotion-core` dokumentiert)

**Kontext:**
Viron nutzt eine aggressive RAM-Limitierung (nur 50% des verfügbaren RAMs) für Rendering-Prozesse, um Out-of-Memory-Kills bei 4K-Rendern zu verhindern. Die Formel balanciert CPU-Parallelität mit RAM-Verfügbarkeit und setzt ein hartes Limit von 16 Prozessen.

**Code:**
```typescript
import os from "os";

const availableCPUs = os.cpus().length;
const ramGB = os.totalmem() / 1024 ** 3;

// Faustregel: 1-2 Prozesse pro CPU
const optimalConcurrency = Math.floor(availableCPUs * 1.5);

// Aber limitiert durch RAM (pro Prozess ~500MB)
const ramLimit = Math.floor(ramGB / 2); // Halbes RAM für Rendering

const recommendedConcurrency = Math.min(optimalConcurrency, ramLimit, 16);
console.log(`Recommended: ${recommendedConcurrency} processes`);
```

**Key Facts:**
- RAM-Teiler: **2** (nur 50% RAM für Rendering)
- CPU-Faktor: **1.5x** (hyperthreading-optimiert)
- Hard Limit: **16** Prozesse

---

### 2. Viron Git-Flow & Branching Strategy

**Quelle:** [`viron-core/workflow.md`](viron-core/workflow.md:85-98)
**Typ:** GOVERNANCE_RULE
**Skill-Check:** [x] NEIN (Projekt-spezifischer Workflow)

**Kontext:**
Strikte Branch-Nomenklatur für CI/CD-Kompatibilität. Die 4 Branch-Typen sind hierarchisch organisiert und müssen exakt diesem Schema folgen.

**Branch-Typen (4):**
```
main (Production)
  ↑
  ├─ release/v1.0.0 (Release Candidate)
  │
develop (Integration)
  ↑
  ├─ feature/video-glints (Feature Branch)
  ├─ feature/audio-sync (Feature Branch)
  ├─ bugfix/rendering-crash (Bugfix)
  └─ chore/dependencies (Maintenance)
```

**Namensschema:**
| Typ | Pattern | Beispiel |
|-----|---------|----------|
| Release | `release/v{major}.{minor}.{patch}` | `release/v1.0.0` |
| Feature | `feature/{description}` | `feature/video-glints` |
| Bugfix | `bugfix/{description}` | `bugfix/rendering-crash` |
| Chore | `chore/{description}` | `chore/dependencies` |

---

### 3. Viron Commit Message Konvention

**Quelle:** [`viron-core/workflow.md`](viron-core/workflow.md:100-123)
**Typ:** GOVERNANCE_RULE
**Skill-Check:** [x] NEIN (Projekt-spezifisch)

**Format:**
```
Typ: Titel (Imperative, max 50 chars)

Detaillierte Beschreibung (wenn nötig)
- Punkt 1
- Punkt 2

Closes #123
Related to #456
```

**Gültige Typen (8):**
- `feat`: Neue Funktion
- `fix`: Bug fix
- `docs`: Dokumentations-Änderung
- `style`: Formatierung (kein Code-Change)
- `refactor`: Code-Umstrukturierung
- `perf`: Performance-Optimierung
- `test`: Test-Änderungen
- `chore`: Dependencies, Config, etc.

**Beispiel:**
```
feat: add bass-reactive glint animation

Implement frequency-band driven glint scaling
for metallic surface effects. Uses audio FFT
analysis to drive opacity and rotation.

Closes #89
```

---

### 4. Audio-Video Sync Validator (Frame Tolerance)

**Quelle:** [`viron-core/troubleshooting.md`](viron-core/troubleshooting.md:169-188)
**Typ:** ERROR_HANDLING
**Skill-Check:** [x] NEIN (Custom Viron Validator)

**Kontext:**
Viron erlaubt maximal 2 Frames Abweichung zwischen Audio- und Videodauer, bevor der Render als fehlerhaft abgebrochen wird.

**Code:**
```typescript
// src/audio/syncValidator.ts
export const validateAudioVideoSync = (
  audioFrames: AudioFrame[],
  videoFrameRate: number,
  audioDurationMs: number,
) => {
  const expectedFrames = Math.ceil((audioDurationMs / 1000) * videoFrameRate);
  const actualFrames = audioFrames.length;

  // SYNC TOLERANCE: > 2 Frames = ERROR
  if (Math.abs(expectedFrames - actualFrames) > 2) {
    console.error(`
      ✗ SYNC ERROR:
      Expected frames: ${expectedFrames}
      Actual frames:   ${actualFrames}
      Difference:      ${Math.abs(expectedFrames - actualFrames)}
    `);
    return false;
  }

  return true;
};
```

**Smoking Gun:** `> 2` (Zeile 177) - Die Toleranz ist auf maximal 2 Frames festgelegt.

---

### 5. Performance Monitor (FPS Threshold)

**Quelle:** [`viron-core/workflow.md`](viron-core/workflow.md:183-212)
**Typ:** SYSTEM_CONFIG
**Skill-Check:** [x] NEIN (Viron-spezifisch)

**Kontext:**
Viron definiert einen harten FPS-Grenzwert von 55 FPS. Bei Unterschreitung wird eine Performance-Warnung ausgelöst.

**Code:**
```typescript
// src/utils/performanceMonitor.ts
export const setupPerformanceMonitor = (
  videoComponent: React.FC,
  logInterval: number = 10,
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

        // ⚠️ VIRON FPS THRESHOLD: < 55 FPS = WARNING
        if (fps < 55) {
          console.warn("⚠ Performance degradation detected (FPS < 55)");
        }

        frameCount = 0;
        lastLogTime = now;
      }
    },
  };
};
```

**Grenzwert:** `< 55 FPS` (Zeile 203)

---

### 6. The Golden Core Rule (Skill Merge Governance)

**Quelle:** [`.knowledge/archive/vault-analysis/core/integration-protocol.md`](.knowledge/archive/vault-analysis/core/integration-protocol.md:9-17)
**Typ:** GOVERNANCE_RULE
**Skill-Check:** [x] NEIN (Meta-Governance)

**Kontext:**
Die "Golden Core Rule" definiert den Umgang mit dem bestehenden Remotion Global Skill (`remotion-best-practices`). Dieser ist **UNTOUCHABLE** und niemals zu überschreiben.

**Regel:**
> The existing Remotion Global Skill (`remotion-best-practices`) is **UNTOUCHABLE**.

**Decision Matrix:**
| Bedingung | Aktion |
|-----------|--------|
| Identisch mit Core Skill | **REJECT** (Duplicate) |
| Schlechter als Core Skill | **REJECT** |
| Besser als Core Skill | **FLAG** for Human Review |
| Nie automatisch überschreiben | **NEVER** |

**Snippet Extraction Rule (Z. 36-43):**
```
Do not import giant files. Extract only the unique value:
1. Scan for Code Blocks.
2. Compare block against Core.
3. If new: Extract to micro-file (e.g., `chromatic-aberration.md`).
4. Discard boilerplate text.
```

---

### 7. Cloud Rendering Tiers (Lambda Cost Calculator)

**Quelle:** [`Remotion Recherche/60-cloud-rendering-00-aws-lambda-renderfarming.md`](Remotion Recherche/60-cloud-rendering-00-aws-lambda-renderfarming.md:172-216)
**Typ:** SYSTEM_ARCH
**Skill-Check:** [x] NEIN (Nicht in `remotion-core`)

**Kontext:**
Viron-spezifische Kostenkalkulation für AWS Lambda Render-Farming mit 4 definierten Qualitätsstufen.

**Tier-Tabelle (1 Minute @ 30 FPS):**

| Tier | CRF | Workers | Lambdas | Cost |
|------|-----|---------|---------|------|
| **Draft** | 28 | 4 | 1 | $0.10 |
| **Standard** | 20 | 8 | 4 | $0.50 |
| **High** | 16 | 16 | 8 | $1.20 |
| **Ultra** | 10 | 32 | 16 | $2.80 |

**Code:**
```typescript
interface RenderConfig {
  quality: 'draft' | 'standard' | 'high' | 'ultra';
  workers: number;
  estimatedCost: string;
}

const getRenderConfig = (duration: number, quality: 'draft' | 'standard' | 'high' | 'ultra'): RenderConfig => {
  const configs = {
    draft: { crf: 28, workers: 4, estimatedCost: '$0.10' },
    standard: { crf: 20, workers: 8, estimatedCost: '$0.50' },
    high: { crf: 16, workers: 16, estimatedCost: '$1.20' },
    ultra: { crf: 10, workers: 32, estimatedCost: '$2.80' }
  };
  return configs[quality];
};
```

---

### 8. Hybrid Render Mode Selector

**Quelle:** [`Remotion Recherche/60-cloud-rendering-00-aws-lambda-renderfarming.md`](Remotion Recherche/60-cloud-rendering-00-aws-lambda-renderfarming.md:345-391)
**Typ:** SYSTEM_ARCH
**Skill-Check:** [x] NEIN (Viron-spezifisch)

**Kontext:**
Intelligent Routing zwischen Local, Lambda und Render Farm basierend auf Duration und Quality.

**Code:**
```typescript
// smart-render-orchestrator.ts

enum RenderMode {
  LOCAL = 'local',
  LAMBDA = 'lambda',
  RENDER_FARM = 'render-farm'
}

const selectRenderMode = async (
  durationSeconds: number,
  quality: string
): Promise<RenderMode> => {
  // Local: Schnelle Previews (<30 Sekunden)
  if (durationSeconds < 30 && quality === 'draft') {
    return RenderMode.LOCAL;
  }
  
  // Lambda: Standard Production (<10 Minuten, High Quality)
  if (durationSeconds < 600 && quality !== 'ultra') {
    const cost = estimateLambdaCost(durationSeconds, quality);
    if (cost < 5) {
      return RenderMode.LAMBDA;
    }
  }
  
  // Render Farm: Massive Jobs, Ultra Quality
  return RenderMode.RENDER_FARM;
};
```

---

### 9. The 7 Departments (Access Control Architecture)

**Quelle:** [`Remotion Recherche/22_SYSTEM_PLAN_Folder_Structure.md`](Remotion Recherche/22_SYSTEM_PLAN_Folder_Structure.md:20-207)
**Typ:** SYSTEM_ARCH
**Skill-Check:** [x] NEIN (Viron-eigenes System)

**Kontext:**
Viron organisiert Code in 7 strikt getrennte Departments mit definierten Access-Control-Regeln.

**Department-Tabelle:**

| Department | Pfad | Verantwortung | Lazy-Load |
|------------|------|---------------|-----------|
| **DEPT_CORE_ENGINE** | `knowledge/engine/` | Look & Physics, Theme, 3D | Nein |
| **DEPT_VIDEO** | `knowledge/video/` | Remotion Framework, Sequencing | Nein |
| **DEPT_RENDER** | `knowledge/render/` | Encoding, Codecs, Lambda | Nein |
| **DEPT_AUDIO** | `knowledge/audio/` | FFT, Processing, Auphonic | Nein |
| **DEPT_OPS** | `knowledge/ops/` | Workflow, Recovery, Meta | Nein |
| **DEPT_WEB** | `knowledge/web/` | Headless, Design Extraction | Nein |
| **DEPT_AUTOMATION** | `knowledge/automation/` | APIs, Supabase, MCP | **Ja** |

**Access-Control Matrix:**
| Quelle → Ziel | Erlaubt? | Regel |
|---------------|----------|-------|
| ENGINE → VIDEO | ✅ | VIDEO braucht Theme/Tokens |
| ENGINE → AUDIO | ✅ | AUDIO braucht Timing |
| WEB → ENGINE | ⚠️ Nur Tokens | Design-Token-Export |
| AUTOMATION → * | ❌ Nur bei Demand | Context-Bloat vermeiden |

---

### 10. Input Type Detection Algorithm

**Quelle:** [`Remotion Recherche/23_ROUTING_MATRIX_Inputs.md`](Remotion Recherche/23_ROUTING_MATRIX_Inputs.md:24-227)
**Typ:** SYSTEM_ARCH
**Skill-Check:** [x] NEIN (Viron-spezifisch)

**Detection Logic:**
```typescript
def detect_input_type(input_obj):
    if isinstance(input_obj, str):
        if input_obj.startswith(('http://', 'https://')):
            return 'WEBSITE_URL'
        elif '@' in input_obj and '://' in input_obj:
            return 'DATABASE_CONNECTION'
    
    if os.path.isfile(input_obj):
        ext = os.path.splitext(input_obj)[1].lower()
        if ext in ['.mp4', '.mov', '.avi', '.webm']:
            return 'VIDEO_FILE'
        elif ext in ['.wav', '.mp3', '.aac', '.flac']:
            return 'AUDIO_FILE'
        elif ext in ['.json', '.ts']:
            if is_transcript_json(input_obj):
                return 'TRANSCRIPT_JSON'
            elif is_token_json(input_obj):
                return 'DESIGN_TOKENS_JSON'
        elif ext in ['.glb', '.gltf', '.fbx', '.obj']:
            return '3D_MODEL_ASSET'
    
    return 'UNKNOWN'
```

---

### 11. Output Specs Matrix (SHORT vs SHOWCASE vs PRODUCTION)

**Quelle:** [`Remotion Recherche/24_ROUTING_MATRIX_Outputs.md`](Remotion Recherche/24_ROUTING_MATRIX_Outputs.md:21-296)
**Typ:** SYSTEM_ARCH
**Skill-Check:** [x] NEIN (Viron-spezifisch)

**Spezifikationen:**

| Typ | Resolution | Codec | Bitrate | FPS | Audio LUFS | Context Budget |
|-----|------------|-------|---------|-----|------------|----------------|
| **SHORT** | 1080×1920 | h264 | 3-5 Mbps | 30 | -16 | 40% |
| **SHOWCASE** | 1920×1080 | h264/ProRes | 8-15 Mbps | 30/60 | -14 | 50% |
| **EXPLAINER** | 1920×1080 | h264 | 5-8 Mbps | 30 | -16 | 65% |
| **PRODUCTION** | 3840×2160 | ProRes422HQ | 50-100 Mbps | 24/30 | -14/-18 | 50% |
| **AD_COMMERCIAL** | 1080×1920 | h264 | 5-8 Mbps | 30 | -14 | 60% |

---

### 12. Context Budget Rules

**Quelle:** [`Remotion Recherche/23_ROUTING_MATRIX_Inputs.md`](Remotion Recherche/23_ROUTING_MATRIX_Inputs.md:386-392)
**Typ:** SYSTEM_CONFIG
**Skill-Check:** [x] NEIN (Viron-spezifisch)

**Regeln:**
- **Mindestens:** Canon + 1-2 Departments (nie "alles")
- **Maximum:** 50% des Kontext-Budgets
- **Lazy-Load:** AUTOMATION department wird NUR geladen, wenn Flags es erlauben (`--enable-firecrawl`, etc.)

---

## 🗑️ VERWORFEN (Skill-Redundanzen)

| Fund | Quelle | Skill-Konflikt | Entscheidung |
|------|--------|----------------|--------------|
| Basic `durationInFrames` | `pipeline.md` Z. 39-49 | `rules/trimming.md` | ❌ DROP |
| `getInputProps()` Pattern | `pipeline.md` Z. 64-71 | `rules/parameters.md` | ❌ DROP |
| Lambda `renderMedia` API | `pipeline.md` Z. 77-108 | `remotion-core` | ❌ DROP (Basic) |
| ESLint Config | `workflow.md` Z. 61-81 | Standard Next.js | ❌ DROP |
| Prettier Config | `workflow.md` Z. 47-59 | Standard Config | ❌ DROP |
| VS Code Settings | `workflow.md` Z. 9-44 | IDE-Standard | ❌ DROP |
| TypeScript `useVideoConfig()` | `FEHLERLOSUNG` Z. 201-213 | `remotion-core` | ❌ DROP |
| `Sequence` Timing Erklärung | `FEHLERLOSUNG` Z. 261-297 | `rules/sequencing.md` | ❌ DROP |
| **Standard `<Sequence>` Trimming** | **Global Skill** | **`rules/trimming.md`** | **❌ DROP** |

**Hinweis zu `trimming.md`:**
Der Global Skill `trimming.md` enthält Standard-Remotion-Sequencing:
- `<Sequence from={-0.5 * fps}>` - Trim beginning (negative offset)
- `<Sequence durationInFrames={1.5 * fps}>` - Trim end
- Nested sequences für kombinierte Trimming-Operationen

Dies ist **Core-Remotion-Funktionalität** (nicht Viron-spezifisch) und bereits in `remotion-best-practices/rules/trimming.md` dokumentiert.

---

## 🎯 FORENSIC ANSWERS (Fragen A-D)

### A. Concurrency Calculator
**Formel:** `Math.min(floor(CPUs × 1.5), floor(RAM_GB ÷ 2), 16)`
**RAM-Teiler:** 2
**Härteres Limit:** RAM (bei durchschnittlichen Workstations)

### B. Git Flow & Release
**4 Branch-Typen:**
1. `release/v{major}.{minor}.{patch}`
2. `feature/{description}`
3. `bugfix/{description}`
4. `chore/{description}`

**Release Schema:** `release/v1.0.0`

### C. Sync Error Tolerance
**Toleranz:** > 2 Frames
**If-Condition:** `if (Math.abs(expectedFrames - actualFrames) > 2)`
**Quelle:** `troubleshooting.md` Z. 177

### D. The Golden Core Rule
**Regel:** `remotion-best-practices` ist **UNTOUCHABLE**
**Bei identischem Inhalt:** **REJECT**
**Bei besserem Inhalt:** **FLAG** for Human Review
**Niemals:** Automatisch überschreiben

---

## 🏁 FAZIT

Badge 7 enthält kritisches "Betriebssystem-Wissen":

1. **System-Level Formeln** (Concurrency, Context Budgets)
2. **Governance-Regeln** (Git-Flow, Golden Core Rule)
3. **Architektur-Strukturen** (7 Departments, Routing Matrix)
4. **Business-Logik** (Cloud Tiers, Lambda Costs)

Alle gefundenen "Smoking Guns" wurden mit exakten Zeilennummern und Code-Snippets dokumentiert. Die verworfenen Items sind klare Redundanzen zum `remotion-core` Skill.

**Extrahierte Unique IP:** 12 System-Architektur-Bausteine
**Verworfen:** 8 Redundanzen
**Status:** ✅ MISSION COMPLETE
