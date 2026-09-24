'use client';

import React from 'react';
import Image from 'next/image';
import { Bell, ArrowUpRight, BookOpen, Clock, CalendarDays } from 'lucide-react';

export interface BlogPost {
  id: string;
  category: string;
  category_detail?: string;
  title: string;
  readTime?: string;
  author?: {
    name: string;
    date: string;
    avatar: string;
  };
  image: string;
  excerpt: string;
  content: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'culture-traditions',
    category: 'TRAVEL',
    title: 'Exploring Local Culture and Traditions',
    readTime: '6 min read',
    author: {
      name: 'Pambudi Smith',
      date: '10th May 2023',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
    },
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1200&auto=format&fit=crop',
    excerpt: 'The Tenggerese people of Mount Bromo are descendants of the Majapahit Empire, preserving unbroken centuries-old Hindu traditions, sacrificial ceremonies, and vibrant sacred dances.',
    content: `The Tenggerese people living on the high slopes of the caldera hold a deep spiritual reverence for Mount Bromo, whom they venerate as Brahma, the creator god in Hinduism.

During the annual Yadnya Kasada festival, thousands of pilgrims make the pre-dawn trek across the freezing Sea of Sand to toss fruit, rice, vegetables, and livestock into the smoking sulfur crater as offerings of gratitude and prosperity.

Witnessing the sacred Tari Topeng Tengger (Tengger Mask Dance) at dusk against the misty caldera cliffs provides a window into a culture that has preserved its identity for over six centuries amidst one of the world's most dramatic volcanic environments.`
  },
  {
    id: 'sea-of-sand',
    category: 'TRAVEL',
    title: 'The Beauty of the Sea of Sand',
    readTime: '4 min read',
    category_detail: 'Landscape & 4x4 Expedition',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop',
    excerpt: 'Spanning over 10 kilometers across the caldera floor, Lautan Pasir resembles the Martian surface. Here is how to experience its whispering dunes.',
    content: `Standing in the middle of Lautan Pasir (The Sea of Sand) at 2,100 meters above sea level feels like landing on another planet. As the morning mist evaporates under the high-altitude sun, the wind carries a faint whisper across the black volcanic sands—known locally as Pasir Berbisik (The Whispering Sands).

The stark contrast between the velvety volcanic ripples and the sheer amphitheater walls of the ancient Tengger caldera makes this one of the most cinematic landscapes in Southeast Asia.`
  },
  {
    id: 'sunrise-bromo',
    category: 'TRAVEL',
    title: 'Sunrise in Bromo Tengger Semeru',
    readTime: '5 min read',
    category_detail: 'Golden Hour Photography',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop',
    excerpt: 'A comprehensive guide to capturing the world-famous golden hour dawn from King Kong Hill and Penanjakan 1 viewpoints.',
    content: `At 04:30 AM, when the temperature hovers around 4°C, the Eastern horizon begins to blush in faint indigo and rose hues. 

Slowly, as the sun breaks the horizon, the thick cloud sea blankets the caldera floor, leaving only the sharp conical peaks of Gunung Batok and Bromo piercing through the mist like islands in a celestial ocean.

In the far background, Mount Semeru unleashes its clockwork puff of volcanic smoke every twenty minutes, creating a visual composition of timeless geological grandeur.`
  }
];

interface BlogSectionProps {
  onPostSelect: (post: BlogPost) => void;
  onReminderClick: () => void;
  onLearnMoreClick: () => void;
}

