# 🎯 SUB-AGENT BRIEFING: BADGE 1 REPAIR (Time & Sequencing)

**Purpose:** Chirurgische Reparatur des Badge 1 Extraction Reports basierend auf dem neuen Template.
**Quelle:** Deine bisherige Arbeit in `EXTRACTION_REPORT_BADGE_1.md` war gut, aber formal unsauber (keine Kategorien, zu viel Copy-Paste).
**Ziel:** Transformiere deine Erkenntnisse in das neue V2-Format.

---

## 2. PFLICHTLEKTÜRE (Zur Auffrischung)

### 2.1 Dein "Context Kit" (Referenz)

| Datei              | Absoluter Pfad                                                               | Zweck                      |
| :----------------- | :--------------------------------------------------------------------------- | :------------------------- |
| **Local SKILL.md** | `C:\Workspace\Repos\remotion-studio\.agent\skills\remotion-core\SKILL.md`    | Redundanz-Check.           |
| **Logic Engine**   | `C:\Viron\90_VAULT\NEW SUFF\Remotion\00-master-workflow-2026-integration.md` | Entscheidungsbäume prüfen. |

### 2.2 Badge-Spezifische Quelldateien (Die du bereits seziert hast)

Du musst diese nicht neu lesen, wenn du sie noch im Kontext hast. Aber verifiziere sie:

**Legacy Repository:**

- `viron-core/vision.md`
- `viron-core/documentation_manifest.md`
- `viron-core/pipeline.md`

**Vault 2026:**

- `00-master-workflow-2026-integration.md`
- `00-overview-index-v2-1-complete.md`
- `10-remotion-basics-01-timeline-und-frames.md`
- `Remotion Setup.md`

**Global Skill (Baseline):**

- `animations.md`, `timing.md`, `sequencing.md`, `compositions.md`

---

## 4. DEIN AUFTRAG: REFORMATIERUNG & KORREKTUR

Du sollst den bestehenden Report `EXTRACTION_REPORT_BADGE_1.md` komplett überschreiben.

### Deine Fehler im alten Report (die du korrigieren musst):

1. **Keine Kategorien:** Du hast alles in einen Topf geworfen. Trenne jetzt strikt nach A/B/C.
2. **Zu viel Copy-Paste:** Ersetze die riesigen Code-Blöcke (z.B. Punkt 9, 10, 15) durch kurze Referenzen (`file:lines`).
3. **Format:** Nutze exakt das unten stehende Output-Format.

### Die Kategorien:

**A: SKILL_UPDATES (Global Skill Anreicherung)**

- Dinge, die Remotion-Wissen sind, aber im Global Skill fehlen.
- Beispiel: `lambda.md` Config (generisch), `performance`-Metriken.

**B: PROJECT_IP (Viron-Spezifisch)**

- Viron-Secrets, die nirgendwo anders gelten.
- Beispiel: Die "5 Säulen", das "Knowledge Router System", die "Zero-Touch Pipeline".

**C: RESEARCH_NOTES (Archiv)**

- Kontext, "Warum machen wir das so", Tutorial-Schnipsel.
- Beispiel: Die ROI-Metriken, die Anti-Pattern-Tabelle.

---

## 6. OUTPUT FORMAT (Strikt einhalten!)

Erstelle: `C:\Workspace\Repos\remotion-studio\.knowledge\mission\EXTRACTION_REPORT_BADGE_1_V2.md`

```markdown
# 🎯 Badge 1: Extraction Report – Time & Sequencing (V2)

**Version:** 2.0 (Refined)
**Badge ID:** VIRON-2026-B1
**Analyst:** Sub-Agent

---

## 📊 Statistik

(Übernimm die Tabelle aus V1, sie war korrekt)

---

## ✅ A: SKILL_UPDATES (Global Skill Anreicherung)

### Aus [pipeline.md](file:///C:/Workspace/Repos/remotion-studio/viron-core/pipeline.md)

**Zeilen 92-101:** Lambda Config Template (Generisch)

> Empfohlene Settings für AWS Lambda (3GB RAM, 900s timeout).

**Zeilen 106-109:** Concurrency Calculation

> Formel zur Berechnung der optimalen Render-Concurrency.

### Aus [10-remotion-basics...md](...)

**Zeilen 186-192:** Anti-Patterns (CSS verboten)

> Wichtige Regel-Ergänzung für `animations.md`.

---

## ✅ B: PROJECT_IP (Viron-Spezifisch)

### Aus [vision.md](file:///C:/Workspace/Repos/remotion-studio/viron-core/vision.md)

**Zeilen 33-38:** Die 5 Säulen Architektur

> Spezifische Viron-Architektur (R3F + Tailwind + Remotion + Drei + Lambda).

**Zeilen 40-41:** Shared Theme.ts Pattern

> Single Source of Truth Konzept für Hybrid-Apps.

### Aus [documentation_manifest.md](...)

**Zeile 69:** Rule "Viron > Global"

> Governance-Regel: Lokales Manifest überschreibt globale Skills.

### Aus [Remotion Setup.md](...)

**Zeilen 135-294:** Zero-Touch Pipeline

> Der spezifische Whisper → Auphonic → Remotion Workflow.

---

## 📚 C: RESEARCH_NOTES (Archiv)

### Aus [00-master-workflow...md](...)

**Zeilen 133-141:** Decision Trees

> Kontext-Wissen: Wann welche Technologie genutzt wird.

**Zeilen 143-146:** ROI Metriken

> Argumentationshilfen für Business-Cases.

---

## ❌ VERWORFENE PUNKTE (Redundanz-Check)

(Übernimm die Tabelle aus V1, sie war gut)

---

## ⚠️ KONFLIKTE

(Keine gefunden)
```

**An die Arbeit! Transformiere V1 zu V2.**
