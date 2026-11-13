'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  Sparkles,
  MoveHorizontal,
  CheckCircle,
  Clock,
  Award,
  ShieldCheck,
  ArrowRight,
  Camera,
  Check,
} from 'lucide-react';
import Image, { type StaticImageData } from 'next/image';
import regeneratedDsdBefore from '@/src/assets/images/regenerated_image_1792892471079.png';
import regeneratedDsdAfter from '@/src/assets/images/regenerated_image_1792892477865.png';
import regeneratedFluorosisBefore from '@/src/assets/images/regenerated_image_1792861233268.png';
import regeneratedFluorosisAfter from '@/src/assets/images/regenerated_image_1792861239624.png';

interface CaseStudy {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  duration: string;
  nriCase: boolean;
  aspectClass: string;
  beforeImg: StaticImageData;
  afterImg: StaticImageData;
  highlights: string[];
}

const CASES: CaseStudy[] = [
  {
    id: 'dsd-reconstruction',
    title: 'Digital Smile Design & Aesthetic Reconstruction',
    category: 'Full Mouth Rehab & Aesthetic Dentistry',
    tagline: 'Computer-Guided DSD & Precision Ceramic Restorations',
    description:
      'Verified clinical documentation of comprehensive aesthetic rehabilitation directed by Dr. Dipen Patel. Patient presented with incisal edge wear, intrinsic discoloration, and smile line asymmetry. Planned using computerized facial mapping, followed by conservative enamel preservation and custom high-translucency ceramic veneers.',
    duration: '10 Days (Fast-Track NRI Protocol)',
    nriCase: true,
    aspectClass: 'aspect-[3/2]',
    beforeImg: regeneratedDsdBefore,
    afterImg: regeneratedDsdAfter,
    highlights: [
      'Digital Facial & Midline Smile Calibration',
      'Ultra-Conservative Enamel Preparation (<0.3mm)',
      'Natural Translucent Gradient & Gingival Symmetry',
      'Zero Post-Treatment Masticatory Sensitivity',
    ],
  },
  {
    id: 'fluorosis-veneers',
    title: 'Severe Intrinsic Fluorosis & Veneer Transformation',
    category: 'Biomimetic Cosmetic Dentistry',
    tagline: 'Minimally Invasive Porcelain Laminates for Gaps & Fluorosis',
    description:
      'Clinical documentation of a young patient from Surat presenting with deep intrinsic fluorosis staining, uneven enamel banding, and irregular incisal contact points. Dr. Dipen Patel restored the full arch using 10 custom hand-crafted monolithic ceramic veneers, fully revitalizing natural tooth vitality and structural strength.',
    duration: '2 Clinical Appointments',
    nriCase: false,
    aspectClass: 'aspect-[3/2]',
    beforeImg: regeneratedFluorosisBefore,
    afterImg: regeneratedFluorosisAfter,
    highlights: [
      '100% Elimination of Deep Intrinsic Staining',
      'Preserved Over 90% of Natural Tooth Structure',
      'Biological Gingival Contouring & Papilla Integration',
      '10-Year Clinical Warranty & High-Gloss Finish',
    ],
  },
];

