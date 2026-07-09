'use client';
import { Suspense } from 'react';
import SliderForm from '@/components/admin/SliderForm';

export default function EditPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading form...</div>}>
      <SliderForm />
    </Suspense>
  );
}
