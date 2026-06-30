'use client';
import AdminListPage from '@/components/admin/AdminListPage';
import { Notice } from '@/types';
import { Pin } from 'lucide-react';

export default function AdminNoticesPage() {
  return (
    <AdminListPage<Notice>
      title="Notice Board"
      subtitle="Manage notices, announcements, and circulars"
      apiEndpoint="/notices"
      dataKey="notices"
      newHref="/admin/notices/new"
      editHref={(n) => `/admin/notices/${n._id}/edit`}
      searchPlaceholder="Search notices..."
      columns={[
        {
          key: 'title',
          label: 'Title',
          render: (n) => (
            <div className="flex items-center gap-2 max-w-xs">
              {n.isPinned && <Pin size={13} className="text-[#990A25] flex-shrink-0" />}
              <span className="line-clamp-2 font-medium">{n.title}</span>
            </div>
          ),
        },
        {
          key: 'category',
          label: 'Category',
          render: (n) => <span className="badge text-xs">{n.category}</span>,
        },
        {
          key: 'publishDate',
          label: 'Published',
          render: (n) => new Date(n.publishDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        },
        {
          key: 'isActive',
          label: 'Status',
          render: (n) => (
            <span className={`badge text-xs ${n.isActive ? 'badge-success' : 'bg-[#E7E7E7] text-[#666666]'}`}>
              {n.isActive ? 'Active' : 'Inactive'}
            </span>
          ),
        },
      ]}
    />
  );
}
