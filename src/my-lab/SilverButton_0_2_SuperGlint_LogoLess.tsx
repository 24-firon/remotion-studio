import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { THEME } from '../theme/Theme';
import React from 'react';

/**
 * SUPER GLINT VERSION (V0.2)
 * Recovered from early commit 8bee22f.
 * Pure CSS-based rendering, No Logo, high-contrast glint snap.
 */
export const SilverButton_0_2_SuperGlint_LogoLess: React.FC = () => {
    const frame = useCurrentFrame();

    // The iconic 112deg glint sweep timing
    const glintTranslate = interpolate(frame, [40, 90], [-100, 100], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <AbsoluteFill className="flex items-center justify-center bg-slate-900">
            <div 
                className="relative w-96 h-24 rounded-2xl flex items-center justify-center overflow-hidden border-2"
                style={{
                    background: THEME.colors.metallic.stop4,
                    borderColor: THEME.colors.metallic.stop6,
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                }}
            >
                {/* No Logo as per user request */}
                <span className="font-sans font-bold text-3xl tracking-widest" style={{ color: THEME.colors.neutral.gray800, opacity: 0.6 }}>
                    VIRON
                </span>
                
                {/* The "Super Glint" Layer */}
                <div 
                    className="absolute inset-0 w-full h-full"
                    style={{
                        background: `linear-gradient(112deg, 
                            transparent 0%, 
                            rgba(255,255,255,0) 35%, 
                            rgba(255,255,255,0.9) 50%, 
                            rgba(255,255,255,0) 65%, 
                            transparent 100%
                        )`,
                        left: 0,
                        transform: `skewX(-15deg) translateX(${glintTranslate}%)`,
                    }}
                />
            </div>
        </AbsoluteFill>
    );
};
