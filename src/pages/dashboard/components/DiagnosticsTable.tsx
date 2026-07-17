import { useTranslation } from 'react-i18next';
import { RecentDiagnostic } from '@/pages/dashboard/hooks/useDashboardData';

interface DiagnosticsTableProps {
  diagnostics: RecentDiagnostic[];
}

export default function DiagnosticsTable({ diagnostics }: DiagnosticsTableProps) {
  const { t } = useTranslation();

  if (!diagnostics.length) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mt-8">
      <div className="p-4 md:p-6 border-b border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <i className="ri-stethoscope-line text-teal-500 w-5 h-5 flex items-center justify-center"></i>
          {t('dashboard.diagnostics.title')}
          <span className="ml-2 text-xs font-normal text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
            {diagnostics.length}
          </span>
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider whitespace-nowrap">
                {t('dashboard.diagnostics.table.date')}
              </th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider whitespace-nowrap">
                {t('dashboard.diagnostics.table.tool')}
              </th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider whitespace-nowrap">
                {t('dashboard.diagnostics.table.score')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {diagnostics.map((diag) => (
              <tr key={diag.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  {diag.completed_at
                    ? new Date(diag.completed_at).toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : '-'}
                </td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                  {diag.tool_name}
                </td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">{diag.score ?? 0}</span>
                    <div className="w-12 md:w-16 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-teal-500 to-teal-600 h-full rounded-full"
                        style={{ width: `${diag.score ?? 0}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}