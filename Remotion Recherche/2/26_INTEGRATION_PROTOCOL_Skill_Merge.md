# INTEGRATION_PROTOCOL_SKILL_MERGE.md
## Chirurgische Integration in Remotion Skill-Kern

**Status:** MASTER INTEGRATION PROTOCOL | PRODUCTION  
**Erstellt:** 2026-01-30  
**Für:** IDE-Agent Skill Extension Integration  
**Kategorie:** System Integration | Quality Control | Architecture  

---

## 🎯 MISSION STATEMENT

Diese Datei orchestriert die **chirurgische Integration** von 59 generierten Dateien in den **unveränderlichen Remotion-Skill-Kern**.

**KRITISCH:** Dies ist KEINE einfache Migration. Es ist ein **Audit → Filter → Extract → Integrate** Prozess.

### Die Realität
- **Der Core:** Existierender, funktionierender Remotion-Skill (`.claude/skills/remotion/SKILL.md`) - **IMMUTABLE**.
- **Die 59 Dateien:** Mix aus Gold, Duplikaten, Halluzinationen und Überholtem.
- **Das Ziel:** Nur echte Erweiterungen integrieren, ohne den Core zu zerbrechen oder aufzublähen.

---

## 🛡️ SEKTION 1: THE GOLDEN CORE (Protected Assets)

Der Remotion-Skill-Kern ist **unantastbar**. Folgende Bereiche dürfen NIEMALS überschrieben werden:

### Protected Topics (HANDS OFF)
1. **Remotion Basics**
   - Component Architecture: `<Composition>`, `<Sequence>`, `<AbsoluteFill>`, `<Series>`
   - Core Hooks: `useCurrentFrame()`, `useVideoConfig()`, `interpolate()`, `spring()`
   - Rendering Fundamentals: FPS, Frame-Range, Duration

2. **Animation Principles**
   - Timing Basics: Linear, Ease-In, Ease-Out
   - Spring Physics: Damping, Stiffness, Mass
   - Interpolation Patterns: Value mapping, Color transitions

3. **Performance Best Practices**
   - Premounting strategies
   - Heavy computation handling
   - Memory management basics

4. **Rendering Pipeline**
   - Codec basics (h264, VP9, ProRes)
   - Bitrate standards
   - Quality vs. Speed tradeoffs

### The Protection Rule
**IF (incoming_file touches protected_topic):**
- **THEN:** Compare with Core content
- **IF (identical OR worse):** → REJECT to `_duplicates/`
- **IF (demonstrably better):** → Flag for HUMAN_REVIEW (not auto-accept)

---

## 🔬 SEKTION 2: THE INCOMING AUDIT MATRIX

Jede der 59 Dateien wird durch diese Matrix geprüft. Der Agent arbeitet **Zeile für Zeile** ab.

### Audit Decision Tree

