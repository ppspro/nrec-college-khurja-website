import { Suspense } from 'react';
import CurriculumForm from '@/components/admin/CurriculumForm';

export default function NewCurriculumPage() {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <CurriculumForm />
    </Suspense>
  );
}
