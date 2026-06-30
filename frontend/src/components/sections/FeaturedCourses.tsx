'use client';

import React, { Fragment } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, Users, GraduationCap, BookOpen, Award, Sparkles } from 'lucide-react';
import { Course } from '@/types';

const LEVEL_CONFIG: Record<string, { bg: string; text: string; border: string }> = {
  UG: { bg: 'bg-neutral-50', text: 'text-neutral-700', border: 'border-neutral-200' },
  PG: { bg: 'bg-neutral-50', text: 'text-neutral-900', border: 'border-neutral-300' },
  Diploma: { bg: 'bg-neutral-50', text: 'text-neutral-600', border: 'border-neutral-200' },
  Certificate: { bg: 'bg-neutral-50', text: 'text-neutral-600', border: 'border-neutral-200' },
  PhD: { bg: 'bg-neutral-900 text-white', text: 'text-white', border: 'border-neutral-950' },
};

const DEPT_ICONS: Record<string, typeof BookOpen> = {
  Arts: GraduationCap,
  Science: Sparkles,
  Commerce: Award,
  Education: BookOpen,
};

const FACULTY_STRIPS: Record<string, string> = {
  Arts: 'bg-gradient-to-r from-stone-200 to-amber-200',
  Science: 'bg-gradient-to-r from-slate-200 to-blue-200',
  Commerce: 'bg-gradient-to-r from-emerald-100 to-teal-200',
  Education: 'bg-gradient-to-r from-rose-100 to-rose-200',
};

const ArtsWatermark = () => (
  <svg className="absolute -bottom-6 -left-6 w-36 h-36 text-neutral-900 pointer-events-none transition-all duration-500 opacity-[0.03] group-hover:opacity-[0.12] group-hover:scale-105" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
);

const ScienceWatermark = () => (
  <svg className="absolute -bottom-6 -left-6 w-36 h-36 text-neutral-900 pointer-events-none transition-all duration-500 opacity-[0.03] group-hover:opacity-[0.12] group-hover:scale-105" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-30 12 12)" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const CommerceWatermark = () => (
  <svg className="absolute -bottom-6 -left-6 w-36 h-36 text-neutral-900 pointer-events-none transition-all duration-500 opacity-[0.03] group-hover:opacity-[0.12] group-hover:scale-105" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17M5 7h14M5 7l-2 5h4l-2-5M19 7l-2 5h4l-2-5M12 20h6M12 20H6" />
  </svg>
);

