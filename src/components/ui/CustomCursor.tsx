import React, { useEffect, useState, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const CustomCursor: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [hoveredText, setHoveredText] = useState<string | null>(null);
  const [isPointerDown, setIsPointerDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch || reducedMotion) {
      setEnabled(false);
      return;
    }
    setEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check hovered element for data-cursor attribute
      const target = e.target as HTMLElement | null;
      const cursorTarget = target?.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        setHoveredText(cursorTarget.getAttribute('data-cursor'));
      } else {
        setHoveredText(null);
      }
    };

    const handleMouseDown = () => setIsPointerDown(true);
    const handleMouseUp = () => setIsPointerDown(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth lerp loop
    const updatePosition = () => {
      const ease = 0.18;
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * ease;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * ease;
      setCursorPos({ x: currentPos.current.x, y: currentPos.current.y });
      animFrameId.current = requestAnimationFrame(updatePosition);
    };
    animFrameId.current = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [reducedMotion, isVisible]);

  if (!enabled || !isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200"
      style={{
        left: `${cursorPos.x}px`,
        top: `${cursorPos.y}px`,
      }}
      aria-hidden="true"
    >
      {/* Outer ring */}
      <div
        className={`rounded-full transition-all duration-200 flex items-center justify-center ${
          hoveredText
            ? 'px-3 py-1 bg-[#171717]/95 text-white shadow-xl border border-[#B79A68]/60 backdrop-blur-md scale-110'
            : isPointerDown
            ? 'w-7 h-7 bg-[#B79A68]/30 border-2 border-[#B79A68] scale-90'
            : 'w-8 h-8 border border-[#171717]/35 bg-white/10 backdrop-blur-[1px]'
        }`}
      >
        {hoveredText ? (
          <span className="text-[10px] font-bold tracking-wider uppercase whitespace-nowrap flex items-center gap-1.5 text-[#FAF6EE]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B79A68] animate-pulse" />
            {hoveredText}
          </span>
        ) : (
          <div className="w-1.5 h-1.5 rounded-full bg-[#B79A68]" />
        )}
      </div>
    </div>
  );
};
