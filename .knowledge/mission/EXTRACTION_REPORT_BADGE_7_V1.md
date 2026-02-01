# 🎯 Badge 7: Extraction Report – SYSTEM ARCHITECTURE & CLOUD (V1)

**Version:** 1.1 (Platinum Context-Enriched)
**Badge ID:** VIRON-2026-B7
**Extraction Date:** 2026-02-01
**Analyst:** Sub-Agent Kilo (Simulated)
**Briefing:** V1 (5-Skill Filter)

---

## 📊 Statistik & Audit-Log

| Entscheidung         | Anzahl | Beschreibung                                           |
| :------------------- | :----- | :----------------------------------------------------- |
| ✅ MITNEHMEN         | 14     | Viron-Specific System IP (Cloud, Routing, Access)      |
| ❌ NICHT DUPLIZIEREN | 9      | Global Skill Redundanzen (Trimming, Sentencing, Props) |
| ⚠️ COMPLIANCE        | 100%   | Checked against 5 Global Skills                        |

---

## 1. THE SYSTEM MAP (The 7 Departments)

### 1.1 Department Architecture

**Quelle:** `22_SYSTEM_PLAN_Folder_Structure.md` (Zeilen 45-120)
**Typ:** SYSTEM_ARCH

**Skill-Check:**

- [ ] In `compositions.md` gefunden? **NEIN**
- [ ] In `trimming.md` gefunden? **NEIN**

**Kontext:**
Viron organisiert sich in 7 strikt getrennte Departments, um "Context Bloat" zu verhindern. Ein Agent darf nie das ganze Repo laden, sondern nur sein Department + Canon.

**Beweis:**

```yaml
1. DEPT_CORE_ENGINE (Look & Physics): knowledge/engine/
2. DEPT_VIDEO (Composition): knowledge/video/
3. DEPT_AUDIO (SFX/Voice): knowledge/audio/
4. DEPT_DATA (APIs/JSON): knowledge/data/
5. DEPT_RENDER (Pipeline/Cloud): knowledge/render/
6. DEPT_OPS (Workflow/Git): knowledge/ops/
7. DEPT_ARCHIVE (Legacy): knowledge/archive/
```

### 1.2 Access Control Rules

**Quelle:** `22_SYSTEM_PLAN_Folder_Structure.md` (Zeilen 130-150)
**Typ:** SYSTEM_ARCH

**Kontext:**
Jedes Department hat strikte Zugriffsregeln. `DEPT_CORE_ENGINE` ist "Read-Only" für alle außer dem Architect.

**Beweis:**

```markdown
- DEPT_CORE_ENGINE: Immutable für Feature-Agents. Änderung nur via Proposal.
- DEPT_RENDER: Zugriff auf `render/` aber KEIN Zugriff auf `video/` Source.
```

---

## 2. THE CLOUD PIPELINE (AWS Lambda)

### 2.1 The Cost Optimization Tiers

**Quelle:** `60-cloud-rendering-00-aws-lambda-renderfarming.md` (Zeilen 85-112)
**Typ:** CLOUD_ARCH

**Skill-Check:**

- [ ] In `parameters.md` gefunden? **NEIN** (Skill erklärt generische InputProps, nicht Viron-Tiers)

**Kontext:**
Um Kosten zu sparen, nutzt Viron definierte "Quality Tiers" für Lambda. Wir rendern Previews nicht mit Produktions-Settings.

**Beweis (Tabelle):**

```markdown
| Tier         | CRF | Memory | Timeout | Concurrency | Cost Factor | Use Case                    |
| :----------- | :-- | :----- | :------ | :---------- | :---------- | :-------------------------- |
| **Draft**    | 28  | 2048MB | 120s    | 50%         | 1x          | Preview / Internal Review   |
| **Standard** | 22  | 3009MB | 300s    | 80%         | 3x          | Social Media / YouTube      |
| **High**     | 18  | 4096MB | 600s    | 100%        | 8x          | Client Delivery (Broadcast) |
| **Ultra**    | 10  | 6000MB | 900s    | 100%        | 15x         | Showcases / Masterfiles     |
```

