'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar as CalendarIcon, MapPin, Clock, ArrowRight, Search, FileText } from 'lucide-react';
import api, { uploadsUrl } from '@/lib/api';
import { Event } from '@/types';
import PageBanner from '@/components/ui/PageBanner';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SafeImage from '@/components/ui/SafeImage';
import EmptyState from '@/components/ui/EmptyState';
import { truncate, formatDate } from '@/lib/defaults';

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [inputVal, setInputVal] = useState('');

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (search) params.set('search', search);
        const res = await api.get(`/events?${params}`);
        setEvents(res.data.events || []);
      } catch {
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [search]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(inputVal);
  };

  const breadcrumbs = [{ label: 'Events' }];

  return (
    <>
      <PageBanner
        title="Campus Events"
        subtitle="Stay updated with academic conferences, seminars, workshops, and student festivals."
        breadcrumbs={breadcrumbs}
      />

      <section className="bg-[#F8F5F0] section-py relative">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#111111 2px, transparent 2px)', backgroundSize: '32px 32px' }} />

        <div className="container-nrec relative z-10">
          {/* Search Box */}
          <ScrollReveal direction="up" className="max-w-xl mx-auto mb-16">
            <form onSubmit={handleSearch} className="flex gap-3">
              <div className="relative flex-1 group">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#8B0E2A] transition-colors" />
                <input
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Search events..."
                  className="w-full bg-white border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 text-[15px] text-[#111111] focus:outline-none focus:border-[#8B0E2A] transition-all shadow-sm"
                />
              </div>
              <button type="submit" className="bg-[#8B0E2A] hover:bg-[#6F0B22] text-white px-8 rounded-xl font-semibold text-sm transition-colors shadow-md">
                Search
              </button>
            </form>
          </ScrollReveal>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="skeleton h-[420px] rounded-[24px]" />
              ))}
            </div>
          ) : events.length === 0 ? (
            <EmptyState icon={<CalendarIcon size={32} className="text-gray-400" />} title="No events found" description="Try broadening your search or check back later." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event, index) => (
                <ScrollReveal
                  key={event._id}
                  direction="up"
                  delay={0.05 * (index % 3)}
                  className="h-full"
                >
                  <div className="card group h-full flex flex-col p-0 overflow-hidden hover:shadow-[0_20px_40px_rgba(139,14,42,0.08)] transition-all duration-500 border border-gray-100 bg-white rounded-[24px]">
                    {/* Image Area */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <SafeImage
                        fallbackKey="event"
                        src={uploadsUrl(event.image)}
                        alt={event.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />

                      {/* Floating Date Badge */}
                      <div className="absolute top-4 right-4 bg-white/95 rounded-xl shadow-lg flex flex-col items-center justify-center p-2 min-w-[64px] border border-gray-100/50 backdrop-blur-md">
                        <span className="text-[#8B0E2A] font-heading font-bold text-xl leading-none">
                          {new Date(event.startDate).getDate().toString().padStart(2, '0')}
                        </span>
                        <span className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mt-1">
                          {new Date(event.startDate).toLocaleDateString('en-US', { month: 'short' })}
                        </span>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-8 flex flex-col flex-grow bg-white">
                      <h3 className="font-heading font-bold text-xl text-[#111111] mb-3 group-hover:text-[#8B0E2A] transition-colors leading-tight">
                        {event.title}
                      </h3>

                      <p className="text-gray-500 text-sm leading-relaxed mb-6 font-light flex-grow">
                        {truncate(event.description || '', 120)}
                      </p>

                      <div className="space-y-3 pt-4 border-t border-gray-100 mt-auto">
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <Clock size={16} className="text-[#B8860B]" />
                          <span>
                            {formatDate(event.startDate)}
                            {event.endDate && event.endDate !== event.startDate && ` - ${formatDate(event.endDate)}`}
                          </span>
                        </div>
                        {event.venue && (
                          <div className="flex items-start gap-3 text-sm text-gray-600">
                            <MapPin size={16} className="text-[#B8860B] shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{event.venue}</span>
                          </div>
                        )}
                      </div>

                      {event.registrationLink && (
                        <a
                          href={event.registrationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary w-full justify-center rounded-xl mt-6 font-semibold"
                        >
                          Register Now
                        </a>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
