'use client';

import React, { useState, useEffect } from 'react';
import { Phone, Calendar, Clock, MapPin, MessageSquare, Menu, X, Shield, Activity } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: (type?: 'dental' | 'physio') => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/85 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-600 flex items-center justify-center shadow-lg shadow-teal-500/20 group-hover:scale-105 transition-transform duration-200">
              <span className="font-black text-slate-950 text-xl tracking-tighter">A</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-white group-hover:text-teal-300 transition-colors">
                  ANSH
                </span>
                <span className="text-[10px] tracking-widest font-semibold uppercase px-1.5 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/20">
                  DENTAL & PHYSIO
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-normal">
                Dr. Dipen Patel · Pandesara, Surat
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            <a href="#experience" className="hover:text-white transition-colors">
              The Experience
            </a>
            <a href="#doctor" className="hover:text-white transition-colors">
              Dr. Dipen Patel
            </a>
            <a href="#transformations" className="hover:text-white transition-colors">
              Smile Gallery
            </a>
            <a href="#services" className="hover:text-white transition-colors">
              Specialties
            </a>
            <a href="#tour" className="hover:text-white transition-colors">
              Clinic Tour
            </a>
            <a href="#location" className="hover:text-white transition-colors">
              Location & Hours
            </a>
          </nav>

          {/* Right Action Cluster */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="tel:+919428677067"
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:text-white rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-teal-400" />
              <span>+91 94286 77067</span>
            </a>

            <button
              onClick={() => onOpenBooking()}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg shadow-md shadow-teal-500/20 transition-all hover:scale-105 active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Visit</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => onOpenBooking()}
              className="px-3 py-1.5 text-xs font-semibold text-slate-950 bg-teal-400 rounded-lg"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-lg bg-white/5"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-slate-950/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 space-y-4">
          <div className="flex items-center gap-2 text-xs text-teal-300 font-medium pb-2 border-b border-white/10">
            <Clock className="w-3.5 h-3.5" />
            <span>Open Mon-Sat: 9:00 AM – 7:30 PM (Sun Closed)</span>
          </div>

          <nav className="flex flex-col space-y-3 text-sm text-slate-200">
            <a
              href="#experience"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-teal-300 transition-colors"
            >
              Interactive 3D Experience
            </a>
            <a
              href="#doctor"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-teal-300 transition-colors"
            >
              Dr. Dipen Patel (Director Profile)
            </a>
            <a
              href="#transformations"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-teal-300 transition-colors"
            >
              Smile Transformation Gallery
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-teal-300 transition-colors"
            >
              Dental & Physio Specialties
            </a>
            <a
              href="#tour"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-teal-300 transition-colors"
            >
              Clinic Interior Tour
            </a>
            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-teal-300 transition-colors"
            >
              Pandesara Clinic Address & Directions
            </a>
          </nav>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
            <a
              href="https://wa.me/919428677067?text=Hello%20Ansh%20Dental%20Care,%20I%20would%20like%20to%20inquire%20about%20an%20appointment."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg text-xs flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Us Directly</span>
            </a>
            <a
              href="tel:+919428677067"
              className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg text-xs flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-teal-400" />
              <span>Call +91 94286 77067</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
