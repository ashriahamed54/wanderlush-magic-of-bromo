'use client';

import React from 'react';
import Image from 'next/image';
import { X, Clock, Mountain, ShieldCheck, Check, Calendar } from 'lucide-react';
import { TourExperience } from './JourneySection';

interface VideoTourModalProps {
  tour: TourExperience | null;
  onClose: () => void;
  onBookNow: (tour: TourExperience) => void;
}

export default function VideoTourModal({ tour, onClose, onBookNow }: VideoTourModalProps) {
  if (!tour) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-t-[28px] sm:rounded-3xl shadow-2xl overflow-hidden my-0 sm:my-8 border-t sm:border border-neutral-200 animate-in slide-in-from-bottom-6 sm:fade-in duration-300">
        {/* Mobile handle indicator */}
        <div className="sm:hidden w-12 h-1.5 bg-neutral-300 rounded-full mx-auto my-2" />

        {/* Visual Hero Area */}
        <div className="relative h-56 sm:h-72 w-full bg-neutral-900">
          <Image
            src={tour.image}
            alt={tour.title}
            fill
            sizes="100vw"
            className="object-cover object-center brightness-90"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-black/75 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          {/* Tag & Title */}
          <div className="absolute bottom-4 sm:bottom-5 left-5 sm:left-6 right-5 sm:right-6 z-10">
            <span className="text-[10px] font-bold tracking-[0.2em] text-white/80 uppercase block mb-1">
              {tour.subtitle}
            </span>
            <h3 className="text-xl sm:text-3xl font-bold text-white tracking-tight">
              {tour.title}
            </h3>
          </div>
        </div>

        {/* Details & Specs */}
        <div className="p-5 sm:p-8 space-y-5 sm:space-y-6 max-h-[60vh] sm:max-h-none overflow-y-auto">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
            <div className="flex items-center gap-2.5">
              <Clock size={16} className="text-neutral-500 shrink-0" />
              <div>
                <span className="block text-[10px] text-neutral-400 font-semibold uppercase">Duration</span>
                <span className="block text-xs font-bold text-neutral-900">{tour.duration}</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Mountain size={16} className="text-neutral-500 shrink-0" />
              <div>
                <span className="block text-[10px] text-neutral-400 font-semibold uppercase">Peak Altitude</span>
                <span className="block text-xs font-bold text-neutral-900">{tour.altitude}</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
              <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
              <div>
                <span className="block text-[10px] text-neutral-400 font-semibold uppercase">Safety Level</span>
                <span className="block text-xs font-bold text-emerald-700">Certified National Park Guide</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2">
              Experience Overview
            </h4>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              {tour.description}
            </p>
          </div>

          {/* Inclusions */}
          <div>
            <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-3">
              Included in this Package:
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-600">
              <li className="flex items-center gap-2">
                <Check size={14} className="text-emerald-600 shrink-0" />
                <span>Private 4x4 Toyota FJ40 allocation</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-emerald-600 shrink-0" />
                <span>Thermal down jackets & gloves</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-emerald-600 shrink-0" />
                <span>Highland hot ginger tea & coffee</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-emerald-600 shrink-0" />
                <span>National Park permits & insurance</span>
              </li>
            </ul>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              onClick={() => {
                onClose();
                onBookNow(tour);
              }}
              className="w-full py-3.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Calendar size={14} />
              <span>Book & Schedule This Experience</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
