# ARCHIVE: Website Design System Extraction (Firecrawl) Standard
## [Jack Roberts / AntiGravity Setup Analysis]

**Status:** REFERENCE ARCHIVE | AUTOMATION STANDARD  
**Erstellt:** 2026-01-29  
**Quelle:** `Remotion-Setup.md.txt` (Jack Roberts) + Firecrawl API Docs  
**Kategorie:** Web Scraping | Design System | Automation  
**Relevanz für Viron:** ⭐⭐⭐⭐⭐ CRITICAL

---

## 🎯 Mission Statement

Eine Website ist ein **Design System**, das nur versteckt ist.

**Jack Roberts' Vision:** Gib mir eine URL. Ich analysiere sie. Ich extrahiere dein Design-System (Farben, Fonts, Radii, Shadows). Ich baue daraus ein **Remotion Video**, das deine Marke feiert – alles **automatisch**, ohne dass du eine Designerin einstellen musst.

Das ist **"Branding as Code"**. Website → API → JSON → Video.

---

## 1️⃣ Das Konzept: "Reverse-Engineer dein Design System"

### Der Workflow

```
Input: https://glaido.com
    ↓
[1] Firecrawl scrapt die Website (LLM-ready Markdown)
    ↓
[2] Claude analysiert die Markdown → identifiziert Design Tokens
    ↓
[3] Puppeteer validiert die Tokens (Computed Styles)
    ↓
[4] JSON exportieren (theme.ts Format)
    ↓
[5] Remotion nutzt JSON → generiert 15-16s Showcase Video
    ↓
Output: {website-name}-design-system.mp4
```

---

## 2️⃣ Schritt 1: Firecrawl (Die Web-Data API)

### Was ist Firecrawl?

**Nicht** wie normales Web-Scraping (Puppeteer, Beautifulsoup).

**Firecrawl ist optimiert für LLMs:**
- Gibt sauberes **Markdown** statt rohes HTML
- Erhält **Struktur** (Headings, Lists, Links)
- Filtert **Boilerplate** (Navigation, Footer-Clutter)
- Macht **Kurz-Zusammenfassungen** automatisch

### Firecrawl API Call

```python
import requests
import json
from typing import Dict

def scrape_website_with_firecrawl(url: str) -> Dict:
    """
    Nutzt Firecrawl, um eine Website zu scrapen.
    Gibt strukturierte LLM-ready Daten zurück.
    """
    
    api_key = os.environ.get("FIRECRAWL_API_KEY")
    
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "url": url,
        "formats": ["markdown", "json"],  # Get both markdown + structured
        "onlyMainContent": True,          # Skip navigation/footer
        "waitFor": 1000,                  # Wait 1s for JS to render
        "timeout": 30000,                 # 30s max
    }
    
    response = requests.post(
        "https://api.firecrawl.dev/v1/scrape",
        headers=headers,
        json=payload
    )
    
    if response.status_code != 200:
        raise Exception(f"Firecrawl Error: {response.text}")
    
    data = response.json()
    
    return {
        "url": url,
        "markdown": data.get("markdown", ""),
        "json": data.get("json", {}),
        "metadata": data.get("metadata", {})
    }

# Usage
result = scrape_website_with_firecrawl("https://glaido.com")
print(result["markdown"])  # LLM-ready text
```

### Output-Struktur

```markdown
# Glaido

Glaido ist eine **moderne Design Platform** für...

## Features
- Color system mit 8 Primärfarben
- Typography: Montserrat Bold, Roboto Regular
- Spacing: 8px Grid
- Border Radius: 4px (sharp), 8px (cards), 16px (buttons)

### Color Palette
- Primary: #3B82F6 (Blue)
- Secondary: #8B5CF6 (Purple)
- Danger: #EF4444 (Red)
- ...

### Typography Styles
- H1: Montserrat, 32px, Bold
- Body: Roboto, 14px, Regular
- ...
```

---

## 3️⃣ Schritt 2: Claude analysiert → Tokens extrahieren

### Der LLM Prompt (für Claude)

