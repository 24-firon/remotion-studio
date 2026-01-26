import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React, { useMemo } from 'react';
import { RoundedBox } from '@react-three/drei';
import { CONSTANTS } from '../constants';

/**
 * THE VIRO-MASTER V1 (REFINED RESTORATION)
 * - Fixed Proportions: 3.5 x 1.2 x 0.2 (Original size)
 * - Fixed Glint: Reduced intensity and width to eliminate "long white spot"
 * - Mirror Finish: Pure environment-driven reflections
 */
export const ViroMaster_V1_Button: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // 1. Snappy Physics (Pulsing Entrance)
    const entrance = spring({
        frame: frame - CONSTANTS.IMPACT_FRAME,
        fps,
        config: {
            damping: 15,
            stiffness: 150,
            mass: 0.8,
        },
    });
    const scale = interpolate(entrance, [0, 1], [0, 1]); // Fixed scale (1:1 with original)

    // 2. The Refined Master Glint
    // We use a thinner, more subtle AreaLight sweep
    const glintTranslate = interpolate(frame, [45, 100], [-4, 4], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const materialProps = useMemo(() => ({
        color: "#ffffff",
        metalness: 1.0,
        roughness: 0.05,
        envMapIntensity: 1.2, // Balanced intensity
    }), []);

    return (
        <group scale={scale}>
            {/* The Refined Glint - Thinner and less intense to avoid the 'spots' */}
            <rectAreaLight
                width={0.05}     // Half the previous width
                height={4}
                position={[glintTranslate, 1, 1.5]}
                intensity={25}    // Half the previous intensity
                color="#f8fafc"   // Slightly cooler white
                rotation={[0, 0, Math.PI / 4]}
            />

            {/* The Hero Body: Exact Original Scale */}
            <RoundedBox 
                args={[3.5, 1.2, 0.2]} // RESTORED ORIGINAL SIZE
                radius={0.35}          // High roundness, but proportional
                smoothness={12}
            >
                 <meshStandardMaterial {...materialProps} />
            </RoundedBox>
        </group>
    );
};
