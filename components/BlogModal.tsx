'use client';

import React from 'react';
import Image from 'next/image';
import { X, Calendar, User, Share2 } from 'lucide-react';
import { BlogPost } from './BlogSection';

interface BlogModalProps {
  post: BlogPost | null;
  onClose: () => void;
  onShare: () => void;
}

export default function BlogModal({ post, onClose, onShare }: BlogModalProps) {
  if (!post) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-t-[28px] sm:rounded-3xl shadow-2xl overflow-hidden my-0 sm:my-8 border-t sm:border border-neutral-200 animate-in slide-in-from-bottom-6 sm:fade-in duration-300">
        {/* Mobile handle indicator */}
        <div className="sm:hidden w-12 h-1.5 bg-neutral-300 rounded-full mx-auto my-2" />

        {/* Visual Hero */}
        <div className="relative h-56 sm:h-80 w-full bg-neutral-900">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="100vw"
            className="object-cover object-center brightness-95"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-black/75 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          {/* Title and category */}
          <div className="absolute bottom-4 sm:bottom-5 left-5 sm:left-6 right-5 sm:right-6 z-10 text-white">
            <span className="text-[10px] font-bold tracking-[0.2em] text-white/80 uppercase block mb-1">
              {post.category} FEATURE
            </span>
            <h3 className="text-xl sm:text-3xl font-bold tracking-tight">
              {post.title}
            </h3>
          </div>
        </div>

        {/* Article Body */}
        <div className="p-5 sm:p-8 space-y-5 sm:space-y-6 max-h-[60vh] sm:max-h-none overflow-y-auto">
          {/* Metadata bar */}
          <div className="flex items-center justify-between pb-4 border-b border-neutral-200 text-xs text-neutral-500">
            <div className="flex items-center gap-2">
              <User size={14} />
              <span className="font-semibold text-neutral-800">
                {post.author ? post.author.name : 'Wanderlush Editorial'}
              </span>
              <span>•</span>
              <Calendar size={14} />
              <span>{post.author ? post.author.date : 'May 2024'}</span>
            </div>
            <button
              onClick={onShare}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-700 hover:text-neutral-900"
            >
              <Share2 size={13} />
              <span>Share</span>
            </button>
          </div>

          {/* Lead excerpt */}
          <p className="text-sm font-medium text-neutral-800 leading-relaxed italic bg-amber-50/60 p-4 rounded-2xl border border-amber-100">
            &ldquo;{post.excerpt}&rdquo;
          </p>

          {/* Full content */}
          <div className="text-xs sm:text-sm text-neutral-600 leading-relaxed whitespace-pre-line space-y-4">
            {post.content}
          </div>

          {/* Expedition CTA banner */}
          <div className="pt-4 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <span className="block text-xs font-bold text-neutral-900">
                Ready to witness this firsthand?
              </span>
              <span className="block text-[11px] text-neutral-500">
                Curated private sunrise tours depart daily with private 4x4.
              </span>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors shrink-0"
            >
              Close Story
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
