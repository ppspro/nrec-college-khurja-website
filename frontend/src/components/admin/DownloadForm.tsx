'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Save } from 'lucide-react';
import api from '@/lib/api';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ToastContainer from '@/components/ui/ToastContainer';
import { Download } from '@/types';

const CATEGORIES = ['Prospectus', 'Academic Calendar', 'Examination Forms', 'NAAC Documents', 'NIRF Documents', 'Annual Reports', 'Admission Forms', 'Miscellaneous'];

const DEFAULT = {
  title: '', description: '', category: 'Prospectus', order: 0, isActive: true,
};

export default function DownloadForm({ params }: { params: Promise<{ id?: string }> }) {
  const router = useRouter();
  const [form, setForm] = useState(DEFAULT);
  const [file, setFile] = useState<File | null>(null);
  const [previewName, setPreviewName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [toasts, setToasts] = useState<any[]>([]);
  const [id, setId] = useState<string | null>(null);

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

  useEffect(() => {
    params.then((p) => {
      const downloadId = p.id;
      if (downloadId) {
        setId(downloadId);
        setFetching(true);
        api.get(`/downloads`)
          .then((res) => {
            const list = res.data.downloads || [];
            const d = list.find((item: Download) => item._id === downloadId);
            if (d) {
              setForm({
                title: d.title || '',
                description: d.description || '',
                category: d.category || 'Prospectus',
                order: d.order || 0,
                isActive: d.isActive !== undefined ? d.isActive : true,
              });
              if (d.file) {
                setPreviewName(d.file.split('/').pop() || 'Existing File');
              }
            }
          })
          .catch(() => addToast('Failed to load download item details', 'error'))
          .finally(() => setFetching(false));
      }
    });
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setPreviewName(selected.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      addToast('Download title is required', 'error');
      return;
    }
    if (!id && !file) {
      addToast('Please select a file to upload', 'error');
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, val]) => {
        formData.append(key, String(val));
      });
      if (file) {
        formData.append('file', file);
      }

      if (id) {
        await api.put(`/downloads/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await api.post('/downloads', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      addToast('Download item saved successfully!', 'success');
      setTimeout(() => router.push('/admin/downloads'), 1000);
    } catch {
      addToast('Failed to save download item. Please verify parameters.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const update = (key: string, value: unknown) => setForm((f) => ({ ...f, [key]: value }));

  if (fetching) {
    return <div className="space-y-4">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="skeleton h-12 rounded-xl" />)}</div>;
  }

  return (
    <div className="max-w-3xl">
      <ToastContainer toasts={toasts} onClose={removeToast} />

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/downloads" className="w-9 h-9 rounded-xl border border-[#E7E7E7] flex items-center justify-center hover:border-[#990A25] hover:text-[#990A25] transition-all">
          <ChevronLeft size={18} />
        </Link>
        <div>
          <h1 className="admin-page-title">{id ? 'Edit Download Item' : 'New Download'}</h1>
          <p className="text-sm text-[#666666]">{id ? 'Update download parameters' : 'Upload a new document or resource'}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card hoverEffect={false} className="p-6 space-y-5 bg-white">
          <div>
            <label className="form-label">Document Title *</label>
            <input required value={form.title} onChange={(e) => update('title', e.target.value)} className="form-input" placeholder="e.g. Academic Calendar 2024-25" />
          </div>

          <div>
            <label className="form-label">Description</label>
            <textarea value={form.description} onChange={(e) => update('description', e.target.value)} className="form-input h-16 resize-none" placeholder="Provide context or details..." />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Category</label>
              <select value={form.category} onChange={(e) => update('category', e.target.value)} className="form-input">
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">Priority Order</label>
              <input type="number" value={form.order} onChange={(e) => update('order', parseInt(e.target.value) || 0)} className="form-input" />
            </div>
          </div>

          {/* Document Upload */}
          <div>
            <label className="form-label">Document File *</label>
            <div className="flex items-center gap-4">
              <input type="file" onChange={handleFileChange} className="form-input" />
              {previewName && (
                <span className="text-xs text-[#666666] bg-[#F9F9F9] border border-[#E7E7E7] px-3 py-1.5 rounded-lg truncate max-w-xs">
                  {previewName}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" checked={form.isActive} onChange={(e) => update('isActive', e.target.checked)} className="w-4 h-4 accent-[#990A25]" />
              <span className="text-sm text-[#2E2E2E] font-medium">Visible on website</span>
            </label>
          </div>

          <div className="flex gap-3 pt-2 border-t border-[#E7E7E7]">
            <Button type="submit" variant="primary" loading={loading} className="gap-2">
              {!loading && <Save size={15} />}
              {id ? 'Update Download' : 'Upload Download'}
            </Button>
            <Link href="/admin/downloads">
              <Button type="button" variant="outline">Cancel</Button>
            </Link>
          </div>
        </Card>
      </form>
    </div>
  );
}
