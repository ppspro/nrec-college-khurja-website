'use client';
import { useState, useEffect, useRef } from 'react';
import { Upload, Trash2, Search, FileText, Image as ImageIcon, Copy, Check } from 'lucide-react';
import api from '@/lib/api';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ToastContainer from '@/components/ui/ToastContainer';
import SafeImage from '@/components/ui/SafeImage';
import AdminPageHeader from '@/components/admin/AdminPageHeader';

export default function MediaLibrary() {
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [search, setSearch] = useState('');
  const [toasts, setToasts] = useState<any[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToasts((prev) => {
      const idStr = Math.random().toString(36).substring(2, 9);
      setTimeout(() => removeToast(idStr), 4000);
      return [...prev, { id: idStr, message, type }];
    });
  };

  const removeToast = (idStr: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== idStr));
  };

  const fetchMedia = () => {
    setFetching(true);
    const query = new URLSearchParams({ limit: '100' });
    if (search) query.append('search', search);

    api.get(`/media?${query.toString()}`)
      .then((res) => setMedia(res.data.media))
      .catch(() => addToast('Failed to load media', 'error'))
      .finally(() => setFetching(false));
  };

  useEffect(() => {
    fetchMedia();
  }, [search]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setLoading(true);
    const formData = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      formData.append('files', e.target.files[i]);
    }
    formData.append('folder', 'media');

    try {
      await api.post('/media', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      addToast('Files uploaded successfully', 'success');
      fetchMedia();
    } catch {
      addToast('Upload failed', 'error');
    } finally {
      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const deleteMedia = async (id: string) => {
    if (!confirm('Are you sure you want to delete this file? This may break pages using it.')) return;
    try {
      await api.delete(`/media/${id}`);
      setMedia((prev) => prev.filter((m) => m._id !== id));
      addToast('File deleted', 'success');
    } catch {
      addToast('Failed to delete file', 'error');
    }
  };

  const copyToClipboard = (url: string, id: string) => {
    const fullUrl = `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || ''}${url}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    addToast('URL copied to clipboard', 'success');
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024, sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-6xl">
      <ToastContainer toasts={toasts} onClose={removeToast} />

      <AdminPageHeader 
        title="Media Library" 
        description="Upload and manage images, PDFs, and SVGs across the entire site."
        helpSection="media"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search files..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8B0E2A]/20"
            />
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            multiple 
            className="hidden" 
            accept="image/*,.pdf,.doc,.docx"
          />
          <Button onClick={() => fileInputRef.current?.click()} loading={loading} className="gap-2">
            {!loading && <Upload size={16} />}
            Upload Files
          </Button>
        </div>
      </AdminPageHeader>

      {fetching ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => <div key={i} className="skeleton h-40 rounded-xl" />)}
        </div>
      ) : media.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
          <ImageIcon size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 font-medium">No media files found</p>
          <p className="text-sm text-gray-400 mt-1">Upload files to see them here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {media.map((item) => {
            const isImage = item.mimeType.startsWith('image/');
            return (
              <Card key={item._id} className="group relative overflow-hidden bg-white border border-gray-100 p-2 flex flex-col">
                <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center relative mb-2">
                  {isImage ? (
                    <SafeImage src={item.url} alt={item.originalName} fill className="object-cover" />
                  ) : (
                    <FileText size={40} className="text-gray-400" />
                  )}
                  {/* Actions Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
                    <button 
                      onClick={() => copyToClipboard(item.url, item._id)}
                      className="w-8 h-8 rounded-full bg-white text-gray-800 flex items-center justify-center hover:bg-gray-100 transition-colors"
                      title="Copy URL"
                    >
                      {copiedId === item._id ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                    </button>
                    <button 
                      onClick={() => deleteMedia(item._id)}
                      className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center hover:bg-rose-600 transition-colors"
                      title="Delete File"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <div className="text-xs font-medium text-gray-800 truncate px-1" title={item.originalName}>
                  {item.originalName}
                </div>
                <div className="text-[10px] text-gray-400 px-1 mt-0.5 flex justify-between">
                  <span>{formatSize(item.size)}</span>
                  <span className="uppercase">{item.url.split('.').pop()}</span>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
