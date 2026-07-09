import { Suspense } from 'react';
import SliderForm from '@/components/admin/SliderForm';

export default function NewSliderPage() {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <SliderForm />
    </Suspense>
  );
}
