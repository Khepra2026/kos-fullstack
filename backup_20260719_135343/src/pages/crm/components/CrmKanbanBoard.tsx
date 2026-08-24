import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CrmLead, PipelineStage } from '@/pages/crm/hooks/useCrmData';

interface CrmKanbanBoardProps {
  leads: CrmLead[];
  pipelineStages: PipelineStage[];
  onStageChange: (leadId: string, stage: string) => void;
  onLeadClick: (lead: CrmLead) => void;
}

export default function CrmKanbanBoard({ leads, pipelineStages, onStageChange, onLeadClick }: CrmKanbanBoardProps) {
  const { t } = useTranslation();
  const [draggingLead, setDraggingLead] = useState<string | null>(null);
  const [dragOverStage, setDragOverStage] = useState<string | null>(null);

  const handleDragStart = (leadId: string) => {
    setDraggingLead(leadId);
  };

  const handleDragOver = (e: React.DragEvent, stageId: string) => {
    e.preventDefault();
    setDragOverStage(stageId);
  };

  const handleDrop = (e: React.DragEvent, stageId: string) => {
    e.preventDefault();
    if (draggingLead && dragOverStage) {
      onStageChange(draggingLead, stageId);
    }
    setDraggingLead(null);
    setDragOverStage(null);
  };

  const handleDragEnd = () => {
    setDraggingLead(null);
    setDragOverStage(null);
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-4 min-w-[1200px] pb-4">
        {pipelineStages.map((stage) => {
          const stageLeads = leads.filter((l) => l.pipeline_stage === stage.id);
          const isDropTarget = dragOverStage === stage.id;

          return (
            <div
              key={stage.id}
              className={`flex-1 min-w-[220px] max-w-[280px] rounded-xl border-2 transition-all ${
                isDropTarget ? 'border-teal-400 bg-teal-50/50' : stage.borderColor + ' ' + stage.bgColor
              }`}
              onDragOver={(e) => handleDragOver(e, stage.id)}
              onDrop={(e) => handleDrop(e, stage.id)}
              onDragLeave={() => setDragOverStage(null)}
            >
              {/* Stage Header */}
              <div className={`px-4 py-3 border-b ${stage.borderColor} rounded-t-xl`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${stage.bgColor.replace('bg-', 'bg-').replace('50', '400')}`}></div>
                    <h3 className={`text-sm font-bold ${stage.color}`}>{stage.label}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-600 bg-white px-2 py-0.5 rounded-full">
                      {stage.count}
                    </span>
                    {stage.value > 0 && (
                      <span className="text-xs font-medium text-slate-500">
                        {Math.round(stage.value).toLocaleString('fr-FR')} FCFA
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Leads */}
              <div className="p-3 space-y-2 min-h-[120px]">
                {stageLeads.map((lead) => (
                  <div
                    key={lead.id}
                    draggable
                    onDragStart={() => handleDragStart(lead.id)}
                    onDragEnd={handleDragEnd}
                    onClick={() => onLeadClick(lead)}
                    className={`bg-white rounded-lg p-3 border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group ${
                      draggingLead === lead.id ? 'opacity-50' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                            {lead.full_name?.charAt(0)?.toUpperCase() || '?'}
                          </div>
                          <span className="text-sm font-semibold text-slate-900 truncate">
                            {lead.full_name}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 truncate pl-8">
                          {lead.organization || lead.email}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        {lead.lead_score && lead.lead_score >= 70 && (
                          <span className="text-xs font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                            {lead.lead_score}
                          </span>
                        )}
                        {lead.lead_score && lead.lead_score >= 45 && lead.lead_score < 70 && (
                          <span className="text-xs font-bold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded">
                            {lead.lead_score}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-1.5">
                        {lead.country && (
                          <span className="text-xs text-slate-400">{lead.country}</span>
                        )}
                        {lead.sector && (
                          <span className="text-xs text-slate-400">{lead.sector}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        {lead.meeting_scheduled_at && (
                          <i className="ri-calendar-check-line text-xs text-teal-500 w-3 h-3 flex items-center justify-center" title="RDV fixé"></i>
                        )}
                        {lead.email_1_opened && (
                          <i className="ri-mail-open-line text-xs text-blue-500 w-3 h-3 flex items-center justify-center" title="Email ouvert"></i>
                        )}
                        {lead.calendar_link_clicked && (
                          <i className="ri-calendar-event-line text-xs text-orange-500 w-3 h-3 flex items-center justify-center" title="Clic calendrier"></i>
                        )}
                      </div>
                    </div>

                    {lead.next_follow_up_at && lead.next_follow_up_at <= new Date().toISOString() && (
                      <div className="mt-2 text-xs text-red-600 bg-red-50 px-2 py-1 rounded flex items-center gap-1">
                        <i className="ri-alarm-line w-3 h-3 flex items-center justify-center"></i>
                        Relance en attente
                      </div>
                    )}

                    {lead.deal_value && (
                      <div className="mt-2 text-xs text-slate-600">
                        {lead.deal_value.toLocaleString('fr-FR')} FCFA
                        {lead.probability && (
                          <span className="text-slate-400 ml-1">({lead.probability}%)</span>
                        )}
                      </div>
                    )}
                  </div>
                ))}

                {stageLeads.length === 0 && (
                  <div className="text-center py-6 text-slate-400">
                    <i className="ri-inbox-line text-2xl mb-1 block"></i>
                    <span className="text-xs">{t('crm.emptyStage')}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}



