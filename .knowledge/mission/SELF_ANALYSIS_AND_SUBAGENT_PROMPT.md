# 🎯 SELBSTANALYSE & SUBAGENT PROMPT (Badge 7 Lessons Learned)

**Datum:** 2026-02-01 | **Agent:** Kilo (V2-V5 Entwicklung)

---

## 📊 TEIL 1: MEINE PERFORMANCE IN BADGE 7

### Was ich gut gemacht habe (Stärken)

| # | Stärke | Beweis | Wert für Mission |
|:--|:-------|:-------|:-----------------|
| 1 | **Vollständigkeit** | 12/12 Bausteine extrahiert (V2) | Keine Lücken im Report |
| 2 | **Technische Präzision** | Korrekte Zeilennummern (157-171) | Forensische Verifizierbarkeit |
| 3 | **Forensic Answers** | A-D korrekt beantwortet | Briefing-Anforderungen erfüllt |
| 4 | **Skill-Verifizierung** | `trimming.md` aus Global Skill gelesen | Redundanz-Check ist korrekt |
| 5 | **V4 Innovation** | "Das Problem / Die Lösung" Pattern | Erklärender Kontext |
| 6 | **V5 Ultimative** | "Replaces Original Files" Konzept | Archiv-Qualität |

### Was ich schlecht gemacht habe (Schwächen)

| # | Schwäche | Konsequenz | Was der andere Agent besser machte |
|:--|:---------|:-----------|:-----------------------------------|
| 1 | **Zu ausführlich (V2)** | 50 Zeilen für Output Specs | V3: Kompakte Tabellen |
| 2 | **Keine Struktur-Marken** | Schwieriger zu scannen | V3: "THE X" Sektionen |
| 3 | **Keine Statistik oben** | Sofortiger Wert nicht sichtbar | V3: Metrik-Tabelle am Anfang |
| 4 | **Kontext als Fließtext** | "Warum" geht unter | V3: "Kontext (V1)" Labels |
| 5 | **Keine Delta-Metriken** | "Was ist neu?" nicht klar | V3: Vergleich zu V1 |
| 6 | **Information Density** | Zu viele Worte, zu wenig Fakten | V3: Kompakter, prägnanter |

### Der entscheidende Unterschied

**Der andere Agent (V3) verstand:**
> "Es geht nicht darum, alles zu sagen. Es geht darum, das Richtige strukturiert zu sagen."

**Ich (V2/V4) tendierte zu:**
> "Ich muss alles erklären, damit nichts missverstanden wird."

**Ergebnis:** V3 ist das bessere "Agent-Interface" – schneller zu scannen, trotzdem vollständig.

---

## 📋 TEIL 2: WAS ICH GELERNT HABE

### Lesson 1: Struktur vor Inhalt

**FALSCH:**
```markdown
### 1. Concurrency Formula
Hier ist die Formel und hier ist der Kontext...
```

**RICHTIG:**
```markdown
## THE CLOUD PIPELINE

### 3. CONCURRENCY FORMULA
**Quelle:** `file.md` (Zeilen X-Y)  
**Kontext (V1):** [Warum]  
**Code:** [Was]
```

### Lesson 2: Tabellen sind besser als Prosatext

**FALSCH:**
> "Draft kostet $0.10 pro Minute und ist für Previews geeignet. Standard kostet $0.50..."

**RICHTIG:**
| Tier | Cost/Min | Use Case |
|:-----|:---------|:---------|
| Draft | $0.10 | Previews |
| Standard | $0.50 | Social |

### Lesson 3: Jede Sektion braucht ein Versprechen

**FALSCH:**
> "Hier sind die 7 Departments..."

**RICHTIG:**
> "Viron organisiert Code in 7 strikte Departments mit definierten Access-Control-Regeln."

### Lesson 4: Hard Facts hervorheben

**FALSCH:**
> "Die Formel nutzt einen RAM-Teiler von 2..."

**RICHTIG:**
> "🔑 **RAM-Teiler: 2** (nur 50% RAM für Rendering)"

---

## 🎯 TEIL 3: DER VERBESSERTE SUBAGENT PROMPT

