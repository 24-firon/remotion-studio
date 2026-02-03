# SYSTEM_PLAN_FOLDER_STRUCTURE.md
## Master Map der Viron Disk-Architektur

**Status:** REFERENCE BLUEPRINT | MASTER PLAN  
**Erstellt:** 2026-01-29  
**Für:** IDE-Agent Migration + Department Structure  
**Kategorie:** System Organization | Architecture | Automation  

---

## 🎯 Mission

Diese Datei ist das **Schaltplan** für den Agenten. Sie definiert:
1. Die **7 Departments** (Zugriffsschubladen).
2. Wie deine ~30 Uploads + 7 neue Dateien **genau** aufgeteilt werden.
3. Strikte **Access-Control-Regeln** (Department A darf nicht auf Department B zugreifen).

---

## 1️⃣ Die 7 Departments (Unverrückbar)

### DEPT_CORE_ENGINE (Look & Physics)
**Verantwortung:** Visuelle Weltregeln, 3D-Grundlagen, Theme/Tokens, alles über "wie sieht es aus".

**Struktur:**
```
knowledge/engine/
├── core/
│   ├── VIRON_SYSTEM_ENTRY.md (Immutable Physics, Tech-Stack, Einstieg)
│   ├── theme.md (Design Tokens, Farben, Typographie, Spacing)
│   ├── physics.md (Spring-Animationen, Timing, Easing)
│   └── PATTERN_Advanced_Shaders.md (WebGL, PBR, CSM)
├── visuals/
│   ├── PATTERN_LIGHTING_GRADIENTS.md
│   ├── PATTERN_Viron_Hard_Won_Knowledge.md
│   └── GUIDE_Viron_Button_Stack.md
└── 3d/
    ├── whiteboard-concept.md
    └── vision.md
```

**Files (Alte Uploads):** `physics.md`, `theme.md`, `PATTERN_Advanced_Shaders.md`, `PATTERN_LIGHTING_GRADIENTS.md`, `whiteboard-concept.md`, `vision.md`, `GUIDE_Viron_Button_Stack.md`, `PATTERN_Viron_Hard_Won_Knowledge.md`.

**Neue Dateien:** (keine – Engine ist Legacy-Domäne)

**Access-Control:** 
- ✅ Darf gelesen werden von: VIDEO, RENDER, AUDIO.
- ❌ Darf NICHT lesen: WEB (nur über vermittelten Token-Export).

---

### DEPT_VIDEO (Remotion Framework)
**Verantwortung:** Video-Komposition, Komponenten, Remotion-Hooks, Frame-basierte Logik.

**Struktur:**
```
knowledge/video/
├── remotion-core/
│   ├── documentation_manifest.md (9 Module, v2 Frame-Basis)
│   ├── pipeline.md (Aufbau der Comp, Struktur)
│   ├── workflow.md (Wie man eine Comp schreibt)
│   └── Remotion-Setup.md.txt (Workflow 1 & 2, Praktische Examples)
├── captions/
│   └── 18_ARCHIVE_Standard_Caption_Engine.md (Neon Typography, React/Remotion)
└── sequencing/
    └── sync-strategies.md
```

**Files (Alte Uploads):** `documentation_manifest.md`, `pipeline.md`, `workflow.md`, `sync-strategies.md`.

**Neue Dateien:** `18_ARCHIVE_Standard_Caption_Engine.md`.

**Access-Control:**
- ✅ Darf gelesen von: RENDER, AUDIO, OPS.
- ✅ Darf lesen: ENGINE (für Tokens).

---

### DEPT_RENDER (Production Rendering)
**Verantwortung:** Encoding, Codecs, Concurrency, Lambda/CI, QA/Validierung.

**Struktur:**
```
knowledge/render/
├── pipeline/
│   └── documentation_manifest.md (Module 05: Rendering Pipeline)
├── troubleshooting/
│   └── troubleshooting.md (Performance, Recovery, Error Handling)
└── deployment/
    ├── LOCAL_SKILL_INVENTORY.txt
    └── PROJECT_RULES.md
```

**Files (Alte Uploads):** `troubleshooting.md`, `LOCAL_SKILL_INVENTORY.txt`, `PROJECT_RULES.md`.

**Neue Dateien:** (keine – alles bestehendes Wissen)

**Access-Control:**
- ✅ Darf lesen von: Alle Departments (Render ist der "letzte Schritt").
- ✅ Darf lesen: ENGINE (für Specs), VIDEO, AUDIO, OPS.

---

### DEPT_AUDIO (Processing & Reactivity)
**Verantwortung:** Audio-Processing, FFT/Reactive Effects, Sync, Auphonic/Whisper Integration.

**Struktur:**
```
knowledge/audio/
├── specs/
│   ├── audio.md (Core Audio Spec)
│   └── camera.md (Motion/Sync Cinematography)
├── processing/
│   ├── 16_ARCHIVE_Standard_Audio_Auphonic.md (Broadcast -16 LUFS)
│   └── 17_ARCHIVE_Standard_AutoEdit_Whisper.md (Transcription, Bad-Takes)
└── reactive/
    └── documentation_manifest.md (Module 06: Audio Reactive Effects)
```

