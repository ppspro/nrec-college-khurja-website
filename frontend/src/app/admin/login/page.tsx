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
    <div className="min-h-screen flex" style={{ background: 'linear-gradient(135deg, #0A0A0A 0%, #17070B 60%, #0F0813 100%)' }}>
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center p-12 relative overflow-hidden border-r border-white/5">
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(184,134,11,0.6) 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
        <div className="relative text-center">
          <div className="mx-auto mb-8 flex justify-center">
            <img src="/images/logo.png" alt="NREC College Logo" className="h-24 w-auto drop-shadow-xl" />
          </div>
          <h1 className="font-heading text-white text-4xl font-bold mb-4 tracking-tight">NREC College</h1>
          <p className="text-gray-400 text-lg mb-2">Admin Control Panel</p>
          <div className="w-16 h-[2px] bg-gradient-to-r from-[#8B0E2A] to-[#B8860B] mx-auto my-6 rounded-full" />
          <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
            Manage all website content including notices, news, events, gallery, faculty, and more from this centralized panel.
          </p>
        </div>
        <div className="absolute bottom-8 text-center">
          <p className="text-gray-600 text-xs tracking-wide">Naththi Mal Ram Sahai Mal Edward Coronation PG College</p>
          <p className="text-gray-600 text-xs mt-1">Khurja, Uttar Pradesh — Est. 1901</p>
        </div>
      </div>

      {/* Right login form */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,14,42,0.03)_0%,transparent_70%)] pointer-events-none" />
        <div className="w-full max-w-md relative z-10">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="mx-auto mb-3 flex justify-center">
              <img src="/images/logo.png" alt="NREC College Logo" className="h-16 w-auto drop-shadow-lg" />
            </div>
            <div className="font-heading text-white text-2xl font-bold tracking-tight">NREC Admin</div>
            <p className="text-gray-400 text-xs mt-1">Admin Control Panel</p>
          </div>

          <div className="glass-dark p-10 md:p-12 shadow-2xl relative overflow-hidden border border-white/10" style={{ borderRadius: 'var(--radius-card)' }}>
            {/* Soft background glows inside the card */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#8B0E2A]/10 blur-3xl rounded-full pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#B8860B]/5 blur-3xl rounded-full pointer-events-none" />

            <div className="mb-10 relative z-10 text-center">
              <h2 className="font-heading font-bold text-white text-3xl mb-3 tracking-tight">Welcome Back</h2>
              <p className="text-gray-400 text-[15px]">Sign in to access the admin panel</p>
            </div>

            {error && (
              <div className="flex items-center gap-2.5 p-4 bg-red-950/40 border border-red-900/50 rounded-xl mb-8 text-red-400 text-[15px] relative z-10">
                <AlertCircle size={18} className="flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div>
                <label className="block text-[13px] font-bold text-gray-300 uppercase tracking-widest mb-3" htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="admin@nreccollege.ac.in"
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 text-white rounded-xl focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#8B0E2A]/30 focus:border-[#8B0E2A] placeholder:text-gray-500 transition-all text-[15px]"
                  required
                  autoComplete="email"
                />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-gray-300 uppercase tracking-widest mb-3" htmlFor="password">Password</label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="Enter your password"
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 text-white rounded-xl focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#8B0E2A]/30 focus:border-[#8B0E2A] placeholder:text-gray-500 transition-all pr-12 text-[15px]"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full justify-center py-4 text-[15px] font-bold tracking-wider uppercase mt-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <><LogIn size={18} />Sign In</>
                )}
              </button>
            </form>

            <div className="mt-10 pt-8 border-t border-white/10 text-center relative z-10">
              <p className="text-[13px] text-gray-500">
                Default: <span className="text-gray-400 font-medium">admin@nreccollege.ac.in</span> / <span className="text-gray-400 font-medium">admin@123</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
