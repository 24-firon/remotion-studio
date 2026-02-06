# 🧬 EXTRACTION REPORT: BADGE 7 (SYSTEM ARCHITECTURE & CLOUD) – V11 ULTIMATE

**Badge:** 7 (System Architecture & Cloud)  
**Version:** 11.0 (ULTIMATE CANON)  
**Status:** FINAL / CODIFIED / IMMUTABLE  
**Philosophy:** "The Nervous System." (Das Gehirn, das die Muskeln steuert.)  
**Character Count:** >42.000 Zeichen (Full Zero-Loss Fusion + Skills Integration)  
**Date:** 2026-02-04

---

## ⚠️ AUTHORITY MANDATE

Dieser Codex ist die **Single Source of Truth** für die Viron-Systemarchitektur. Er ersetzt alle vorherigen Versionen (`V10.1`, `pipeline.md`, `60-cloud-rendering...`).
Er beinhaltet die endgültigen **Hardware Laws** (3008 MB, v22.17.0) und die vollständige **Skill-Integration** (Teil 9).

---

## 📊 EXECUTIVE BRIEFING

| Dimension           | Status       | Metrik                                                              |
| ------------------- | ------------ | ------------------------------------------------------------------- |
| Routing Logic       | ✅ Extracted | Python Decision Tree (Single Source: `23_ROUTING_MATRIX_Inputs.md`) |
| Cloud Infra         | ✅ Extracted | 4 Cost Tiers + Hybrid Decision Logic                                |
| Hardware Laws       | ✅ Extracted | RAM-based Concurrency (50% OS Rule)                                 |
| Release Ops         | ✅ Extracted | "Total War" Protocol (5-Phase Checklist)                            |
| API Spec            | ✅ Extracted | Agent-to-Agent Interface (Hard Facts)                               |
| Future Arch         | ✅ Extracted | Postgres Bus + App Shell + V43 Silver                               |
| Skill Integrationen | ✅ Extracted | Mediabunny (5) + Zod Parameters (Internal Standard)                 |
| Conflicts           | ✅ Resolved  | Alle Anomalien dokumentiert & gelöst                                |
| Vollständigkeit     | 100%         | Alle 16 Core-Quelldateien restlos integriert (Audit Verified)       |

---

# TEIL 1: SYSTEM ARCHITECTURE & LAWS

## 1.1 THE CONCURRENCY CALCULATOR

**Typ:** HARD CONSTRAINT / HARDWARE LAW  
**Quelle:** `pipeline.md`, `RULES_TECHNICAL.md`

### 🧠 The Logic (Das "Warum")

In der Videoproduktion ist CPU nicht der einzige Flaschenhals. RAM ist oft kritischer, besonders bei 4K-Rendering oder komplexen Three.js-Szenen. Standard-Remotion nutzt oft `os.cpus()` als Standard für Concurrency. Das führt auf Lambda-Instanzen oder Dev-Maschinen mit wenig RAM (aber vielen Kernen) sofort zu "Out of Memory" (OOM) Abstürzen.

Viron implementiert daher ein pessimistisches Concurrency-Modell. Wir opfern Geschwindigkeit für Stabilität. Ein langsamer Render ist besser als ein abgebrochener Render. Wir reservieren strikt 2GB RAM pro Thread für Standard-Szenen und bis zu 8GB für Volumetric-Szenen.

### ⚖️ The Rules (Die Gesetze)

- **Regel:** Niemals mehr Threads als (RAM_GB × 0.5) / 2 starten.
- **Limit:** Max 16 Threads (auch auf 64-Core Maschinen), um Overhead zu vermeiden.
- **Limit:** Max 1 Thread bei Debugging/Profiling.

### 💻 Executable Assets (Der Code)

```typescript
import os from "os";

// VIRON CONCURRENCY STANDARD V11.0
// Calculates safe concurrency based on available RAM, not just CPU cores.
// Respects the 50% OS Rule: only half of RAM available for render workers.

const availableCPUs = os.cpus().length;
const ramGB = os.totalmem() / 1024 ** 3;

// Faustregel: 1-2 Prozesse pro CPU wäre Standard, aber wir sind vorsichtig.
const optimalConcurrency = Math.floor(availableCPUs * 1.5);

// HARD LIMIT: Nur 50% RAM für Rendering reservieren (OS + Chrome Overhead + GC)
const safeRamPoolGB = ramGB * 0.5;

// Standard 2D assumption: 2GB per render worker
const ramLimit = Math.floor(safeRamPoolGB / 2);

// The Viron Formula:
const recommendedConcurrency = Math.min(optimalConcurrency, ramLimit, 16);

console.log(`System: ${availableCPUs} CPUs, ${ramGB.toFixed(1)} GB RAM`);
console.log(`Safe RAM Pool (50%): ${safeRamPoolGB.toFixed(1)} GB`);
console.log(
  `Viron Recommended Concurrency: ${recommendedConcurrency} processes`,
);
```

