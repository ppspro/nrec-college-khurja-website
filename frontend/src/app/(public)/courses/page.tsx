'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, Users, Search, Filter, ArrowRight } from 'lucide-react';
import api from '@/lib/api';
import { Course } from '@/types';
import PageBanner from '@/components/ui/PageBanner';

const LEVELS = ['all', 'UG', 'PG', 'Diploma', 'Certificate', 'PhD'];
const LEVEL_COLORS: Record<string, string> = { UG: '#111111', PG: '#990A25', Diploma: '#C6A04D', Certificate: '#666666', PhD: '#111111' };

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [level, setLevel] = useState('all');

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (level !== 'all') params.set('level', level);
        const res = await api.get(`/courses?${params}`);
        setCourses(res.data.courses || []);
      } catch { setCourses([]); }
      finally { setLoading(false); }
    };
    fetch();
  }, [level]);

  const breadcrumbs = [{ label: 'Courses' }];

  return (
    <>
      <PageBanner
        title="Courses Offered"
        subtitle="Undergraduate, postgraduate, and professional programmes."
        breadcrumbs={breadcrumbs}
      />

      <section className="bg-white section-py relative">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        
        <div className="container-nrec relative">
          {/* Filter */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
            {LEVELS.map((l) => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold tracking-wider uppercase transition-all duration-300 ${
                  level === l 
                    ? 'bg-[#111111] text-white shadow-md' 
                    : 'bg-white border border-[#E7E7E7] text-[#666666] hover:border-[#111111] hover:text-[#111111]'
                }`}
              >
                {l === 'all' ? 'All Levels' : l}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => <div key={i} className="skeleton h-64 rounded-2xl" />)}
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-20 text-[#666666]">No courses found.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course, idx) => {
                const color = LEVEL_COLORS[course.level] || '#666';
                const dept = typeof course.department === 'object' ? (course.department as { name: string }).name : '';
                return (
                  <Link key={course._id} href={`/courses/${course.slug}`} className="group flex flex-col h-full bg-white border border-[#E7E7E7] rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 relative">
                    {/* Top Accent Line */}
                    <div className="h-1 w-full transition-colors duration-300" style={{ background: color }} />
                    
                    <div className="p-8 flex flex-col flex-1 relative z-10">
                      <div className="flex items-start justify-between mb-6">
                        <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded text-white" style={{ background: color }}>
                          {course.level}
                        </span>
                        {dept && <span className="text-xs text-[#666666] font-medium tracking-wide text-right max-w-[60%] line-clamp-2">{dept}</span>}
                      </div>
                      
                      <h3 className="font-heading font-bold text-[#111111] text-xl mb-3 group-hover:text-[#990A25] transition-colors leading-tight">
                        {course.name}
                      </h3>
                      
                      <p className="text-[#666666] text-sm flex-1 line-clamp-3 font-light mb-8">
                        {course.description}
                      </p>
                      
                      <div className="mt-auto pt-5 border-t border-[#E7E7E7]/60 flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs font-medium text-[#666666]">
                          <span className="flex items-center gap-1.5"><Clock size={14} className="text-[#C6A04D]" />{course.duration}</span>
                          {course.totalSeats > 0 && <span className="flex items-center gap-1.5"><Users size={14} className="text-[#C6A04D]" />{course.totalSeats} Seats</span>}
                        </div>
                        <div className="w-8 h-8 rounded-full border border-[#E7E7E7] flex items-center justify-center text-[#990A25] group-hover:bg-[#990A25] group-hover:border-[#990A25] group-hover:text-white transition-all duration-300">
                          <ArrowRight size={14} />
                        </div>
                      </div>
                    </div>
                    
                    {/* Subtle watermark in card background */}
                    <div className="absolute -right-4 -bottom-4 opacity-[0.02] text-9xl font-heading font-bold pointer-events-none group-hover:opacity-[0.04] transition-opacity">
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
