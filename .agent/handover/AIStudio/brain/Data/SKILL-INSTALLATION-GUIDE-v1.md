# SKILL-INSTALLATION-GUIDE v1.0 (29. Jan 2026)

## Die konkrete Anleitung für dein Setup

Du brauchst **4 Basis-Skills** von `skills.sh`. Diese Installation ist der erste Schritt, damit dein Orchestrator-Agent später die richtigen Dateien hat.

---

## 📦 Die "Big 4" Skills (Installation)

### Schritt 1: Remotion Skill (Die Basis)

**Was:** Der offizielle Remotion-Skill mit allen Rules für Video-Produktion.

**Install-Befehl:**
```bash
npx skills add remotion-dev/skills
```

**Warum genau dieser:**
- Gepflegt von remotion-dev (First-Party, nicht Community).
- Enthält 25+ Rules: `rules/3d.md`, `rules/transitions.md`, `rules/performance.md`, `rules/audio.md`, etc.
- Updates kommen automatisch (wenn du `npx skills add` erneut lädst).
- Deckt 80% deiner Remotion-Anforderungen ab.

**Wo landet er:**
```
./skills/remotion-dev--skills/
├── SKILL.md
└── rules/
    ├── 3d.md
    ├── transitions.md
    ├── performance.md
    └── ...
```

**Source:** https://skills.sh/remotion-dev/skills [web:390][web:391]

---

### Schritt 2: Vercel React Best Practices

**Was:** 57 Rules für React-Performance, Hooks, State Management, etc.

**Install-Befehl:**
```bash
npx skills add vercel-labs/agent-skills@vercel-react-best-practices
```

**Warum genau dieser:**
- Du brauchst React für (a) Remotion-Kompositionen, (b) deine Viron-UI.
- Vercel hat die Community-Best-Practices ins Skill-Format gefasst.
- Deckt `async/await` Waterfalls, Render-Optimierung, Memo-Patterns.
- Verhindert, dass der Agent React-Code schreibt, der 50 Renders pro Frame erzeugt.

**Wo landet er:**
```
./skills/vercel-labs--agent-skills--react/
├── SKILL.md
└── rules/
    ├── hooks-best-practices.md
    ├── rendering-optimization.md
    └── ...
```

**Source:** https://skills.sh/vercel-labs/agent-skills/vercel-react-best-practices [web:412]

---

### Schritt 3: Next.js Best Practices (App Router)

**Was:** Patterns für Server Components, Server Actions, Routing, File Conventions.

**Install-Befehl:**
```bash
npx skills add vercel-labs/next-skills@next-best-practices
```

**Warum genau dieser:**
- Du brauchst Next.js für Phase B (App Shell + Player + UI).
- App Router (nicht Pages Router) ist der 2026-Standard.
- Deckt Server Actions, RSC Boundaries, Streaming, Deployment.
- Verhindert, dass der Agent z.B. `useEffect` in einer Server Component nutzt (wäre ein Fehler).

**Wo landet er:**
```
./skills/vercel-labs--next-skills--next/
├── SKILL.md
└── rules/
    ├── app-router-patterns.md
    ├── server-components.md
    └── ...
```

**Source:** https://skills.sh/vercel-labs/next-skills/next-best-practices [web:424]

---

### Schritt 4: Web Design Guidelines (UI Auditor)

**Was:** Design System Rules für UI-Code. Prüft Kontrast, Spacing, Typography, Interaction Patterns.

**Install-Befehl:**
```bash
npx skills add vercel-labs/agent-skills@web-design-guidelines
```

**Warum genau dieser:**
- Du brauchst das für deinen "glänzenden Button", der identisch in Video + Web aussehen soll.
- Der Skill hat Rules, die überprüfen: "Hat der Button 4.5:1 Kontrast? Ist die Font gut lesbar?"
- Das ist dein "Design-Auditor-Agent", der vor dem Render-Button die UI reviewt.

**Wo landet er:**
```
./skills/vercel-labs--agent-skills--design/
├── SKILL.md
└── rules/
    ├── color-contrast.md
    ├── typography.md
    └── ...
```

