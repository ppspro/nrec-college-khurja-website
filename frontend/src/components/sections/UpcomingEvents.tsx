'use client';

import Link from 'next/link';
import { ArrowRight, Calendar, MapPin, Clock } from 'lucide-react';
import { Event } from '@/types';

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  Academic: { bg: '#2563EB15', text: '#2563EB' },
  Cultural: { bg: '#C6A04D18', text: '#9a7a28' },
  Sports: { bg: '#05966918', text: '#059669' },
  Seminar: { bg: '#7C3AED15', text: '#7C3AED' },
  Workshop: { bg: '#0891B215', text: '#0891B2' },
  Exam: { bg: '#DC262615', text: '#DC2626' },
  Other: { bg: '#66666615', text: '#666666' },
};

interface UpcomingEventsProps {
  events: Event[];
}

export default function UpcomingEvents({ events }: UpcomingEventsProps) {
  const displayed = events.length > 0 ? events.slice(0, 4) : [
    { _id: '1', title: 'Annual Sports Meet 2024', description: 'Track and field, team sports, and individual championships.', startDate: '2026-07-04T09:00:00.000Z', startTime: '9:00 AM', venue: 'College Ground', category: 'Sports', slug: 'sports-meet', isPublished: true },
    { _id: '2', title: 'National Seminar: Science & Technology', description: 'Interdisciplinary seminar with keynote speakers from IITs.', startDate: '2026-07-11T10:00:00.000Z', startTime: '10:00 AM', venue: 'Seminar Hall', category: 'Seminar', slug: 'seminar-2024', isPublished: true },
    { _id: '3', title: 'Cultural Festival — Utsav 2024', description: 'Annual college festival celebrating art, music, and drama.', startDate: '2026-07-18T11:00:00.000Z', startTime: '11:00 AM', venue: 'College Auditorium', category: 'Cultural', slug: 'utsav-2024', isPublished: true },
    { _id: '4', title: 'Career Guidance Workshop', description: 'Expert talks on career paths, UPSC, corporate jobs, and entrepreneurship.', startDate: '2026-07-25T14:00:00.000Z', startTime: '2:00 PM', venue: 'Main Hall', category: 'Workshop', slug: 'career-workshop', isPublished: true },
  ];

  return (
    <section className="bg-white section-py">
      <div className="container-nrec">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
          <div>
            <span className="section-label">What&apos;s Happening</span>
            <h2 className="section-title">Upcoming Events</h2>
            <div className="divider-accent" />
          </div>
          <Link href="/events" className="btn btn-outline flex-shrink-0 self-start md:self-auto">
            All Events <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayed.map((event) => {
            const date = new Date((event as Event).startDate);
            const colors = CATEGORY_COLORS[(event as Event).category] || CATEGORY_COLORS.Other;

            return (
              <Link
                key={event._id}
                href={`/events/${(event as Event).slug}`}
                className="card card-hover-primary p-8 group flex flex-row gap-6 h-full"
              >
                {/* Date block */}
                <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-[#990A25]/10 flex flex-col items-center justify-center text-[#990A25] border border-[#990A25]/20 shadow-sm">
                  <span className="font-heading font-bold text-2xl leading-none">{date.getDate()}</span>
                  <span className="text-sm font-semibold opacity-90 uppercase tracking-wide mt-1">
                    {date.toLocaleDateString('en-IN', { month: 'short' })}
                  </span>
                </div>

                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="badge text-xs" style={{ background: colors.bg, color: colors.text }}>
                      {(event as Event).category}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-[#111111] text-xl mb-3 group-hover:text-[#990A25] transition-colors leading-tight line-clamp-2">
                    {event.title}
                  </h3>
                  <p className="text-[#666666] text-[15px] leading-relaxed line-clamp-2 mb-4">
                    {(event as Event).description}
                  </p>
                  <div className="mt-auto pt-4 flex flex-wrap items-center gap-4 text-sm text-[#666666] border-t border-[#E7E7E7]/60">
                    {(event as Event).startTime && (
                      <span className="flex items-center gap-1.5">
                        <Clock size={14} />{(event as Event).startTime}
                      </span>
                    )}
                    {(event as Event).venue && (
                      <span className="flex items-center gap-1.5">
                        <MapPin size={14} />{(event as Event).venue}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
