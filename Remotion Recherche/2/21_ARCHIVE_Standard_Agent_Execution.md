# ARCHIVE: Agent Execution Philosophy (Zero-Touch + Context Hygiene)
## [Jack Roberts / AntiGravity Setup Analysis]

**Status:** REFERENCE ARCHIVE | OPERATIONAL STANDARD  
**Erstellt:** 2026-01-29  
**Quelle:** `Remotion-Setup.md.txt` (Jack Roberts) + AntiGravity Patterns  
**Kategorie:** Agentic Workflows | System Design | Operations  
**Relevanz für Viron:** ⭐⭐⭐⭐⭐ CRITICAL

---

## 🎯 Mission Statement

Die beste Technologie ist nutzlos, wenn der Agent **mitten im Prozess stecken bleibt und fragt "Darf ich das?"**

Diese Datei definiert die **philosophische und praktische Grundlagen** dafür, dass der Viron Agent:
- **Schnell und autonom** läuft (Zero-Touch)
- **Nie dumm wird**, wenn der Kontext groß wird (Context Hygiene)
- **Fehler selbst fixt**, statt zu fragen
- **Vertrauenswürdig** ist (Execution Transparency)

---

## 1️⃣ The "Zero-Touch" Mindset

### Was ist "Zero-Touch"?

**Zero-Touch = Der Agent führt aus, ohne zu fragen.**

```
User: "Render video with captions"

❌ Old Agent (Annoying):
  "Should I use Whisper or manual? [Y/n]"
  "What caption color? [Default: White]"
  "Confidence threshold for bad takes? [0.7]"
  → 10 Fragen später: "Okay, Rendering..."

✅ Jack Roberts Agent (Professional):
  "Starting pipeline..."
  [Renders video]
  "✅ Done! Check output-captions.mp4"
```

### Die Regeln

#### Rule 1: Defaults existieren für einen Grund

```python
# ✅ GOOD: Hat Defaults, aber änderbar via Flag
config = {
    "caption_color": "--caption-color" in sys.argv and sys.argv["--caption-color"] or "#BFF549",
    "audio_lufs": "--audio-lufs" in sys.argv and sys.argv["--audio-lufs"] or -16,
    "denoise_method": "--denoise" in sys.argv and sys.argv["--denoise"] or "dynamic"
}

# ❌ BAD: Fragt jedes Mal
print("Enter caption color (hex): ")
color = input()
```

#### Rule 2: CLI Flags > Interaktive Prompts

```bash
# ✅ GOOD
npx viron render video.mp4 --captions --audio-lufs=-16 --denoise=dynamic

# ❌ BAD
npx viron render video.mp4
# → "Processing: [Y/n]?"
# → "Caption color? "
# → "Audio level? "
```

#### Rule 3: Auto-Accept Permissions

```python
# ✅ GOOD: Schreibt Datei direkt
with open("output.mp4", "w") as f:
    f.write(video_data)

# ❌ BAD: Fragt vorher
if os.path.exists("output.mp4"):
    print("File exists. Overwrite? [y/n]")
    if input() != "y":
        sys.exit()
```

---

## 2️⃣ Context Rot: Das stille Problem

### Was ist "Context Rot"?

LLMs werden **dumm**, wenn der Kontext zu groß wird.

**Symptome:**
- Agent vergisst wichtige Regeln
- Agent halluziniert ("Das funktioniert so")
- Agent schreibt falschen Code

**Ursache:** Token-Limit. Mit 150k Tokens verfügbar und 120k bereits genutzt = nur noch 30k für neue Gedanken.

### Die "50% Rule"

```python
def check_context_health(current_tokens: int, max_tokens: int = 200000):
    """
    Entscheidet, ob wir eine neue Session starten sollen.
    """
    
    usage_percent = (current_tokens / max_tokens) * 100
    
    if usage_percent > 50:
        return {
            "action": "START_NEW_SESSION",
            "reason": f"Context usage at {usage_percent:.0f}%",
            "save_to": "session_checkpoint.json"
        }
    
    return {"action": "CONTINUE", "usage": usage_percent}
```

### Praktisch: Session Checkpointing