**Source:** https://skills.sh/vercel-labs/agent-skills/web-design-guidelines [web:451]

---

## ✅ Installation durchführen (Schritt-für-Schritt)

```bash
# 1. Navigiere zu deinem Projekt
cd /pfad/zu/deinem/remotion-viron-projekt

# 2. Installiere die Big 4
npx skills add remotion-dev/skills
npx skills add vercel-labs/agent-skills@vercel-react-best-practices
npx skills add vercel-labs/next-skills@next-best-practices
npx skills add vercel-labs/agent-skills@web-design-guidelines

# 3. Prüfe Installation
ls -la ./skills/
# Sollte zeigen: remotion-dev--skills, vercel-labs--agent-skills--react, etc.

# 4. Test: Lade einen Skill in AntiGravity
# (Details siehe: ORCHESTRATOR-AGENT-SETUP-GEMINI-3-PRO-v1.md)
```

---

## 🔍 Kompatibilität-Check (Vor Installation)

**Dein Model:** Gemini 3 Pro (nicht 1.5)

**Kompatibilität:**
- ✅ Remotion Skill: Voll kompatibel
- ✅ React Skill: Voll kompatibel
- ✅ Next.js Skill: Voll kompatibel (App Router)
- ✅ Design Skill: Voll kompatibel

**Token-Budget (erste Initialisierung):**
- Remotion: ~15k Token
- React: ~12k Token
- Next.js: ~10k Token
- Design: ~8k Token
- **Total: ~45k Token** (passt locker in Gemini 3 Pro Context Window von 1M Token)

---

## 🚀 Nach der Installation (Nächste Schritte)

1. **Vergleichs-Agent starten:** (Siehe `COMPARE-AGENT-PROMPT-TEMPLATE-v1.md`)
   - Agent liest die 4 installierten Skills.
   - Agent vergleicht mit deinen lokalen Dateien.
   - Agent erstellt ein GAP-Report.

2. **Viron Delta Skill bauen:** (Siehe `VIRON-DELTA-SKILL-STRUCTURE-v1.md`)
   - Nur die Lücken aus dem GAP-Report kommen hier rein.
   - Alles andere wird archiviert.

3. **Orchestrator Agent starten:** (Siehe `ORCHESTRATOR-AGENT-SETUP-GEMINI-3-PRO-v1.md`)
   - Der Chef lädt die 4 Skills + den Viron Delta.
   - Der Chef orchestriert Anfragen zu Sub-Agents.

---

## 🛠️ Troubleshooting

### Problem: `npx skills add` funktioniert nicht
**Lösung:**
```bash
# Aktualisiere skills CLI
npm update -g vercel/skills-cli

# Oder installiere neu
npm install -g vercel/skills-cli
```

### Problem: Skills laden nicht in AntiGravity
**Lösung:**
- Stelle sicher, dass AntiGravity v1.5+ ist.
- Starte AntiGravity neu.
- Prüfe den Skill-Pfad: `./skills/` muss im Projekt-Root sein.

### Problem: Gemini 3 Pro versteht ein Skill-Konzept nicht
**Lösung:**
- Das Skill ist zu abstrakt. Der Agent braucht konkrete Beispiele.
- Nutze den "Compare-Agent Prompt" um zu prüfen, ob der Agent das Skill wirklich geladen hat.

---

## 📚 Quellen

- skills.sh: https://skills.sh
- Remotion Skill: https://skills.sh/remotion-dev/skills [web:390]
- React Skill: https://skills.sh/vercel-labs/agent-skills/vercel-react-best-practices [web:412]
- Next.js Skill: https://skills.sh/vercel-labs/next-skills/next-best-practices [web:424]
- Design Skill: https://skills.sh/vercel-labs/agent-skills/web-design-guidelines [web:451]

---

**Version:** v1.0 (29. Jan 2026)  
**Status:** Production Ready  
**Nächste Datei:** `COMPARE-AGENT-PROMPT-TEMPLATE-v1.md`