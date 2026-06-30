import CurriculumForm from '@/components/admin/CurriculumForm';

export default function EditCurriculumPage({ params }: { params: Promise<{ id: string }> }) {
  return <CurriculumForm params={params} />;
}