```python
def extract_design_tokens_with_claude(markdown_content: str) -> Dict:
    """
    Nutzt Claude API, um Design Tokens aus der Markdown zu extrahieren.
    """
    
    prompt = f"""
Analysiere diese Website-Dokumentation und extrahiere ALLE Design Tokens.

Dokumentation:
---
{markdown_content}
---

Gib ein strukturiertes JSON zurück mit diesen Kategorien:

{{
  "colors": {{
    "primary": ["#3B82F6", "Primary Brand Color"],
    "secondary": ["#8B5CF6", "Secondary"],
    ...
  }},
  "typography": {{
    "heading": {{"fontFamily": "Montserrat", "fontSize": 32, "fontWeight": 700}},
    "body": {{"fontFamily": "Roboto", "fontSize": 14, "fontWeight": 400}},
    ...
  }},
  "spacing": {{
    "base": 8,
    "unit": "px",
    "scale": [4, 8, 12, 16, 24, 32, 48]
  }},
  "borderRadius": {{
    "sharp": 4,
    "default": 8,
    "rounded": 16
  }},
  "shadows": {{
    "light": "0px 1px 3px rgba(0,0,0,0.1)",
    "medium": "0px 4px 12px rgba(0,0,0,0.15)",
    "heavy": "0px 12px 24px rgba(0,0,0,0.2)"
  }}
}}

WICHTIG:
- Nur Tokens, die in der Doku erwähnt werden
- Hex-Farben, nicht RGB
- Alle Werte mit Einheiten
- Keine Halluzinationen: Nur das, was dokumentiert ist
"""
    
    response = client.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=2000,
        messages=[
            {"role": "user", "content": prompt}
        ]
    )
    
    # Parse JSON from response
    tokens_json = json.loads(response.content[0].text)
    return tokens_json
```

### Claude Output (Beispiel)

```json
{
  "colors": {
    "primary": "#3B82F6",
    "secondary": "#8B5CF6",
    "success": "#10B981",
    "danger": "#EF4444",
    "warning": "#F59E0B"
  },
  "typography": {
    "heading": {
      "fontFamily": "Montserrat",
      "fontSize": 32,
      "fontWeight": 700,
      "lineHeight": 1.2
    },
    "body": {
      "fontFamily": "Roboto",
      "fontSize": 14,
      "fontWeight": 400,
      "lineHeight": 1.5
    }
  },
  "spacing": {
    "xs": 4,
    "sm": 8,
    "md": 16,
    "lg": 24,
    "xl": 32
  },
  "borderRadius": {
    "sharp": 4,
    "default": 8,
    "rounded": 16
  },
  "shadows": {
    "light": "0px 1px 3px rgba(0,0,0,0.1)",
    "medium": "0px 4px 12px rgba(0,0,0,0.15)",
    "heavy": "0px 12px 24px rgba(0,0,0,0.2)"
  }
}
```

---

## 4️⃣ Schritt 3: Puppeteer Validierung (Optional aber Empfohlen)

### Warum Puppeteer?

Claude kann halluzinieren. **Puppeteer liest die echten Computed Styles aus dem Browser.**

```python
import asyncio
from pyppeteer import launch

async def validate_tokens_with_puppeteer(url: str, tokens: Dict) -> Dict:
    """
    Öffnet die Website im Browser und liest die echten Styles.
    Validiert, dass Claudes Extraktion richtig war.
    """
    
    browser = await launch()
    page = await browser.newPage()
    await page.goto(url)
    
    # Get all colors used on page
    colors_found = await page.evaluate("""
        () => {
            const colors = new Set();
            const elements = document.querySelectorAll('*');
            
            elements.forEach(el => {
                const style = window.getComputedStyle(el);
                const color = style.color;
                const bgColor = style.backgroundColor;
                
                if (color && color !== 'rgba(0, 0, 0, 0)') colors.add(color);
                if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)') colors.add(bgColor);
            });
            
            return Array.from(colors);
        }
    """)
    
    # Get fonts used
    fonts_found = await page.evaluate("""
        () => {
            const fonts = new Set();
            const elements = document.querySelectorAll('*');
            
            elements.forEach(el => {
                const style = window.getComputedStyle(el);
                fonts.add(style.fontFamily);
            });
            
            return Array.from(fonts);
        }
    """)
    
    # Get border radius examples
    radius_found = await page.evaluate("""
        () => {
            const radius = new Set();
            const elements = document.querySelectorAll('[style*="border-radius"]');
            
            elements.forEach(el => {
                const style = window.getComputedStyle(el);
                const br = style.borderRadius;
                if (br) radius.add(br);
            });
            
            return Array.from(radius);
        }
    """)
    
    await browser.close()
    
    # Validate and return
    return {
        "colors_found": colors_found,
        "fonts_found": fonts_found,
        "border_radius_found": radius_found,
        "validated_tokens": tokens  # Merge with Claude extraction
    }

# Usage
async def main():
    tokens = extract_design_tokens_with_claude(markdown)
    validated = await validate_tokens_with_puppeteer("https://glaido.com", tokens)
    return validated

asyncio.run(main())
```

