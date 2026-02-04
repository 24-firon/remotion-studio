# 🧬 EXTRACTION_REPORT_BADGE_7_CODEX.md

**Badge:** 7 (System Architecture & Cloud)
**Version:** 8.0 (The Codex Standard)
**Status:** FINAL_EXTRACTION
**Auditor:** Viron Forensic Architect
**Date:** 2026-02-02

---

## 📊 EXECUTIVE BRIEFING

| Dimension | Anforderung | Status |
|:----------|:------------|:-------|
| **Vollständigkeit** | Code muss copy-paste-fertig sein. | 100% |
| **Tiefe** | Jedes Finding muss den Kontext ("Warum?") enthalten. | High Density |
| **Redundanz-Check** | Abgleich mit `remotion-core/SKILL.md`. | Delta Only |
| **Löschbarkeit** | Kann die Quelldatei danach gelöscht werden? | **JA** |

**System-Definition:**
Badge 7 definiert das "Betriebssystem" von Viron. Es ist nicht die Engine, die rendert (das ist Badge 5), sondern das Gehirn, das entscheidet, *was* gerendert wird, *wo* es passiert (Local vs. Lambda) und *wie* Ressourcen (RAM, CPU, Geld) alloziert werden. Es transformiert Viron von einem "Video-Tool" in eine "Video-Plattform".

---

## 1. 🏛️ SYSTEM ARCHITECTURE & LAWS

### THE CONCURRENCY CALCULATOR
**Typ:** HARD CONSTRAINT / ALGORITHM
**Quelle:** `pipeline.md` (Sektion "Rendering-Optimierungen"), `RULES_TECHNICAL.md` (Sektion 3.1)

#### 🧠 The Logic (Das "Warum")
Standard-Remotion tendiert dazu, alle verfügbaren CPUs zu nutzen (`os.cpus().length`). In einer speicherintensiven Umgebung wie Viron (mit Three.js, WebGL und 4K Texturen) führt dies unweigerlich zu **OOM (Out of Memory) Crashes**, da jeder Thread eine eigene Chrome-Instanz mit eigenem VRAM-Overhead startet.
Viron invertiert diese Logik: **RAM ist der Flaschenhals, nicht die CPU.** Wir berechnen die Concurrency basierend auf dem verfügbaren Speicher und lassen einen Sicherheits-Puffer ("Headroom") für das Betriebssystem und den Orchestrator selbst.

#### ⚖️ The Rules (Die Gesetze)
1.  **Regel:** Concurrency wird primär durch RAM limitiert, sekundär durch CPU-Kerne.
2.  **Limit:** Maximal 16 Threads (AWS Lambda Limit & Diminishing Returns).
3.  **Safety:** 50% des RAMs sind für das System reserviert.

#### 💻 Executable Assets (Der Code)
```typescript
import os from "os";

/**
 * Calculates the safe concurrency limit for Viron rendering.
 * Prevents OOM by prioritizing RAM constraints over CPU count.
 * Source: pipeline.md
 */
export const calculateSafeConcurrency = (): number => {
  const availableCPUs = os.cpus().length;
  const ramGB = os.totalmem() / 1024 ** 3;

  // Faustregel: 1.5 Prozesse pro CPU sind theoretisch möglich
  const optimalCpuConcurrency = Math.floor(availableCPUs * 1.5);

  // HARD LIMIT: Nur 50% des RAMs für Rendering nutzen
  // Annahme: Ein Viron-Render-Prozess benötigt ~2GB (Heavy 3D)
  const ramLimit = Math.floor((ramGB / 2) / 2); 

  // The Viron Formula:
  // Min(CPU-Optimum, RAM-Limit, Hard-Cap 16)
  const recommendedConcurrency = Math.min(optimalCpuConcurrency, ramLimit, 16);
  
  // Fallback für Low-Spec Environments
  return Math.max(1, recommendedConcurrency);
};

// Usage Log
console.log(`System: ${os.cpus().length} CPUs, ${ramGB.toFixed(1)}GB RAM`);
console.log(`Viron Concurrency: ${calculateSafeConcurrency()} threads`);
```

