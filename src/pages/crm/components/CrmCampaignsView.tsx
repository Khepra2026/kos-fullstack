import { useNavigate } from 'react-router-dom';
import { CrmLead } from '@/pages/crm/hooks/useCrmData';

interface CrmCampaignsViewProps {
  leads: CrmLead[];
}

export default function CrmCampaignsView({ leads }: CrmCampaignsViewProps) {
  const navigate = useNavigate();

  const campaigns = [
    {
      id: 'checklist-conformite-bceao-cobac',
      name: 'Checklist Conformité BCEAO/COBAC',
      description: 'Séquence 5 étapes — Sensibilisation à la conformité réglementaire',
      icon: 'ri-shield-check-line',
      color: '#6366f1',
      stage: 'active',
      leadsCount: Math.floor(Math.random() * 15) + 3,
      openRate: 42 + Math.floor(Math.random() * 20),
      clickRate: 12 + Math.floor(Math.random() * 15),
      steps: 5,
      lastSent: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'guide-levee-fonds-afrique',
      name: 'Guide Levée de Fonds Afrique',
      description: 'Séquence 7 étapes — Investment Readiness & Due Diligence',
      icon: 'ri-funds-line',
      color: '#f59e0b',
      stage: 'active',
      leadsCount: Math.floor(Math.random() * 12) + 2,
      openRate: 38 + Math.floor(Math.random() * 22),
      clickRate: 10 + Math.floor(Math.random() * 18),
      steps: 7,
      lastSent: new Date(Date.now() - Math.random() * 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'simulation-risque-reglementaire',
      name: 'Simulation Risque Réglementaire',
      description: 'Séquence 6 étapes — Scoring risques & plan de remédiation',
      icon: 'ri-alarm-warning-line',
      color: '#ef4444',
      stage: 'paused',
      leadsCount: Math.floor(Math.random() * 10) + 1,
      openRate: 35 + Math.floor(Math.random() * 25),
      clickRate: 8 + Math.floor(Math.random() * 15),
      steps: 6,
      lastSent: new Date(Date.now() - Math.random() * 14 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'template-audit-gouvernance',
      name: 'Template Audit Gouvernance',
      description: 'Séquence 5 étapes — Évaluation gouvernance & conseil d\'administration',
      icon: 'ri-government-line',
      color: '#10b981',
      stage: 'draft',
      leadsCount: 0,
      openRate: 0,
      clickRate: 0,
      steps: 5,
      lastSent: null,
    },
    {
      id: 'mini-rapport-due-diligence',
      name: 'Mini-Rapport Due Diligence',
      description: 'Séquence 7 étapes — Due Diligence pour investisseurs',
      icon: 'ri-search-eye-line',
      color: '#8b5cf6',
      stage: 'active',
      leadsCount: Math.floor(Math.random() * 8) + 4,
      openRate: 45 + Math.floor(Math.random() * 18),
      clickRate: 15 + Math.floor(Math.random() * 12),
      steps: 7,
      lastSent: new Date(Date.now() - Math.random() * 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'diagnostic-esg-maturite',
      name: 'Diagnostic ESG Maturité',
      description: 'Séquence 6 étapes — Score ESG & plan d\'action IFC',
      icon: 'ri-leaf-line',
      color: '#059669',
      stage: 'draft',
      leadsCount: 0,
      openRate: 0,
      clickRate: 0,
      steps: 6,
      lastSent: null,
    },
  ];

  const activeCampaigns = campaigns.filter(c => c.stage === 'active');
  const draftCampaigns = campaigns.filter(c => c.stage === 'draft');
  const pausedCampaigns = campaigns.filter(c => c.stage === 'paused');

  const totalLeadsInCampaigns = campaigns.reduce((sum, c) => sum + c.leadsCount, 0);
  const avgOpenRate = activeCampaigns.length > 0
    ? Math.round(activeCampaigns.reduce((sum, c) => sum + c.openRate, 0) / activeCampaigns.length)
    : 0;
  const avgClickRate = activeCampaigns.length > 0
    ? Math.round(activeCampaigns.reduce((sum, c) => sum + c.clickRate, 0) / activeCampaigns.length)
    : 0;

  const getStageBadge = (stage: string) => {
    switch (stage) {
      case 'active': return { label: 'Active', bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500' };
      case 'paused': return { label: 'En pause', bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-500' };
      case 'draft': return { label: 'Brouillon', bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400' };
      default: return { label: stage, bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Résumé campagnes */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Campagnes actives', value: activeCampaigns.length, icon: 'ri-mail-send-line', color: 'text-emerald-700', bg: 'bg-emerald-50' },
          { label: 'Leads en séquence', value: totalLeadsInCampaigns, icon: 'ri-user-follow-line', color: 'text-teal-700', bg: 'bg-teal-50' },
          { label: 'Taux d\'ouverture moy.', value: `${avgOpenRate}%`, icon: 'ri-mail-open-line', color: 'text-blue-700', bg: 'bg-blue-50' },
          { label: 'Taux de clic moy.', value: `${avgClickRate}%`, icon: 'ri-cursor-line', color: 'text-purple-700', bg: 'bg-purple-50' },
        ].map((stat, i) => (
          <div key={i} className={`${stat.bg} rounded-xl p-4 border border-slate-200`}>
            <div className="flex items-center gap-2 mb-1">
              <i className={`${stat.icon} ${stat.color} w-4 h-4 flex items-center justify-center`}></i>
              <span className="text-xs text-slate-500 font-medium">{stat.label}</span>
            </div>
            <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Actions rapides */}
      <div className="bg-gradient-to-r from-brand-950 via-brand-900 to-brand-950 rounded-xl p-5 border border-slate-200">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-white mb-1">Campagne de sensibilisation sortante</h3>
            <p className="text-xs text-gray-400">Importez des prospects, créez des emails dynamiques, et envoyez via SMTP/IMAP. Tout depuis une seule plateforme.</p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => navigate('/email-sequences')}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-semibold hover:bg-teal-700 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2"
              type="button"
            >
              <i className="ri-add-line w-4 h-4 flex items-center justify-center"></i>
              Nouvelle campagne
            </button>
            <button
              onClick={() => navigate('/email-sequences')}
              className="px-4 py-2 border border-gray-500 text-gray-300 rounded-lg text-sm font-semibold hover:bg-white/5 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2"
              type="button"
            >
              <i className="ri-upload-line w-4 h-4 flex items-center justify-center"></i>
              Importer des leads
            </button>
          </div>
        </div>
      </div>

      {/* Campagnes actives */}
      {activeCampaigns.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <h3 className="text-sm font-bold text-slate-900">Campagnes actives ({activeCampaigns.length})</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeCampaigns.map((campaign) => {
              const badge = getStageBadge(campaign.stage);
              return (
                <div key={campaign.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${campaign.color}15` }}>
                        <i className={`${campaign.icon} w-5 h-5 flex items-center justify-center`} style={{ color: campaign.color }}></i>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">{campaign.name}</h3>
                        <p className="text-xs text-slate-500">{campaign.description}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${badge.bg} ${badge.text} flex items-center gap-1 whitespace-nowrap`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`}></span>
                      {badge.label}
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-3 mb-3">
                    <div className="text-center py-2 px-1 rounded-lg bg-slate-50">
                      <div className="text-lg font-bold text-slate-800">{campaign.leadsCount}</div>
                      <div className="text-xs text-slate-400">Leads</div>
                    </div>
                    <div className="text-center py-2 px-1 rounded-lg bg-slate-50">
                      <div className="text-lg font-bold text-blue-600">{campaign.openRate}%</div>
                      <div className="text-xs text-slate-400">Ouverture</div>
                    </div>
                    <div className="text-center py-2 px-1 rounded-lg bg-slate-50">
                      <div className="text-lg font-bold text-purple-600">{campaign.clickRate}%</div>
                      <div className="text-xs text-slate-400">Clics</div>
                    </div>
                    <div className="text-center py-2 px-1 rounded-lg bg-slate-50">
                      <div className="text-lg font-bold text-slate-800">{campaign.steps}</div>
                      <div className="text-xs text-slate-400">Étapes</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <span className="text-xs text-slate-400">
                      {campaign.lastSent ? `Dernier envoi : ${new Date(campaign.lastSent).toLocaleDateString('fr-FR')}` : 'Pas encore envoyé'}
                    </span>
                    <button
                      onClick={() => navigate('/email-sequences')}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                      style={{ backgroundColor: `${campaign.color}10`, color: campaign.color }}
                      type="button"
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = `${campaign.color}20`; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = `${campaign.color}10`; }}
                    >
                      Gérer la campagne
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Campagnes en pause */}
      {pausedCampaigns.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
            <h3 className="text-sm font-bold text-slate-900">En pause ({pausedCampaigns.length})</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pausedCampaigns.map((campaign) => {
              const badge = getStageBadge(campaign.stage);
              return (
                <div key={campaign.id} className="bg-white rounded-xl border border-slate-200 p-5 opacity-75">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${campaign.color}15` }}>
                        <i className={`${campaign.icon} w-5 h-5 flex items-center justify-center`} style={{ color: campaign.color }}></i>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">{campaign.name}</h3>
                        <p className="text-xs text-slate-500">{campaign.description}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${badge.bg} ${badge.text} whitespace-nowrap`}>{badge.label}</span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <span className="text-xs text-slate-400">{campaign.leadsCount} leads · {campaign.steps} étapes</span>
                    <button
                      onClick={() => navigate('/email-sequences')}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors cursor-pointer whitespace-nowrap"
                      type="button"
                    >
                      Reprendre
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Brouillons */}
      {draftCampaigns.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-slate-400"></div>
            <h3 className="text-sm font-bold text-slate-900">Brouillons ({draftCampaigns.length})</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {draftCampaigns.map((campaign) => (
              <div key={campaign.id} className="bg-white rounded-xl border border-slate-200 border-dashed p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-slate-100">
                      <i className={`${campaign.icon} w-5 h-5 flex items-center justify-center text-slate-400`}></i>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{campaign.name}</h3>
                      <p className="text-xs text-slate-500">{campaign.description}</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 whitespace-nowrap">Brouillon</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <span className="text-xs text-slate-400">{campaign.steps} étapes prêtes</span>
                  <button
                    onClick={() => navigate('/email-sequences')}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-teal-50 text-teal-700 hover:bg-teal-100 transition-colors cursor-pointer whitespace-nowrap"
                    type="button"
                  >
                    Configurer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Guide SMTP */}
      <div className="bg-amber-50 rounded-xl border border-amber-200 p-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
            <i className="ri-mail-settings-line text-amber-600 w-5 h-5 flex items-center justify-center"></i>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-amber-900 mb-1">Configuration SMTP/IMAP</h3>
            <p className="text-xs text-amber-700 mb-3">
              Pour envoyer depuis votre propre domaine (ex: contact@khepraexperts.com), configurez votre boîte mail SMTP/IMAP.
              Compatible Google Workspace, Microsoft 365, Zoho, Fastmail.
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/email-sequences')}
                className="px-4 py-2 bg-amber-600 text-white rounded-lg text-xs font-semibold hover:bg-amber-700 transition-colors cursor-pointer whitespace-nowrap"
                type="button"
              >
                Configurer SMTP
              </button>
              <span className="text-xs text-amber-500">Google SMTP pré-rempli · App Password requis</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}