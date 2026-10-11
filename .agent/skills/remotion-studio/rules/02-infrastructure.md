# Viron Infrastructure Guide

## 1. LOCAL RENDERING (RTX Workstation)

Use your GPU power directly.

- **Runtime:** Node.js (Bare Metal).
- **GPU Flag:** `Config.setChromiumOpenGlRenderer('angle');` (Best stability on Windows).
- **Workflow:** `npm run render` directly. No containers.

## 2. SERVER RENDERING (Hetzner GPU)

For a single dedicated server, Docker adds complexity without benefit.

### The "Bare Metal" Standard

1. **OS:** Ubuntu 24.04 LTS.
2. **Drivers:** Install proprietary NVIDIA drivers (`sudo ubuntu-drivers autoinstall`).
3. **Runtime:** Install Node.js via `fnm` (Fast Node Manager).
4. **Headless Config:**
   - Install `xvfb` (Virtual Framebuffer) to trick Chrome into seeing a display.
   - Command: `xvfb-run --auto-servernum --server-args="-screen 0 1920x1080x24" npx remotion render ...`
   - Flags: `--gl=angle --chromium-flags="--use-gl=egl --enable-gpu-rasterization"`

### Why not Docker?

- Docker requires the NVIDIA Container Toolkit (`nvidia-ctk`), which is fragile during driver updates.
- Direct access allows easier debugging via `htop` / `nvtop`.

## 3. INPUT CONFIGURATION

Keep it simple.

- **Level 1 (Config File):** Edit `input-props.json`.
- **Level 2 (CLI):** `npm run render -- --props='{"text": "Hello"}'`.
- **Level 3 (Local UI):** A simple Next.js page on the server (see Shared Architecture) that triggers the CLI command.
