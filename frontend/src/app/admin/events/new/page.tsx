import EventForm from '@/components/admin/EventForm';
export default function NewEventPage() {
  return <EventForm params={Promise.resolve({})} />;
}