export default function SmileGallery({ onOpenBooking }: { onOpenBooking: (type?: 'dental' | 'physio') => void }) {
  const [selectedCase, setSelectedCase] = useState<CaseStudy>(CASES[0]);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(100, Math.max(0, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  // Global window listeners while dragging to ensure smooth continuous sliding without interruption
  useEffect(() => {
    if (!isDragging) return;

    const handleWindowMouseMove = (e: MouseEvent) => {
      updatePosition(e.clientX);
    };

    const handleWindowMouseUp = () => {
      setIsDragging(false);
    };

    const handleWindowTouchMove = (e: TouchEvent) => {
      updatePosition(e.touches[0].clientX);
    };

    const handleWindowTouchEnd = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleWindowMouseMove);
    window.addEventListener('mouseup', handleWindowMouseUp);
    window.addEventListener('touchmove', handleWindowTouchMove, { passive: true });
    window.addEventListener('touchend', handleWindowTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('mouseup', handleWindowMouseUp);
      window.removeEventListener('touchmove', handleWindowTouchMove);
      window.removeEventListener('touchend', handleWindowTouchEnd);
    };
  }, [isDragging, updatePosition]);

  return (
    <section id="transformations" className="py-24 bg-slate-950 text-white relative overflow-hidden border-t border-white/10">
      {/* Background glow highlights */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-teal-400 uppercase tracking-widest mb-2">
            <Camera className="w-4 h-4 text-teal-400" />
            <span>Verified Clinical Outcomes · Dr. Dipen Patel</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Authentic Clinical Evidence. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-white to-cyan-300">
              Zero Distortions. Pure Results.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            Drag the interactive comparison divider across genuine high-resolution medical photography documented chairside at Ansh Dental Care in Pandesara. Every before-and-after pair is calibrated at identical optical scale and angle to demonstrate true clinical precision.
          </p>
        </div>

        {/* Case Category Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900/80 backdrop-blur-md rounded-xl border border-white/10 mb-8 max-w-fit shadow-xl">
          {CASES.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedCase(item);
                setSliderPosition(50);
              }}
              className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${
                selectedCase.id === item.id
                  ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{item.title}</span>
              {item.nriCase && (
                <span className="px-1.5 py-0.5 bg-slate-950/40 text-[10px] text-teal-100 rounded font-bold uppercase tracking-wider">
                  NRI Protocol
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Interactive Comparison Split Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Draggable Before / After Container */}
          <div className="lg:col-span-8">
            <div
              ref={containerRef}
              onMouseDown={(e) => {
                setIsDragging(true);
                updatePosition(e.clientX);
              }}
              onTouchStart={(e) => {
                setIsDragging(true);
                updatePosition(e.touches[0].clientX);
              }}
              className={`relative w-full ${selectedCase.aspectClass} rounded-2xl overflow-hidden border border-white/15 bg-slate-900 select-none cursor-ew-resize shadow-2xl shadow-black/80 group touch-none`}
            >
              {/* After Image (Background Layer) */}
              <div className="absolute inset-0">
                <Image
                  src={selectedCase.afterImg}
                  alt={`${selectedCase.title} - Restored Smile After Treatment`}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                  priority
                />
                {/* After Badge */}
                <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-slate-950/85 backdrop-blur-md rounded-lg text-xs font-bold text-teal-300 border border-teal-500/40 shadow-xl flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-teal-400" />
                  <span>AFTER: Restored Aesthetic</span>
                </div>
              </div>

              {/* Before Image (Clipped Overlay Layer) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
              >
                <Image
                  src={selectedCase.beforeImg}
                  alt={`${selectedCase.title} - Initial Clinical Condition Before Treatment`}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                  priority
                />
                {/* Before Badge */}
                <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-slate-950/85 backdrop-blur-md rounded-lg text-xs font-bold text-rose-300 border border-rose-500/40 shadow-xl flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-rose-400" />
                  <span>BEFORE: Initial Condition</span>
                </div>
              </div>

              {/* Vertical Divider Line with Interactive Handle */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_14px_rgba(255,255,255,0.9)] pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-slate-950/95 border-2 border-white flex items-center justify-center text-teal-300 shadow-2xl shadow-black/90 group-hover:scale-110 transition-transform">
                  <MoveHorizontal className="w-5 h-5 text-teal-300" />
                </div>
              </div>

              {/* Interaction Hint Pill */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3.5 py-1.5 bg-slate-950/80 backdrop-blur-md border border-white/10 rounded-full text-[11px] text-slate-200 pointer-events-none flex items-center gap-1.5 shadow-lg">
                <MoveHorizontal className="w-3.5 h-3.5 text-teal-400" />
                <span>Drag divider horizontally to compare real results</span>
              </div>
            </div>

            {/* Quality & Authenticity Guarantee Note */}
            <div className="mt-3 flex items-center justify-between text-xs text-slate-400 px-1">
              <div className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Genuine Chairside Photography · Unretouched Medical Records</span>
              </div>
              <span className="hidden sm:inline font-mono text-[11px] text-slate-500">
                Calibrated 1:1 Clinical Scale
              </span>
            </div>
          </div>

          {/* Case Clinical Notes & Methodology */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-1">
                <span>{selectedCase.category}</span>
                <span aria-hidden="true">·</span>
                <span className="text-teal-400 font-semibold">{selectedCase.duration}</span>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                {selectedCase.title}
              </h3>
              <p className="text-sm font-semibold text-teal-300 mt-1">
                {selectedCase.tagline}
              </p>
              <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                {selectedCase.description}
              </p>

              {/* Clinical Highlights Checklist */}
              <div className="mt-5 space-y-2.5">
                <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                  Key Milestones Achieved:
                </p>
                {selectedCase.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <CheckCircle className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Consultation Action Callout */}
            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-400">Want similar results?</span>
                  <p className="text-sm font-semibold text-white">Book Your Smile Assessment</p>
                </div>
                <button
                  onClick={() => onOpenBooking('dental')}
                  className="px-4 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-teal-500/20"
                >
                  <span>Book Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