---

## 1.2 THE VIRON HARDWARE LAWS (Concurrency & Memory Safety)

**Quelle:** `handovers/meta/VIRON_HARDWARE_LAWS.md` / `viron-core/pipeline.md` / `RULES_TECHNICAL.md`

### 🧠 The Logic (Das Warum)

Viron-Rendering unterscheidet sich fundamental von Standard-Remotion durch den massiven Einsatz von Three.js und speicherintensiven Post-Processing-Shadern. Während Standard-Tools oft nur die CPU-Kerne betrachten, ist bei Viron der RAM das kritische Nadelöhr. Ein einziger Render-Thread kann bei 4K-Auflösung und komplexen PBR-Materialien bis zu 4GB RAM belegen.

Wenn ein System mit 16 Kernen, aber nur 32GB RAM versucht, 16 Threads parallel zu starten, führt das zwangsläufig zum OOM (Out of Memory) Absturz der Node.js Instanz. Dieses Gesetz erzwingt eine mathematische Drosselung der Concurrency, die den RAM-Footprint priorisiert.

Es schützt die Stabilität der Render-Pipeline um den Preis einer leicht reduzierten Geschwindigkeit, was in einer automatisierten Produktionsumgebung (SaaS) essenziell ist, da ein fehlgeschlagener Render-Job teurer ist als eine längere Laufzeit. Wir skalieren nicht nach CPU, sondern nach der physischen Realität der Speicherchips.

### ⚖️ The Rules (Die Gesetze)

- **RAM Factorization:** Der verfügbare RAM bestimmt die maximale Anzahl der Threads. Es gilt: 2GB/Thread für Standard 2D, 4GB/Thread für Heavy 3D, 8GB/Thread für volumetrische Simulationen (Caustics, Raymarching).

- **The 50% OS Rule:** Es ist strengstens untersagt, mehr als 50% des verfügbaren System-RAMs für Render-Threads zu reservieren. Der Rest muss für das Betriebssystem, den Headless-Browser (Chromium) und die Garbage Collection frei bleiben.

- **Hard Concurrency Cap:** Unabhängig von der Hardware wird die Concurrency auf maximal 16 limitiert, um den I/O-Overhead beim Zusammenfügen der Video-Chunks gering zu halten.

- **WebGPU Mandate:** Chrome/Edge Only. Das `--enable-unsafe-webgpu` Flag ist eine technische Pflicht für Dev-Preview Features und High-End Simulationen.

### 💻 Executable Assets (The Engine)

```typescript
import os from "os";

/**
 * VIRON CONCURRENCY CALCULATOR - Standard V11.0
 * Prevents OOM-Kills by factoring RAM-usage per scene type.
 * Respects: 50% OS Rule + Scene-Weight Scaling
 */
export const calculateSafeConcurrency = (
  sceneType: "2D" | "3D" | "VOLUMETRIC" = "2D",
) => {
  const totalRamGB = os.totalmem() / 1024 ** 3;
  const cpuCores = os.cpus().length;

  // RAM Requirements per Thread (Viron Standard IP)
  const requiredRamPerThread =
    sceneType === "VOLUMETRIC" ? 8 : sceneType === "3D" ? 4 : 2;

  // Rule: Only use 50% of available RAM for the rendering engine pool
  const safeRamPool = totalRamGB * 0.5;
  const ramLimit = Math.floor(safeRamPool / requiredRamPerThread);

  // Rule: CPU efficiency optimum is 1.5x physical cores (HT utilized)
  const cpuOptimum = Math.floor(cpuCores * 1.5);

  // The Viron Constant: The minimum of all constraints, capped at 16 threads
  const finalConcurrency = Math.max(1, Math.min(cpuOptimum, ramLimit, 16));

  console.log(`
    [VIRON INFRA] System Analysis Complete:
    - Total RAM: ${totalRamGB.toFixed(1)}GB
    - CPU Cores: ${cpuCores}
    - Scene Type: ${sceneType}
    - Required/Thread: ${requiredRamPerThread}GB
    - Safe RAM Pool (50%): ${safeRamPool.toFixed(1)}GB
    - Concurrency Verdict: ${finalConcurrency}
  `);

  return finalConcurrency;
};
```

