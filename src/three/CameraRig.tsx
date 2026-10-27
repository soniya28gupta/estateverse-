import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { PropertyHotspot } from '../types/property';

interface CameraRigProps {
  activeHotspot: PropertyHotspot | null;
  resetSignal: number;
  zoomInSignal?: number;
  zoomOutSignal?: number;
}

export const CameraRig: React.FC<CameraRigProps> = ({
  activeHotspot,
  resetSignal,
  zoomInSignal = 0,
  zoomOutSignal = 0,
}) => {
  const controlsRef = useRef<any>(null);
  // Optimal architectural framing default:
  // Shows the entire modern villa, pool, deck, and landscaped garden centered in the frame
  const defaultPosition = [7.2, 3.2, 9.6] as const;
  const defaultTarget = [0.6, 1.1, 0.6] as const;

  // Responsive camera framing: On mobile screens (aspect < 1), zoom out slightly so the villa is not clipped
  const { camera, size } = useThree();
  const aspect = size.width / Math.max(size.height, 1);
  const mobileDistanceMultiplier = aspect < 0.8 ? 1.4 : aspect < 1.1 ? 1.2 : 1.0;

  const targetCameraPos = useRef<THREE.Vector3>(
    new THREE.Vector3(
      defaultPosition[0] * mobileDistanceMultiplier,
      defaultPosition[1] * (aspect < 1 ? 1.15 : 1.0),
      defaultPosition[2] * mobileDistanceMultiplier
    )
  );
  const targetLookAt = useRef<THREE.Vector3>(new THREE.Vector3(...defaultTarget));
  const isTransitioning = useRef<boolean>(false);
  const transitionStart = useRef<number>(0);

  // Reset view to default framing with responsive distance
  useEffect(() => {
    targetCameraPos.current.set(
      defaultPosition[0] * mobileDistanceMultiplier,
      defaultPosition[1] * (aspect < 1 ? 1.15 : 1.0),
      defaultPosition[2] * mobileDistanceMultiplier
    );
    targetLookAt.current.set(...defaultTarget);
    isTransitioning.current = true;
    transitionStart.current = performance.now();
  }, [resetSignal, mobileDistanceMultiplier, aspect]);

  // When a hotspot is chosen, animate focus toward it
  useEffect(() => {
    if (activeHotspot) {
      const [hx, hy, hz] = activeHotspot.position;
      targetLookAt.current.set(hx, hy, hz);
      // Framing offset relative to hotspot
      targetCameraPos.current.set(hx + 3.4, hy + 1.8, hz + 3.6);
      isTransitioning.current = true;
      transitionStart.current = performance.now();
    }
  }, [activeHotspot]);

  // Handle external zoom buttons
  useEffect(() => {
    if (zoomInSignal > 0 && controlsRef.current) {
      const dir = new THREE.Vector3();
      camera.getWorldDirection(dir);
      camera.position.addScaledVector(dir, 1.2);
      controlsRef.current.update();
    }
  }, [zoomInSignal]);

  useEffect(() => {
    if (zoomOutSignal > 0 && controlsRef.current) {
      const dir = new THREE.Vector3();
      camera.getWorldDirection(dir);
      camera.position.addScaledVector(dir, -1.2);
      controlsRef.current.update();
    }
  }, [zoomOutSignal]);

  // Smooth camera interpolation only during active transition
  useFrame(() => {
    if (controlsRef.current && isTransitioning.current) {
      camera.position.lerp(targetCameraPos.current, 0.055);
      controlsRef.current.target.lerp(targetLookAt.current, 0.055);
      controlsRef.current.update();

      // End transition once close or after 1.8s
      const elapsed = performance.now() - transitionStart.current;
      if (
        elapsed > 1800 ||
        (camera.position.distanceTo(targetCameraPos.current) < 0.08 &&
          controlsRef.current.target.distanceTo(targetLookAt.current) < 0.08)
      ) {
        isTransitioning.current = false;
      }
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.06}
      minDistance={3.5}
      maxDistance={22}
      maxPolarAngle={Math.PI / 2 - 0.05} // prevent going below lawn horizon
      minPolarAngle={Math.PI / 8}
      autoRotate={!activeHotspot && !isTransitioning.current}
      autoRotateSpeed={0.4}
      makeDefault
    />
  );
};
