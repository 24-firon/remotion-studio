import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import React from 'react';
import { Environment, Lightformer, OrbitControls } from '@react-three/drei';
import { CONSTANTS } from '../constants';

/**
 * V26 DEBUG VIEW
 * - Same as V26, but background={true} so you can SEE the lightformers.
 * - Camera zooms out to show the setup.
 */
export const VironButton_V26_GreyStudio_Debug: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const envRotationY = interpolate(frame, [0, 300], [0, Math.PI * 2]);

    return (
        <group>
            {/* 
                DEBUG: background={true} 
                This makes the invisible "Studio" VISIBLE.
            */}
            <Environment resolution={512} background={true}>
                <group rotation={[0, envRotationY, 0]}>
                    {/* BACK WALL (Silver Grey) */}
                    <Lightformer form="rect" intensity={1.5} color="#c0c0c0" scale={[60, 40, 1]} position={[0, 0, 25]} />
                    {/* LABEL: BACK */}

                    {/* LEFT WALL (Mid Grey) */}
                    <Lightformer form="rect" intensity={1.2} color="#b0b0b0" scale={[30, 40, 1]} position={[-25, 0, 0]} rotation={[0, Math.PI / 2, 0]} />

                    {/* RIGHT WALL (Mid Grey) */}
                    <Lightformer form="rect" intensity={1.2} color="#b0b0b0" scale={[30, 40, 1]} position={[25, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />

                    {/* FLOOR (Dark Grey) */}
                    <Lightformer form="rect" intensity={0.8} color="#909090" scale={[50, 30, 1]} position={[0, -20, 10]} rotation={[Math.PI / 2, 0, 0]} />

                    {/* CEILING (Light Grey) */}
                    <Lightformer form="rect" intensity={2.0} color="#e0e0e0" scale={[50, 30, 1]} position={[0, 20, 10]} rotation={[-Math.PI / 2, 0, 0]} />

                    {/* HIGHLIGHT STRIP (White) */}
                    <Lightformer form="rect" intensity={4} color="#ffffff" scale={[3, 15, 1]} position={[12, 5, 20]} />
                </group>
            </Environment>

            <mesh rotation={[0, 0, Math.PI / 2]}>
                <capsuleGeometry args={[0.92, 4.0, 8, 128]} />
                <meshPhysicalMaterial 
                    color="#ffffff"
                    metalness={1.0}
                    roughness={0.12}
                    envMapIntensity={1.8}
                    clearcoat={0.6}
                />
            </mesh>
        </group>
    );
};
