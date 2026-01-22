import {Composition} from 'remotion';
import {SilverButton} from './my-lab/SilverButton';
import './style.css';

export const RemotionRoot: React.FC = () => {
	return (
		<>
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
