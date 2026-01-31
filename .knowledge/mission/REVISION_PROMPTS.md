# 🔄 REVISION PROMPTS FÜR BADGES 1-4

**Purpose:** Nacharbeit der bestehenden Reports - Entscheidungen für Repo-Migration dokumentieren.
**Kernfrage:** Was nehmen wir mit ins neue Repo? Was lassen wir zurück?

---

## Das Kern-Prinzip

```
BEHALTEN:
- Alles was NEUER ist als AI-Trainingsdaten (2026 Vault-Recherchen!)
- Alles was NICHT EXPLIZIT im Global Skill steht
- Viron-spezifische IP ("Secret Sauce")

NICHT DUPLIZIEREN:
- NUR was bereits EXPLIZIT und VOLLSTÄNDIG im Skill dokumentiert ist

ACHTUNG:
- Dein Gefühl "das weiß ich schon" ist KEIN Kriterium
- Vault-Recherchen sind frische 2026-Updates - respektiere die Arbeit
- Nur der Skill-Inhalt zählt als "bereits dokumentiert"
```

---

## Output-Format für jeden Fund

```markdown
### [Titel des Funds]

**Quelle:** `[datei.md]` (Zeilen X-Y)
**Typ:** [Ganze Datei | Teil der Datei | Extrahierte Info]

**Skill-Check:**

- [ ] Explizit im Skill dokumentiert: [JA → Welche Skill-Datei?] / [NEIN]

**Entscheidung:** [MITNEHMEN | NICHT DUPLIZIEREN]

**Wenn MITNEHMEN:**

- **Ziel-Location:** [Wo soll es hin? z.B. `.knowledge/extracted-ip/`, Skill-Update, neues Modul]
- **Nutzungsart:** [Direkt übernehmen | Einarbeiten in X | Als Referenz behalten]
- **Warum wertvoll:** [2026-Update | Viron-spezifisch | Nicht in Trainingsdaten]

**Wenn NICHT DUPLIZIEREN:**

- **Grund:** Bereits vollständig in `[skill-rule.md]` dokumentiert
```

---

## 📦 REVISION PROMPT: BADGE 1

```text
**🔄 REVISIONS-AUFTRAG: BADGE 1 (CORE ARCHITECTURE)**

**KONTEXT:**
Wir migrieren das Viron-Repo. Dein alter Report wurde FEHLERHAFT erstellt -
ohne Skill-Abgleich. Du musst die Arbeit KOMPLETT NEU machen.

**SCHRITT 1: LIES DIE RELEVANTEN SKILL-RULES**
C:\Users\bachl\.gemini\antigravity\global_skills\remotion-best-practices\
- Lies `rules/timing.md`
- Lies `rules/sequencing.md`
- Lies `rules/compositions.md`
- Lies `rules/animations.md`
- Das ist deine REFERENZ für "bereits dokumentiert"

**SCHRITT 2: LIES ALLE ORIGINAL-QUELLEN NEU**
Diese Dateien MÜSSEN komplett neu gelesen werden:

REPO-DATEIEN:
- C:\Workspace\Repos\remotion-studio\viron-core\vision.md
- C:\Workspace\Repos\remotion-studio\viron-core\documentation_manifest.md
- C:\Workspace\Repos\remotion-studio\viron-core\pipeline.md

VAULT-DATEIEN:
- C:\Viron\90_VAULT\NEW SUFF\Remotion\00-master-workflow-2026-integration.md
- C:\Viron\90_VAULT\NEW SUFF\Remotion\00-overview-index-v2-1-complete.md
- C:\Viron\90_VAULT\NEW SUFF\Remotion\02-animation-01-basics-und-setup.md
- C:\Viron\90_VAULT\NEW SUFF\Remotion\02-animation-02-timing-easing-spring.md
- C:\Viron\90_VAULT\NEW SUFF\Remotion\02-animation-03-sequencing-transitions.md

**SCHRITT 3: VERGLEICHE JEDEN FUND**
Für jeden Inhalt aus den Quellen:
1. Ist das EXPLIZIT und VOLLSTÄNDIG im Skill dokumentiert?
   - JA → NICHT DUPLIZIEREN (Skill deckt es ab)
   - NEIN → MITNEHMEN (auch wenn es "bekannt" klingt!)
2. Bei MITNEHMEN: Dokumentiere WO es hingeht und WIE es genutzt wird

**WICHTIG:**
- Vault-Recherchen sind 2026-Updates. Sie sind NEUER als Trainingsdaten.
- Dein Gefühl "das weiß ich" ist KEIN Kriterium. NUR der Skill zählt.
- Viron-spezifische Configs, Werte, Workflows sind IMMER wertvoll.

**OUTPUT:**
Erstelle: C:\Workspace\Repos\remotion-studio\.knowledge\mission\EXTRACTION_REPORT_BADGE_1_REVISION.md

**FORMAT:**
Für jeden Fund:
- Skill-Check (in welcher Skill-Datei steht es? Oder steht es NICHT im Skill?)
- Entscheidung (MITNEHMEN / NICHT DUPLIZIEREN)
- Bei MITNEHMEN: Ziel-Location + Nutzungsart + Warum wertvoll
- Bei NICHT DUPLIZIEREN: Welche Skill-Datei hat es bereits

**STATISTIK AM ENDE:**
| Entscheidung | Anzahl | Details |
|--------------|--------|---------|
| MITNEHMEN | X | [Kurze Auflistung] |
| NICHT DUPLIZIEREN | Y | [Welche Skill-Rules decken es ab] |

**DEIN ALTER REPORT (NUR ZUR REFERENZ):**
C:\Workspace\Repos\remotion-studio\.knowledge\mission\EXTRACTION_REPORT_BADGE_1.md

**START:**
1. Lies den GESAMTEN Skill (SKILL.md + alle rules/)
2. Lies ALLE Original-Quellen komplett neu
3. Erstelle den Revision-Report mit Skill-Abgleich
```

