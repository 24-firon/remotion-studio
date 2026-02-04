# ARCHIVE: Auphonic Broadcast Audio Processing Standard
## [Jack Roberts / AntiGravity Setup Analysis]

**Status:** REFERENCE ARCHIVE | PRODUCTION STANDARD  
**Erstellt:** 2026-01-29  
**Quelle:** `Remotion-Setup.md.txt` (Jack Roberts) + Auphonic API Docs  
**Kategorie:** Audio Engineering | Automation  
**Relevanz für Viron:** ⭐⭐⭐⭐⭐ CRITICAL

---

## 🎯 Mission Statement

Audio ist **binär**: Entweder "Broadcast Grade" oder "Amateur".

Es gibt keine Grauzone in der Automatisierung.

Dieser Standard definiert, wie jede einzelne Audio-Spur, die aus Viron kommt, klingt. Nicht "gut genug". Nicht "okay". Sondern: **Professionell genug, um live auf YouTube/Spotify/TikTok zu gehen, ohne dass jemand sagt "Das Lama klingt merkwürdig".**

Wir ersetzen manuelles Audio-Mixing (EQ, Compression, Normalization) durch eine **deterministische API-Schicht** (Auphonic).

---

## 1️⃣ Die Zielspezifikation (Die "Goldenen Parameter")

Diese Werte gelten für **ALLE Viron-Videos**, wenn nicht anders angegeben.

### Audio-Metriken (Der Standard)

| Metrik | Wert | Standard | Grund |
|--------|------|----------|-------|
| **Loudness Target** | `-16 LUFS` | Mobile/Social | TikTok, YouTube Shorts, Instagram Reels nutzen diesen Standard. TV-Standard (-23 LUFS) ist zu leise für Mobile |
| **True Peak** | `-1.5 dBTP` | Safety Margin | Headroom für Transcoding & Streaming-Algorithmen. Nicht unter -1 dBTP (Clipping möglich) |
| **Dynamic Range** | Adaptive | Context | Musik = mehr Dynamik, Voiceovers = mehr Kompression |
| **Noise Gate** | Auto | Intelligenz | Automatische Stille-Erkennung. Keine harcktierten Thresholds |

### Denoise Strategy (Das "Warum" ist wichtig)

Die Denoise-Methode hängt vom Input ab:

| Scenario | Denoisemethod | Denoiseamount | Grund |
|----------|---------------|---------------|-------|
| **Voiceover** (Sauberes Mikrofon) | `dynamic` | `0` (Auto) | Entfernt Hintergrund, behält Voice. Audio-Interface-Rauschen minimal. |
| **Live-Aufnahme** (Kaffeehaus, Straße) | `dynamic` | `6` dB | Stärker. Hält Sprache, entfernt Umgebung. |
| **Musik-Track** (Synthesizer, Beat) | `classic` | `-1` (Aus!) | NICHT DENOISIEREN. Synthetics haben kein "Rauschen", nur Frequenzen. Dynamic würde Musik auslöschen. |
| **Podcast-Mix** (Voiceover + Background Music) | `dynamic` | `3` dB (Medium) | Balance. Stimme bleibt klar, aber nicht zu aggressiv |

---

## 2️⃣ Die API-Integration (Wie man es umsetzt)

### Auphonic Production Workflow

**Phase 1: Production erstellen**

```json
POST https://auphonic.com/api/productions.json
Authorization: Bearer {API_KEY}
Content-Type: application/json

{
  "metadata": {
    "title": "Viron_Video_{timestamp}",
    "artist": "Viron System",
    "tags": ["viron-auto", "broadcast"]
  },
  "algorithms": {
    "leveler": true,
    "normloudness": true,
    "loudnesstarget": -16,
    "loudnessmethod": "dialog",
    "denoise": true,
    "denoisemethod": "dynamic",
    "denoiseamount": 0,
    "dehum": 50,
    "dehumamount": 0,
    "maxpeak": -1.5,
    "filtering": true,
    "filtermethod": "hipfilter"
  },
  "output_basename": "processed_audio"
}
```

