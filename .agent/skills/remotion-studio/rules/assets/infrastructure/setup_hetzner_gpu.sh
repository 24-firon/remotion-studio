
#!/usr/bin/env bash

################################################################################

# Hetzner GPU Server Setup für Remotion + Whisper

# Ubuntu 24.04 LTS | NVIDIA GPU | Node.js 22 | FFmpeg | Xvfb

# Validiert: Februar 2026

################################################################################



set -euo pipefail



# Colors

RED='\\033[0;31m'

GREEN='\\033[0;32m'

YELLOW='\\033[1;33m'

BLUE='\\033[0;34m'

NC='\\033[0m'



log_info() { echo -e "${GREEN}[INFO]${NC} $1"; }

log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }

log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

log_step() { echo -e "${BLUE}[STEP]${NC} $1"; }



# Root Check

if [[ $EUID -ne 0 ]]; then

   log_error "Dieses Skript muss als root ausgeführt werden!"

   exit 1

fi



ACTUAL_USER=${SUDO_USER:-$(whoami)}

ACTUAL_HOME=$(eval echo ~$ACTUAL_USER)



log_info "Setup für Benutzer '$ACTUAL_USER' (Home: $ACTUAL_HOME)"

echo ""



################################################################################

# 1. SYSTEM UPDATE \& BASIC TOOLS

################################################################################

log_step "Schritt 1/8: System-Updates und grundlegende Werkzeuge..."



apt-get update -qq

DEBIAN_FRONTEND=noninteractive apt-get upgrade -y -qq



# Essential + Python Setup (python3-venv für isolierte Umgebungen)

apt-get install -y -qq \\

    curl wget git unzip \\

    build-essential software-properties-common \\

    apt-transport-https ca-certificates gnupg lsb-release \\

    python3 python3-pip python3-venv



log_info "✓ System aktualisiert"

echo ""



################################################################################

# 2. NVIDIA TREIBER (HEADLESS)

################################################################################

log_step "Schritt 2/8: NVIDIA GPU-Treiber installieren..."



apt-get install -y -qq linux-headers-$(uname -r)



# CUDA Repository hinzufügen (Ubuntu 24.04)

if [[ ! -f /etc/apt/sources.list.d/cuda-ubuntu2404-x86_64.list ]]; then

    log_info "Füge NVIDIA CUDA Repository hinzu..."

    wget -q https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2404/x86_64/cuda-keyring_1.1-1_all.deb

    dpkg -i cuda-keyring_1.1-1_all.deb

    rm cuda-keyring_1.1-1_all.deb

    apt-get update -qq

fi



# CUDA Treiber + Utilities

log_info "Installiere NVIDIA Treiber (dies dauert 3-5 Minuten)..."

apt-get install -y -qq cuda-drivers nvidia-utils-550



# Persistence Daemon (verhindert Treiber-Unload zwischen Jobs)

systemctl enable nvidia-persistenced 2>/dev/null || true



log_info "✓ NVIDIA Treiber installiert"

echo ""



################################################################################

# 3. GRAFIK-BIBLIOTHEKEN FÜR REMOTION (KRITISCH!)

################################################################################

log_step "Schritt 3/8: OpenGL/EGL + Chrome Dependencies..."



# WICHTIG: Ohne diese crasht Chromium Headless!

apt-get install -y -qq \\

    libgl1 libegl1 libgles2 libgbm1 \\

    libxrandr2 libxcursor1 libxinerama1 libxi6 \\

    libnss3 libdbus-1-3 libatk1.0-0 libasound2t64 \\

    libxkbcommon-dev libxfixes3 libxcomposite1 \\

    libxdamage1 libgbm-dev libcups2 libcairo2 \\

    libpango-1.0-0 libatk-bridge2.0-0



log_info "✓ Chrome/Remotion Dependencies installiert"

echo ""



################################################################################

# 4. NODE.JS LTS VIA FNM (FAST NODE MANAGER)

################################################################################

log_step "Schritt 4/8: Node.js LTS (v22) via fnm..."



# fnm für den Benutzer installieren (nicht root!)

