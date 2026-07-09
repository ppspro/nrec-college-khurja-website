'use client';
import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import api from '@/lib/api';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ToastContainer from '@/components/ui/ToastContainer';
import AdminPageHeader from '@/components/admin/AdminPageHeader';

const DEFAULT = {
  collegeName: 'NREC College Khurja',
  shortName: 'NREC',
  address: 'NREC College, Khurja, Bulandshahr, Uttar Pradesh - 203131',
  phone: '+91-5738-200001',
  email: 'info@nreccollege.ac.in',
  website: 'https://nreccollege.ac.in',
  footerDescription: 'Naththi Mal Ram Sahai Mal Edward Coronation Post Graduate College, Khurja (Bulandshahr) is one of the premier post-graduate institutions of Uttar Pradesh.',
  copyright: '© 2026 NREC College Khurja. All Rights Reserved.',
  facebook: '',
  instagram: '',
  x: '',
  linkedin: '',
  youtube: '',
  metaTitle: 'NREC College Khurja | Excellence in Education Since 1901',
  metaDescription: 'NREC College, Khurja - A premier institution of higher education in Uttar Pradesh, India. Established in 1901.',
  metaKeywords: 'NREC College, Khurja College, UP PG College, higher education Khurja, Bulandshahr',
};

export default function SettingsPage() {
  const [form, setForm] = useState(DEFAULT);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [toasts, setToasts] = useState<any[]>([]);

  const addToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToasts((prev) => {
      const idStr = Math.random().toString(36).substring(2, 9);
      setTimeout(() => removeToast(idStr), 4000);
      return [...prev, { id: idStr, message, type }];
    });
  };

  const removeToast = (idStr: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== idStr));
  };

  useEffect(() => {
    api.get('/settings')
      .then((res) => {
        if (res.data.settings) {
          const s = res.data.settings;
          setForm({
            collegeName: s.collegeName || DEFAULT.collegeName,
            shortName: s.shortName || DEFAULT.shortName,
            address: s.address || DEFAULT.address,
            phone: s.phone || DEFAULT.phone,
            email: s.email || DEFAULT.email,
            website: s.website || DEFAULT.website,
            footerDescription: s.footerDescription || DEFAULT.footerDescription,
            copyright: s.copyright || DEFAULT.copyright,
            facebook: s.socialLinks?.facebook || '',
            instagram: s.socialLinks?.instagram || '',
            x: s.socialLinks?.x || '',
            linkedin: s.socialLinks?.linkedin || '',
            youtube: s.socialLinks?.youtube || '',
            metaTitle: s.metaTitle || DEFAULT.metaTitle,
            metaDescription: s.metaDescription || DEFAULT.metaDescription,
            metaKeywords: s.metaKeywords || DEFAULT.metaKeywords,
          });
        }
      })
      .catch(() => addToast('Failed to load settings', 'error'))
      .finally(() => setFetching(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        socialLinks: {
          facebook: form.facebook,
          instagram: form.instagram,
          x: form.x,
          linkedin: form.linkedin,
          youtube: form.youtube,
        },
      };
      await api.put('/settings', payload);
      addToast('Settings updated successfully!', 'success');
    } catch {
      addToast('Failed to update settings', 'error');
    } finally {
      setLoading(false);
    }
  };

  const update = (key: string, value: unknown) => setForm((f) => ({ ...f, [key]: value }));

  if (fetching) {
    return <div className="space-y-4">{Array.from({ length: 6 }).map((_, i) => <div key={i} className="skeleton h-12 rounded-xl" />)}</div>;
  }

  return (
    <div className="max-w-4xl">
      <ToastContainer toasts={toasts} onClose={removeToast} />

      <AdminPageHeader 
        title="Website Settings" 
        description="Configure global branding, details, social links, and SEO tags."
        helpSection="settings"
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card hoverEffect={false} className="p-6 bg-white space-y-4">
          <h2 className="font-heading font-bold text-lg text-[#111111] border-b border-[#E7E7E7] pb-2">General Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">College Name</label>
              <input value={form.collegeName} onChange={(e) => update('collegeName', e.target.value)} className="form-input" />
            </div>
            <div>
              <label className="form-label">Short Name / Code</label>
              <input value={form.shortName} onChange={(e) => update('shortName', e.target.value)} className="form-input" />
            </div>
          </div>
          <div>
            <label className="form-label">Contact Address</label>
            <input value={form.address} onChange={(e) => update('address', e.target.value)} className="form-input" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="form-label">Phone Number</label>
              <input value={form.phone} onChange={(e) => update('phone', e.target.value)} className="form-input" />
            </div>
            <div>
              <label className="form-label">Email Address</label>
              <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className="form-input" />
            </div>
            <div>
              <label className="form-label">Website URL</label>
              <input value={form.website} onChange={(e) => update('website', e.target.value)} className="form-input" />
            </div>
          </div>
        </Card>

        <Card hoverEffect={false} className="p-6 bg-white space-y-4">
          <h2 className="font-heading font-bold text-lg text-[#111111] border-b border-[#E7E7E7] pb-2">Branding & Footer</h2>
          <div>
            <label className="form-label">Footer Description</label>
            <textarea value={form.footerDescription} onChange={(e) => update('footerDescription', e.target.value)} className="form-input h-20 resize-none" />
          </div>
          <div>
            <label className="form-label">Copyright Text</label>
            <input value={form.copyright} onChange={(e) => update('copyright', e.target.value)} className="form-input" />
          </div>
        </Card>

        <Card hoverEffect={false} className="p-6 bg-white space-y-4">
          <h2 className="font-heading font-bold text-lg text-[#111111] border-b border-[#E7E7E7] pb-2">Social Profiles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Facebook URL</label>
              <input value={form.facebook} onChange={(e) => update('facebook', e.target.value)} className="form-input" placeholder="https://facebook.com/..." />
            </div>
            <div>
              <label className="form-label">Instagram URL</label>
              <input value={form.instagram} onChange={(e) => update('instagram', e.target.value)} className="form-input" placeholder="https://instagram.com/..." />
            </div>
            <div>
              <label className="form-label">X (Twitter) URL</label>
              <input value={form.x} onChange={(e) => update('x', e.target.value)} className="form-input" placeholder="https://x.com/..." />
            </div>
            <div>
              <label className="form-label">LinkedIn URL</label>
              <input value={form.linkedin} onChange={(e) => update('linkedin', e.target.value)} className="form-input" placeholder="https://linkedin.com/..." />
            </div>
          </div>
          <div>
            <label className="form-label">YouTube Channel URL</label>
            <input value={form.youtube} onChange={(e) => update('youtube', e.target.value)} className="form-input" placeholder="https://youtube.com/..." />
          </div>
        </Card>

        <Card hoverEffect={false} className="p-6 bg-white space-y-4">
          <h2 className="font-heading font-bold text-lg text-[#111111] border-b border-[#E7E7E7] pb-2">Search Engine Optimization (SEO)</h2>
          <div>
            <label className="form-label">Meta Title</label>
            <input value={form.metaTitle} onChange={(e) => update('metaTitle', e.target.value)} className="form-input" />
          </div>
          <div>
            <label className="form-label">Meta Description</label>
            <textarea value={form.metaDescription} onChange={(e) => update('metaDescription', e.target.value)} className="form-input h-20 resize-none" />
          </div>
          <div>
            <label className="form-label">Meta Keywords</label>
            <input value={form.metaKeywords} onChange={(e) => update('metaKeywords', e.target.value)} className="form-input" placeholder="comma-separated words" />
          </div>
        </Card>

        <div className="flex gap-3">
          <Button type="submit" variant="primary" loading={loading} className="gap-2">
            {!loading && <Save size={15} />}
            Save Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
