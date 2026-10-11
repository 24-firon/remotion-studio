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
      stop1: '#e8e8e8',   // Hellstes Silber (Highlights)
      stop2: '#d0d0d0',   // Silber
      stop3: '#b8b8b8',   // Mittleres Silber
      stop4: '#a0a0a0',   // Basis-Silber
      stop5: '#888888',   // Dunkleres Silber
      stop6: '#707070',   // Zink-Ton
      stop7: '#505050',   // Dunkelste (Schatten)
    },

    // Akzent-Farben
    accent: {
      primary: '#00d9ff',    // Cyan (für Kontrast)
      secondary: '#ff006e',  // Magenta
      tertiary: '#00d084',   // Grün
      glint: 'rgba(255, 255, 255, 0.8)', // Glint overlay
    },

    // Neutrals
    neutral: {
      white: '#ffffff',
      black: '#000000',
      gray100: '#f5f5f5',
      gray200: '#ececec',
      gray300: '#d3d3d3',
      gray400: '#b0b0b0',
      gray500: '#808080',
      gray600: '#595959',
      gray700: '#303030',
      gray800: '#1a1a1a',
      gray900: '#0d0d0d',
    },
  },

  // ============================================
  // PBR MATERIAL PHYSICS
  // ============================================
  pbr: {
    metalness: 0.9,
    roughness: 0.2,
    envMapIntensity: 1.0,
  },

  // ============================================
  // PHYSICS CONFIGS
  // ============================================
  physics: {
    snappy: {
      damping: 20,
      stiffness: 200,
      mass: 1,
    },
    bouncy: {
        damping: 8,
        stiffness: 100,
        mass: 1,
    },
    linear: {
        damping: 200, // Overdamped
        stiffness: 100,
        mass: 1,
    }
  },

    // ============================================
  // ANIMATIONEN
  // ============================================
  animations: {
    // Duration
    duration: {
      fast: 150,     // ms
      normal: 250,
      slow: 500,
      slower: 1000,
    },
  },

} as const;

export type ThemeType = typeof THEME;
