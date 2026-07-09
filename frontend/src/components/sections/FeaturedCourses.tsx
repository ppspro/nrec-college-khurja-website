'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, Users, GraduationCap, Book, Award } from 'lucide-react';
import { truncate } from '@/lib/defaults';
import SectionTitle from '@/components/ui/SectionTitle';
import ScrollReveal from '@/components/ui/ScrollReveal';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import type { Course, CourseLevel } from '@/types';

interface FeaturedCoursesProps {
  courses: Course[];
}

const getCardStyle = (deptName: string = '') => {
  const name = deptName.toLowerCase();
  if (name.includes('science')) return { borderTop: 'border-t-blue-400', icon: <Award size={20} className="text-gray-600" /> };
  if (name.includes('arts')) return { borderTop: 'border-t-amber-400', icon: <GraduationCap size={20} className="text-gray-600" /> };
  if (name.includes('commerce')) return { borderTop: 'border-t-emerald-400', icon: <Award size={20} className="text-gray-600" /> };
  if (name.includes('education')) return { borderTop: 'border-t-rose-400', icon: <Book size={20} className="text-gray-600" /> };
  return { borderTop: 'border-t-gray-400', icon: <GraduationCap size={20} className="text-gray-600" /> };
};

const fallbackCourses: Course[] = [
  { _id: '1', name: 'B.A. (Bachelor of Arts)', slug: 'ba', department: { _id: 'd1', name: 'Faculty of Arts' }, level: 'UG', duration: '3 Years', totalSeats: 480, description: 'Comprehensive study of humanities, literature, social sciences, and critical thinking with experienced academic faculty.', isFeatured: true, type: 'Regular', isActive: true },
  { _id: '2', name: 'B.Sc. (Bachelor of Science)', slug: 'bsc', department: { _id: 'd2', name: 'Faculty of Science' }, level: 'UG', duration: '3 Years', totalSeats: 240, description: 'Rigorous scientific training covering physics, chemistry, mathematics, and biological sciences in advanced research laboratories.', isFeatured: true, type: 'Regular', isActive: true },
  { _id: '3', name: 'B.Com. (Bachelor of Commerce)', slug: 'bcom', department: { _id: 'd3', name: 'Faculty of Commerce' }, level: 'UG', duration: '3 Years', totalSeats: 120, description: 'Build strong foundations in financial accounting, corporate governance, economics, and business management.', isFeatured: true, type: 'Regular', isActive: true },
  { _id: '4', name: 'M.A. (Master of Arts)', slug: 'ma', department: { _id: 'd1', name: 'Faculty of Arts' }, level: 'PG', duration: '2 Years', totalSeats: 120, description: 'Advanced post-graduate research and academic specialization across core humanities disciplines.', isFeatured: true, type: 'Regular', isActive: true },
  { _id: '5', name: 'M.Sc. (Master of Science)', slug: 'msc', department: { _id: 'd2', name: 'Faculty of Science' }, level: 'PG', duration: '2 Years', totalSeats: 60, description: 'In-depth postgraduate research methodologies and practical applications in physical and life sciences.', isFeatured: true, type: 'Regular', isActive: true },
  { _id: '6', name: 'B.Ed. (Bachelor of Education)', slug: 'bed', department: { _id: 'd4', name: 'Dept. of Education' }, level: 'UG', duration: '2 Years', totalSeats: 100, description: 'NCTE-accredited professional teacher training programme emphasizing pedagogy and practical school internship', isFeatured: true, type: 'Regular', isActive: true },
] as unknown as Course[];

