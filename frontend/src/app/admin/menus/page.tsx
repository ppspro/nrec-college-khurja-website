'use client';
import { useState, useEffect } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';
import api from '@/lib/api';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ToastContainer from '@/components/ui/ToastContainer';
import AdminPageHeader from '@/components/admin/AdminPageHeader';

interface MenuItem {
  label: string;
  url: string;
  target: string;
  order: number;
}

export default function MenuManager() {
  const [activeTab, setActiveTab] = useState('main');
  const [menus, setMenus] = useState<Record<string, { name: string, items: MenuItem[] }>>({
    main: { name: 'Main Menu', items: [] },
    footer: { name: 'Footer Quick Links', items: [] }
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
    api.get('/menus')
      .then((res) => {
        const fetchedMenus: Record<string, any> = { ...menus };
        if (res.data.menus) {
          res.data.menus.forEach((m: any) => {
            fetchedMenus[m.key] = { name: m.name, items: m.items || [] };
          });
        }
        setMenus(fetchedMenus);
      })
      .catch(() => addToast('Failed to load menus', 'error'))
      .finally(() => setFetching(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = menus[activeTab];
      await api.put(`/menus/${activeTab}`, payload);
      addToast('Menu updated successfully!', 'success');
    } catch {
      addToast('Failed to update menu', 'error');
    } finally {
      setLoading(false);
    }
  };

  const addItem = () => {
    const updated = { ...menus };
    updated[activeTab].items.push({ label: '', url: '', target: '_self', order: updated[activeTab].items.length });
    setMenus(updated);
  };

  const removeItem = (index: number) => {
    const updated = { ...menus };
    updated[activeTab].items.splice(index, 1);
    setMenus(updated);
  };

  const updateItem = (index: number, field: keyof MenuItem, value: string | number) => {
    const updated = { ...menus };
    updated[activeTab].items[index] = { ...updated[activeTab].items[index], [field]: value };
    setMenus(updated);
  };

  if (fetching) {
    return <div className="space-y-4">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="skeleton h-24 rounded-xl" />)}</div>;
  }

  const currentMenu = menus[activeTab];

  return (
    <div className="max-w-4xl">
      <ToastContainer toasts={toasts} onClose={removeToast} />

      <AdminPageHeader 
        title="Menu Manager" 
        description="Configure global navigation menus for the header and footer."
        helpSection="menus"
      />

      <div className="flex gap-2 mb-6">
        <button 
          onClick={() => setActiveTab('main')} 
          className={`px-4 py-2 rounded-lg text-sm font-bold ${activeTab === 'main' ? 'bg-[#8B0E2A] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          Main Menu
        </button>
        <button 
          onClick={() => setActiveTab('footer')} 
          className={`px-4 py-2 rounded-lg text-sm font-bold ${activeTab === 'footer' ? 'bg-[#8B0E2A] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          Footer Links
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card hoverEffect={false} className="p-6 bg-white space-y-4">
          <div className="flex justify-between items-center border-b border-[#E7E7E7] pb-2">
            <h2 className="font-heading font-bold text-lg text-[#111111]">{currentMenu.name} Items</h2>
            <Button type="button" variant="outline" onClick={addItem} className="gap-2 text-sm px-3 py-1.5 h-auto">
              <Plus size={14} /> Add Item
            </Button>
          </div>

          <div className="space-y-3 pt-2">
            {currentMenu.items.map((item, idx) => (
              <div key={idx} className="flex flex-col md:flex-row gap-3 p-4 border border-gray-100 rounded-xl bg-gray-50/50">
                <div className="flex-1">
                  <label className="text-xs font-bold text-gray-500 mb-1 block">Label</label>
                  <input 
                    value={item.label} 
                    onChange={(e) => updateItem(idx, 'label', e.target.value)} 
                    placeholder="e.g. About Us"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8B0E2A]/20" 
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs font-bold text-gray-500 mb-1 block">URL (Path)</label>
                  <input 
                    value={item.url} 
                    onChange={(e) => updateItem(idx, 'url', e.target.value)} 
                    placeholder="e.g. /about"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8B0E2A]/20" 
                    required
                  />
                </div>
                <div className="w-24">
                  <label className="text-xs font-bold text-gray-500 mb-1 block">Target</label>
                  <select 
                    value={item.target} 
                    onChange={(e) => updateItem(idx, 'target', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8B0E2A]/20 bg-white"
                  >
                    <option value="_self">_self</option>
                    <option value="_blank">_blank</option>
                  </select>
                </div>
                <div className="flex items-end pb-1">
                  <button type="button" onClick={() => removeItem(idx)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
            
            {currentMenu.items.length === 0 && (
              <div className="text-center py-10 text-gray-400 text-sm">
                {"No items in this menu. Click \"Add Item\" to start building."}
              </div>
            )}
          </div>
        </Card>

        <div className="flex gap-3">
          <Button type="submit" variant="primary" loading={loading} className="gap-2">
            {!loading && <Save size={15} />}
            Save Menu
          </Button>
        </div>
      </form>
    </div>
  );
}