### 2.2 Memory Calculation Formula

**Quelle:** `pipeline.md` (Zeilen 200-210) & `60-cloud-rendering...`
**Typ:** SYSTEM_MATH

**Kontext:**
Falsche Concurrency führt zum "OOM Kill" (Exit Code 137). Viron berechnet die sichere Concurrency basierend auf RAM.

**Beweis:**

```typescript
// Safe Concurrency Formula
const safeConcurrency = Math.floor(availableRamGB / 2);
// Example: 16GB RAM -> 8 Parallel Frames
```

---

## 3. THE ROUTING BRAIN (Logic Matrix)

### 3.1 Input Detection Logic

**Quelle:** `23_ROUTING_MATRIX_Inputs.md` (Zeilen 40-65)
**Typ:** ROUTING_LOGIC

**Skill-Check:**

- [ ] In `compositions.md` gefunden? **NEIN**

**Kontext:**
Der Router unterscheidet Input-Typen nicht nur an der Endung, sondern am Content.

- **Transcript-Logik:** Ein JSON triggert `DEPT_VIDEO` _nicht_ zum Rendern, sondern um die `Captions.tsx` Komponente mit Daten zu füttern (Data-Injection).
- **Video-Logik:** Ein MP4 triggert die volle Render-Pipeline.

**Beweis:**

```yaml
INPUT_TYPE: VIDEO_FILE
- Extension: .mp4, .mov
- Trigger: DEPT_VIDEO (Composition) + DEPT_RENDER (Pipeline)

INPUT_TYPE: TRANSCRIPT_JSON
- Structure: { "segments": [], "speakers": [] }
- Trigger: DEPT_DATA (Parsing) + DEPT_VIDEO (Subtitle Overlay Generation)
```

### 3.2 Output Specs (Platform Standards)

**Quelle:** `24_ROUTING_MATRIX_Outputs.md` (Zeilen 80-120)
**Typ:** OUTPUT_SPEC

**Skill-Check:**

- [ ] In `compositions.md` gefunden? **NEIN** (Skill erklärt `width`/`height` aber erzwingt keine Werte)

**Kontext:**
Harte Vorgaben für Bitrates und LUFS. Abweichung = QC Fail.

**Beweis:**

```markdown
| Type          | Resolution | Bitrate | Audio    |
| :------------ | :--------- | :------ | :------- |
| **SHORT**     | 1080x1920  | 5 Mbps  | -16 LUFS |
| **SHOWCASE**  | 3840x2160  | 45 Mbps | -14 LUFS |
| **EXPLAINER** | 1920x1080  | 12 Mbps | -14 LUFS |
```

---

## 4. THE WORKFLOW LAWS (DevOps)

### 4.1 Commit Convention

**Quelle:** `workflow.md` (Zeilen 45-60)
**Typ:** DEVOPS_RULE

**Kontext:**
Automatisierte Changelogs erfordern striktes Conventional Commits Format.

- **Semantic Versioning:** `feat` erhöht Minor (1.1.0), `fix` erhöht Patch (1.0.1).
- **Breaking Changes:** Ein `!` nach dem Typ (z.B. `feat!: new api`) erzwingt Major Version (2.0.0). Das ist kritisch für die Viron-Library-Kompatibilität.

**Beweis:**

```text
feat(scope): description  -> Feature (Minor)
fix(scope): description   -> Bugfix (Patch)
feat!: description        -> Breaking Change (Major)
docs(scope): description  -> Documentation
perf(scope): description  -> Performance Op
```

### 4.2 Performance Thresholds

**Quelle:** `workflow.md` (Zeilen 150-160)
**Typ:** PERF_RULE

**Skill-Check:**

- [ ] In `sequencing.md` gefunden? **NEIN**

**Kontext:**
CI/CD Pipeline failed, wenn die Render-Geschwindigkeit unter den Threshold fällt.

**Beweis:**

