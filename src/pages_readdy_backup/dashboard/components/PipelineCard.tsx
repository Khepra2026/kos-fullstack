import { useTranslation } from 'react-i18next';
import { LeadsByStatus, DashboardStats } from '@/pages/dashboard/hooks/useDashboardData';

interface PipelineCardProps {
  leadsByStatus: LeadsByStatus[];
  stats: DashboardStats | null;
}

const statusColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-800',
  email_1_sent: 'bg-purple-100 text-purple-800',
  email_2_sent: 'bg-purple-100 text-purple-800',
  email_3_sent: 'bg-purple-100 text-purple-800',
  meeting_scheduled: 'bg-yellow-100 text-yellow-800',
  qualified: 'bg-green-100 text-green-800',
  converted: 'bg-teal-100 text-teal-800',
  lost: 'bg-gray-100 text-gray-800',
};

export default function PipelineCard({ leadsByStatus, stats }: PipelineCardProps) {
  const { t } = useTranslation();

  if (!leadsByStatus.length) return null;

  const total = stats?.totalLeads || 1;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
      <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
        <i className="ri-flow-chart text-teal-500 w-5 h-5 flex items-center justify-center"></i>
        {t('dashboard.pipeline.title')}
      </h3>
      <div className="space-y-3">
        {leadsByStatus.map((item) => {
          const pct = (item.count / total) * 100;
          return (
            <div key={item.status} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${statusColors[item.status] || 'bg-gray-100 text-gray-800'}`}>
                  {t(`dashboard.status.${item.status}`, item.status)}
                </span>
                <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden min-w-[60px]">
                  <div
                    className="bg-gradient-to-r from-teal-500 to-teal-600 h-full rounded-full transition-all"
                    style={{ width: `${pct}%` }}
                  ></div>
                </div>
              </div>
              <span className="text-sm font-bold text-slate-900 whitespace-nowrap">{item.count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}



