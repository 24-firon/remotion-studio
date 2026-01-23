import React, { useMemo } from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { RoundedBox } from "@react-three/drei";
import { THEME } from "../../theme/Theme";

export const SilverMonolith: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Physics-Based Entrance
  // Initial scale-up with heavy damping for "heavy metal" feel
  const entrance = spring({
    frame,
    fps,
    config: THEME.physics.snappy, // Use Snappy for the prompt entrance
    from: 0,
    to: 1,
  });

  // Determine scale (Simple pop-in)
  const scale = interpolate(entrance, [0, 1], [0, 1.5]);

  // Continuous float/rotation using frame
  // We do NOT use time-based animation (clock). We use frame for determinism.
  const rotationY = interpolate(frame, [0, 180], [0, Math.PI]);
  const rotationX = interpolate(frame, [0, 180], [0, Math.PI * 0.1]);

  // Material props memoized
  const materialProps = useMemo(
    () => ({
      color: THEME.colors.metallic.stop1, // Brightest silver
      metalness: THEME.pbr.metalness,
      roughness: THEME.pbr.roughness,
      envMapIntensity: 1.2, // Slight boost for the hero object
    }),
    [],
  );

  return (
    <group rotation={[rotationX, rotationY, 0]}>
      <RoundedBox
        args={[2, 2, 2]} // Width, Height, Depth
        radius={0.15} // Border Radius
        smoothness={4} // Poly count for corners
        scale={scale}
      >
        <meshStandardMaterial {...materialProps} />
      </RoundedBox>
    </group>
  );
};
