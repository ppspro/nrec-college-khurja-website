import React from 'react';
import SectionTitle from '@/components/ui/SectionTitle';
import Timeline from '@/components/ui/Timeline';

interface TimelineSectionData {
  title?: string;
  subtitle?: string;
  items: {
    year?: string;
    step?: string;
    title: string;
    description: string;
  }[];
}

export default function TimelineSection({ data }: { data: TimelineSectionData }) {
  if (!data || !data.items || !Array.isArray(data.items)) return null;

  return (
    <section className="bg-white section-py">
      <div className="container-nrec">
        {(data.title || data.subtitle) && (
          <SectionTitle
            label={data.subtitle}
            title={data.title || ''}
            align="center"
            className="mb-14"
          />
        )}
        <div className="max-w-4xl mx-auto">
          <Timeline items={data.items} layout="vertical" />
        </div>
      </div>
    </section>
  );
}