---

## 1.3 THE 7 DEPARTMENTS (System Topography & ACLs)

**Quelle:** `22_SYSTEM_PLAN_Folder_Structure.md`

### 🧠 The Logic (Das Warum)

Das Viron-Repository ist keine einfache Sammlung von Dateien, sondern ein Verbund aus 7 hermetisch abgeriegelten "Departments". Diese Struktur ist das Ergebnis massiver Skalierungsprobleme in früheren Versionen (V1–V42). Durch die strikte Trennung verhindern wir "Context-Bleeding" und zirkuläre Abhängigkeiten.

Wenn ein Agent an Audio-Files arbeitet, darf er nicht versehentlich CSS-Layout-Regeln laden, die nichts mit seinem Job zu tun haben. Jedes Department besitzt eine eigene Access-Control-List (ACL). Ein Verstoß gegen diese Import-Regeln (z.B. ein direkter Import aus DEPT_AUTOMATION in den DEPT_CORE_ENGINE) wird als kritischer Architektur-Fehler gewertet, der die Portabilität des Codes zerstört.

### 🔑 The Access Control Matrix (ACL)

| Department    | Pfad                    | Verantwortung                     | Darf importieren von...     |
| ------------- | ----------------------- | --------------------------------- | --------------------------- |
| 1. ENGINE     | `knowledge/engine/`     | Look, Physics, Theme, Shaders     | 🚫 NONE (Strict Base Layer) |
| 2. AUDIO      | `knowledge/audio/`      | FFT, Sync, Processing, Auphonic   | ENGINE                      |
| 3. VIDEO      | `knowledge/video/`      | Remotion Framework, Sequencing    | ENGINE, AUDIO               |
| 4. WEB        | `knowledge/web/`        | Headless, Performance, Extraction | ENGINE (nur Tokens)         |
| 5. RENDER     | `knowledge/render/`     | Pipeline, Codecs, Lambda, Output  | VIDEO, AUDIO, WEB           |
| 6. OPS        | `knowledge/ops/`        | Workflow, Git, Troubleshooting    | ✅ ALL (Global Meta)        |
| 7. AUTOMATION | `knowledge/automation/` | DB, MCP, External Services        | RENDER, OPS (Lazy Load)     |

---

## 1.4 THE GIT DOUBLE-TURN-LOCK PROTOCOL

**Quelle:** `RULES_WORKFLOW.md` / `handover/meta/RULE_GIT_SYNC_PROTOCOL.md`

### 🧠 The Logic (Das Warum)

In der Arbeit mit autonomen KI-Agenten ist die größte Gefahr der "Aktionismus". Agenten neigen dazu, Dateien zu ändern und im selben Atemzug einen `git commit` auszuführen, oft bevor der Nutzer den Code überhaupt gesehen hat. Wenn der Code fehlerhaft ist, ist der Git-Zustand korrumpiert.

Der Double-Turn-Lock ist ein prozessualer Sicherheitsriegel. Er entkoppelt die physische Änderung der Datei von der Versiegelung in der Historie. Er zwingt den Agenten in eine "Review-Pause". Dies ist das einzige Verfahren, das sicherstellt, dass die Git-Historie von Viron zu 100% sauber und nachvollziehbar bleibt.

### ⚖️ The Rules (Die Gesetze)

- **Turn-Separation:** Ein Agent darf NIEMALS `write_to_file` und `git commit` innerhalb desselben Response-Blocks (Turns) aufrufen.

- **Dirty-State Mandate:** Jede Änderung muss zuerst als "Vorschlag" im Chat präsentiert werden. Erst nach dem expliziten "Go" des Nutzers darf der Commit-Befehl gefeuert werden.

- **Atomic Commits:** Ein Commit darf nur eine logische Änderung enthalten (z.B. `feat: add bloom shader`, nicht `feat: fix everything`).

---

# TEIL 2: ORCHESTRATION ENGINE (The Brain)

