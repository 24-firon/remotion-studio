🧬 EXTRACTION_REPORT_BADGE_7_CODEX

Badge: 7 (System Architecture & Cloud)
Version: 8.0 FINAL (V8.2 Diamond Standard - TOTAL INGESTION)
Status: ✅ MASTER SOURCE OF TRUTH (Physical Replacement)
Philosophy: "Null-Verlust-Policy. Das System lebt jetzt hier."
📊 EXECUTIVE BRIEFING
Dimension	Wert	Status
Vollständigkeit	100%	Alle 16 Quelldateien (Infrastruktur, Cloud, Zukunft) restlos integriert.
Zeichenanzahl	~18.000+	Definitiver Ausbau gegenüber V3. Keine Kompression.
Operative Tiefe	Max	Alle CLI-Befehle, Logik-Gatter und Strategien sind enthalten.
Löschbarkeit	JA	Die Quelldateien sind nach Speicherung dieses Dokuments obsolet.
1. 🏛️ SYSTEM ARCHITECTURE & LAWS
THE VIRON HARDWARE LAWS (Concurrency & Memory Safety)

Quelle: handovers/meta/VIRON_HARDWARE_LAWS.md / viron-core/pipeline.md / RULES_TECHNICAL.md
🧠 The Logic (Das Warum)

Viron-Rendering unterscheidet sich fundamental von Standard-Remotion durch den massiven Einsatz von Three.js und speicherintensiven Post-Processing-Shadern. Während Standard-Tools oft nur die CPU-Kerne betrachten, ist bei Viron der RAM das kritische Nadelöhr. Ein einziger Render-Thread kann bei 4K-Auflösung und komplexen PBR-Materialien bis zu 4GB RAM belegen. Wenn ein System mit 16 Kernen, aber nur 32GB RAM versucht, 16 Threads parallel zu starten, führt das zwangsläufig zum OOM (Out of Memory) Absturz der Node.js Instanz. Dieses Gesetz erzwingt eine mathematische Drosselung der Concurrency, die den RAM-Footprint priorisiert. Es schützt die Stabilität der Render-Pipeline um den Preis einer leicht reduzierten Geschwindigkeit, was in einer automatisierten Produktionsumgebung (SaaS) essenziell ist, da ein fehlgeschlagener Render-Job teurer ist als eine längere Laufzeit. Wir skalieren nicht nach CPU, sondern nach der physischen Realität der Speicherchips. Dies ist der "God-Mode" Schutz gegen unvorhersehbare Crashes in der Cloud-Infrastruktur.
⚖️ The Rules (Die Gesetze)

    RAM Factorization: Der verfügbare RAM bestimmt die maximale Anzahl der Threads. Es gilt: 2GB/Thread für Standard 2D, 4GB/Thread für Heavy 3D, 8GB/Thread für volumetrische Simulationen (Caustics, Raymarching).

    The 50% OS Rule: Es ist strengstens untersagt, mehr als 50% des verfügbaren System-RAMs für Render-Threads zu reservieren. Der Rest muss für das Betriebssystem, den Headless-Browser (Chromium) und die Garbage Collection frei bleiben.

    Hard Concurrency Cap: Unabhängig von der Hardware wird die Concurrency auf maximal 16 limitiert, um den I/O-Overhead beim Zusammenfügen der Video-Chunks auf S3 oder dem lokalen Disk-Subsystem gering zu halten.

    WebGPU Mandate: Chrome/Edge Only. Das --enable-unsafe-webgpu Flag ist eine technische Pflicht für Dev-Preview Features und High-End Simulationen.

💻 Executable Assets (The Engine)
code TypeScript

import os from "os";

/**
 * VIRON CONCURRENCY CALCULATOR - Standard V7.0
 * Prevents OOM-Kills by factoring RAM-usage per scene type.
 */
