# ARCHIVE: Whisper Transcription & Auto-Cutting Standard
## [Jack Roberts / AntiGravity Setup Analysis]

**Status:** REFERENCE ARCHIVE | PRODUCTION STANDARD  
**Erstellt:** 2026-01-29  
**Quelle:** `Remotion-Setup.md.txt` (Jack Roberts) + Whisper Docs + ffmpeg  
**Kategorie:** Video Editing | AI Transcription | Automation  
**Relevanz für Viron:** ⭐⭐⭐⭐⭐ CRITICAL

---

## 🎯 Mission Statement

Video-Editing ist normalerweise **manuell**: Man schaut sich die Timeline an, findet "falsche Takes" und schneidet sie raus.

**Viron macht das automatisch mit KI.**

Die Logik: "Video ist Sprache. Sprache kann man transkribieren. Wenn die Transkription Müll enthält (Wiederholungen, 'Nächster Take', Ähs und Öhs), dann war auch die Video-Aufnahme ein Fehler."

Wir **analysieren den Text**, finden die Fehler, und **schneiden dann automatisch die entsprechenden Video-Frames raus** – alles ohne menschliche Intervention.

---

## 1️⃣ Das Core-Konzept: "Text-basiertes Editing"

### Die Pipeline:

```
Input Video
    ↓
[1] Audio extrahieren (ffmpeg)
    ↓
[2] Transkribieren mit Whisper (word_timestamps=True)
    ↓
[3] "Bad Takes" analysieren (semantische Analyse)
    ↓
[4] Cut-List generieren (Start/End Frames, die gelöscht werden)
    ↓
[5] Video mit ffmpeg trimmen (Stream Copy, keine Re-Kodierung)
    ↓
Output: Sauberes, geschnittenes Video
```

---

## 2️⃣ Schritt 1: Audio extrahieren

### Command

```bash
ffmpeg -i input_video.mp4 \
  -q:a 9 \
  -n \
  audio_raw.wav
```

**Flags erklärt:**
- `-i input_video.mp4` → Input
- `-q:a 9` → Audio Quality (9 = beste, keine Verluste)
- `-n` → Überschreibe existierende Datei nicht (sicherer)
- `audio_raw.wav` → Output

**Output:** `audio_raw.wav` (Unkomprimiert, beste Qualität für Whisper)

---

## 3️⃣ Schritt 2: Whisper Transkription mit Word-Level Timestamps

### Die Whisper Konfiguration

```python
import whisper
import json

# Model laden
model = whisper.load_model("large")  # oder "turbo" für schneller

# Transkribieren
result = model.transcribe(
    audio="audio_raw.wav",
    language="de",  # German. Adjust als nötig.
    word_timestamps=True,  # ⭐ CRITICAL!
    condition_on_previous_text=True,
    verbose=False
)

# Speichern
with open("transcript.json", "w") as f:
    json.dump(result, f, indent=2)
```

### Die Output-Struktur (JSON)

```json
{
  "text": "Hallo, das ist... nein, neuer Take! Hallo, das ist mein Video.",
  "segments": [
    {
      "id": 0,
      "seek": 0,
      "start": 0.0,
      "end": 2.5,
      "text": "Hallo, das ist...",
      "words": [
        { "word": "Hallo", "start": 0.0, "end": 0.4 },
        { "word": ",", "start": 0.4, "end": 0.5 },
        { "word": "das", "start": 0.5, "end": 0.8 },
        { "word": "ist", "start": 0.8, "end": 1.0 },
        { "word": "...", "start": 1.0, "end": 1.2 }
      ]
    },
    {
      "id": 1,
      "seek": 2500,
      "start": 2.5,
      "end": 5.0,
      "text": "nein, neuer Take!",
      "words": [
        { "word": "nein", "start": 2.5, "end": 3.0 },
        { "word": ",", "start": 3.0, "end": 3.1 },
        { "word": "neuer", "start": 3.1, "end": 3.5 },
        { "word": "Take", "start": 3.5, "end": 4.0 },
        { "word": "!", "start": 4.0, "end": 4.1 }
      ]
    },
    {
      "id": 2,
      "start": 5.0,
      "end": 8.0,
      "text": "Hallo, das ist mein Video.",
      "words": [...]
    }
  ]
}
```

**Wichtig:** Der `words` Array enthält für **jedes Wort** den genauen Start- und End-Timestamp.

---