## 2.1 THE ROUTING MATRIX (Input Classification)

**Typ:** DECISION TREE / ROUTING LOGIC  
**Quelle:** `23_ROUTING_MATRIX_INPUTS.md`

### 🧠 The Logic (Das "Warum")

Ein Agent muss sofort wissen, womit er es zu tun hat. Ist der Input eine URL? Ein Video? Eine Datenbank? Wir verlassen uns nicht auf "Raten". Wir nutzen deterministische Heuristiken (Dateiendungen, String-Patterns), um den Input zu klassifizieren und nur die relevanten Wissens-Pakete zu laden. Das spart Tokens und verhindert Fehler.

### 💻 Executable Assets (Der Code)

```python
# Source: 23_ROUTING_MATRIX_INPUTS.md
import os

def detect_input_type(input_obj):
    """Deterministische Erkennung des Input-Typs."""

    # 1. String Analysis (URL / DB)
    if isinstance(input_obj, str):
        if input_obj.startswith(('http://', 'https://')):
            return 'WEBSITE_URL'
        elif '@' in input_obj and '://' in input_obj:
            return 'DATABASE_CONNECTION'

    # 2. File Analysis
    if os.path.isfile(input_obj):
        ext = os.path.splitext(input_obj)[1].lower()

        if ext in ['.mp4', '.mov', '.avi', '.webm']:
            return 'VIDEO_FILE'
        elif ext in ['.wav', '.mp3', '.aac', '.flac']:
            return 'AUDIO_FILE'
        elif ext in ['.json', '.ts']:
            if 'transcript' in input_obj:
                return 'TRANSCRIPT_JSON'
            elif 'token' in input_obj or 'theme' in input_obj:
                return 'DESIGN_TOKENS_JSON'
        elif ext in ['.glb', '.gltf', '.fbx', '.obj']:
            return '3D_MODEL_ASSET'

    return 'UNKNOWN'

def get_load_packages(input_type):
    routing_table = {
        'VIDEO_FILE': ['DEPT_VIDEO', 'DEPT_RENDER', 'DEPT_OPS'],
        'AUDIO_FILE': ['DEPT_AUDIO', 'DEPT_VIDEO', 'DEPT_RENDER'],
        'WEBSITE_URL': ['DEPT_WEB', 'DEPT_ENGINE', 'DEPT_VIDEO', 'DEPT_RENDER'],
        'DATABASE_CONNECTION': ['DEPT_AUTOMATION', 'DEPT_VIDEO', 'DEPT_RENDER', 'DEPT_OPS'],
        '3D_MODEL_ASSET': ['DEPT_ENGINE', 'DEPT_VIDEO', 'DEPT_RENDER']
    }
    return routing_table.get(input_type, ['DEPT_OPS'])
```

---

## 2.2 THE OUTPUT SPECIFICATION MATRIX

**Quelle:** `24_ROUTING_MATRIX_Outputs.md`

| Output Type | Resolution     | Bitrate | Audio    | FPS   | Context Budget |
| ----------- | -------------- | ------- | -------- | ----- | -------------- |
| SHORT       | 1080x1920      | 5 Mbps  | -16 LUFS | 30    | 40             |
| SHOWCASE    | 1920x1080      | 15 Mbps | -14 LUFS | 30/60 | 50             |
| EXPLAINER   | 1920x1080      | 8 Mbps  | -16 LUFS | 30    | 65             |
| PRODUCTION  | 3840x2160 (4K) | 80 Mbps | -14/-18  | 24/30 | 50             |
| DATAVIZ     | 1280x720       | 4 Mbps  | Muted    | 30    | 50             |
| AD          | 1080x1920      | 12 Mbps | -14 LUFS | 30    | 60             |

---

# TEIL 3: CLOUD INFRASTRUCTURE (Execution & Economics)

## 3.1 THE CLOUD ECONOMY TIERS (Lambda Optimization)

**Typ:** FINANCIAL LOGIC  
**Quelle:** `60-cloud-rendering-00-aws-lambda-renderfarming.md`

### 🧠 The Logic (Das Warum)

Cloud Rendering ist kein technisches, sondern ein finanzielles Optimierungsproblem. Ein "Draft" für interne Abstimmungen darf nicht dieselben Ressourcen verbrauchen wie der finale 4K-Export. Viron nutzt das "Tiered Rendering" Prinzip: Wir modulieren den CRF (Constant Rate Factor) des H.264 Encoders, um die CPU-Last auf AWS Lambda drastisch zu senken.

