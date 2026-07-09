'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';
import api from '@/lib/api';
import Button from '@/components/ui/Button';
import ToastContainer from '@/components/ui/ToastContainer';
import AdminPageHeader from '@/components/admin/AdminPageHeader';

export default function PagesManager() {
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [toasts, setToasts] = useState<any[]>([]);
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newKey, setNewKey] = useState('');
  const [newTitle, setNewTitle] = useState('');

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

  const fetchPages = () => {
    setLoading(true);
    api.get('/pages')
      .then(res => setPages(res.data.pages || []))
      .catch(() => addToast('Failed to load pages', 'error'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKey.match(/^[a-z0-9-]+$/)) {
      addToast('Key must contain only lowercase letters, numbers, and dashes.', 'error');
      return;
    }
    
    try {
      await api.put(`/pages/${newKey}`, { title: newTitle });
      addToast('Page created successfully', 'success');
      setShowCreateModal(false);
      fetchPages();
    } catch {
      addToast('Failed to create page', 'error');
    }
  };

  const handleDelete = async (key: string) => {
    if (!confirm(`Are you sure you want to delete the page "${key}"?`)) return;
    try {
      await api.delete(`/pages/${key}`);
      addToast('Page deleted', 'success');
      fetchPages();
    } catch {
      addToast('Failed to delete page', 'error');
    }
  };

  return (
    <div className="max-w-6xl">
      <ToastContainer toasts={toasts} onClose={removeToast} />

      <AdminPageHeader 
        title="Pages & SEO Manager" 
        description="Create and manage dynamic pages, modular sections, and SEO metadata."
        helpSection="pages"
      >
        <Button onClick={() => setShowCreateModal(true)} className="gap-2">
          <Plus size={16} /> Create Page
        </Button>
      </AdminPageHeader>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => <div key={i} className="skeleton h-16 rounded-xl" />)}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-500">
              <tr>
                <th className="px-6 py-4 font-medium">Page Title</th>
                <th className="px-6 py-4 font-medium">URL Slug (Key)</th>
                <th className="px-6 py-4 font-medium">Sections</th>
                <th className="px-6 py-4 font-medium">SEO Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pages.map((page) => (
                <tr key={page.key} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900">{page.title}</td>
                  <td className="px-6 py-4 text-gray-500 font-mono text-xs">/{page.key}</td>
                  <td className="px-6 py-4 text-gray-500">{Array.isArray(page.sections) ? page.sections.length : 0} Sections</td>
                  <td className="px-6 py-4">
                    {page.seoTitle && page.seoDescription ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                        Optimized
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                        Missing Meta
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/pages/edit?key=${page.key}`}>
                        <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Edit Page">
                          <Edit size={16} />
                        </button>
                      </Link>
                      <button 
                        onClick={() => handleDelete(page.key)}
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Page"
                        disabled={page.key === 'home'} // Prevent deleting homepage
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Create New Page</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1 block">Page Title</label>
                <input 
                  value={newTitle} 
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  placeholder="e.g. About Us"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1 block">URL Slug (Key)</label>
                <input 
                  value={newKey} 
                  onChange={e => setNewKey(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg font-mono text-sm"
                  placeholder="e.g. about-us"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">This will be the URL: nreccollege.com/your-slug</p>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setShowCreateModal(false)}>Cancel</Button>
                <Button type="submit">Create Page</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
