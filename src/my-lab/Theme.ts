/**
 * Design System: SaaS-Industrial
 * Strategy: Using Tailwind v4 utilities but keeping complex constants here.
 */

export const Theme = {
  colors: {
    surface: {
      gradientStart: '#e2e8f0', // slate-200
      gradientMid: '#94a3b8',   // slate-400
      gradientEnd: '#475569',   // slate-600
      base: '#020617',          // slate-950 (Void Background)
    },
    accent: {
      glint: 'rgba(255, 255, 255, 0.9)',
      highlight: 'rgba(255, 255, 255, 0.8)',
      shadow: 'rgba(30, 41, 59, 0.6)', // slate-800
    },
    terminal: {
      text: '#4ade80', // green-400
      border: '#cbd5e1', // slate-300
    },
  },
  physics: {
    impact: {
      mass: 1.5,
      stiffness: 180,
      damping: 25,
    },
  },
};
