'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Search, Edit2, Trash2, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import api from '@/lib/api';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import EmptyState from '@/components/ui/EmptyState';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ToastContainer from '@/components/ui/ToastContainer';

interface Column<T> {
  key: string;
  label: string;
  render?: (row: T) => React.ReactNode;
}

interface AdminListPageProps<T> {
  title: string;
  subtitle?: string;
  apiEndpoint: string;
  dataKey: string;
  newHref: string;
  editHref: (row: T) => string;
  columns: Column<T>[];
  searchPlaceholder?: string;
  extraParams?: Record<string, string>;
}

export default function AdminListPage<T extends { _id: string }>({
  title, subtitle, apiEndpoint, dataKey, newHref, editHref, columns, searchPlaceholder = 'Search...', extraParams = {},
}: AdminListPageProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [inputVal, setInputVal] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  const extraParamsString = JSON.stringify(extraParams);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const parsedExtra = extraParamsString ? JSON.parse(extraParamsString) : {};
      const params = new URLSearchParams({ page: String(page), limit: '15', ...parsedExtra });
      if (search) params.set('search', search);
      const res = await api.get(`${apiEndpoint}?${params}`);
      setItems(res.data[dataKey] || []);
      setTotalPages(res.data.pagination?.pages || 1);
      setTotal(res.data.pagination?.total || res.data[dataKey]?.length || 0);
    } catch {
      setError('Failed to load data. Make sure the backend is running.');
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [apiEndpoint, dataKey, page, search, extraParamsString]);

  useEffect(() => {
    let active = true;
    if (active) {
      setTimeout(() => {
        if (active) fetchData();
      }, 0);
    }
    return () => { active = false; };
  }, [fetchData]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item? This cannot be undone.')) return;
    setDeleting(id);
    try {
      await api.delete(`${apiEndpoint}/${id}`);
      addToast('Item deleted successfully', 'success');
      fetchData();
    } catch {
      addToast('Failed to delete. Please try again.', 'error');
    } finally {
      setDeleting(null);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(inputVal);
    setPage(1);
  };

  return (
    <div>
      <ToastContainer toasts={toasts} onClose={removeToast} />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="admin-page-title">{title}</h1>
          {subtitle && <p className="text-sm text-[#666666] mt-0.5">{subtitle}</p>}
        </div>
        <Link href={newHref}>
          <Button variant="primary" className="text-sm">
            Add New
          </Button>
        </Link>
      </div>

      {/* Search */}
      <Card hoverEffect={false} className="mb-5 p-5">
        <form onSubmit={handleSearch} className="flex gap-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666666]" />
            <input
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={searchPlaceholder}
              className="form-input pl-9 py-2.5"
            />
          </div>
          <Button type="submit" variant="primary" className="px-5 py-2.5">
            Search
          </Button>
          {search && (
            <Button
              type="button"
              variant="outline"
              onClick={() => { setSearch(''); setInputVal(''); setPage(1); }}
              className="px-4 py-2.5"
            >
              Clear
            </Button>
          )}
        </form>
      </Card>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2.5 p-4 bg-red-50 border border-red-200 rounded-xl mb-5 text-red-700 text-sm">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {/* Table */}
      <Card hoverEffect={false} className="overflow-hidden p-0 bg-white">
        {loading ? (
          <LoadingSpinner />
        ) : items.length === 0 ? (
          <div className="p-6">
            <EmptyState
              title={`No ${title} Found`}
              description={search ? "Try clearing your search query" : `Get started by creating a new entry`}
              action={
                <Link href={newHref}>
                  <Button variant="primary">Add First Item</Button>
                </Link>
              }
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-black/5 bg-[#F9F9F9]/50">
                  {columns.map((col) => (
                    <th key={col.key} className="text-left px-6 py-4 text-xs font-bold text-[#666666] uppercase tracking-widest">{col.label}</th>
                  ))}
                  <th className="text-right px-6 py-4 text-xs font-bold text-[#666666] uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {items.map((item) => (
                  <tr key={item._id} className="hover:bg-[#F9F9F9]/50 transition-colors group">
                    {columns.map((col) => (
                      <td key={col.key} className="px-6 py-5 text-[15px] font-medium text-[#2E2E2E]">
                        {col.render ? col.render(item) : String((item as Record<string, unknown>)[col.key] ?? '')}
                      </td>
                    ))}
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link
                          href={editHref(item)}
                          className="w-8 h-8 rounded-lg bg-white border border-black/5 shadow-sm flex items-center justify-center text-[#666666] hover:border-[#C6A04D] hover:text-[#C6A04D] transition-all"
                        >
                          <Edit2 size={14} />
                        </Link>
                        <button
                          onClick={() => handleDelete(item._id)}
                          disabled={deleting === item._id}
                          className="w-8 h-8 rounded-lg bg-white border border-black/5 shadow-sm flex items-center justify-center text-[#666666] hover:border-[#990A25] hover:text-[#990A25] transition-all disabled:opacity-50"
                          title="Delete"
                        >
                          {deleting === item._id
                            ? <div className="w-3.5 h-3.5 border-2 border-[#990A25]/30 border-t-[#990A25] rounded-full animate-spin" />
                            : <Trash2 size={14} />
                          }
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-4 border-t border-[#E7E7E7]">
            <span className="text-sm text-[#666666]">{total} total items</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-8 h-8 rounded-lg border border-[#E7E7E7] flex items-center justify-center hover:border-[#990A25] hover:text-[#990A25] transition-colors disabled:opacity-40"
              >
                <ChevronLeft size={15} />
              </button>
              <span className="text-sm text-[#666666]">{page}/{totalPages}</span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-8 h-8 rounded-lg border border-[#E7E7E7] flex items-center justify-center hover:border-[#990A25] hover:text-[#990A25] transition-colors disabled:opacity-40"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
