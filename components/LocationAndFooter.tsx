'use client';

import React from 'react';
import {
  MapPin,
  Phone,
  Clock,
  CreditCard,
  MessageSquare,
  Navigation,
  Shield,
  Heart,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

export default function LocationAndFooter({ onOpenBooking }: { onOpenBooking: (type?: 'dental' | 'physio') => void }) {
  return (
    <footer id="location" className="bg-slate-950 text-white border-t border-white/10 relative overflow-hidden">
      {/* Location Details & Map Guide */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Clinic Address & Hours */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="text-xs font-semibold text-teal-400 uppercase tracking-widest">
                Visit Ansh Dental & Physio Care
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-1">
                Centrally Located in Pandesara, Surat
              </h2>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                Accessible via GHB Main Road and Udhna-Navsari highway corridor. Ample parking available near Piyush Point.
              </p>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-900/60 border border-white/10">
                <MapPin className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white">Full Clinic Address</h4>
                  <p className="text-slate-300 text-xs mt-1 leading-relaxed">
                    B-42, Utsav Complex, Gujarat Housing Board (GHB) Main Road,<br />
                    Near Sarvoday Sahkari Bank, Piyush Point, Laxmi Nagar,<br />
                    Pandesara, Surat, Gujarat — 394221
                  </p>
                  <p className="text-[11px] text-teal-300 font-medium mt-1.5">
                    Landmark: Above ground floor shops, near Sarvoday Sahkari Bank
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-900/60 border border-white/10">
                <Clock className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                <div className="w-full">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-white">Clinical Hours</h4>
                    <span className="text-[10px] uppercase font-bold text-teal-300 px-2 py-0.5 bg-teal-500/10 rounded border border-teal-500/20">
                      Mon – Sat
                    </span>
                  </div>
                  <div className="mt-2 space-y-1 text-xs text-slate-300">
                    <p className="flex justify-between">
                      <span>Morning Session:</span>
                      <strong className="text-white">9:00 AM – 1:00 PM</strong>
                    </p>
                    <p className="flex justify-between">
                      <span>Evening Session:</span>
                      <strong className="text-white">4:00 PM – 7:30 PM</strong>
                    </p>
                    <p className="flex justify-between text-rose-300 pt-1 border-t border-white/5">
                      <span>Sunday:</span>
                      <span>Closed (Emergency on Call)</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-900/60 border border-white/10">
                <Phone className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white">Direct Phone & WhatsApp</h4>
                  <div className="mt-1.5 flex flex-wrap items-center gap-4 text-xs">
                    <a href="tel:+919428677067" className="text-teal-300 font-semibold hover:underline">
                      +91 94286 77067 (Primary & WhatsApp)
                    </a>
                    <a href="tel:+918238070024" className="text-slate-300 hover:text-white hover:underline">
                      +91 82380 70024 (Alternative)
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-900/60 border border-white/10">
                <CreditCard className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white">Payment Facilities</h4>
                  <p className="text-xs text-slate-300 mt-1">
                    UPI, Google Pay, PhonePe, Paytm, Cash, Credit & Debit Cards accepted. Detailed digital invoices provided for medical insurance claims.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://maps.google.com/?q=Ansh+Dental+And+Physio+Care+Pandesara+Surat"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Google Maps Directions</span>
              </a>
              <button
                onClick={() => onOpenBooking()}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs border border-white/15 transition-colors"
              >
                Book Appointment
              </button>
            </div>
          </div>

          {/* Interactive Map Embed / Corridor Guidance */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/15 bg-slate-900 relative shadow-2xl">
              <iframe
                title="Ansh Dental And Physio Care Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.282928392095!2d72.82578!3d21.14418!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04fc3d1830001%3A0x839d37bbcb9110!2sPandesara%2C%20Surat%2C%20Gujarat%20394221!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[25%] contrast-125"
              />
            </div>

            {/* Local Corridor Coverage Badge */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10">
              <h4 className="text-xs uppercase tracking-wider font-bold text-teal-400 mb-2">
                Prime Catchment Corridors in South Surat:
              </h4>
              <div className="flex flex-wrap gap-2 text-xs text-slate-300">
                <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5">Pandesara GIDC</span>
                <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5">Piyush Point</span>
                <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5">GHB Colony</span>
                <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5">Laxmi Nagar</span>
                <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5">Udhna Main Road</span>
                <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5">Bhestan</span>
                <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5">Sachin GIDC</span>
                <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5">NRI Patients (UK/US/Gulf)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Line */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Ansh Dental And Physio Care. Directed by Dr. Dipen Patel (B.D.S) & Dr. Hiral Patel (BPT, MIAP).</p>
          <div className="flex items-center gap-6">
            <span>B-42, Utsav Complex, Pandesara, Surat</span>
            <span>·</span>
            <span>PIN: 394221</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
