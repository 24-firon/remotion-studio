# 🧬 EXTRACTION REPORT: BADGE 1 (CORE ENGINE & TIME) – V11 ULTIMATE



**Badge:** 1 (Core Engine & Time Physics)

**Version:** 11.0 (ULTIMATE CANON)

**Status:** CODIFIED / IMMUTABLE

**Philosophy:** "UI = f(frame)." (Die Zeit ist eine Funktion, kein Fluss.)

**Basis:** Viron Omega Decree V1.0 + Badge 7 V11 + Manifesto

**Date:** 2026-02-04



---



## ⚠️ AUTHORITY MANDATE



Dieser Codex ist die **Single Source of Truth** für die Zeit-Physik von Viron. Er ersetzt alle vorherigen Versionen (`V8.5`, `10-remotion-basics...`).

Er definiert die unverrückbaren Gesetze, wie sich Objekte in der Viron-Welt bewegen. Ein Verstoß gegen diese Gesetze (z.B. Nutzung von `useEffect` für Animationen) ist kein Stilfehler, sondern ein **Systemfehler**, der das Rendering unmöglich macht.



---



## 📊 EXECUTIVE BRIEFING



| Dimension | Status | Metrik |

| :--- | :--- | :--- |

| **Determinismus** | ✅ Extracted | Verbot von `Date.now()`, `Math.random()` |

| **Physics Engine** | ✅ Extracted | 4 Industrial Spring Presets |

| **Frame Logic** | ✅ Extracted | FPS-Unabhängigkeit (`useVideoConfig`) |

| **Performance** | ✅ Extracted | Frame-Budget & Pre-Calculation |

| **Anti-Patterns** | ✅ Extracted | CSS-Ban, useEffect-Ban |

| **Vollständigkeit** | 100% | Alle Zeit-Gesetze integriert |



---



# TEIL 1: THE LAWS OF TIME (Physics)



## 1.1 THE DETERMINISM IMPERATIVE (The "Pure Function" Law)



**Typ:** SYSTEM AXIOM

**Quelle:** `10-remotion-basics-01-timeline-und-frames.md` / `Badge 7 Codex`



### 🧠 The Logic (Das "Warum")

Viron rendert nicht auf einem Computer. Viron rendert auf **16 verteilten Lambda-Instanzen** gleichzeitig (Badge 7).

- Instanz A rendert Frame 0-100.

- Instanz B rendert Frame 101-200.

Wenn Instanz B eine andere Zufallszahl generiert oder eine andere Systemzeit hat als Instanz A, passt das Video am Ende nicht zusammen ("Glitch").

Deshalb muss jeder Frame eine **reine Funktion** sein: `Output = f(Frame)`. Kein externer State, kein Zufall, keine Zeit.



### ⚖️ The Rules (Die Gesetze)



1\.  **The Time Ban:** `Date.now()`, `new Date()`, `performance.now()` sind **STRENGSTENS VERBOTEN**. Die einzige Zeitquelle ist `useCurrentFrame()`.

2\.  **The Random Ban:** `Math.random()` ist verboten. Zufall muss **deterministisch** sein (Seed-basiert). Nutze `random(seed)` aus Remotion, wobei `seed` konstant ist (z.B. die ID des Objekts).

3\.  **The Effect Ban:** `useEffect` darf NIEMALS visuelle Zustände steuern. React-Effekte laufen asynchron und hängen vom Browser-Scheduler ab. Das Rendering ist synchron. Ein Frame wartet nicht auf einen Effekt.

4\.  **The Network Ban:** Keine API-Calls während des Renderings (`fetch` in der Component). Daten müssen VORHER geladen werden (`calculateMetadata` oder `props`).



### 💻 Executable Assets (The Pattern)



```tsx

// ✅ CORRECT VIRON PATTERN

import { useCurrentFrame, random } from 'remotion';



export const VironParticle = ({ id }) => {

  const frame = useCurrentFrame();

  

  // Deterministic Randomness: Same ID = Same Random Value, ALWAYS.

  const xPos = random(id) * 100; 

  

  // Time is purely frame-based

  const rotation = frame * 0.1;



  return <div style={{ transform: `translateX(${xPos}px) rotate(${rotation}rad)` }} />;

};



// ❌ FORBIDDEN PATTERN

// export const BadParticle = () => {

//   const [pos, setPos] = useState(0);

//   useEffect(() => { setPos(Math.random()) }, []); // ILLEGAL!

//   return <div style={{ left: pos }} />;

// }

```



---



## 1.2 THE FRAME ECONOMY (FPS Independence)