**Response (wichtig):**

```json
{
  "status_code": 200,
  "data": {
    "uuid": "AbC1234XyZ5678..."  ← SPEICHERN! Das brauchst du später
  }
}
```

**Phase 2: Audio-Datei uploaden**

```bash
# Entweder per Direct Upload oder via Input Service (S3, FTP, etc.)
curl -X POST \
  https://auphonic.com/api/production/{uuid}/upload.json \
  -H "Authorization: Bearer {API_KEY}" \
  -F "input_file=@audio.wav"
```

**Phase 3: Processing starten**

```json
POST https://auphonic.com/api/production/{uuid}.json
Authorization: Bearer {API_KEY}
Content-Type: application/json

{
  "action": "start"
}
```

**Phase 4: Status abfragen (Polling)**

```bash
# Alle 2-5 Sekunden checken, bis status == "Done"
curl -s https://auphonic.com/api/production/{uuid}.json \
  -H "Authorization: Bearer {API_KEY}" | jq '.data.status'

# Mögliche Status:
# - "Initializing" → "Preprocessing" → "Processing" → "Finalizing" → "Done"
```

**Phase 5: Ergebnis downloaden**

```json
// Wenn status == "Done", output_files enthalten die Result-URL
{
  "status_code": 200,
  "data": {
    "uuid": "AbC1234...",
    "status": "Done",
    "output_files": [
      {
        "format": "aac",
        "suffix": ".m4a",
        "url": "https://download-url.../processed_audio.m4a"
      }
    ]
  }
}
```

---

## 3️⃣ Die Fehlerbehandlung (Was kann schiefgehen)

### Error Scenario 1: "Production nicht erkannt"

```json
{
  "status_code": 404,
  "error": "Production with uuid XYZ not found"
}
```

**Was tun:**
- UUID wurde falsch gespeichert.
- API-Key ist abgelaufen.
- **Fix:** Neue Production erstellen, nächster Versuch.

### Error Scenario 2: "Input file zu groß"

```json
{
  "status_code": 413,
  "error": "File exceeds maximum size of 2GB"
}
```

**Was tun:**
- Auphonic hat ein 2GB Limit. Bei längeren Videos muss man chunken.
- **Fix:** Video mit ffmpeg in Segmente teilen, parallel verarbeiten.

### Error Scenario 3: "Denoise hat Musik ruiniert"

(Nicht als API-Error, aber häufiges Problem)

**Symptom:** Die verarbeitete Datei klingt "komprimiert" oder "digital".

**Ursache:** Falscher Denoisemethod für Musik.

**Fix:** In der Production Settings:
```json
"denoisemethod": "classic",
"denoiseamount": -1  // Denoise disabled
```

---

## 4️⃣ Broadcast-Standard Presets (Vorgefertigte Konfigurationen)

Statt jedes Mal die Parameter neu zu setzen, verwenden wir "Presets".

### Preset 1: "Viron_Dialog_Broadcast" (Default)

**Für:** Voiceover, Interviews, Erklärvideos

```json
{
  "preset_name": "Viron_Dialog_Broadcast",
  "algorithms": {
    "leveler": true,
    "levelerstrength": 50,
    "normloudness": true,
    "loudnesstarget": -16,
    "loudnessmethod": "dialog",
    "denoise": true,
    "denoisemethod": "dynamic",
    "denoiseamount": 0,
    "dehum": 50,
    "maxpeak": -1.5,
    "filtering": true
  }
}
```

**Ergebnis:** Voice ist klar, gleichmäßig, keine Schwankungen.

### Preset 2: "Viron_Music_Dynamic" (Musik-spezifisch)

**Für:** Musik-Videos, Beats, Synthesizer