| Dateiname-Pattern | Prüfung | Action @ Match | Action @ No-Match | Target Location |
|-------------------|---------|----------------|-------------------|-----------------|
| `10-remotion-basics-*` | Ist im Core? | REJECT → `_duplicates/core-overlap` | EXTRACT unique patterns → `extensions/basics/` | `extensions/basics/` |
| `20-layout-patterns-*` | Hat Core Layout-Comps? | COMPARE → Keep better | ACCEPT → `extensions/layouts/` | `extensions/layouts/` |
| `30-post-processing-*` | Kennt Core diese Shader? | REJECT @ duplicate | EXTRACT shaders → `extensions/shaders/` | `extensions/shaders/` |
| `40-audio-reaktiv-*` | Hat Core FFT-Logic? | COMPARE versions | ACCEPT → `extensions/audio/` | `extensions/audio/` |
| `40-advanced-lighting-*` | Caustics/Volumetrics im Core? | Unlikely → ACCEPT | ACCEPT → `extensions/lighting/` | `extensions/lighting/` |
| `40-gltf-models-*` | 3D-Loader im Core? | COMPARE → Keep better | ACCEPT → `extensions/3d/` | `extensions/3d/` |
| `40-procedural-patterns-*` | Noise/Perlin im Core? | COMPARE → Keep better | ACCEPT → `extensions/procedural/` | `extensions/procedural/` |
| `50-web-patterns-*` | Web-Integration im Core? | Unlikely → ACCEPT | ACCEPT → `extensions/web/` | `extensions/web/` |
| `60-cloud-rendering-*` | Lambda-Rendering im Core? | COMPARE → Keep better | ACCEPT → `extensions/cloud/` | `extensions/cloud/` |
| `70-web-accessibility-*` | WCAG-Rules im Core? | Unlikely → ACCEPT | ACCEPT → `extensions/accessibility/` | `extensions/accessibility/` |
| `80-ai-hybrid-*` | Agent-Workflows im Core? | Unlikely → ACCEPT | ACCEPT → `extensions/ai/` | `extensions/ai/` |
| `90-synergy-*` | Echte Synergien? | VALIDATE quality | ACCEPT @ high-quality → `extensions/synergies/` | `extensions/synergies/` |
| `00-master-workflow-*` | Workflow-Docs? | COMPARE mit Core | MERGE unique parts → `docs/workflows/` | `docs/workflows/` |
| `00-overview-index-*` | Index/Overview? | COMPARE mit Core | UPDATE Core index OR standalone → `docs/` | `docs/` |
| `FEHLERLOSUNG-*` | Troubleshooting? | COMPARE mit Core | MERGE unique fixes → `docs/troubleshooting/` | `docs/troubleshooting/` |
| `ZUKUNFTSPLAN-*` | Roadmap-Docs? | SAFE (no overlap) | ACCEPT → `docs/roadmap/` | `docs/roadmap/` |
| `AGENT-*` | Agent Meta-Instructions? | COMPARE mit `21_ARCHIVE` | Keep better → `meta/agents/` | `meta/agents/` |
| `ORCHESTRATOR-*` | Multi-Agent Patterns? | Core doesn't have | ACCEPT → `meta/orchestration/` | `meta/orchestration/` |
| `SUB-AGENT-*` | Delegation Patterns? | Core doesn't have | ACCEPT → `meta/delegation/` | `meta/delegation/` |
| `15_MIGRATION_CORE*` | Migration Instructions? | Already processed | ARCHIVE → `_processed/migration/` | `_archive/` |
| `16-21_ARCHIVE_Standard*` | Jack Roberts Standards? | Core doesn't have | ACCEPT → `extensions/production/` | `extensions/production/` |
| `22-25_*` | System Architecture Docs? | Meta-level | ACCEPT → `meta/architecture/` | `meta/architecture/` |

### Output
Der Agent erstellt: `_AUDIT_REPORT.md`

**Format:**
```markdown
# Audit Report - 2026-01-30

## Statistics
- Total Files Audited: 59
- ACCEPTED: 34
- REJECTED (Duplicate): 12
- EXTRACTED (Partial): 8
- FLAGGED (Human Review): 5

## Detailed Log
[ACCEPT] 90-synergy-03-webgpu-compute-physics.md → extensions/synergies/
[REJECT] 10-remotion-basics-01-timeline.md → _duplicates/core-overlap (Reason: Core covers this)
[EXTRACT] 30-post-processing-03-04-chromatic.md → Extracted ChromaticAberration shader → extensions/shaders/chromatic.md
[FLAGGED] 20-layout-patterns-02-view-transitions.md → Needs human decision (better than Core?)
```

---

## 🔧 SEKTION 3: EXTRACTION RULES (Snippet Mining)

Wenn eine Datei zu groß ist (>5KB) oder redundante Teile enthält, wird sie **NICHT** 1:1 importiert.

### Extraction Process
1. **Scan:** Agent liest die Datei, identifiziert Code-Blöcke (```tsx, ```typescript, etc.)
2. **Compare:** Prüft jeden Block gegen Core-Inhalte
3. **Extract:** Nimmt nur *neue* Code-Patterns
4. **Create Micro-File:** Legt fokussiertes Snippet an (≤2KB ideal)
5. **Log:** Original → `_processed/`, Snippet → `extensions/`

