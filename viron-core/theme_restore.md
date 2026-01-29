# 7. THEME SYSTEM & DESIGN TOKENS

**Dokumentversion:** 1.0 | Januar 2026

## Design Token Architektur

### Theme.ts - Single Source of Truth

```typescript
// src/theme/Theme.ts

/**
 * ZENTRALES THEME SYSTEM
 * Wird sowohl in Next.js Frontend als auch Remotion Videos verwendet
 * 100% Konsistenz über alle Medien hinweg
 */

export const THEME = {
  // ============================================
  // FARBEN: Metallic Palette (7-Stop Gradient)
  // ============================================
  colors: {
    metallic: {
      // Zink-Silber-Gradient (oben → unten)
      stop1: "#e8e8e8", // Hellstes Silber (Highlights)
      stop2: "#d0d0d0", // Silber
      stop3: "#b8b8b8", // Mittleres Silber
      stop4: "#a0a0a0", // Basis-Silber
      stop5: "#888888", // Dunkleres Silber
      stop6: "#707070", // Zink-Ton
      stop7: "#505050", // Dunkelste (Schatten)
    },

    // Akzent-Farben
    accent: {
      primary: "#00d9ff", // Cyan (für Kontrast)
      secondary: "#ff006e", // Magenta
      tertiary: "#00d084", // Grün
    },

    // Neutrals
    neutral: {
      white: "#ffffff",
      black: "#000000",
      gray100: "#f5f5f5",
      gray200: "#ececec",
      gray300: "#d3d3d3",
      gray400: "#b0b0b0",
      gray500: "#808080",
      gray600: "#595959",
      gray700: "#303030",
      gray800: "#1a1a1a",
      gray900: "#0d0d0d",
    },

    // Status-Farben
    status: {
      success: "#10b981",
      error: "#ef4444",
      warning: "#f59e0b",
      info: "#3b82f6",
    },
  },

  // ============================================
  // TYPO GRAPHIE
  // ============================================
  typography: {
    fontFamily: {
      display: '"Syne", sans-serif', // Bold Headlines
      mono: '"IBM Plex Mono", monospace', // Code/Terminal
      sans: '"Inter", sans-serif', // Body Text
    },

    fontSize: {
      xs: "0.75rem", // 12px
      sm: "0.875rem", // 14px
      base: "1rem", // 16px
      lg: "1.125rem", // 18px
      xl: "1.25rem", // 20px
      "2xl": "1.5rem", // 24px
      "3xl": "1.875rem", // 30px
      "4xl": "2.25rem", // 36px
      "5xl": "3rem", // 48px
      "6xl": "3.75rem", // 60px
    },

    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },

    lineHeight: {
      tight: 1.2,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    },

    letterSpacing: {
      tight: "-0.02em",
      normal: "0em",
      wide: "0.02em",
      wider: "0.05em",
    },
  },

  // ============================================
  // ABSTÄNDE (Spacing Scale)
  // ============================================
  spacing: {
    0: "0px",
    1: "0.25rem", // 4px
    2: "0.5rem", // 8px
    3: "0.75rem", // 12px
    4: "1rem", // 16px
    6: "1.5rem", // 24px
    8: "2rem", // 32px
    12: "3rem", // 48px
    16: "4rem", // 64px
    24: "6rem", // 96px
    32: "8rem", // 128px
  },

  // ============================================
  // BORDER RADIUS
  // ============================================
  borderRadius: {
    none: "0px",
    sm: "0.25rem", // 4px
    base: "0.5rem", // 8px
    md: "0.75rem", // 12px
    lg: "1rem", // 16px
    xl: "1.5rem", // 24px
    full: "9999px",
  },

  // ============================================
  // SHADOWS
  // ============================================
  shadows: {
    none: "none",
    xs: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    sm: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
    metallic:
      "inset -2px -2px 5px rgba(0,0,0,0.3), inset 2px 2px 5px rgba(255,255,255,0.5)",
  },

  // ============================================
  // BREAKPOINTS (Responsive)
  // ============================================
  breakpoints: {
    xs: "0px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },

  // ============================================
  // ANIMATIONEN
  // ============================================
  animations: {
    // Duration
    duration: {
      fast: 150, // ms
      normal: 250,
      slow: 500,
      slower: 1000,
    },

    // Easing Functions
    easing: {
      linear: "linear",
      in: "cubic-bezier(0.4, 0, 1, 1)",
      out: "cubic-bezier(0, 0, 0.2, 1)",
      inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    },

    // Vordefinierte Animationen
    keyframes: {
      fadeIn: {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
      slideInLeft: {
        from: { transform: "translateX(-100%)" },
        to: { transform: "translateX(0)" },
      },
      slideInRight: {
        from: { transform: "translateX(100%)" },
        to: { transform: "translateX(0)" },
      },
      pulse: {
        "0%, 100%": { opacity: 1 },
        "50%": { opacity: 0.5 },
      },
      metallic: {
        "0%": {
          backgroundPosition: "0% 50%",
        },
        "50%": {
          backgroundPosition: "100% 50%",
        },
        "100%": {
          backgroundPosition: "0% 50%",
        },
      },
    },
  },

  // ============================================
  // GRADIENTEN
  // ============================================
  gradients: {
    metallic135: `linear-gradient(135deg, 
      ${THEME.colors.metallic.stop1} 0%,
      ${THEME.colors.metallic.stop2} 16.67%,
      ${THEME.colors.metallic.stop3} 33.33%,
      ${THEME.colors.metallic.stop4} 50%,
      ${THEME.colors.metallic.stop5} 66.67%,
      ${THEME.colors.metallic.stop6} 83.33%,
      ${THEME.colors.metallic.stop7} 100%)`,

    metallicRadial: `radial-gradient(ellipse at 30% 30%,
      ${THEME.colors.metallic.stop1},
      ${THEME.colors.metallic.stop4},
      ${THEME.colors.metallic.stop7})`,

    accentCyan: `linear-gradient(90deg, 
      transparent, 
      ${THEME.colors.accent.primary})`,
  },

  // ============================================
  // ZINDEX
  // ============================================
  zIndex: {
    hide: "-1",
    base: "0",
    docked: "10",
    dropdown: "1000",
    sticky: "1020",
    fixed: "1030",
    backdrop: "1040",
    offcanvas: "1050",
    modal: "1060",
    popover: "1070",
    tooltip: "1080",
  },
} as const;

// Export als Typ
export type ThemeType = typeof THEME;

// Hilfsfunktion für CSS-Variable
export const getCSSVariables = (): Record<string, string> => {
  return {
    "--color-metallic-1": THEME.colors.metallic.stop1,
    "--color-metallic-4": THEME.colors.metallic.stop4,
    "--color-metallic-7": THEME.colors.metallic.stop7,
    "--color-accent-primary": THEME.colors.accent.primary,
    "--font-display": THEME.typography.fontFamily.display,
    "--font-mono": THEME.typography.fontFamily.mono,
  };
};
```

