import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Box, Heart, Sparkles, ArrowRight, Menu, X, Home, Compass,
  Layers, Info, PhoneCall
} from 'lucide-react';
import { getStoredFavorites } from '../../utils/formatters';

interface NavbarProps {
  onOpenAssistant?: () => void;
  onOpen3DWorld?: () => void;
  onOpenContact?: () => void;
  favoritesCount?: number;
}

interface NavItem {
  label: string;
  href?: string;
  sectionId?: string;
  action?: '3d-world' | 'contact';
  icon: React.FC<{ className?: string }>;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAssistant,
  onOpen3DWorld,
  onOpenContact,
  favoritesCount: propFavCount,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [favCount, setFavCount] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();
  const drawerRef = useRef<HTMLDivElement>(null);

  /* ── Detect scroll position for subtle shadow enhancement ── */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ── Sync favorites count ── */
  useEffect(() => {
    setFavCount(propFavCount !== undefined ? propFavCount : getStoredFavorites().length);
  }, [propFavCount, location.pathname]);

  /* ── Close mobile drawer on route change ── */
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  /* ── Handle pending section scrolls after navigation ── */
  useEffect(() => {
    const pending = sessionStorage.getItem('pendingScrollSection');
    if (pending && location.pathname === '/') {
      sessionStorage.removeItem('pendingScrollSection');
      requestAnimationFrame(() => {
        setTimeout(() => {
          const el = document.getElementById(pending);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      });
    }
  }, [location.pathname]);

  /* ── Escape key closes mobile menu ── */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) setMobileOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [mobileOpen]);

