'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { truncate } from '@/lib/defaults';
import SectionTitle from '@/components/ui/SectionTitle';
import ScrollReveal from '@/components/ui/ScrollReveal';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useCallback, useEffect, useState } from 'react';
import type { Department } from '@/types';

interface DepartmentsSectionProps {
  departments: Department[];
}

const colorMap = [
  { text: 'text-[#8B0E2A]', bg: 'bg-[#8B0E2A]/10' },
  { text: 'text-[#B8860B]', bg: 'bg-[#B8860B]/10' },
  { text: 'text-blue-600', bg: 'bg-blue-50' },
  { text: 'text-emerald-600', bg: 'bg-emerald-50' },
  { text: 'text-purple-600', bg: 'bg-purple-50' },
  { text: 'text-rose-500', bg: 'bg-rose-50' },
];

export default function DepartmentsSection({ departments }: DepartmentsSectionProps) {
  const displayDepts = departments || [];
  const visibleDepts = displayDepts.slice(0, 8);

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
  if (!displayDepts || displayDepts.length === 0) return null;

  return (
    <section className="bg-white section-py">
      <div className="container-nrec">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionTitle
            label="Academic Faculties"
            title="Our Departments"
            description=""
            className="mb-0"
          />
          <ScrollReveal direction="left">
            <Link href="/departments" className="btn btn-outline btn-md rounded-full group shrink-0 border-[#8B0E2A] text-[#8B0E2A] hover:bg-[#8B0E2A] hover:text-white">
              All Departments
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform ml-1" />
            </Link>
          </ScrollReveal>
        </div>

        {/* Desktop/Tablet Grid */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-5">
          {visibleDepts.map((dept, index) => {
            const color = colorMap[index % colorMap.length];
            return (
              <ScrollReveal
                key={dept._id}
                direction="up"
                delay={0.1 * (index % 4)}
                className="h-full flex flex-col group"
              >
                <Link href={`/departments/${dept.slug}`} className="block h-full">
                  <div className="bg-white border border-gray-100/80 rounded-[20px] p-7 h-full flex flex-col shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] hover:border-gray-200 transition-all duration-300">
                    <div className={`w-13 h-13 rounded-xl flex items-center justify-center mb-5 ${color.bg} ${color.text} group-hover:scale-110 transition-transform duration-300`}>
                      <BookOpen size={22} strokeWidth={2} />
                    </div>
                    
                    <h3 className="font-heading font-bold text-[#111111] text-[18px] mb-2.5 leading-tight group-hover:text-[#8B0E2A] transition-colors">
                      {dept.name}
                    </h3>
                    
                    <p className="text-gray-500 text-[13.5px] leading-relaxed font-light mt-auto">
                      {truncate(dept.description || '', 70)}
                    </p>

                    <div className="flex items-center gap-1 text-[#8B0E2A] font-bold text-[13px] mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Explore
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Mobile Carousel */}
        <div className="block sm:hidden relative w-full">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4 items-stretch touch-pan-y">
            {visibleDepts.map((dept, index) => {
              const color = colorMap[index % colorMap.length];
              return (
                <div 
                  key={dept._id}
                  className="w-[80vw] shrink-0 select-none flex"
                >
                  <Link href={`/departments/${dept.slug}`} className="block w-full h-full">
                    <div className="bg-white border border-gray-100/80 rounded-[20px] p-7 min-h-[220px] flex flex-col shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all duration-300 h-full justify-between">
                      <div>
                        <div className={`w-13 h-13 rounded-xl flex items-center justify-center mb-5 ${color.bg} ${color.text}`}>
                          <BookOpen size={22} strokeWidth={2} />
                        </div>
                        
                        <h3 className="font-heading font-bold text-[#111111] text-[18px] mb-2.5 leading-tight">
                          {dept.name}
                        </h3>
                      </div>
                      
                      <p className="text-gray-500 text-[13.5px] leading-relaxed font-light mt-4">
                        {truncate(dept.description || '', 70)}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

          {/* Pagination Dots */}
          {visibleDepts.length > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              {visibleDepts.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollTo(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    idx === selectedIndex ? 'w-7 bg-[#8B0E2A]' : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to department ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
