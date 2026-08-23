import { useState } from 'react';
import { CrmLead, PipelineStage } from '@/pages/crm/hooks/useCrmData';
import LeadScoreRealtimeBadge from '';
import { useLeadScoreRealtime } from '@/hooks/useLeadScoreRealtime';

interface CrmFunnelViewProps {
  leads: CrmLead[];
  pipelineStages: PipelineStage[];
  onLeadClick: (lead: CrmLead) => void;
  onStageChange: (leadId: string, stage: string) => void;
}

interface FunnelStage {
  id: string;
  label: string;
  icon: string;
  color: string;
  bg: string;
  border: string;
  stageIds: string[];
  description: string;
  kpiLabel: string;
  targetConversion: string;
}

const FUNNEL_STAGES: FunnelStage[] = [
  {
    id: 'leads',
    label: 'Leads',
    icon: 'ri-user-add-line',
    color: 'text-slate-700',
    bg: 'bg-slate-50',
    border: 'border-slate-200',
    stageIds: ['lead_generated', 'lead_qualified'],
    description: 'Prospects générés — formulaires, téléchargements, diagnostics',
    kpiLabel: 'Générés',
    targetConversion: '100%',
  },
  {
    id: 'mql',
    label: 'MQL',
    icon: 'ri-star-line',
    color: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    stageIds: ['contact_engaged', 'lead_hot'],
    description: 'Marketing Qualified Leads — engagés, scoring ≥ 50',
    kpiLabel: 'MQL',
    targetConversion: '35–45%',
  },
  {
    id: 'sql',
    label: 'SQL',
    icon: 'ri-briefcase-line',
    color: 'text-orange-700',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    stageIds: ['meeting_scheduled'],
    description: 'Sales Qualified Leads — RDV fixé, besoin confirmé',
    kpiLabel: 'SQL',
    targetConversion: '15–25%',
  },
  {
    id: 'proposals',
    label: 'Propositions',
    icon: 'ri-file-paper-2-line',
    color: 'text-teal-700',
    bg: 'bg-teal-50',
    border: 'border-teal-200',
    stageIds: ['proposal_sent'],
    description: 'Offres commerciales transmises — en attente de décision',
    kpiLabel: 'Propositions',
    targetConversion: '8–15%',
  },
  {
    id: 'contracts',
    label: 'Contrats',
    icon: 'ri-pen-nib-line',
    color: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    stageIds: ['mission_signed', 'mission_in_progress', 'client_active', 'client_recurring'],
    description: 'Missions signées, clients actifs et récurrents',
    kpiLabel: 'Signés',
    targetConversion: '3–8%',
  },
];

const NEXT_STAGE_MAP: Record<string, string> = {
  lead_generated: 'lead_qualified',
  lead_qualified: 'contact_engaged',
  contact_engaged: 'lead_hot',
  lead_hot: 'meeting_scheduled',
  meeting_scheduled: 'proposal_sent',
  proposal_sent: 'mission_signed',
};