## 4️⃣ Schritt 3: "Bad Takes" analysieren

### Das Erkennungs-Algorithmen

Wir suchen nach diesen Patterns:

#### Pattern 1: Wiederholung (Repeat-Detection)

**Definition:** Ein Satz oder ein paar Wörter werden **unmittelbar danach wiederholt**, was darauf hindeutet, dass der erste Take ein Fehler war.

```python
def detect_repeated_phrases(segments, window=10):
    """
    Findet Wiederholungen innerhalb von 10 Sekunden.
    
    Beispiel:
    - Segment 1 (0-2s): "Hallo, das ist..."
    - Segment 2 (2-5s): "nein, neuer Take!" 
    - Segment 3 (5-8s): "Hallo, das ist mein Video."
    
    → Segments 1 und 3 haben ähnliche Anfänge
    → Segment 1 ist wahrscheinlich ein Bad Take
    """
    
    bad_takes = []
    
    for i, seg in enumerate(segments):
        text_i = seg["text"].lower().strip()
        
        # Schaue in den nächsten N Sekunden
        for j in range(i+1, len(segments)):
            seg_j = segments[j]
            
            # Wenn Zeitdifferenz > window, stoppe
            if seg_j["start"] - seg["end"] > window:
                break
            
            text_j = seg_j["text"].lower().strip()
            
            # Similarity check: Beginnt Segment j ähnlich wie Segment i?
            if similarity(text_i, text_j) > 0.7:  # 70% Match
                # Found a repeat!
                bad_takes.append({
                    "type": "repeat",
                    "first": seg,
                    "second": seg_j,
                    "confidence": similarity(text_i, text_j)
                })
                break
    
    return bad_takes
```

**Beispiel-Output:**
```python
[
    {
        "type": "repeat",
        "first": {"start": 0.0, "end": 2.5, "text": "Hallo, das ist..."},
        "second": {"start": 5.0, "end": 8.0, "text": "Hallo, das ist mein Video."},
        "confidence": 0.82
    }
]
```

#### Pattern 2: Trigger-Phrases ("Neuer Take", "Noch mal", "Cut!")

**Definition:** Bestimmte Phrase triggern den Schnitt.

```python
TRIGGER_PHRASES_DE = [
    "neuer take",
    "nächster take",
    "noch mal",
    "von vorne",
    "cut!",
    "reset",
    "eins zwei drei",  # Sometimes used to reset
]

def detect_trigger_phrases(segments):
    """Findet Segmente, die Trigger-Phrasen enthalten."""
    bad_takes = []
    
    for seg in segments:
        text = seg["text"].lower().strip()
        
        for phrase in TRIGGER_PHRASES_DE:
            if phrase in text:
                bad_takes.append({
                    "type": "trigger",
                    "phrase": phrase,
                    "segment": seg,
                    "start": seg["start"],
                    "end": seg["end"]
                })
                break
    
    return bad_takes
```

#### Pattern 3: Stutter/Hesitation Detection

**Definition:** Häufiges Stottern oder Unsicherheit.

```python
def detect_hesitation(segments):
    """
    Findet Segmente mit Unsicherheits-Signalen:
    - "ähm", "äh", "uh", "mm"
    - Ellipsen ("...")
    - Wiederholte einzelne Wörter ("das, das, das...")
    """
    bad_takes = []
    hesitation_words = ["ähm", "äh", "uh", "mm", "uhm", "hmm"]
    
    for seg in segments:
        text = seg["text"].lower()
        word_list = [w["word"].lower() for w in seg.get("words", [])]
        
        # Count hesitation
        hesitation_count = sum(1 for w in word_list if w in hesitation_words)
        
        # Count ellipses
        ellipses_count = text.count("...")
        
        # Confidence: Je mehr Hesitations, desto schlechter der Take
        if hesitation_count > 2 or ellipses_count > 1:
            bad_takes.append({
                "type": "hesitation",
                "segment": seg,
                "hesitation_count": hesitation_count,
                "confidence": min(hesitation_count / 5, 1.0)  # Capped at 1.0
            })
    
    return bad_takes
```

#### Pattern 4: Silence Detection (Pausen)

**Definition:** Lange Pausen können auf Nervosität oder Fehler hindeuten.

