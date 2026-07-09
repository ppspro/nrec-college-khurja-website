'use client';

import Link from 'next/link';
import { ArrowRight, Bell, Calendar, Pin, Paperclip } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import ScrollReveal from '@/components/ui/ScrollReveal';
import type { Notice } from '@/types';
import { formatDate } from '@/lib/defaults';

interface LatestNoticesProps {
  notices?: Notice[];
}

// Fallback dummy data if db is empty
const fallbackNotices: Notice[] = [
  { _id: '1', title: 'Admission Notice for B.A./B.Sc./B.Com. (Session 2024-25)', category: 'Admission', publishDate: new Date('2026-07-01').toISOString(), isPinned: true, content: '', attachment: '', isActive: true, expiryDate: null, createdAt: '' },
  { _id: '2', title: 'Date Sheet for Annual Examination 2024 — All Programmes', category: 'Examination', publishDate: new Date('2026-07-01').toISOString(), isPinned: true, content: '', attachment: '', isActive: true, expiryDate: null, createdAt: '' },
  { _id: '3', title: 'Scholarship Application Form — State Government Schemes', category: 'Scholarship', publishDate: new Date('2026-07-01').toISOString(), content: '', attachment: '', isPinned: false, isActive: true, expiryDate: null, createdAt: '' },
  { _id: '4', title: 'Inter-College Sports Meet — Registration Open', category: 'Sports', publishDate: new Date('2026-07-01').toISOString(), content: '', attachment: '', isPinned: false, isActive: true, expiryDate: null, createdAt: '' },
  { _id: '5', title: 'College Library — Extended Hours During Examination Period', category: 'Academic', publishDate: new Date('2026-07-01').toISOString(), content: '', attachment: '', isPinned: false, isActive: true, expiryDate: null, createdAt: '' }
] as Notice[];

export default function LatestNotices({ notices }: LatestNoticesProps) {
  const displayNotices = (!notices || notices.length === 0) ? fallbackNotices : notices;

  return (
    <section className="bg-white section-py relative">
      <div className="container-nrec">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <SectionTitle
            label="LATEST ANNOUNCEMENTS"
            title="Notice Board"
            className="mb-0"
          />
          <ScrollReveal direction="left">
            <Link 
              href="/notices" 
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-[14px] font-bold text-[#8B0E2A] border border-[#8B0E2A] rounded-full hover:bg-[#8B0E2A] hover:text-white transition-colors"
            >
              All Notices
              <ArrowRight size={16} />
            </Link>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Announcements */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex items-center gap-3">
                <Bell size={20} className="text-[#8B0E2A]" />
                <h3 className="font-bold text-gray-900 text-lg">Important Announcements</h3>
                <span className="bg-rose-100 text-rose-600 text-[10px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse" />
                  LIVE
                </span>
              </div>
              
              <div className="divide-y divide-gray-100">
                {displayNotices.slice(0, 5).map((notice, idx) => (
                  <Link 
                    key={notice._id || idx} 
                    href={`/notices/${notice._id}`}
                    className="block p-5 hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        {notice.isPinned ? (
                          <Pin size={16} className="text-[#8B0E2A]" />
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-2" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1.5">
                          <div className={`w-2 h-2 rounded-full ${notice.category === 'Admission' ? 'bg-blue-500' : (notice.category === 'Examination' ? 'bg-red-500' : (notice.category === 'Scholarship' ? 'bg-amber-500' : 'bg-emerald-500'))}`} />
                          <span className={`text-[11px] font-bold uppercase tracking-wider ${notice.category === 'Admission' ? 'text-blue-600' : (notice.category === 'Examination' ? 'text-red-600' : (notice.category === 'Scholarship' ? 'text-amber-600' : 'text-emerald-600'))}`}>
                            {notice.category || 'GENERAL'}
                          </span>
                        </div>
                        <h4 className={`text-[15px] font-bold mb-2 group-hover:text-[#8B0E2A] transition-colors leading-tight ${(notice.category === 'Examination') ? 'text-[#8B0E2A]' : 'text-gray-900'}`}>
                          {notice.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[12px] font-medium text-gray-500">
                          <Calendar size={13} />
                          <span>{notice.publishDate ? formatDate(notice.publishDate) : '1 Jul 2026'}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Admissions & Downloads */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Admissions Callout */}
            <div className="bg-[#8B0E2A] rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              <h3 className="font-bold text-xl mb-1 relative z-10">Admissions Open</h3>
              <p className="text-white/80 text-[13px] mb-4 relative z-10">Session 2024-25. Apply before the last date.</p>
              <Link href="/admissions" className="inline-flex items-center gap-1.5 text-[14px] font-bold bg-white px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors relative z-10" style={{ color: '#8B0E2A' }}>
                Apply Now <ArrowRight size={16} />
              </Link>
            </div>

            {/* Downloads List */}
            <div className="bg-white rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden flex flex-col">
              <div className="p-5 border-b border-gray-100">
                <h3 className="font-bold text-gray-900 text-lg">Important Downloads</h3>
              </div>
              <div className="divide-y divide-gray-50 flex-1">
                {['Prospectus 2024-25', 'Admission Form', 'Academic Calendar', 'Examination Schedule'].map((item, idx) => (
                  <Link key={idx} href="/downloads" className="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 group-hover:scale-110 transition-transform">
                      <Paperclip size={14} />
                    </div>
                    <span className="text-[14px] font-medium text-gray-700 group-hover:text-[#8B0E2A] transition-colors">{item}</span>
                    <ArrowRight size={14} className="ml-auto text-gray-400 group-hover:text-[#8B0E2A] group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
              <div className="p-4 border-t border-gray-100 mt-auto bg-gray-50">
                <Link href="/downloads" className="block text-center text-[13px] font-bold text-[#8B0E2A] hover:underline">
                  All Downloads
                </Link>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
