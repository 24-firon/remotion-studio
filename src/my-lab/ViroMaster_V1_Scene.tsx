import React from 'react';
import { AbsoluteFill } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { Environment } from '@react-three/drei';
import { ViroMaster_V1_Button } from './ViroMaster_V1_Button';
import { ViroTerminal_Pro } from './ViroTerminal_Pro';

/**
 * THE VIRO-MASTER V1 SCENE
 * Full Restoration of the First Right Draft vision.
 */
export const ViroMaster_V1_Scene: React.FC = () => {
    return (
        <AbsoluteFill style={{ background: '#020617' }}>
            {/* Layer 0: Cinematic Background */}
            <AbsoluteFill style={{
                background: `radial-gradient(circle at 50% 50%, #1e293b 0%, #020617 100%)`,
                opacity: 0.9
            }} />

            {/* Layer 1: The EXPANSIVE Terminal (1100px) */}
            <AbsoluteFill style={{ zIndex: 10, alignItems: 'center', justifyContent: 'center' }}>
                <ViroTerminal_Pro />
            </AbsoluteFill>

            {/* Layer 2: The Ultra-Rounded Mirror Button */}
            <AbsoluteFill style={{ zIndex: 20 }}>
                <ThreeCanvas camera={{ position: [0, 0, 10], fov: 35 }} width={1920} height={1080}>
                    {/* STUDIO environment provides the beautiful "Mirror Silver" reflections */}
                    <Environment preset="studio" />
                    
                    {/* NO manual point/spotlights for a clean surface free of 'spots' */}
                    
                    <ViroMaster_V1_Button />
                </ThreeCanvas>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
