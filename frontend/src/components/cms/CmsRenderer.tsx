import React from 'react';
import RichTextSection from './RichTextSection';
import StatsSection from './StatsSection';
import CardsGridSection from './CardsGridSection';
import TimelineSection from './TimelineSection';

interface Section {
  type: string;
  data: any;
  isActive?: boolean;
}

interface CmsRendererProps {
  sections: Section[];
}

export default function CmsRenderer({ sections }: CmsRendererProps) {
  if (!sections || !Array.isArray(sections)) return null;

  return (
    <>
      {sections.filter(s => s.isActive !== false).map((section, index) => {
        switch (section.type) {
          case 'RichText':
            return <RichTextSection key={index} data={section.data} />;
          case 'Stats':
            return <StatsSection key={index} data={section.data} />;
          case 'CardsGrid':
            return <CardsGridSection key={index} data={section.data} />;
          case 'Timeline':
            return <TimelineSection key={index} data={section.data} />;
          default:
            return null;
        }
      })}
    </>
  );
}
