import { AbsoluteFill, Composition } from 'remotion';
import React, { Suspense } from 'react';
import { ThreeCanvas } from '@remotion/three';
import { Environment } from '@react-three/drei';

// --- THE RESEARCHED MASTER (V22) ---
import { SceneV22 } from './my-lab/SceneV22';

// --- THE SILVER SPECTRUM (BRIGHTNESS VARIANTS) ---
import { SceneV17, SceneV18, SceneV19, SceneV20, SceneV21 } from './my-lab/VironVariants_SilverSpectrum';

// --- THE SILVER SUN (V16) ---
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
            {/* 🏆 AAA-VAR-V22-LIQUID-SILVER (Research Backed) */}
            <Composition id="AAA-VAR-V22-LIQUID-SILVER" component={SceneV22} durationInFrames={300} fps={60} width={1920} height={1080} />

            {/* ⚪ V17: WHITE ROOM (No Black Anywhere) */}
            <Composition id="AAA-VAR-V17-WHITE-ROOM" component={SceneV17} durationInFrames={300} fps={60} width={1920} height={1080} />

            {/* 🔳 V18: GREY STUDIO (Balanced Silver) */}
            <Composition id="AAA-VAR-V18-GREY-STUDIO" component={SceneV18} durationInFrames={300} fps={60} width={1920} height={1080} />

            {/* ⚡ V19: CHROME BRIGHT (Mirror Hard) */}
            <Composition id="AAA-VAR-V19-CHROME-BRIGHT" component={SceneV19} durationInFrames={300} fps={60} width={1920} height={1080} />

            {/* 💧 V20: LIQUID MIRROR (4k Res, No Grain) */}
            <Composition id="AAA-VAR-V20-LIQUID-MIRROR" component={SceneV20} durationInFrames={300} fps={60} width={1920} height={1080} />

            {/* 🪙 V21: PHYSICAL SILVER (Color Tuned) */}
            <Composition id="AAA-VAR-V21-PHYSICAL-SILVER" component={SceneV21} durationInFrames={300} fps={60} width={1920} height={1080} />

            {/* PREVIOUS BEST */}
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