---

## 5️⃣ Schritt 4: JSON exportieren (theme.ts)

### Die Output-Datei (TypeScript)

```typescript
// src/lib/theme.ts
// AUTO-GENERATED from https://glaido.com
// Generated: 2026-01-29

export const theme = {
  // Colors (extracted from website)
  colors: {
    primary: "#3B82F6",
    secondary: "#8B5CF6",
    success: "#10B981",
    danger: "#EF4444",
    warning: "#F59E0B",
    background: "#FFFFFF",
    surface: "#F9FAFB",
    text: {
      primary: "#111827",
      secondary: "#6B7280",
      muted: "#9CA3AF",
    }
  },

  // Typography (extracted from website)
  typography: {
    heading: {
      fontFamily: "Montserrat, sans-serif",
      fontSize: 32,
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: "-0.01em"
    },
    body: {
      fontFamily: "Roboto, sans-serif",
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: "0em"
    },
    caption: {
      fontFamily: "Roboto, sans-serif",
      fontSize: 12,
      fontWeight: 400,
      lineHeight: 1.4,
      letterSpacing: "0.02em"
    }
  },

  // Spacing (extracted from website)
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48
  },

  // Border Radius (extracted from website)
  borderRadius: {
    sharp: 4,
    default: 8,
    rounded: 16,
    circle: "50%"
  },

  // Shadows (extracted from website)
  shadows: {
    light: "0px 1px 3px rgba(0,0,0,0.1)",
    medium: "0px 4px 12px rgba(0,0,0,0.15)",
    heavy: "0px 12px 24px rgba(0,0,0,0.2)"
  }
};

// Export individual scales for Remotion
export const colors = theme.colors;
export const typography = theme.typography;
export const spacing = theme.spacing;
```

---

## 6️⃣ Schritt 5: Remotion Showcase Video

### Die Showcase Component

```tsx
import React from 'react';
import { AbsoluteFill, Sequence, interpolate, Easing } from 'remotion';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { theme } from './lib/theme';

export const DesignShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();
  const time = frame / fps;

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.background }}>
      
      {/* Title */}
      <Sequence from={0} durationInFrames={300}>
        <div
          style={{
            fontSize: 72,
            fontFamily: theme.typography.heading.fontFamily,
            fontWeight: theme.typography.heading.fontWeight,
            color: theme.colors.primary,
            textAlign: 'center',
            paddingTop: 100,
          }}
        >
          Design System Showcase
        </div>
      </Sequence>

      {/* Color Palette */}
      <Sequence from={300} durationInFrames={400}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: theme.spacing.lg,
            padding: theme.spacing.xl,
            marginTop: 200,
          }}
        >
          {Object.entries(theme.colors).map(([name, color], idx) => (
            <div
              key={name}
              style={{
                backgroundColor: typeof color === 'string' ? color : color.primary,
                borderRadius: theme.borderRadius.default,
                padding: theme.spacing.md,
                textAlign: 'center',
                boxShadow: theme.shadows.medium,
                opacity: interpolate(
                  frame,
                  [300 + idx * 20, 700 + idx * 20],
                  [0, 1],
                  { easing: Easing.inOut(Easing.ease) }
                ),
              }}
            >
              <span style={{ color: theme.colors.text.primary }}>
                {name}
              </span>
            </div>
          ))}
        </div>
      </Sequence>

      {/* Typography Showcase */}
      <Sequence from={700} durationInFrames={400}>
        <div style={{ padding: theme.spacing.xl, marginTop: 200 }}>
          <h2 style={{
            fontSize: theme.typography.heading.fontSize,
            fontFamily: theme.typography.heading.fontFamily,
            color: theme.colors.primary,
          }}>
            Heading Style
          </h2>
          <p style={{
            fontSize: theme.typography.body.fontSize,
            fontFamily: theme.typography.body.fontFamily,
            color: theme.colors.text.primary,
            lineHeight: theme.typography.body.lineHeight,
          }}>
            This is the body text style. Used for all content descriptions.
          </p>
        </div>
      </Sequence>

      {/* Components */}
      <Sequence from={1100} durationInFrames={400}>
        <div style={{ padding: theme.spacing.xl, marginTop: 200 }}>
          <button
            style={{
              backgroundColor: theme.colors.primary,
              color: theme.colors.background,
              padding: `${theme.spacing.md}px ${theme.spacing.lg}px`,
              borderRadius: theme.borderRadius.default,
              border: 'none',
              fontSize: theme.typography.body.fontSize,
              fontFamily: theme.typography.body.fontFamily,
              boxShadow: theme.shadows.medium,
              cursor: 'pointer',
            }}
          >
            Primary Button
          </button>
        </div>
      </Sequence>

    </AbsoluteFill>
  );
};
```