**Files (Alte Uploads):** `audio.md`, `camera.md`.

**Neue Dateien:** `16_ARCHIVE_Standard_Audio_Auphonic.md`, `17_ARCHIVE_Standard_AutoEdit_Whisper.md`.

**Access-Control:**
- ✅ Darf lesen von: VIDEO, RENDER, OPS.
- ✅ Darf lesen: ENGINE (für Timing/Physics).

---

### DEPT_OPS (Workflow & Recovery)
**Verantwortung:** Developer Workflow, Git/Conventions, Debugging, Team Regeln, Agent Philosophy.

**Struktur:**
```
knowledge/ops/
├── workflow/
│   ├── documentation_manifest.md (Module 08: Developer Workflow)
│   ├── HUMAN_OPERATOR_GUIDE.md
│   ├── HANDOVER_RemotionStudio_IDE_Behaviors.md
│   └── PROJECT_RULES.md
├── recovery/
│   ├── troubleshooting.md (Module 09: Fehlerbehandlung)
│   └── 21_ARCHIVE_Standard_Agent_Execution.md (Zero-Touch, Context Hygiene)
└── research/
    ├── RESEARCH_Semantic_Triggers.md
    ├── HISTORY_LOG.md
    └── REPOSITORY_MANIFESTO.md
```

**Files (Alte Uploads):** `HUMAN_OPERATOR_GUIDE.md`, `HANDOVER_RemotionStudio_IDE_Behaviors.md`, `RESEARCH_Semantic_Triggers.md`, `HISTORY_LOG.md`, `REPOSITORY_MANIFESTO.md`.

**Neue Dateien:** `21_ARCHIVE_Standard_Agent_Execution.md`.

**Access-Control:**
- ✅ Darf lesen von: Alle Departments (OPS ist "Meta").
- ✅ Darf lesen: Alles (ist Meta-Layer).

---

### DEPT_WEB (Headless & Web Simulation)
**Verantwortung:** Website-Analyse, Headless Chrome, Design-System Extraction, Web Specs.

**Struktur:**
```
knowledge/web/
├── specs/
│   └── website.md (Web Spec / Headless Chrome)
├── extraction/
│   ├── 19_ARCHIVE_Standard_Design_Extraction_Firecrawl.md (URL → Tokens)
│   └── explainer-pipeline.md
└── resources/
    └── RESOURCES_AND_ECOSYSTEM.md
```

**Files (Alte Uploads):** `website.md`, `explainer-pipeline.md`, `RESOURCES_AND_ECOSYSTEM.md`.

**Neue Dateien:** `19_ARCHIVE_Standard_Design_Extraction_Firecrawl.md`.

**Access-Control:**
- ✅ Darf lesen von: ENGINE (Token-Import), VIDEO, RENDER.
- ✅ Darf lesen: AUDIO/OPS (externe Tools).

---

### DEPT_AUTOMATION (Optional Add-ons)
**Verantwortung:** Externe APIs, Supabase/MCP, Automation Scripts. **NUR laden, wenn Use-Case es verlangt.**

**Struktur:**
```
knowledge/automation/
├── data-driven/
│   └── 20_ARCHIVE_Standard_Dynamic_Data_Supabase.md (MCP, Live Data)
├── utilities/
│   ├── TEMPLATE_FeatureSpec.md
│   ├── LEARNING_IDE_Behavior.md
│   └── SKILL.md
└── market/
    └── market-references.md
```

**Files (Alte Uploads):** `TEMPLATE_FeatureSpec.md`, `LEARNING_IDE_Behavior.md`, `SKILL.md`, `market-references.md`.

**Neue Dateien:** `20_ARCHIVE_Standard_Dynamic_Data_Supabase.md`.

**Access-Control:**
- ✅ Darf lesen von: RENDER, VIDEO, OPS (nur wenn Use-Case es verlangt).
- ⚠️ **Lazy-Load:** Nicht bei Standard-Operationen laden (Context sparen).

---

## 2️⃣ Canon Packs (First-Class Citizens)

Diese Dateien sind **immer geladen** und nicht optional:

### CANON/ENTRY (Master Map)
```
VIRON_SYSTEM_ENTRY.md
├─ Immutable Physics
├─ Tech Stack (R3F v9 + Drei + CSM; Lamina verboten)
├─ Specs Links (Audio, Camera, Web)
└─ Guides Links (Composition Management, Sequencing)
```

**Laden in:** Alle Use-Cases (minimum).

---

### CANON/DOCS (9-Module Database)
```
documentation_manifest.md
├─ 01 System Architecture
├─ 02 Remotion Framework
├─ 03 Next.js Frontend
├─ 04 Metallic Design System
├─ 05 Rendering Pipeline
├─ 06 Audio Processing
├─ 07 Theme System
├─ 08 Developer Workflow
└─ 09 Troubleshooting
```

**Laden in:** Alle Use-Cases (als Nachschlagebasis).

---

### CANON/WORKFLOWS (2 Hauptprozesse)
```
Remotion-Setup.md.txt
├─ Workflow 1: Video → Whisper → Auphonic → Captions → Render
└─ Workflow 2: Website → Design Tokens → Showcase Video
```

