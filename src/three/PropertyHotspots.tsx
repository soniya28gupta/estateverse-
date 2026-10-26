import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { PropertyHotspot } from '../types/property';

interface PropertyHotspotsProps {
  hotspots: PropertyHotspot[];
  activeHotspotId: string | null;
  onSelectHotspot: (hotspot: PropertyHotspot) => void;
}

export const PropertyHotspots: React.FC<PropertyHotspotsProps> = ({
  hotspots,
  activeHotspotId,
  onSelectHotspot
}) => {
  return (
    <group>
      {hotspots.map((hotspot) => {
        const isActive = activeHotspotId === hotspot.id;
        return (
          <HotspotMarker
            key={hotspot.id}
            hotspot={hotspot}
            isActive={isActive}
            onSelect={() => onSelectHotspot(hotspot)}
          />
        );
      })}
    </group>
  );
};

const HotspotMarker: React.FC<{
  hotspot: PropertyHotspot;
  isActive: boolean;
  onSelect: () => void;
}> = ({ hotspot, isActive, onSelect }) => {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ringRef.current) {
      const scale = 1 + Math.sin(clock.getElapsedTime() * 3) * 0.25;
      ringRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group position={hotspot.position}>
      {/* 3D Glowing Sphere & Pulsing Ring */}
      <mesh onClick={(e) => { e.stopPropagation(); onSelect(); }}>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshStandardMaterial
          color={isActive ? '#C6A76B' : '#ffffff'}
          emissive={isActive ? '#C6A76B' : '#d4af37'}
          emissiveIntensity={isActive ? 1.4 : 0.8}
          roughness={0.2}
        />
      </mesh>

      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.2, 0.28, 32]} />
        <meshBasicMaterial
          color={isActive ? '#C6A76B' : '#ffffff'}
          transparent
          opacity={isActive ? 0.8 : 0.45}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Interactive HTML Tag */}
      <Html
        position={[0, 0.35, 0]}
        center
        distanceFactor={10}
        zIndexRange={[100, 0]}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          className={`group flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-300 shadow-xl ${
            isActive
              ? 'bg-gold-400 text-midnight-950 ring-2 ring-gold-200 scale-110 font-semibold'
              : 'bg-midnight-900/90 hover:bg-midnight-800 text-stone-200 hover:text-gold-300 border border-gold-400/30 backdrop-blur-md'
          }`}
          title={`Inspect ${hotspot.name}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-midnight-950 animate-ping' : 'bg-gold-400'}`} />
          {hotspot.name}
        </button>
      </Html>
    </group>
  );
};
