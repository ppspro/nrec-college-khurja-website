'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowRight } from 'lucide-react';
import api, { uploadsUrl } from '@/lib/api';
import { News } from '@/types';
import PageBanner from '@/components/ui/PageBanner';

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

      <section className="bg-white section-py relative">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        
        <div className="container-nrec relative">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => <div key={i} className="skeleton h-[420px] rounded-xl" />)}
            </div>
          ) : news.length === 0 ? (
            <div className="text-center py-20 text-[#666666]">No news available at the moment.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((item) => (
                <Link key={item._id} href={`/news/${item.slug}`} className="group flex flex-col h-full bg-white border border-[#E7E7E7] rounded-xl overflow-hidden hover:shadow-xl hover:border-[#C6A04D]/30 transition-all duration-500">
                  <div className="relative h-56 bg-[#F9F9F9] overflow-hidden">
                    {item.image ? (
                      <Image src={uploadsUrl(item.image)} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                    ) : (
                      <div className="w-full h-full bg-[#111111] relative overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                        <span className="font-heading text-8xl font-bold text-white opacity-5 tracking-tighter select-none scale-150 rotate-12 group-hover:scale-[1.6] group-hover:rotate-6 transition-transform duration-700">NREC</span>
                      </div>
                    )}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-white text-[#990A25] text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded shadow-sm">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-8 flex flex-col flex-1 bg-white">
                    <div className="flex items-center gap-2 mb-4 text-xs font-semibold text-[#666666] tracking-wider uppercase">
                      <Calendar size={13} className="text-[#C6A04D]" />
                      {new Date(item.publishDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                    
                    <h3 className="font-heading font-bold text-[#111111] text-xl mb-4 line-clamp-2 group-hover:text-[#990A25] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    
                    <p className="text-[#666666] text-sm line-clamp-3 mb-6 font-light leading-relaxed flex-1">
                      {item.excerpt}
                    </p>
                    
                    <div className="mt-auto pt-5 border-t border-[#E7E7E7]/60 flex items-center justify-between group-hover:border-[#990A25]/20 transition-colors">
                      <span className="text-xs font-semibold text-[#111111] uppercase tracking-wider group-hover:text-[#990A25] transition-colors">
                        Read Story
                      </span>
                      <div className="w-8 h-8 rounded-full border border-[#E7E7E7] flex items-center justify-center text-[#990A25] group-hover:bg-[#990A25] group-hover:border-[#990A25] group-hover:text-white transition-all duration-300">
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-16">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))} 
                disabled={page === 1} 
                className="px-6 py-2.5 rounded-full border border-[#E7E7E7] text-[#111111] font-semibold text-sm hover:border-[#111111] hover:bg-[#111111] hover:text-white transition-all disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-[#111111] disabled:hover:border-[#E7E7E7]"
              >
                Previous
              </button>
              <span className="text-sm font-medium text-[#666666] tracking-widest uppercase">Page {page} of {totalPages}</span>
              <button 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))} 
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