```json
{
  "preset_name": "Viron_Music_Dynamic",
  "algorithms": {
    "leveler": true,
    "levelerstrength": 20,
    "normloudness": true,
    "loudnesstarget": -16,
    "loudnessmethod": "dialog",
    "denoise": false,  // NICHT AKTIVIEREN
    "maxpeak": -1.5,
    "filtering": false  // Auch kein High-Pass Filter
  }
}
```

**Ergebnis:** Musik behält Dynamik, klingt natürlich, wird aber auf -16 LUFS normalisiert.

### Preset 3: "Viron_Noise_Aggressive" (Noisy Input)

**Für:** Aufnahmen von draußen, Kaffeehaus, alte Mikrofone

```json
{
  "preset_name": "Viron_Noise_Aggressive",
  "algorithms": {
    "leveler": true,
    "levelerstrength": 80,
    "normloudness": true,
    "loudnesstarget": -16,
    "denoise": true,
    "denoisemethod": "dynamic",
    "denoiseamount": 6,  // Stärker
    "dehum": 50,
    "dehumamount": 12,
    "filtering": true,
    "maxpeak": -1.5
  }
}
```

**Ergebnis:** Aggressive Noise-Reduktion. Stimme wird "befreit" vom Chaos.

---

## 5️⃣ Integration mit Remotion (Der Praktische Teil)

Wenn Viron ein Video rendert, das Audio hat:

### Schritt 1: Audio extrahieren (aus Original-Video oder separaten Datei)

```bash
ffmpeg -i input_video.mp4 -q:a 9 -n audio_raw.wav
```

### Schritt 2: An Auphonic schicken (Node.js Code-Pattern)

