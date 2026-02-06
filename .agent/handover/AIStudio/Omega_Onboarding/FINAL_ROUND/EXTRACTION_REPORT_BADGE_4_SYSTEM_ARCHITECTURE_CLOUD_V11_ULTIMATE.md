## EXTRACTION REPORT: BADGE 4 (DESIGN SYSTEM & UI) – V1 ULTIMATE

Badge: 4 (Design System & UI)

Version: 1.0 (ULTIMATE CANON)

Status: CODIFIED / IMMUTABLE

Philosophy: "The Industrial Monolith." (Schwere, Präzision, Licht.)

Basis: Viron Omega Decree V1.0 + Badge 7 V11 + Badge 1 V8.5

Date: 2026-02-04

## AUTHORITY MANDATE

Dieser Codex ist die Single Source of Truth für das visuelle Betriebssystem von Viron. Er ersetzt alle fragmentierten Design-Notizen (theme.md, V43_STRATEGY.md, viron-button-guide.md).

Er definiert nicht, was wir mögen, sondern was wir bauen. Design ist hier keine Geschmacksfrage, sondern eine physikalische Konstante.

## EXECUTIVE BRIEFING

Dimension	Status	Metrik

Visual Physics	? Extracted	80% Grey Rule (#202020 - #E0E0E0)

Material System	? Extracted	PBR-Standard (Roughness, Metalness, IOR)

Component Arch	? Extracted	4-Layer Stack (Backdrop -> Glass -> Effects -> Post)

Shader Tech	? Extracted	CSM (Custom Shader Material) ersetzt Lamina

Hardware Sync	? Extracted	CRF 28 Safe Gradients (Texture Mapping)

Vollständigkeit	100%	Alle V43-Strategien und Lighting-Rules integriert

TEIL 1: THE VISUAL PHYSICS (System Architecture)

1.1 THE 80% GREY RULE (The Golden Mean)

Typ: HARD CONSTRAINT / LIGHTING LAW

Quelle: src/PROJECT_RULES_LIGHTING.md / V43_MASTER_PLAN.md

## The Logic (Das "Warum")

In der digitalen Videoproduktion sind #000000 (Pure Black) und #FFFFFF (Pure White) keine Farben, sondern Fehlerzustände.

Pure Black ist ein "Void". Es reflektiert kein Licht. In einer Raytracing-Umgebung (wie Viron sie simuliert) erzeugt es Löcher im Raum.

Pure White ist ein "Burnout". Es vernichtet jede Textur und jedes Detail durch Überbelichtung.

Echte Eleganz entsteht in den Mitteltönen. Industrielles Design (Apple, Braun, Teenage Engineering) lebt von der Nuance, nicht vom Kontrast-Extrem.

## The Rules (Die Gesetze)

The Base Tone: Die Szene muss sich anfühlen wie 80% Mid-Grey. Das lässt Raum für Licht ("Headroom") und Schatten ("Footroom").

The Black Ban: Der dunkelste erlaubte Wert ist #202020 (Dark Grey). Alles darunter wird vom Encoder (Badge 7, CRF 28) als Rauschen interpretiert und wegkomprimiert ("Crushed Blacks").

The White Ban: Der hellste erlaubte Flächen-Wert ist #E0E0E0 (Silver). Echtes Weiß (#FFFFFF) ist ausschließlich für Specular Highlights (Lichtreflexionen) reserviert.

The Backstop Cylinder: Um "Black Gaps" (Lücken zwischen Wänden) physisch unmöglich zu machen, wird hinter JEDE Szene ein riesiger Zylinder in der Farbe #404040 gestellt. Selbst wenn die Geometrie versagt, sieht der User Grau, nicht das Nichts.

## Executable Assets (The Palette)

code

TypeScript

// VIRON METALLIC PALETTE V1.0

// Source: theme.md / V43_MASTER_PLAN.md



export const VIRON_METALLIC = {

  void: '#000000', // FORBIDDEN (Technical use only)

  deep: '#202020', // Darkest allowed surface

  backstop: '#404040', // Safety cylinder color

  shadow: '#606060', // Standard shadow tone

  mid: '#808080', // The Anchor (True Grey)

  plate: '#A0A0A0', // Standard metal surface

  silver: '#E0E0E0', // Highlight surface

  specular: '#FFFFFF', // Light reflection only

};

1.2 THE MATERIAL SYSTEM (PBR Standards)

Typ: PHYSICS DEFINITION

Quelle: guides/viron-button-guide.md / src/learnings/PATTERN_Advanced_Shaders.md

## The Logic (Das "Warum")

Viron nutzt Physically Based Rendering (PBR). Wir definieren Materialien nicht durch Farbe, sondern durch ihre Reaktion auf Licht. Ein "roter Button" existiert nicht. Es existiert nur ein Material, das rotes Licht streut.

Um den "Industrial Monolith" Look zu garantieren, müssen alle Materialien konsistente physikalische Eigenschaften haben. Ein Mix aus "Plastik-Look" und "Metall-Look" zerstört die Immersion.

## The Rules (Die Gesetze)

Metalness: Standard ist 1.0 für alle UI-Elemente. Wir bauen Maschinen, kein Spielzeug.

Roughness:

Polished Metal: 0.1 - 0.2 (Scharfe Reflexionen, "Wet Look").

Brushed Metal: 0.4 - 0.6 (Diffuse Reflexionen, "Sandblasted").

Matte: 0.8+ (Fast keine Reflexion, "Rubber").

Transmission (Glass):

IOR (Index of Refraction): 1.5 (Standard Glas).

Thickness: Muss > 0 sein (z.B. 0.25), damit Brechung sichtbar wird.

Chromatic Aberration: 0.04 (Subtil, aber sichtbar für "Lens Feel").

## Executable Assets (The Material Config)

code

TypeScript

// VIRON PBR PRESETS V1.0

// Source: viron-button-guide.md



export const MATERIALS = {

  industrialSteel: {

    metalness: 1.0,

    roughness: 0.2,

    envMapIntensity: 1.0,

    color: VIRON_METALLIC.plate,

  },

  sandblastedAluminum: {

    metalness: 0.9,

    roughness: 0.5,

    envMapIntensity: 0.8,

    color: VIRON_METALLIC.silver,

  },

  opticalGlass: {

    transmission: 1.0,

    thickness: 0.25,

    ior: 1.5,

    roughness: 0.05,

    chromaticAberration: 0.04,

    anisotropicBlur: 0.1,

  }

};

1.3 THE 4-LAYER BUTTON STACK (Component Architecture)

Typ: ARCHITECTURE PATTERN

Quelle: guides/viron-button-guide.md

## The Logic (Das "Warum")

Ein Viron-Button ist kein einfaches 3D-Objekt. Er ist eine optische Maschine. Er besteht aus vier Schichten, die zusammenarbeiten, um Tiefe und Leben zu erzeugen. Wenn eine Schicht fehlt, bricht der Effekt zusammen.

##? The Stack (Von Hinten nach Vorne)

LAYER 1: THE BACKDROP (Source)

Inhalt: Ein AI-generierter Video-Loop (Luma/Runway) oder eine komplexe Noise-Textur.

Funktion: Liefert die "Information", die durch das Glas gebrochen wird.

Tech: VideoTexture auf einer Plane oder Sphere.

LAYER 2: THE HERO (Glass/Transmission)

Inhalt: Die eigentliche Button-Geometrie (Capsule, RoundedBox).

Funktion: Bricht das Licht des Backdrops.

Tech: MeshTransmissionMaterial (Drei).

Constraint: Muss High-Poly sein (Segments > 64), um Facetten zu vermeiden (User Complaint V43).

LAYER 3: THE EFFECTS (Atmosphere)

Inhalt: Caustics (Lichtbrechung am Boden), Lightformers (Neon-Streifen in der Reflexion), Sparkles (Staub).

Funktion: Verankert das Objekt in der Welt.

Tech: <Caustics>, <Environment>, <Sparkles>.

LAYER 4: THE LENS (Post-Processing)

Inhalt: Bloom, Glitch, Grain, Color Grading.

Funktion: Simuliert eine physische Kamera-Linse. Macht das Bild "echt".

Tech: @react-three/postprocessing.

TEIL 2: THE COMPONENT FACTORY (Implementation)

2.1 THE "NO-CSS" COMPONENT PATTERN

Typ: CODING STANDARD

Quelle: RULES_CORE.md / Badge 1 Codex

## The Logic (Das "Warum")

Badge 1 (Time) diktiert: "If it moves, it has mass."

CSS-Animationen (@keyframes, transition) haben keine Masse. Sie sind zeitbasiert, nicht physikbasiert. Sie können nicht auf Audio-Trigger reagieren (Badge 6) und sind nicht frame-genau steuerbar.

Deshalb sind CSS-Klassen für Animationen in Viron-Komponenten verboten. Wir steuern visuelle Eigenschaften ausschließlich über React Props, die von spring() oder interpolate() gefüttert werden.

## The Rules (Die Gesetze)

No Animation Classes: className="animate-spin" ist illegal.

Props Interface: Jede visuelle Komponente muss scale, opacity, rotation etc. als Props akzeptieren.

Style Injection: Diese Props werden direkt in das style Attribut (DOM) oder die Material-Uniforms (WebGL) injiziert.

## Executable Assets (The Pattern)

code

Tsx

// ? CORRECT VIRON PATTERN

// Accepts physics-based values from Badge 1 hooks



interface VironComponentProps {

  // Physics Props (0.0 - 1.0 usually)

  scale?: number;

  opacity?: number;

  rotation?: number; // in Radians

  

  // Design Props

  color?: string;

  variant?: 'silver' | 'glass' | 'void';

}



export const VironCard: React.FC<VironComponentProps> = ({

  scale = 1,

  opacity = 1,

  rotation = 0,

  color = '#A0A0A0',

}) => {

  return (

    <div

      style={{

        transform: `scale(${scale}) rotate(${rotation}rad)`,

        opacity: opacity,

        backgroundColor: color,

        // Static styles via CSS/Tailwind are OK

        borderRadius: '12px',

        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',

      }}

    >

      {/* Content */}

    </div>

  );

};



// ? FORBIDDEN PATTERN

// export const BadCard = () => {

//   return <div className="hover:scale-110 transition-all" /> // ILLEGAL!

// }

2.2 THE V43 "SILVER ARMADA" VARIATIONS

Typ: DESIGN STRATEGY

Quelle: V43_MASTER_PLAN.md

## The Logic (Das "Warum")

Ein einziges Design reicht nicht. Um "Black Gaps" und "Parallel Lines" (die Hauptfehler von V42) zu töten, brauchen wir eine Flotte von geometrischen Strategien. Die "Silver Armada" ist eine Sammlung von 12 getesteten Konfigurationen, die garantieren, dass die Szene immer gefüllt und lebendig wirkt.

##? The Variations (Grouped by Strategy)

GROUP A: The "Strip Gradients" (Physical Gradients)

Konzept: Statt einer flachen Wand generieren wir 50 dünne Streifen. Jeder Streifen hat eine leicht andere Farbe. Das erzeugt einen "echten" Gradienten, der auch im Raytracing sichtbar ist.

V43_01_Stripes_Horizontal: 50 horizontale Streifen, gestapelt (Dark -> Light). 45° Tilt.

V43_02_Stripes_Vertical: 50 vertikale Streifen, ringförmig angeordnet.

V43_03_Stripes_Spiral: Streifen in Turbinen-Anordnung.

V43_04_Stripes_Chaos: Zufällig platzierte "Wolke" aus Streifen.

GROUP B: The "Silver Turbines" (Overlapping Geometry)

Konzept: Große Platten überlappen sich wie Fischschuppen ("Shingles"). Das verhindert, dass der Hintergrund durchscheint.

V43_05_Turbine_Ovals: 12 Ovale, überlappend wie Blütenblätter.

V43_06_Turbine_Squares: 12 Rechtecke, scharfe Kanten, aggressiver Look.

V43_07_Turbine_Triangles: Sägeblatt-Optik.

V43_08_Turbine_Mixed: Ovale + Dreiecke gemischt.

GROUP C: The "Light Boxes" (High Key)

Konzept: Lösung für "zu dunkel". Nur helle Töne.

V43_09_Bright_Soft: Farben #A0A0A0 bis #FFFFFF.

V43_10_Bright_Hard: Harte Reflexionen, Chrom-Look.

GROUP D: The "Shader Noise" (Texture)

Konzept: Prozedurale Texturen statt Geometrie.

V43_11_Noise_Heavy: Starke Marmorierung.

V43_12_Noise_Subtle: Feines Korn (Sandblasted).

2.3 THE CSM SHADER RECIPES (Lamina Replacement)

Typ: SHADER CODE

Quelle: guides/viron-button-guide.md

## The Logic (Das "Warum")

Die Library lamina ist tot (Archived June 2025). Wir dürfen sie nicht mehr nutzen. Der Nachfolger ist three-custom-shader-material (CSM). CSM erlaubt es uns, Standard-Materialien (MeshPhysicalMaterial) mit eigenem Shader-Code zu "patchen", ohne die PBR-Eigenschaften (Reflexionen, Schatten) zu verlieren.

## Executable Assets (Iridescent Glass Shader)

code

Tsx

// materials/IridescentGlass.tsx

// REPLACES LAMINA - VIRON STANDARD V1.0



import { extend, useFrame } from "@react-three/fiber";

import CustomShaderMaterial from "three-custom-shader-material/dist/CustomShaderMaterial.js";

import * as THREE from "three";

import { useRef } from "react";



extend({ CustomShaderMaterial });



// 1. Define the Material Class

export const createIridescentMaterial = () => {

  return new CustomShaderMaterial({

    baseMaterial: THREE.MeshPhysicalMaterial,

    

    // Uniforms (Reactive Variables)

    uniforms: {

      uTime: { value: 0 },

      uColor: { value: new THREE.Color(0.1, 0.5, 1.0) }, // Base Blue

      uIridescenceStrength: { value: 0.8 },

      uFresnelPower: { value: 2.5 },

    },



    // Vertex Shader (Geometry Manipulation)

    vertexShader: `

      varying vec3 vNormal;

      varying vec3 vViewDir;

      varying vec3 vPosition;



      void main() {

        // Pass data to fragment shader

        vNormal = normalize(normalMatrix * normal);

        vPosition = (modelMatrix * vec4(position, 1.0)).xyz;

        vViewDir = normalize(cameraPosition - vPosition);



        // Standard position calculation

        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

      }

    `,



    // Fragment Shader (Pixel Color)

    fragmentShader: `

      uniform float uTime;

      uniform vec3 uColor;

      uniform float uIridescenceStrength;

      uniform float uFresnelPower;



      varying vec3 vNormal;

      varying vec3 vViewDir;



      void main() {

        // 1. Calculate Fresnel (Rim Light)

        float fresnel = pow(1.0 - abs(dot(vNormal, vViewDir)), uFresnelPower);



        // 2. Calculate Iridescence (Color Shift based on Angle + Time)

        // Magic numbers create the "Oil Slick" look

        float iridescence = sin(

          dot(vNormal, vec3(1.0, 0.5, 0.2)) * 5.0 + uTime * 0.5

        ) * 0.5 + 0.5;



        // 3. Mix Base Color with Iridescence

        vec3 iridColor = mix(

          uColor,

          vec3(sin(uTime + 1.0) * 0.5 + 0.5, 0.5, cos(uTime) * 0.5 + 0.5),

          iridescence * uIridescenceStrength

        );



        // 4. Inject into CSM Pipeline (Modify Diffuse Color)

        // Add Fresnel glow on top

        csm_DiffuseColor = vec4(mix(iridColor, vec3(1.0), fresnel * 0.3), 1.0);

      }

    `,



    // Physical Properties (Inherited from Base Material)

    metalness: 0.8,

    roughness: 0.1,

    transmission: 0.5, // Glass-like

    ior: 1.5,

    transparent: true,

  });

};



// 2. React Component Wrapper

export const IridescentButton = (props: any) => {

  const meshRef = useRef<THREE.Mesh>(null);

  // Create material instance once

  const matRef = useRef(createIridescentMaterial());



  // Animate Uniforms

  useFrame(({ clock }) => {

    if (matRef.current) {

      matRef.current.uniforms.uTime.value = clock.elapsedTime;

    }

  });



  return (

    <mesh {...props} ref={meshRef} material={matRef.current}>

      {/* High Poly Geometry for smooth reflections */}

      <boxGeometry args={[2, 1, 0.2, 32, 16, 16]} />

    </mesh>

  );

};

TEIL 3: THE INTEGRATION BRIDGE (Cross-Badge)

3.1 HARDWARE-SYNC (Badge 7 Compliance)

Typ: PERFORMANCE CONSTRAINT

Quelle: Badge 7 Codex / V43_STRATEGY.md

## The Logic (Das "Warum")

Badge 7 (Infrastruktur) setzt zwei harte Grenzen:

RAM: Max 2GB pro Thread für Standard-Szenen.

Compression: "Draft Tier" nutzt CRF 28 (starke Kompression).

Wenn Badge 4 diese Grenzen ignoriert, stürzt der Render ab (OOM) oder sieht im Draft furchtbar aus (Banding).

## The Rules (Die Gesetze)

Texture Budget:

Max Resolution: 2048x2048 für Hero-Texturen. 512x512 für Backgrounds/Noise.

Format: .webp oder .jpg (kein unkomprimiertes PNG für Texturen, die nicht transparent sind).

Grund: Eine 4K RGBA Textur belegt ~64MB im VRAM. Bei 16 Threads sind das 1GB nur für eine Textur. Das sprengt das 2GB Limit.

The "Nano-Banana" Strategy (Anti-Banding):

Problem: CRF 28 zerstört sanfte Farbverläufe (z.B. #202020 zu #252525). Es entstehen sichtbare Streifen ("Banding").

Lösung: Wir nutzen Texture Mapping statt Code-Gradients.

Technik: Wir generieren High-Res Texturen mit Dithering (Noise). Das Rauschen zwingt den Encoder, Details zu erhalten, und kaschiert Banding-Artefakte.

Regel: Keine reinen mix() Verläufe im Shader für große Flächen. Nutze immer eine dither-Funktion oder eine Textur.

## Executable Assets (Dithering Shader Chunk)

code

Glsl

// shader/chunks/dither.glsl

// Include this in every fragment shader to survive CRF 28



float random(vec2 uv) {

    return fract(sin(dot(uv.xy, vec2(12.9898, 78.233))) * 43758.5453123);

}



vec3 dither(vec3 color, vec2 uv) {

    // Add subtle noise (1/255 magnitude)

    float noise = random(uv) * (1.0 / 255.0);

    return color + noise;

}



// Usage in main():

// gl_FragColor = vec4(dither(finalColor, vUv), 1.0);

3.2 TIME-SYNC (Badge 1 Compliance)

Typ: ANIMATION STANDARD

Quelle: Badge 1 Codex / RULES_CORE.md

## The Logic (Das "Warum")

Badge 1 verbietet CSS-Animationen. Badge 4 muss sicherstellen, dass alle Design-Komponenten "physikalisch" reagieren können. Wir definieren Standard-Profile für spring(), damit sich das ganze System konsistent anfühlt.

## The Rules (Die Gesetze)

Nutze NUR diese 4 Profile. Erfinde keine neuen "Magic Numbers".

Profil	Config	Gefühl	Use Case

SMOOTH	{ damping: 200 }	Kein Bounce, edel, langsam.	Page Transitions, Backgrounds.

SNAPPY	{ damping: 20, stiffness: 200 }	Schnell, präzise, minimaler Overshoot.	UI Buttons, Hover States.

BOUNCY	{ damping: 8 }	Verspielt, gummiartig.	Alerts, Notifications (selten nutzen!).

HEAVY	{ damping: 15, stiffness: 80, mass: 2 }	Schwer, industriell, träge.	Große Maschinen-Teile, Panels.

3.3 WEB-SYNC (Badge 5 Compliance)

Typ: INTERFACE DEFINITION

Quelle: ZUKUNFTSPLAN-DESIGN

## The Logic (Das "Warum")

Das Video (Remotion) und die Webseite (Next.js) müssen identisch aussehen. Wenn wir Farben im Video ändern, muss die Webseite folgen. Wir nutzen eine Single Source of Truth (theme.ts), die von beiden konsumiert wird.

## Executable Assets (The Token Export)

code

TypeScript

// src/theme/tokens.ts

// SHARED between Remotion and Next.js



export const VIRON_TOKENS = {

  colors: {

    primary: '#BFF549', // Neon Lime (Action)

    surface: '#202020', // Dark Metal

    text: '#E0E0E0',    // Silver

  },

  layout: {

    heroHeight: 1080,

    sidebarWidth: 400,

    gap: 24,

  },

  physics: {

    springs: {

      smooth: { damping: 200 },

      snappy: { damping: 20, stiffness: 200 },

    }

  }

};



// Usage in Remotion:

// import { VIRON_TOKENS } from '../theme/tokens';

// <div style={{ color: VIRON_TOKENS.colors.primary }} />



// Usage in Tailwind (tailwind.config.js):

// theme: { extend: { colors: { viron: VIRON_TOKENS.colors } } }

TEIL 4: CONFLICT RESOLUTION & AUDIT

4.1 CONFLICT LOG

Konflikt	Status	Lösung

Lamina vs. CSM	## CRITICAL	lamina ist verboten. three-custom-shader-material ist Pflicht. Code-Beispiele in Teil 2.3 sind die Referenz.

CRF 28 vs. Gradients	## WARNING	"Draft" Qualität erzeugt Banding. Lösung: Dithering Shader (Teil 3.1) ist Pflicht für alle Flächen.

CSS vs. Spring	## CRITICAL	CSS-Animationen sind technisch unmöglich für Frame-Sync. Komponenten müssen Props nutzen (Teil 2.1).

4.2 QUALITY CHECKLIST (Definition of Done)

Bevor ein Design als "Viron-Ready" gilt, muss es diesen Test bestehen:



The Grey Test: Ist der dunkelste Wert #202020? (Kein #000).



The Gap Test: Ist der Backstop-Cylinder (#404040) vorhanden?



The Poly Test: Hat die Hero-Geometrie > 64 Segmente?



The Physics Test: Reagiert die Komponente auf spring() Props? (Kein CSS).



The Shader Test: Wird three-custom-shader-material genutzt? (Kein Lamina).



The RAM Test: Sind Texturen < 2048px?

## ARCHIVE COMPLETENESS STATUS

Was dieser Codex abdeckt

? Visual Physics: 80% Grey Rule, PBR Standards.

? Component Arch: 4-Layer Stack, No-CSS Pattern.

? Shader Tech: CSM Implementation, Dithering.

? Integration: RAM-Limits, Spring-Presets, Token-Sharing.