export default function BlogSection({
  onPostSelect,
  onReminderClick,
  onLearnMoreClick
}: BlogSectionProps) {
  const [featuredPost, post2, post3] = BLOG_POSTS;

  return (
    <section id="about" className="w-full bg-white py-16 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-12 border-t border-neutral-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 mb-10 sm:mb-14 lg:mb-16"
        >
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 text-[10px] sm:text-xs font-mono uppercase tracking-wider mb-3">
              <BookOpen size={12} className="text-neutral-900" />
              <span>STORIES & PERSPECTIVES</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.18] sm:leading-[1.15]">
              Travel Blog <br className="hidden sm:inline" />
              Around Bromo
            </h2>
          </div>

          <div className="max-w-md lg:text-left flex flex-col gap-4 sm:gap-5">
            <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed font-normal">
              This blog features captivating photography and personal field experiences, providing deep insights into local culture and inspiring travelers to explore this enchanting caldera.
            </p>

            <div className="flex items-center gap-3">
              <button
                id="blog-journal-btn"
                onClick={onReminderClick}
                className="flex-1 sm:flex-initial min-h-[44px] px-6 py-2.5 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold tracking-wide transition-all shadow-sm active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Read Field Journal</span>
                <ArrowUpRight size={13} className="text-amber-400" />
              </button>
              <button
                id="blog-learnmore-btn"
                onClick={onLearnMoreClick}
                className="flex-1 sm:flex-initial min-h-[44px] px-6 py-2.5 rounded-full bg-neutral-100 hover:bg-neutral-200/80 text-neutral-900 border border-neutral-200 text-xs font-semibold transition-colors shadow-sm active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>All Perspectives</span>
              </button>
            </div>
          </div>
        </div>

        {/* Blog Grid: 1 Large Left Card + 2 Stacked/Grid Right Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Featured Large Card (Left ~60% on desktop) */}
          <div
            id="blog-card-featured"
            onClick={() => onPostSelect(featuredPost)}
            className="lg:col-span-7 group cursor-pointer active:scale-[0.99] transition-transform"
          >
            {/* Image Container */}
            <div className="relative w-full h-[260px] sm:h-[360px] lg:h-[440px] rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-300 mb-4 sm:mb-5">
              <Image
                src={featuredPost.image}
                alt={featuredPost.title}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/75 border border-white/20 text-white text-[11px] font-medium flex items-center gap-1.5 shadow-sm">
                <Clock size={12} className="text-amber-300" />
                <span>{featuredPost.readTime}</span>
              </div>
            </div>

            {/* Content info */}
            <div>
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-neutral-400 uppercase block mb-1.5 sm:mb-2">
                {featuredPost.category}
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight group-hover:text-amber-700 transition-colors mb-3 sm:mb-4 flex items-center justify-between gap-2">
                <span>{featuredPost.title}</span>
                <ArrowUpRight size={18} className="text-neutral-400 group-hover:text-amber-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
              </h3>

              {/* Author footer */}
              {featuredPost.author && (
                <div className="flex items-center gap-3 pt-1">
                  <div className="relative w-9 sm:w-10 h-9 sm:h-10 rounded-full overflow-hidden ring-2 ring-neutral-100">
                    <Image
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-neutral-900">
                      {featuredPost.author.name}
                    </h4>
                    <span className="text-[10px] sm:text-[11px] text-neutral-400 font-normal flex items-center gap-1">
                      <CalendarDays size={11} className="text-neutral-400" />
                      <span>{featuredPost.author.date}</span>
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Stacked Cards (On Tablet sm: grid-cols-2, on Desktop lg: flex-col) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 sm:gap-7">
            {/* Top Card: The Beauty of the Sea of Sand */}
            <div
              id="blog-card-sea-of-sand"
              onClick={() => onPostSelect(post2)}
              className="group cursor-pointer active:scale-[0.99] transition-transform"
            >
              <div className="relative w-full h-[200px] sm:h-[220px] lg:h-[230px] rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-300 mb-3">
                <Image
                  src={post2.image}
                  alt={post2.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 42vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3.5 left-3.5 z-10 px-2.5 py-0.5 rounded-full bg-black/75 border border-white/20 text-white text-[10px] font-medium flex items-center gap-1 shadow-sm">
                  <Clock size={11} className="text-amber-300" />
                  <span>{post2.readTime}</span>
                </div>
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-neutral-400 uppercase block mb-1">
                {post2.category}
              </span>
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-neutral-900 tracking-tight group-hover:text-amber-700 transition-colors flex items-center justify-between gap-1.5">
                <span>{post2.title}</span>
                <ArrowUpRight size={16} className="text-neutral-400 group-hover:text-amber-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
              </h3>
            </div>

            {/* Bottom Card: Sunrise in Bromo Tengger Semeru */}
            <div
              id="blog-card-sunrise-bromo"
              onClick={() => onPostSelect(post3)}
              className="group cursor-pointer active:scale-[0.99] transition-transform"
            >
              <div className="relative w-full h-[200px] sm:h-[220px] lg:h-[230px] rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-300 mb-3">
                <Image
                  src={post3.image}
                  alt={post3.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 42vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3.5 left-3.5 z-10 px-2.5 py-0.5 rounded-full bg-black/75 border border-white/20 text-white text-[10px] font-medium flex items-center gap-1 shadow-sm">
                  <Clock size={11} className="text-amber-300" />
                  <span>{post3.readTime}</span>
                </div>
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-neutral-400 uppercase block mb-1">
                {post3.category}
              </span>
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-neutral-900 tracking-tight group-hover:text-amber-700 transition-colors flex items-center justify-between gap-1.5">
                <span>{post3.title}</span>
                <ArrowUpRight size={16} className="text-neutral-400 group-hover:text-amber-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
