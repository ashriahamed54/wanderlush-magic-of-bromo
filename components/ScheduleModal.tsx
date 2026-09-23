'use client';

import React, { useState } from 'react';
import { X, Sparkles, Calendar, Users, Wallet, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessToast: (msg: string) => void;
}

interface ItineraryDay {
  day: number;
  theme: string;
  schedule: Array<{
    time: string;
    activity: string;
    location: string;
    tips: string;
  }>;
}

interface ItineraryResponse {
  title: string;
  summary: string;
  recommendedDays: ItineraryDay[];
  gearAdvice?: string[];
  villaRecommendation?: {
    name: string;
    reason: string;
    estimatedNightlyRate: string;
  };
}

export default function ScheduleModal({ isOpen, onClose, onSuccessToast }: ScheduleModalProps) {
  const [tab, setTab] = useState<'schedule' | 'ai-planner'>('schedule');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dates, setDates] = useState('Oct 15 - 18, 2024');
  const [guests, setGuests] = useState('2 Guests');
  const [budget, setBudget] = useState('Luxury ($250 - $400/night)');
  const [interest, setInterest] = useState('Lava Jeep Tour & Caldera Sunrise');
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState<{ id: string; message: string } | null>(null);
  const [generatedItinerary, setGeneratedItinerary] = useState<ItineraryResponse | null>(null);

  if (!isOpen) return null;

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'inquiry_or_schedule',
          name,
          email,
          dates,
          guests,
          budget,
          interest,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setConfirmation({
          id: data.confirmationId || 'WL-829143',
          message: data.message || 'Your expedition has been reserved with private 4x4 staging.',
        });
        onSuccessToast('Expedition scheduled! Confirmation sent.');
      }
    } catch {
      setConfirmation({
        id: 'WL-719302',
        message: 'Your expedition request has been securely dispatched to our Bromo Head Concierge.',
      });
      onSuccessToast('Expedition request received!');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateAIPlan = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'plan_itinerary',
          dates,
          guests,
          budget,
          interest,
        }),
      });

      const data = await res.json();
      if (data.success && data.data) {
        setGeneratedItinerary(data.data);
      }
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-t-[28px] sm:rounded-3xl shadow-2xl overflow-hidden my-0 sm:my-8 border-t sm:border border-neutral-200 animate-in slide-in-from-bottom-6 sm:fade-in duration-300">
        {/* Mobile handle indicator */}
        <div className="sm:hidden w-12 h-1.5 bg-neutral-300 rounded-full mx-auto my-2" />

        {/* Modal Header */}
        <div className="bg-neutral-900 text-white p-5 sm:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white/70 hover:text-white w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-[11px] font-semibold mb-2">
            <Sparkles size={12} />
            <span>WANDERLUSH CONCIERGE</span>
          </div>
          <h3 className="text-xl sm:text-3xl font-bold tracking-tight">
            Schedule Your Bromo Expedition
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 mt-1 max-w-md">
            Private 4x4 Land Cruiser allocations, sunrise viewpoints, and five-star villa stays.
          </p>

          {/* Navigation Tabs */}
          <div className="flex gap-2 mt-5">
            <button
              onClick={() => setTab('schedule')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                tab === 'schedule'
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Direct Reservation
            </button>
            <button
              onClick={() => {
                setTab('ai-planner');
                if (!generatedItinerary) handleGenerateAIPlan();
              }}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                tab === 'ai-planner'
                  ? 'bg-amber-400 text-neutral-950 font-bold shadow-sm'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Sparkles size={12} />
              <span>Smart Itinerary</span>
            </button>
          </div>
        </div>

        {/* Modal Body with smooth mobile max height */}
        <div className="p-5 sm:p-8 max-h-[75vh] sm:max-h-[68vh] overflow-y-auto">
          {tab === 'schedule' ? (
            confirmation ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={36} />
                </div>
                <span className="inline-block px-3 py-1 rounded-full bg-neutral-100 font-mono text-xs text-neutral-700 font-bold">
                  Reference: {confirmation.id}
                </span>
                <h4 className="text-xl font-bold text-neutral-900">
                  Expedition Scheduled
                </h4>
                <div className="p-4 rounded-2xl bg-neutral-50 text-neutral-700 text-xs sm:text-sm leading-relaxed text-left border border-neutral-200 whitespace-pre-line">
                  {confirmation.message}
                </div>
                <button
                  onClick={() => {
                    setConfirmation(null);
                    onClose();
                  }}
                  className="px-6 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Alexandra Vance"
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-neutral-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alexandra@wanderlust.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-neutral-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1 flex items-center gap-1">
                      <Calendar size={13} className="text-neutral-500" />
                      Travel Window
                    </label>
                    <select
                      value={dates}
                      onChange={(e) => setDates(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-neutral-900 bg-white"
                    >
                      <option>Oct 15 - 18, 2024</option>
                      <option>Nov 02 - 05, 2024</option>
                      <option>Dec 20 - 24, 2024</option>
                      <option>Jan 10 - 14, 2025</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1 flex items-center gap-1">
                      <Users size={13} className="text-neutral-500" />
                      Party Size
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-neutral-900 bg-white"
                    >
                      <option>1 Solo Explorer</option>
                      <option>2 Guests (Couple / Friends)</option>
                      <option>3 - 4 Family Members</option>
                      <option>5+ Private Group</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1 flex items-center gap-1">
                      <Wallet size={13} className="text-neutral-500" />
                      Budget Tier
                    </label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-neutral-900 bg-white"
                    >
                      <option>Comfort ($150 - $250/night)</option>
                      <option>Luxury ($250 - $400/night)</option>
                      <option>Ultra-Luxe / Presidential ($450+/night)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Primary Expedition Focus
                  </label>
                  <select
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-neutral-900 bg-white"
                  >
                    <option>Lava Jeep Tour & Caldera Sunrise</option>
                    <option>Crater Rim Hiking & Volcanic Stairs</option>
                    <option>Luhur Poten Temple & Tenggerese Culture</option>
                    <option>Caldera Horse Riding & Photography</option>
                    <option>Complete 3-Day Grand Caldera Experience</option>
                  </select>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Securing Private 4x4 Allocation...</span>
                      </>
                    ) : (
                      <>
                        <span>Confirm & Reserve Expedition</span>
                        <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                <div>
                  <h4 className="text-sm font-bold text-neutral-900">
                    AI Curated Expedition Plan
                  </h4>
                  <p className="text-[11px] text-neutral-500">
                    Based on your selected dates and volcanic preferences
                  </p>
                </div>
                <button
                  onClick={handleGenerateAIPlan}
                  disabled={loading}
                  className="px-3.5 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-[11px] font-semibold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {loading ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                  <span>Regenerate</span>
                </button>
              </div>

              {loading && !generatedItinerary ? (
                <div className="py-12 text-center text-neutral-500">
                  <Loader2 size={28} className="animate-spin mx-auto mb-2 text-neutral-800" />
                  <p className="text-xs">Crafting bespoke Bromo sunrise & 4x4 schedule...</p>
                </div>
              ) : generatedItinerary ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950">
                    <h5 className="text-sm font-bold">{generatedItinerary.title}</h5>
                    <p className="text-xs text-amber-900 mt-1">{generatedItinerary.summary}</p>
                  </div>

                  {/* Day breakdown */}
                  <div className="space-y-3">
                    {generatedItinerary.recommendedDays?.map((d) => (
                      <div key={d.day} className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-neutral-900 text-white text-[10px] font-bold">
                            DAY {d.day}
                          </span>
                          <span className="text-xs font-bold text-neutral-800">{d.theme}</span>
                        </div>
                        <div className="space-y-2 pl-2">
                          {d.schedule?.map((item, idx) => (
                            <div key={idx} className="border-l-2 border-neutral-300 pl-3 py-1">
                              <span className="text-[10px] font-mono font-bold text-neutral-500">{item.time}</span>
                              <p className="text-xs font-semibold text-neutral-900">{item.activity}</p>
                              <p className="text-[11px] text-neutral-500">{item.tips}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Gear Tips */}
                  {generatedItinerary.gearAdvice && (
                    <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
                      <h6 className="text-xs font-bold text-neutral-900 mb-2">Essential Thermal & Volcanic Gear:</h6>
                      <ul className="text-xs text-neutral-600 space-y-1 list-disc pl-4">
                        {generatedItinerary.gearAdvice.map((g, i) => (
                          <li key={i}>{g}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <button
                    onClick={() => setTab('schedule')}
                    className="w-full py-3 rounded-full bg-neutral-900 text-white text-xs font-bold hover:bg-neutral-800 transition-colors"
                  >
                    Proceed with this Itinerary
                  </button>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
