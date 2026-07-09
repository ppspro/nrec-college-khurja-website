'use client';
import AdminListPage from '@/components/admin/AdminListPage';
import { News } from '@/types';
export default function AdminNewsPage() {
  return (
    <AdminListPage<News> helpSection="news"
      title="News & Articles"
      subtitle="Manage college news and press releases"
      apiEndpoint="/news"
      dataKey="news"
      newHref="/admin/news/new"
      editHref={(n) => `/admin/news/edit?id=${n._id}`}
      searchPlaceholder="Search news..."
      columns={[
        { key: 'title', label: 'Title', render: (n) => <span className="font-medium line-clamp-2 max-w-xs">{n.title}</span> },
        { key: 'category', label: 'Category', render: (n) => <span className="badge text-xs">{n.category}</span> },
        { key: 'author', label: 'Author', render: (n) => <span className="text-[#666666]">{n.author}</span> },
        { key: 'publishDate', label: 'Published', render: (n) => new Date(n.publishDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) },
        { key: 'isPublished', label: 'Status', render: (n) => <span className={`badge text-xs ${n.isPublished ? 'badge-success' : 'bg-[#E7E7E7] text-[#666666]'}`}>{n.isPublished ? 'Published' : 'Draft'}</span> },
      ]}
    />
  );
}

