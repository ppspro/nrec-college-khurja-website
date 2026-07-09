'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { uploadsUrl } from '@/lib/api';
import { safeImage } from '@/lib/defaults';
import type { Slider } from '@/types';

interface HeroSliderProps {
  sliders: Slider[];
}

const defaultSlides: Slider[] = [
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
    subtitle: 'Quality Education • Holistic Development',
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
  const [direction, setDirection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback((index: number, dir: number = 1) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection(dir);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 800);
  }, [isTransitioning]);

  const prev = () => goTo((current - 1 + slides.length) % slides.length, -1);
  const next = useCallback(() => goTo((current + 1) % slides.length, 1), [current, goTo, slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[current];

  return (
    <section className="relative w-full h-[100vh] md:min-h-[100vh] flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
      {/* Background Images */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, zIndex: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full z-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slide.image.startsWith('/images/') ? slide.image : uploadsUrl(slide.image)}
            alt={slide.title}
            className="absolute inset-0 w-full h-full object-cover object-top md:object-center animate-kenburns origin-top md:origin-center"
            style={{ width: '100%', height: '100%' }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = safeImage(null, 'hero');
            }}
          />
          
          {/* Layered Gradient Overlays */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
          <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(139,14,42,0.15)_0%,transparent_60%)]" />
        </motion.div>
      </AnimatePresence>

      {/* Heritage accent bar at the very bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8B0E2A] via-[#B8860B] to-[#8B0E2A] z-20 opacity-80" />

      {/* Content */}
      <div className="relative z-10 w-full pt-20 pb-28 md:pt-48 md:pb-44">
        <div className="container-nrec">
          <div className="max-w-[800px] px-6 md:px-12 lg:px-24 mx-auto md:mx-0 text-center md:text-left flex flex-col items-center md:items-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                className="flex flex-col items-center md:items-start w-full"
              >
                {/* Subtitle / Eyebrow */}
                {slide.subtitle && (
                  <div className="inline-flex items-center gap-4 mb-4 sm:mb-6">
                    <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#B8860B] md:from-[#B8860B] md:to-transparent" />
                    <span className="text-[#B8860B] text-xs sm:text-sm font-bold tracking-[0.2em] uppercase drop-shadow-md">
                      {slide.subtitle}
                    </span>
                    <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#B8860B]" />
                  </div>
                )}

                {/* Heading */}
                <h1 className="text-white mb-4 sm:mb-6 drop-shadow-lg text-[26px] xs:text-3xl sm:text-4xl md:text-6xl lg:text-7xl leading-tight">
                  {slide.title}
                </h1>

                {/* Description */}
                <p className="text-[14px] sm:text-[17px] md:text-[19px] text-gray-200 font-medium leading-[1.7] max-w-[680px] mb-8 sm:mb-10 drop-shadow-md">
                  {slide.description}
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto relative z-30 bg-black/35 backdrop-blur-md p-3.5 sm:p-2.5 sm:px-5 rounded-2xl sm:rounded-full border border-white/15 mt-2">
                  <Link 
                    href={slide.buttonLink || '/courses'} 
                    className="w-full sm:w-auto btn btn-primary btn-lg rounded-full shadow-lg text-center font-bold tracking-wide transition-all duration-200 hover:scale-102 active:scale-98"
                  >
                    {slide.buttonText || 'Explore Courses'}
                  </Link>
                  <Link 
                    href="/about" 
                    className="w-full sm:w-auto flex items-center justify-center px-8 py-3.5 text-[14.5px] font-bold text-white bg-white/20 hover:bg-white hover:text-[#111111] border-2 border-white transition-all rounded-full shadow-lg duration-200 hover:scale-102 active:scale-98"
                    style={{ color: 'white' }}
                  >
                    Discover NREC
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="hidden md:flex absolute left-4 right-4 top-1/2 -translate-y-1/2 z-20 justify-between pointer-events-none md:left-8 md:right-8 lg:left-12 lg:right-12">
        <button
          onClick={prev}
          className="w-12 h-12 rounded-full bg-black/20 border border-white/10 backdrop-blur-md text-white hover:bg-[#8B0E2A] hover:border-[#8B0E2A] transition-all duration-300 flex items-center justify-center pointer-events-auto shadow-lg hover:-translate-x-1"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={next}
          className="w-12 h-12 rounded-full bg-black/20 border border-white/10 backdrop-blur-md text-white hover:bg-[#8B0E2A] hover:border-[#8B0E2A] transition-all duration-300 flex items-center justify-center pointer-events-auto shadow-lg hover:translate-x-1"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Progress Line Dots */}
      <div className="absolute bottom-6 md:bottom-12 left-0 right-0 z-20 flex justify-center">
        <div className="flex items-center gap-3 bg-black/30 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? 1 : -1)}
              className="relative py-2 group"
              aria-label={`Go to slide ${i + 1}`}
            >
              <div className={`transition-all duration-500 rounded-full bg-white ${
                i === current ? 'w-8 h-[3px] opacity-100 shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'w-2 h-[3px] opacity-40 group-hover:opacity-70 group-hover:w-4'
              }`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
