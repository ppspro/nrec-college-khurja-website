'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bell, Pin, Search, Filter, Calendar, Download, ChevronRight, FileText } from 'lucide-react';
import api, { uploadsUrl } from '@/lib/api';
import { Notice, NoticeCategory } from '@/types';
import PageBanner from '@/components/ui/PageBanner';
import ScrollReveal from '@/components/ui/ScrollReveal';

const CATEGORIES: (NoticeCategory | 'all')[] = ['all', 'General', 'Examination', 'Admission', 'Academic', 'Administrative', 'Scholarship', 'Sports', 'Cultural'];

const CATEGORY_COLORS: Record<string, string> = {
  General: '#6B7280', Examination: '#DC2626', Admission: '#059669',
  Academic: '#2563EB', Administrative: '#4B5563', Scholarship: '#D97706',
  Sports: '#EA580C', Cultural: '#7C3AED',
};

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [inputVal, setInputVal] = useState('');

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ page: String(page), limit: '15' });
        if (search) params.set('search', search);
        if (category !== 'all') params.set('category', category);
        const res = await api.get(`/notices?${params}`);
        setNotices(res.data.notices);
        setTotalPages(res.data.pagination?.pages || 1);
      } catch {
        setNotices([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [search, category, page]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(inputVal);
    setPage(1);
  };

  const breadcrumbs = [{ label: 'Notice Board' }];

  return (
    <>
      <PageBanner
        title="Notice Board"
        subtitle="Important announcements, circulars, and exam notifications."
        breadcrumbs={breadcrumbs}
      />

      <section className="bg-[#F8F5F0] section-py relative">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#8B0E2A 1px, transparent 1px), linear-gradient(90deg, #8B0E2A 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <div className="container-nrec relative max-w-5xl">
          {/* Premium Search & Filter */}
          <ScrollReveal direction="up">
            <div className="bg-white rounded-[20px] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 md:p-8 mb-10 flex flex-col gap-6">
              <form onSubmit={handleSearch} className="flex gap-3">
                <div className="relative flex-1 group">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#8B0E2A] transition-colors" />
                  <input
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="Search notices, circulars..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 text-[15px] text-[#111111] focus:outline-none focus:border-[#8B0E2A] focus:bg-white transition-all"
                  />
                </div>
                <button type="submit" className="bg-[#111111] hover:bg-[#2E2E2E] text-white px-8 rounded-xl font-semibold text-sm transition-colors shadow-md hover:shadow-lg">
                  Search
                </button>
              </form>
              
              <div className="flex items-center gap-3 flex-wrap pt-4 border-t border-gray-100">
                <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-gray-500 mr-2">
                  <Filter size={14} /> Filter
                </div>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setCategory(cat); setPage(1); }}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                      category === cat
                        ? 'bg-[#8B0E2A] text-white shadow-md'
                        : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Academic Notices List */}
          {loading ? (
            <div className="bg-white rounded-[20px] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 space-y-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="skeleton h-24 rounded-xl" />
              ))}
            </div>
          ) : notices.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-[20px] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell size={24} className="text-gray-300 animate-pulse" />
              </div>
              <h4 className="text-gray-900 font-bold text-lg mb-1">No Active Notices</h4>
              <p className="text-gray-500 text-sm max-w-sm mx-auto font-light leading-relaxed">Currently, there are no announcements or notifications on the notice board. Please check back later.</p>
            </div>
          ) : (
            <div className="bg-white rounded-[20px] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden">
              {/* Header */}
              <div className="px-8 py-5 bg-[#0A0A0A] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell size={18} className="text-[#B8860B]" />
                  <span className="text-white font-heading font-semibold text-lg tracking-wide">Official Circulars & Notices</span>
                </div>
                <div className="text-xs text-gray-400 font-medium uppercase tracking-widest hidden sm:block">
                  Showing Latest
                </div>
              </div>
              
              <div className="divide-y divide-gray-100">
                {notices.map((notice, index) => {
                  const catColor = CATEGORY_COLORS[notice.category] || '#6B7280';
                  return (
                    <ScrollReveal key={notice._id} direction="up" delay={0.05 * (index % 10)}>
                      <div className={`group flex flex-col sm:flex-row sm:items-center gap-5 px-8 py-6 hover:bg-[#F8F5F0] transition-colors relative ${notice.isPinned ? 'bg-amber-50/30' : ''}`}>
                        
                        {notice.isPinned && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#B8860B]" />
                        )}
                        
                        {/* Left: Icon & Date */}
                        <div className="flex flex-row sm:flex-col items-center gap-3 shrink-0 sm:w-24 text-center sm:text-left sm:pr-6 sm:border-r border-gray-100">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${notice.isPinned ? 'bg-amber-100 text-[#B8860B]' : 'bg-gray-100 text-gray-500 group-hover:bg-[#8B0E2A]/10 group-hover:text-[#8B0E2A] transition-colors'}`}>
                            {notice.isPinned ? <Pin size={18} /> : <FileText size={18} />}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-[#111111] whitespace-nowrap">
                              {new Date(notice.publishDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                            </div>
                            <div className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                              {new Date(notice.publishDate).getFullYear()}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            {notice.isPinned && (
                              <span className="bg-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md flex items-center gap-1">
                                <Pin size={10} /> Pinned
                              </span>
                            )}
                            <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 border border-gray-200">
                              {notice.category}
                            </span>
                            
                            {notice.expiryDate && (
                              <span className="text-[10px] font-medium text-gray-500 flex items-center gap-1 ml-2">
                                <Calendar size={10} /> Valid till {new Date(notice.expiryDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                              </span>
                            )}
                          </div>
                          
                          <h3 className="font-heading font-bold text-[#111111] text-[17px] leading-snug mb-2 group-hover:text-[#8B0E2A] transition-colors pr-4">
                            {notice.title}
                          </h3>
                          
                          {notice.content && (
                            <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 font-light max-w-3xl">
                              {notice.content.replace(/<[^>]+>/g, '')}
                            </p>
                          )}
                        </div>
                        
                        {notice.attachment ? (
                          <a
                            href={uploadsUrl(notice.attachment)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-shrink-0 mt-4 sm:mt-0 flex items-center gap-2 bg-white border border-gray-200 hover:border-[#8B0E2A] hover:bg-[#8B0E2A] text-[#111111] hover:text-white transition-all px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wide"
                          >
                            <Download size={14} />
                            Download
                          </a>
                        ) : (
                          <div className="flex-shrink-0 mt-4 sm:mt-0 hidden sm:flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 text-gray-400 group-hover:bg-[#8B0E2A] group-hover:text-white group-hover:border-[#8B0E2A] transition-colors ml-auto">
                            <ChevronRight size={16} />
                          </div>
                        )}
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          )}

          {/* Premium Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-12">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-6 py-2.5 rounded-full border border-gray-200 text-[#111111] font-semibold text-sm hover:border-[#111111] hover:bg-[#111111] hover:text-white transition-all disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-[#111111] disabled:hover:border-gray-200 bg-white"
              >
                Previous
              </button>
              <span className="text-sm font-medium text-gray-500 tracking-widest uppercase">Page {page} of {totalPages}</span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-6 py-2.5 rounded-full border border-gray-200 text-[#111111] font-semibold text-sm hover:border-[#111111] hover:bg-[#111111] hover:text-white transition-all disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-[#111111] disabled:hover:border-gray-200 bg-white"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
