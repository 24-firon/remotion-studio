import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../theme/Theme';
import { CONSTANTS } from '../constants';

/**
 * THE VIRO-TERMINAL (PRO-SCALE)
 * Restored to a realistic, expansive size (1100px).
 */
export const ViroTerminal_Pro: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const hydraulicSpring = spring({
        frame: frame - (CONSTANTS.IMPACT_FRAME + 5), 
        fps,
        config: THEME.physics.snappy, 
    });

    // Smooth downwards extension
    const translateY = interpolate(hydraulicSpring, [0, 1], [-150, 280]); 
    const opacity = interpolate(hydraulicSpring, [0, 0.2], [0, 1]); 

    // Text Logic
    const text = "npx viron render --ultra-fidelity";
    const typeSpeed = 1.5; 
    const startTypingFrame = (CONSTANTS.IMPACT_FRAME + 5) + 10; 
    
    const progress = interpolate(
        frame,
        [startTypingFrame, startTypingFrame + text.length * typeSpeed],
        [0, text.length],
        { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
    );
    const visibleText = text.slice(0, Math.floor(progress));
    const showCursor = Math.floor(frame / 12) % 2 === 0;

    return (
        <div 
            className="absolute rounded-xl overflow-hidden border font-mono flex flex-col items-center shadow-[0_35px_60px_-15px_rgba(0,0,0,0.8)]"
            style={{
                width: 1100, // REALISTIC SCALE
                bottom: 150,
                transform: `translateY(${translateY}px)`,
                opacity: opacity,
                background: 'rgba(5, 5, 8, 0.98)',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                zIndex: -1,
            }}
        >
            {/* Header: Deep Metallic Bar */}
            <div className="w-full h-12 flex-none flex items-center px-5 gap-3 border-b" style={{ backgroundColor: '#18181b', borderColor: 'rgba(255, 255, 255, 0.05)' }}>
                <div className="w-4 h-4 rounded-full bg-red-900/40 border border-red-500/20" />
                <div className="w-4 h-4 rounded-full bg-amber-900/40 border border-amber-500/20" />
                <div className="w-4 h-4 rounded-full bg-emerald-900/40 border border-emerald-500/20" />
            </div>

            {/* Content: Large, High-Legibility Font */}
            <div className="w-full p-10 text-left text-3xl font-light">
                <div className="flex flex-row items-center tracking-tight">
                    <span className="mr-5 text-emerald-400 opacity-60">❯</span>
                    <span className="text-zinc-100 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                        {visibleText}
                    </span>
                    <span className="inline-block w-5 h-10 ml-2 align-middle bg-emerald-400" style={{ opacity: showCursor ? 1 : 0 }} />
                </div>
            </div>
        </div>
    );
};
