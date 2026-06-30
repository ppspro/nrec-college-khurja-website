'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bell, Pin, Search, Filter, Calendar, Download, ChevronRight } from 'lucide-react';
import api, { uploadsUrl } from '@/lib/api';
import { Notice, NoticeCategory } from '@/types';
import PageBanner from '@/components/ui/PageBanner';

const CATEGORIES: (NoticeCategory | 'all')[] = ['all', 'General', 'Examination', 'Admission', 'Academic', 'Administrative', 'Scholarship', 'Sports', 'Cultural'];

const CATEGORY_COLORS: Record<string, string> = {
  General: '#666666', Examination: '#990A25', Admission: '#C6A04D',
  Academic: '#111111', Administrative: '#555555', Scholarship: '#A8853A',
  Sports: '#111111', Cultural: '#7A081E',
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

      <section className="bg-[#F9F9F9] section-py relative">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        
        <div className="container-nrec relative max-w-5xl">
          {/* Premium Search & Filter */}
          <div className="bg-white rounded-2xl border border-[#E7E7E7] shadow-sm p-6 md:p-8 mb-10 flex flex-col gap-6">
            <form onSubmit={handleSearch} className="flex gap-3">
              <div className="relative flex-1 group">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999999] group-focus-within:text-[#990A25] transition-colors" />
                <input
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Search notices, circulars..."
                  className="w-full bg-[#F9F9F9] border border-[#E7E7E7] rounded-xl pl-11 pr-4 py-3.5 text-[15px] text-[#111111] focus:outline-none focus:border-[#990A25] focus:ring-1 focus:ring-[#990A25] transition-all"
                />
              </div>
              <button type="submit" className="bg-[#111111] hover:bg-[#222222] text-white px-8 rounded-xl font-semibold text-sm transition-colors shadow-sm">
                Search
              </button>
            </form>
            
            <div className="flex items-center gap-3 flex-wrap pt-4 border-t border-[#E7E7E7]/60">
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#666666] mr-2">
                <Filter size={14} /> Filter
              </div>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setCategory(cat); setPage(1); }}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                    category === cat
                      ? 'bg-[#990A25] text-white shadow-md'
                      : 'bg-transparent border border-[#E7E7E7] text-[#666666] hover:border-[#111111] hover:text-[#111111]'
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Academic Notices List */}
          {loading ? (
            <div className="bg-white rounded-2xl border border-[#E7E7E7] overflow-hidden p-6 space-y-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="skeleton h-24 rounded-xl" />
              ))}
            </div>
          ) : notices.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-2xl border border-[#E7E7E7]">
              <div className="w-16 h-16 bg-[#F9F9F9] rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell size={24} className="text-[#BBBBBB]" />
              </div>
              <p className="text-[#666666] text-lg font-light">No notices found matching your criteria.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-[#E7E7E7] shadow-sm overflow-hidden">
              {/* Header */}
              <div className="px-8 py-5 bg-[#111111] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell size={18} className="text-[#C6A04D]" />
                  <span className="text-white font-heading font-semibold text-lg tracking-wide">Official Circulars & Notices</span>
                </div>
                <div className="text-xs text-[#888888] font-medium uppercase tracking-widest hidden sm:block">
                  Showing Latest
                </div>
              </div>
              
              <div className="divide-y divide-[#E7E7E7]/60">
                {notices.map((notice) => {
                  const catColor = CATEGORY_COLORS[notice.category] || '#666666';
                  return (
                    <div key={notice._id} className={`group flex flex-col sm:flex-row sm:items-center gap-5 px-8 py-6 hover:bg-[#F9F9F9] transition-colors relative ${notice.isPinned ? 'bg-red-50/30' : ''}`}>
                      
                      {notice.isPinned && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#990A25]" />
                      )}
                      
                      {/* Date Block */}
                      <div className="flex-shrink-0 w-24 text-center sm:text-left sm:pr-6 sm:border-r border-[#E7E7E7]/60">
                        <div className="text-3xl font-heading font-bold text-[#111111] leading-none mb-1">
                          {new Date(notice.publishDate).toLocaleDateString('en-IN', { day: '2-digit' })}
                        </div>
                        <div className="text-[10px] font-semibold uppercase tracking-widest text-[#990A25]">
                          {new Date(notice.publishDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2.5">
                          {notice.isPinned && (
                            <span className="bg-[#990A25] text-white text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded flex items-center gap-1">
                              <Pin size={9} /> Pinned
                            </span>
                          )}
                          <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border" style={{ borderColor: `${catColor}30`, color: catColor, backgroundColor: `${catColor}08` }}>
                            {notice.category}
                          </span>
                          
                          {notice.expiryDate && (
                            <span className="text-[10px] font-medium text-[#888888] flex items-center gap-1 ml-2">
                              <Calendar size={10} /> Valid till {new Date(notice.expiryDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                            </span>
                          )}
                        </div>
                        
                        <h3 className="font-heading font-bold text-[#111111] text-[17px] leading-snug mb-2 group-hover:text-[#990A25] transition-colors pr-4">
                          {notice.title}
                        </h3>
                        
                        {notice.content && (
                          <p className="text-[#666666] text-sm leading-relaxed line-clamp-2 font-light max-w-3xl">
                            {notice.content}
                          </p>
                        )}
                      </div>
                      
                      {notice.attachment ? (
                        <a
                          href={uploadsUrl(notice.attachment)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 mt-4 sm:mt-0 flex items-center gap-2 bg-white border border-[#E7E7E7] hover:border-[#C6A04D] hover:bg-[#C6A04D]/5 text-[#111111] hover:text-[#C6A04D] transition-all px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wide"
                        >
                          <Download size={14} />
                          Download
                        </a>
                      ) : (
                        <div className="flex-shrink-0 mt-4 sm:mt-0 hidden sm:flex items-center justify-center w-10 h-10 rounded-full text-[#DDDDDD] group-hover:text-[#990A25] transition-colors">
                          <ChevronRight size={20} />
                        </div>
                      )}
                    </div>
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
                className="px-6 py-2.5 rounded-full border border-[#E7E7E7] text-[#111111] font-semibold text-sm hover:border-[#111111] hover:bg-[#111111] hover:text-white transition-all disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-[#111111] disabled:hover:border-[#E7E7E7]"
              >
                Previous
              </button>
              <span className="text-sm font-medium text-[#666666] tracking-widest uppercase">Page {page} of {totalPages}</span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-6 py-2.5 rounded-full border border-[#E7E7E7] text-[#111111] font-semibold text-sm hover:border-[#111111] hover:bg-[#111111] hover:text-white transition-all disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-[#111111] disabled:hover:border-[#E7E7E7]"
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
