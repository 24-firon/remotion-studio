import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Theme} from './Theme';
import React from 'react';

export const SilverButton: React.FC = () => {
    const frame = useCurrentFrame();
    const {fps} = useVideoConfig();

    // 1. Impact Physics (Tresor-Bolzen)
    const scale = spring({
        frame: frame - 20, // Start at Frame 20
        fps,
        config: Theme.physics.impact,
    });
    
    // Clamp opacity to 0-1 to avoid glitches before frame 20 if spring is slight
    const opacity = interpolate(frame, [20, 25], [0, 1], {
        extrapolateLeft: 'clamp', 
        extrapolateRight: 'clamp'
    });

    // 2. The Glint (Shimmer)
    // Runs from frame 50 to 80
    const glintTranslate = interpolate(frame, [50, 80], [-100, 200], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <AbsoluteFill className="flex items-center justify-center" style={{backgroundColor: Theme.colors.surface.base}}>
            {/* Button Container */}
            <div 
                className="relative overflow-hidden rounded-xl shadow-2xl group"
                style={{
                    transform: `scale(${scale})`,
                    opacity: opacity,
                    background: `var(--color-silver-shine, linear-gradient(180deg, ${Theme.colors.surface.gradientStart}, ${Theme.colors.surface.gradientMid}, ${Theme.colors.surface.gradientEnd}))`,
                    borderTop: `1px solid ${Theme.colors.accent.highlight}`,
                    borderBottom: `1px solid ${Theme.colors.accent.shadow}`,
                    padding: '24px 64px',
                }}
            >
                {/* Text */}
                <span className="font-sans font-bold text-2xl tracking-widest text-zinc-900 uppercase">
                    Initialize Studio
                </span>

                {/* Glint Effect Layer */}
                <div
                    className="absolute top-0 bottom-0 w-1/3 pointer-events-none"
                    style={{
                        background: `linear-gradient(90deg, transparent, ${Theme.colors.accent.glint}, transparent)`,
                        transform: `skewX(-12deg) translateX(${glintTranslate}%)`,
                        left: 0, 
                    }}
                />
            </div>
        </AbsoluteFill>
    );
};
