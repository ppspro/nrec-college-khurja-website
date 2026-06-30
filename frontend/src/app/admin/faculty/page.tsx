'use client';
import AdminListPage from '@/components/admin/AdminListPage';
import { Faculty } from '@/types';
export default function AdminFacultyPage() {
  return (
    <AdminListPage<Faculty>
      title="Faculty"
      subtitle="Manage faculty members and their profiles"
      apiEndpoint="/faculty"
      dataKey="faculty"
      newHref="/admin/faculty/new"
      editHref={(f) => `/admin/faculty/${f._id}/edit`}
      searchPlaceholder="Search faculty..."
      columns={[
        { key: 'name', label: 'Name', render: (f) => <span className="font-semibold">{f.name}</span> },
        { key: 'designation', label: 'Designation', render: (f) => <span className="text-[#666666]">{f.designation}</span> },
        { key: 'qualification', label: 'Qualification', render: (f) => <span className="text-[#666666] text-xs">{f.qualification}</span> },
        { key: 'department', label: 'Department', render: (f) => <span className="badge text-xs">{typeof f.department === 'object' ? (f.department as { name: string }).name : 'N/A'}</span> },
        { key: 'isActive', label: 'Status', render: (f) => <span className={`badge text-xs ${f.isActive ? 'badge-success' : 'bg-[#E7E7E7] text-[#666666]'}`}>{f.isActive ? 'Active' : 'Inactive'}</span> },
      ]}
    />
  );
}