if [[ ! -d "$ACTUAL_HOME/.fnm" ]]; then

    log_info "Installiere fnm (Fast Node Manager)..."

    su - $ACTUAL_USER -c "curl -fsSL https://fnm.vercel.app/install | bash -s -- --skip-shell"

else

    log_info "fnm bereits installiert, überspringe..."

fi



# Shell-Integration (Bash)

BASHRC="$ACTUAL_HOME/.bashrc"

if ! grep -q "fnm env" "$BASHRC"; then

    log_info "Konfiguriere fnm für Bash..."

    cat >> "$BASHRC" << 'EOF'



# fnm (Fast Node Manager) Setup

export PATH="$HOME/.fnm:$PATH"

eval "$(fnm env --use-on-cd)"

EOF

    chown $ACTUAL_USER:$ACTUAL_USER "$BASHRC"

fi



# Node.js 22 LTS installieren

log_info "Installiere Node.js LTS (v22 'Jod')..."

su - $ACTUAL_USER -c '

export PATH="$HOME/.fnm:$PATH"

eval "$(fnm env)"

fnm install 22

fnm use 22

fnm default 22

'



# Verifiziere Installation

NODE_VERSION=$(su - $ACTUAL_USER -c 'export PATH="$HOME/.fnm:$PATH"; eval "$(fnm env)"; node --version' || echo "FEHLER")

if [[ "$NODE_VERSION" == "FEHLER" ]]; then

    log_error "Node.js Installation fehlgeschlagen!"

    exit 1

fi



log_info "✓ Node.js $NODE_VERSION installiert"

echo ""



################################################################################

# 5. FFMPEG INSTALLIEREN

################################################################################

log_step "Schritt 5/8: ffmpeg installieren..."



apt-get install -y -qq ffmpeg

FFMPEG_VERSION=$(ffmpeg -version | head -n1)

log_info "✓ ffmpeg installiert: $FFMPEG_VERSION"

echo ""



################################################################################

# 6. XVFB FÜR HEADLESS CHROME

################################################################################

log_step "Schritt 6/8: Xvfb (X Virtual Framebuffer) installieren..."



apt-get install -y -qq xvfb x11-utils

log_info "✓ Xvfb installiert"

echo ""



################################################################################

# 7. XVFB ALS SYSTEMD SERVICE

################################################################################

log_step "Schritt 7/8: Xvfb als systemd Service einrichten..."



cat > /etc/systemd/system/xvfb.service << 'EOF'

[Unit]

Description=X Virtual Frame Buffer Service for Headless Rendering

After=network.target



[Service]

Type=simple

ExecStart=/usr/bin/Xvfb :99 -screen 0 1920x1080x24 -ac +extension GLX +render -noreset

Restart=on-failure

RestartSec=5s

StandardOutput=journal

StandardError=journal



[Install]

WantedBy=multi-user.target

EOF



systemctl daemon-reload

systemctl enable xvfb.service

systemctl start xvfb.service



sleep 2

if systemctl is-active --quiet xvfb.service; then

    log_info "✓ Xvfb Service läuft auf Display :99"

else

    log_error "Xvfb Service konnte nicht gestartet werden!"

    systemctl status xvfb.service

    exit 1

fi



echo ""



################################################################################

# 8. ENVIRONMENT-VARIABLEN FÜR REMOTION

################################################################################

log_step "Schritt 8/8: Environment-Variablen konfigurieren..."



if ! grep -q "DISPLAY=:99" /etc/environment; then

    cat >> /etc/environment << 'EOF'



# Remotion GPU Rendering Setup

DISPLAY=:99

NVIDIA_VISIBLE_DEVICES=all

NVIDIA_DRIVER_CAPABILITIES=all

EOF

    log_info "✓ Environment-Variablen gesetzt"

else

    log_info "✓ Environment-Variablen bereits konfiguriert"

fi



echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

log_info "✅ Setup erfolgreich abgeschlossen!"

echo ""

log_warn "WICHTIG: Bitte System neu starten, damit NVIDIA-Treiber aktiv werden:"

echo "         sudo reboot"

echo ""

log_info "Nach dem Neustart GPU-Status prüfen mit: nvidia-smi"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