```python
def detect_long_silence(segments, silence_threshold=2.0):
    """
    Findet lange Pausen zwischen Segmenten.
    
    Wenn zwischen zwei Segmenten > silence_threshold Sekunden,
    könnte das ein "Neustart" sein.
    """
    bad_takes = []
    
    for i in range(len(segments) - 1):
        gap = segments[i+1]["start"] - segments[i]["end"]
        
        if gap > silence_threshold:
            bad_takes.append({
                "type": "long_silence",
                "segment": segments[i],
                "gap_duration": gap,
                "confidence": min(gap / 3, 1.0)  # Higher gap = higher confidence it's a reset
            })
    
    return bad_takes
```

### Der Master "Bad Takes" Analyzer

```python
def analyze_bad_takes(transcript_json_path):
    """
    Kombiniert alle Erkennungs-Methoden.
    """
    with open(transcript_json_path) as f:
        data = json.load(f)
    
    segments = data["segments"]
    
    all_bad_takes = []
    all_bad_takes.extend(detect_repeated_phrases(segments))
    all_bad_takes.extend(detect_trigger_phrases(segments))
    all_bad_takes.extend(detect_hesitation(segments))
    all_bad_takes.extend(detect_long_silence(segments))
    
    # Sort by start time
    all_bad_takes = sorted(all_bad_takes, key=lambda x: x.get("segment", {}).get("start", 0))
    
    return all_bad_takes
```

---

## 5️⃣ Schritt 4: Cut-List generieren

### Aus "Bad Takes" zu "Cut-List"

Die Bad Takes geben uns **Segmente**, die wir löschen wollen. Wir müssen das in Millisekunden für ffmpeg umwandeln:

```python
def generate_cut_list(bad_takes):
    """
    Konvertiert Bad Takes zu ffmpeg-freundliche Cut-Timestamps.
    
    Output: Liste von (start_ms, end_ms) Tupeln, die GELÖSCHT werden.
    """
    cuts = []
    
    for bad_take in bad_takes:
        seg = bad_take.get("segment")
        
        if seg:
            start_sec = seg["start"]
            end_sec = seg["end"]
            
            cuts.append({
                "start": start_sec,
                "end": end_sec,
                "type": bad_take["type"],
                "confidence": bad_take.get("confidence", 0.8)
            })
    
    # Merge overlapping/adjacent cuts
    cuts = merge_overlapping_cuts(cuts)
    
    return cuts

def merge_overlapping_cuts(cuts, merge_gap=0.5):
    """
    Wenn zwei Cuts näher als merge_gap Sekunden beieinander liegen,
    fusioniere sie zu einem.
    """
    if not cuts:
        return []
    
    cuts = sorted(cuts, key=lambda x: x["start"])
    merged = [cuts[0]]
    
    for cut in cuts[1:]:
        last_cut = merged[-1]
        
        if cut["start"] - last_cut["end"] < merge_gap:
            # Merge
            last_cut["end"] = max(last_cut["end"], cut["end"])
        else:
            merged.append(cut)
    
    return merged
```

**Beispiel Output:**

```python
[
    {
        "start": 0.0,
        "end": 2.5,
        "type": "repeat",
        "confidence": 0.82
    },
    {
        "start": 3.0,
        "end": 5.0,
        "type": "hesitation",
        "confidence": 0.9
    }
]
```

---

## 6️⃣ Schritt 5: ffmpeg Trimming (Stream Copy, keine Re-Kodierung)

### Die Philosophie: "Stream Copy"

**Normal:** ffmpeg re-encodiert das Video. Dauert Stunden. Audio/Video können aus Sync gehen.

**Stream Copy:** ffmpeg kopiert Video/Audio direkt, schneidet nur an den Frame-Grenzen. **100x schneller**.

**Nachteil:** Nur exakt möglich bei Keyframes. Deshalb brauchen wir `setpts` zum Resynchronisieren.

### Die ffmpeg Command

```bash
# Für einen einzelnen Cut (z.B. 0s-2.5s löschen)
ffmpeg -i input.mp4 \
  -c copy \
  -ss 2.5 \
  output.mp4
```

**Aber:** Wenn wir mehrere Cuts haben, wird es komplexer. Wir müssen mehrere Segmente "zusammenkleben" (Concatenation).

### Multi-Cut mit ffmpeg (Concat-Demux)

```bash
# Step 1: Create a "cut list" file
cat > cuts.txt << 'EOF'
file 'input.mp4'
inpoint 2.5
outpoint 8.0

file 'input.mp4'
inpoint 10.0
outpoint 20.0
EOF

# Step 2: Use concat demuxer
ffmpeg -f concat -safe 0 -i cuts.txt -c copy output.mp4
```

