import NewsForm from '@/components/admin/NewsForm';
export default function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  return <NewsForm params={params} />;
}