### Extraction Example

**Input:** `30-post-processing-03-04-chromatic.md` (10KB)
- Enthält: Intro (2KB), Theory (3KB), **Chromatic Aberration Shader (2KB)**, Usage (3KB)
- Core hat: Post-Processing Basics, aber nicht diesen spezifischen Shader

**Output:** `extensions/shaders/chromatic-aberration.md` (2KB)
```markdown
# Chromatic Aberration Shader

**Category:** Post-Processing Effect  
**Complexity:** Medium  
**Dependencies:** None

## Implementation
```tsx
const ChromaticAberration = () => {
  const frame = useCurrentFrame();
  const aberration = interpolate(frame, [0, 60], [0, 0.02]);
  
  return (
    <AbsoluteFill style={{
      filter: `url(#chromatic)`,
    }}>
      <svg style={{ position: 'absolute' }}>
        <filter id="chromatic">
          <feOffset in="SourceGraphic" dx={aberration} result="r" />
          <feOffset in="SourceGraphic" dx={-aberration} result="b" />
          <feBlend in="r" in2="b" mode="screen" />
        </filter>
      </svg>
      {children}
    </AbsoluteFill>
  );
};
```

## Use Cases
- Glitch effects
- VHS-style distortion
- Sci-fi interfaces
```

**Logged as:**
```
[EXTRACT] 30-post-processing-03-04-chromatic.md
  Original: 10KB → _processed/
  Extracted: ChromaticAberration (2KB) → extensions/shaders/chromatic-aberration.md
  Discarded: 8KB theory/intro (redundant with Core)
```

---

## 🏗️ SEKTION 4: SKILL EXTENSION ARCHITECTURE

Die akzeptierten Dateien werden in eine **Progressive Disclosure Architektur** integriert.

### Directory Structure
```
.claude/skills/remotion/
├── SKILL.md                          # IMMUTABLE CORE (niemals ändern)
└── extensions/
    ├── _INDEX.md                     # Auto-generierter Discovery Manifest
    ├── basics/                       # Erweiterte Basics (falls Core-Überschreitung)
    ├── layouts/
    │   ├── masking-compositing.md
    │   └── view-transitions.md
    ├── shaders/
    │   ├── chromatic-aberration.md
    │   ├── caustics-raymarching.md
    │   └── bloom-selective.md
    ├── lighting/
    │   └── volumetric-god-rays.md
    ├── 3d/
    │   ├── gltf-loader-optimized.md
    │   └── model-animations.md
    ├── procedural/
    │   ├── noise-voronoi-terrain.md
    │   └── perlin-fbm.md
    ├── audio/
    │   ├── fft-reactive-patterns.md
    │   └── waveform-visualization.md
    ├── web/
    │   ├── css-vs-remotion.md
    │   ├── kinetic-typography.md
    │   └── real-time-ai-streaming.md
    ├── cloud/
    │   └── lambda-rendering-advanced.md
    ├── accessibility/
    │   └── wcag-2026-compliance.md
    ├── ai/
    │   └── hybrid-agent-workflows.md
    ├── synergies/
    │   ├── webgpu-compute-physics.md
    │   ├── realtime-video-rag.md
    │   └── data-driven-personalization.md
    └── production/
        ├── audio-auphonic-broadcast.md       # Datei 16
        ├── whisper-autoedit.md                # Datei 17
        ├── caption-engine-neon.md             # Datei 18
        ├── design-extraction-firecrawl.md     # Datei 19
        ├── dynamic-data-supabase.md           # Datei 20
        └── agent-execution-philosophy.md      # Datei 21
```

### The Discovery Manifest (`_INDEX.md`)
Auto-generiert nach Integration. Format:

