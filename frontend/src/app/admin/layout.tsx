'use client';
import { AuthProvider } from '@/hooks/useAuth';
import AdminSidebar from '@/components/admin/AdminSidebar';
import WelcomeTour from '@/components/admin/WelcomeTour';
import { usePathname } from 'next/navigation';
import { Menu, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === '/admin/login';
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const theme = localStorage.getItem('theme') || 'light';
      if (theme === 'dark') {
        setIsDark(true);
        document.documentElement.classList.add('dark');
      } else {
        setIsDark(false);
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  if (isLogin) return <>{children}</>;

  return (
    <div className="flex min-h-screen">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="admin-main flex-1 flex flex-col">
        {/* Header Bar */}
        <header className="bg-white dark:bg-[#1e293b] border-b border-gray-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between sticky top-0 z-40 transition-colors shadow-sm">
          <div className="flex items-center gap-4">
            <h2 className="font-heading font-bold text-gray-800 dark:text-slate-100 hidden lg:block text-lg">NREC Admin Control Panel</h2>
            <h2 className="font-heading font-bold text-gray-800 dark:text-slate-100 lg:hidden text-base">NREC Admin</h2>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-gray-500 hover:text-gray-900 dark:text-slate-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 transition-all border border-gray-200 dark:border-slate-700 cursor-pointer"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun size={18} className="text-amber-500" /> : <Moon size={18} />}
            </button>
            
            {/* Mobile Sidebar Trigger */}
            <button 
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 lg:hidden transition-colors cursor-pointer"
            >
              <Menu size={18} />
            </button>
          </div>
        </header>

        <div className="flex-1 p-6 md:p-8">
            {children}
        </div>
      </div>
      
      {/* First Login Tour */}
      <WelcomeTour />
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AuthProvider>
  );
}
