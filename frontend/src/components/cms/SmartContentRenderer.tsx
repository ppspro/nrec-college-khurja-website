'use client';

import React from 'react';
import { User, Shield, Briefcase, FileText, Download, CheckCircle, HelpCircle } from 'lucide-react';

interface SmartContentRendererProps {
  content: string;
}

export default function SmartContentRenderer({ content }: SmartContentRendererProps) {
  if (!content) return null;

  // Clean HTML helpers
  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, '').trim();
  };

  const lines = content.split(/\r?\n|<br\s*\/?>|<\/p>|<p>/i)
    .map(line => stripHtml(line))
    .filter(line => line.length > 0);

  // 1. Detect Governance Leadership: "President: Name", "Secretary: Name", etc.
  const memberMatches = lines.filter(line => {
    const parts = line.split(':');
    return parts.length === 2 && ['president', 'secretary', 'coordinator', 'patron', 'treasurer', 'convenor', 'member'].includes(parts[0].trim().toLowerCase());
  });

  if (memberMatches.length > 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        {memberMatches.map((match, idx) => {
          const [role, name] = match.split(':');
          const trimmedRole = role.trim();
          const trimmedName = name.trim();

          return (
            <div
              key={idx}
              className="bg-white border border-[#B8860B]/10 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center group"
            >
              <div className="w-14 h-14 rounded-full bg-[#8B0E2A]/5 text-[#8B0E2A] flex items-center justify-center mb-4 border border-[#8B0E2A]/10 group-hover:bg-[#8B0E2A] group-hover:text-white transition-all">
                <User size={22} />
              </div>
              <h4 className="font-heading font-bold text-gray-900 text-md mb-1 leading-snug">
                {trimmedName}
              </h4>
              <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-[#B8860B]/10 text-[#B8860B]">
                {trimmedRole}
              </span>
              <span className="text-[11px] text-gray-400 mt-3 font-light leading-relaxed block">
                NREC College Governing Board
              </span>
            </div>
          );
        })}
      </div>
    );
  }

  // 2. Detect Lists: lines starting with "-" or "*"
  const isBulletList = lines.some(line => line.startsWith('-') || line.startsWith('*'));
  if (isBulletList) {
    const listItems = lines
      .filter(line => line.startsWith('-') || line.startsWith('*'))
      .map(line => line.substring(1).trim());

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
        {listItems.map((item, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-100 rounded-xl p-4 flex items-start gap-3 shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:border-[#8B0E2A]/25 transition-all"
          >
            <div className="w-6 h-6 rounded bg-[#8B0E2A]/10 text-[#8B0E2A] flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle size={13} />
            </div>
            <p className="text-gray-600 text-xs sm:text-sm font-light leading-relaxed">{item}</p>
          </div>
        ))}
      </div>
    );
  }

  // 3. Normal paragraph styling (Automatic 4-line splitter rule)
  const paragraphBlocks = lines.filter(line => !line.startsWith('-') && !line.startsWith('*') && !line.includes(':'));

  return (
    <div className="space-y-6">
      {paragraphBlocks.map((block, idx) => {
        // Words count approximation for 4 lines of text: ~45-50 words
        const words = block.split(/\s+/);
        if (words.length > 50) {
          const intro = words.slice(0, 30).join(' ');
          const remainder = words.slice(30).join(' ');

          return (
            <div key={idx} className="space-y-4">
              <p className="text-gray-800 font-bold text-sm sm:text-md leading-relaxed">
                {intro}…
              </p>
              <div className="bg-[#F8F5F0]/50 border-l-4 border-[#B8860B] p-4 rounded-r-xl">
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed font-light">
                  {remainder}
                </p>
              </div>
            </div>
          );
        }

        return (
          <p key={idx} className="text-gray-600 text-xs sm:text-sm leading-relaxed font-light last:mb-0">
            {block}
          </p>
        );
      })}
    </div>
  );
}
