import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import NotificationBell from '@/pages/admin-notifications/components/NotificationBell';

interface DashboardHeaderProps {
  timeRange: '7d' | '30d' | '90d' | 'all';
  onTimeRangeChange: (range: '7d' | '30d' | '90d' | 'all') => void;
  onRefresh: () => void;
  loading: boolean;
}

export default function DashboardHeader({ timeRange, onTimeRangeChange, onRefresh, loading }: DashboardHeaderProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              type="button"
            >
              <i className="ri-arrow-left-line text-xl w-6 h-6 flex items-center justify-center"></i>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#c19a6b] to-[#a47c48] flex items-center justify-center">
                <i className="ri-dashboard-line text-white text-lg w-5 h-5 flex items-center justify-center"></i>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">{t('dashboard.header.title')}</h1>
                <p className="text-sm text-slate-600">{t('dashboard.header.subtitle')}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <NotificationBell />

            <button
              onClick={() => navigate('/admin-notifications')}
              className="px-4 py-2 bg-gradient-to-r from-[#c19a6b] to-[#a47c48] text-white rounded-lg text-sm font-medium hover:from-[#a47c48] hover:to-[#8b6a3a] transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2"
              type="button"
            >
              <i className="ri-notification-3-line w-4 h-4 flex items-center justify-center"></i>
              Alertes
            </button>

            <button
              onClick={() => navigate('/brand-guide')}
              className="px-4 py-2 bg-[#f5f3f0] text-[#c19a6b] border border-[#e5e3df] rounded-lg text-sm font-medium hover:bg-[#e5e3df] transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2"
              type="button"
            >
              <i className="ri-palette-line w-4 h-4 flex items-center justify-center"></i>
              Brand Guide
            </button>

            <button
              onClick={() => navigate('/reporting-commercial')}
              className="px-4 py-2 bg-[#f5f3f0] text-[#c19a6b] border border-[#e5e3df] rounded-lg text-sm font-medium hover:bg-[#e5e3df] transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2"
              type="button"
            >
              <i className="ri-bar-chart-grouped-line w-4 h-4 flex items-center justify-center"></i>
              Reporting
            </button>

            <button
              onClick={() => navigate('/proposals')}
              className="px-4 py-2 bg-[#f5f3f0] text-[#c19a6b] border border-[#e5e3df] rounded-lg text-sm font-medium hover:bg-[#e5e3df] transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2"
              type="button"
            >
              <i className="ri-file-paper-line w-4 h-4 flex items-center justify-center"></i>
              Propositions
            </button>

            <button
              onClick={() => navigate('/email-sequences')}
              className="px-4 py-2 bg-[#f5f3f0] text-[#c19a6b] border border-[#e5e3df] rounded-lg text-sm font-medium hover:bg-[#e5e3df] transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2"
              type="button"
            >
              <i className="ri-mail-send-line w-4 h-4 flex items-center justify-center"></i>
              Séquences
            </button>

            <button
              onClick={() => navigate('/crm')}
              className="px-4 py-2 bg-gradient-to-r from-[#c19a6b] to-[#a47c48] text-white rounded-lg text-sm font-medium hover:from-[#a47c48] hover:to-[#8b6a3a] transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2"
              type="button"
            >
              <i className="ri-kanban-view w-4 h-4 flex items-center justify-center"></i>
              CRM
            </button>
            <select
              value={timeRange}
              onChange={(e) => onTimeRangeChange(e.target.value as '7d' | '30d' | '90d' | 'all')}
              className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#c19a6b] focus:border-transparent bg-white"
            >
              <option value="7d">{t('dashboard.header.timeRange.7d')}</option>
              <option value="30d">{t('dashboard.header.timeRange.30d')}</option>
              <option value="90d">{t('dashboard.header.timeRange.90d')}</option>
              <option value="all">{t('dashboard.header.timeRange.all')}</option>
            </select>
            <button
              onClick={onRefresh}
              disabled={loading}
              className="px-4 py-2 bg-[#c19a6b] text-white rounded-lg text-sm font-medium hover:bg-[#a47c48] transition-colors whitespace-nowrap disabled:opacity-50 cursor-pointer flex items-center gap-2"
              type="button"
            >
              <i className="ri-refresh-line w-4 h-4 flex items-center justify-center"></i>
              {t('dashboard.header.refreshButton')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}