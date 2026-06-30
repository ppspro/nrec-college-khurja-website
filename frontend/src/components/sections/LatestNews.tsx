'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar } from 'lucide-react';
import { News } from '@/types';
import { uploadsUrl } from '@/lib/api';

interface LatestNewsProps {
  news: News[];
}

export default function LatestNews({ news }: LatestNewsProps) {
  const displayed = news.length > 0 ? news.slice(0, 3) : [
    { _id: '1', title: 'NREC College Achieves Outstanding Results in Annual University Examination', excerpt: 'Students from multiple departments achieved distinction marks in the CCS University annual examinations, reflecting the quality of teaching.', image: '', publishDate: new Date().toISOString(), category: 'Academic', slug: 'exam-results', author: 'NREC College' },
    { _id: '2', title: 'National Seminar on Environmental Awareness Held at NREC College', excerpt: 'Faculty, students, and external experts gathered for an enriching discourse on environmental sustainability and conservation.', image: '', publishDate: new Date().toISOString(), category: 'Academic', slug: 'seminar', author: 'NREC College' },
    { _id: '3', title: 'Annual Cultural Fest "Utsav 2024" Celebrates Vibrant Student Talent', excerpt: 'The much-awaited annual cultural festival showcased music, dance, theatre, and art by students from all departments.', image: '', publishDate: new Date().toISOString(), category: 'Cultural', slug: 'utsav', author: 'NREC College' },
  ];

  return (
    <section className="bg-[#F9F9F9] section-py">
      <div className="container-nrec">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
          <div>
            <span className="section-label">Media & Updates</span>
            <h2 className="section-title">Latest News</h2>
            <div className="divider-accent" />
          </div>
          <Link href="/news" className="btn btn-outline flex-shrink-0 self-start md:self-auto">
            All News <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {displayed.map((item, idx) => (
            <Link key={item._id} href={`/news/${(item as News).slug}`} className="card card-hover-primary group flex flex-col h-full">
              {/* Image */}
              <div className="relative h-48 bg-gradient-to-br from-[#E7E7E7] to-[#d5d5d5] overflow-hidden">
                {(item as News).image ? (
                  <Image
                    src={uploadsUrl((item as News).image)}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center"
                    style={{ background: idx === 0 ? 'linear-gradient(135deg,#990A25,#7A081E)' : idx === 1 ? 'linear-gradient(135deg,#111,#333)' : 'linear-gradient(135deg,#C6A04D,#9a7a28)' }}>
                    <span className="font-heading text-white text-4xl font-bold opacity-30">N</span>
                  </div>
                )}
                {/* Category badge */}
                <div className="absolute top-3 left-3">
                  <span className="badge bg-white text-[#990A25] text-xs font-bold shadow-sm">
                    {item.category || 'General'}
                  </span>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3 text-xs text-[#666666]">
                  <Calendar size={12} />
                  {new Date((item as News).publishDate).toLocaleDateString('en-IN', {
                    day: 'numeric', month: 'short', year: 'numeric'
                  })}
                </div>
                <h3 className="font-heading font-bold text-[#111111] text-base mb-3 leading-snug group-hover:text-[#990A25] transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-[#666666] text-sm leading-relaxed flex-1 line-clamp-3">
                  {(item as News).excerpt}
                </p>
                <div className="mt-auto pt-4 flex items-center gap-1 text-[#990A25] text-sm font-semibold">
                  Read More <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
