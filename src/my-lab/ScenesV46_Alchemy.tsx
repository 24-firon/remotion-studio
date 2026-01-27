import React from 'react';
import { ThreeCanvas } from "@remotion/three";
import { Environment, OrbitControls } from "@react-three/drei";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { VironButton_V46_Alchemy } from "./VironButton_V46_Alchemy";

const V46AlchemyScene: React.FC<{ hdri: string; label: string }> = ({ hdri, label }) => {
  const { width, height } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <ThreeCanvas
        width={width}
        height={height}
        camera={{ position: [0, 0, 12], fov: 35 }}
      >
        <ambientLight intensity={0.2} />
        
        {/* We use a REAL WORLD HDRI (Shanghai) to prove we can distort it */}
        <Environment 
          files={hdri} 
          background={true}
        />

        <VironButton_V46_Alchemy distortion={1.2} />

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
      </ThreeCanvas>

      {/* Label Overlay */}
      <div style={{
        position: "absolute",
        bottom: 50,
        left: 0,
        width: "100%",
        textAlign: "center",
        fontFamily: "Inter, sans-serif",
        color: "rgba(255,255,255,0.7)",
        fontSize: 22,
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.2em",
        pointerEvents: "none"
      }}>
        V46: IRIDESCENT ALCHEMY ({label})
      </div>
    </AbsoluteFill>
  );
};

export const V46_Alchemy_Shanghai: React.FC = () => (
  <V46AlchemyScene 
    hdri="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/4k/shanghai_bund_4k.hdr" 
    label="Real World Distorted" 
  />
);

export const V46_Alchemy_Moonless: React.FC = () => (
  <V46AlchemyScene 
    hdri="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/4k/moonless_golf_4k.hdr" 
    label="Night Distortion" 
  />
);
