/**
 * Design System: SaaS-Industrial
 * Strategy: Using Tailwind v4 utilities but keeping complex constants here.
 */

export const Theme = {
  colors: {
    surface: {
      gradientStart: '#f4f4f5', // zinc-100
      gradientMid: '#a1a1aa',   // zinc-400
      gradientEnd: '#3f3f46',   // zinc-700
      base: '#09090b',          // zinc-950 (Void Background)
    },
    accent: {
      glint: 'rgba(255, 255, 255, 0.9)',
      highlight: 'rgba(255, 255, 255, 0.8)',
      shadow: 'rgba(30, 41, 59, 0.6)', // slate-800 mostly invisible on zinc-950 but keeping for depth
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
