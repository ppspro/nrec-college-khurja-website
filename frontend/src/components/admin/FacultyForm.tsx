'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Save } from 'lucide-react';
import api from '@/lib/api';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ToastContainer from '@/components/ui/ToastContainer';
import { Department, Faculty } from '@/types';

const DEFAULT = {
  name: '', designation: '', qualification: '', department: '', email: '', phone: '',
  biography: '', specialization: '', experience: '', publications: '', order: 0, isActive: true,
};

export default function FacultyForm({ params }: { params: Promise<{ id?: string }> }) {
  const router = useRouter();
  const [form, setForm] = useState(DEFAULT);
  const [departments, setDepartments] = useState<Department[]>([]);
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
    // Load departments list
    api.get('/departments')
      .then((res) => setDepartments(res.data.departments || []))
      .catch(() => addToast('Failed to load departments list', 'error'));

    params.then((p) => {
      const facultyId = p.id;
      if (facultyId) {
        setId(facultyId);
        setFetching(true);
        api.get(`/faculty`)
          .then((res) => {
            const list = res.data.faculty || [];
            const f = list.find((item: Faculty) => item._id === facultyId);
            if (f) {
              setForm({
                name: f.name || '',
                designation: f.designation || '',
                qualification: f.qualification || '',
                department: typeof f.department === 'object' ? f.department?._id : f.department || '',
                email: f.email || '',
                phone: f.phone || '',
                biography: f.biography || '',
                specialization: (f.specialization || []).join(', '),
                experience: f.experience || '',
                publications: (f.publications || []).join('\n'),
                order: f.order || 0,
                isActive: f.isActive !== undefined ? f.isActive : true,
              });
              if (f.photo) {
                setPreview(`${process.env.NEXT_PUBLIC_UPLOADS_URL || 'http://localhost:5000'}${f.photo}`);
              }
            }
          })
          .catch(() => addToast('Failed to load faculty member details', 'error'))
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
      addToast('Faculty name is required', 'error');
      return;
    }
    if (!form.department) {
      addToast('Please select a department', 'error');
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, val]) => {
        if (key === 'specialization') {
          const specArray = val ? String(val).split(',').map((s) => s.trim()).filter(Boolean) : [];
          formData.append('specialization', JSON.stringify(specArray));
        } else if (key === 'publications') {
          const pubArray = val ? String(val).split('\n').map((p) => p.trim()).filter(Boolean) : [];
          formData.append('publications', JSON.stringify(pubArray));
        } else {
          formData.append(key, String(val));
        }
      });
      if (file) {
        formData.append('photo', file);
      }

      if (id) {
        await api.put(`/faculty/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await api.post('/faculty', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      addToast('Faculty profile saved successfully!', 'success');
      setTimeout(() => router.push('/admin/faculty'), 1000);
    } catch {
      addToast('Failed to save faculty profile. Please check forms values.', 'error');
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
        <Link href="/admin/faculty" className="w-9 h-9 rounded-xl border border-[#E7E7E7] flex items-center justify-center hover:border-[#990A25] hover:text-[#990A25] transition-all">
          <ChevronLeft size={18} />
        </Link>
        <div>
          <h1 className="admin-page-title">{id ? 'Edit Faculty Profile' : 'New Faculty Member'}</h1>
          <p className="text-sm text-[#666666]">{id ? 'Update member parameters' : 'Register a new faculty educator profile'}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card hoverEffect={false} className="p-6 space-y-5 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Full Name *</label>
              <input required value={form.name} onChange={(e) => update('name', e.target.value)} className="form-input" placeholder="e.g. Dr. Ramesh Kumar" />
            </div>
            <div>
              <label className="form-label">Designation / Role *</label>
              <input required value={form.designation} onChange={(e) => update('designation', e.target.value)} className="form-input" placeholder="e.g. Associate Professor" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Department *</label>
              <select required value={form.department} onChange={(e) => update('department', e.target.value)} className="form-input">
                <option value="">Select Department</option>
                {departments.map((d) => <option key={d._id} value={d._id}>{d.name}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">Academic Qualification *</label>
              <input required value={form.qualification} onChange={(e) => update('qualification', e.target.value)} className="form-input" placeholder="e.g. M.Sc., Ph.D." />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Email Address</label>
              <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className="form-input" />
            </div>
            <div>
              <label className="form-label">Contact Phone</label>
              <input value={form.phone} onChange={(e) => update('phone', e.target.value)} className="form-input" />
            </div>
          </div>

          <div>
            <label className="form-label">Biography</label>
            <textarea value={form.biography} onChange={(e) => update('biography', e.target.value)} className="form-input h-20 resize-none" placeholder="Provide background profile summary..." />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Specializations (comma-separated)</label>
              <input value={form.specialization} onChange={(e) => update('specialization', e.target.value)} className="form-input" placeholder="e.g. Organic Chemistry, Nano Science" />
            </div>
            <div>
              <label className="form-label">Teaching Experience</label>
              <input value={form.experience} onChange={(e) => update('experience', e.target.value)} className="form-input" placeholder="e.g. 12 Years" />
            </div>
          </div>

          <div>
            <label className="form-label">Publications (one per line)</label>
            <textarea value={form.publications} onChange={(e) => update('publications', e.target.value)} className="form-input h-24" placeholder="List journal papers..." />
          </div>

          {/* Profile Photo */}
          <div>
            <label className="form-label">Profile Photo</label>
            <div className="flex items-center gap-4">
              <input type="file" accept="image/*" onChange={handleFileChange} className="form-input" />
              {preview && (
                <div className="relative w-16 h-16 rounded-full overflow-hidden border border-[#E7E7E7]">
                  <img src={preview} alt="Preview" className="object-cover w-full h-full" />
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">Priority Order</label>
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
              {id ? 'Update Profile' : 'Register Profile'}
            </Button>
            <Link href="/admin/faculty">
              <Button type="button" variant="outline">Cancel</Button>
            </Link>
          </div>
        </Card>
      </form>
    </div>
  );
}
