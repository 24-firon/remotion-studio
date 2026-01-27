# Viron Button: NPM Package.json Reference
## Complete Dependency Manifest (January 2026)

---

## Minimal Setup (Core)

```json
{
  "name": "viron-button",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "three": "r171",
    "@react-three/fiber": "^9.5.0",
    "@react-three/drei": "^10.7.7"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@types/three": "r171",
    "typescript": "^5.3.0",
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.0.0"
  }
}
```

---

## Full Production Setup (All Features)

```json
{
  "name": "viron-button-pro",
  "version": "1.0.0",
  "type": "module",
  "description": "High-end cinematic UI button with AI video, glass transmission, and postprocessing",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "type-check": "tsc --noEmit",
    "lint": "eslint src --ext .ts,.tsx"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "three": "r171",
    "@react-three/fiber": "^9.5.0",
    "@react-three/drei": "^10.7.7",
    "@react-three/postprocessing": "^2.16.0",
    "postprocessing": "^6.35.0",
    "three-custom-shader-material": "^6.0.0",
    "gsap": "^3.12.0",
    "zustand": "^4.4.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@types/three": "r171",
    "@types/node": "^20.0.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.0.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0"
  },
  "engines": {
    "node": "^18.0.0",
    "npm": "^9.0.0"
  }
}
```

---

## Dependency Deep Dive

### Core 3D Stack

#### `three@r171`
- **Purpose:** WebGL renderer + math library
- **Why Latest:** r171 has stable WebGL2 + experimental WebGPURenderer
- **Version Strategy:** Pin to exact version (e.g., `r171`) because Three.js uses release channels
- **Size:** ~600KB minified

```json
"three": "r171"
```

#### `@react-three/fiber@9.5.0`
- **Purpose:** React renderer for Three.js
- **Pairs With:** React 19
- **Breaking Changes:** v8→v9 is major (React 18→19)
- **Update Strategy:** Follow React major versions

```json
"@react-three/fiber": "^9.5.0"
```

#### `@react-three/drei@10.7.7`
- **Purpose:** 100+ pre-built components (MeshTransmissionMaterial, Caustics, etc.)
- **Size:** ~400KB (heavily tree-shakeable)
- **Stability:** Actively maintained, safe to use `^10.7.7`

```json
"@react-three/drei": "^10.7.7"
```

### Post-Processing

#### `@react-three/postprocessing@2.16.0`
- **Purpose:** Wrapper for postprocessing library (Bloom, Glitch, DOF, etc.)
- **Peer Dependency:** Requires `postprocessing`
- **WebGPU Status:** ⚠️ Some effects break on WebGPU (avoid for now)

```json
"@react-three/postprocessing": "^2.16.0",
"postprocessing": "^6.35.0"
```

### Custom Shaders

#### `three-custom-shader-material@6.0.0`
- **Purpose:** Extend Three materials with custom shaders (replaces Lamina)
- **Status:** Actively maintained
- **Use Case:** Iridescence, glitch, custom effects

```json
"three-custom-shader-material": "^6.0.0"
```

### Animation & State

#### `gsap@3.12.0` (Optional but recommended)
- **Purpose:** Timeline tweens, easier than useFrame animations
- **Size:** ~70KB (use `gsap/dist/gsap.min.js`)
- **Example:** Smooth button click animations

```json
"gsap": "^3.12.0"
```

#### `zustand@4.4.0` (Optional for state)
- **Purpose:** Lightweight state management (replaces Redux for small apps)
- **Size:** ~2KB
- **Use:** Store button hover state, global settings

```json
"zustand": "^4.4.0"
```

---

## Version Compatibility Matrix

| Package | Min Version | Current | Max Version | Notes |
|---------|------------|---------|-------------|-------|
| React | 19.0.0 | 19.0.0 | 19.x | Must match @react-three/fiber v9 |
| Three.js | r170 | r171 | r171+ | WebGL2 stable on r171 |
| @react-three/fiber | 9.5.0 | 9.5.0 | 9.x | v10 pending (breaking changes) |
| @react-three/drei | 10.7.7 | 10.7.7 | 10.x | Safe minor/patch updates |
| TypeScript | 5.0 | 5.3 | 5.x | Three.js types updated regularly |

---

## Build Configuration (Vite)

### vite.config.ts

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate Three.js to its own chunk
          three: ['three'],
          // Separate R3F ecosystem
          r3f: [
            '@react-three/fiber',
            '@react-three/drei',
            '@react-three/postprocessing',
          ],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei'],
  },
})
```

---

## Installation Instructions

### 1. Bootstrap Project

```bash
# Create Vite + React + TypeScript
npm create vite@latest viron-button -- --template react-ts