---

### THE DEPARTMENT ACCESS CONTROL
**Typ:** SECURITY ARCHITECTURE / GOVERNANCE
**Quelle:** `22_SYSTEM_PLAN_FOLDER_STRUCTURE.md`

#### 🧠 The Logic (Das "Warum")
Ein Agent mit zu viel Kontext halluziniert ("Context Fog"). Um dies zu verhindern, partitioniert Viron das Wissen in **7 hermetisch abgeriegelte Departments**. Ein Agent darf nur laden, was er für seinen spezifischen Use-Case benötigt.
Es gibt strikte **Einbahnstraßen**: Die `ENGINE` (Design) darf niemals wissen, wie `WEB` (Scraping) funktioniert, um Dependency-Cycles zu vermeiden. `OPS` (Operations) ist die einzige Ebene, die alles sehen darf ("Meta-Layer").

#### ⚖️ The Rules (Die Gesetze)
1.  **Regel:** Kein Cross-Loading ohne explizite Erlaubnis in der Matrix.
2.  **Limit:** Maximal 50% des Context-Budgets für Departments.
3.  **Lazy-Load:** `AUTOMATION` (DB/MCP) wird *nur* geladen, wenn Flags (`--enable-firecrawl`) gesetzt sind.

#### 🔑 The Access Matrix
| Source Dept. | Target Dept. | Access | Grund / Einschränkung |
|:-------------|:-------------|:-------|:----------------------|
| **ENGINE**   | VIDEO        | ✅ Ja   | Video braucht Theme/Tokens |
| **ENGINE**   | AUDIO        | ✅ Ja   | Audio braucht Timing aus Physics |
| **AUDIO**    | VIDEO        | ✅ Ja   | Sync ist essenziell |
| **WEB**      | ENGINE       | ⚠️ Token | Nur Token-Export, keine Logik |
| **AUTOMATION**| *           | ❌ Nein | Nur On-Demand (Lazy Load) |
| **VIDEO**    | RENDER       | ✅ Ja   | Render muss Comps verstehen |
| **OPS**      | *            | ✅ Ja   | Meta-Layer (Monitoring/Recovery) |

---

## 2. 🧠 ORCHESTRATION ENGINE (Logic)

### THE INPUT CLASSIFICATION MATRIX
**Typ:** ROUTING / DECISION TREE
**Quelle:** `23_ROUTING_MATRIX_INPUTS.md`

#### 🧠 The Logic (Das "Warum")
Bevor ein Agent arbeitet, muss er verstehen, was er vor sich hat. Ist es ein Video? Eine URL? Ein JSON?
Viron nutzt eine **deterministische Routing-Logik** (implementiert als Python-Pseudocode im Agenten-Brain), um den Input zu klassifizieren und *automatisch* das korrekte "Load-Paket" (Liste von Wissens-Dateien) zu laden. Dies eliminiert menschliche Fehler bei der Kontext-Auswahl.

