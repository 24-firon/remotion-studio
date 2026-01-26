import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../theme/Theme';
import { CONSTANTS } from '../constants';

/**
 * THE VIRON TERMINAL (MASTER)
 * - Width: 1200px (Cinematic Width)
 * - Naming: "Viron" everywhere.
 */
export const VironTerminal_Master: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const hydraulicSpring = spring({
        frame: frame - (CONSTANTS.IMPACT_FRAME + 5), 
        fps,
        config: {
            damping: 30,
            stiffness: 100,
        }, 
    });

    const translateY = interpolate(hydraulicSpring, [0, 1], [-200, 320]); 
    const opacity = interpolate(hydraulicSpring, [0, 0.2], [0, 1]); 

    const text = "npx viron render --master-quality";
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
            className="absolute rounded-2xl overflow-hidden border font-mono flex flex-col items-center shadow-[0_50px_100px_-20px_rgba(0,0,0,0.9)]"
            style={{
                width: 1200, 
                bottom: 150,
                transform: `translateX(-50%) translateY(${translateY}px)`,
                left: '50%',
                opacity: opacity,
                background: '#09090b', // Zinc-950
                borderColor: 'rgba(255, 255, 255, 0.1)',
                zIndex: -1,
            }}
        >
            <div className="w-full h-12 flex-none flex items-center px-6 gap-3 border-b border-white/5 bg-zinc-900/50">
                <div className="w-3.5 h-3.5 rounded-full bg-red-500/20 border border-red-500/50" />
                <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                <div className="w-3.5 h-3.5 rounded-full bg-green-500/20 border border-green-500/50" />
            </div>

            <div className="w-full p-10 text-left text-3xl font-light">
                <div className="flex flex-row items-center tracking-tight">
                    <span className="mr-6 text-emerald-500 font-bold opacity-60">❯</span>
                    <span className="text-zinc-100 font-medium tracking-wide">
                        {visibleText}
                    </span>
                    <span className="inline-block w-4 h-10 ml-3 bg-emerald-500" style={{ opacity: showCursor ? 1 : 0 }} />
                </div>
            </div>
        </div>
    );
};
