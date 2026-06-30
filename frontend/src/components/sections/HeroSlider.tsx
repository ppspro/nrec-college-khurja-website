'use client';

import React, { useState, useEffect, useCallback, Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { uploadsUrl } from '@/lib/api';
import { Slider } from '@/types';

interface HeroSliderProps {
  sliders: Slider[];
}

const defaultSlides = [
  {
    _id: '1',
    title: 'Excellence in Education Since 1901',
    subtitle: 'NREC College, Khurja',
    description: 'A century of shaping minds, building futures, and serving the nation through quality higher education in Uttar Pradesh.',
    image: '/images/hero-campus.png',
    buttonText: 'Explore Courses',
    buttonLink: '/courses',
    order: 0,
    isActive: true,
  },
  {
    _id: '2',
    title: 'Empowering the Next Generation',
    subtitle: 'Quality Education | Holistic Development',
    description: 'Join thousands of alumni who have gone on to lead in business, government, science, and public service.',
    image: '/images/campus-life.png',
    buttonText: 'Apply for Admission',
    buttonLink: '/admissions',
    order: 1,
    isActive: true,
  },
];

export default function HeroSlider({ sliders }: HeroSliderProps) {
  const slides = sliders.length > 0 ? sliders : defaultSlides;
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning]);

  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo, slides.length]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative w-full min-h-[560px] md:min-h-[680px] lg:min-h-[760px] flex items-center justify-center overflow-hidden bg-[#0D0D0D] py-20 md:py-24">
      {/* Background Image & Layered Gradients */}
      <div
        key={slide._id}
        className="absolute inset-0 transition-opacity duration-700 z-0"
        style={{ opacity: isTransitioning ? 0 : 1 }}
      >
        {slide.image ? (
          <Image
            src={slide.image.startsWith('/images/') ? slide.image : uploadsUrl(slide.image)}
            alt={slide.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        ) : (
          /* Gradient fallback */
          <div className="absolute inset-0 bg-gradient-to-br from-[#111111] via-[#1a0a10] to-[#0d0510]">
            {/* Decorative pattern */}
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(198,160,77,0.5) 1px, transparent 0)`,
                backgroundSize: '40px 40px',
              }}
            />
          </div>
        )}
        
        {/* Layered Overlays */}
        <div 
          className="absolute inset-0 z-[1]" 
          style={{
            background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.60))'
          }}
        />
        <div 
          className="absolute inset-0 z-[2]" 
          style={{
            background: 'radial-gradient(circle at center, rgba(198, 160, 77, 0.15) 0%, rgba(0, 0, 0, 0) 70%)'
          }}
        />
      </div>

      {/* Heritage accent bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#990A25] via-[#C6A04D] to-[#990A25] z-10" />

      {/* Content */}
      <div className="relative z-10 w-full flex items-center">
        <div className="max-w-[1280px] mx-auto px-[20px] md:px-[24px] lg:px-[32px] w-full">
          <div className="max-w-[760px] mx-auto flex flex-col items-center text-center">
            <div
              key={`content-${slide._id}`}
              className="flex flex-col items-center w-full"
            >
              {/* Centered Brand Icon */}
              <div 
                className="w-[72px] h-[72px] rounded-2xl bg-white/10 border border-white/20 shadow-lg backdrop-blur-md flex items-center justify-center text-[#C6A04D] font-heading font-bold text-3xl animate-fade-in-up"
                style={{ animationDelay: '0ms', animationFillMode: 'both', marginBottom: '40px' }}
              >
                N
              </div>

              {/* Eyebrow */}
              {slide.subtitle && (
                <div 
                  className="inline-flex items-center gap-3 animate-fade-in-up"
                  style={{ animationDelay: '80ms', animationFillMode: 'both', marginBottom: '24px' }}
                >
                  <div className="w-8 h-px bg-[#C6A04D]/60" />
                  <span className="text-[#C6A04D] text-sm font-semibold tracking-[0.15em] uppercase">
                    {slide.subtitle}
                  </span>
                  <div className="w-8 h-px bg-[#C6A04D]/60" />
                </div>
              )}

              {/* Heading */}
              <h1 
                className="font-heading font-bold leading-[1.05] tracking-[-0.03em] max-w-[760px] text-[40px] md:text-[52px] lg:text-[64px] animate-fade-in-up"
                style={{ color: '#ffffff', animationDelay: '160ms', animationFillMode: 'both', marginBottom: '28px' }}
              >
                {slide.title}
              </h1>

              {/* Description */}
              <p 
                className="text-[18px] leading-[1.8] max-w-[620px] font-light animate-fade-in-up"
                style={{ color: 'rgba(255, 255, 255, 0.9)', animationDelay: '240ms', animationFillMode: 'both', marginBottom: '40px' }}
              >
                {slide.description}
              </p>

              {/* Buttons */}
              <div 
                className="flex flex-col sm:flex-row gap-[20px] justify-center items-center w-full sm:w-auto animate-fade-in-up"
                style={{ animationDelay: '320ms', animationFillMode: 'both', marginBottom: '48px' }}
              >
                <Link 
                  href={slide.buttonLink || '/courses'} 
                  className="btn bg-[#990A25] hover:bg-[#7A081E] border border-[#990A25] hover:border-[#7A081E] font-semibold h-[52px] px-8 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(153,10,37,0.4)] w-full sm:w-auto"
                  style={{ color: '#ffffff' }}
                >
                  {slide.buttonText || 'Explore Courses'}
                </Link>
                <Link 
                  href="/about" 
                  className="btn bg-transparent hover:bg-white/10 border border-white/30 font-semibold h-[52px] px-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 w-full sm:w-auto"
                  style={{ color: '#ffffff' }}
                >
                  About Us
                </Link>
              </div>

              {/* Integrated Quick Stats */}
              <div 
                className="flex flex-wrap justify-center items-start gap-6 md:gap-10 lg:gap-[64px] animate-fade-in-up w-full"
                style={{ animationDelay: '400ms', animationFillMode: 'both' }}
              >
                {[
                  { value: '123+', label: 'Years of Excellence' },
                  { value: '15,000+', label: 'Alumni Worldwide' },
                  { value: '20+', label: 'Departments' },
                  { value: 'A+', label: 'NAAC Grade' },
                ].map((stat, idx, arr) => (
                  <Fragment key={stat.label}>
                    <div className="flex flex-col items-center">
                      <div className="font-heading text-white font-bold text-[36px] leading-tight select-none">
                        {stat.value}
                      </div>
                      <div className="text-white/60 text-[15px] mt-1 font-medium tracking-wide select-none">
                        {stat.label}
                      </div>
                    </div>
                    {idx < arr.length - 1 && (
                      <div className="hidden md:block w-px h-8 bg-white/10 self-center" />
                    )}
                  </Fragment>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-white hover:bg-[#990A25] hover:border-[#990A25] transition-all duration-200 flex items-center justify-center"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-white hover:bg-[#990A25] hover:border-[#990A25] transition-all duration-200 flex items-center justify-center"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? 'w-8 h-2 bg-[#C6A04D]'
                : 'w-2 h-2 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