---

## 7️⃣ Die komplette Pipeline (Automation)

```python
import subprocess
import os
import json
from typing import Dict

def full_design_extraction_pipeline(url: str, output_video: str = None) -> Dict:
    """
    Komplette Pipeline: Website → Design Tokens → Showcase Video
    """
    
    output_video = output_video or f"{url.split('//')[1]}-design-system.mp4"
    
    print(f"🎨 Starting design extraction for {url}")
    
    # Step 1: Firecrawl
    print("📡 Step 1: Scraping with Firecrawl...")
    scraped = scrape_website_with_firecrawl(url)
    
    # Step 2: Claude Extraction
    print("🧠 Step 2: Extracting tokens with Claude...")
    tokens = extract_design_tokens_with_claude(scraped["markdown"])
    
    # Step 3: Puppeteer Validation
    print("✓ Step 3: Validating with Puppeteer...")
    validated = await validate_tokens_with_puppeteer(url, tokens)
    
    # Step 4: Generate theme.ts
    print("💾 Step 4: Generating theme.ts...")
    theme_code = generate_theme_typescript(validated["validated_tokens"])
    
    with open("src/lib/theme.ts", "w") as f:
        f.write(theme_code)
    
    # Step 5: Render Remotion Video
    print("🎬 Step 5: Rendering Remotion showcase...")
    subprocess.run([
        "npx", "remotion", "render",
        "DesignShowcase",
        output_video,
        "--codec", "h264"
    ], check=True)
    
    print(f"✅ Done! Video: {output_video}")
    print(f"✅ Theme exported: src/lib/theme.ts")
    
    return {
        "video": output_video,
        "tokens": validated["validated_tokens"],
        "theme_file": "src/lib/theme.ts"
    }

# Usage
result = full_design_extraction_pipeline("https://glaido.com")
```

---

## 8️⃣ Zero-Touch Execution Rules

### Wann automatisch extrahieren?

```python
def should_auto_extract(url: str) -> bool:
    """
    Decider logic.
    """
    
    # ✅ AUTO-EXTRACT
    if url.endswith(".com") and not url.endswith("test.com"):
        return True
    
    # ⚠️ ASK USER
    if url.contains("localhost") or url.contains("staging"):
        return False
    
    return True
```

---

## 9️⃣ Integration in Viron System

**Diese Datei sollte zu:**
```
skills/viron-system/rules/design-extraction-firecrawl.md
```

**Der Agent triggert diese Regel wenn:**
1. User gibt eine Website-URL
2. User sagt "Extract design" oder "--design-system"
3. Automatische Asset-Generierung aktiv

**Abhängigkeiten:**
- ✅ Firecrawl API-Key
- ✅ Claude API (Sonnet 3.5)
- ✅ Puppeteer (Optional aber Empfohlen)
- ✅ Remotion

---

**END OF DATEI 19**

Status: ✅ READY FOR DOWNLOAD | Nächste: Datei 20 (Supabase Dynamic Video), 21 (Agent Execution)
