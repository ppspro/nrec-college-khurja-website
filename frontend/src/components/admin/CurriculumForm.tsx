'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Save, UploadCloud } from 'lucide-react';
import api from '@/lib/api';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ToastContainer from '@/components/ui/ToastContainer';
import { Curriculum, Department, Course } from '@/types';

const DEFAULT = {
  title: '', faculty: '', department: '', course: '', semesterYear: '', isActive: true,
};

export default function CurriculumForm({ params }: { params: Promise<{ id?: string }> }) {
  const router = useRouter();
  const [form, setForm] = useState(DEFAULT);
  const [file, setFile] = useState<File | null>(null);
  const [previewName, setPreviewName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [toasts, setToasts] = useState<any[]>([]);
  const [id, setId] = useState<string | null>(null);

  const [departments, setDepartments] = useState<Department[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);

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
    // Fetch departments and courses
    api.get('/departments').then((res) => setDepartments(res.data.departments || []));
    api.get('/courses').then((res) => setCourses(res.data.courses || []));

    params.then((p) => {
      const curriculumId = p.id;
      if (curriculumId) {
        setId(curriculumId);
        setFetching(true);
        api.get(`/curriculum/admin/all`)
          .then((res) => {
            const list = res.data.curriculum || [];
            const d = list.find((item: Curriculum) => item._id === curriculumId);
            if (d) {
              setForm({
                title: d.title || '',
                faculty: d.faculty || '',
                department: typeof d.department === 'object' ? (d.department as Department)._id : d.department,
                course: typeof d.course === 'object' ? (d.course as Course)._id : d.course,
                semesterYear: d.semesterYear || '',
                isActive: d.isActive !== undefined ? d.isActive : true,
              });
              if (d.pdfFile) {
                setPreviewName(d.pdfFile.split('/').pop() || 'Existing PDF');
              }
            }
          })
          .catch(() => addToast('Failed to load curriculum details', 'error'))
          .finally(() => setFetching(false));
      }
    });
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      if (selected.type !== 'application/pdf') {
        addToast('Please select a valid PDF file.', 'error');
        e.target.value = '';
        return;
      }
      setFile(selected);
      setPreviewName(selected.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      addToast('Title is required', 'error');
      return;
    }
    if (!form.department) {
      addToast('Department is required', 'error');
      return;
    }
    if (!form.course) {
      addToast('Course is required', 'error');
      return;
    }
    if (!id && !file) {
      addToast('A PDF file is required for new curriculum.', 'error');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('faculty', form.faculty);
      formData.append('department', form.department);
      formData.append('course', form.course);
      formData.append('semesterYear', form.semesterYear);
      formData.append('isActive', form.isActive.toString());

      if (file) {
        formData.append('pdfFile', file);
      }

      if (id) {
        await api.put(`/curriculum/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        addToast('Curriculum updated successfully', 'success');
      } else {
        await api.post('/curriculum', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        addToast('Curriculum created successfully', 'success');
      }
      setTimeout(() => router.push('/admin/curriculum'), 1500);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      addToast(err.response?.data?.message || 'Error saving curriculum', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="p-10 flex justify-center text-[#666666]">Loading curriculum data...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/curriculum" className="w-10 h-10 rounded-full bg-white border border-[#E7E7E7] flex items-center justify-center text-[#666666] hover:bg-[#F9F9F9] transition-colors">
            <ChevronLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#111111]">{id ? 'Edit Curriculum' : 'Add Curriculum'}</h1>
            <p className="text-sm text-[#666666]">Upload curriculum PDF and assign to courses.</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info Card */}
        <Card>
          <div className="p-6 md:p-8 space-y-6">
            <h3 className="text-lg font-bold text-[#111111] border-b border-[#E7E7E7] pb-3">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium text-[#444444]">Title <span className="text-[#990A25]">*</span></label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. BCA 1st Year Syllabus 2024"
                  className="w-full px-4 py-3 bg-[#F9F9F9] border border-[#E7E7E7] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#990A25]/20 focus:border-[#990A25] transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#444444]">Faculty <span className="text-[#990A25]">*</span></label>
                <input
                  type="text"
                  required
                  value={form.faculty}
                  onChange={(e) => setForm({ ...form, faculty: e.target.value })}
                  placeholder="e.g. Faculty of Science"
                  className="w-full px-4 py-3 bg-[#F9F9F9] border border-[#E7E7E7] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#990A25]/20 focus:border-[#990A25] transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#444444]">Semester / Year <span className="text-[#990A25]">*</span></label>
                <input
                  type="text"
                  required
                  value={form.semesterYear}
                  onChange={(e) => setForm({ ...form, semesterYear: e.target.value })}
                  placeholder="e.g. Semester 1, or 2024-2025"
                  className="w-full px-4 py-3 bg-[#F9F9F9] border border-[#E7E7E7] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#990A25]/20 focus:border-[#990A25] transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#444444]">Department <span className="text-[#990A25]">*</span></label>
                <select
                  required
                  value={form.department}
                  onChange={(e) => setForm({ ...form, department: e.target.value })}
                  className="w-full px-4 py-3 bg-[#F9F9F9] border border-[#E7E7E7] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#990A25]/20 focus:border-[#990A25] transition-all"
                >
                  <option value="">Select Department</option>
                  {departments.map((d) => (
                    <option key={d._id} value={d._id}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#444444]">Course <span className="text-[#990A25]">*</span></label>
                <select
                  required
                  value={form.course}
                  onChange={(e) => setForm({ ...form, course: e.target.value })}
                  className="w-full px-4 py-3 bg-[#F9F9F9] border border-[#E7E7E7] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#990A25]/20 focus:border-[#990A25] transition-all"
                >
                  <option value="">Select Course</option>
                  {courses.map((c) => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </Card>

        {/* Upload Card */}
        <Card>
          <div className="p-6 md:p-8 space-y-6">
            <h3 className="text-lg font-bold text-[#111111] border-b border-[#E7E7E7] pb-3">Syllabus PDF</h3>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#444444]">Upload PDF File {id ? '(Leave blank to keep existing)' : '<span className="text-[#990A25]">*</span>'}</label>
              <div className="mt-2 flex justify-center px-6 pt-8 pb-8 border-2 border-[#E7E7E7] border-dashed rounded-xl bg-[#F9F9F9] hover:bg-white transition-colors relative">
                <div className="space-y-2 text-center">
                  <UploadCloud className="mx-auto h-10 w-10 text-[#990A25]/60" />
                  <div className="flex text-sm text-[#444444]">
                    <label className="relative cursor-pointer rounded-md font-medium text-[#990A25] hover:text-[#7A081E] focus-within:outline-none">
                      <span>Upload a file</span>
                      <input type="file" name="pdfFile" accept="application/pdf" className="sr-only" onChange={handleFileChange} />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-[#666666]">PDF up to 10MB</p>
                </div>
              </div>
              {previewName && (
                <div className="mt-3 p-3 bg-white border border-[#E7E7E7] rounded-xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#990A25]/10 flex items-center justify-center text-[#990A25] font-medium text-xs">PDF</div>
                  <span className="text-sm font-medium text-[#444444] truncate">{previewName}</span>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Status Card */}
        <Card>
          <div className="p-6 md:p-8 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#111111]">Visibility Status</h3>
              <p className="text-sm text-[#666666] mt-1">If inactive, this curriculum won&apos;t appear on the public website.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={form.isActive}
                onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#059669]"></div>
            </label>
          </div>
        </Card>

        {/* Submit */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <Link href="/admin/curriculum" className="px-6 py-3 rounded-xl font-medium text-[#444444] hover:bg-[#F9F9F9] transition-colors">
            Cancel
          </Link>
          <Button type="submit" variant="primary" disabled={loading} className="px-8">
            <Save size={18} />
            {loading ? 'Saving...' : id ? 'Update Curriculum' : 'Create Curriculum'}
          </Button>
        </div>
      </form>
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
}
