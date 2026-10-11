# ROUTING_MATRIX_INPUTS.md
## Input-Klassifikation & Department-Loading

**Status:** REFERENCE ROUTING | DECISION ENGINE  
**Erstellt:** 2026-01-29  
**Für:** IDE-Agent Input-Detection  
**Kategorie:** Agent Logic | Input Classification  

---

## 🎯 Mission

Diese Datei definiert: **Wenn ein Agent einen Input sieht → welche Departments laden?**

Das ist der erste Schritt der Use-Case-Erkennung. Der Agent prüft:
1. **Input-Typ erkennen** (Dateiendung, Struktur, Metadaten).
2. **Departments bestimmen** (welche Module sind relevant?).
3. **Load-Paket zusammenstellen** (welche konkreten Dateien lesen?).

---

## 1️⃣ Input-Typen & Routing-Logic

### INPUT_TYPE: VIDEO_FILE
**Erkennung:**
- Dateiendung: `.mp4`, `.mov`, `.avi`, `.webm`
- Oder: Mediafile mit Video-Stream (ffprobe check)

**Departments (Reihenfolge):**
1. DEPT_VIDEO (Komposition, Rendering)
2. DEPT_RENDER (Codec, Bitrate, Performance)
3. DEPT_OPS (Workflow, Logging)

**Load-Paket (minimal):**
```yaml
Canon:
  - VIRON_SYSTEM_ENTRY.md
  - documentation_manifest.md (Scenario 2: Video mit Audio)

Departments:
  - VIDEO/remotion-core/pipeline.md
  - VIDEO/remotion-core/workflow.md
  - RENDER/pipeline/documentation_manifest.md (Module 05)
  - OPS/workflow/HUMAN_OPERATOR_GUIDE.md

Optional (bei Demand):
  - AUDIO/processing/17_ARCHIVE_Standard_AutoEdit_Whisper.md (wenn --enable-autoedit flag)
  - VIDEO/captions/18_ARCHIVE_Standard_Caption_Engine.md (wenn --add-captions flag)
  - AUDIO/processing/16_ARCHIVE_Standard_Audio_Auphonic.md (wenn --broadcast-audio flag)
```

**Workflow-Referenz:** Remotion-Setup.md.txt → Workflow 1 (Video → Whisper → Auphonic → Captions → Render).

---

### INPUT_TYPE: AUDIO_FILE
**Erkennung:**
- Dateiendung: `.wav`, `.mp3`, `.aac`, `.flac`, `.m4a`
- Oder: Audiofile (ffprobe check, kein Video-Stream)

**Departments (Reihenfolge):**
1. DEPT_AUDIO (Processing, FFT, Sync)
2. DEPT_VIDEO (Reactive Components)
3. DEPT_RENDER (Output)

**Load-Paket (minimal):**
```yaml
Canon:
  - VIRON_SYSTEM_ENTRY.md
  - documentation_manifest.md (Scenario 2: Audio mit Reactive)

Departments:
  - AUDIO/specs/audio.md
  - AUDIO/processing/16_ARCHIVE_Standard_Audio_Auphonic.md (bei --normalize flag)
  - VIDEO/remotion-core/documentation_manifest.md (Module 06: Audio Reactive)
  - RENDER/pipeline/documentation_manifest.md (Module 05)

Optional:
  - AUDIO/reactive/documentation_manifest.md (Module 06, bei --reactive flag)
```

**Workflow-Referenz:** documentation_manifest.md → Scenario 2: "Audio mit Audio-Effekten".

---

### INPUT_TYPE: TRANSCRIPT_JSON
**Erkennung:**
- Dateiendung: `.json`
- JSON-Struktur: `{ segments: [ { words: [ { word, start, end } ] } ] }`
- Source: Whisper Output oder ähnlich

**Departments (Reihenfolge):**
1. DEPT_VIDEO (Caption-Komponenten)
2. DEPT_RENDER (Output)

**Load-Paket (minimal):**
```yaml
Canon:
  - VIRON_SYSTEM_ENTRY.md
  - documentation_manifest.md

Departments:
  - VIDEO/captions/18_ARCHIVE_Standard_Caption_Engine.md (Chunk-Logik, React)
  - ENGINE/core/theme.md (Farben: #BFF549, Font, Styling)
  - RENDER/pipeline/documentation_manifest.md (Module 05)
```

**Notiz:** Transcript wird meist mit Video kombiniert (siehe INPUT_COMBINATION weiter unten).

---

### INPUT_TYPE: WEBSITE_URL
**Erkennung:**
- String startet mit `http://` oder `https://`
- Oder: Expliziter Flag `--url`

**Departments (Reihenfolge):**
1. DEPT_WEB (Headless Chrome, Extraction)
2. DEPT_ENGINE (Theme/Tokens, Design System)
3. DEPT_VIDEO (Showcase Rendering)
4. DEPT_RENDER (Output)

