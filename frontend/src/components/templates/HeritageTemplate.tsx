'use client';

import React from 'react';
import CmsRenderer from '@/components/cms/CmsRenderer';
import { Calendar, Clock, GraduationCap, Award } from 'lucide-react';
import SafeImage from '@/components/ui/SafeImage';

interface HeritageTemplateProps {
  slug: string;
  sections: any[];
}

export default function HeritageTemplate({ slug, sections }: HeritageTemplateProps) {
  const isAbout = slug === 'about';

  if (isAbout) {
    return (
      <div className="bg-[#FDFBF7] border border-[#B8860B]/15 rounded-[32px] p-6 sm:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.02)] space-y-16">
        
        {/* Heritage Story Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Side: Identity & Heritage Intro */}
          <div className="lg:col-span-7 space-y-5 relative">
            {/* Vertical Accent text */}
            <div className="absolute right-0 top-0 opacity-[0.03] select-none pointer-events-none hidden md:block">
              <span className="font-heading font-black text-7xl text-[#8B0E2A] uppercase tracking-wider block rotate-90 origin-right translate-x-12 translate-y-12">
                Heritage
              </span>
            </div>
            
            <span className="text-xs font-bold text-[#B8860B] uppercase tracking-widest block">
              Founded 1901 | Legacy of Light
            </span>
            <h2 className="font-heading font-bold text-[#111111] text-3xl sm:text-4xl leading-tight">
              An Institution Built on Honor & Scholarly Grace
            </h2>
            <div className="text-gray-700 text-[15.5px] md:text-[16px] lg:text-[17px] leading-[1.85] font-normal space-y-4">
              <p>
                As Bulandshahr district's oldest higher education institution, NREC College Khurja represents over a century of academic values, transforming lives since the dawn of 1901.
              </p>
              <p>
                Initially founded as a pathfinder school, we have grown into a multi-faculty degree college with national accreditation.
              </p>
            </div>
          </div>

          {/* Right Side: Campus Image inside Heritage Frame */}
          <div className="lg:col-span-5 relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-gray-50 border-4 border-[#B8860B]/20 shadow-md">
            <SafeImage
              src="/images/nrec/campus.jpg"
              fallbackKey="department"
              alt="NREC College Heritage Campus"
              fill
              className="object-cover"
            />
          </div>
        </div>

      {/* Main CMS Contents */}
      {sections.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Archive Content */}
          <div className="lg:col-span-8 bg-white border border-gray-100 rounded-[24px] p-6 sm:p-10 shadow-sm prose max-w-none text-gray-700 leading-relaxed font-light text-[15px]">
            <CmsRenderer sections={sections} />
          </div>

          {/* Right Column: Legacy Sidebar */}
          <div className="lg:col-span-4 space-y-6 sticky top-28">
            {/* Accreditation Callout */}
            <div className="bg-[#8B0E2A]/5 border border-[#8B0E2A]/10 rounded-2xl p-6 text-center space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#8B0E2A] block">Quality Credential</span>
              <h4 className="font-heading font-black text-xl text-[#111111]">NAAC Accredited</h4>
              <p className="text-xs text-gray-500 font-light leading-relaxed">
                Commitment to quality higher education, serving Bulandshahr since 1901.
              </p>
            </div>

            {/* Quick Facts Panel */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
              <h4 className="font-heading font-bold text-sm text-gray-900 uppercase tracking-wider pb-2 border-b border-gray-50">
                Institutional Profile
              </h4>
              <ul className="text-xs text-gray-500 font-light space-y-3">
                <li className="flex justify-between py-1 border-b border-gray-50">
                  <span className="font-medium text-gray-400">Type</span>
                  <span className="text-gray-800 font-medium">Co-Educational</span>
                </li>
                <li className="flex justify-between py-1 border-b border-gray-50">
                  <span className="font-medium text-gray-400">Affiliation</span>
                  <span className="text-gray-800 font-medium">CCS University, Meerut</span>
                </li>
                <li className="flex justify-between py-1 border-b border-gray-50">
                  <span className="font-medium text-gray-400">Location</span>
                  <span className="text-gray-800 font-medium">Khurja, Uttar Pradesh</span>
                </li>
                <li className="flex justify-between py-1">
                  <span className="font-medium text-gray-400">Campus Area</span>
                  <span className="text-gray-800 font-medium">10+ Acres</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-[#B8860B]/20 rounded-2xl p-8 hover:shadow-md transition-all flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#8B0E2A]/5 text-[#8B0E2A] flex items-center justify-center mb-4 border border-[#8B0E2A]/10">
              <Calendar size={20} />
            </div>
            <h4 className="font-heading font-black text-3xl text-[#111111] mb-1">1901</h4>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Foundation Year</span>
          </div>

          <div className="bg-[#B8860B]/5 border border-[#B8860B]/20 rounded-2xl p-8 hover:shadow-md transition-all flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#B8860B]/10 text-[#B8860B] flex items-center justify-center mb-4">
              <Clock size={20} />
            </div>
            <h4 className="font-heading font-black text-3xl text-[#111111] mb-1">125+ Years</h4>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#B8860B]">Academic Excellence</span>
          </div>

          <div className="bg-white border border-[#B8860B]/20 rounded-2xl p-8 hover:shadow-md transition-all flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#8B0E2A]/5 text-[#8B0E2A] flex items-center justify-center mb-4 border border-[#8B0E2A]/10">
              <GraduationCap size={20} />
            </div>
            <h4 className="font-heading font-black text-2xl text-[#111111] mb-1">CCS University</h4>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Affiliation Authority</span>
          </div>
        </div>

      </div>
    );
  }

  // History Page: Historical vertical timeline style
  return (
    <div className="bg-[#FDFBF7] border border-[#B8860B]/15 rounded-[32px] p-6 sm:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.02)] space-y-16">
      
      {/* Museum Era Header banner */}
      <div className="flex justify-between items-center border-b border-[#B8860B]/20 pb-8">
        <div>
          <span className="text-xs font-bold text-[#B8860B] uppercase tracking-widest block mb-1">Historical Archives</span>
          <h2 className="font-heading font-black text-3xl text-[#111111]">Timeline of Milestones</h2>
        </div>
        <div className="hidden sm:block text-right">
          <span className="font-heading font-black text-6xl text-[#8B0E2A]/10 select-none block leading-none">
            1901
          </span>
          <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold block -mt-1">
            Years of Excellence
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Column: Timeline & CMS Content */}
        <div className="lg:col-span-8 space-y-12">
          {/* Styled Connecting timeline list */}
          <div className="relative border-l-2 border-[#8B0E2A]/20 pl-8 space-y-12 py-4">
            
            {/* Foundation */}
            <div className="relative group">
              <div className="absolute -left-[41px] top-1.5 w-[20px] h-[20px] rounded-full bg-white border-4 border-[#8B0E2A] shadow-sm group-hover:scale-125 transition-transform duration-300" />
              <span className="text-xs font-bold tracking-wider text-[#B8860B] uppercase block mb-1">1901</span>
              <h4 className="font-heading font-bold text-xl text-[#111111] mb-2 group-hover:text-[#8B0E2A] transition-colors duration-200">
                NREC Primary School Foundation
              </h4>
              <p className="text-gray-500 text-sm leading-relaxed font-light">
                Founded by the pioneering elite figures of Bulandshahr to deliver standard education to children in the region.
              </p>
            </div>

            {/* Growth */}
            <div className="relative group">
              <div className="absolute -left-[41px] top-1.5 w-[20px] h-[20px] rounded-full bg-white border-4 border-[#B8860B] shadow-sm group-hover:scale-125 transition-transform duration-300" />
              <span className="text-xs font-bold tracking-wider text-[#B8860B] uppercase block mb-1">Mid Century</span>
              <h4 className="font-heading font-bold text-xl text-[#111111] mb-2 group-hover:text-[#8B0E2A] transition-colors duration-200">
                UG Degree College Upgrade
              </h4>
              <p className="text-gray-500 text-sm leading-relaxed font-light">
                Introduced regular science and commerce faculties, upgrading classrooms and constructing core laboratories.
              </p>
            </div>

            {/* Present */}
            <div className="relative group">
              <div className="absolute -left-[41px] top-1.5 w-[20px] h-[20px] rounded-full bg-white border-4 border-[#8B0E2A] shadow-sm group-hover:scale-125 transition-transform duration-300" />
              <span className="text-xs font-bold tracking-wider text-[#B8860B] uppercase block mb-1">Modern Era</span>
              <h4 className="font-heading font-bold text-xl text-[#111111] mb-2 group-hover:text-[#8B0E2A] transition-colors duration-200">
                Dynamic Post Graduate Institution
              </h4>
              <p className="text-gray-500 text-sm leading-relaxed font-light">
                Under CCS University, NREC now offers multiple PG courses, hosting thousands of students annually.
              </p>
            </div>

          </div>

          {/* Main CMS RichText Content */}
          {sections.length > 0 && (
            <div className="bg-white border border-gray-100 rounded-[24px] p-6 sm:p-10 shadow-sm prose max-w-none text-gray-700 leading-relaxed font-light text-[15px]">
              <CmsRenderer sections={sections} />
            </div>
          )}
        </div>

        {/* Right Column: Historical Highlights Sidebar */}
        <div className="lg:col-span-4 space-y-6 sticky top-28">
          {/* Heritage Callout */}
          <div className="bg-[#B8860B]/5 border border-[#B8860B]/20 rounded-2xl p-6 text-center space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#B8860B] block">Heritage Landmark</span>
            <h4 className="font-heading font-bold text-lg text-[#111111]">120+ Year Archive</h4>
            <p className="text-xs text-gray-500 font-light leading-relaxed">
              Preserving official milestones and historic documents of our scholars since the foundation school in 1901.
            </p>
          </div>

          {/* Registry highlights */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-3">
            <h4 className="font-heading font-bold text-sm text-gray-900 uppercase tracking-wider pb-2 border-b border-gray-50">
              Legacy Milestones
            </h4>
            <ul className="text-xs text-gray-500 font-light space-y-3">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B0E2A] shrink-0 mt-1" />
                <span>**1901**: School founded to educate regional boys.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B] shrink-0 mt-1" />
                <span>**1940s**: Upgrade to Degree faculties (Arts &amp; Commerce).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B0E2A] shrink-0 mt-1" />
                <span>**1980s**: Introduced Postgraduate Science curricula.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
    </div>
  );
}
