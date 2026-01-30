# Synergy: Data-Driven Video Personalization

> **Source:** [90-synergy-01-data-driven-personalization.md](file:///C:/Viron/90_VAULT/NEW%20SUFF/Remotion/90-synergy-01-data-driven-personalization.md) (15.7 KB)

---

## Concept

Render unique videos per viewer by injecting personalized data (name, company, metrics) into templates.

---

## Methods

| Method                 | Use Case                        | Complexity |
| ---------------------- | ------------------------------- | ---------- |
| **Text Injection**     | "Hi {name}!" greeting           | Low        |
| **Data Visualization** | Custom charts per user          | Medium     |
| **Scene Selection**    | Different content per segment   | High       |
| **Full Dynamic**       | Entire video generated per user | Very High  |

---

## Architecture

```
CRM Data → API Gateway → Remotion Lambda → Personalized Video → Email/Landing Page
```

---

## Implementation Pattern

```typescript
interface PersonalizationProps {
  recipientName: string;
  companyName: string;
  metrics: {
    revenue: number;
    growth: number;
  };
  segment: 'enterprise' | 'smb' | 'startup';
}

const PersonalizedVideo: React.FC<PersonalizationProps> = (props) => {
  // Select scene based on segment
  const Scene = segmentScenes[props.segment];

  return (
    <Composition>
      <GreetingSequence name={props.recipientName} />
      <Scene metrics={props.metrics} />
      <CTASequence company={props.companyName} />
    </Composition>
  );
};
```

---

## Use Cases

1. **Sales Outreach:** Personalized demo videos per prospect
2. **Customer Success:** Quarterly review videos with their data
3. **Marketing:** Segment-specific product announcements

---

## Rules

- ✅ Validate all input data before render
- ✅ Have fallback values for missing data
- ❌ NEVER render PII without consent verification
