import { useTranslation } from 'react-i18next';
import { Top404Entry } from '@/pages/monitoring/hooks/useMonitoringData';

interface NotFoundTableProps {
  top404: Top404Entry[];
}

export default function NotFoundTable({ top404 }: NotFoundTableProps) {
  const { t } = useTranslation();

  if (top404.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
            <i className="ri-error-warning-line text-red-600 text-lg"></i>
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-900">
              {t('monitoring.notFound.title') || 'Top URLs 404'}
            </h3>
            <p className="text-sm text-slate-500">
              {t('monitoring.notFound.empty') || 'Aucune erreur 404 détectée sur cette période'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="flex items-center gap-3 p-5 border-b border-slate-100">
        <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
          <i className="ri-error-warning-line text-red-600 text-lg"></i>
        </div>
        <div>
          <h3 className="text-base font-semibold text-slate-900">
            {t('monitoring.notFound.title') || 'Top URLs 404'}
          </h3>
          <p className="text-sm text-slate-500">
            {t('monitoring.notFound.subtitle') || 'Pages les plus fréquemment introuvables'}
          </p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                {t('monitoring.notFound.url') || 'URL'}
              </th>
              <th className="px-5 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">
                {t('monitoring.notFound.count') || 'Occurrences'}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {top404.map((entry) => (
              <tr key={entry.url} className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <i className="ri-link text-slate-400 text-sm w-4 h-4 flex items-center justify-center"></i>
                    <span className="text-sm text-slate-700 font-mono truncate max-w-xs" title={entry.url}>
                      {entry.url}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-3 text-right">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
                    {entry.count}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}



