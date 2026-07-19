import { useTranslation } from 'react-i18next';
import { LeadsBySource } from '@/pages/dashboard/hooks/useDashboardData';

interface SourcesCardProps {
  leadsBySource: LeadsBySource[];
}

export default function SourcesCard({ leadsBySource }: SourcesCardProps) {
  const { t } = useTranslation();

  if (!leadsBySource.length) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
      <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
        <i className="ri-links-line text-teal-500 w-5 h-5 flex items-center justify-center"></i>
        {t('dashboard.sources.title')}
      </h3>
      <div className="space-y-3">
        {leadsBySource.slice(0, 8).map((item, index) => (
          <div key={item.source_page} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <span className="w-6 h-6 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center text-xs font-bold text-slate-600 shrink-0">
                {index + 1}
              </span>
              <span className="text-sm text-slate-700 truncate">{item.source_page}</span>
            </div>
            <span className="text-sm font-bold text-slate-900 whitespace-nowrap ml-3">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}



