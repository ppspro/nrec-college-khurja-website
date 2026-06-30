'use client';

import Link from 'next/link';
import { ArrowRight, Bell, Pin, Paperclip, Calendar } from 'lucide-react';
import { Notice } from '@/types';

const CATEGORY_COLORS: Record<string, string> = {
  General: '#666666',
  Examination: '#DC2626',
  Admission: '#2563EB',
  Academic: '#059669',
  Administrative: '#7C3AED',
  Scholarship: '#D97706',
  Sports: '#0891B2',
  Cultural: '#C6A04D',
};

interface LatestNoticesProps {
  notices: Notice[];
}

export default function LatestNotices({ notices }: LatestNoticesProps) {
  const displayed = notices.length > 0 ? notices.slice(0, 7) : [
    { _id: '1', title: 'Admission Notice for B.A./B.Sc./B.Com. (Session 2024-25)', category: 'Admission', isPinned: true, publishDate: new Date().toISOString(), attachment: '', isActive: true },
    { _id: '2', title: 'Date Sheet for Annual Examination 2024 — All Programmes', category: 'Examination', isPinned: false, publishDate: new Date().toISOString(), attachment: 'pdf', isActive: true },
    { _id: '3', title: 'Scholarship Application Form — State Government Schemes', category: 'Scholarship', isPinned: false, publishDate: new Date().toISOString(), attachment: 'pdf', isActive: true },
    { _id: '4', title: 'Inter-College Sports Meet — Registration Open', category: 'Sports', isPinned: false, publishDate: new Date().toISOString(), attachment: '', isActive: true },
    { _id: '5', title: 'College Library — Extended Hours During Examination Period', category: 'Academic', isPinned: false, publishDate: new Date().toISOString(), attachment: '', isActive: true },
  ];

  return (
    <section className="bg-white section-py">
      <div className="container-nrec">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Notice Board */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="section-label">Latest Announcements</span>
                <h2 className="section-title">Notice Board</h2>
                <div className="divider-accent" />
              </div>
              <Link href="/notices" className="btn btn-outline text-sm px-4 py-2 flex-shrink-0">
                All Notices <ArrowRight size={14} />
              </Link>
            </div>

            <div className="card divide-y divide-[#E7E7E7]/60">
              {/* Header */}
              <div className="flex items-center gap-3 px-6 py-5 bg-[#F9F9F9]/80 backdrop-blur-sm">
                <Bell size={18} className="text-[#990A25]" />
                <span className="text-[#111111] text-[15px] font-bold">Important Announcements</span>
                <span className="ml-auto flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#990A25] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#990A25]"></span>
                  </span>
                  <span className="text-xs text-[#990A25] font-semibold uppercase tracking-wider">Live</span>
                </span>
              </div>

              {displayed.map((notice) => (
                <Link
                  key={notice._id}
                  href={`/notices`}
                  className="flex items-start gap-4 px-5 py-4 hover:bg-[#F9F9F9] transition-colors group"
                >
                  {/* Pin indicator */}
                  <div className="mt-1.5 flex-shrink-0">
                    {notice.isPinned ? (
                      <Pin size={15} className="text-[#990A25]" />
                    ) : (
                      <div className="w-1.5 h-1.5 rounded-full bg-[#D1D5DB] mt-1.5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider" style={{ color: CATEGORY_COLORS[notice.category] || '#666' }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: CATEGORY_COLORS[notice.category] || '#666' }} />
                        {notice.category}
                      </span>
                      {notice.attachment && (
                        <Paperclip size={12} className="text-[#999] flex-shrink-0 ml-2" />
                      )}
                    </div>
                    <p className="text-[15px] font-semibold text-[#111111] leading-snug group-hover:text-[#990A25] transition-colors line-clamp-2">
                      {notice.title}
                    </p>
                    <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-[#666666]">
                      <Calendar size={12} />
                      {new Date(notice.publishDate).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick links sidebar */}
          <div className="flex flex-col gap-6">
            {/* Admission CTA */}
            <div className="card overflow-hidden" style={{ background: 'linear-gradient(135deg, #990A25, #7A081E)' }}>
              <div className="p-6 text-white">
                <div className="font-heading font-bold text-xl mb-2">Admissions Open</div>
                <p className="text-red-200 text-sm mb-5">Session 2024-25. Apply before the last date.</p>
                <Link href="/admissions" className="btn btn-white text-sm px-5 py-2.5">
                  Apply Now <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Download quick links */}
            <div className="card p-5">
              <h4 className="font-heading font-semibold text-[#111111] text-base mb-4">Important Downloads</h4>
              <div className="space-y-3">
                {[
                  { label: 'Prospectus 2024-25', cat: 'Prospectus' },
                  { label: 'Admission Form', cat: 'Admission Forms' },
                  { label: 'Academic Calendar', cat: 'Academic Calendar' },
                  { label: 'Examination Schedule', cat: 'Examination Forms' },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={`/downloads?category=${encodeURIComponent(item.cat)}`}
                    className="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-[#F9F9F9] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#990A25]/8 flex items-center justify-center flex-shrink-0">
                      <Paperclip size={14} className="text-[#990A25]" />
                    </div>
                    <span className="text-sm text-[#2E2E2E] group-hover:text-[#990A25] transition-colors font-medium">{item.label}</span>
                    <ArrowRight size={12} className="ml-auto text-[#999] group-hover:text-[#990A25] transition-colors" />
                  </Link>
                ))}
              </div>
              <Link href="/downloads" className="btn btn-outline w-full justify-center mt-4 text-sm py-2.5">
                All Downloads
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
