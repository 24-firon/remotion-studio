# 📋 PLAN: Weitere Schritte für Subagent-Entwicklung

**Stand:** 2026-02-01  
**Ziel:** Klare Roadmap für den "Linked Index Router" Subagent

---

## ✅ AKTUELL ABGELGT

| Dokument | Status | Zweck |
|----------|--------|-------|
| [SUBAGENT_PROMPT_CREATE_LINKED_INDEX.md](SUBAGENT_PROMPT_CREATE_LINKED_INDEX.md) | ✅ V1.0 | Baseline: Nur Link-Transformation |
| [PLAN_SUBAGENT_PROMPT_EVOLUTION.md](PLAN_SUBAGENT_PROMPT_EVOLUTION.md) | ✅ Plan | Entwicklungsoptionen A/B/C |
| [SUBAGENT_PROMPT_CREATE_LINKED_INDEX_V2.md](SUBAGENT_PROMPT_CREATE_LINKED_INDEX_V2.md) | ✅ V2.0 | Priorisierte Version (Option B) |
| [RULE_FILE_LINKING.md](../rules/RULE_FILE_LINKING.md) | ✅ Regel | Hyperlink-Standard für alle |

---

## 🎯 OPTIONALE NÄCHSTE SCHRITTE

### Schritt 1: Prompt Review (Optional)
**Wer:** Du (User)  
**Was:** Review von V2.0 - passt die Klassifikationslogik?  
**Output:** Go/No-Go für Subagent

### Schritt 2: Subagent Start (Auf dein Kommando)
**Wer:** Subagent mit Prompt V2.0  
**Input:** [source-master-index.md](../../.knowledge/source-master-index.md)  
**Output:** `source-master-index-ROUTER.md` mit 🔴🟡🟢⚫

### Schritt 3: Ergebnis Review (Nach Subagent)
**Wer:** Du (User)  
**Was:** Prüfung der automatischen Klassifikation  
**Entscheidung:** OK / Nachbesserung nötig

### Schritt 4: Integration (Falls OK)
- Router als Standard-Navigation etablieren
- Alten Index archivieren oder ersetzen

---

## ⏸️ AKTION NOTWENDIG

**Der Subagent wartet auf dein explizites Go.**

Mögliche nächste Aktionen:
1. **"Starte Subagent jetzt"** → V2.0 Prompt wird verwendet
2. **"Review Prompt zuerst"** → Du liest V2.0 und gibst Feedback
3. **"Abbruch"** → Plan bleibt liegen, wir machen etwas anderes

---

## 📝 WICHTIGE REGEL (aus Fehler gelernt)

> **Keine Aktion ohne explizite Zustimmung.**  
> Prompts werden nur abgelegt.  
> Subagenten werden nur auf direktes Kommando gestartet.
