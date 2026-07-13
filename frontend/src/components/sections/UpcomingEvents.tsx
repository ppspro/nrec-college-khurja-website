'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import ScrollReveal from '@/components/ui/ScrollReveal';
import EventCard from '@/components/ui/EventCard';
import type { Event } from '@/types';

interface UpcomingEventsProps {
  events: Event[];
}

export default function UpcomingEvents({ events }: UpcomingEventsProps) {
  if (!events || events.length === 0) return null;

  return (
    <section className="bg-[#FAF9F5]/50 section-py relative overflow-hidden border-y border-gray-100/60">
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
          {events.slice(0, 4).map((event, index) => (
            <ScrollReveal
              key={event._id}
              direction="up"
              delay={0.1 * index}
            >
              <EventCard event={event} index={index} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