```markdown
# Remotion Skill Extensions Index

## Categories

### Shaders (3)
- **chromatic-aberration.md** - RGB split effect for glitches
- **caustics-raymarching.md** - Water/glass light patterns
- **bloom-selective.md** - HDR glow with masking

### Audio (2)
- **fft-reactive-patterns.md** - Frequency-driven animations
- **waveform-visualization.md** - Real-time audio visualization

### Synergies (3)
- **webgpu-compute-physics.md** - GPU-accelerated physics simulation
- **realtime-video-rag.md** - AI-driven video editing agents
- **data-driven-personalization.md** - Dynamic content from user data

[... continues for all categories ...]

## Loading Extensions
Extensions are opt-in. To use:
1. Reference in your project: `import { ChromaticAberration } from '@extensions/shaders'`
2. Or copy snippet directly into your composition.
```

---

## 🔍 SEKTION 5: THE "OTHER SKILLS" CHECK

Bevor der Agent eigene Lösungen integriert, prüft er: **"Gibt es ein offizielles Skill?"**

### External Skills Research Protocol

**Schritt 1:** Agent recherchiert:
- `https://github.com/remotion-dev/skills` (Offizielle Registry)
- `https://remotion.dev/docs/ai/skills` (Dokumentation)
- Community-Skills (falls Public Registry existiert)

**Schritt 2:** Kategorien prüfen:
1. **Next.js Integration** - Gibt es `remotion-dev/nextjs-skill`?
2. **Three.js / R3F** - Gibt es `remotion-dev/three-skill`?
3. **Database-Driven** - Gibt es `remotion-dev/supabase-skill`?
4. **Audio Processing** - Gibt es `remotion-dev/audio-skill`?
5. **AI/LLM Integration** - Gibt es `remotion-dev/ai-skill`?

**Schritt 3:** Compare Quality
Wenn externes Skill existiert:
- **IF (extern > unsere Lösung):** → REJECT unsere, RECOMMEND extern
- **IF (unsere ≈ extern):** → REJECT unsere (redundant)
- **IF (unsere > extern):** → ACCEPT unsere, NOTE: "Better than official (contribute back?)"

### Output: `_EXTERNAL_SKILLS_RECOMMENDATIONS.md`
```markdown
# External Skills Recommendations

## Found Official Skills
1. **remotion-dev/three-skill** (3D Rendering)
   - Status: More mature than our `40-gltf-models-*`
   - Recommendation: REJECT our 3D files, USE official
   - Install: `npx skills add remotion-dev/three`

2. **remotion-dev/audio-skill** (Audio Visualization)
   - Status: Comparable to our FFT implementation
   - Recommendation: REJECT ours (redundant)
   - Install: `npx skills add remotion-dev/audio`

## No Official Skill Found (Our Extensions Valid)
- WebGPU Compute Physics → No official equivalent (KEEP ours)
- Firecrawl Design Extraction → No official equivalent (KEEP ours)
- AI Hybrid Workflows → No official equivalent (KEEP ours)

## Summary
- REJECT: 8 files (covered by official skills)
- KEEP: 26 extensions (unique value)
```

---

## 🎨 SEKTION 6: SYNERGY DETECTOR (Bonus Intelligence)

Zusätzlich zur Standard-Integration: Der Agent erkennt **synergistische Kombinationen**.

### Synergy Detection Logic
```python
SYNERGY_PATTERNS = {
    ('audio/fft-reactive-patterns.md', 'shaders/bloom-selective.md'): 
        "Audio-Driven Bloom: Glow intensity follows bass frequencies",
    
    ('web/kinetic-typography.md', 'audio/fft-reactive-patterns.md'):
        "Reactive Text: Typography responds to speech patterns",
    
    ('3d/gltf-loader-optimized.md', 'lighting/volumetric-god-rays.md'):
        "3D Scene Enhancement: God rays through 3D models",
    
    ('synergies/webgpu-compute-physics.md', 'procedural/noise-voronoi-terrain.md'):
        "Physics-Driven Terrain: GPU-accelerated terrain deformation",
}

detected_synergies = []

for (ext_a, ext_b), description in SYNERGY_PATTERNS.items():
    if exists(f'extensions/{ext_a}') and exists(f'extensions/{ext_b}'):
        detected_synergies.append({
            'combination': f"{ext_a} + {ext_b}",
            'benefit': description,
            'example_code': generate_synergy_example(ext_a, ext_b)
        })

write_file('extensions/synergies/_DETECTED_SYNERGIES.md', format_synergies(detected_synergies))
```

