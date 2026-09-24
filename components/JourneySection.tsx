'use client';

import React from 'react';
import Image from 'next/image';
import { Play, Bell, ArrowUpRight, Sparkles, Compass, Timer } from 'lucide-react';

export interface TourExperience {
  id: string;
  subtitle: string;
  title: string;
  image: string;
  tag?: string;
  description: string;
  duration: string;
  altitude: string;
  videoPreview: string;
}

export const TOUR_EXPERIENCES: TourExperience[] = [
  {
    id: 'clouds',
    subtitle: 'THE BEAUTY OF BROMO',
    title: 'Country above the clouds',
    tag: 'Most Popular',
    image: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?q=80&w=1200&auto=format&fit=crop',
    description: 'Witness the sea of clouds blanketing the ancient Tengger caldera as the morning sun paints the peaks of Batok, Bromo, and smoking Mount Semeru.',
    duration: '4 - 5 Hours (Dawn Expedition)',
    altitude: '2,770m (Penanjakan 1)',
    videoPreview: 'Sunrise Panorama at Penanjakan Viewpoint'
  },
  {
    id: 'jeep',
    subtitle: 'JEEPS GO AROUND BROMO',
    title: 'Lava Jeep Tour',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1000&auto=format&fit=crop',
    description: 'Conquer the rugged Lautan Pasir (Sea of Sand), Teletubbies Savannah, and volcanic hills in an authentic private 4x4 Toyota Land Cruiser.',
    duration: 'Full Day or Sunrise Express',
    altitude: '2,100m (Caldera Floor)',
    videoPreview: 'Off-Road 4x4 Land Cruiser Trail'
  },
  {
    id: 'hiking',
    subtitle: 'MEMORABLE EXPERIENCE',
    title: 'Hiking on Bromo',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000&auto=format&fit=crop',
    description: 'Climb the 253 concrete steps up to the active sulfur crater rim. Feel the volcanic rumble and gaze into the billowing earth steam.',
    duration: '2 Hours Trek',
    altitude: '2,329m (Crater Rim)',
    videoPreview: 'Crater Stairs Summit Trek'
  },
  {
    id: 'temple',
    subtitle: 'CULTURE AND TRADITION',
    title: 'Luhur Poten Temple',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000&auto=format&fit=crop',
    description: 'A sacred 14th-century Majapahit-rooted Hindu temple built from black volcanic stone, situated serenely in the middle of the caldera sand plain.',
    duration: '1.5 Hours Cultural Tour',
    altitude: '2,150m (Sacred Grounds)',
    videoPreview: 'Sacred Tengger Heritage & Blessing'
  },
  {
    id: 'horse',
    subtitle: 'UNFORGETTABLE EXPERIENCE',
    title: 'Bromo Horse Riding',
    image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?q=80&w=1000&auto=format&fit=crop',
    description: 'Ride alongside local Tenggerese horsemen dressed in traditional sarongs across the sweeping volcanic ash dunes of Lautan Pasir.',
    duration: '1 - 2 Hours Expedition',
    altitude: '2,150m - 2,280m',
    videoPreview: 'Tengger Caldera Horseback Trail'
  }
];

interface JourneySectionProps {
  onTourSelect: (tour: TourExperience) => void;
  onReminderClick: () => void;
  onLearnMoreClick: () => void;
}

