# 🧬 EXTRACTION REPORT: BADGE 7 (SYSTEM ARCHITECTURE & CLOUD)

**Version:** 8.0 (The Codex Standard)
**Status:** FINAL / CODIFIED
**Philosophy:** "The Nervous System." (Das Gehirn, das die Muskeln steuert.)

> **WARNUNG AN DEN LESER:**
> Dieser Codex ersetzt die Dateien `pipeline.md`, `60-cloud-rendering...`, `23_ROUTING...`, `24_ROUTING...`, `RELEASE_PROTOCOL.md` und `22_SYSTEM_PLAN...`.
> Er enthält die vollständige DNA der Viron-Systemarchitektur.

---

## 📊 EXECUTIVE BRIEFING

| Dimension | Status | Metrik |
|:----------|:-------|:-------|
| **Routing Logic** | ✅ Extracted | Python Decision Tree |
| **Cloud Infra** | ✅ Extracted | 4 Cost Tiers |
| **Hardware Laws** | ✅ Extracted | RAM-based Concurrency |
| **Release Ops** | ✅ Extracted | "Total War" Protocol |
| **Vollständigkeit** | 100% | Keine externen Referenzen nötig |

---

## 1. 🏛️ SYSTEM ARCHITECTURE & LAWS

### THE CONCURRENCY CALCULATOR
**Typ:** HARD CONSTRAINT / HARDWARE LAW
**Quelle:** `pipeline.md`, `RULES_TECHNICAL.md`

#### 🧠 The Logic (Das "Warum")
In der Videoproduktion ist CPU nicht der einzige Flaschenhals. RAM ist oft kritischer, besonders bei 4K-Rendering oder komplexen Three.js-Szenen. Standard-Remotion nutzt oft `os.cpus()` als Standard für Concurrency. Das führt auf Lambda-Instanzen oder Dev-Maschinen mit wenig RAM (aber vielen Kernen) sofort zu "Out of Memory" (OOM) Abstürzen.
Viron implementiert daher ein **pessimistisches Concurrency-Modell**. Wir opfern Geschwindigkeit für Stabilität. Ein langsamer Render ist besser als ein abgebrochener Render. Wir reservieren strikt 2GB RAM pro Thread für Standard-Szenen und bis zu 8GB für Volumetric-Szenen.

#### ⚖️ The Rules (Die Gesetze)
1.  **Regel:** Niemals mehr Threads als `RAM_GB / 2` starten.
2.  **Limit:** Max 16 Threads (auch auf 64-Core Maschinen), um Overhead zu vermeiden.
3.  **Limit:** Max 1 Thread bei Debugging/Profiling.

#### 💻 Executable Assets (Der Code)
```typescript
import os from "os";

// Source: pipeline.md
// Calculates safe concurrency based on available RAM, not just CPU cores.

const availableCPUs = os.cpus().length;
const ramGB = os.totalmem() / 1024 ** 3;

// Faustregel: 1-2 Prozesse pro CPU wäre Standard, aber wir sind vorsichtig.
const optimalConcurrency = Math.floor(availableCPUs * 1.5);

// HARD LIMIT: Halbes RAM für Rendering reservieren (OS + Chrome Overhead brauchen den Rest)
// Annahme: Ein Render-Prozess braucht ca. 2GB Peak Memory.
const ramLimit = Math.floor(ramGB / 2); 

// The Viron Formula:
const recommendedConcurrency = Math.min(optimalConcurrency, ramLimit, 16);

console.log(`System: ${availableCPUs} CPUs, ${ramGB.toFixed(1)} GB RAM`);
console.log(`Viron Recommended Concurrency: ${recommendedConcurrency} processes`);
```

---

### THE DEPARTMENT ACCESS CONTROL
**Typ:** SECURITY ARCHITECTURE
**Quelle:** `22_SYSTEM_PLAN_FOLDER_STRUCTURE.md`

#### 🧠 The Logic (Das "Warum")
Viron ist modular. Wenn jeder Agent alles liest, explodiert der Kontext ("Context Fog"). Wir nutzen eine strikte "Need-to-Know" Architektur. Ein Agent, der an der Website arbeitet (`DEPT_WEB`), muss nicht wissen, wie die Audio-Normalisierung (`DEPT_AUDIO`) funktioniert. Er braucht nur die Design-Tokens (`DEPT_ENGINE`). Diese Isolation schützt vor Halluzinationen und hält den Token-Count niedrig.

#### 🔑 The Access Matrix
| Source Dept. | Target Dept. | Access | Grund |
|:-------------|:-------------|:-------|:------|
| **ENGINE** | VIDEO | ✅ ALLOW | Video braucht Assets/Tokens |
| **ENGINE** | AUDIO | ✅ ALLOW | Audio braucht Timing aus Physics |
| **AUDIO** | VIDEO | ✅ ALLOW | Sync ist kritisch |
| **WEB** | ENGINE | ⚠️ RESTRICTED | Nur Token-Export, keine Logik |
| **AUTOMATION** | * | ❌ DENY | Nur bei explizitem Demand laden |
| **RENDER** | OPS | ✅ ALLOW | Ops muss Recovery kennen |
| **OPS** | * | ✅ ALLOW | Ops ist Meta-Layer (Root Access) |

