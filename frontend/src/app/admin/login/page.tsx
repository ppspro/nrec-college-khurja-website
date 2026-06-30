'use client';
import { useState } from 'react';
import { Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function AdminLoginPage() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Invalid email or password';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: 'linear-gradient(135deg, #111111 0%, #1a0a10 60%, #0d0510 100%)' }}>
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-8"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(198,160,77,0.6) 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
        <div className="relative text-center">
          <div className="w-24 h-24 rounded-3xl bg-[#990A25] flex items-center justify-center text-white font-heading font-bold text-5xl mx-auto mb-8 shadow-2xl">
            N
          </div>
          <h1 className="font-heading text-white text-4xl font-bold mb-4">NREC College</h1>
          <p className="text-gray-400 text-lg mb-2">Admin Control Panel</p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#990A25] to-[#C6A04D] mx-auto my-6" />
          <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
            Manage all website content including notices, news, events, gallery, faculty, and more from this centralized panel.
          </p>
        </div>
        <div className="absolute bottom-8 text-center">
          <p className="text-gray-600 text-xs">Naththi Mal Ram Sahai Mal Edward Coronation PG College</p>
          <p className="text-gray-600 text-xs">Khurja, Uttar Pradesh — Est. 1901</p>
        </div>
      </div>

      {/* Right login form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[#990A25] flex items-center justify-center text-white font-heading font-bold text-3xl mx-auto mb-3 shadow-xl">N</div>
            <div className="font-heading text-white text-2xl font-bold">NREC Admin</div>
          </div>

          <div className="bg-white p-8 shadow-2xl" style={{ borderRadius: 'var(--radius-card)' }}>
            <div className="mb-8">
              <h2 className="font-heading font-bold text-[#111111] text-2xl mb-1">Welcome Back</h2>
              <p className="text-[#666666] text-sm">Sign in to access the admin panel</p>
            </div>

            {error && (
              <div className="flex items-center gap-2.5 p-3.5 bg-red-50 border border-red-200 rounded-xl mb-5 text-red-700 text-sm">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="form-label" htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="admin@nreccollege.ac.in"
                  className="form-input"
                  required
                  autoComplete="email"
                />
              </div>
              <div>
                <label className="form-label" htmlFor="password">Password</label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="Enter your password"
                    className="form-input pr-10"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666666] hover:text-[#990A25] transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full justify-center py-3.5 text-base"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <><LogIn size={18} />Sign In</>
                )}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-[#E7E7E7] text-center">
              <p className="text-xs text-[#666666]">
                Default: admin@nreccollege.ac.in / admin@123
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
