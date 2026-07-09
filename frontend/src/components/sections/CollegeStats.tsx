'use client';

import { Award, BookOpen, GraduationCap, Users } from 'lucide-react';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import ScrollReveal from '@/components/ui/ScrollReveal';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useCallback, useEffect, useState } from 'react';

const fallbackStats = [
  {
    id: 1,
    label: 'Years of Excellence',
    value: 123,
    suffix: '+',
    icon: <Award size={28} className="text-[#B8860B]" />,
    description: 'A legacy of quality higher education since 1901',
  },
  {
    id: 2,
    label: 'Alumni Worldwide',
    value: 15000,
    suffix: '+',
    icon: <GraduationCap size={28} className="text-[#8B0E2A]" />,
    description: 'Leading in business, science, and public service',
  },
  {
    id: 3,
    label: 'Departments',
    value: 20,
    suffix: '+',
    icon: <BookOpen size={28} className="text-[#B8860B]" />,
    description: 'Across Arts, Science, Commerce, and Education',
  },
  {
    id: 4,
    label: 'Dedicated Faculty',
    value: 150,
    suffix: '+',
    icon: <Users size={28} className="text-[#8B0E2A]" />,
    description: 'Highly qualified educators and researchers',
  },
];

interface CollegeStatsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stats?: any[];
}

export default function CollegeStats({ stats }: CollegeStatsProps) {
  const displayStats = (!stats || stats.length === 0)
    ? fallbackStats
    : stats.map((s, idx) => ({
        ...s,
        id: s.id || s._id || idx + 1,
        icon: s.icon || fallbackStats[idx % fallbackStats.length].icon,
        description: s.description || fallbackStats[idx % fallbackStats.length].description,
        suffix: s.suffix || ''
      }));

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' }, [Autoplay({ delay: 6000, stopOnInteraction: true })]);
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

  return (
    <section className="relative z-30 pt-16 md:pt-24 pb-16 md:pb-24 bg-[#FAF9F5]/40 border-b border-gray-100 overflow-hidden">
      <div className="container-nrec">
        
        {/* Desktop/Tablet Grid */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-6">
          {displayStats.map((stat, index) => (
            <ScrollReveal
              key={stat.id}
              direction="up"
              delay={0.1 * index}
              className="bg-white rounded-[22px] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.06)] border border-gray-100/80 hover:shadow-[0_16px_48px_rgba(0,0,0,0.10)] hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F8F5F0] to-[#F0ECE4] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="font-heading font-black text-[42px] text-[#111111] mb-1.5 flex items-baseline gap-0.5 tracking-tight leading-none">
                <AnimatedCounter value={stat.value} duration={2500} />
                <span className="text-2xl text-[#8B0E2A] font-bold">{stat.suffix}</span>
              </div>
              <h3 className="font-bold text-[17px] text-[#1A1A1A] mb-2">
                {stat.label}
              </h3>
              <p className="text-gray-500 text-[13.5px] leading-relaxed">
                {stat.description}
              </p>
            </ScrollReveal>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="block sm:hidden relative w-full">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4 items-stretch touch-pan-y">
              {displayStats.map((stat) => (
                <div 
                  key={stat.id}
                  className="w-[80vw] shrink-0 select-none flex"
                >
                <div className="bg-white rounded-[22px] p-7 shadow-[0_8px_32px_rgba(0,0,0,0.06)] border border-gray-100/80 flex flex-col h-full w-full">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F8F5F0] to-[#F0ECE4] flex items-center justify-center mb-6">
                    {stat.icon}
                  </div>
                  <div className="font-heading font-black text-[42px] text-[#111111] mb-1.5 flex items-baseline gap-0.5 tracking-tight leading-none">
                    <AnimatedCounter value={stat.value} duration={2500} />
                    <span className="text-2xl text-[#8B0E2A] font-bold">{stat.suffix}</span>
                  </div>
                  <h3 className="font-bold text-[17px] text-[#1A1A1A] mb-2">
                    {stat.label}
                  </h3>
                  <p className="text-gray-500 text-[13.5px] leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

          {/* Pagination Dots */}
          {displayStats.length > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              {displayStats.map((_, idx) => (
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
    </section>
  );
}
