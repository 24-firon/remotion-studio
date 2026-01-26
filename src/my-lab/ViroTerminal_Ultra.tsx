import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../theme/Theme';
import { CONSTANTS } from '../constants';

/**
 * THE VIRO-TERMINAL (ULTRA-WIDE)
 * Width 1200px for maximum professional impact.
 */
export const ViroTerminal_Ultra: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const hydraulicSpring = spring({
        frame: frame - (CONSTANTS.IMPACT_FRAME + 5), 
        fps,
        config: {
            damping: 20,
            stiffness: 120,
        }, 
    });

    const translateY = interpolate(hydraulicSpring, [0, 1], [-200, 320]); 
    const opacity = interpolate(hydraulicSpring, [0, 0.2], [0, 1]); 

    const text = "npx viron-studio --production-master";
    const typeSpeed = 2; 
    const startTypingFrame = (CONSTANTS.IMPACT_FRAME + 5) + 20; 
    
    const progress = interpolate(
        frame,
        [startTypingFrame, startTypingFrame + text.length * typeSpeed],
        [0, text.length],
        { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
    );
    const visibleText = text.slice(0, Math.floor(progress));
    const showCursor = Math.floor(frame / 15) % 2 === 0;

    return (
        <div 
            className="absolute rounded-2xl overflow-hidden border font-mono flex flex-col items-center shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)]"
            style={{
                width: 1200, 
                bottom: 120,
                transform: `translateX(-50%) translateY(${translateY}px)`,
                left: '50%',
                opacity: opacity,
                background: 'rgba(5, 5, 10, 0.99)',
                borderColor: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(30px)',
                zIndex: -1,
            }}
        >
            <div className="w-full h-14 flex-none flex items-center px-6 gap-4 border-b" style={{ backgroundColor: '#09090b', borderColor: 'rgba(255, 255, 255, 0.05)' }}>
                <div className="w-4 h-4 rounded-full bg-zinc-800" />
                <div className="w-4 h-4 rounded-full bg-zinc-800" />
                <div className="w-4 h-4 rounded-full bg-zinc-800" />
            </div>

            <div className="w-full p-12 text-left text-4xl font-light">
                <div className="flex flex-row items-center tracking-tighter">
                    <span className="mr-6 text-zinc-500 font-bold opacity-40">#</span>
                    <span className="text-zinc-50 font-medium">
                        {visibleText}
                    </span>
                    <span className="inline-block w-5 h-12 ml-3 bg-zinc-50" style={{ opacity: showCursor ? 1 : 0 }} />
                </div>
            </div>
        </div>
    );
};
