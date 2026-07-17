import { useTranslation } from 'react-i18next';
import { RecentDownload } from '@/pages/dashboard/hooks/useDashboardData';

interface DownloadsTableProps {
  downloads: RecentDownload[];
}

export default function DownloadsTable({ downloads }: DownloadsTableProps) {
  const { t } = useTranslation();

  if (!downloads.length) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mt-8">
      <div className="p-4 md:p-6 border-b border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <i className="ri-download-2-line text-teal-500 w-5 h-5 flex items-center justify-center"></i>
          {t('dashboard.downloads.title')}
          <span className="ml-2 text-xs font-normal text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
            {downloads.length}
          </span>
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider whitespace-nowrap">
                {t('dashboard.downloads.table.date')}
              </th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider whitespace-nowrap">
                {t('dashboard.downloads.table.resource')}
              </th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider whitespace-nowrap">
                {t('dashboard.downloads.table.contact')}
              </th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider whitespace-nowrap">
                {t('dashboard.downloads.table.country')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {downloads.map((dl) => (
              <tr key={dl.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  {new Date(dl.created_at).toLocaleDateString('fr-FR', {
                    day: '2-digit',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                  {dl.resource_name || t('dashboard.downloads.unknownResource')}
                </td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-slate-900">{dl.first_name || '-'}</div>
                  <div className="text-xs text-slate-500">{dl.email || '-'}</div>
                </td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  {dl.country || '-'}
                  {dl.organization && <div className="text-xs text-slate-400">{dl.organization}</div>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}