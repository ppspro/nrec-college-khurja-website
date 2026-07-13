'use client';

import React from 'react';
import CmsRenderer from '@/components/cms/CmsRenderer';
import EmptyState from '@/components/ui/EmptyState';
import PageSidebar from '@/components/ui/PageSidebar';

interface GenericTemplateProps {
  slug: string;
  sections: any[];
}

export default function GenericTemplate({ slug, sections }: GenericTemplateProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
      {/* Main Content Area */}
      <div className="lg:col-span-2 space-y-8">
        {!sections || sections.length === 0 ? (
          <EmptyState
            title="Page Under Maintenance"
            description="This page is currently being updated by the administration. Please check again later."
          />
        ) : (
          <div className="bg-white border border-gray-100 rounded-[28px] p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] overflow-hidden">
            <CmsRenderer sections={sections} />
          </div>
        )}
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-1">
        <PageSidebar currentSlug={slug} />
      </div>
    </div>
  );
}
