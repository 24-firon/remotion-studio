# 🎯 EXTRACTION REPORT: BADGE 8 (AGENT GOVERNANCE & AI SYNERGIES)

**Version:** 1.0 (Platinum Structure - V3 Standard)  
**Status:** ✅ COMPLETE  
**Analyst:** Viron AI Systems Architect  
**Date:** 2026-02-01  

---

## 📊 EXECUTIVE SUMMARY

| Metrik | Ergebnis | Delta zu Badge 7 |
|:-------|:---------|:-----------------|
| Files Audited | 9 | +3 |
| Governance Rules | 12 Hard Rules | New |
| AI Synergies | 3 Architecture Patterns | New |
| Token Tiers | 4 Content Tiers | New |
| Agent Levels | 3 Delegation Types | New |
| Critical Findings | 5 | New |

**Kern-Erkenntnis:** Das Viron-System operiert als **Token-Ökonomie mit stricten Budget-Limits**. Agent-Governance ist kein "Nice-to-have", sondern architectural necessity bei 200k Token Hard Cap.

---

## 🔴 CRITICAL FINDINGS

---

### THE TOKEN ECONOMY

**Quelle:** [`docs/TOKEN_BUDGET.md`](../../docs/TOKEN_BUDGET.md) (Lines 1-61)  
**Typ:** GOVERNANCE_RULE (ARCHITECTURAL LAW)

**Kontext (V1):**  
Context ist die wertvollste Ressource in AI-gestützten Workflows. Nicht Code-Qualität, nicht Tool-Choice - **Context Window Management** bestimmt Erfolg oder Scheitern.

**Das Problem:**
- Ohne Budget-Limits: Agents laden 180k+ Tokens → "Lazy Behavior" (Agent wird träge, halluziniert)
- Complex Topics (3D, Audio, Physics) require extensive explanation
- Cutting context short → Hallucinations
- Too much boilerplate → Token waste

**Die Viron-Lösung:**
Ein **4-Tier Content Investment Strategy** mit stricten Budget-Zuweisungen:

**Die Zahl:** 🔑 **200k Hard Limit / 50k Sweet Spot**

| Role | Budget | Strategy |
|:-----|:-------|:---------|
| Supervisor (Orchestrator) | 🔑 **Max 200k** | Unload Phase 4 modules when approaching 180k |
| Task Agent (Sub-Process) | 🔑 **Target 50k** | Surgical context loading only |

**Content Tiers:**

| Tier | Type | Token Budget | Strategy |
|:-----|:-----|:-------------|:---------|
| **TIER 1** | CORE DOMAIN | 🔑 **10k-20k** | MAXIMUM DETAIL - Do not summarize |
| **TIER 2** | GUIDES | 🔑 **2k-5k** | OPERATIONAL - Patterns & Examples |
| **TIER 3** | REFERENCE | 🔑 **<1k** | FACTUAL - Just numbers/specs |
| **TIER 4** | LOGS/LISTS | 🔑 **<500** | POINTERS - Lists of links only |

**Beweis:**
```markdown
## 2. ACCOUNTING STANDARDS

### The "Supervisor" (You)
- **Max Cap:** 200,000 Tokens.
- **Danger Zone:** > 180,000 Tokens (Performance degrades, "Lazy" behavior starts).
- **Strategy:** If you approach the limit, you MUST unload Phase 4 (Lazy Load) modules.

### The "Task Agent" (Sub-Process)
- **Target:** 50,000 Tokens.
- **Why?** Faster inference, higher focus, lower cost.
```

**Lazy Loading Rule:**  
"Even if we have perfectly sized files, we **NEVER** load everything at once."  
- ❌ Bad: Reading `src/learnings/` recursively at boot  
- ✅ Good: Read `documentation_manifest.md` at boot, load specific files on-demand

---

### THE SEMANTIC TRUTH HIERARCHY

