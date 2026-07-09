'use client';

import React from 'react';
import CmsRenderer from '@/components/cms/CmsRenderer';
import { User, Shield, Briefcase, Quote } from 'lucide-react';
import SafeImage from '@/components/ui/SafeImage';

interface PeopleTemplateProps {
  slug: string;
  sections: any[];
}

export default function PeopleTemplate({ slug, sections }: PeopleTemplateProps) {
  const isPrincipal = slug === 'principal-message';

  if (isPrincipal) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Side: Principal Card */}
        <div className="lg:col-span-4 bg-white border border-gray-100 rounded-[28px] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)] text-center sticky top-28">
          <div className="relative w-40 h-40 rounded-full mx-auto overflow-hidden bg-gray-50 border-4 border-[#8B0E2A]/20 mb-6">
            <SafeImage
              src="/images/principal.png"
              fallbackKey="avatar"
              alt="Principal portrait"
              fill
              className="object-cover"
            />
          </div>
          <h3 className="font-heading font-bold text-xl text-[#111111] mb-1">Dr. Principal Name</h3>
          <p className="text-xs font-bold text-[#B8860B] uppercase tracking-wider mb-4">Principal, NREC College</p>
          <div className="pt-4 border-t border-gray-100 text-xs text-gray-500 font-light leading-relaxed">
            Head of Administration & Academic Council NREC Khurja.
          </div>
        </div>

        {/* Right Side: Message Paper Style */}
        <div className="lg:col-span-8 bg-white border border-gray-100 rounded-[28px] p-8 sm:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.03)] relative overflow-hidden">
          <div className="absolute right-6 top-6 text-gray-100">
            <Quote size={80} className="opacity-40" />
          </div>
          
          <div className="relative z-10 space-y-6">
            <span className="text-xs font-black text-[#8B0E2A] uppercase tracking-widest block">
              Official Desk Message
            </span>
            <div className="text-gray-600 text-[15.5px] leading-relaxed font-light space-y-5">
              <CmsRenderer sections={sections} />
            </div>
            
            {/* Signature Block */}
            <div className="pt-8 border-t border-gray-100 mt-10">
              <div className="font-serif italic text-lg text-gray-800 mb-1">Dr. Principal Name</div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                NREC College Khurja Administration
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* People Profile Info Header */}
      <div className="bg-[#8B0E2A]/5 border border-[#8B0E2A]/10 rounded-[24px] p-6 flex flex-col sm:flex-row gap-5 items-center">
        <div className="w-16 h-16 rounded-full bg-[#8B0E2A]/10 flex items-center justify-center text-[#8B0E2A]">
          {slug.includes('principal') ? <Shield size={28} /> : <User size={28} />}
        </div>
        <div>
          <h3 className="font-heading font-bold text-[#111111] text-xl">
            {slug.includes('principal') ? 'Office of the Principal' : 'Administrative Administration'}
          </h3>
          <p className="text-[#B8860B] text-xs font-bold uppercase tracking-wider">
            NREC College Khurja
          </p>
        </div>
      </div>

      {/* Main CMS Sections */}
      <div className="bg-white border border-gray-100 rounded-[28px] p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
        <CmsRenderer sections={sections} />
      </div>

      {/* Quick Administration Disclaimer */}
      <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 flex items-center gap-3">
        <Briefcase className="text-gray-400 shrink-0" size={20} />
        <p className="text-xs text-gray-500 font-light">
          For updates regarding governing policies or to view historical office holders, please contact the administrative registrar.
        </p>
      </div>
    </div>
  );
}
