import DepartmentForm from '@/components/admin/DepartmentForm';
export default function NewDepartmentPage() {
  return <DepartmentForm params={Promise.resolve({})} />;
}
