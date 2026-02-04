# Agenten-Fütterungs-Checkliste v2.1 (Schnellreferenz)

## Schnell-Übersicht: Wann lade ich welche Datei?

### START (Jeder Agent, IMMER)
- [ ] `00-master-workflow-2026-integration.md` → Logik-Engine
- [ ] `10-remotion-basics-01-timeline-und-frames.md` → Syntax
- [ ] `QUICK-START-komplettbeispiel.md` → Template
- [ ] `FEHLERLOSUNG-haeufige-probleme.md` → Error-Handling

**Result:** Agent kann Basis-Code schreiben. Ready für Phase 2.

---

### QUALITY (Nach erstem Draft – User hat gesagt was er will)

#### Wenn User sagt: "schnell" / "Performance" / "Handy optimieren"
- [ ] `50-web-patterns-08-performance-web-vitals-mastery.md`

#### Wenn es eine öffentliche Website ist
- [ ] `70-web-accessibility-wcag-2026-compliance.md`

#### Wenn es um Responsive/Mobile Layout geht
- [ ] `20-layout-patterns-01-container-queries-und-grids.md`

#### Wenn es um Übergänge/Morphing zwischen Szenen geht
- [ ] `20-layout-patterns-02-view-transitions-in-remotion.md`

#### Wenn es um visuell interessante Effekte geht (Video in Text, Masking, etc.)
- [ ] `20-layout-patterns-03-modern-css-masking-compositing.md`

**Result:** Agent kann professionelle, polierte Qualität liefern.

---

### EFFEKTE (Optional – Nur wenn User "schöner" haben will)

#### Wenn User sagt: "Effekt" / "Filter" / "Unschärfe" / "Glow"
- [ ] `30-post-processing-00-overview-postprocessing-stack.md` (Erst das!)

#### Wenn User sagt: "leuchten" / "Neon" / "Glow"
- [ ] `30-post-processing-01-bloom-selective.md`

#### Wenn User sagt: "Film-Look" / "Kamera-Fokus" / "Unschärfe"
- [ ] `30-post-processing-02-depth-of-field.md`

#### Wenn User sagt: "Vintage" / "VHS" / "Retro" / "Glitch"
- [ ] `30-post-processing-03-04-chromatic-und-grain.md`

**Result:** Video sieht visuell interessant aus.

---

### WEB-INTEGRATION (Optional – Wenn Video auf einer Website sein muss)

#### Wenn User sagt: "Scroll-Animation" / "Apple-Style"
- [ ] `50-web-patterns-01-scroll-basierte-dof-navigation.md`

#### Wenn User sagt: "Handy lädt langsam"
- [ ] `50-web-patterns-02-adaptive-quality-switching.md`

#### Wenn Agent unsicher ist: "Soll ich das mit CSS oder Remotion machen?"
- [ ] `50-web-patterns-03-css-animationen-vs-remotion.md`

#### Wenn es um animierten Text geht
- [ ] `50-web-patterns-09-kinetic-typography-text-animation.md`

#### Wenn User sagt: "Live-Streaming" / "Echtzeit"
- [ ] `50-web-patterns-10-real-time-ai-video-streaming.md`

**Result:** Video ist nahtlos in Website integriert.

---

### SPEZIAL (On-Demand – Nur wenn User EXPLIZIT danach fragt)

#### Wenn User sagt: "Musik" / "Audio" / "Beat" / "Visualizer"
- [ ] `40-audio-reaktiv-00-fft-frequenzspektren.md`

#### Wenn User sagt: "Hintergrund generieren" / "Muster" / "Zufällig"
- [ ] `40-procedural-patterns-00-noise-voronoi-terrain.md`

#### Wenn User sagt: "Wasser" / "Lichtstrahlen" / "Realistisch" / "Glas"
- [ ] `40-advanced-lighting-00-caustics-volumetric.md`

#### Wenn User sagt: "3D-Modell" / "Blender" / ".glb Datei"
- [ ] `40-gltf-models-00-loading-optimization.md`

**Result:** Spezialisierte Features sind verfügbar.

---

### ENTERPRISE (Nur bei größeren Projekten)

#### Wenn User sagt: "Rendern" / "MP4 erstellen" / "AWS" / "Lambda"
- [ ] `60-cloud-rendering-00-aws-lambda-renderfarming.md`

#### Wenn User sagt: "KI nutzen" / "Stable Diffusion" / "OpenAI" / "GPT"
- [ ] `80-ai-hybrid-workflows-v1-0-code-plus-ai.md`

#### Wenn User sagt: "Personalisierung" / "Viele Videos" / "Pro-User"
- [ ] `90-synergy-01-data-driven-personalization.md`

#### Wenn User sagt: "Chatbot" / "Support" / "Erklärvideo"
- [ ] `90-synergy-02-realtime-video-rag-agents.md`

#### Wenn User sagt: "Partikel" / "Physik" / "GPU" / "Simulation"
- [ ] `90-synergy-03-webgpu-compute-physics.md`

**Result:** Skalierung und Enterprise-Features.

