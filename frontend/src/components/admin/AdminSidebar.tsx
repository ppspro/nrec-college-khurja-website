'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Building2, Users, BookOpen,
  Bell, Newspaper, Calendar, FileText, Download, Image, Phone, Settings,
  LogOut, Menu, X, ChevronRight, Sliders
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const navItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Hero Slider', href: '/admin/sliders', icon: Sliders },
  { label: 'Departments', href: '/admin/departments', icon: Building2 },
  { label: 'Courses', href: '/admin/courses', icon: BookOpen },
  { label: 'Faculty', href: '/admin/faculty', icon: Users },
  { label: 'Notices', href: '/admin/notices', icon: Bell },
  { label: 'News', href: '/admin/news', icon: Newspaper },
  { label: 'Events', href: '/admin/events', icon: Calendar },
  { label: 'Curriculum', href: '/admin/curriculum', icon: FileText },
  { label: 'Downloads', href: '/admin/downloads', icon: Download },
  { label: 'Gallery', href: '/admin/gallery', icon: Image },
  { label: 'Enquiries', href: '/admin/contact', icon: Phone },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
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
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Desktop sidebar */}
      <aside className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="px-6 py-6 flex justify-between items-center relative">
            <div className="absolute bottom-0 left-6 right-6 h-px bg-white/10" />
            <Link href="/admin/dashboard" className="flex items-center gap-4" onClick={onClose}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#990A25] to-[#7A081E] flex items-center justify-center text-white font-bold font-heading shadow-md border border-white/10">N</div>
              <div>
                <div className="text-white font-bold text-[15px] tracking-wide">NREC Admin</div>
                <div className="text-gray-400 text-xs font-medium uppercase tracking-widest mt-0.5">Workspace</div>
              </div>
            </Link>
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            {navItems.map(({ label, href, icon: Icon }) => {
              const active = pathname === href || pathname.startsWith(href + '/');
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-1 text-[14px] font-medium transition-all ${
                    active
                      ? 'bg-white/10 text-white shadow-sm border border-white/5 backdrop-blur-sm'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon size={18} className={active ? "text-[#C6A04D]" : ""} />
                  <span>{label}</span>
                  {active && <ChevronRight size={14} className="ml-auto text-[#C6A04D]" />}
                </Link>
              );
            })}
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
                  <div className="text-gray-400 text-xs truncate">{admin.email}</div>
                </div>
              </div>
            )}
            <button
              onClick={logout}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:bg-white/8 hover:text-white transition-all"
            >
              <LogOut size={15} />
              Logout
            </button>
            <Link
              href="/"
              target="_blank"
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-gray-500 hover:text-gray-300 transition-colors mt-1"
            >
              View Website →
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
