import Link from 'next/link';
import { MapPin, Clock } from 'lucide-react';
import { truncate, formatDate } from '@/lib/defaults';
import type { Event } from '@/types';
import { clsx } from 'clsx';

interface EventCardProps {
  event: Event;
  index?: number;
  className?: string;
}

const getEventBadge = (category: string = '', index: number = 0) => {
  const cat = category.toLowerCase();
  if (cat.includes('sport')) return { text: 'text-emerald-600', bg: 'bg-emerald-50' };
  if (cat.includes('seminar')) return { text: 'text-purple-600', bg: 'bg-purple-50' };
  if (cat.includes('cultural')) return { text: 'text-amber-600', bg: 'bg-amber-50' };
  if (cat.includes('workshop')) return { text: 'text-blue-600', bg: 'bg-blue-50' };
  const colors = [
    { text: 'text-emerald-600', bg: 'bg-emerald-50' },
    { text: 'text-purple-600', bg: 'bg-purple-50' },
    { text: 'text-amber-600', bg: 'bg-amber-50' },
    { text: 'text-blue-600', bg: 'bg-blue-50' },
  ];
  return colors[index % colors.length];
};

export default function EventCard({ event, index = 0, className = '' }: EventCardProps) {
  const badge = getEventBadge(event.category, index);
  const eventDate = new Date(event.startDate);
  
  return (
    <div className={clsx("bg-white border border-gray-100 rounded-2xl p-5 md:p-6 flex flex-col sm:flex-row gap-5 md:gap-6 hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:border-gray-200 transition-all duration-300 group relative", className)}>
      
      {/* Date Square */}
      <div className="shrink-0">
        <div className="w-20 h-24 rounded-2xl bg-[#8B0E2A]/10 border border-[#8B0E2A]/15 flex flex-col items-center justify-center group-hover:bg-[#8B0E2A] transition-colors duration-300 shadow-sm">
          <span className="font-heading font-bold text-3xl text-[#8B0E2A] group-hover:text-white transition-colors leading-none">
            {eventDate.getDate().toString().padStart(2, '0')}
          </span>
          <span className="text-[12px] font-bold text-[#8B0E2A] group-hover:text-white transition-colors uppercase tracking-widest mt-1">
            {eventDate.toLocaleDateString('en-US', { month: 'short' })}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-grow min-w-0">
        <div className="mb-2">
          <span className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${badge.bg} ${badge.text}`}>
            {event.category || 'General'}
          </span>
        </div>
        
        <h3 className="font-heading font-bold text-[19px] text-[#111111] mb-2 group-hover:text-[#8B0E2A] transition-colors leading-tight truncate">
          <Link href={`/events/${event.slug}`} className="before:absolute before:inset-0">
            {event.title}
          </Link>
        </h3>
        
        <p className="text-gray-500 text-[14px] leading-relaxed mb-4 font-light line-clamp-2">
          {truncate(event.description || '', 100)}
        </p>
        
        <div className="flex flex-wrap items-center gap-4 text-gray-500 text-[13px] mt-auto">
          <div className="flex items-center gap-1.5">
            <Clock size={14} className="text-gray-400" />
            <span>
              {formatDate(event.startDate)}
            </span>
          </div>
          {event.venue && (
            <div className="flex items-center gap-1.5">
              <MapPin size={14} className="text-gray-400 shrink-0" />
              <span className="truncate max-w-[150px]">{event.venue}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