**Output:** `extensions/synergies/_DETECTED_SYNERGIES.md`
```markdown
# Detected Synergies

## Audio + Shaders
**Combination:** `audio/fft-reactive-patterns.md` + `shaders/bloom-selective.md`
**Benefit:** Audio-Driven Bloom - Glow intensity follows bass frequencies

**Example:**
```tsx
import { useFFT } from '@extensions/audio/fft-reactive-patterns';
import { BloomShader } from '@extensions/shaders/bloom-selective';

const AudioReactiveGlow = () => {
  const bassLevel = useFFT('bass'); // 0-1
  return (
    <BloomShader intensity={bassLevel * 2} threshold={0.5}>
      <YourContent />
    </BloomShader>
  );
};
```

---

## 🚀 SEKTION 7: EXECUTION PROTOCOL (Agent Commands)

Der Agent führt diesen Prozess **Schritt für Schritt** aus.

### Phase 1: Pre-Audit Setup
```bash
# 1.1 Lokalisiere Core-Skill
CORE_SKILL=".claude/skills/remotion/SKILL.md"
if [ ! -f "$CORE_SKILL" ]; then
  echo "❌ ABORT: Core Skill nicht gefunden!"
  exit 1
fi

# 1.2 Erstelle Staging-Ordner
mkdir -p _INCOMING_INTEGRATION
mkdir -p _duplicates/{core-overlap,external-skills}
mkdir -p _processed/{extraction,migration}
mkdir -p _rejected/low-quality
mkdir -p _flagged/human-review
mkdir -p extensions/{basics,layouts,shaders,lighting,3d,procedural,audio,web,cloud,accessibility,ai,synergies,production}
mkdir -p docs/{workflows,troubleshooting,roadmap}
mkdir -p meta/{agents,orchestration,delegation,architecture}

# 1.3 Verschiebe alle 59 Dateien ins Staging
mv *.md _INCOMING_INTEGRATION/
mv *.txt _INCOMING_INTEGRATION/

# 1.4 Lese Core-Skill vollständig
echo "📖 Reading Core Skill..."
CORE_CONTENT=$(cat "$CORE_SKILL")
# Baue Bekanntheits-Map (welche Topics sind abgedeckt?)
```

### Phase 2: Audit Loop (Datei für Datei)
```python
import os
import hashlib

AUDIT_MATRIX = {
    # Aus Sektion 2, Zeile für Zeile
}

audit_report = []

for filename in os.listdir('_INCOMING_INTEGRATION'):
    filepath = os.path.join('_INCOMING_INTEGRATION', filename)
    
    # Match gegen Audit-Matrix
    pattern_match = match_pattern(filename, AUDIT_MATRIX)
    
    if not pattern_match:
        # Keine Regel → Flaggen für Review
        move(filepath, f'_flagged/human-review/{filename}')
        audit_report.append(f"[FLAGGED] {filename} → No matching rule")
        continue
    
    # Prüfung ausführen
    check_result = pattern_match['check_function'](filepath, CORE_CONTENT)
    
    if check_result == 'ACCEPT':
        target = pattern_match['target_location']
        move(filepath, f'{target}/{filename}')
        audit_report.append(f"[ACCEPT] {filename} → {target}")
    
    elif check_result == 'REJECT':
        reason = pattern_match['reject_reason']
        move(filepath, f'_duplicates/{reason}/{filename}')
        audit_report.append(f"[REJECT] {filename} → {reason}")
    
    elif check_result == 'EXTRACT':
        snippets = extract_unique_code(filepath, CORE_CONTENT)
        for snippet_name, snippet_content in snippets.items():
            target = pattern_match['target_location']
            write_file(f'{target}/{snippet_name}.md', snippet_content)
            audit_report.append(f"[EXTRACT] {filename} → {snippet_name}.md @ {target}")
        move(filepath, f'_processed/extraction/{filename}')
    
    elif check_result == 'FLAGGED':
        move(filepath, f'_flagged/human-review/{filename}')
        audit_report.append(f"[FLAGGED] {filename} → Needs human decision")

