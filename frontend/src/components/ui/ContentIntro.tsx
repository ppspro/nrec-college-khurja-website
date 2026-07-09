'use client';

import { Award, GraduationCap, Clock, Calendar } from 'lucide-react';
import SafeImage from './SafeImage';

interface ContentIntroProps {
  slug: string;
}

interface IntroConfig {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  fallbackKey: 'department' | 'news' | 'event' | 'faculty';
  stats: { label: string; value: string; icon: React.ReactNode }[];
}

const configs: Record<string, IntroConfig> = {
  about: {
    title: 'Heritage & Legacy',
    subtitle: 'NREC College Khurja',
    description: 'NREC College stands as one of the oldest and most prestigious educational centers of Northern India. We have been fostering intellectual growth, academic research, and leadership qualities in our students for over a century.',
    image: '/images/campus.jpg',
    fallbackKey: 'department',
    stats: [
      { label: 'Established', value: '1901', icon: <Calendar size={16} /> },
      { label: 'Legacy', value: '125+ Years', icon: <Clock size={16} /> },
      { label: 'Affiliation', value: 'CCSU', icon: <GraduationCap size={16} /> }
    ]
  },
  history: {
    title: 'Our Journey Through Time',
    subtitle: 'A Century of Educational Pride',
    description: 'Established in 1901 as a primary school by the local visionaries, NREC has grown into a premier post-graduate institution offering research and advanced degrees across multiple faculties.',
    image: '/images/history.jpg',
    fallbackKey: 'department',
    stats: [
      { label: 'Growth', value: '100x', icon: <Award size={16} /> },
      { label: 'Courses', value: '25+', icon: <GraduationCap size={16} /> }
    ]
  },
  'vision-mission': {
    title: 'Vision & Mission',
    subtitle: 'Empowering Minds, Shaping Tomorrow',
    description: 'Our mission is to deliver comprehensive, affordable, and quality higher education to all sections of society, fostering ethical values, academic excellence, and modern scientific temperament.',
    image: '/images/vision.jpg',
    fallbackKey: 'department',
    stats: [
      { label: 'Student Focus', value: '100%', icon: <GraduationCap size={16} /> },
      { label: 'Values', value: 'Integrity', icon: <Award size={16} /> }
    ]
  }
};

export default function ContentIntro({ slug }: ContentIntroProps) {
  const config = configs[slug];
  if (!config) return null; // Gracefully render nothing if no config exists for this page slug

  return (
    <div className="bg-white border border-gray-100 rounded-[28px] p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] mb-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        {/* Left Side: Image */}
        <div className="md:col-span-5 relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-gray-50 border border-gray-100/50">
          <SafeImage
            src={config.image}
            fallbackKey={config.fallbackKey}
            alt={config.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Right Side: Text & Highlights */}
        <div className="md:col-span-7 space-y-4">
          <div>
            <span className="text-xs font-bold text-[#B8860B] uppercase tracking-wider block mb-1">
              {config.subtitle}
            </span>
            <h2 className="font-heading font-bold text-[#111111] text-2xl sm:text-3xl leading-tight">
              {config.title}
            </h2>
          </div>
          
          <p className="text-gray-500 text-[14.5px] leading-relaxed font-light">
            {config.description}
          </p>

          {/* Highlights Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
            {config.stats.map((stat, idx) => (
              <div key={idx} className="bg-[#F8F5F0] rounded-xl p-3 flex items-center gap-2.5 border border-[#8B0E2A]/5">
                <div className="w-8 h-8 rounded-lg bg-[#8B0E2A]/10 text-[#8B0E2A] flex items-center justify-center shrink-0">
                  {stat.icon}
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block leading-none mb-0.5">
                    {stat.label}
                  </span>
                  <span className="text-[#111111] text-[13.5px] font-bold leading-none block">
                    {stat.value}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
