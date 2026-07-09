'use client';
import { Suspense } from 'react';
import DownloadForm from '@/components/admin/DownloadForm';

export default function EditPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading form...</div>}>
      <DownloadForm />
    </Suspense>
  );
}
