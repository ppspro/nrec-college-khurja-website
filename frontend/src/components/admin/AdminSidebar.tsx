'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Bell, Newspaper, Calendar, FileText, Download, Image, Phone, Settings,
  LogOut, ChevronRight, LayoutTemplate, GraduationCap, Briefcase, HelpCircle,
  LayoutDashboard, Building2, BookOpen, Users, Globe, ImageIcon, MessageSquare,
  UserCircle, X
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface NavGroup {
  groupName?: string;
  emoji?: string;
  items: { label: string; href: string; icon: any }[];
}

const navGroups: NavGroup[] = [
  {
    items: [
      { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    ]
  },
  {
    groupName: 'Website',
    emoji: '🌐',
    items: [
      { label: 'Homepage', href: '/admin/homepage', icon: LayoutTemplate },
      { label: 'Website Pages', href: '/admin/pages', icon: FileText },
      { label: 'Website Menu', href: '/admin/menus', icon: Globe },
      { label: 'Banners', href: '/admin/sliders', icon: ImageIcon },
    ]
  },
  {
    groupName: 'Academics',
    emoji: '🎓',
    items: [
      { label: 'Departments', href: '/admin/departments', icon: Building2 },
      { label: 'Courses', href: '/admin/courses', icon: BookOpen },
      { label: 'Faculty', href: '/admin/faculty', icon: Users },
      { label: 'Curriculum', href: '/admin/curriculum', icon: FileText },
    ]
  },
  {
    groupName: 'Campus Updates',
    emoji: '📰',
    items: [
      { label: 'News', href: '/admin/news', icon: Newspaper },
      { label: 'Notice Board', href: '/admin/notices', icon: Bell },
      { label: 'Events', href: '/admin/events', icon: Calendar },
    ]
  },
  {
    groupName: 'Campus Life',
    emoji: '🖼',
    items: [
      { label: 'Gallery', href: '/admin/gallery', icon: Image },
      { label: 'Downloads', href: '/admin/downloads', icon: Download },
      { label: 'Media Library', href: '/admin/media', icon: ImageIcon },
    ]
  },
  {
    groupName: 'Enquiries',
    emoji: '📞',
    items: [
      { label: 'Contact Messages', href: '/admin/contact', icon: MessageSquare },
    ]
  },
  {
    groupName: 'Settings & Help',
    emoji: '⚙️',
    items: [
      { label: 'Website Settings', href: '/admin/settings', icon: Settings },
      { label: 'Help Center', href: '/admin/help', icon: HelpCircle },
    ]
  }
];

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const { admin, logout } = useAuth();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden cursor-pointer"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="px-6 py-6 flex justify-between items-center relative">
            <div className="absolute bottom-0 left-6 right-6 h-px bg-white/10" />
            <Link href="/admin/dashboard" className="flex items-center gap-4" onClick={onClose}>
              <img 
                src="/images/logo.png" 
                alt="NREC College Logo" 
                className="w-10 h-10 object-contain bg-white rounded-lg p-0.5 shadow-md border border-white/10"
              />
              <div>
                <div className="text-white font-bold text-[15px] tracking-wide">NREC Admin</div>
                <div className="text-gray-400 text-xs font-medium uppercase tracking-widest mt-0.5">Control Panel</div>
              </div>
            </Link>
            
            {/* Close button for mobile screen widths */}
            <button 
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Close Menu"
            >
              <X size={18} />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
            {navGroups.map((group, groupIdx) => (
              <div key={groupIdx} className="mb-2">
                {group.groupName && (
                  <h3 className="px-4 text-[10.5px] font-bold text-white/80 uppercase tracking-widest mb-2.5 flex items-center gap-1.5">
                    {group.emoji && <span className="text-xs">{group.emoji}</span>}
                    {group.groupName}
                  </h3>
                )}
                <div className="space-y-0.5">
                  {group.items.map(({ label, href, icon: Icon }) => {
                    const active = pathname === href || pathname.startsWith(href + '/');
                    return (
                      <Link
                        key={href}
                        href={href}
                        onClick={onClose}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13.5px] font-medium transition-all ${
                          active
                            ? 'bg-white/10 text-white shadow-sm border border-white/5 backdrop-blur-sm admin-link-active'
                            : 'text-white/95 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <Icon size={17} className={active ? "text-[#C6A04D]" : "text-white/90"} />
                        <span>{label}</span>
                        {active && <ChevronRight size={14} className="ml-auto text-[#C6A04D]" />}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div className="border-t border-white/10 p-4">
            {admin && (
              <div className="flex items-center gap-3 mb-3 px-2">
                <div className="w-8 h-8 rounded-full bg-[#990A25] flex items-center justify-center text-white text-sm font-bold">
                  {admin.name?.[0] || 'A'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-xs font-medium truncate">{admin.name}</div>
                  <div className="text-white/70 text-xs truncate">{admin.email}</div>
                </div>
              </div>
            )}
            <button
              onClick={logout}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-white hover:bg-white/10 transition-all"
            >
              <LogOut size={15} />
              Logout
            </button>
            <Link
              href="/"
              target="_blank"
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-white/80 hover:text-white transition-colors mt-1"
            >
              <Globe size={13} />
              View Website →
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