---

## 📦 REVISION PROMPT: BADGE 2

```text
**🔄 REVISIONS-AUFTRAG: BADGE 2 (3D PHYSICS, LIGHTING & GEOMETRY)**

**KONTEXT:**
Wir migrieren das Viron-Repo. Dein alter Report wurde FEHLERHAFT erstellt -
ohne Skill-Abgleich. Du musst die Arbeit KOMPLETT NEU machen.

**SCHRITT 1: LIES DIE RELEVANTEN SKILL-RULES**
C:\Users\bachl\.gemini\antigravity\global_skills\remotion-best-practices\
- Lies `rules/3d.md`
- Das ist deine REFERENZ für "bereits dokumentiert"

**SCHRITT 2: LIES ALLE ORIGINAL-QUELLEN NEU**
Diese Dateien MÜSSEN komplett neu gelesen werden:

REPO-DATEIEN:
- C:\Workspace\Repos\remotion-studio\viron-core\physics.md
- C:\Workspace\Repos\remotion-studio\specs\TEMPLATE_FeatureSpec.md

VAULT-DATEIEN:
- C:\Viron\90_VAULT\NEW SUFF\Remotion\10-3d-01-three-fiber-integration.md
- C:\Viron\90_VAULT\NEW SUFF\Remotion\10-3d-02-pbr-materials.md
- C:\Viron\90_VAULT\NEW SUFF\Remotion\10-3d-03-camera-animation.md
- C:\Viron\90_VAULT\NEW SUFF\Remotion\10-3d-04-gltf-optimization.md

**SCHRITT 3: VERGLEICHE JEDEN FUND**
Für jeden Inhalt aus den Quellen:
1. Ist das EXPLIZIT und VOLLSTÄNDIG im Skill dokumentiert?
   - JA → NICHT DUPLIZIEREN (Skill deckt es ab)
   - NEIN → MITNEHMEN (auch wenn es "bekannt" klingt!)
2. Bei MITNEHMEN: Dokumentiere WO es hingeht und WIE es genutzt wird

**WICHTIG:**
- Vault-Recherchen sind 2026-Updates. Sie sind NEUER als Trainingsdaten.
- Dein Gefühl "das weiß ich" ist KEIN Kriterium. NUR der Skill zählt.
- Viron-spezifische Physics-Werte, PBR-Configs, Kamera-Setups sind IMMER wertvoll.

**OUTPUT:**
Erstelle: C:\Workspace\Repos\remotion-studio\.knowledge\mission\EXTRACTION_REPORT_BADGE_2_REVISION.md

**FORMAT:**
Für jeden Fund:
- Skill-Check (in welcher Skill-Datei steht es? Oder steht es NICHT im Skill?)
- Entscheidung (MITNEHMEN / NICHT DUPLIZIEREN)
- Bei MITNEHMEN: Ziel-Location + Nutzungsart + Warum wertvoll
- Bei NICHT DUPLIZIEREN: Welche Skill-Datei hat es bereits

**STATISTIK AM ENDE:**
| Entscheidung | Anzahl | Details |
|--------------|--------|---------|
| MITNEHMEN | X | [Kurze Auflistung] |
| NICHT DUPLIZIEREN | Y | [Welche Skill-Rules decken es ab] |

**DEIN ALTER REPORT (NUR ZUR REFERENZ):**
C:\Workspace\Repos\remotion-studio\.knowledge\mission\EXTRACTION_REPORT_BADGE_2.md

**START:**
1. Lies den GESAMTEN Skill (SKILL.md + alle rules/)
2. Lies ALLE Original-Quellen komplett neu
3. Erstelle den Revision-Report mit Skill-Abgleich
```

