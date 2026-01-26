import { AbsoluteFill, Composition } from 'remotion';
import React, { Suspense } from 'react';
import { ThreeCanvas } from '@remotion/three';
import { Environment } from '@react-three/drei';

// --- VERSIONED COMPONENTS ---
import { ViroMaster_V2_Button } from './my-lab/ViroMaster_V2_Button';
import { ViroMaster_V1_Button } from './my-lab/ViroMaster_V1_Button';
import { SilverButton_0_2_SuperGlint_LogoLess } from './my-lab/SilverButton_0_2_SuperGlint_LogoLess';
import { SilverButton_0_5_OriginalGlint } from './my-lab/SilverButton_0_5_OriginalGlint';
import { SilverButton_1_0_Refined } from './my-lab/SilverButton_1_0_Refined';
import { VironCube_1_0_Square } from './experiments/cube-v1/VironCube_1_0_Square';
import { VironCube_2_0_Rounded } from './experiments/cube-v1/VironCube_2_0_Rounded';
import { TrueFirstDraftScene } from './my-lab/TrueFirstDraftScene';
import { MainScene } from './my-lab/MainScene';
import { ChromeScene } from './experiments/chrome-v3';
import './style.css';

// --- UTILS ---
const SceneWrapper: React.FC<{ children: React.ReactNode }> = ({ children, bg = '#020617' }) => (
    <AbsoluteFill style={{ backgroundColor: bg }}>
        <Suspense fallback={<AbsoluteFill style={{ color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Restoring Viro Masterpiece...</AbsoluteFill>}>
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
            {/* 🏆 THE LATEST REFINEMENT (V2) */}
            <Composition
				id="AAA-VIRO-MASTER-V2-SMOOTH-GRADIENT"
				component={() => <SceneWrapper><ViroMaster_V2_Button /></SceneWrapper>}
				durationInFrames={300}
				fps={60}
				width={1920}
				height={1080}
			/>

            {/* --- THE COMPLETE RESTORED LABORATORY --- */}
            
            <Composition
				id="ViroMaster-V1-Previous-Attempt"
				component={() => <SceneWrapper><ViroMaster_V1_Button /></SceneWrapper>}
				durationInFrames={300}
				fps={60}
				width={1920}
				height={1080}
			/>

            <Composition
				id="Button-0-2-SuperGlint-LogoLess"
				component={SilverButton_0_2_SuperGlint_LogoLess}
				durationInFrames={150}
				fps={60}
				width={1920}
				height={1080}
			/>

            <Composition
				id="Button-0-5-OriginalGlint"
				component={SilverButton_0_5_OriginalGlint}
				durationInFrames={150}
				fps={60}
				width={1920}
				height={1080}
			/>

            <Composition
				id="Button-1-1-Refined-PBR"
				component={() => <SceneWrapper><SilverButton_1_0_Refined /></SceneWrapper>}
				durationInFrames={150}
				fps={60}
				width={1920}
				height={1080}
			/>
            
            <Composition
				id="Cube-1-0-Square"
				component={() => <SceneWrapper><VironCube_1_0_Square /></SceneWrapper>}
				durationInFrames={300}
				fps={60}
				width={1920}
				height={1080}
			/>

            <Composition
				id="Cube-2-0-Rounded"
				component={() => <SceneWrapper><VironCube_2_0_Rounded /></SceneWrapper>}
				durationInFrames={300}
				fps={60}
				width={1920}
				height={1080}
			/>

            <Composition
				id="Chrome-V3-Evolution"
				component={ChromeScene}
				durationInFrames={150}
				fps={60}
				width={1920}
				height={1080}
			/>

            <Composition
				id="Production-Scene-Current"
				component={MainScene}
				durationInFrames={300}
				fps={60}
				width={1920}
				height={1080}
			/>
		</>
	);
};
