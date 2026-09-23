'use client';

import React, { useState } from 'react';
import { Mail, Instagram, Facebook, Youtube, Check } from 'lucide-react';

interface FooterProps {
  onSubscribe: (email: string) => void;
  onLinkClick: (title: string) => void;
}

export default function Footer({ onSubscribe, onLinkClick }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    onSubscribe(email);
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer id="contact" className="w-full bg-[#111111] text-white pt-16 sm:pt-20 pb-12 px-4 sm:px-8 lg:px-12 border-t border-neutral-900 select-none">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 mb-12 sm:mb-16">
          {/* Column 1: About */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 sm:mb-5">
              About
            </h4>
            <ul className="space-y-2.5 sm:space-y-3 text-xs text-neutral-400 font-normal">
              {['About Us', 'Blog', 'Careers', 'Jobs', 'In Press', 'Gallery'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => onLinkClick(item)}
                    className="hover:text-white transition-colors text-left py-0.5 active:scale-95"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Support */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 sm:mb-5">
              Support
            </h4>
            <ul className="space-y-2.5 sm:space-y-3 text-xs text-neutral-400 font-normal">
              {['Contact us', 'Online Chat', 'Whatsapp', 'Telegram', 'Ticketing', 'Call Center'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => onLinkClick(item)}
                    className="hover:text-white transition-colors text-left py-0.5 active:scale-95"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: FAQ */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 sm:mb-5">
              FAQ
            </h4>
            <ul className="space-y-2.5 sm:space-y-3 text-xs text-neutral-400 font-normal">
              {['Account', 'Booking', 'Payments', 'Returns', 'Privacy Policy', 'Terms & Condition'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => onLinkClick(item)}
                    className="hover:text-white transition-colors text-left py-0.5 active:scale-95"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter & Social */}
          <div className="col-span-2 md:col-span-3 lg:col-span-6 lg:pl-8 pt-4 sm:pt-0 border-t border-neutral-800 sm:border-t-0">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-2 sm:mb-3">
              Newsletter
            </h4>
            <p className="text-xs text-neutral-400 font-normal leading-relaxed mb-4 sm:mb-5 max-w-md">
              Don&apos;t miss out on the exciting world of travel — subscribe now and embark on a journey of discovery with us.
            </p>

            {/* Newsletter Input Form */}
            <form onSubmit={handleSubmit} className="relative max-w-md mb-6">
              <div className="relative flex items-center">
                <div className="absolute left-4 text-neutral-500 pointer-events-none">
                  <Mail size={15} />
                </div>
                <input
                  type="email"
                  id="newsletter-email-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full pl-10 pr-28 py-3 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600 transition-colors"
                />
                <button
                  type="submit"
                  id="newsletter-submit-btn"
                  className="absolute right-1.5 px-5 py-2 rounded-full bg-neutral-700 hover:bg-neutral-600 text-white text-xs font-semibold tracking-wide transition-colors cursor-pointer active:scale-95"
                >
                  {subscribed ? <Check size={14} className="text-emerald-400" /> : 'Submit'}
                </button>
              </div>
            </form>

            {/* Social Icons with comfortable touch targets */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => onLinkClick('Instagram')}
                className="w-10 h-10 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-neutral-300 hover:text-white transition-colors cursor-pointer active:scale-95"
                aria-label="Instagram"
              >
                <Instagram size={15} />
              </button>
              <button
                onClick={() => onLinkClick('Facebook')}
                className="w-10 h-10 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-neutral-300 hover:text-white transition-colors cursor-pointer active:scale-95"
                aria-label="Facebook"
              >
                <Facebook size={15} />
              </button>
              <button
                onClick={() => onLinkClick('YouTube')}
                className="w-10 h-10 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-neutral-300 hover:text-white transition-colors cursor-pointer active:scale-95"
                aria-label="YouTube"
              >
                <Youtube size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 sm:pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <span className="text-[11px] text-neutral-500 font-mono">
            &copy;2023 Wanderlush, All Rights Reserved
          </span>
          <span className="text-[11px] text-neutral-600">
            Tengger Caldera Sanctuary • East Java
          </span>
        </div>
      </div>
    </footer>
  );
}
