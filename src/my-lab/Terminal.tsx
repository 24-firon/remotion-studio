import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../theme/Theme';
import { CONSTANTS } from '../constants';

interface TerminalProps {
    // No props needed currently as logical timing is internal/global synced
}

export const Terminal: React.FC<TerminalProps> = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // ===========================================
    // 🔩 HYDRAULIC PHYSICS ENGINE
    // ===========================================
    // The Terminal extends hydraulically ONLY when the button hits.
    // It shares the EXACT same spring config as the button for 1:1 sync.
    const hydraulicSpring = spring({
        frame: frame - CONSTANTS.IMPACT_FRAME, 
        fps,
        config: THEME.physics.snappy, // <--- SYNCED PHYSICS
    });

    // Map spring (0-1) to pixel extension distance
    // 0 = Hidden behind button (effectively)
    // 1 = Fully extended downwards (250px)
    const translateY = interpolate(hydraulicSpring, [0, 1], [-100, 250]); // Start slightly up, move down
    const opacity = interpolate(hydraulicSpring, [0, 0.2], [0, 1]); // Quick fade in

    // Text Typing Logic (starts after terminal begins expanding)
    const text = "npx remotion render --high-fidelity";
    const typeSpeed = 2; 
    const startTypingFrame = CONSTANTS.IMPACT_FRAME + 15; // Delay typing slightly
    
    const progress = interpolate(
        frame,
        [startTypingFrame, startTypingFrame + text.length * typeSpeed],
        [0, text.length],
        { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
    );
    const visibleText = text.slice(0, Math.floor(progress));
    const showCursor = Math.floor(frame / 15) % 2 === 0;

    const dotStyle: React.CSSProperties = {
        background: `linear-gradient(180deg, ${THEME.colors.metallic.stop2}, ${THEME.colors.metallic.stop6})`, // Themed dots
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.5)`,
    };

    return (
        <div 
            className="absolute rounded-lg overflow-hidden border font-mono flex flex-col items-center"
            style={{
                width: 600,
                // Position relative to center
                top: '50%', // Centered vertically initially
                left: '50%',
                marginLeft: -300, // Center X
                marginTop: -50,   // Initial offset behind button
                
                // HYDRAULIC ANIMATION
                transform: `translateY(${translateY}px)`,
                opacity: opacity,

                // Styling
                background: 'rgba(9, 9, 11, 0.95)',
                borderColor: THEME.colors.metallic.stop6,
                boxShadow: `0 20px 50px -12px rgba(0,0,0,0.6)`,
                zIndex: -1, // Logically behind visual center if needed, but MainScene handles Z
            }}
        >
            {/* Header */}
            <div 
                className="w-full h-8 flex-none flex items-center px-3 gap-2 border-b"
                style={{
                    backgroundColor: THEME.colors.metallic.stop7,
                    borderColor: THEME.colors.metallic.stop6,
                }}
            >
                <div className="w-3 h-3 rounded-full" style={dotStyle} />
                <div className="w-3 h-3 rounded-full" style={dotStyle} />
                <div className="w-3 h-3 rounded-full" style={dotStyle} />
            </div>

            {/* Content */}
            <div className="w-full flex-1 p-6 text-left text-xl">
                <div className="flex flex-row items-center">
                    <span className="mr-3" style={{color: THEME.colors.accent.tertiary}}>$</span>
                    <span style={{color: THEME.colors.neutral.gray200, textShadow: `0 0 10px rgba(255,255,255,0.2)`}}>
                        {visibleText}
                    </span>
                    <span 
                        className="inline-block w-3 h-6 align-middle ml-1"
                        style={{
                            backgroundColor: THEME.colors.accent.tertiary,
                            opacity: showCursor ? 1 : 0
                        }} 
                    />
                </div>
            </div>
        </div>
    );
};