---

## 2. 🧠 ORCHESTRATION ENGINE (Routing)

### THE INPUT CLASSIFICATION MATRIX
**Typ:** DECISION TREE / ROUTING LOGIC
**Quelle:** `23_ROUTING_MATRIX_INPUTS.md`

#### 🧠 The Logic (Das "Warum")
Ein Agent muss sofort wissen, womit er es zu tun hat. Ist der Input eine URL? Ein Video? Eine Datenbank? Wir verlassen uns nicht auf "Raten". Wir nutzen deterministische Heuristiken (Dateiendungen, String-Patterns), um den Input zu klassifizieren und *nur* die relevanten Wissens-Pakete zu laden. Das spart Tokens und verhindert Fehler.

#### 💻 Executable Assets (Der Code)
```python
# Source: 23_ROUTING_MATRIX_INPUTS.md
import os

def detect_input_type(input_obj):
    """
    Deterministische Erkennung des Input-Typs.
    Steuert das Laden der Departments.
    """
    
    # 1. String Analysis (URL / DB)
    if isinstance(input_obj, str):
        if input_obj.startswith(('http://', 'https://')):
            return 'WEBSITE_URL'
        elif '@' in input_obj and '://' in input_obj:  # DB connection string pattern
            return 'DATABASE_CONNECTION'
    
    # 2. File Analysis
    if os.path.isfile(input_obj):
        ext = os.path.splitext(input_obj)[1].lower()
        
        # Video Formats
        if ext in ['.mp4', '.mov', '.avi', '.webm']:
            return 'VIDEO_FILE'
            
        # Audio Formats
        elif ext in ['.wav', '.mp3', '.aac', '.flac']:
            return 'AUDIO_FILE'
            
        # Structured Data
        elif ext in ['.json', '.ts']:
            # Deep inspection required here in real impl
            # For now, simplistic extension check
            if 'transcript' in input_obj: 
                return 'TRANSCRIPT_JSON'
            elif 'token' in input_obj or 'theme' in input_obj:
                return 'DESIGN_TOKENS_JSON'
                
        # 3D Assets
        elif ext in ['.glb', '.gltf', '.fbx', '.obj']:
            return '3D_MODEL_ASSET'
    
    return 'UNKNOWN'

def get_load_packages(input_type):
    """
    Definiert das minimale Load-Paket pro Typ.
    """
    routing_table = {
        'VIDEO_FILE': ['DEPT_VIDEO', 'DEPT_RENDER', 'DEPT_OPS'],
        'AUDIO_FILE': ['DEPT_AUDIO', 'DEPT_VIDEO', 'DEPT_RENDER'],
        'WEBSITE_URL': ['DEPT_WEB', 'DEPT_ENGINE', 'DEPT_VIDEO', 'DEPT_RENDER'],
        'DATABASE_CONNECTION': ['DEPT_AUTOMATION', 'DEPT_VIDEO', 'DEPT_RENDER', 'DEPT_OPS'],
        '3D_MODEL_ASSET': ['DEPT_ENGINE', 'DEPT_VIDEO', 'DEPT_RENDER']
    }
    return routing_table.get(input_type, ['DEPT_OPS']) # Fallback to Ops
```

---

### THE OUTPUT SPECIFICATION MATRIX
**Typ:** CONFIGURATION
**Quelle:** `24_ROUTING_MATRIX_OUTPUTS.md`

#### 🔑 The Table
| Output Type | Resolution | FPS | Bitrate | Audio LUFS | Context Budget |
|:------------|:-----------|:----|:--------|:-----------|:---------------|
| **SHORT** | 1080x1920 (9:16) | 30 | 3-5 Mbps | -16 | 40% |
| **SHOWCASE** | 1920x1080 (16:9) | 30/60 | 8-15 Mbps | -14 | 50% |
| **EXPLAINER** | 1920x1080 (16:9) | 30 | 5-8 Mbps | -16 | 65% |
| **PRODUCTION** | 3840x2160 (4K) | 24/30 | 50-100 Mbps | -14 | 50% |
| **AD** | Variable | 30 | 5-8 Mbps | -14 (Punchy) | 60% |

---

## 3. ☁️ CLOUD INFRASTRUCTURE (Execution)

### THE LAMBDA COST TIERS
**Typ:** FINANCIAL LOGIC
**Quelle:** `60-cloud-rendering...`

#### 🧠 The Logic (Das "Warum")
Cloud Rendering kann teuer werden, wenn man blindlings maximale Ressourcen wirft. Viron definiert "Quality Tiers". Ein Draft-Render muss billig sein ($0.10). Ein Production-Render darf kosten ($2.80). Wir steuern dies über `CRF` (Constant Rate Factor) und `Workers` (Parallelität).

#### 🔑 The Table
| Tier | CRF (Quality) | Workers | Est. Cost (1 min) | Use Case |
|:-----|:--------------|:--------|:------------------|:---------|
| **DRAFT** | 28 | 4 | $0.10 | Preview, Timing Check |
| **STANDARD** | 20 | 8 | $0.50 | Internal Review |
| **HIGH** | 16 | 16 | $1.20 | YouTube, Social |
| **ULTRA** | 10 | 32 | $2.80 | Broadcast, Archive |