---

### REFERENCE (Für dich, nicht den Agenten)

#### Wenn DU wissen willst, wo was steht
- [ ] `00-navigation-index-v2-1-complete.md`

#### Wenn Begriffe erklärt werden müssen
- [ ] `90-appendix-glossary-bibliography.md`

#### Wenn du überprüfen willst, dass alles komplett ist
- [ ] `LUECKEN-AUDIT-v2-1-complete-coverage.md`

---

## Beispiel-Szenarien

### Szenario A: "Schnelles Prototype Video"
1. Lade: START (Dateien 1–4)
2. User fragt: "Mach ein einfaches Video"
3. Agent schreibt Code basierend auf QUICK-START-Template
4. Fertig.

**Dateien geladen: 4**

---

### Szenario B: "Portfolio Website mit responsive Video-Embedded"
1. Lade: START (1–4)
2. User sagt: "Muss auf Handy responsive sein"
   - Lade: 20-layout-patterns-01
3. User sagt: "Die Website muss schnell sein"
   - Lade: 50-web-patterns-08
4. User sagt: "Muss barrierefrei sein"
   - Lade: 70-web-accessibility
5. Agent schreibt Code, Video sieht gut aus

**Dateien geladen: 8**

---

### Szenario C: "Professionelles Musik-Video mit Effekten"
1. Lade: START (1–4)
2. User sagt: "Das Video soll zum Beat der Musik tanzen"
   - Lade: 40-audio-reaktiv-00
3. User sagt: "Ich möchte Glow-Effekte"
   - Lade: 30-post-processing-00, dann 30-post-processing-01
4. User sagt: "Ich möchte den Text animiert"
   - Lade: 50-web-patterns-09
5. User sagt: "Mach es schnell, ich optimize später"
   - Agent schreibt Code

**Dateien geladen: 8**

---

### Szenario D: "Enterprise: 10.000 personalisierte Marketing-Videos"
1. Lade: START (1–4)
2. User sagt: "Ich will 10.000 Videos, jedes mit anderen Namen/Daten"
   - Lade: 90-synergy-01
3. User sagt: "Ich will die rendern auf AWS"
   - Lade: 60-cloud-rendering-00
4. User sagt: "Ich will KI die Texte generieren lassen"
   - Lade: 80-ai-hybrid
5. Agent designt komplette Infrastruktur

**Dateien geladen: 7**

---

## Goldene Regeln

1. **START ist obligatorisch.** Immer Dateien 1–4 zuerst.

2. **Lade nur was relevant ist.** Nicht alle 30 auf einmal.

3. **Lese die "Wann"-Beschreibung.** Wenn User das Wort nicht sagt, lade nicht.

4. **Spezial (40er) nur on-demand.** Agenten werden verwirrt von 4 Audio-Dateien wenn sie nur 1 Handy-Video machen.

5. **Enterprise (90er) nur wenn nötig.** Für einfache Projekte overkill.

6. **Nutze die ausführliche Anleitung.** Diese Checkliste ist Schnellreferenz. Die Datei `AGENT-INITIALIZATION-GUIDE-AUSFÜHRLICH-v2-1.md` hat die Details.

---

## Fehlerhafte Muster (Was du NICHT machen solltest)

### ❌ Agent-Kill #1: Alle 30 Dateien auf einmal laden
- Resultat: Agent ist überfordert, kann nicht entscheiden
- Symptom: Agent macht generischen, uninformierten Code

### ❌ Agent-Kill #2: Wichtige Datei vergessen
- Z.B. nur START, aber nicht Datei 4 (Fehlerbehandlung)
- Resultat: Agent macht Fehler und weiß nicht wie er sie fixt

### ❌ Agent-Kill #3: Spezial-Dateien auch wenn nicht relevant
- Z.B. `40-audio-reaktiv` lade, aber User hat gar keine Musik
- Resultat: Agent denkt: "Vielleicht sollte ich Audio nutzen?" und macht Komplexität wo keine nötig ist

### ❌ Agent-Kill #4: Referenz-Dateien als Input laden
- Z.B. `00-navigation-index` für den Agenten
- Resultat: Agent nutzt sein Kontext-Fenster für Meta-Info statt für deine aktuelle Anfrage

---

## Checkliste für jedes Projekt

```
[ ] User-Anfrage verstanden?
[ ] START-Dateien (1–4) geladen?
[ ] Welche Keywords sagt der User?
[ ] Matching Qualitäts-Dateien (5–9) geladen?
[ ] Matching Effekt-Dateien (10–14) geladen?
[ ] Matching Web-Dateien (15–18) geladen?
[ ] Matching Spezial-Dateien (19–22) on-Demand?
[ ] Matching Enterprise-Dateien (23–27) on-Demand?
[ ] Agent kann jetzt antworten!
```

---

**Version:** v2.1 Schnellreferenz (29. Jan 2026)  
**Für Details:** Siehe `AGENT-INITIALIZATION-GUIDE-AUSFÜHRLICH-v2-1.md`