'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Save } from 'lucide-react';
import api from '@/lib/api';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ToastContainer from '@/components/ui/ToastContainer';
import { Department } from '@/types';

const DEFAULT = {
  name: '', shortName: '', description: '', headOfDepartment: '', establishedYear: '',
  vision: '', mission: '', objectives: '', facilities: '', achievements: '', order: 0, isActive: true,
};

export default function DepartmentForm() {
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
      const deptId = p.id;
      if (deptId) {
        setId(deptId);
        setFetching(true);
        api.get(`/departments`)
          .then((res) => {
            const list = res.data.departments || [];
            const dept = list.find((d: Department) => d._id === deptId);
            if (dept) {
              setForm({
                name: dept.name || '',
                shortName: dept.shortName || '',
                description: dept.description || '',
                headOfDepartment: dept.headOfDepartment || '',
                establishedYear: dept.establishedYear || '',
                vision: dept.vision || '',
                mission: dept.mission || '',
                objectives: JSON.stringify(dept.objectives || []),
                facilities: JSON.stringify(dept.facilities || []),
                achievements: JSON.stringify(dept.achievements || []),
                order: dept.order || 0,
                isActive: dept.isActive !== undefined ? dept.isActive : true,
              });
              if (dept.image) {
                setPreview(`${process.env.NEXT_PUBLIC_UPLOADS_URL || 'http://localhost:5000'}${dept.image}`);
              }
            } else {
              addToast('Department details not found', 'error');
            }
          })
          .catch(() => addToast('Failed to load department details', 'error'))
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
    if (!form.name.trim()) {
      addToast('Department name is required', 'error');
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
        await api.put(`/departments/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await api.post('/departments', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      addToast('Department saved successfully!', 'success');
      setTimeout(() => router.push('/admin/departments'), 1000);
    } catch {
      addToast('Failed to save department. Please check parameters.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const update = (key: string, value: unknown) => setForm((f) => ({ ...f, [key]: value }));

  if (fetching) {
    return <div className="space-y-4">{Array.from({ length: 6 }).map((_, i) => <div key={i} className="skeleton h-12 rounded-xl" />)}</div>;
  }

  return (
    <div className="max-w-3xl">
      <ToastContainer toasts={toasts} onClose={removeToast} />

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/departments" className="w-9 h-9 rounded-xl border border-[#E7E7E7] flex items-center justify-center hover:border-[#990A25] hover:text-[#990A25] transition-all">
          <ChevronLeft size={18} />
        </Link>
        <div>
          <h1 className="admin-page-title">{id ? 'Edit Department' : 'New Department'}</h1>
          <p className="text-sm text-[#666666]">{id ? 'Update department values' : 'Create a new academic department'}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card hoverEffect={false} className="p-6 space-y-5 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Department Name *</label>
              <input required value={form.name} onChange={(e) => update('name', e.target.value)} className="form-input" placeholder="e.g. Faculty of Science" />
            </div>
            <div>
              <label className="form-label">Short Name / Code *</label>
              <input required value={form.shortName} onChange={(e) => update('shortName', e.target.value)} className="form-input" placeholder="e.g. Science" />
            </div>
          </div>

          <div>
            <label className="form-label">Description</label>
            <textarea value={form.description} onChange={(e) => update('description', e.target.value)} className="form-input h-24 resize-none" placeholder="Provide overview text..." />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Head of Department (HoD)</label>
              <input value={form.headOfDepartment} onChange={(e) => update('headOfDepartment', e.target.value)} className="form-input" placeholder="HoD Name" />
            </div>
            <div>
              <label className="form-label">Established Year</label>
              <input value={form.establishedYear} onChange={(e) => update('establishedYear', e.target.value)} className="form-input" placeholder="e.g. 1954" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Vision</label>
              <textarea value={form.vision} onChange={(e) => update('vision', e.target.value)} className="form-input h-20 resize-none" placeholder="Vision statements..." />
            </div>
            <div>
              <label className="form-label">Mission</label>
              <textarea value={form.mission} onChange={(e) => update('mission', e.target.value)} className="form-input h-20 resize-none" placeholder="Mission statements..." />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="form-label">Objectives (JSON Array)</label>
              <input value={form.objectives} onChange={(e) => update('objectives', e.target.value)} className="form-input text-xs" placeholder='["Obj 1", "Obj 2"]' />
            </div>
            <div>
              <label className="form-label">Facilities (JSON Array)</label>
              <input value={form.facilities} onChange={(e) => update('facilities', e.target.value)} className="form-input text-xs" placeholder='["Lab", "Library"]' />
            </div>
            <div>
              <label className="form-label">Achievements (JSON Array)</label>
              <input value={form.achievements} onChange={(e) => update('achievements', e.target.value)} className="form-input text-xs" placeholder='["Award 1", "Award 2"]' />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="form-label">Department Image</label>
            <div className="flex items-center gap-4">
              <input type="file" accept="image/*" onChange={handleFileChange} className="form-input" />
              {preview && (
                <div className="relative w-20 h-14 rounded-lg overflow-hidden border border-[#E7E7E7]">
                  <img src={preview} alt="Preview" className="object-cover w-full h-full" />
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">Order Priority</label>
              <input type="number" value={form.order} onChange={(e) => update('order', parseInt(e.target.value) || 0)} className="form-input" />
            </div>
            <div className="flex items-center pt-6">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" checked={form.isActive} onChange={(e) => update('isActive', e.target.checked)} className="w-4 h-4 accent-[#990A25]" />
                <span className="text-sm text-[#2E2E2E] font-medium">Visible on website</span>
              </label>
            </div>
          </div>

          <div className="flex gap-3 pt-2 border-t border-[#E7E7E7]">
            <Button type="submit" variant="primary" loading={loading} className="gap-2">
              {!loading && <Save size={15} />}
              {id ? 'Update Department' : 'Create Department'}
            </Button>
            <Link href="/admin/departments">
              <Button type="button" variant="outline">Cancel</Button>
            </Link>
          </div>
        </Card>
      </form>
    </div>
  );
}