**Quelle:** [`docs/RESEARCH_Semantic_Triggers.md`](../../docs/RESEARCH_Semantic_Triggers.md) (Lines 1-91)  
**Typ:** GOVERNANCE_RULE (ANTI-HALLUCINATION)

**Kontext (V1):**  
Agents halluzinieren, wenn sie vor konfliktären Informationen stehen. Ohne klare Priorisierung raten sie - mit katastrophalen Folgen für DB-Schema und API-Contracts.

**Das Problem:**
- Context Window Limit (10k files too much)
- Hallucination (Agent guesses DB schema)
- Conflict (Old docs vs. new code)

**Die Viron-Lösung:**  
**8 Levels of Truth** - Strikte Priorisierung bei Konflikten:

**Die Zahl:** 🔑 **8-Level Truth Hierarchy**

| Level | Source | Type |
|:------|:-------|:-----|
| 1 | User Override | SOFT |
| 2 | `schema.prisma` | 🔑 **HARD TRUTH** |
| 3 | `openapi.json` | 🔑 **HARD TRUTH** |
| 4 | `.cursorrules` | BEHAVIORAL |
| 5 | `AGENTS.md` | PHILOSOPHY |
| 6 | `TECH_STACK.md` | TOOLS |
| 7 | `DESIGN.md` | VISUAL |
| 8 | Existing Codebase | LEGACY |

**Hub-and-Spoke Router Model:**
```
┌─────────────────────────┐
│     ROUTER FILE         │ (AGENTS.md or .cursorrules)
└───────────┬─────────────┘
            │ "If user asks about DB → Read schema.prisma"
            ▼
     ┌───────┼───────┬──────────┐
     ▼       ▼       ▼          ▼
  schema.  TECH_   DESIGN.    TAG_
  prisma   STACK   md         STACK
```

**Beweis:**
```markdown
### Pattern C: The "Scenario Trigger" (`.cursorrules`)
- **Purpose:** Dynamic Context Loading based on User Intent.
- **Mechanism:** If-This-Then-Read-That logic in the System Prompt.
- **Example:**
  ### Scenario: "Add a new package"
  → READ: TECH_STACK.md
  → CHECK: Allowed list
```

---

### THE CONTEXT FILE WORKFLOW

**Quelle:** [`docs/RESEARCH_Antigravity_Advanced_Patterns.md`](../../docs/RESEARCH_Antigravity_Advanced_Patterns.md) (Lines 1-54)  
**Typ:** GOVERNANCE_RULE (MEMORY ARCHITECTURE)

**Kontext (V1):**  
Der Mythos: "Ich erhöhe einfach die Chat History auf 100 Messages."  
Die Realität: Es gibt KEINE user-konfigurierbare Einstellung dafür. Antigravity nutzt dynamisches Context Management.

**Das Problem:**
- Chat history degrades over time
- Agents vergessen, **warum** sie etwas entschieden haben
- Standard artifacts sind "Action-Only" ohne Kontext

**Die Viron-Lösung:**  
**Reasoning-Infused Artifacts** - Jede Entscheidung muss den Grund dokumentieren.

**Die Zahl:** 🔑 **3 Actionable Directives**

| Directive | Rule |
|:----------|:-----|
| 1 | **Never Assume History:** If it's not in a file, it didn't happen |
| 2 | **Write to Trigger:** Write plans that explain _why_, not just _what_ |
| 3 | **Context Loading:** Use `documentation_manifest.md` for surgical loading |

**Bad vs. Good Pattern:**
```markdown
❌ BAD (Action-Only):
- [ ] Refactor Audio Component

✅ GOOD (Reasoning-Rich):
- [ ] **Refactor Audio Component**
  - **Reasoning:** Current implementation causes hydration mismatch because 
    `AudioContext` initializes before DOM.
  - **Goal:** Move init to `useEffect` to ensure client-side execution.
```

