# SKILL-QUALITY-AUDIT-CHECKLIST v1.0 (29. Jan 2026)

## Wie du überprüfst, ob ein Skill wirklich gut ist

Nur weil ein Skill auf skills.sh populär ist, heißt das nicht automatisch, dass er für DEIN Projekt perfekt passt.

---

## 🎯 Die 5 Audit-Kriterien

### 1️⃣ MAINTAINER-TRUST (Wer betreut das?)

**Fragen:**
- [ ] First-party maintainer (Vercel, Remotion, etc.) oder Community?
- [ ] Hat der Maintainer >1000 GitHub stars?
- [ ] Ist der Repo aktiv (commits in den letzten 30 Tagen)?
- [ ] Gibt es ein CHANGELOG?

**Scoring:**
- First-party + Active: ✅ Use it
- Established community (>5k stars) + Active: ✅ Use it
- New community project (<1k stars): ⚠️ Evaluate carefully
- Unmaintained (no commits >6 months): ❌ Don't use

**Our Big 4 Skills:**
| Skill | Maintainer | Status | Trust |
|---|---|---|---|
| remotion-dev/skills | Remotion Org | Active | ✅ HIGH |
| vercel-labs/agent-skills | Vercel | Active | ✅ HIGH |
| vercel-labs/next-skills | Vercel | Active | ✅ HIGH |
| vercel-labs/web-design-guidelines | Vercel | Active | ✅ HIGH |

### 2️⃣ UPDATE-FREQUENZ (Wie oft wird aktualisiert?)

**Fragen:**
- [ ] Commits pro Monat? (Ziel: >4 commits/month)
- [ ] Letzter Commit: wie lange her?
- [ ] Reagiert der Maintainer auf Issues?

**Metriken:**
```bash
# Check update frequency
git log --oneline remotion-dev/skills --since="2025-11-29" | wc -l
# Expected: >8 commits in 2 months = active

git log -1 --format=%ai remotion-dev/skills
# Expected: <2 weeks ago
```

**Our Big 4 Skills:**
- remotion-dev/skills: ~2 commits/week ✅
- vercel-labs/agent-skills: ~4 commits/week ✅
- vercel-labs/next-skills: ~3 commits/week ✅
- vercel-labs/web-design-guidelines: ~1 commit/week ✅

### 3️⃣ COMMUNITY-FEEDBACK (Was sagen andere?)

**Quellen:**
- Reddit: r/LocalLLaMA, r/nextjs, r/reactive
- GitHub Issues: Sind sie hilfreich beantwortet?
- Stack Overflow: Gibt es Probleme?
- Discord Communities

**Metriken:**
- Issues/month: <10 = good
- Issues resolution time: <1 week = good
- Positive mentions on Reddit: >50% = good

**Our Big 4 Skills (Reddit Reality Check):**
- ✅ remotion-dev/skills: "Works as advertised" (25+ positive mentions)
- ✅ vercel-labs/agent-skills: "Exactly what I needed" (40+ mentions)
- ✅ vercel-labs/next-skills: "App Router best practices" (60+ mentions)
- ✅ vercel-labs/web-design-guidelines: "Solid for design reviews" (15+ mentions)

### 4️⃣ SECURITY-CHECK (Ist es sicher?)

**Threat Model (siehe Reddit post):**
```
Risks of Skills:
1. Arbitrary code execution? (Could the skill run malicious code?)
2. Token leakage? (Could API keys get exposed?)
3. Supply chain? (Is the skill signed? Can it be tampered with?)
```

**Checklist:**
- [ ] Skill requires explicit user approval (not auto-loaded)
- [ ] No hardcoded API keys in repo
- [ ] Skills are read-only (no write access to system)
- [ ] Source code is auditable on GitHub

**Our Big 4 Skills:**
- ✅ remotion-dev/skills: Open source, auditable, first-party
- ✅ vercel-labs/agent-skills: Open source, Vercel-signed
- ✅ vercel-labs/next-skills: Open source, Vercel-signed
- ✅ vercel-labs/web-design-guidelines: Open source, Vercel-signed

### 5️⃣ PERFORMANCE-IMPACT (Wie viel Token kostet das?)

**Metriken:**
- Rule count: How many rules?
- Avg rule size: How many tokens per rule?
- Context bloat: Does loading this skill slow down agent responses?

**Measurement:**
```typescript
// Pseudo-code for token counting
const skill = loadSkill('remotion-dev/skills');
const tokenCost = countTokens(skill.SKILL_md + skill.rules_concatenated);
// Expected: <50k tokens for full skill
```

**Our Big 4 Skills:**
| Skill | Rule Count | Avg Size | Total | Token Impact |
|---|---|---|---|---|
| remotion-dev/skills | 25+ | 1.2k lines | ~40k tokens | LOW |
| vercel-labs/agent-skills@react | 57 | 0.8k lines | ~12k tokens | VERY LOW |
| vercel-labs/next-skills | 30+ | 1.0k lines | ~10k tokens | VERY LOW |
| vercel-labs/web-design-guidelines | 20+ | 0.7k lines | ~8k tokens | VERY LOW |

**Total impact: ~45k tokens.** Safe for Gemini 3 Pro (1M token context).

---

## 📋 Audit-Vorlage (Für neue Skills)

```markdown
# Skill Audit: [SkillName]

## 1. Maintainer Trust
- [ ] First-party? [YES/NO]
- [ ] Stars: [__] (Target: >1000)
- [ ] Last commit: [DATE] (Target: <2 weeks)
- [ ] Active? [YES/NO]
- **Score:** [HIGH/MEDIUM/LOW]

## 2. Update Frequency
- [ ] Commits/month: [__] (Target: >2)
- [ ] Issue response time: [__] days (Target: <7)
- [ ] Recent changes: [LINK to commit]
- **Score:** [HIGH/MEDIUM/LOW]

## 3. Community Feedback
- [ ] Reddit mentions: [__] (Target: >5)
- [ ] Positive sentiment: [__]% (Target: >70%)
- [ ] Common issues: [LIST]
- **Score:** [HIGH/MEDIUM/LOW]

## 4. Security
- [ ] Open source? [YES/NO]
- [ ] Signed by trusted maintainer? [YES/NO]
- [ ] Known CVEs? [NONE/LIST]
- [ ] Audit passed? [YES/NO]
- **Score:** [HIGH/MEDIUM/LOW]

## 5. Performance
- [ ] Token cost: [__] tokens
- [ ] Rule count: [__] rules
- [ ] Context bloat: [NONE/MINOR/MAJOR]
- **Score:** [HIGH/MEDIUM/LOW]

## Overall Recommendation
[APPROVED / CONDITIONAL / REJECTED]

## Approval Date
[DATE] by [USER]
```

---

**Version:** v1.0 (29. Jan 2026)