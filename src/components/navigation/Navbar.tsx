import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Box, Heart, Sparkles, ArrowRight, Menu, X, Home, Compass,
  Box as Box3D, Layers, MapPin, Calculator, Info
} from 'lucide-react';
import { getStoredFavorites } from '../../utils/formatters';

interface NavbarProps {
  onOpenAssistant?: () => void;
  favoritesCount?: number;
}

const navLinks = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Explore', href: '/explore', icon: Compass },
  { label: '3D Tours', href: '/#experience-3d', icon: Box3D },
  { label: 'Collections', href: '/#curated-collections', icon: Layers },
  { label: 'Neighborhoods', href: '/neighborhoods', icon: MapPin },
  { label: 'Calculator', href: '/calculator', icon: Calculator },
  { label: 'About', href: '/about', icon: Info },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenAssistant, favoritesCount: propFavCount }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [favCount, setFavCount] = useState(0);
  const location = useLocation();
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setFavCount(propFavCount !== undefined ? propFavCount : getStoredFavorites().length);
  }, [propFavCount, location.pathname]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) setMobileOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [mobileOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    // Handle hash links
    if (href.includes('#')) {
      const id = href.split('#')[1];
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <>
      {/* ── HEADER ── */}
      <header
        className={`navbar${isScrolled ? ' scrolled' : ''}`}
        role="banner"
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          {/* ── LEFT: Logo ── */}
          <Link
            to="/"
            className="flex items-center gap-2.5 shrink-0 group mr-8"
            aria-label="EstateVerse 3D — Home"
          >
            <div className="w-9 h-9 rounded-xl bg-[#17191C] group-hover:bg-[#B89558] flex items-center justify-center text-white transition-colors duration-300 shadow-sm">
              <Box className="w-4.5 h-4.5 stroke-[2]" style={{ width: '18px', height: '18px' }} />
            </div>
            <div className="hidden sm:block leading-tight">
              <div className="font-display text-[15px] font-bold tracking-wider text-[#17191C] flex items-center gap-1.5">
                ESTATEVERSE
                <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-[#FAF6EE] text-[#B89558] border border-[#E9DCBC] font-sans font-bold leading-none">
                  3D
                </span>
              </div>
              <p className="text-[9px] tracking-widest uppercase text-[#9CA3AF] font-medium">
                Luxury Architectural Living
              </p>
            </div>
          </Link>

          {/* ── CENTER: Nav Links ── */}
          <nav
            className="hidden lg:flex items-center gap-6 flex-1"
            aria-label="Primary navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  if (link.href.includes('#')) {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }
                }}
                className={`nav-link${isActive(link.href) ? ' active' : ''}`}
                aria-current={isActive(link.href) ? 'page' : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* ── RIGHT: Actions ── */}
          <div className="hidden sm:flex items-center gap-2 ml-auto shrink-0">
            {/* AI Assistant */}
            {onOpenAssistant && (
              <button
                type="button"
                onClick={onOpenAssistant}
                className="btn btn-secondary btn-sm"
                aria-label="Open EstateMate AI"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#B89558]" aria-hidden="true" />
                <span className="hidden xl:inline">EstateMate AI</span>
                <span className="xl:hidden">AI</span>
              </button>
            )}

            {/* Favorites */}
            <Link
              to="/favorites"
              className="btn btn-outline btn-icon relative"
              aria-label={`Saved properties${favCount > 0 ? ` (${favCount})` : ''}`}
              title="Saved Properties"
            >
              <Heart className="w-4 h-4" aria-hidden="true" />
              {favCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#B89558] text-white font-bold text-[10px] flex items-center justify-center shadow-sm border-2 border-white">
                  {favCount > 9 ? '9+' : favCount}
                </span>
              )}
            </Link>

            {/* Explore CTA */}
            <Link
              to="/explore"
              className="btn btn-primary btn-sm"
            >
              <span>Explore Properties</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>

          {/* ── MOBILE: Right side ── */}
          <div className="flex sm:hidden items-center gap-2 ml-auto">
            <Link
              to="/favorites"
              className="btn btn-outline btn-icon-sm relative"
              aria-label="Saved properties"
            >
              <Heart className="w-4 h-4" aria-hidden="true" />
              {favCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#B89558] text-white font-bold text-[9px] flex items-center justify-center border border-white">
                  {favCount}
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="btn btn-outline btn-icon-sm"
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-panel"
            >
              <Menu className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* ── MOBILE DRAWER ── */}
      {mobileOpen && (
        <div
          className="mobile-menu"
          onClick={(e) => { if (e.target === e.currentTarget) setMobileOpen(false); }}
          aria-modal="true"
          role="dialog"
          aria-label="Navigation menu"
        >
          <div
            id="mobile-nav-panel"
            ref={drawerRef}
            className="mobile-menu-panel animate-scale-in"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between mb-6">
              <Link to="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                <div className="w-8 h-8 rounded-xl bg-[#17191C] flex items-center justify-center">
                  <Box className="w-4 h-4 text-white stroke-[2]" />
                </div>
                <span className="font-display text-sm font-bold tracking-wider text-[#17191C]">ESTATEVERSE <span className="text-[#B89558]">3D</span></span>
              </Link>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="btn btn-ghost btn-icon-sm"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex flex-col gap-1 mb-6" aria-label="Mobile navigation">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      if (link.href.includes('#')) e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive(link.href)
                        ? 'bg-[#FAF6EE] text-[#B89558] font-semibold'
                        : 'text-[#17191C] hover:bg-[#F7F8FA]'
                    }`}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive(link.href) ? 'text-[#B89558]' : 'text-[#9CA3AF]'}`} />
                    {link.label}
                  </a>
                );
              })}
            </nav>

            {/* Action Buttons */}
            <div className="border-t border-[#E7E9ED] pt-4 flex flex-col gap-2.5">
              {onOpenAssistant && (
                <button
                  type="button"
                  onClick={() => { setMobileOpen(false); onOpenAssistant(); }}
                  className="btn btn-secondary w-full"
                >
                  <Sparkles className="w-4 h-4 text-[#B89558]" />
                  Ask EstateMate AI
                </button>
              )}
              <Link
                to="/explore"
                onClick={() => setMobileOpen(false)}
                className="btn btn-primary w-full"
              >
                <span>Explore Properties</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
