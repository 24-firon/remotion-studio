# 🛠️ Antigravity Config Hack

**File Location:**
`C:\Users\bachl\AppData\Roaming\Antigravity\User\settings.json`

**Confirmed Syntax:**
Keys use the `antigravity.` prefix.

**Experimental Keys (Try manually):**

```json
// Potentially valid keys to force lower temperature
"antigravity.agent.temperature": 0.5,
"antigravity.model.temperature": 0.5,
"antigravity.agent.model.parameters": {
  "temperature": 0.5,
  "top_p": 0.9
}
```

**Warning:**
Google recommends `temperature: 1.0` for Gemini 3. Altering this might cause loops.
