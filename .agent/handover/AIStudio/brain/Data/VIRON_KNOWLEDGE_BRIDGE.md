🌉 VIRON\_KNOWLEDGE\_BRIDGE (Master DNA \& Active Learnings)



Version: 3.0 (Konsolidiert: Badge 7 + Badge 1 + Badge 8 Basis)

Status: ✅ MANDATORY (Absolute Wahrheit für alle Sub-Agenten)

Letztes Update: 2026-02-04

Zweck: Dieses Dokument verhindert technologische Inkonsistenzen. Es überführt die Ergebnisse abgeschlossener Badges in das aktive Arbeitsgedächtnis des Projekts.

⚡ 1. INFRASTRUKTUR \& HARDWARE-GESETZE (Aus Badge 7)



Zuständig für die physischen Grenzen des Renderings.

1.1 Das Concurrency-Gesetz (Anti-OOM)



Viron skaliert nicht nach CPU-Kernen, sondern nach RAM-Verfügbarkeit.



&nbsp;   Die Formel: Math.min(optimalConcurrency, ramLimit, 16).



&nbsp;   RAM-Faktoren:



&nbsp;       Standard 2D: 2GB RAM / Thread.



&nbsp;       Heavy 3D: 4GB RAM / Thread.



&nbsp;       Volumetric: 8GB RAM / Thread.



&nbsp;   Safety Margin: Maximal 50% des System-RAMs dürfen für das Rendering genutzt werden.



&nbsp;   Hard Cap: Absolutes Limit von 16 parallelen Prozessen (AWS Lambda Limit \& I/O-Schutz).



1.2 Die Cloud-Ökonomie (Lambda Tiers)



Jeder Render-Job muss basierend auf seinem Zweck einem Tier zugeordnet werden:

| Tier | CRF (Qualität) | Workers | Kosten/Min | Use Case |

|:---|:---|:---|:---|:---|

| DRAFT | 28 | 4 | $0.10 | Schnelle interne Previews |

| STANDARD | 20 | 8 | $0.50 | Social Media / Daily |

| HIGH | 16 | 16 | $1.20 | Client Reviews |

| ULTRA | 10 | 32 | $2.80 | Broadcast / Cinema |

1.3 Der Render-Selector (Breakpoint-Logik)



&nbsp;   Local: Nur wenn Duration < 30s UND Quality == Draft.



&nbsp;   Lambda: Standard für alles < 10min.



&nbsp;   Render Farm: Zwingend für 4K ProRes oder Duration > 10min.



⏳ 2. CORE PHYSICS \& TIME-LAWS (Aus Badge 1)



Zuständig für die Logik der Zeit und Animation.

2.1 Der Determinismus-Imperativ



&nbsp;   Gesetz: useCurrentFrame() ist die einzige erlaubte Zeitquelle.



&nbsp;   Verbot: useEffect, Date.now(), setInterval oder requestAnimationFrame sind Systemfehler.



&nbsp;   Begründung: Frames müssen auf 16 verteilten Lambda-Instanzen bis auf das letzte Pixel identisch berechnet werden können.



2.2 Das No-CSS Gesetz (Viron DNA)



&nbsp;   Status: STRENGSTENS VERBOTEN.



&nbsp;   Details: Keine CSS-Transitions, keine @keyframes.



&nbsp;   Pflicht: Nutze ausschließlich spring() oder interpolate(). Jede Bewegung muss eine physikalische Masse simulieren.



2.3 Die Standard Viron Springs (DNA-Profile)



Nutze NUR diese Konfigurationen für Konsistenz:



&nbsp;   smooth: {damping: 200} (Kein Bounce, edle Reveals).



&nbsp;   snappy: {damping: 20, stiffness: 200} (Reaktive UI-Elemente).



&nbsp;   bouncy: {damping: 8} (Spielerische Akzente).



&nbsp;   heavy: {damping: 15, stiffness: 80, mass: 2} (Der "Industrial Monolith" Look).



🧠 3. ORCHESTRATION \& ROUTING (Aus Badge 7/8)



Zuständig für die intelligente Steuerung des Systems.

3.1 Das Routing-Gehirn (Input Detection)



Viron erkennt Inputs deterministisch:



&nbsp;   URL (http) → DEPT\_WEB



&nbsp;   .mp4 / .mov → DEPT\_VIDEO + RENDER



&nbsp;   .wav / .mp3 → DEPT\_AUDIO



&nbsp;   .json (Colors/Fonts) → DEPT\_ENGINE (Tokens)



3.2 Die Synchronisations-Toleranz



&nbsp;   Limit: Maximal 2 Frames Abweichung zwischen Audio-Stream und Video-Frame.



&nbsp;   Aktion: Bei Überschreitung erfolgt ein automatischer HARD FAIL des Render-Vorgangs.



🛡️ 4. GOVERNANCE \& PROZESS-RECHTE (Aus Badge 8)



Zuständig für die Sicherheit und Qualität der Zusammenarbeit.

4.1 Der Double-Turn-Lock (Git)



&nbsp;   Regel: write\_to\_file und git commit niemals im selben Turn.



&nbsp;   Ablauf: Agent schlägt Änderung vor → User gibt "Go" → Agent committet.



4.2 Die Token-Ökonomie (Context Safety)



&nbsp;   Orchestrator-Limit: 200.000 Tokens.



&nbsp;   Sub-Agent-Limit: 50.000 Tokens.



&nbsp;   Action: Bei Erreichen der "Danger Zone" (>180k) muss die Session beendet werden (/session-close).



🎯 5. CROSS-BADGE SYNERGIES (Aktuelle Fokus-Punkte)



&nbsp;   Badge 4 (Design) <-> Badge 7 (Infrastruktur): Die Metallic-Palette muss so optimiert sein, dass sie bei CRF 28 (Draft) keine "Banding"-Artefakte in den Verläufen erzeugt.



&nbsp;   Badge 2 (3D) <-> Badge 7 (Hardware): Jedes geladene 3D-Modell muss seinen Speicherbedarf deklarieren. Bei Überschreitung von 2GB ist ein Downgrade der Textur-Qualität (2K statt 4K) zwingend.



&nbsp;   Badge 6 (Audio) <-> Badge 1 (Timeline): Audio-Trigger müssen auf die Remotion-Physik-Presets (Punkt 2.3) gemappt werden, um harmonische Reaktivität zu erzeugen.

