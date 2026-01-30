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
Wir migrieren das Viron-Repo. Dein alter Report `EXTRACTION_REPORT_BADGE_1.md`
wurde ohne Skill-Abgleich erstellt. Jetzt musst du für jeden Fund entscheiden:
Was nehmen wir mit? Was lassen wir zurück?

**DEIN ALTER REPORT:**
C:\Workspace\Repos\remotion-studio\.knowledge\mission\EXTRACTION_REPORT_BADGE_1.md

**DER GLOBAL SKILL (EINZIGER FILTER):**
C:\Users\bachl\.gemini\antigravity\global_skills\remotion-best-practices\
Relevante Rules für Badge 1:
- rules/timing.md
- rules/sequencing.md
- rules/compositions.md
- rules/animations.md

**DIE LOGIK:**
1. Lies jeden Punkt in deinem alten Report
2. Prüfe: Steht das EXPLIZIT und VOLLSTÄNDIG im Skill?
   - Wenn JA → NICHT DUPLIZIEREN (Skill hat es schon)
   - Wenn NEIN → MITNEHMEN (auch wenn es "bekannt" klingt!)
3. Für jeden MITNEHMEN-Punkt: Dokumentiere WO es hingeht und WIE es genutzt wird

**WICHTIG:**
- Vault-Recherchen sind 2026-Updates. Sie sind NEUER als Trainingsdaten.
- Dein Gefühl "das weiß ich" ist KEIN Kriterium. Nur der Skill zählt.
- Viron-spezifische Configs, Werte, Workflows sind IMMER wertvoll.

**OUTPUT:**
Erstelle: C:\Workspace\Repos\remotion-studio\.knowledge\mission\EXTRACTION_REPORT_BADGE_1_REVISION.md

**FORMAT:**
Für jeden Fund aus dem alten Report:
- Skill-Check (explizit dokumentiert?)
- Entscheidung (MITNEHMEN / NICHT DUPLIZIEREN)
- Bei MITNEHMEN: Ziel-Location + Nutzungsart + Warum wertvoll
- Bei NICHT DUPLIZIEREN: Welche Skill-Datei hat es bereits

**STATISTIK AM ENDE:**
| Entscheidung | Anzahl | Details |
|--------------|--------|---------|
| MITNEHMEN | X | [Kurze Auflistung] |
| NICHT DUPLIZIEREN | Y | [Welche Skill-Rules decken es ab] |

**START:**
Lies zuerst die relevanten Skill-Rules. Dann geh deinen alten Report durch.
Für jeden Punkt: Skill-Check → Entscheidung → Dokumentation.
```

---

## 📦 REVISION PROMPT: BADGE 2

```text
**🔄 REVISIONS-AUFTRAG: BADGE 2 (3D PHYSICS, LIGHTING & GEOMETRY)**

**KONTEXT:**
Wir migrieren das Viron-Repo. Dein alter Report `EXTRACTION_REPORT_BADGE_2.md`
wurde ohne Skill-Abgleich erstellt. Jetzt musst du für jeden Fund entscheiden:
Was nehmen wir mit? Was lassen wir zurück?

**DEIN ALTER REPORT:**
C:\Workspace\Repos\remotion-studio\.knowledge\mission\EXTRACTION_REPORT_BADGE_2.md

**DER GLOBAL SKILL (EINZIGER FILTER):**
C:\Users\bachl\.gemini\antigravity\global_skills\remotion-best-practices\
Relevante Rules für Badge 2:
- rules/3d.md

**DIE LOGIK:**
1. Lies jeden Punkt in deinem alten Report
2. Prüfe: Steht das EXPLIZIT und VOLLSTÄNDIG im Skill?
   - Wenn JA → NICHT DUPLIZIEREN (Skill hat es schon)
   - Wenn NEIN → MITNEHMEN (auch wenn es "bekannt" klingt!)
3. Für jeden MITNEHMEN-Punkt: Dokumentiere WO es hingeht und WIE es genutzt wird

**WICHTIG:**
- Vault-Recherchen sind 2026-Updates. Sie sind NEUER als Trainingsdaten.
- Dein Gefühl "das weiß ich" ist KEIN Kriterium. Nur der Skill zählt.
- Viron-spezifische Physics-Werte, PBR-Configs, Kamera-Setups sind IMMER wertvoll.

**OUTPUT:**
Erstelle: C:\Workspace\Repos\remotion-studio\.knowledge\mission\EXTRACTION_REPORT_BADGE_2_REVISION.md

**FORMAT:**
Für jeden Fund aus dem alten Report:
- Skill-Check (explizit dokumentiert?)
- Entscheidung (MITNEHMEN / NICHT DUPLIZIEREN)
- Bei MITNEHMEN: Ziel-Location + Nutzungsart + Warum wertvoll
- Bei NICHT DUPLIZIEREN: Welche Skill-Datei hat es bereits

**STATISTIK AM ENDE:**
| Entscheidung | Anzahl | Details |
|--------------|--------|---------|
| MITNEHMEN | X | [Kurze Auflistung] |
| NICHT DUPLIZIEREN | Y | [Welche Skill-Rules decken es ab] |

**START:**
Lies zuerst `rules/3d.md` vollständig. Dann geh deinen alten Report durch.
Für jeden Punkt: Skill-Check → Entscheidung → Dokumentation.
```

---

## 📦 REVISION PROMPT: BADGE 3

```text
**🔄 REVISIONS-AUFTRAG: BADGE 3 (VISUAL FX, SHADERS & MATERIALS)**

