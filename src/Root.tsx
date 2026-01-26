import { AbsoluteFill, Composition } from 'remotion';
import React, { Suspense } from 'react';
import { ThreeCanvas } from '@remotion/three';
import { Environment } from '@react-three/drei';

// --- THE VIRON LEGACY ---
import { VironMaster_V5_Scene } from './my-lab/VironMaster_V5_Scene';
import { VironMaster_V4_Scene } from './my-lab/VironMaster_V4_Scene';
import { VironMaster_Scene } from './my-lab/VironMaster_Scene';
import { ViroMaster_V3_Scene } from './my-lab/ViroMaster_V3_Scene';
import { ViroMaster_V2_Button } from './my-lab/ViroMaster_V2_Button';
import { ViroMaster_V1_Button } from './my-lab/ViroMaster_V1_Button';
import { SilverButton_0_2_SuperGlint_LogoLess } from './my-lab/SilverButton_0_2_SuperGlint_LogoLess';
import { SilverButton_0_5_OriginalGlint } from './my-lab/SilverButton_0_5_OriginalGlint';
import { SilverButton_1_0_Refined } from './my-lab/SilverButton_1_0_Refined';
import { VironCube_2_0_Rounded } from './experiments/cube-v1/VironCube_2_0_Rounded';
import { MainScene } from './my-lab/MainScene';
import { ChromeScene } from './experiments/chrome-v3';
import './style.css';

const SceneWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <AbsoluteFill style={{ backgroundColor: '#020617' }}>
        <Suspense fallback={<AbsoluteFill style={{ color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Viron V5...</AbsoluteFill>}>
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
            {/* 💎 AAA-VIRON-V5 (HIGH-RES SATIN) */}
            <Composition
				id="AAA-VIRON-V5-SATIN-PILL"
				component={VironMaster_V5_Scene}
				durationInFrames={300}
				fps={60}
				width={1920}
				height={1080}
			/>

            <Composition
				id="AAA-VIRON-V4-BIG-FACE"
				component={VironMaster_V4_Scene}
				durationInFrames={300}
				fps={60}
				width={1920}
				height={1080}
			/>

            <Composition
				id="AAA-VIRON-MASTER-REDESIGN"
				component={VironMaster_Scene}
				durationInFrames={300}
				fps={60}
				width={1920}
				height={1080}
			/>

            {/* PREVIOUS ITERATIONS */}
            <Composition
				id="Failed-V3-ViroMaster"
				component={ViroMaster_V3_Scene}
				durationInFrames={300}
				fps={60}
				width={1920}
				height={1080}
			/>

            <Composition
				id="V2-Viro-Gradient"
				component={() => <SceneWrapper><ViroMaster_V2_Button /></SceneWrapper>}
				durationInFrames={300}
				fps={60}
				width={1920}
				height={1080}
			/>

            <Composition
				id="V1-Viro-Mirror"
				component={() => <SceneWrapper><ViroMaster_V1_Button /></SceneWrapper>}
				durationInFrames={300}
				fps={60}
				width={1920}
				height={1080}
			/>

            {/* HISTORICAL ARCHIVE */}
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
