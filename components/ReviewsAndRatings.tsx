'use client';

import React, { useState } from 'react';
import { Star, Quote, CheckCircle, ThumbsUp, ShieldCheck } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  treatment: string;
  date: string;
  comment: string;
  verified: boolean;
}

const REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Rajesh V. Patel',
    location: 'Pandesara, Surat',
    rating: 5,
    treatment: 'Dental Implants & Zirconia Bridge',
    date: 'Reviewed on Google',
    comment:
      'Dr. Dipen Patel is arguably the most honest and skilled dental surgeon in Pandesara. I was terrified of dental implants after a bad experience elsewhere, but he explained everything digitally and the implant procedure was 100% painless. Today I chew normally without any fear.',
    verified: true,
  },
  {
    id: '2',
    author: 'Pooja K. Shah',
    location: 'Laxmi Nagar, Surat',
    rating: 5,
    treatment: 'Single Sitting Root Canal (RCT)',
    date: 'Reviewed on Practo',
    comment:
      'Came to Ansh Dental with unbearable toothache on a busy Tuesday afternoon. Dr. Patel completed the root canal in just 40 minutes with computerized rotary tools. No swelling, no pain next morning. His clinic is spotlessly clean.',
    verified: true,
  },
  {
    id: '3',
    author: 'Bhavesh M. Desai',
    location: 'London, UK (NRI Patient)',
    rating: 5,
    treatment: 'Full Mouth NRI Rehabilitation',
    date: 'Reviewed on Google',
    comment:
      'During my 3-week visit to Gujarat, I got my full mouth smile reconstructed at Ansh Dental Care. Dr. Dipen coordinated appointments seamlessly. The monolithic Zirconia crowns look so natural that my colleagues in London thought I did it in Harley Street!',
    verified: true,
  },
  {
    id: '4',
    author: 'Meena Ben Sharma',
    location: 'Piyush Point, Surat',
    rating: 5,
    treatment: 'TMJ Pain & Cervical Physiotherapy',
    date: 'Reviewed on Justdial',
    comment:
      'Having both dentistry and physiotherapy in one center is a blessing. My severe jaw clicking and neck spasms were treated collaboratively by Dr. Dipen and Dr. Hiral Patel. After 6 sessions, the chronic headache and jaw stiffness vanished completely.',
    verified: true,
  },
  {
    id: '5',
    author: 'Ketan J. Chaudhari',
    location: 'Udhna Main Road, Surat',
    rating: 5,
    treatment: 'Cosmetic Smile Makeover & Teeth Whitening',
    date: 'Reviewed on Google',
    comment:
      'Got laser teeth whitening and veneer contouring done before my wedding. The results exceeded expectations. Very reasonable and transparent charges with UPI/Google Pay accepted. 100% recommended for cosmetic dental work.',
    verified: true,
  },
  {
    id: '6',
    author: 'Sanjay V. Goti',
    location: 'GHB Main Road, Surat',
    rating: 5,
    treatment: 'Knee Post-Op Physiotherapy',
    date: 'Reviewed on Google',
    comment:
      'My mother had knee replacement surgery and Dr. Hiral Patel handled her post-operative rehab with incredible patience. Her gentle mobilization exercises helped mother walk independently without walker in just one month.',
    verified: true,
  },
];

export default function ReviewsAndRatings() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredReviews =
    activeFilter === 'All'
      ? REVIEWS
      : REVIEWS.filter((r) => r.treatment.toLowerCase().includes(activeFilter.toLowerCase()));

  return (
    <section className="py-24 bg-slate-950 text-white relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Rating Overview Badge & Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-teal-400 uppercase tracking-widest mb-2">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>Verified Patient Satisfaction</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Surat&apos;s Highest Rated <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-white to-cyan-300">
                Dental & Physio Center.
              </span>
            </h2>
            <p className="mt-4 text-base text-slate-300">
              With 10+ years of dedicated practice in Pandesara, patient trust is reflected in our 4.9 ★ Google average across 160+ reviews and 5.0 ★ Justdial rating.
            </p>
          </div>

          {/* Aggregate Rating Showcase */}
          <div className="flex items-center gap-6 p-5 rounded-2xl bg-slate-900/90 border border-white/10 shadow-xl self-start lg:self-auto">
            <div className="text-center pr-6 border-r border-white/10">
              <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tighter">4.9</span>
              <div className="flex items-center justify-center gap-1 mt-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">160+ Google Reviews</p>
            </div>

            <div className="text-center">
              <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tighter">5.0</span>
              <div className="flex items-center justify-center gap-1 mt-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Justdial Rating</p>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900 rounded-xl border border-white/10 mb-8 max-w-fit">
          {['All', 'Implants', 'Root Canal', 'Cosmetic', 'Physiotherapy'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeFilter === cat
                  ? 'bg-teal-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((r) => (
            <div
              key={r.id}
              className="p-6 rounded-2xl bg-slate-900/50 border border-white/10 hover:border-teal-500/30 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header with stars & source */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">{r.date}</span>
                </div>

                <p className="text-sm text-slate-200 leading-relaxed font-normal italic">
                  &ldquo;{r.comment}&rdquo;
                </p>
              </div>

              {/* Author & Treatment */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>{r.author}</span>
                    {r.verified && <CheckCircle className="w-3.5 h-3.5 text-teal-400" />}
                  </h4>
                  <p className="text-[11px] text-slate-400">{r.location}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-semibold text-teal-400 px-2 py-0.5 rounded bg-teal-500/10 border border-teal-500/20">
                    {r.treatment.split('&')[0]}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
