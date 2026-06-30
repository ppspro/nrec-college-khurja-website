'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import api from '@/lib/api';
import { Admin } from '@/types';

interface AuthContextType {
  admin: Admin | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(() => {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('nrec_admin_token');
    }
    return false;
  });
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('nrec_admin_token') : null;
    if (token) {
      api.get('/auth/profile')
        .then((res) => setAdmin(res.data.admin))
        .catch(() => {
          if (typeof window !== 'undefined') {
            localStorage.removeItem('nrec_admin_token');
          }
          setAdmin(null);
        })
        .finally(() => setLoading(false));
    }
  }, []);

  useEffect(() => {
    if (!loading && !admin && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [admin, loading, pathname, router]);

  const login = async (email: string, password: string) => {
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('nrec_admin_token', res.data.token);
    setAdmin(res.data.admin);
    router.push('/admin/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('nrec_admin_token');
    setAdmin(null);
    router.push('/admin/login');
  };

  return <AuthContext.Provider value={{ admin, loading, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