**Beweis:**
```markdown
## 2. REASONING-INFUSED ARTIFACTS ("The Trigger Protocol")

Why does the agent forget _why_ it decided something?
Because standard artifacts are "Action-Only"

**Rule:** Every Task/Plan item must have a `Reasoning:` sub-bullet 
if the "Why" is not obvious.
```

---

### THE AGENT INITIALIZATION PROTOCOL

**Quelle:** [`Remotion Recherche/AGENT-INITIALIZATION-GUIDE-AUSFÜHRLICH-v2-1.md`](../../Remotion%20Recherche/AGENT-INITIALIZATION-GUIDE-AUSFÜHRLICH-v2-1.md) (Lines 1-134)  
**Typ:** GOVERNANCE_RULE (AGENT LIFECYCLE)

**Kontext (V1):**  
Du hast 30 Markdown-Dateien. Ein Agent kann nicht alle auf einmal verarbeiten - sein Kontext-Fenster würde überlaufen, und er würde dumm anfangen, anstatt fokussiert zu arbeiten.

**Das Problem:**
- Unstrukturierte Initialisierung → Überlastung
- Fehlende Qualitäts-Sicherung → Fehlerhafter Code
- Keine Fehler-Behandlung → Endlose Frage-Antwort-Loops

**Die Viron-Lösung:**  
**Phasen-basierte Initialisierung** mit klaren Kritikalitäts-Stufen.

**Die Zahl:** 🔑 **9 Files / 2 Phasen**

**Phase 1: Kern-Initialisierung (Immer diese 4 zuerst):**

| # | File | Kritikalität | Purpose |
|:--|:-----|:-------------|:--------|
| 1 | `00-master-workflow-2026-integration.md` | 🔴 **ABSOLUT NOTWENDIG** | Logik-Engine / Decision Trees |
| 2 | `10-remotion-basics-01-timeline-und-frames.md` | 🔴 **ABSOLUT NOTWENDIG** | Syntax-Referenz |
| 3 | `QUICK-START-komplettbeispiel.md` | 🟡 **SEHR WICHTIG** | Funktionierendes Skelett |
| 4 | `FEHLERLOSUNG-haeufige-probleme.md` | 🟡 **SEHR WICHTIG** | Selbst-Korrektur |

**Phase 2: Qualitäts-Sicherung (Optional je nach Task):**

| # | File | Trigger | Kritikalität |
|:--|:-----|:--------|:-------------|
| 5 | `50-web-patterns-08-performance-web-vitals-mastery.md` | "schnell", "optimieren", "Mobile" | 🟡 WICHTIG |
| 6 | `70-web-accessibility-wcag-2026-compliance.md` | "öffentliche Website", "barrierefrei" | 🟠 LEGAL |
| 7 | `20-layout-patterns-01-container-queries-und-grids.md` | "responsive", "Grids" | 🟡 WICHTIG |
| 8 | `20-layout-patterns-02-view-transitions-in-remotion.md` | "flüssige Übergänge", "Morphing" | 🟡 WICHTIG |
| 9 | `20-layout-patterns-03-modern-css-masking-compositing.md` | "Video in Text", "Kino-Look" | 🟡 WICHTIG |

**Beweis:**
```markdown
## PHASE 1: KERN-INITIALISIERUNG (Immer diese 3 zuerst, egal was kommt)

### Datei 1: `00-master-workflow-2026-integration.md`
**Kritikalität:** 🔴 **ABSOLUT NOTWENDIG** – Der Agent funktioniert ohne diese nicht strukturiert.

### Datei 2: `10-remotion-basics-01-timeline-und-frames.md`
**Kritikalität:** 🔴 **ABSOLUT NOTWENDIG** – Syntax-Referenz für alles was folgt.

### Datei 6: `70-web-accessibility-wcag-2026-compliance.md`
**Kritikalität:** 🟠 **WICHTIG für Legal** – Ohne das könnten dich User oder Behörden verklagen.
```

---

### THE OUTPUT VALIDATION FRAMEWORK