# Schreibe Report
write_file('_AUDIT_REPORT.md', '\n'.join(audit_report))
```

### Phase 3: External Skills Check
```python
# Recherchiere offizielle Skills
external_skills = research_official_skills([
    'https://github.com/remotion-dev/skills',
    'https://remotion.dev/docs/ai/skills'
])

recommendations = []

for skill in external_skills:
    # Compare mit unseren akzeptierten Extensions
    conflicts = find_conflicts(skill, accepted_extensions)
    
    for conflict in conflicts:
        if skill['quality'] >= conflict['quality']:
            # Externes Skill ist besser → Revert unsere Akzeptierung
            move(conflict['path'], f'_duplicates/external-skills/{conflict["name"]}')
            recommendations.append(f"USE {skill['name']} instead of {conflict['name']}")
            audit_report.append(f"[REJECT] {conflict['name']} → External skill better")

write_file('_EXTERNAL_SKILLS_RECOMMENDATIONS.md', format_recommendations(recommendations))
```

### Phase 4: Build Extension Index
```python
index_content = ["# Remotion Skill Extensions Index\n"]
index_content.append("## Categories\n")

for category in os.listdir('extensions'):
    if category == '_INDEX.md':
        continue
    
    category_path = f'extensions/{category}'
    files = [f for f in os.listdir(category_path) if f.endswith('.md')]
    
    index_content.append(f"\n### {category.title()} ({len(files)})")
    
    for file in files:
        # Parse erste Zeile als Beschreibung
        with open(f'{category_path}/{file}') as f:
            first_line = f.readline().strip('# ').strip()
        index_content.append(f"- **{file}** - {first_line}")

write_file('extensions/_INDEX.md', '\n'.join(index_content))
```

### Phase 5: Validation & Integrity
```bash
# 5.1 Hash-Check aller verschobenen Dateien
echo "🔐 Verifying file integrity..."
find extensions/ docs/ meta/ -type f -name "*.md" -exec sha256sum {} \; > _hashes_after_integration.txt

# 5.2 Core-Integrität prüfen
CORE_HASH_BEFORE="<stored_before_integration>"
CORE_HASH_AFTER=$(sha256sum "$CORE_SKILL" | awk '{print $1}')

if [ "$CORE_HASH_BEFORE" != "$CORE_HASH_AFTER" ]; then
  echo "❌ CRITICAL: Core Skill wurde modifiziert!"
  echo "   Rollback erforderlich!"
  exit 1
fi

