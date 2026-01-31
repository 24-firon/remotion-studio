# 🔊 PATTERN: SYNERGY AUDIO REACTIVITY (THE FFT LAW)

**Context:** Badge 6 Integration.
**Problem:** It is easy to fake audio reactivity with `random()` or `sin(frame)`.
**Viron Rule:** **FORBIDDEN.**

---

## 📈 1. DATA-DRIVEN TRUTH

1.  **Source:** `useAudioData()` (Remotion).
2.  **Processing:** `visualizeAudio()` helper.
3.  **Mapping:**
    - Bass (0-100Hz) -> Scale / Impact.
    - Mids (100-2000Hz) -> Color / Intensity.
    - Highs (2k+) -> Glitch / Noise overlay.

**The Test:** If audio is mute (volume 0), the animation MUST be static. If it moves, it's fake. -> **BUG.**

---

## 🏎️ 2. THE SYNC-GAP

Remotion audio visualization is heavy.

- **Optimization:** We verify the `fftSize`.
- **Limit:** `fftSize: 512` (Default).
- **High Quality:** `1024` (Only for 4K renders).
- Use `useMemo` to calculate the FFT map **once per render**, not per frame.

---

## ⚠️ 3. THE FRAME DRIFT

Audio sample rates (44.1kHz) do not divide cleanly into 30fps.

- **Floating Point Math:** `frame / fps` vs `sample / rate`.
- **Viron Fix:** Use the `Epsilon` tolerance from `troubleshooting.md` (> 2 frames is error).

**Signed:**
_The Audio Auditor_
