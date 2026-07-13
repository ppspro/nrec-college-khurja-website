'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import ScrollReveal from '@/components/ui/ScrollReveal';
import DepartmentCard from '@/components/ui/DepartmentCard';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useCallback, useEffect, useState } from 'react';
import type { Department } from '@/types';

interface DepartmentsSectionProps {
  departments: Department[];
}

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
    <section className="bg-[#FAF9F5]/50 section-py border-y border-gray-100/60">
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
          {visibleDepts.map((dept, index) => (
            <ScrollReveal
              key={dept._id}
              direction="up"
              delay={0.1 * (index % 4)}
              className="h-full flex flex-col group"
            >
              <DepartmentCard department={dept} index={index} />
            </ScrollReveal>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="block sm:hidden relative w-full">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4 items-stretch touch-pan-y">
            {visibleDepts.map((dept, index) => (
              <div 
                key={dept._id}
                className="w-[80vw] shrink-0 select-none flex"
              >
                <DepartmentCard department={dept} index={index} className="w-full" />
              </div>
            ))}
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
