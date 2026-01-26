import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../theme/Theme';
import { CONSTANTS } from '../constants';

/**
 * THE ORIGINAL LARGE TERMINAL
 * Width 90%, MaxWidth 1000px, Realistic Proportions.
 */
export const Terminal_Original: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Hydraulic Physics
    const hydraulicSpring = spring({
        frame: frame - (CONSTANTS.IMPACT_FRAME + 5), 
        fps,
        config: THEME.physics.snappy, 
    });

    const translateY = interpolate(hydraulicSpring, [0, 1], [-100, 300]); 
    const opacity = interpolate(hydraulicSpring, [0, 0.2], [0, 1]); 

    // Text Typing
    const text = "npx remotion render --high-fidelity";
    const typeSpeed = 2; 
    const startTypingFrame = (CONSTANTS.IMPACT_FRAME + 5) + 15; 
    
    const progress = interpolate(
        frame,
        [startTypingFrame, startTypingFrame + text.length * typeSpeed],
        [0, text.length],
        { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
    );
    const visibleText = text.slice(0, Math.floor(progress));
    const showCursor = Math.floor(frame / 15) % 2 === 0;

    const dotStyle = {
        background: `linear-gradient(180deg, ${THEME.colors.metallic.stop2}, ${THEME.colors.metallic.stop6})`,
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.5)`,
    };

    return (
        <div 
            className="absolute rounded-lg overflow-hidden border font-mono flex flex-col items-center shadow-2xl"
            style={{
                width: '90%', 
                maxWidth: 1000,
                bottom: 100,
                transform: `translateY(${translateY}px)`,
                opacity: opacity,
                background: 'rgba(9, 9, 11, 0.98)',
                borderColor: THEME.colors.metallic.stop6,
                zIndex: -1,
            }}
        >
            {/* Header */}
            <div className="w-full h-10 flex-none flex items-center px-4 gap-2 border-b" style={{ backgroundColor: THEME.colors.metallic.stop7, borderColor: THEME.colors.metallic.stop6 }}>
                <div className="w-3.5 h-3.5 rounded-full" style={dotStyle} />
                <div className="w-3.5 h-3.5 rounded-full" style={dotStyle} />
                <div className="w-3.5 h-3.5 rounded-full" style={dotStyle} />
            </div>

            {/* Content */}
            <div className="w-full p-8 text-left text-2xl">
                <div className="flex flex-row items-center">
                    <span className="mr-4" style={{color: THEME.colors.accent.tertiary}}>$</span>
                    <span style={{color: THEME.colors.neutral.gray200}}>{visibleText}</span>
                    <span className="inline-block w-4 h-8 ml-1" style={{ backgroundColor: THEME.colors.accent.tertiary, opacity: showCursor ? 1 : 0 }} />
                </div>
            </div>
        </div>
    );
};
