'use client';

import Link from 'next/link';
import { GraduationCap, Megaphone, ScrollText, Users, Building2, Trophy } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

const quickLinks = [
  { icon: GraduationCap, label: 'Apply Now', href: '/admissions', color: 'text-[#8B0E2A]', bg: 'bg-[#8B0E2A]/10' },
  { icon: Megaphone, label: 'Notice Board', href: '/notices', color: 'text-rose-500', bg: 'bg-rose-50' },
  { icon: ScrollText, label: 'Courses', href: '/courses', color: 'text-[#B8860B]', bg: 'bg-[#B8860B]/10' },
  { icon: Users, label: 'Faculty', href: '/faculty', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { icon: Building2, label: 'Campus', href: '/about#infrastructure', color: 'text-purple-600', bg: 'bg-purple-50' },
  { icon: Trophy, label: 'Achievements', href: '/about#achievements', color: 'text-[#8B0E2A]', bg: 'bg-[#8B0E2A]/10' },
];

interface WelcomeSectionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  welcome?: any;
}

const fallbackWelcome = {
  title: 'A Legacy of Learning, A Future of Promise',
  subtitle: 'Welcome to NREC College',
  paragraphs: [
    'Founded in **1901**, Naththi Mal Ram Sahai Mal Edward Coronation Post Graduate College (NREC College), Khurja has been a beacon of higher education in Uttar Pradesh for over a century.',
    'Affiliated to **Chaudhary Charan Singh University, Meerut**, we offer a wide range of undergraduate and postgraduate programmes across humanities, sciences, commerce, and professional disciplines.',
    'Our commitment to academic excellence, holistic development, and community service has produced thousands of alumni who are leaders across every sphere of national life.'
  ]
};

export default function WelcomeSection({ welcome }: WelcomeSectionProps) {
  const data = welcome || fallbackWelcome;

  // Simple function to parse basic markdown bold syntax for paragraphs
  const renderParagraph = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <section className="bg-white section-py overflow-hidden">
      <div className="container-nrec">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* Left Column: Text */}
          <div className="relative">
            <ScrollReveal direction="up">
              <span className="text-[#B8860B] text-xs font-bold tracking-[0.25em] uppercase mb-4 block">
                {data.subtitle}
              </span>
              <h2 className="text-[40px] md:text-[48px] lg:text-[56px] font-black text-[#111111] leading-[1.1] mb-6 tracking-tight">
                {data.title}
              </h2>
              
              <div className="w-16 h-[3px] bg-gradient-to-r from-[#8B0E2A] to-[#B8860B] mb-8" />
              
              <div className="space-y-5 text-[15px] md:text-[16px] text-gray-600 leading-relaxed font-medium">
                {data.paragraphs.map((p: string, idx: number) => (
                  <p key={idx}>{renderParagraph(p)}</p>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-4 mt-10">
                <Link href="/about" className="btn btn-primary rounded-xl px-8 shadow-md text-center justify-center" style={{ minHeight: '48px' }}>
                  Discover Our Story
                </Link>
                <Link href="/courses" className="btn btn-outline border-[#8B0E2A] text-[#8B0E2A] hover:bg-[#8B0E2A] hover:text-white rounded-xl px-8 text-center justify-center" style={{ minHeight: '48px' }}>
                  View Courses
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Quick Links Grid */}
          <div className="relative">
            <ScrollReveal direction="left">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {quickLinks.map((link, idx) => {
                  const Icon = link.icon;
                  return (
                    <Link 
                      key={idx} 
                      href={link.href}
                      className="group flex flex-col items-center justify-center p-6 bg-white border border-gray-100 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className={`w-14 h-14 rounded-2xl ${link.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon size={24} className={link.color} />
                      </div>
                      <span className="text-[14px] font-bold text-gray-800 text-center leading-tight">
                        {link.label}
                      </span>
                    </Link>
                  );
                })}
              </div>

              {/* Recognitions Bar */}
              <div className="mt-6 flex flex-col sm:flex-row items-center gap-4 bg-gray-50 rounded-xl p-4 border border-gray-100 justify-center">
                <span className="text-[11px] font-bold tracking-widest text-gray-500 uppercase">
                  Recognised By:
                </span>
                <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                  {['UGC', 'NAAC', 'NIRF', 'AISHE'].map((org) => (
                    <span key={org} className="text-[13px] font-black text-gray-800 tracking-wide">
                      {org}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}