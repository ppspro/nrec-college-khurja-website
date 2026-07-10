'use client';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';
import { useMemo } from 'react';

const ReactQuill = dynamic(() => import('react-quill-new'), { 
  ssr: false, 
  loading: () => <div className="h-64 bg-gray-50 border border-gray-200 rounded-lg animate-pulse flex items-center justify-center text-gray-400">Loading editor...</div> 
});

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  label?: string;
  className?: string;
}

export default function RichTextEditor({ value, onChange, label, className = '' }: RichTextEditorProps) {
  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'clean']
    ],
  }), []);

  return (
    <div className={`w-full ${className}`}>
      {label && <label className="form-label mb-2 block">{label}</label>}
      <div className="bg-white rounded-t-lg">
        <ReactQuill 
          theme="snow" 
          value={value} 
          onChange={onChange} 
          modules={modules} 
          className="h-64 pb-12" 
        />
      </div>
    </div>
  );
}
