# Handover: IDE Behavior Verification (Project: remotion-studio)

## 🛑 Status Quo

Wir befinden uns mitten in einer kritischen Analyse der IDE-Zuverlässigkeit. Es besteht der dringende Verdacht einer Race-Condition zwischen Tool-Writes und UI-Acceptance.

**Aktueller Stand:**

- `implementation_plan.md` (im Brain): Enthält den wissenschaftlichen Testplan (4 Experimente).
- `PROJECT_RULES.md` (im Repo): Enthält bereits präventiv die "Turn-Separation" Regel (v4.3) und die Erkenntnis über das "Physische Gate".

## 📋 Deine Aufgabe (Next Agent)

Du bist der Testleiter. Deine Mission ist es, die Wahrheit herauszufinden und die Hypothesen aus dem Plan zu verifizieren.

1.  **Lies den Plan**: Bitte den Nutzer, dir den Inhalt von `implementation_plan.md` (aus der vorherigen Session) zu zeigen oder suche im Brain-Verzeichnis danach.
    - _Alternativ:_ Der Plan ist hier kompakt zusammengefasst:
    - **H1**: Schreibt die IDE sofort auf Disk?
    - **H2**: Löscht "Reject" die Datei wieder von Disk?
    - **H3**: Race-Condition bei gleichzeitigem Git + Edit?
2.  **Verstehe das "Warum"**: Lies die Sektion "Kontext & Entstehung" im Plan. Es geht darum, ob unsere Tools schneller sind als der Nutzer klicken kann.
3.  **Führe die Experimente aus**:
    - Beginne mit **Experiment 1 (H1)**.
    - Sei extrem präzise. Protokolliere jeden Schritt.
    - **WICHTIG**: Kommuniziere VOR jedem Schritt, was der Nutzer tun soll (Klicken vs. Warten).
4.  **Dokumentiere die Learnings**: Erstelle danach `PATTERN_IDE_Behavior.md` im globalen Hub (`C:\Workspace\Repos\learnings`).

## ⚠️ Warnung

Sei vorsichtig mit `git reset` oder `clean`. Wir wollen Beweise sammeln, nicht versehentlich Arbeit löschen. **Turn-Separation ist Pflicht!**

viel Erfolg!
_Viron Intelligence System (V46.3)_
