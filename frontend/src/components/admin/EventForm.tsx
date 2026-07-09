'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Save } from 'lucide-react';
import api from '@/lib/api';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ToastContainer from '@/components/ui/ToastContainer';
import { Event } from '@/types';

const DEFAULT = {
  title: '', description: '', content: '', venue: '', startDate: '', endDate: '',
  startTime: '', endTime: '', category: 'Academic', registrationLink: '',
  isPublished: true, isFeatured: false,
};

export default function EventForm() {
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
      const eventId = p.id;
      if (eventId) {
        setId(eventId);
        setFetching(true);
        api.get(`/events`)
          .then((res) => {
            const list = res.data.events || [];
            const item = list.find((e: Event) => e._id === eventId);
            if (item) {
              setForm({
                title: item.title || '',
                description: item.description || '',
                content: item.content || '',
                venue: item.venue || '',
                startDate: item.startDate ? item.startDate.split('T')[0] : '',
                endDate: item.endDate ? item.endDate.split('T')[0] : '',
                startTime: item.startTime || '',
                endTime: item.endTime || '',
                category: item.category || 'Academic',
                registrationLink: item.registrationLink || '',
                isPublished: item.isPublished !== undefined ? item.isPublished : true,
                isFeatured: item.isFeatured || false,
              });
              if (item.image) {
                setPreview(`${process.env.NEXT_PUBLIC_UPLOADS_URL || 'http://localhost:5000'}${item.image}`);
              }
            }
          })
          .catch(() => addToast('Failed to load event details', 'error'))
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
      addToast('Event title is required', 'error');
      return;
    }
    if (!form.startDate) {
      addToast('Start date is required', 'error');
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
        await api.put(`/events/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await api.post('/events', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      addToast('Event saved successfully!', 'success');
      setTimeout(() => router.push('/admin/events'), 1000);
    } catch {
      addToast('Failed to save event details.', 'error');
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
        <Link href="/admin/events" className="w-9 h-9 rounded-xl border border-[#E7E7E7] flex items-center justify-center hover:border-[#990A25] hover:text-[#990A25] transition-all">
          <ChevronLeft size={18} />
        </Link>
        <div>
          <h1 className="admin-page-title">{id ? 'Edit Event' : 'New Event'}</h1>
          <p className="text-sm text-[#666666]">{id ? 'Update event parameters' : 'Schedule a new college activity'}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card hoverEffect={false} className="p-6 space-y-5 bg-white">
          <div>
            <label className="form-label">Event Title *</label>
            <input required value={form.title} onChange={(e) => update('title', e.target.value)} className="form-input" placeholder="Event title" />
          </div>

          <div>
            <label className="form-label">Description / Summary</label>
            <textarea value={form.description} onChange={(e) => update('description', e.target.value)} className="form-input h-16 resize-none" placeholder="Brief outline..." />
          </div>

          <div>
            <label className="form-label">Detailed Content</label>
            <textarea value={form.content} onChange={(e) => update('content', e.target.value)} className="form-input h-32" placeholder="Full schedule details, instructions..." />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Start Date *</label>
              <input type="date" required value={form.startDate} onChange={(e) => update('startDate', e.target.value)} className="form-input" />
            </div>
            <div>
              <label className="form-label">End Date</label>
              <input type="date" value={form.endDate} onChange={(e) => update('endDate', e.target.value)} className="form-input" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Start Time</label>
              <input value={form.startTime} onChange={(e) => update('startTime', e.target.value)} className="form-input" placeholder="e.g. 10:00 AM" />
            </div>
            <div>
              <label className="form-label">End Time</label>
              <input value={form.endTime} onChange={(e) => update('endTime', e.target.value)} className="form-input" placeholder="e.g. 4:00 PM" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Venue</label>
              <input value={form.venue} onChange={(e) => update('venue', e.target.value)} className="form-input" placeholder="e.g. College Ground" />
            </div>
            <div>
              <label className="form-label">Category</label>
              <select value={form.category} onChange={(e) => update('category', e.target.value)} className="form-input">
                {['Academic', 'Cultural', 'Sports', 'Seminar', 'Workshop', 'Exam', 'Other'].map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="form-label">Registration / External Link</label>
            <input value={form.registrationLink} onChange={(e) => update('registrationLink', e.target.value)} className="form-input" placeholder="https://..." />
          </div>

          {/* Image Upload */}
          <div>
            <label className="form-label">Event Banner Image</label>
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
              <span className="text-sm text-[#2E2E2E] font-medium">Visible on website</span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" checked={form.isFeatured} onChange={(e) => update('isFeatured', e.target.checked)} className="w-4 h-4 accent-[#990A25]" />
              <span className="text-sm text-[#2E2E2E] font-medium">Feature on homepage</span>
            </label>
          </div>

          <div className="flex gap-3 pt-2 border-t border-[#E7E7E7]">
            <Button type="submit" variant="primary" loading={loading} className="gap-2">
              {!loading && <Save size={15} />}
              {id ? 'Update Event' : 'Create Event'}
            </Button>
            <Link href="/admin/events">
              <Button type="button" variant="outline">Cancel</Button>
            </Link>
          </div>
        </Card>
      </form>
    </div>
  );
}