---

## 📦 REVISION PROMPT: BADGE 3

```text
**🔄 REVISIONS-AUFTRAG: BADGE 3 (VISUAL FX, SHADERS & MATERIALS)**

**KONTEXT:**
Wir migrieren das Viron-Repo. Dein alter Report wurde FEHLERHAFT erstellt -
ohne Skill-Abgleich. Du musst die Arbeit KOMPLETT NEU machen.

**SCHRITT 1: LIES DIE RELEVANTEN SKILL-RULES**
C:\Users\bachl\.gemini\antigravity\global_skills\remotion-best-practices\
- Lies `rules/3d.md` (für Shaders/Materials)
- Lies `rules/animations.md`
- Das ist deine REFERENZ für "bereits dokumentiert"

**SCHRITT 2: LIES ALLE ORIGINAL-QUELLEN NEU**
Diese Dateien MÜSSEN komplett neu gelesen werden:

REPO-DATEIEN:
- C:\Workspace\Repos\remotion-studio\src\learnings\GUIDE_Viron_Button_Stack.md
- C:\Workspace\Repos\remotion-studio\guides\viron-button-guide.md
- C:\Workspace\Repos\remotion-studio\src\learnings\PATTERN_Advanced_Shaders.md

VAULT-DATEIEN:
- C:\Viron\90_VAULT\NEW SUFF\Remotion\15-effects-01-post-processing.md
- C:\Viron\90_VAULT\NEW SUFF\Remotion\15-effects-02-shaders-materials.md
- C:\Viron\90_VAULT\NEW SUFF\Remotion\15-effects-03-particles.md

**SCHRITT 3: VERGLEICHE JEDEN FUND**
Für jeden Inhalt aus den Quellen:
1. Ist das EXPLIZIT und VOLLSTÄNDIG im Skill dokumentiert?
   - JA → NICHT DUPLIZIEREN (Skill deckt es ab)
   - NEIN → MITNEHMEN (auch wenn es "bekannt" klingt!)
2. Bei MITNEHMEN: Dokumentiere WO es hingeht und WIE es genutzt wird

**WICHTIG:**
- Post-Processing Stacks, Shader-Recipes, Material-Configs sind Viron-IP.
- Das CSM-Gesetz (kein Lamina!), useFrame-Konversion sind kritische Regeln.
- Vault-Recherchen sind 2026-Updates → NEUER als Trainingsdaten!

**OUTPUT:**
Erstelle: C:\Workspace\Repos\remotion-studio\.knowledge\mission\EXTRACTION_REPORT_BADGE_3_REVISION.md

**FORMAT:**
Für jeden Fund:
- Skill-Check (in welcher Skill-Datei steht es? Oder steht es NICHT im Skill?)
- Entscheidung (MITNEHMEN / NICHT DUPLIZIEREN)
- Bei MITNEHMEN: Ziel-Location + Nutzungsart + Warum wertvoll
- Bei NICHT DUPLIZIEREN: Welche Skill-Datei hat es bereits

**STATISTIK AM ENDE:**
| Entscheidung | Anzahl | Details |
|--------------|--------|---------|
| MITNEHMEN | X | [Kurze Auflistung] |
| NICHT DUPLIZIEREN | Y | [Welche Skill-Rules decken es ab] |

**DEIN ALTER REPORT (NUR ZUR REFERENZ):**
C:\Workspace\Repos\remotion-studio\.knowledge\mission\EXTRACTION_REPORT_BADGE_3.md

**START:**
1. Lies den GESAMTEN Skill (SKILL.md + alle rules/)
2. Lies ALLE Original-Quellen komplett neu
3. Erstelle den Revision-Report mit Skill-Abgleich
```

