'use client';

import React from 'react';
import CmsRenderer from '@/components/cms/CmsRenderer';
import { Layers, Sparkles, BookOpen, Heart, Landmark, ExternalLink, Image as ImageIcon, BookMarked, Wifi, Users, Trophy, Zap } from 'lucide-react';
import SafeImage from '@/components/ui/SafeImage';
import Link from 'next/link';

interface CampusTemplateProps {
  slug: string;
  sections: any[];
}

const slugConfig: Record<string, {
  image: string;
  title: string;
  subtitle: string;
  badge: string;
  stats: { label: string; value: string }[];
  features: { icon: React.ReactNode; title: string; desc: string }[];
}> = {
  library: {
    image: '/images/nrec/library.jpg',
    title: 'Central Library',
    subtitle: 'Knowledge Hub | NREC College Khurja',
    badge: 'Library & Information Centre',
    stats: [
      { label: 'Books & Volumes', value: '40,000+' },
      { label: 'Journals', value: '120+' },
      { label: 'Reading Seats', value: '200+' },
      { label: 'Digital Terminals', value: '30+' },
    ],
    features: [
      { icon: <BookMarked size={18} />, title: 'INFLIBNET N-LIST', desc: 'Access to thousands of online journals and e-books via N-LIST portal' },
      { icon: <Wifi size={18} />, title: 'Digital Library', desc: 'Free WiFi and e-resources access for registered students and faculty' },
      { icon: <Users size={18} />, title: 'Reading Room', desc: 'Dedicated silent reading zones with individual study cubicles' },
    ],
  },
  sports: {
    image: '/images/nrec/sports.jpg',
    title: 'Sports & Athletics',
    subtitle: 'Physical Excellence | NREC College Khurja',
    badge: 'Sports & Physical Education',
    stats: [
      { label: 'Sports Grounds', value: '3' },
      { label: 'Indoor Facilities', value: '5+' },
      { label: 'Annual Events', value: '10+' },
      { label: 'Medal Winners', value: '50+' },
    ],
    features: [
      { icon: <Trophy size={18} />, title: 'Inter-College Tournaments', desc: 'Students participate in CCS University and state-level sporting competitions' },
      { icon: <Zap size={18} />, title: 'Athletics Training', desc: 'Certified coaches for cricket, volleyball, kabaddi, and athletics' },
      { icon: <Heart size={18} />, title: 'Physical Education', desc: 'Mandatory physical education programs for holistic student development' },
    ],
  },
};

const defaultConfig = {
  image: '/images/nrec/campus.jpg',
  title: 'Campus Facilities',
  subtitle: 'Infrastructure Excellence | NREC College',
  badge: 'NREC Infrastructure',
  stats: [
    { label: 'Total Area', value: '10+ Acres' },
    { label: 'Classrooms', value: '50+' },
    { label: 'Labs', value: '15+' },
    { label: 'Annual Students', value: '5000+' },
  ],
  features: [
    { icon: <BookOpen size={18} />, title: 'Central Library', desc: 'Hosts thousands of books, journals, and digital library systems via INFLIBNET N-LIST portals.' },
    { icon: <Layers size={18} />, title: 'Modern Science Labs', desc: 'Department labs with essential scientific tooling for Botany, Zoology, Chemistry, and Physics.' },
    { icon: <Landmark size={18} />, title: 'Green Environment', desc: 'A clean, plastic-free environment providing lush green lawns and eco-friendly structures.' },
  ],
};

export default function CampusTemplate({ slug, sections }: CampusTemplateProps) {
  const config = slugConfig[slug] || defaultConfig;

  return (
    <div className="space-y-10">
      
      {/* Large Image Showcase Section */}
      <div className="relative h-[280px] w-full rounded-[28px] overflow-hidden bg-gray-950 border border-gray-200 shadow-md group">
        <SafeImage
          src={config.image}
          fallbackKey="campus"
          alt={config.title}
          fill
          className="object-cover opacity-90 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="text-[#B8860B]" size={14} />
            <span className="text-[10px] uppercase tracking-wider text-[#B8860B] font-bold">{config.badge}</span>
          </div>
          <h3 className="font-heading font-black text-2xl md:text-3xl text-white">{config.title}</h3>
          <p className="text-gray-300 text-xs font-light max-w-xl mt-1.5 leading-relaxed">{config.subtitle}</p>
        </div>
      </div>

      {/* Stats Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {config.stats.map((stat, idx) => (
          <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition-all hover:border-[#8B0E2A]/20">
            <div className="font-heading font-black text-2xl text-[#8B0E2A] mb-1">{stat.value}</div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Feature Highlights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {config.features.map((feature, idx) => (
          <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex gap-4 hover:border-[#8B0E2A]/20 group">
            <div className="w-10 h-10 rounded-xl bg-[#8B0E2A]/5 text-[#8B0E2A] flex items-center justify-center shrink-0 group-hover:bg-[#8B0E2A] group-hover:text-white transition-all">
              {feature.icon}
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm mb-1">{feature.title}</h4>
              <p className="text-gray-400 text-xs font-light leading-relaxed">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main CMS Sections */}
      {sections.length > 0 && (
        <div className="bg-white border border-gray-100 rounded-[28px] p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
          <CmsRenderer sections={sections} />
        </div>
      )}

      {/* Quick Gallery Preview Block */}
      <div className="bg-[#8B0E2A]/3 border border-[#8B0E2A]/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#8B0E2A] shadow-sm border border-[#8B0E2A]/10">
            <ImageIcon size={18} />
          </div>
          <div>
            <h4 className="font-bold text-gray-800 text-xs sm:text-sm">Campus Life Gallery Archives</h4>
            <p className="text-gray-400 text-[11px] font-light">Explore academic events, library catalogs, and athletic galleries.</p>
          </div>
        </div>
        <Link href="/gallery" className="shrink-0 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-white border border-gray-200 text-xs font-bold text-gray-700 hover:bg-[#8B0E2A] hover:text-white hover:border-[#8B0E2A] transition-all">
          Open Gallery <ExternalLink size={12} />
        </Link>
      </div>

    </div>
  );
}
