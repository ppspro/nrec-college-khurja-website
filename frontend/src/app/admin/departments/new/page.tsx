import { Suspense } from 'react';
import DepartmentForm from '@/components/admin/DepartmentForm';

export default function NewDepartmentPage() {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <DepartmentForm />
    </Suspense>
  );
}
