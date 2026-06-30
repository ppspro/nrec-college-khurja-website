import EventForm from '@/components/admin/EventForm';
export default function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  return <EventForm params={params} />;
}
