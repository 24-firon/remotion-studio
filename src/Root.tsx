import { AbsoluteFill, Composition } from 'remotion';
import React, { Suspense } from 'react';
import { ThreeCanvas } from '@remotion/three';
import { Environment } from '@react-three/drei';

// --- THE MASTER RECIPE (V24) ---
import { SceneV24 } from './my-lab/SceneV24';
import { SceneV24a_Clean, SceneV24b_SubtleColor, SceneV24c_PureMirror } from './my-lab/ScenesV24_Variants';

// --- PURE LIGHTFORMER STUDIO (V25) ---
import { SceneV25 } from './my-lab/SceneV25';

// --- GREY STUDIO (V26) ---
import { SceneV26 } from './my-lab/SceneV26';
import { SceneV26_Debug } from './my-lab/SceneV26_Debug';

// --- HYBRID MASTER (V27) ---
import { SceneV27 } from './my-lab/SceneV27';

// --- V7 RESTORED (V28) ---
import { SceneV28 } from './my-lab/SceneV28';

// --- THEMATIC SHOWCASE (V29) ---
import { SceneV29a_Sunset, SceneV29b_Night, SceneV29c_Warehouse, SceneV29d_Forest } from './my-lab/ScenesV29_Thematic';

// --- SYNTHETIC STUDIO REBUILD (V30) ---
import { SceneV30a_Rebuilt, SceneV30b_HighKey } from './my-lab/ScenesV30_SyntheticStudio';

// --- COLOR TUNED STUDIO (V31) ---
import { SceneV31a_Warm, SceneV31b_Cool } from './my-lab/ScenesV31_ColorTuned';

// --- GREY GRADIENT MASTER (V32) ---
import { SceneV32 } from './my-lab/SceneV32';

// --- COLOR GRADIENT MASTER (V33) ---
import { SceneV33, SceneV33_Debug } from './my-lab/SceneV33';

// --- GEOMETRIC LIGHT SHAPES (V34) ---
import { SceneV34a_Oval, SceneV34b_Triangle, SceneV34c_Hexagon, SceneV34d_Star } from './my-lab/ScenesV34_LightShapes';

// --- ROOM SHAPES with DEBUG (V35) ---
import { 
    SceneV35a_Hexagon, SceneV35a_Hexagon_Debug,
    SceneV35b_Triangle, SceneV35b_Triangle_Debug,
    SceneV35c_Square, SceneV35c_Square_Debug,
    SceneV35d_Star, SceneV35d_Star_Debug 
} from './my-lab/ScenesV35_RoomShapes';

// --- ASYMMETRIC / TILTED (V36) ---
import { SceneV36a_Tilted, SceneV36a_Tilted_Debug, SceneV36b_Extreme, SceneV36b_Extreme_Debug } from './my-lab/ScenesV36_Asymmetric';

// --- OVAL WALLS (V37) ---
import { SceneV37_Ovals, SceneV37_Ovals_Debug } from './my-lab/ScenesV37_OvalWalls';

// --- MARBLED GRADIENT (V38) ---
import { SceneV38_Marbled, SceneV38_Marbled_Debug } from './my-lab/ScenesV38_Marbled';

// --- CHAOS THEORY (V39) ---
import { SceneV39_Chaos, SceneV39_Chaos_Debug } from './my-lab/ScenesV39_Chaos';

// --- REAL GRADIENTS (V40) ---
import { SceneV40_RealGradients, SceneV40_RealGradients_Debug } from './my-lab/ScenesV40_RealGradients';

// --- VARIATION MATRIX (V41) ---
import { 
    SceneV41a_ArenaOval, SceneV41a_ArenaOval_Debug,
    SceneV41b_SharpStar, SceneV41b_SharpStar_Debug,
    SceneV41c_MarbledHex, SceneV41c_MarbledHex_Debug,
    SceneV41d_TiltedRings, SceneV41d_TiltedRings_Debug,
    SceneV41e_DeepSpace, SceneV41e_DeepSpace_Debug
} from './my-lab/ScenesV41_Variations';