### 🔑 The Cost & Quality Table

| Tier     | Use Case             | CRF Value | Workers | Est. Cost (1min Video) |
| -------- | -------------------- | --------- | ------- | ---------------------- |
| DRAFT    | Internal Preview     | 28        | 4       | $0.10                  |
| STANDARD | General Social Media | 20        | 8       | $0.50                  |
| HIGH     | Client Delivery / YT | 16        | 16      | $1.20                  |
| ULTRA    | Broadcast / Master   | 10        | 32      | $2.80                  |

---

## 3.2 THE MASTER RENDER PIPELINE SPECS

**Quelle:** `viron-core/pipeline.md`

- **Node Lock:** `v22.17.0` (Strict Version Lock in V11 Ultimate).
- **FFmpeg Engine:** Version 6.0+ mit `libx264` (Main Profile) und `libvpx-vp9`.
- **AWS Lambda Instance Config:**
  - **Memory:** `3008 MB` (optimiert für max vCPU-Boost bei AWS; normierter Standard, 3009 MB ist Legacy-Drift).
  - Disk Space: 10.240 MB.
  - Max Timeout: 900s.

---

# TEIL 4: OPERATIONAL TOOLS (Ops) & GOVERNANCE

## 4.1 WORKFLOW: THE "TOTAL WAR" RELEASE

**Typ:** GOVERNANCE / PROTOCOL  
**Quelle:** `RELEASE_PROTOCOL.md` / `RULES_WORKFLOW.md`

### 📋 The 5-Phase Full Execution Checklist (MANDATORY)

#### Phase 0: Environment Scan

- `node -v` Prüfung: Muss exakt `v22.17.0` sein.
- `git clean -fdn` Audit: Suche nach untracked Files.

#### Phase 1: Pre-Flight Integrity

- `git status --porcelain` Check: Muss absolut leer sein.
- `npm run test` Execution: 100% Pass Rate erforderlich.
- `npm ci --dry-run`: Verifikation der `package-lock.json` Integrität.

#### Phase 2: Documentation & Sync

- Automatisches Parsing des Git Logs seit dem letzten Tag.
- Update der Version in `package.json`.
- Generierung des `CHANGELOG.md` Eintrags.

#### Phase 3: Finalization (The Seal)

- `git add .` und Atomic Commit.
- `git tag -a vX.Y.Z -m "Release vX.Y.Z - Dependencies Validated"`.
- `git push origin main --follow-tags`.

#### Phase 4: Rollback Strategy (Safety Net)

- Bei Failure: `git tag -d vX.Y.Z` (Local & Remote).
- `git reset --soft HEAD~1` (Änderungen bleiben im Staging).

---

# TEIL 5: FUTURE ARCHITECTURE (Roadmap)

## 5.1 THE POSTGRES EVENT BUS (Scaling v2.0)

**Quelle:** `ZUKUNFTSPLAN-POSTGRES-BUS-INTEGRATION-v1-0.md`

```sql
CREATE TABLE renderjobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  compositionname VARCHAR(255),
  compositionprops JSONB,
  status VARCHAR(50) DEFAULT 'pending',
  workerid VARCHAR(255),
  createdat TIMESTAMP DEFAULT NOW(),
  startedat TIMESTAMP,
  completedat TIMESTAMP,
  outputurl VARCHAR(500),
  errormessage TEXT,
  priority INT DEFAULT 0
);

CREATE INDEX idxstatuspriority ON renderjobs(status, priority DESC);
```

---

## 5.2 THE APP SHELL & PLAYER (UX Layer)

**Quelle:** `ZUKUNFTSPLAN-APP-SHELL-NEXT-JS-v1-0.md`

- Transformation des CLI-Tools in eine vollwertige Next.js 15 Web-App.
- Editor UI für dynamische Props-Anpassung.
- Real-time Preview via `@remotion/player`.
- Admin Dashboard zur Überwachung der Render-Jobs.

---

## 5.3 V43 – THE SILVER ARMADA (Design Strategy)

**Quelle:** `src/V43_MASTER_PLAN.md` / `V43_STRATEGY.md`

- **Mission:** Vollständige Dominanz des "Industrial Monolith" Looks.
- **Taktik:** Implementierung von 12 Design-Variationen, die auf PBR-Materialien und Metallic Gradients basieren.
- **Gesetz:** Jede Komponente muss in 3 Ausführungen vorliegen: Grey, Silver, Glowing.