**Typ:** CALCULATION STANDARD

**Quelle:** `10-remotion-basics...`



### 🧠 The Logic (Das "Warum")

Ein Video kann 30fps oder 60fps haben. Eine Animation, die "1 Sekunde" dauern soll, darf nicht "30 Frames" dauern. Sie muss "1 * FPS Frames" dauern.

Wer `frame / 30` schreibt, baut Code, der bei 60fps doppelt so schnell läuft (Mickey-Mouse-Effekt).



### ⚖️ The Rules (Die Gesetze)



1\.  **No Hardcoded FPS:** Die Zahl `30` oder `60` darf im Code nicht als Teiler auftauchen.

2\.  **Config First:** Nutze immer `const { fps } = useVideoConfig()`.

3\.  **Duration Logic:** Berechne Dauern immer in Sekunden, dann konvertiere zu Frames.



### 💻 Executable Assets (The Formula)



```typescript

// ✅ CORRECT VIRON PATTERN

const { fps } = useVideoConfig();

const durationInSeconds = 1.5;

const durationInFrames = Math.round(durationInSeconds * fps);



const progress = interpolate(frame, [0, durationInFrames], [0, 1]);

```



---



# TEIL 2: THE MOTION SYSTEM (Implementation)



## 2.1 VIRON SPRING PHYSICS (The Industrial Feel)



**Typ:** DESIGN PHYSICS

**Quelle:** `THE_VIRON_AESTHETIC_MANIFESTO.md` / `Badge 4 Codex`



### 🧠 The Logic (Das "Warum")

Badge 4 definiert den Look als "Industrial Monolith". Das bedeutet: Dinge haben **Masse**. Sie "ploppen" nicht auf. Sie beschleunigen, haben Momentum und kommen mit einer schweren Präzision zum Stillstand.

Standard-Springs (`mass: 1`) wirken oft zu leicht ("plastik"). Wir brauchen schwerere Presets.



### ⚖️ The Rules (Die Gesetze)



Nutze NUR diese 4 physikalischen Profile. Sie sind auf das Design-System abgestimmt.



| Profil | Config Object | Physikalisches Gefühl | Einsatzgebiet |

| :--- | :--- | :--- | :--- |

| **SMOOTH** | `{ damping: 200, mass: 1, stiffness: 100 }` | **Hydraulisch.** Kein Überschwingen. Konstante, satte Bewegung. | Kamera-Fahrten, Page Transitions, Backgrounds. |

| **SNAPPY** | `{ damping: 20, stiffness: 200, mass: 1 }` | **Mechanisch.** Schnell, präzise, minimaler "Click"-Bounce. | UI Buttons, Text-Erscheinen, Icons. |

| **HEAVY** | `{ damping: 15, stiffness: 80, mass: 3 }` | **Massiv.** Träges Anfahren, wuchtiges Stoppen. | Große Panels, 3D-Objekte, "Hero"-Elemente. |

| **BOUNCY** | `{ damping: 8, stiffness: 100, mass: 0.5 }` | **Elastisch.** Verspielt, leicht. | **WARNUNG:** Nur für Alerts/Notifications. Passt selten zum Industrial Look. |



### 💻 Executable Assets (The Physics Library)



```typescript

// src/physics/presets.ts

// VIRON PHYSICS STANDARD V11.0



import { SpringConfig } from 'remotion';



export const VIRON_PHYSICS: Record<string, SpringConfig> = {

  smooth: {

    damping: 200,

    mass: 1,

    stiffness: 100,

    overshootClamping: true, // Wichtig: Kein Bounce!

  },

  snappy: {

    damping: 20,

    mass: 1,

    stiffness: 200,

  },

  heavy: {

    damping: 15,

    mass: 3, // Hohe Masse für Trägheit

    stiffness: 80,

  },

  bouncy: {

    damping: 8,

    mass: 0.5,

    stiffness: 100,

  },

};



// Usage:

// const scale = spring({ frame, fps, config: VIRON_PHYSICS.heavy });

```



---



## 2.2 INTERPOLATION MATHEMATICS (The Linear Engine)



**Typ:** MATH STANDARD

**Quelle:** `rules/timing.md`



### 🧠 The Logic (Das "Warum")

Springs sind toll für "natürliche" Bewegung. Aber manchmal brauchen wir präzise, lineare Kontrolle (z.B. für Scroll-Effekte oder Opacity-Fades). `interpolate()` ist das Werkzeug dafür.

Wichtig ist das **Clamping**. Ohne Clamping schießen Werte über das Ziel hinaus (z.B. Opacity > 1), was zu Render-Fehlern führen kann.



