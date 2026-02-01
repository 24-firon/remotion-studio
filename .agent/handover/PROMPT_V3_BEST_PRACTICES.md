# 🎯 PROMPT: V3 Best Practices für Extraction Reports

**Verwendung:** Dieser Prompt beschreibt das Format, das V3 (anderer Agent) erfolgreich verwendet hat.

---

## Anweisung für Agenten

Erstelle einen Forensic Extraction Report mit:

### 1. Statistik-Tabelle oben
| Metrik | Ergebnis | Delta zu V1 |
|:-------|:---------|:------------|
| Extrahierte Bausteine | 12 | +8 |
| Forensic Accuracy | High | - |

**Warum:** Sofortiger Wertnachweis, keine Suche nötig.

---

### 2. "THE [SYSTEM_NAME]" Sektionen
**Statt:** "1. Concurrency Formula"  
**Nutze:** "THE CONCURRENCY FORMULA"

**Statt:** "9. The 7 Departments"  
**Nutze:** "THE SYSTEM MAP"

**Warum:** Memorable, scanbar, gibt mentale Landkarte.

---

### 3. "Kontext (V1)" als Sidebar-Label
```markdown
**Quelle:** `file.md` (Zeilen X-Y)  
**Kontext (V1):** [Hier die erklärende Intuition]  
**Code:** [Hier der harte Fakt]
```

**Warum:** Trennt "Warum" (weich) von "Was" (hart) visuell.

---

### 4. Information Density > Prosatext
**Statt:** "Die Concurrency Formel ist wichtig weil..."  
**Nutze:** `// Hard Limit: 16. RAM Divisor: 2.`

**Warum:** Weniger Worte, mehr Fakten. Schneller zu scannen.

---

### 5. Executive Summary mit "Fusion" Branding
```markdown
**Version:** 3.0 (Platinum Fusion)  
**Basis:** V2 Data (Completeness) + V1 Context (Clarity)
```

**Warum:** Positioniert den Report als bewusste Synthese.

---

### 6. Delta-Metriken immer sichtbar
Jede Sektion sollte implizit oder explizit antworten:
- "Was ist neu?"
- "Was wurde verbessert?"

---

**Quelle:** Chat-Analyse vom 2026-02-01  
**Basis:** V3 (anderer Agent) vs. V1-V4 Vergleich
