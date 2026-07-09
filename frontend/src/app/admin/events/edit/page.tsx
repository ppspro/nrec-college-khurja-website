'use client';
import { Suspense } from 'react';
import EventForm from '@/components/admin/EventForm';

export default function EditPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading form...</div>}>
      <EventForm />
    </Suspense>
  );
}
