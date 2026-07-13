'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import ScrollReveal from '@/components/ui/ScrollReveal';
import NewsCard from '@/components/ui/NewsCard';
import type { News } from '@/types';

interface LatestNewsProps {
  news: News[];
}

const fallbackNews: News[] = [
  { _id: '1', title: 'NREC College Achieves Outstanding Results in Annual University Examination', slug: 'outstanding-results', category: 'Academic', publishDate: new Date('2026-07-01').toISOString(), content: '', isFeatured: true, excerpt: '', image: '', tags: [], isPublished: true, author: '', createdAt: '' },
  { _id: '2', title: 'National Seminar on Environmental Awareness Held at NREC College', slug: 'national-seminar', category: 'Academic', publishDate: new Date('2026-07-01').toISOString(), content: '', isFeatured: true, excerpt: '', image: '', tags: [], isPublished: true, author: '', createdAt: '' },
  { _id: '3', title: 'Annual Cultural Fest "Utsav 2024" Celebrates Vibrant Student Talent', slug: 'cultural-fest', category: 'Cultural', publishDate: new Date('2026-07-01').toISOString(), content: '', isFeatured: true, excerpt: '', image: '', tags: [], isPublished: true, author: '', createdAt: '' }
] as News[];

export default function LatestNews({ news }: LatestNewsProps) {
  const displayNews = (!news || news.length === 0) ? fallbackNews : news;

  return (
    <section className="bg-[#FAF9F5]/50 section-py border-y border-gray-100/60">
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
          {displayNews.slice(0, 3).map((item, index) => (
            <ScrollReveal
              key={item._id}
              direction="up"
              delay={0.1 * index}
              className="h-full"
            >
              <NewsCard news={item} index={index} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