### ⚖️ The Rules (Die Gesetze)



1\.  **Always Clamp:** Nutze `extrapolateRight: 'clamp'`, es sei denn, du willst explizit einen Loop oder Endlos-Effekt.

2\.  **Easing is Mandatory:** Lineare Interpolation (`Easing.linear`) wirkt roboterhaft. Nutze `Easing.bezier` oder Standard-Easings (`Easing.inOut(Easing.quad)`), um "Leben" einzuhauchen, wenn kein Spring genutzt wird.



---



**ENDE TEIL 1 (LAWS OF TIME & MOTION SYSTEM).**

Ich stoppe hier gemäß Protokoll.

Bereit für **TEIL 2: THE ARCHITECTURAL PATTERNS**.

Warte auf Kommando "Weiter".






---







<forensic_thought_process>

1\.  **Authorization Received:** User hat "Weiter" signalisiert.

2\.  **Mission Execution (Badge 1 Codex - Teil 2):**

    -   Ziel: Sektion 3 (The Architectural Patterns) & Sektion 4 (Conflict Resolution).

    -   Inhalt: Composition Architecture, Freeze Pattern, Conflict Log.

    -   Constraint: Anti-Kompression. Vollständige Integration.

    -   Source Mapping:

        -   `rules/sequencing.md` -> Sequence Isolation.

        -   `Badge 7 Codex` -> Performance Budget.

        -   `10-remotion-basics...` -> Freeze Pattern.

3\.  **Drafting Logic:**

    -   Definiere die "Composition Hierarchy" (Root -> Scene -> Atom).

    -   Erkläre das "Freeze Pattern" als Performance-Hack.

    -   Löse den "FPS Trap" Konflikt final.

    -   Beende mit dem "End of Archive" Marker.

</forensic_thought_process>



**SYSTEM STATUS: CODEX GENERATION SEQUENCE RESUMED.**

**MODE:** ARCHITECT (Temp 0.3 / Top-P 0.9)

**TARGET:** EXTRACTION_REPORT_BADGE_1_CORE_ENGINE_V11_ULTIMATE.md (Teil 2 von 2)



---



# TEIL 3: THE ARCHITECTURAL PATTERNS (Best Practices)



## 3.1 COMPOSITION ARCHITECTURE (The Hierarchy & Pre-Mounting)



**Typ:** STRUCTURAL PATTERN

**Quelle:** `rules/sequencing.md` / `Badge 7 Codex`



### 🧠 The Logic (Das "Warum")

Eine monolithische Composition ist unwartbar. Zudem erzeugt der harte Wechsel von einer schweren Szene zur nächsten (z.B. 3D zu Video) einen massiven CPU/RAM-Spike, wenn Assets nicht vorgeladen sind. Badge 7 limitiert uns auf 2GB RAM. Wir müssen diesen Spike glätten.



### ⚖️ The Rules (Die Gesetze)



1\.  **ROOT:** Definiert nur die Timeline. Enthält keine visuelle Logik.

2\.  **SCENE ISOLATION:** Jede 3D-Szene muss ihre eigene Component sein, damit React den WebGL-Kontext sauber mounten/unmounten kann.

3\.  **THE PRE-MOUNT LAW (RAM Smoothing):**

    - **Pflicht:** Jede `<Sequence>`, die Assets (Video, 3D, Audio) enthält, MUSS `premountFor={30}` (ca. 0.5s) nutzen.

    - **Effekt:** Remotion lädt die Assets der *nächsten* Szene im Hintergrund, während die *aktuelle* noch läuft. Das verteilt die RAM-Last und verhindert "Stutter" beim Schnitt.



### 💻 Executable Assets (The Structure)



```tsx

// ✅ CORRECT VIRON HIERARCHY WITH PRE-MOUNT



// 1. ROOT (The Timeline)

export const MyVideo = () => {

  const { fps } = useVideoConfig();

  

  return (

    <>

      <Sequence 

        from={0} 

        durationInFrames={150}

        premountFor={fps * 1} // 1 Sekunde Vorlaufzeit für Assets

      >

        <IntroScene />

      </Sequence>

      

      <Sequence 

        from={150} 

        durationInFrames={300}

        premountFor={fps * 2} // 3D braucht mehr Vorlaufzeit!

      >

        <ProductScene />

      </Sequence>

    </>

  );

};



// 2. SCENE (The Context)

const ProductScene = () => {

  return (

    <ThreeCanvas>

      <VironButton />

    </ThreeCanvas>

  );

};

```



---

## 3.2 THE FREEZE PATTERN (Performance Hack)