**Load-Paket (minimal):**
```yaml
Canon:
  - VIRON_SYSTEM_ENTRY.md
  - documentation_manifest.md (Scenario 3: Website Design System)
  - Remotion-Setup.md.txt (Workflow 2: Website → Tokens → Video)

Departments:
  - WEB/specs/website.md (Headless Chrome Basics)
  - WEB/extraction/19_ARCHIVE_Standard_Design_Extraction_Firecrawl.md (URL → Tokens)
  - ENGINE/core/theme.md (Token-Integration)
  - VIDEO/remotion-core/documentation_manifest.md (Module 02, 07)
  - RENDER/pipeline/documentation_manifest.md (Module 05)

Optional:
  - AUTOMATION/data-driven/* (falls Firecrawl selbst integriert sein soll, bei --use-firecrawl flag)
```

**Workflow-Referenz:** Remotion-Setup.md.txt → Workflow 2.

---

### INPUT_TYPE: DESIGN_TOKENS_JSON
**Erkennung:**
- Dateiendung: `.json` oder `.ts`
- JSON-Struktur: `{ colors: { ... }, typography: { ... }, spacing: { ... } }`
- Keys erkannt: `colors`, `typography`, `spacing`, `borderRadius`, `shadows`

**Departments (Reihenfolge):**
1. DEPT_ENGINE (Token Interpretation)
2. DEPT_VIDEO (Showcase/Komponenten)
3. DEPT_RENDER (Output)

**Load-Paket (minimal):**
```yaml
Canon:
  - VIRON_SYSTEM_ENTRY.md (Theme Prinzipien)
  - documentation_manifest.md (Module 07: Theme System)

Departments:
  - ENGINE/core/theme.md (Token-Validation & Integration)
  - VIDEO/remotion-core/pipeline.md (Comp-Aufbau)
  - RENDER/pipeline/documentation_manifest.md (Module 05)

Optional:
  - ENGINE/core/PATTERN_Advanced_Shaders.md (falls Custom Shaders nötig)
```

---

### INPUT_TYPE: DATABASE_CONNECTION
**Erkennung:**
- Connection String (Supabase, PostgreSQL, etc.)
- Oder: Flag `--source db` + credentials

**Departments (Reihenfolge):**
1. DEPT_AUTOMATION (Data Tools, MCP)
2. DEPT_VIDEO (Rendering)
3. DEPT_RENDER (Output)
4. DEPT_OPS (Logging, Recovery)

**Load-Paket (minimal):**
```yaml
Canon:
  - VIRON_SYSTEM_ENTRY.md
  - documentation_manifest.md (Module 01: Architektur)

Departments:
  - AUTOMATION/data-driven/20_ARCHIVE_Standard_Dynamic_Data_Supabase.md (MCP, Live Data)
  - VIDEO/remotion-core/documentation_manifest.md (Module 02)
  - RENDER/pipeline/documentation_manifest.md (Module 05)
  - OPS/recovery/21_ARCHIVE_Standard_Agent_Execution.md (Zero-Touch, Error Handling)
```

**Notiz:** Database ist **"stateless"** – der Agent liest Daten beim Render-Start, nicht vorher.

---

### INPUT_TYPE: 3D_MODEL_ASSET
**Erkennung:**
- Dateiendung: `.glb`, `.gltf`, `.fbx`, `.obj`
- Oder: Expliziter Flag `--model-file`

**Departments (Reihenfolge):**
1. DEPT_ENGINE (Physics, Materials)
2. DEPT_VIDEO (Rendering in Comp)
3. DEPT_RENDER (Output)

**Load-Paket (minimal):**
```yaml
Canon:
  - VIRON_SYSTEM_ENTRY.md (Immutable Physics, PBR)
  - documentation_manifest.md

Departments:
  - ENGINE/core/physics.md (Spring Animations, Easing)
  - ENGINE/core/PATTERN_Advanced_Shaders.md (Material System, PBR)
  - VIDEO/remotion-core/documentation_manifest.md (Module 02)
  - RENDER/pipeline/documentation_manifest.md (Module 05)

Optional:
  - ENGINE/3d/vision.md (Design Intention)
  - High-End Visuelle Effekte für Remotion.pdf (bei extremen VFX)
```

---

## 2️⃣ Input-Kombinationen (Multi-Source)

Oft kommt ein Request mit **mehreren Inputs**. Der Agent muss **Union** der Departments bilden (aber dedup nicht).

### COMBO: VIDEO_FILE + AUDIO_FILE
**Pattern:** User hat Rohvideo und separaten Audio-Track.
**Beispiel:** `--input video.mp4 --audio voiceover.wav`

**Departments (Union):**
- DEPT_VIDEO (Video)
- DEPT_AUDIO (Audio Processing + Sync)
- DEPT_RENDER (Output)

**Load-Paket:**
```yaml
Canon:
  - VIRON_SYSTEM_ENTRY.md
  - documentation_manifest.md

Departments (Union):
  - VIDEO/remotion-core/* (min)
  - AUDIO/specs/audio.md
  - AUDIO/specs/camera.md (für Sync)
  - AUDIO/processing/16_ARCHIVE_Standard_Audio_Auphonic.md
  - RENDER/pipeline/*
```