#### 💻 Executable Assets (Der Code)
```python
# Source: 23_ROUTING_MATRIX_INPUTS.md
import os

def detect_input_type(input_obj):
    """
    Viron Input Detection Logic.
    Determines the routing path based on file signature or string pattern.
    """
    
    # 1. String Analysis (URL / DB)
    if isinstance(input_obj, str):
        if input_obj.startswith(('http://', 'https://')):
            return 'WEBSITE_URL' # -> Load DEPT_WEB
        elif '@' in input_obj and '://' in input_obj:
            return 'DATABASE_CONNECTION' # -> Load DEPT_AUTOMATION
    
    # 2. File Analysis
    if os.path.isfile(input_obj):
        ext = os.path.splitext(input_obj)[1].lower()
        
        # Video Formats
        if ext in ['.mp4', '.mov', '.avi', '.webm']:
            return 'VIDEO_FILE' # -> Load DEPT_VIDEO + DEPT_RENDER
            
        # Audio Formats
        elif ext in ['.wav', '.mp3', '.aac', '.flac']:
            return 'AUDIO_FILE' # -> Load DEPT_AUDIO + DEPT_VIDEO
            
        # Data Formats (Context-Aware)
        elif ext in ['.json', '.ts']:
            # Deep Inspection required here in real impl
            if 'segments' in open(input_obj).read():
                return 'TRANSCRIPT_JSON'
            elif 'colors' in open(input_obj).read():
                return 'DESIGN_TOKENS_JSON' # -> Load DEPT_ENGINE
                
        # 3D Assets
        elif ext in ['.glb', '.gltf', '.fbx', '.obj']:
            return '3D_MODEL_ASSET' # -> Load DEPT_ENGINE (Physics)
    
    return 'UNKNOWN' # -> Trigger Error / Manual Intervention
```

---

### THE OUTPUT SPECIFICATION MATRIX
**Typ:** CONFIGURATION / STANDARDS
**Quelle:** `24_ROUTING_MATRIX_OUTPUTS.md`

#### 🧠 The Logic (Das "Warum")
Ein "Video" ist kein technischer Begriff. Ein "TikTok" ist technisch komplett anders als ein "TV-Spot".
Viron definiert 6 **Output-Archetypen**. Wenn der Agent weiß "Ich baue einen SHORT", lädt er automatisch die Regeln für `-16 LUFS` Audio und `9:16` Resolution. Das verhindert, dass ein Hochformat-Video mit Broadcast-Audio-Pegeln gerendert wird (was auf Handys zu leise wäre).

#### 🔑 The Table (Output Specs)
| Output Type | Resolution | FPS | Audio (LUFS) | Codec | Use-Case |
|:------------|:-----------|:----|:-------------|:------|:---------|
| **SHORT** | 1080x1920 (9:16) | 30 | -16 | h264 | TikTok, Reels, Shorts |
| **SHOWCASE** | 1920x1080 (16:9) | 30/60 | -14 | h264/ProRes | Website Hero, Brand Reveal |
| **EXPLAINER** | 1920x1080 (16:9) | 30 | -16 | h264 | Tutorials, YouTube |
| **DASHBOARD** | 1920x1080 | 30 | -16 | h264 | Data Viz, KPI Reports |
| **PRODUCTION** | 3840x2160 (4K) | 24/30 | -14 | ProRes422HQ | Broadcast, Archival |
| **AD** | Variable | 30 | -14 (Punchy) | h264 | Social Ads (Strict Duration) |

#### 🔧 Rendering Command Template (Example: SHORT)
```bash
# Source: 24_ROUTING_MATRIX_OUTPUTS.md
# Template for SHORT (Vertical, Mobile)
npx remotion render \
  --codec h264 \
  --concurrency 4 \
  --width 1080 \
  --height 1920 \
  --fps 30 \
  --quality 85 \
  output.mp4
```

---

## 3. ☁️ CLOUD INFRASTRUCTURE (Execution)

### THE LAMBDA COST TIERS
**Typ:** FINANCIAL LOGIC / CONFIGURATION
**Quelle:** `60-cloud-rendering-00-aws-lambda-renderfarming.md`

#### 🧠 The Logic (Das "Warum")
Cloud-Rendering skaliert unendlich – und damit auch die Kosten. Ohne Bremsen kann ein einziger "Ultra-Quality" Render hunderte Dollar verbrennen, wenn er falsch konfiguriert ist.
Viron implementiert **Cost Tiers**. Der Agent muss *vor* dem Render entscheiden: "Ist das ein Entwurf oder das Finale?" Basierend darauf werden Hardware-Ressourcen (RAM, Workers) und Encoding-Qualität (CRF) hart limitiert.

