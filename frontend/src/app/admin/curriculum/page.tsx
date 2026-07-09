'use client';
import AdminListPage from '@/components/admin/AdminListPage';
import { Department, Course } from '@/types';

export default function AdminCurriculumPage() {
  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'faculty', label: 'Faculty' },
    {
      key: 'department',
      label: 'Department',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (row: any) => (row.department && typeof row.department === 'object' ? (row.department as Department).name : '-'),
    },
    {
      key: 'course',
      label: 'Course',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (row: any) => (row.course && typeof row.course === 'object' ? (row.course as Course).name : '-'),
    },
    { key: 'semesterYear', label: 'Semester/Year' },
    {
      key: 'isActive',
      label: 'Status',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (row: any) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {row.isActive ? 'Active' : 'Inactive'}
        </span>
      ),
    },
  ];

  return (
    <AdminListPage helpSection="curriculum"
      title="Curriculum Management"
      apiEndpoint="/curriculum/admin/all"
      dataKey="curriculum"
      newHref="/admin/curriculum/new"
      editHref={(row) => `/admin/curriculum/edit?id=${row._id}`}
      columns={columns}
      searchPlaceholder="Search curriculum..."
    />
  );
}