**Workflow:** Workflow 1 (Video → Auphonic + Sync).

---

### COMBO: VIDEO_FILE + DESIGN_TOKENS_JSON
**Pattern:** User will Video + darin Custom-Theme integrieren.
**Beispiel:** `--input video.mp4 --theme tokens.json`

**Departments (Union):**
- DEPT_VIDEO (Video)
- DEPT_ENGINE (Tokens)
- DEPT_RENDER (Output)

**Load-Paket:**
```yaml
Canon:
  - VIRON_SYSTEM_ENTRY.md
  - documentation_manifest.md

Departments (Union):
  - ENGINE/core/theme.md (Token-Validation)
  - VIDEO/remotion-core/*
  - RENDER/pipeline/*
```

---

### COMBO: WEBSITE_URL + OUTPUT_FLAG (--output showcase)
**Pattern:** Website analysieren, dann direkt Showcase-Video rendern.
**Beispiel:** `--url https://glaido.com --output showcase --duration 16s`

**Departments (Union):**
- DEPT_WEB (Extraction)
- DEPT_ENGINE (Tokens)
- DEPT_VIDEO (Showcase Comp)
- DEPT_RENDER (Output)

**Load-Paket:**
```yaml
Canon:
  - VIRON_SYSTEM_ENTRY.md
  - documentation_manifest.md
  - Remotion-Setup.md.txt (Workflow 2)

Departments (Union):
  - WEB/extraction/19_ARCHIVE_Standard_Design_Extraction_Firecrawl.md
  - ENGINE/core/theme.md
  - VIDEO/remotion-core/documentation_manifest.md (Module 02, 07)
  - RENDER/pipeline/documentation_manifest.md (Module 05)
```

---

## 3️⃣ Detection-Flowchart (für den Agenten)

```
INPUT empfangen
  ↓
Ist es eine Datei?
  ├─ JA → Prüfe Endung (mp4/wav/json/glb/...)
  │   └─→ Mapping auf INPUT_TYPE
  └─ NEIN → Ist es ein String (URL)?
      ├─ JA → Website URL detected
      │   └─→ INPUT_TYPE: WEBSITE_URL
      └─ NEIN → Ist es Connection String?
          ├─ JA → DATABASE_CONNECTION
          └─ NEIN → ERROR: Unknown Input Type
  
  ↓
INPUT_TYPE determiniert
  ↓
Kombiniert mit OUTPUT_FLAG (falls vorhanden)
  ↓
Department-Union bestimmen
  ↓
Load-Paket zusammenstellen
  ↓
Canon-Packs + Departments laden
```

---

## 4️⃣ Agent Decision Tree (Pseudocode)

```python
def detect_input_type(input_obj):
    """Erkennt Input-Typ aus Datei/String/Obj."""
    
    if isinstance(input_obj, str):
        if input_obj.startswith(('http://', 'https://')):
            return 'WEBSITE_URL'
        elif '@' in input_obj and '://' in input_obj:  # DB connection string
            return 'DATABASE_CONNECTION'
    
    if os.path.isfile(input_obj):
        ext = os.path.splitext(input_obj)[1].lower()
        if ext in ['.mp4', '.mov', '.avi', '.webm']:
            return 'VIDEO_FILE'
        elif ext in ['.wav', '.mp3', '.aac', '.flac']:
            return 'AUDIO_FILE'
        elif ext in ['.json', '.ts'] and is_json_like(input_obj):
            if is_transcript_json(input_obj):
                return 'TRANSCRIPT_JSON'
            elif is_token_json(input_obj):
                return 'DESIGN_TOKENS_JSON'
        elif ext in ['.glb', '.gltf', '.fbx', '.obj']:
            return '3D_MODEL_ASSET'
    
    return 'UNKNOWN'


def get_load_packages(input_type, output_type=None):
    """Gibt Departments + konkreter Dateien zurück."""
    
    # Lookup aus dieser Datei
    base_package = INPUT_ROUTING_TABLE[input_type]
    
    # Optional: Mit Output kombinieren (Datei 24)
    if output_type:
        output_package = OUTPUT_ROUTING_TABLE[output_type]
        # Merge & Dedup
        combined = merge_packages(base_package, output_package)
        return combined
    
    return base_package
```

---

## 5️⃣ Context Budget Rules

Diese Rules verhindern, dass der Agent zu viel lädt:

- **Mindestens:** Canon + 1-2 Departments (nie "alles").
- **Maximum:** 50% des Kontext-Budgets (Datei 21 Rule).
- **Lazy-Load:** AUTOMATION department wird NUR geladen, wenn Flags es erlauben (`--enable-firecrawl`, etc.).

---

**END OF DATEI 23**

Status: ✅ READY FOR REVIEW | Nächste: Datei 24 (Output Routing), 25 (Migration Order)
