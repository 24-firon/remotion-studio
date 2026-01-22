import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { SilverButton } from './SilverButton';
import { Terminal } from './Terminal';
import { Theme } from './Theme';

export const MainScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Timeline Constants
    const TERMINAL_START_FRAME = 80;

    // Terminal Entry Physics ("Hydraulic Logic")
    const terminalSlide = spring({
        frame,
        fps,
        delay: TERMINAL_START_FRAME,
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

            {/* 2. Main Flex Container (Centered Layout) */}
            <AbsoluteFill className="items-center justify-center flex flex-col gap-16">
                 {/* Silver Button (Always visible) */}
                 <div>
                    <SilverButton />
                 </div>

                 {/* Terminal (Appears at Frame 80) */}
                 {/* We render it always to keep layout stable, but animate opacity/transform */}
                 <div style={{
                    transform: `translateY(${(1 - terminalSlide) * 50}px)`, // Sides up 50px -> 0px
                    opacity: terminalSlide,
                 }}>
                     {/* Pass delay to Terminal so it starts typing after appearance */}
                    <Terminal delay={TERMINAL_START_FRAME + 10} />
                 </div>
            </AbsoluteFill>

        </AbsoluteFill>
    );
};
