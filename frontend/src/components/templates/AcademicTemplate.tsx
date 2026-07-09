'use client';

import React from 'react';
import CmsRenderer from '@/components/cms/CmsRenderer';
import { BookOpen, GraduationCap, Award, Landmark, GraduationCap as CapIcon } from 'lucide-react';
import Link from 'next/link';

interface AcademicTemplateProps {
  slug: string;
  sections: any[];
}

export default function AcademicTemplate({ slug, sections }: AcademicTemplateProps) {
  return (
    <div className="space-y-12">
      
      {/* Program Explorer Layout Header Banner */}
      <div className="bg-[#111111] text-white rounded-[28px] p-8 shadow-lg relative overflow-hidden">
        <div className="absolute right-[-20px] top-[-20px] opacity-5 pointer-events-none">
          <BookOpen size={160} />
        </div>
        <span className="text-xs font-bold text-[#B8860B] uppercase tracking-widest block mb-2">
          Academic Catalogue
        </span>
        <h3 className="font-heading font-black text-2xl md:text-3xl">Curriculum Explorer</h3>
        <p className="text-gray-400 text-xs font-light max-w-xl mt-2 leading-relaxed">
          NREC College offers standardized BA, B.Sc., B.Com., and BCA degrees affiliated to Chaudhary Charan Singh University, Meerut.
        </p>
      </div>

      {/* Academic Statistics strip */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-gray-100">
        <div className="text-center pb-4 md:pb-0">
          <span className="block font-heading font-black text-2xl text-[#8B0E2A]">3+</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Faculties</span>
        </div>
        <div className="text-center pt-4 md:pt-0 pl-0 md:pl-4">
          <span className="block font-heading font-black text-2xl text-[#B8860B]">12+</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#B8860B]">Departments</span>
        </div>
        <div className="text-center pt-4 md:pt-0 pl-0 md:pl-4">
          <span className="block font-heading font-black text-2xl text-[#8B0E2A]">25+</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Programs</span>
        </div>
        <div className="text-center pt-4 md:pt-0 pl-0 md:pl-4">
          <span className="block font-heading font-black text-2xl text-[#B8860B]">4000+</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#B8860B]">Active Scholars</span>
        </div>
      </div>

      {/* Academic Categories links showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:-translate-y-1 transition-all flex gap-4 items-start">
          <div className="w-12 h-12 rounded-xl bg-[#8B0E2A]/5 text-[#8B0E2A] flex items-center justify-center shrink-0">
            <CapIcon size={24} />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-sm mb-1">Undergraduate Programs</h4>
            <p className="text-gray-400 text-xs font-light mb-3 leading-relaxed">
              Standard B.A., B.Sc. (Bio/Math), B.Com., and professional BCA, B.Ed., and LLB degrees.
            </p>
            <Link href="/courses" className="text-[#8B0E2A] text-xs font-bold hover:underline">
              View UG Catalogue &rarr;
            </Link>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:-translate-y-1 transition-all flex gap-4 items-start">
          <div className="w-12 h-12 rounded-xl bg-[#B8860B]/5 text-[#B8860B] flex items-center justify-center shrink-0">
            <GraduationCap size={24} />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-sm mb-1">Postgraduate Programs</h4>
            <p className="text-gray-400 text-xs font-light mb-3 leading-relaxed">
              Advanced Master of Arts, Master of Science (Botany, Chemistry, Physics), and Master of Commerce.
            </p>
            <Link href="/courses" className="text-[#B8860B] text-xs font-bold hover:underline">
              View PG Catalogue &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Main CMS Content */}
      {sections.length > 0 && (
        <div className="bg-white border border-gray-100 rounded-[28px] p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
          <CmsRenderer sections={sections} />
        </div>
      )}

      {/* NEP Compliance Circular Tag */}
      <div className="border border-dashed border-gray-200 rounded-xl p-4 text-center">
        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
          All courses adhere strictly to National Education Policy (NEP) Guidelines.
        </span>
      </div>

    </div>
  );
}
