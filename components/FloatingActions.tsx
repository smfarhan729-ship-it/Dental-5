'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, Phone, Calendar, ArrowUp } from 'lucide-react';

interface FloatingActionsProps {
  onOpenBooking: () => void;
}

export default function FloatingActions({ onOpenBooking }: FloatingActionsProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setHasScrolled(window.scrollY > 150);
      setShowScrollTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!hasScrolled) return null;

  return (
    <aside aria-label="Quick contact and navigation" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto transition-opacity duration-300">
      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/20 flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Direct Call Button */}
      <a
        href="tel:+919428677067"
        className="hidden sm:flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-white/20 text-xs font-semibold shadow-xl transition-all hover:scale-105 active:scale-95"
      >
        <Phone className="w-4 h-4 text-teal-400" />
        <span>+91 94286 77067</span>
      </a>

      {/* Floating WhatsApp Action with Glow Pulse */}
      <a
        href="https://wa.me/919428677067?text=Hello%20Dr.%20Dipen%20Patel,%20I%20would%20like%20to%20consult%20regarding%20dental/physio%20treatment%20at%20Ansh%20Care."
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-2xl shadow-emerald-950/60 transition-all hover:scale-105 active:scale-95"
      >
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
        <MessageSquare className="w-5 h-5 fill-white" />
        <span className="hidden sm:inline">WhatsApp Clinic</span>
      </a>
    </aside>
  );
}
