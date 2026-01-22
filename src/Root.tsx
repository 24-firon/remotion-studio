import {Composition} from 'remotion';
import {SilverButton} from './my-lab/SilverButton';
import {MainScene} from './my-lab/MainScene';
import './style.css';

export const RemotionRoot: React.FC = () => {
	return (
		<>
            <Composition
				id="MainProduction"
				component={MainScene}
				durationInFrames={200}
				fps={60}
				width={1920}
				height={1080}
			/>
			<Composition
				id="SilverButton"
				component={SilverButton}
				durationInFrames={150}
				fps={60}
				width={1920}
				height={1080}
			/>
		</>
	);
};
