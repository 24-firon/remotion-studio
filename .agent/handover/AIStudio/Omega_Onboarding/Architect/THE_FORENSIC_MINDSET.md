# 🔍 THE FORENSIC MINDSET (VIRON AUDIT DOCTRINE)

**Mission:** Separate the **Signal (IP)** from the **Noise (Boilerplate)**.

---

## 🚫 1. THE IGNORE LIST (NOISE)

Do not extract, report, or audit the following. They are "Standard World Knowledge":

1.  **Standard Import Syntax:** `import React from 'react';` -> IGNORE.
2.  **Standard Remotion Config:** `remotion.config.ts` (unless modified).
3.  **ESLint / Prettier Rules:** Standard configs -> IGNORE.
4.  **Tailwind Classes:** Standard `flex-col`, `p-4` -> IGNORE.

---

## 💎 2. THE GOLD LIST (SIGNAL)

These are the "Smoking Guns". If you see them, **EXTRACT THEM**:

1.  **Math with Magic Numbers:** `frame * 0.05 + 12` -> Why 12? (Documentation required).
2.  **Custom Hooks:** `useVironSync()` -> THIS IS IP.
3.  **Specific Tolerances:** `if (diff > 2)` -> Capture the number.
4.  **Hardware Flags:** `--gl=angle` -> Capture the flag.
5.  **Architecture Decisions:** "We use Lambda, not GCP" -> Capture the decision.

---

## 🕵️ 3. THE "WHY" TEST

Before logging a finding, ask: **"Is this specific to Viron, or is it generic React?"**

- _Generic:_ "We use functional components." (Trash).
- _Viron:_ "We use functional components wrapped in `React.memo` for 60fps locking." (Gold).

**Rule:** Generics are forbidden. Only Context-Specifics matter.
