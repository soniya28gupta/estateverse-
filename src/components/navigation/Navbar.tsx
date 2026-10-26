import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Compass,
  Heart,
  Box,
  MapPin,
  Calculator,
  Info,
  Menu,
  X,
  PlusCircle,
  Sparkles,
  User
} from 'lucide-react';
import { getStoredFavorites } from '../../utils/formatters';

interface NavbarProps {
  onOpenAssistant?: () => void;
  favoritesCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAssistant, favoritesCount: propFavCount }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [favCount, setFavCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (propFavCount !== undefined) {
      setFavCount(propFavCount);
    } else {
      setFavCount(getStoredFavorites().length);
    }
  }, [propFavCount, location.pathname]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Explore', href: '/explore' },
    { label: '3D Tours', href: '/#3d-tours' },
    { label: 'Neighborhoods', href: '/neighborhoods' },
    { label: 'Mortgage Calculator', href: '/calculator' },
    { label: 'About', href: '/about' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-midnight-950/90 backdrop-blur-md border-b border-gold-400/20 py-3 shadow-xl'
          : 'bg-gradient-to-b from-midnight-950/80 via-midnight-950/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-300 via-gold-400 to-gold-600 flex items-center justify-center text-midnight-950 shadow-md group-hover:scale-105 transition-transform">
              <Box className="w-5 h-5 text-midnight-950 stroke-[2.2]" />
            </div>
            <div>
              <div className="font-display text-lg sm:text-xl font-bold tracking-wider text-white flex items-center gap-1.5">
                ESTATEVERSE
                <span className="text-xs px-1.5 py-0.5 rounded bg-gold-400/20 text-gold-300 border border-gold-400/40 font-sans font-semibold">
                  3D
                </span>
              </div>
              <p className="text-[10px] tracking-widest uppercase text-stone-400 font-medium">
                Next-Gen Real Estate
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors ${
                    isActive
                      ? 'text-gold-300 border-b-2 border-gold-400 pb-1 font-semibold'
                      : 'text-stone-300 hover:text-gold-300'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* AI Assistant button */}
            {onOpenAssistant && (
              <button
                onClick={onOpenAssistant}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-midnight-800/80 hover:bg-midnight-800 text-gold-300 border border-gold-400/30 text-xs font-semibold backdrop-blur-md transition shadow-md"
                title="Open EstateMate AI Advisor"
              >
                <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
                EstateMate AI
              </button>
            )}

            {/* Favorites Icon */}
            <Link
              to="/favorites"
              className="relative p-2.5 rounded-xl bg-midnight-900/80 hover:bg-midnight-800 text-stone-300 hover:text-gold-300 border border-stone-800 backdrop-blur-md transition shadow-md"
              title="Saved Properties"
              aria-label="Favorites"
            >
              <Heart className="w-4 h-4" />
              {favCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gold-400 text-midnight-950 font-bold text-[10px] flex items-center justify-center shadow">
                  {favCount}
                </span>
              )}
            </Link>

            {/* List Your Property */}
            <Link
              to="/explore"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gold-400 hover:bg-gold-300 text-midnight-950 font-semibold text-xs transition shadow-md hover:shadow-gold-400/20"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              List Property
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <Link
              to="/favorites"
              className="relative p-2 rounded-lg bg-midnight-900 text-stone-300"
              aria-label="Favorites"
            >
              <Heart className="w-4 h-4" />
              {favCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gold-400 text-midnight-950 font-bold text-[9px] flex items-center justify-center">
                  {favCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-midnight-900 text-stone-300 hover:text-white border border-stone-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-midnight-950/95 border-b border-gold-400/20 backdrop-blur-xl px-4 py-5 shadow-2xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-stone-300 hover:bg-midnight-800 hover:text-gold-300"
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-3 border-t border-stone-800 flex flex-col gap-2">
              {onOpenAssistant && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAssistant();
                  }}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-midnight-800 text-gold-300 text-xs font-semibold border border-gold-400/30"
                >
                  <Sparkles className="w-4 h-4 text-gold-400" />
                  Ask EstateMate AI
                </button>
              )}
              <Link
                to="/explore"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gold-400 text-midnight-950 text-xs font-semibold"
              >
                <PlusCircle className="w-4 h-4" />
                List Your Property
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
