# AGENT_MIGRATION_ORDER.md
## Schritt-für-Schritt Migrationsanleitung für IDE-Agent

**Status:** EXECUTION ORDER | MARSCHBEFEHL  
**Erstellt:** 2026-01-29  
**Für:** IDE-Agent Folder-Reorganization  
**Kategorie:** System Setup | Automation | DevOps  

---

## 🎯 Mission

Diese Datei ist der **konkrete Marschbefehl** für den IDE-Agenten, um dein Viron-System zu reorganisieren.

**Input:** Dein bestehendes Skill-Verzeichnis (chaotisch, ~30 alte Dateien, 7 neue).  
**Output:** Sauberes System mit 7 Departments, klare Access-Control, keine Duplikate.

---

## 🔴 KRITISCH: Sicherheitsregeln

Bevor der Agent anfängt, müssen diese Regeln eingebettet sein:

### Rule 1: "ONLY MOVE, NEVER DELETE"
- Der Agent **darf keine Datei löschen**.
- Wenn eine Datei "redundant" aussieht, verschiebe sie nach `_conflicts/` statt zu löschen.
- Am Ende: Review die `_conflicts/` Ordner manuel.

### Rule 2: "Hash-Kontrolle (Verify Integrity)"
- Vor dem Verschieben: SHA256 der Datei berechnen + speichern.
- Nach dem Verschieben: SHA256 neu berechnen + vergleichen.
- Wenn Hash nicht matched: ABORT, error reporten (Datei beschädigt?).

### Rule 3: "Dokumentiere ALLES"
- Jede Aktion im `_migration_log_<date>.md` schreiben.
- Format: `[MOVE] physics.md → knowledge/engine/core/physics.md [OK]`
- Am Ende: User sieht exakt, was passiert ist.

### Rule 4: "Bei Unklarheit: Backup & Ask"
- Wenn der Agent nicht sicher ist (z.B. "gehört diese Datei in Video oder Audio?"), darf der Agent NICHT raten.
- Stattdessen: In `_unsorted/` verschieben + Frage im Log notieren.
- User reviewed später, gibt Anweisung.

---

## 📋 Phase 1: Scan & Verify (Vorbereitung)

### Schritt 1.1: Listet alle Dateien auf
```bash
find . -type f \( -name "*.md" -o -name "*.txt" -o -name "*.pdf" \) | sort > _files_before_migration.txt
```

**Output:** `_files_before_migration.txt` mit absoluter Liste.

### Schritt 1.2: Vergleiche mit File-Mapping (Datei 22)
```python
EXPECTED_MAPPING = {
    'physics.md': 'knowledge/engine/core/',
    'theme.md': 'knowledge/engine/core/',
    ...  # Aus Datei 22, Sektion 5
}

found_files = read_file_list('_files_before_migration.txt')
unmapped = set(found_files) - set(EXPECTED_MAPPING.keys())

if unmapped:
    print(f"⚠️ {len(unmapped)} Dateien nicht gemappt: {unmapped}")
    # → Verschiebe nach _unsorted/
```

### Schritt 1.3: Hash alle Dateien
```bash
cd skill/
find . -type f \( -name "*.md" -o -name "*.txt" -o -name "*.pdf" \) -exec sha256sum {} \; > ../_hashes_before.txt
```

**Output:** `_hashes_before.txt` (Integrity-Checkpoint).

---

## 🟡 Phase 2: Create Directory Structure

### Schritt 2.1: Erstelle 7 Departments + Canon
```bash
mkdir -p knowledge/engine/{core,visuals,3d}
mkdir -p knowledge/video/{remotion-core,captions,sequencing}
mkdir -p knowledge/render/{pipeline,troubleshooting,deployment}
mkdir -p knowledge/audio/{specs,processing,reactive}
mkdir -p knowledge/ops/{workflow,recovery,research}
mkdir -p knowledge/web/{specs,extraction,resources}
mkdir -p knowledge/automation/{data-driven,utilities,market}
mkdir -p _canon/{entry,docs,workflows,infrastructure}
mkdir -p _archive/
mkdir -p _unsorted/
mkdir -p _conflicts/
```

