'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Rajesh Kumar Sharma',
    batch: 'B.A. 2015',
    role: 'Civil Services Officer, IAS',
    quote: 'NREC College gave me not just knowledge, but the discipline and perspective I needed to serve the nation. The faculty here are dedicated mentors who guide you at every step.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Priya Singh',
    batch: 'M.Sc. 2018',
    role: 'Research Scientist, DRDO',
    quote: 'The science laboratories and the quality of teaching at NREC College prepared me for competitive research. I owe my career to the foundation built here.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Amit Verma',
    batch: 'B.Com. 2012',
    role: 'Chartered Accountant, Mumbai',
    quote: 'From the commerce department to the world of finance — NREC College shaped my analytical skills and work ethic. A college that truly cares about every student.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Sunita Devi',
    batch: 'B.Ed. 2020',
    role: 'Senior Teacher, KV School',
    quote: 'The B.Ed programme at NREC is outstanding. The practical training and guidance from faculty transformed me into a confident educator.',
    rating: 5,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((current - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((current + 1) % testimonials.length);

  const t = testimonials[current];

  return (
    <section
      className="relative overflow-hidden section-py"
      style={{ background: 'linear-gradient(135deg, #F9F9F9 0%, #fff 100%)' }}
    >
      <div className="container-nrec">
        <div className="text-center mb-14">
          <span className="section-label">Alumni Speak</span>
          <h2 className="section-title">What Our Alumni Say</h2>
          <div className="divider-accent mx-auto" />
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-[#E7E7E7]">
            {/* Heritage accent */}
            <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl bg-gradient-to-r from-[#990A25] to-[#C6A04D]" />

            {/* Quote icon */}
            <Quote className="text-[#990A25]/15 w-16 h-16 mb-4" />

            {/* Stars */}
            <div className="flex items-center gap-1 mb-5">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} size={16} className="text-[#C6A04D] fill-[#C6A04D]" />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="font-heading text-[#111111] text-xl md:text-2xl leading-relaxed italic mb-8">
              &ldquo;{t.quote}&rdquo;
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#990A25] to-[#C6A04D] flex items-center justify-center text-white font-heading font-bold text-lg">
                {t.name[0]}
              </div>
              <div>
                <div className="font-semibold text-[#111111]">{t.name}</div>
                <div className="text-sm text-[#666666]">{t.role}</div>
                <div className="text-xs text-[#C6A04D] font-medium">{t.batch}</div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#E7E7E7]">
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`transition-all rounded-full ${i === current ? 'w-6 h-2 bg-[#990A25]' : 'w-2 h-2 bg-[#E7E7E7] hover:bg-[#C6A04D]'}`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full border border-[#E7E7E7] flex items-center justify-center hover:border-[#990A25] hover:text-[#990A25] transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full border border-[#E7E7E7] flex items-center justify-center hover:border-[#990A25] hover:text-[#990A25] transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