**Quelle:** [`Remotion Recherche/AGENT-OUTPUT-VALIDATION-v1-0.md`](../../Remotion%20Recherche/AGENT-OUTPUT-VALIDATION-v1-0.md) (Lines 1-243)  
**Typ:** GOVERNANCE_RULE (QUALITY ASSURANCE)

**Kontext (V1):**  
Der Orchestrator-Agent kann "mit fester Stimme Bullshit reden". Validation ist nicht optional - sie ist der einzige Schutz gegen Produktions-Desaster.

**Das Problem:**
- Halluzination (APIs die nicht existieren)
- Skill Halluzination (Regeln zitieren die nicht existieren)
- Token Overflow (Antwort endet mitten im Code)
- Design Inconsistency (Button im Video ≠ Button im Web)
- Version Confusion (Alte API statt neuer)

**Die Viron-Lösung:**  
**3-Schritt Validation Workflow** mit konkreten Test-Protokollen.

**Die Zahl:** 🔑 **5 Validation Tests + 850k Warning / 950k Error Threshold**

**Validation Workflow:**

| Step | Check | Method |
|:-----|:------|:-------|
| 1 | Spot-Check | API existence, Imports, Syntax, Skill rules |
| 2 | Design Consistency | design-tokens.ts, glowBlur, glowColor matching |
| 3 | Token Audit | Cumulative tracking with thresholds |

**Token Thresholds:**
```javascript
// Thresholds
If ORCHESTRATOR_SESSION_TOKENS > 850k:
  WARNING: "Only 150k token buffer left. Clear old context?"
If > 950k:
  ERROR: "Token limit approaching. Archive context."
```

**Common Agent Errors:**

| Fehler | Merkmale | Detection |
|:-------|:---------|:----------|
| **Halluzination (APIs)** | Nicht-existente API-Parameter | `remotion.setGlowRadius()` (nicht real) |
| **Skill Halluzination** | Zitiert nicht-existente Regeln | Agent zitiert Regel die nicht existiert |
| **Token Overflow** | Unvollständige Antwort | Antwort endet mitten im Code |
| **Design Inconsistency** | Ignoriert viron-button-design | Button im Video != Button im Web |
| **Version Confusion** | Nutzt alte API | `useFrame()` statt `useCurrentFrame()` |

**Beweis:**
```markdown
## 🚨 Häufige Agent-Fehler

| Fehler | Merkmale | Wie du es siehst |
|---|---|---|
| **Halluzination (APIs)** | Agent erfindet nicht-existente API-Parameter | Code hat `remotion.setGlowRadius()` (nicht real) |

## ✅ Validation Workflow

### Schritt 3: Token Audit (Nach mehreren Requests)

THRESHOLD:
  If ORCHESTRATOR_SESSION_TOKENS > 850k:
    WARNING: "Only 150k token buffer left. Clear old context?"
  If > 950k:
    ERROR: "Token limit approaching. Archive context."
```

---

### THE ORCHESTRATOR DELEGATION MATRIX

**Quelle:** [`Remotion Recherche/ORCHESTRATOR-AGENT-SETUP-GEMINI-3-PRO-v1-0.md`](../../Remotion%20Recherche/ORCHESTRATOR-AGENT-SETUP-GEMINI-3-PRO-v1-0.md) (Lines 1-92)  
**Typ:** GOVERNANCE_RULE (MULTI-AGENT ORCHESTRATION)

**Kontext (V1):**  
Ein einzelner Agent kann nicht alles. Video-Production erfordert Spezialisten: Remotion-Experten, React-Optimierer, Design-Auditors. Der Orchestrator koordiniert.

**Das Problem:**
- Ein Agent versucht alles selbst → mediokre Ergebnisse
- Keine Konsistenz zwischen Video- und Web-Output
- Token-Überlastung durch zu viele Skills gleichzeitig

**Die Viron-Lösung:**  
**Sub-Agent Delegation** mit strictem Token-Budget pro Agent.

