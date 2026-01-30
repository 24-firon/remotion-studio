# 🔄 REVISION PROMPTS FÜR BADGES 1-4

**Purpose:** Korrektur der bestehenden Reports durch Skill-Abgleich.
**Problem:** Die Original-Reports wurden OHNE Delta-Filterung gegen den Global Skill erstellt.
**Lösung:** Neue Revision-Reports, die NUR das dokumentieren, was ÜBER den Skill hinausgeht.

---

## Das Kern-Prinzip (Aus Implementation Plan Zeilen 107-116)

```
AUDIT-TRINITY:
1. Global Skill = STANDARD/REFERENZ (wird nicht geändert)
2. Repo + Vault = KANDIDATEN (werden gegen Skill gemessen)
3. Nur DELTAS = VIRON-IP (die "Secret Sauce")

→ Was im Skill steht = VERWERFEN (keine Redundanz)
→ Was NEU ist = BEHALTEN (das ist der Wert)
```

---

## 📦 REVISION PROMPT: BADGE 1

```text
**🔄 REVISION-AUFTRAG: BADGE 1 (CORE ARCHITECTURE)**

**KONTEXT:**
Du hast bereits einen Report erstellt: `EXTRACTION_REPORT_BADGE_1.md`
Dieser Report wurde OHNE Skill-Abgleich erstellt. Er enthält Redundanz.

**DEINE NEUE MISSION:**
Vergleiche deinen alten Report gegen den Global Skill.

**DER GLOBAL SKILL (REFERENZ):**
Pfad: `C:\Users\bachl\.gemini\antigravity\global_skills\remotion-best-practices\`
Relevante Rules: `rules/timing.md`, `rules/sequencing.md`, `rules/compositions.md`, `rules/animations.md`

**REGEL:**
- Alles was BEREITS im Skill steht → STREICHEN (Redundanz)
- Alles was NEU ist (nicht im Skill) → BEHALTEN (Viron-IP)

**DEIN ALTER REPORT:**
Lies: `C:\Workspace\Repos\remotion-studio\.knowledge\mission\EXTRACTION_REPORT_BADGE_1.md`

**OUTPUT:**
Erstelle: `C:\Workspace\Repos\remotion-studio\.knowledge\mission\EXTRACTION_REPORT_BADGE_1_REVISION.md`

**FORMAT:**
1. Für jeden Punkt aus deinem alten Report:
   - Prüfe: Steht das im Skill?
   - Wenn JA → Dokumentiere: "VERWORFEN: Bereits in [skill-rule.md]"
   - Wenn NEIN → Übernehme mit Erklärung warum es Viron-spezifisch ist

2. Am Ende: Statistik
   - X Punkte VERWORFEN (Redundanz)
   - Y Punkte BEHALTEN (Viron-IP)

**START:**
Lies zuerst die relevanten Skill-Rules. Dann lies deinen alten Report. Dann erstelle die Revision.
```

---

## 📦 REVISION PROMPT: BADGE 2

```text
**🔄 REVISION-AUFTRAG: BADGE 2 (3D PHYSICS, LIGHTING & GEOMETRY)**

**KONTEXT:**
Du hast bereits einen Report erstellt: `EXTRACTION_REPORT_BADGE_2.md`
Dieser Report wurde OHNE Skill-Abgleich erstellt. Er enthält Redundanz.

**DEINE NEUE MISSION:**
Vergleiche deinen alten Report gegen den Global Skill.

**DER GLOBAL SKILL (REFERENZ):**
Pfad: `C:\Users\bachl\.gemini\antigravity\global_skills\remotion-best-practices\`
Relevante Rules: `rules/3d.md`

**REGEL:**
- Alles was BEREITS im Skill steht → STREICHEN (Redundanz)
- Alles was NEU ist (nicht im Skill) → BEHALTEN (Viron-IP)

**DEIN ALTER REPORT:**
Lies: `C:\Workspace\Repos\remotion-studio\.knowledge\mission\EXTRACTION_REPORT_BADGE_2.md`

**OUTPUT:**
Erstelle: `C:\Workspace\Repos\remotion-studio\.knowledge\mission\EXTRACTION_REPORT_BADGE_2_REVISION.md`

**FORMAT:**
1. Für jeden Punkt aus deinem alten Report:
   - Prüfe: Steht das im Skill?
   - Wenn JA → Dokumentiere: "VERWORFEN: Bereits in [skill-rule.md]"
   - Wenn NEIN → Übernehme mit Erklärung warum es Viron-spezifisch ist

2. Am Ende: Statistik
   - X Punkte VERWORFEN (Redundanz)
   - Y Punkte BEHALTEN (Viron-IP)

**START:**
Lies zuerst `rules/3d.md`. Dann lies deinen alten Report. Dann erstelle die Revision.
```

