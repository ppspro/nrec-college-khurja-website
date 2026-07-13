'use client';

import React from 'react';
import CmsRenderer from '@/components/cms/CmsRenderer';
import { BookOpen, GraduationCap, Award, Landmark, GraduationCap as CapIcon } from 'lucide-react';
import Link from 'next/link';
import SafeImage from '@/components/ui/SafeImage';

interface AcademicTemplateProps {
  slug: string;
  sections: any[];
}

export default function AcademicTemplate({ slug, sections }: AcademicTemplateProps) {
  return (
    <div className="space-y-10">
      
      {/* Hero: Classroom Photography */}
      <div className="relative h-[240px] w-full rounded-[28px] overflow-hidden bg-gray-900">
        <SafeImage
          src="/images/nrec/students.jpg"
          fallbackKey="department"
          alt="NREC College Academics"
          fill
          className="object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#B8860B] mb-1">Academic Catalogue 2025–26</span>
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-white leading-tight">Curriculum Explorer</h2>
          <p className="text-gray-300 text-xs font-light mt-1">CCS University Affiliated | Arts · Science · Commerce · Law</p>
        </div>
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Archive Content */}
          <div className="lg:col-span-8 bg-white border border-gray-100 rounded-[28px] p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)] prose max-w-none text-gray-700 leading-relaxed font-light text-[15px]">
            <CmsRenderer sections={sections} />
          </div>

          {/* Right Column: Academic Framework Sidebar */}
          <div className="lg:col-span-4 space-y-6 sticky top-28">
            {/* Affiliation Callout */}
            <div className="bg-[#B8860B]/5 border border-[#B8860B]/20 rounded-2xl p-6 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#B8860B] block">Affiliation Authority</span>
              <h4 className="font-heading font-bold text-gray-900 text-sm">CCS University Meerut</h4>
              <p className="text-xs text-gray-500 font-light leading-relaxed">
                All syllabus, curricula, examinations, and final degrees are regulated under Chaudhary Charan Singh University guidelines.
              </p>
            </div>

            {/* Regulatory Checklist */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-3">
              <h4 className="font-heading font-bold text-sm text-gray-900 uppercase tracking-wider pb-2 border-b border-gray-50">
                Curriculum Framework
              </h4>
              <ul className="text-xs text-gray-500 font-light space-y-3">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8B0E2A]" />
                  NEP 2020 Semester Pattern
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B]" />
                  Choice Based Credit System (CBCS)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8B0E2A]" />
                  Continuous Internal Evaluation
                </li>
              </ul>
            </div>
          </div>
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
