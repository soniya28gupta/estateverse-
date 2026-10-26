import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface LuxuryVillaModelProps {
  onHotspotClick?: (hotspotId: string) => void;
  activeHotspotId?: string | null;
}

export const LuxuryVillaModel: React.FC<LuxuryVillaModelProps> = ({
  onHotspotClick,
  activeHotspotId
}) => {
  const waterRef = useRef<THREE.Mesh>(null);
  const foliageRef = useRef<THREE.Group>(null);

  // Subtle ambient animations (water ripple reflection & gentle foliage sway)
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (waterRef.current) {
      // gentle pulsing of pool water surface
      const mat = waterRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        mat.roughness = 0.12 + Math.sin(t * 1.5) * 0.04;
      }
    }
    if (foliageRef.current) {
      foliageRef.current.rotation.y = Math.sin(t * 0.4) * 0.03;
    }
  });

  return (
    <group position={[0, -0.6, 0]}>
      {/* ================= FOUNDATION & SITE GROUND ================= */}
      {/* Site Ground / Lawn */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <cylinderGeometry args={[14, 14, 0.1, 48]} />
        <meshStandardMaterial color="#1a2318" roughness={0.9} metalness={0.05} />
      </mesh>

      {/* Modern Stone Paved Platform (Plinth) */}
      <mesh position={[0.2, 0.05, 0.2]} receiveShadow castShadow>
        <boxGeometry args={[10.5, 0.2, 8.5]} />
        <meshStandardMaterial color="#262d35" roughness={0.7} metalness={0.15} />
      </mesh>

      {/* Teak Wood Pool Deck */}
      <mesh position={[2.6, 0.12, 1.8]} receiveShadow castShadow>
        <boxGeometry args={[4.2, 0.08, 4.2]} />
        <meshStandardMaterial color="#7a5230" roughness={0.45} metalness={0.1} />
      </mesh>

      {/* ================= INFINITY REFLECTION POOL ================= */}
      {/* Pool Basin Interior */}
      <mesh position={[2.8, -0.05, 1.8]} receiveShadow>
        <boxGeometry args={[3.2, 0.4, 3.2]} />
        <meshStandardMaterial color="#0c3547" roughness={0.2} metalness={0.3} />
      </mesh>

      {/* Water Surface */}
      <mesh
        ref={waterRef}
        position={[2.8, 0.1, 1.8]}
        rotation={[-Math.PI / 2, 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onHotspotClick?.('hs-pool');
        }}
      >
        <planeGeometry args={[3.15, 3.15]} />
        <meshStandardMaterial
          color="#199bb6"
          roughness={0.1}
          metalness={0.4}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* Pool Underwater Glow */}
      <pointLight position={[2.8, 0.05, 1.8]} color="#00e5ff" intensity={1.8} distance={4} />

      {/* Minimalist Sun Loungers */}
      <group position={[4.1, 0.22, 1.2]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.5, 0.08, 0.55]} />
          <meshStandardMaterial color="#dfd8cb" roughness={0.6} />
        </mesh>
        <mesh position={[0.55, 0.15, 0]} rotation={[0, 0, 0.4]} castShadow>
          <boxGeometry args={[0.5, 0.08, 0.55]} />
          <meshStandardMaterial color="#dfd8cb" roughness={0.6} />
        </mesh>
      </group>

      <group position={[4.1, 0.22, 2.2]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.5, 0.08, 0.55]} />
          <meshStandardMaterial color="#dfd8cb" roughness={0.6} />
        </mesh>
        <mesh position={[0.55, 0.15, 0]} rotation={[0, 0, 0.4]} castShadow>
          <boxGeometry args={[0.5, 0.08, 0.55]} />
          <meshStandardMaterial color="#dfd8cb" roughness={0.6} />
        </mesh>
      </group>

      {/* ================= GROUND FLOOR MAIN RESIDENCE ================= */}
      {/* Primary Structure - Basalt Dark Concrete */}
      <mesh position={[-1.2, 1.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[5.8, 1.9, 5.2]} />
        <meshStandardMaterial color="#222b35" roughness={0.6} metalness={0.2} />
      </mesh>

      {/* Double Height Living Room Pavilion Glass Facade */}
      <mesh
        position={[0.2, 1.1, 1.8]}
        castShadow
        onClick={(e) => {
          e.stopPropagation();
          onHotspotClick?.('hs-living');
        }}
      >
        <boxGeometry args={[3.2, 1.85, 0.1]} />
        <meshStandardMaterial
          color="#b0e0e6"
          roughness={0.05}
          metalness={0.9}
          transparent
          opacity={0.42}
        />
      </mesh>

      {/* Living Room Interior Warm Lighting */}
      <pointLight position={[0.2, 1.2, 0.8]} color="#ffb74d" intensity={2.2} distance={5} />

      {/* Internal Furniture silhouette (Sofa & Table) */}
      <mesh position={[0.2, 0.35, 0.8]} castShadow>
        <boxGeometry args={[2.0, 0.35, 1.0]} />
        <meshStandardMaterial color="#d4c5b9" roughness={0.8} />
      </mesh>
      <mesh position={[0.2, 0.45, 0.3]} castShadow>
        <boxGeometry args={[2.0, 0.55, 0.25]} />
        <meshStandardMaterial color="#d4c5b9" roughness={0.8} />
      </mesh>
      <mesh position={[0.2, 0.3, 1.4]} castShadow>
        <boxGeometry args={[1.2, 0.2, 0.5]} />
        <meshStandardMaterial color="#1f1812" roughness={0.4} />
      </mesh>

      {/* ================= FIRST FLOOR CANTILEVERED BLOCK ================= */}
      {/* Master Bedroom Pavilion Overhang */}
      <mesh
        position={[-0.4, 2.7, 0.3]}
        castShadow
        receiveShadow
        onClick={(e) => {
          e.stopPropagation();
          onHotspotClick?.('hs-master');
        }}
      >
        <boxGeometry args={[5.2, 1.6, 4.4]} />
        <meshStandardMaterial color="#d9d5cc" roughness={0.5} metalness={0.1} />
      </mesh>

      {/* Timber Accent Louver Wall on West Facade */}
      <mesh position={[-3.05, 2.7, 0.3]} castShadow>
        <boxGeometry args={[0.1, 1.5, 3.8]} />
        <meshStandardMaterial color="#8b5a2b" roughness={0.6} />
      </mesh>

      {/* Master Bedroom Floor-to-Ceiling Glazing */}
      <mesh position={[-0.4, 2.7, 2.52]} castShadow>
        <boxGeometry args={[4.2, 1.4, 0.08]} />
        <meshStandardMaterial
          color="#c8e6c9"
          roughness={0.1}
          metalness={0.85}
          transparent
          opacity={0.45}
        />
      </mesh>
      <pointLight position={[-0.4, 2.8, 1.2]} color="#ffd54f" intensity={1.8} distance={4} />

      {/* Master Balcony Glass Railing */}
      <mesh position={[-0.4, 2.15, 2.8]} castShadow>
        <boxGeometry args={[4.6, 0.55, 0.05]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.9} transparent opacity={0.35} />
      </mesh>

      {/* ================= ROOFTOP SKY TERRACE ================= */}
      {/* Rooftop Slab & Architectural Pergola */}
      <mesh
        position={[0.2, 3.6, -0.2]}
        castShadow
        receiveShadow
        onClick={(e) => {
          e.stopPropagation();
          onHotspotClick?.('hs-terrace');
        }}
      >
        <boxGeometry args={[5.8, 0.18, 5.0]} />
        <meshStandardMaterial color="#1c242c" roughness={0.4} metalness={0.3} />
      </mesh>

      {/* Modern Steel/Wood Pergola Slats */}
      {[-1.5, -0.8, -0.1, 0.6, 1.3, 2.0].map((x, idx) => (
        <mesh key={idx} position={[x, 4.2, 0.5]} castShadow>
          <boxGeometry args={[0.08, 0.12, 3.2]} />
          <meshStandardMaterial color="#3e2723" roughness={0.5} />
        </mesh>
      ))}

      {/* Terrace Railing */}
      <mesh position={[0.2, 3.9, 2.25]}>
        <boxGeometry args={[5.6, 0.5, 0.04]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.35} />
      </mesh>

      {/* Terrace Lantern Light */}
      <pointLight position={[1.2, 3.8, -0.8]} color="#ffb74d" intensity={1.2} distance={3} />

      {/* ================= LANDSCAPE, TREES & COURTYARD ================= */}
      {/* Specimen Japanese Pine / Frangipani Tree */}
      <group
        ref={foliageRef}
        position={[-3.6, 0.1, 2.2]}
        onClick={(e) => {
          e.stopPropagation();
          onHotspotClick?.('hs-garden');
        }}
      >
        {/* Sculptural Trunk */}
        <mesh position={[0, 1.1, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.22, 2.2, 8]} />
          <meshStandardMaterial color="#423023" roughness={0.8} />
        </mesh>

        {/* Foliage Clusters */}
        <mesh position={[0, 2.2, 0]} castShadow>
          <dodecahedronGeometry args={[0.95, 1]} />
          <meshStandardMaterial color="#3b5e32" roughness={0.7} />
        </mesh>
        <mesh position={[0.45, 1.8, 0.3]} castShadow>
          <dodecahedronGeometry args={[0.7, 1]} />
          <meshStandardMaterial color="#4a703f" roughness={0.7} />
        </mesh>
        <mesh position={[-0.4, 2.5, -0.2]} castShadow>
          <dodecahedronGeometry args={[0.65, 1]} />
          <meshStandardMaterial color="#324f2b" roughness={0.7} />
        </mesh>

        {/* Planter Curb */}
        <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.3, 1.4, 0.2, 24]} />
          <meshStandardMaterial color="#303840" roughness={0.6} />
        </mesh>
      </group>

      {/* Background Architectural Cypress Trees */}
      <group position={[-4.5, 0, -3.2]}>
        <mesh position={[0, 1.8, 0]} castShadow>
          <coneGeometry args={[0.6, 3.6, 8]} />
          <meshStandardMaterial color="#2d4229" roughness={0.8} />
        </mesh>
        <mesh position={[1.4, 1.5, 0]} castShadow>
          <coneGeometry args={[0.55, 3.0, 8]} />
          <meshStandardMaterial color="#344d30" roughness={0.8} />
        </mesh>
        <mesh position={[2.8, 2.0, 0]} castShadow>
          <coneGeometry args={[0.65, 4.0, 8]} />
          <meshStandardMaterial color="#2d4229" roughness={0.8} />
        </mesh>
      </group>

      {/* Driveway Entrance & Stepping Stones */}
      {[-2.0, -1.2, -0.4, 0.4].map((z, idx) => (
        <mesh key={idx} position={[-2.4, 0.12, 3.6 + z * 0.7]} receiveShadow castShadow>
          <boxGeometry args={[1.2, 0.05, 0.5]} />
          <meshStandardMaterial color="#4a525d" roughness={0.8} />
        </mesh>
      ))}

      {/* Exterior Warm Bollard Lights */}
      {[-2.8, -1.8, 0.5, 2.2].map((x, idx) => (
        <group key={idx} position={[x, 0.25, 4.2]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.04, 0.04, 0.4, 8]} />
            <meshStandardMaterial color="#1a2026" metalness={0.8} />
          </mesh>
          <pointLight position={[0, 0.22, 0]} color="#ffb74d" intensity={0.6} distance={1.8} />
        </group>
      ))}
    </group>
  );
};
