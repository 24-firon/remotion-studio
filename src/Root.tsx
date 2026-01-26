import { AbsoluteFill, Composition } from 'remotion';
import React, { Suspense } from 'react';
import { ThreeCanvas } from '@remotion/three';
import { Environment } from '@react-three/drei';

// --- THE BRIGHT MASTER ---
import { SceneV15 } from './my-lab/SceneV15';

// --- THE HYPER-LIQUID FIX ---
import { SceneV14 } from './my-lab/SceneV14';

// --- THE CAPSULE FIX ---
import { SceneV13 } from './my-lab/SceneV13';

// --- THE LIGHT TENT FIX ---
import { SceneV12 } from './my-lab/SceneV12';

// --- THE HORIZON FIX ---
import { SceneV11 } from './my-lab/SceneV11';

// --- THE LIQUID PILL FIX ---
import { SceneV10 } from './my-lab/SceneV10';

// --- THE ZERO FRAME EXPERIMENT ---
import { SceneV9 } from './my-lab/SceneV9';

// --- THE NEW CONTENDERS ---
import { SceneV6, SceneV7, SceneV8 } from './my-lab/VironVariants_V6_V7_V8';

// --- THE LEGACY OF VIRON (Historical Evolution) ---
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
            {/* ☀️ AAA-VAR-V15-BRIGHT-MASTER (Final Polish) */}
            <Composition
				id="AAA-VAR-V15-BRIGHT-MASTER"
				component={SceneV15}
				durationInFrames={300}
				fps={60}
				width={1920}
				height={1080}
			/>

            {/* 💎 AAA-VAR-V14-HYPER-LIQUID (Best of Both Worlds) */}
            <Composition
				id="AAA-VAR-V14-HYPER-LIQUID"
				component={SceneV14}
				durationInFrames={300}
				fps={60}
				width={1920}
				height={1080}
			/>

            {/* 🚀 AAA-VAR-V13-CAPSULE-FIX (No Bevels, No Spinning) */}
            <Composition
				id="AAA-VAR-V13-CAPSULE-FIX"
				component={SceneV13}
				durationInFrames={300}
				fps={60}
				width={1920}
				height={1080}
			/>

            {/* 💡 AAA-VAR-V12-LIGHT-TENT (Custom Environment) */}
            <Composition
				id="AAA-VAR-V12-LIGHT-TENT"
				component={SceneV12}
				durationInFrames={300}
				fps={60}
				width={1920}
				height={1080}
			/>

            {/* 💎 AAA-VAR-V11-HORIZON-FIX (The Seamless Pill) */}
            <Composition
				id="AAA-VAR-V11-HORIZON-FIX"
				component={SceneV11}
				durationInFrames={300}
				fps={60}
				width={1920}
				height={1080}
			/>
            
            {/* 🏆 V10: THE LIQUID PILL (Frameless Roundness) */}
            <Composition
				id="AAA-VAR-V10-LIQUID-PILL"
				component={SceneV10}
				durationInFrames={300}
				fps={60}
				width={1920}
				height={1080}
			/>

            {/* 🟢 V9: ZERO FRAME (Square-ish but clean) */}
            <Composition
				id="AAA-VAR-V9-ZERO-FRAME"
				component={SceneV9}
				durationInFrames={300}
				fps={60}
				width={1920}
				height={1080}
			/>

            {/* PREVIOUS EXPERIMENTS */}
            <Composition id="AAA-VAR-V6-MASSIVE-FILL" component={SceneV6} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V7-ULTRA-SHARP" component={SceneV7} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="AAA-VAR-V8-CITY-REALISM" component={SceneV8} durationInFrames={300} fps={60} width={1920} height={1080} />

            {/* EVOLUTION */}
            <Composition id="Viron-V5-Satin-Pill" component={VironMaster_V5_Scene} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="Viron-V4-Big-Face" component={VironMaster_V4_Scene} durationInFrames={300} fps={60} width={1920} height={1080} />
            <Composition id="Viron-V3-Master-Redesign" component={VironMaster_Scene} durationInFrames={300} fps={60} width={1920} height={1080} />

            {/* HISTORICAL */}
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