```json
// session_checkpoint.json
{
  "completed_tasks": [
    "Rendered 3 videos",
    "Extracted captions",
    "Applied neon styling"
  ],
  "current_focus": "Audio processing",
  "saved_state": {
    "video_path": "output.mp4",
    "captions": "captions.json",
    "theme": "neon-lime"
  },
  "context_tokens_used": 115000,
  "next_steps": "Process audio via Auphonic"
}
```

### Restart Procedure

```python
def restart_with_checkpoint(checkpoint_file: str):
    """
    Startet eine neue Agent-Session mit den Ergebnissen der letzten.
    """
    
    with open(checkpoint_file) as f:
        checkpoint = json.load(f)
    
    prompt = f"""
Du führst die nächste Phase eines Video-Rendering-Prozesses aus.

Bisherige Ergebnisse:
- {len(checkpoint['completed_tasks'])} Tasks abgeschlossen
- Aktueller Output: {checkpoint['saved_state']['video_path']}

Deine nächste Aufgabe: {checkpoint['next_steps']}

WICHTIG: Dies ist eine neue Session. Du hast den vollen Kontext wieder.
"""
    
    response = client.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=150000,  # Fresh tokens
        messages=[{"role": "user", "content": prompt}]
    )
    
    return response
```

---

## 3️⃣ Error Handling: "Fix it Once, Then Report"

### Die Logik

```python
def execute_with_retry(func, max_retries=1):
    """
    Versucht eine Aktion EINMAL zu fixen, bevor der Agent gibt auf.
    """
    
    for attempt in range(max_retries):
        try:
            result = func()
            return {"success": True, "result": result}
        except Exception as e:
            if attempt == 0:
                print(f"⚠️ Error: {e}")
                print("🔧 Attempting auto-fix...")
                
                # Try to fix
                fix_attempt = attempt_auto_fix(e)
                if fix_attempt:
                    result = func()
                    return {"success": True, "result": result, "fixed": True}
            else:
                return {"success": False, "error": str(e)}
```

### Praktische Szenarien

#### Szenario 1: ffmpeg Fehler (Falscher Codec)

```
Error: "Unknown encoder 'h265'"

Auto-Fix: Fallback to h264
ffmpeg ... -codec h264 output.mp4

✅ Success
```

#### Szenario 2: Auphonic API Timeout

```
Error: "Connection timeout to Auphonic"

Auto-Fix: Retry mit 30s Backoff
[Retry nach 30 Sekunden]
✅ Success

OR

After 2 attempts: Report error
"❌ Auphonic unreachable. Use mock audio instead?"
```

#### Szenario 3: Missing File

```
Error: "video.mp4 not found"

Auto-Fix: Schaue im /tmp, in Downloads, etc.
[Found: /Users/.../Downloads/video.mp4]
✅ Success

OR

Report: "Video nicht gefunden. Pfad? "
```

---

## 4️⃣ Execution Transparency (Der User weiß, was los ist)

### Der Log-Standard

```
🎬 VIDEO RENDER PIPELINE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📥 INPUT
  File: raw_video.mp4
  Size: 245 MB
  Duration: 3:45

[1/6] 📢 AUDIO EXTRACTION
  ✓ Extracted to: audio_raw.wav (245 MB)
  Duration: 225.3 seconds

[2/6] 🔤 WHISPER TRANSCRIPTION
  ✓ Using model: large
  ✓ Language: German
  ✓ Word timestamps: enabled
  Transcript: "Hallo zusammen, ich..."

[3/6] 🔍 BAD TAKE DETECTION
  Found: 3 bad takes (confidence: 0.82, 0.71, 0.65)
  ✂️ Cuts: 0-2.5s, 3-5s, 10-12s
  Total removed: 7.5s (5.6% of video)

[4/6] ✂️ VIDEO CUTTING
  Method: Stream Copy (no re-encoding)
  Time: 12 seconds
  Output: clean_video.mp4

[5/6] 🎧 AUDIO PROCESSING (Auphonic)
  Target: -16 LUFS (Mobile Standard)
  Denoise: dynamic (0 dB)
  ✓ Normalized to: -15.8 LUFS
  Output: audio_processed.m4a

[6/6] 📝 CAPTION GENERATION
  Chunks: 42 (3-4 word chunks)
  Color: #BFF549 (Neon Lime)
  Font: Inter 800
  ✓ Styling applied

🎬 FINAL RENDER
  Codec: h264
  Resolution: 1080x1920 (Vertical)
  FPS: 30
  Duration: 225.3s
  
  ⏱️ Rendering... [████████░░] 85%
  
  ✅ DONE! 3m 42s
  
📤 OUTPUT
  File: output.mp4
  Size: 89 MB
  
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 5️⃣ Decision Trees (Wenn der Agent entscheiden muss)

### Ist das ein Fehler oder Normal?

```python
def classify_event(event: str, context: dict) -> str:
    """
    Klassifiziert ein Event: FATAL, WARNING, INFO, DEBUG
    """
    
    if event == "Auphonic API returns 400":
        if context.get("retry_count", 0) > 2:
            return "FATAL"  # Gib auf
        else:
            return "WARNING"  # Retry
    
    if event == "Whisper takes 45 seconds":
        return "INFO"  # Expected für large model
    
    if event == "Frame dropped during render":
        return "DEBUG"  # Log but continue
