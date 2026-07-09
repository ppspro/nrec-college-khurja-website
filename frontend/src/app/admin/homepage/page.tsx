'use client';
import { useState, useEffect } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';
import api from '@/lib/api';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ToastContainer from '@/components/ui/ToastContainer';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import ImageUploader from '@/components/admin/ImageUploader';

export default function HomepageAdmin() {
  const [form, setForm] = useState<any>({
    welcome: { title: '', subtitle: '', paragraphs: [] },
    principalMessage: { name: '', designation: '', quote: '', image: '', paragraphs: [] },
    stats: [],
    callToAction: { title: '', subtitle: '', stats: [] },
    testimonials: []
  });
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
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
    api.get('/pages/home')
      .then((res) => {
        if (res.data.page && res.data.page.sections) {
          setForm({
            welcome: res.data.page.sections.welcome || { title: '', subtitle: '', paragraphs: [] },
            principalMessage: res.data.page.sections.principalMessage || { name: '', designation: '', quote: '', image: '', paragraphs: [] },
            stats: res.data.page.sections.stats || [],
            callToAction: res.data.page.sections.callToAction || { title: '', subtitle: '', stats: [] },
            testimonials: res.data.page.sections.testimonials || []
          });
        }
      })
      .catch(() => addToast('Failed to load homepage data. It may be empty.', 'info'))
      .finally(() => setFetching(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put('/pages/home', { sections: form });
      addToast('Homepage updated successfully!', 'success');
    } catch {
      addToast('Failed to update homepage', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Welcome section handlers
  const updateWelcome = (key: string, value: any) => setForm({ ...form, welcome: { ...form.welcome, [key]: value } });
  
  // Principal section handlers
  const updatePrincipal = (key: string, value: any) => setForm({ ...form, principalMessage: { ...form.principalMessage, [key]: value } });

  if (fetching) {
    return <div className="space-y-4">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="skeleton h-32 rounded-xl" />)}</div>;
  }

  return (
    <div className="max-w-4xl">
      <ToastContainer toasts={toasts} onClose={removeToast} />

      <AdminPageHeader 
        title="Homepage Content" 
        description="Manage the static sections of the homepage (Welcome, Principal Message, etc.)"
        helpSection="homepage"
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Welcome Section */}
        <Card hoverEffect={false} className="p-6 bg-white space-y-4">
          <h2 className="font-heading font-bold text-lg text-[#111111] border-b border-[#E7E7E7] pb-2">Welcome Section</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Title</label>
              <input value={form.welcome.title} onChange={(e) => updateWelcome('title', e.target.value)} className="form-input" placeholder="A Legacy of Learning..." />
            </div>
            <div>
              <label className="form-label">Subtitle</label>
              <input value={form.welcome.subtitle} onChange={(e) => updateWelcome('subtitle', e.target.value)} className="form-input" placeholder="Welcome to NREC..." />
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="form-label mb-0">Paragraphs</label>
              <button 
                type="button"
                onClick={() => updateWelcome('paragraphs', [...form.welcome.paragraphs, ''])}
                className="text-xs font-semibold text-[#8B0E2A] hover:underline flex items-center gap-1"
              >
                <Plus size={12} /> Add Paragraph
              </button>
            </div>
            <div className="space-y-3">
              {form.welcome.paragraphs.map((p: string, idx: number) => (
                <div key={idx} className="flex gap-2">
                  <textarea 
                    value={p} 
                    onChange={(e) => {
                      const newP = [...form.welcome.paragraphs];
                      newP[idx] = e.target.value;
                      updateWelcome('paragraphs', newP);
                    }} 
                    className="form-input h-20 text-sm flex-1" 
                    placeholder="Enter paragraph text..."
                  />
                  <button 
                    type="button"
                    onClick={() => {
                      const newP = form.welcome.paragraphs.filter((_: any, i: number) => i !== idx);
                      updateWelcome('paragraphs', newP);
                    }} 
                    className="p-2 h-10 text-red-500 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              {form.welcome.paragraphs.length === 0 && (
                <div className="text-center py-4 border-2 border-dashed border-gray-200 rounded text-xs text-gray-400">No paragraphs added</div>
              )}
            </div>
          </div>
        </Card>

        {/* Principal Message Section */}
        <Card hoverEffect={false} className="p-6 bg-white space-y-4">
          <h2 className="font-heading font-bold text-lg text-[#111111] border-b border-[#E7E7E7] pb-2">Principal Message</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Name</label>
              <input value={form.principalMessage.name} onChange={(e) => updatePrincipal('name', e.target.value)} className="form-input" />
            </div>
            <div>
              <label className="form-label">Designation</label>
              <input value={form.principalMessage.designation} onChange={(e) => updatePrincipal('designation', e.target.value)} className="form-input" />
            </div>
            <div className="md:col-span-2">
              <ImageUploader 
                label="Principal's Photo"
                value={form.principalMessage.image} 
                onChange={(url) => updatePrincipal('image', url)} 
              />
            </div>
            <div className="md:col-span-2">
              <label className="form-label">Quote</label>
              <input value={form.principalMessage.quote} onChange={(e) => updatePrincipal('quote', e.target.value)} className="form-input" />
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="form-label mb-0">Paragraphs</label>
              <button 
                type="button"
                onClick={() => updatePrincipal('paragraphs', [...form.principalMessage.paragraphs, ''])}
                className="text-xs font-semibold text-[#8B0E2A] hover:underline flex items-center gap-1"
              >
                <Plus size={12} /> Add Paragraph
              </button>
            </div>
            <div className="space-y-3">
              {form.principalMessage.paragraphs.map((p: string, idx: number) => (
                <div key={idx} className="flex gap-2">
                  <textarea 
                    value={p} 
                    onChange={(e) => {
                      const newP = [...form.principalMessage.paragraphs];
                      newP[idx] = e.target.value;
                      updatePrincipal('paragraphs', newP);
                    }} 
                    className="form-input h-20 text-sm flex-1" 
                    placeholder="Enter paragraph text..."
                  />
                  <button 
                    type="button"
                    onClick={() => {
                      const newP = form.principalMessage.paragraphs.filter((_: any, i: number) => i !== idx);
                      updatePrincipal('paragraphs', newP);
                    }} 
                    className="p-2 h-10 text-red-500 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              {form.principalMessage.paragraphs.length === 0 && (
                <div className="text-center py-4 border-2 border-dashed border-gray-200 rounded text-xs text-gray-400">No paragraphs added</div>
              )}
            </div>
          </div>
        </Card>

        {/* JSON Edit for complex arrays */}
        <Card hoverEffect={false} className="p-6 bg-white space-y-4">
          <h2 className="font-heading font-bold text-lg text-[#111111] border-b border-[#E7E7E7] pb-2">Advanced: Other Sections (Stats, CTA, Testimonials)</h2>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="form-label mb-0">College Stats</label>
              <button 
                type="button"
                onClick={() => setForm({...form, stats: [...(form.stats || []), { label: '', value: '' }]})}
                className="text-xs font-semibold text-[#8B0E2A] hover:underline flex items-center gap-1"
              >
                <Plus size={12} /> Add Stat
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {(form.stats || []).map((stat: any, idx: number) => (
                <div key={idx} className="bg-gray-50 p-3 rounded border border-gray-200 flex flex-col gap-2 relative group">
                  <button type="button" onClick={() => setForm({...form, stats: form.stats.filter((_: any, i: number) => i !== idx)})} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={14}/></button>
                  <input placeholder="Value (e.g. 500+)" value={stat.value} onChange={(e) => {
                    const newStats = [...form.stats];
                    newStats[idx].value = e.target.value;
                    setForm({...form, stats: newStats});
                  }} className="form-input text-sm font-bold text-center" />
                  <input placeholder="Label (e.g. Students)" value={stat.label} onChange={(e) => {
                    const newStats = [...form.stats];
                    newStats[idx].label = e.target.value;
                    setForm({...form, stats: newStats});
                  }} className="form-input text-xs text-center" />
                </div>
              ))}
            </div>
            {(!form.stats || form.stats.length === 0) && (
              <div className="text-center py-4 border-2 border-dashed border-gray-200 rounded text-xs text-gray-400">No stats added</div>
            )}
          </div>

          <div className="border-t border-gray-100 pt-4 mt-4">
            <h3 className="font-heading font-bold text-sm text-[#111111] mb-4">Call To Action</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="form-label text-xs">Title</label>
                <input value={form.callToAction.title} onChange={(e) => setForm({...form, callToAction: {...form.callToAction, title: e.target.value}})} className="form-input" />
              </div>
              <div>
                <label className="form-label text-xs">Subtitle</label>
                <input value={form.callToAction.subtitle} onChange={(e) => setForm({...form, callToAction: {...form.callToAction, subtitle: e.target.value}})} className="form-input" />
              </div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <label className="form-label mb-0 text-xs">CTA Highlights</label>
              <button 
                type="button"
                onClick={() => setForm({...form, callToAction: {...form.callToAction, stats: [...(form.callToAction.stats || []), { label: '', value: '' }]}})}
                className="text-xs font-semibold text-[#8B0E2A] hover:underline flex items-center gap-1"
              >
                <Plus size={12} /> Add Highlight
              </button>
            </div>
            <div className="space-y-2">
              {(form.callToAction.stats || []).map((stat: any, idx: number) => (
                <div key={idx} className="flex gap-2 items-center bg-gray-50 p-2 border border-gray-100 rounded">
                  <input placeholder="Label (e.g. Placement Rate)" value={stat.label} onChange={(e) => {
                    const newStats = [...form.callToAction.stats];
                    newStats[idx].label = e.target.value;
                    setForm({...form, callToAction: {...form.callToAction, stats: newStats}});
                  }} className="form-input text-xs py-1.5 flex-1" />
                  <input placeholder="Value (e.g. 95%)" value={stat.value} onChange={(e) => {
                    const newStats = [...form.callToAction.stats];
                    newStats[idx].value = e.target.value;
                    setForm({...form, callToAction: {...form.callToAction, stats: newStats}});
                  }} className="form-input text-xs py-1.5 flex-1" />
                  <button type="button" onClick={() => {
                    const newStats = form.callToAction.stats.filter((_: any, i: number) => i !== idx);
                    setForm({...form, callToAction: {...form.callToAction, stats: newStats}});
                  }} className="p-1.5 text-red-500 hover:bg-red-50 rounded"><Trash2 size={14}/></button>
                </div>
              ))}
              {(!form.callToAction.stats || form.callToAction.stats.length === 0) && (
                <div className="text-center py-4 border-2 border-dashed border-gray-200 rounded text-xs text-gray-400">No highlights added</div>
              )}
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4 mt-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-heading font-bold text-sm text-[#111111] mb-0">Testimonials</h3>
              <button 
                type="button"
                onClick={() => setForm({...form, testimonials: [...(form.testimonials || []), { name: '', role: '', quote: '', image: '' }]})}
                className="text-xs font-semibold text-[#8B0E2A] hover:underline flex items-center gap-1"
              >
                <Plus size={12} /> Add Testimonial
              </button>
            </div>
            <div className="space-y-3">
              {(form.testimonials || []).map((t: any, idx: number) => (
                <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-200 relative group">
                  <button type="button" onClick={() => setForm({...form, testimonials: form.testimonials.filter((_: any, i: number) => i !== idx)})} className="absolute top-2 right-2 p-1.5 text-red-500 hover:bg-red-50 rounded transition-opacity"><Trash2 size={16}/></button>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                    <div>
                      <label className="form-label text-xs">Name</label>
                      <input value={t.name} onChange={(e) => {
                        const newT = [...form.testimonials];
                        newT[idx].name = e.target.value;
                        setForm({...form, testimonials: newT});
                      }} className="form-input text-sm py-1.5" />
                    </div>
                    <div>
                      <label className="form-label text-xs">Role / Batch</label>
                      <input value={t.role} onChange={(e) => {
                        const newT = [...form.testimonials];
                        newT[idx].role = e.target.value;
                        setForm({...form, testimonials: newT});
                      }} className="form-input text-sm py-1.5" />
                    </div>
                    <div>
                      <label className="form-label text-xs">Avatar URL</label>
                      <input value={t.image} onChange={(e) => {
                        const newT = [...form.testimonials];
                        newT[idx].image = e.target.value;
                        setForm({...form, testimonials: newT});
                      }} className="form-input text-sm py-1.5" placeholder="/uploads/..." />
                    </div>
                  </div>
                  <div>
                    <label className="form-label text-xs">Quote</label>
                    <textarea value={t.quote} onChange={(e) => {
                      const newT = [...form.testimonials];
                      newT[idx].quote = e.target.value;
                      setForm({...form, testimonials: newT});
                    }} className="form-input text-sm h-16" />
                  </div>
                </div>
              ))}
              {(!form.testimonials || form.testimonials.length === 0) && (
                <div className="text-center py-6 border-2 border-dashed border-gray-200 rounded-lg text-sm text-gray-400">No testimonials added</div>
              )}
            </div>
          </div>
        </Card>

        <div className="flex gap-3">
          <Button type="submit" variant="primary" loading={loading} className="gap-2">
            {!loading && <Save size={15} />}
            Save Homepage Content
          </Button>
        </div>
      </form>
    </div>
  );
}
