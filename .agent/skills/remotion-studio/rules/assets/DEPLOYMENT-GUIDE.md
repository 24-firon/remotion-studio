# Viron Deployment Guide

## 1. Initial Setup

Run these commands to bootstrap the monorepo with the Viron Architecture.

```bash
# 1. Install Dependencies
pnpm install

# 2. Sync Assets (Crucial step!)
# Copies 3D models from packages/assets to apps/*/public
pnpm sync-assets

# 3. Start Development
pnpm dev:video  # Starts Remotion Studio
# OR
pnpm dev:web    # Starts Next.js
```

## 2. Environment Variables (.env)

Create a `.env` file in the root:

```env
# Optional: Path to python tools if not in global PATH
WHISPER_EXEC_PATH=/root/.local/bin/insanely-fast-whisper

# Rendering
REMOTION_AWS_ACCESS_KEY_ID=... (Only if using Lambda fallback)
```

## 3. Production Build

```bash
pnpm build
# Then run the render script
pnpm render
```