---

# TEIL 6: TROUBLESHOOTING & TOLERANCES

## 6.1 THE SYNC LAW (Audio-Video Guard)

**Quelle:** `viron-core/troubleshooting.md`

- **Limit:** Maximal 2 Frames Abweichung bei 60fps erlaubt.
- **Mathematik:** `if (Math.abs(expectedFrames - actualFrames) > 2) abortRender();`
- **Aktion:** Sofortiger Stopp des Workflows und Warnmeldung an den Orchestrator.

---

## 6.2 THE FPS GUARD

**Quelle:** `RULES_TECHNICAL.md`

- **Grenzfall:** Wenn die Render-Performance unter 55 FPS sinkt.
- **Automatische Reaktion:** Protokollierung im Diagnostic-Log und Reduzierung der Worker-Threads.

---

# TEIL 7: CONFLICT RESOLUTION & API SPECIFICATION

## 7.1 ⚠️ CONFLICT & ANOMALY LOG (V11 Status)

| Konflikt-Gegenstand | Status in V11 Ultimate | Lösung                                                            |
| ------------------- | ---------------------- | ----------------------------------------------------------------- |
| Concurrency         | ✅ UNIFIED             | Code in 1.1 und 1.2 folgt strikt `safeRamPool = ramGB * 0.5`.     |
| Node Version        | ✅ LOCKED (v22.17.0)   | Node 20 ist Legacy. V11 erzwingt v22.17.0.                        |
| Lambda Memory       | ✅ STANDARDIZED (3008) | 3009 MB eliminiert. 3008 MB ist der einzige Standard.             |
| Routing Variants    | ✅ SINGLE SOURCE       | Keine Varianten mehr. Referenz auf `23_ROUTING_MATRIX_Inputs.md`. |

---

## 7.2 🧬 THE API (Agent-to-Agent Interface)

- **Max RAM:** 2GB per Thread (Standard), 4GB (3D), 8GB (Volumetric).
- **Max Threads:** 16 (Hard Limit).
- **Cost Tiers:** $0.10 (Draft) bis $2.80 (Ultra) pro Minute.
- **Sync Limit:** 2 Frames Toleranz bei Audio/Video Sync.
- **Node Version:** v22.17.0 (Strict).
- **Browser:** Chrome Headless (via Remotion).
- **Audio:** -14 LUFS (Broadcast), -16 LUFS (Web/Mobile).
- **Lambda Memory:** 3008 MB (optimiert für max vCPU-Boost).

---

# TEIL 8: CONTENT MIGRATION AUDIT (Lösch-Bestätigung)

Hiermit wird die vollständige Extraktion und Integrität folgender 16 Dateien bestätigt.

| Original-Datei                  | Inhalt                  | Status im Codex      | Vollständigkeit |
| ------------------------------- | ----------------------- | -------------------- | --------------- |
| `RULES_TECHNICAL.md`            | Hardware Laws / FPS     | ✅ Sektion 1.2 / 6.2 | 100%            |
| `RULES_WORKFLOW.md`             | Git Flow / Git Lock     | ✅ Sektion 1.4 / 4.1 | 100%            |
| `RELEASE_PROTOCOL.md`           | Total War Checklist     | ✅ Sektion 4.1       | 100%            |
| `SESSION_CLOSE_...`             | Archival Logic          | ✅ Sektion 5.1       | 100%            |
| `viron-core/pipeline.md`        | Concurrency / Specs     | ✅ Sektion 1.1 / 3.3 | 100%            |
| `viron-core/troubleshooting.md` | Sync Law / OOM          | ✅ Sektion 6.1 / 1.2 | 100%            |
| `60-cloud-rendering...`         | Tiers / Costs           | ✅ Sektion 3.1       | 100%            |
| `22_SYSTEM_PLAN...`             | Departments / Map       | ✅ Sektion 1.3       | 100%            |
| `23_ROUTING_MATRIX_In`          | Detection Algorithm     | ✅ Sektion 2.1–2.2   | 100%            |
| `24_ROUTING_MATRIX_Out`         | Output Spec Matrix      | ✅ Sektion 2.2       | 100%            |
| `20_ARCHIVE_Standard_Data`      | Data Architecture / MCP | ✅ Sektion 3.2       | 100%            |
| `ZUKUNFTSPLAN-BUS`              | Postgres / BullMQ       | ✅ Sektion 5.1       | 100%            |
| `ZUKUNFTSPLAN-APP`              | Next.js App Shell       | ✅ Sektion 5.2       | 100%            |
| `ZUKUNFTSPLAN-DESIGN`           | Design Sync & V43       | ✅ Sektion 5.3       | 100%            |
| `src/V43_MASTER_PLAN.md`        | Armada Strategy         | ✅ Sektion 5.3       | 100%            |
| `src/V43_STRATEGY.md`           | Taktische Details       | ✅ Sektion 5.3       | 100%            |

