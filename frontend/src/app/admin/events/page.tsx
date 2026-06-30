'use client';
import AdminListPage from '@/components/admin/AdminListPage';
import { Event } from '@/types';
export default function AdminEventsPage() {
  return (
    <AdminListPage<Event>
      title="Events"
      subtitle="Manage college events, seminars, and activities"
      apiEndpoint="/events"
      dataKey="events"
      newHref="/admin/events/new"
      editHref={(e) => `/admin/events/${e._id}/edit`}
      searchPlaceholder="Search events..."
      columns={[
        { key: 'title', label: 'Title', render: (e) => <span className="font-medium line-clamp-2 max-w-xs">{e.title}</span> },
        { key: 'category', label: 'Category', render: (e) => <span className="badge text-xs">{e.category}</span> },
        { key: 'venue', label: 'Venue', render: (e) => <span className="text-[#666666] text-xs">{e.venue}</span> },
        { key: 'startDate', label: 'Date', render: (e) => new Date(e.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) },
        { key: 'isPublished', label: 'Status', render: (e) => <span className={`badge text-xs ${e.isPublished ? 'badge-success' : 'bg-[#E7E7E7] text-[#666666]'}`}>{e.isPublished ? 'Published' : 'Draft'}</span> },
      ]}
    />
  );
}
