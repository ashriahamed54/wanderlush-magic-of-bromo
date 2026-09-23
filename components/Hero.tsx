'use client';

import React from 'react';
import Image from 'next/image';
import { Calendar, ArrowRight, Compass, ShieldCheck, Instagram, Facebook, Youtube } from 'lucide-react';

interface HeroProps {
  onScheduleClick: () => void;
  onExploreClick?: () => void;
  onSocialClick: (platform: string) => void;
}

export default function Hero({ onScheduleClick, onExploreClick, onSocialClick }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-[100svh] w-full flex flex-col justify-between pt-28 sm:pt-24 md:pt-28 lg:pt-32 pb-6 sm:pb-8 lg:pb-12 px-4 sm:px-8 lg:px-12 overflow-hidden select-none"
    >
      {/* Background Sunrise Landscape */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=2071&auto=format&fit=crop"
          alt="Mount Bromo Caldera Sunrise Panorama"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center transform scale-105 transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        {/* Soft atmospheric gradient giving high contrast to upper typography while keeping middle caldera scenery bright and clear */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/15 to-black/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-black/40" />
      </div>

      {/* Floating Right Social Media Icons (Desktop & Tablet: sm+) */}
      <div className="hidden sm:flex absolute right-4 sm:right-6 lg:right-10 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-3">
        <button
          id="hero-social-instagram"
          onClick={() => onSocialClick('Instagram')}
          className="w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-md border border-white/25 flex items-center justify-center text-white transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer shadow-md"
          aria-label="Instagram"
        >
          <Instagram size={16} />
        </button>
        <button
          id="hero-social-facebook"
          onClick={() => onSocialClick('Facebook')}
          className="w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-md border border-white/25 flex items-center justify-center text-white transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer shadow-md"
          aria-label="Facebook"
        >
          <Facebook size={16} />
        </button>
        <button
          id="hero-social-youtube"
          onClick={() => onSocialClick('YouTube')}
          className="w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-md border border-white/25 flex items-center justify-center text-white transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer shadow-md"
          aria-label="YouTube"
        >
          <Youtube size={16} />
        </button>
      </div>

      {/* Upper Hero Typography - Clean, non-overlapping, positioned comfortably in the open dawn sky */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-4 sm:pt-2 md:pt-4">
        {/* Tag Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white/95 text-[10px] sm:text-xs md:text-sm font-medium tracking-wide w-fit mb-2.5 sm:mb-4 shadow-sm">
          <span>A Place Where Nature and Adventure Unite</span>
        </div>

        {/* Hero Title - Adjusted desktop scale and comfortable mobile placement */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-white leading-[1.15] sm:leading-[1.1] max-w-3xl drop-shadow-xl">
          Experience the <br />
          <span className="text-white">Magic of Bromo</span>
        </h1>

        {/* Desktop / Tablet CTA Button (Schedule button) */}
        <div className="hidden sm:inline-flex items-center mt-5 md:mt-6">
          <button
            id="hero-schedule-btn-desktop"
            onClick={onScheduleClick}
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-neutral-900 font-semibold text-xs tracking-wider uppercase shadow-xl hover:bg-neutral-100 hover:shadow-2xl transition-all duration-300 transform active:scale-95 cursor-pointer"
          >
            <Calendar size={14} className="text-amber-600" />
            <span>Schedule</span>
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Middle Spacer Area: Keeps the entire caldera scenery, Mount Batok cone, and smoking Bromo crater 100% visible and unobstructed */}
      <div className="flex-1 min-h-[60px] sm:min-h-[100px] pointer-events-none" />

      {/* Bottom Controls Area */}
      <div className="relative z-20 max-w-7xl mx-auto w-full space-y-4 sm:space-y-6">
        {/* Mobile-Only Bottom Controls: Schedule Button + Social Media Icons in Bottom */}
        <div className="sm:hidden flex flex-col gap-3.5 w-full">
          {/* Mobile Bottom Action Row */}
          <div className="flex items-center gap-2.5 w-full">
            <button
              id="hero-schedule-btn-mobile"
              onClick={onScheduleClick}
              className="flex-1 py-2.5 px-4 rounded-full bg-white text-neutral-950 font-bold text-xs tracking-wider uppercase shadow-xl active:scale-95 transition-transform flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar size={14} className="text-amber-600" />
              <span>Schedule</span>
            </button>

            {/* Mobile Social Media Icons at the bottom */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => onSocialClick('Instagram')}
                className="w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/25 flex items-center justify-center text-white active:scale-90 transition-transform"
                aria-label="Instagram"
              >
                <Instagram size={15} />
              </button>
              <button
                onClick={() => onSocialClick('Facebook')}
                className="w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/25 flex items-center justify-center text-white active:scale-90 transition-transform"
                aria-label="Facebook"
              >
                <Facebook size={15} />
              </button>
              <button
                onClick={() => onSocialClick('YouTube')}
                className="w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/25 flex items-center justify-center text-white active:scale-90 transition-transform"
                aria-label="YouTube"
              >
                <Youtube size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Feature Highlight Pills (Desktop & Mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4 md:gap-6 max-w-3xl">
          {/* Feature 1 */}
          <div className="flex items-center gap-3 sm:gap-4 px-3.5 sm:px-5 py-2 sm:py-3 rounded-2xl sm:rounded-full bg-black/45 hover:bg-black/60 backdrop-blur-md border border-white/15 text-white shadow-lg transition-colors">
            <div className="w-7 sm:w-9 h-7 sm:h-9 rounded-full bg-white/20 border border-white/30 flex items-center justify-center shrink-0">
              <Compass size={15} className="text-white" />
            </div>
            <p className="text-[10px] sm:text-xs md:text-[12px] text-white/90 leading-snug font-normal">
              Provides a visual representation of destinations, attractions, and activities.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex items-center gap-3 sm:gap-4 px-3.5 sm:px-5 py-2 sm:py-3 rounded-2xl sm:rounded-full bg-black/45 hover:bg-black/60 backdrop-blur-md border border-white/15 text-white shadow-lg transition-colors">
            <div className="w-7 sm:w-9 h-7 sm:h-9 rounded-full bg-white/20 border border-white/30 flex items-center justify-center shrink-0">
              <ShieldCheck size={15} className="text-white" />
            </div>
            <p className="text-[10px] sm:text-xs md:text-[12px] text-white/90 leading-snug font-normal">
              Provides travelers with more accurate and reliable perspective of the destination.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
