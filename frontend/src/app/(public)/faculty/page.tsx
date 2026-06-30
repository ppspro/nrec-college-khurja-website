import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, BookOpen } from 'lucide-react';
import PageBanner from '@/components/ui/PageBanner';

export const metadata: Metadata = {
  title: 'Faculty | NREC College Khurja',
  description: 'Meet our distinguished faculty members at NREC College, Khurja.',
};

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function getFaculty() {
  try {
    const res = await fetch(`${API}/faculty`, { next: { revalidate: 300 } });
    return (await res.json()).faculty || [];
  } catch { return []; }
}

async function getDepartments() {
  try {
    const res = await fetch(`${API}/departments`, { next: { revalidate: 300 } });
    return (await res.json()).departments || [];
  } catch { return []; }
}

export default async function FacultyPage() {
  const [faculty, departments] = await Promise.all([getFaculty(), getDepartments()]);

  // Group by department
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const grouped: Record<string, any[]> = {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  faculty.forEach((f: any) => {
    const deptName = typeof f.department === 'object' ? f.department?.name : 'General';
    if (!grouped[deptName]) grouped[deptName] = [];
    grouped[deptName].push(f);
  });

  const breadcrumbs = [{ label: 'Faculty' }];

  return (
    <>
      <PageBanner
        title="Our Faculty"
        subtitle="Meet the dedicated educators shaping the next generation."
        breadcrumbs={breadcrumbs}
      />

      <section className="bg-[#F9F9F9] section-py">
        <div className="container-nrec">
          {Object.keys(grouped).length === 0 ? (
            <div className="text-center py-20 text-[#666666]">Faculty directory coming soon.</div>
          ) : (
            <div className="space-y-20">
              {Object.entries(grouped).map(([deptName, members]) => (
                <div key={deptName} className="relative">
                  {/* Elegant Department Header */}
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 rounded-xl bg-white border border-[#E7E7E7] shadow-sm flex items-center justify-center">
                      <BookOpen size={20} className="text-[#990A25]" />
                    </div>
                    <h2 className="font-heading font-bold text-[#111111] text-3xl tracking-tight">{deptName}</h2>
                    <div className="flex-1 h-px bg-gradient-to-r from-[#E7E7E7] to-transparent ml-4" />
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#990A25] bg-[#990A25]/5 px-3 py-1 rounded-full border border-[#990A25]/10">
                      {members.length} Member{members.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {members.map((f) => (
                      <div key={f._id} className="bg-white border border-[#E7E7E7] rounded-xl p-8 text-center group hover:shadow-xl hover:border-[#C6A04D]/30 transition-all duration-300 flex flex-col h-full relative overflow-hidden">
                        
                        {/* Decorative Top Accent */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-[#E7E7E7] group-hover:bg-[#990A25] transition-colors duration-300" />
                        
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#F9F9F9] to-[#E7E7E7] flex items-center justify-center font-heading font-bold text-[#990A25] text-3xl mx-auto mb-5 shadow-inner border-2 border-white group-hover:scale-105 transition-transform duration-300">
                          {f.name[0]}
                        </div>
                        
                        <h3 className="font-heading font-bold text-[#111111] text-lg mb-1 group-hover:text-[#990A25] transition-colors">{f.name}</h3>
                        <div className="text-sm font-semibold text-[#990A25] uppercase tracking-wider mb-2">{f.designation}</div>
                        
                        <div className="text-xs text-[#666666] mb-4 font-light">{f.qualification}</div>
                        
                        {f.specialization?.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 justify-center mb-5 mt-auto">
                            {f.specialization.slice(0, 2).map((s: string) => (
                              <span key={s} className="px-2.5 py-1 bg-[#F9F9F9] border border-[#E7E7E7] text-[10px] uppercase tracking-wider rounded text-[#666666] font-medium">{s}</span>
                            ))}
                          </div>
                        )}
                        
                        {f.email && (
                          <a href={`mailto:${f.email}`} className="mt-auto flex items-center justify-center gap-2 pt-4 text-xs font-medium text-[#666666] hover:text-[#990A25] transition-colors border-t border-[#E7E7E7]/60 w-full group-hover:border-[#990A25]/20">
                            <Mail size={14} className="text-[#C6A04D] group-hover:text-[#990A25]" />
                            {f.email}
                          </a>
                        )}
                      </div>
                    ))}
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
