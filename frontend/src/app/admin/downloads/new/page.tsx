import { Suspense } from 'react';
import DownloadForm from '@/components/admin/DownloadForm';

export default function NewDownloadPage() {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <DownloadForm />
    </Suspense>
  );
}
