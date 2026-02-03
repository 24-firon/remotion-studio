
### 1. DAS TEMPLATE (V8.0 GOD MODE)

Speichere dies als `.agent/handover/SUBAGENT_BRIEFING_TEMPLATE_V8.0.md`.

***

# 🧬 SUB-AGENT BRIEFING TEMPLATE: V8.0 (GOD MODE)

**Version:** 8.0 (The Codex Standard)
**Status:** MANDATORY
**Philosophy:** "Ingest to Replace." (Einverleiben, um zu ersetzen.)

> **WARNUNG AN DEN AGENTEN:**
> Du schreibst keinen Bericht. Du schreibst ein **Betriebssystem (Codex)**.
> Wenn du Code abkürzt (`// ... rest of code`), hast du versagt.
> Wenn du auf eine Datei verweist, die ich löschen will, hast du versagt.
> **Dein Output muss die Quelldateien physisch ersetzen.**

---

## 📊 EXECUTIVE BRIEFING

| Dimension | Anforderung | Minimum |
|:----------|:------------|:--------|
| **Vollständigkeit** | Code muss copy-paste-fertig sein. | 100% |
| **Tiefe** | Jedes Finding muss den Kontext ("Warum?") enthalten. | > 500 Zeichen/Finding |
| **Redundanz-Check** | Abgleich mit `remotion-core/SKILL.md`. | 0% Redundanz |
| **Löschbarkeit** | Kann die Quelldatei danach gelöscht werden? | MUSS "Ja" sein |

---

## 1. 🏛️ SYSTEM ARCHITECTURE & LAWS

*Extrahiere die harten Regeln und Systeme. Keine Prosa, sondern Gesetze.*

### THE [SYSTEM_NAME]
**Typ:** [HARD CONSTRAINT / LOGIC / ARCHITECTURE]
**Quelle:** `[Dateipfad]`

#### 🧠 The Logic (Das "Warum")
*(Mindestens 300 Zeichen)*
[Erkläre detailliert, warum dieses System existiert. Welches Problem löst es?]

#### ⚖️ The Rules (Die Gesetze)
*(Harte Fakten)*
1.  **Regel:** [Text]
2.  **Limit:** [Zahl/Wert]

#### 💻 Executable Assets (Der Code)
*(Kritisch: Vollständiger Code. Keine `...`)*
```[language]
[Füge hier den GANZEN Code-Block aus der Quelle ein. Jede Zeile, jeder Import.]
```

---

## 2. 🧠 ORCHESTRATION ENGINE (Logic)

*Wie entscheidet das System?*

### THE [MATRIX_NAME]
**Typ:** [ROUTING / DECISION TREE]

#### 🔑 The Table
| Input | Bedingung | Output |
|:------|:----------|:-------|
| ...   | ...       | ...    |

---

## 3. 🛠️ OPERATIONAL TOOLS (How-To)

*Wie wendet man das Wissen an?*

### WORKFLOW: [Name]
**Typ:** [PROCESS]

1.  **Trigger:** [Wann startet das?]
2.  **Input:** [Was brauchen wir?]
3.  **Process:** [Schritt-für-Schritt]
4.  **Output:** [Ergebnis]

#### 🔧 Scripts & Prompts
```[language]
[Skripte, CLI-Befehle oder Prompts, die für diesen Workflow nötig sind.]
```

---

## 4. 🕸️ CROSS-BADGE SYNERGY

*Wie verbindet sich dieses Wissen mit anderen Badges?*

### DEPENDENCY MATRIX
| Dieses Element | Hängt ab von (Badge X) | Beeinflusst (Badge Y) | Technische Schnittstelle |
|:---------------|:-----------------------|:----------------------|:-------------------------|
| [Name]         | [Komponente/Regel]     | [Prozess/Datei]       | [z.B. JSON Schema]       |

---

## 5. 🛡️ CONTENT MIGRATION AUDIT (Die Lösch-Erlaubnis)

*Beweise, dass wir die Originale löschen dürfen.*

| Original-Datei | Inhalt | Status im Codex | Vollständigkeit |
|:---------------|:-------|:----------------|:----------------|
| `file.md`      | Concurrency Formel | ✅ Sektion 1.2 | 100% (Code included) |
| `file.md`      | Intro Text | 🗑️ Redundant | - |