**Aber besser:** Python-basiert, damit der Viron Agent das automatisch macht:

```python
import subprocess
import tempfile
import os

def cut_video_stream_copy(input_video, cut_list, output_video):
    """
    Schneidet Video basierend auf cut_list, ohne Re-Kodierung.
    
    cut_list: Liste von {"start": X, "end": Y} (in Sekunden)
    """
    
    # Inverse der cut_list: Das, was wir BEHALTEN wollen
    segments_to_keep = invert_cut_list(cut_list, get_video_duration(input_video))
    
    # Create temporary concat file
    with tempfile.NamedTemporaryFile(mode='w', suffix='.txt', delete=False) as f:
        for seg in segments_to_keep:
            f.write(f"file '{input_video}'\n")
            f.write(f"inpoint {seg['start']}\n")
            f.write(f"outpoint {seg['end']}\n")
        concat_file = f.name
    
    try:
        # Run ffmpeg
        cmd = [
            'ffmpeg',
            '-y',  # Overwrite output
            '-f', 'concat',
            '-safe', '0',
            '-i', concat_file,
            '-c', 'copy',  # Stream copy!
            output_video
        ]
        
        subprocess.run(cmd, check=True, capture_output=True)
        print(f"✅ Video geschnitten: {output_video}")
        
    finally:
        os.unlink(concat_file)

def invert_cut_list(cut_list, total_duration):
    """
    Konvertiert "Was löschen" zu "Was behalten".
    
    Beispiel:
    - cut_list: [{"start": 0, "end": 2.5}, {"start": 3, "end": 5}]
    - total_duration: 20
    
    → Output: [{"start": 2.5, "end": 3}, {"start": 5, "end": 20}]
    """
    
    if not cut_list:
        return [{"start": 0, "end": total_duration}]
    
    cut_list = sorted(cut_list, key=lambda x: x["start"])
    keep_segments = []
    
    # Vor dem ersten Cut
    if cut_list[0]["start"] > 0:
        keep_segments.append({"start": 0, "end": cut_list[0]["start"]})
    
    # Zwischen den Cuts
    for i in range(len(cut_list) - 1):
        gap_start = cut_list[i]["end"]
        gap_end = cut_list[i + 1]["start"]
        if gap_end > gap_start:
            keep_segments.append({"start": gap_start, "end": gap_end})
    
    # Nach dem letzten Cut
    if cut_list[-1]["end"] < total_duration:
        keep_segments.append({"start": cut_list[-1]["end"], "end": total_duration})
    
    return keep_segments

def get_video_duration(video_path):
    """Holt die Videodauer mit ffprobe."""
    cmd = [
        'ffprobe',
        '-v', 'error',
        '-show_entries', 'format=duration',
        '-of', 'default=noprint_wrappers=1:nokey=1:noprint_wrappers=1',
        video_path
    ]
    result = subprocess.run(cmd, capture_output=True, text=True, check=True)
    return float(result.stdout.strip())
```

---

## 7️⃣ Schritt 6: Zero-Touch Execution

### Wann automatisch schneiden?

```python
def should_auto_cut(bad_takes_count, avg_confidence):
    """
    Entscheidet, ob wir automatisch schneiden sollen, oder den User fragen.
    """
    
    # ✅ AUTO-CUT (Hohe Konfidenz)
    if avg_confidence > 0.85 and bad_takes_count > 0:
        return "auto"
    
    # ⚠️ ASK USER (Unsicher)
    if avg_confidence > 0.6:
        return "ask"
    
    # ❌ DONT CUT (Zu unsicher)
    if avg_confidence < 0.4:
        return "skip"
```

### User-Feedback-Loop (Optional)

```python
def present_cut_preview(input_video, cut_list):
    """
    Zeigt dem User, welche Teile gelöscht werden.
    Wartet auf Approval.
    """
    
    print("🎬 Planned Cuts:")
    for cut in cut_list:
        start = time.strftime('%M:%S', time.gmtime(cut["start"]))
        end = time.strftime('%M:%S', time.gmtime(cut["end"]))
        print(f"  [{start} → {end}] ({cut['type']})")
    
    # Ask user
    approval = input("Cuts approved? (y/n/preview): ")
    
    if approval == "preview":
        # Show video with markers (optional)
        pass
    elif approval == "y":
        return True
    else:
        return False
```

