# ANALYSE: Badge 6 & 7 vs V6.1 Template
## Verbesserungspotential

---

## Übersicht: Was fehlt in Badge 6 & 7?

| Element | Badge 6 (V3.0) | Badge 7 (V4.1) | V6.1 | Priorität |
|:--------|:---------------|:---------------|:-----|:----------|
| **Executive Briefing** | ❌ Fehlt | ❌ Fehlt | ✅ Ja | 🔴 Kritisch |
| **Kredo am Anfang** | ❌ Fehlt | ❌ Fehlt | ✅ Ja | 🔴 Kritisch |
| **Structure Requirements** | ❌ Fehlt | ❌ Fehlt | ✅ Ja | 🔴 Kritisch |
| **Ausführliche Prinzipien** | Teilweise | Teilweise | ✅ Ja | 🟡 Hoch |
| **Hyperlinks statt Pfade** | ❌ Pfade | ❌ Pfade | ✅ Ja | 🟡 Hoch |
| **Lernziele pro Phase** | ❌ Fehlt | ❌ Fehlt | ✅ Ja | 🟡 Hoch |
| **Kontext-Labels [V1/V2/...]** | ❌ Fehlt | ❌ Fehlt | ✅ Ja | 🟢 Medium |
| **Entscheidungsbäume** | ❌ Fehlt | ❌ Fehlt | ✅ Ja | 🟢 Medium |
| **10-Punkte Checkliste** | ❌ Fehlt | ❌ Fehlt | ✅ Ja | 🟢 Medium |

---

## Detaillierte Verbesserungen

### 1. EXECUTIVE BRIEFING (Neu einfügen)

**Aktueller Zustand:** Weder Badge 6 noch Badge 7 haben eine Executive Summary.

**Problem:** Der Sub-Agent weiß nicht sofort, was das Ziel ist.

**V6.1 Lösung:**
```markdown
## 📊 EXECUTIVE BRIEFING

| Metrik | Ziel | Threshold | Warum wichtig |
|:-------|:-----|:----------|:--------------|
| Files to Audit | [N] | < 50% = FAIL | Grundlage für Delta |
| Core Patterns | [N] | > 0 | Viron-IP identifizieren |
| Key Tables | [N] | ≥ 3 | Forensische Qualität |
| Redundancies Dropped | [N] | Dokumentiert | Beweispflicht |

**Scope in 3 Sätzen:**
1. [Was ist der Untersuchungsgegenstand?]
2. [Was ist das Viron-spezifische Delta?]
3. [Was ist das erwartete Ergebnis?]
```

**Empfohlene Werte für Badge 6:**
- Files to Audit: 5
- Core Patterns: 4+
- Key Tables: 3+

**Empfohlene Werte für Badge 7:**
- Files to Audit: 8
- Core Patterns: 4 (Cloud, System, Routing, Workflow)
- Key Tables: 4+

---

### 2. STRUCTURE REQUIREMENTS (Neu einfügen)

**Aktueller Zustand:** Keine expliziten Vorgaben zur Report-Struktur.

**Problem:** Jeder Sub-Agent formatiert anders → Inkonsistenz.

**V6.1 Lösung:**
```markdown
## 🎯 STRUCTURE REQUIREMENTS (V6.1 Diamond Standard)

**MANDATORY in Report - Keine Ausnahmen.**

| Element | Format | Beispiel | Warum obligatorisch |
|:--------|:-------|:---------|:--------------------|
| **Sections** | `THE [SYSTEM]` | THE CLOUD PIPELINE | Mentale Landkarte |
| **Hard Facts** | 🔑 **Key: Value** | 🔑 **CRF: 20** | Sofortiger Wert |
| **Context Labels** | `[V1/V2/V3/V4/new]` | `[V3]` | Historische Spur |
| **Tables** | Markdown Tables | Siehe unten | Unmissverständlich |
| **Evidence** | Code Blocks + Lines | `Line 45-67` | Beweispflicht |
| **Source Links** | `[text](../../path)` | `[vision.md](../../...)` | Navigation |
```

