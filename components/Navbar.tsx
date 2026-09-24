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
        className={`fixed top-0 left-0 right-0 z-40 transition-[padding,background-color,border-color] duration-300 ${
          scrolled
            ? 'py-3.5 sm:py-4 bg-neutral-950/95 border-b border-white/10 shadow-2xl'
            : 'py-5 sm:py-7 bg-gradient-to-b from-black/70 to-transparent'
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
                  className="flex items-center gap-2.5 h-10 pl-2.5 pr-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white text-xs font-semibold tracking-wider transition-colors active:scale-95 group cursor-pointer"
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
                className="h-10 px-5 rounded-full text-xs font-semibold tracking-wider text-white hover:text-neutral-950 bg-white/10 hover:bg-white border border-white/25 transition-colors duration-200 cursor-pointer flex items-center gap-2 shadow-sm active:scale-95"
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
                className="flex items-center gap-2 h-10 pl-2 pr-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white active:scale-95 transition-colors"
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
                className="h-10 px-4 rounded-full text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/25 active:scale-95 transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap shadow-sm cursor-pointer"
              >
                <User size={13} className="text-amber-400" />
                <span>Sign In</span>
              </button>
            )}

            <button
              id="nav-mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(true)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white active:scale-90 transition-colors cursor-pointer shrink-0"
              aria-label="Open navigation menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </nav>

      {/* Clean Luxury Mobile & Tablet Drawer Modal */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-neutral-950/98 flex flex-col justify-between p-6 sm:p-8 animate-in fade-in duration-200 overflow-y-auto">
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-5 border-b border-white/10">
            <a
              href="#home"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white font-extrabold text-xl tracking-[0.22em] uppercase"
            >
              WANDERLUSH
            </a>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-colors cursor-pointer"
              aria-label="Close navigation menu"
            >
              <X size={18} />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="py-6 flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="group flex items-center justify-between py-3.5 text-lg font-medium tracking-widest text-white/80 hover:text-white border-b border-white/5 transition-colors"
              >
                <span>{link.label}</span>
                <ArrowUpRight size={16} className="text-white/30 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            ))}
          </div>

          {/* Drawer Bottom Actions */}
          <div className="space-y-3 pt-5 border-t border-white/10">
            {/* User Account / Sign In */}
            {user ? (
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 min-w-0"
                >
                  <div className="w-8 h-8 rounded-full bg-amber-400 text-neutral-950 font-bold text-xs flex items-center justify-center shrink-0">
                    {user.fullName.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <span className="block text-xs font-semibold text-white truncate">{user.fullName}</span>
                    <span className="block text-[11px] text-white/50">View Account</span>
                  </div>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  title="Sign Out"
                  className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-white/60 hover:text-red-400 transition-colors cursor-pointer"
                  aria-label="Sign out"
                >
                  <LogOut size={15} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal('login');
                }}
                className="w-full py-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-xs tracking-wider uppercase transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <User size={14} className="text-amber-400" />
                <span>Sign In to Account</span>
              </button>
            )}

            {/* Primary Action Button */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onScheduleClick?.();
              }}
              className="w-full py-3.5 rounded-full bg-white text-neutral-950 font-bold text-xs tracking-wider uppercase shadow-lg active:scale-98 transition-transform cursor-pointer flex items-center justify-center gap-2"
            >
              <Calendar size={14} className="text-amber-600" />
              <span>Schedule Expedition</span>
            </button>

            {/* Subtle Contact Info */}
            <div className="pt-2 text-center">
              <a
                href="tel:+6234129990"
                className="text-[11px] text-white/40 hover:text-white/70 transition-colors inline-flex items-center gap-1.5"
              >
                <Phone size={11} />
                <span>Concierge Desk: +62 (341) 299-90</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
