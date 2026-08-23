import { useTranslation } from 'react-i18next';
import { RecentLead } from '@/pages/dashboard/hooks/useDashboardData';

interface LeadTableProps {
  leads: RecentLead[];
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

export default function LeadTable({ leads }: LeadTableProps) {
  const { t } = useTranslation();

  if (!leads.length) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
        <i className="ri-user-line text-4xl text-slate-300 mb-3 block"></i>
        <p className="text-slate-500">{t('dashboard.noData')}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 md:p-6 border-b border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <i className="ri-time-line text-teal-500 w-5 h-5 flex items-center justify-center"></i>
          {t('dashboard.recentLeads.title')}
          <span className="ml-2 text-xs font-normal text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
            {leads.length}
          </span>
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider whitespace-nowrap">
                {t('dashboard.recentLeads.table.date')}
              </th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider whitespace-nowrap">
                {t('dashboard.recentLeads.table.contact')}
              </th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider whitespace-nowrap">
                {t('dashboard.recentLeads.table.organization')}
              </th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider whitespace-nowrap">
                {t('dashboard.recentLeads.table.type')}
              </th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider whitespace-nowrap">
                {t('dashboard.recentLeads.table.score')}
              </th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider whitespace-nowrap">
                {t('dashboard.recentLeads.table.status')}
              </th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider whitespace-nowrap">
                {t('dashboard.recentLeads.table.source')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  {new Date(lead.created_at).toLocaleDateString('fr-FR', {
                    day: '2-digit',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-slate-900">{lead.full_name || '-'}</div>
                  <div className="text-xs text-slate-500">{lead.email || '-'}</div>
                  {lead.phone && <div className="text-xs text-slate-400">{lead.phone}</div>}
                </td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  {lead.organization || '-'}
                  {lead.country && <div className="text-xs text-slate-400">{lead.country}</div>}
                </td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-medium">
                    {t(`dashboard.formType.${lead.form_type || 'contact'}`, lead.form_type || 'contact')}
                  </span>
                </td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">{lead.lead_score || 0}</span>
                    <div className="w-12 md:w-16 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-teal-500 to-teal-600 h-full rounded-full"
                        style={{ width: `${lead.lead_score || 0}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[lead.status] || 'bg-gray-100 text-gray-800'}`}>
                    {t(`dashboard.status.${lead.status}`, lead.status)}
                  </span>
                </td>
                <td className="px-4 md:px-6 py-4 text-sm text-slate-600 max-w-[140px] truncate">
                  {lead.source_page || 'direct'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}



