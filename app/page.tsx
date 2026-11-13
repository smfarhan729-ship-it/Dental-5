'use client';

import React, { useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import ScrollCanvasHero from '@/components/ScrollCanvasHero';
import SmileGallery from '@/components/SmileGallery';
import DualServiceSuite from '@/components/DualServiceSuite';
import DoctorProfile from '@/components/DoctorProfile';
import ClinicTour from '@/components/ClinicTour';
import ReviewsAndRatings from '@/components/ReviewsAndRatings';
import LocationAndFooter from '@/components/LocationAndFooter';
import BookingModal from '@/components/BookingModal';
import FloatingActions from '@/components/FloatingActions';

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingType, setBookingType] = useState<'dental' | 'physio'>('dental');
  const [selectedService, setSelectedService] = useState<string>('');
  const experienceRef = useRef<HTMLElement>(null);

  const handleOpenBooking = (type: 'dental' | 'physio' = 'dental', serviceName = '') => {
    setBookingType(type);
    setSelectedService(serviceName);
    setIsBookingOpen(true);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-teal-500/30 selection:text-teal-200 overflow-x-clip w-full max-w-full">
      {/* Top Floating Glass Navigation */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Primary Apple-Level Scroll Pinned 3D Tooth Canvas Experience */}
      <section
        id="experience"
        ref={experienceRef}
        className="relative w-full h-[260vh] sm:h-[300vh] bg-slate-950"
      >
        <ScrollCanvasHero onOpenBooking={handleOpenBooking} targetRef={experienceRef} />
      </section>

      {/* Dr. Dipen Patel Leadership & Clinical Philosophy (Directly After Hero) */}
      <DoctorProfile onOpenBooking={handleOpenBooking} />

      {/* Interactive Smile Transformation Gallery with Drag-Compare Slider */}
      <SmileGallery onOpenBooking={handleOpenBooking} />

      {/* Dual Specialty Treatment Wings (Dental & Physiotherapy) */}
      <DualServiceSuite onOpenBooking={handleOpenBooking} />

      {/* Real Clinic Photography & Operatory Facility Tour */}
      <ClinicTour />

      {/* Verified Google & Justdial Reviews Wall */}
      <ReviewsAndRatings />

      {/* Location, Corridors, Hours, Directions & Footer */}
      <LocationAndFooter onOpenBooking={handleOpenBooking} />

      {/* Dual Flow Appointment Booking Modal */}
      <BookingModal
        key={`${isBookingOpen ? 'open' : 'closed'}-${bookingType}-${selectedService}`}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialType={bookingType}
        initialServiceName={selectedService}
      />

      {/* Floating Call & WhatsApp Direct Patient Helpers */}
      <FloatingActions onOpenBooking={() => handleOpenBooking('dental')} />
    </main>
  );
}
