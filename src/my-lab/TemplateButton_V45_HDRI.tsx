import { Environment, Float, OrbitControls } from "@react-three/drei";
import { ThreeCanvas } from "@remotion/three";
import React, { useMemo } from "react";
import {
	AbsoluteFill,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from "remotion";
const BaseButtonHighPoly: React.FC = () => (
	<mesh rotation={[0, 0, Math.PI / 2]}>
		{/* INCREASED SEGMENTS: 64 cap, 256 radial -> Vector Smooth */}
		<capsuleGeometry args={[0.92, 4.0, 64, 256]} />
		<meshPhysicalMaterial
			color="#ffffff"
			metalness={1.0}
			roughness={0.12}
			envMapIntensity={1.5}
			clearcoat={1.0}
		/>
	</mesh>
);

// --- TEMPLATE DEFINITIONS ---
// "Direct Loader" Strategy: We use the direct download URL from Poly Haven.
// CAUTION: Requires Internet Connection.

export type HdriTemplateId = 
	| "studio_blue" 
	| "studio_soft" 
	| "neon_city" 
	| "golden_hour" 
	| "moonless";

export const HDRI_TEMPLATES: Record<HdriTemplateId, { url: string; name: string; rotation: [number, number, number] }> = {
	studio_blue: {
		name: "Blue Photo Studio",
		url: "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/4k/blue_photo_studio_4k.hdr",
		rotation: [0, 0, 0]
	},
	studio_soft: {
		name: "Studio Small 08",
		url: "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/4k/studio_small_08_4k.hdr",
		rotation: [0, Math.PI / 4, 0]
	},
	neon_city: {
		name: "Shanghai Bund (Neon)",
		url: "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/4k/shanghai_bund_4k.hdr",
		rotation: [0, -Math.PI / 2, 0]
	},
	golden_hour: {
		name: "Zwartkops Curve (Golden)",
		url: "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/4k/zwartkops_curve_sunset_4k.hdr",
		rotation: [0, 0, 0]
	},
	moonless: {
		name: "Moonless Golf (Dark)",
		url: "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/4k/moonless_golf_4k.hdr",
		rotation: [0, 0, 0]
	}
};

const TemplateButtonScene: React.FC<{ templateId: HdriTemplateId }> = ({ templateId }) => {
	const frame = useCurrentFrame();
	const { fps, width, height } = useVideoConfig();

	const activeTemplate = HDRI_TEMPLATES[templateId];

	// --- ANIMATION ---
	// 1. Float Animation
	const floatIntensity = 0.5;
	const floatSpeed = 2; // Moderate speed

	// 2. Camera Move (Subtle Orbit)
	// We rotate the camera slightly to show off the reflections moving
	const cameraAngle = (frame / fps) * 0.2; // Slow rotation

	return (
		<ThreeCanvas
			width={width}
			height={height}
			linear={false} // Use sRGB encoding for correct colors
			camera={{ position: [0, 0, 12], fov: 35 }}
		>
			<ambientLight intensity={0.2} />

			{/* --- THE HDRI ENVIRONMENT --- */}
			{/* background={true} makes it visible so we see the "world" and no black gaps */}
			<Environment 
				files={activeTemplate.url} 
				background={true}
				environmentRotation={activeTemplate.rotation}
			/>

			{/* --- THE HERO OBJECT --- */}
			<Float speed={floatSpeed} rotationIntensity={floatIntensity} floatIntensity={floatIntensity}>
				<group rotation={[cameraAngle * 0.5, -cameraAngle, 0]}>
					<BaseButtonHighPoly />
				</group>
			</Float>

			<OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
		</ThreeCanvas>
	);
};

export const TemplateButton_V45_HDRI: React.FC<{ templateId?: HdriTemplateId }> = ({ templateId = "studio_blue" }) => {
	return (
		<AbsoluteFill style={{ backgroundColor: "#000000" }}>
			<TemplateButtonScene templateId={templateId} />
			
			{/* Label Overlay */}
			<div style={{
				position: "absolute",
				bottom: 50,
				left: 0,
				width: "100%",
				textAlign: "center",
				fontFamily: "Inter, sans-serif",
				color: "rgba(255,255,255,0.5)",
				fontSize: 24,
				fontWeight: 600,
				textTransform: "uppercase",
				letterSpacing: "0.1em",
				pointerEvents: "none"
			}}>
				{HDRI_TEMPLATES[templateId].name}
			</div>
		</AbsoluteFill>
	);
};
