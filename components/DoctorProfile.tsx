'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Award, UserCheck, ShieldCheck, Heart, Stethoscope, Star, CheckCircle, ExternalLink, Maximize2, X, Sparkles } from 'lucide-react';

interface DoctorPhoto {
  src: string;
  caption: string;
  role: string;
}

const DOCTOR_PHOTOS: DoctorPhoto[] = [
  {
    src: '/assets/aistudio/dr_dipen_desk_hq.jpg',
    caption: 'Dr. Dipen Patel at his consultation desk with digital diagnostic workstation and clinical case literature.',
    role: 'Chief Consultation Office',
  },
  {
    src: '/assets/aistudio/dr_dipen_portrait_hq.jpg',
    caption: 'Dr. Dipen Patel (B.D.S) - Director & Founder of Ansh Dental And Physio Care.',
    role: 'Lead Dental Surgeon',
  },
  {
    src: '/assets/aistudio/Screenshot_2026-10-23-21-29-06-79_40deb401b9ffe8e1df2f1cc5ba480b12_4a8768f1.jpg',
    caption: 'Chairside precision endodontic and implant procedure under hospital-grade sterile protocols.',
    role: 'Active Surgery & Restoration',
  },
];

export default function DoctorProfile({ onOpenBooking }: { onOpenBooking: (type?: 'dental' | 'physio') => void }) {
  const [activePhotoModal, setActivePhotoModal] = useState<DoctorPhoto | null>(null);

  return (
    <section id="doctor" className="py-16 md:py-24 bg-slate-950 text-white relative border-t border-white/10 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Kicker */}
        <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-teal-400 uppercase tracking-widest mb-2">
          <Stethoscope className="w-4 h-4 text-teal-400" />
          <span>Clinical Leadership & Philosophy</span>
        </div>

        {/* Doctor Main Profile Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mt-6">
          {/* Photos Showcase Cluster */}
          <div className="lg:col-span-5 flex flex-col space-y-4 relative">
            {/* Main Featured Photo (Uploaded Doctor Image at Consultation Desk) */}
            <div
              onClick={() => setActivePhotoModal(DOCTOR_PHOTOS[0])}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden border-2 border-teal-500/30 bg-slate-900 shadow-2xl shadow-teal-950/40 cursor-pointer transition-all duration-300 hover:border-teal-400"
            >
              <Image
                src={DOCTOR_PHOTOS[0].src}
                alt="Dr. Dipen Patel at Consultation Desk"
                fill
                quality={99}
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-500 [image-rendering:-webkit-optimize-contrast]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex items-end justify-between p-5">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                    Featured
                  </span>
                  <h4 className="text-base font-bold text-white mt-1">Dr. Dipen Patel (B.D.S)</h4>
                  <p className="text-xs text-slate-300">Director & Chief Dental Surgeon</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-950/80 border border-white/20 flex items-center justify-center text-teal-300 opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Secondary Dual Thumbnails */}
            <div className="grid grid-cols-2 gap-4">
              <div
                onClick={() => setActivePhotoModal(DOCTOR_PHOTOS[1])}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-white/15 bg-slate-900 cursor-pointer transition-all duration-300 hover:border-teal-400"
              >
                <Image
                  src={DOCTOR_PHOTOS[1].src}
                  alt="Dr. Dipen Patel - Lead Dental Surgeon"
                  fill
                  quality={95}
                  className="object-cover group-hover:scale-105 transition-transform duration-500 [image-rendering:-webkit-optimize-contrast]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent flex items-end p-3">
                  <span className="text-[11px] font-semibold text-slate-200 group-hover:text-teal-300 transition-colors">
                    Clinical Portrait
                  </span>
                </div>
              </div>

              <div
                onClick={() => setActivePhotoModal(DOCTOR_PHOTOS[2])}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-white/15 bg-slate-900 cursor-pointer transition-all duration-300 hover:border-teal-400"
              >
                <Image
                  src={DOCTOR_PHOTOS[2].src}
                  alt="Dr. Dipen Patel Performing Procedure"
                  fill
                  quality={95}
                  className="object-cover group-hover:scale-105 transition-transform duration-500 [image-rendering:-webkit-optimize-contrast]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent flex items-end p-3">
                  <span className="text-[11px] font-semibold text-slate-200 group-hover:text-teal-300 transition-colors">
                    Chairside Surgery
                  </span>
                </div>
              </div>
            </div>

            {/* Overlapping Trust Metric Bar */}
            <div className="p-4 rounded-xl bg-slate-900/95 backdrop-blur-md border border-teal-500/25 flex items-center justify-between shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center text-teal-300 font-black text-sm">
                  10+
                </div>
                <div>
                  <p className="text-xs font-bold text-white leading-tight">Years in Pandesara</p>
                  <p className="text-[11px] text-slate-400">15,000+ Treated Smiles</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-amber-300 flex items-center justify-end gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-300" />
                  <span>4.9 ★ Rating</span>
                </p>
                <p className="text-[11px] text-slate-400">Google (160+ Reviews)</p>
              </div>
            </div>
          </div>

          {/* Bio, Philosophy & Practice Highlights */}
          <div className="lg:col-span-7 space-y-6 lg:pl-6">
            <div>
              <span className="text-xs tracking-wider uppercase text-teal-400 font-bold">
                Director & Chief Dental Surgeon
              </span>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mt-1">
                Dr. Dipen Patel <span className="text-lg sm:text-xl font-normal text-slate-400">(B.D.S)</span>
              </h3>
              <p className="text-sm text-teal-300 font-semibold mt-1 flex items-center gap-2">
                <span>Profiled on Practo</span>
                <span>·</span>
                <span>Cosmetic Dentistry & Implant Specialist</span>
              </p>
            </div>

            <p className="text-base text-slate-200 leading-relaxed font-normal">
              Directed by Dr. Dipen Patel, Ansh Dental And Physio Care has commanded a stellar reputation in Pandesara, Udhna, and throughout Surat for over a decade. Backed by advanced rotary endodontics and computerized dental implantology, Dr. Patel champions biomimetic dentistry: preserving your natural tooth structure with conservative precision, eliminating dental fear with painless techniques, and providing predictable, lifelong restorations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="p-4 rounded-xl bg-slate-900/70 border border-white/10 hover:border-teal-500/30 transition-colors">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-teal-400" />
                  <span>Class-B Multi-Stage Sterilization</span>
                </h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Hospital-grade autoclaving with hermetically sealed pouches for every patient. Zero cross-infection record.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/70 border border-white/10 hover:border-teal-500/30 transition-colors">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-teal-400" />
                  <span>NRI Full-Mouth Suite</span>
                </h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Fast-track full-mouth reconstructions and CAD/CAM Zirconia makeovers completed within visiting holiday windows.
                </p>
              </div>
            </div>

            {/* Dr. Hiral Patel Rehabilitation Wing Callout */}
            <div className="p-5 rounded-xl bg-gradient-to-r from-slate-900/90 via-slate-900 to-cyan-950/40 border border-cyan-500/25">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-cyan-400 font-bold">
                    Rehabilitation Department Head
                  </span>
                  <h4 className="text-lg font-bold text-white mt-0.5">
                    Dr. Hiral Patel <span className="text-xs font-normal text-slate-400">(BPT, MIAP)</span>
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Consultant Physiotherapist heading the physical rehabilitation wing. Dedicated to TMJ orofacial pain management, cervical & lumbar posture therapy for textile/diamond professionals, and post-operative joint rehabilitation.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <span className="inline-block px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-300 text-xs font-bold border border-cyan-500/20">
                    MIAP Certified
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                onClick={() => onOpenBooking('dental')}
                className="px-6 py-3.5 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-300 hover:to-cyan-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-xl shadow-teal-500/25 transition-all hover:scale-105 active:scale-95"
              >
                Consult Dr. Dipen Patel
              </button>
              <a
                href="https://www.practo.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 bg-white/10 hover:bg-white/15 text-slate-200 hover:text-white font-semibold rounded-xl text-xs sm:text-sm border border-white/15 transition-colors flex items-center gap-2"
              >
                <span>View Profile on Practo</span>
                <ExternalLink className="w-3.5 h-3.5 text-teal-400" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Full Resolution Photo Inspection */}
      {activePhotoModal && (
        <div
          onClick={() => setActivePhotoModal(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-slate-950 rounded-2xl overflow-hidden border border-white/20 shadow-2xl"
          >
            <div className="relative aspect-[16/11] w-full">
              <Image
                src={activePhotoModal.src}
                alt={activePhotoModal.caption}
                fill
                quality={100}
                className="object-contain bg-black"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-6 bg-slate-900 flex items-start justify-between gap-4">
              <div>
                <span className="text-xs text-teal-400 font-bold uppercase tracking-wider">
                  {activePhotoModal.role}
                </span>
                <p className="text-sm text-slate-200 mt-1 leading-relaxed">
                  {activePhotoModal.caption}
                </p>
              </div>
              <button
                onClick={() => setActivePhotoModal(null)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close photo"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
