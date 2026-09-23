'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import JourneySection, { TourExperience } from '@/components/JourneySection';
import QuoteSection from '@/components/QuoteSection';
import VillasSection, { VillaItem } from '@/components/VillasSection';
import AerialCalderaSection, { VolcanoPeak } from '@/components/AerialCalderaSection';
import BlogSection, { BlogPost, BLOG_POSTS } from '@/components/BlogSection';
import Footer from '@/components/Footer';

import ScheduleModal from '@/components/ScheduleModal';
import VideoTourModal from '@/components/VideoTourModal';
import VillaModal from '@/components/VillaModal';
import BlogModal from '@/components/BlogModal';
import PeakDetailModal from '@/components/PeakDetailModal';
import NotificationToast from '@/components/NotificationToast';
import AuthModal from '@/components/AuthModal';

export default function Home() {
  // Modal states
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState<TourExperience | null>(null);
  const [selectedVilla, setSelectedVilla] = useState<VillaItem | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedPeak, setSelectedPeak] = useState<VolcanoPeak | null>(null);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleExploreClick = () => {
    const el = document.getElementById('tour');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setScheduleModalOpen(true);
    }
  };

  const handleReminderClick = (context = 'expedition') => {
    showToast(`Reminder scheduled! We'll alert you 48 hours before optimal sunrise viewing.`);
  };

  const handleLearnMoreClick = () => {
    const el = document.getElementById('about');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleVillaBookingConfirm = (villa: VillaItem, total: number) => {
    showToast(`Reservation confirmed for ${villa.name} ($${total}). Check your email!`);
  };

  const handleSearchSubmit = (params: { date: string; budget: string; guests: string }) => {
    showToast(`Filtered for ${params.guests} (${params.budget}) on ${params.date}.`);
  };

  return (
    <main className="min-h-screen bg-white text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* Top Navbar */}
      <Navbar onScheduleClick={() => setScheduleModalOpen(true)} />

      {/* Hero Section */}
      <Hero
        onScheduleClick={() => setScheduleModalOpen(true)}
        onExploreClick={handleExploreClick}
        onSocialClick={(platform) => showToast(`Opening Wanderlush ${platform}...`)}
      />

      {/* Journey Section ("The Journey Of Bromo Mountain") */}
      <JourneySection
        onTourSelect={(tour) => setSelectedTour(tour)}
        onReminderClick={() => setScheduleModalOpen(true)}
        onLearnMoreClick={() => {
          const el = document.getElementById('tour');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Quote / Divider Banner */}
      <QuoteSection />

      {/* Villas & Hotels Section ("A Selection Of Exceptional Villas And Hotels") */}
      <VillasSection
        onVillaSelect={(villa) => setSelectedVilla(villa)}
        onSearchSubmit={handleSearchSubmit}
      />

      {/* Interactive Caldera Aerial Explorer ("The Tengger Volcanic Chain") */}
      <AerialCalderaSection
        onPeakSelect={(peak) => setSelectedPeak(peak)}
      />

      {/* Travel Blog Around Bromo */}
      <BlogSection
        onPostSelect={(post) => setSelectedPost(post)}
        onReminderClick={() => setSelectedPost(BLOG_POSTS[0])}
        onLearnMoreClick={handleLearnMoreClick}
      />

      {/* Footer */}
      <Footer
        onSubscribe={(email) => showToast(`Thank you! ${email} has been subscribed to Wanderlush.`)}
        onLinkClick={(item) => showToast(`Navigating to ${item}...`)}
      />

      {/* Interactive Modals */}
      <ScheduleModal
        isOpen={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        onSuccessToast={(msg) => showToast(msg)}
      />

      <VideoTourModal
        tour={selectedTour}
        onClose={() => setSelectedTour(null)}
        onBookNow={(tour) => {
          setSelectedTour(null);
          setScheduleModalOpen(true);
        }}
      />

      <VillaModal
        villa={selectedVilla}
        onClose={() => setSelectedVilla(null)}
        onConfirmBooking={handleVillaBookingConfirm}
      />

      <BlogModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
        onShare={() => showToast('Article link copied to clipboard!')}
      />

      <PeakDetailModal
        peak={selectedPeak}
        onClose={() => setSelectedPeak(null)}
        onPlanTrip={() => {
          setSelectedPeak(null);
          setScheduleModalOpen(true);
        }}
      />

      {/* Toast Notification */}
      <NotificationToast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />

      {/* Global Authentication Modal */}
      <AuthModal />
    </main>
  );
}