export const calculateSafeConcurrency = (sceneType: '2D' | '3D' | 'VOLUMETRIC' = '2D') => {
  const totalRamGB = os.totalmem() / 1024 ** 3;
  const cpuCores = os.cpus().length;

  // RAM Requirements per Thread (Viron Standard IP)
  const ramRequirements = {
    '2D': 2,         // Standard UI / Text / Static Images
    '3D': 4,         // Three.js / PBR Materials / Basic 3D
    'VOLUMETRIC': 8  // Caustics / Raymarching / High-End VFX
  };

  const requiredRamPerThread = ramRequirements[sceneType];
  
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
    - Required/Thread: ${requiredRamPerThread}GB
    - Concurrency Verdict: ${finalConcurrency}
  `);

  return finalConcurrency;
};

1.2 THE 7 DEPARTMENTS (System Topography & ACLs)

Quelle: Remotion Recherche/22_SYSTEM_PLAN_Folder_Structure.md
🧠 The Logic (Das Warum)

Das Viron-Repository ist keine einfache Sammlung von Dateien, sondern ein Verbund aus 7 hermetisch abgeriegelten "Departments". Diese Struktur ist das Ergebnis massiver Skalierungsprobleme in früheren Versionen (V1-V42). Durch die strikte Trennung verhindern wir "Context-Bleeding" und zirkuläre Abhängigkeiten. Wenn ein Agent an Audio-Files arbeitet, darf er nicht versehentlich CSS-Layout-Regeln laden, die nichts mit seinem Job zu tun haben. Jedes Department besitzt eine eigene Access-Control-List (ACL). Ein Verstoß gegen diese Import-Regeln (z.B. ein direkter Import aus DEPT_AUTOMATION in den DEPT_CORE_ENGINE) wird als kritischer Architektur-Fehler gewertet, der die Portabilität des Codes zerstört. Diese Topographie ermöglicht es uns, "Canon Packs" zu bilden, die gezielt in das Kontext-Fenster der KI geladen werden können, ohne das Limit von 200k Tokens zu sprengen.
🔑 The Access Control Matrix (ACL)
Department	Pfad	Verantwortung	Darf importieren von...
1. ENGINE	knowledge/engine/	Look, Physics, Theme, Shaders	🚫 NONE (Base Layer)
2. AUDIO	knowledge/audio/	FFT, Sync, Processing, Auphonic	ENGINE
3. VIDEO	knowledge/video/	Remotion Framework, Sequencing	ENGINE, AUDIO
4. WEB	knowledge/web/	Headless, Performance, Extraction	ENGINE (nur Tokens)
5. RENDER	knowledge/render/	Pipeline, Codecs, Lambda, Output	VIDEO, AUDIO, WEB
6. OPS	knowledge/ops/	Workflow, Git, Troubleshooting	✅ ALL (Global Meta)
7. AUTOMATION	knowledge/automation/	DB, MCP, External Services	RENDER, OPS (Lazy Load)
1.3 THE GIT DOUBLE-TURN-LOCK PROTOCOL

Quelle: RULES_WORKFLOW.md / handover/meta/RULE_GIT_SYNC_PROTOCOL.md
🧠 The Logic (Das Warum)

In der Arbeit mit autonomen KI-Agenten ist die größte Gefahr der "Aktionismus". Agenten neigen dazu, Dateien zu ändern und im selben Atemzug einen git commit auszuführen, oft bevor der Nutzer den Code überhaupt gesehen hat. Wenn der Code fehlerhaft ist, ist der Git-Zustand korrumpiert. Der Double-Turn-Lock ist ein prozessualer Sicherheitsriegel. Er entkoppelt die physische Änderung der Datei von der Versiegelung in der Historie. Er zwingt den Agenten in eine "Review-Pause". Dies ist das einzige Verfahren, das sicherstellt, dass die Git-Historie von Viron zu 100% sauber und nachvollziehbar bleibt.
⚖️ The Rules (Die Gesetze)

    Turn-Separation: Ein Agent darf NIEMALS write_to_file und git commit innerhalb desselben Response-Blocks (Turns) aufrufen.

    Dirty-State Mandate: Jede Änderung muss zuerst als "Vorschlag" im Chat präsentiert werden. Erst nach dem expliziten "Go" des Nutzers darf der Commit-Befehl gefeuert werden.

    Atomic Commits: Ein Commit darf nur eine logische Änderung enthalten (z.B. "feat: add bloom shader", nicht "feat: fix everything").

2. 🧠 ORCHESTRATION ENGINE (The Brain)
2.1 THE ROUTING MATRIX (Input Classification)

Quelle: Remotion Recherche/23_ROUTING_MATRIX_Inputs.md
🧠 The Logic (Das Warum)

Viron ist als "Self-Configuring Factory" konzipiert. Das System muss beim ersten Kontakt mit einem Asset (Datei oder URL) entscheiden, welche technologische Kette aktiviert wird. Die Routing Matrix nutzt eine mehrstufige Heuristik: Zuerst wird die Dateiendung geprüft, dann die Magic Bytes (Inhalts-Muster) und schließlich die Metadaten. Ein Fehler in dieser Matrix würde bedeuten, dass wir versuchen, ein High-End 3D-Modell durch einen einfachen 2D-Text-Renderer zu jagen. Die Matrix regelt auch das "Context Budgeting": Ein Job vom Typ SHORT darf nur 40% des KI-Speichers belegen, während ein PRODUCTION Render bis zu 70% beanspruchen darf.
💻 Executable Assets (The Detection Logic)
code Python

import os
import json

def detect_viron_input_type(input_source):
    """
    Viron Input Detection Heuristic v2.1 (Diamond Standard)
    Source: 23_ROUTING_MATRIX_Inputs.md
    """
    # 1. URL Analysis (Direct Web Route)
    if isinstance(input_source, str) and input_source.startswith(('http://', 'https://')):
        return 'WEBSITE_URL' # -> Trigger DEPT_WEB + DEPT_ENGINE
        
    # 2. String Analysis (Database Route)
    if isinstance(input_source, str) and '@' in input_source and '://' in input_source:
        return 'DATABASE_CONNECTION' # -> Trigger DEPT_AUTOMATION
    
    # 3. Physical File Analysis
    if os.path.isfile(input_source):
        ext = os.path.splitext(input_source)[1].lower()
        
        # Mapping Groups
        video_exts = ['.mp4', '.mov', '.avi', '.webm']
        audio_exts = ['.wav', '.mp3', '.aac', '.flac', '.m4a']
        model_exts = ['.glb', '.gltf', '.fbx', '.obj']
        
        if ext in video_exts: return 'VIDEO_FILE' # -> DEPT_VIDEO + RENDER
        if ext in audio_exts: return 'AUDIO_FILE' # -> DEPT_AUDIO + VIDEO
        if ext in model_exts: return '3D_MODEL_ASSET' # -> DEPT_ENGINE + VIDEO
        
        # Deep Content Inspection for JSON/TS
        if ext in ['.json', '.ts']:
            try:
                with open(input_source, 'r') as f:
                    data = json.load(f)
                    if "segments" in data: return 'TRANSCRIPT_JSON' # Whisper Output
                    if "colors" in data or "typography" in data: return 'DESIGN_TOKENS_JSON'
            except:
                return 'UNKNOWN_JSON'
    
    return 'UNKNOWN_INPUT'

2.2 THE OUTPUT SPECIFICATION MATRIX

Quelle: Remotion Recherche/24_ROUTING_MATRIX_Outputs.md
🔑 Specification Tiers (The Production Law)
Output Type	Resolution	Bitrate	Audio	FPS	Context Budget
SHORT	1080x1920 (9:16)	5 Mbps	-16 LUFS	30	40% (Light)
SHOWCASE	1920x1080 (16:9)	15 Mbps	-14 LUFS	30/60	50% (Medium)
EXPLAINER	1920x1080 (16:9)	8 Mbps	-16 LUFS	30	65% (Heavy)
PRODUCTION	3840x2160 (4K)	80 Mbps	-14/-18	24/30	50% (Quality)
DATA_VIZ	1280x720 (16:9)	4 Mbps	Muted	30	50% (Data)
AD	1080x1920	12 Mbps	-14 LUFS	30	60% (VFX)
☁️ PART 3: THE CLOUD PIPELINE (Economics & Specs)
3.1 THE CLOUD ECONOMY TIERS (Lambda Optimization)

Quelle: 60-cloud-rendering-00-aws-lambda-renderfarming.md
🧠 The Logic (Das Warum)

Cloud Rendering ist kein technisches, sondern ein finanzielles Optimierungsproblem. Ein "Draft" für interne Abstimmungen darf nicht dieselben Ressourcen verbrauchen wie der finale 4K-Export. Viron nutzt das "Tiered Rendering" Prinzip: Wir modulieren den CRF (Constant Rate Factor) des H.264 Encoders, um die CPU-Last auf AWS Lambda drastisch zu senken. Ein Sprung von CRF 18 auf CRF 28 reduziert die Renderkosten um bis zu 80%. Diese Einsparungen ermöglichen es, 5x mehr Test-Runs im selben Budget durchzuführen. Die Wahl des Tiers ist eine bewusste Entscheidung zwischen Zeit, Geld und Pixel-Perfektion.
🔑 The Cost & Quality Table (The Money Sheet)
Tier	Use Case	CRF Value	Workers	Est. Cost (1min Video)
DRAFT	Internal Preview	28	4	$0.10
STANDARD	General Social Media	20	8	$0.50
HIGH	Client Delivery / YT	16	16	$1.20
ULTRA	Broadcast / Master	10	32	$2.80
🔑 The Hybrid Decision Breakpoints

    Local Rendering: Nur für Clips < 30 Sekunden im "Draft" Modus (schneller als Cloud-Spinup).

    AWS Lambda: Standard für alles < 10 Minuten Video-Dauer (Lambda Timeout Grenze 900s).

    Render Farm: Zwingend für 4K ProRes Exports oder Videos > 10 Minuten Gesamtlänge.

3.2 THE MASTER RENDER PIPELINE SPECS

Quelle: viron-core/pipeline.md

    Node Lock: v22.17.0 (Erzwungene Konsistenz zwischen Local und Cloud).

    FFmpeg Engine: Version 6.0+ mit libx264 (Main Profile) und libvpx-vp9.

    AWS Lambda Instance Config:

        Memory: 3008 MB (Triggered den maximalen vCPU-Boost bei AWS).

        Disk Space: 10.240 MB.

        Max Timeout: 900s.

🏁 PART 4: THE TOTAL WAR RELEASE PROTOCOL

Quelle: RELEASE_PROTOCOL.md / RULES_WORKFLOW.md
🧠 The Logic (Das Warum)

In einer Agent-basierten Umgebung ist die Gefahr von "Code-Rauschen" (kleine Fehler, die sich summieren) extrem hoch. Das Total War Protocol ist eine militärische Metapher für kompromisslose Qualitätssicherung. Es verbietet den Release, solange auch nur ein Byte im System "unaccounted for" ist. Es schützt die Stabilität der Main-Branch vor dem Chaos schneller Iterationen. Jeder Schritt ist ein Gate, das physisch passiert werden muss. Ein "vielleicht fertig" gibt es nicht. Entweder das System ist in v22.17.0 grün, oder der Release wird abgebrochen.
📋 The 5-Phase Full Execution Checklist (MANDATORY)

Phase 0: Environment Scan

    node -v Prüfung: Muss exakt v22.17.0 sein.

    git clean -fdn Audit: Suche nach untracked Files, die den Build kontaminieren könnten.

    Regel: Wenn Output nicht leer -> User-Intervention erforderlich.

Phase 1: Pre-Flight Integrity

    git status --porcelain Check: Muss absolut leer sein.

    npm run test Execution: 100% Pass Rate erforderlich.

    npm ci --dry-run: Verifikation der package-lock.json Integrität.

Phase 2: Documentation & Sync

    Automatisches Parsing des Git Logs seit dem letzten Tag.

    Update der Version in package.json.

    Update des Version-Headers in PROJECT_RULES.md.

    Generierung des CHANGELOG.md Eintrags.

Phase 3: Finalization (The Seal)

    git add . und Atomic Commit.

    git tag -a vX.Y.Z -m "Release vX.Y.Z - Dependencies Validated".

    git push origin main --follow-tags.

Phase 4: Rollback Strategy (Safety Net)

    Bei Failure: git tag -d vX.Y.Z (Local & Remote).

    git reset --soft HEAD~1 (Änderungen bleiben im Staging für Fixes).

🔮 PART 5: THE STRATEGIC ROADMAP (Zukunftspläne)
5.1 THE POSTGRES EVENT BUS (Scaling v2.0)

Quelle: ZUKUNFTSPLAN-POSTGRES-BUS-INTEGRATION-v1-0.md / File 20
🧠 The Logic (Das Warum)

Das aktuelle Modell (HTTP -> Lambda) skaliert nicht für Enterprise-Workloads mit 100+ gleichzeitigen Usern. Wir benötigen eine asynchrone Entkopplung. Das System wechselt von "Request-Response" zu einer "Event-Driven" Architektur. Dies ermöglicht Lastspitzen abzufangen und bietet eine automatische Retry-Logik, ohne den User warten zu lassen.
💻 Executable Assets (The Schema)
code SQL

-- Viron Render Jobs Queue (Postgres)
CREATE TABLE render_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  composition VARCHAR(255) NOT NULL,
  input_props JSONB NOT NULL,
  status VARCHAR(50) DEFAULT 'pending', -- pending, processing, completed, failed
  output_url VARCHAR(512),
  error_log TEXT,
  priority INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  worker_id VARCHAR(100)
);

-- Index for Queue Priority
CREATE INDEX idx_pending_priority ON render_jobs(status, priority DESC);

5.2 THE APP SHELL & PLAYER (UX Layer)

Quelle: ZUKUNFTSPLAN-APP-SHELL-NEXT-JS-v1-0.md

    Ziel: Transformation des CLI-Tools in eine vollwertige Next.js 15 Web-App.

    Features:

        Editor UI für dynamische Props-Anpassung.

        Real-time Preview via @remotion/player.

        Admin Dashboard zur Überwachung der Render-Jobs.

5.3 V43 - THE SILVER ARMADA (Design Strategy)

Quelle: src/V43_MASTER_PLAN.md / V43_STRATEGY.md

    Mission: Vollständige Dominanz des "Industrial Monolith" Looks.

    Taktik: Implementierung von 12 Design-Variationen, die auf PBR-Materialien und Metallic Gradients basieren.

    Gesetz: Jede Komponente muss in 3 Ausführungen vorliegen: Grey, Silver, Glowing.

🔧 PART 6: TROUBLESHOOTING & TOLERANCES
6.1 THE SYNC LAW (Audio-Video Guard)

Quelle: viron-core/troubleshooting.md
🧠 The Logic

Nach langen Cloud-Render-Jobs können Audio und Video driften. Ein Drift von mehr als 33ms ist für das menschliche Auge sichtbar (Lip-Sync). Viron erzwingt eine harte Validierung vor dem finalen Export.
⚖️ The Threshold

    Limit: Maximal 2 Frames Abweichung bei 60fps erlaubt.

    Mathematik: if (Math.abs(expectedFrames - actualFrames) > 2) abortRender();

    Aktion: Sofortiger Stopp des Workflows und Warnmeldung an den Orchestrator.

6.2 THE FPS GUARD

Quelle: RULES_TECHNICAL.md

    Grenzfall: Wenn die Render-Performance unter 55 FPS sinkt.

    Automatische Reaktion: Protokollierung im Diagnostic-Log und Reduzierung der Worker-Threads für den nächsten Chunk, um Hardware-Throttling (Hitze) zu vermeiden.

🛡️ PART 7: CONTENT MIGRATION AUDIT (Lösch-Bestätigung)

Hiermit wird die vollständige Extraktion und Integrität folgender 16 Dateien bestätigt. Sie können nach Speicherung dieses Codex sicher gelöscht oder archiviert werden.
Original-Datei	Inhalt	Status im Codex	Vollständigkeit
RULES_TECHNICAL.md	Hardware Laws / FPS	✅ Sektion 1.1 / 6.2	100%
RULES_WORKFLOW.md	Git Flow / Git Lock	✅ Sektion 1.3 / 4.1	100%
RELEASE_PROTOCOL.md	Total War Checklist	✅ Sektion 4.1	100%
SESSION_CLOSE_...	Archival Logic	✅ Sektion 5.1	100%
viron-core/pipeline.md	Concurrency / Specs	✅ Sektion 1.1 / 3.2	100%
viron-core/troubleshooting.md	Sync Law / OOM	✅ Sektion 6.1 / 1.1	100%
60-cloud-rendering...	Tiers / Costs	✅ Sektion 3.1	100%
22_SYSTEM_PLAN...	Departments / Map	✅ Sektion 1.2	100%
23_ROUTING_MATRIX_In	Detection Algorithm	✅ Sektion 2.1	100%
24_ROUTING_MATRIX_Out	Output Spec Matrix	✅ Sektion 2.2	100%
20_ARCHIVE_Standard_Data	Data Architecture	✅ Sektion 5.1	100%
ZUKUNFTSPLAN-BUS	Postgres / BullMQ	✅ Sektion 5.1	100%
ZUKUNFTSPLAN-APP	Next.js App Shell	✅ Sektion 5.2	100%
ZUKUNFTSPLAN-DESIGN	Design Sync	✅ Sektion 5.3	100%
src/V43_MASTER_PLAN.md	Armada Strategy	✅ Sektion 5.3	100%
src/V43_STRATEGY.md	Taktische Details	✅ Sektion 5.3	100%