## Tailwind Integration

```typescript
// tailwind.config.ts - Next.js Frontend

import type { Config } from "tailwindcss";
import { THEME } from "./src/theme/Theme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        metallic: {
          1: THEME.colors.metallic.stop1,
          2: THEME.colors.metallic.stop2,
          3: THEME.colors.metallic.stop3,
          4: THEME.colors.metallic.stop4,
          5: THEME.colors.metallic.stop5,
          6: THEME.colors.metallic.stop6,
          7: THEME.colors.metallic.stop7,
        },
        accent: {
          primary: THEME.colors.accent.primary,
          secondary: THEME.colors.accent.secondary,
          tertiary: THEME.colors.accent.tertiary,
        },
      },
      spacing: THEME.spacing,
      borderRadius: THEME.borderRadius,
      boxShadow: THEME.shadows,
      fontFamily: THEME.typography.fontFamily,
      fontSize: THEME.typography.fontSize,
      fontWeight: THEME.typography.fontWeight,
    },
  },
  plugins: [],
};

export default config;
```

## React Hook: useTheme

```typescript
// src/hooks/useTheme.ts

import { useContext, createContext } from "react";
import { THEME } from "../theme/Theme";

interface ThemeContextType {
  theme: typeof THEME;
  isDark: boolean;
  toggleDarkMode: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: THEME,
  isDark: false,
  toggleDarkMode: () => {},
});

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
};
```

