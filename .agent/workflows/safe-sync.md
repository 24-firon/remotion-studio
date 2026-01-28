---
description: Sicherer Workflow zur Vermeidung von Race-Conditions zwischen IDE-Writes und Git-Commits.
---

# 🛡️ Viron Safe-Sync Protocol

Dieser Workflow MUSS befolgt werden, um Daten-Inkonsistenzen durch das "Immediate Write" Verhalten der IDE zu verhindern.

## 📋 Der "Double-Turn-Lock" Ablauf

Um menschliche Fehlbedienungen (z.B. versehentliches Klicken auf 'Accept' beim Commit, während man die Datei eigentlich ablehnen will) abzufangen, gilt folgendes Protokoll:

### 1. Phase: Der Write-Turn

- Agent führt Datei-Änderungen aus.
- Agent beendet den Turn (kein Git-Befehl!).
- **Sicherheit:** Der Nutzer prüft in Ruhe die UI-Fenster für die Dateien.

### 2. Phase: Der Verification-Turn (Zwangspause)

- Der Agent MUSS im nächsten Turn zuerst eine forensische Prüfung machen (`Get-Content` oder `view_file`), um zu bestätigen, dass der Nutzer die Datei **tatsächlich akzeptiert** hat.
- **Schutz bei Fehlklicks:** Hat der Nutzer die Datei abgelehnt (Reject), sieht der Agent dies hier sofort (Datei fehlt/alter Stand) und darf den Commit-Vorgang NICHT einleiten.

### 3. Phase: Der Commit-Turn

- Erst wenn Phase 2 (Wahrheit auf Disk) bestätigt ist, schickt der Agent in einem **neuen Turn** das `git commit`.

## 🛠️ Befehle

- Forensic: `Get-Content <file>`
- Audit: `git ls-files --deleted`

## 🚫 Goldene Regel

Sollte jemals ein "Ghost File" (Inkonsistenz zwischen Index und Disk) entdeckt werden: **STOPP.** Keine weiteren Git-Befehle, bis das Problem manuell oder durch gezielten `checkout` gelöst wurde.

// turbo-all