// --- GOLDEN MEAN (V42) ---
import { 
    SceneV42a_LiquidGrey, SceneV42a_LiquidGrey_Debug,
    SceneV42b_KineticStars, SceneV42b_KineticStars_Debug,
    SceneV42c_SoftArena, SceneV42c_SoftArena_Debug,
    SceneV42d_DriftingRings, SceneV42d_DriftingRings_Debug,
    SceneV42e_BrightTech, SceneV42e_BrightTech_Debug
} from './my-lab/ScenesV42_GoldenMean';

// --- THE V43 ARMADA (Strict Rules) ---
import {
    SceneV43_01, SceneV43_01_Debug,
    SceneV43_02, SceneV43_02_Debug,
    SceneV43_03, SceneV43_03_Debug,
    SceneV43_05, SceneV43_05_Debug,
    SceneV43_09, SceneV43_09_Debug,
    SceneV43_11, SceneV43_11_Debug
} from './my-lab/ScenesV43_Armada';

// --- V44: REFINED ARMADA (No Gaps) ---
import {
    SceneV44_01, SceneV44_01_Debug,
    SceneV44_02, SceneV44_02_Debug,
    SceneV44_03, SceneV44_03_Debug,
    SceneV44_05, SceneV44_05_Debug,
    SceneV44_09, SceneV44_09_Debug,
    SceneV44_11, SceneV44_11_Debug
} from './my-lab/ScenesV44_RefinedArmada';

// --- REAL HDRI PRESETS (V23) ---
import { SceneV23_Apartment, SceneV23b_Studio, SceneV23c_City, SceneV23d_Lobby } from './my-lab/ScenesV23';

// --- Previous Experiments (Legacy) ---
import { SceneV22 } from './my-lab/SceneV22';
import { SceneV17, SceneV18, SceneV19, SceneV20, SceneV21 } from './my-lab/VironVariants_SilverSpectrum';
import { SceneV16 } from './my-lab/SceneV16';
import { SceneV15 } from './my-lab/SceneV15';
import { SceneV14 } from './my-lab/SceneV14';
import { SceneV13 } from './my-lab/SceneV13';
import { SceneV12 } from './my-lab/SceneV12';
import { SceneV11 } from './my-lab/SceneV11';
import { SceneV10 } from './my-lab/SceneV10';
import { SceneV9 } from './my-lab/SceneV9';
import { SceneV6, SceneV7, SceneV8 } from './my-lab/VironVariants_V6_V7_V8';
import { VironMaster_V5_Scene } from './my-lab/VironMaster_V5_Scene';
import { VironMaster_V4_Scene } from './my-lab/VironMaster_V4_Scene';
import { VironMaster_Scene } from './my-lab/VironMaster_Scene';
import { ViroMaster_V3_Scene } from './my-lab/ViroMaster_V3_Scene';
import { ViroMaster_V2_Button } from './my-lab/ViroMaster_V2_Button';
import { ViroMaster_V1_Button } from './my-lab/ViroMaster_V1_Button';
import { TrueFirstDraftScene } from './my-lab/TrueFirstDraftScene';
import { SilverButton_0_2_SuperGlint_LogoLess } from './my-lab/SilverButton_0_2_SuperGlint_LogoLess';
import { SilverButton_0_5_OriginalGlint } from './my-lab/SilverButton_0_5_OriginalGlint';
import { SilverButton_1_0_Refined } from './my-lab/SilverButton_1_0_Refined';
import { VironCube_2_0_Rounded } from './experiments/cube-v1/VironCube_2_0_Rounded';
import { MainScene } from './my-lab/MainScene';
import { ChromeScene } from './experiments/chrome-v3';
import './style.css';

const SceneWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <AbsoluteFill style={{ backgroundColor: '#020617' }}>
        <Suspense fallback={<AbsoluteFill style={{ color: 'white' }}>Loading...</AbsoluteFill>}>
            <ThreeCanvas width={1920} height={1080} camera={{ position: [0, 0, 10], fov: 35 }}>
                <Environment preset="studio" />
                {children}
            </ThreeCanvas>
        </Suspense>
    </AbsoluteFill>
);

