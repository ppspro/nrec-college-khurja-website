'use client';
import { useState, useEffect } from 'react';
import { Save, Plus, Trash2, MapPin, Mail, Phone, Clock, Globe } from 'lucide-react';
import api from '@/lib/api';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ToastContainer from '@/components/ui/ToastContainer';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import AdminPageHeader from '@/components/admin/AdminPageHeader';

interface SocialLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  youtube?: string;
  linkedin?: string;
}

interface ContactState {
  address: string;
  phones: string[];
  emails: string[];
  googleMapEmbed: string;
  googleMapLink: string;
  officeHours: string;
  socialLinks: SocialLinks;
}

const DEFAULT: ContactState = {
  address: '',
  phones: [''],
  emails: [''],
  googleMapEmbed: '',
  googleMapLink: '',
  officeHours: 'Monday - Saturday: 9:00 AM - 5:00 PM',
  socialLinks: {
    facebook: '',
    twitter: '',
    instagram: '',
    youtube: '',
    linkedin: '',
  }
};

export default function ContactSettingsPage() {
  const [form, setForm] = useState<ContactState>(DEFAULT);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [toasts, setToasts] = useState<any[]>([]);

  const addToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToasts((prev) => {
      const id = Math.random().toString(36).substring(2, 9);
      setTimeout(() => removeToast(id), 4000);
      return [...prev, { id, message, type }];
    });
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  useEffect(() => {
    api.get('/contact')
      .then((res) => {
        if (res.data.contact) {
          const c = res.data.contact;
          setForm({
            address: c.address || '',
            phones: c.phones && c.phones.length > 0 ? c.phones : [''],
            emails: c.emails && c.emails.length > 0 ? c.emails : [''],
            googleMapEmbed: c.googleMapEmbed || '',
            googleMapLink: c.googleMapLink || '',
            officeHours: c.officeHours || 'Monday - Saturday: 9:00 AM - 5:00 PM',
            socialLinks: {
              facebook: c.socialLinks?.facebook || '',
              twitter: c.socialLinks?.twitter || '',
              instagram: c.socialLinks?.instagram || '',
              youtube: c.socialLinks?.youtube || '',
              linkedin: c.socialLinks?.linkedin || '',
            }
          });
        }
      })
      .catch(() => addToast('Failed to load contact settings', 'error'))
      .finally(() => setFetching(false));
  }, []);

  const handleArrayChange = (index: number, value: string, field: 'phones' | 'emails') => {
    setForm((prev) => {
      const arr = [...prev[field]];
      arr[index] = value;
      return { ...prev, [field]: arr };
    });
  };

  const addArrayField = (field: 'phones' | 'emails') => {
    setForm((prev) => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayField = (index: number, field: 'phones' | 'emails') => {
    setForm((prev) => {
      const arr = [...prev[field]];
      if (arr.length > 1) {
        arr.splice(index, 1);
      } else {
        arr[0] = '';
      }
      return { ...prev, [field]: arr };
    });
  };

  const handleSocialChange = (key: keyof SocialLinks, value: string) => {
    setForm((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [key]: value
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Clean empty fields from phones and emails
      const cleanedPhones = form.phones.map(p => p.trim()).filter(Boolean);
      const cleanedEmails = form.emails.map(e => e.trim()).filter(Boolean);

      const payload = {
        ...form,
        phones: cleanedPhones.length > 0 ? cleanedPhones : [''],
        emails: cleanedEmails.length > 0 ? cleanedEmails : ['']
      };

      await api.put('/contact', payload);
      addToast('Contact settings updated successfully!', 'success');
    } catch {
      addToast('Failed to update contact settings', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <ToastContainer toasts={toasts} onClose={removeToast} />
      <AdminPageHeader 
        title="Contact Settings" 
        description="Manage contact coordinates, office hours, mapping embeds, and social channels shown on the website."
      />

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div className="md:col-span-2 space-y-6">
            <Card className="p-6 border border-gray-200/50 space-y-5">
              <h3 className="font-bold text-gray-800 flex items-center gap-2 border-b border-gray-100 pb-3">
                <MapPin size={18} className="text-[#990A25]" /> Physical Details
              </h3>

              <div className="space-y-1">
                <label className="form-label">College Address *</label>
                <textarea 
                  className="form-input min-h-[80px]" 
                  value={form.address}
                  onChange={(e) => setForm({...form, address: e.target.value})}
                  placeholder="e.g. NREC College, Khurja, Uttar Pradesh - 203131"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="form-label">Office Hours</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={form.officeHours}
                  onChange={(e) => setForm({...form, officeHours: e.target.value})}
                  placeholder="e.g. Monday - Saturday: 9:00 AM - 5:00 PM"
                />
              </div>

              <div className="space-y-1">
                <label className="form-label">Google Map Embed Code (Iframe HTML)</label>
                <textarea 
                  className="form-input min-h-[100px] text-xs font-mono" 
                  value={form.googleMapEmbed}
                  onChange={(e) => setForm({...form, googleMapEmbed: e.target.value})}
                  placeholder="Paste <iframe ...></iframe> from Google Maps"
                />
              </div>

              <div className="space-y-1">
                <label className="form-label">Google Map Link URL</label>
                <input 
                  type="url" 
                  className="form-input" 
                  value={form.googleMapLink}
                  onChange={(e) => setForm({...form, googleMapLink: e.target.value})}
                  placeholder="https://maps.google.com/?q=..."
                />
              </div>
            </Card>

            <Card className="p-6 border border-gray-200/50 space-y-5">
              <h3 className="font-bold text-gray-800 flex items-center gap-2 border-b border-gray-100 pb-3">
                <Globe size={18} className="text-[#B8860B]" /> Social Connections
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="form-label">Facebook Profile URL</label>
                  <input 
                    type="url" 
                    className="form-input" 
                    value={form.socialLinks.facebook}
                    onChange={(e) => handleSocialChange('facebook', e.target.value)}
                    placeholder="https://facebook.com/nrec"
                  />
                </div>
                <div className="space-y-1">
                  <label className="form-label">Instagram Link</label>
                  <input 
                    type="url" 
                    className="form-input" 
                    value={form.socialLinks.instagram}
                    onChange={(e) => handleSocialChange('instagram', e.target.value)}
                    placeholder="https://instagram.com/nrec"
                  />
                </div>
                <div className="space-y-1">
                  <label className="form-label">Twitter / X URL</label>
                  <input 
                    type="url" 
                    className="form-input" 
                    value={form.socialLinks.twitter}
                    onChange={(e) => handleSocialChange('twitter', e.target.value)}
                    placeholder="https://x.com/nrec"
                  />
                </div>
                <div className="space-y-1">
                  <label className="form-label">LinkedIn URL</label>
                  <input 
                    type="url" 
                    className="form-input" 
                    value={form.socialLinks.linkedin}
                    onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                    placeholder="https://linkedin.com/school/nrec"
                  />
                </div>
                <div className="sm:col-span-2 space-y-1">
                  <label className="form-label">YouTube Channel URL</label>
                  <input 
                    type="url" 
                    className="form-input" 
                    value={form.socialLinks.youtube}
                    onChange={(e) => handleSocialChange('youtube', e.target.value)}
                    placeholder="https://youtube.com/c/nrec"
                  />
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6 border border-gray-200/50 space-y-4">
              <h3 className="font-bold text-gray-800 flex items-center gap-2 border-b border-gray-100 pb-2">
                <Phone size={16} className="text-[#990A25]" /> Contact Phones
              </h3>
              <div className="space-y-2">
                {form.phones.map((phone, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input 
                      type="text" 
                      className="form-input flex-1"
                      value={phone}
                      onChange={(e) => handleArrayChange(idx, e.target.value, 'phones')}
                      placeholder="e.g. +91 5738 200001"
                    />
                    <button 
                      type="button"
                      onClick={() => removeArrayField(idx, 'phones')}
                      className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-150 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                <button 
                  type="button" 
                  onClick={() => addArrayField('phones')}
                  className="w-full py-2 border border-dashed border-gray-300 rounded-xl text-xs font-semibold text-gray-500 hover:text-[#990A25] hover:border-[#990A25] transition-all flex items-center justify-center gap-1"
                >
                  <Plus size={12} /> Add Phone
                </button>
              </div>
            </Card>

            <Card className="p-6 border border-gray-200/50 space-y-4">
              <h3 className="font-bold text-gray-800 flex items-center gap-2 border-b border-gray-100 pb-2">
                <Mail size={16} className="text-blue-600" /> Contact Emails
              </h3>
              <div className="space-y-2">
                {form.emails.map((email, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input 
                      type="email" 
                      className="form-input flex-1"
                      value={email}
                      onChange={(e) => handleArrayChange(idx, e.target.value, 'emails')}
                      placeholder="e.g. info@nreccollege.ac.in"
                    />
                    <button 
                      type="button"
                      onClick={() => removeArrayField(idx, 'emails')}
                      className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-150 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                <button 
                  type="button" 
                  onClick={() => addArrayField('emails')}
                  className="w-full py-2 border border-dashed border-gray-300 rounded-xl text-xs font-semibold text-gray-500 hover:text-[#990A25] hover:border-[#990A25] transition-all flex items-center justify-center gap-1"
                >
                  <Plus size={12} /> Add Email
                </button>
              </div>
            </Card>

            <Button 
              type="submit" 
              loading={loading} 
              className="w-full btn-primary rounded-xl py-3 shadow-md flex items-center justify-center gap-2"
            >
              <Save size={16} /> Save Settings
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
