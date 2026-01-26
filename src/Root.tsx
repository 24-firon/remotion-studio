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
