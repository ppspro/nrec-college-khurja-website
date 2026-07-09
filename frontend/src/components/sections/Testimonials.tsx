'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const fallbackTestimonials = [
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

interface TestimonialsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  testimonials?: any[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const data = (!testimonials || testimonials.length === 0) ? fallbackTestimonials : testimonials;

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' }, [Autoplay({ delay: 8000, stopOnInteraction: true })]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <section className="relative overflow-hidden section-py section-warm">
      <div className="container-nrec">
        <div className="text-center mb-14">
          <span className="section-label">Alumni Speak</span>
          <h2 className="section-title">What Our Alumni Say</h2>
          <div className="divider-accent mx-auto" />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y items-stretch">
              {data.map((t, i) => (
                <div key={i} className="flex-[0_0_100%] min-w-0 px-4 md:px-8">
                  <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 h-full flex flex-col justify-between min-h-[380px]">
                    <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl bg-gradient-to-r from-[#8B0E2A] to-[#B8860B]" />
                    
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <Quote className="text-[#8B0E2A]/10 w-16 h-16 mb-4" />
                        <div className="flex items-center gap-1 mb-5">
                          {Array.from({ length: t.rating || 5 }).map((_, idx) => (
                            <Star key={idx} size={16} className="text-[#B8860B] fill-[#B8860B]" />
                          ))}
                        </div>
                        <blockquote className="font-heading text-[#111111] text-xl md:text-2xl leading-relaxed italic mb-8">
                          &ldquo;{t.quote}&rdquo;
                        </blockquote>
                      </div>
                      <div className="flex items-center gap-4 mt-auto">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8B0E2A] to-[#B8860B] flex items-center justify-center text-white font-heading font-bold text-lg">
                          {t.name[0]}
                        </div>
                        <div>
                          <div className="font-semibold text-[#111111]">{t.name}</div>
                          <div className="text-sm text-[#666666]">{t.role}</div>
                          <div className="text-xs text-[#B8860B] font-medium">{t.batch}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100 max-w-3xl mx-auto px-4 md:px-8">
            <div className="flex items-center gap-2">
              {data.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  className={`transition-all rounded-full ${i === selectedIndex ? 'w-6 h-2 bg-[#8B0E2A]' : 'w-2 h-2 bg-gray-200 hover:bg-[#B8860B]'}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={scrollPrev}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#8B0E2A] hover:text-[#8B0E2A] transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={scrollNext}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#8B0E2A] hover:text-[#8B0E2A] transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
