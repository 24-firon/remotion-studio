🌉 VIRON_KNOWLEDGE_BRIDGE (Partial - For Badge 1)

Status: CENSORED (Time-Laws removed to force re-extraction)
Zweck: Infrastruktur-Kontext für den Timeline-Architekten.
⚡ 1. INFRASTRUKTUR & HARDWARE-GESETZE (Authority: Badge 7)

Kritisch für deine Architektur-Entscheidungen.
1.1 Das Concurrency-Gesetz (Anti-OOM)

Viron skaliert nicht nach CPU-Kernen, sondern nach RAM-Verfügbarkeit.

    Die Formel: Math.min(optimalConcurrency, ramLimit, 16).

    RAM-Faktoren:

        Standard 2D: 2GB RAM / Thread.

        Heavy 3D: 4GB RAM / Thread.

        Volumetric: 8GB RAM / Thread.

    Safety Margin: Maximal 50% des System-RAMs dürfen für das Rendering genutzt werden.

    Hard Cap: Absolutes Limit von 16 parallelen Prozessen (AWS Lambda Limit & I/O-Schutz).

1.2 Die Cloud-Ökonomie (Lambda Tiers)

Jeder Render-Job muss basierend auf seinem Zweck einem Tier zugeordnet werden:
| Tier | CRF (Qualität) | Workers | Kosten/Min | Use Case |
|:---|:---|:---|:---|:---|
| DRAFT | 28 | 4 | $0.10 | Schnelle interne Previews |
| STANDARD | 20 | 8 | $0.50 | Social Media / Daily |
| HIGH | 16 | 16 | $1.20 | Client Reviews |
| ULTRA | 10 | 32 | $2.80 | Broadcast / Cinema |
⏳ 2. CORE PHYSICS & TIME-LAWS

(Diese Sektion wurde absichtlich entfernt. Deine Mission ist es, diese Gesetze aus den Gold-Dateien neu zu extrahieren und zu beweisen.)
🧠 3. ORCHESTRATION & ROUTING (Authority: Badge 7/8)

Wie dein Output genutzt wird.
3.1 Das Routing-Gehirn (Input Detection)

    URL (http) → DEPT_WEB

    .mp4 / .mov → DEPT_VIDEO + RENDER

    .wav / .mp3 → DEPT_AUDIO

    .json (Colors/Fonts) → DEPT_ENGINE (Tokens)

3.2 Die Synchronisations-Toleranz

    Limit: Maximal 2 Frames Abweichung zwischen Audio-Stream und Video-Frame.

    Aktion: Bei Überschreitung erfolgt ein automatischer HARD FAIL des Render-Vorgangs.

🛡️ 4. GOVERNANCE & PROZESS-RECHTE (Authority: Badge 8)

Wie du arbeitest.
4.1 Der Double-Turn-Lock (Git)

    Regel: write_to_file und git commit niemals im selben Turn.

    Ablauf: Agent schlägt Änderung vor → User gibt "Go" → Agent committet.

4.2 Die Token-Ökonomie (Context Safety)

    Orchestrator-Limit: 200.000 Tokens.

    Sub-Agent-Limit: 50.000 Tokens.

    Action: Bei Erreichen der "Danger Zone" (>180k) muss die Session beendet werden (/session-close).

Anweisung an den Agenten:
Nutze diese Bridge als Kontext, aber nicht als Zensur. Wenn deine Recherche-Daten (Gold-Dateien) etwas enthalten, das dieser Bridge widerspricht (z.B. "Lambda erlaubt 10GB RAM"), dann DOKUMENTIERE DEN KONFLIKT in Sektion 6 deines Reports. Lösche nichts, was neu oder anders ist.