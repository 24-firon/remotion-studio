# 🚀 VIRON INITIALIZATION PROTOCOL (v2.1)

**Status:** ACTIVE  
**Letzte Aktualisierung:** 2026-01-29

---

## 📋 ÜBERSICHT

Dieses Dokument ist der **einzige Einstiegspunkt** für Agenten. Es definiert den roten Faden durch alle Wissensquellen.

**Token-Budget:**

- Basis-Init: ~7K Token (Pflicht)
- On-Demand: ~50K Token (bei Bedarf)

---

## PHASE 1: IDENTITÄT (Pflicht)

Lade diese Dateien, um dein "Betriebssystem" zu starten:

1. **Globale Regeln:** `~/.gemini/gemini.md`
   - Achte auf: **"Global Skills Hub"** Sektion (zeigt auf Skills-Ordner)
2. **Verhaltensregeln:** `~/.gemini/rules/agency.md`

3. **Projekt-Governance:** `PROJECT_RULES.md` (im Repo-Root)

---

## PHASE 2: TECHNOLOGIE-BASELINE (Pflicht)

**Der globale Remotion-Skill ist die BASELINE.** Alles im Projekt baut darauf auf.

1. **Lies den Index:** `~/.gemini/antigravity/global_skills/remotion-best-practices/SKILL.md`
   - Enthält 26 Rule-Dateien (3D, Audio, Animationen, etc.)
   - **Lade Rules NUR bei Bedarf** (z.B. `rules/audio.md` bei Audio-Task)

**WICHTIG:** Die `viron-core/` Dokumentation dupliziert den globalen Skill NICHT. Sie enthält nur Viron-spezifische Erweiterungen.

---

## PHASE 3: PROJEKT-WISSEN (Core & Vision)

**Der Router ist:** `viron-core/documentation_manifest.md`

1. **Lies:** `viron-core/documentation_manifest.md` (~10.7KB)
   - Index aller 9 Viron-Module + Scenario-Trigger.

2. **Lade Module NUR bei Bedarf:** (siehe manifest)

3. **The VISION (Deep Dive):**
   - Falls du **Strategie** oder **Architektur** machst, lies:
     `public/remotion.md` (30KB) -> **"The 2026 Ecosystem Report"**
     _(Hybrid Pipeline, Sora 2 Integration, Vision)_

---

## PHASE 4: KONTEXT-SPEZIFISCH (Optional)

Diese Ordner nur bei spezifischen Aufgaben laden:

| Ordner           | Inhalt                        | Wann laden                    |
| ---------------- | ----------------------------- | ----------------------------- |
| `/src/learnings` | Shader-Rezepte, Viron-Gesetze | Bei VFX/Shader-Arbeit         |
| `/specs`         | Audio, Camera, Website Specs  | Bei Feature-Specs             |
| `/guides`        | Compositions, Sequencing      | Bei Remotion-Patterns         |
| `/patterns`      | BarChart, Typewriter, etc.    | Bei UI-Patterns               |
| `/vault`         | Experiments, Benchmarks       | Nur auf explizite Anfrage     |
| `/docs`          | Manifesto, Human Guide        | Bei Repository-Architektur    |
| **`src/` Root**  | `V43_MASTER_PLAN.md`          | Bei "Silver Armada" Strategie |

---

## ⚠️ KRITISCHE REGELN

1. **KEIN rekursiver Scan** (`ls -R`, `find .`). Das überflutet dein Token-Fenster.

2. **Lade NUR was du JETZT brauchst.** Der Router (`documentation_manifest.md`) sagt dir, was relevant ist.

3. **Baseline vs. Projekt:**
   - Baseline = Globaler Skill (`remotion-best-practices`)
   - Projekt = `viron-core/` (nur Viron-spezifisches)

4. **Keine Duplikate:** Wenn etwas im globalen Skill steht, steht es NICHT nochmal in viron-core.

---

## 🎯 QUICK START

```
Schritt 1: Lies dieses Dokument (INIT_MISSION.md)
Schritt 2: Lies gemini.md (Global Skills Hub)
Schritt 3: Lies remotion-best-practices/SKILL.md (Index)
Schritt 4: Lies viron-core/documentation_manifest.md (Router)
Schritt 5: Du bist bereit für deinen Task!
```

---

_Protokoll Version 2.1 | 2026-01-29_
