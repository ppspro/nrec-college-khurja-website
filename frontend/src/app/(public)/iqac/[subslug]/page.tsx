import { notFound } from 'next/navigation';
import PageBanner from '@/components/ui/PageBanner';
import CmsRenderer from '@/components/cms/CmsRenderer';
import { API_URL } from '@/lib/api';
import React from 'react';

async function getPage(subslug: string) {
  try {
    const res = await fetch(`${API_URL}/pages/iqac-${subslug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data.page;
  } catch (err) {
    return null;
  }
}

export default async function IqacSubPage({ params }: { params: Promise<{ subslug: string }> | { subslug: string } }) {
  const resolvedParams = await params;
  const subslug = resolvedParams.subslug;
  const page = await getPage(subslug);

  if (!page) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">404</h1>
        <p className="text-gray-600 mb-8 max-w-md">The IQAC page you are looking for does not exist or has been moved.</p>
        <a href="/" className="px-6 py-2.5 bg-[#8B0E2A] text-white font-bold rounded-lg hover:bg-[#700B22] transition-colors">Return Home</a>
      </div>
    );
  }

  return (
    <>
      <PageBanner
        title={page.bannerTitle || page.title}
        subtitle={page.bannerSubtitle}
        breadcrumbs={[{ label: 'IQAC', href: '/iqac' }, { label: page.title }]}
      />
      {!page.sections || page.sections.length === 0 ? (
        <section className="bg-white py-20 text-center">
          <div className="container-nrec">
            <p className="text-gray-500 italic text-lg font-light">Content will be updated soon</p>
          </div>
        </section>
      ) : (
        <CmsRenderer sections={page.sections} />
      )}
    </>
  );
}
