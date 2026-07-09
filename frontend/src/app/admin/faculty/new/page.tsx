import { Suspense } from 'react';
import FacultyForm from '@/components/admin/FacultyForm';

export default function NewFacultyPage() {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <FacultyForm />
    </Suspense>
  );
}
