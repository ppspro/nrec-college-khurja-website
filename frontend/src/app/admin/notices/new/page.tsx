import { Suspense } from 'react';
import NoticeForm from '@/components/admin/NoticeForm';

export default function NewNoticePage() {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <NoticeForm />
    </Suspense>
  );
}
