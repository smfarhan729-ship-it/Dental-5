'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  Calendar,
  Clock,
  User,
  Phone,
  Smile,
  Activity,
  CheckCircle2,
  MessageSquare,
  Sparkles,
  MapPin,
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: 'dental' | 'physio';
  initialServiceName?: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  initialType = 'dental',
  initialServiceName = '',
}: BookingModalProps) {
  const [treatmentType, setTreatmentType] = useState<'dental' | 'physio'>(initialType);
  const [selectedService, setSelectedService] = useState(initialServiceName);
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [area, setArea] = useState('Pandesara, Surat');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('10:00 AM - 11:00 AM');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // State initialized directly from props when modal is keyed/mounted

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#2dd4bf', '#06b6d4', '#38bdf8', '#ffffff'],
      });
    } catch {
      // Ignore if canvas-confetti is not loaded
    }

    setIsSubmitted(true);
  };

  const getWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `Hello Ansh Dental & Physio Care,\nI would like to confirm my appointment:\n\n• Patient: ${patientName}\n• Phone: ${phone}\n• Department: ${
        treatmentType === 'dental' ? 'Dental (Dr. Dipen Patel)' : 'Physiotherapy (Dr. Hiral Patel)'
      }\n• Treatment: ${selectedService || 'General Consultation'}\n• Preferred Date: ${date || 'Earliest Available'}\n• Slot: ${timeSlot}\n• Area: ${area}\n${
        notes ? `• Notes: ${notes}\n` : ''
      }\nPlease confirm the slot. Thank you!`
    );
    return `https://wa.me/919428677067?text=${text}`;
  };

  const resetForm = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div 
      onClick={resetForm}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl bg-slate-900 border border-white/20 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden my-auto sm:my-8 max-h-[calc(100dvh-1.5rem)] sm:max-h-none flex flex-col"
      >
        {/* Header bar */}
        <div className="p-4 sm:p-6 bg-slate-950 border-b border-white/10 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 pr-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-teal-500/20 flex items-center justify-center text-teal-400 flex-shrink-0">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight truncate">
                {isSubmitted ? 'Appointment Reserved' : 'Book Direct Consultation'}
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-400 truncate">
                Ansh Dental & Physio Care · Dr. Dipen Patel (Pandesara, Surat)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={resetForm}
            className="p-2.5 sm:p-2 rounded-xl bg-white/10 sm:bg-transparent text-slate-300 hover:text-white hover:bg-white/15 transition-colors flex-shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {isSubmitted ? (
          <div className="p-6 sm:p-8 text-center space-y-5 sm:space-y-6 overflow-y-auto flex-1">
            <div className="w-16 h-16 mx-auto rounded-full bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-2xl font-bold text-white">Your Request is Registered!</h4>
              <p className="text-sm text-slate-300 mt-2 max-w-md mx-auto">
                Thank you, <strong className="text-white">{patientName}</strong>. Our front desk at B-42 Utsav Complex, Pandesara has logged your preferred slot for{' '}
                <span className="text-teal-300 font-semibold">{timeSlot}</span> on{' '}
                <span className="text-teal-300 font-semibold">{date || 'Next Working Day'}</span>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-white/10 text-left text-xs space-y-2 max-w-md mx-auto">
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-500">Service:</span>
                <span className="font-semibold text-white">{selectedService || 'Consultation'}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-500">Practitioner:</span>
                <span className="font-semibold text-white">
                  {treatmentType === 'dental' ? 'Dr. Dipen Patel (B.D.S)' : 'Dr. Hiral Patel (BPT, MIAP)'}
                </span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-500">Location:</span>
                <span className="text-white">Piyush Point, GHB Main Road, Surat</span>
              </div>
            </div>

            {/* Direct WhatsApp Action for Instant 1-Tap Confirmation */}
            <div className="space-y-3 pt-2">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl shadow-emerald-950/50 flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Confirm on WhatsApp Instantly</span>
              </a>

              <p className="text-[11px] text-slate-400">
                Direct helpline: <a href="tel:+919428677067" className="text-teal-400 font-semibold underline">+91 94286 77067</a> (UPI & Google Pay accepted)
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 sm:p-8 space-y-4 sm:space-y-5 overflow-y-auto flex-1 overscroll-contain">
            {/* Department Toggle (Dual Booking Flow) */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Select Department & Practitioner
              </label>
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setTreatmentType('dental')}
                  className={`p-2.5 sm:p-3.5 rounded-xl border text-left flex items-start gap-2 sm:gap-3 transition-all ${
                    treatmentType === 'dental'
                      ? 'bg-teal-500/15 border-teal-400 text-white shadow-sm'
                      : 'bg-slate-950/60 border-white/10 text-slate-400 hover:text-white hover:bg-slate-950'
                  }`}
                >
                  <Smile className={`w-5 h-5 mt-0.5 ${treatmentType === 'dental' ? 'text-teal-400' : 'text-slate-500'}`} />
                  <div>
                    <p className="text-sm font-bold leading-tight">Dental Care</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Dr. Dipen Patel (B.D.S)</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setTreatmentType('physio')}
                  className={`p-2.5 sm:p-3.5 rounded-xl border text-left flex items-start gap-2 sm:gap-3 transition-all ${
                    treatmentType === 'physio'
                      ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-sm'
                      : 'bg-slate-950/60 border-white/10 text-slate-400 hover:text-white hover:bg-slate-950'
                  }`}
                >
                  <Activity className={`w-5 h-5 mt-0.5 ${treatmentType === 'physio' ? 'text-cyan-400' : 'text-slate-500'}`} />
                  <div>
                    <p className="text-sm font-bold leading-tight">Physiotherapy</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Dr. Hiral Patel (BPT)</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Treatment Category */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Treatment Concern / Service
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-teal-400 transition-colors"
              >
                {treatmentType === 'dental' ? (
                  <>
                    <option value="">General Dental Consultation & Examination</option>
                    <option value="Dental Implants & Replacement">Dental Implants & Permanent Replacement</option>
                    <option value="Full Mouth Rehabilitation (NRI / Complex)">Full Mouth Reconstruction (NRI / Complex)</option>
                    <option value="Single Sitting Root Canal (RCT)">Single-Sitting Root Canal (Painless RCT)</option>
                    <option value="Cosmetic Smile Designing & Veneers">Cosmetic Smile Designing & Porcelain Veneers</option>
                    <option value="Zirconia Crown & Bridge">Monolithic Zirconia Crown / Ceramic Bridge</option>
                    <option value="Teeth Whitening & Cleaning">Teeth Whitening & Scaling / Polishing</option>
                    <option value="Clear Aligners / Orthodontics">Clear Aligners & Teeth Straightening</option>
                  </>
                ) : (
                  <>
                    <option value="">General Physiotherapy Assessment</option>
                    <option value="TMJ & Jaw Pain Rehabilitation">TMJ Jaw Pain & Orofacial Dysfunction</option>
                    <option value="Cervical Spondylosis & Neck Pain">Cervical Spondylosis & Neck Stiffness</option>
                    <option value="Lower Back & Sciatica Therapy">Lower Back Pain, Slip Disc & Sciatica</option>
                    <option value="Post-Op Joint Rehab (Knee/Hip)">Post-Operative Joint Rehab (Knee/Hip Replacement)</option>
                    <option value="Bell's Palsy & Neuro Physiotherapy">Bell&apos;s Palsy & Neurological Rehabilitation</option>
                    <option value="Sports Injury & Shoulder Rehab">Sports Injury & Shoulder / Tendon Recovery</option>
                  </>
                )}
              </select>
            </div>

            {/* Patient Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Patient Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="e.g. Ramesh Patel"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-teal-400 placeholder:text-slate-600 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  WhatsApp / Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 94286..."
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-teal-400 placeholder:text-slate-600 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Date & Time Slot (Matching 9:00 AM - 7:30 PM clinic hours) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Preferred Date (Mon–Sat)
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-teal-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Operating Time Slot
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-teal-400 transition-colors"
                >
                  <optgroup label="Morning Session (9:00 AM - 1:00 PM)">
                    <option value="09:30 AM - 10:30 AM">09:30 AM – 10:30 AM</option>
                    <option value="10:30 AM - 11:30 AM">10:30 AM – 11:30 AM</option>
                    <option value="11:30 AM - 12:30 PM">11:30 AM – 12:30 PM</option>
                  </optgroup>
                  <optgroup label="Evening Session (4:00 PM - 7:30 PM)">
                    <option value="04:30 PM - 05:30 PM">04:30 PM – 05:30 PM</option>
                    <option value="05:30 PM - 06:30 PM">05:30 PM – 06:30 PM</option>
                    <option value="06:30 PM - 07:30 PM">06:30 PM – 07:30 PM</option>
                  </optgroup>
                </select>
              </div>
            </div>

            {/* Area / Patient Origin */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Area / City / Patient Category
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="e.g. Pandesara, Udhna, Laxmi Nagar, or NRI (UK/US)"
                  className="w-full pl-9 pr-3.5 py-2.5 bg-slate-950 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-teal-400 placeholder:text-slate-600 transition-colors"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-bold text-sm shadow-xl shadow-teal-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Confirm Appointment Slot</span>
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="sm:hidden w-full mt-2.5 py-2.5 px-4 rounded-xl text-slate-400 hover:text-white text-xs font-medium border border-white/10 hover:bg-white/5 transition-colors"
              >
                Cancel and Close
              </button>
              <p className="text-center text-[11px] text-slate-500 mt-2">
                No advance booking fee · Sunday Closed · Walk-in emergency slots available
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
