import DepartmentForm from '@/components/admin/DepartmentForm';
export default function EditDepartmentPage({ params }: { params: Promise<{ id: string }> }) {
  return <DepartmentForm params={params} />;
}
