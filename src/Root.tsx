import {Composition} from 'remotion';
import {SilverButton} from './my-lab/SilverButton';
import {MainScene} from './my-lab/MainScene';
import './style.css';
import { ThreeCanvas } from '@remotion/three';
import { Environment } from '@react-three/drei';
import { SilverScene } from './experiments/silver-v2';
import { CubeScene } from './experiments/cube-v1';

// Wrapper for Standalone Preview (Fixes "R3F Hooks outside Canvas" crash)
const SilverButtonPreview = () => {
    return (
        <ThreeCanvas width={1920} height={1080}>
            <Environment preset="studio" />
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 10, 5]} intensity={1} />
            <SilverButton />
        </ThreeCanvas>
    );
};

export const RemotionRoot: React.FC = () => {
	return (
		<>
            <Composition
				id="MainScene"
				component={MainScene}
				durationInFrames={300}
				fps={60}
				width={1920}
				height={1080}
			/>
			<Composition
				id="SilverButton"
				component={SilverButtonPreview}
				durationInFrames={150}
				fps={60}
				width={1920}
				height={1080}
			/>
			<Composition
				id="SilverV2-Experiment"
				component={SilverScene}
				durationInFrames={300}
				fps={60}
				width={1920}
				height={1080}
			/>
			<Composition
				id="VironCube-V1"
				component={CubeScene}
				durationInFrames={300}
				fps={60}
				width={1920}
				height={1080}
			/>
		</>
	);
};
