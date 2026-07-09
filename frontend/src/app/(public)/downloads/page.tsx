import type { Metadata } from 'next';
import Link from 'next/link';
import { Download, FileText, Calendar, File } from 'lucide-react';
import { Download as DownloadType } from '@/types';
import PageBanner from '@/components/ui/PageBanner';
import ScrollReveal from '@/components/ui/ScrollReveal';

export const metadata: Metadata = {
  title: 'Downloads | NREC College Khurja',
  description: 'Download prospectus, admission forms, academic calendars, exam forms, NAAC documents, and more.',
};

import { API_URL as API, API_BASE_URL as UPLOADS } from '@/lib/api';

const CATEGORIES = ['Prospectus', 'Academic Calendar', 'Examination Forms', 'NAAC Documents', 'NIRF Documents', 'Annual Reports', 'Admission Forms', 'Miscellaneous'];

async function getDownloads() {
  try {
    const res = await fetch(`${API}/downloads`, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    return (await res.json()).downloads || [];
  } catch { return []; }
}

export default async function DownloadsPage() {
  const downloads = await getDownloads();

  // Group by category
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const grouped: Record<string, any[]> = {};
  CATEGORIES.forEach((cat) => { grouped[cat] = []; });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  downloads.forEach((d: any) => {
    if (grouped[d.category]) grouped[d.category].push(d);
    else grouped['Miscellaneous'].push(d);
  });



  const breadcrumbs = [{ label: 'Downloads' }];

  return (
    <>
      <PageBanner
        title="Download Centre"
        subtitle="Forms, documents, and resources for students and staff."
        breadcrumbs={breadcrumbs}
      />

      <section className="bg-[#F8F5F0] section-py relative">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#8B0E2A 2px, transparent 2px)', backgroundSize: '32px 32px' }} />
        
        <div className="container-nrec relative z-10 max-w-4xl">
          {Object.values(grouped).every((g) => g.length === 0) ? (
            <div className="text-center py-20 bg-white rounded-[24px] border border-gray-100 shadow-sm">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText size={24} className="text-gray-300" />
              </div>
              <p className="text-gray-500 text-lg font-light">No downloads available yet.</p>
            </div>
          ) : (
            <div className="space-y-12">
              {CATEGORIES.map((cat, index) => {
                if (grouped[cat].length === 0) return null;
                return (
                  <ScrollReveal key={cat} direction="up" delay={0.05 * index}>
                    <div className="bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden">
                      <div className="p-6 md:px-8 border-b border-gray-100 flex items-center gap-4 bg-gray-50/50">
                        <div className="w-12 h-12 rounded-xl bg-[#8B0E2A]/10 flex items-center justify-center border border-[#8B0E2A]/20">
                          <FileText size={20} className="text-[#8B0E2A]" />
                        </div>
                        <h2 className="font-heading font-bold text-[#111111] text-xl md:text-2xl">{cat}</h2>
                        <div className="ml-auto bg-gray-200 text-gray-500 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                          {grouped[cat].length} items
                        </div>
                      </div>
                      
                      <div className="divide-y divide-gray-100">
                        {grouped[cat].map((item: DownloadType) => (
                          <div key={item._id} className="group flex flex-col sm:flex-row sm:items-center gap-4 px-6 md:px-8 py-5 hover:bg-[#F8F5F0] transition-colors">
                            <div className="w-12 h-12 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:border-[#B8860B] transition-colors">
                              <File size={20} className="text-gray-400 group-hover:text-[#B8860B] transition-colors" />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-[#111111] text-[15px] group-hover:text-[#8B0E2A] transition-colors mb-1">
                                {item.title}
                              </div>
                              {item.description && (
                                <div className="text-[13px] text-gray-500 font-light mb-2">
                                  {item.description}
                                </div>
                              )}
                              <div className="flex flex-wrap items-center gap-3 text-[11px] font-medium text-gray-400 uppercase tracking-wider">
                                <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600">{item.fileType}</span>
                                {item.fileSize && <span>{item.fileSize}</span>}
                                <span className="flex items-center gap-1.5">
                                  <Calendar size={12} />
                                  {new Date(item.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                                </span>
                              </div>
                            </div>
                            
                            <a
                              href={`${UPLOADS}${item.file}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-outline text-sm px-5 py-2.5 flex items-center gap-2 shrink-0 group-hover:bg-[#8B0E2A] group-hover:text-white group-hover:border-[#8B0E2A] transition-all w-full sm:w-auto justify-center"
                            >
                              <Download size={16} className="group-hover:animate-bounce" />
                              Download
                            </a>
                          </div>
                        ))}
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
