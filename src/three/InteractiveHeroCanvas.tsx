import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { LuxuryVillaModel } from './LuxuryVillaModel';

export type LightingMode = 'golden' | 'noon' | 'twilight';

interface InteractiveHeroCanvasProps {
  lightingMode: LightingMode;
  isExploded: boolean;
  isWireframe?: boolean;
  activeHotspotId?: string | null;
  onHotspotSelect?: (hotspotId: string) => void;
  className?: string;
  enableControls?: boolean;
}

// Target camera positions for each hotspot inspection
const HOTSPOT_CAMERA_TARGETS: Record<string, { pos: [number, number, number]; target: [number, number, number] }> = {
  'hs-pool': { pos: [8, 3.5, 6], target: [3.0, 0.2, 1.8] },
  'hs-lounge': { pos: [7.5, 2.8, 7.5], target: [4.2, 0.3, 3.6] },
  'hs-living': { pos: [4, 2.5, 6], target: [0.3, 1.2, 1.8] },
  'hs-master': { pos: [3.5, 4.5, 7.5], target: [-0.4, 2.8, 1.2] },
  'hs-garden': { pos: [-7, 3, 5], target: [-3.6, 0.5, 2.2] },
};

const DEFAULT_CAMERA_POS: [number, number, number] = [13, 7.5, 13];
const DEFAULT_LOOK_TARGET: [number, number, number] = [0.2, 1.2, 0.2];

// Scene Rig that handles camera lerping, mouse parallax, and smooth building responsiveness
const HeroSceneRig: React.FC<{
  lightingMode: LightingMode;
  isExploded: boolean;
  isWireframe?: boolean;
  activeHotspotId?: string | null;
  onHotspotSelect?: (hotspotId: string) => void;
  mousePos: React.MutableRefObject<{ x: number; y: number }>;
}> = ({
  lightingMode,
  isExploded,
  isWireframe,
  activeHotspotId,
  onHotspotSelect,
  mousePos,
}) => {
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const targetCamPos = useRef(new THREE.Vector3(...DEFAULT_CAMERA_POS));
  const targetLookAt = useRef(new THREE.Vector3(...DEFAULT_LOOK_TARGET));
  const currentLookAt = useRef(new THREE.Vector3(...DEFAULT_LOOK_TARGET));
  const explodedFactor = useRef(0);

  // Update target camera based on active hotspot
  useEffect(() => {
    if (activeHotspotId && HOTSPOT_CAMERA_TARGETS[activeHotspotId]) {
      const cfg = HOTSPOT_CAMERA_TARGETS[activeHotspotId];
      targetCamPos.current.set(...cfg.pos);
      targetLookAt.current.set(...cfg.target);
    } else {
      targetCamPos.current.set(...DEFAULT_CAMERA_POS);
      targetLookAt.current.set(...DEFAULT_LOOK_TARGET);
    }
  }, [activeHotspotId]);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();

    // 1. Smoothly interpolate exploded factor
    const targetExploded = isExploded ? 1.0 : 0.0;
    explodedFactor.current += (targetExploded - explodedFactor.current) * 0.08;

    // 2. Subtle mouse parallax when not inspecting a specific hotspot
    if (!activeHotspotId) {
      const mx = mousePos.current.x * 1.5;
      const my = mousePos.current.y * 0.8;
      const autoRotateAngle = elapsed * 0.04;

      // Base radius
      const r = 16.5;
      const camX = Math.sin(autoRotateAngle) * r + mx;
      const camZ = Math.cos(autoRotateAngle) * r;
      const camY = 7.5 - my;

      camera.position.lerp(new THREE.Vector3(camX, camY, camZ), 0.05);
    } else {
      camera.position.lerp(targetCamPos.current, 0.06);
    }

    currentLookAt.current.lerp(targetLookAt.current, 0.06);
    camera.lookAt(currentLookAt.current);

    // Subtle breathing tilt on group
    if (groupRef.current && !activeHotspotId) {
      groupRef.current.rotation.y = Math.sin(elapsed * 0.2) * 0.015;
    }
  });

  return (
    <>
      {/* Dynamic Lighting System */}
      {lightingMode === 'golden' && (
        <>
          <ambientLight intensity={0.85} color="#fff1db" />
          <directionalLight
            position={[12, 16, 8]}
            intensity={2.4}
            color="#fbbf24"
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <directionalLight position={[-8, 10, -8]} intensity={0.6} color="#fdba74" />
        </>
      )}

      {lightingMode === 'noon' && (
        <>
          <ambientLight intensity={0.95} color="#f8fafc" />
          <directionalLight
            position={[8, 22, 10]}
            intensity={2.8}
            color="#ffffff"
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <directionalLight position={[-10, 8, -6]} intensity={0.7} color="#e2e8f0" />
        </>
      )}

      {lightingMode === 'twilight' && (
        <>
          <ambientLight intensity={0.45} color="#1e293b" />
          <directionalLight
            position={[6, 12, 12]}
            intensity={1.2}
            color="#38bdf8"
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <pointLight position={[0, 4, 0]} intensity={2.5} color="#fbbf24" distance={15} />
        </>
      )}

      {/* Luxury Villa Model */}
      <group ref={groupRef}>
        <LuxuryVillaModel
          onHotspotClick={onHotspotSelect}
          activeHotspotId={activeHotspotId}
          explodedFactor={explodedFactor.current}
          wireframe={isWireframe}
        />
      </group>

      {/* Realistic architectural ground contact shadow */}
      <ContactShadows
        position={[0, -0.66, 0]}
        opacity={0.65}
        scale={28}
        blur={1.8}
        far={6}
        resolution={512}
        color="#0f172a"
      />
    </>
  );
};

export const InteractiveHeroCanvas: React.FC<InteractiveHeroCanvasProps> = ({
  lightingMode,
  isExploded,
  isWireframe = false,
  activeHotspotId = null,
  onHotspotSelect,
  className = '',
  enableControls = true,
}) => {
  const mousePos = useRef({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mousePos.current = { x, y };
  };

  const handlePointerLeave = () => {
    mousePos.current = { x: 0, y: 0 };
  };

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      data-cursor={activeHotspotId ? 'Click to Deselect' : 'Drag to Rotate'}
    >
      <Canvas
        camera={{ position: DEFAULT_CAMERA_POS, fov: 38 }}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: true,
        }}
        dpr={[1, 2]}
      >
        <HeroSceneRig
          lightingMode={lightingMode}
          isExploded={isExploded}
          isWireframe={isWireframe}
          activeHotspotId={activeHotspotId}
          onHotspotSelect={onHotspotSelect}
          mousePos={mousePos}
        />

        {enableControls && !activeHotspotId && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2 - 0.05}
            minPolarAngle={Math.PI / 6}
            rotateSpeed={0.65}
            dampingFactor={0.06}
            enableDamping
          />
        )}
      </Canvas>
    </div>
  );
};
