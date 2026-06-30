import DownloadForm from '@/components/admin/DownloadForm';
export default function EditDownloadPage({ params }: { params: Promise<{ id: string }> }) {
  return <DownloadForm params={params} />;
}
