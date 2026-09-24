'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Star, MapPin, CalendarDays, CircleDollarSign, UsersRound, ChevronDown, Search, Sparkles, Building2 } from 'lucide-react';
import Reveal from '@/components/Reveal';

export interface VillaItem {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  category: string;
  amenities: string[];
  description: string;
}

export const VILLA_DATA: VillaItem[] = [
  {
    id: 'bromo-valley',
    name: 'Bromo Valley Villas',
    location: 'East Java, Indonesia',
    price: 280,
    rating: 4.9,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1000&auto=format&fit=crop',
    category: 'Villa',
    amenities: ['Private Sunrise Balcony', 'Outdoor Hot Tub', 'Fireplace & Heating', 'Daily 4x4 Chauffeur'],
    description: 'Perched on the rim of the Tengger caldera ridge with unobstructed panoramic vistas of Mount Batok and Bromo. Features handcrafted teakwood architecture and floor-to-ceiling glass walls.'
  },
  {
    id: 'plataran-bromo',
    name: 'Plataran Bromo',
    location: 'East Java, Indonesia',
    price: 285,
    rating: 4.9,
    reviewsCount: 218,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop',
    category: 'Resort',
    amenities: ['Highland Tea Estate', 'Artisan Restaurant', 'Heated Panoramic Pool', 'Spa & Herbal Sauna'],
    description: 'Nestled in the lush agricultural hills of Ngadiwono, Plataran Bromo combines regal Javanese heritage with contemporary alpine luxury.'
  },
  {
    id: 'jiwa-jawa',
    name: 'Jiwa Jawa Resort',
    location: 'East Java, Indonesia',
    price: 287,
    rating: 4.9,
    reviewsCount: 189,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1000&auto=format&fit=crop',
    category: 'Resort',
    amenities: ['Art Photography Gallery', 'Caldera Amphitheatre', 'Organic Farm-to-Table', 'Stargazing Telescope'],
    description: 'An eco-luxury mountain sanctuary celebrating Indonesian art, music, and nature. Located just 2,000 meters above sea level in Wonotoro.'
  },
  {
    id: 'tengger-cottage',
    name: 'Tengger Pine Cottage',
    location: 'East Java, Indonesia',
    price: 195,
    rating: 4.8,
    reviewsCount: 96,
    image: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?q=80&w=1000&auto=format&fit=crop',
    category: 'Cottage',
    amenities: ['Pine Forest View', 'Stone Fireplace', 'Alpine Terrace', 'Home-cooked Breakfast'],
    description: 'Cozy rustic alpine cottage surrounded by whispering pines, perfect for quiet seclusion after crater hikes.'
  },
  {
    id: 'lava-view-lodge',
    name: 'Lava View Eco Lodge',
    location: 'East Java, Indonesia',
    price: 220,
    rating: 4.8,
    reviewsCount: 114,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop',
    category: 'Eco Lodge',
    amenities: ['Direct Caldera Rim View', 'Solar Heating', 'Local Cultural Tour', 'Organic Coffee Bar'],
    description: 'Situated at the absolute edge of the crater rim in Cemoro Lawang with direct views of active fumaroles.'
  }
];

export const CATEGORIES = [
  'All',
  'Resort',
  'Villa',
  'Hotel',
  'Cottage',
  'Homestay',
  'Guesthouse',
  'Eco Lodge'
];

interface VillasSectionProps {
  onVillaSelect: (villa: VillaItem) => void;
  onSearchSubmit: (params: { date: string; budget: string; guests: string }) => void;
}

