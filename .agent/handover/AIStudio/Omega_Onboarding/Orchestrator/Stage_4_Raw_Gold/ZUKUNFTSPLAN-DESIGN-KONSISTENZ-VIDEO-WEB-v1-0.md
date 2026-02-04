# ZUKUNFTSPLAN-DESIGN-KONSISTENZ-VIDEO-WEB v1.0 (29. Jan 2026)

## Wie ein Button in Video UND Web identisch aussieht

Das ist dein "Design Sync" System. Ein Button. Zwei Medien. Selbe Ästhetik.

---

## 🎨 Das Problem

```
User sieht:
[Video auf Webseite]
    ↓
    [Glowing Button]
    
User klickt auf:
[Website Link]
    ↓
    [Glowing Button] ← Sollte gleich aussehen!
```

**Aber:**
- Video Button ist: SVG + Canvas + Glow Shader
- Web Button ist: DOM `<button>` + CSS
- Ohne Sync: Sie sehen unterschiedlich aus

---

## ✅ Die Lösung: Design-Token System

### 1. Zentrale Token-Datei (Single Source of Truth)

```typescript
// shared/design-tokens.ts

export const VIRON_THEME = {
  // Colors
  colors: {
    primary: '#FF00FF',      // Magenta
    text: '#FFFFFF',          // White
    background: '#0A0A0A',    // Dark
    glow: 'rgba(255, 0, 255, 0.6)',  // Magenta glow
  },

  // Button specifics
  button: {
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 600,
    
    // Glow effect (both video + web)
    glowColor: 'rgba(255, 0, 255, 0.6)',
    glowBlur: '12px',
    glowSpread: '2px',
    
    // Hover state
    hoverOpacity: 0.8,
    hoverGlowBlur: '16px',
    
    // Transitions
    transitionDuration: '200ms',
    transitionEasing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Typography
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
    headingSize: '24px',
    bodySize: '14px',
    lineHeight: 1.5,
  },
};
```

### 2. Remotion Component (Video Button)

```tsx
// remotion/components/GlowingButton.tsx
import { VIRON_THEME } from '@/shared/design-tokens';

export const GlowingButton = () => {
  const theme = VIRON_THEME;
  
  return (
    <div
      style={{
        padding: theme.button.padding,
        borderRadius: theme.button.borderRadius,
        fontSize: theme.button.fontSize,
        fontWeight: theme.button.fontWeight,
        background: theme.colors.primary,
        color: theme.colors.text,
        textAlign: 'center',
        
        // Video-specific: Shadow/Glow
        boxShadow: `
          0 0 ${theme.button.glowBlur} ${theme.button.glowColor},
          inset 0 0 20px rgba(255, 255, 255, 0.3)
        `,
        
        // Optional: Shine animation
        animation: 'shine 3s infinite',
      }}
    >
      Click Me
    </div>
  );
};

// Add keyframes at top of composition
const globalStyle = `
  @keyframes shine {
    0% { box-shadow: 0 0 12px rgba(255, 0, 255, 0.6); }
    50% { box-shadow: 0 0 20px rgba(255, 0, 255, 0.9); }
    100% { box-shadow: 0 0 12px rgba(255, 0, 255, 0.6); }
  }
`;
```

### 3. Web Component (React/Next.js Button)

```tsx
// components/GlowingButton.tsx
'use client'

import { VIRON_THEME } from '@/shared/design-tokens';
import styles from './GlowingButton.module.css';

export function GlowingButton({ onClick, children }) {
  const theme = VIRON_THEME;
  
  return (
    <button
      onClick={onClick}
      style={{
        padding: theme.button.padding,
        borderRadius: theme.button.borderRadius,
        fontSize: theme.button.fontSize,
        fontWeight: theme.button.fontWeight,
        background: theme.colors.primary,
        color: theme.colors.text,
        border: 'none',
        cursor: 'pointer',
        
        // Web-specific: Box shadow
        boxShadow: `
          0 0 ${theme.button.glowBlur} ${theme.button.glowColor},
          inset 0 0 10px rgba(255, 255, 255, 0.2)
        `,
        
        // Smooth transitions
        transition: `
          box-shadow ${theme.button.transitionDuration} ${theme.button.transitionEasing},
          transform ${theme.button.transitionDuration} ${theme.button.transitionEasing}
        `,
      }}
      className={styles.glowingButton}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `
          0 0 ${theme.button.glowBlur} ${theme.button.glowColor},
          inset 0 0 15px rgba(255, 255, 255, 0.3)
        `;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `
          0 0 ${theme.button.glowBlur} ${theme.button.glowColor},
          inset 0 0 10px rgba(255, 255, 255, 0.2)
        `;
      }}
    >
      {children}
    </button>
  );
}
```

**CSS Module (optional):**
```css
/* components/GlowingButton.module.css */
.glowingButton {
  font-family: 'Inter', system-ui, sans-serif;
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.glowingButton:active {
  transform: scale(0.98);
}

.glowingButton:focus-visible {
  outline: 2px solid rgba(255, 0, 255, 0.5);
  outline-offset: 2px;
}
```

---

## 🔄 Synchronisierungsprozess

### Wenn Design sich ändert:

```
1. Edit: shared/design-tokens.ts
   (Ändere glowBlur: 12px → 16px)

2. Both automatically update:
   - Remotion video button
   - Web button
   - (Because both import from same file)

3. Commit & Deploy:
   git add shared/design-tokens.ts
   git commit -m "Increase glow blur to 16px"
   git push → Vercel redeploys web, Remotion uses new tokens
```

---

## 🎯 Checkliste: Token-Konsistenz

- [ ] Tokens definiert in `shared/design-tokens.ts`
- [ ] Remotion Component importiert tokens
- [ ] Web Component importiert tokens
- [ ] Farben identisch (hex-Code exakt)
- [ ] Glow-Parameter identisch (blur, color, spread)
- [ ] Padding/Radius identisch
- [ ] Transitionszeit identisch
- [ ] Beide leben in gleicher Repo
- [ ] CI/CD checkt: "Tokens changed → Update screenshots"

---

## 📐 Advanced: Viron-Spezifische Shader-Logik

Wenn dein Glow komplexer ist (z.B. mit Shader):

```glsl
// shaders/glow.frag
precision mediump float;

uniform vec3 glowColor;
uniform float glowBlur;
varying vec2 vUv;

void main() {
  vec3 color = texture2D(uTexture, vUv).rgb;
  
  // Apply Viron glow formula
  float glow = exp(-distance(vUv, vec2(0.5)) * glowBlur);
  color += glow * glowColor;
  
  gl_FragColor = vec4(color, 1.0);
}
```

**Token für Shader:**
```typescript
export const SHADER_TOKENS = {
  glowBlur: 12.0,
  glowColor: [1.0, 0.0, 1.0, 0.6], // RGBA
};
```

Shader + Video + Web alle nutzen exakt die gleichen Werte.

---

**Version:** v1.0 (29. Jan 2026)