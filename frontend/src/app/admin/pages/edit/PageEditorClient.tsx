'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Save, Plus, ArrowLeft, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import api from '@/lib/api';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ToastContainer from '@/components/ui/ToastContainer';
import ImageUploader from '@/components/admin/ImageUploader';
import RichTextEditor from '@/components/admin/RichTextEditor';

export default function PageEditor() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = { key: searchParams.get('key') || '' };
  const [pageData, setPageData] = useState<any>({
    title: '',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
    ogImage: '',
    canonicalUrl: '',
    sections: []
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
    api.get(`/pages/${params.key}`)
      .then((res) => {
        if (res.data.page) {
          // Normalize sections to array
          let sectionsArray = res.data.page.sections || [];
          if (!Array.isArray(sectionsArray)) {
            // legacy migration if it was a record
            sectionsArray = Object.keys(sectionsArray).map(k => ({ type: k, data: sectionsArray[k] }));
          }
          setPageData({ ...res.data.page, sections: sectionsArray });
        }
      })
      .catch(() => addToast('Failed to load page data', 'error'))
      .finally(() => setFetching(false));
  }, [params.key]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put(`/pages/${params.key}`, pageData);
      addToast('Page updated successfully!', 'success');
    } catch {
      addToast('Failed to update page', 'error');
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setPageData((prev: any) => ({ ...prev, [field]: value }));
  };

  // Section Handlers
  const addSection = () => {
    const newSection = { type: 'RichText', data: { title: 'New Section', content: '<p>Content</p>' }, isActive: true };
    setPageData((prev: any) => ({ ...prev, sections: [...prev.sections, newSection] }));
  };

  const updateSectionType = (index: number, type: string) => {
    const updated = [...pageData.sections];
    updated[index].type = type;
    if (type === 'Stats') updated[index].data = { title: 'Stats', stats: [] };
    if (type === 'CardsGrid') updated[index].data = { title: 'New Grid', style: 'numbered', columns: 3, cards: [] };
    setPageData({ ...pageData, sections: updated });
  };

  const updateSectionData = (index: number, jsonStr: string) => {
    try {
      const parsed = JSON.parse(jsonStr);
      const updated = [...pageData.sections];
      updated[index].data = parsed;
      setPageData({ ...pageData, sections: updated });
    } catch {
      // ignore invalid json during typing
    }
  };

  const removeSection = (index: number) => {
    const updated = [...pageData.sections];
    updated.splice(index, 1);
    setPageData({ ...pageData, sections: updated });
  };

  const moveSection = (index: number, dir: -1 | 1) => {
    if (index + dir < 0 || index + dir >= pageData.sections.length) return;
    const updated = [...pageData.sections];
    const temp = updated[index];
    updated[index] = updated[index + dir];
    updated[index + dir] = temp;
    setPageData({ ...pageData, sections: updated });
  };

  const toggleSectionActive = (index: number) => {
    const updated = [...pageData.sections];
    updated[index].isActive = updated[index].isActive !== false ? false : true;
    setPageData({ ...pageData, sections: updated });
  };

  if (fetching) {
    return <div className="space-y-4">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="skeleton h-32 rounded-xl" />)}</div>;
  }

  return (
    <div className="max-w-5xl pb-20">
      <ToastContainer toasts={toasts} onClose={removeToast} />

      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/admin/pages')} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="admin-page-title">Edit Page: {pageData.title || params.key}</h1>
            <p className="text-sm text-gray-500 font-mono">/{params.key}</p>
          </div>
        </div>
        <Button onClick={handleSubmit} loading={loading} className="gap-2">
          {!loading && <Save size={16} />} Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Sections Builder */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="font-heading font-bold text-lg text-[#111111]">Modular Sections</h2>
            <Button type="button" variant="outline" onClick={addSection} className="gap-2 py-1.5 px-3 text-sm h-auto">
              <Plus size={14} /> Add Section
            </Button>
          </div>
          
          {pageData.sections.map((section: any, idx: number) => (
            <Card key={idx} hoverEffect={false} className={`p-5 bg-white border border-gray-200 ${section.isActive === false ? 'opacity-50' : ''}`}>
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="bg-gray-100 text-gray-600 font-bold w-6 h-6 rounded flex items-center justify-center text-xs">{idx + 1}</span>
                  <select 
                    value={section.type} 
                    onChange={(e) => updateSectionType(idx, e.target.value)}
                    className="font-bold text-gray-800 bg-transparent focus:outline-none focus:ring-2 focus:ring-[#8B0E2A]/20 rounded"
                  >
                    <option value="RichText">RichText</option>
                    <option value="Stats">Stats</option>
                    <option value="CardsGrid">Cards Grid (Steps/Features)</option>
                  </select>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => toggleSectionActive(idx)} className="text-xs font-semibold px-2 py-1 rounded bg-gray-100 hover:bg-gray-200">
                    {section.isActive === false ? 'Enable' : 'Disable'}
                  </button>
                  <button onClick={() => moveSection(idx, -1)} disabled={idx === 0} className="p-1.5 text-gray-400 hover:bg-gray-100 rounded disabled:opacity-30"><ArrowUp size={16} /></button>
                  <button onClick={() => moveSection(idx, 1)} disabled={idx === pageData.sections.length - 1} className="p-1.5 text-gray-400 hover:bg-gray-100 rounded disabled:opacity-30"><ArrowDown size={16} /></button>
                  <button onClick={() => removeSection(idx)} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded ml-2"><Trash2 size={16} /></button>
                </div>
              </div>

              <div>
                {section.type === 'RichText' ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="form-label text-xs">Section ID (e.g. history)</label>
                        <input value={section.data.id || ''} onChange={(e) => updateSectionData(idx, { ...section.data, id: e.target.value })} className="form-input text-sm py-1.5 px-3" />
                      </div>
                      <div>
                        <label className="form-label text-xs">Navigation Label</label>
                        <input value={section.data.label || ''} onChange={(e) => updateSectionData(idx, { ...section.data, label: e.target.value })} className="form-input text-sm py-1.5 px-3" />
                      </div>
                      <div className="col-span-2">
                        <label className="form-label text-xs">Title (Heading)</label>
                        <input value={section.data.title || ''} onChange={(e) => updateSectionData(idx, { ...section.data, title: e.target.value })} className="form-input text-sm py-1.5 px-3" />
                      </div>
                    </div>
                    <div>
                      <label className="form-label text-xs">Alignment</label>
                      <select value={section.data.align || 'center'} onChange={(e) => updateSectionData(idx, { ...section.data, align: e.target.value })} className="form-input text-sm py-1.5 px-3">
                        <option value="left">Left</option>
                        <option value="center">Center</option>
                      </select>
                    </div>
                    <div>
                      <RichTextEditor 
                        value={section.data.content || ''} 
                        onChange={(content) => updateSectionData(idx, { ...section.data, content })} 
                        label="Rich Content" 
                      />
                    </div>
                  </div>
                ) : section.type === 'CardsGrid' ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="col-span-2">
                        <label className="form-label text-xs">Section Title</label>
                        <input value={section.data.title || ''} onChange={(e) => updateSectionData(idx, { ...section.data, title: e.target.value })} className="form-input text-sm py-1.5 px-3" />
                      </div>
                      <div className="col-span-2">
                        <label className="form-label text-xs">Subtitle</label>
                        <input value={section.data.subtitle || ''} onChange={(e) => updateSectionData(idx, { ...section.data, subtitle: e.target.value })} className="form-input text-sm py-1.5 px-3" />
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <label className="form-label text-xs">Columns</label>
                        <select value={section.data.columns || 3} onChange={(e) => updateSectionData(idx, { ...section.data, columns: parseInt(e.target.value) })} className="form-input text-sm py-1.5 px-3">
                          <option value={2}>2 Columns</option>
                          <option value={3}>3 Columns</option>
                          <option value={4}>4 Columns</option>
                        </select>
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <label className="form-label text-xs">Style</label>
                        <select value={section.data.style || 'numbered'} onChange={(e) => updateSectionData(idx, { ...section.data, style: e.target.value })} className="form-input text-sm py-1.5 px-3">
                          <option value="numbered">Numbered (01, 02)</option>
                          <option value="icon">Icon-based</option>
                          <option value="basic">Basic Text</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="form-label text-xs mb-0">Grid Cards</label>
                        <button 
                          onClick={() => {
                            const newCards = [...(section.data.cards || []), { title: 'New Card', description: 'Description', icon: 'CheckCircle' }];
                            updateSectionData(idx, { ...section.data, cards: newCards });
                          }}
                          className="text-xs font-semibold text-[#8B0E2A] hover:underline flex items-center gap-1"
                        >
                          <Plus size={12} /> Add Card
                        </button>
                      </div>
                      <div className="space-y-3">
                        {(section.data.cards || []).map((card: any, cIdx: number) => (
                          <div key={cIdx} className="bg-gray-50 p-3 border border-gray-100 rounded space-y-2">
                            <div className="flex gap-2 items-center">
                              <input placeholder="Card Title" value={card.title || ''} onChange={(e) => {
                                const newCards = [...section.data.cards];
                                newCards[cIdx].title = e.target.value;
                                updateSectionData(idx, { ...section.data, cards: newCards });
                              }} className="form-input text-sm font-semibold flex-1" />
                              <button onClick={() => {
                                const newCards = section.data.cards.filter((_: any, i: number) => i !== cIdx);
                                updateSectionData(idx, { ...section.data, cards: newCards });
                              }} className="p-1 text-red-500 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
                            </div>
                            <textarea placeholder="Card Description" value={card.description || ''} onChange={(e) => {
                              const newCards = [...section.data.cards];
                              newCards[cIdx].description = e.target.value;
                              updateSectionData(idx, { ...section.data, cards: newCards });
                            }} className="form-input text-xs py-1 px-2 h-16 resize-none" />
                            <div className="flex gap-2 items-center">
                              {section.data.style === 'icon' && (
                                <select value={card.icon || 'CheckCircle'} onChange={(e) => {
                                  const newCards = [...section.data.cards];
                                  newCards[cIdx].icon = e.target.value;
                                  updateSectionData(idx, { ...section.data, cards: newCards });
                                }} className="form-input text-xs py-1 px-2 w-48">
                                  <option value="CheckCircle">CheckCircle (Green Check)</option>
                                  <option value="AlertCircle">AlertCircle (Red Alert)</option>
                                  <option value="FileText">FileText (Doc)</option>
                                  <option value="ArrowRight">ArrowRight</option>
                                  <option value="User">User</option>
                                  <option value="GraduationCap">GradCap</option>
                                  <option value="Award">Award</option>
                                  <option value="MapPin">MapPin</option>
                                  <option value="Phone">Phone</option>
                                  <option value="Mail">Mail</option>
                                </select>
                              )}
                              <label className="flex items-center gap-2 text-xs ml-auto">
                                <input type="checkbox" checked={card.highlight || false} onChange={(e) => {
                                  const newCards = [...section.data.cards];
                                  newCards[cIdx].highlight = e.target.checked;
                                  updateSectionData(idx, { ...section.data, cards: newCards });
                                }} className="accent-[#8B0E2A]" />
                                Highlight Card (Red Border)
                              </label>
                            </div>
                          </div>
                        ))}
                        {(!section.data.cards || section.data.cards.length === 0) && (
                          <div className="text-center py-4 border-2 border-dashed border-gray-200 rounded text-xs text-gray-400">No cards added</div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : section.type === 'Stats' ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="form-label text-xs">Title</label>
                        <input value={section.data.title || ''} onChange={(e) => updateSectionData(idx, { ...section.data, title: e.target.value })} className="form-input text-sm py-1.5 px-3" />
                      </div>
                      <div>
                        <label className="form-label text-xs">Subtitle</label>
                        <input value={section.data.subtitle || ''} onChange={(e) => updateSectionData(idx, { ...section.data, subtitle: e.target.value })} className="form-input text-sm py-1.5 px-3" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="form-label text-xs mb-0">Statistics List</label>
                        <button 
                          onClick={() => {
                            const newStats = [...(section.data.stats || []), { label: '', value: '', icon: '' }];
                            updateSectionData(idx, { ...section.data, stats: newStats });
                          }}
                          className="text-xs font-semibold text-[#8B0E2A] hover:underline flex items-center gap-1"
                        >
                          <Plus size={12} /> Add Stat
                        </button>
                      </div>
                      <div className="space-y-2">
                        {(section.data.stats || []).map((stat: any, sIdx: number) => (
                          <div key={sIdx} className="flex gap-2 items-center bg-gray-50 p-2 border border-gray-100 rounded">
                            <input placeholder="Label (e.g. Students)" value={stat.label || ''} onChange={(e) => {
                              const newStats = [...section.data.stats];
                              newStats[sIdx].label = e.target.value;
                              updateSectionData(idx, { ...section.data, stats: newStats });
                            }} className="form-input text-xs py-1 px-2 flex-1" />
                            <input placeholder="Value (e.g. 500+)" value={stat.value || ''} onChange={(e) => {
                              const newStats = [...section.data.stats];
                              newStats[sIdx].value = e.target.value;
                              updateSectionData(idx, { ...section.data, stats: newStats });
                            }} className="form-input text-xs py-1 px-2 flex-1" />
                            <input placeholder="Icon (lucide name)" value={stat.icon || ''} onChange={(e) => {
                              const newStats = [...section.data.stats];
                              newStats[sIdx].icon = e.target.value;
                              updateSectionData(idx, { ...section.data, stats: newStats });
                            }} className="form-input text-xs py-1 px-2 flex-1" />
                            <button onClick={() => {
                              const newStats = section.data.stats.filter((_: any, i: number) => i !== sIdx);
                              updateSectionData(idx, { ...section.data, stats: newStats });
                            }} className="p-1 text-red-500 hover:bg-red-50 rounded"><Trash2 size={14} /></button>
                          </div>
                        ))}
                        {(!section.data.stats || section.data.stats.length === 0) && (
                          <div className="text-center py-4 border-2 border-dashed border-gray-200 rounded text-xs text-gray-400">No stats added</div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="form-label text-xs">Section Data (JSON)</label>
                    <textarea 
                      defaultValue={JSON.stringify(section.data, null, 2)}
                      onBlur={(e) => {
                        try { updateSectionData(idx, JSON.parse(e.target.value)) } catch {}
                      }}
                      className="w-full h-40 font-mono text-sm p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0E2A]/20"
                    />
                  </div>
                )}
              </div>
            </Card>
          ))}

          {pageData.sections.length === 0 && (
            <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400">
              No sections added yet. Click &quot;Add Section&quot; to start building.
            </div>
          )}
        </div>

        {/* Right Column: SEO & Settings */}
        <div className="space-y-6">
          <Card hoverEffect={false} className="p-5 bg-white border border-gray-200">
            <h2 className="font-heading font-bold text-lg text-[#111111] mb-4 pb-2 border-b border-gray-100">Page Meta</h2>
            <div className="space-y-4">
              <div>
                <label className="form-label">Page Title</label>
                <input value={pageData.title} onChange={e => updateField('title', e.target.value)} className="form-input" />
              </div>
              <div className="pt-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">SEO Settings (SEO Manager)</p>
              </div>
              <div>
                <label className="form-label">SEO Title</label>
                <input value={pageData.seoTitle} onChange={e => updateField('seoTitle', e.target.value)} className="form-input" />
              </div>
              <div>
                <label className="form-label">SEO Description</label>
                <textarea value={pageData.seoDescription} onChange={e => updateField('seoDescription', e.target.value)} className="form-input h-20" />
              </div>
              <div>
                <label className="form-label">Keywords</label>
                <input value={pageData.seoKeywords} onChange={e => updateField('seoKeywords', e.target.value)} className="form-input" placeholder="Comma separated" />
              </div>
              <div>
                <ImageUploader 
                  label="OG Image URL"
                  value={pageData.ogImage} 
                  onChange={(url) => updateField('ogImage', url)} 
                />
                <p className="text-[10px] text-gray-400 mt-1">Shown when shared on social media</p>
              </div>
              <div>
                <label className="form-label">Canonical URL</label>
                <input value={pageData.canonicalUrl} onChange={e => updateField('canonicalUrl', e.target.value)} className="form-input" placeholder="https://..." />
              </div>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
