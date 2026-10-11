# HANDOVER-GUIDE-EXTERNAL-DEVELOPER v1.0 (29. Jan 2026)

## Falls später jemand anders (oder ein anderer Agent) das System übernimmt

Diese Datei ist eine "Bedienungsanleitung für Außenseiter".

---

## 🗺️ Wo liegt was?

```
viron-remotion-project/
├── README.md (Start hier!)
├── package.json (Dependencies)
├── remotion/
│   ├── composition/ (Video compositions)
│   └── styles/
├── skills/
│   ├── remotion-dev--skills/ (Big 4: Remotion)
│   ├── vercel-labs--agent-skills--react/ (Big 4: React)
│   ├── vercel-labs--next-skills--next/ (Big 4: Next.js)
│   ├── vercel-labs--agent-skills--design/ (Big 4: Design)
│   └── viron-system/ (Our custom skill)
├── ./_knowledge/ (Generated local documentation)
├── ./_archive/ (Archived files - don't touch unless you know why)
├── shared/
│   └── design-tokens.ts (Button glow magic - SHARED between video + web)
└── .docs/
    ├── SKILL-INSTALLATION-GUIDE-v1.md ← Start planning here
    ├── COMPARE-AGENT-PROMPT-TEMPLATE-v1.md
    ├── VIRON-DELTA-SKILL-STRUCTURE-v1.md
    ├── ORCHESTRATOR-AGENT-SETUP-GEMINI-3-PRO-v1.md
    ├── SUB-AGENT-DELEGATION-MATRIX-v1.md
    ├── ZUKUNFTSPLAN-*.md (Future phases)
    ├── ARCHIV-POLICY-v1.md
    ├── SKILL-QUALITY-AUDIT-CHECKLIST-v1.md
    ├── AGENT-OUTPUT-VALIDATION-v1.md
    └── THIS FILE
```

---

## 🚀 Die Workflow-Übersicht

### Workflow 1: User macht eine Anfrage

```
User: "Erstelle einen glänzenden Button für Video und Web"
  ↓
ORCHESTRATOR-AGENT (Gemini 3 Pro)
  ├─ Liest: ORCHESTRATOR-AGENT-SETUP-GEMINI-3-PRO-v1.md (Prompt)
  ├─ Nutzt: SUB-AGENT-DELEGATION-MATRIX-v1.md (Routing-Tabelle)
  └─ Ladet: skills/ (Big 4 + viron-system)
  ↓
Delegates to 3 Sub-Agents:
  ├─ Remotion Specialist (video button)
  ├─ React Expert (web button)
  └─ Design Auditor (consistency)
  ↓
Combines outputs + validates with:
  └─ AGENT-OUTPUT-VALIDATION-v1.md
  ↓
Returns to User: 3 code snippets (all consistent)
```

### Workflow 2: Agent wird halluzinös

```
Agent: "Hier ist ein Button mit `remotion.setGlowRadius()`"
  ↓
You check: AGENT-OUTPUT-VALIDATION-v1.md
  ├─ API Existence Check
  └─ Result: ❌ `setGlowRadius()` existiert nicht!
  ↓
You restart agent with:
  "Only use APIs documented in skills.sh.
   Check AGENT-OUTPUT-VALIDATION-v1.md before responding."
```

### Workflow 3: System wächst (Phase B)

```
Timeline: Feb 2026
Action: Start Phase B (Next.js App Shell + Player)
  ↓
Check: ZUKUNFTSPLAN-APP-SHELL-NEXT-JS-v1.md
  ↓
Read: SKILL-INSTALLATION-GUIDE-v1.md
  └─ (Already have all 4 skills, good!)
  ↓
Check: SUB-AGENT-DELEGATION-MATRIX-v1.md
  ├─ New route: "Landing page with player"
  └─ (Add routing logic for Landing Architect)
  ↓
Continue: Existing orchestrator, just expanded
```

---

## 🔑 Kritische Dateien (In dieser Reihenfolge lesen)