---

## 📦 REVISION PROMPT: BADGE 3

```text
**🔄 REVISION-AUFTRAG: BADGE 3 (VISUAL FX, SHADERS & MATERIALS)**

**KONTEXT:**
Du hast bereits einen Report erstellt: `EXTRACTION_REPORT_BADGE_3.md`
Dieser Report wurde OHNE Skill-Abgleich erstellt. Er enthält Redundanz.

**DEINE NEUE MISSION:**
Vergleiche deinen alten Report gegen den Global Skill.

**DER GLOBAL SKILL (REFERENZ):**
Pfad: `C:\Users\bachl\.gemini\antigravity\global_skills\remotion-best-practices\`
Relevante Rules: `rules/3d.md`, `rules/animations.md`

**REGEL:**
- Alles was BEREITS im Skill steht → STREICHEN (Redundanz)
- Alles was NEU ist (nicht im Skill) → BEHALTEN (Viron-IP)

**DEIN ALTER REPORT:**
Lies: `C:\Workspace\Repos\remotion-studio\.knowledge\mission\EXTRACTION_REPORT_BADGE_3.md`

**OUTPUT:**
Erstelle: `C:\Workspace\Repos\remotion-studio\.knowledge\mission\EXTRACTION_REPORT_BADGE_3_REVISION.md`

**FORMAT:**
1. Für jeden Punkt aus deinem alten Report:
   - Prüfe: Steht das im Skill?
   - Wenn JA → Dokumentiere: "VERWORFEN: Bereits in [skill-rule.md]"
   - Wenn NEIN → Übernehme mit Erklärung warum es Viron-spezifisch ist

2. Am Ende: Statistik
   - X Punkte VERWORFEN (Redundanz)
   - Y Punkte BEHALTEN (Viron-IP)

**START:**
Lies zuerst die relevanten Skill-Rules. Dann lies deinen alten Report. Dann erstelle die Revision.
```

---

## 📦 REVISION PROMPT: BADGE 4

```text
**🔄 REVISION-AUFTRAG: BADGE 4 (DESIGN SYSTEM & UI)**

**KONTEXT:**
Badge 4 wurde noch NICHT gestartet. Aber das Briefing war fehlerhaft.
Erstelle den Report DIREKT mit Skill-Abgleich.

**DEINE MISSION:**
Extrahiere NUR das, was NICHT im Global Skill steht.

**DER GLOBAL SKILL (REFERENZ):**
Pfad: `C:\Users\bachl\.gemini\antigravity\global_skills\remotion-best-practices\`
Relevante Rules: `rules/tailwind.md`, `rules/fonts.md`, `rules/charts.md`, `rules/text-animations.md`, `rules/gifs.md`

**REGEL:**
- Alles was BEREITS im Skill steht → NICHT EXTRAHIEREN
- Alles was NEU ist (nicht im Skill) → EXTRAHIEREN (Viron-IP)

**DEIN BRIEFING:**
Lies: `C:\Workspace\Repos\remotion-studio\.knowledge\mission\SUBAGENT_BRIEFING_BADGE_4.md`

**OUTPUT:**
Erstelle: `C:\Workspace\Repos\remotion-studio\.knowledge\mission\EXTRACTION_REPORT_BADGE_4.md`

**FORMAT:**
Für jeden Fund:
1. Prüfe: Steht das im Skill?
2. Wenn JA → Nicht aufnehmen
3. Wenn NEIN → Dokumentiere mit:
   - Quelle (Datei, Zeilen)
   - Warum es Viron-spezifisch ist
   - Code-Beispiel

Am Ende: Statistik
- X Punkte VERWORFEN (bereits im Skill)
- Y Punkte BEHALTEN (Viron-IP)

**START:**
Lies zuerst ALLE relevanten Skill-Rules. Dann lies das Briefing. Dann extrahiere NUR die Deltas.
```

---

_Revision Prompts erstellt: 2026-01-31_
