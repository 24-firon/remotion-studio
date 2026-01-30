# Caption Engine: Neon Kinetic Typography

> **Source:** [18_ARCHIVE_Standard_Caption_Engine.md](file:///C:/Viron/90_VAULT/NEW%20SUFF/Remotion/18_ARCHIVE_Standard_Caption_Engine.md) (13.7 KB)

---

## Concept

Neon-style captions with kinetic typography for TikTok/Reels format. Words animate in sync with speech using Whisper timestamps.

---

## Visual Specifications

| Property  | Value                          |
| --------- | ------------------------------ |
| Font      | Inter Bold / Outfit Black      |
| Size      | 48-72px (mobile-first)         |
| Color     | White with colored highlight   |
| Highlight | Current word gets accent color |
| Shadow    | 0 4px 20px rgba(accent, 0.5)   |
| Animation | Scale 1.0 → 1.1 on highlight   |

---

## Chunking Logic

```typescript
// Max 3-4 words per caption chunk
function chunkTranscript(segments: WhisperSegment[]): CaptionChunk[] {
  const MAX_WORDS = 4;
  const MAX_DURATION_SEC = 2.5;

  // Group words into readable chunks
  // Break on punctuation or natural pauses
}
```

---

## Code Blueprint

```typescript
const CaptionWord: React.FC<{word: string; isActive: boolean}> = ({word, isActive}) => {
  const frame = useCurrentFrame();
  const scale = isActive ? spring({frame, fps: 30, config: {damping: 12}}) * 0.1 + 1 : 1;

  return (
    <span style={{
      transform: `scale(${scale})`,
      color: isActive ? 'var(--accent)' : 'white',
      textShadow: isActive ? '0 4px 20px var(--accent-glow)' : 'none',
    }}>
      {word}
    </span>
  );
};
```

---

## Rules

- ✅ Use `useCurrentFrame()` for all animation
- ✅ Chunk at natural speech breaks
- ❌ NEVER exceed 4 words per chunk
- ❌ NEVER use CSS transitions