**KONTEXT:**
Wir migrieren das Viron-Repo. Dein alter Report `EXTRACTION_REPORT_BADGE_3.md`
wurde ohne Skill-Abgleich erstellt. Jetzt musst du für jeden Fund entscheiden:
Was nehmen wir mit? Was lassen wir zurück?

**DEIN ALTER REPORT:**
C:\Workspace\Repos\remotion-studio\.knowledge\mission\EXTRACTION_REPORT_BADGE_3.md

**DER GLOBAL SKILL (EINZIGER FILTER):**
C:\Users\bachl\.gemini\antigravity\global_skills\remotion-best-practices\
Relevante Rules für Badge 3:
- rules/3d.md
- rules/animations.md

**DIE LOGIK:**
1. Lies jeden Punkt in deinem alten Report
2. Prüfe: Steht das EXPLIZIT und VOLLSTÄNDIG im Skill?
   - Wenn JA → NICHT DUPLIZIEREN (Skill hat es schon)
   - Wenn NEIN → MITNEHMEN (auch wenn es "bekannt" klingt!)
3. Für jeden MITNEHMEN-Punkt: Dokumentiere WO es hingeht und WIE es genutzt wird

**WICHTIG:**
- Vault-Recherchen sind 2026-Updates. Sie sind NEUER als Trainingsdaten.
- Post-Processing Stacks, Shader-Recipes, Material-Configs sind Viron-IP.
- Das CSM-Gesetz (kein Lamina!), useFrame-Konversion sind kritische Regeln.

**OUTPUT:**
Erstelle: C:\Workspace\Repos\remotion-studio\.knowledge\mission\EXTRACTION_REPORT_BADGE_3_REVISION.md

**FORMAT:**
Für jeden Fund aus dem alten Report:
- Skill-Check (explizit dokumentiert?)
- Entscheidung (MITNEHMEN / NICHT DUPLIZIEREN)
- Bei MITNEHMEN: Ziel-Location + Nutzungsart + Warum wertvoll
- Bei NICHT DUPLIZIEREN: Welche Skill-Datei hat es bereits

**STATISTIK AM ENDE:**
| Entscheidung | Anzahl | Details |
|--------------|--------|---------|
| MITNEHMEN | X | [Kurze Auflistung] |
| NICHT DUPLIZIEREN | Y | [Welche Skill-Rules decken es ab] |

**START:**
Lies zuerst die relevanten Skill-Rules. Dann geh deinen alten Report durch.
Für jeden Punkt: Skill-Check → Entscheidung → Dokumentation.
```

---

## 📦 REVISION PROMPT: BADGE 4

```text
**🔄 REVISIONS-AUFTRAG: BADGE 4 (DESIGN SYSTEM & UI)**

**KONTEXT:**
Wir migrieren das Viron-Repo. Badge 4 hat noch keinen Report.
Erstelle ihn DIREKT mit Skill-Abgleich.

**DEIN BRIEFING:**
C:\Workspace\Repos\remotion-studio\.knowledge\mission\SUBAGENT_BRIEFING_BADGE_4.md

**DER GLOBAL SKILL (EINZIGER FILTER):**
C:\Users\bachl\.gemini\antigravity\global_skills\remotion-best-practices\
Relevante Rules für Badge 4:
- rules/tailwind.md
- rules/fonts.md
- rules/charts.md
- rules/text-animations.md
- rules/gifs.md

**DIE LOGIK:**
1. Lies jede Quelle aus dem Briefing
2. Für jeden Fund: Steht das EXPLIZIT und VOLLSTÄNDIG im Skill?
   - Wenn JA → NICHT EXTRAHIEREN
   - Wenn NEIN → EXTRAHIEREN und dokumentieren
3. Dokumentiere WO jeder Fund hingeht und WIE er genutzt wird

**WICHTIG:**
- Vault-Recherchen (Container Queries, View Transitions) sind 2026-Updates!
- Metallic Palette, Eye Candy Stack, Theme.ts sind Viron-IP.
- VERBOTE (keine Tailwind Transitions) könnten teilweise im Skill stehen - prüfen!

**OUTPUT:**
Erstelle: C:\Workspace\Repos\remotion-studio\.knowledge\mission\EXTRACTION_REPORT_BADGE_4.md

**FORMAT:**
Für jeden Fund:
- Skill-Check (explizit dokumentiert?)
- Entscheidung (MITNEHMEN / NICHT DUPLIZIEREN)
- Bei MITNEHMEN: Ziel-Location + Nutzungsart + Warum wertvoll
- Bei NICHT DUPLIZIEREN: Welche Skill-Datei hat es bereits

**STATISTIK AM ENDE:**
| Entscheidung | Anzahl | Details |
|--------------|--------|---------|
| MITNEHMEN | X | [Kurze Auflistung] |
| NICHT DUPLIZIEREN | Y | [Welche Skill-Rules decken es ab] |

**START:**
Lies zuerst ALLE relevanten Skill-Rules vollständig.
Dann lies das Briefing und die Quellen.
Für jeden Fund: Skill-Check → Entscheidung → Dokumentation.
```

---

_Revision Prompts V2 | Skill-als-Filter-Logik | 2026-01-31_