### Schritt 2.2: Erstelle .gitignore pro Department
```bash
# knowledge/engine/.gitignore
*
!.gitignore
!*.md

# knowledge/audio/.gitignore
*
!.gitignore
!*.md
```

**Grund:** Verhindert accidentale Cross-Reads zwischen Departments.

### Schritt 2.3: Erstelle _DEPARTMENT_README.md für jeden
```markdown
# DEPT_ENGINE

**Verantwortung:** Visuelle Weltregeln, 3D, Theme, Tokens.

**Access-Control:**
- ✅ Darf lesen: VIDEO, RENDER, AUDIO, OPS
- ❌ Darf NICHT lesen: WEB (nur Tokens export)

**Dateien:**
- physics.md
- theme.md
- PATTERN_Advanced_Shaders.md
- ...

**Einstieg:** Lese zuerst `VIRON_SYSTEM_ENTRY.md` (aus _canon/).
```

---

## 🟠 Phase 3: Migrate Files (Der Kernjob)

### Schritt 3.1: Canon Packs zuerst
```python
CANON_MAPPINGS = {
    'VIRON_SYSTEM_ENTRY.md': '_canon/entry/',
    'documentation_manifest.md': '_canon/docs/',
    'Remotion-Setup.md.txt': '_canon/workflows/',
    'High-End Visuelle Effekte für Remotion.pdf': '_canon/infrastructure/',
}

for source, target in CANON_MAPPINGS.items():
    if os.path.exists(source):
        hash_before = calculate_sha256(source)
        shutil.move(source, target + source)
        hash_after = calculate_sha256(target + source)
        
        if hash_before != hash_after:
            print(f"❌ ABORT: Hash mismatch for {source}")
            return
        
        log(f"[CANON] {source} → {target} [OK]")
    else:
        log(f"[WARN] Canon pack {source} nicht gefunden")
```

### Schritt 3.2: Department Files (nach Datei 22 Mapping)
```python
DEPT_MAPPINGS = {
    'physics.md': 'knowledge/engine/core/',
    'theme.md': 'knowledge/engine/core/',
    'PATTERN_Advanced_Shaders.md': 'knowledge/engine/core/',
    # ... (alle Einträge aus Datei 22)
}

for source, target in DEPT_MAPPINGS.items():
    if os.path.exists(source):
        hash_before = calculate_sha256(source)
        shutil.move(source, os.path.join(target, source))
        hash_after = calculate_sha256(os.path.join(target, source))
        
        if hash_before != hash_after:
            print(f"❌ ABORT: Hash mismatch for {source}")
            return
        
        log(f"[MOVE] {source} → {target} [OK]")
    else:
        log(f"[SKIP] Datei nicht gefunden: {source}")
```

### Schritt 3.3: Dual-Zuordnungen (Spezialfälle)
Dateien, die zu mehreren Departments gehören (z.B. `troubleshooting.md` → RENDER + OPS):

```python
DUAL_MAPPINGS = {
    'troubleshooting.md': [
        'knowledge/render/troubleshooting/',
        'knowledge/ops/recovery/',  # symlink or copy?
    ],
    'documentation_manifest.md': [
        'knowledge/video/remotion-core/',
        '_canon/docs/',  # canonical source
    ],
}

for source, targets in DUAL_MAPPINGS.items():
    canonical = targets[0]  # first is source-of-truth
    copies = targets[1:]
    
    # Move to canonical
    shutil.move(source, os.path.join(canonical, source))
    log(f"[CANONICAL] {source} → {canonical} [OK]")
    
    # Create symlinks to copies
    for target in copies:
        symlink_path = os.path.join(target, source)
        os.symlink(os.path.join(canonical, source), symlink_path)
        log(f"[SYMLINK] {source} ⟷ {symlink_path} [OK]")
```