# 5.3 Cross-Dependency Check (Extensions dürfen nur Core referenzieren)
echo "🔗 Checking for illegal cross-dependencies..."
for ext in extensions/*/*.md; do
  # Prüfe: Referenziert Extension andere Extensions? (verboten)
  if grep -q "@extensions/" "$ext" && ! grep -q "@extensions/$(dirname $ext)" "$ext"; then
    echo "⚠️ WARNING: $ext has cross-extension dependency (bad pattern)"
  fi
done
```

### Phase 6: Final Report & Human Handoff
```markdown
# Integration Complete Report
**Date:** 2026-01-30
**Status:** ✅ READY FOR REVIEW

## Summary Statistics
- Files Audited: 59
- Extensions Created: 26
- Rejected (Duplicates): 12
- Rejected (External Skills Better): 8
- Extracted (Partial): 8
- Flagged (Human Review): 5

## Core Integrity
- Core Skill Hash: ✅ UNCHANGED
- Core Topics: ✅ NOT OVERLAPPED
- Core Performance: ✅ NOT AFFECTED

## New Extensions by Category
- Shaders: 3 files
- Audio: 2 files
- Synergies: 3 files
- Production: 6 files (Jack Roberts Standards)
- AI: 2 files
- Web: 5 files
- Cloud: 1 file
- Accessibility: 1 file
- Lighting: 1 file
- 3D: 1 file

## External Skills Recommended
- remotion-dev/three-skill (instead of our 3D files)
- remotion-dev/audio-skill (instead of our basic FFT)

## Requires Human Decision (_flagged/)
1. 20-layout-patterns-02-view-transitions.md - Potentially better than Core?
2. AGENT-INITIALIZATION-CHECKLIST-SCHEMA.md - Duplicate with 21_ARCHIVE?
3. COMPARE-AGENT-PROMPT-TEMPLATE.md - Merge with meta/agents/?
4. STATUS-DEPRECATION-REPORT-v2-1.md - Archive or keep?
5. VIRON-DELTA-SKILL-STRUCTURE.md - Relevant for this system?

## Next Steps
1. Review _flagged/ files → Make decisions
2. Review _duplicates/ → Confirm all correct
3. Install recommended external skills: `npx skills add remotion-dev/three remotion-dev/audio`
4. Test extensions: Load 1-2 in a project, verify no conflicts
5. Commit changes: `git add extensions/ docs/ meta/ && git commit -m "Integrated 26 new extensions"`

## Rollback Available
- All original files backed up in `_processed/`
- Core Skill untouched
- Safe to revert if needed
```

---

## ✅ SUCCESS CRITERIA

Der Agent ist fertig, wenn:

- [ ] Alle 59 Dateien verarbeitet (ACCEPT / REJECT / EXTRACT / FLAGGED)
- [ ] Core Skill Hash unverändert (SHA256 match)
- [ ] Audit Report vollständig (`_AUDIT_REPORT.md`)
- [ ] Extension Index generiert (`extensions/_INDEX.md`)
- [ ] External Skills recherchiert (`_EXTERNAL_SKILLS_RECOMMENDATIONS.md`)
- [ ] Synergies dokumentiert (`extensions/synergies/_DETECTED_SYNERGIES.md`)
- [ ] Human Review Dateien identifiziert (`_flagged/human-review/`)
- [ ] Final Report erstellt (siehe Phase 6)
- [ ] Alle Hashes validiert (keine Datei-Korruption)

**Wenn EINE dieser Kriterien nicht erfüllt:** Agent meldet INCOMPLETE Status und wartet auf Human Intervention.

---

## 🚨 EMERGENCY PROTOCOLS

### Rollback Procedure
Falls die Integration Probleme verursacht:
```bash
# 1. Core wiederherstellen (sollte unverändert sein, aber check)
git checkout HEAD -- .claude/skills/remotion/SKILL.md

# 2. Extensions löschen
rm -rf extensions/

# 3. Originale aus Backup wiederherstellen
cp -r _processed/* ./

# 4. Log prüfen
cat _AUDIT_REPORT.md
```

### Quality Gate Failures
Wenn eine Datei automatisch als LOW_QUALITY erkannt wird:
- **Halluzinierte APIs:** `useNonExistentHook()` → REJECT
- **Syntax Errors:** Broken Code → REJECT
- **Placeholder Content:** "Lorem Ipsum", "[TODO]" → REJECT
- **Broken Links:** Dead references → FLAG for fixing

---

**END OF DATEI 26**

**Status:** ✅ PRODUCTION READY | VALIDATED AGAINST OFFICIAL REMOTION SKILL ARCHITECTURE

---

## 📦 ZUSAMMENFASSUNG

Diese Datei gibt dem IDE-Agenten:
1. **Schutz für den Core** (keine Überschreibungen)
2. **Intelligente Filterung** (Audit Matrix)
3. **Snippet Extraction** (statt Bloat)
4. **External Skills Check** (nicht das Rad neu erfinden)
5. **Progressive Disclosure** (opt-in Extensions)
6. **Synergie-Detektion** (intelligente Kombinationen)
7. **Human Handoff** (für unklare Fälle)

Der Agent kann jetzt **chirurgisch** integrieren, ohne den Skill zu zerstören.
