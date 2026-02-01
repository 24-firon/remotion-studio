# Viron Studio Repo Migration Plan

**Ziel:** Migration von `remotion-studio` → `Viron Studio` (C:\Workspace\Repos\Viron Studio)
**Prinzip:** KOPIEREN (nicht verschieben) - Altes Repo bleibt unverändert
**Auswahl:** Nur relevante Dateien werden kopiert

---

## 📋 Entscheidungsmatrix

| Kategorie | Beispiele | Aktion | Ziel im neuen Repo |
|:----------|:----------|:-------|:-------------------|
| **🔴 Skills** | `remotion-core/SKILL.md`, `remotion-best-practices/` | ✅ KOPIEREN | `.agent/skills/` |
| **🟡 Viron-Core** | `viron-core/vision.md`, `physics.md` | ✅ KOPIEREN | `viron-core/` |
| **🟢 Recherche (wertvoll)** | Audio, FX, Cloud, Routing | ⚠️ FILTERN → Dann kopieren | `knowledge/research/` |
| **🔵 Templates** | `SUBAGENT_BRIEFING_TEMPLATE_V6.1.md` | ✅ KOPIEREN | `.agent/templates/` |
| **⚫ Archive** | `16_ARCHIVE_*`, alte Reports | ❌ NICHT kopieren | - |
| **🟠 Temp/Build** | `build/`, `node_modules/` | ❌ NICHT kopieren | - |
| **🟡 Source Code** | `src/` (experimente) | ⚠️ PRÜFEN | `src/` (gefiltert) |
| **🟢 Patterns** | `patterns/*.md` | ✅ KOPIEREN | `patterns/` |
| **🔵 Guides** | `guides/*.md` | ✅ KOPIEREN | `guides/` |

---

## 🗺️ Ziel-Struktur (Viron Studio)

```
C:\Workspace\Repos\Viron Studio
│
├── .agent/                          # Agent-Konfiguration
│   ├── skills/                      # 🔴 Skills (unverändert kopiert)
│   │   ├── remotion-core/
│   │   └── remotion-best-practices/
│   ├── templates/                   # 🟡 Briefing-Templates
│   │   ├── SUBAGENT_BRIEFING_TEMPLATE_V6.1.md
│   │   └── EXTRACTION_REPORT_TEMPLATE_V2_HYBRID.md
│   └── AGENTS.md                    # 🔵 Router
│
├── viron-core/                      # 🟡 System-Wissen
│   ├── vision.md
│   ├── pipeline.md
│   ├── workflow.md
│   ├── physics.md
│   └── theme.md
│
├── knowledge/                       # 📚 Gefiltertes Wissen
│   ├── 00-index/                    # 🔵 Übersichten
│   │   ├── overview.md
│   │   └── master-workflow.md
│   ├── 10-skills/                   # 🔴 Skill-Referenz (Symlinks?)
│   ├── 20-specs/                    # 🟡 Spezifikationen
│   ├── 30-guides/                   # 🟢 Anleitungen
│   ├── 40-research/                 # 🟢 Gefilterte Recherche
│   │   ├── audio/
│   │   ├── fx/
│   │   ├── cloud/
│   │   ├── 3d/
│   │   └── web/
│   ├── 50-patterns/                 # 🟢 Patterns
│   ├── 60-archive/                  # ⚫ Archiv (optional)
│   ├── 70-future/                   # 🔵 Zukunftspläne
│   ├── 80-reports/                  # 🔵 Reports (neu erstellt)
│   └── 90-prompts/                  # 🟠 Prompt-Templates
│
├── src/                             # 🟡 Source Code (gefiltert)
│   ├── components/                  # Nur finale Components
│   ├── experiments/                 # Nur wertvolle Experimente
│   └── patterns/                    # Implementierte Patterns
│
├── patterns/                        # 🟢 Pattern-Dokumentation
├── guides/                          # 🟢 Guides
├── specs/                           # 🟡 Spezifikationen
├── docs/                            # 🔵 Dokumentation
├── public/                          # 🟢 Assets (gefiltert)
└── [Config-Files]                   # package.json, tsconfig, etc.
```

---

## 📊 Was wird aus dem alten Repo übernommen?

### Definitiv KOPIEREN (🔴)

| Quelle | Ziel | Begründung |
|:-------|:-----|:-----------|
| `.agent/skills/` | `.agent/skills/` | Referenz-Wissen |
| `viron-core/` | `viron-core/` | System-Paradigma |
| `guides/` | `guides/` | Anleitungen |
| `patterns/` | `patterns/` | Wiederverwendbar |
| `specs/` | `specs/` | Spezifikationen |

### FILTERN → Dann KOPIEREN (🟡🟢)

| Quelle | Filter-Prozess | Ziel |
|:-------|:---------------|:-----|
| `Remotion Recherche/` | 🔴 Redundant weglassen, 🟡🟢 kopieren | `knowledge/40-research/` |
| `src/` | Nur finale Components/Patterns | `src/` |
| `.knowledge/mission/` | Nur finale Reports | `knowledge/80-reports/` |

### NICHT kopieren (❌)

| Quelle | Begründung |
|:-------|:-----------|
| `build/` | Generiert |
| `node_modules/` | Dependencies |
| `16-21_ARCHIVE_*` | Als Archiv markiert |
| Alte/veraltete Reports | Überholt |
| Temporäre Dateien | Nicht relevant |

---

## 🔄 Ablauf

### Phase 1: Analyse (aktuell)

Agenten erstellen Reports:
- `SKILL_BADGE_MAPPING_REPORT.md` → Zeigt was aus Vault/Core relevant ist
- `REPO_INFRASTRUCTURE_REPORT.md` → Zeigt Meta-Struktur

### Phase 2: Filter-Entscheidung (nach Analyse)

Anhand der Reports:
- 🔴 Was ist redundant? → Nicht kopieren
- 🟡🟢 Was ist neu/wertvoll? → Kopieren
- Liste: "Dateien für Viron Studio"

### Phase 3: Kopieren

```powershell
# Beispiel-Struktur erstellen
mkdir "C:\Workspace\Repos\Viron Studio"
cd "C:\Workspace\Repos\Viron Studio"

# Skills kopieren
xcopy /E /I "..\remotion-studio\.agent\skills" ".agent\skills"

# Viron-Core kopieren
xcopy /E /I "..\remotion-studio\viron-core" "viron-core"

# Gefilterte Recherche kopieren (nach Entscheidung)
# ...
```

### Phase 4: Neues Repo aufsetzen

- Git init
- README.md erstellen
- Neue Struktur dokumentieren

---

## 🤔 Offene Fragen

1. **Sollen die Agenten jetzt schon laufen?**
   - → Reports erstellen für Filter-Entscheidung
   
2. **Oder erst Ziel-Struktur finalisieren?**
   - → Dann Agenten mit Kopier-Mission starten

3. **Was passiert mit Badge Reports?**
   - → In `knowledge/80-reports/` kopieren?
   - → Oder neu erstellen im sauberen Repo?

4. **Soll ich jetzt...**
   - A) Agenten deployen (Reports erstellen)
   - B) Ziel-Struktur detailliert ausarbeiten
   - C) Erstes Kopier-Skript erstellen

---

**Empfehlung:**
1. Agenten laufen lassen (Filter-Reports)
2. Parallel Ziel-Struktur finalisieren
3. Dann systematisch kopieren
