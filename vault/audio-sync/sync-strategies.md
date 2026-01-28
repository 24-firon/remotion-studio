# Vault Concept: Audio-Synchronization & Reactive Physics

## 🎼 Kern-Strategien

### 1. Lip-Sync (Sprach-Animation)

- **Frequenz**: Mitten (500Hz - 2kHz).
- **Mapping**: Energie-Level steuert Morph-Targets der Mund-Geometrie.
- **Ziel**: Realistische Sprachbewegung ohne manuelles Keyframing.

### 2. Rhythmische Physik (Beat-Dancing)

- **Bass (Kick)**: Impulskraft auf Geometrie-Scale oder Sprungkraft.
- **Snare**: Kamera-Shake oder Material-Emissive-Flash.
- **Hi-Hats**: Diskrete Partikel-Emmisionen für "Zischen".

### 3. Material-Reaktivität

- Nutzung des **Eye Candy Stacks** (CSM).
- Shader-Parameter (z.B. `uTime` oder Glanz-Intensität) werden durch die Audio-Amplitude moduliert.

---

**Status:** DRAFT | **Priority:** MEDIUM
