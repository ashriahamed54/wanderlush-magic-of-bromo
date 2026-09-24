'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MountainSnow, Compass, Eye, Crosshair, ArrowUpRight, Sparkles } from 'lucide-react';
import Reveal from './Reveal';

export interface VolcanoPeak {
  id: string;
  name: string;
  altitude: string;
  type: string;
  status: string;
  description: string;
  position: {
    top: string;
    left: string;
  };
  isFramed?: boolean;
}

export const PEAKS: VolcanoPeak[] = [
  {
    id: 'batok',
    name: 'Gunung Batok',
    altitude: 'MT +2400',
    type: 'Dormant Cinder Cone',
    status: 'Protected Flora Sanctuary',
    description: 'The iconic fluted conical peak with deep erosion gullies draped in lush mountain vegetation right in the heart of the Lautan Pasir sand sea.',
    position: { top: '65%', left: '60%' },
    isFramed: true
  },
  {
    id: 'bromo',
    name: 'Gunung Bromo',
    altitude: 'MT +2392',
    type: 'Active Somma Volcano',
    status: 'Continuous Sulfuric Activity',
    description: 'The famed smoking crater where the annual Yadnya Kasada ritual is held. Ascend the 253 stairs directly to the crater lip.',
    position: { top: '54%', left: '38%' }
  },
  {
    id: 'semeru',
    name: 'Gunung Semeru',
    altitude: 'MT +3676',
    type: 'Active Stratovolcano',
    status: 'Highest Peak in Java',
    description: 'Also known as Mahameru ("The Great Mountain"), Semeru is the sacred abode of the gods in Javanese cosmology and Java’s tallest peak.',
    position: { top: '30%', left: '52%' }
  },
  {
    id: 'widodaren',
    name: 'Gunung Widodaren',
    altitude: 'MT +2614',
    type: 'Extinct Volcanic Cone',
    status: 'Ancient Caldera Rim',
    description: 'Named after the legendary celestial nymph (bidadari), offering dramatic fluted cliff walls and a sacred meditation cave.',
    position: { top: '34%', left: '76%' }
  }
];

interface AerialCalderaSectionProps {
  onPeakSelect: (peak: VolcanoPeak) => void;
}

