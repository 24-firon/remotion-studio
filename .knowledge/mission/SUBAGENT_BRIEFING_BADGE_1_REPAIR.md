# 🎯 SUB-AGENT MISSION: BADGE 1 REPAIR (Time & Sequencing)

**Dein Ziel:** Veredle den bestehenden Report `EXTRACTION_REPORT_BADGE_1.md` zu einem **V2 Self-Contained Knowledge Container**.

## 1. DAS PROBLEM MIT V1

Dein bisheriger Report hat zwar die richtigen **Daten** gefunden (z.B. Lambda Config), aber den **Kontext** verloren.
Beispiel: Du zeigst `{ memorySize: 3009 }`, aber erklärst nicht, _warum_ (Sweet Spot).
Das ist "Daten-Kopie", wir brauchen "Wissens-Transfer".

## 2. DEINE MISSION (Der Workflow)

Du musst den Extraktions-Prozess erneut simulieren, aber mit **Context-Awareness**:

1.  **Re-Read (Deep Scan):**
    Lies die Quelldateien von den Punkten, die du extrahiert hast, ERNEUT.
    _Nicht nur den Block, sondern das ganze Kapitel._ Verstehe die Argumentation.

2.  **Context-Injection (Prosa):**
    Wenn du einen Code-Block in den Report kopierst, MUSST du die umgebende Prosa analysieren:
    - Gibt es eine Begründung ("Warum machen wir das")? → **Mitnehmen!**
    - Gibt es eine Warnung ("Tu das nicht")? → **Mitnehmen!**
    - Gibt es eine Metrik ("Spart 50%")? → **Mitnehmen!**

    _Schreibe diese Kontexte als begleitende Prosa direkt über/unter den Code-Block._

3.  **Kategorisierung (A/B/C):**
    Sortiere dein Wissen strikt:
    - **A: SKILL_UPDATES:** Alles technische Remotion-Wissen (für SKILL.md)
    - **B: PROJECT_IP:** Viron-Secrets (z.B. 5 Säulen, Theme-Regeln)
    - **C: RESEARCH_NOTES:** Tutorials, Kontext, Entscheidungen (für Archiv)

## 3. DAS OUTPUT FORMAT (V2)

Erstelle `EXTRACTION_REPORT_BADGE_1_V2.md`.

Jeder Punkt muss so aussehen:

````markdown
### [Titel des Wissens-Blocks]

**Quelle:** `datei.md` (Zeilen X-Y)

**Kontext/Erklärung:**
[Hier kommt deine Prosa. Erkläre, warum das wichtig ist. Zitiere die Begründung aus dem Original-File.]

**Code/Daten:**

```typescript
[Hier der Code-Block]
```
````

```

## 4. EXECUTION
Lies jetzt deinen alten Report und die Quellen.
Baue V2. Sei vollständig. Sei verständlich.
**Verlasse dich nicht auf Vorwissen – lies die Dateien.**
```