#### 💻 Executable Assets (Config Logic)
```typescript
// Source: 60-cloud-rendering...
const getRenderConfig = (quality: 'draft' | 'standard' | 'high' | 'ultra') => {
  const configs = {
    draft: { crf: 28, workers: 4 },
    standard: { crf: 20, workers: 8 },
    high: { crf: 16, workers: 16 },
    ultra: { crf: 10, workers: 32 }
  };
  return configs[quality];
};
```

---

### THE MCP DATA BRIDGE
**Typ:** INTEGRATION PATTERN
**Quelle:** `20_ARCHIVE_Supabase...`

#### 🧠 The Logic (Das "Warum")
Videos sind oft statisch. Viron macht sie dynamisch. Durch MCP (Model Context Protocol) kann ein LLM (Claude) direkt auf eine Datenbank (Supabase) zugreifen, die Daten lesen und sie *live* in den Remotion-Code injizieren. Das Video wird zur Funktion der Datenbank: `Video = f(Database)`.

#### 💻 Executable Assets (MCP Tool Definition)
```python
# Source: 20_ARCHIVE_Supabase...
# Python MCP Server Definition for Supabase
@server.list_tools()
async def list_tools():
    return [
        types.Tool(
            name="get_analytics",
            description="Fetch latest analytics from Supabase",
            inputSchema={
                "type": "object",
                "properties": {
                    "limit": {"type": "integer", "description": "Rows to fetch"}
                }
            }
        )
    ]

@server.call_tool()
async def call_tool(name: str, arguments: dict):
    if name == "get_analytics":
        limit = arguments.get("limit", 1)
        response = supabase.table("analytics").select("*").limit(limit).execute()
        return [{"type": "text", "text": str(response.data)}]
```

---

## 4. 🛠️ OPERATIONAL TOOLS (Ops)

### WORKFLOW: THE "TOTAL WAR" RELEASE
**Typ:** GOVERNANCE / PROTOCOL
**Quelle:** `RELEASE_PROTOCOL.md`

#### 🧠 The Logic (Das "Warum")
Ein Release ist ein kritischer Moment. "It works on my machine" ist inakzeptabel. Das "Total War" Protokoll erzwingt eine sterile Umgebung, prüft Abhängigkeiten und führt Tests aus, bevor auch nur ein Byte gepusht wird. Es ist ein Zero-Tolerance-Prozess.

#### 🔧 The Protocol Steps
1.  **Environment Scan:** `node --version` MUSS `v22.17.0` sein.
2.  **Clean State:** `git clean -fdn` muss leer sein.
3.  **Git Forensic:** `git status --porcelain` muss leer sein.
4.  **Branch Check:** Nur `main` oder `develop`.
5.  **Dependency Check:** `npm ci --dry-run` (Lockfile integrity).
6.  **Test Suite:** `npm run test -- --passWithNoTests`.
7.  **Build Verify:** `npm run build` (keine Errors).
8.  **Atomic Commit:** `git commit -S` (Signed) + `git tag`.

---

## 5. 🔮 FUTURE ARCHITECTURE (Roadmap)

**Quelle:** `ZUKUNFTSPLAN_*.md`

| Komponente | Status | Ziel |
|:-----------|:-------|:-----|
| **App Shell** | Planned | Next.js App Router Integration für Web-Player. |
| **Postgres Bus** | Planned | Asynchrone Render-Queue via Bull/Postgres statt synchronem CLI. |
| **Design Sync** | Planned | Shared Tokens (`design-tokens.ts`) zwischen Web-UI und Video-Render. |

---

## 6. ⚠️ CONFLICT & ANOMALY LOG

| Konflikt-Gegenstand | Quelle A | Quelle B | Analyse / Empfehlung |
| :--- | :--- | :--- | :--- |
| **Render Engine** | `pipeline.md`: Docker | `60-cloud-rendering`: Lambda | ✅ **LÖSUNG:** Lambda ist der aktuelle Standard für Skalierung. Docker ist Fallback/Future für Custom Hardware. |
| **Concurrency** | `RULES_TECHNICAL`: RAM/2 | `pipeline.md`: RAM/2 | ✅ **KONSISTENT:** Beide Quellen bestätigen das RAM-Limit Gesetz. |

---

## 7. 🧬 THE API (Agent-to-Agent Interface)

*Hard Facts für schnelle Integration:*

- **Max RAM:** `2GB` per Thread (Standard), `8GB` (Volumetric).
- **Max Threads:** `16` (Hard Limit).
- **Cost Tiers:** `$0.10` (Draft) bis `$2.80` (Ultra) pro Minute.
- **Sync Limit:** `2 Frames` Toleranz bei Audio/Video Sync.
- **Node Version:** `v22.17.0` (Strict).
- **Browser:** Chrome Headless (via Remotion).
- **Audio:** `-14 LUFS` (Broadcast), `-16 LUFS` (Web/Mobile).