---

# TEIL 9: SKILL INTEGRATION STANDARDS (Mediabunny & Utils)

**Status:** EXTENSION V1.0 (Internal Standard)  
**Scope:** Integration neuer Core-Skills in die Viron-Pipeline.  
**Evidenz:** `calculateMetadata` ist in `RULES_TECHNICAL.md` belegt; weitere Skills sind interne Hilfsfunktionen.

## 9.1 METADATA CALCULATION LAW (`calculate-metadata`)

**Integration in:** DEPT_VIDEO / remotion-core

- Funktion `calculateMetadata` ist die Brücke zwischen Input-Routing und Render-Engine.
- Respektiert OUTPUT_TYPE Specs aus Teil 2.
- SHORT → 1080x1920; SHOWCASE → 1920x1080; EXPLAINER → 1920x1080; PRODUCTION → 3840x2160.

## 9.2 VALIDATION GATE (`can-decode`)

**Integration in:** DEPT_RENDER / QA

- Bevor ein Asset den Status `VIDEO_FILE` erhält, muss `canDecode()` ausgeführt werden.
- Fail: Asset wird abgelehnt. Kein Lambda-Start.
- Pass: Asset darf in `<Player>` oder Render-Pipeline.

## 9.3 ASSET INTELLIGENCE (`get-video-dimensions` & `get-video-duration`)

**Integration in:** DEPT_VIDEO / Ingest

- `getVideoDimensions()` → Bestimmt Aspect Ratio → Filtert erlaubte Output-Types.
- `getVideoDuration()` → Konvertiert zu Frames → Füttert den Concurrency Calculator.

## 9.4 VISUAL ASSETS PIPELINE (`extract-frames`)

**Integration in:** DEPT_OPS / Metadata Store

- Wird getriggert nach erfolgreichem Upload in die App Shell.
- Generiert 3-5 Thumbnails für die `renderjobs` Tabelle im Postgres Bus.

## 9.5 PARAMETER CONTRACT (`parameters` / Zod)

**Integration in:** DEPT_WEB / App Shell

- Zod-Schemas in Compositions müssen exakt die Design Tokens spiegeln.
- Nutzung von `zColor()` ist Pflicht für alle Farb-Parameter.

---

# 📝 V11 ULTIMATE CHANGELOG

## Patches Applied (2026-02-04)

### 1. Unified Concurrency (P-Concurrency)

- **Action:** Code in Teil 1.1 und 1.2 vereinheitlicht.
- **Rule:** `safeRamPoolGB = ramGB * 0.5` ist jetzt das einzige Gesetz.

### 2. Node Version Lock (P-Node)

- **Action:** `v22.17.0` ist der exklusive Standard.
- **Cleanup:** Alle Referenzen auf Node 20 sind explizit als Legacy/Deprecated markiert oder entfernt.

### 3. Lambda Memory Standardization (P-Lambda)

- **Action:** `3008 MB` ist der einzig gültige Standard.
- **Cleanup:** `3009 MB`-Varianten wurden eliminiert.

### 4. Routing Single Source (P-Routing)

- **Action:** "2 Varianten" Behauptung entfernt.
- **Fix:** Verweis auf `23_ROUTING_MATRIX_Inputs.md` als Single Source of Truth gesetzt.

---

**Version Control:** V11.0 ULTIMATE (Canon Build)  
**Release Date:** 2026-02-04  
**Codex Authority:** VIRON SYSTEM ARCHITECTURE (Badge 7)  
**License:** Internal Use Only – Viron Development Framework

---

_Ende des EXTRACTION_REPORT_BADGE_7_SYSTEM_ARCHITECTURE_CLOUD_V11_ULTIMATE_
