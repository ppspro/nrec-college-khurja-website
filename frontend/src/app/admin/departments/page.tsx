'use client';
import AdminListPage from '@/components/admin/AdminListPage';
import { Department } from '@/types';
export default function AdminDepartmentsPage() {
  return (
    <AdminListPage<Department>
      title="Departments"
      subtitle="Manage academic departments and faculties"
      apiEndpoint="/departments"
      dataKey="departments"
      newHref="/admin/departments/new"
      editHref={(d) => `/admin/departments/${d._id}/edit`}
      searchPlaceholder="Search departments..."
      columns={[
        { key: 'name', label: 'Name', render: (d) => <span className="font-semibold">{d.name}</span> },
        { key: 'shortName', label: 'Short Name', render: (d) => <span className="badge text-xs">{d.shortName}</span> },
        { key: 'headOfDepartment', label: 'HoD', render: (d) => <span className="text-[#666666]">{d.headOfDepartment || '—'}</span> },
        { key: 'establishedYear', label: 'Est.', render: (d) => <span className="text-[#666666]">{d.establishedYear || '—'}</span> },
        { key: 'isActive', label: 'Status', render: (d) => <span className={`badge text-xs ${d.isActive ? 'badge-success' : 'bg-[#E7E7E7] text-[#666666]'}`}>{d.isActive ? 'Active' : 'Inactive'}</span> },
      ]}
    />
  );
}