**Laden in:** Use-Cases, die diese Workflows nutzen.

---

### CANON/INFRASTRUCTURE (High-End VFX)
```
High-End Visuelle Effekte für Remotion.pdf
├─ WebGL Strategies
├─ React Three Fiber Advanced
├─ Post-Processing
└─ LLM-Steering
```

**Laden in:** Use-Cases mit extremen VFX-Anforderungen (optional, aber kanonisch).

---

## 3️⃣ Migration Datei (Alte Uploads, noch nicht sortiert)

```
_archive/
├─ 00-overview-index.md
├─ image.jpg (x2)
└─ [weitere Assets]
```

Diese Dateien sind **"gesichtet aber noch nicht katalogisiert"**. Der IDE-Agent muss diese einzeln durchgehen und entscheiden: "Gehört das in einen Department oder ist es deprecated?"

---

## 4️⃣ Access-Control Regeln (Kernregeln)

Diese Regeln sichern, dass der Agent **nicht Kontextmüll** sammelt.

| Quelle → Ziel | Erlaubt? | Grund |
|---|---|---|
| ENGINE → VIDEO | ✅ Ja | VIDEO braucht Theme/Tokens |
| ENGINE → AUDIO | ✅ Ja | AUDIO braucht Timing aus Physics |
| AUDIO → VIDEO | ✅ Ja | Sync ist wichtig |
| WEB → ENGINE | ⚠️ Nur Tokens | Design-Token-Export, nicht ganze Module |
| AUTOMATION → * | ❌ Nur bei Demand | Sonst Context-Bloat |
| VIDEO → RENDER | ✅ Ja | RENDER muss Comps verstehen |
| RENDER → OPS | ✅ Ja | OPS muss Recovery-Regeln wissen |
| OPS → * | ✅ Ja | OPS ist Meta |

---

## 5️⃣ File-Mapping (Wo landen die alten Uploads?)

Damit der IDE-Agent genau weiß, wohin jede alte Datei gehört:

| Alte Upload | Department | Ordner | Status |
|---|---|---|---|
| `physics.md` | ENGINE | `core/` | ✅ Zuordnung klar |
| `theme.md` | ENGINE | `core/` | ✅ Zuordnung klar |
| `PATTERN_Advanced_Shaders.md` | ENGINE | `core/` | ✅ Zuordnung klar |
| `camera.md` | AUDIO | `specs/` | ✅ Zuordnung klar |
| `audio.md` | AUDIO | `specs/` | ✅ Zuordnung klar |
| `pipeline.md` | VIDEO | `remotion-core/` | ✅ Zuordnung klar |
| `workflow.md` | VIDEO | `remotion-core/` | ✅ Zuordnung klar |
| `troubleshooting.md` | RENDER + OPS | `recovery/` | ⚠️ Dual-Zuordnung → Strategy? |
| `documentation_manifest.md` | VIDEO (+ CANON) | `remotion-core/` + `_canon/` | ⚠️ Sollte dupliziert? |
| `website.md` | WEB | `specs/` | ✅ Zuordnung klar |
| `sync-strategies.md` | VIDEO | `sequencing/` | ✅ Zuordnung klar |
| `VIRON_SYSTEM_ENTRY.md` | CANON/ENTRY | `_canon/entry/` | ✅ Canon, nicht zuordnen |
| `HUMAN_OPERATOR_GUIDE.md` | OPS | `workflow/` | ✅ Zuordnung klar |
| `RESEARCH_Semantic_Triggers.md` | OPS | `research/` | ✅ Zuordnung klar |
| `00-overview-index.md` | ? | `_unsorted/` | ❓ Manuell prüfen |

---

## 6️⃣ Auftrag an den IDE-Agent

Der Agent macht folgende Schritte:

### Phase 1: Scan & Verify
```
1. Scanne skill/ Verzeichnis.
2. Vergleiche mit dieser File-Mapping-Tabelle.
3. Reporte Diskrepanzen (Dateien, die nicht in der Liste sind).
4. Frage bei Dual-Zuordnungen: "Soll ich duplizieren oder nur linken?"
```

### Phase 2: Create Structure
```
1. Erstelle Ordnerstruktur nach den 7 Departments.
2. Erstelle _canon/ für Canon Packs.
3. Erstelle _unsorted/ für unklare Dateien.
```

### Phase 3: Migrate Files
```
1. Verschiebe Dateien gemäß File-Mapping.
2. Erstelle .gitignore für jeden Department (verhindert Zugriff).
3. Erstelle _DEPARTMENT_README.md in jedem Ordner (Access-Control dokumentieren).
```

### Phase 4: Validate & Report
```
1. Verifiziere: Sind alle Dateien korrekt zugeordnet?
2. Prüfe: Haben sich die Inhalte verändert (Hash-Vergleich)?
3. Erstelle Migrationsprotokoll: migration_log_<date>.md.
```

---

**END OF DATEI 22**

Status: ✅ READY FOR REVIEW | Nächste: Datei 23 (Input Routing), 24 (Output Routing), 25 (Migration Order)
