import { useState } from 'react';

interface DraftPlanItem {
  id: number;
  status_avant: string;
  post_type: string;
  title: string;
  action_auto: string;
  intervalle: string;
  hashtags: string[];
  conformite: string;
}

const PUBLICATION_PLAN: DraftPlanItem[] = [
  {
    id: 1,
    status_avant: 'Programmé 20/06 08:00',
    post_type: 'insight',
    title: 'Insight BCEAO — Évolution du ratio de solvabilité UEMOA 2026',
    action_auto: 'Publish now (date passée)',
    intervalle: 'Immédiat J+0',
    hashtags: ['#BCEAO', '#Solvabilité', '#Banque'],
    conformite: 'Chiffres sourcés Circulaire',
  },
  {
    id: 2,
    status_avant: 'Programmé 20/06 12:00',
    post_type: 'article',
    title: 'Préparer son inspection COBAC en 2026 — Guide complet',
    action_auto: 'Publish now + pin comment',
    intervalle: 'Immédiat J+0',
    hashtags: ['#COBAC', '#CEMAC', '#Inspection'],
    conformite: 'CTA commentaire conforme',
  },
  {
    id: 3,
    status_avant: 'Programmé 16/06 08:00',
    post_type: 'insight',
    title: '5 piliers de la gouvernance SFD — Instruction BCEAO',
    action_auto: 'Publish + carrousel 5 slides',
    intervalle: 'Immédiat J+0',
    hashtags: ['#SFD', '#Gouvernance', '#BCEAO'],
    conformite: 'Contenu éducatif, pas de promesse',
  },
  {
    id: 4,
    status_avant: 'Programmé 16/06 12:00',
    post_type: 'article',
    title: 'Diagnostic Flash — Conformité BCEAO en 5 minutes',
    action_auto: 'Publish + lien diagnostic',
    intervalle: 'Immédiat J+0',
    hashtags: ['#Diagnostic', '#BCEAO', '#SFD'],
    conformite: 'Mention non-conseil auto-ajoutée',
  },
  {
    id: 5,
    status_avant: 'Programmé 18/06 08:00',
    post_type: 'analyse',
    title: 'Impact IFRS 9 sur les banques UEMOA — Analyse',
    action_auto: 'Publish + document LinkedIn natif',
    intervalle: 'Immédiat J+0',
    hashtags: ['#IFRS9', '#BCEAO', '#UEMOA'],
    conformite: 'Source OCDE citée',
  },
  {
    id: 6,
    status_avant: 'Programmé 18/06 12:00',
    post_type: 'question',
    title: 'Quel est votre plus grand défi de conformité ?',
    action_auto: 'Publish + sondage LinkedIn natif',
    intervalle: 'Immédiat J+0',
    hashtags: ['#Conformité', '#Sondage', '#Afrique'],
    conformite: 'Sondage non promotionnel',
  },
  {
    id: 7,
    status_avant: 'Brouillon BCEAO 2026',
    post_type: 'article',
    title: 'BCEAO 2026 — Nouvelles exigences de fonds propres SFD',
    action_auto: 'Publish urgent — lead magnet #1',
    intervalle: 'J+0 08:00 UTC',
    hashtags: ['#BCEAO', '#SFD', '#FondsPropres'],
    conformite: 'Chiffres sourcés Circulaire',
  },
  {
    id: 8,
    status_avant: 'Brouillon Tier 1/Tier 2',
    post_type: 'article',
    title: 'Tier 1 / Tier 2 — Guide UEMOA',
    action_auto: 'Publish J+1 08:00',
    intervalle: 'J+1 08:00 UTC',
    hashtags: ['#Tier1', '#Tier2', '#BCEAO'],
    conformite: 'Articles BCEAO cités',
  },
  {
    id: 9,
    status_avant: 'Brouillon Inspection',
    post_type: 'article',
    title: 'Checklist ultime — Inspection COBAC sans stress',
    action_auto: 'Publish J+2 08:00',
    intervalle: 'J+2 08:00 UTC',
    hashtags: ['#COBAC', '#Inspection', '#CEMAC'],
    conformite: 'Pas de garantie résultat',
  },
  {
    id: 10,
    status_avant: 'Brouillon SHA-256',
    post_type: 'article',
    title: 'Certification SHA-256 — Sécurité des livrables KOS',
    action_auto: 'Publish J+3 08:00',
    intervalle: 'J+3 08:00 UTC',
    hashtags: ['#SHA256', '#Sécurité', '#ISO30401'],
    conformite: 'ISO 30401 = preuve',
  },
  {
    id: 11,
    status_avant: 'Brouillon LBC/FT',
    post_type: 'insight',
    title: 'LBC/FT — Recommandations GAFI 2026 Afrique',
    action_auto: 'Carrousel 7 slides — J+4 08:00',
    intervalle: 'J+4 08:00 UTC',
    hashtags: ['#LBCFT', '#GAFI', '#Compliance'],
    conformite: 'CTA diagnostic, contenu GAFI',
  },
  {
    id: 12,
    status_avant: 'Brouillon Agrément SFD',
    post_type: 'insight',
    title: 'Agrément SFD — Taux succès 85% dossier conforme',
    action_auto: 'Vidéo/carrousel — J+5 08:00',
    intervalle: 'J+5 08:00 UTC',
    hashtags: ['#Agrément', '#SFD', '#BCEAO'],
    conformite: '85% = historique KHEPRA',
  },
  {
    id: 13,
    status_avant: 'Brouillon Due Diligence',
    post_type: 'question',
    title: 'Due Diligence — Les 4 pièges qui font échouer',
    action_auto: 'Publish + sondage — J+6 08:00',
    intervalle: 'J+6 08:00 UTC',
    hashtags: ['#DueDiligence', '#Investissement', '#Afrique'],
    conformite: 'Sondage éducatif',
  },
  {
    id: 14,
    status_avant: 'Brouillon Transformation',
    post_type: 'analyse',
    title: 'Transformation digitale SFD — Retour UEMOA 2025-2026',
    action_auto: 'Publish + lien contact — J+7 08:00',
    intervalle: 'J+7 08:00 UTC',
    hashtags: ['#TransformationDigitale', '#SFD', '#UEMOA'],
    conformite: 'Cas d\'usage réel',
  },
];

