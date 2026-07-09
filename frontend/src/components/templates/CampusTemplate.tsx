'use client';

import React from 'react';
import CmsRenderer from '@/components/cms/CmsRenderer';
import { Layers, Sparkles, BookOpen, Heart, Landmark, ExternalLink, Image as ImageIcon } from 'lucide-react';
import SafeImage from '@/components/ui/SafeImage';
import Link from 'next/link';

interface CampusTemplateProps {
  slug: string;
  sections: any[];
}

export default function CampusTemplate({ slug, sections }: CampusTemplateProps) {
  return (
    <div className="space-y-12">
      
      {/* Large Image Showcase Section */}
      <div className="relative h-[300px] w-full rounded-[28px] overflow-hidden bg-gray-950 border border-gray-900 shadow-md group">
        <SafeImage
          src="/images/campus-life.png"
          fallbackKey="campus"
          alt="NREC College Campus Infrastructure"
          fill
          className="object-cover opacity-80 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="text-[#B8860B]" size={16} />
            <span className="text-[10px] uppercase tracking-wider text-[#B8860B] font-bold">NREC Showcase</span>
          </div>
          <h3 className="font-heading font-black text-2xl md:text-3xl text-white">Campus Infrastructure & Life</h3>
          <p className="text-gray-300 text-xs font-light max-w-xl mt-1.5 leading-relaxed">
            Our historical estate integrates spacious lecture facilities, NAAC standard research labs, and green student zones.
          </p>
        </div>
      </div>

      {/* Facility Highlights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#8B0E2A]/5 text-[#8B0E2A] flex items-center justify-center shrink-0">
            <BookOpen size={20} />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-sm mb-1">Central Library</h4>
            <p className="text-gray-400 text-xs font-light leading-relaxed">Hosts thousands of books, journals, and digital library systems via INFLIBNET N-LIST portals.</p>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#B8860B]/5 text-[#B8860B] flex items-center justify-center shrink-0">
            <Layers size={20} />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-sm mb-1">Modern Science Labs</h4>
            <p className="text-gray-400 text-xs font-light leading-relaxed">Department labs with essential scientific tooling for Botany, Zoology, Chemistry, and Physics.</p>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#8B0E2A]/5 text-[#8B0E2A] flex items-center justify-center shrink-0">
            <Landmark size={20} />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-sm mb-1">Green Environment</h4>
            <p className="text-gray-400 text-xs font-light leading-relaxed">A clean, plastic-free environment providing lush green lawns and eco-friendly structures.</p>
          </div>
        </div>
      </div>

      {/* Main CMS Sections */}
      {sections.length > 0 && (
        <div className="bg-white border border-gray-100 rounded-[28px] p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
          <CmsRenderer sections={sections} />
        </div>
      )}

      {/* Quick Gallery Preview Block */}
      <div className="bg-gray-50 border border-gray-150 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-400 shadow-sm border border-gray-100">
            <ImageIcon size={18} />
          </div>
          <div>
            <h4 className="font-bold text-gray-800 text-xs sm:text-sm">Campus Life Gallery Archives</h4>
            <p className="text-gray-400 text-[11px] font-light">Explore academic events, library catalogs, and athletic galleries.</p>
          </div>
        </div>
        <Link href="/gallery" className="btn btn-white text-xs font-bold py-2.5 px-6 border rounded-xl hover:bg-white shrink-0">
          Open Gallery Portal
        </Link>
      </div>

    </div>
  );
}
