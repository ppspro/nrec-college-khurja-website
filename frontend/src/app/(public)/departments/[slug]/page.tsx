import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, Users, Calendar, ArrowRight } from 'lucide-react';
import { Faculty, Course } from '@/types';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function getDepartment(slug: string) {
  try {
    const res = await fetch(`${API}/departments/${slug}`, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data.department;
  } catch { return null; }
}

async function getFaculty(deptId: string) {
  try {
    const res = await fetch(`${API}/faculty?department=${deptId}`, { next: { revalidate: 300 } });
    const data = await res.json();
    return data.faculty || [];
  } catch { return []; }
}

async function getCourses(deptId: string) {
  try {
    const res = await fetch(`${API}/courses?department=${deptId}`, { next: { revalidate: 300 } });
    const data = await res.json();
    return data.courses || [];
  } catch { return []; }
}

export default async function DepartmentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dept = await getDepartment(slug);
  if (!dept) notFound();

  const deptFaculty = await getFaculty(dept._id);
  const deptCourses = await getCourses(dept._id);

  return (
    <>
      <div className="page-banner">
        <div className="page-banner-accent" />
        <div className="relative container-nrec">
          <div className="flex items-center gap-2 mb-3 text-gray-400 text-sm">
            <Link href="/" className="hover:text-[#C6A04D]">Home</Link>
            <span>/</span>
            <Link href="/departments" className="hover:text-[#C6A04D]">Departments</Link>
            <span>/</span>
            <span className="text-white">{dept.name}</span>
          </div>
          <h1 className="font-heading text-white font-bold text-4xl md:text-5xl">{dept.name}</h1>
          {dept.headOfDepartment && (
            <p className="text-gray-300 mt-3">Head of Department: {dept.headOfDepartment}</p>
          )}
        </div>
      </div>

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
                        <div className="w-1.5 h-1.5 rounded-full bg-[#990A25] mt-2 flex-shrink-0" />
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
                        <div className="w-12 h-12 rounded-xl bg-[#F9F9F9] flex items-center justify-center font-heading font-bold text-[#990A25] text-lg flex-shrink-0">
                          {f.name[0]}
                        </div>
                        <div>
                          <div className="font-semibold text-[#111111] text-sm">{f.name}</div>
                          <div className="text-xs text-[#666666]">{f.designation}</div>
                          <div className="text-xs text-[#999]">{f.qualification}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link href="/faculty" className="inline-flex items-center gap-1 mt-4 text-sm text-[#990A25] font-semibold hover:gap-2 transition-all">
                    View All Faculty <ArrowRight size={14} />
                  </Link>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="card p-5">
                <h4 className="font-heading font-bold text-[#111111] mb-4">Department Info</h4>
                <div className="space-y-3 text-sm">
                  {dept.establishedYear && (
                    <div className="flex items-center gap-3 text-[#666666]">
                      <Calendar size={15} className="text-[#990A25]" />
                      Established: {dept.establishedYear}
                    </div>
                  )}
                  {dept.headOfDepartment && (
                    <div className="flex items-center gap-3 text-[#666666]">
                      <Users size={15} className="text-[#990A25]" />
                      HoD: {dept.headOfDepartment}
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-[#666666]">
                    <BookOpen size={15} className="text-[#990A25]" />
                    {deptCourses.length} Course{deptCourses.length !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>
              {deptCourses.length > 0 && (
                <div className="card p-5">
                  <h4 className="font-heading font-bold text-[#111111] mb-4">Courses Offered</h4>
                  <div className="space-y-2">
                    {deptCourses.map((c: Course) => (
                      <Link key={c._id} href={`/courses/${c.slug}`} className="flex items-center justify-between py-2 hover:text-[#990A25] text-sm text-[#666666] transition-colors group">
                        <span>{c.name}</span>
                        <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#990A25]" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
