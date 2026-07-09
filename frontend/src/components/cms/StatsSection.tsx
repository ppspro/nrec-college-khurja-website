import React from 'react';
import SectionTitle from '@/components/ui/SectionTitle';
import Card from '@/components/ui/Card';

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

export default function StatsSection({ data }: { data: StatsData }) {
  if (!data || !data.stats) return null;

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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {data.stats.map((stat, index) => (
            <Card key={index} hover className="p-6 text-center border border-gray-100 bg-white rounded-[20px]">
              <div className="font-heading font-bold text-[#8B0E2A] text-4xl mb-2">{stat.value}</div>
              <div className="font-semibold text-[#111111] text-[15px] mb-1">{stat.label}</div>
              {stat.sub && <div className="text-xs text-gray-500 font-medium">{stat.sub}</div>}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
