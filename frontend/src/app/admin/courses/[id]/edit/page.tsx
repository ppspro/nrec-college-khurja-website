import CourseForm from '@/components/admin/CourseForm';
export default function EditCoursePage({ params }: { params: Promise<{ id: string }> }) {
  return <CourseForm params={params} />;
}