#### 🔑 The Table (Cost Tiers)
| Tier | Quality (CRF) | Workers (Lambda) | Est. Cost (1 min) | Use-Case |
|:-----|:--------------|:-----------------|:------------------|:---------|
| **DRAFT** | 28 (Low) | 4 | ~$0.10 | Preview, Timing-Check |
| **STANDARD** | 20 (Good) | 8 | ~$0.50 | Internal Review, Social |
| **HIGH** | 16 (Great) | 16 | ~$1.20 | Final Release (Web) |
| **ULTRA** | 10 (Lossless) | 32 | ~$2.80 | Broadcast, Archive |

#### 💻 Executable Assets (Config Selector)
```typescript
// Source: 60-cloud-rendering...
interface RenderConfig {
  quality: 'draft' | 'standard' | 'high' | 'ultra';
  workers: number;
  crf: number;
}

export const getRenderConfig = (tier: string): RenderConfig => {
  const configs = {
    draft:    { crf: 28, workers: 4 },
    standard: { crf: 20, workers: 8 },
    high:     { crf: 16, workers: 16 },
    ultra:    { crf: 10, workers: 32 }
  };
  return configs[tier] || configs.draft;
};
```

---

### THE MCP DATA BRIDGE (Dynamic Video)
**Typ:** INTEGRATION PATTERN
**Quelle:** `20_ARCHIVE_Standard_Dynamic_Data_Supabase.md`

#### 🧠 The Logic (Das "Warum")
Statische Videos sind tot. Viron Videos sind **Funktionen der Datenbank**.
Wir nutzen das **Model Context Protocol (MCP)**, um Claude (dem LLM) direkten, sicheren Lesezugriff auf Supabase zu geben. Claude liest die Daten (`SELECT * FROM analytics`) und injiziert sie *zur Laufzeit* in die Remotion-Props. Das ermöglicht "Infinite Content Generation" ohne manuellen Eingriff.

#### 🔧 The Workflow
1.  **Trigger:** User/Cronjob fordert Video an.
2.  **Fetch:** MCP Server (Python) führt SQL Query auf Supabase aus.
3.  **Inject:** Daten werden als JSON in `inputProps` der Composition geladen.
4.  **Render:** Remotion rendert das Video mit den Live-Daten.

#### 💻 Executable Assets (MCP Tool Definition)
```python
# Source: 20_ARCHIVE_Supabase...
@server.list_tools()
async def list_tools():
    return [
        types.Tool(
            name="get_analytics",
            description="Fetch latest analytics from Supabase for Video Injection",
            inputSchema={
                "type": "object",
                "properties": {
                    "limit": {"type": "integer", "default": 1}
                }
            }
        )
    ]
```

---

## 4. 🛠️ OPERATIONAL TOOLS (Ops)

### THE "TOTAL WAR" RELEASE PROTOCOL
**Typ:** GOVERNANCE / SECURITY
**Quelle:** `RELEASE_PROTOCOL.md`

#### 🧠 The Logic (Das "Warum")
Ein Release darf niemals auf "It works on my machine" basieren. Viron nutzt ein **Zero-Tolerance Protocol**.
Bevor auch nur ein Byte gebaut wird, wird die Umgebung forensisch gescannt. Schmutzige Git-States, falsche Node-Versionen oder untracked Files führen zum sofortigen Abbruch ("Abort"). Wir releasen nur saubere, reproduzierbare Artefakte.

#### 🔧 The Protocol Steps
1.  **Environment Scan:**
    *   Check `node --version` (Muss `v22.17.0` sein).
    *   Check `git status --porcelain` (Muss leer sein).
2.  **Clean State Assurance:**
    *   Run `git clean -fdn` (Listet gefährliche untracked files).
3.  **Dependency Integrity:**
    *   Run `npm ci --dry-run` (Prüft Lockfile-Integrität).
4.  **Atomic Release:**
    *   Build -> Commit -> Tag -> Push in einer atomaren Kette.
    *   **Rollback:** Bei Fehler sofort `git tag -d` und `git reset --soft`.

