import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { LuxuryVillaModel } from '../../three/LuxuryVillaModel';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useWebGLSupport } from '../../hooks/useWebGLSupport';
import { Sparkles, Layers, ArrowRight, Compass, ShieldCheck, Box } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 3D Canvas Rig driven by ScrollTrigger progress
interface StoryRigProps {
  progressRef: React.MutableRefObject<number>;
  explodedRef: React.MutableRefObject<number>;
}

const StoryRig: React.FC<StoryRigProps> = ({ progressRef, explodedRef }) => {
  const { camera } = useThree();
  const currentPos = useRef(new THREE.Vector3(14, 8, 14));
  const currentLook = useRef(new THREE.Vector3(0, 1.2, 0));

  useFrame(() => {
    const p = progressRef.current; // 0 to 1 across the 4 storytelling phases

    // Camera waypoint interpolation along scroll path
    let targetX = 14;
    let targetY = 8;
    let targetZ = 14;
    let lookX = 0;
    let lookY = 1.2;
    let lookZ = 0;

    if (p < 0.25) {
      // Scene 1: Discover -> Approaching front facade
      const t = p / 0.25;
      targetX = THREE.MathUtils.lerp(14, 10, t);
      targetY = THREE.MathUtils.lerp(8, 5, t);
      targetZ = THREE.MathUtils.lerp(14, 11, t);
    } else if (p < 0.5) {
      // Scene 2: Architectural Exploration -> Orbiting around pool and glass facade
      const t = (p - 0.25) / 0.25;
      targetX = THREE.MathUtils.lerp(10, 6, t);
      targetY = THREE.MathUtils.lerp(5, 3.2, t);
      targetZ = THREE.MathUtils.lerp(11, 7, t);
      lookX = 1.5;
      lookY = 1.0;
      lookZ = 1.2;
    } else if (p < 0.75) {
      // Scene 3: Master Cantilever & Sky Terrace
      const t = (p - 0.5) / 0.25;
      targetX = THREE.MathUtils.lerp(6, 4, t);
      targetY = THREE.MathUtils.lerp(3.2, 5.5, t);
      targetZ = THREE.MathUtils.lerp(7, 8, t);
      lookX = -0.4;
      lookY = 2.8;
      lookZ = 1.2;
    } else {
      // Scene 4: Exploded View Overview
      const t = (p - 0.75) / 0.25;
      targetX = THREE.MathUtils.lerp(4, 13, t);
      targetY = THREE.MathUtils.lerp(5.5, 9, t);
      targetZ = THREE.MathUtils.lerp(8, 12, t);
      lookX = 0;
      lookY = 2.0;
      lookZ = 0;
    }

    // Smooth lerp to avoid abrupt jumps
    currentPos.current.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.08);
    currentLook.current.lerp(new THREE.Vector3(lookX, lookY, lookZ), 0.08);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentLook.current);
  });

  return (
    <>
      <ambientLight intensity={0.8} color="#fff7ed" />
      <directionalLight
        position={[10, 15, 8]}
        intensity={2.2}
        color="#fbbf24"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-8, 8, -6]} intensity={0.5} color="#fdba74" />

      <LuxuryVillaModel explodedFactor={explodedRef.current} />

      <ContactShadows
        position={[0, -0.66, 0]}
        opacity={0.6}
        scale={28}
        blur={1.6}
        far={6}
        resolution={512}
        color="#171717"
      />
    </>
  );
};

