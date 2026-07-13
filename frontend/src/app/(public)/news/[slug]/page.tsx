'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, ArrowLeft, User, FolderOpen } from 'lucide-react';
import PageBanner from '@/components/ui/PageBanner';
import Card from '@/components/ui/Card';
import SafeImage from '@/components/ui/SafeImage';
import { uploadsUrl, API_URL } from '@/lib/api';



export default function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [slug, setSlug] = useState<string>('');

  useEffect(() => {
    const resolveParams = async () => {
      try {
        const resolvedParams = await Promise.resolve(params);
        setSlug(resolvedParams.slug);
      } catch (err) {
        setSlug('');
      }
    };
    resolveParams();
  }, [params]);

  useEffect(() => {
    if (!slug) return;
    const fetchNews = async () => {
      try {
        const res = await fetch(`${API_URL}/news/${slug}`);
        if (!res.ok) {
          setError(true);
        } else {
          const data = await res.json();
          setItem(data.news);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#8B0E2A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Article Not Found</h1>
        <p className="text-gray-600 mb-8 max-w-md">The news article you are looking for might have been removed or unavailable.</p>
        <Link href="/news" className="px-6 py-2.5 bg-[#8B0E2A] text-white font-bold rounded-lg hover:bg-[#700B22] transition-colors">Browse News Updates</Link>
      </div>
    );
  }

  const breadcrumbs = [
    { label: 'News', href: '/news' },
    { label: 'News Details' }
  ];

  return (
    <>
      <PageBanner
        title="Campus News"
        subtitle="Stories, achievements, and milestones from NREC College Khurja"
        breadcrumbs={breadcrumbs}
      />

      <section className="bg-[#F8F5F0] section-py">
        <div className="container-nrec max-w-4xl">
          <div className="mb-6">
            <Link href="/news" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#8B0E2A] transition-colors">
              <ArrowLeft size={16} /> Back to News & Updates
            </Link>
          </div>

          <Card className="p-8 bg-white border border-gray-200/50 shadow-lg rounded-[24px] overflow-hidden">
            <div className="space-y-6">
              {/* Category & Date */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <span className="bg-[#8B0E2A] text-white px-3 py-1 rounded-md text-[10px] tracking-widest uppercase">
                  {item.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={14} className="text-[#B8860B]" />
                  {new Date(item.publishDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
                {item.author && (
                  <span className="flex items-center gap-1">
                    <User size={14} className="text-gray-400" />
                    By {item.author}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="font-heading font-bold text-gray-900 text-2xl md:text-3xl lg:text-4xl leading-tight">
                {item.title}
              </h1>

              {/* Cover Image */}
              {item.image && (
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 my-6">
                  <SafeImage
                    fallbackKey="news"
                    src={uploadsUrl(item.image)}
                    alt={item.title}
                    fill
                    sizes="(max-width: 1200px) 100vw, 800px"
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              {/* Content */}
              <div 
                className="text-gray-700 leading-relaxed space-y-4 font-light text-[16px] md:text-[17px] mt-8"
              >
                {item.content ? (
                  <div dangerouslySetInnerHTML={{ __html: item.content.replace(/\n/g, '<br/>') }} />
                ) : (
                  <p className="text-gray-400 italic">No content details provided.</p>
                )}
              </div>

              {/* Tags / Details block */}
              <div className="mt-10 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                 <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FolderOpen size={16} />
                    <span>Filed under: <strong className="text-gray-800">{item.category}</strong></span>
                 </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}