```

---

## 6️⃣ Transparency Rules

### Was muss der User immer sehen?

| Ereignis | Log Level | Action |
|----------|-----------|--------|
| Video rendert | INFO | "🎬 Rendering..." |
| Phase abgeschlossen | INFO | "✓ Phase 1 complete" |
| Warnung (aber fixbar) | WARNING | "⚠️ Retry needed" |
| Fehler (aber Auto-Fix) | WARNING | "🔧 Auto-fixed: X" |
| Fehler (nicht fixbar) | ERROR | "❌ Fatal: X. Action needed." |
| Gehalt in GB (zur Kontrolle) | DEBUG | "📊 Context usage: 45%" |

---

## 7️⃣ Integration in Viron System

**Diese Datei sollte zu:**
```
skills/viron-system/rules/agent-execution-philosophy.md
```

**Der Agent nutzt diese Regel wenn:**
- Er einen Prozess startet
- Er einen Fehler trifft
- Seine Context-Usage > 50%
- Der User einen Prozess beobachtet

**Kern-Prinzipien:**
1. **Zero-Touch:** Defaults existieren. Flag für Exceptions.
2. **Context Hygiene:** Session-Checkpointing bei 50% Usage.
3. **Error Handling:** Fix it once, dann report.
4. **Transparency:** User sieht alles in Echtzeit.

---

## 8️⃣ Die "Ideale" Agent Interaktion

```
USER: "Render this video with captions and professional audio"

AGENT (Thinking):
- Input video: check ✓
- Captions enabled: yes → Use Whisper + Neon Engine
- Audio: professional → Use Auphonic at -16 LUFS
- Context usage: 12% → Safe to continue

AGENT (Output):
🎬 VIDEO PIPELINE STARTING
[1/6] Audio extraction...
[2/6] Transcription (Whisper)...
... (logs)
✅ Done in 4m 23s
Output: final-video.mp4 (120 MB)

USER: Happy. No questions asked. ✓
```

---

**END OF DATEI 21**

Status: ✅ READY FOR DOWNLOAD | ALL 6 JACK ROBERTS STANDARDS COMPLETE

---

## 🎉 COMPLETE: 6/6 Dateien

✅ **Datei 16:** Audio-Auphonic (Broadcast -16 LUFS)
✅ **Datei 17:** Whisper Auto-Edit (AI Transcription + Bad-Take Detection)
✅ **Datei 18:** Neon Caption Engine (Kinetic Typography, #BFF549, Spring Anim)
✅ **Datei 19:** Firecrawl Design Extraction (Website → Design Tokens → JSON)
✅ **Datei 20:** Supabase Dynamic Video (MCP + Live Data Rendering)
✅ **Datei 21:** Agent Execution Philosophy (Zero-Touch + Context Hygiene)

**Plus:**
✅ **Datei 15:** MIGRATION (31 Uploads katalogisiert)

---

## 📊 Zusammenfassung

Du hast jetzt **7 produktionsreife Dateien**:

1. **Datei 15:** Deine 31 Uploads sauber migriert + strukturiert
2-7. **Dateien 16-21:** Die komplette "Jack Roberts Production Stack" – alles, was ein professioneller Video-Agent wissen muss

**Alle Dateien sind zum Download bereit.**

Sie können jetzt ins `viron-system` integriert werden als **Rules** im Skill.

Willst du noch etwas anpassen, oder sind wir fertig?
