import type { Metadata } from 'next';
import Link from 'next/link';
import { Download, BookOpen, Calendar, GraduationCap } from 'lucide-react';
import { Curriculum, Department, Course } from '@/types';
import PageBanner from '@/components/ui/PageBanner';
import ScrollReveal from '@/components/ui/ScrollReveal';
import EmptyState from '@/components/ui/EmptyState';

export const metadata: Metadata = {
  title: 'Curriculum & Syllabus | NREC College Khurja',
  description: 'Download detailed syllabus and curriculum documents for all undergraduate and postgraduate programs.',
};

import { API_URL as API, API_BASE_URL as UPLOADS } from '@/lib/api';

async function getCurriculums() {
  try {
    const res = await fetch(`${API}/curriculum`, { next: { revalidate: 300 } });
    if (!res.ok) return [];
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


  const breadcrumbs = [{ label: 'Curriculum' }];

  return (
    <>
      <PageBanner
        title="Curriculum & Syllabus"
        subtitle="Detailed syllabus and course structures for undergraduate and postgraduate programs."
        breadcrumbs={breadcrumbs}
      />

      <section className="bg-[#F8F5F0] section-py relative">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#8B0E2A 1px, transparent 1px), linear-gradient(90deg, #8B0E2A 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <div className="container-nrec relative z-10">
          {Object.keys(grouped).length === 0 ? (
            <EmptyState icon={<BookOpen size={32} className="text-gray-400" />} title="No curriculum documents available" description="Please check back later as we update our academic records." />
          ) : (
            <div className="space-y-16">
              {Object.keys(grouped).sort().map((faculty, index) => (
                <ScrollReveal key={faculty} direction="up" delay={0.05 * index}>
                  <div>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 rounded-xl bg-[#8B0E2A] flex items-center justify-center shadow-lg shadow-[#8B0E2A]/20">
                        <BookOpen size={24} className="text-white" />
                      </div>
                      <h2 className="font-heading font-bold text-[#111111] text-2xl md:text-3xl tracking-tight">{faculty}</h2>
                      <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent ml-4" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {grouped[faculty].map((item: Curriculum, idx) => {
                        const deptName = typeof item.department === 'object' && item.department ? (item.department as Department).name : '';
                        const courseName = typeof item.course === 'object' && item.course ? (item.course as Course).name : '';
                        
                        return (
                          <div key={item._id} className="card bg-white p-8 flex flex-col group border border-gray-100 hover:border-[#8B0E2A]/30 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 relative overflow-hidden rounded-[20px]">
                            {/* Accent Line */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#8B0E2A] to-[#B8860B] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                            
                            <div className="flex-1">
                              <h3 className="font-heading font-bold text-[#111111] text-xl mb-4 group-hover:text-[#8B0E2A] transition-colors leading-snug">
                                {item.title}
                              </h3>
                              
                              <div className="space-y-3 mt-4 text-[14px] text-gray-500 font-light">
                                {courseName && (
                                  <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-[#8B0E2A]/5 flex items-center justify-center shrink-0">
                                      <GraduationCap size={14} className="text-[#8B0E2A]" />
                                    </div>
                                    <span className="truncate">{courseName}</span>
                                  </div>
                                )}
                                
                                {deptName && (
                                  <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-[#B8860B]/5 flex items-center justify-center shrink-0">
                                      <div className="w-2 h-2 rounded-full bg-[#B8860B]" />
                                    </div>
                                    <span className="truncate">{deptName}</span>
                                  </div>
                                )}
                                
                                <div className="flex items-center gap-3">
                                  <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                                    <Calendar size={14} className="text-blue-600" />
                                  </div>
                                  <span>{item.semesterYear}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-8 pt-5 border-t border-gray-100">
                              <a
                                href={`${UPLOADS}${item.pdfFile}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline w-full justify-center text-sm group-hover:bg-[#8B0E2A] group-hover:text-white group-hover:border-[#8B0E2A] transition-all py-3 rounded-xl gap-2 font-semibold"
                              >
                                <Download size={16} className="group-hover:animate-bounce" />
                                Download PDF
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
