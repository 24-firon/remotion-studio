# 🎯 SUB-AGENT BRIEFING: BADGE 6 (MEDIA, AUDIO & PERFORMANCE)

**Version:** 3.0 (Gold Standard)
**Status:** FORENSIC AUDIT MODE
**Analyst Role:** Auditor & IP-Miner

---

# 🛑 0. SCHNELL-STEUERUNG (SOFORT-AKTIVIERUNG)

Kopiere diesen Block und sende ihn als erste Nachricht an den Sub-Agenten:

```text
Ich aktiviere dich für Badge 6: MEDIA, AUDIO & PERFORMANCE.
Lies: C:\Workspace\Repos\remotion-studio\.knowledge\mission\SUBAGENT_BRIEFING_BADGE_6.md
Erstelle: C:\Workspace\Repos\remotion-studio\.knowledge\mission\EXTRACTION_REPORT_BADGE_6.md

REGLER AUF: 100% Tiefe, 0% Reduktion.
MODUS: AUDITOR (Nicht Summarizer).
Bei Unsicherheit: STOPPE und FRAGE anstatt zu raten.
```

---

## 1. MISSION PHILOSOPHY (Das Fundament)

### 1.1 Deine Wahre Rolle

Du bist kein "Zusammenfasser". Du bist ein **FORENSISCHER AUDITOR**.
Wir besitzen bereits generisches Wissen über Audio und Performance. Dein Job ist es, das **Viron-Spezifische Delta** zu finden.

### 1.2 Das Viron-Credo

1.  **Skill First:** Was im Global Skill (`remotion-core/SKILL.md` + Global `audio.md`) steht, existiert. Es darf NICHT dupliziert werden.
2.  **Negative Beweispflicht:** Wenn du etwas verwirfst, musst du beweisen, warum (Tabelle "Verworfen").
3.  **Smoking Guns:** Wir suchen exakte Werte (Frequenzen, Thresholds, Codec-Bitrates). Keine Prosa ("Viron macht das gut"), sondern Beweise ("Viron nutzt 8000k Bitrate").

---

### PHASE 0: CONTEXT KIT (MANDATORY - GATEKEEPER)

Diese Dateien MÜSSEN gelesen werden, um Viron zu verstehen. Ohne dieses Fundament ist jede Analyse wertlos.

| Datei      | Pfad                                                                         | Zweck                         |
| ---------- | ---------------------------------------------------------------------------- | ----------------------------- |
| **Vision** | `C:\Workspace\Repos\remotion-studio\viron-core\vision.md`                    | Das "Video as Code" Paradigma |
| **Logic**  | `C:\Viron\90_VAULT\NEW SUFF\Remotion\00-master-workflow-2026-integration.md` | Die Entscheidungs-Logik       |
| **Index**  | `C:\Viron\90_VAULT\NEW SUFF\Remotion\00-overview-index-v2-1-complete.md`     | Die Landkarte des Wissens     |
| **Skill**  | `C:\Workspace\Repos\remotion-studio\.agent\skills\remotion-core\SKILL.md`    | Der Redundanz-Check           |

---

### PHASE 1: SKILL INTERNALIZATION (Die Brille)

Lies diese Global Skills, um zu wissen, was **Standard** ist (und somit NICHT in den Report gehört):

| Skill-Datei (Ref) | Pfad                                                                                | Zweck                     |
| ----------------- | ----------------------------------------------------------------------------------- | ------------------------- |
| **MASTER RULE**   | `C:\Users\bachl\.gemini\antigravity\global_skills\remotion-best-practices\SKILL.md` | Die Basis-Wahrheit        |
| **Audio**         | `.../rules/audio.md`                                                                | Standard Audio Components |
| **Audio Dur**     | `.../rules/get-audio-duration.md`                                                   | Standard Measurement      |
| **Captions**      | `.../rules/display-captions.md`                                                     | Standard Text Display     |

---

### PHASE 2: SOURCE EXTRACTION (Das Gold)

Hier liegen die Viron-Secrets. Untersuche diese Dateien auf Abweichungen vom Standard.

| Kategorie | Datei         | Pfad                                                                                       | Extraktions-Ziel (Viron-IP)              |
| --------- | ------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------- |
| **Spec**  | `audio.md`    | `C:\Workspace\Repos\remotion-studio\specs\audio.md`                                        | Das `AudioFrame` Interface (Pre-Calc)    |
| **Spec**  | `pipeline.md` | `C:\Workspace\Repos\remotion-studio\viron-core\pipeline.md`                                | Codec-Profile & Concurrency Math         |
| **Vault** | `40-audio`    | `C:\Viron\90_VAULT\NEW SUFF\Remotion\40-audio-reaktiv-00-fft-frequenzspektren.md`          | Exakte Frequenz-Bänder (Bass/Mid/High)   |
| **Vault** | `50-pref`     | `C:\Viron\90_VAULT\NEW SUFF\Remotion\50-web-patterns-08-performance-web-vitals-mastery.md` | LCP-Hacks & Scrubbing Math (`alpha`)     |
| **Vault** | `50-ai`       | `C:\Viron\90_VAULT\NEW SUFF\Remotion\50-web-patterns-10-real-time-ai-video-streaming.md`   | WebSocket Buffer Logic (falls vorhanden) |

---

## 3. DEIN WORKFLOW (The Auditor Loop)

Für jeden technisches Detail in den Quellen:

1.  **Scan:** Lies das Detail (z.B. "Bass ist 0-250Hz").
2.  **Check:** "Steht das im Skill `audio.md`?" (Antwort: Nein, Skill ist generisch).
3.  **Audit:**
    - **JA (Redundant):** Ab in die "Verworfen"-Tabelle.
    - **NEIN (Delta):** Extrahiere es als "MITNEHMEN" mit Code-Beweis.
4.  **Enrich:** Beschreibe die Implikation für Viron (Warum machen wir das so?).

---

## 4. OUTPUT FORMAT (Strikt einhalten!)

Erstelle: `C:\Workspace\Repos\remotion-studio\.knowledge\mission\EXTRACTION_REPORT_BADGE_6.md`

### 4.1 "MITNEHMEN" Format

````markdown
### [Titel des Punktes]

**Quelle:** `[datei.md]` (Zeilen X-Y)
**Typ:** PROJECT_IP

**Skill-Check:**

- [ ] Explizit im Skill dokumentiert: **NEIN** (Geprüft gegen `[skill.md]`)

**Kontext:**
[Erklärung]

**Code/Daten:**

```typescript
[Beweis - Code];
```
````

### 4.2 "VERWORFEN" Format (MANDATORY)

```markdown
## 🗑️ Verworfen (Skill-Redundanzen)

| Fund                 | Quelle           | Steht bereits in Skill | Entscheidung |
| :------------------- | :--------------- | :--------------------- | :----------- |
| Basic <Audio> import | 40-audio-reaktiv | audio.md               | ❌ DROP      |
```

---

## 5. EMPFEHLUNGEN

Liste auf, was fehlt oder wo der Viron-Standard inkonsistent ist.

**AUDIT STARTEN.**
