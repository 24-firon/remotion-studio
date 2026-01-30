# Audio Standard: Broadcast via Auphonic

> **Source:** [16_ARCHIVE_Standard_Audio_Auphonic.md](file:///C:/Viron/90_VAULT/NEW%20SUFF/Remotion/16_ARCHIVE_Standard_Audio_Auphonic.md) (12.8 KB)

---

## Concept

Auphonic is the standard for broadcast-ready audio processing in Viron productions. All audio output MUST pass through Auphonic before final render.

---

## Target Specifications

| Parameter           | Value     | Reason                    |
| ------------------- | --------- | ------------------------- |
| **Loudness**        | -16 LUFS  | YouTube/Podcast standard  |
| **True Peak**       | -1.5 dBTP | Headroom for lossy codecs |
| **Noise Reduction** | Auto      | Auphonic AI handles this  |
| **Leveling**        | Adaptive  | Multi-speaker leveling    |

---

## API Integration

```typescript
// Auphonic API call pattern
const auphonicPreset = {
  output_loudness: -16,
  output_loudness_mode: "ebu_r128",
  noise_reduction: true,
  adaptive_leveler: true,
  filtering: true,
};
```

---

## Remotion Integration

1. Render video with raw audio
2. Extract audio track
3. Process via Auphonic API
4. Mux processed audio back to video

---

## Rules

- ❌ NEVER skip Auphonic for public-facing content
- ❌ NEVER manually adjust loudness after Auphonic
- ✅ ALWAYS use -16 LUFS for YouTube
- ✅ ALWAYS use -14 LUFS for Spotify podcasts
