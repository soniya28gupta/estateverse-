import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, AlertCircle } from 'lucide-react';

interface CinematicPropertyVideoProps {
  posterUrl?: string;
  videoUrl?: string;
  title?: string;
  locality?: string;
  className?: string;
}

export const CinematicPropertyVideo: React.FC<CinematicPropertyVideoProps> = ({
  posterUrl = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=85',
  // Verified luxury architectural villa walkthrough clip from reliable open CDN
  videoUrl = 'https://assets.mixkit.co/videos/preview/mixkit-modern-luxury-house-exterior-in-the-afternoon-42795-large.mp4',
  title = 'The Obsidian Pavilion Villa',
  locality = 'Super Corridor, Indore',
  className = ''
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div className={`relative w-full h-full min-h-[440px] lg:min-h-[580px] rounded-3xl overflow-hidden bg-[#F7F8FA] border border-[#E7E9ED] shadow-soft-xl group ${className}`}>
      {/* Fallback Architectural Photo Pan if Video fails or prefers reduced motion */}
      {hasError ? (
        <div className="relative w-full h-full">
          <img
            src={posterUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#17191C]/80 via-transparent to-transparent flex flex-col justify-end p-6">
            <span className="text-xs font-semibold text-[#B89558] uppercase tracking-wider">
              Cinematic Still Perspective
            </span>
            <h3 className="font-serif text-2xl font-bold text-white mt-1">{title}</h3>
            <p className="text-xs text-white/80">{locality} • Master Architectural Portfolio</p>
          </div>
        </div>
      ) : (
        <>
          {/* HTML5 Video Element */}
          <video
            ref={videoRef}
            src={videoUrl}
            poster={posterUrl}
            autoPlay
            muted={isMuted}
            loop
            playsInline
            preload="metadata"
            onLoadedData={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className="w-full h-full object-cover"
          />

          {/* Elegant White & Ambient Readability Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#17191C]/75 via-transparent to-black/10 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-transparent pointer-events-none" />

          {/* Top Badge */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#E7E9ED] text-[#17191C] text-xs font-semibold shadow-soft">
              <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`} />
              <Sparkles className="w-3.5 h-3.5 text-[#B89558]" />
              Architectural Film Walkthrough
            </div>
          </div>

          {/* Bottom Floating Details and Controls */}
          <div className="absolute bottom-5 left-5 right-5 z-20 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="text-white max-w-md drop-shadow-md">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#DBC38C] block mb-1">
                4K Cinematic Showcase
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold leading-snug">
                {title}
              </h3>
              <p className="text-xs text-white/90 mt-0.5">
                {locality} • Floor-to-ceiling glass, infinity lap pool & tranquil gardens
              </p>
            </div>

            {/* Video Controls Bar */}
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md p-1.5 rounded-2xl border border-[#E7E9ED] shadow-soft">
              <button
                type="button"
                onClick={togglePlay}
                className="p-2 rounded-xl text-[#17191C] hover:text-[#B89558] hover:bg-neutral-100 transition"
                title={isPlaying ? 'Pause Walkthrough' : 'Play Walkthrough'}
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              </button>

              <button
                type="button"
                onClick={toggleMute}
                className="p-2 rounded-xl text-[#17191C] hover:text-[#B89558] hover:bg-neutral-100 transition"
                title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={handleFullscreen}
                className="p-2 rounded-xl text-[#17191C] hover:text-[#B89558] hover:bg-neutral-100 transition"
                title="Fullscreen Film"
                aria-label="Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
