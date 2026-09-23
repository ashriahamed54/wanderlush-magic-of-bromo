'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Star, MapPin, Check, ShieldCheck, Calendar, Users } from 'lucide-react';
import { VillaItem } from './VillasSection';

interface VillaModalProps {
  villa: VillaItem | null;
  onClose: () => void;
  onConfirmBooking: (villa: VillaItem, total: number) => void;
}

export default function VillaModal({ villa, onClose, onConfirmBooking }: VillaModalProps) {
  const [nights, setNights] = useState(3);
  const [guestsCount, setGuestsCount] = useState(2);
  const [booked, setBooked] = useState(false);

  if (!villa) return null;

  const subtotal = villa.price * nights;
  const taxesAndFees = Math.round(subtotal * 0.12);
  const total = subtotal + taxesAndFees;

  const handleBook = () => {
    setBooked(true);
    setTimeout(() => {
      onConfirmBooking(villa, total);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-t-[28px] sm:rounded-3xl shadow-2xl overflow-hidden my-0 sm:my-8 border-t sm:border border-neutral-200 animate-in slide-in-from-bottom-6 sm:fade-in duration-300">
        {/* Mobile handle indicator */}
        <div className="sm:hidden w-12 h-1.5 bg-neutral-300 rounded-full mx-auto my-2" />

        {/* Villa Header Image */}
        <div className="relative h-56 sm:h-72 w-full bg-neutral-900">
          <Image
            src={villa.image}
            alt={villa.name}
            fill
            sizes="100vw"
            className="object-cover object-center brightness-95"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-black/75 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          {/* Rating tag */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white text-xs font-semibold">
            <Star size={13} className="text-amber-400 fill-amber-400" />
            <span>{villa.rating.toFixed(1)} ({villa.reviewsCount} reviews)</span>
          </div>

          {/* Villa Title & Location */}
          <div className="absolute bottom-4 sm:bottom-5 left-5 sm:left-6 right-5 sm:right-6 z-10 text-white">
            <span className="text-[10px] font-bold tracking-[0.2em] text-white/80 uppercase block mb-1">
              {villa.category} Accommodation
            </span>
            <h3 className="text-xl sm:text-3xl font-bold tracking-tight mb-1">
              {villa.name}
            </h3>
            <div className="flex items-center gap-1.5 text-white/75 text-xs">
              <MapPin size={13} />
              <span>{villa.location}</span>
            </div>
          </div>
        </div>

        {/* Content & Booking details */}
        <div className="p-5 sm:p-8 space-y-5 sm:space-y-6 max-h-[60vh] sm:max-h-none overflow-y-auto">
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            {villa.description}
          </p>

          {/* Amenities */}
          <div>
            <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-3">
              Included Luxury Amenities:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-700">
              {villa.amenities.map((a, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check size={14} className="text-emerald-600 shrink-0" />
                  <span>{a}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Price Calculation Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
            <div className="grid grid-cols-2 gap-3 pb-3 border-b border-neutral-200">
              <div>
                <label className="block text-[10px] uppercase font-bold text-neutral-500 mb-1 flex items-center gap-1">
                  <Calendar size={12} /> Stay Duration
                </label>
                <select
                  value={nights}
                  onChange={(e) => setNights(Number(e.target.value))}
                  className="w-full text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-neutral-300 bg-white"
                >
                  <option value={1}>1 Night ($ {villa.price})</option>
                  <option value={2}>2 Nights ($ {villa.price * 2})</option>
                  <option value={3}>3 Nights ($ {villa.price * 3})</option>
                  <option value={4}>4 Nights ($ {villa.price * 4})</option>
                  <option value={5}>5 Nights ($ {villa.price * 5})</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-neutral-500 mb-1 flex items-center gap-1">
                  <Users size={12} /> Guests
                </label>
                <select
                  value={guestsCount}
                  onChange={(e) => setGuestsCount(Number(e.target.value))}
                  className="w-full text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-neutral-300 bg-white"
                >
                  <option value={1}>1 Guest</option>
                  <option value={2}>2 Guests</option>
                  <option value={3}>3 Guests</option>
                  <option value={4}>4 Guests</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-neutral-600">
              <div className="flex justify-between">
                <span>${villa.price} × {nights} nights</span>
                <span className="font-semibold text-neutral-900">${subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Highland taxes & resort hospitality fee</span>
                <span className="font-semibold text-neutral-900">${taxesAndFees}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-neutral-200 text-sm font-bold text-neutral-900">
                <span>Total Estimated</span>
                <span className="text-lg text-amber-700">${total}</span>
              </div>
            </div>
          </div>

          {/* Action button */}
          <button
            onClick={handleBook}
            disabled={booked}
            className="w-full py-3.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:bg-emerald-600"
          >
            {booked ? (
              <>
                <Check size={16} />
                <span>Reservation Reserved!</span>
              </>
            ) : (
              <>
                <ShieldCheck size={16} />
                <span>Confirm {villa.name} Reservation (${total})</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
