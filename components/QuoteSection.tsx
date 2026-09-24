'use client';

import React from 'react';
import Reveal from '@/components/Reveal';

export default function QuoteSection() {
  return (
    <section className="relative w-full bg-[#f8f9fa] py-14 sm:py-20 lg:py-28 px-5 sm:px-8 lg:px-12 overflow-hidden border-y border-neutral-200/60">
      {/* Subtle topographic contour line decorative background */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="topo-pattern" width="120" height="120" patternUnits="userSpaceOnUse">
              <path
                d="M0 40 Q30 10 60 40 T120 40 M0 80 Q30 50 60 80 T120 80 M0 120 Q30 90 60 120 T120 120 M0 0 Q30 -30 60 0 T120 0"
                fill="none"
                stroke="#000"
                strokeWidth="1.2"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#topo-pattern)" />
        </svg>
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        <Reveal>
          {/* Subtle decorative quote mark */}
          <span className="block text-3xl sm:text-4xl text-neutral-300 font-serif mb-2 select-none">
            &ldquo;
          </span>
          <blockquote className="text-base sm:text-xl md:text-2xl lg:text-3xl text-neutral-800 font-normal leading-[1.75] sm:leading-[1.65] tracking-[-0.01em]">
            The beauty of Bromo Mountain lies in its stunning landscapes, ranging from vast volcanic craters to picturesque savannahs and lush forests. The mountain is surrounded by a sea of sand, which gives it a surreal, otherworldly quality that is truly breathtaking.
          </blockquote>
          <div className="mt-5 sm:mt-7 flex items-center justify-center gap-2 text-[10px] sm:text-xs font-mono tracking-widest text-neutral-400 uppercase">
            <span>Bromo Tengger Semeru Expeditionary Record</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