export default function CrmFunnelView({
  leads,
  pipelineStages,
  onLeadClick,
  onStageChange,
}: CrmFunnelViewProps) {
  const [expandedFunnel, setExpandedFunnel] = useState<string | null>('mql');
  const [selectedLead, setSelectedLead] = useState<string | null>(null);
  const { processActivity } = useLeadScoreRealtime();

  const getStageLeads = (stageIds: string[]) =>
    leads.filter(l => stageIds.includes(l.pipeline_stage));

  const totalLeads = leads.length;

  const getConversionRate = (funnelIdx: number) => {
    if (funnelIdx === 0) return '100%';
    const curr = getStageLeads(FUNNEL_STAGES[funnelIdx].stageIds).length;
    const prev = getStageLeads(FUNNEL_STAGES[funnelIdx - 1].stageIds).length;
    if (prev === 0) return '0%';
    return `${Math.round((curr / prev) * 100)}%`;
  };

  const getGlobalConversion = (funnelIdx: number) => {
    if (totalLeads === 0) return '0%';
    const curr = getStageLeads(FUNNEL_STAGES[funnelIdx].stageIds).length;
    return `${Math.round((curr / totalLeads) * 100)}%`;
  };

  const pipelineValue = leads
    .filter(l => ['proposal_sent', 'mission_signed', 'mission_in_progress', 'client_active', 'client_recurring'].includes(l.pipeline_stage))
    .reduce((sum, l) => sum + (l.deal_value || 0) * (l.probability || 1) / 100, 0);

  return (
    <div className="space-y-6">
      {/* Funnel KPI strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Pipeline Total', value: `${Math.round(pipelineValue).toLocaleString('fr-FR')} FCFA`, icon: 'ri-money-cny-circle-line', color: 'text-teal-700', bg: 'bg-teal-50' },
          { label: 'Leads → Contrats', value: getGlobalConversion(4), icon: 'ri-percent-line', color: 'text-emerald-700', bg: 'bg-emerald-50' },
          { label: 'MQL actifs', value: String(getStageLeads(FUNNEL_STAGES[1].stageIds).length), icon: 'ri-star-line', color: 'text-amber-700', bg: 'bg-amber-50' },
          { label: 'Propositions ouvertes', value: String(getStageLeads(FUNNEL_STAGES[3].stageIds).length), icon: 'ri-file-paper-2-line', color: 'text-teal-700', bg: 'bg-teal-50' },
        ].map((kpi, i) => (
          <div key={i} className={`${kpi.bg} rounded-xl border border-slate-100 p-4`}>
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-8 h-8 rounded-lg bg-white flex items-center justify-center ${kpi.color}`}>
                <i className={`${kpi.icon} text-sm w-4 h-4 flex items-center justify-center`}></i>
              </div>
            </div>
            <div className={`text-2xl font-bold ${kpi.color} mb-0.5`}>{kpi.value}</div>
            <div className="text-xs text-slate-500 font-medium">{kpi.label}</div>
          </div>
        ))}
      </div>

      {/* Funnel visual */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <i className="ri-filter-line text-teal-500 w-4 h-4 flex items-center justify-center"></i>
            Pipeline Commercial — Funnel Complet avec Scoring Temps Réel
          </h2>
          <span className="text-xs text-slate-400">{totalLeads} leads total</span>
        </div>

        {/* Funnel stages */}
        <div className="p-5 space-y-3">
          {FUNNEL_STAGES.map((stage, idx) => {
            const stageLeads = getStageLeads(stage.stageIds);
            const count = stageLeads.length;
            const pct = totalLeads > 0 ? (count / totalLeads) * 100 : 0;
            const isExpanded = expandedFunnel === stage.id;
            const stepConv = getConversionRate(idx);
            const globalConv = getGlobalConversion(idx);

            return (
              <div key={stage.id} className="relative">
                {/* Funnel bar */}
                <div
                  className={`rounded-xl border-2 ${stage.border} overflow-hidden cursor-pointer transition-all duration-300 ${isExpanded ? 'shadow-md' : 'hover:shadow-sm'}`}
                  onClick={() => setExpandedFunnel(isExpanded ? null : stage.id)}
                >
                  <div className={`flex items-center gap-3 px-4 py-3 ${stage.bg}`}>
                    {/* Funnel shape indicator */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${stage.bg.replace('50', '100')}`}>
                      <i className={`${stage.icon} ${stage.color} text-lg w-5 h-5 flex items-center justify-center`}></i>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1.5">
                        <span className={`text-sm font-bold ${stage.color}`}>{stage.label}</span>
                        <span className={`text-xl font-bold ${stage.color}`}>{count}</span>
                        <span className="text-xs text-slate-400">{stage.description}</span>
                      </div>
                      {/* Progress bar */}
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-white rounded-full overflow-hidden border border-slate-100">
                          <div
                            className={`h-full rounded-full transition-all duration-700 ${
                              idx === 4 ? 'bg-emerald-500' :
                              idx === 3 ? 'bg-teal-500' :
                              idx === 2 ? 'bg-orange-500' :
                              idx === 1 ? 'bg-amber-500' : 'bg-slate-400'
                            }`}
                            style={{ width: `${Math.max(2, pct)}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-400 flex-shrink-0">{Math.round(pct)}%</span>
                      </div>
                    </div>

                    <div className="flex-shrink-0 text-right">
                      <div className="flex items-center gap-3">
                        {idx > 0 && (
                          <div className="text-center">
                            <span className="block text-xs font-bold text-slate-700">{stepConv}</span>
                            <span className="block text-[10px] text-slate-400">vs préc.</span>
                          </div>
                        )}
                        <div className="text-center">
                          <span className="block text-xs font-bold text-slate-500">{stage.targetConversion}</span>
                          <span className="block text-[10px] text-slate-400">cible</span>
                        </div>
                        {isExpanded ? <i className="ri-arrow-up-s-line text-slate-400 text-lg"></i> : <i className="ri-arrow-down-s-line text-slate-400 text-lg"></i>}
                      </div>
                    </div>
                  </div>

                  {/* Expanded leads list */}
                  {isExpanded && stageLeads.length > 0 && (
                    <div className="border-t border-slate-100 p-3 bg-white">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {stageLeads.map((lead) => {
                          const stage2 = pipelineStages.find(s => s.id === lead.pipeline_stage);
                          const nextStage = NEXT_STAGE_MAP[lead.pipeline_stage];
                          return (
                            <div
                              key={lead.id}
                              className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-sm transition-all cursor-pointer group"
                              onClick={(e) => { e.stopPropagation(); onLeadClick(lead); }}
                            >
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                {lead.full_name?.charAt(0)?.toUpperCase() || '?'}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-0.5">
                                  <span className="text-xs font-bold text-slate-900 truncate">{lead.full_name}</span>
                                  {lead.lead_score && (
                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 ${
                                      lead.lead_score >= 70 ? 'bg-amber-50 text-amber-700' :
                                      lead.lead_score >= 45 ? 'bg-orange-50 text-orange-700' :
                                      'bg-slate-100 text-slate-500'
                                    }`}>{lead.lead_score}</span>
                                  )}
                                </div>
                                <div className="text-[10px] text-slate-400 truncate">{lead.organization}</div>
                                {/* Lead Score Realtime Badge */}
                                <div className="mt-1.5">
                                  <LeadScoreRealtimeBadge
                                    leadId={lead.id}
                                    initialScore={lead.lead_score || 0}
                                    pipelineStage={lead.pipeline_stage}
                                  />
                                </div>
                                <div className="flex items-center justify-between mt-1.5">
                                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${stage2?.color || 'text-slate-600'} ${stage2?.bgColor || 'bg-slate-100'}`}>
                                    {stage2?.label || lead.pipeline_stage}
                                  </span>
                                  {nextStage && (
                                    <button
                                      type="button"
                                      onClick={(e) => { e.stopPropagation(); onStageChange(lead.id, nextStage); }}
                                      className="text-[10px] text-teal-600 hover:text-teal-800 font-medium flex items-center gap-0.5 cursor-pointer whitespace-nowrap"
                                    >
                                      <i className="ri-arrow-right-line text-xs"></i>
                                      Avancer
                                    </button>
                                  )}
                                </div>
                                {lead.deal_value && (
                                  <div className="text-[10px] text-teal-600 mt-1 font-medium">
                                    {lead.deal_value.toLocaleString('fr-FR')} FCFA
                                  </div>
                                )}
                                {/* Scoring actions */}
                                <div className="flex items-center gap-1 mt-1.5">
                                  <button
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); processActivity(lead.id, 'email_opened'); }}
                                    className="px-1.5 py-0.5 rounded text-[10px] bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors cursor-pointer whitespace-nowrap"
                                    title="+5 pts"
                                  >
                                    <i className="ri-eye-line w-3 h-3 flex items-center justify-center inline"></i> +5
                                  </button>
                                  <button
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); processActivity(lead.id, 'email_clicked'); }}
                                    className="px-1.5 py-0.5 rounded text-[10px] bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors cursor-pointer whitespace-nowrap"
                                    title="+10 pts"
                                  >
                                    <i className="ri-cursor-line w-3 h-3 flex items-center justify-center inline"></i> +10
                                  </button>
                                  <button
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); processActivity(lead.id, 'calendar_clicked'); }}
                                    className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors cursor-pointer whitespace-nowrap"
                                    title="+12 pts"
                                  >
                                    <i className="ri-calendar-line w-3 h-3 flex items-center justify-center inline"></i> +12
                                  </button>
                                  <button
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); processActivity(lead.id, 'meeting_scheduled'); }}
                                    className="px-1.5 py-0.5 rounded text-[10px] bg-teal-50 text-teal-600 hover:bg-teal-100 transition-colors cursor-pointer whitespace-nowrap"
                                    title="+20 pts"
                                  >
                                    <i className="ri-calendar-check-line w-3 h-3 flex items-center justify-center inline"></i> +20
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {isExpanded && stageLeads.length === 0 && (
                    <div className="border-t border-slate-100 p-5 bg-white text-center text-slate-400">
                      <i className="ri-inbox-line text-2xl mb-1 block"></i>
                      <span className="text-xs">Aucun lead à ce stade</span>
                    </div>
                  )}
                </div>

                {/* Arrow between stages */}
                {idx < FUNNEL_STAGES.length - 1 && (
                  <div className="flex items-center justify-center py-1">
                    <div className="flex flex-col items-center gap-0.5">
                      <i className="ri-arrow-down-s-line text-slate-300 text-xl"></i>
                      <span className="text-[10px] text-slate-300">{stepConv !== '100%' ? `${stepConv} conversion` : ''}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom summary */}
        <div className="px-5 py-4 bg-slate-50 border-t border-slate-100">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-500 font-medium">Cycle complet :</span>
            {FUNNEL_STAGES.map((stage, i) => (
              <span key={stage.id}>
                <span className={`text-xs font-bold ${stage.color}`}>
                  {getStageLeads(stage.stageIds).length} {stage.label}
                </span>
                {i < FUNNEL_STAGES.length - 1 && (
                  <span className="text-slate-300 mx-1.5">→</span>
                )}
              </span>
            ))}
            <span className="ml-auto text-xs text-teal-600 font-bold">
              Taux global : {getGlobalConversion(4)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}



