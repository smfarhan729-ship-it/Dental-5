'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Camera, Check, Shield, Sparkles, Eye, Maximize2 } from 'lucide-react';

interface ClinicImage {
  src: string;
  title: string;
  subtitle: string;
  category: string;
}

const TOUR_ITEMS: ClinicImage[] = [
  {
    src: '/assets/aistudio/IMG_20261023_213104_6e0d20c9.jpg',
    title: 'Computerized Operatory Suite 01',
    subtitle: 'Ergonomic motorized dental chair with integrated digital display and LED operatory illumination.',
    category: 'Operatory',
  },
  {
    src: '/assets/aistudio/IMG_20261023_213045_f8768d00.jpg',
    title: 'Dual Clinical Treatment Operatories',
    subtitle: 'Parallel surgical suites equipped for simultaneous cosmetic, restorative, and pediatric procedures.',
    category: 'Treatment Suite',
  },
  {
    src: '/assets/aistudio/IMG_20261023_212148_caf3828e.jpg',
    title: 'Patient Waiting Lounge & Reception',
    subtitle: 'Air-conditioned, hygienic reception with comfortable seating and transparent treatment consultation.',
    category: 'Reception',
  },
  {
    src: '/assets/aistudio/IMG_20261023_213054_14522f00.jpg',
    title: 'Hospital-Grade Sterilization Center',
    subtitle: 'Multi-tiered autoclave sterilization, UV chambers, and sterile instrument packaging.',
    category: 'Sterilization',
  },
  {
    src: '/assets/aistudio/IMG_20261023_212516_53b2f41f.jpg',
    title: 'Ansh Dental & Physio Care Facade',
    subtitle: 'Located at B-42, Utsav Complex, GHB Main Road, near Sarvoday Sahkari Bank, Piyush Point, Pandesara.',
    category: 'Clinic Exterior',
  },
  {
    src: '/assets/aistudio/Screenshot_2026-10-23-21-29-06-79_40deb401b9ffe8e1df2f1cc5ba480b12_4a8768f1.jpg',
    title: 'Active Clinical Treatment In Progress',
    subtitle: 'Dr. Dipen Patel executing precision restorative procedure under aseptic surgical standards.',
    category: 'Clinical In Action',
  },
];

export default function ClinicTour() {
  const [selectedPhoto, setSelectedPhoto] = useState<ClinicImage | null>(null);

  return (
    <section id="tour" className="py-24 bg-slate-900/40 text-white relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-teal-400 uppercase tracking-widest mb-2">
            <Camera className="w-4 h-4 text-teal-400" />
            <span>Facility & Technology Tour</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Designed for Comfort, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-white to-cyan-300">
              Rigorous Asepsis & Precision.
            </span>
          </h2>
          <p className="mt-4 text-base text-slate-300">
            Take a visual walk through our Pandesara facility. From motorized surgical operatories to our multi-stage sterilization lab and tranquil waiting lounge.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOUR_ITEMS.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedPhoto(item)}
              className="group relative rounded-2xl overflow-hidden bg-slate-950 border border-white/10 hover:border-teal-500/40 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-teal-950/30"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                
                {/* Category Pill Badge */}
                <div className="absolute top-4 left-4 px-2.5 py-1 rounded-md bg-slate-950/70 backdrop-blur-md text-[11px] font-semibold text-teal-300 border border-teal-500/20">
                  {item.category}
                </div>

                {/* Enlarge Icon */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              {/* Caption */}
              <div className="p-5">
                <h4 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Clinical Hygiene Assurance Metrics */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-white/10 text-center">
            <span className="text-2xl font-black text-teal-300 tracking-tight">100%</span>
            <p className="text-xs text-slate-300 font-medium mt-1">Autoclaved Pouches</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950/70 border border-white/10 text-center">
            <span className="text-2xl font-black text-teal-300 tracking-tight">Zero</span>
            <p className="text-xs text-slate-300 font-medium mt-1">Cross-Infection Record</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950/70 border border-white/10 text-center">
            <span className="text-2xl font-black text-teal-300 tracking-tight">RVG</span>
            <p className="text-xs text-slate-300 font-medium mt-1">Ultra-Low Radiation X-Ray</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950/70 border border-white/10 text-center">
            <span className="text-2xl font-black text-teal-300 tracking-tight">TMJ</span>
            <p className="text-xs text-slate-300 font-medium mt-1">Dedicated Physio Unit</p>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-slate-950 rounded-2xl overflow-hidden border border-white/20 shadow-2xl"
          >
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                fill
                className="object-contain bg-black"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-6 bg-slate-900 flex items-start justify-between">
              <div>
                <span className="text-xs text-teal-400 font-semibold uppercase tracking-wider">
                  {selectedPhoto.category}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">{selectedPhoto.title}</h3>
                <p className="text-sm text-slate-300 mt-2">{selectedPhoto.subtitle}</p>
              </div>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
