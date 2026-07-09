'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight, LayoutGrid, Newspaper } from 'lucide-react';
import api, { uploadsUrl } from '@/lib/api';
import { News } from '@/types';
import PageBanner from '@/components/ui/PageBanner';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SafeImage from '@/components/ui/SafeImage';
import EmptyState from '@/components/ui/EmptyState';
import { truncate } from '@/lib/defaults';

export default function NewsPage() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/news?page=${page}&limit=9`);
        setNews(res.data.news || []);
        setTotalPages(res.data.pagination?.pages || 1);
      } catch { setNews([]); }
      finally { setLoading(false); }
    };
    fetch();
  }, [page]);

  const breadcrumbs = [{ label: 'News' }];

  return (
    <>
      <PageBanner
        title="News & Updates"
        subtitle="The latest happenings, announcements, and stories from our campus."
        breadcrumbs={breadcrumbs}
      />

      <section className="bg-[#F8F5F0] section-py relative">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#8B0E2A 1px, transparent 1px), linear-gradient(90deg, #8B0E2A 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <div className="container-nrec relative">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => <div key={i} className="skeleton h-[420px] rounded-[24px]" />)}
            </div>
          ) : news.length === 0 ? (
            <EmptyState icon={<Newspaper size={32} className="text-gray-400" />} title="No news available at the moment" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {news.map((item, idx) => (
                <ScrollReveal key={item._id} direction="up" delay={0.05 * (idx % 3)} className="h-full">
                  <Link href={`/news/${item.slug}`} className="group flex flex-col h-full bg-white border border-gray-100 rounded-[20px] overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="relative h-56 bg-gray-100 overflow-hidden">
                      <SafeImage
                        fallbackKey="news"
                        src={uploadsUrl(item.image)}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />

                      <div className="absolute top-4 left-4 z-10">
                        <span className="bg-[#8B0E2A] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-sm">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-8 flex flex-col flex-1 bg-white relative">
                      {/* Icon overlay */}
                      <div className="absolute -top-6 right-6 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-[#B8860B] border border-gray-100 group-hover:bg-[#B8860B] group-hover:text-white transition-colors duration-300">
                        <LayoutGrid size={20} />
                      </div>

                      <div className="flex items-center gap-2 mb-4 text-xs font-semibold text-gray-500 tracking-wider uppercase">
                        <Calendar size={13} className="text-[#B8860B]" />
                        {new Date(item.publishDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                      
                      <h3 className="font-heading font-bold text-[#111111] text-xl mb-4 line-clamp-2 group-hover:text-[#8B0E2A] transition-colors leading-snug">
                        {item.title}
                      </h3>
                      
                      <p className="text-gray-500 text-sm line-clamp-3 mb-6 font-light leading-relaxed flex-1">
                        {item.excerpt || truncate(item.content?.replace(/<[^>]+>/g, '') || '', 120)}
                      </p>
                      
                      <div className="mt-auto pt-5 border-t border-gray-100 flex items-center justify-between group-hover:border-gray-200 transition-colors">
                        <span className="text-xs font-semibold text-[#111111] uppercase tracking-wider group-hover:text-[#8B0E2A] transition-colors">
                          Read Story
                        </span>
                        <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-[#8B0E2A] group-hover:bg-[#8B0E2A] group-hover:border-[#8B0E2A] group-hover:text-white transition-all duration-300">
                          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          )}
          
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-16">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))} 
                disabled={page === 1} 
                className="px-6 py-2.5 rounded-full border border-gray-200 text-[#111111] font-semibold text-sm hover:border-[#111111] hover:bg-[#111111] hover:text-white transition-all disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-[#111111] disabled:hover:border-gray-200 bg-white"
              >
                Previous
              </button>
              <span className="text-sm font-medium text-gray-500 tracking-widest uppercase">Page {page} of {totalPages}</span>
              <button 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))} 
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
