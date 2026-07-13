'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, Users, CheckCircle } from 'lucide-react';
import PageBanner from '@/components/ui/PageBanner';
import { API_URL as API } from '@/lib/api';



const LEVEL_COLORS: Record<string, string> = { UG: '#2563EB', PG: '#8B0E2A', Diploma: '#059669', Certificate: '#D97706', PhD: '#7C3AED' };

export default function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [slug, setSlug] = useState<string>('');

  useEffect(() => {
    const resolveParams = async () => {
      try {
        const resolvedParams = await Promise.resolve(params);
        setSlug(resolvedParams.slug);
      } catch (err) {
        setSlug('');
      }
    };
    resolveParams();
  }, [params]);

  useEffect(() => {
    if (!slug) return;
    const fetchCourse = async () => {
      try {
        const res = await fetch(`${API}/courses/${slug}`);
        if (!res.ok) {
          setError(true);
        } else {
          const data = await res.json();
          setCourse(data.course);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#8B0E2A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Course Not Found</h1>
        <p className="text-gray-600 mb-8 max-w-md">The course details you are looking for might have been removed or unavailable.</p>
        <Link href="/courses" className="px-6 py-2.5 bg-[#8B0E2A] text-white font-bold rounded-lg hover:bg-[#700B22] transition-colors">Browse All Courses</Link>
      </div>
    );
  }

  const color = LEVEL_COLORS[course.level] || '#666';
  const dept = typeof course.department === 'object' ? course.department : null;

  return (
    <>
      <PageBanner
        title={course.name}
        breadcrumbs={[
          { label: 'Courses', href: '/courses' },
          { label: course.name }
        ]}
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="badge text-white text-sm" style={{ background: color }}>{course.level}</span>
          {course.type && <span className="badge badge-accent text-xs">{course.type}</span>}
        </div>
      </PageBanner>

      <section className="bg-light section-py">
        <div className="container-nrec">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              {course.description && (
                <div className="card p-8">
                  <h2 className="font-heading font-bold text-xl mb-4">About this Programme</h2>
                  <p className="text-[#666666] leading-relaxed">{course.description}</p>
                </div>
              )}
              {course.eligibility && (
                <div className="card p-8">
                  <h2 className="font-heading font-bold text-xl mb-4">Eligibility Criteria</h2>
                  <p className="text-[#666666] leading-relaxed">{course.eligibility}</p>
                </div>
              )}
              {course.highlights?.length > 0 && (
                <div className="card p-8">
                  <h2 className="font-heading font-bold text-xl mb-5">Programme Highlights</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {course.highlights.map((h: string, i: number) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <CheckCircle size={16} className="text-[#059669] mt-0.5 flex-shrink-0" />
                        <span className="text-[#666666] text-sm">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {course.careerProspects?.length > 0 && (
                <div className="card p-8">
                  <h2 className="font-heading font-bold text-xl mb-5">Career Prospects</h2>
                  <div className="flex flex-wrap gap-2">
                    {course.careerProspects.map((c: string, i: number) => (
                      <span key={i} className="px-3 py-1.5 bg-[#F9F9F9] border border-[#E7E7E7] text-sm text-[#2E2E2E] rounded-lg">{c}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="card p-6 sticky top-24">
                <h3 className="font-heading font-bold text-[#111111] mb-5">Course Details</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex items-center gap-3 text-[#666666]">
                    <Clock size={15} className="text-[#8B0E2A]" />
                    Duration: <strong className="text-[#111111]">{course.duration}</strong>
                  </div>
                  {course.totalSeats > 0 && (
                    <div className="flex items-center gap-3 text-[#666666]">
                      <Users size={15} className="text-[#8B0E2A]" />
                      Seats: <strong className="text-[#111111]">{course.totalSeats}</strong>
                    </div>
                  )}
                  {dept && (
                    <div className="pt-4 mt-4 border-t border-gray-100">
                      <p className="text-xs text-[#666] uppercase tracking-wider font-bold mb-2">Department</p>
                      <Link href={`/departments/${dept.slug || ''}`} className="font-bold text-[#8B0E2A] hover:underline">
                        {dept.name}
                      </Link>
                    </div>
                  )}
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h4 className="font-bold mb-3 text-[15px]">Admission Enquiry</h4>
                  <p className="text-xs text-gray-500 mb-4">Contact our admissions office for details about the application process and deadlines.</p>
                  <Link href="/contact" className="block w-full text-center px-4 py-2.5 bg-gray-900 hover:bg-black text-white text-sm font-bold rounded-lg transition-colors">
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
