# 📊 EXTRACTION REPORT: BADGE 7 (SYSTEM ARCHITECTURE)

**Status:** ✅ FINAL
**Auditor:** SYSTEM_ARCHITECT_V2
**Source Quality:** 100% (Verifiziertes System-IP)

---

## 🏆 MITNEHMEN (Viron-Spezifisches IP)

### 1. Concurrency Calculation Logic

**Quelle:** `viron-core/pipeline.md` (Zeilen 163-169)
**Typ:** SYSTEM_CONFIG
**Skill-Check:** [x] NEIN (Remotion docs sagen nichts über `ramGB / 2`)

**Kontext:**
Viron nutzt eine aggressive RAM-Limitierung (halber RAM pro Render), um OOM-Kills bei 4K-Rendern zu verhindern.

**Code:**

```typescript
const optimalConcurrency = Math.floor(availableCPUs * 1.5);
const ramLimit = Math.floor(ramGB / 2); // Halbes RAM für Rendering
const recommendedConcurrency = Math.min(optimalConcurrency, ramLimit, 16);
```

### 2. Forensic Git-Flow

**Quelle:** `viron-core/workflow.md` (Zeilen 87-111)
**Typ:** GOVERNANCE_RULE
**Skill-Check:** [x] NEIN (Git-Flow ist Projekt-Standard, nicht Skill)

**Kontext:**
Definiert die exakte Nomenklatur für Branches und Commits, die für die CI/CD-Pipeline zwingend sind.

**Daten:**

- **Release:** `release/v1.0.0`
- **Feature:** `feature/video-glints`
- **Chore:** `chore/dependencies`

### 3. Sync Validator Tolerance

**Quelle:** `viron-core/troubleshooting.md` (Zeilen 177-184)
**Typ:** ERROR_HANDLING
**Skill-Check:** [x] NEIN (Custom Validator)

**Kontext:**
Viron erlaubt eine Abweichung von maximal 2 Frames zwischen Audio und Video, bevor der Render abgebrochen wird.

**Code:**

```typescript
if (Math.abs(expectedFrames - actualFrames) > 2) {
  console.error("SYNC ERROR");
  return false;
}
```

### 4. Integration Snippet Rule

**Quelle:** `.knowledge/archive/vault-analysis/core/integration-protocol.md` (Zeilen 36-43)
**Typ:** AGENT_GOVERNANCE
**Skill-Check:** [x] NEIN (Meta-Regel)

**Kontext:**
Verbietet das blinde Importieren ganzer Dateien. Verlangt "Micro-File Extraction" für neue Erkenntnisse.

**Regel:**
"Do not import giant files. Extract only the unique value. Scan for Code Blocks -> Extract to micro-file."

---

## 🗑️ VERWORFEN (Skill-Redundanzen & Legacy)

| Fund                          | Quelle                    | Steht bereits in Skill (Global/Local) | Entscheidung          |
| :---------------------------- | :------------------------ | :------------------------------------ | :-------------------- |
| `startFrom`/`endAt` Erklärung | `trimming.md` (Legacy)    | `rules/trimming.md`                   | ❌ DROP (Redundant)   |
| Basic `getInputProps`         | `parameters.md` (Legacy)  | `rules/parameters.md`                 | ❌ DROP (Redundant)   |
| Standard `renderMedia` API    | `pipeline.md` (Z. 77-108) | `remotion-core`                       | ❌ DROP (Basic API)   |
| ESLint Config                 | `workflow.md` (Z. 63)     | Standard Next.js/Remotion Config      | ❌ DROP (Boilerplate) |

---

## 🏁 FAZIT

Badge 7 enthielt kritisches "Betriebssystem-Wissen" (Concurrency, Git-Flow, Gov-Regeln), aber auch viel Boilerplate (Linter-Configs, Basic API Calls).
Die extrahierten "Smoking Guns" bilden das Fundament für die Viron-Governance V2.3.