export default function JourneySection({
  onTourSelect,
  onReminderClick,
  onLearnMoreClick
}: JourneySectionProps) {
  const [cloudsTour, jeepTour, hikingTour, templeTour, horseTour] = TOUR_EXPERIENCES;

  return (
    <section id="tour" className="w-full bg-white py-16 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 mb-10 sm:mb-14 lg:mb-16"
        >
          {/* Left Title */}
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 text-[10px] sm:text-xs font-mono uppercase tracking-wider mb-3">
              <Compass size={12} className="text-neutral-900" />
              <span>CURATED EXPEDITIONS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.18] sm:leading-[1.15]">
              The Journey Of <br className="hidden sm:inline" />
              Bromo Mountain
            </h2>
          </div>

          {/* Right Description & Buttons */}
          <div className="max-w-md lg:text-left flex flex-col gap-4 sm:gap-5">
            <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed font-normal">
              This journey offers an unforgettable experience that blends adventure, culture, and natural beauty in Bromo Tengger Semeru National Park.
            </p>

            <div className="flex items-center gap-3">
              <button
                id="journey-reserve-btn"
                onClick={onReminderClick}
                className="flex-1 sm:flex-initial min-h-[44px] px-6 py-2.5 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold tracking-wide transition-all shadow-sm active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Reserve Expedition</span>
                <ArrowUpRight size={13} className="text-amber-400" />
              </button>
              <button
                id="journey-learnmore-btn"
                onClick={onLearnMoreClick}
                className="flex-1 sm:flex-initial min-h-[44px] px-6 py-2.5 rounded-full bg-neutral-100 hover:bg-neutral-200/80 text-neutral-900 border border-neutral-200 text-xs font-semibold transition-colors shadow-sm active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Explore All Tours</span>
              </button>
            </div>
          </div>
        </div>

        {/* 5-Card Bento Grid */}
        <div className="space-y-4 sm:space-y-6">
          {/* Top Row: 2 Cards (Wide Left + Regular Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
            {/* Card 1: Country above the clouds (Large Wide) */}
            <div
              id="tour-card-clouds"
              onClick={() => onTourSelect(cloudsTour)}
              className="lg:col-span-8 relative h-[320px] sm:h-[380px] lg:h-[420px] rounded-3xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-2xl active:scale-[0.99] transition-shadow duration-300"
            >
              <Image
                src={cloudsTour.image}
                alt={cloudsTour.title}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Tag top right */}
              {cloudsTour.tag && (
                <div className="absolute top-4 sm:top-5 right-4 sm:right-5 z-10 px-3.5 sm:px-4 py-1.5 rounded-full bg-black/60 border border-white/30 text-white text-[10px] sm:text-[11px] font-semibold tracking-wider flex items-center gap-1.5 shadow-sm">
                  <Sparkles size={11} className="text-amber-300" />
                  <span>{cloudsTour.tag}</span>
                </div>
              )}

              {/* Bottom Content */}
              <div className="absolute bottom-5 sm:bottom-6 left-5 sm:left-6 right-5 sm:right-6 z-10 flex flex-col justify-end">
                <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-white/80 uppercase mb-1">
                  {cloudsTour.subtitle}
                </span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 tracking-tight">
                  {cloudsTour.title}
                </h3>

                {/* Expedition Metadata Badge */}
                <div className="flex items-center gap-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/75 border border-white/20 text-white text-[11px] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>03:30 AM Departure • Penanjakan 1 (2,770m)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Lava Jeep Tour */}
            <div
              id="tour-card-jeep"
              onClick={() => onTourSelect(jeepTour)}
              className="lg:col-span-4 relative h-[280px] sm:h-[340px] lg:h-[420px] rounded-3xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-2xl active:scale-[0.99] transition-shadow duration-300"
            >
              <Image
                src={jeepTour.image}
                alt={jeepTour.title}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

              {/* Professional Play Button Overlay */}
              <div className="absolute top-4 sm:top-5 right-4 sm:right-5 z-10 w-11 h-11 rounded-full bg-neutral-950/80 hover:bg-neutral-900 border border-white/30 flex items-center justify-center text-white transition-transform group-hover:scale-110 active:scale-90 shadow-lg">
                <Play size={14} className="fill-white translate-x-0.5" />
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-5 sm:bottom-6 left-5 sm:left-6 right-5 sm:right-6 z-10">
                <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-white/80 uppercase block mb-1">
                  {jeepTour.subtitle}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {jeepTour.title}
                </h3>
              </div>
            </div>
          </div>

          {/* Bottom Row: 3 Responsive Cards (Adapts on Tablet & Mobile) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Card 3: Hiking on Bromo */}
            <div
              id="tour-card-hiking"
              onClick={() => onTourSelect(hikingTour)}
              className="relative h-[260px] sm:h-[300px] lg:h-[350px] rounded-3xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-2xl active:scale-[0.99] transition-shadow duration-300"
            >
              <Image
                src={hikingTour.image}
                alt={hikingTour.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              <div className="absolute top-4 sm:top-5 right-4 sm:right-5 z-10 w-11 h-11 rounded-full bg-neutral-950/80 hover:bg-neutral-900 border border-white/30 flex items-center justify-center text-white transition-transform group-hover:scale-110 active:scale-90 shadow-lg">
                <Play size={13} className="fill-white translate-x-0.5" />
              </div>

              <div className="absolute bottom-5 sm:bottom-6 left-5 sm:left-6 right-5 sm:right-6 z-10">
                <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-white/80 uppercase block mb-1">
                  {hikingTour.subtitle}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  {hikingTour.title}
                </h3>
              </div>
            </div>

            {/* Card 4: Luhur Poten Temple */}
            <div
              id="tour-card-temple"
              onClick={() => onTourSelect(templeTour)}
              className="relative h-[260px] sm:h-[300px] lg:h-[350px] rounded-3xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-2xl active:scale-[0.99] transition-shadow duration-300"
            >
              <Image
                src={templeTour.image}
                alt={templeTour.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              <div className="absolute top-4 sm:top-5 right-4 sm:right-5 z-10 w-11 h-11 rounded-full bg-neutral-950/80 hover:bg-neutral-900 border border-white/30 flex items-center justify-center text-white transition-transform group-hover:scale-110 active:scale-90 shadow-lg">
                <Play size={13} className="fill-white translate-x-0.5" />
              </div>

              <div className="absolute bottom-5 sm:bottom-6 left-5 sm:left-6 right-5 sm:right-6 z-10">
                <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-white/80 uppercase block mb-1">
                  {templeTour.subtitle}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  {templeTour.title}
                </h3>
              </div>
            </div>

            {/* Card 5: Bromo Horse Riding */}
            <div
              id="tour-card-horse"
              onClick={() => onTourSelect(horseTour)}
              className="relative h-[260px] sm:h-[300px] lg:h-[350px] rounded-3xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-2xl active:scale-[0.99] transition-shadow duration-300 sm:col-span-2 lg:col-span-1"
            >
              <Image
                src={horseTour.image}
                alt={horseTour.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 33vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              <div className="absolute top-4 sm:top-5 right-4 sm:right-5 z-10 w-11 h-11 rounded-full bg-neutral-950/80 hover:bg-neutral-900 border border-white/30 flex items-center justify-center text-white transition-transform group-hover:scale-110 active:scale-90 shadow-lg">
                <Play size={13} className="fill-white translate-x-0.5" />
              </div>

              <div className="absolute bottom-5 sm:bottom-6 left-5 sm:left-6 right-5 sm:right-6 z-10">
                <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-white/80 uppercase block mb-1">
                  {horseTour.subtitle}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  {horseTour.title}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
