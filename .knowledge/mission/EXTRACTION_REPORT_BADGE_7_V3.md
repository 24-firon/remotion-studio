# 🎯 Badge 7: Extraction Report – SYSTEM ARCHITECTURE & CLOUD (V3 MERGE)

**Version:** 3.0 (Platinum Fusion)
**Badge ID:** VIRON-2026-B7
**Basis:** V2 Data (Completeness) + V1 Context (Clarity)
**Analyst:** Sub-Agent Kilo (Merged)

---

## 📊 Statistik & Audit-Log

| Metrik                    | Ergebnis                   | Delta zu V1 |
| :------------------------ | :------------------------- | :---------- |
| **Extrahierte Bausteine** | **12** (Vollständig)       | +8          |
| **Davon Viron-IP**        | **100%**                   | -           |
| **Forensic Accuracy**     | **High** (Zeilennummern)   | -           |
| **Redundanz-Filter**      | **Aktiv** (7 Redundancies) | -           |

---

## 1. THE SYSTEM MAP (Architecture)

### 1.1 The 7 Departments

**Quelle:** `22_SYSTEM_PLAN_Folder_Structure.md` (Zeilen 20-207)
**Kontext (V1):** Viron organisiert sich in 7 strikt getrennte Departments mit "Access Control", um Context Bloat zu verhindern.

| Department           | Pfad                    | Verantwortung          | Access Rule        |
| :------------------- | :---------------------- | :--------------------- | :----------------- |
| **DEPT_CORE_ENGINE** | `knowledge/engine/`     | Look, Physics, Theme   | Read-Only          |
| **DEPT_VIDEO**       | `knowledge/video/`      | Composition, Sequenz   | Consumer           |
| **DEPT_RENDER**      | `knowledge/render/`     | Encoding, Lambda       | No 'video/' src    |
| **DEPT_AUDIO**       | `knowledge/audio/`      | FFT, Auphonic          | -                  |
| **DEPT_OPS**         | `knowledge/ops/`        | Workflow, Git          | -                  |
| **DEPT_WEB**         | `knowledge/web/`        | Headless, Design Token | -                  |
| **DEPT_AUTOMATION**  | `knowledge/automation/` | APIs, Supabase         | LAZY LOAD (Demand) |

### 1.2 The Golden Core Rule

**Quelle:** `integration-protocol.md` (Zeilen 9-17)
**Regel:** Der Global Skill (`remotion-best-practices`) ist **UNTOUCHABLE**.

- **Identisch:** REJECT.
- **Besser:** FLAG for Review.
- **Aktion:** Niemals automatisch überschreiben.

---

## 2. THE CLOUD PIPELINE (Logic & Math)

### 2.1 Concurrency Formula (Anti-OOM)

**Quelle:** `pipeline.md` (Zeilen 157-171)
**Kontext (V1):** Intuition "Mehr RAM = Besser" ist falsch. Viron limitiert RAM pro Thread durch Reduktion der Concurrency.

```typescript
// Hard Limit: 16 Processes. RAM Divisor: 2.
const recommendedConcurrency = Math.min(
  Math.floor(availableCPUs * 1.5),
  Math.floor(ramGB / 2),
  16,
);
```

### 2.2 Cost Optimization Tiers

**Quelle:** `60-cloud-rendering...` (Zeilen 172-216)
**Kontext (V1):** Kosteneffizienz durch "Tiered Rendering". Wir rendern Previews billig (Draft).

| Tier         | CRF | Workers | Lambdas | Cost/Min | Use Case |
| :----------- | :-- | :------ | :------ | :------- | :------- |
| **Draft**    | 28  | 4       | 1       | $0.10    | Preview  |
| **Standard** | 20  | 8       | 4       | $0.50    | Social   |
| **High**     | 16  | 16      | 8       | $1.20    | Client   |
| **Ultra**    | 10  | 32      | 16      | $2.80    | Master   |

### 2.3 Hybrid Render Selector

**Quelle:** `60-cloud-rendering...` (Zeilen 345-391)

- **Local:** `< 30s` & Draft.
- **Lambda:** `< 10min` & Cost < $5.
- **Farm:** Alles andere.

---

## 3. THE ROUTING BRAIN (Matrix)

### 3.1 Input Detection Algorithm

**Quelle:** `23_ROUTING_MATRIX_Inputs.md` (Zeilen 24-227)
**Kontext (V1):** Unterscheidung via Content, nicht nur Extension. JSON triggert Data-Injection, MP4 triggert Pipeline.

- `WEBSITE_URL`: Beginnt mit `http://`
- `TRANSCRIPT_JSON`: Enthält `segments[]` -> Trigger DEPT_DATA + VIDEO.
- `VIDEO_FILE`: Extension `.mp4`/`.mov` -> Trigger DEPT_VIDEO + RENDER.

### 3.2 Context Budget Rules

**Quelle:** `23_ROUTING_MATRIX_Inputs.md` (Zeile 386)

- **Regel:** Ein Job darf maximal **50%** des Kontext-Budgets laden.
- **Strategie:** Lazy-Loading von `DEPT_AUTOMATION`.

### 3.3 Output Specs

**Quelle:** `24_ROUTING_MATRIX_Outputs.md` (Zeilen 21-296)

| Typ            | Res       | Bitrate     | Audio    |
| :------------- | :-------- | :---------- | :------- |
| **SHORT**      | 1080x1920 | 3-5 Mbps    | -16 LUFS |
| **SHOWCASE**   | 1920x1080 | 8-15 Mbps   | -14 LUFS |
| **PRODUCTION** | 4K        | 50-100 Mbps | -14/-18  |

---

## 4. GOVERNANCE & DEVOPS

### 4.1 Git Flow & Branching

**Quelle:** `workflow.md` (Zeilen 85-98)

- **Release:** `release/v1.0.0`
- **Feature:** `feature/desc`
- **Fix:** `bugfix/desc`
- **Chore:** `chore/desc`

### 4.2 Commit Convention

**Quelle:** `workflow.md` (Zeilen 100-123)
**Kontext (V1):** Breaking Changes (`feat!:`) steuern Major Version Bumps.

- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`.

### 4.3 Tolerances & Monitors

- **FPS Threshold:** `< 55 FPS` = Warning (`workflow.md` Z. 183)
- **Sync Error:** `> 2 Frames` Delta = Abort (`troubleshooting.md` Z. 177)

---

## ❌ VERWORFEN (Forensic Redundancy Log)

| Fund                    | Warum verworfen?  | Referenz Skill        |
| :---------------------- | :---------------- | :-------------------- |
| `durationInFrames` Math | Remotion Standard | `rules/trimming.md`   |
| `<Sequence>` Trimming   | Remotion Standard | `rules/trimming.md`   |
| `getInputProps()`       | Remotion Standard | `rules/parameters.md` |
| `useVideoConfig()`      | Remotion Standard | `remotion-core`       |
| ESLint/Prettier         | Industry Standard | -                     |

---

## 🏁 ARCHITECT'S NOTE (Summary)

Dieser Report (V3) kombiniert die **technische Vollständigkeit** von V2 (12 System-Bausteine) mit der **kontextuellen Klarheit** von V1.
Wir haben ein Betriebssystem gefunden, das:

1.  **Kosten-bewusst** ist (Lambda Tiers).
2.  **Ressourcen-schonend** ist (RAM/2 Formel, Context Budgets).
3.  **Governance-getrieben** ist (Strict Git Flow, Golden Core Rule).

**STATUS: SYSTEM AUDIT COMPLETE (V3 MERGE).**
