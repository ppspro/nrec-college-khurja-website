import { Suspense } from 'react';
import CourseForm from '@/components/admin/CourseForm';

export default function NewCoursePage() {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <CourseForm />
    </Suspense>
  );
}
