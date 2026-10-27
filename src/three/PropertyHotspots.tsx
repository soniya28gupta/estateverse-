import React, { useRef, useState } from 'react';
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
  onSelectHotspot,
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
  const [isHovered, setIsHovered] = useState(false);

  useFrame(({ clock }) => {
    if (ringRef.current) {
      const scale = 1 + Math.sin(clock.getElapsedTime() * 2.5) * 0.2;
      ringRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group position={hotspot.position}>
      {/* 3D Visual Beacon */}
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setIsHovered(true);
        }}
        onPointerOut={() => setIsHovered(false)}
      >
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color={isActive ? '#B79A68' : '#FFFFFF'}
          emissive={isActive ? '#B79A68' : '#D4AF37'}
          emissiveIntensity={isActive ? 1.2 : 0.8}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Subtle Pulsing Beacon Ring */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.12, 0.16, 24]} />
        <meshBasicMaterial
          color={isActive ? '#B79A68' : '#FFFFFF'}
          transparent
          opacity={isActive ? 0.75 : 0.35}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Compact, Elegant Floating Label (No Giant Banners) */}
      <Html
        position={[0, 0.22, 0]}
        center
        zIndexRange={[40, 0]}
      >
        <div
          className="relative flex flex-col items-center pointer-events-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Minimal Luxury Interactive Pin Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            className={`transition-all duration-200 flex items-center gap-1.5 shadow-lg backdrop-blur-md rounded-full cursor-pointer ${
              isActive
                ? 'px-3 py-1 bg-[#17191C] text-white border border-[#B79A68] scale-105'
                : isHovered
                ? 'px-2.5 py-1 bg-white/95 text-[#17191C] border border-[#E7E9ED]'
                : 'w-6 h-6 justify-center bg-white/90 text-[#17191C] border border-white/80 hover:scale-110'
            }`}
            title={`Inspect ${hotspot.name}`}
            aria-label={`Inspect ${hotspot.name}`}
          >
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${
                isActive
                  ? 'bg-[#B79A68] animate-ping'
                  : 'bg-[#B79A68]'
              }`}
            />

            {/* Label only shows when active or on brief hover — never cluttering the scene with 5 giant banners! */}
            {(isActive || isHovered) && (
              <span
                className="text-[11px] font-sans font-semibold tracking-wide whitespace-nowrap leading-none pr-0.5"
                style={{ color: isActive ? '#ffffff' : '#17191C' }}
              >
                {hotspot.name}
              </span>
            )}
          </button>
        </div>
      </Html>
    </group>
  );
};