export default function FeaturedCourses({ courses }: FeaturedCoursesProps) {
  const [activeTab, setActiveTab] = useState<'All' | CourseLevel>('All');

  const displayCourses = (!courses || courses.length === 0) ? fallbackCourses : courses;

  // Extract unique levels for tabs
  const levels = Array.from(new Set(displayCourses.map(c => c.level))).sort();
  const tabs = ['All', ...levels];

  // Filter courses
  const filteredCourses = activeTab === 'All' 
    ? displayCourses 
    : displayCourses.filter(c => c.level === activeTab);

  const activeCourses = filteredCourses.slice(0, 6);

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

  // Reset carousel index when filter changes
  useEffect(() => {
    scrollTo(0);
  }, [activeTab, scrollTo]);

  const renderCourseCard = (course: Course, index: number, isMobile: boolean = false) => {
    const deptName = typeof course.department === 'object' && course.department !== null ? course.department.name : 'General';
    const style = getCardStyle(deptName);
    
    return (
      <Link href={`/courses/${course.slug}`} className="block w-full h-full group">
        <div className={`bg-white rounded-[20px] ${isMobile ? 'p-6' : 'p-7'} h-full flex flex-col border border-gray-100/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] hover:border-gray-200 transition-all duration-300 border-t-[3px] ${style.borderTop}`}>
          
          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <div className="w-11 h-11 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              {style.icon}
            </div>
            <div className="text-right">
              <div className="text-[12px] text-gray-400 font-medium mb-1.5 line-clamp-1 max-w-[150px]">{deptName}</div>
              <span className={`text-[11px] font-bold px-3 py-1 rounded-md uppercase tracking-wider ${
                course.level === 'PG' 
                  ? 'text-[#8B0E2A] bg-[#8B0E2A]/8' 
                  : 'text-[#111111] bg-gray-100'
              }`}>
                {course.level}
              </span>
            </div>
          </div>

          {/* Content */}
          <h3 className={`font-heading font-bold text-[#111111] mb-3 leading-[1.2] group-hover:text-[#8B0E2A] transition-colors ${isMobile ? 'text-[22px]' : 'text-[24px]'}`}>
            {course.name}
          </h3>

          <p className={`text-gray-500 leading-[1.7] font-light mb-6 flex-grow ${isMobile ? 'text-[13.5px]' : 'text-[14.5px]'}`}>
            {truncate(course.description || '', isMobile ? 100 : 120)}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto text-gray-500 text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Clock size={14} className="text-gray-400" />
                <span className="font-medium">{course.duration}</span>
              </div>
              {course.totalSeats > 0 && (
                <div className="flex items-center gap-1.5">
                  <Users size={14} className="text-gray-400" />
                  <span className="font-medium">{course.totalSeats} Seats</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-1 text-[#111111] font-bold text-[13px] group-hover:text-[#8B0E2A] transition-colors">
              View Details
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <section className="bg-white section-py relative">
      <div className="container-nrec">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionTitle
            label="Academic Programmes"
            title="Featured Courses"
            description="Explore our premier undergraduate and postgraduate degree programmes designed to foster intellectual rigor, academic research, and holistic career development."
            className="mb-0"
          />
          <ScrollReveal direction="left">
            <Link 
              href="/courses" 
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-[14px] font-bold text-gray-800 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
            >
              All Programmes
              <ArrowRight size={16} />
            </Link>
          </ScrollReveal>
        </div>

        {/* Tabs */}
        {tabs.length > 2 && (
          <ScrollReveal direction="up" delay={0.2} className="flex flex-wrap gap-2 mb-10">
            {tabs.map((tab) => (
              <button
                key={tab}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onClick={() => setActiveTab(tab as any)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-[#8B0E2A] text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </ScrollReveal>
        )}

        {/* Desktop/Tablet Grid */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-6">
          {activeCourses.map((course, index) => (
            <ScrollReveal
              key={course._id}
              direction="up"
              delay={0.1 * (index % 3)}
              className="h-full flex flex-col"
            >
              {renderCourseCard(course, index)}
            </ScrollReveal>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="block sm:hidden relative w-full">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4 items-stretch touch-pan-y">
            {activeCourses.map((course, index) => (
              <div 
                key={course._id}
                className="w-[80vw] shrink-0 select-none flex"
              >
                {renderCourseCard(course, index, true)}
              </div>
            ))}
          </div>
        </div>

          {/* Pagination Dots */}
          {activeCourses.length > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              {activeCourses.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollTo(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    idx === selectedIndex ? 'w-7 bg-[#8B0E2A]' : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to course ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