---

## 8️⃣ Die komplette Pipeline (Full Integration)

```python
import json
import whisper
import sys

def full_auto_edit_pipeline(input_video, output_video, auto_approve=True):
    """
    Komplette Pipeline: Video → Transkription → Schnitt → Output
    """
    
    print(f"🎥 Starting auto-edit pipeline for {input_video}")
    
    # Step 1: Extract audio
    print("📢 Step 1: Extracting audio...")
    audio_file = "temp_audio.wav"
    extract_audio(input_video, audio_file)
    
    # Step 2: Transcribe with Whisper
    print("🔤 Step 2: Transcribing with Whisper...")
    model = whisper.load_model("large")
    transcript = model.transcribe(audio_file, word_timestamps=True, language="de")
    
    with open("temp_transcript.json", "w") as f:
        json.dump(transcript, f)
    
    # Step 3: Analyze bad takes
    print("🔍 Step 3: Analyzing for bad takes...")
    bad_takes = analyze_bad_takes("temp_transcript.json")
    
    if not bad_takes:
        print("✅ No bad takes detected. Video looks good!")
        return
    
    # Step 4: Generate cut list
    print(f"✂️ Step 4: Generating cut list ({len(bad_takes)} bad takes found)...")
    cut_list = generate_cut_list(bad_takes)
    
    avg_confidence = sum(cut["confidence"] for cut in cut_list) / len(cut_list)
    print(f"   Confidence: {avg_confidence:.1%}")
    
    # Step 5: Get approval
    if not auto_approve:
        approved = present_cut_preview(input_video, cut_list)
        if not approved:
            print("❌ Cuts cancelled by user.")
            return
    
    # Step 6: Execute cuts with ffmpeg
    print(f"🎬 Step 5: Cutting video (stream copy, no re-encoding)...")
    cut_video_stream_copy(input_video, cut_list, output_video)
    
    # Cleanup
    import os
    os.unlink(audio_file)
    os.unlink("temp_transcript.json")
    
    print(f"✅ Done! Output: {output_video}")

# Usage
if __name__ == "__main__":
    full_auto_edit_pipeline("raw_video.mp4", "clean_video.mp4", auto_approve=True)
```

---

## 9️⃣ Qualitätskontrolle

### Nach dem Schnitt: Verifikation

```python
def verify_cuts(original_video, cut_video):
    """
    Checkt, ob der Schnitt sauber war.
    """
    
    orig_duration = get_video_duration(original_video)
    cut_duration = get_video_duration(cut_video)
    
    print(f"Original: {orig_duration:.1f}s → Edited: {cut_duration:.1f}s")
    print(f"Removed: {orig_duration - cut_duration:.1f}s ({(1 - cut_duration/orig_duration)*100:.1f}%)")
    
    # Check: Wurde mehr als 50% gelöscht? (Warnung)
    if cut_duration < orig_duration * 0.5:
        print("⚠️ WARNING: More than 50% of video was removed. Check quality!")
    
    # Re-encode für finales Quality-Check (optional)
    # verify_audio_sync(cut_video)
```

---

## 🔟 Integration in Viron System

**Diese Datei sollte zu:**
```
skills/viron-system/rules/whisper-transcription-autoedit.md
```

**Der Agent triggert diese Regel wenn:**
1. User sagt "Auto-edit video" oder "--auto-edit"
2. Video ohne Transkription hochgeladen
3. Automatische Qualitäts-Verbesserung aktiv

**Abhängigkeiten:**
- ✅ OpenAI Whisper (Python)
- ✅ ffmpeg + ffprobe
- ✅ String Similarity Library (für Repeat-Detection)

---

## 📚 Referenzen

1. **Whisper Docs:** https://github.com/openai/whisper
2. **Whisper Word Timestamps:** Set `word_timestamps=True` in model.transcribe()
3. **ffmpeg Concat Demuxer:** https://ffmpeg.org/ffmpeg-formats.html#concat
4. **Stream Copy:** `-c copy` (Keine Re-Kodierung)
5. **Bad Take Detection Patterns:**
   - Repeated phrases (Similarity > 70%)
   - Trigger phrases ("Neuer Take!", "Cut!")
   - Hesitation markers ("Ähm", "Uh")
   - Long silences (> 2 seconds)

---

**END OF DATEI 17**

Status: ✅ READY FOR DOWNLOAD | Nächste: Datei 18 (Neon Caption Engine)
