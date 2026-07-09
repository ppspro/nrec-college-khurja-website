import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import { truncate } from '@/lib/defaults';
import type { News } from '@/types';
import { clsx } from 'clsx';
import SafeImage from './SafeImage';

interface NewsCardProps {
  news: News;
  index?: number;
  className?: string;
}

const getNewsColor = (category: string = '', index: number = 0) => {
  const cat = category.toLowerCase();
  if (cat.includes('academic') || index % 3 === 0) return 'bg-[#8B0E2A]'; // Burgundy
  if (cat.includes('cultural') || index % 3 === 2) return 'bg-[#B8860B]'; // Gold
  return 'bg-[#222222]'; // Black/Charcoal
};

export default function NewsCard({ news, index = 0, className = '' }: NewsCardProps) {
  const bgColor = getNewsColor(news.category, index);

  return (
    <Link href={`/news/${news.slug}`} className={clsx("block h-full group", className)}>
      <div className="bg-white rounded-[20px] overflow-hidden h-full flex flex-col border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:border-gray-200 transition-all duration-300">
        
        {/* Image/Color Block */}
        <div className={clsx("relative aspect-[16/10] flex items-center justify-center overflow-hidden", bgColor)}>
          {news.image ? (
            <SafeImage
              src={news.image}
              alt={news.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <span className="font-heading font-bold text-9xl text-white opacity-10 select-none group-hover:scale-110 group-hover:opacity-15 transition-all duration-500">
              N
            </span>
          )}
          
          {/* Badge & Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          
          {news.category && (
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-white/95 backdrop-blur-sm text-[#8B0E2A] text-[11px] font-bold px-3 py-1.5 rounded-full shadow-sm">
                {news.category}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow relative bg-white">
          <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold mb-3">
            <Calendar size={14} className="text-[#8B0E2A]/70" />
            {new Date(news.publishDate || news.createdAt || new Date()).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}
          </div>
          
          <h3 className="font-heading font-bold text-[18px] text-[#111111] mb-3 leading-tight group-hover:text-[#8B0E2A] transition-colors line-clamp-2">
            {news.title}
          </h3>
          
          <p className="text-gray-500 text-[14.5px] leading-relaxed font-light mb-6 flex-grow line-clamp-3">
            {truncate(news.excerpt || news.content?.replace(/<[^>]+>/g, '') || '', 140)}
          </p>
          
          <div className="flex items-center gap-1.5 text-[#8B0E2A] font-bold text-[13.5px] mt-auto group-hover:translate-x-1 transition-transform">
            Read More
            <ArrowRight size={14} />
          </div>
        </div>
      </div>
    </Link>
  );
}