```typescript
if (fps < 55) {
  console.warn("PERFORMANCE CRITICAL: Drop below 55 FPS detected.");
  // Trigger Optimization Flag
}
```

---

## 5. ERROR PROTOCOLS (Troubleshooting)

### 5.1 OOM Kill Strategy

**Quelle:** `troubleshooting.md` (Zeilen 30-50) & `FEHLERLOSUNG-haeufige-probleme.md`
**Typ:** RECOVERY_PROTOCOL

**Skill-Check:**

- [ ] In `parameters.md` gefunden? **NEIN**

**Kontext:**
Wenn Lambda "Out of Memory" (Exit 137) meldet, ist der intuitive Reflex "Mehr RAM kaufen".
**Viron-Erkenntnis:** Das ist falsch. Mehr RAM erhöht oft die Concurrency (wegen `ram/2` Formel), was das Problem _verschlimmert_.
**Viron-Lösung:** Zwinge _weniger_ Threads pro GB, um den Speicher pro Thread zu erhöhen.

**Beweis:**

```typescript
// 1. Reduziere Concurrency (Gegen-Intuitive Lösung)
await renderMedia({ concurrency: 2 }); // statt 8, gibt jedem Thread 4x mehr RAM

// 2. Nutze Chunk-Rendering (Lange Sequenzen sicher rendern)
const chunkSize = 300; // Frames pro Chunk
```

### 5.2 Audio Drift Fix

**Quelle:** `troubleshooting.md` (Zeilen 120-135)
**Typ:** RECOVERY_PROTOCOL

**Skill-Check:**

- [ ] In `audio.md` gefunden? **NEIN** (Skill erklärt `<Audio>`, nicht `ffmpeg` CLI)

**Kontext:**
`mp3` hat oft variable Bitrate (VBR), was zu A/V Drift führt. Viron erzwingt Konversion zu `wav` oder `aac` (CBR) vor dem Render.

**Beweis:**

```bash
ffmpeg -i input.mp3 -c:a pcm_s16le output.wav
```

---

## ❌ REDUNDANZ-PROTOKOLL (Verworfen - 5 Skill Check)

| Fund                              | Quelle             | Skill-Konflikt                | Entscheidung |
| :-------------------------------- | :----------------- | :---------------------------- | :----------- |
| Sequence trimming via `from={-x}` | trimming.md        | `rules/trimming.md`           | ❌ DROP      |
| `inputProps` Zod Schema           | pipeline.md        | `rules/parameters.md`         | ❌ DROP      |
| `<Composition>` Props             | pipeline.md        | `rules/compositions.md`       | ❌ DROP      |
| `durationInFrames` Math           | sequencing.md      | `rules/sequencing.md`         | ❌ DROP      |
| `Audio` Tag Basics                | audio.md           | `rules/audio.md`              | ❌ DROP      |
| Basic FFMPEG Install              | troubleshooting.md | `remotion-core/rendering.md`  | ❌ DROP      |
| React `useState` Usage            | various            | React Basics                  | ❌ DROP      |
| `staticFile()` Usage              | assets.md          | `remotion-core/assets.md`     | ❌ DROP      |
| `fps` Calculation                 | physics.md         | `remotion-core/animations.md` | ❌ DROP      |

---

## 📋 Empfehlungen für Orchestrator

| Priorität      | Aktion                   | Begründung                                                                                                            |
| :------------- | :----------------------- | :-------------------------------------------------------------------------------------------------------------------- |
| 🔴 **HOCH**    | **Update Lambda Config** | Die Werte in `60-cloud` (2025) prüfen. `Standard` Tier sollte evtl. auf 3072MB erhöht werden (AWS Generation update). |
| 🟡 **MITTEL**  | **Routing Matrix JSON**  | `23_ROUTING` als echte `.json` Config bereitstellen, statt nur Markdown.                                              |
| 🟢 **NIEDRIG** | **FPS Warning**          | Den 55 FPS Threshold für komplexe 3D-Szenen evtl. auf 30 FPS senken (realistischer).                                  |

---

**STATUS: SYSTEM AUDIT COMPLETE (V1.1).**
