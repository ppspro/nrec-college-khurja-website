'use client';
import { Suspense } from 'react';
import FacultyForm from '@/components/admin/FacultyForm';

export default function EditPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading form...</div>}>
      <FacultyForm />
    </Suspense>
  );
}