---

### 3. PRINZIPIEN VERBESSERN (Kritisch!)

#### Badge 6 Aktuell (zu kurz):
```markdown
### 1.2 Das Viron-Credo

1. **Skill First:** Was im Global Skill steht, existiert. Es darf NICHT dupliziert werden.
2. **Negative Beweispflicht:** Wenn du etwas verwirfst, musst du beweisen, warum.
3. **Smoking Guns:** Wir suchen exakte Werte. Keine Prosa.
```

#### Badge 7 Aktuell (zu kurz):
```markdown
### 1.2 Das Viron-Credo (Forensik)

1. **Skill First:** Was im Global Skill steht, ist verboten.
2. **Structure over Syntax:** Uns interessiert die Logik.
3. **Smoking Guns:** Extrahiere exakte Tabellen. Keine Prosa.
```

#### V6.1 Ziel (ausführlich):
```markdown
### 1.2 Das Viron-Credo (Non-Negotiable)

Diese 4 Prinzipien sind nicht verhandelbar.

#### Prinzip 1: 🔴 Skill First

**Was bedeutet das?**
Bevor du irgendein Detail extrahierst, PRÜFE ob es bereits dokumentiert ist.

| Wo suchen | Pfad | Was ist dort |
|:----------|:-----|:-------------|
| Master Skill | [`remotion-core/SKILL.md`](../../.agent/skills/remotion-core/SKILL.md) | Basis-Wahrheit |
| Rules Core | [`RULES_CORE.md`](../../.agent/RULES_CORE.md) | Architektur-Regeln |

**Entscheidungsbaum:**
```
Ist das Detail im Skill dokumentiert?
├── JA → NICHT extrahieren (nur referenzieren)
├── NEIN → Extrahieren mit Beweis
└── UNSICHER → STOP & ASK
```

**Warum wichtig:** Duplikation führt zu Divergenz.

#### Prinzip 2: 🔴 Negative Beweispflicht
...
#### Prinzip 3: 🔴 Smoking Guns
...
#### Prinzip 4: 🔴 Structure over Syntax
...
```

---

### 4. Pfade → Hyperlinks (Technisch wichtig)

#### Badge 6 Aktuell (Problematisch):
```markdown
| Datei      | Pfad                                                                         |
| ---------- | ---------------------------------------------------------------------------- |
| **Vision** | `C:\Workspace\Repos\remotion-studio\viron-core\vision.md`                    |
```

**Problem:** Pfade sind nicht klickbar, können sich ändern.

#### V6.1 Ziel:
```markdown
| Datei      | Pfad |
|:-----------|:-----|
| **Vision** | [`viron-core/vision.md`](../../viron-core/vision.md) |
```

---

### 5. LERNZIELE pro Phase (Neu einfügen)

**Aktueller Zustand:** Keine expliziten Lernziele.

**V6.1 Lösung:**
```markdown
**Nach dem Lesen musst du beantworten können:**
1. Was ist das "Video as Code" Paradigma?
2. Welche 7 Departments gibt es?
3. Was ist ein "Canon Pack"?

**Wenn du das nicht beantworten kannst, HAST DU NICHT GRÜNDLICH GENUG GELESEN.**
```

---

### 6. WORKFLOW VERBESSERN

#### Badge 6 Aktuell:
```markdown
1. **Scan:** Lies das Detail
2. **Check:** "Steht das im Skill?"
3. **Audit:** JA/NEIN
4. **Enrich:** Beschreibe die Implikation
```

