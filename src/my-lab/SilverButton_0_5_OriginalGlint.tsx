import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { THEME } from '../theme/Theme';
import React from 'react';

/**
 * ORIGINAL VERSION (8bee22f)
 * Features the sharp 112deg glint gradient the user liked.
 */
export const SilverButton_0_5_OriginalGlint: React.FC = () => {
    const frame = useCurrentFrame();

    const glintTranslate = interpolate(frame, [40, 90], [-100, 100], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <AbsoluteFill className="flex items-center justify-center bg-slate-900">
            <div 
                className="relative w-96 h-24 rounded-2xl flex items-center justify-center overflow-hidden border-2 border-slate-700"
                style={{
                    background: THEME.colors.metallic.stop4,
                }}
            >
                <span className="font-sans font-bold text-3xl text-slate-800">
                    VIRON
                </span>
                
                {/* Glint Effect Layer */}
                <div 
                    className="absolute inset-0 w-full h-full"
                    style={{
                        background: `linear-gradient(112deg, 
                            transparent 0%, 
                            rgba(255,255,255,0) 40%, 
                            rgba(255,255,255,0.8) 50%, 
                            rgba(255,255,255,0) 60%, 
                            transparent 100%
                        )`,
                        left: 0,
                        transform: `skewX(-12deg) translateX(${glintTranslate}%)`,
                    }}
                />
            </div>
        </AbsoluteFill>
    );
};
