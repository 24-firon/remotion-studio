# 💎 AGENT GOVERNANCE: PROJECT RULES

> **Single Source of Truth for Agent Behavior.**

## 🛡️ 1. SECURITY SCOPING (MANDATORY)

- **Root Lock:** You are strictly bound to the project root.
- **Parent Access:** **FORBIDDEN**. Do not search `../` or `C:/`.
- **Failure Protocol:** If a file is missing, STOP and ask. Do not guess.

---

## ⚙️ 2. ANIMATION PHYSICS (The "No-CSS" Law)

> **"If it moves, it has mass."**

- **Engine:** Remotion (Frame-based, Deterministic 60FPS).
- **Global Ban:** CSS Transitions/Keyframes are STRENGSTENS VERBOTEN for motion.
- **Mandate:** 100% usage of `spring()` mechanics and `interpolate()`.
- **Reasoning:** Deterministic rendering at 60FPS requires frame-based logic, not time-based logic.

---

## 🎨 3. VISUAL STANDARDS (The "High-PBR" Law)

### 3.1 Philosophy: The Industrial Monolith

- **Core Metaphor:** We are not building "web pages". We are simulating heavy, machined industrial objects.
- **Sanity Check:** Before shipping, ask: _"Does this look like a SaaS dashboard or a cartoon?"_
  - If Cartoon → **DELETE.**
  - If SaaS → **SHIP.**

### 3.2 Materials

- **Tone Mapping:** `AgX` (or equivalent High-Contrast) is mandatory.
- **Lighting:** HDRI (`Environment`) is the primary source. Manual lights only for emphasis.
- **Geometry:** `CapsuleGeometry` > `RoundedBox` (No artifacts).
- **Material:** `metalness: 1.0`, `roughness: 0.1` (The Chrome Standard).

### 3.3 Concepts

- **Hydraulic Coupling:** Elements do not just "appear". They slide out, push others aside, or unfold.
- **Mandatory Drift:** Static scenes look like errors. Add subtle `sin(time)` drift.

---

## 📦 4. ARCHITECTURE

- **Portability:** Components must be `@remotion/player` compatible.
- **No Node-Only:** No `fs`, `path` in rendering components. Use `staticFile()`.

---

## 📜 5. WORKFLOW (The "Talk-Before-Act" Law)

- **Planning:** Never code without a plan.
- **Approval:** Wait for "Go" or "Passt" from the user.
- **Verification:** Read the file before you edit it. Verify the edit after you write it.

---

## 🛡️ 6. INTEGRITY (The "Anti-Lazy" Law)

- **Anti-Skimming:** Never guess content. Read the file.
- **Context:** Do not read `package-lock.json` (Token Waste). Focus on `package.json` and source code.
- **Stop Signal:** If the user says "STOP", you FREEZE.

---

## 💬 7. COMMUNICATION STANDARDS

1.  **Copy-Ready Blocks:** Every file path, command, or code snippet MUST be in a code block.
2.  **No Prose-Fluff:** Do not say "I hope this helps". Say "Action Complete."
3.  **Proof of Work:** Always cite Line Numbers. "As seen in line 167" > "As seen in the file".

---

_Consolidated from: `THE_VIRON_AESTHETIC_MANIFESTO.md`, `gemini.md`, `USER_GOVERNANCE_PROTOCOL.md`_