export const ScrollStorytelling: React.FC<{ onExploreClick: () => void }> = ({ onExploreClick }) => {
  const isWebGL = useWebGLSupport();
  const reducedMotion = useReducedMotion();

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const explodedRef = useRef(0);
  const [currentScene, setCurrentScene] = useState(0);

  useEffect(() => {
    if (reducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Pin the 3D scene while scrolling through the story steps
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=2400',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            progressRef.current = self.progress;

            // Exploded view smoothly ramps up in Phase 4 (progress > 0.7)
            if (self.progress > 0.68) {
              explodedRef.current = Math.min(1, (self.progress - 0.68) / 0.28);
            } else {
              explodedRef.current = 0;
            }

            // Track active scene index for UI highlights
            if (self.progress < 0.25) setCurrentScene(0);
            else if (self.progress < 0.5) setCurrentScene(1);
            else if (self.progress < 0.75) setCurrentScene(2);
            else setCurrentScene(3);
          },
        },
      });

      // Animate editorial panels
      tl.to('.story-card-0', { opacity: 0, y: -20, duration: 0.15 }, 0.2)
        .fromTo('.story-card-1', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.15 }, 0.25)
        .to('.story-card-1', { opacity: 0, y: -20, duration: 0.15 }, 0.45)
        .fromTo('.story-card-2', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.15 }, 0.5)
        .to('.story-card-2', { opacity: 0, y: -20, duration: 0.15 }, 0.7)
        .fromTo('.story-card-3', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.15 }, 0.75);
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const STORY_SCENES = [
    {
      step: '01 / DISCOVER',
      title: 'Architectural Presence & Equilibrium',
      subtitle: 'Where Landscape Meets Cantilevered Precision',
      desc: 'Engineered with floating glass pavilions, monolithic travertine stone, and natural reflection pools. Every angle is oriented to capture natural daylight cycles.',
      tag: 'Spatial Geometry',
    },
    {
      step: '02 / EXTERIOR & LIFESTYLE',
      title: 'Zero-Edge Reflection & Sunken Deck',
      subtitle: 'Seamless Transition From Living to Water',
      desc: 'Precision-cut matte volcanic tiles mirror sky and architecture. Built-in hydraulic circulation and underwater LED accents establish a tranquil evening ambiance.',
      tag: 'Tactile Waterways',
    },
    {
      step: '03 / ELEVATED SUITES',
      title: 'Cantilevered Master Overhang',
      subtitle: 'Frameless Glazing & Acoustic Comfort',
      desc: 'Floating 4.5 meters outward with zero visible ground support columns. Triple-laminated acoustic glass attenuates external sound while delivering panoramic vistas.',
      tag: 'Structural Engineering',
    },
    {
      step: '04 / EXPLODED ARCHITECTURE',
      title: 'Multi-Level Structural Anatomy',
      subtitle: 'Interactive Layer Decomposition',
      desc: 'Observe how the foundation plinth, double-height living pavilion, cantilevered master wing, and bronze rooftop pergola interlock seamlessly.',
      tag: 'Exploded View Active',
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#FBFBFA] border-y border-[#EAE7E0] overflow-hidden"
      aria-label="Cinematic 3D Scroll Storytelling"
    >
      {/* Background Architectural Watermark */}
      <div className="absolute top-8 left-8 text-[120px] font-serif font-black text-[#171717]/[0.025] select-none pointer-events-none tracking-tighter">
        ESTATEVERSE
      </div>

      {/* Main Container */}
      <div className="relative w-full h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        {/* Left / Overlay Editorial Cards */}
        <div className="relative z-20 w-full max-w-lg">
          {/* Progress Indicator */}
          <div className="flex items-center gap-2 mb-6">
            {STORY_SCENES.map((_, idx) => (
              <div
                key={idx}
                className={`h-1 rounded-full transition-all duration-300 ${
                  currentScene === idx ? 'w-8 bg-[#B79A68]' : 'w-2 bg-[#E7E9ED]'
                }`}
              />
            ))}
          </div>

          {/* Cards */}
          <div className="relative min-h-[300px]">
            {STORY_SCENES.map((scene, idx) => (
              <div
                key={idx}
                className={`story-card-${idx} ${
                  idx === 0 ? 'opacity-100' : 'opacity-0'
                } absolute inset-0 flex flex-col justify-center p-6 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-md border border-[#EAE7E0] shadow-soft-xl`}
              >
                <div className="inline-flex items-center gap-2 text-[10px] font-mono font-bold tracking-widest uppercase text-[#B79A68] mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#B79A68]" />
                  <span>{scene.step}</span>
                  <span className="text-[#9CA3AF]">·</span>
                  <span>{scene.tag}</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717] tracking-tight leading-snug mb-2">
                  {scene.title}
                </h3>

                <h4 className="text-xs sm:text-sm font-semibold text-[#8C734B] mb-3">
                  {scene.subtitle}
                </h4>

                <p className="text-xs sm:text-sm text-[#666666] leading-relaxed mb-6 font-normal">
                  {scene.desc}
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-[#F0EFEA]">
                  <button
                    type="button"
                    onClick={onExploreClick}
                    className="h-10 px-5 rounded-xl bg-[#171717] hover:bg-[#B79A68] text-white font-semibold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 group shadow-xs"
                  >
                    <span>View Blueprint Details</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Real-Time 3D Interactive Canvas */}
        <div
          ref={canvasWrapRef}
          className="absolute inset-0 z-10 w-full h-full flex items-center justify-center lg:justify-end pr-0 lg:pr-12 pointer-events-none lg:pointer-events-auto"
        >
          {isWebGL ? (
            <div className="w-full h-full lg:w-[68%]">
              <Canvas
                camera={{ position: [14, 8, 14], fov: 38 }}
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
                dpr={[1, 1.5]}
              >
                <StoryRig progressRef={progressRef} explodedRef={explodedRef} />
              </Canvas>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
                alt="Architectural Story"
                className="w-[85%] h-[80%] object-cover rounded-3xl opacity-80"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
