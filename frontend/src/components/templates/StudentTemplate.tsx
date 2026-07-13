'use client';

import React from 'react';
import CmsRenderer from '@/components/cms/CmsRenderer';
import { Award, CheckCircle, Info, Calendar, FileCheck, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import SafeImage from '@/components/ui/SafeImage';

interface StudentTemplateProps {
  slug: string;
  sections: any[];
}

export default function StudentTemplate({ slug, sections }: StudentTemplateProps) {
  const isAdmission = slug.includes('admission');

  return (
    <div className="space-y-10">
      
      {/* Hero Banner: Admissions Photography */}
      {isAdmission && (
        <div className="relative h-[220px] w-full rounded-[28px] overflow-hidden bg-gray-900">
          <SafeImage
            src="/images/nrec/graduation.jpg"
            fallbackKey="campus"
            alt="NREC College Admissions"
            fill
            className="object-cover object-top opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#B8860B] mb-1">Enrollment Open 2025–26</span>
            <h2 className="font-heading font-black text-2xl text-white leading-tight">Admissions at NREC College</h2>
            <p className="text-gray-300 text-xs font-light mt-1">CCS University Affiliated | Khurja, Bulandshahr</p>
          </div>
        </div>
      )}

      {/* Dynamic Admission Journey UI */}
      {isAdmission && (
        <div className="space-y-10">
          
          {/* Top: Process Timeline Banner */}
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-bold text-[#B8860B] uppercase tracking-widest block mb-1">Enrollment Route</span>
            <h3 className="font-heading font-black text-2xl text-[#111111] sm:text-3xl">Admission Journey</h3>
            <p className="text-gray-500 text-xs font-light mt-2 leading-relaxed">
              Standardized admission pathway for processing undergraduate & postgraduate registration seats.
            </p>
          </div>
          
          {/* Desktop: Horizontal Stepper | Mobile: Vertical list */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            
            {/* Step 1 */}
            <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center relative group">
              <div className="w-10 h-10 rounded-xl bg-[#8B0E2A]/5 text-[#8B0E2A] flex items-center justify-center font-bold font-heading text-lg mb-4 border border-[#8B0E2A]/10">
                01
              </div>
              <h4 className="font-bold text-gray-900 text-sm mb-1">Registration</h4>
              <p className="text-gray-400 text-xs font-light leading-relaxed">Submit the online admission form via the official CCSU portal.</p>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center relative group">
              <div className="w-10 h-10 rounded-xl bg-[#B8860B]/5 text-[#B8860B] flex items-center justify-center font-bold font-heading text-lg mb-4 border border-[#B8860B]/10">
                02
              </div>
              <h4 className="font-bold text-gray-900 text-sm mb-1">Verification</h4>
              <p className="text-gray-400 text-xs font-light leading-relaxed">Upload required certificates & verify credentials at the college desk.</p>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center relative group">
              <div className="w-10 h-10 rounded-xl bg-[#8B0E2A]/5 text-[#8B0E2A] flex items-center justify-center font-bold font-heading text-lg mb-4 border border-[#8B0E2A]/10">
                03
              </div>
              <h4 className="font-bold text-gray-900 text-sm mb-1">Merit Allocation</h4>
              <p className="text-gray-400 text-xs font-light leading-relaxed">CCSU releases official cutoff lists based on academic scores.</p>
            </div>

            {/* Step 4 */}
            <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center relative group">
              <div className="w-10 h-10 rounded-xl bg-[#B8860B]/5 text-[#B8860B] flex items-center justify-center font-bold font-heading text-lg mb-4 border border-[#B8860B]/10">
                04
              </div>
              <h4 className="font-bold text-gray-900 text-sm mb-1">Locking Seat</h4>
              <p className="text-gray-400 text-xs font-light leading-relaxed">Submit the fee voucher locally and lock your admission status.</p>
            </div>

          </div>

          {/* Middle: Important Dates & Documents Needed Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6">
            
            {/* Important Dates Block */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="text-[#8B0E2A]" size={18} />
                <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Academic Timeline Keydates</h4>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs py-2 border-b border-gray-50">
                  <span className="text-gray-500 font-light">CCSU Registration Commences</span>
                  <span className="font-bold text-gray-800">July 10, 2026</span>
                </div>
                <div className="flex items-center justify-between text-xs py-2 border-b border-gray-50">
                  <span className="text-gray-500 font-light">Closing of Registrations</span>
                  <span className="font-bold text-[#8B0E2A]">July 31, 2026</span>
                </div>
                <div className="flex items-center justify-between text-xs py-2">
                  <span className="text-gray-500 font-light">First Merit List Declaration</span>
                  <span className="font-bold text-[#B8860B]">August 05, 2026</span>
                </div>
              </div>
            </div>

            {/* Documents Needed Block */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <FileCheck className="text-[#B8860B]" size={18} />
                <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Required Certificates</h4>
              </div>
              <ul className="text-xs text-gray-500 font-light space-y-2.5">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B]" />
                  Class 10th & 12th Marks sheets / Passing Certificates
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B]" />
                  Transfer Certificate (TC) & Character Certificate
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B]" />
                  Caste & Income Certificates (if claiming reservations)
                </li>
              </ul>
            </div>

          </div>

        </div>
      )}

      {/* Main CMS Sections */}
      {sections.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Archive Content */}
          <div className="lg:col-span-8 bg-white border border-gray-100 rounded-[28px] p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)] prose max-w-none text-gray-700 leading-relaxed font-light text-[15px]">
            <CmsRenderer sections={sections} />
          </div>

          {/* Right Column: Admission Resources Sidebar */}
          <div className="lg:col-span-4 space-y-6 sticky top-28">
            {/* Helpdesk Callout */}
            <div className="bg-[#8B0E2A]/5 border border-[#8B0E2A]/10 rounded-2xl p-6 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#8B0E2A] block">Admission Helpline</span>
              <h4 className="font-heading font-bold text-gray-900 text-sm">Need Assistance?</h4>
              <p className="text-xs text-gray-500 font-light leading-relaxed">
                Connect with the NREC Admissions registry office for specific registration query resolutions.
              </p>
              <div className="pt-2 text-xs space-y-1.5 text-gray-600 font-medium">
                <div className="flex items-center gap-2">
                  <span>☎</span>
                  <a href="tel:+915738200001" className="hover:underline">+91-5738-200001</a>
                </div>
                <div className="flex items-center gap-2">
                  <span>✉</span>
                  <a href="mailto:admission@nreccollege.ac.in" className="hover:underline">admission@nreccollege.ac.in</a>
                </div>
              </div>
            </div>

            {/* Quick Links Panel */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-3">
              <h4 className="font-heading font-bold text-sm text-gray-900 uppercase tracking-wider pb-2 border-b border-gray-50">
                Related Information
              </h4>
              <div className="flex flex-col gap-2.5 text-xs text-[#8B0E2A] font-bold">
                <Link href="/admission-rules" className="hover:underline flex items-center gap-1.5">
                  &bull; Admission Rules Catalog
                </Link>
                <Link href="/fee-structure" className="hover:underline flex items-center gap-1.5">
                  &bull; Tuition &amp; Fee Structure
                </Link>
                <Link href="/seats" className="hover:underline flex items-center gap-1.5">
                  &bull; Allocated Seat Matrix
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom: Apply CTA Block */}
      {isAdmission && (
        <div className="bg-[#8B0E2A]/5 border border-[#8B0E2A]/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#8B0E2A]/15 flex items-center justify-center text-[#8B0E2A] shrink-0">
              <Info size={18} />
            </div>
            <div>
              <h4 className="font-bold text-gray-800 text-xs sm:text-sm">Ready to Register at CCSU?</h4>
              <p className="text-gray-400 text-[11px] font-light leading-relaxed">
                Click below to redirect to Chaudhary Charan Singh University registration system.
              </p>
            </div>
          </div>
          <a
            href="https://ccsuniversity.ac.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-[#8B0E2A] hover:bg-[#6D0B20] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md shrink-0"
          >
            Visit CCSU Registration System
            <ExternalLink size={12} />
          </a>
        </div>
      )}

    </div>
  );
}
