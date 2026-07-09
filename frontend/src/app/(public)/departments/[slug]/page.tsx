'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Users, Calendar, ArrowRight } from 'lucide-react';
import { Faculty, Course } from '@/types';
import PageBanner from '@/components/ui/PageBanner';
import { API_URL as API } from '@/lib/api';



export default function DepartmentDetailPage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const [dept, setDept] = useState<any>(null);
  const [deptFaculty, setDeptFaculty] = useState<Faculty[]>([]);
  const [deptCourses, setDeptCourses] = useState<Course[]>([]);
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
    const fetchData = async () => {
      try {
        const deptRes = await fetch(`${API}/departments/${slug}`);
        if (!deptRes.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        const deptData = await deptRes.json();
        setDept(deptData.department);
        
        // Fetch relations
        const [facultyRes, coursesRes] = await Promise.all([
          fetch(`${API}/faculty?department=${deptData.department._id}`).catch(() => null),
          fetch(`${API}/courses?department=${deptData.department._id}`).catch(() => null)
        ]);
        
        if (facultyRes?.ok) {
          const fData = await facultyRes.json();
          setDeptFaculty(fData.faculty || []);
        }
        if (coursesRes?.ok) {
          const cData = await coursesRes.json();
          setDeptCourses(cData.courses || []);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#8B0E2A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !dept) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Department Not Found</h1>
        <p className="text-gray-600 mb-8 max-w-md">The department details you are looking for might have been removed or unavailable.</p>
        <Link href="/departments" className="px-6 py-2.5 bg-[#8B0E2A] text-white font-bold rounded-lg hover:bg-[#700B22] transition-colors">Browse All Departments</Link>
      </div>
    );
  }

  return (
    <>
      <PageBanner
        title={dept.name}
        breadcrumbs={[
          { label: 'Departments', href: '/departments' },
          { label: dept.name }
        ]}
      >
        {dept.headOfDepartment && (
          <p className="text-gray-300 mt-3">Head of Department: {dept.headOfDepartment}</p>
        )}
      </PageBanner>

      <section className="bg-white section-py">
        <div className="container-nrec">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              {dept.description && (
                <div>
                  <h2 className="font-heading font-bold text-[#111111] text-2xl mb-4">About the Department</h2>
                  <p className="text-[#666666] leading-relaxed">{dept.description}</p>
                </div>
              )}
              {dept.vision && (
                <div className="card p-6">
                  <h3 className="font-heading font-bold text-[#111111] text-lg mb-3">Vision</h3>
                  <p className="text-[#666666] leading-relaxed">{dept.vision}</p>
                </div>
              )}
              {dept.mission && (
                <div className="card p-6">
                  <h3 className="font-heading font-bold text-[#111111] text-lg mb-3">Mission</h3>
                  <p className="text-[#666666] leading-relaxed">{dept.mission}</p>
                </div>
              )}
              {dept.objectives?.length > 0 && (
                <div>
                  <h3 className="font-heading font-bold text-[#111111] text-lg mb-4">Objectives</h3>
                  <ul className="space-y-2">
                    {dept.objectives.map((obj: string, i: number) => (
                      <li key={i} className="flex items-start gap-2.5 text-[#666666]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#8B0E2A] mt-2 flex-shrink-0" />
                        {obj}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Faculty */}
              {deptFaculty.length > 0 && (
                <div>
                  <h3 className="font-heading font-bold text-[#111111] text-lg mb-5">Faculty Members</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {deptFaculty.slice(0, 4).map((f: Faculty) => (
                      <div key={f._id} className="card p-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-[#8B0E2A] font-bold shrink-0">
                          {f.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm">{f.name}</h4>
                          <p className="text-xs text-[#666666]">{f.designation}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {deptFaculty.length > 4 && (
                    <Link href={`/faculty?department=${dept._id}`} className="inline-flex items-center gap-1 text-sm text-[#8B0E2A] font-bold mt-4 hover:underline">
                      View all {deptFaculty.length} faculty members <ArrowRight size={14} />
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="card p-6 sticky top-24">
                <h3 className="font-heading font-bold text-[#111111] mb-5">Department Details</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex items-center gap-3 text-[#666666]">
                    <Calendar size={15} className="text-[#8B0E2A]" />
                    Established: <strong className="text-[#111111]">{dept.establishedYear || 'N/A'}</strong>
                  </div>
                  <div className="flex items-center gap-3 text-[#666666]">
                    <Users size={15} className="text-[#8B0E2A]" />
                    Faculty Strength: <strong className="text-[#111111]">{deptFaculty.length}</strong>
                  </div>
                  <div className="flex items-center gap-3 text-[#666666]">
                    <BookOpen size={15} className="text-[#8B0E2A]" />
                    Courses Offered: <strong className="text-[#111111]">{deptCourses.length}</strong>
                  </div>
                </div>

                {deptCourses.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <h4 className="font-bold mb-4 text-[15px]">Programs</h4>
                    <div className="space-y-3">
                      {deptCourses.map((c: Course) => (
                        <Link key={c._id} href={`/courses/${c.slug}`} className="block group">
                          <div className="text-sm font-bold text-[#333] group-hover:text-[#8B0E2A] transition-colors">{c.name}</div>
                          <div className="text-xs text-[#666] mt-0.5">{c.level} • {c.duration}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
