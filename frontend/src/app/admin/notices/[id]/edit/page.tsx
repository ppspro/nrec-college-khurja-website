import NoticeForm from '@/components/admin/NoticeForm';
export default function EditNoticePage({ params }: { params: Promise<{ id: string }> }) {
  return <NoticeForm params={params} />;
}
