# PROMPT: Fix Rule File Paths

## DEINE MISSION

Prüfe und korrigiere die 5 Rule-Dateien im `.agent/` Ordner. Diese Dateien enthalten falsche Pfade, die korrigiert werden müssen.

## ZU PRÜFENDE DATEIEN

1. `.agent/RULES_CORE.md`
2. `.agent/RULES_WORKFLOW.md`
3. `.agent/RULES_TECHNICAL.md`
4. `.agent/RULES_MIGRATION_GUIDE.md`
5. `.agent/AGENTS.md`

## WAS DU TUN SOLLST

### Schritt 1: Öffne jede Datei
### Schritt 2: Suche nach falschen Pfaden

Suche nach folgenden MUSTERN (RegEx):
- `rules/viron-core/` 
- `~/.gemini/`
- `viron-core/`

### Schritt 3: Ersetze durch korrekte Pfade

**FALSCHE Pfade → KORREKTE Pfade:**

| Falscher Pfad | Korrekter Pfad |
|--------------|----------------|
| `rules/viron-core/` | `.agent/skills/remotion-best-practices/rules/` |
| `rules/viron-core/SKILL.md` | `.agent/skills/remotion-best-practices/SKILL.md` |
| `~/.gemini/antigravity/global_skills/remotion-best-practices/rules/` | `.agent/skills/remotion-best-practices/rules/` |
| `~/.gemini/...` | `.agent/skills/remotion-best-practices/rules/` |

### Schritt 4: Dokumentiere Änderungen

Erstelle eine Tabelle mit:
- Datei
- Zeilennummer
- Alter Pfad
- Neuer Pfad

### Schritt 5: Speichere die korrigierten Dateien

## BEISPIEL

```markdown
## Korrekturen in RULES_CORE.md

| Zeile | Alter Pfad | Neuer Pfad |
|-------|-----------|------------|
| 45 | `rules/viron-core/animations.md` | `.agent/skills/remotion-best-practices/rules/animations.md` |
| 67 | `~/.gemini/antigravity/.../timing.md` | `.agent/skills/remotion-best-practices/rules/timing.md` |
```

## AUSGABE

1. Erstelle: `.agent/handover/RULE_PATH_CORRECTIONS_REPORT.md` mit:
   - Liste aller gefundenen falschen Pfade
   - Liste aller vorgenommenen Korrekturen
   - Status pro Datei (OK / KORRIGIERT / FEHLER)

2. Speichere die korrigierten 5 Dateien zurück nach `.agent/`

## WICHTIG

- Prüfe ALLE Verweise in jeder Datei
- Ersetze NUR Pfade, nicht den Inhalt
- Wenn ein Pfad unklar ist, notiere ihn im Report als "MANUELLE PRÜFUNG NÖTIG"
- Nutze `edit_file` oder `write_to_file` zum Speichern

## START

Beginne mit `.agent/RULES_CORE.md` und arbeite dich durch alle 5 Dateien.
