# DIFF: V4 (Ausführlich) vs Template V2 (Kompakt)

## 🔴 V4: Concurrency Formula (Mit Problem/Lösung/Beispiel)

```markdown
### 1. Viron Concurrency Formula

**Das Problem:** Standard-Remotion sagt "nutze so viele CPUs wie möglich". 
Das führt bei 4K-Rendern zu Out-of-Memory-Kills.

**Die Viron-Lösung:** Aggressive RAM-Halbiering mit CPU-Cap.

**Schlüsselzahlen:**
- 🔑 **RAM-Teiler: 2** (nur 50% RAM)
- 🔑 **CPU-Faktor: 1.5x** (Hyperthreading)
- 🔑 **Hard Limit: 16** (Lambda)

**Beispiel:** 8-Core-MacBook mit 16GB RAM
- Standard: 16 Prozesse → OOM-Kill bei 4K
- Viron: min(12, 8, 16) = **8 Prozesse** → Stabil
```

---

## 🟢 Template V2: Concurrency Formula (Direkt zur Tabelle)

```markdown
### THE CONCURRENCY FORMULA

**Kontext (V1):** RAM-bounded parallelism prevents OOM kills.

| Limit | Wert | Bedeutung |
|:------|:-----|:----------|
| RAM-Teiler | 2 | 50% RAM max |
| CPU-Faktor | 1.5x | Hyperthreading |
| Hard Cap | 16 | Lambda Limit |
```

---

## 📝 Erklärung der Unterschiede

| Aspekt | V4 | Template V2 |
|:-------|:---|:------------|
| **Struktur** | Problem→Lösung→Beispiel | Kontext→Tabelle |
| **Länge** | ~25 Zeilen | ~10 Zeilen |
| **Erzählung** | "Das Problem", konkretes Beispiel | Nicht vorhanden |
| **Scan-Barkeit** | Weniger (Text-Wand) | Hoch (Tabelle) |

**Trade-off:** 
- V4 = Besseres Verständnis durch Storytelling
- V2 = Schneller scannbar, aber weniger Kontext
