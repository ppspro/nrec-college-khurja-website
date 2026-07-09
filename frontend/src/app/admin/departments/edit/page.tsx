'use client';
import { Suspense } from 'react';
import DepartmentForm from '@/components/admin/DepartmentForm';

export default function EditPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading form...</div>}>
      <DepartmentForm />
    </Suspense>
  );
}
