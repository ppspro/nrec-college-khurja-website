'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Save, Upload } from 'lucide-react';
import api, { uploadsUrl } from '@/lib/api';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ToastContainer from '@/components/ui/ToastContainer';

const DEFAULT = {
  title: '',
  subtitle: '',
  description: '',
  buttonText: 'Learn More',
  buttonLink: '/',
  order: 0,
  isActive: true,
};

export default function SliderForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const unwrappedParams = { id: searchParams.get('id') || undefined };
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
    Promise.resolve(unwrappedParams).then((p) => {
      const sliderId = p.id;
      if (sliderId) {
        setId(sliderId);
        setFetching(true);
        // Sliders on settings router
        api.get('/settings/sliders/admin/all')
          .then((res) => {
            const list = res.data.sliders || [];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const item = list.find((s: any) => s._id === sliderId);
            if (item) {
              setForm({
                title: item.title || '',
                subtitle: item.subtitle || '',
                description: item.description || '',
                buttonText: item.buttonText || 'Learn More',
                buttonLink: item.buttonLink || '/',
                order: item.order || 0,
                isActive: item.isActive !== undefined ? item.isActive : true,
              });
              if (item.image) {
                setPreview(uploadsUrl(item.image));
              }
            }
          })
          .catch(() => addToast('Failed to load banner details', 'error'))
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
    if (!id && !file) {
      addToast('Background image is required for new banners', 'error');
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, val]) => {
        formData.append(key, String(val));
      });
      if (file) {
        formData.append('image', file);
      }

      if (id) {
        await api.put(`/settings/sliders/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await api.post('/settings/sliders', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      addToast('Banner saved successfully!', 'success');
      setTimeout(() => router.push('/admin/sliders'), 1000);
    } catch {
      addToast('Failed to save banner', 'error');
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
        <Link href="/admin/sliders" className="w-9 h-9 rounded-xl border border-[#E7E7E7] flex items-center justify-center hover:border-[#990A25] hover:text-[#990A25] transition-all">
          <ChevronLeft size={18} />
        </Link>
        <div>
          <h1 className="admin-page-title">{id ? 'Edit Banner' : 'New Banner'}</h1>
          <p className="text-sm text-[#666666]">{id ? 'Update homepage banner details' : 'Create a new homepage banner slide'}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card hoverEffect={false} className="p-6 space-y-5 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Title *</label>
              <input required value={form.title} onChange={(e) => update('title', e.target.value)} className="form-input" placeholder="Welcome to NREC College" />
            </div>
            <div>
              <label className="form-label">Subtitle</label>
              <input value={form.subtitle} onChange={(e) => update('subtitle', e.target.value)} className="form-input" placeholder="Excellence in Education since 1901" />
            </div>
          </div>

          <div>
            <label className="form-label">Description / Highlight text</label>
            <textarea value={form.description} onChange={(e) => update('description', e.target.value)} className="form-input h-20 resize-none" placeholder="Empowering minds and enriching lives..." />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">Button Text</label>
              <input value={form.buttonText} onChange={(e) => update('buttonText', e.target.value)} className="form-input" placeholder="Explore Courses" />
            </div>
            <div>
              <label className="form-label">Button Action URL</label>
              <input value={form.buttonLink} onChange={(e) => update('buttonLink', e.target.value)} className="form-input" placeholder="/courses" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">Display Order</label>
              <input type="number" min="0" value={form.order} onChange={(e) => update('order', parseInt(e.target.value) || 0)} className="form-input" />
            </div>
            <div className="flex flex-col justify-end pb-3">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" checked={form.isActive} onChange={(e) => update('isActive', e.target.checked)} className="w-4 h-4 accent-[#990A25]" />
                <span className="text-sm text-[#2E2E2E] font-medium">Active (visible on homepage)</span>
              </label>
            </div>
          </div>

          <div>
            <label className="form-label">Banner Image *</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-[#E7E7E7] rounded-xl hover:border-[#990A25] transition-colors relative">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-[#990A25]" />
                <div className="flex text-sm text-[#666666]">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-[#990A25] hover:text-[#7A081E] focus-within:outline-none">
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" accept="image/*" onChange={handleFileChange} className="sr-only" />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-[#999999]">PNG, JPG, WEBP up to 5MB (Recom. size 1920x800)</p>
              </div>
            </div>

            {preview && (
              <div className="mt-3 relative aspect-video rounded-xl overflow-hidden border border-gray-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={preview} alt="Banner preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-2 border-t border-[#E7E7E7]">
            <Button type="submit" variant="primary" loading={loading} className="gap-2">
              {!loading && <Save size={15} />}
              {id ? 'Update Banner' : 'Publish Banner'}
            </Button>
            <Link href="/admin/sliders">
              <Button type="button" variant="outline">Cancel</Button>
            </Link>
          </div>
        </Card>
      </form>
    </div>
  );
}