  /* ── Lock body scroll when mobile menu is open ── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const navItems: NavItem[] = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Properties', href: '/', sectionId: 'featured-properties', icon: Compass },
    { label: '3D Tours', action: '3d-world', sectionId: 'experience-3d', icon: Box },
    { label: 'Collections', href: '/', sectionId: 'signature-collections', icon: Layers },
    { label: 'About', href: '/', sectionId: 'about-estateverse', icon: Info },
    { label: 'Contact', action: 'contact', icon: PhoneCall },
  ];

  const handleItemClick = (item: NavItem) => {
    setMobileOpen(false);

    if (item.action === '3d-world') {
      if (onOpen3DWorld) {
        onOpen3DWorld();
        return;
      }
    }

    if (item.action === 'contact') {
      if (onOpenContact) {
        onOpenContact();
        return;
      }
    }

    if (item.sectionId) {
      if (location.pathname === '/') {
        const el = document.getElementById(item.sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
      } else {
        sessionStorage.setItem('pendingScrollSection', item.sectionId);
        navigate('/');
        return;
      }
    }

    if (item.href) {
      if (item.href === '/' && location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate(item.href);
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-white/95 backdrop-blur-md text-[#171717] border-b border-[#E8E5DF] ${
          isScrolled ? 'shadow-sm' : 'shadow-none'
        }`}
        style={{ height: 'var(--nav-height, 72px)' }}
        role="banner"
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* ── LEFT: EstateVerse 3D Wordmark ── */}
          <Link
            to="/"
            onClick={() => {
              if (location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-3 shrink-0 group mr-6"
            aria-label="EstateVerse 3D — Home"
          >
            <div className="w-9 h-9 rounded-xl bg-[#171717] text-white flex items-center justify-center group-hover:bg-[#B79A68] transition-colors duration-300 shadow-xs">
              <Box style={{ width: '18px', height: '18px' }} className="stroke-[2]" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-[15px] font-bold tracking-wider flex items-center gap-1.5 text-[#171717]">
                ESTATEVERSE
                <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-[#FAF6EE] text-[#B79A68] border border-[#E9DCBC] font-sans font-bold leading-none">
                  3D
                </span>
              </div>
              <p className="text-[9px] tracking-widest uppercase font-medium text-[#888888] hidden sm:block">
                Luxury Architectural Living
              </p>
            </div>
          </Link>

          {/* ── CENTER: Desktop Navigation Links ── */}
          <nav
            className="hidden lg:flex items-center gap-6 xl:gap-8"
            aria-label="Primary navigation"
          >
            {navItems.map((item) => {
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleItemClick(item)}
                  className="text-[13px] font-medium text-[#555555] hover:text-[#171717] transition-all relative py-1 focus:outline-none group"
                >
                  <span>{item.label}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#B79A68] transition-all duration-300 group-hover:w-full" />
                </button>
              );
            })}
          </nav>

          {/* ── RIGHT: Desktop Action CTA & Utilities ── */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            {onOpenAssistant && (
              <button
                type="button"
                onClick={onOpenAssistant}
                className="h-9 px-3 rounded-xl border border-[#E8E5DF] bg-[#FAF9F5] hover:bg-[#FAF6EE] text-[#171717] text-xs font-semibold flex items-center gap-1.5 transition shadow-2xs hover:border-[#E9DCBC]"
                aria-label="Open EstateMate AI"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#B79A68]" aria-hidden="true" />
                <span className="hidden xl:inline">EstateMate AI</span>
                <span className="xl:hidden">AI</span>
              </button>
            )}

            <Link
              to="/favorites"
              className="w-9 h-9 rounded-xl border border-[#E8E5DF] bg-white hover:bg-[#FAF9F5] text-[#666666] hover:text-[#171717] flex items-center justify-center relative transition shadow-2xs"
              aria-label={`Saved properties${favCount > 0 ? ` (${favCount})` : ''}`}
              title="Saved Properties"
            >
              <Heart className="w-4 h-4" aria-hidden="true" />
              {favCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 rounded-full bg-[#B79A68] text-white font-bold text-[9px] flex items-center justify-center border-2 border-white">
                  {favCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('featured-properties');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else navigate('/explore');
              }}
              className="h-10 px-4 rounded-xl bg-[#B79A68] hover:bg-[#9B7E4E] text-white text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 shadow-xs hover:shadow-md"
            >
              <span>Explore Estates</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>

          {/* ── MOBILE: Menu Trigger ── */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              to="/favorites"
              className="w-9 h-9 rounded-xl border border-[#E8E5DF] bg-white text-[#171717] flex items-center justify-center relative shadow-2xs"
              aria-label="Saved properties"
            >
              <Heart className="w-4 h-4" />
              {favCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#B79A68] text-white font-bold text-[9px] flex items-center justify-center border border-white">
                  {favCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="w-9 h-9 rounded-xl border border-[#E8E5DF] bg-white text-[#171717] flex items-center justify-center shadow-2xs"
              aria-label="Open mobile navigation menu"
              aria-expanded={mobileOpen}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* ── MOBILE DRAWER ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setMobileOpen(false);
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <div
            ref={drawerRef}
            className="absolute top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white p-6 shadow-2xl flex flex-col justify-between animate-scale-in"
          >
            <div>
              {/* Drawer Top */}
              <div className="flex items-center justify-between pb-6 border-b border-[#E8E5DF] mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#171717] flex items-center justify-center text-white">
                    <Box className="w-4 h-4" />
                  </div>
                  <span className="font-display text-sm font-bold tracking-wider text-[#171717]">
                    ESTATEVERSE <span className="text-[#B79A68]">3D</span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 rounded-lg text-[#666666] hover:text-[#171717]"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-1.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => handleItemClick(item)}
                      className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-left text-sm font-semibold text-[#171717] hover:bg-[#FAF9F5] hover:text-[#B79A68] transition"
                    >
                      <Icon className="w-4 h-4 text-[#B79A68]" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Drawer Bottom Actions */}
            <div className="pt-6 border-t border-[#E8E5DF] space-y-3">
              {onOpenAssistant && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenAssistant();
                  }}
                  className="w-full btn btn-secondary justify-center text-xs"
                >
                  <Sparkles className="w-4 h-4 text-[#B79A68]" />
                  <span>EstateMate AI Advisor</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  const el = document.getElementById('featured-properties');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else navigate('/explore');
                }}
                className="w-full btn btn-primary justify-center text-xs"
              >
                <span>Explore Estates</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