**Die Zahl:** 🔑 **5 Sub-Agent Types / 110k Total / 890k Buffer**

**Delegation Logic:**

| IF User asks about | THEN Call Sub-Agent | Skills Provided |
|:-------------------|:--------------------|:----------------|
| "video", "animation", "composition" | Remotion Specialist | remotion-dev/skills |
| "React", "component", "hook" | React Expert | vercel-labs/react |
| "Next.js", "app router" | Next.js Architect | vercel-labs/next |
| "button", "design", "consistent" | Design Auditor | web-design-guidelines + viron-system |
| "shader", "glow", "GPU" | Advanced Specialist | viron-system/shaders |

**Token Budget (Gemini 3 Pro):**

| Component | Tokens |
|:----------|:-------|
| Context (1M total) | 1,000,000 |
| Skills loaded | ~45k |
| Viron skill | ~25k |
| User request | ~2k |
| Sub-Agent responses (~20k × 3) | ~60k |
| **Total for 3 agents** | 🔑 **~110k** |
| **Remaining buffer** | 🔑 **~890k** |

**Critical Rules:**
- ❌ NEVER generate code without consulting skills
- ❌ NEVER forget to check viron-system for consistency
- ❌ NEVER load all 5 skills into a Sub-Agent (only relevant ones)
- ✅ ALWAYS show which skill rules you're using
- ✅ ALWAYS end with consistency check

**Beweis:**
```markdown
## 🧠 Dein Orchestrator-Prompt (Der Chef)

TOKEN BUDGET:
- Context: 1M token (Gemini 3 Pro)
- Skills loaded: ~45k token
- Viron skill: ~25k token
- User request: ~2k token
- Sub-Agent responses: ~20k token per agent (typical)
- Total for 3 agents: ~110k token
- **Remaining buffer: ~890k token** (Safe)

NEVER:
- Generate code without consulting skills
- Forget to check viron-system for consistency rules
- Skip the "Design Auditor" if UI is involved
- Load all 5 skills into a Sub-Agent (only relevant ones)
```

---

### THE VIDEO-RAG ARCHITECTURE

**Quelle:** [`Remotion Recherche/90-synergy-02-realtime-video-rag-agents.md`](../../Remotion%20Recherche/90-synergy-02-realtime-video-rag-agents.md) (Lines 1-300)  
**Typ:** AI_SYNERGY (KNOWLEDGE_BASE × LLM × TTS × REMOTION)

**Kontext (V1):**  
User stellt Frage → Wartet 10 Sekunden → Sieht präzises, visuell ansprechendes Video. Automatisch aus Knowledge Base generiert, mit Kapitelstruktur, Transkript, und perfekt synchronisiertem Audio.

**Das Problem:**
- Statische Dokumentation wird nicht gelesen
- Support-Antworten sind textlastig und langweilig
- Video-Produktion ist zu langsam für Realtime-Support

**Die Viron-Lösung:**  
**RAG → LLM → TTS → Remotion Pipeline** mit 3 Varianten für unterschiedliche Use-Cases.

**Die Zahl:** 🔑 **3 Varianten / 2s Perceived Speed / 3-5min Final Video**

**Pipeline Architecture:**
```
USER QUESTION ("How do I optimize web vitals?")
  ↓
RAG RETRIEVAL (Vector DB: Embeddings + Top-K Chunks)
  ↓
LLM SCRIPT GENERATOR (structure: scenes, durations, on-screen text)
  ↓
TTS SYNTHESIS (ElevenLabs / OpenAI / Google)
  ↓
AUDIO ANALYSIS (FFmpeg: duration, waveform peaks)
  ↓
REMOTION RENDER (visuals synced to narration timing)
  ↓
DELIVERY (mp4 + transcript + chapters + search)
```

**Varianten:**

