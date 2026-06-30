import FacultyForm from '@/components/admin/FacultyForm';
export default function EditFacultyPage({ params }: { params: Promise<{ id: string }> }) {
  return <FacultyForm params={params} />;
}
