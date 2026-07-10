'use client';

import React from 'react';
import CmsRenderer from '@/components/cms/CmsRenderer';
import { User, Shield, Briefcase, Quote, Award, Phone, Mail } from 'lucide-react';
import SafeImage from '@/components/ui/SafeImage';

interface PeopleTemplateProps {
  slug: string;
  sections: any[];
}

// Leadership members per page
const governanceMembers: Record<string, { name: string; role: string; committee?: string }[]> = {
  'governing-body': [
    { name: 'Shri Harish Chandra Gupta', role: 'President', committee: 'Governing Council' },
    { name: 'Shri Amit Kumar Gupta', role: 'Secretary', committee: 'Governing Council' },
    { name: 'Shri Rajesh Sharma', role: 'Treasurer', committee: 'Finance Committee' },
    { name: 'Dr. S. K. Verma', role: 'Academic Member', committee: 'Academic Council' },
    { name: 'Dr. Pradeep Kumar', role: 'Member', committee: 'Governing Council' },
    { name: 'Shri Vipin Garg', role: 'Member', committee: 'External Nominee' },
  ],
  'management': [
    { name: 'Shri Harish Chandra Gupta', role: 'President', committee: 'Management Committee' },
    { name: 'Shri Amit Kumar Gupta', role: 'Vice President', committee: 'Executive Board' },
    { name: 'Shri Rajesh Sharma', role: 'Secretary', committee: 'Administration' },
    { name: 'Dr. S. K. Verma', role: 'Joint Secretary', committee: 'Academics' },
  ],
  'college-committee': [
    { name: 'Dr. S. K. Verma', role: 'Convenor', committee: 'Internal Quality Cell' },
    { name: 'Dr. Pradeep Kumar', role: 'IQAC Coordinator', committee: 'Quality Assurance' },
    { name: 'Dr. A. K. Singh', role: 'Anti-Ragging Nodal Officer', committee: 'Discipline Committee' },
    { name: 'Dr. Anita Rani', role: 'Women\'s Cell Convenor', committee: 'Women\'s Welfare Cell' },
    { name: 'Dr. R. K. Sharma', role: 'Grievance Officer', committee: 'Student Grievance Cell' },
    { name: 'Shri Suresh Kumar', role: 'Cultural Coordinator', committee: 'Cultural Committee' },
  ],
  'administrative-staff': [
    { name: 'Shri Bhim Singh', role: 'Head Clerk', committee: 'Administrative Office' },
    { name: 'Smt. Rekha Gupta', role: 'Accounts Officer', committee: 'Finance Section' },
    { name: 'Shri Rajiv Kumar', role: 'Library Clerk', committee: 'Library Section' },
    { name: 'Smt. Sunita Rani', role: 'Establishment Section', committee: 'HR Office' },
  ],
  'proctorial-board': [
    { name: 'Dr. A. K. Singh', role: 'Chief Proctor', committee: 'Discipline Board' },
    { name: 'Dr. P. K. Sharma', role: 'Deputy Proctor', committee: 'Discipline Board' },
    { name: 'Dr. Neha Verma', role: 'Proctor Member', committee: 'Women\'s Welfare' },
    { name: 'Dr. R. P. Gupta', role: 'Proctor Member', committee: 'Anti-Ragging Cell' },
  ],
};

const roleColors: Record<string, string> = {
  'President': '#8B0E2A',
  'Secretary': '#B8860B',
  'Treasurer': '#166534',
  'Convenor': '#8B0E2A',
  'default': '#374151',
};

