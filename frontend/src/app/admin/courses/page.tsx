'use client';
import AdminListPage from '@/components/admin/AdminListPage';
import { Course } from '@/types';
export default function AdminCoursesPage() {
  return (
    <AdminListPage<Course> helpSection="courses"
      title="Courses"
      subtitle="Manage all academic programmes"
      apiEndpoint="/courses"
      dataKey="courses"
      newHref="/admin/courses/new"
      editHref={(c) => `/admin/courses/edit?id=${c._id}`}
      searchPlaceholder="Search courses..."
      columns={[
        { key: 'name', label: 'Course Name', render: (c) => <span className="font-semibold">{c.name}</span> },
        { key: 'level', label: 'Level', render: (c) => <span className="badge text-xs">{c.level}</span> },
        { key: 'type', label: 'Type', render: (c) => <span className="text-[#666666] text-xs">{c.type}</span> },
        { key: 'duration', label: 'Duration', render: (c) => <span className="text-[#666666]">{c.duration}</span> },
        { key: 'department', label: 'Dept.', render: (c) => <span className="text-xs text-[#666666]">{typeof c.department === 'object' ? (c.department as { name: string }).name : '—'}</span> },
        { key: 'isActive', label: 'Status', render: (c) => <span className={`badge text-xs ${c.isActive ? 'badge-success' : 'bg-[#E7E7E7] text-[#666666]'}`}>{c.isActive ? 'Active' : 'Inactive'}</span> },
      ]}
    />
  );
}