const TYPE_ICONS: Record<string, string> = {
  insight: 'ri-lightbulb-flash-line',
  article: 'ri-article-line',
  analyse: 'ri-bar-chart-box-line',
  question: 'ri-question-answer-line',
};

const TYPE_COLORS: Record<string, string> = {
  insight: 'bg-amber-50 text-amber-700 border-amber-200',
  article: 'bg-[#0A66C2]/10 text-[#0A66C2] border-[#0A66C2]/20',
  analyse: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  question: 'bg-violet-50 text-violet-700 border-violet-200',
};

export default function PublishPlan14Drafts() {
  const [expanded, setExpanded] = useState(false);

  const scheduled = PUBLICATION_PLAN.filter(p => p.status_avant.startsWith('Programmé'));
  const drafts = PUBLICATION_PLAN.filter(p => p.status_avant.startsWith('Brouillon'));

  return (
    <div className="rounded-2xl bg-white border-2 border-[#0A66C2]/20 overflow-hidden">
      {/* Header */}
      <div className="p-5 bg-gradient-to-r from-[#0A66C2]/5 to-[#0A66C2]/[0.02] border-b border-[#0A66C2]/10">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-lg bg-[#0A66C2] flex items-center justify-center">
                <i className="ri-calendar-schedule-line text-white text-sm" />
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground-950">
                Plan de Publication — 14 Brouillons Big Four
              </h3>
            </div>
            <p className="text-xs text-foreground-500 ml-10">
              Dès connexion OAuth réussie : {scheduled.length} programmés (dates passées) + {drafts.length} brouillons → publication auto avec intervalle 30 min
            </p>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0A66C2]/10 text-[#0A66C2] text-xs font-bold hover:bg-[#0A66C2]/20 transition-colors cursor-pointer whitespace-nowrap"
          >
            {expanded ? <i className="ri-arrow-up-s-line" /> : <i className="ri-arrow-down-s-line" />}
            {expanded ? 'Réduire' : 'Voir le plan complet'}
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-5">
        <div className="p-3 rounded-xl bg-red-50 border border-red-200">
          <div className="flex items-center gap-2 mb-1">
            <i className="ri-alert-fill text-red-500" />
            <span className="text-xs font-bold text-red-700">{scheduled.length} programmes — dates passées</span>
          </div>
          <p className="text-[11px] text-red-600">Action : Publish now immédiat</p>
        </div>
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
          <div className="flex items-center gap-2 mb-1">
            <i className="ri-draft-line text-amber-500" />
            <span className="text-xs font-bold text-amber-700">{drafts.length} brouillons en file</span>
          </div>
          <p className="text-[11px] text-amber-600">Action : Intervalle 30 min, J+0 → J+7</p>
        </div>
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
          <div className="flex items-center gap-2 mb-1">
            <i className="ri-check-double-line text-emerald-500" />
            <span className="text-xs font-bold text-emerald-700">Cible J+7</span>
          </div>
          <p className="text-[11px] text-emerald-600">14/14 publiés · 0 échec · Auto</p>
        </div>
      </div>

      {/* Expanded Detail */}
      {expanded && (
        <div className="border-t border-background-200">
          {/* Scheduled (past dates) */}
          <div className="p-5">
            <h4 className="text-sm font-bold text-foreground-950 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              Phase 1 — Publication immédiate (dates passées)
              <span className="text-[10px] font-normal text-foreground-400 ml-auto">{scheduled.length} posts</span>
            </h4>
            <div className="space-y-2">
              {scheduled.map((item) => (
                <div key={item.id} className="flex items-start gap-3 p-3 rounded-xl bg-red-50/50 border border-red-100 hover:bg-red-50 transition-colors">
                  <div className={`w-9 h-9 rounded-lg border flex items-center justify-center flex-shrink-0 ${TYPE_COLORS[item.post_type] || 'bg-background-100'}`}>
                    <i className={`${TYPE_ICONS[item.post_type] || 'ri-file-line'} text-sm`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <span className="text-xs font-bold text-foreground-950">{item.title}</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-red-100 text-red-700 whitespace-nowrap">
                        {item.status_avant}
                      </span>
                    </div>
                    <p className="text-[11px] text-foreground-500">{item.action_auto}</p>
                    <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                      {item.hashtags.map((tag) => (
                        <span key={tag} className="text-[10px] text-[#0A66C2] font-semibold">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 whitespace-nowrap">
                      {item.conformite}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Drafts (sequential) */}
          <div className="p-5 border-t border-background-200">
            <h4 className="text-sm font-bold text-foreground-950 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Phase 2 — Publication séquentielle (intervalle 30 min)
              <span className="text-[10px] font-normal text-foreground-400 ml-auto">{drafts.length} posts · J+0 → J+7</span>
            </h4>
            <div className="space-y-2">
              {drafts.map((item) => (
                <div key={item.id} className="flex items-start gap-3 p-3 rounded-xl bg-amber-50/50 border border-amber-100 hover:bg-amber-50 transition-colors">
                  <div className={`w-9 h-9 rounded-lg border flex items-center justify-center flex-shrink-0 ${TYPE_COLORS[item.post_type] || 'bg-background-100'}`}>
                    <i className={`${TYPE_ICONS[item.post_type] || 'ri-file-line'} text-sm`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <span className="text-xs font-bold text-foreground-950">{item.title}</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 whitespace-nowrap">
                        {item.status_avant}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-[11px] text-foreground-500">{item.action_auto}</p>
                      <span className="text-[10px] font-bold text-secondary-600">· {item.intervalle}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                      {item.hashtags.map((tag) => (
                        <span key={tag} className="text-[10px] text-[#0A66C2] font-semibold">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 whitespace-nowrap">
                      {item.conformite}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verrouillage 0 récidive */}
          <div className="p-5 border-t border-background-200 bg-background-50">
            <h4 className="text-sm font-bold text-foreground-950 mb-3 flex items-center gap-2">
              <i className="ri-lock-line text-[#0A66C2]" />
              Verrouillage 0 Récidive — KOS ne se déconnecte plus jamais
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-2 p-3 rounded-lg bg-white border border-background-200">
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i className="ri-refresh-line text-emerald-600 text-xs" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground-950">Auto-refresh token J-14</p>
                  <p className="text-[11px] text-foreground-500">Cron 03:00 UTC · Refresh silencieux si expiry &lt; 14 jours</p>
                  <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 mt-1">ACTIF</span>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 rounded-lg bg-white border border-background-200">
                <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i className="ri-webhook-line text-amber-600 text-xs" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground-950">Webhook révocation</p>
                  <p className="text-[11px] text-foreground-500">https://khepraexperts.com/webhooks/linkedin</p>
                  <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 mt-1">À CONFIGURER</span>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 rounded-lg bg-white border border-background-200">
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i className="ri-heart-pulse-line text-emerald-600 text-xs" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground-950">Healthcheck mensuel</p>
                  <p className="text-[11px] text-foreground-500">Post privé visibility=CONNECTIONS le 1er du mois</p>
                  <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 mt-1">ACTIF</span>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 rounded-lg bg-white border border-background-200">
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i className="ri-shield-check-line text-emerald-600 text-xs" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground-950">CI/CD Block</p>
                  <p className="text-[11px] text-foreground-500">validate-domain.sh bloque si redirect_uri invalide</p>
                  <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 mt-1">ACTIF</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Setup checklist */}
      <div className="p-5 border-t border-background-200 bg-background-50">
        <h4 className="text-sm font-bold text-foreground-950 mb-3 flex items-center gap-2">
          <i className="ri-list-check-3 text-[#0A66C2]" />
          Étape 1 — Fix OAuth en 10 min (Actions manuelles LinkedIn)
        </h4>
        <div className="space-y-2">
          {[
            { step: 1, text: 'LinkedIn Developers > KOS App > Products : Activer Share on LinkedIn + Sign In with LinkedIn', link: 'https://developer.linkedin.com/', linkText: 'developer.linkedin.com' },
            { step: 2, text: 'Auth > OAuth 2.0 settings : Ajouter redirect EXACT https://khepraexperts.com/linkedin-callback', link: null },
            { step: 3, text: 'Scopes : Cocher w_organization_social + rw_organization_admin. Sauvegarder.', link: null },
            { step: 4, text: 'Vérifier essochamanu@gmail.com Super Admin Page', link: 'https://www.linkedin.com/company/khepraexperts/admin/manage-admins/', linkText: 'Page Admin LinkedIn' },
            { step: 5, text: 'Revenir ici et cliquer "Connecter avec LinkedIn" → doit passer à "Connecté : KHEPRA EXPERTS"', link: null },
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-2 p-2.5 rounded-lg bg-white border border-background-200">
              <span className="w-6 h-6 rounded-full bg-[#0A66C2] text-white flex items-center justify-center text-[11px] font-bold flex-shrink-0 mt-0.5">
                {item.step}
              </span>
              <div className="flex-1">
                <p className="text-xs text-foreground-700">{item.text}</p>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-1 text-[11px] font-bold text-[#0A66C2] hover:underline"
                  >
                    <i className="ri-external-link-line text-[10px]" />
                    {item.linkText || item.link}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}



