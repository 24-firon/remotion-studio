# Design Extraction: Website to Tokens via Firecrawl

> **Source:** [19_ARCHIVE_Standard_Design_Extraction_Firecrawl.md](file:///C:/Viron/90_VAULT/NEW%20SUFF/Remotion/19_ARCHIVE_Standard_Design_Extraction_Firecrawl.md) (16.5 KB)

---

## Concept

Extract design tokens (colors, fonts, spacing) from any website URL to create matching video branding automatically.

---

## Pipeline

```
Website URL → Firecrawl Scrape → CSS Analysis → Design Tokens JSON → Remotion Theme
```

---

## Output Schema

```typescript
interface ExtractedDesignTokens {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
    baseSize: number;
  };
  spacing: {
    unit: number;
    scale: number[];
  };
  brand: {
    logoUrl?: string;
    faviconUrl?: string;
  };
}
```

---

## Firecrawl Integration

```typescript
import Firecrawl from "@mendable/firecrawl-js";

async function extractDesign(url: string): Promise<ExtractedDesignTokens> {
  const app = new Firecrawl({ apiKey: process.env.FIRECRAWL_API_KEY });
  const result = await app.scrapeUrl(url, {
    formats: ["html"],
    actions: [{ type: "screenshot" }],
  });

  // Parse computed styles from HTML
  return parseDesignTokens(result.html);
}
```

---

## Rules

- ✅ Cache extracted tokens (don't re-scrape)
- ✅ Validate contrast ratios (WCAG)
- ❌ NEVER use extracted assets without permission check