| Variante | User-Wartezeit | Video-Ready | Ideal für |
|:---------|:---------------|:------------|:----------|
| **1: Offline/Batch** | ~2s (Text) | ~3-5 Min | FAQ, Knowledge Base |
| **2: Streaming Preview** | <2s (Animation) | Parallel | Premium UX |
| **3: Interactive Web** | Sofort | On-demand | Enterprise Training |

**Chunking Strategy:**
```typescript
// Chunk: max 500 tokens
const chunks = chunkText(doc, 500);

function chunkText(text: string, maxTokens: number): string[] {
  const sentences = text.split(". ");
  // Naive chunking: split by sentence, recombine
}
```

**Beweis:**
```markdown
## Variante 1: Offline/Batch Rendering (Stabil, Production-Ready)

### Performance-Charakteristik
- **User-Wartezeit:** ~2 Sekunden (nur Text-Response)
- **Video-Ready:** ~3-5 Minuten
- **Zuverlässigkeit:** ⭐⭐⭐⭐⭐ (keine Browser-Timeouts)
- **Skalierbarkeit:** Unbegrenzt (asynchrone Queue)

## Variante 2: Streaming Preview + Parallel Final Render (UX Optimized)

### Performance-Charakteristik
- **Perceived Speed:** ⭐⭐⭐⭐⭐ (instant feedback)
- **Implementation Complexity:** ⭐⭐⭐⭐ (zwei Render-Pfade)
- **Cost:** ~2x (aber besseres UX)
```

---

### THE WEBGPU COMPUTE PHYSICS ENGINE

**Quelle:** [`Remotion Recherche/90-synergy-03-webgpu-compute-physics.md`](../../Remotion%20Recherche/90-synergy-03-webgpu-compute-physics.md) (Lines 1-300)  
**Typ:** AI_SYNERGY (GPU × PHYSICS × REALTIME)

**Kontext (V1):**  
Echte GPU-Simulationen im Browser: Millionen Partikel statt Tausende, Fluid-ähnliche Bewegung, Audio-reaktive Effekte - für Hero-Sections und interaktive Demos.

**Das Problem:**
- CPU-basierte Partikel-Systeme: Max ~10k Partikel
- Langsame Performance bei komplexen Physik-Effekten
- Keine echte Echtzeit-Interaktivität möglich

**Die Viron-Lösung:**  
**WebGPU Compute Shaders** für massive Parallelisierung auf der GPU.

**Die Zahl:** 🔑 **1 Million Partikel / <3ms Total / 60-120 FPS**

**Architecture:**
```
CPU (JavaScript Logik)
  ├─ Input: Maus, Audio, Parameter
  └─ Decision: Spawn Particles, Forces, Update Uniforms
    ↓
WEBGPU COMPUTE SHADER (WGSL, auf GPU)
  ├─ 1 Million Partikel in Parallel
  ├─ Positionen, Velocitäten, Beschleunigung
  └─ Pro Frame (60 fps): < 1 ms total
    ↓
GPU BUFFERS (Shared Memory)
  ├─ Output: Updated Positions
  └─ Ready for Render Pass
    ↓
RENDER PASS (WebGPU oder Three.js)
  ├─ Canvas/WebGL
  └─ 60–120 FPS Echtzeit-Visualisierung
```

**Varianten:**

| Variante | FPS | Partikel | Browser Support |
|:---------|:----|:---------|:----------------|
| **1: WebGPU + Canvas** | 60-120 | 100k-10M | 70%+ (Chrome, Edge, Safari 17.4+) |
| **2: WebGPU + Three.js** | 50-100 | 50k-5M | 60% (mit WebGL fallback) |
| **3: Progressive Enhancement** | Adaptive | Adaptive | 100% (Graceful Degradation) |

**WGSL Compute Shader Structure:**
```wgsl
struct Particle {
  pos: vec2f,
  vel: vec2f,
  age: f32,
  life: f32,
};

@compute @workgroup_size(256)
fn main(@builtin(global_invocation_id) id: vec3u) {
  let i = id.x;
  if (i >= arrayLength(&particles)) { return; }
  
  var p = particles[i];
  // Physics: Forces, Damping, Position Update
  // Boundaries: Wrap-around
  // Lifecycle: Age tracking
}
```

