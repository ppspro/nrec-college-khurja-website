'use client';
import AdminListPage from '@/components/admin/AdminListPage';
import { Download } from '@/types';
export default function AdminDownloadsPage() {
  return (
    <AdminListPage<Download> helpSection="downloads"
      title="Downloads"
      subtitle="Manage downloadable files and documents"
      apiEndpoint="/downloads"
      dataKey="downloads"
      newHref="/admin/downloads/new"
      editHref={(d) => `/admin/downloads/edit?id=${d._id}`}
      searchPlaceholder="Search downloads..."
      columns={[
        { key: 'title', label: 'Title', render: (d) => <span className="font-medium">{d.title}</span> },
        { key: 'category', label: 'Category', render: (d) => <span className="badge text-xs">{d.category}</span> },
        { key: 'fileType', label: 'Type', render: (d) => <span className="text-[#666666] text-xs uppercase">{d.fileType}</span> },
        { key: 'fileSize', label: 'Size', render: (d) => <span className="text-[#666666] text-xs">{d.fileSize}</span> },
        { key: 'isActive', label: 'Status', render: (d) => <span className={`badge text-xs ${d.isActive ? 'badge-success' : 'bg-[#E7E7E7] text-[#666666]'}`}>{d.isActive ? 'Active' : 'Hidden'}</span> },
      ]}
    />
  );
}