1. **START:** `README.md` (Projekt-Übersicht)
2. **PLAN:** `SKILL-INSTALLATION-GUIDE-v1.md` (Welche Skills?)
3. **BUILD:** `VIRON-DELTA-SKILL-STRUCTURE-v1.md` (Lokaler Custom Skill)
4. **ORCHESTRATE:** `ORCHESTRATOR-AGENT-SETUP-GEMINI-3-PRO-v1.md` (Chef-Agent)
5. **ROUTE:** `SUB-AGENT-DELEGATION-MATRIX-v1.md` (Wer macht was?)
6. **VALIDATE:** `AGENT-OUTPUT-VALIDATION-v1.md` (Ist das Ergebnis gut?)
7. **FUTURE:** `ZUKUNFTSPLAN-*.md` (Was kommt später?)

---

## ⚙️ Tägliche Operationen

### Morning: Agent starten

```bash
# 1. Check all skills are loaded
ls -la ./skills/
# Should show: remotion-dev, vercel-labs-react, vercel-labs-next, viron-system

# 2. Verify Gemini 3 Pro connectivity
# (In AntiGravity UI, check model dropdown)

# 3. Load orchestrator prompt
# (Open: .docs/ORCHESTRATOR-AGENT-SETUP-GEMINI-3-PRO-v1.md)
# Copy-paste into AntiGravity Manager

# 4. Ready to go!
```

### During Day: New Request

```bash
# 1. User makes request in AntiGravity
# 2. Orchestrator analyzes, routes to sub-agents
# 3. You get outputs
# 4. Quick validation (see AGENT-OUTPUT-VALIDATION-v1.md)
# 5. Done or iterate
```

### Weekly: Archive Check

```bash
# 1. Check if any local files became redundant
#    (New skill rule covers something)
# 2. Move redundant → ./_archive/redundant/
# 3. Commit: git add _archive && git commit -m "Archive cleanup"
```

### Monthly: Token Audit

```bash
# 1. Count total tokens used this month
# 2. Check if approaching rate limits
# 3. Consider archiving old context if >950k tokens
# 4. Refresh context with `SKILL-INSTALLATION-GUIDE-v1.md` guide
```

---

## 🐛 Troubleshooting (Häufige Probleme)

### Problem: "Agent sagt, das Skill existiert nicht"
**Solution:**
1. Check: `ls -la ./skills/remotion-dev--skills/`
2. If missing: `npx skills add remotion-dev/skills`
3. Reload AntiGravity

### Problem: "Button in Video ≠ Button in Web"
**Solution:**
1. Check: `shared/design-tokens.ts`
2. Are tokens imported in both files?
3. Are glowBlur values identical?
4. See: `ZUKUNFTSPLAN-DESIGN-KONSISTENZ-VIDEO-WEB-v1.md`

### Problem: "Agent output is slow/incomplete"
**Solution:**
1. Check token budget: `AGENT-OUTPUT-VALIDATION-v1.md`
2. If >900k: Clear old context, reload skills
3. If stuck: Restart orchestrator with fresh prompt

### Problem: "I don't know what to do next"
**Solution:**
1. **Read the README** (not this file!)
2. Choose a workflow above
3. Follow the numbered steps
4. If stuck on specifics, check the corresponding `.docs/` file

---

## 📞 Important Contacts / Resources

- **Remotion Docs:** https://remotion.dev/docs
- **skills.sh:** https://skills.sh
- **Vercel Docs:** https://vercel.com/docs
- **AntiGravity Docs:** [Your internal wiki]
- **GitHub Repo:** [Your repo URL]

---

## ✅ Quick Checklist: "Am I Ready?"

Before you start working:
- [ ] Cloned the repo
- [ ] Read `.docs/README.md` (not this file!)
- [ ] Skills loaded (`npx skills add ...`)
- [ ] Gemini 3 Pro available in AntiGravity
- [ ] Orchestrator prompt copied
- [ ] Can see `.docs/` folder with all 13 files

If all ✅: You're ready!

---

**Version:** v1.0 (29. Jan 2026)  
**Last Updated:** 29. Jan 2026  
**Maintained By:** [Your Team]

---

**Remember:** This is NOT a getting-started guide. This is a "I'm new, where do I find things?" guide. **Start with README.md first!**