'use client';
import { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, X, Loader2 } from 'lucide-react';
import api, { uploadsUrl } from '@/lib/api';
import SafeImage from '@/components/ui/SafeImage';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  className?: string;
}

export default function ImageUploader({ value, onChange, label, className = '' }: ImageUploaderProps) {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('files', file);

      const res = await api.post('/media', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data?.success && res.data.media?.[0]?.url) {
        onChange(res.data.media[0].url);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {label && <label className="form-label mb-2 block">{label}</label>}
      <div className="flex items-start gap-4">
        {value ? (
          <div className="relative w-32 h-32 rounded-lg border border-gray-200 overflow-hidden bg-gray-50 flex-shrink-0 group">
            <SafeImage src={uploadsUrl(value)} alt="Preview" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button 
                onClick={(e) => { e.preventDefault(); onChange(''); }}
                className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                title="Remove Image"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        ) : (
          <div className="w-32 h-32 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center flex-shrink-0">
            <ImageIcon size={24} className="text-gray-400" />
          </div>
        )}
        
        <div className="flex-1 mt-2">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleUpload} 
            accept="image/*" 
            className="hidden" 
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={loading}
            className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 flex items-center gap-2 text-sm font-medium text-gray-700 shadow-sm transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
            {value ? 'Change Image' : 'Upload Image'}
          </button>
          <p className="text-xs text-gray-500 mt-2">
            Upload a valid image file. It will be saved securely to the media library.
          </p>
        </div>
      </div>
    </div>
  );
}
