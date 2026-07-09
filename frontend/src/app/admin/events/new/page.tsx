import { Suspense } from 'react';
import EventForm from '@/components/admin/EventForm';

export default function NewEventPage() {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <EventForm />
    </Suspense>
  );
}