# Navigate
cd viron-button

# Install base deps
npm install
```

### 2. Add 3D Stack

```bash
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing postprocessing three-custom-shader-material
```

### 3. Add Types

```bash
npm install --save-dev @types/three typescript
```

### 4. (Optional) Animation + State

```bash
npm install gsap zustand
```

### 5. Verify Installation

```bash
npm run type-check
npm run build
```

---

## Common Installation Issues

### Issue: "three/examples/jsm module not found"
**Cause:** Drei uses `three-stdlib` instead  
**Fix:** This is correct; drei abstracts the import. Do NOT install `three/examples/jsm` separately.

### Issue: "React version mismatch"
**Cause:** Using React 18 with @react-three/fiber v9  
**Fix:** Upgrade to React 19 or downgrade R3F to v8

```bash
# Option A: Upgrade
npm install react@^19 react-dom@^19 @react-three/fiber@^9

# Option B: Downgrade (not recommended)
npm install @react-three/fiber@^8
```

### Issue: "Type definitions missing"
**Cause:** Missing `@types/three`  
**Fix:**
```bash
npm install --save-dev @types/three
```

### Issue: "WebGPU errors on import"
**Cause:** Trying to use `WebGPURenderer` before ready  
**Fix:** Stay on `WebGLRenderer`; don't import WebGPU features

```tsx
// ✅ CORRECT
<Canvas gl={{ antialias: true }} />

// ❌ WRONG
<Canvas gl={{ antialias: true, useWebGPU: true }} />
```

---

## Performance Tips for Bundle Size

### Tree-Shaking (Remove Unused Drei Components)

Three.js + R3F + Drei is large. Be selective:

```tsx
// ✅ Good: Import only what you use
import { MeshTransmissionMaterial, Caustics } from '@react-three/drei'

// ❌ Bad: Imports everything (larger bundle)
import * as drei from '@react-three/drei'
```

### Code Splitting

Vite automatically splits at the chunk boundaries defined in `vite.config.ts`.

Typical bundle breakdown:
- Three.js: ~150KB
- React + R3F: ~200KB  
- Drei (full): ~100KB
- Postprocessing: ~50KB
- **Total:** ~500KB (before gzip: ~150KB)

### Lazy Loading Components

```tsx
import { lazy, Suspense } from 'react'

const VironButton = lazy(() => import('./components/VironButton'))

export default () => (
  <Suspense fallback={<div>Loading...</div>}>
    <VironButton />
  </Suspense>
)
```

---

## Runtime Optimization

### Disable Unneeded Features

```tsx
<Canvas
  gl={{
    antialias: true,          // ✅ Keep
    alpha: false,             // ✅ Opaque bg = faster
    dpr: [1, 2],              // ✅ Clamp DPR on mobile
    powerPreference: 'high-performance', // ✅ Use GPU
  }}
  camera={{ position: [0, 0, 4], fov: 50 }}
>
  {/* scene */}
</Canvas>
```

### Preload Assets

```tsx
import { useGLTF } from '@react-three/drei'

// Preload at app start
useGLTF.preload('/model.glb')
```

---

## Updating Dependencies

### Safe Updates (Patch/Minor)

```bash
npm update
npm audit fix
```

### Risky Updates (Major)

Test thoroughly before deploying major version jumps:

```bash
# Check for breaking changes
npm view @react-three/fiber versions

# Update to next major
npm install @react-three/fiber@next
```

---

## TypeScript Configuration (tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "skipDefaultLibCheck": true,

    "resolveJsonModule": true,
    "allowJs": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "jsx": "react-jsx"
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

---

## Verifying Installation

```tsx
// src/App.tsx - Quick validation
import React from 'react'
import { Canvas } from '@react-three/fiber'
import { MeshTransmissionMaterial } from '@react-three/drei'

export default function App() {
  return (
    <Canvas>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <MeshTransmissionMaterial transmission={1} />
      </mesh>
    </Canvas>
  )
}
```

If this renders without errors → **Installation successful!**

---

## Next Steps

1. ✅ Run `npm install` with this package.json
2. ✅ Copy the complete guide (viron-button-guide.md)
3. ✅ Implement VironButton component from guide
4. ✅ Generate video loop via Luma (lumalabs.ai/genie)
5. ✅ Download HDRI from Poly Haven
6. ✅ Deploy and measure FPS

---

**Last Updated:** January 27, 2026  
**Node Version:** 18.0.0+  
**Package Manager:** npm 9.0.0+
