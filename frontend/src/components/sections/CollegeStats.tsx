'use client';

import { Award, BookOpen, GraduationCap, Users } from 'lucide-react';
import StatsBanner, { StatItem } from '@/components/ui/StatsBanner';

const fallbackStats: StatItem[] = [
  {
    id: '1',
    label: 'Years of Excellence',
    value: 123,
    suffix: '+',
    icon: <Award size={28} className="text-[#B8860B]" />,
    description: 'A legacy of quality higher education since 1901',
  },
  {
    id: '2',
    label: 'Alumni Worldwide',
    value: 15000,
    suffix: '+',
    icon: <GraduationCap size={28} className="text-[#8B0E2A]" />,
    description: 'Leading in business, science, and public service',
  },
  {
    id: '3',
    label: 'Departments',
    value: 20,
    suffix: '+',
    icon: <BookOpen size={28} className="text-[#B8860B]" />,
    description: 'Across Arts, Science, Commerce, and Education',
  },
  {
    id: '4',
    label: 'Dedicated Faculty',
    value: 150,
    suffix: '+',
    icon: <Users size={28} className="text-[#8B0E2A]" />,
    description: 'Highly qualified educators and researchers',
  },
];

interface CollegeStatsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stats?: any[];
}

export default function CollegeStats({ stats }: CollegeStatsProps) {
  const displayStats = (!stats || stats.length === 0)
    ? fallbackStats
    : stats.map((s, idx) => ({
        ...s,
        id: s.id || s._id || (idx + 1).toString(),
        icon: s.icon || fallbackStats[idx % fallbackStats.length].icon,
        description: s.description || fallbackStats[idx % fallbackStats.length].description,
        suffix: s.suffix || ''
      }));

  return (
    <section className="relative z-30 section-py bg-[#FAF9F5]/40 border-b border-gray-100 overflow-hidden">
      <div className="container-nrec">
        <StatsBanner stats={displayStats} />
      </div>
    </section>
  );
}
