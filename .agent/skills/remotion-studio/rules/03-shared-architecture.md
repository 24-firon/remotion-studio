# Viron Shared Architecture (Monorepo)

## 1. THE STRUCTURE (Turbo + pnpm)

Organize code to share components between Next.js (Web) and Remotion (Video).

```text
/
├── package.json (Workspaces defined)
├── pnpm-workspace.yaml
├── apps/
│   ├── web/        (Next.js App Router)
│   └── video/      (Remotion Root)
└── packages/
    ├── ui/         (Shared Components: Buttons, Cards)
    ├── config/     (Tailwind, TypeScript, ESLint)
    └── assets/     (3D Models, Fonts - Copied via build script)
```

## 2. THE COMPONENT CONTRACT

Components must work in two worlds: Interactive (Web) and Timeline (Video).

### The "Driver" Pattern

Decouple the animation logic from the component.

- **Component:** Accepts `progress` (0.0 to 1.0) prop.
- **Web Consumer:** Feeds `scrollYProgress` (Framer Motion).
- **Video Consumer:** Feeds `interpolate(frame)` (Remotion).

```tsx
// packages/ui/HeroButton.tsx
export const HeroButton = ({ progress, label }) => {
  const rotation = progress * Math.PI * 2;
  return <mesh rotation-y={rotation}>...</mesh>;
};
```

## 3. TAILWIND SYNC

Do not duplicate `tailwind.config.js`.

- Create `packages/config/tailwind-preset.js`.
- Import this preset in both `apps/web` and `apps/video`.
- Define colors/fonts ONCE in the preset.
