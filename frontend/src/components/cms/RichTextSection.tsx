import React from 'react';
import SectionTitle from '@/components/ui/SectionTitle';

interface RichTextData {
  label?: string;
  title?: string;
  content: string; // HTML string or paragraphs
  align?: 'left' | 'center' | 'right';
  id?: string;
}

export default function RichTextSection({ data }: { data: RichTextData }) {
  if (!data) return null;

  return (
    <section id={data.id} className="bg-white section-py">
      <div className="container-nrec">
        <div className={`max-w-4xl mx-auto ${data.align === 'center' ? 'text-center' : ''}`}>
          {(data.title || data.label) && (
            <SectionTitle
              label={data.label}
              title={data.title || ''}
              align={data.align === 'center' ? 'center' : 'left'}
              className="mb-8"
            />
          )}
          <div 
            className="prose prose-lg max-w-none text-gray-600 font-light leading-relaxed"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        </div>
      </div>
    </section>
  );
}
