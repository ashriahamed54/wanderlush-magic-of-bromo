'use client';

import React from 'react';
import { X, Mountain, Compass, MapPin, Check } from 'lucide-react';
import { VolcanoPeak } from './AerialCalderaSection';

interface PeakDetailModalProps {
  peak: VolcanoPeak | null;
  onClose: () => void;
  onPlanTrip: () => void;
}

export default function PeakDetailModal({ peak, onClose, onPlanTrip }: PeakDetailModalProps) {
  if (!peak) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-neutral-900 text-white rounded-t-[28px] sm:rounded-3xl shadow-2xl overflow-hidden my-0 sm:my-8 border-t sm:border border-neutral-700 animate-in slide-in-from-bottom-6 sm:fade-in duration-300">
        {/* Mobile handle indicator */}
        <div className="sm:hidden w-12 h-1.5 bg-neutral-700 rounded-full mx-auto my-2" />

        {/* Header */}
        <div className="p-5 sm:p-8 bg-gradient-to-br from-neutral-800 to-neutral-950 border-b border-neutral-800 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-neutral-400 hover:text-white w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-semibold mb-2">
            <Mountain size={12} />
            <span>{peak.status}</span>
          </div>

          <h3 className="text-xl sm:text-3xl font-bold tracking-tight text-white mb-1">
            {peak.name}
          </h3>

          <div className="flex items-center gap-2 sm:gap-3 text-xs text-neutral-400">
            <span className="font-mono text-amber-300 font-bold">{peak.altitude}</span>
            <span>•</span>
            <span>{peak.type}</span>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-8 space-y-4 sm:space-y-5 text-xs sm:text-sm text-neutral-300 leading-relaxed max-h-[65vh] sm:max-h-none overflow-y-auto">
          <p>{peak.description}</p>

          {/* Geological facts */}
          <div className="p-4 rounded-2xl bg-neutral-800/80 border border-neutral-700/80 space-y-2 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-2">
              Volcanic Geological Profile
            </h4>
            <div className="flex items-center justify-between py-1 border-b border-neutral-700/50">
              <span className="text-neutral-400">Caldera Location:</span>
              <span className="text-white font-medium">Bromo Tengger Semeru National Park</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-neutral-700/50">
              <span className="text-neutral-400">Trek Elevation Gain:</span>
              <span className="text-white font-medium">+150m to +700m</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-neutral-400">Optimal Golden Hour:</span>
              <span className="text-amber-300 font-semibold">05:15 AM - 06:45 AM</span>
            </div>
          </div>

          {/* Action button */}
          <button
            onClick={() => {
              onClose();
              onPlanTrip();
            }}
            className="w-full py-3 rounded-full bg-white text-neutral-900 font-bold text-xs hover:bg-neutral-200 transition-colors"
          >
            Include {peak.name} in My Expedition
          </button>
        </div>
      </div>
    </div>
  );
}