#### V6.1 Ziel:
```markdown
### Schritt 1: SCAN
**Was tust du?** Lies die Logik und identifiziere das Konzept.
**Output:** Ein potenzielles Finding.

### Schritt 2: CHECK
**Was tust du?** Frage: "Steht das im Skill?"

| Prüfung | Aktion |
|:--------|:-------|
| Öffne [`remotion-core/SKILL.md`](...) | Suche nach dem Konzept |
| Öffne relevante Rule-Dateien | Suche nach Patterns |

**Entscheidung:**
| Antwort | Bedeutung | Aktion |
|:--------|:----------|:-------|
| **JA** | Standard-Remotion | → Verwerfen |
| **NEIN** | Viron-spezifisch | → Extrahieren |
| **UNSIcher** | Nicht eindeutig | → **STOP & ASK** |

### Schritt 3: AUDIT
**Wenn JA (Redundant):** Dokumentiere die Verwerfung...
**Wenn NEIN (Delta):** Extrahiere mit vollständigem Kontext...

### Schritt 4: LABEL
Markiere jeden Block mit `[V1/V2/V3/V4/new]`
```

---

### 7. QUALITÄTSKRITERIEN (Neu einfügen)

**Aktueller Zustand:** Keine explizite Checkliste.

**V6.1 Lösung:**
```markdown
## 5. QUALITÄTSKRITERIEN (Checkliste vor Abgabe)

**Jeder Punkt MUSS geprüft werden:**

- [ ] **Alle P0-Dateien** aus Phase 0 gelesen?
  - [ ] vision.md
  - [ ] 00-master-workflow...
  - [ ] 00-overview-index...
  - [ ] RULES_CORE.md
  
- [ ] **Skill-Check** für jedes Finding durchgeführt?
  - [ ] Gegen remotion-core/SKILL.md geprüft?
  - [ ] Gegen relevante Rules geprüft?
  
- [ ] **Mindestens 3 Tabellen** extrahiert?
  - [ ] Tabelle 1: _______________
  - [ ] Tabelle 2: _______________
  - [ ] Tabelle 3: _______________
  
- [ ] **Keine Core-Remotion-Duplikate**?
  - [ ] Verworfen-Tabelle ist dokumentiert?
  
- [ ] **Jede Quelle** mit Zeilennummern?
  - [ ] Format: `file.md:45-67`

**Wenn auch nur EIN Punkt nicht geprüft ist, ist der Report NICHT ABGABEBEREIT.**
```

---

## ZUSAMMENFASSUNG: Handlungsempfehlungen

### Für Badge 6 (MEDIA, AUDIO & PERFORMANCE):

| Priorität | Änderung | Aufwand |
|:----------|:---------|:--------|
| 🔴 Kritisch | Executive Briefing hinzufügen | 10 Min |
| 🔴 Kritisch | Structure Requirements einfügen | 15 Min |
| 🔴 Kritisch | Prinzipien ausführlich erklären | 30 Min |
| 🟡 Hoch | Pfade → Hyperlinks | 20 Min |
| 🟡 Hoch | Lernziele pro Phase | 15 Min |
| 🟢 Medium | 10-Punkte Checkliste | 20 Min |

### Für Badge 7 (SYSTEM ARCHITECTURE & CLOUD):

| Priorität | Änderung | Aufwand |
|:----------|:---------|:--------|
| 🔴 Kritisch | Executive Briefing hinzufügen | 10 Min |
| 🔴 Kritisch | Structure Requirements einfügen | 15 Min |
| 🔴 Kritisch | Prinzipien ausführlich erklären | 30 Min |
| 🟡 Hoch | Pfade → Hyperlinks | 20 Min |
| 🟡 Hoch | THE X Systeme besser beschreiben | 15 Min |
| 🟢 Medium | 10-Punkte Checkliste | 20 Min |

---

## Empfohlene Vorgehensweise

1. **Badge 7 zuerst** (weil es das wichtigere System-Badge ist)
2. **Badge 6 danach** (analog zu Badge 7)
3. **Beide auf V6.1 heben** (einheitliches Niveau)
4. **Dann Badge 1-5** (nach gleichem Muster)

**Alternativ:** Wenn Zeit kritisch ist, nur die 🔴 Kritischen Punkte für Badge 6 & 7 aktualisieren, den Rest für spätere Revision aufheben.