---

## 📦 REVISION PROMPT: BADGE 4

```text
**🔄 REVISIONS-AUFTRAG: BADGE 4 (DESIGN SYSTEM & UI)**

**KONTEXT:**
Wir migrieren das Viron-Repo. Dein alter Report wurde FEHLERHAFT erstellt -
ohne Skill-Abgleich. Du musst die Arbeit KOMPLETT NEU machen.

**SCHRITT 1: LIES DIE RELEVANTEN SKILL-RULES**
C:\Users\bachl\.gemini\antigravity\global_skills\remotion-best-practices\
- Lies `rules/tailwind.md`
- Lies `rules/fonts.md`
- Lies `rules/charts.md`
- Lies `rules/text-animations.md`
- Lies `rules/gifs.md`
- Das ist deine REFERENZ für "bereits dokumentiert"

**SCHRITT 2: LIES ALLE ORIGINAL-QUELLEN NEU**
Diese Dateien MÜSSEN komplett neu gelesen werden:

REPO-DATEIEN:
- C:\Workspace\Repos\remotion-studio\viron-core\theme.md
- C:\Workspace\Repos\remotion-studio\src\learnings\GUIDE_Viron_Button_Stack.md
- C:\Workspace\Repos\remotion-studio\guides\viron-button-guide.md
- C:\Workspace\Repos\remotion-studio\patterns\BarChart.md
- C:\Workspace\Repos\remotion-studio\patterns\WordHighlight.md

VAULT-DATEIEN:
- C:\Viron\90_VAULT\NEW SUFF\Remotion\20-layout-patterns-01-container-queries-und-grids.md
- C:\Viron\90_VAULT\NEW SUFF\Remotion\20-layout-patterns-02-view-transitions-in-remotion.md



**SCHRITT 3: VERGLEICHE JEDEN FUND**
Für jeden Inhalt aus den Quellen:
1. Ist das EXPLIZIT und VOLLSTÄNDIG im Skill dokumentiert?
   - JA → NICHT DUPLIZIEREN (Skill deckt es ab)
   - NEIN → MITNEHMEN (auch wenn es "bekannt" klingt!)
2. Bei MITNEHMEN: Dokumentiere WO es hingeht und WIE es genutzt wird

**WICHTIG:**
- Metallic Palette, Eye Candy Stack, Theme.ts sind Viron-IP.
- Container Queries und View Transitions sind 2026-Updates!
- VERBOTE (keine Tailwind Transitions) könnten im Skill stehen - genau prüfen!

**OUTPUT:**
Erstelle: C:\Workspace\Repos\remotion-studio\.knowledge\mission\EXTRACTION_REPORT_BADGE_4_REVISION.md

**FORMAT:**
Für jeden Fund:
- Skill-Check (in welcher Skill-Datei steht es? Oder steht es NICHT im Skill?)
- Entscheidung (MITNEHMEN / NICHT DUPLIZIEREN)
- Bei MITNEHMEN: Ziel-Location + Nutzungsart + Warum wertvoll
- Bei NICHT DUPLIZIEREN: Welche Skill-Datei hat es bereits

**STATISTIK AM ENDE:**
| Entscheidung | Anzahl | Details |
|--------------|--------|---------|
| MITNEHMEN | X | [Kurze Auflistung] |
| NICHT DUPLIZIEREN | Y | [Welche Skill-Rules decken es ab] |

**DEIN ALTER REPORT (NUR ZUR REFERENZ):**
C:\Workspace\Repos\remotion-studio\.knowledge\mission\EXTRACTION_REPORT_BADGE_4.md

**START:**
1. Lies den GESAMTEN Skill (SKILL.md + alle rules/)
2. Lies ALLE Original-Quellen komplett neu
3. Erstelle den Revision-Report mit Skill-Abgleich
```

---

_Revision Prompts V3 | Komplettes Re-Read + Skill-Abgleich | 2026-01-31_
