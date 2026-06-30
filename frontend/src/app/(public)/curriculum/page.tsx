import type { Metadata } from 'next';
import Link from 'next/link';
import { Download, BookOpen, Calendar, GraduationCap } from 'lucide-react';
import { Curriculum, Department, Course } from '@/types';

export const metadata: Metadata = {
  title: 'Curriculum & Syllabus | NREC College Khurja',
  description: 'Download detailed syllabus and curriculum documents for all undergraduate and postgraduate programs.',
};

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function getCurriculums() {
  try {
    const res = await fetch(`${API}/curriculum`, { next: { revalidate: 300 } });
    return (await res.json()).curriculum || [];
  } catch { return []; }
}

export default async function CurriculumPage() {
  const curriculums = await getCurriculums();

  // Group by Faculty
  const grouped: Record<string, Curriculum[]> = {};
  curriculums.forEach((c: Curriculum) => {
    const faculty = c.faculty || 'Other Programs';
    if (!grouped[faculty]) grouped[faculty] = [];
    grouped[faculty].push(c);
  });

  const UPLOADS = process.env.NEXT_PUBLIC_UPLOADS_URL || 'http://localhost:5000';

  return (
    <>
      <div className="page-banner">
        <div className="page-banner-accent" />
        <div className="relative container-nrec">
          <div className="flex items-center gap-2 mb-3 text-gray-400 text-sm">
            <Link href="/" className="hover:text-[#C6A04D]">Home</Link>
            <span>/</span>
            <span className="text-white">Curriculum</span>
          </div>
          <h1 className="font-heading text-white font-bold text-4xl md:text-5xl">Curriculum & Syllabus</h1>
          <p className="text-gray-300 mt-3 max-w-2xl">
            Detailed syllabus and course structures for undergraduate and postgraduate programs.
          </p>
        </div>
      </div>

      <section className="bg-light section-py">
        <div className="container-nrec">
          {Object.keys(grouped).length === 0 ? (
            <div className="text-center py-20 text-[#666666]">No curriculum documents available at the moment.</div>
          ) : (
            <div className="space-y-12">
              {Object.keys(grouped).sort().map((faculty) => (
                <div key={faculty}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#990A25]/8 flex items-center justify-center">
                      <BookOpen size={20} className="text-[#990A25]" />
                    </div>
                    <h2 className="font-heading font-bold text-[#111111] text-2xl">{faculty}</h2>
                    <div className="flex-1 h-px bg-[#E7E7E7] ml-4" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {grouped[faculty].map((item: Curriculum) => {
                      const deptName = typeof item.department === 'object' && item.department ? (item.department as Department).name : '';
                      const courseName = typeof item.course === 'object' && item.course ? (item.course as Course).name : '';
                      
                      return (
                        <div key={item._id} className="card bg-white p-6 flex flex-col group border border-black/5 hover:border-black/10 hover:shadow-xl transition-all duration-300">
                          <div className="flex-1">
                            <h3 className="font-heading font-bold text-[#111111] text-lg mb-2 group-hover:text-[#990A25] transition-colors line-clamp-2">
                              {item.title}
                            </h3>
                            
                            <div className="space-y-2 mt-4 text-[13px] text-[#666666]">
                              {courseName && (
                                <div className="flex items-center gap-2">
                                  <GraduationCap size={14} className="text-[#990A25]/70 flex-shrink-0" />
                                  <span className="truncate">{courseName}</span>
                                </div>
                              )}
                              
                              {deptName && (
                                <div className="flex items-center gap-2">
                                  <div className="w-[14px] h-[14px] rounded-full bg-[#990A25]/10 flex items-center justify-center flex-shrink-0">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#990A25]" />
                                  </div>
                                  <span className="truncate">{deptName}</span>
                                </div>
                              )}
                              
                              <div className="flex items-center gap-2">
                                <Calendar size={14} className="text-[#990A25]/70 flex-shrink-0" />
                                <span>{item.semesterYear}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-6 pt-4 border-t border-[#E7E7E7]/60">
                            <a
                              href={`${UPLOADS}${item.pdfFile}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-outline w-full justify-center text-sm"
                            >
                              <Download size={14} />
                              Download PDF
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
