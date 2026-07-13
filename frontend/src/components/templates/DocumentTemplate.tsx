'use client';

import React, { useState, useEffect } from 'react';
import CmsRenderer from '@/components/cms/CmsRenderer';
import { FileText, Download, Search } from 'lucide-react';
import { API_URL, API_BASE_URL } from '@/lib/api';

interface DocumentTemplateProps {
  slug: string;
  sections: any[];
}

export default function DocumentTemplate({ slug, sections }: DocumentTemplateProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/downloads`)
      .then(res => res.ok ? res.json() : { downloads: [] })
      .then(data => {
        if (data.downloads) {
          setDocuments(data.downloads);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Filter based on active template slug matching category names
  const getFilteredDocs = () => {
    let list = documents;
    
    // Simple category mapping based on slug
    if (slug.includes('exam')) {
      list = documents.filter(d => d.category === 'Examination Forms');
    } else if (slug.includes('admission')) {
      list = documents.filter(d => d.category === 'Admission Forms');
    } else if (slug.includes('calendar')) {
      list = documents.filter(d => d.category === 'Academic Calendar');
    }

    // Apply search and fileType filter
    return list.filter(doc => {
      const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
      const fileExt = doc.fileType?.toLowerCase() || '';
      const matchesFilter = filterType === 'all' || fileExt === filterType.toLowerCase() || (filterType === 'pdf' && fileExt.includes('pdf'));
      return matchesSearch && matchesFilter;
    });
  };

  const filteredDocs = getFilteredDocs();

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
        <h3 className="font-heading font-black text-2xl !text-white">Official Institutional Document Portal</h3>
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
          {loading ? (
            <div className="py-8 text-center text-xs text-gray-400 font-light">Loading official registry items...</div>
          ) : filteredDocs.length === 0 ? (
            <div className="py-8 text-center text-xs text-gray-400 font-light">No documents found matching criteria.</div>
          ) : (
            filteredDocs.map((doc, index) => (
              <div key={index} className="py-4 flex items-center justify-between gap-4 hover:bg-gray-50/50 px-2 rounded-xl transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#8B0E2A]/5 text-[#8B0E2A] flex items-center justify-center shrink-0">
                    <FileText size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-xs sm:text-sm">{doc.title}</h4>
                    <div className="flex items-center gap-3 text-[10px] text-gray-400 mt-1">
                      <span className="uppercase">{doc.fileType || 'PDF'}</span>
                      <span>&bull;</span>
                      <span>{doc.fileSize || 'View File'}</span>
                      <span>&bull;</span>
                      <span>Published {new Date(doc.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</span>
                    </div>
                  </div>
                </div>

                <a
                  href={`${API_BASE_URL}${doc.file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 bg-[#8B0E2A]/10 hover:bg-[#8B0E2A] text-[#8B0E2A] hover:text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shrink-0"
                >
                  <Download size={12} />
                  Download
                </a>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main CMS content */}
      {sections.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Archive Content */}
          <div className="lg:col-span-8 bg-white border border-gray-100 rounded-[28px] p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)] prose max-w-none text-gray-700 leading-relaxed font-light text-[15px]">
            <CmsRenderer sections={sections} />
          </div>

          {/* Right Column: Registry Sidebar */}
          <div className="lg:col-span-4 space-y-6 sticky top-28">
            {/* Disclaimer Callout */}
            <div className="bg-[#B8860B]/5 border border-[#B8860B]/20 rounded-2xl p-6 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#B8860B] block">Registry Guidelines</span>
              <h4 className="font-heading font-bold text-gray-900 text-sm">Official Copies</h4>
              <p className="text-xs text-gray-500 font-light leading-relaxed">
                Downloaded soft copies should match physical register files. For verified certified stamps, contact registry office counter.
              </p>
            </div>

            {/* Quick Categories Panel */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-3">
              <h4 className="font-heading font-bold text-sm text-gray-900 uppercase tracking-wider pb-2 border-b border-gray-50">
                Document Sections
              </h4>
              <ul className="text-xs text-gray-500 font-light space-y-2">
                <li>&bull; Academic Circulars</li>
                <li>&bull; Admission Forms</li>
                <li>&bull; Examination Rosters</li>
                <li>&bull; Procurement Tenders</li>
              </ul>
            </div>
          </div>
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