export default function PeopleTemplate({ slug, sections }: PeopleTemplateProps) {
  const isPrincipal = slug === 'principal-message';
  const members = governanceMembers[slug] || [];

  if (isPrincipal) {
    return (
      <div className="space-y-8">
        {/* Banner image */}
        <div className="relative w-full h-[220px] rounded-[28px] overflow-hidden bg-gray-100">
          <SafeImage
            src="/images/nrec/administration.jpg"
            fallbackKey="campus"
            alt="Principal Office NREC College"
            fill
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-8">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#B8860B] mb-1">Office of the Principal</span>
            <h2 className="font-heading font-black text-2xl text-white leading-tight">NREC College Khurja</h2>
            <p className="text-gray-300 text-xs font-light mt-1">Established 1901 | CCS University Affiliated</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Side: Principal Card */}
          <div className="lg:col-span-4 bg-white border border-gray-100 rounded-[28px] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)] text-center sticky top-28">
            <div className="relative w-36 h-36 rounded-full mx-auto overflow-hidden bg-gray-50 border-4 border-[#8B0E2A]/20 mb-5">
              <SafeImage
                src="/images/principal.png"
                fallbackKey="avatar"
                alt="Principal portrait"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="font-heading font-bold text-lg text-[#111111] mb-1">Dr. S. K. Verma</h3>
            <p className="text-[10px] font-bold text-[#B8860B] uppercase tracking-wider mb-3">Principal, NREC College Khurja</p>
            <div className="space-y-2 pt-4 border-t border-gray-100">
              <a href="tel:+915738200001" className="flex items-center justify-center gap-2 text-xs text-gray-500 hover:text-[#8B0E2A] transition-colors">
                <Phone size={12} /> +91-5738-200001
              </a>
              <a href="mailto:principal@nreccollege.ac.in" className="flex items-center justify-center gap-2 text-xs text-gray-500 hover:text-[#8B0E2A] transition-colors">
                <Mail size={12} /> principal@nreccollege.ac.in
              </a>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-50 text-[11px] text-gray-400 font-light leading-relaxed">
              Head of Administration &amp; Academic Council, NREC College Khurja
            </div>
          </div>

          {/* Right Side: Message Paper Style */}
          <div className="lg:col-span-8 bg-white border border-gray-100 rounded-[28px] p-8 sm:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.03)] relative overflow-hidden">
            <div className="absolute right-4 top-4 text-gray-100 pointer-events-none select-none">
              <Quote size={72} className="opacity-30" />
            </div>
            
            <div className="relative z-10 space-y-5">
              <span className="text-[10px] font-black text-[#8B0E2A] uppercase tracking-widest block">
                Official Desk Message — 2025–26
              </span>
              <div className="w-10 h-[2px] bg-[#B8860B] rounded" />
              <div className="text-gray-600 text-[15px] leading-relaxed font-light space-y-5">
                <CmsRenderer sections={sections} />
              </div>
              
              {/* Signature Block */}
              <div className="pt-8 border-t border-gray-100 mt-8 flex items-end justify-between">
                <div>
                  <div className="font-serif italic text-lg text-gray-800 mb-0.5">Dr. S. K. Verma</div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Principal, NREC College Khurja Administration
                  </div>
                </div>
                <div className="text-right text-[11px] text-gray-400 font-light">
                  <div>NREC College Khurja</div>
                  <div>Bulandshahr, UP - 203131</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* Hero Banner with Administration Office Image */}
      <div className="relative w-full h-[240px] rounded-[28px] overflow-hidden bg-gray-900">
        <SafeImage
          src="/images/generated/admin_office.png"
          fallbackKey="campus"
          alt="NREC College Administration"
          fill
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent flex flex-col justify-end p-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 rounded bg-[#B8860B] flex items-center justify-center">
              <Shield size={11} className="text-white" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#B8860B]">Administrative Body</span>
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-white leading-tight">
            {slug === 'governing-body' && 'Governing Body'}
            {slug === 'management' && 'Management Committee'}
            {slug === 'college-committee' && 'College Committees & Cells'}
            {slug === 'administrative-staff' && 'Administrative Staff'}
            {slug === 'proctorial-board' && 'Proctorial Board'}
            {!['governing-body','management','college-committee','administrative-staff','proctorial-board'].includes(slug) && 'Administration'}
          </h2>
          <p className="text-gray-300 text-xs font-light mt-1">NREC College Khurja | Established 1901</p>
        </div>
      </div>

      {/* Leadership Grid from static data */}
      {members.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Award className="text-[#B8860B]" size={18} />
            <h3 className="font-heading font-bold text-lg text-[#111111]">Leadership &amp; Members</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {members.map((member, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center group hover:border-[#8B0E2A]/20"
              >
                {/* Avatar Circle */}
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 border-2 border-[#8B0E2A]/15 bg-[#8B0E2A]/5 group-hover:bg-[#8B0E2A] group-hover:border-[#8B0E2A] transition-all duration-300">
                  <User size={24} className="text-[#8B0E2A] group-hover:text-white transition-colors" />
                </div>

                {/* Name */}
                <h4 className="font-heading font-bold text-[#111111] text-sm mb-1 leading-snug">
                  {member.name}
                </h4>

                {/* Role Badge */}
                <span
                  className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-2"
                  style={{
                    background: `${roleColors[member.role] || roleColors.default}12`,
                    color: roleColors[member.role] || roleColors.default,
                  }}
                >
                  {member.role}
                </span>

                {/* Committee */}
                {member.committee && (
                  <span className="text-[11px] text-gray-400 font-light leading-relaxed">
                    {member.committee}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CMS Sections — shown if additional info exists */}
      {sections.length > 0 && (
        <div className="bg-white border border-gray-100 rounded-[28px] p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
          <CmsRenderer sections={sections} />
        </div>
      )}

      {/* Footer note */}
      <div className="bg-[#8B0E2A]/3 border border-[#8B0E2A]/10 rounded-xl p-5 flex items-start gap-3">
        <Briefcase className="text-[#8B0E2A] shrink-0 mt-0.5" size={18} />
        <p className="text-xs text-gray-600 font-light leading-relaxed">
          For updates regarding governing policies, historical office records, or official correspondence, please contact the Administrative Registrar at <a href="mailto:info@nreccollege.ac.in" className="text-[#8B0E2A] font-medium hover:underline">info@nreccollege.ac.in</a>.
        </p>
      </div>
    </div>
  );
}
