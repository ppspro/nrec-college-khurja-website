'use client';

import Link from 'next/link';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { truncate, formatDate } from '@/lib/defaults';
import SectionTitle from '@/components/ui/SectionTitle';
import ScrollReveal from '@/components/ui/ScrollReveal';
import type { Event } from '@/types';

interface UpcomingEventsProps {
  events: Event[];
}

const getEventBadge = (category: string = '', index: number) => {
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

export default function UpcomingEvents({ events }: UpcomingEventsProps) {
  if (!events || events.length === 0) return null;

  return (
    <section className="bg-white section-py relative overflow-hidden">
      <div className="container-nrec relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionTitle
            label="What's Happening"
            title="Upcoming Events"
            description=""
            className="mb-0"
          />
          <ScrollReveal direction="left">
            <Link href="/events" className="btn btn-outline btn-md rounded-full group shrink-0 border-[#8B0E2A] text-[#8B0E2A] hover:bg-[#8B0E2A] hover:text-white">
              All Events
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform ml-1" />
            </Link>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {events.slice(0, 4).map((event, index) => {
            const badge = getEventBadge(event.category, index);
            const eventDate = new Date(event.startDate);
            
            return (
              <ScrollReveal
                key={event._id}
                direction="up"
                delay={0.1 * index}
              >
                <div className="bg-white border border-gray-100 rounded-2xl p-5 md:p-6 flex flex-col sm:flex-row gap-5 md:gap-6 hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:border-gray-200 transition-all duration-300 group">
                  
                  {/* Date Square */}
                  <div className="shrink-0">
                    <div className="w-20 h-24 rounded-2xl bg-[#8B0E2A]/10 border border-[#8B0E2A]/15 flex flex-col items-center justify-center group-hover:bg-[#8B0E2A] transition-colors duration-300">
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
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