```markdown
# 🚀 SUBAGENT BRIEFING: BADGE X [THEMA]

**Mission:** Extrahiere Viron-spezifisches IP aus [QUELLEN].  
**Ziel:** Erstelle EXTRACTION_REPORT_BADGE_X_V1.md als Ersatz für Originalquellen.

---

## 🛑 ABSOLUTE REGELN (Verstoß = Abbruch)

1. **Struktur zuerst:** Verwende "THE [SYSTEM/PIPELINE/...]" Sektionen
2. **Statistik oben:** Tabelle mit Items, Accuracy, Redundanz-Count
3. **Kontext-Label:** Jeder Baustein: "**Kontext (V1):** [Warum]"
4. **Information Density:** Tabellen > Prosatext
5. **Hard Facts:** 🔑 vor Schlüsselzahlen
6. **Keine Boilerplate:** Standard-Remotion = DROP

---

## 📊 OUTPUT STRUKTUR (Strikt einhalten)

```markdown
# EXTRACTION_REPORT_BADGE_X_V1.md

## 📈 STATISTIK
| Metrik | Wert |
|:-------|:-----|
| Extrahierte Bausteine | X |
| Skill-Check NEIN | X% |
| Redundanzen verworfen | X |

## 🗺️ THE [SYSTEM/ARCHITECTURE/...]

### 1. [BAUSTEIN NAME]
**Quelle:** `file.md` (Zeilen X-Y)  
**Kontext (V1):** [Das Problem / Die Intuition]  
**Code:** [Der harte Fakt]

🔑 **Schlüsselzahl:** [Wert]

---

## 🗑️ VERWORFEN
| Fund | Quelle | Skill-Konflikt |
|:-----|:-------|:---------------|
| [Item] | [Datei] | [Skill-Datei] |
```

---

## ⛏️ ARBEITSABLAUF

1. **Lese Pflichtlektüre** (Context Kit)
2. **Lese Skill-Dateien** (Redundanz-Check)
3. **Extrahiere Bausteine** (Skill-Check: NEIN = Mitnehmen)
4. **Erstelle Statistik-Tabelle**
5. **Schreibe Report** (Struktur beachten!)
6. **Verifiziere:** Kann ein neuer Agent mit diesem Report + Skill arbeiten?

---

## 🎯 QUALITÄTSKRITERIEN

- [ ] Alle Pflicht-Extraktionen aus Briefing vorhanden?
- [ ] Zeilennummern korrekt?
- [ ] "Das Problem" / "Die Lösung" erklärt?
- [ ] Keine Standard-Remotion-Duplikate?
- [ ] Scanbar ohne alles lesen zu müssen?

**START EXTRACTION.**
```

---

## 🔧 TEIL 4: VEREINFACHTER REPO-EINSTIEG

### Problem
Der aktuelle Einstieg ist komplex:
- 115+ Dateien
- 8 Badges
- Unklare Abhängigkeiten

### Lösung: Der "Single Source of Truth" Workflow

**Für den Menschen (Orchestrator):**
```
1. Öffne: .knowledge/mission/task.md
2. Wähle: Aktives Badge (z.B. Badge 7)
3. Sende: Subagent mit obigem Prompt + Badge-Spezifik
```

**Für den Subagenten:**
```
1. Lese: task.md (Badge-Section)
2. Lese: source-master-index.md (Datei-Liste)
3. Lese: SKILL.md (Redundanz-Check)
4. Extrahiere: Nach Prompt-Struktur
5. Schreibe: EXTRACTION_REPORT_BADGE_X_V1.md
```

**Keine manuelle Datei-Jagd mehr.**

---

## 📁 TEIL 5: ARTIEFAKTE ZUR ÜBERGABE

Bereitgestellte Dateien für Subagenten:

1. **EXTRACTION_REPORT_BADGE_7_V5_ULTIMATE.md** - Das Gold-Standard Beispiel
2. **COMPARISON_BADGE_7_ALL_VERSIONS.md** - Was gut/schlecht war
3. **SELF_ANALYSIS_AND_SUBAGENT_PROMPT.md** - Diese Datei

---

**ENDE DER ANALYSE**

*Nächster Schritt: Badge 8 mit verbessertem Prompt.*