## TypeScript Utilities

```typescript
// src/theme/themeUtils.ts

import { THEME } from "./Theme";

/**
 * Erstelle eine neue Farbe basierend auf RGB-Blend
 */
export const blendColors = (
  color1: string,
  color2: string,
  ratio: number,
): string => {
  const c1 = parseInt(color1.slice(1), 16);
  const c2 = parseInt(color2.slice(1), 16);

  const r = Math.round(
    ((c1 >> 16) & 255) * (1 - ratio) + ((c2 >> 16) & 255) * ratio,
  );
  const g = Math.round(
    ((c1 >> 8) & 255) * (1 - ratio) + ((c2 >> 8) & 255) * ratio,
  );
  const b = Math.round((c1 & 255) * (1 - ratio) + (c2 & 255) * ratio);

  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
};

/**
 * Erhöhe oder senke die Helligkeit einer Farbe
 */
export const adjustBrightness = (color: string, percent: number): string => {
  const c = parseInt(color.slice(1), 16);
  const r = Math.round(((c >> 16) & 255) * percent);
  const g = Math.round(((c >> 8) & 255) * percent);
  const b = Math.round((c & 255) * percent);

  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
};

/**
 * Konvertiere Hex zu RGB
 */
export const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  const c = parseInt(hex.slice(1), 16);
  return {
    r: (c >> 16) & 255,
    g: (c >> 8) & 255,
    b: c & 255,
  };
};

/**
 * Konvertiere RGB zu Hex
 */
export const rgbToHex = (r: number, g: number, b: number): string => {
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
};

/**
 * Berechne WCAG Contrast Ratio
 */
export const getContrastRatio = (color1: string, color2: string): number => {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  const getLuminance = (rgb: { r: number; g: number; b: number }) => {
    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((x) => {
      x = x / 255;
      return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const lum1 = getLuminance(rgb1);
  const lum2 = getLuminance(rgb2);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
};

/**
 * Validiere Kontrast gegen WCAG Standards
 */
export const validateContrast = (
  color1: string,
  color2: string,
): {
  ratio: number;
  wcagAA: boolean;
  wcagAAA: boolean;
} => {
  const ratio = getContrastRatio(color1, color2);

  return {
    ratio,
    wcagAA: ratio >= 4.5, // Normal text
    wcagAAA: ratio >= 7, // Enhanced
  };
};
```

## Dokumentation für Design-Tokens

```markdown
## Design Token Checkliste

### Beim Hinzufügen neuer Farben:

- [ ] Hex-Wert eingeben
- [ ] Kontrastvalidierung prüfen (WCAG AA minimum)
- [ ] In THEME.ts eintragen
- [ ] In Tailwind config aktualisieren
- [ ] Für Remotion-Videos verifizieren

### Beim Ändern von Animationen:

- [ ] Duration überprüfen (Performance Impact)
- [ ] Easing für alle Browser testen
- [ ] In Remotion mit spring physics replizieren

### Best Practices:

- Nutze immer THEME statt hardkodierte Werte
- Verwende getCSSVariables() für dynamische Styles
- Teste Kontrast-Ratios mit validateContrast()
```

Vollständiges und standardisiertes Theme-System!
