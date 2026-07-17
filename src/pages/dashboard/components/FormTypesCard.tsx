import { useTranslation } from 'react-i18next';
import { LeadsByFormType, DashboardStats } from '@/pages/dashboard/hooks/useDashboardData';

interface FormTypesCardProps {
  leadsByFormType: LeadsByFormType[];
  stats: DashboardStats | null;
}

export default function FormTypesCard({ leadsByFormType, stats }: FormTypesCardProps) {
  const { t } = useTranslation();

  if (!leadsByFormType.length) return null;

  const total = stats?.totalLeads || 1;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
      <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
        <i className="ri-file-list-3-line text-teal-500 w-5 h-5 flex items-center justify-center"></i>
        {t('dashboard.formTypes.title')}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {leadsByFormType.map((item) => (
          <div key={item.form_type} className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-4 border border-slate-200">
            <div className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">{item.count}</div>
            <div className="text-sm font-medium text-slate-600">
              {t(`dashboard.formType.${item.form_type}`, item.form_type)}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {((item.count / total) * 100).toFixed(1)}% {t('dashboard.formTypes.ofTotal')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}