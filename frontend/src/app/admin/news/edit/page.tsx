'use client';
import { Suspense } from 'react';
import NewsForm from '@/components/admin/NewsForm';

export default function EditPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading form...</div>}>
      <NewsForm />
    </Suspense>
  );
}
