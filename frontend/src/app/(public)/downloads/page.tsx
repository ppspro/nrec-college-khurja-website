import type { Metadata } from 'next';
import Link from 'next/link';
import { Download, FileText, Calendar, File } from 'lucide-react';
import { Download as DownloadType } from '@/types';

export const metadata: Metadata = {
  title: 'Downloads | NREC College Khurja',
  description: 'Download prospectus, admission forms, academic calendars, exam forms, NAAC documents, and more.',
};

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const CATEGORIES = ['Prospectus', 'Academic Calendar', 'Examination Forms', 'NAAC Documents', 'NIRF Documents', 'Annual Reports', 'Admission Forms', 'Miscellaneous'];

async function getDownloads() {
  try {
    const res = await fetch(`${API}/downloads`, { next: { revalidate: 300 } });
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

  const UPLOADS = process.env.NEXT_PUBLIC_UPLOADS_URL || 'http://localhost:5000';

  return (
    <>
      <div className="page-banner">
        <div className="page-banner-accent" />
        <div className="relative container-nrec">
          <div className="flex items-center gap-2 mb-3 text-gray-400 text-sm">
            <Link href="/" className="hover:text-[#C6A04D]">Home</Link>
            <span>/</span>
            <span className="text-white">Downloads</span>
          </div>
          <h1 className="font-heading text-white font-bold text-4xl md:text-5xl">Download Centre</h1>
          <p className="text-gray-300 mt-3">Forms, documents, and resources for students and staff.</p>
        </div>
      </div>

      <section className="bg-light section-py">
        <div className="container-nrec">
          {Object.values(grouped).every((g) => g.length === 0) ? (
            <div className="text-center py-20 text-[#666666]">No downloads available yet.</div>
          ) : (
            <div className="space-y-10">
              {CATEGORIES.map((cat) => {
                if (grouped[cat].length === 0) return null;
                return (
                  <div key={cat}>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-8 h-8 rounded-lg bg-[#990A25]/8 flex items-center justify-center">
                        <FileText size={16} className="text-[#990A25]" />
                      </div>
                      <h2 className="font-heading font-bold text-[#111111] text-xl">{cat}</h2>
                      <div className="flex-1 h-px bg-[#E7E7E7]" />
                    </div>
                    <div className="bg-white rounded-2xl border border-[#E7E7E7] overflow-hidden divide-y divide-[#E7E7E7]">
                      {grouped[cat].map((item: DownloadType) => (
                        <div key={item._id} className="flex items-center gap-4 px-5 py-4 hover:bg-[#FAFAFA] transition-colors">
                          <div className="w-10 h-10 rounded-xl bg-[#F9F9F9] border border-[#E7E7E7] flex items-center justify-center flex-shrink-0">
                            <File size={16} className="text-[#990A25]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-[#111111] text-sm">{item.title}</div>
                            {item.description && (
                              <div className="text-xs text-[#666666] mt-0.5">{item.description}</div>
                            )}
                            <div className="flex items-center gap-3 mt-1 text-xs text-[#999]">
                              <span>{item.fileType}</span>
                              {item.fileSize && <span>{item.fileSize}</span>}
                              <span className="flex items-center gap-1">
                                <Calendar size={10} />
                                {new Date(item.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                              </span>
                            </div>
                          </div>
                          <a
                            href={`${UPLOADS}${item.file}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                            className="btn btn-outline text-xs px-3 py-2 flex items-center gap-1.5 flex-shrink-0"
                          >
                            <Download size={13} />
                            Download
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