export default function VillasSection({ onVillaSelect, onSearchSubmit }: VillasSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDate, setSelectedDate] = useState('Oct 15 - 18');
  const [selectedBudget, setSelectedBudget] = useState('$200 - $350');
  const [selectedGuests, setSelectedGuests] = useState('2 Guests');

  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);
  const [budgetDropdownOpen, setBudgetDropdownOpen] = useState(false);
  const [guestsDropdownOpen, setGuestsDropdownOpen] = useState(false);

  const filterRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setDateDropdownOpen(false);
        setBudgetDropdownOpen(false);
        setGuestsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter villas based on active category
  const filteredVillas = selectedCategory === 'All'
    ? VILLA_DATA.slice(0, 3)
    : VILLA_DATA.filter((v) => v.category.toLowerCase() === selectedCategory.toLowerCase());

  const handleSearch = () => {
    setDateDropdownOpen(false);
    setBudgetDropdownOpen(false);
    setGuestsDropdownOpen(false);
    onSearchSubmit({
      date: selectedDate,
      budget: selectedBudget,
      guests: selectedGuests
    });
  };

  return (
    <section id="services" className="w-full bg-white py-16 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <Reveal>
          <div
            className="text-center max-w-3xl mx-auto mb-8 sm:mb-12"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 text-[10px] sm:text-xs font-mono uppercase tracking-wider mb-3">
              <Building2 size={12} className="text-neutral-900" />
              <span>EXCLUSIVE HIGHLAND SANCTUARIES</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.2]">
              A Selection Of Exceptional <br className="hidden sm:inline" />
              Villas And Hotels
            </h2>
          </div>
        </Reveal>

        {/* Search / Filter Bar */}
        <Reveal delay={80}>
          <div
            ref={filterRef}
            className="max-w-3xl mx-auto mb-8 relative z-30"
          >
          {/* Desktop & Tablet Unified Bar (hidden on small mobile < 640px) */}
          <div className="hidden sm:flex items-center justify-between p-2 rounded-full bg-white border border-neutral-200/90 shadow-lg shadow-neutral-200/50 gap-2">
            {/* Date Filter */}
            <div className="relative flex-1 min-w-[130px]">
              <button
                type="button"
                id="search-filter-date-btn"
                onClick={() => {
                  setDateDropdownOpen(!dateDropdownOpen);
                  setBudgetDropdownOpen(false);
                  setGuestsDropdownOpen(false);
                }}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-full hover:bg-neutral-50 transition-colors text-xs font-semibold text-neutral-800"
              >
                <div className="flex items-center gap-2 truncate">
                  <CalendarDays size={15} className="text-neutral-500 shrink-0" />
                  <span className="truncate">{selectedDate}</span>
                </div>
                <ChevronDown size={14} className="text-neutral-400 shrink-0 ml-1" />
              </button>

              {dateDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-52 bg-white border border-neutral-200 rounded-2xl p-2 shadow-xl z-50">
                  {['Oct 15 - 18', 'Nov 02 - 05', 'Dec 20 - 24', 'Jan 10 - 14'].map((d) => (
                    <button
                      key={d}
                      onClick={() => {
                        setSelectedDate(d);
                        setDateDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium hover:bg-neutral-100 rounded-lg text-neutral-700"
                    >
                      {d}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="w-px h-6 bg-neutral-200" />

            {/* Budget Filter */}
            <div className="relative flex-1 min-w-[130px]">
              <button
                type="button"
                id="search-filter-budget-btn"
                onClick={() => {
                  setBudgetDropdownOpen(!budgetDropdownOpen);
                  setDateDropdownOpen(false);
                  setGuestsDropdownOpen(false);
                }}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-full hover:bg-neutral-50 transition-colors text-xs font-semibold text-neutral-800"
              >
                <div className="flex items-center gap-2 truncate">
                  <CircleDollarSign size={15} className="text-neutral-500 shrink-0" />
                  <span className="truncate">{selectedBudget}</span>
                </div>
                <ChevronDown size={14} className="text-neutral-400 shrink-0 ml-1" />
              </button>

              {budgetDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-52 bg-white border border-neutral-200 rounded-2xl p-2 shadow-xl z-50">
                  {['Under $150', '$150 - $250', '$200 - $350', '$350+ Luxury'].map((b) => (
                    <button
                      key={b}
                      onClick={() => {
                        setSelectedBudget(b);
                        setBudgetDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium hover:bg-neutral-100 rounded-lg text-neutral-700"
                    >
                      {b}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="w-px h-6 bg-neutral-200" />

            {/* Guest Filter */}
            <div className="relative flex-1 min-w-[130px]">
              <button
                type="button"
                id="search-filter-guest-btn"
                onClick={() => {
                  setGuestsDropdownOpen(!guestsDropdownOpen);
                  setDateDropdownOpen(false);
                  setBudgetDropdownOpen(false);
                }}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-full hover:bg-neutral-50 transition-colors text-xs font-semibold text-neutral-800"
              >
                <div className="flex items-center gap-2 truncate">
                  <UsersRound size={15} className="text-neutral-500 shrink-0" />
                  <span className="truncate">{selectedGuests}</span>
                </div>
                <ChevronDown size={14} className="text-neutral-400 shrink-0 ml-1" />
              </button>

              {guestsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-neutral-200 rounded-2xl p-2 shadow-xl z-50">
                  {['1 Solo Traveler', '2 Guests', '3 - 4 Family', '5+ Private Group'].map((g) => (
                    <button
                      key={g}
                      onClick={() => {
                        setSelectedGuests(g);
                        setGuestsDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-medium hover:bg-neutral-100 rounded-lg text-neutral-700"
                    >
                      {g}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search CTA */}
            <button
              id="search-filter-submit-btn"
              onClick={handleSearch}
              className="px-6 py-3 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold tracking-wide transition-all duration-200 shadow-md active:scale-95 cursor-pointer shrink-0 flex items-center gap-2"
            >
              <span>Check Availability</span>
              <Search size={13} className="text-amber-400" />
            </button>
          </div>

          {/* Mobile Mature Search Card (< 640px) */}
          <div className="sm:hidden bg-white border border-neutral-200/90 rounded-2xl p-3 shadow-lg space-y-2">
            <div className="grid grid-cols-2 gap-2">
              {/* Date */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setDateDropdownOpen(!dateDropdownOpen);
                    setBudgetDropdownOpen(false);
                    setGuestsDropdownOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs font-semibold text-neutral-800"
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <CalendarDays size={13} className="text-neutral-500" />
                    <span className="truncate">{selectedDate}</span>
                  </div>
                  <ChevronDown size={12} className="text-neutral-400" />
                </button>
                {dateDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-neutral-200 rounded-xl p-1.5 shadow-xl z-50">
                    {['Oct 15 - 18', 'Nov 02 - 05', 'Dec 20 - 24', 'Jan 10 - 14'].map((d) => (
                      <button
                        key={d}
                        onClick={() => {
                          setSelectedDate(d);
                          setDateDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs hover:bg-neutral-100 rounded-lg text-neutral-700"
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Guests */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setGuestsDropdownOpen(!guestsDropdownOpen);
                    setDateDropdownOpen(false);
                    setBudgetDropdownOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs font-semibold text-neutral-800"
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <UsersRound size={13} className="text-neutral-500" />
                    <span className="truncate">{selectedGuests}</span>
                  </div>
                  <ChevronDown size={12} className="text-neutral-400" />
                </button>
                {guestsDropdownOpen && (
                  <div className="absolute top-full right-0 mt-1 w-44 bg-white border border-neutral-200 rounded-xl p-1.5 shadow-xl z-50">
                    {['1 Solo', '2 Guests', '3 - 4 Family', '5+ Group'].map((g) => (
                      <button
                        key={g}
                        onClick={() => {
                          setSelectedGuests(g);
                          setGuestsDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs hover:bg-neutral-100 rounded-lg text-neutral-700"
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Budget */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setBudgetDropdownOpen(!budgetDropdownOpen);
                  setDateDropdownOpen(false);
                  setGuestsDropdownOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs font-semibold text-neutral-800"
              >
                <div className="flex items-center gap-2 truncate">
                  <CircleDollarSign size={13} className="text-neutral-500" />
                  <span>Budget: {selectedBudget}</span>
                </div>
                <ChevronDown size={12} className="text-neutral-400" />
              </button>
              {budgetDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-neutral-200 rounded-xl p-1.5 shadow-xl z-50">
                  {['Under $150', '$150 - $250', '$200 - $350', '$350+ Luxury'].map((b) => (
                    <button
                      key={b}
                      onClick={() => {
                        setSelectedBudget(b);
                        setBudgetDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs hover:bg-neutral-100 rounded-lg text-neutral-700"
                    >
                      {b}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Submit */}
            <button
              onClick={handleSearch}
              className="w-full h-11 rounded-xl bg-neutral-950 hover:bg-neutral-900 text-white font-semibold text-xs tracking-wide flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-md"
            >
              <span>Check Available Stays</span>
              <Search size={14} className="text-amber-400" />
            </button>
          </div>
        </div>
        </Reveal>

        {/* Category Pills with smooth horizontal scrolling */}
        <Reveal delay={100}>
          <div className="relative mb-10 sm:mb-12">
            <div className="flex items-center justify-start md:justify-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-none">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    id={`cat-pill-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 sm:px-5 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 active:scale-95 ${
                      isActive
                        ? 'bg-neutral-900 text-white shadow-sm font-semibold'
                        : 'bg-neutral-100/90 text-neutral-600 hover:bg-neutral-200/80 hover:text-neutral-900'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Villa Cards Grid: Adapts cleanly on Tablet (2 cols) & Desktop (3 cols) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
          {filteredVillas.map((villa, idx) => (
            <Reveal key={villa.id} delay={(idx % 3) * 90}>
              <div
                id={`villa-card-${villa.id}`}
                onClick={() => onVillaSelect(villa)}
                className="relative h-[380px] sm:h-[400px] lg:h-[420px] rounded-3xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-2xl active:scale-[0.99] transition-shadow duration-300"
              >
                {/* Image */}
                <Image
                  src={villa.image}
                  alt={villa.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />

                {/* Gradient depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />

                {/* Star Rating Badge top right */}
                <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 border border-white/20 text-white text-xs font-semibold shadow-md">
                  <Star size={13} className="text-amber-400 fill-amber-400" />
                  <span>{villa.rating.toFixed(1)}</span>
                </div>

                {/* Bottom Info Bar Overlay */}
                <div className="absolute bottom-3.5 sm:bottom-4 left-3.5 sm:left-4 right-3.5 sm:right-4 z-10 p-4 sm:p-5 rounded-2xl bg-black/85 border border-white/15 flex items-center justify-between text-white shadow-xl">
                  <div className="pr-2 truncate">
                    <h3 className="text-base sm:text-lg font-bold tracking-tight text-white mb-0.5 truncate">
                      {villa.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-white/80 text-xs font-normal truncate">
                      <MapPin size={12} className="text-amber-400 shrink-0" />
                      <span className="truncate">{villa.location}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-lg sm:text-2xl font-bold tracking-tight text-white">
                      ${villa.price}
                    </span>
                    <span className="block text-[10px] text-white/70 font-normal">
                      / night
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
