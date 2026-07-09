'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Save } from 'lucide-react';
import api from '@/lib/api';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ToastContainer from '@/components/ui/ToastContainer';
import { Department, Course } from '@/types';

const DEFAULT = {
  name: '', code: '', department: '', level: 'UG', type: 'Regular', duration: '',
  totalSeats: 0, description: '', eligibility: '', feeStructure: '', syllabus: '',
  highlights: '', careerProspects: '', order: 0, isActive: true, isFeatured: false,
};

export default function CourseForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const unwrappedParams = { id: searchParams.get('id') || undefined };
  const [form, setForm] = useState(DEFAULT);
  const [departments, setDepartments] = useState<Department[]>([]);
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
    // Load departments
    api.get('/departments')
      .then((res) => setDepartments(res.data.departments || []))
      .catch(() => addToast('Failed to load departments list', 'error'));

    Promise.resolve(unwrappedParams).then((p) => {
      const courseId = p.id;
      if (courseId) {
        setId(courseId);
        setFetching(true);
        api.get(`/courses`)
          .then((res) => {
            const list = res.data.courses || [];
            const course = list.find((c: Course) => c._id === courseId);
            if (course) {
              setForm({
                name: course.name || '',
                code: course.code || '',
                department: typeof course.department === 'object' ? course.department?._id : course.department || '',
                level: course.level || 'UG',
                type: course.type || 'Regular',
                duration: course.duration || '',
                totalSeats: course.totalSeats || 0,
                description: course.description || '',
                eligibility: course.eligibility || '',
                feeStructure: course.feeStructure || '',
                syllabus: course.syllabus || '',
                highlights: JSON.stringify(course.highlights || []),
                careerProspects: JSON.stringify(course.careerProspects || []),
                order: course.order || 0,
                isActive: course.isActive !== undefined ? course.isActive : true,
                isFeatured: course.isFeatured || false,
              });
            } else {
              addToast('Course details not found', 'error');
            }
          })
          .catch(() => addToast('Failed to load course details', 'error'))
          .finally(() => setFetching(false));
      }
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      addToast('Course name is required', 'error');
      return;
    }
    if (!form.department) {
      addToast('Please select a department', 'error');
      return;
    }
    setLoading(true);
    try {
      if (id) {
        await api.put(`/courses/${id}`, form);
      } else {
        await api.post('/courses', form);
      }
      addToast('Course saved successfully!', 'success');
      setTimeout(() => router.push('/admin/courses'), 1000);
    } catch {
      addToast('Failed to save course. Please check parameters.', 'error');
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
        <Link href="/admin/courses" className="w-9 h-9 rounded-xl border border-[#E7E7E7] flex items-center justify-center hover:border-[#990A25] hover:text-[#990A25] transition-all">
          <ChevronLeft size={18} />
        </Link>
        <div>
          <h1 className="admin-page-title">{id ? 'Edit Course' : 'New Course'}</h1>
          <p className="text-sm text-[#666666]">{id ? 'Update course values' : 'Create a new course profile'}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <Card hoverEffect={false} className="p-8 space-y-6 bg-white">
          <h2 className="text-lg font-bold text-[#111111] mb-2 border-b border-black/5 pb-3">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="form-label flex justify-between">Course Name *</label>
              <input required value={form.name} onChange={(e) => update('name', e.target.value)} className="form-input" placeholder="e.g. Bachelor of Science" />
              <p className="text-[11px] text-gray-500 mt-1">The official full name of the course.</p>
            </div>
            <div>
              <label className="form-label">Course Code *</label>
              <input required value={form.code} onChange={(e) => update('code', e.target.value)} className="form-input" placeholder="e.g. B.Sc." />
              <p className="text-[11px] text-gray-500 mt-1">Short abbreviation used in URLs and badges.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="form-label">Department *</label>
              <select required value={form.department} onChange={(e) => update('department', e.target.value)} className="form-input">
                <option value="">Select Department</option>
                {departments.map((d) => <option key={d._id} value={d._id}>{d.name}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">Level</label>
              <select value={form.level} onChange={(e) => update('level', e.target.value)} className="form-input">
                {['UG', 'PG', 'Diploma', 'Certificate', 'PhD'].map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">Course Type</label>
              <select value={form.type} onChange={(e) => update('type', e.target.value)} className="form-input">
                {['Regular', 'Self-Finance', 'Distance'].map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
        </Card>

        {/* Details */}
        <Card hoverEffect={false} className="p-8 space-y-6 bg-white">
          <h2 className="text-lg font-bold text-[#111111] mb-2 border-b border-black/5 pb-3">Course Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="form-label">Duration</label>
              <input value={form.duration} onChange={(e) => update('duration', e.target.value)} className="form-input" placeholder="e.g. 3 Years" />
            </div>
            <div>
              <label className="form-label">Total Seats</label>
              <input type="number" value={form.totalSeats} onChange={(e) => update('totalSeats', parseInt(e.target.value) || 0)} className="form-input" />
            </div>
          </div>

          <div>
            <label className="form-label">Description</label>
            <textarea value={form.description} onChange={(e) => update('description', e.target.value)} className="form-input h-24 resize-none" placeholder="Provide course descriptions..." />
            <p className="text-[11px] text-gray-500 mt-1">Detailed overview of what the student will learn.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="form-label">Eligibility Criteria</label>
              <textarea value={form.eligibility} onChange={(e) => update('eligibility', e.target.value)} className="form-input h-20 resize-none" placeholder="Eligibility info..." />
            </div>
            <div>
              <label className="form-label">Fee Structure</label>
              <textarea value={form.feeStructure} onChange={(e) => update('feeStructure', e.target.value)} className="form-input h-20 resize-none" placeholder="e.g. ₹5,000 per semester" />
            </div>
          </div>
        </Card>

        {/* Additional Info */}
        <Card hoverEffect={false} className="p-8 space-y-6 bg-white">
          <h2 className="text-lg font-bold text-[#111111] mb-2 border-b border-black/5 pb-3">Additional & Meta</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="form-label">Key Highlights (JSON Array)</label>
              <input value={form.highlights} onChange={(e) => update('highlights', e.target.value)} className="form-input text-sm font-mono text-gray-600 bg-gray-50/50" placeholder='["Top Placement", "UGC Approved"]' />
              <p className="text-[11px] text-gray-500 mt-1">Must be formatted as a valid JSON array.</p>
            </div>
            <div>
              <label className="form-label">Career Prospects (JSON Array)</label>
              <input value={form.careerProspects} onChange={(e) => update('careerProspects', e.target.value)} className="form-input text-sm font-mono text-gray-600 bg-gray-50/50" placeholder='["Software Engineer", "Data Scientist"]' />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="form-label">External Syllabus Link</label>
              <input value={form.syllabus} onChange={(e) => update('syllabus', e.target.value)} className="form-input" placeholder="https://..." />
            </div>
            <div>
              <label className="form-label">Display Order</label>
              <input type="number" value={form.order} onChange={(e) => update('order', parseInt(e.target.value) || 0)} className="form-input" />
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-6">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" checked={form.isActive} onChange={(e) => update('isActive', e.target.checked)} className="w-5 h-5 rounded border-[#E7E7E7] text-[#990A25] focus:ring-[#990A25] transition-all cursor-pointer" />
              <span className="text-sm font-medium text-[#2E2E2E] group-hover:text-[#111111]">Visibility (Publish to Website)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" checked={form.isFeatured} onChange={(e) => update('isFeatured', e.target.checked)} className="w-5 h-5 rounded border-[#E7E7E7] text-[#990A25] focus:ring-[#990A25] transition-all cursor-pointer" />
              <span className="text-sm font-medium text-[#2E2E2E] group-hover:text-[#111111]">Featured Course</span>
            </label>
          </div>
        </Card>

        <div className="flex gap-4 pt-4 pb-12">
          <Button type="submit" variant="primary" disabled={loading} className="w-40 py-3.5 text-[15px]">
            {loading ? 'Saving...' : <><Save size={16} /> Save Course</>}
          </Button>
          <Link href="/admin/courses">
            <Button variant="outline" type="button" className="w-32 py-3.5 text-[15px]">Cancel</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
