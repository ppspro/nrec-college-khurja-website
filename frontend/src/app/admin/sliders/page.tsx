'use client';
import AdminListPage from '@/components/admin/AdminListPage';
import { uploadsUrl } from '@/lib/api';
import SafeImage from '@/components/ui/SafeImage';

interface SliderItem {
  _id: string;
  title: string;
  subtitle: string;
  image: string;
  order: number;
  isActive: boolean;
}

export default function AdminSlidersPage() {
  return (
    <AdminListPage<SliderItem>
      helpSection="homepage"
      title="Homepage Banners"
      subtitle="Manage the hero banner slides appearing at the top of the college homepage"
      apiEndpoint="/settings/sliders"
      dataKey="sliders"
      newHref="/admin/sliders/new"
      editHref={(s) => `/admin/sliders/edit?id=${s._id}`}
      searchPlaceholder="Search banners..."
      columns={[
        {
          key: 'image',
          label: 'Banner Preview',
          render: (s) => (
            <div className="relative w-24 h-12 rounded-lg overflow-hidden border border-gray-200/50 bg-gray-50 flex-shrink-0">
              <SafeImage
                src={uploadsUrl(s.image)}
                alt={s.title}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>
          ),
        },
        {
          key: 'title',
          label: 'Banner Info',
          render: (s) => (
            <div className="max-w-xs">
              <div className="font-semibold text-gray-800 line-clamp-1">{s.title}</div>
              {s.subtitle && <div className="text-xs text-gray-400 truncate mt-0.5">{s.subtitle}</div>}
            </div>
          ),
        },
        {
          key: 'order',
          label: 'Display Order',
          render: (s) => <span className="font-mono text-sm text-gray-600 font-medium">#{s.order}</span>,
        },
        {
          key: 'isActive',
          label: 'Status',
          render: (s) => (
            <span className={`badge text-xs ${s.isActive ? 'badge-success' : 'bg-[#E7E7E7] text-[#666666]'}`}>
              {s.isActive ? 'Active' : 'Inactive'}
            </span>
          ),
        },
      ]}
    />
  );
}
