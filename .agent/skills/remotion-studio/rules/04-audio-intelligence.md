# Viron Audio Intelligence

## 1. AUDIO SYNC (The Native Way)

We do not use Python scripts for sync anymore.

- **Component:** Use `<Audio />` from `@remotion/media`.
- **Mechanism:** Remotion extracts audio and muxes it via FFmpeg. This guarantees frame-perfect sync, even if the browser preview drifts.
- **Config:** Set `disallowInsecureAudio: true` to prevent accidental `<audio>` tag usage.

## 2. AUTO-CUT (Silence Detection)

Use FFmpeg directly for speed.

- **Command:** `ffmpeg -i input.wav -af silencedetect=n=-40dB:d=0.5 -f null -`
- **Workflow:**
  1. Run command via Node.js `child_process`.
  2. Parse `stderr` to get start/end times of silence.
  3. Generate a Remotion `cutList` JSON.
  4. Feed JSON to `<Sequence>` to skip silent parts.

## 3. TRANSCRIPTION (WhisperX)

For word-level animations ("Karaoke").

- **Tool:** `insanely-fast-whisper` (Python CLI).
- **Hardware:** Runs on your RTX card or Hetzner GPU.
- **Speed:** Transcribes 1 hour in < 30 seconds.
- **Output:** JSON with precise start/end timestamps per word.
