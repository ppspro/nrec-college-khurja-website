'use client';

import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import { truncate } from '@/lib/defaults';
import SectionTitle from '@/components/ui/SectionTitle';
import ScrollReveal from '@/components/ui/ScrollReveal';
import type { News } from '@/types';

interface LatestNewsProps {
  news: News[];
}

const getNewsColor = (category: string = '', index: number) => {
  const cat = category.toLowerCase();
  if (cat.includes('academic') || index % 3 === 0) return 'bg-[#8B0E2A]'; // Burgundy
  if (cat.includes('cultural') || index % 3 === 2) return 'bg-[#B8860B]'; // Gold
  return 'bg-[#222222]'; // Black/Charcoal
};

const fallbackNews: News[] = [
  { _id: '1', title: 'NREC College Achieves Outstanding Results in Annual University Examination', slug: 'outstanding-results', category: 'Academic', publishDate: new Date('2026-07-01').toISOString(), content: '', isFeatured: true, excerpt: '', image: '', tags: [], isPublished: true, author: '', createdAt: '' },
  { _id: '2', title: 'National Seminar on Environmental Awareness Held at NREC College', slug: 'national-seminar', category: 'Academic', publishDate: new Date('2026-07-01').toISOString(), content: '', isFeatured: true, excerpt: '', image: '', tags: [], isPublished: true, author: '', createdAt: '' },
  { _id: '3', title: 'Annual Cultural Fest "Utsav 2024" Celebrates Vibrant Student Talent', slug: 'cultural-fest', category: 'Cultural', publishDate: new Date('2026-07-01').toISOString(), content: '', isFeatured: true, excerpt: '', image: '', tags: [], isPublished: true, author: '', createdAt: '' }
] as News[];

export default function LatestNews({ news }: LatestNewsProps) {
  const displayNews = (!news || news.length === 0) ? fallbackNews : news;

  return (
    <section className="bg-white section-py">
      <div className="container-nrec">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionTitle
            label="Media & Updates"
            title="Latest News"
            description=""
            className="mb-0"
          />
          <ScrollReveal direction="left">
            <Link 
              href="/news" 
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-[14px] font-bold text-[#8B0E2A] border border-[#8B0E2A] rounded-full hover:bg-[#8B0E2A] hover:text-white transition-colors"
            >
              All News
              <ArrowRight size={16} />
            </Link>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayNews.slice(0, 3).map((item, index) => {
            const bgColor = getNewsColor(item.category, index);
            return (
              <ScrollReveal
                key={item._id}
                direction="up"
                delay={0.1 * index}
                className="h-full"
              >
                <Link href={`/news/${item.slug}`} className="block h-full group">
                  <div className="bg-white rounded-[20px] overflow-hidden h-full flex flex-col border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:border-gray-200 transition-all duration-300">
                    
                    {/* Color Block Image Replacement */}
                    <div className={`relative aspect-[16/10] ${bgColor} flex items-center justify-center overflow-hidden`}>
                      {/* Badge */}
                      {item.category && (
                        <div className="absolute top-4 left-4 z-10">
                          <span className="bg-white text-[#8B0E2A] text-[11px] font-bold px-3 py-1.5 rounded-full shadow-sm">
                            {item.category}
                          </span>
                        </div>
                      )}
                      {/* Watermark */}
                      <span className="font-heading font-bold text-9xl text-white opacity-10 select-none group-hover:scale-110 group-hover:opacity-15 transition-all duration-500">
                        N
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold mb-3">
                        <Calendar size={14} />
                        {new Date(item.publishDate || item.createdAt).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </div>
                      
                      <h3 className="font-heading font-bold text-[18px] text-[#111111] mb-3 leading-tight group-hover:text-[#8B0E2A] transition-colors">
                        {item.title}
                      </h3>
                      
                      <p className="text-gray-500 text-[14.5px] leading-relaxed font-light mb-6 flex-grow">
                        {truncate(item.excerpt || item.content?.replace(/<[^>]+>/g, '') || '', 140)}
                      </p>
                      
                      <div className="flex items-center gap-1.5 text-[#8B0E2A] font-bold text-[13.5px] mt-auto">
                        Read More
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
