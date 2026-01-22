import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { Theme } from './Theme';

export const Terminal: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const text = "npx remotion render --high-fidelity";
    // 2 frames per character for high-tech precise feel
    const typeSpeed = 2; 
    const startTypingFrame = 10; // Slight delay after window appears

    // Typewriter Logic
    const progress = interpolate(
        frame,
        [startTypingFrame, startTypingFrame + text.length * typeSpeed],
        [0, text.length],
        {
            extrapolateRight: 'clamp',
            extrapolateLeft: 'clamp',
        }
    );
    
    const visibleText = text.slice(0, Math.floor(progress));

    // Blinking Cursor Logic (every 15 frames)
    const showCursor = Math.floor(frame / 15) % 2 === 0;

    // Metallic Dot Style
    const dotStyle: React.CSSProperties = {
        background: `linear-gradient(180deg, ${Theme.colors.surface.gradientMid}, ${Theme.colors.surface.gradientEnd})`,
        boxShadow: `inset 0 1px 0 ${Theme.colors.accent.highlight}`,
    };

    return (
        <div 
            className="w-[600px] rounded-lg overflow-hidden border shadow-2xl backdrop-blur-sm font-mono"
            style={{
                backgroundColor: 'rgba(9, 9, 11, 0.9)', // zinc-950 with opacity
                borderColor: 'rgba(63, 63, 70, 0.5)', // zinc-700 with opacity
                boxShadow: `0 20px 50px -12px rgba(0,0,0,0.5)`
            }}
        >
            {/* Header */}
            <div 
                className="h-8 flex items-center px-3 gap-2 border-b"
                style={{
                    backgroundColor: Theme.colors.surface.base,
                    borderColor: 'rgba(39, 39, 42, 1)', // zinc-800
                }}
            >
                {/* Metallic Dots */}
                <div className="w-3 h-3 rounded-full" style={dotStyle} />
                <div className="w-3 h-3 rounded-full" style={dotStyle} />
                <div className="w-3 h-3 rounded-full" style={dotStyle} />
            </div>

            {/* Content */}
            <div className="p-4 min-h-[100px] text-left">
                <span className="mr-2" style={{color: Theme.colors.surface.gradientMid}}>$</span>
                <span style={{color: Theme.colors.terminal.text, textShadow: `0 0 10px ${Theme.colors.terminal.text}40`}}>
                    {visibleText}
                </span>
                <span 
                    className="inline-block w-2 h-5 align-middle ml-1"
                    style={{
                        backgroundColor: Theme.colors.terminal.text,
                        opacity: showCursor ? 1 : 0
                    }} 
                />
            </div>
        </div>
    );
};
