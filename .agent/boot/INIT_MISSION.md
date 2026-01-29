# 🚀 VIRON INITIALIZATION PROTOCOL (v2.0)

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

## PHASE 3: PROJEKT-WISSEN (Pflicht)

**Der Router ist:** `viron-core/documentation_manifest.md`

1. **Lies:** `viron-core/documentation_manifest.md` (~10.7KB)
   - Enthält einen Index aller 9 Module
   - Enthält Scenario-Trigger ("Wenn Audio → lies 06-AUDIO...")
   - Verweist auf die anderen Dateien bei Bedarf

2. **Lade Module NUR bei Bedarf:**

| Modul         | Datei                         | Wann laden               |
| ------------- | ----------------------------- | ------------------------ |
| 3D/R3F Basics | `physics.md` (11.5KB)         | Bei 3D-Arbeit            |
| Rendering     | `pipeline.md` (12.9KB)        | Bei Rendering/Deployment |
| Design Tokens | `theme.md` (12.1KB)           | Bei Design-Arbeit        |
| Debugging     | `troubleshooting.md` (13.5KB) | Bei Fehlersuche          |
| Architektur   | `vision.md` (6KB)             | Bei Überblick            |
| Dev Workflow  | `workflow.md` (10.4KB)        | Bei Prozess-Fragen       |

---

## PHASE 4: KONTEXT-SPEZIFISCH (Optional)

Diese Ordner nur bei spezifischen Aufgaben laden:

| Ordner           | Inhalt                             | Wann laden                 |
| ---------------- | ---------------------------------- | -------------------------- |
| `/docs`          | Manifesto, Research, Human Guide   | Bei Repository-Architektur |
| `/src/learnings` | Shader-Rezepte, Hard-Won Knowledge | Bei VFX/Shader-Arbeit      |
| `/specs`         | Audio, Camera, Website Specs       | Bei Feature-Specs          |
| `/guides`        | Compositions, Sequencing           | Bei Remotion-Patterns      |
| `/patterns`      | BarChart, Typewriter, etc.         | Bei UI-Patterns            |
| `/vault`         | Experiments, Benchmarks            | Nur auf explizite Anfrage  |

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

## 📚 DATEIPFADE (Referenz)

```
~/.gemini/gemini.md                                      # Globale Regeln
~/.gemini/rules/agency.md                                # Verhaltensregeln
~/.gemini/antigravity/global_skills/remotion-best-practices/  # Global Skill
PROJECT_RULES.md                                         # Projekt-Governance
viron-core/documentation_manifest.md                     # DER ROUTER
viron-core/*.md                                          # Projekt-Dokumentation
```

---

_Protokoll Version 2.0 | 2026-01-29_
