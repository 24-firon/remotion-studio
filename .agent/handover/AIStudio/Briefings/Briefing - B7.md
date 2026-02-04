🧬 SUB-AGENT BRIEFING: BADGE 7 (SYSTEM ARCHITECTURE \& CLOUD)

Version: 3.0 (Forensic Deep Dive)

Status: INTERNAL\_ONLY

Target: Extraction of the Viron Operating System Logic

MISSION: Extrahiere das "Nervensystem" von Viron. Nicht wie man ein Video macht (Badge 1-6), sondern wie das System entscheidet, welches Video gemacht wird, wo es gerendert wird und wie es ausgeliefert wird.

📊 EXECUTIVE BRIEFING

Dimension	Fokus	Quelle (Primary)

Routing Logic	Wie erkennt der Agent den Input?	23\_ROUTING\_MATRIX\_INPUTS.md

Cloud Infra	AWS Lambda Tiers \& Costs	60-cloud-rendering...

Hardware Laws	RAM vs. Concurrency Formeln	RULES\_TECHNICAL.md, pipeline.md

Release Ops	"Total War" Protocol	RELEASE\_PROTOCOL.md

Future Stack	Postgres/Bull Queue Architecture	ZUKUNFTSPLAN-POSTGRES...

1\. 🏛️ SYSTEM ARCHITECTURE (The Laws)

THE CONCURRENCY CALCULATOR

Typ: HARD CONSTRAINT

Quelle: pipeline.md, RULES\_TECHNICAL.md

Aufgabe: Extrahiere die exakte Formel zur Berechnung der Render-Prozesse.

Suche nach: Math.min(optimalConcurrency, ramLimit, 16)

Kontext: Warum limitieren wir auf halbes RAM? (OOM Prevention).

Viron Delta: Standard Remotion nutzt oft os.cpus(). Viron nutzt Scene Weight.

THE DEPARTMENT ACCESS CONTROL

Typ: SECURITY ARCHITECTURE

Quelle: 22\_SYSTEM\_PLAN\_FOLDER\_STRUCTURE.md

Aufgabe: Extrahiere die Zugriffs-Matrix.

Tabelle: Wer darf wen lesen? (z.B. ENGINE -> VIDEO = ✅, WEB -> ENGINE = ⚠️ Tokens only).

Logik: Vermeidung von Context-Bloat durch strikte Trennung.

2\. 🧠 ORCHESTRATION ENGINE (Routing)

THE INPUT CLASSIFICATION MATRIX

Typ: DECISION TREE

Quelle: 23\_ROUTING\_MATRIX\_INPUTS.md

Aufgabe: Extrahiere den Python-Pseudocode detect\_input\_type.

Logik: Wie unterscheidet das System VIDEO\_FILE von WEBSITE\_URL?

Load-Pakete: Welche Departments werden basierend auf dem Input geladen?

THE OUTPUT SPECIFICATION MATRIX

Typ: CONFIGURATION

Quelle: 24\_ROUTING\_MATRIX\_OUTPUTS.md

Aufgabe: Extrahiere die technischen Specs für jeden Output-Typ.

Tabelle: SHORT vs SHOWCASE vs PRODUCTION.

Werte: Bitrates, Codecs, LUFS (Audio Normalization).

3\. ☁️ CLOUD INFRASTRUCTURE (Execution)

THE LAMBDA COST TIERS

Typ: FINANCIAL LOGIC

Quelle: 60-cloud-rendering...

Aufgabe: Extrahiere die Kosten-Nutzen-Rechnung.

Tabelle: Draft (

0.10

)

v

s

.

U

l

t

r

a

(

0.10)vs.Ultra(

2.80).

Config: Welche crf Werte und workers gehören zu welchem Tier?

THE MCP DATA BRIDGE

Typ: INTEGRATION PATTERN

Quelle: 20\_ARCHIVE\_Supabase...

Aufgabe: Extrahiere das Pattern "Video als Database Query".

Code: Wie nutzt Claude MCP, um Live-Daten in Remotion Props zu injizieren?

Workflow: Supabase -> MCP -> Remotion Props.

4\. 🛠️ OPERATIONAL TOOLS (Ops)

THE "TOTAL WAR" RELEASE PROTOCOL

Typ: GOVERNANCE

Quelle: RELEASE\_PROTOCOL.md

Aufgabe: Extrahiere die 4 Phasen des Releases.

Checks: Environment Scan (node -v), Git Status Forensic.

Rollback: Die automatisierte Rollback-Strategie.

THE RENDER PIPELINE

Typ: WORKFLOW

Quelle: pipeline.md

Aufgabe: Extrahiere die 3 Rendering-Modi.

Local: Preview \& Dev.

Lambda: Production Scale.

API: Programmatic Triggering.

5\. 🔮 FUTURE ARCHITECTURE (Roadmap)

Quelle: ZUKUNFTSPLAN\_\*.md

Aufgabe: Dokumentiere die geplante Architektur als "Target State".

App Shell: Next.js App Router Integration.

Queue: Postgres + Bull Queue für asynchrones Rendering.

Design Sync: Shared Tokens zwischen Web und Video.

⚠️ 6. CONFLICT \& ANOMALY LOG (Forensic Watchlist)

Conflict: pipeline.md erwähnt Docker-Rendering, 60-cloud-rendering... fokussiert auf Lambda.

Auflösung: Lambda ist Current State, Docker ist Future/Alternative State. Extrahiere beides mit entsprechendem Label.

Conflict: RULES\_TECHNICAL.md vs pipeline.md bei Concurrency.

Auflösung: RULES\_TECHNICAL.md ist das Gesetz (Tier 1).

