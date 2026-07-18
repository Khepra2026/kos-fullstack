// app/dashboard/page.tsx
import { api } from '@/lib/api-client';

export default async function Dashboard() {
  const docs = await api.admin.getDocuments();
  const health = await api.seo.getHealth();
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard KOS</h1>
      <div className="space-y-2">
        <p>Documents: {docs.data?.length ?? 0}</p>
        <p>SEO Score: {health.data?.score ?? 'N/A'}</p>
        <p className="text-sm text-gray-500">Status: {docs.status}</p>
      </div>
    </div>
  );
}
