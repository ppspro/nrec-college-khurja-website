'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Save } from 'lucide-react';
import api from '@/lib/api';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ToastContainer from '@/components/ui/ToastContainer';

const CATEGORIES = ['General', 'Examination', 'Admission', 'Academic', 'Administrative', 'Scholarship', 'Sports', 'Cultural'];

const DEFAULT = {
  title: '', content: '', category: 'General', isPinned: false,
  isActive: true, expiryDate: '', publishDate: new Date().toISOString().split('T')[0],
};

export default function NoticeForm({ params }: { params: Promise<{ id?: string }> }) {
  const router = useRouter();
  const [form, setForm] = useState(DEFAULT);
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
      const noticeId = p.id;
      if (noticeId) {
        setId(noticeId);
        setFetching(true);
        api.get(`/notices/${noticeId}`)
          .then((res) => {
            const n = res.data.notice;
            setForm({
              title: n.title || '', content: n.content || '', category: n.category || 'General',
              isPinned: n.isPinned || false, isActive: n.isActive !== undefined ? n.isActive : true,
              expiryDate: n.expiryDate ? n.expiryDate.split('T')[0] : '',
              publishDate: n.publishDate ? n.publishDate.split('T')[0] : new Date().toISOString().split('T')[0],
            });
          })
          .catch(() => addToast('Failed to load notice', 'error'))
          .finally(() => setFetching(false));
      }
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      addToast('Title is required', 'error');
      return;
    }
    setLoading(true);
    try {
      const payload = { ...form, expiryDate: form.expiryDate || null };
      if (id) {
        await api.put(`/notices/${id}`, payload);
      } else {
        await api.post('/notices', payload);
      }
      addToast('Notice saved successfully!', 'success');
      setTimeout(() => router.push('/admin/notices'), 1000);
    } catch {
      addToast('Failed to save notice. Please check inputs and try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const update = (key: string, value: unknown) => setForm((f) => ({ ...f, [key]: value }));

  if (fetching) {
    return <div className="space-y-4">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="skeleton h-12 rounded-xl" />)}</div>;
  }

  return (
    <div className="max-w-2xl">
      <ToastContainer toasts={toasts} onClose={removeToast} />

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/notices" className="w-9 h-9 rounded-xl border border-[#E7E7E7] flex items-center justify-center hover:border-[#990A25] hover:text-[#990A25] transition-all">
          <ChevronLeft size={18} />
        </Link>
        <div>
          <h1 className="admin-page-title">{id ? 'Edit Notice' : 'New Notice'}</h1>
          <p className="text-sm text-[#666666]">{id ? 'Update notice details' : 'Create a new notice or announcement'}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card hoverEffect={false} className="p-6 space-y-5 bg-white">
          <div>
            <label className="form-label">Title *</label>
            <input required value={form.title} onChange={(e) => update('title', e.target.value)} className="form-input" placeholder="Notice title" />
          </div>

          <div>
            <label className="form-label">Content</label>
            <textarea value={form.content} onChange={(e) => update('content', e.target.value)} className="form-input h-28 resize-none" placeholder="Notice content (optional)" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">Category</label>
              <select value={form.category} onChange={(e) => update('category', e.target.value)} className="form-input">
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">Publish Date</label>
              <input type="date" value={form.publishDate} onChange={(e) => update('publishDate', e.target.value)} className="form-input" />
            </div>
          </div>

          <div>
            <label className="form-label">Expiry Date (Optional)</label>
            <input type="date" value={form.expiryDate} onChange={(e) => update('expiryDate', e.target.value)} className="form-input" />
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" checked={form.isPinned} onChange={(e) => update('isPinned', e.target.checked)} className="w-4 h-4 accent-[#990A25]" />
              <span className="text-sm text-[#2E2E2E] font-medium">Pin to top</span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" checked={form.isActive} onChange={(e) => update('isActive', e.target.checked)} className="w-4 h-4 accent-[#990A25]" />
              <span className="text-sm text-[#2E2E2E] font-medium">Active (visible on website)</span>
            </label>
          </div>

          <div className="flex gap-3 pt-2 border-t border-[#E7E7E7]">
            <Button type="submit" variant="primary" loading={loading} className="gap-2">
              {!loading && <Save size={15} />}
              {id ? 'Update Notice' : 'Post Notice'}
            </Button>
            <Link href="/admin/notices">
              <Button type="button" variant="outline">Cancel</Button>
            </Link>
          </div>
        </Card>
      </form>
    </div>
  );
}