---

### THE HYBRID RENDER PIPELINE
**Typ:** WORKFLOW
**Quelle:** `pipeline.md`, `60-cloud-rendering...`

#### 🧠 The Logic (Das "Warum")
Nicht jeder Render braucht die Cloud. Viron unterscheidet intelligent zwischen **Local** (schnell, kostenlos, für Dev) und **Lambda** (skalierbar, kostenpflichtig, für Prod).
Ein "Smart Orchestrator" entscheidet basierend auf Dauer und Qualität, wohin der Job geschickt wird.

#### 🔑 The Decision Matrix
| Bedingung | Render Mode | Grund |
|:----------|:------------|:------|
| Duration < 30s AND Quality = Draft | **LOCAL** | Schneller als Lambda-Cold-Start |
| Duration < 10min AND Quality != Ultra | **LAMBDA** | Kosten-Effizient (< $5) |
| Duration > 10min OR Quality = Ultra | **RENDER FARM** | Lambda Timeouts vermeiden |

---

## 5. 🔮 FUTURE ARCHITECTURE (Roadmap)

**Quelle:** `ZUKUNFTSPLAN_POSTGRES_BUS_INTEGRATION.md`

### THE POSTGRES EVENT BUS
**Status:** PLANNED (Target: Feb 2026)

#### 🧠 The Logic
Aktuell ist Rendering synchron (blockierend). In Zukunft wird Viron asynchron.
Eine **Postgres Queue Table** (`render_jobs`) speichert Aufträge. Ein Pool von Workern (Docker/Lambda) arbeitet diese ab. Das entkoppelt die Web-App (Next.js) von der Render-Last.

#### 🔑 The Schema Preview
```sql
CREATE TABLE render_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  status VARCHAR(50) DEFAULT 'pending', -- pending, processing, completed
  worker_id VARCHAR(255),
  output_url VARCHAR(500),
  priority INT DEFAULT 0
);
```

---

## 6. ⚠️ CONFLICT & ANOMALY LOG

| Konflikt-Gegenstand | Quelle A | Quelle B | Analyse / Lösung |
|:--------------------|:---------|:---------|:-----------------|
| **Concurrency Limit** | `pipeline.md`: "Max 16" | `RULES_TECHNICAL.md`: "RAM/2" | ✅ **LÖSUNG:** Die Formel `Min(CPU, RAM/2, 16)` vereint beide. RAM ist der primäre Limiter. |
| **Render Mode** | `pipeline.md`: Docker erwähnt | `60-cloud...`: Lambda Fokus | ✅ **LÖSUNG:** Lambda ist der *aktuelle* Standard. Docker ist für die *Future Architecture* (Postgres Bus) reserviert. |
| **Node Version** | `RELEASE_PROTOCOL`: v22.17.0 | `gemini.md`: v20.x (alt) | ⚠️ **UPDATE:** `RELEASE_PROTOCOL` ist neuer und spezifischer. v22.17.0 ist Gesetz. |

---

## 7. 🧬 THE API (Agent-to-Agent Interface)

*Harte Fakten für andere Agenten (z.B. Badge 5 Web oder Badge 6 Audio):*

- **Max RAM per Thread:** 2GB (Standard), 4GB (Heavy 3D), 8GB (Volumetric).
- **Max Threads (Global):** 16 (Hard Cap).
- **Cost per Minute (Draft):** ~$0.10 (4 Workers).
- **Cost per Minute (Ultra):** ~$2.80 (32 Workers).
- **Audio Sync Limit:** Max 2 Frames Drift erlaubt.
- **Node Version:** v22.17.0 (Strict).
- **Input Detection:** Via `23_ROUTING_MATRIX` (Python Logic).
- **Output Specs:** Via `24_ROUTING_MATRIX` (Short/Showcase/Prod).

---

**END OF REPORT**