export const RemotionRoot: React.FC = () => {
	return (
		<>
            {/* 🛑 V44: THE REFINED ARMADA (Gaps Closed, Brighter, Full 360) */}
            <Composition id="AAA-VAR-V44-01-STRIPES-H" component={SceneV44_01} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V44-01-DEBUG" component={SceneV44_01_Debug} durationInFrames={300} fps={60} width={1920} height={1080} />

            <Composition id="AAA-VAR-V44-02-STRIPES-V" component={SceneV44_02} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V44-02-DEBUG" component={SceneV44_02_Debug} durationInFrames={300} fps={60} width={1920} height={1080} />

            <Composition id="AAA-VAR-V44-03-SPIRAL" component={SceneV44_03} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V44-03-DEBUG" component={SceneV44_03_Debug} durationInFrames={300} fps={60} width={1920} height={1080} />

            <Composition id="AAA-VAR-V44-05-TURBINE" component={SceneV44_05} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V44-05-DEBUG" component={SceneV44_05_Debug} durationInFrames={300} fps={60} width={1920} height={1080} />

            <Composition id="AAA-VAR-V44-09-BRIGHT" component={SceneV44_09} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V44-09-DEBUG" component={SceneV44_09_Debug} durationInFrames={300} fps={60} width={1920} height={1080} />

             <Composition id="AAA-VAR-V44-11-NOISE" component={SceneV44_11} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V44-11-DEBUG" component={SceneV44_11_Debug} durationInFrames={300} fps={60} width={1920} height={1080} />

            {/* 🛸 V43: THE SILVER ARMADA (High Poly, Strict Rules, Strip Gradients) */}
            <Composition id="AAA-VAR-V43-01-STRIPES-H" component={SceneV43_01} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V43-01-DEBUG" component={SceneV43_01_Debug} durationInFrames={300} fps={60} width={1920} height={1080} />

            <Composition id="AAA-VAR-V43-02-STRIPES-V" component={SceneV43_02} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V43-02-DEBUG" component={SceneV43_02_Debug} durationInFrames={300} fps={60} width={1920} height={1080} />

            <Composition id="AAA-VAR-V43-03-SPIRAL" component={SceneV43_03} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V43-03-DEBUG" component={SceneV43_03_Debug} durationInFrames={300} fps={60} width={1920} height={1080} />

            <Composition id="AAA-VAR-V43-05-TURBINE" component={SceneV43_05} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V43-05-DEBUG" component={SceneV43_05_Debug} durationInFrames={300} fps={60} width={1920} height={1080} />

            <Composition id="AAA-VAR-V43-09-BRIGHT" component={SceneV43_09} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V43-09-DEBUG" component={SceneV43_09_Debug} durationInFrames={300} fps={60} width={1920} height={1080} />

             <Composition id="AAA-VAR-V43-11-NOISE" component={SceneV43_11} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V43-11-DEBUG" component={SceneV43_11_Debug} durationInFrames={300} fps={60} width={1920} height={1080} />

            {/* 🏆 V42: GOLDEN MEAN (80% Grey, Moving, Compliance) */}
            <Composition id="AAA-VAR-V42a-LIQUID-GREY" component={SceneV42a_LiquidGrey} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V42a-LIQUID-DEBUG" component={SceneV42a_LiquidGrey_Debug} durationInFrames={300} fps={60} width={1920} height={1080} />

            <Composition id="AAA-VAR-V42b-KINETIC-STARS" component={SceneV42b_KineticStars} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V42b-KINETIC-DEBUG" component={SceneV42b_KineticStars_Debug} durationInFrames={300} fps={60} width={1920} height={1080} />

            <Composition id="AAA-VAR-V42c-SOFT-ARENA" component={SceneV42c_SoftArena} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V42c-SOFT-DEBUG" component={SceneV42c_SoftArena_Debug} durationInFrames={300} fps={60} width={1920} height={1080} />

            <Composition id="AAA-VAR-V42d-DRIFTING-RINGS" component={SceneV42d_DriftingRings} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V42d-DRIFTING-DEBUG" component={SceneV42d_DriftingRings_Debug} durationInFrames={300} fps={60} width={1920} height={1080} />

            <Composition id="AAA-VAR-V42e-BRIGHT-TECH" component={SceneV42e_BrightTech} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V42e-BRIGHT-DEBUG" component={SceneV42e_BrightTech_Debug} durationInFrames={300} fps={60} width={1920} height={1080} />

            {/* 🏰 V41: THE COMBINATORIAL MATRIX (5 Distinct Versions) */}
            <Composition id="AAA-VAR-V41a-ARENA-OVAL" component={SceneV41a_ArenaOval} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V41a-ARENA-DEBUG" component={SceneV41a_ArenaOval_Debug} durationInFrames={300} fps={60} width={1920} height={1080} />

            <Composition id="AAA-VAR-V41b-SHARP-STAR" component={SceneV41b_SharpStar} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V41b-SHARP-DEBUG" component={SceneV41b_SharpStar_Debug} durationInFrames={300} fps={60} width={1920} height={1080} />

            <Composition id="AAA-VAR-V41c-MARBLED-HEX" component={SceneV41c_MarbledHex} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V41c-MARBLED-DEBUG" component={SceneV41c_MarbledHex_Debug} durationInFrames={300} fps={60} width={1920} height={1080} />

            <Composition id="AAA-VAR-V41d-TILTED-RINGS" component={SceneV41d_TiltedRings} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V41d-TILTED-DEBUG" component={SceneV41d_TiltedRings_Debug} durationInFrames={300} fps={60} width={1920} height={1080} />

            <Composition id="AAA-VAR-V41e-DEEP-SPACE" component={SceneV41e_DeepSpace} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V41e-DEEP-DEBUG" component={SceneV41e_DeepSpace_Debug} durationInFrames={300} fps={60} width={1920} height={1080} />

            {/* 💎 V40: REAL GRADIENTS (Shader-Based, No Stacked Planes, Clean Slate) */}
            <Composition id="AAA-VAR-V40-REAL-GRADIENTS" component={SceneV40_RealGradients} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V40-REAL-GRADIENTS-DEBUG" component={SceneV40_RealGradients_Debug} durationInFrames={300} fps={60} width={1920} height={1080} />

            {/* 🌀 V39: CHAOS THEORY (Mix of Star, Oval, Triangle + Image Ready) */}
            <Composition id="AAA-VAR-V39-CHAOS" component={SceneV39_Chaos} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V39-CHAOS-DEBUG" component={SceneV39_Chaos_Debug} durationInFrames={300} fps={60} width={1920} height={1080} />

            {/* 🐄 V38: THE MARBLED MASTER (Gradient Texture, Complex Reflections) */}
            <Composition id="AAA-VAR-V38-MARBLED" component={SceneV38_Marbled} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V38-MARBLED-DEBUG" component={SceneV38_Marbled_Debug} durationInFrames={300} fps={60} width={1920} height={1080} />

            {/* 🥚 V37: ORGANIC OVALS (No Straight Lines) */}
            <Composition id="AAA-VAR-V37-OVALS" component={SceneV37_Ovals} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V37-OVALS-DEBUG" component={SceneV37_Ovals_Debug} durationInFrames={300} fps={60} width={1920} height={1080} />

            {/* 📐 V36: ASYMMETRIC / TILTED (Diagonal Reflections) */}
            <Composition id="AAA-VAR-V36a-TILTED" component={SceneV36a_Tilted} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V36a-TILTED-DEBUG" component={SceneV36a_Tilted_Debug} durationInFrames={300} fps={60} width={1920} height={1080} />
            
            <Composition id="AAA-VAR-V36b-EXTREME" component={SceneV36b_Extreme} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V36b-EXTREME-DEBUG" component={SceneV36b_Extreme_Debug} durationInFrames={300} fps={60} width={1920} height={1080} />

            {/* 🛑 V35: ROOM SHAPES (Change the REFLECTION GEOMETRY) */}
            <Composition id="AAA-VAR-V35a-HEXAGON" component={SceneV35a_Hexagon} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V35a-HEXAGON-DEBUG" component={SceneV35a_Hexagon_Debug} durationInFrames={300} fps={60} width={1920} height={1080} />

            <Composition id="AAA-VAR-V35b-TRIANGLE" component={SceneV35b_Triangle} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V35b-TRIANGLE-DEBUG" component={SceneV35b_Triangle_Debug} durationInFrames={300} fps={60} width={1920} height={1080} />

            <Composition id="AAA-VAR-V35c-SQUARE" component={SceneV35c_Square} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V35c-SQUARE-DEBUG" component={SceneV35c_Square_Debug} durationInFrames={300} fps={60} width={1920} height={1080} />

            <Composition id="AAA-VAR-V35d-STAR" component={SceneV35d_Star} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V35d-STAR-DEBUG" component={SceneV35d_Star_Debug} durationInFrames={300} fps={60} width={1920} height={1080} />

            {/* 🔶 V34: GEOMETRIC SHAPES (Oval, Triangle, Hexagon, Star) */}
            <Composition id="AAA-VAR-V34a-OVAL" component={SceneV34a_Oval} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V34b-TRIANGLE" component={SceneV34b_Triangle} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V34c-HEXAGON" component={SceneV34c_Hexagon} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V34d-STAR" component={SceneV34d_Star} durationInFrames={300} fps={60} width={1920} height={1080} />

            {/* 👁️ V33 DEBUG: SHOW ME THE COLORED ROOM */}
            <Composition id="AAA-VAR-V33-DEBUG-ROOM" component={SceneV33_Debug} durationInFrames={300} fps={60} width={1920} height={1080} />

            {/* 🎨 V33: COLOR GRADIENT (Blue/Beige/Silver, No B&W) */}
            <Composition id="AAA-VAR-V33-COLOR-GRADIENT" component={SceneV33} durationInFrames={300} fps={60} width={1920} height={1080} />

            {/* ☁️ V32: GREY GRADIENT (The "80% Grey" Request) */}
            <Composition id="AAA-VAR-V32-GREY-GRADIENT" component={SceneV32} durationInFrames={300} fps={60} width={1920} height={1080} />

            {/* 🌈 V31: COLOR TUNED (Warm/Cool Synthetic, No B&W) */}
            <Composition id="AAA-VAR-V31a-WARM-LUXURY" component={SceneV31a_Warm} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V31b-COOL-TECH" component={SceneV31b_Cool} durationInFrames={300} fps={60} width={1920} height={1080} />

            {/* 🛠️ V30: SYNTHETIC STUDIO (Rebuilt Light Setup, No Objects) */}
            <Composition id="AAA-VAR-V30a-REBUILT-STUDIO" component={SceneV30a_Rebuilt} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V30b-HIGH-KEY" component={SceneV30b_HighKey} durationInFrames={300} fps={60} width={1920} height={1080} />

            {/* 🌇 V29: THEMATIC ROOMS (Sunset, Night, Warehouse, Forest) */}
            <Composition id="AAA-VAR-V29a-SUNSET" component={SceneV29a_Sunset} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V29b-NIGHT" component={SceneV29b_Night} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V29c-WAREHOUSE" component={SceneV29c_Warehouse} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V29d-FOREST" component={SceneV29d_Forest} durationInFrames={300} fps={60} width={1920} height={1080} />

            {/* 💎 V28: V7 RESTORED (The Best One, but Frameless + Clean) */}
            <Composition id="AAA-VAR-V28-V7-RESTORED" component={SceneV28} durationInFrames={300} fps={60} width={1920} height={1080} />

            {/* 💎 V27: HYBRID MASTER (Old Look + New Geometry) */}
            <Composition id="AAA-VAR-V27-HYBRID-MASTER" component={SceneV27} durationInFrames={300} fps={60} width={1920} height={1080} />

            {/* 👁️ DEBUG: SHOW ME THE STUDIO WALLS */}
            <Composition id="AAA-VAR-V26-DEBUG-VIEW" component={SceneV26_Debug} durationInFrames={300} fps={60} width={1920} height={1080} />

            {/* 🪙 V26: GREY STUDIO (Realistic Silver Tones) */}
            <Composition id="AAA-VAR-V26-GREY-STUDIO" component={SceneV26} durationInFrames={300} fps={60} width={1920} height={1080} />

            {/* ✨ V25: PURE LIGHTFORMER STUDIO (No HDRI, No Objects) */}
            <Composition id="AAA-VAR-V25-PURE-STUDIO" component={SceneV25} durationInFrames={300} fps={60} width={1920} height={1080} />

            {/* 🏆 V24: THE MASTER RECIPE (All Learnings Combined) */}
            <Composition id="AAA-VAR-V24-MASTER" component={SceneV24} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V24a-CLEAN" component={SceneV24a_Clean} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V24b-SUBTLE-COLOR" component={SceneV24b_SubtleColor} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V24c-PURE-MIRROR" component={SceneV24c_PureMirror} durationInFrames={300} fps={60} width={1920} height={1080} />

            {/* 🏠 V23: REAL HDRI PRESETS (The Fix) */}
            <Composition id="AAA-VAR-V23-APARTMENT" component={SceneV23_Apartment} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V23b-STUDIO" component={SceneV23b_Studio} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V23c-CITY" component={SceneV23c_City} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V23d-LOBBY" component={SceneV23d_Lobby} durationInFrames={300} fps={60} width={1920} height={1080} />

            {/* Legacy */}
            <Composition id="AAA-VAR-V22-LIQUID-SILVER" component={SceneV22} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V17-WHITE-ROOM" component={SceneV17} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V18-GREY-STUDIO" component={SceneV18} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V19-CHROME-BRIGHT" component={SceneV19} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V20-LIQUID-MIRROR" component={SceneV20} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V21-PHYSICAL-SILVER" component={SceneV21} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V16-SILVER-SUN" component={SceneV16} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V15-BRIGHT-MASTER" component={SceneV15} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V14-HYPER-LIQUID" component={SceneV14} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V13-CAPSULE-FIX" component={SceneV13} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V12-LIGHT-TENT" component={SceneV12} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V11-HORIZON-FIX" component={SceneV11} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V10-LIQUID-PILL" component={SceneV10} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V9-ZERO-FRAME" component={SceneV9} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V6-MASSIVE-FILL" component={SceneV6} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V7-ULTRA-SHARP" component={SceneV7} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V8-CITY-REALISM" component={SceneV8} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="Viron-V5-Satin-Pill" component={VironMaster_V5_Scene} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="Viron-V4-Big-Face" component={VironMaster_V4_Scene} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="Viron-V3-Master-Redesign" component={VironMaster_Scene} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="Viro-V3-Failed-Attempt" component={ViroMaster_V3_Scene} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="Viro-V2-Gradient" component={() => <SceneWrapper><ViroMaster_V2_Button /></SceneWrapper>} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="Viro-V1-Mirror" component={() => <SceneWrapper><ViroMaster_V1_Button /></SceneWrapper>} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="True-First-Draft-Rescue" component={TrueFirstDraftScene} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="Silver-0-2-SuperGlint" component={SilverButton_0_2_SuperGlint_LogoLess} durationInFrames={150} fps={60} width={1920} height={1080} />
            <Composition id="Silver-0-5-Original" component={SilverButton_0_5_OriginalGlint} durationInFrames={150} fps={60} width={1920} height={1080} />
            <Composition id="Silver-1-0-Refined" component={() => <SceneWrapper><SilverButton_1_0_Refined /></SceneWrapper>} durationInFrames={150} fps={60} width={1920} height={1080} />
            <Composition id="Cube-2-0-Rounded" component={() => <SceneWrapper><VironCube_2_0_Rounded /></SceneWrapper>} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="Experimental-Chrome-V3" component={ChromeScene} durationInFrames={150} fps={60} width={1920} height={1080} />
            <Composition id="Production-Scene-Legacy" component={MainScene} durationInFrames={300} fps={60} width={1920} height={1080} />
		</>
	);
};
