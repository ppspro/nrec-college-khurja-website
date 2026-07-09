'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, Pin, Download, ArrowLeft, FileText, Bell } from 'lucide-react';
import PageBanner from '@/components/ui/PageBanner';
import Card from '@/components/ui/Card';
import { uploadsUrl, API_URL } from '@/lib/api';



export default function NoticeDetailPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  const [notice, setNotice] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [id, setId] = useState<string>('');

  useEffect(() => {
    const resolveParams = async () => {
      try {
        const resolvedParams = await Promise.resolve(params);
        setId(resolvedParams.id);
      } catch (err) {
        setId('');
      }
    };
    resolveParams();
  }, [params]);

  useEffect(() => {
    if (!id) return;
    const fetchNotice = async () => {
      try {
        const res = await fetch(`${API_URL}/notices/${id}`);
        if (!res.ok) {
          setError(true);
        } else {
          const data = await res.json();
          setNotice(data.notice);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchNotice();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#8B0E2A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !notice) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Notice Not Found</h1>
        <p className="text-gray-600 mb-8 max-w-md">The notice you are looking for might have been removed or unavailable.</p>
        <Link href="/notices" className="px-6 py-2.5 bg-[#8B0E2A] text-white font-bold rounded-lg hover:bg-[#700B22] transition-colors">Browse Notice Board</Link>
      </div>
    );
  }

  const breadcrumbs = [
    { label: 'Notice Board', href: '/notices' },
    { label: 'Notice Details' }
  ];

  return (
    <>
      <PageBanner
        title="Notice Details"
        subtitle="Official circulars and announcements from college administration"
        breadcrumbs={breadcrumbs}
      />

      <section className="bg-[#F8F5F0] section-py">
        <div className="container-nrec max-w-4xl">
          <div className="mb-6">
            <Link href="/notices" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#8B0E2A] transition-colors">
              <ArrowLeft size={16} /> Back to Notice Board
            </Link>
          </div>

          <Card className="p-8 bg-white border border-gray-200/50 shadow-lg rounded-[24px]">
            <div className="space-y-6">
              {/* Category & Date */}
              <div className="flex flex-wrap items-center gap-3">
                {notice.isPinned && (
                  <span className="bg-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md flex items-center gap-1">
                    <Pin size={10} /> Pinned
                  </span>
                )}
                <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 border border-gray-200">
                  {notice.category}
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1.5 ml-2 font-medium">
                  <Calendar size={13} /> Published: {new Date(notice.publishDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-heading font-bold text-gray-900 text-2xl md:text-3xl leading-tight border-b border-gray-100 pb-5">
                {notice.title}
              </h1>

              {/* Content */}
              <div className="text-gray-700 leading-relaxed space-y-4 font-light text-[15px] whitespace-pre-line">
                {notice.content ? (
                  notice.content
                ) : (
                  <span className="text-gray-400 italic">No content details provided. Please download the attachment for full details.</span>
                )}
              </div>

              {/* Attachment Download */}
              {notice.attachment && (
                <div className="mt-8 p-6 bg-gray-50 border border-gray-150 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#8B0E2A]">
                      <FileText size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-900">Official Document Attachment</h4>
                      <p className="text-xs text-gray-500 mt-1">Download to view complete notice details</p>
                    </div>
                  </div>
                  <a
                    href={uploadsUrl(notice.attachment)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 bg-[#8B0E2A] text-white text-sm font-bold rounded-lg hover:bg-black transition-colors"
                  >
                    <Download size={16} /> Download PDF
                  </a>
                </div>
              )}
            </div>
          </Card>
          
          <div className="mt-12 text-center text-sm text-gray-500 flex items-center justify-center gap-2">
             <Bell size={14} /> For any queries regarding this notice, please contact the college administration.
          </div>
        </div>
      </section>
    </>
  );
}