export default function AerialCalderaSection({ onPeakSelect }: AerialCalderaSectionProps) {
  const [activePeak, setActivePeak] = useState<VolcanoPeak>(PEAKS[0]); // Default Batok

  return (
    <section className="w-full bg-white pb-16 sm:pb-24 lg:pb-28 px-4 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Main Aerial Card */}
        <Reveal>
          <div
            className="relative w-full h-[520px] sm:h-[580px] md:h-[660px] rounded-3xl overflow-hidden shadow-2xl bg-neutral-950 border border-neutral-800 select-none flex flex-col justify-between"
          >
          {/* Background Aerial Monochrome / Deep Contrast Caldera Image */}
          <Image
            src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=2070&auto=format&fit=crop"
            alt="Aerial Topography of Mount Bromo and Tengger Caldera"
            fill
            sizes="100vw"
            className="object-cover object-center"
            referrerPolicy="no-referrer"
          />

          {/* High atmospheric gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/70 pointer-events-none" />

          {/* Heading overlay top-left */}
          <div className="absolute top-5 left-5 sm:top-10 sm:left-10 lg:top-12 lg:left-12 z-20">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-950/80 border border-white/20 text-white/90 text-[10px] sm:text-xs font-mono tracking-widest uppercase mb-2 shadow-sm">
              <Sparkles size={12} className="text-amber-400" />
              <span>INTERACTIVE TOPOGRAPHY</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08] drop-shadow-md">
              The Tengger <br />
              Volcanic Chain
            </h2>
          </div>

          {/* Peak 1: Gunung Semeru */}
          <div
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-110 active:scale-95"
            style={{ top: PEAKS[2].position.top, left: PEAKS[2].position.left }}
            onClick={() => {
              setActivePeak(PEAKS[2]);
              onPeakSelect(PEAKS[2]);
            }}
          >
            <div
              className={`px-3 py-1.5 rounded-full border shadow-lg text-center transition-all ${
                activePeak.id === 'semeru'
                  ? 'bg-amber-400 text-neutral-950 border-amber-300 ring-2 ring-amber-300/60 scale-105 shadow-amber-400/30'
                  : 'bg-black/80 hover:bg-black/95 border-white/25 text-white'
              }`}
            >
              <span
                className={`block text-[10px] sm:text-xs font-bold tracking-wide whitespace-nowrap ${
                  activePeak.id === 'semeru' ? 'text-neutral-950' : 'text-white'
                }`}
              >
                {PEAKS[2].name}
              </span>
              <span
                className={`block text-[8px] sm:text-[9px] font-mono ${
                  activePeak.id === 'semeru' ? 'text-neutral-800 font-semibold' : 'text-amber-300'
                }`}
              >
                {PEAKS[2].altitude}
              </span>
            </div>
          </div>

          {/* Peak 2: Gunung Widodaren */}
          <div
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-110 active:scale-95"
            style={{ top: PEAKS[3].position.top, left: PEAKS[3].position.left }}
            onClick={() => {
              setActivePeak(PEAKS[3]);
              onPeakSelect(PEAKS[3]);
            }}
          >
            <div
              className={`px-3 py-1.5 rounded-full border shadow-lg text-center transition-all ${
                activePeak.id === 'widodaren'
                  ? 'bg-amber-400 text-neutral-950 border-amber-300 ring-2 ring-amber-300/60 scale-105 shadow-amber-400/30'
                  : 'bg-black/80 hover:bg-black/95 border-white/25 text-white'
              }`}
            >
              <span
                className={`block text-[10px] sm:text-xs font-bold tracking-wide whitespace-nowrap ${
                  activePeak.id === 'widodaren' ? 'text-neutral-950' : 'text-white'
                }`}
              >
                {PEAKS[3].name}
              </span>
              <span
                className={`block text-[8px] sm:text-[9px] font-mono ${
                  activePeak.id === 'widodaren' ? 'text-neutral-800 font-semibold' : 'text-amber-300'
                }`}
              >
                {PEAKS[3].altitude}
              </span>
            </div>
          </div>

          {/* Peak 3: Gunung Bromo */}
          <div
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-110 active:scale-95"
            style={{ top: PEAKS[1].position.top, left: PEAKS[1].position.left }}
            onClick={() => {
              setActivePeak(PEAKS[1]);
              onPeakSelect(PEAKS[1]);
            }}
          >
            <div
              className={`px-3 py-1.5 rounded-full border shadow-lg text-center transition-all ${
                activePeak.id === 'bromo'
                  ? 'bg-amber-400 text-neutral-950 border-amber-300 ring-2 ring-amber-300/60 scale-105 shadow-amber-400/30'
                  : 'bg-black/80 hover:bg-black/95 border-white/25 text-white'
              }`}
            >
              <span
                className={`block text-[10px] sm:text-xs font-bold tracking-wide whitespace-nowrap ${
                  activePeak.id === 'bromo' ? 'text-neutral-950' : 'text-white'
                }`}
              >
                {PEAKS[1].name}
              </span>
              <span
                className={`block text-[8px] sm:text-[9px] font-mono ${
                  activePeak.id === 'bromo' ? 'text-neutral-800 font-semibold' : 'text-amber-300'
                }`}
              >
                {PEAKS[1].altitude}
              </span>
            </div>
          </div>

          {/* Peak 4: Gunung Batok (Framed Inset Focus Box for Desktop & Tablet) */}
          <div
            className="absolute z-20 cursor-pointer hidden sm:block"
            style={{
              top: '52%',
              left: '52%',
              width: '36%',
              maxWidth: '240px',
              height: '38%',
              maxHeight: '200px'
            }}
            onClick={() => {
              setActivePeak(PEAKS[0]);
              onPeakSelect(PEAKS[0]);
            }}
          >
            {/* Viewfinder Camera Border */}
            <div className="relative w-full h-full rounded-2xl border-2 border-amber-400/80 shadow-2xl bg-amber-500/10 transition-colors hover:border-amber-300 flex flex-col justify-end p-3 sm:p-4">
              {/* Corner focus brackets */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-amber-300" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-amber-300" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-amber-300" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-amber-300" />

              {/* Peak Tag Pill: Clean high-contrast typography */}
              <div className="mx-auto px-3 py-1.5 rounded-full bg-neutral-950/90 border border-amber-400/50 text-center shadow-lg">
                <span className="block text-xs font-bold text-white tracking-wide">
                  {PEAKS[0].name}
                </span>
                <span className="block text-[10px] text-amber-300 font-mono font-medium">
                  {PEAKS[0].altitude}
                </span>
              </div>
            </div>
          </div>

          {/* Mobile-Friendly Peak Marker for Batok (< 640px) */}
          <div
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer sm:hidden"
            style={{ top: PEAKS[0].position.top, left: PEAKS[0].position.left }}
            onClick={() => {
              setActivePeak(PEAKS[0]);
              onPeakSelect(PEAKS[0]);
            }}
          >
            <div
              className={`px-3 py-1.5 rounded-full border shadow-lg text-center transition-all ${
                activePeak.id === 'batok'
                  ? 'bg-amber-400 text-neutral-950 border-amber-300 ring-2 ring-amber-300/60 scale-105 shadow-amber-400/30'
                  : 'bg-black/80 border-white/25 text-white'
              }`}
            >
              <span
                className={`block text-[11px] font-bold tracking-wide whitespace-nowrap ${
                  activePeak.id === 'batok' ? 'text-neutral-950' : 'text-white'
                }`}
              >
                {PEAKS[0].name}
              </span>
              <span
                className={`block text-[9px] font-mono ${
                  activePeak.id === 'batok' ? 'text-neutral-800 font-semibold' : 'text-amber-300'
                }`}
              >
                {PEAKS[0].altitude}
              </span>
            </div>
          </div>

          {/* Active Peak Details Bar at Bottom (Desktop & Tablet) */}
          <div className="hidden sm:block absolute bottom-6 left-6 lg:bottom-8 lg:left-8 z-20 max-w-sm p-4 rounded-2xl bg-black/90 border border-white/20 text-white shadow-2xl">
            <div className="flex items-center gap-2 mb-1.5">
              <MountainSnow size={15} className="text-amber-400" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                {activePeak.type}
              </span>
            </div>
            <h4 className="text-sm font-semibold text-white mb-1">
              {activePeak.name} ({activePeak.altitude})
            </h4>
            <p className="text-xs text-white/70 leading-relaxed font-normal">
              {activePeak.description}
            </p>
            <button
              onClick={() => onPeakSelect(activePeak)}
              className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/25 text-white hover:text-amber-300 text-[11px] font-semibold transition-colors cursor-pointer shadow-sm"
            >
              <Crosshair size={13} className="text-amber-400" />
              <span>Explore 360° viewpoint</span>
              <ArrowUpRight size={13} />
            </button>
          </div>

          {/* Mobile Bottom Responsive Peak Switcher Bar (< 640px) */}
          <div className="sm:hidden relative z-20 p-3.5 bg-neutral-950 border-t border-white/15 space-y-3 mt-auto">
            {/* Quick selector chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {PEAKS.map((p) => {
                const isSelected = p.id === activePeak.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      setActivePeak(p);
                      onPeakSelect(p);
                    }}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-medium whitespace-nowrap transition-all ${
                      isSelected
                        ? 'bg-amber-400 text-neutral-950 font-bold shadow-md'
                        : 'bg-white/10 hover:bg-white/20 text-white/90 border border-white/15'
                    }`}
                  >
                    {p.name.replace('Gunung ', '')}
                  </button>
                );
              })}
            </div>

            {/* Mobile Compact Peak Info Card with high contrast */}
            <div className="flex items-center justify-between gap-3 text-xs text-white pt-0.5">
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-white truncate text-xs">{activePeak.name}</span>
                <span className="text-neutral-400 font-mono text-[10px]">
                  {activePeak.altitude} • {activePeak.type.split(' ')[0]}
                </span>
              </div>
              <button
                onClick={() => onPeakSelect(activePeak)}
                className="shrink-0 px-3.5 py-1.5 rounded-full bg-amber-400 text-neutral-950 hover:bg-amber-300 font-bold text-[11px] flex items-center gap-1.5 shadow-md active:scale-95 transition-transform"
              >
                <span>View Specs</span>
                <Eye size={12} className="text-neutral-950" />
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);
}
