'use client';
import { Suspense } from 'react';
import CourseForm from '@/components/admin/CourseForm';

export default function EditPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading form...</div>}>
      <CourseForm />
    </Suspense>
  );
}
