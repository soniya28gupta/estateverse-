import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { PropertyHotspot } from '../types/property';

interface CameraRigProps {
  activeHotspot: PropertyHotspot | null;
  resetSignal: number;
}

export const CameraRig: React.FC<CameraRigProps> = ({ activeHotspot, resetSignal }) => {
  const controlsRef = useRef<any>(null);
  const { camera } = useThree();

  const defaultPosition = [7.5, 4.8, 8.5] as const;
  const defaultTarget = [0, 1.2, 0] as const;

  const targetCameraPos = useRef<THREE.Vector3>(new THREE.Vector3(...defaultPosition));
  const targetLookAt = useRef<THREE.Vector3>(new THREE.Vector3(...defaultTarget));

  // Reset view to default
  useEffect(() => {
    targetCameraPos.current.set(...defaultPosition);
    targetLookAt.current.set(...defaultTarget);
    if (controlsRef.current) {
      controlsRef.current.target.set(...defaultTarget);
    }
  }, [resetSignal]);

  // When a hotspot is chosen, animate focus toward it
  useEffect(() => {
    if (activeHotspot) {
      const [hx, hy, hz] = activeHotspot.position;
      // Focus target is hotspot position
      targetLookAt.current.set(hx, hy, hz);

      // Camera offset relative to hotspot
      targetCameraPos.current.set(hx + 3.2, hy + 2.0, hz + 3.8);
    }
  }, [activeHotspot]);

  // Smooth camera interpolation
  useFrame(() => {
    if (controlsRef.current) {
      camera.position.lerp(targetCameraPos.current, 0.05);
      controlsRef.current.target.lerp(targetLookAt.current, 0.05);
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.08}
      minDistance={4}
      maxDistance={18}
      maxPolarAngle={Math.PI / 2 - 0.05} // prevent going below horizon
      minPolarAngle={Math.PI / 6}
      autoRotate={!activeHotspot}
      autoRotateSpeed={0.65}
      makeDefault
    />
  );
};
