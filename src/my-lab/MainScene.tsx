import { AbsoluteFill, Sequence, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { SilverButton } from './SilverButton';
import { Terminal } from './Terminal';
import { Theme } from './Theme';

export const MainScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Timeline Constants
    const TERMINAL_START_FRAME = 80;

    // Terminal Entry Physics ("Hydraulic Logic")
    // Slide up from bottom
    const terminalSlide = spring({
        frame: frame - TERMINAL_START_FRAME,
        fps,
        config: {
            mass: 2,        // Heavy
            damping: 30,    // No bounce, hydraulic feel
            stiffness: 100, // Reasonable speed
        },
    });

    return (
        <AbsoluteFill style={{backgroundColor: Theme.colors.surface.base}}>
            
            {/* 1. Background Vignette (Subtle Pulse) */}
            <AbsoluteFill style={{
                background: `radial-gradient(circle at center, ${Theme.colors.surface.gradientEnd}10 0%, transparent 60%)`,
                opacity: 0.5
            }} />

            {/* 2. Silver Button (Always visible / handles its own internal anims) */}
            <AbsoluteFill className="flex justify-center" style={{top: '30%'}}>
                 <div style={{transform: 'translateY(-50%)'}}>
                    <SilverButton />
                 </div>
            </AbsoluteFill>

            {/* 3. Terminal (Enters at Frame 80) */}
            <Sequence from={TERMINAL_START_FRAME}>
                 <AbsoluteFill className="flex justify-center" style={{top: '55%'}}>
                    <div style={{
                        transform: `translateY(${(1 - terminalSlide) * 50}px)`, // Sides up 50px -> 0px
                        opacity: terminalSlide,
                    }}>
                        <Terminal />
                    </div>
                 </AbsoluteFill>
            </Sequence>

        </AbsoluteFill>
    );
};
