'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Save } from 'lucide-react';
import api from '@/lib/api';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ToastContainer from '@/components/ui/ToastContainer';
import { News } from '@/types';

const DEFAULT = {
  title: '', excerpt: '', content: '', category: 'Academic', tags: '',
  isPublished: true, isFeatured: false, publishDate: new Date().toISOString().split('T')[0],
  author: 'NREC College',
};

export default function NewsForm({ params }: { params: Promise<{ id?: string }> }) {
  const router = useRouter();
  const [form, setForm] = useState(DEFAULT);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
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
      const newsId = p.id;
      if (newsId) {
        setId(newsId);
        setFetching(true);
        api.get(`/news`)
          .then((res) => {
            const list = res.data.news || [];
            const item = list.find((n: News) => n._id === newsId);
            if (item) {
              setForm({
                title: item.title || '',
                excerpt: item.excerpt || '',
                content: item.content || '',
                category: item.category || 'Academic',
                tags: (item.tags || []).join(', '),
                isPublished: item.isPublished !== undefined ? item.isPublished : true,
                isFeatured: item.isFeatured || false,
                publishDate: item.publishDate ? item.publishDate.split('T')[0] : new Date().toISOString().split('T')[0],
                author: item.author || 'NREC College',
              });
              if (item.image) {
                setPreview(`${process.env.NEXT_PUBLIC_UPLOADS_URL || 'http://localhost:5000'}${item.image}`);
              }
            }
          })
          .catch(() => addToast('Failed to load news article details', 'error'))
          .finally(() => setFetching(false));
      }
    });
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      addToast('Title is required', 'error');
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, val]) => {
        if (key === 'tags') {
          const tagsArray = val ? String(val).split(',').map((t) => t.trim()).filter(Boolean) : [];
          formData.append('tags', JSON.stringify(tagsArray));
        } else {
          formData.append(key, String(val));
        }
      });
      if (file) {
        formData.append('image', file);
      }

      if (id) {
        await api.put(`/news/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await api.post('/news', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      addToast('News saved successfully!', 'success');
      setTimeout(() => router.push('/admin/news'), 1000);
    } catch {
      addToast('Failed to save news. Please check form values.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const update = (key: string, value: unknown) => setForm((f) => ({ ...f, [key]: value }));

  if (fetching) {
    return <div className="space-y-4">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="skeleton h-12 rounded-xl" />)}</div>;
  }

  return (
    <div className="max-w-3xl">
      <ToastContainer toasts={toasts} onClose={removeToast} />

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/news" className="w-9 h-9 rounded-xl border border-[#E7E7E7] flex items-center justify-center hover:border-[#990A25] hover:text-[#990A25] transition-all">
          <ChevronLeft size={18} />
        </Link>
        <div>
          <h1 className="admin-page-title">{id ? 'Edit News Article' : 'New News Article'}</h1>
          <p className="text-sm text-[#666666]">{id ? 'Update article details' : 'Create a new news or press release'}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card hoverEffect={false} className="p-6 space-y-5 bg-white">
          <div>
            <label className="form-label">Title *</label>
            <input required value={form.title} onChange={(e) => update('title', e.target.value)} className="form-input" placeholder="Article title" />
          </div>

          <div>
            <label className="form-label">Excerpt / Summary *</label>
            <textarea required value={form.excerpt} onChange={(e) => update('excerpt', e.target.value)} className="form-input h-16 resize-none" placeholder="Short description..." />
          </div>

          <div>
            <label className="form-label">Content Body</label>
            <textarea value={form.content} onChange={(e) => update('content', e.target.value)} className="form-input h-40" placeholder="Full article body..." />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="form-label">Category</label>
              <select value={form.category} onChange={(e) => update('category', e.target.value)} className="form-input">
                {['Academic', 'Admission', 'Cultural', 'Sports', 'Seminar', 'General'].map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">Author</label>
              <input value={form.author} onChange={(e) => update('author', e.target.value)} className="form-input" />
            </div>
            <div>
              <label className="form-label">Publish Date</label>
              <input type="date" value={form.publishDate} onChange={(e) => update('publishDate', e.target.value)} className="form-input" />
            </div>
          </div>

          <div>
            <label className="form-label">Tags (comma-separated)</label>
            <input value={form.tags} onChange={(e) => update('tags', e.target.value)} className="form-input" placeholder="e.g. exams, results, arts" />
          </div>

          {/* Image Upload */}
          <div>
            <label className="form-label">Feature Image</label>
            <div className="flex items-center gap-4">
              <input type="file" accept="image/*" onChange={handleFileChange} className="form-input" />
              {preview && (
                <div className="relative w-20 h-14 rounded-lg overflow-hidden border border-[#E7E7E7]">
                  <img src={preview} alt="Preview" className="object-cover w-full h-full" />
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" checked={form.isPublished} onChange={(e) => update('isPublished', e.target.checked)} className="w-4 h-4 accent-[#990A25]" />
              <span className="text-sm text-[#2E2E2E] font-medium">Published (visible on site)</span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" checked={form.isFeatured} onChange={(e) => update('isFeatured', e.target.checked)} className="w-4 h-4 accent-[#990A25]" />
              <span className="text-sm text-[#2E2E2E] font-medium">Feature on homepage</span>
            </label>
          </div>

          <div className="flex gap-3 pt-2 border-t border-[#E7E7E7]">
            <Button type="submit" variant="primary" loading={loading} className="gap-2">
              {!loading && <Save size={15} />}
              {id ? 'Update Article' : 'Publish News'}
            </Button>
            <Link href="/admin/news">
              <Button type="button" variant="outline">Cancel</Button>
            </Link>
          </div>
        </Card>
      </form>
    </div>
  );
}
