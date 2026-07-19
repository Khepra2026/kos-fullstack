import { useTranslation } from 'react-i18next';
import { CrmLead } from '@/pages/crm/hooks/useCrmData';

interface HotLeadsAlertProps {
  leads: CrmLead[];
  onLeadClick: (lead: CrmLead) => void;
}

export default function HotLeadsAlert({ leads, onLeadClick }: HotLeadsAlertProps) {
  const { t } = useTranslation();

  const hotLeads = leads.filter(
    (l) =>
      l.pipeline_stage === 'lead_hot' ||
      (l.lead_score && l.lead_score >= 70 && ['lead_generated', 'lead_qualified', 'contact_engaged'].includes(l.pipeline_stage))
  );

  if (hotLeads.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <i className="ri-fire-line text-amber-600 w-5 h-5 flex items-center justify-center"></i>
        <h3 className="text-sm font-bold text-amber-800">
          {t('crm.hotLeads.title', '{{count}} Lead(s) Chaud(s) Détecté(s) — Action Requise', { count: hotLeads.length })}
        </h3>
      </div>
      <div className="space-y-2">
        {hotLeads.slice(0, 5).map((lead) => (
          <div
            key={lead.id}
            onClick={() => onLeadClick(lead)}
            className="flex items-center justify-between bg-white rounded-lg p-3 border border-amber-100 hover:border-amber-300 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-xs font-bold">
                {lead.full_name?.charAt(0)?.toUpperCase() || '?'}
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900">{lead.full_name}</div>
                <div className="text-xs text-slate-500">
                  {lead.organization} {lead.country && `• ${lead.country}`}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-xs font-bold text-amber-600">Score {lead.lead_score}</div>
                {lead.hot_reason && <div className="text-xs text-slate-400">{lead.hot_reason}</div>}
              </div>
              <div className="flex items-center gap-1">
                <a
                  href={`mailto:${lead.email}`}
                  onClick={(e) => e.stopPropagation()}
                  className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors"
                >
                  <i className="ri-mail-line w-4 h-4 flex items-center justify-center"></i>
                </a>
                <a
                  href="https://calendly.com/khepra-experts/diagnostic-strategique"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center hover:bg-orange-100 transition-colors"
                >
                  <i className="ri-calendar-line w-4 h-4 flex items-center justify-center"></i>
                </a>
              </div>
            </div>
          </div>
        ))}
        {hotLeads.length > 5 && (
          <div className="text-center text-xs text-amber-600 font-medium">
            + {hotLeads.length - 5} autres leads chauds
          </div>
        )}
      </div>
    </div>
  );
}



