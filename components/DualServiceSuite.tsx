'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Activity,
  Shield,
  Layers,
  HeartPulse,
  Syringe,
  Smile,
  Zap,
  Check,
  Calendar,
  ChevronRight,
  Stethoscope,
  Bone,
  UserCheck,
} from 'lucide-react';

interface DualServiceSuiteProps {
  onOpenBooking: (type?: 'dental' | 'physio', serviceName?: string) => void;
}

interface ServiceItem {
  id: string;
  name: string;
  badge?: string;
  description: string;
  benefits: string[];
  duration: string;
  idealFor: string;
}

const DENTAL_SERVICES: ServiceItem[] = [
  {
    id: 'implants',
    name: 'Premium Dental Implant Suite',
    badge: 'Flagship Surgical Suite',
    description:
      'Permanently replace single, multiple, or full arch missing teeth with Grade-V Titanium & monolithic Zirconia osseointegrated restorations.',
    benefits: ['Computerized 3D surgical guide planning', 'Lifetime osseointegration support', 'Prevents jaw bone loss & facial sagging'],
    duration: '2 Stages or Immediate Load',
    idealFor: 'Missing teeth, loose dentures, NRI rehabilitation',
  },
  {
    id: 'smile-design',
    name: 'Cosmetic Dentistry & Porcelain Veneers',
    badge: 'Popular Aesthetic',
    description:
      'Digital Smile Designing (DSD) using custom handcrafted ceramic laminates, composite contouring, and alignment correction.',
    benefits: ['Ultra-conservative tooth prep (<0.3mm)', 'Fixes deep fluorosis, chips & spacing', 'Natural high-translucency aesthetic'],
    duration: '2 to 3 Visits',
    idealFor: 'Stained teeth, gaps, uneven smile, bridal makeovers',
  },
  {
    id: 'rotary-rct',
    name: 'Single-Sitting Rotary Root Canal (RCT)',
    badge: 'Painless Care',
    description:
      'Save deeply infected or painful teeth with computerized rotary files and apex locators in a single 45-minute painless session.',
    benefits: ['Zero manual file trauma', 'Hermetic 3D gutta-percha apex seal', 'Immediate relief from acute throbbing pain'],
    duration: 'Single 45-min Visit',
    idealFor: 'Severe toothache, trauma, pulpitis, fractured crowns',
  },
  {
    id: 'zirconia-crowns',
    name: 'Monolithic CAD/CAM Zirconia Crowns',
    description:
      'Metal-free digital precision crowns designed with sub-millimeter margin accuracy to protect root canal treated or fractured teeth.',
    benefits: ['100% biocompatible, no black gum margins', 'Diamond-grade chewing strength', 'Natural shade matching with adjacent enamel'],
    duration: '2 Visits',
    idealFor: 'Post-RCT protection, broken teeth, bridge replacement',
  },
  {
    id: 'laser-whitening',
    name: 'In-Office Power Laser Teeth Whitening',
    description:
      'Clinically administered deep enamel oxidation removing years of tea, coffee, and tobacco stains in just 45 minutes.',
    benefits: ['Up to 6–8 shades whiter in one visit', 'Enamel-safe desensitizing agents', 'Long-lasting radiant results'],
    duration: '45 Minutes',
    idealFor: 'Discolored teeth, special events, tobacco/tea stains',
  },
  {
    id: 'invisible-aligners',
    name: 'Clear Aligners & Orthodontic Care',
    description:
      'Straighten crooked, crowded, or forwardly placed teeth using discreet, removable transparent trays or aesthetic ceramic braces.',
    benefits: ['Virtually invisible, no metal brackets', 'Removable for eating and brushing', 'Predictable 3D progress simulation'],
    duration: '6 to 18 Months',
    idealFor: 'Teeth crowding, crossbite, open bite, gap closure',
  },
];

