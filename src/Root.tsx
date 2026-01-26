import { AbsoluteFill, Composition } from 'remotion';
import React, { Suspense } from 'react';
import { ThreeCanvas } from '@remotion/three';
import { Environment } from '@react-three/drei';

// --- THE NEW CONTENDERS ---
import { SceneV6, SceneV7, SceneV8 } from './my-lab/VironVariants_V6_V7_V8';

// --- THE LEGACY ---
import { VironMaster_V5_Scene } from './my-lab/VironMaster_V5_Scene';
import { VironMaster_V4_Scene } from './my-lab/VironMaster_V4_Scene';
import { VironMaster_Scene } from './my-lab/VironMaster_Scene';
import { MainScene } from './my-lab/MainScene';
import './style.css';

export const RemotionRoot: React.FC = () => {
	return (
		<>
            {/* 🔴 VARIANT 6: MASSIVE FILL (Brute Size) */}
            <Composition
				id="AAA-VAR-V6-MASSIVE-FILL"
				component={SceneV6}
				durationInFrames={300}
				fps={60}
				width={1920}
				height={1080}
			/>

            {/* 🔴 VARIANT 7: ULTRA SHARP (No Blur, High Res) */}
            <Composition
				id="AAA-VAR-V7-ULTRA-SHARP"
				component={SceneV7}
				durationInFrames={300}
				fps={60}
				width={1920}
				height={1080}
			/>

            {/* 🔴 VARIANT 8: CITY GLINT (Different Reflections) */}
            <Composition
				id="AAA-VAR-V8-CITY-REALISM"
				component={SceneV8}
				durationInFrames={300}
				fps={60}
				width={1920}
				height={1080}
			/>

            {/* Previous Best */}
            <Composition
				id="V5-Satin-Pill"
				component={VironMaster_V5_Scene}
				durationInFrames={300}
				fps={60}
				width={1920}
				height={1080}
			/>

            <Composition
				id="V4-Big-Face"
				component={VironMaster_V4_Scene}
				durationInFrames={300}
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