**Performance-Charakteristik:**
- **FPS:** 60-120 fps
- **Partikelanzahl:** 100k – 10 Million
- **Latency:** <2 ms Compute + <1 ms Render = 🔑 **<3 ms total**
- **Browser Support:** 70%+ (Chrome, Edge, Safari 17.4+)

**Beweis:**
```markdown
## Variante 1: WebGPU Compute + Canvas Render (Minimal, Schnellste)

### Performance-Charakteristik
- **FPS:** 60–120 fps
- **Partikelanzahl:** 100k – 10 Million
- **Latency:** <2 ms Compute + <1 ms Render = <3 ms total
- **Browser Support:** 70%+ (Chrome, Edge, Safari 17.4+)

## Variante 3: Progressive Enhancement (Graceful Degradation)

### Performance-Charakteristik
- **Browser Support:** 100% (ein Fallback für jeden)
- **Mobile:** Graceful (sieht gut aus, aber begrenzt)
- **Desktop:** Volles Potential nutzen
```

---

## 🗑️ VERWORFENE INHALTE (REDUNDANZEN)

| Inhalt | Grund | Original-Quelle |
|:-------|:------|:----------------|
| `useFrame()` Hook | Bereits in SKILL.md dokumentiert | remotion-core-skill |
| `Composition` Struktur | Bereits in SKILL.md (rules/compositions.md) | remotion-best-practices |
| `staticFile()` für Assets | Bereits in SKILL.md Core Laws | remotion-core-skill |
| `<Img>` vs `<img>` | Bereits in SKILL.md Core Laws | remotion-core-skill |
| `interpolate()` Basics | Bereits in SKILL.md (rules/timing.md) | remotion-best-practices |
| `spring()` Animation | Bereits in SKILL.md (rules/animations.md) | remotion-best-practices |
| `<Sequence>` Pattern | Bereits in SKILL.md (rules/sequencing.md) | remotion-best-practices |
| `zod` Schema für Parameter | Bereits in SKILL.md (rules/parameters.md) | remotion-best-practices |
| Audio `trimBefore/After` | Bereits in SKILL.md (rules/audio.md) | remotion-best-practices |
| Video `volume callback` | Bereits in SKILL.md (rules/videos.md) | remotion-best-practices |

---

## 📋 ZUSAMMENFASSUNG DER KERN-REGELN

| System | Die Zahl | Kritikalität |
|:-------|:---------|:-------------|
| **Token Economy** | 200k Hard Limit / 50k Sweet Spot | 🔴 ARCHITECTURAL LAW |
| **Content Tiers** | T1: 10-20k / T2: 2-5k / T3: <1k / T4: <500 | 🔴 GOVERNANCE |
| **Truth Hierarchy** | 8 Levels (schema.prisma = Level 2 HARD) | 🔴 ANTI-HALLUCINATION |
| **Agent Init** | 4 Files Phase 1 / 5 Files Phase 2 | 🔴 LIFECYCLE |
| **Validation** | 850k Warning / 950k Error | 🟡 QUALITY |
| **Orchestration** | 110k for 3 Agents / 890k Buffer | 🟡 MULTI-AGENT |
| **Video-RAG** | 2s Perceived / 3-5min Final | 🟢 AI SYNERGY |
| **WebGPU Compute** | 1M Partikel / <3ms Total | 🟢 AI SYNERGY |

---

## 🔗 CROSS-REFERENCES

- **Badge 7 (System Architecture):** Master-Workflow Integration
- **Badge 9 (Video Production):** Remotion-Specific Skills
- **Badge 10 (Web Integration):** Container Queries, View Transitions

---

**Report erstellt:** 2026-02-01  
**Analyst:** Viron AI Systems Architect  
**Status:** ✅ COMPLETE
