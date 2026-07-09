'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, Users, ArrowRight, GraduationCap } from 'lucide-react';
import api, { uploadsUrl } from '@/lib/api';
import { Course } from '@/types';
import PageBanner from '@/components/ui/PageBanner';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SafeImage from '@/components/ui/SafeImage';
import EmptyState from '@/components/ui/EmptyState';
import { truncate } from '@/lib/defaults';

const LEVELS = ['all', 'UG', 'PG', 'Diploma', 'Certificate', 'PhD'];

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

      <section className="bg-[#F8F5F0] section-py relative">
        <div className="container-nrec relative">
          {/* Filter */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
            {LEVELS.map((l) => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  level === l 
                    ? 'bg-[#8B0E2A] text-white shadow-md' 
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {l === 'all' ? 'All Levels' : l}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => <div key={i} className="skeleton h-96 rounded-[20px]" />)}
            </div>
          ) : courses.length === 0 ? (
            <EmptyState title="No courses found" description="Try selecting a different level or check back later." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course, idx) => {
                const dept = typeof course.department === 'object' && course.department !== null ? course.department.name : 'General';
                return (
                  <ScrollReveal key={course._id} direction="up" delay={0.05 * (idx % 3)} className="h-full">
                    <div className="card card-hover-primary h-full flex flex-col group bg-white border-0 shadow-[0_4px_20px_rgba(0,0,0,0.04)] p-0 overflow-hidden">
                      {/* Image */}
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <SafeImage
                          fallbackKey="course"
                          src={uploadsUrl(course.image)}
                          alt={course.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                        
                        {/* Badges */}
                        <div className="absolute top-4 left-4 flex gap-2">
                          <span className="badge bg-[#B8860B] text-white border-none shadow-sm">
                            {course.level}
                          </span>
                          {course.type && (
                            <span className="badge bg-white/90 text-[#111111] backdrop-blur-sm shadow-sm">
                              {course.type}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-8 flex flex-col flex-grow">
                        <div className="flex items-center gap-2 text-[#8B0E2A] text-xs font-bold tracking-wider uppercase mb-3">
                          <GraduationCap size={14} />
                          {dept}
                        </div>

                        <h3 className="font-heading font-bold text-xl text-[#111111] mb-4 group-hover:text-[#8B0E2A] transition-colors leading-tight">
                          {course.name}
                        </h3>

                        <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow font-light">
                          {truncate(course.description || '', 120)}
                        </p>

                        <div className="flex items-center gap-6 py-4 border-t border-gray-100 mb-6 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Clock size={16} className="text-[#B8860B]" />
                            <span className="font-medium">{course.duration}</span>
                          </div>
                          {course.totalSeats > 0 && (
                            <div className="flex items-center gap-2">
                              <Users size={16} className="text-[#B8860B]" />
                              <span className="font-medium">{course.totalSeats} Seats</span>
                            </div>
                          )}
                        </div>

                        <Link
                          href={`/courses/${course.slug}`}
                          className="btn btn-outline w-full rounded-xl group-hover:bg-[#8B0E2A] group-hover:text-white transition-all duration-300"
                        >
                          View Details
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
