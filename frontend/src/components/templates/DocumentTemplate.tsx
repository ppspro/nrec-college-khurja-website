'use client';

import React, { useState } from 'react';
import CmsRenderer from '@/components/cms/CmsRenderer';
import { FileText, Download, Search, Filter } from 'lucide-react';

interface DocumentTemplateProps {
  slug: string;
  sections: any[];
}

export default function DocumentTemplate({ slug, sections }: DocumentTemplateProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const mockDocuments = [
    { title: 'Academic Calendar Session 2026-27', type: 'PDF', size: '1.2 MB', date: '2026-07-01' },
    { title: 'NREC Anti-Ragging Policy Circular', type: 'PDF', size: '840 KB', date: '2026-06-15' },
    { title: 'CCS University Examination Registration Form', type: 'DOCX', size: '320 KB', date: '2026-06-10' },
  ];

  const filteredDocs = mockDocuments.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || doc.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8">
      
      {/* Official Document Banner */}
      <div className="bg-[#0A0A0A] text-white rounded-[28px] p-8 shadow-md relative overflow-hidden border-t-4 border-[#B8860B]">
        <div className="absolute right-[-10px] top-[-10px] opacity-5 pointer-events-none">
          <FileText size={140} />
        </div>
        <span className="text-[10px] uppercase tracking-wider text-[#B8860B] font-bold block mb-1">
          NREC Registry Downloads
        </span>
        <h3 className="font-heading font-black text-2xl">Official Institutional Document Portal</h3>
        <p className="text-gray-400 text-xs font-light max-w-xl mt-2 leading-relaxed">
          Authorized circulars, admission brochures, governing guidelines, and official registry forms.
        </p>
      </div>

      {/* Document Portal Filter system */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          
          {/* Search bar */}
          <div className="relative w-full sm:max-w-xs group">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#8B0E2A]" />
            <input
              type="text"
              placeholder="Search circulars..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-[#8B0E2A] transition-all text-[#111111]"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2 w-full sm:w-auto overflow-x-auto justify-start sm:justify-end">
            <button
              onClick={() => setFilterType('all')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                filterType === 'all' ? 'bg-[#8B0E2A] text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setFilterType('pdf')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                filterType === 'pdf' ? 'bg-[#8B0E2A] text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              PDFs
            </button>
          </div>

        </div>

        {/* Document list */}
        <div className="divide-y divide-gray-100">
          {filteredDocs.map((doc, index) => (
            <div key={index} className="py-4 flex items-center justify-between gap-4 hover:bg-gray-50/50 px-2 rounded-xl transition-all">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#8B0E2A]/5 text-[#8B0E2A] flex items-center justify-center shrink-0">
                  <FileText size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-xs sm:text-sm">{doc.title}</h4>
                  <div className="flex items-center gap-3 text-[10px] text-gray-400 mt-1">
                    <span>{doc.type} File</span>
                    <span>&bull;</span>
                    <span>{doc.size}</span>
                    <span>&bull;</span>
                    <span>Published {doc.date}</span>
                  </div>
                </div>
              </div>

              <button className="flex items-center gap-1.5 bg-[#8B0E2A]/10 hover:bg-[#8B0E2A] text-[#8B0E2A] hover:text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shrink-0">
                <Download size={12} />
                Download
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Main CMS content */}
      {sections.length > 0 && (
        <div className="bg-white border border-gray-100 rounded-[28px] p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
          <CmsRenderer sections={sections} />
        </div>
      )}

      {/* Verify Disclaimer */}
      <div className="border border-dashed border-gray-200 rounded-xl p-4 text-center">
        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
          Digital copies should match original register copies.
        </span>
      </div>

    </div>
  );
}