### Schritt 3.4: Unmapped Files → _unsorted/
```python
found_files = set(os.listdir('.'))
mapped_files = set(DEPT_MAPPINGS.keys()) | set(CANON_MAPPINGS.keys())
unmapped = found_files - mapped_files

for file in unmapped:
    if file.endswith(('.md', '.txt', '.pdf')):
        shutil.move(file, f'_unsorted/{file}')
        log(f"[UNSORTED] {file} → _unsorted/ [NEEDS REVIEW]")
```

---

## 🟢 Phase 4: Validate & Reconcile

### Schritt 4.1: Verify Hash nach Migration
```bash
cd skill/
find . -type f \( -name "*.md" -o -name "*.txt" -o -name "*.pdf" \) -exec sha256sum {} \; > ../_hashes_after.txt

# Vergleiche
diff _hashes_before.txt _hashes_after.txt
```

**Erwartung:** Identische Hashes, nur Pfade haben sich geändert.

### Schritt 4.2: Prüfe auf Duplikate
```python
def find_duplicates(root_dir):
    """Findet identische Dateien (Content-Duplikate)."""
    hashes = {}
    duplicates = []
    
    for dirpath, dirnames, filenames in os.walk(root_dir):
        for filename in filenames:
            filepath = os.path.join(dirpath, filename)
            file_hash = calculate_sha256(filepath)
            
            if file_hash in hashes:
                duplicates.append((filepath, hashes[file_hash]))
            else:
                hashes[file_hash] = filepath
    
    return duplicates

dups = find_duplicates('knowledge/')
for dup1, dup2 in dups:
    print(f"⚠️ DUPLICATE: {dup1} == {dup2}")
    # → Verschiebe eine nach _conflicts/
```

### Schritt 4.3: File Count Validation
```python
count_before = len(found_files)  # aus Phase 1
count_after = sum(
    len(f) for _, _, f in os.walk('knowledge/')
) + sum(
    len(f) for _, _, f in os.walk('_canon/')
) + sum(
    len(f) for _, _, f in os.walk('_unsorted/')
) + sum(
    len(f) for _, _, f in os.walk('_conflicts/')
)

if count_before != count_after:
    print(f"❌ File count mismatch: {count_before} → {count_after}")
    print("   Some files may have been lost!")
else:
    print(f"✅ All {count_before} files accounted for")
```

### Schritt 4.4: Access-Control Verification
```python
def verify_access_control():
    """Prüft, dass .gitignore korrekt sind."""
    
    for dept in ['engine', 'video', 'render', 'audio', 'ops', 'web', 'automation']:
        gitignore = f'knowledge/{dept}/.gitignore'
        if not os.path.exists(gitignore):
            print(f"❌ {gitignore} fehlt!")
        else:
            print(f"✅ {gitignore} vorhanden")
```

---

## 🔵 Phase 5: Generate Migration Report

### Schritt 5.1: Erstelle Migration Log
```markdown
# Migration Report
**Date:** 2026-01-29  
**Status:** ✅ SUCCESS

## Summary
- Files processed: 42
- Files moved: 38
- Files symlinked: 2
- Files unsorted (needs review): 2
- Conflicts/duplicates: 0

## Changes
[MOVE] physics.md → knowledge/engine/core/physics.md [OK]
[MOVE] theme.md → knowledge/engine/core/theme.md [OK]
[CANON] VIRON_SYSTEM_ENTRY.md → _canon/entry/VIRON_SYSTEM_ENTRY.md [OK]
[SYMLINK] documentation_manifest.md ⟷ knowledge/video/remotion-core/ [OK]
[UNSORTED] market-references.md → _unsorted/market-references.md [NEEDS REVIEW]

## File Count Verification
- Before: 42 files
- After: 42 files
- Status: ✅ OK

## Access Control Status
- knowledge/engine/.gitignore: ✅ Present
- knowledge/video/.gitignore: ✅ Present
- knowledge/render/.gitignore: ✅ Present
- knowledge/audio/.gitignore: ✅ Present
- knowledge/ops/.gitignore: ✅ Present
- knowledge/web/.gitignore: ✅ Present
- knowledge/automation/.gitignore: ✅ Present

## Manual Review Needed
1. _unsorted/market-references.md → Which department?
2. _conflicts/documentation_manifest.md (duplicate found)

## Next Steps
1. Review _unsorted/ files + decide placement
2. Resolve conflicts (keep canonical, delete copies)
3. Run `git add -A && git commit -m "System reorganization"`
```

