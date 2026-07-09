import { Suspense } from 'react';
import NewsForm from '@/components/admin/NewsForm';

export default function NewNewsPage() {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <NewsForm />
    </Suspense>
  );
}
