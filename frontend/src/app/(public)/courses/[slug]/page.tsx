import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, Users, CheckCircle, ArrowRight, BookOpen } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function getCourse(slug: string) {
  try {
    const res = await fetch(`${API}/courses/${slug}`, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    return (await res.json()).course;
  } catch { return null; }
}

const LEVEL_COLORS: Record<string, string> = { UG: '#2563EB', PG: '#990A25', Diploma: '#059669', Certificate: '#D97706', PhD: '#7C3AED' };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await getCourse(slug);
  if (!course) notFound();
  const color = LEVEL_COLORS[course.level] || '#666';
  const dept = typeof course.department === 'object' ? course.department : null;

  return (
    <>
      <div className="page-banner">
        <div className="page-banner-accent" />
        <div className="relative container-nrec">
          <div className="flex items-center gap-2 mb-3 text-gray-400 text-sm">
            <Link href="/" className="hover:text-[#C6A04D]">Home</Link>
            <span>/</span>
            <Link href="/courses" className="hover:text-[#C6A04D]">Courses</Link>
            <span>/</span>
            <span className="text-white">{course.name}</span>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <span className="badge text-white text-sm" style={{ background: color }}>{course.level}</span>
            {course.type && <span className="badge badge-accent text-xs">{course.type}</span>}
          </div>
          <h1 className="font-heading text-white font-bold text-4xl md:text-5xl">{course.name}</h1>
        </div>
      </div>

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
                    <Clock size={15} className="text-[#990A25]" />
                    Duration: <strong className="text-[#111111]">{course.duration}</strong>
                  </div>
                  {course.totalSeats > 0 && (
                    <div className="flex items-center gap-3 text-[#666666]">
                      <Users size={15} className="text-[#990A25]" />
                      Seats: <strong className="text-[#111111]">{course.totalSeats}</strong>
                    </div>
                  )}
                  {dept && (
                    <div className="flex items-center gap-3 text-[#666666]">
                      <BookOpen size={15} className="text-[#990A25]" />
                      Department: <strong className="text-[#111111]">{dept.name}</strong>
                    </div>
                  )}
                </div>
                {course.feeStructure && (
                  <div className="mt-5 pt-5 border-t border-[#E7E7E7]">
                    <div className="text-sm font-semibold text-[#111111] mb-2">Fee Structure</div>
                    <p className="text-sm text-[#666666]">{course.feeStructure}</p>
                  </div>
                )}
                <Link href="/admissions" className="btn btn-primary w-full justify-center mt-6">
                  Apply Now <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