---

## 🟣 Phase 6: Cleanup & Final Steps

### Schritt 6.1: Remove Backups
```bash
rm _files_before_migration.txt
rm _hashes_before.txt
rm _hashes_after.txt
```

### Schritt 6.2: Git Commit
```bash
git add -A
git commit -m "🔧 System reorganization: 7 Departments + Canon Packs

- Moved 38 files to departments (Engine/Video/Render/Audio/Ops/Web/Automation)
- Established Canon Pack (_canon/) for master references
- Created .gitignore per department (access control)
- Verified file integrity (all hashes matched)
- Generated migration report

See: _migration_log_2026-01-29.md for details
Unsorted: 2 files need manual review (_unsorted/)
Conflicts: 0 (all clean)"
```

### Schritt 6.3: Create System Entry Point
```markdown
# VIRON_SYSTEM (Reorganized)

**Entry Point:** `_canon/entry/VIRON_SYSTEM_ENTRY.md`

This system is organized into **7 Departments** + **Canon Packs**.

## Quick Navigation

- **Need Visuals/3D?** → `knowledge/engine/`
- **Need Remotion Code?** → `knowledge/video/`
- **Need Render/Output?** → `knowledge/render/`
- **Need Audio?** → `knowledge/audio/`
- **Need Workflow Help?** → `knowledge/ops/`
- **Need Web/Extraction?** → `knowledge/web/`
- **Need Automation/APIs?** → `knowledge/automation/` (optional load)

## Master Reference

- `_canon/entry/VIRON_SYSTEM_ENTRY.md` (Immutable Physics, Tech Stack)
- `_canon/docs/documentation_manifest.md` (9 Modules, Index)
- `_canon/workflows/Remotion-Setup.md.txt` (Workflow 1 & 2)

See: `_migration_log_<date>.md` for details.
```

---

## ✅ Erfolgs-Kriterien

Der Agent ist fertig, wenn:

- [ ] Alle Dateien sind in Departments oder Canon verschoben.
- [ ] Keine Datei wurde gelöscht (nur _unsorted/ für Unklares).
- [ ] Hash-Verifikation bestanden (alle Dateien intakt).
- [ ] .gitignore pro Department vorhanden.
- [ ] Migration Log vollständig.
- [ ] File Count stimmt.
- [ ] 0 unerwartete Konflikte.

Wenn EINE dieser Kriterien nicht erfüllt ist: **ABORT & REPORT PROBLEM**.

---

## ❌ Emergency Rollback

Falls etwas schief geht:

```bash
# Restore from backup
git reset --hard HEAD~1

# Or if no backup:
# Manually restore from _archive/ (falls du backup gemacht hast)
```

---

**END OF DATEI 25**

Status: ✅ ALL 25 FILES COMPLETE & READY FOR DOWNLOAD

---

## 🎉 SYSTEM COMPLETE

Du hast jetzt **25 Dateien**, die das komplette Viron-System definieren:

### Dateien 15-21: "The Knowledge"
- 15: Migration Core (alte Uploads katalogisiert)
- 16-21: Jack Roberts Standards (Audio, Edit, Captions, Web, Data, Agent)

### Dateien 22-25: "The Wiring" (Logistics)
- 22: Folder Structure (7 Departments + Canon)
- 23: Input Routing (Welche Inputs → welche Departments)
- 24: Output Routing (Welche Outputs → welche Specs)
- 25: Migration Order (Step-by-Step für IDE-Agent)

**Der IDE-Agent kann jetzt automatisiert das System aufbauen.**
