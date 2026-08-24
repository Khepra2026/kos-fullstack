import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SeoHead from '@/components/feature/SeoHead';
import LoginPage from '@/pages/dashboard/components/LoginPage';
import PipelineStatsCards from '';
import PipelineFunnelChart from '';
import DealValueChart from '';
import ConversionTimeline from '';
import RevenueProjection from '';
import SourcePerformanceTable from '';
import WinLossAnalysis from '';
import ClosingActionsPanel from '';

export default function ReportingCommercialPage() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('dashboard_auth');
    if (stored === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('dashboard_auth', 'true');
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <>
      <SeoHead
        title="Reporting Commercial — KHEPRA EXPERTS"
        description="Tableau de reporting commercial et analytics du pipeline de ventes KHEPRA EXPERTS"
        canonicalPath="/reporting-commercial"
        noIndex={true}
      />
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                  type="button"
                >
                  <i className="ri-arrow-left-line text-xl w-6 h-6 flex items-center justify-center"></i>
                </button>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#c19a6b] to-[#a47c48] flex items-center justify-center">
                    <i className="ri-bar-chart-grouped-line text-white text-lg w-5 h-5 flex items-center justify-center"></i>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900">Reporting Commercial</h1>
                    <p className="text-sm text-slate-600">Analytics avancés du pipeline de ventes</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate('/crm')}
                  className="px-4 py-2 bg-[#f5f3f0] text-[#c19a6b] border border-[#e5e3df] rounded-lg text-sm font-medium hover:bg-[#e5e3df] transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2"
                  type="button"
                >
                  <i className="ri-kanban-view w-4 h-4 flex items-center justify-center"></i>
                  CRM Pipeline
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
                  onClick={() => navigate('/dashboard')}
                  className="px-4 py-2 bg-gradient-to-r from-[#c19a6b] to-[#a47c48] text-white rounded-lg text-sm font-medium hover:from-[#a47c48] hover:to-[#8b6a3a] transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2"
                  type="button"
                >
                  <i className="ri-dashboard-line w-4 h-4 flex items-center justify-center"></i>
                  Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* KPIs */}
          <PipelineStatsCards />

          {/* Funnel + Timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <PipelineFunnelChart />
            <ConversionTimeline />
          </div>

          {/* Deal Value + Revenue */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <DealValueChart />
            <RevenueProjection />
          </div>

          {/* Closing Actions */}
          <div className="mb-8">
            <ClosingActionsPanel />
          </div>

          {/* Win/Loss + Sources */}
          <div className="mb-8">
            <WinLossAnalysis />
          </div>

          <div className="mb-8">
            <SourcePerformanceTable />
          </div>
        </div>
      </div>
    </>
  );
}



