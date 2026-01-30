# Auto-Edit Standard: Whisper Transcription Pipeline

> **Source:** [17_ARCHIVE_Standard_AutoEdit_Whisper.md](file:///C:/Viron/90_VAULT/NEW%20SUFF/Remotion/17_ARCHIVE_Standard_AutoEdit_Whisper.md) (19.4 KB)

---

## Concept

Whisper transcription enables automated editing by identifying:

- Bad takes (stammering, restarts)
- Silence gaps (cuttable)
- Chapter markers (topic changes)

---

## Pipeline

```
Raw Recording → Whisper API → JSON Transcript → Edit Decision List → Remotion Timeline
```

---

## Data Structure

```typescript
interface WhisperSegment {
  start: number; // seconds
  end: number; // seconds
  text: string;
  confidence: number; // 0-1
  isGood: boolean; // derived: confidence > 0.85
}

interface EditDecision {
  type: "keep" | "cut" | "silence";
  startFrame: number;
  endFrame: number;
  reason: string;
}
```

---

## Bad Take Detection

Patterns that trigger `isGood: false`:

- Repeated words within 2 seconds
- "uh", "um", "äh" filler words
- Confidence < 0.7
- Unusual pause > 3 seconds mid-sentence

---

## Remotion Integration

```typescript
// Generate Sequences from EditDecisions
const sequences = editDecisions
  .filter(d => d.type === 'keep')
  .map((d, i) => (
    <Sequence key={i} from={d.startFrame} durationInFrames={d.endFrame - d.startFrame}>
      <Video src={rawFootage} startFrom={d.startFrame} />
    </Sequence>
  ));
```

---

## Rules

- ✅ ALWAYS review auto-cuts before final render
- ✅ ALWAYS keep original footage (non-destructive)
- ❌ NEVER auto-publish without human review
