# 🚀 SUB-AGENT AKTIVIERUNGS-PROMPT TEMPLATE

**Purpose:** Standard-Prompt für alle Sub-Agent Aktivierungen.
**Location:** `.knowledge/mission/SUBAGENT_ACTIVATION_PROMPT_TEMPLATE.md`
**Usage:** Ersetze `[PLACEHOLDER]`-Felder und kopiere den Prompt-Block.

---

## Der Prompt

```text
**⚠️ SYSTEM-AKTIVIERUNG: BADGE [N] ([BADGE_THEMA])**

**DEINE MISSION:**
Du bist der Extraction-Agent für Viron. Dein Ziel ist [MISSIONS_ZIEL].

**COMMAND FILE (DEEP READ PFLICHT):**
Lies: C:\Workspace\Repos\remotion-studio\.knowledge\mission\SUBAGENT_BRIEFING_BADGE_[N].md

**OUTPUT:**
Erstelle `EXTRACTION_REPORT_BADGE_[N].md` basierend auf dem Format in Sektion 4.

**KRITISCHE REFERENZEN (IM BRIEFING BEACHTEN):**
- **Sektion 2.1:** GATEKEEPER-Checkliste (Pflicht!)
- **Sektion 3.3:** Orchestrator-Hinweise
- **Sektion [X]:** [BADGE-SPEZIFISCHE REGEL 1]
- **Sektion [Y]:** [BADGE-SPEZIFISCHE REGEL 2]

**START:**
Lies das Briefing vollständig. Melde dich mit einer Zusammenfassung der Regeln aus den kritischen Referenzen, bevor du startest.
```

---

## Platzhalter-Erklärung

| Platzhalter                 | Ersetzen durch                        | Beispiel                                              |
| --------------------------- | ------------------------------------- | ----------------------------------------------------- |
| `[N]`                       | Badge-Nummer                          | `4`                                                   |
| `[BADGE_THEMA]`             | Badge-Titel                           | `DESIGN SYSTEM & UI`                                  |
| `[MISSIONS_ZIEL]`           | Kurze Beschreibung des Audit-Ziels    | `der Audit des Design Systems und der UI-Komponenten` |
| `[X]`, `[Y]`                | Badge-spezifische kritische Sektionen | `3.3`, `D`                                            |
| `[BADGE-SPEZIFISCHE REGEL]` | Wichtigste Regeln dieses Badges       | `Das CSS-Verbot (Keine Tailwind Transitions!)`        |

---

## Beispiel Badge 4

```text
**⚠️ SYSTEM-AKTIVIERUNG: BADGE 4 (DESIGN SYSTEM & UI)**

**DEINE MISSION:**
Du bist der Extraction-Agent für Viron. Dein Ziel ist der Audit des Design Systems, der UI-Komponenten und Typografie-Standards.

**COMMAND FILE (DEEP READ PFLICHT):**
Lies: C:\Workspace\Repos\remotion-studio\.knowledge\mission\SUBAGENT_BRIEFING_BADGE_4.md

**OUTPUT:**
Erstelle `EXTRACTION_REPORT_BADGE_4.md` basierend auf dem Format in Sektion 4.

**KRITISCHE REFERENZEN (IM BRIEFING BEACHTEN):**
- **Sektion 2.1:** GATEKEEPER-Checkliste (Pflicht!)
- **Sektion 3.3 A:** Metallic Palette (theme.md)
- **Sektion 3.3 B:** Eye Candy Stack (MeshTransmissionMaterial, Caustics)
- **Sektion 3.3 D:** VERBOTE (Keine Tailwind Transitions, Keine Third-Party-Animationen)

**START:**
Lies das Briefing vollständig. Melde dich mit einer Zusammenfassung der Regeln aus Sektion 3.3 D (VERBOTE), bevor du startest.
```

---

_Template basierend auf Badge 3 Prompt | 2026-01-31_