```javascript
// Pseudo-Code für den Viron Agent

async function processAudioBroadcast(audioFile) {
  const apiKey = process.env.AUPHONIC_API_KEY;
  
  // 1. Production erstellen
  const production = await fetch('https://auphonic.com/api/productions.json', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      metadata: { title: 'viron_audio_' + Date.now() },
      algorithms: PRESET_DIALOG_BROADCAST
    })
  }).then(r => r.json());
  
  const uuid = production.data.uuid;
  
  // 2. File uploaden
  const formData = new FormData();
  formData.append('input_file', fs.createReadStream(audioFile));
  
  await fetch(`https://auphonic.com/api/production/${uuid}/upload.json`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiKey}` },
    body: formData
  });
  
  // 3. Processing starten
  await fetch(`https://auphonic.com/api/production/${uuid}.json`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiKey}` },
    body: JSON.stringify({ action: 'start' })
  });
  
  // 4. Auf Fertigstellung warten (max 5 Minuten)
  let status = 'Processing';
  let attempts = 0;
  
  while (status !== 'Done' && attempts < 150) { // 150 * 2s = 300s = 5 min
    await new Promise(r => setTimeout(r, 2000)); // Warte 2 Sekunden
    
    const check = await fetch(`https://auphonic.com/api/production/${uuid}.json`, {
      headers: { 'Authorization': `Bearer ${apiKey}` }
    }).then(r => r.json());
    
    status = check.data.status;
    attempts++;
    
    if (status === 'Error') {
      throw new Error(`Auphonic Error: ${check.data.error}`);
    }
  }
  
  // 5. Download-URL holen
  const result = await fetch(`https://auphonic.com/api/production/${uuid}.json`, {
    headers: { 'Authorization': `Bearer ${apiKey}` }
  }).then(r => r.json());
  
  const downloadUrl = result.data.output_files[0].url;
  
  // 6. Datei downloaden
  const response = await fetch(downloadUrl);
  const buffer = await response.buffer();
  fs.writeFileSync('audio_processed.m4a', buffer);
  
  return 'audio_processed.m4a';
}
```

### Schritt 3: Verarbeitete Audio in Video-Rendering einbetten

```tsx
// Remotion Composition
export const MyVideo: React.FC = () => {
  const { durationInFrames } = useVideoConfig();
  
  return (
    <AbsoluteFill>
      {/* Visueller Content */}
      <Video src="background_video.mp4" muted />
      
      {/* Audio (nach Auphonic-Verarbeitung) */}
      <Audio src="audio_processed.m4a" />
    </AbsoluteFill>
  );
};
```

### Schritt 4: Final rendern

```bash
npx remotion render MyVideo output.mp4 --codec h264
```

**Ergebnis:** Ein Video, bei dem Audio auf -16 LUFS genormt ist, ohne Rauschen, ohne Schwankungen.

---

## 6️⃣ Die "Zero-Touch" Execution Rules

Wann sollte der Viron Agent diese Pipeline **automatisch** starten, ohne zu fragen?

### ✅ AUTO-PROCESS (Keine Fragen stellen)

- Benutzer uploaded ein Video mit Voiceover
- Benutzer gibt einen `--process-audio` Flag
- Benutzer sagt "Mach das Video fertig"

**Action:** Auphonic-Pipeline läuft im Hintergrund.

### ⚠️ ASK USER

- Audio bereits extrem laut (-8 LUFS)
- Audio bereits sehr leise (-26 LUFS)
- Musik wird erkannt (Denoisemethod könnte zu aggressiv sein)

**Action:** Agent fragt: "Dein Audio ist schon [X]. Soll ich trotzdem normalisieren?"

### ❌ WARNUNG

- Auphonic API-Key fehlt → "Kann nicht verarbeiten ohne API-Key"
- File > 2GB → "Zu groß. Bitte segmentieren."
- Netzwerk-Fehler → "Auphonic nicht erreichbar. Retry in 30s?"

---

## 7️⃣ Kostenmodell (Die Geschäftsseite)

Auphonic hat **kostenlosen** Tier (begrenzte Nutzung) und **Pro** Tier.

**Viron-Strategie:**
- Für kleine Videos (< 10 Min) → Kostenlos
- Für große Projekte → Pro-Abo empfehlen ("Für bessere Priorität")

**Monthly Cost (Pro Tier):** ~$50 USD für unlimitierte Processing.

---

## 8️⃣ Qualitätskontrolle (Wie man weiß, ob es geklappt hat)

Nach dem Processing sollte jede Datei diese Metriken erfüllen:

```json
{
  "loudness": {
    "integrated": -16.0,      // ± 0.5 LUFS
    "short_term": [-15, -17], // Keine Spitzen
    "momentary": [-10, -20]   // Max -10, Min nicht unter -20
  },
  "true_peak": -1.5,          // Exakt oder besser
  "dynamic_range": "5-8 LU"   // Für Dialog (Musik: 10-12 LU)
}
```

Wenn diese Werte nicht stimmen → **Preset überprüfen** oder manuell adjustieren.

---

## 🎯 Integration in Viron System

**Diese Datei sollte zu:**
```
skills/viron-system/rules/audio-auphonic-broadcast.md
```

**Der Agent liest diese Regel wenn:**
1. User triggert "Render Video with Professional Audio"
2. System erkennt Audio-Input
3. Automatische Audio-Verbesserung ist aktiv

**Abhängigkeiten:**
- ✅ Auphonic API-Key in Umgebungsvariablen
- ✅ Node.js + fetch API
- ✅ ffmpeg (für Audio-Extraktion)
- ✅ Remotion (für Video-Integration)

---

## 📚 Referenzen

1. **Auphonic Docs:** https://auphonic.com/help/api/
2. **LUFS Standard (Mobile):** -16 LUFS für YouTube Shorts/TikTok
3. **True Peak Safety:** -1.5 dBTP ist Broadcasting Standard
4. **Denoisemethod Vergleich:**
   - `classic` = Old-School (beste für Musik)
   - `dynamic` = Modern (beste für Voice + Noise Mix)
   - `speech_isolation` = Aggressiv (nur Voice behalten)

---

**END OF DATEI 16**

Status: ✅ READY FOR DOWNLOAD | Nächste: Datei 17 (Whisper Auto-Edit)
