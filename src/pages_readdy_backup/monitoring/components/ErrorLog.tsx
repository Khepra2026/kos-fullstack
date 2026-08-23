import { useTranslation } from 'react-i18next';
import { MonitoringLog } from '@/pages/monitoring/hooks/useMonitoringData';

interface ErrorLogProps {
  logs: MonitoringLog[];
}

export default function ErrorLog({ logs }: ErrorLogProps) {
  const { t } = useTranslation();

  const errorLogs = logs.filter((l) => l.type === 'error' || l.type === '404');

  if (errorLogs.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
            <i className="ri-bug-line text-amber-600 text-lg"></i>
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-900">
              {t('monitoring.errorLog.title') || 'Journal d\'erreurs'}
            </h3>
            <p className="text-sm text-slate-500">
              {t('monitoring.errorLog.empty') || 'Aucune erreur récente'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="flex items-center gap-3 p-5 border-b border-slate-100">
        <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
          <i className="ri-bug-line text-amber-600 text-lg"></i>
        </div>
        <div>
          <h3 className="text-base font-semibold text-slate-900">
            {t('monitoring.errorLog.title') || 'Journal d\'erreurs'}
          </h3>
          <p className="text-sm text-slate-500">
            {t('monitoring.errorLog.subtitle') || 'Dernières erreurs et 404 enregistrées'}
          </p>
        </div>
      </div>
      <div className="overflow-x-auto max-h-96 overflow-y-auto">
        <table className="w-full">
          <thead className="sticky top-0 bg-white">
            <tr className="bg-slate-50">
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">
                {t('monitoring.errorLog.type') || 'Type'}
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                {t('monitoring.errorLog.message') || 'Message'}
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">
                {t('monitoring.errorLog.url') || 'URL'}
              </th>
              <th className="px-5 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">
                {t('monitoring.errorLog.date') || 'Date'}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {errorLogs.slice(0, 50).map((log) => (
              <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-3 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    log.type === '404'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    {log.type === '404' ? '404' : 'Err'}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <span className="text-sm text-slate-700 block truncate max-w-xs">
                    {log.error_message || 'Page non trouvée'}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <span className="text-sm text-slate-500 font-mono truncate max-w-xs block" title={log.url}>
                    {log.url}
                  </span>
                </td>
                <td className="px-5 py-3 text-right whitespace-nowrap">
                  <span className="text-xs text-slate-500">
                    {new Date(log.created_at).toLocaleString('fr-FR', {
                      day: '2-digit',
                      month: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
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



