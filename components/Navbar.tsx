'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Calendar, Phone, ArrowUpRight, ShieldCheck, MapPin, User, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface NavbarProps {
  onScheduleClick?: () => void;
}

export default function Navbar({ onScheduleClick }: NavbarProps) {
  const { user, openAuthModal, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let lastScrolled = false;
    const handleScroll = () => {
      const isScrolled = window.scrollY > 40;
      if (isScrolled !== lastScrolled) {
        lastScrolled = isScrolled;
        setScrolled(isScrolled);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'HOME', href: '#home' },
    { label: 'SERVICES', href: '#services' },
    { label: 'TOUR', href: '#tour' },
    { label: 'ABOUT', href: '#about' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'py-3.5 sm:py-4 bg-neutral-950/90 backdrop-blur-xl border-b border-white/10 shadow-2xl'
            : 'py-5 sm:py-7 bg-gradient-to-b from-black/60 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#home"
            id="nav-brand-logo"
            className="flex items-center gap-2 group cursor-pointer shrink-0"
          >
            <span className="text-white font-extrabold text-lg sm:text-xl lg:text-2xl tracking-[0.22em] uppercase transition-opacity group-hover:opacity-90">
              WANDERLUSH
            </span>
          </a>

          {/* Desktop Navigation Links (Show on lg: 1024px+ to avoid tablet cramping) */}
          <div className="hidden lg:flex items-center space-x-7 xl:space-x-10 text-xs font-semibold tracking-[0.2em] text-white/80 shrink-0">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-white transition-colors relative py-1 hover:after:w-full after:w-0 after:h-[1.5px] after:bg-amber-400 after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop Action Buttons (lg: 1024px+) */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/profile"
                  id="nav-profile-btn"
                  className="flex items-center gap-2.5 h-10 pl-2.5 pr-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white text-xs font-semibold tracking-wider transition-all backdrop-blur-md active:scale-95 group cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-full bg-amber-400 text-neutral-950 font-bold text-[11px] flex items-center justify-center">
                    {user.fullName.charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-[120px] truncate">{user.fullName}</span>
                </Link>
                <button
                  onClick={logout}
                  title="Sign Out"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 border border-white/10 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Sign out"
                >
                  <LogOut size={14} />
                </button>
              </div>
            ) : (
              <button
                id="nav-signin-btn"
                onClick={() => openAuthModal('login')}
                className="h-10 px-5 rounded-full text-xs font-semibold tracking-wider text-white hover:text-neutral-950 bg-white/10 hover:bg-white border border-white/25 transition-all duration-300 backdrop-blur-md cursor-pointer flex items-center gap-2 shadow-sm active:scale-95"
              >
                <User size={14} className="text-amber-400" />
                <span>Sign In</span>
              </button>
            )}
          </div>

          {/* Tablet & Mobile Right Controls (< 1024px) */}
          <div className="flex lg:hidden items-center gap-2 sm:gap-3">
            {user ? (
              <Link
                href="/profile"
                id="nav-mobile-profile-btn"
                className="flex items-center gap-2 h-10 pl-2 pr-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white active:scale-95 transition-all backdrop-blur-md"
                aria-label="View Profile"
              >
                <div className="w-6 h-6 rounded-full bg-amber-400 text-neutral-950 font-bold text-xs flex items-center justify-center shrink-0">
                  {user.fullName.charAt(0).toUpperCase()}
                </div>
                <span className="text-xs font-semibold max-w-[85px] truncate">
                  {user.fullName.split(' ')[0]}
                </span>
              </Link>
            ) : (
              <button
                id="nav-mobile-signin-btn"
                onClick={() => openAuthModal('login')}
                className="h-10 px-4 rounded-full text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/25 active:scale-95 transition-all backdrop-blur-md flex items-center justify-center gap-1.5 whitespace-nowrap shadow-sm cursor-pointer"
              >
                <User size={13} className="text-amber-400" />
                <span>Sign In</span>
              </button>
            )}

            <button
              id="nav-mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(true)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white backdrop-blur-md active:scale-90 transition-all cursor-pointer shrink-0"
              aria-label="Open navigation menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mature Mobile & Tablet Drawer Modal */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-neutral-950/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 animate-in fade-in duration-300">
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div>
              <span className="text-white font-extrabold text-xl tracking-[0.22em] uppercase">
                WANDERLUSH
              </span>
              <span className="block text-[10px] text-amber-400 font-mono tracking-wider mt-0.5">
                BROMO EXPEDITIONS DESK
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-colors"
              aria-label="Close navigation menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links with large mature touch typography */}
          <div className="py-8 flex flex-col space-y-4 sm:space-y-6">
            {navLinks.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="group flex items-center justify-between py-2 text-2xl font-bold tracking-tight text-white hover:text-amber-400 transition-colors"
              >
                <div className="flex items-baseline gap-3">
                  <span className="text-xs font-mono text-neutral-500 font-normal">
                    0{idx + 1}
                  </span>
                  <span>{link.label}</span>
                </div>
                <ArrowUpRight size={18} className="text-neutral-600 group-hover:text-amber-400 transition-colors" />
              </a>
            ))}
          </div>

          {/* Drawer Bottom Info & Direct CTA */}
          <div className="space-y-4 pt-6 border-t border-white/10">
            {/* User Account / Passport in Drawer */}
            {user ? (
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-amber-400 text-neutral-950 font-bold text-xs flex items-center justify-center">
                    {user.fullName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-white leading-tight">{user.fullName}</span>
                    <span className="block text-[10px] text-amber-400 font-mono">{user.role}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-1.5 rounded-lg bg-amber-400 text-neutral-950 font-bold text-xs"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="p-1.5 rounded-lg bg-white/5 text-neutral-400 hover:text-white"
                  >
                    <LogOut size={14} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal('login');
                  }}
                  className="py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/15 flex items-center justify-center gap-1.5"
                >
                  <User size={14} />
                  <span>Sign In</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal('signup');
                  }}
                  className="py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <span>Sign Up</span>
                </button>
              </div>
            )}

            {/* Quick Status Pill */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs text-neutral-300">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-amber-400" />
                <span>Caldera Conditions</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-medium text-[11px]">
                Optimal Sunrise (5:18 AM)
              </span>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onScheduleClick?.();
              }}
              className="w-full py-4 rounded-full bg-white text-neutral-950 font-bold text-sm tracking-wide shadow-xl active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
            >
              <Calendar size={16} />
              <span>Schedule Private Expedition</span>
            </button>

            <div className="flex items-center justify-center gap-6 pt-2 text-xs text-neutral-400">
              <a href="tel:+6234129990" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Phone size={13} />
                <span>+62 (341) 299-90</span>
              </a>
              <span>•</span>
              <div className="flex items-center gap-1">
                <ShieldCheck size={13} className="text-amber-400" />
                <span>Certified Guides</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
