import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface LuxuryVillaModelProps {
  onHotspotClick?: (hotspotId: string) => void;
  activeHotspotId?: string | null;
  explodedFactor?: number;
  wireframe?: boolean;
}

export const LuxuryVillaModel: React.FC<LuxuryVillaModelProps> = ({
  onHotspotClick,
  activeHotspotId,
  explodedFactor = 0,
  wireframe = false,
}) => {
  const waterRef = useRef<THREE.Mesh>(null);
  const foliageRef = useRef<THREE.Group>(null);

  // Subtle ambient animations (water ripple reflection & gentle foliage sway)
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (waterRef.current) {
      const mat = waterRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        mat.roughness = 0.08 + Math.sin(t * 1.5) * 0.03;
      }
    }
    if (foliageRef.current) {
      foliageRef.current.rotation.y = Math.sin(t * 0.4) * 0.025;
    }
  });

  return (
    <group position={[0, -0.6, 0]}>
      {/* ================= EXPANSIVE ARCHITECTURAL GROUNDS ================= */}
      {/* Endless Estate Lawn (Fills the entire visible ground so no empty void) */}
      <mesh position={[0, -0.08, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#2d4520" roughness={0.88} metalness={0.02} />
      </mesh>

      {/* Immediate Manicured Estate Parterre Lawn */}
      <mesh position={[0, -0.04, 0]} receiveShadow>
        <cylinderGeometry args={[18, 18, 0.08, 64]} />
        <meshStandardMaterial color="#3d5c2a" roughness={0.75} metalness={0.04} />
      </mesh>

      {/* Perimeter Architectural Low Garden Wall & Coping */}
      <group position={[0, 0, 0]}>
        {/* Back wall */}
        <mesh position={[0, 0.35, -8.5]} castShadow receiveShadow>
          <boxGeometry args={[26, 0.8, 0.4]} />
          <meshStandardMaterial color="#d4d4d8" roughness={0.6} />
        </mesh>
        {/* West wall */}
        <mesh position={[-12.5, 0.35, -1.0]} castShadow receiveShadow>
          <boxGeometry args={[0.4, 0.8, 15]} />
          <meshStandardMaterial color="#d4d4d8" roughness={0.6} />
        </mesh>
        {/* East wall */}
        <mesh position={[12.5, 0.35, -1.0]} castShadow receiveShadow>
          <boxGeometry args={[0.4, 0.8, 15]} />
          <meshStandardMaterial color="#d4d4d8" roughness={0.6} />
        </mesh>
      </group>

      {/* Modern Light Travertine Stone Main Plinth */}
      <mesh position={[0.2, 0.05, 0.2]} receiveShadow castShadow>
        <boxGeometry args={[13.5, 0.22, 10.5]} />
        <meshStandardMaterial color="#eae8e3" roughness={0.55} metalness={0.08} />
      </mesh>

      {/* Warm Golden Teak Wood Pool Deck */}
      <mesh position={[3.2, 0.12, 1.8]} receiveShadow castShadow>
        <boxGeometry args={[5.8, 0.08, 5.2]} />
        <meshStandardMaterial color="#966036" roughness={0.38} metalness={0.06} />
      </mesh>

      {/* ================= INFINITY REFLECTION POOL ================= */}
      {/* Pool Basin Interior */}
      <mesh position={[3.0, -0.05, 1.8]} receiveShadow>
        <boxGeometry args={[3.8, 0.45, 3.8]} />
        <meshStandardMaterial color="#0369a1" roughness={0.12} metalness={0.25} />
      </mesh>

      {/* Crystalline Water Surface */}
      <mesh
        ref={waterRef}
        position={[3.0, 0.1, 1.8]}
        rotation={[-Math.PI / 2, 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onHotspotClick?.('hs-pool');
        }}
      >
        <planeGeometry args={[3.75, 3.75]} />
        <meshStandardMaterial
          color="#38bdf8"
          roughness={0.05}
          metalness={0.6}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* Pool Underwater Ambient Glow */}
      <pointLight position={[3.0, 0.08, 1.8]} color="#38bdf8" intensity={1.8} distance={5} />

      {/* Minimalist Sun Loungers on Pool Deck */}
      <group position={[4.8, 0.22, 1.0]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.6, 0.08, 0.6]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.4} />
        </mesh>
        <mesh position={[0.6, 0.16, 0]} rotation={[0, 0, 0.38]} castShadow>
          <boxGeometry args={[0.55, 0.08, 0.6]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.4} />
        </mesh>
      </group>

      <group position={[4.8, 0.22, 2.2]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.6, 0.08, 0.6]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.4} />
        </mesh>
        <mesh position={[0.6, 0.16, 0]} rotation={[0, 0, 0.38]} castShadow>
          <boxGeometry args={[0.55, 0.08, 0.6]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.4} />
        </mesh>
      </group>

      {/* ================= OUTDOOR LOUNGE SUITE ================= */}
      {/* Sunken Lounge Deck Corner with Low Modern Seating */}
      <group
        position={[4.2, 0.14, 3.6]}
        onClick={(e) => {
          e.stopPropagation();
          onHotspotClick?.('hs-lounge');
        }}
      >
        {/* L-Shaped Low Minimalist Sofa */}
        <mesh position={[0, 0.18, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.0, 0.3, 0.7]} />
          <meshStandardMaterial color="#334155" roughness={0.6} />
        </mesh>
        <mesh position={[-0.8, 0.18, -0.6]} castShadow receiveShadow>
          <boxGeometry args={[0.7, 0.3, 1.2]} />
          <meshStandardMaterial color="#334155" roughness={0.6} />
        </mesh>
        {/* Soft Linen Cushion Seats */}
        <mesh position={[0, 0.35, 0]} castShadow>
          <boxGeometry args={[1.9, 0.1, 0.65]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.7} />
        </mesh>
        <mesh position={[-0.8, 0.35, -0.6]} castShadow>
          <boxGeometry args={[0.65, 0.1, 1.1]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.7} />
        </mesh>
        {/* Low Travertine Coffee Table */}
        <mesh position={[0.2, 0.15, -0.6]} castShadow receiveShadow>
          <boxGeometry args={[0.8, 0.18, 0.6]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.4} />
        </mesh>
        {/* Evening Lantern Accent */}
        <mesh position={[0.2, 0.3, -0.6]} castShadow>
          <boxGeometry args={[0.12, 0.2, 0.12]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} />
        </mesh>
        <pointLight position={[0.2, 0.35, -0.6]} color="#ffb74d" intensity={0.9} distance={2.5} />
      </group>

      {/* ================= GROUND FLOOR MAIN RESIDENCE ================= */}
      {/* Primary Structure - Smooth White Stucco & Architectural Carbon Accents */}
      <mesh position={[-1.2, 1.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[6.2, 2.0, 5.4]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.45} metalness={0.04} />
      </mesh>

      {/* Double Height Living Room Pavilion Glass Facade */}
      <mesh
        position={[0.3, 1.15, 1.8]}
        castShadow
        onClick={(e) => {
          e.stopPropagation();
          onHotspotClick?.('hs-living');
        }}
      >
        <boxGeometry args={[3.4, 1.95, 0.1]} />
        <meshStandardMaterial
          color="#a5f3fc"
          roughness={0.04}
          metalness={0.85}
          transparent
          opacity={0.36}
        />
      </mesh>

      {/* Living Room Interior Warm Lighting */}
      <pointLight position={[0.3, 1.3, 0.8]} color="#ffb74d" intensity={2.2} distance={6} />

      {/* Internal Furniture silhouette (Modern Sofa & Marble Table) */}
      <mesh position={[0.3, 0.38, 0.8]} castShadow>
        <boxGeometry args={[2.2, 0.35, 1.0]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.7} />
      </mesh>
      <mesh position={[0.3, 0.5, 0.3]} castShadow>
        <boxGeometry args={[2.2, 0.55, 0.25]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.7} />
      </mesh>
      <mesh position={[0.3, 0.32, 1.4]} castShadow>
        <boxGeometry args={[1.3, 0.2, 0.55]} />
        <meshStandardMaterial color="#334155" roughness={0.3} metalness={0.4} />
      </mesh>

      {/* ================= FIRST FLOOR CANTILEVERED BLOCK ================= */}
      <group position={[0, explodedFactor * 1.6, 0]}>
        {/* Master Bedroom Pavilion Overhang */}
        <mesh
          position={[-0.4, 2.75, 0.3]}
          castShadow
          receiveShadow
          onClick={(e) => {
            e.stopPropagation();
            onHotspotClick?.('hs-master');
          }}
        >
          <boxGeometry args={[5.4, 1.65, 4.6]} />
          <meshStandardMaterial color="#ffffff" roughness={0.35} metalness={0.04} wireframe={wireframe} />
        </mesh>

        {/* Timber Accent Louver Wall on West Facade */}
        <mesh position={[-3.15, 2.75, 0.3]} castShadow>
          <boxGeometry args={[0.1, 1.55, 4.0]} />
          <meshStandardMaterial color="#78350f" roughness={0.5} wireframe={wireframe} />
        </mesh>

        {/* Master Bedroom Floor-to-Ceiling Glazing */}
        <mesh position={[-0.4, 2.75, 2.58]} castShadow>
          <boxGeometry args={[4.4, 1.45, 0.08]} />
          <meshStandardMaterial
            color="#93c5fd"
            roughness={0.06}
            metalness={0.8}
            transparent
            opacity={0.38}
            wireframe={wireframe}
          />
        </mesh>
        <pointLight position={[-0.4, 2.85, 1.2]} color="#ffd54f" intensity={1.8} distance={4.5} />

        {/* Master Balcony Glass Railing */}
        <mesh position={[-0.4, 2.2, 2.85]} castShadow>
          <boxGeometry args={[4.8, 0.55, 0.05]} />
          <meshStandardMaterial color="#ffffff" roughness={0.04} metalness={0.9} transparent opacity={0.32} wireframe={wireframe} />
        </mesh>
      </group>

      {/* ================= ROOFTOP SKY TERRACE ================= */}
      <group position={[0, explodedFactor * 3.2, 0]}>
        {/* Rooftop Slab */}
        <mesh position={[0.2, 3.65, -0.2]} castShadow receiveShadow>
          <boxGeometry args={[6.0, 0.18, 5.2]} />
          <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.25} wireframe={wireframe} />
        </mesh>

        {/* Modern Bronze Pergola Slats */}
        {[-1.6, -0.9, -0.2, 0.5, 1.2, 1.9, 2.6].map((x, idx) => (
          <mesh key={idx} position={[x, 4.25, 0.5]} castShadow>
            <boxGeometry args={[0.08, 0.12, 3.4]} />
            <meshStandardMaterial color="#3b1d08" roughness={0.5} metalness={0.4} wireframe={wireframe} />
          </mesh>
        ))}

        {/* Terrace Glass Railing */}
        <mesh position={[0.2, 3.95, 2.35]}>
          <boxGeometry args={[5.8, 0.5, 0.04]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.3} wireframe={wireframe} />
        </mesh>
        <pointLight position={[1.2, 3.85, -0.8]} color="#ffb74d" intensity={1.3} distance={3.5} />
      </group>

      {/* ================= LANDSCAPE, TREES & COURTYARD ================= */}
      {/* Specimen Japanese Pine / Zen Courtyard */}
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
          <cylinderGeometry args={[0.14, 0.24, 2.2, 8]} />
          <meshStandardMaterial color="#3b1d08" roughness={0.8} />
        </mesh>

        {/* Lush Foliage Clusters */}
        <mesh position={[0, 2.2, 0]} castShadow>
          <dodecahedronGeometry args={[1.0, 1]} />
          <meshStandardMaterial color="#365314" roughness={0.7} />
        </mesh>
        <mesh position={[0.5, 1.8, 0.3]} castShadow>
          <dodecahedronGeometry args={[0.75, 1]} />
          <meshStandardMaterial color="#4d7c0f" roughness={0.7} />
        </mesh>
        <mesh position={[-0.4, 2.5, -0.2]} castShadow>
          <dodecahedronGeometry args={[0.7, 1]} />
          <meshStandardMaterial color="#3f6212" roughness={0.7} />
        </mesh>

        {/* Travertine Planter Curb */}
        <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.4, 1.5, 0.22, 24]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.6} />
        </mesh>
      </group>

      {/* Background Architectural Cypress Trees */}
      <group position={[-5.2, 0, -3.8]}>
        <mesh position={[0, 2.0, 0]} castShadow>
          <coneGeometry args={[0.65, 4.0, 8]} />
          <meshStandardMaterial color="#2d4a22" roughness={0.8} />
        </mesh>
        <mesh position={[1.5, 1.6, 0.2]} castShadow>
          <coneGeometry args={[0.55, 3.2, 8]} />
          <meshStandardMaterial color="#345427" roughness={0.8} />
        </mesh>
        <mesh position={[3.0, 2.2, -0.2]} castShadow>
          <coneGeometry args={[0.7, 4.4, 8]} />
          <meshStandardMaterial color="#2d4a22" roughness={0.8} />
        </mesh>
        <mesh position={[4.5, 1.8, 0]} castShadow>
          <coneGeometry args={[0.6, 3.6, 8]} />
          <meshStandardMaterial color="#345427" roughness={0.8} />
        </mesh>
        <mesh position={[6.0, 2.4, -0.3]} castShadow>
          <coneGeometry args={[0.75, 4.8, 8]} />
          <meshStandardMaterial color="#2d4a22" roughness={0.8} />
        </mesh>
      </group>

      {/* East Side Lush Perimeter Trees */}
      <group position={[7.5, 0, -2.5]}>
        <mesh position={[0, 2.0, 0]} castShadow>
          <coneGeometry args={[0.7, 4.0, 8]} />
          <meshStandardMaterial color="#2d4a22" roughness={0.8} />
        </mesh>
        <mesh position={[1.4, 1.7, 0.5]} castShadow>
          <coneGeometry args={[0.6, 3.4, 8]} />
          <meshStandardMaterial color="#345427" roughness={0.8} />
        </mesh>
      </group>

      {/* Driveway Entrance & Stepping Stones */}
      {[-2.0, -1.2, -0.4, 0.4, 1.2].map((z, idx) => (
        <mesh key={idx} position={[-2.4, 0.12, 3.8 + z * 0.7]} receiveShadow castShadow>
          <boxGeometry args={[1.3, 0.05, 0.52]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.65} />
        </mesh>
      ))}

      {/* Exterior Warm Architectural Bollard Lights */}
      {[-3.0, -1.6, 0.6, 2.4, 4.5].map((x, idx) => (
        <group key={idx} position={[x, 0.25, 4.5]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.04, 0.04, 0.4, 8]} />
            <meshStandardMaterial color="#334155" metalness={0.7} />
          </mesh>
          <pointLight position={[0, 0.22, 0]} color="#f59e0b" intensity={0.7} distance={2.0} />
        </group>
      ))}
    </group>
  );
};
