# ARCHIV-POLICY v1.0 (29. Jan 2026)

## Die Regel: Was wird archiviert, was nicht?

Damit du nicht blind Dateien löschst, haben wir Kategorien für dein Archiv.

---

## 📂 Archiv-Ordnerstruktur

```
./_archive/
├── redundant/
│   ├── 10-remotion-basics-01.md (100% in remotion-dev/skills)
│   └── README.md (Warum ist das hier? Was ist die Alternative?)
├── deprecated/
│   ├── 00-overview-index-v1-0.md (alte Version)
│   └── README.md (Timeline: wann wurde das deprecated?)
├── future/
│   ├── ZUKUNFTSPLAN-*.md (Für später, aber wichtig)
│   └── README.md (Wann wird das relevant?)
└── ARCHIVE-INDEX.md (Vollständiger Index mit Metadaten)
```

---

## 🏷️ Kategorien (Wann archiviert man was?)

### Kategorie 1: REDUNDANT (100% in Skills vorhanden)

**Definition:** Exakter Inhalt existiert in einem der Big 4 Skills.

**Beispiel:**
```
Local: 10-remotion-basics-01.md
       "Timeline API, useCurrentFrame hook..."
       
Skill: remotion-dev/skills/rules/sequencing.md
       "Timeline API, useCurrentFrame hook..."
       
→ 100% Match → ARCHIVE to: ./_archive/redundant/
```

**Labeling (in der Datei):**
```markdown
# 10-remotion-basics-01.md

⚠️ ARCHIVED (29. Jan 2026)
**See instead:** `remotion-dev/skills/rules/sequencing.md`
**Reason:** 100% match. No local delta needed.
**Can be deleted after:** 31. Dec 2026 (6-month archive window)

---
[Original content below, read-only]
```

### Kategorie 2: DEPRECATED (Alte Version eines aktiven Dokuments)

**Definition:** Neuere Version existiert bereits.

**Beispiel:**
```
Old: 00-overview-index-v1-0.md
New: 00-overview-index-v2-1-complete.md

→ Old version is DEPRECATED → ARCHIVE
```

**Labeling:**
```markdown
# 00-overview-index-v1-0.md

⚠️ DEPRECATED (Updated 29. Jan 2026)
**Use instead:** `00-overview-index-v2-1-complete.md`
**Reason:** Newer version with more content, better structure.
**Archived on:** 29. Jan 2026

---
[Original content, read-only]
```

### Kategorie 3: FUTURE (Relevant später, aber nicht jetzt)

**Definition:** Plan/Dokumentation für zukünftige Phase.

**Beispiel:**
```
ZUKUNFTSPLAN-APP-SHELL-NEXT-JS-v1.md
→ Braucht man in Phase B (Feb 2026)
→ Jetzt (Phase A) nicht nötig
→ Aber aufbewahren als Referenz

ARCHIVE: ./_archive/future/
Label: "Phase B — Activate: Feb 2026"
```

**Labeling:**
```markdown
# ZUKUNFTSPLAN-APP-SHELL-NEXT-JS-v1.md

📋 FUTURE PLAN (Activate: Feb 2026)
**Status:** Planning phase. Not in use until Feb 2026.
**Activation:** When you start Phase B (Next.js App Shell)
**Archive location:** ./_archive/future/

---
[Plan content]
```

---

## 📝 Metadaten-Template (Für jede Archiv-Datei)

**Datei:** `./_archive/ARCHIVE-METADATA.jsonl`

```jsonl
{
  "filename": "10-remotion-basics-01.md",
  "archive_date": "2026-01-29",
  "category": "redundant",
  "reason": "100% match with remotion-dev/skills/rules/sequencing.md",
  "alternative": "remotion-dev/skills/rules/sequencing.md",
  "can_delete_after": "2026-12-31",
  "status": "read-only"
}

{
  "filename": "00-overview-index-v1-0.md",
  "archive_date": "2026-01-29",
  "category": "deprecated",
  "reason": "Replaced by v2-1-complete",
  "alternative": "00-overview-index-v2-1-complete.md",
  "can_delete_after": "2026-06-29",
  "status": "read-only"
}

{
  "filename": "ZUKUNFTSPLAN-APP-SHELL-NEXT-JS-v1.md",
  "archive_date": "2026-01-29",
  "category": "future",
  "reason": "Not needed until Phase B",
  "activate_on": "2026-02-01",
  "status": "reference"
}
```

---

## 🗑️ Wann WIRKLICH löschen?

**Schritt 1: Archiv** (Tag 1)
```bash
mv 10-remotion-basics-01.md ./_archive/redundant/
# Datei lebt, aber ist "verstaut"
```

**Schritt 2: Nach 6 Monaten prüfen** (Day 181)
```bash
# Checklist:
# - Habe ich diese Datei vermisst? Nein → OK zu löschen
# - Ist das Skill noch up-to-date? Ja → OK zu löschen
# - Könnte ich sie trotzdem brauchen? Nein → OK zu löschen

# Falls JA zu einer Frage: Move back from archive
mv ./_archive/redundant/10-remotion-basics-01.md ./
```

**Schritt 3: Nach 1 Jahr archivieren** (Day 365)
```bash
# Sichere das Archiv in git
git add ./_archive/
git commit -m "Archive cleanup (365 days retention)"

# Optional: Backup to S3
aws s3 cp ./_archive/ s3://viron-backups/archive-2026-01-29/ --recursive

# DANN: delete
rm ./_archive/redundant/10-remotion-basics-01.md
```

---

## ✅ Archiv-Regeln (Golden Rules)

1. **Niemals direkt löschen.** Immer erst archivieren.
2. **Immer labeln.** Jede Archiv-Datei muss sagen: warum ist sie hier?
3. **Metadaten führen.** ARCHIVE-METADATA.jsonl ist die Quelle der Wahrheit.
4. **6-Monat-Fenster.** Redundante Dateien nach 6 Monaten aufräumen.
5. **Git-Historie.** Gelöschte Dateien sind noch in git log sichtbar.
6. **Vierteljährliche Auditl.** Ende März/Juni/Sept/Dez: Archiv überprüfen.

---

**Version:** v1.0 (29. Jan 2026)