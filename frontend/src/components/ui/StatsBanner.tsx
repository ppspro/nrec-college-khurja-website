'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import AnimatedCounter from './AnimatedCounter';
import ScrollReveal from './ScrollReveal';
import { clsx } from 'clsx';

export interface StatItem {
  id?: string | number;
  label: string;
  value: number | string;
  suffix?: string;
  icon: React.ReactNode;
  description?: string;
}

interface StatsBannerProps {
  stats: StatItem[];
  className?: string;
}

export default function StatsBanner({ stats, className = '' }: StatsBannerProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' }, [
    Autoplay({ delay: 6000, stopOnInteraction: true })
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  if (!stats || stats.length === 0) return null;

  return (
    <div className={clsx("w-full relative", className)}>
      {/* Desktop/Tablet Grid */}
      <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <ScrollReveal
            key={stat.id || index}
            direction="up"
            delay={0.1 * index}
            className="bg-white rounded-[22px] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.06)] border border-gray-100/80 hover:shadow-[0_16px_48px_rgba(0,0,0,0.10)] hover:-translate-y-2 transition-all duration-300 group"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F8F5F0] to-[#F0ECE4] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              {stat.icon}
            </div>
            <div className="font-heading font-black text-[42px] text-[#111111] mb-1.5 flex items-baseline gap-0.5 tracking-tight leading-none">
              <AnimatedCounter value={String(stat.value)} duration={2500} />
              <span className="text-2xl text-[#8B0E2A] font-bold">{stat.suffix}</span>
            </div>
            <h3 className="font-bold text-[17px] text-[#1A1A1A] mb-2">
              {stat.label}
            </h3>
            {stat.description && (
              <p className="text-gray-500 text-[13.5px] leading-relaxed">
                {stat.description}
              </p>
            )}
          </ScrollReveal>
        ))}
      </div>

      {/* Mobile Carousel */}
      <div className="block sm:hidden relative w-full">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 items-stretch touch-pan-y">
            {stats.map((stat, index) => (
              <div 
                key={stat.id || index}
                className="w-[80vw] shrink-0 select-none flex"
              >
                <div className="bg-white rounded-[22px] p-7 shadow-[0_8px_32px_rgba(0,0,0,0.06)] border border-gray-100/80 flex flex-col h-full w-full">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F8F5F0] to-[#F0ECE4] flex items-center justify-center mb-6">
                    {stat.icon}
                  </div>
                  <div className="font-heading font-black text-[42px] text-[#111111] mb-1.5 flex items-baseline gap-0.5 tracking-tight leading-none">
                    <AnimatedCounter value={String(stat.value)} duration={2500} />
                    <span className="text-2xl text-[#8B0E2A] font-bold">{stat.suffix}</span>
                  </div>
                  <h3 className="font-bold text-[17px] text-[#1A1A1A] mb-2">
                    {stat.label}
                  </h3>
                  {stat.description && (
                    <p className="text-gray-500 text-[13.5px] leading-relaxed">
                      {stat.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        {stats.length > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">
            {stats.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollTo(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === selectedIndex ? 'w-7 bg-[#8B0E2A]' : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to stat ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
