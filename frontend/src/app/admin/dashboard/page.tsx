'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Bell, Newspaper, Calendar, Users, BookOpen, Building2, Download, Image, ArrowRight, TrendingUp, Server, Database, HardDrive, ShieldCheck } from 'lucide-react';
import api from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import Card from '@/components/ui/Card';
import AdminPageHeader from '@/components/admin/AdminPageHeader';

interface Stats { notices: number; news: number; events: number; faculty: number; courses: number; departments: number; downloads: number; gallery: number; }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface ActivityItem { _id: string; title: string; type: 'notice' | 'news' | 'event'; date: string; link: string; }

export default function AdminDashboard() {
  const { admin } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const [notices, news, events, faculty, courses, depts, downloads, gallery] = await Promise.allSettled([
          api.get('/notices'),
          api.get('/news?limit=5'),
          api.get('/events?limit=5'),
          api.get('/faculty'),
          api.get('/courses'),
          api.get('/departments'),
          api.get('/downloads'),
          api.get('/gallery'),
        ]);

        setStats({
          notices: notices.status === 'fulfilled' ? notices.value.data.pagination?.total || notices.value.data.notices?.length || 0 : 0,
          news: news.status === 'fulfilled' ? news.value.data.pagination?.total || 0 : 0,
          events: events.status === 'fulfilled' ? events.value.data.pagination?.total || 0 : 0,
          faculty: faculty.status === 'fulfilled' ? faculty.value.data.pagination?.total || faculty.value.data.faculty?.length || 0 : 0,
          courses: courses.status === 'fulfilled' ? courses.value.data.courses?.length || 0 : 0,
          departments: depts.status === 'fulfilled' ? depts.value.data.departments?.length || 0 : 0,
          downloads: downloads.status === 'fulfilled' ? downloads.value.data.downloads?.length || 0 : 0,
          gallery: gallery.status === 'fulfilled' ? gallery.value.data.albums?.length || 0 : 0,
        });

        // Assemble recent activities
        const list: ActivityItem[] = [];
        if (notices.status === 'fulfilled') {
          (notices.value.data.notices || []).slice(0, 3).forEach((n: { _id: string; title: string; publishDate: string; }) => {
            list.push({ _id: n._id, title: n.title, type: 'notice', date: n.publishDate, link: `/admin/notices/edit?id=${n._id}` });
          });
        }
        if (news.status === 'fulfilled') {
          (news.value.data.news || []).slice(0, 3).forEach((n: { _id: string; title: string; publishDate: string; }) => {
            list.push({ _id: n._id, title: n.title, type: 'news', date: n.publishDate, link: `/admin/news/edit?id=${n._id}` });
          });
        }
        if (events.status === 'fulfilled') {
          (events.value.data.events || []).slice(0, 3).forEach((e: { _id: string; title: string; startDate: string; }) => {
            list.push({ _id: e._id, title: e.title, type: 'event', date: e.startDate, link: `/admin/events/edit?id=${e._id}` });
          });
        }

        // Sort descending by date
        list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setActivities(list.slice(0, 5));
      } catch {}
      finally { setLoading(false); }
    };
    fetch();
  }, []);

  const statCards = [
    { label: 'Notices', value: stats?.notices, icon: Bell, href: '/admin/notices', color: '#990A25', bg: 'rgba(153,10,37,0.08)' },
    { label: 'News Articles', value: stats?.news, icon: Newspaper, href: '/admin/news', color: '#2563EB', bg: 'rgba(37,99,235,0.08)' },
    { label: 'Events', value: stats?.events, icon: Calendar, href: '/admin/events', color: '#059669', bg: 'rgba(5,150,105,0.08)' },
    { label: 'Faculty', value: stats?.faculty, icon: Users, href: '/admin/faculty', color: '#7C3AED', bg: 'rgba(124,58,237,0.08)' },
    { label: 'Courses', value: stats?.courses, icon: BookOpen, href: '/admin/courses', color: '#C6A04D', bg: 'rgba(198,160,77,0.10)' },
    { label: 'Departments', value: stats?.departments, icon: Building2, href: '/admin/departments', color: '#0891B2', bg: 'rgba(8,145,178,0.08)' },
    { label: 'Downloads', value: stats?.downloads, icon: Download, href: '/admin/downloads', color: '#D97706', bg: 'rgba(217,119,6,0.08)' },
    { label: 'Gallery Albums', value: stats?.gallery, icon: Image, href: '/admin/gallery', color: '#DC2626', bg: 'rgba(220,38,38,0.08)' },
  ];

  const quickActions = [
    { label: 'Post Notice', href: '/admin/notices/new', icon: Bell },
    { label: 'Add News', href: '/admin/news/new', icon: Newspaper },
    { label: 'Create Event', href: '/admin/events/new', icon: Calendar },
    { label: 'Add Faculty', href: '/admin/faculty/new', icon: Users },
    { label: 'Add Course', href: '/admin/courses/new', icon: BookOpen },
    { label: 'Upload File', href: '/admin/downloads/new', icon: Download },
  ];

  return (
    <div>
      {/* Header */}
      <AdminPageHeader 
        title="Dashboard" 
        description={`Welcome back, ${admin?.name || 'Admin'}. Here's what's happening at NREC College.`}
        helpSection="dashboard"
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {statCards.map(({ label, value, icon: Icon, href, color, bg }) => (
          <Link key={label} href={href} className="admin-card group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: bg }}>
                <Icon size={18} style={{ color }} />
              </div>
              <ArrowRight size={14} className="text-[#999] group-hover:text-[#990A25] transition-colors mt-1" />
            </div>
            <div className="font-heading font-bold text-[#111111] text-2xl mb-1">
              {loading ? <div className="skeleton h-7 w-12 rounded" /> : (value ?? 0)}
            </div>
            <div className="text-xs text-[#666666]">{label}</div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2 admin-card h-full">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp size={16} className="text-[#990A25]" />
            <h2 className="font-heading font-bold text-[#111111] text-base">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {quickActions.map(({ label, href, icon: Icon }) => (
              <Link key={label} href={href} className="flex flex-col items-center gap-2.5 p-4 rounded-xl border border-[#E7E7E7] hover:border-[#990A25] hover:bg-[#FAFAFA] transition-all group text-center">
                <Icon size={20} className="text-[#666666] group-hover:text-[#990A25] transition-colors" />
                <span className="text-xs font-medium text-[#2E2E2E] group-hover:text-[#990A25] transition-colors">{label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="admin-card flex flex-col h-full">
          <h2 className="font-heading font-bold text-[#111111] text-base mb-4 border-b border-[#E7E7E7] pb-2">Recent Activities</h2>
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => <div key={i} className="skeleton h-10 rounded-lg" />)}
            </div>
          ) : activities.length === 0 ? (
            <div className="text-xs text-[#999] py-8 text-center">No recent activity logs.</div>
          ) : (
            <div className="space-y-3 flex-1 overflow-y-auto">
              {activities.map((item) => (
                <Link key={item._id} href={item.link} className="block p-3 rounded-lg border border-[#F0F0F0] hover:border-[#990A25] hover:bg-[#FAFAFA] transition-all">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="badge text-[10px] uppercase font-bold tracking-wider">
                      {item.type}
                    </span>
                    <span className="text-[10px] text-[#999]">
                      {new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-[#2E2E2E] line-clamp-1">{item.title}</div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* System Information */}
      <div className="admin-card mb-8">
        <div className="flex items-center gap-2 mb-5">
          <Server size={16} className="text-[#990A25]" />
          <h2 className="font-heading font-bold text-[#111111] text-base">System Information</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
            <ShieldCheck size={20} className="text-green-600" />
            <div>
              <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">App Version</div>
              <div className="text-sm font-bold text-gray-900">v1.0.0 (Production)</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
            <Server size={20} className="text-blue-600" />
            <div>
              <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Build Date</div>
              <div className="text-sm font-bold text-gray-900">July 2026</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
            <Database size={20} className="text-purple-600" />
            <div>
              <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Database Status</div>
              <div className="text-sm font-bold text-gray-900 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Online
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
            <HardDrive size={20} className="text-orange-600" />
            <div>
              <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Last Backup</div>
              <div className="text-sm font-bold text-gray-900">Automated Daily</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer note */}
      <div className="text-center text-xs text-[#999]">
        NREC College Admin Control Center — Updates are reflected on the website immediately.
      </div>
    </div>
  );
}
