import React from 'react';
import SectionTitle from '@/components/ui/SectionTitle';
import StatsBanner, { StatItem } from '@/components/ui/StatsBanner';
import { Award, BookOpen, GraduationCap, Users } from 'lucide-react';

interface Stat {
  label: string;
  value: string;
  sub?: string;
}

interface StatsData {
  label?: string;
  title?: string;
  stats: Stat[];
}

const icons = [
  <Award key="award" size={32} className="text-[#8B0E2A]" />,
  <BookOpen key="book" size={32} className="text-[#B8860B]" />,
  <GraduationCap key="cap" size={32} className="text-[#8B0E2A]" />,
  <Users key="users" size={32} className="text-[#B8860B]" />
];

export default function StatsSection({ data }: { data: StatsData }) {
  if (!data || !data.stats) return null;

  const parsedStats: StatItem[] = data.stats.map((stat, index) => {
    // Attempt to extract numeric value and suffix (e.g. "100+" -> 100, "+")
    const match = String(stat.value).match(/^([0-9.,]+)(.*)$/);
    const numValue = match ? parseFloat(match[1].replace(/,/g, '')) : stat.value;
    const suffix = match ? match[2] : '';

    return {
      id: index.toString(),
      label: stat.label,
      value: isNaN(Number(numValue)) ? stat.value : Number(numValue),
      suffix: suffix,
      icon: icons[index % icons.length],
      description: stat.sub
    };
  });

  return (
    <section className="bg-[#F8F5F0] section-py">
      <div className="container-nrec">
        {(data.title || data.label) && (
          <SectionTitle
            label={data.label}
            title={data.title || ''}
            align="center"
            className="mb-12"
          />
        )}
        <StatsBanner stats={parsedStats} />
      </div>
    </section>
  );
}
