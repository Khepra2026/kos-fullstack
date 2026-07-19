import { useNavigate } from 'react-router-dom';
import { usePipelineAnalytics } from '@/pages/reporting-commercial/hooks/usePipelineAnalytics';

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);
}

export default function ClosingActionsPanel() {
  const navigate = useNavigate();
  const { leads, proposals } = usePipelineAnalytics();

  const hotLeads = leads.filter((l) => (l.lead_score || 0) >= 75 && l.pipeline_stage !== 'closed_won' && l.pipeline_stage !== 'closed_lost');
  const proposalsPending = proposals.filter((p) => p.status === 'sent');
  const proposalsViewedNotAnswered = proposals.filter((p) => p.viewed_at && !p.accepted_at);
  const nurturingLeads = leads.filter((l) => ['contact_engaged', 'lead_hot'].includes(l.pipeline_stage) && !l.meeting_scheduled_at);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Actions de Closing Recommandées</h3>
            <p className="text-sm text-slate-500 mt-0.5">Pilotage automatique des missions — basé sur le scoring temps réel</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/crm')}
              className="px-3 py-1.5 bg-teal-50 text-teal-700 rounded-lg text-xs font-medium hover:bg-teal-100 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5"
              type="button"
            >
              <i className="ri-kanban-view w-3 h-3 flex items-center justify-center"></i>
              CRM Pipeline
            </button>
            <button
              onClick={() => navigate('/crm')}
              className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5"
              type="button"
            >
              <i className="ri-mail-send-line w-3 h-3 flex items-center justify-center"></i>
              Nurturing MQL
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
            <div className="flex items-center gap-2 mb-2">
              <i className="ri-fire-line text-amber-600 w-4 h-4 flex items-center justify-center"></i>
              <span className="text-xs font-semibold text-amber-800">Hot Leads à contacter</span>
            </div>
            <div className="text-2xl font-bold text-amber-700 mb-1">{hotLeads.length}</div>
            <div className="text-xs text-amber-600 mb-3">
              Score ≥ 75 · Valeur : {formatCurrency(hotLeads.reduce((s, l) => s + (l.deal_value || 0), 0))}
            </div>
            <div className="space-y-1.5 max-h-24 overflow-y-auto">
              {hotLeads.slice(0, 3).map((lead) => (
                <div key={lead.id} className="flex items-center justify-between text-xs">
                  <span className="text-slate-700 truncate">{lead.full_name}</span>
                  <span className="text-amber-600 font-bold">{lead.lead_score}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate('/crm')}
              className="mt-3 w-full py-1.5 bg-amber-100 text-amber-700 rounded-lg text-xs font-medium hover:bg-amber-200 transition-colors cursor-pointer whitespace-nowrap"
              type="button"
            >
              Voir dans le CRM
            </button>
          </div>

          <div className="p-4 bg-teal-50 rounded-xl border border-teal-100">
            <div className="flex items-center gap-2 mb-2">
              <i className="ri-file-paper-line text-teal-600 w-4 h-4 flex items-center justify-center"></i>
              <span className="text-xs font-semibold text-teal-800">Propositions en attente</span>
            </div>
            <div className="text-2xl font-bold text-teal-700 mb-1">{proposalsPending.length}</div>
            <div className="text-xs text-teal-600 mb-3">
              Valeur : {formatCurrency(proposalsPending.reduce((s, p) => s + (p.amount || 0), 0))}
            </div>
            <div className="space-y-1.5 max-h-24 overflow-y-auto">
              {proposalsPending.slice(0, 3).map((prop) => (
                <div key={prop.id} className="flex items-center justify-between text-xs">
                  <span className="text-slate-700 truncate">{prop.client_name}</span>
                  <span className="text-teal-600 font-bold">{formatCurrency(prop.amount)}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate('/proposals')}
              className="mt-3 w-full py-1.5 bg-teal-100 text-teal-700 rounded-lg text-xs font-medium hover:bg-teal-200 transition-colors cursor-pointer whitespace-nowrap"
              type="button"
            >
              Voir les Propositions
            </button>
          </div>

          <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
            <div className="flex items-center gap-2 mb-2">
              <i className="ri-eye-line text-orange-600 w-4 h-4 flex items-center justify-center"></i>
              <span className="text-xs font-semibold text-orange-800">Vues mais non répondues</span>
            </div>
            <div className="text-2xl font-bold text-orange-700 mb-1">{proposalsViewedNotAnswered.length}</div>
            <div className="text-xs text-orange-600 mb-3">
              Relance prioritaire recommandée
            </div>
            <div className="space-y-1.5 max-h-24 overflow-y-auto">
              {proposalsViewedNotAnswered.slice(0, 3).map((prop) => (
                <div key={prop.id} className="flex items-center justify-between text-xs">
                  <span className="text-slate-700 truncate">{prop.client_name}</span>
                  <span className="text-orange-600 font-bold">{prop.view_count} vues</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate('/proposals')}
              className="mt-3 w-full py-1.5 bg-orange-100 text-orange-700 rounded-lg text-xs font-medium hover:bg-orange-200 transition-colors cursor-pointer whitespace-nowrap"
              type="button"
            >
              Relancer maintenant
            </button>
          </div>

          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div className="flex items-center gap-2 mb-2">
              <i className="ri-mail-send-line text-blue-600 w-4 h-4 flex items-center justify-center"></i>
              <span className="text-xs font-semibold text-blue-800">MQL en Nurturing</span>
            </div>
            <div className="text-2xl font-bold text-blue-700 mb-1">{nurturingLeads.length}</div>
            <div className="text-xs text-blue-600 mb-3">
              Sans RDV · Valeur : {formatCurrency(nurturingLeads.reduce((s, l) => s + (l.deal_value || 0), 0))}
            </div>
            <div className="space-y-1.5 max-h-24 overflow-y-auto">
              {nurturingLeads.slice(0, 3).map((lead) => (
                <div key={lead.id} className="flex items-center justify-between text-xs">
                  <span className="text-slate-700 truncate">{lead.full_name}</span>
                  <span className="text-blue-600 font-bold">{lead.lead_score}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate('/crm')}
              className="mt-3 w-full py-1.5 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-200 transition-colors cursor-pointer whitespace-nowrap"
              type="button"
            >
              Lancer le Nurturing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}



