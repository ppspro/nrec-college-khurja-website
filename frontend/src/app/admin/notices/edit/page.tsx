'use client';
import { Suspense } from 'react';
import NoticeForm from '@/components/admin/NoticeForm';

export default function EditPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading form...</div>}>
      <NoticeForm />
    </Suspense>
  );
}