const EducationWatermark = () => (
  <svg className="absolute -bottom-6 -left-6 w-36 h-36 text-neutral-900 pointer-events-none transition-all duration-500 opacity-[0.03] group-hover:opacity-[0.12] group-hover:scale-105" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const WATERMARKS: Record<string, React.ComponentType> = {
  Arts: ArtsWatermark,
  Science: ScienceWatermark,
  Commerce: CommerceWatermark,
  Education: EducationWatermark,
};

interface FeaturedCoursesProps {
  courses: Course[];
}

export default function FeaturedCourses({ courses }: FeaturedCoursesProps) {
  const displayed = courses.length > 0 ? courses.slice(0, 6) : [
    { _id: '1', name: 'B.A. (Bachelor of Arts)', level: 'UG', duration: '3 Years', totalSeats: 480, description: 'Comprehensive study of humanities, literature, social sciences, and critical thinking with experienced academic faculty.', slug: 'ba', department: { name: 'Faculty of Arts' } },
    { _id: '2', name: 'B.Sc. (Bachelor of Science)', level: 'UG', duration: '3 Years', totalSeats: 240, description: 'Rigorous scientific training covering physics, chemistry, mathematics, and biological sciences in advanced research laboratories.', slug: 'bsc', department: { name: 'Faculty of Science' } },
    { _id: '3', name: 'B.Com. (Bachelor of Commerce)', level: 'UG', duration: '3 Years', totalSeats: 120, description: 'Build strong foundations in financial accounting, corporate governance, economics, and business management.', slug: 'bcom', department: { name: 'Faculty of Commerce' } },
    { _id: '4', name: 'M.A. (Master of Arts)', level: 'PG', duration: '2 Years', totalSeats: 60, description: 'Advanced post-graduate research and academic specialization across core humanities disciplines.', slug: 'ma', department: { name: 'Faculty of Arts' } },
    { _id: '5', name: 'M.Sc. (Master of Science)', level: 'PG', duration: '2 Years', totalSeats: 60, description: 'In-depth postgraduate research methodologies and practical applications in physical and life sciences.', slug: 'msc', department: { name: 'Faculty of Science' } },
    { _id: '6', name: 'B.Ed. (Bachelor of Education)', level: 'UG', duration: '2 Years', totalSeats: 100, description: 'NCTF-accredited professional teacher training programme emphasizing pedagogy and practical school internship exposure.', slug: 'bed', department: { name: 'Dept. of Education' } },
  ];

  return (
    <section className="bg-white pt-[120px] pb-[120px] relative overflow-hidden">
      {/* Decorative dotted pattern on far left */}
      <div 
        className="absolute left-0 top-1/2 -translate-y-1/2 w-24 h-64 opacity-5 pointer-events-none hidden lg:block"
        style={{
          backgroundImage: 'radial-gradient(#111 1px, transparent 1px)',
          backgroundSize: '16px 16px'
        }}
      />

      {/* Subtle radial gradients */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-neutral-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-amber-100/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-[20px] md:px-[24px] lg:px-[32px] relative z-10">
        
        {/* Header Layout */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-[24px] pb-8">
          <div className="max-w-[650px]">
            <div className="mb-3">
              <span className="text-[#C6A04D] text-[13px] font-semibold tracking-[0.2em] uppercase font-body">
                ACADEMIC PROGRAMMES
              </span>
            </div>
            <h2 className="font-heading font-bold text-neutral-900 text-[48px] md:text-[56px] lg:text-[64px] leading-[1.1] tracking-tight mb-4 max-w-[650px]">
              Featured Courses
            </h2>
            <p className="text-neutral-600 text-base sm:text-lg leading-relaxed font-normal max-w-[520px]">
              Explore our premier undergraduate and postgraduate degree programmes designed to foster intellectual rigor, academic research, and holistic career development.
            </p>
          </div>

          <div className="flex-shrink-0 pt-2 md:pt-0">
            <Link
              href="/courses"
              className="inline-flex items-center justify-center gap-2.5 h-[48px] px-8 rounded-full border border-neutral-300 text-neutral-800 font-semibold text-sm hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-300 shadow-sm group"
            >
              <span>All Programmes</span>
              <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
          </div>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayed.map((course) => {
            const level = (course as Course).level || 'UG';
            const levelCfg = LEVEL_CONFIG[level] || LEVEL_CONFIG.UG;
            const dept = typeof (course as Course).department === 'object'
              ? ((course as Course).department as { name: string }).name
              : 'Academic Department';

            const deptKey = dept.replace('Faculty of ', '').replace('Dept. of ', '');
            const IconComp = DEPT_ICONS[deptKey] || BookOpen;
            const stripClass = FACULTY_STRIPS[deptKey] || 'bg-gradient-to-r from-neutral-200 to-neutral-300';
            const WatermarkComp = WATERMARKS[deptKey] || EducationWatermark;

            return (
              <Link
                key={course._id}
                href={`/courses/${(course as Course).slug}`}
                className="group flex flex-col h-full bg-white rounded-[24px] border border-neutral-900/5 shadow-sm hover:shadow-xl hover:-translate-y-[6px] hover:border-neutral-900/10 transition-all duration-300 ease-out relative overflow-hidden"
              >
                {/* 4px Subtle Faculty Strip */}
                <div className={`absolute top-0 left-0 right-0 h-1 ${stripClass}`} />

                <div className="p-8 flex flex-col flex-1 relative">
                  
                  {/* Top Header Area */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center justify-center text-neutral-800 group-hover:scale-105 group-hover:bg-neutral-900 group-hover:text-white transition-all duration-500 shadow-sm">
                      <IconComp size={28} strokeWidth={1.5} />
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                      <span className="text-[15px] font-medium text-neutral-400">
                        {dept}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${levelCfg.bg} ${levelCfg.text} ${levelCfg.border}`}>
                        {level}
                      </span>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="flex-1 mb-8">
                    <h3 className="font-heading font-bold text-neutral-900 text-[26px] sm:text-[32px] lg:text-[38px] leading-[1.15] mb-4 group-hover:text-neutral-800 transition-colors line-clamp-2">
                      {course.name}
                    </h3>
                    <p className="text-neutral-500 text-[15px] leading-relaxed line-clamp-3 font-light">
                      {(course as Course).description || 'Quality higher education fostering academic excellence, practical training, and holistic personal development.'}
                    </p>
                  </div>

                  {/* SVG Watermark */}
                  <WatermarkComp />

                  {/* Footer Area */}
                  <div className="pt-5 mt-auto border-t border-neutral-900/5 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-[15px] text-neutral-500 font-medium">
                      <span className="flex items-center gap-1.5">
                        <Clock size={16} className="text-neutral-400" />
                        {(course as Course).duration || '3 Years'}
                      </span>
                      {(course as Course).totalSeats > 0 && (
                        <span className="flex items-center gap-1.5">
                          <Users size={16} className="text-neutral-400" />
                          {(course as Course).totalSeats} Seats
                        </span>
                      )}
                    </div>

                    {/* CTA Link */}
                    <span className="flex items-center gap-1.5 text-neutral-900 font-semibold text-sm">
                      <span>View Details</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                    </span>
                  </div>

                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