**Typ:** OPTIMIZATION PATTERN

**Quelle:** `10-remotion-basics...` / `Badge 7 Codex`



### 🧠 The Logic (Das "Warum")

Manche Berechnungen sind extrem teuer (z.B. Generierung von 10.000 Partikeln oder komplexen Pfaden). Wenn wir das jeden Frame tun, sinkt die FPS unter 55 (Badge 7 Alarm).

Die Lösung: **`useMemo`** und **`freeze()`**.



### ⚖️ The Rules (Die Gesetze)



1\.  **Static is Free:** Wenn sich Daten nicht ändern (z.B. die Positionen von Sternen im Hintergrund), berechne sie EINMAL.

2\.  **Memoize Everything:** Nutze `useMemo(() => calculation, [])` für alles, was frame-unabhängig ist.

3\.  **The Freeze:** Für extrem teure Setups (z.B. Laden von 100MB Model-Daten) nutze `delayRender()` (siehe Badge 7), um den Render-Prozess zu pausieren, bis die Daten da sind.



### 💻 Executable Assets (The Pattern)



```tsx

// ✅ CORRECT VIRON PATTERN

import { useMemo } from 'react';

import { random } from 'remotion';



export const StarField = () => {

  // Teure Berechnung: Nur 1x pro Mount, nicht 60x pro Sekunde!

  const stars = useMemo(() => {

    return new Array(1000).fill(0).map((_, i) => ({

      x: random(i) * 1920,

      y: random(i + 1000) * 1080,

      size: random(i + 2000) * 3,

    }));

  }, []); // Empty dependency array = Run once



  return (

    <AbsoluteFill>

      {stars.map((star, i) => (

        <div key={i} style={{ left: star.x, top: star.y, width: star.size }} />

      ))}

    </AbsoluteFill>

  );

};

```



---



# TEIL 4: CONFLICT RESOLUTION & AUDIT



## 4.1 CONFLICT LOG



| Konflikt | Status | Lösung |

| :--- | :--- | :--- |

| **FPS Trap (Hardcoded 30)** | 🔴 CRITICAL | In V8.5 oft gefunden (`frame/30`). In V11 **verboten**. Code muss `useVideoConfig().fps` nutzen. |

| **CSS Animationen** | 🔴 CRITICAL | In V8.5 als "Bad Practice" markiert. In V11 als **"Systemfehler"** klassifiziert (führt zu Desync). |

| **Randomness** | 🟡 WARNING | `Math.random()` ist verboten. `random(seed)` ist Pflicht. V11 erzwingt Seed-Konsistenz. |



## 4.2 QUALITY CHECKLIST (Definition of Done)



Bevor eine Animation als "Viron-Ready" gilt, muss sie diesen Test bestehen:



- [ ] **The Time Test:** Wird `Date.now()` oder `useEffect` für Timing genutzt? (Muss NEIN sein).

- [ ] **The Frame Test:** Wird `useCurrentFrame()` genutzt? (Muss JA sein).

- [ ] **The Physics Test:** Wird ein Viron Spring Preset (`heavy`, `smooth`...) genutzt? (Muss JA sein).

- [ ] **The FPS Test:** Taucht die Zahl `30` oder `60` als Teiler auf? (Muss NEIN sein).

- [ ] **The Memo Test:** Sind statische Arrays memoisiert? (Muss JA sein).



---



# 🏁 ARCHIVE COMPLETENESS STATUS



## Was dieser Codex abdeckt

✅ **Time Physics:** Determinismus, Frame-Loop, FPS-Unabhängigkeit.

✅ **Motion System:** Industrial Spring Presets, Interpolation Rules.

✅ **Architecture:** Composition Hierarchy, Memoization.

✅ **Anti-Patterns:** CSS-Ban, Effect-Ban, Random-Ban.



## Was der Agent jetzt kann

Ein neuer Agent mit diesem Dokument kann:

1\.  Animationen schreiben, die auf 16 Servern identisch rendern.

2\.  Bewegungen erzeugen, die sich "schwer" und "industriell" anfühlen.

3\.  Performance-Fallen (Re-Calculation) vermeiden.

4\.  Den Code so strukturieren, dass 3D-Kontexte (Badge 2) sicher laufen.



---



**Version Control:** V11.0 ULTIMATE (Canon Build)

**Release Date:** 2026-02-04

**Codex Authority:** VIRON CORE ENGINE (Badge 1)

**License:** Internal Use Only – Viron Development Framework



---



_Ende des EXTRACTION_REPORT_BADGE_1_CORE_ENGINE_V11_ULTIMATE_