const PHYSIO_SERVICES: ServiceItem[] = [
  {
    id: 'tmj-facial',
    name: 'TMJ & Orofacial Pain Rehabilitation',
    badge: 'Integrated Dental-Physio',
    description:
      'Comprehensive jaw joint mobilization, myofascial trigger release, and neuromuscular re-education for clicking, locked jaw, and bruxism.',
    benefits: ['Relieves chronic jaw clicking & earaches', 'Restores natural mouth opening range', 'Direct collaboration with Dr. Dipen Patel'],
    duration: 'Custom Treatment Plan',
    idealFor: 'Jaw clenching, TMJ arthralgia, head & neck posture pain',
  },
  {
    id: 'spine-cervical',
    name: 'Cervical & Lumbar Spine Therapy',
    badge: 'Occupational Specialist',
    description:
      'Targeted spinal decompression, posture correction, and core stabilization for diamond/textile industry workers and office executives.',
    benefits: ['Sciatica & slip disc management', 'Cervical spondylosis pain relief', 'Ergonomic workplace counseling'],
    duration: 'Individualized Sessions',
    idealFor: 'Neck stiffness, lower back spasms, radiating arm pain',
  },
  {
    id: 'ortho-post-op',
    name: 'Orthopedic & Joint Post-Surgical Rehab',
    description:
      'Evidence-based rehabilitation protocols following Knee Replacement (TKR), Hip Replacement, ACL reconstruction, or fracture healing.',
    benefits: ['Prevents joint contractures & stiffness', 'Rapid gait & mobility retraining', 'Pain modulation with advanced electrotherapy'],
    duration: '2 to 6 Weeks Protocols',
    idealFor: 'Post-fracture, post-knee replacement, ligament tears',
  },
  {
    id: 'sports-injury',
    name: 'Sports Injury Recovery & Kinesiology',
    description:
      'Specialized athletic rehabilitation for sprains, muscle strains, rotator cuff injuries, and tendonitis using kinesio-taping & dynamic exercise.',
    benefits: ['Accelerated tissue remodeling', 'Functional strength re-establishment', 'Injury recurrence prevention'],
    duration: 'Sport-Specific Cadence',
    idealFor: 'Athletes, gym injuries, runner’s knee, frozen shoulder',
  },
  {
    id: 'neuro-physio',
    name: 'Neurological Rehabilitation (Stroke / Bell’s Palsy)',
    description:
      'Neuro-developmental therapy and facial nerve re-education for patients recovering from stroke, paralysis, neuropathy, or facial palsy.',
    benefits: ['Facial muscle symmetry re-education', 'Balance & proprioception training', 'Compassionate family home-exercise guidance'],
    duration: 'Structured Milestone Plan',
    idealFor: 'Bell’s palsy, hemiplegia, Parkinsonism, neuropathy',
  },
  {
    id: 'geriatric-mobility',
    name: 'Geriatric Balance & Arthritis Management',
    description:
      'Gentle therapeutic programs designed for senior citizens in Pandesara to relieve osteoarthritis pain, prevent falls, and sustain daily independence.',
    benefits: ['Gentle aquatic/isometric protocols', 'Fall prevention balance drills', 'Safe medication-free pain relief'],
    duration: 'Ongoing Wellness',
    idealFor: 'Knee osteoarthritis, elderly stiffness, balance issues',
  },
];

export default function DualServiceSuite({ onOpenBooking }: DualServiceSuiteProps) {
  const [activeTab, setActiveTab] = useState<'dental' | 'physio'>('dental');

  const services = activeTab === 'dental' ? DENTAL_SERVICES : PHYSIO_SERVICES;

  return (
    <section id="services" className="py-24 bg-slate-900/60 text-white relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-teal-400 uppercase tracking-widest mb-2">
              <Layers className="w-4 h-4 text-teal-400" />
              <span>Integrated Clinical Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Two Specialized Wings. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-white to-cyan-300">
                One Center of Excellence.
              </span>
            </h2>
            <p className="mt-4 text-base text-slate-300">
              Serving the Pandesara, Udhna, and broader Surat corridors with cutting-edge surgical dentistry and physician-directed physical rehabilitation under one roof.
            </p>
          </div>

          {/* Interactive Dual Wing Switcher Tabs (Valid interactive filter control) */}
          <div className="flex items-center p-1.5 bg-slate-950 rounded-xl border border-white/10 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('dental')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'dental'
                  ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smile className="w-4 h-4" />
              <span>Dental Care (Dr. Dipen Patel)</span>
            </button>
            <button
              onClick={() => setActiveTab('physio')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'physio'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Physiotherapy & Rehab</span>
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="p-7 rounded-2xl bg-slate-950/70 border border-white/10 hover:border-teal-500/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-950/20"
            >
              <div>
                {/* Clean unboxed metadata kicker */}
                <div className="flex items-center justify-between text-xs text-slate-400 font-medium mb-3">
                  <span className="text-teal-400 font-semibold">{service.badge || (activeTab === 'dental' ? 'Dental' : 'Physiotherapy')}</span>
                  <span aria-hidden="true">·</span>
                  <span>{service.duration}</span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-teal-300 transition-colors tracking-tight">
                  {service.name}
                </h3>

                <p className="mt-3 text-sm text-slate-300 font-normal leading-relaxed">
                  {service.description}
                </p>

                {/* Key clinical benefits */}
                <div className="mt-5 space-y-2 border-t border-white/5 pt-4">
                  {service.benefits.map((b, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <Check className="w-3.5 h-3.5 text-teal-400 mt-0.5 flex-shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer: Ideal For & Direct Booking CTA */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="text-[11px] text-slate-400 max-w-[65%] truncate">
                  <span className="font-medium text-slate-300">For: </span>
                  {service.idealFor}
                </div>

                <button
                  onClick={() => onOpenBooking(activeTab, service.name)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-teal-500 hover:text-slate-950 text-xs font-semibold text-slate-200 transition-colors flex items-center gap-1"
                >
                  <span>Book</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Corridor SEO & Consultation Prompt Banner */}
        <div className="mt-12 p-6 md:p-8 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-teal-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h4 className="text-lg md:text-xl font-bold text-white tracking-tight">
              Capturing High-Precision Care in Pandesara & Udhna Corridors
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
              Located conveniently at Piyush Point, near Sarvoday Sahkari Bank on GHB Main Road. Fully equipped for advanced same-day surgical consults and TMJ/cervical physiotherapy assessments.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => onOpenBooking(activeTab)}
              className="w-full md:w-auto px-6 py-3 bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-lg shadow-teal-500/20 transition-all hover:scale-105 active:scale-95 text-center"
            >
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
